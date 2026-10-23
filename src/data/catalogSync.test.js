import {describe, expect, it, vi} from 'vitest'
import {synchronizeCatalog} from './catalogSync'

const currentCatalog = {
  schemaVersion: '1.0.0',
  catalogVersion: 'sha256-current',
  music: [],
  composerMap: {},
}

describe('catalog synchronization', () => {
  it('does not download files when the current version is up to date', async () => {
    const download = vi.fn()
    const save = vi.fn()
    const result = await synchronizeCatalog(currentCatalog, {
      fetchManifest: async () => ({
        schemaVersion: '1.0.0',
        catalogVersion: 'sha256-current',
      }),
      download,
      save,
      getManifestUrl: () => 'https://example.test/data/v1/stable.json',
    })

    expect(result).toMatchObject({updated: false, reason: 'current'})
    expect(download).not.toHaveBeenCalled()
    expect(save).not.toHaveBeenCalled()
  })

  it('downloads and saves a newer compatible catalog', async () => {
    const nextCatalog = {
      schemaVersion: '1.0.0',
      catalogVersion: 'sha256-next',
      music: [],
      composerMap: {},
    }
    const download = vi.fn(async () => nextCatalog)
    const save = vi.fn(async () => {})
    const result = await synchronizeCatalog(currentCatalog, {
      fetchManifest: async () => ({
        schemaVersion: '1.0.0',
        catalogVersion: 'sha256-next',
      }),
      download,
      save,
      getManifestUrl: () => 'https://example.test/data/v1/stable.json',
    })

    expect(result).toMatchObject({updated: true, catalog: nextCatalog})
    expect(download).toHaveBeenCalledOnce()
    expect(save).toHaveBeenCalledWith(nextCatalog)
  })

  it('does not install a manifest with an unsupported schema', async () => {
    const download = vi.fn()
    const save = vi.fn()
    const result = await synchronizeCatalog(currentCatalog, {
      fetchManifest: async () => ({
        schemaVersion: '2.0.0',
        catalogVersion: 'sha256-future',
      }),
      download,
      save,
      getManifestUrl: () => 'https://example.test/data/v2/stable.json',
    })

    expect(result).toMatchObject({updated: false, reason: 'incompatible-schema'})
    expect(download).not.toHaveBeenCalled()
    expect(save).not.toHaveBeenCalled()
  })

  it('still returns downloaded data when the cache write fails', async () => {
    const nextCatalog = {
      schemaVersion: '1.0.0',
      catalogVersion: 'sha256-next',
      music: [],
      composerMap: {},
    }
    const result = await synchronizeCatalog(currentCatalog, {
      fetchManifest: async () => ({
        schemaVersion: '1.0.0',
        catalogVersion: 'sha256-next',
      }),
      download: async () => nextCatalog,
      save: async () => {
        throw new Error('quota exceeded')
      },
      getManifestUrl: () => 'https://example.test/data/v1/stable.json',
    })

    expect(result.updated).toBe(true)
    expect(result.catalog).toBe(nextCatalog)
    expect(result.cacheWriteError).toBeInstanceOf(Error)
  })
})
