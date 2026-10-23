const DEFAULT_MANIFEST_URL = '/data/v1/stable.json'
export const SUPPORTED_SCHEMA_MAJOR = 1
const REQUEST_TIMEOUT_MS = 5000

function schemaMajor(version) {
  if (typeof version !== 'string') return null
  const major = Number.parseInt(version.split('.')[0], 10)
  return Number.isInteger(major) ? major : null
}

function assertManifest(manifest) {
  if (!manifest || typeof manifest !== 'object') {
    throw new Error('Catalog manifest must be an object')
  }
  if (schemaMajor(manifest.schemaVersion) !== SUPPORTED_SCHEMA_MAJOR) {
    throw new Error(`Unsupported catalog schema: ${manifest.schemaVersion}`)
  }
  if (typeof manifest.catalogVersion !== 'string' || !manifest.catalogVersion) {
    throw new Error('Catalog manifest has no catalogVersion')
  }
  if (!manifest.files || typeof manifest.files !== 'object') {
    throw new Error('Catalog manifest has no files')
  }

  for (const key of ['music', 'composerMap']) {
    const file = manifest.files[key]
    if (!file || typeof file !== 'object') {
      throw new Error(`Catalog manifest has no ${key} file`)
    }
    if (
      typeof file.path !== 'string'
      || !file.path
      || file.path.startsWith('/')
      || file.path.includes('\\')
      || file.path.split('/').includes('..')
    ) {
      throw new Error(`Invalid path for ${key}`)
    }
    if (typeof file.sha256 !== 'string' || !/^[a-f0-9]{64}$/i.test(file.sha256)) {
      throw new Error(`Invalid SHA-256 for ${key}`)
    }
    if (!Number.isInteger(file.count) || file.count < 0) {
      throw new Error(`Invalid record count for ${key}`)
    }
  }
}

function absoluteUrl(url, locationHref = globalThis.location?.href) {
  const base = locationHref || 'http://localhost/'
  return new URL(url, base).toString()
}

async function fetchWithTimeout(fetchImpl, url, timeoutMs) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetchImpl(url, {
      cache: 'no-store',
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

function formatHash(buffer) {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function readAndVerifyFile(fetchImpl, manifestUrl, key, file, timeoutMs) {
  const response = await fetchWithTimeout(
    fetchImpl,
    new URL(file.path, manifestUrl).toString(),
    timeoutMs,
  )
  if (!response.ok) {
    throw new Error(`Failed to download ${key}: HTTP ${response.status}`)
  }

  const buffer = await response.arrayBuffer()
  const digest = formatHash(await globalThis.crypto.subtle.digest('SHA-256', buffer))
  if (digest.toLowerCase() !== file.sha256.toLowerCase()) {
    throw new Error(`SHA-256 mismatch for ${key}`)
  }

  const value = JSON.parse(new TextDecoder().decode(buffer))
  const count = key === 'music' ? value.length : Object.keys(value).length
  if (count !== file.count) {
    throw new Error(`Unexpected record count for ${key}: ${count}`)
  }
  return value
}

export function manifestUrl(now = Date.now()) {
  const configured = import.meta.env.VITE_CATALOG_MANIFEST_URL || DEFAULT_MANIFEST_URL
  const url = new URL(configured, globalThis.location?.href || 'http://localhost/')
  url.searchParams.set('_', String(now))
  return url.toString()
}

export async function fetchCatalogManifest({
  fetchImpl = globalThis.fetch,
  now = Date.now(),
  timeoutMs = REQUEST_TIMEOUT_MS,
} = {}) {
  const response = await fetchWithTimeout(fetchImpl, manifestUrl(now), timeoutMs)
  if (!response.ok) {
    throw new Error(`Failed to download catalog manifest: HTTP ${response.status}`)
  }

  const manifest = await response.json()
  assertManifest(manifest)
  return manifest
}

export async function downloadCatalog(manifest, {
  fetchImpl = globalThis.fetch,
  manifestSource = manifestUrl(),
  timeoutMs = REQUEST_TIMEOUT_MS,
} = {}) {
  assertManifest(manifest)
  const [music, composerMap] = await Promise.all([
    readAndVerifyFile(fetchImpl, manifestSource, 'music', manifest.files.music, timeoutMs),
    readAndVerifyFile(
      fetchImpl,
      manifestSource,
      'composerMap',
      manifest.files.composerMap,
      timeoutMs,
    ),
  ])

  return {
    schemaVersion: manifest.schemaVersion,
    catalogVersion: manifest.catalogVersion,
    publishedAt: manifest.publishedAt || null,
    music,
    composerMap,
  }
}

export {assertManifest, schemaMajor, absoluteUrl}
