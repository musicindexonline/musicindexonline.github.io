import {describe, expect, it} from 'vitest'
import {assertManifest, downloadCatalog} from './catalogClient'

const music = [
  {
    composer: 'Antonio Vivaldi',
    title: 'Il Giustino',
    op: 'RV 717',
    genre: 'Opera',
    period: 'Baroque',
    movements: ['Sinfonia'],
  },
]
const composerMap = {'Antonio Vivaldi': 'Vivaldi'}
const encoder = new TextEncoder()

async function sha256(value) {
  const buffer = encoder.encode(JSON.stringify(value))
  const digest = await globalThis.crypto.subtle.digest('SHA-256', buffer)
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function manifest() {
  return {
    schemaVersion: '1.0.0',
    catalogVersion: 'sha256-test',
    publishedAt: '2026-10-23T00:00:00.000Z',
    files: {
      music: {
        path: 'versions/sha256-test/music.json',
        sha256: await sha256(music),
        count: music.length,
      },
      composerMap: {
        path: 'versions/sha256-test/composerMap.json',
        sha256: await sha256(composerMap),
        count: Object.keys(composerMap).length,
      },
    },
  }
}

function downloads() {
  return async (url) => {
    const body = url.endsWith('/music.json') ? music : composerMap
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    })
  }
}

describe('catalog client', () => {
  it('downloads all files and verifies their hashes', async () => {
    const source = 'https://musicindexonline.github.io/data/v1/stable.json'
    const catalog = await downloadCatalog(await manifest(), {
      fetchImpl: downloads(),
      manifestSource: source,
    })

    expect(catalog.music).toEqual(music)
    expect(catalog.composerMap).toEqual(composerMap)
    expect(catalog.catalogVersion).toBe('sha256-test')
  })

  it('rejects an invalid file hash', async () => {
    const invalidManifest = await manifest()
    invalidManifest.files.music.sha256 = '0'.repeat(64)

    await expect(downloadCatalog(invalidManifest, {
      fetchImpl: downloads(),
      manifestSource: 'https://example.test/data/v1/stable.json',
    })).rejects.toThrow('SHA-256 mismatch')
  })

  it('rejects unsupported schema major versions', async () => {
    const invalidManifest = await manifest()
    invalidManifest.schemaVersion = '2.0.0'
    expect(() => assertManifest(invalidManifest)).toThrow('Unsupported catalog schema')
  })

  it('rejects paths that escape the version directory', async () => {
    const invalidManifest = await manifest()
    invalidManifest.files.music.path = '../music.json'
    expect(() => assertManifest(invalidManifest)).toThrow('Invalid path')
  })
})
