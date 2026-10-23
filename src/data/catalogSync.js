import {
  downloadCatalog,
  fetchCatalogManifest,
  manifestUrl,
  schemaMajor,
  SUPPORTED_SCHEMA_MAJOR,
} from './catalogClient'
import {saveCatalog} from './indexedDb'

export async function synchronizeCatalog(currentCatalog, {
  fetchManifest = fetchCatalogManifest,
  download = downloadCatalog,
  save = saveCatalog,
  now = () => Date.now(),
  getManifestUrl = manifestUrl,
} = {}) {
  const source = getManifestUrl(now())
  const manifest = await fetchManifest({now: now()})
  if (schemaMajor(manifest.schemaVersion) !== SUPPORTED_SCHEMA_MAJOR) {
    return {updated: false, reason: 'incompatible-schema', manifest}
  }
  if (
    currentCatalog?.catalogVersion === manifest.catalogVersion
    && currentCatalog?.schemaVersion === manifest.schemaVersion
  ) {
    return {updated: false, reason: 'current', manifest}
  }

  const catalog = await download(manifest, {manifestSource: source})
  let cacheWriteError = null
  try {
    await save(catalog)
  } catch (error) {
    cacheWriteError = error
  }
  return {updated: true, catalog, manifest, cacheWriteError}
}
