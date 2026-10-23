import 'fake-indexeddb/auto'
import {afterAll, beforeEach, describe, expect, it} from 'vitest'
import {
  deleteCatalogDatabase,
  readCurrentCatalog,
  saveCatalog,
} from './indexedDb'

function catalog(catalogVersion, title = 'Work') {
  return {
    schemaVersion: '1.0.0',
    catalogVersion,
    publishedAt: null,
    music: [
      {
        composer: 'Composer',
        title,
        op: '1',
        genre: 'Genre',
        period: 'Period',
        movements: [],
      },
    ],
    composerMap: {Composer: 'Composer'},
  }
}

describe('catalog IndexedDB cache', () => {
  beforeEach(async () => {
    await deleteCatalogDatabase()
  })

  afterAll(async () => {
    await deleteCatalogDatabase()
  })

  it('stores and reads the current catalog', async () => {
    await saveCatalog(catalog('sha256-one', 'First'))
    const cached = await readCurrentCatalog()

    expect(cached.catalogVersion).toBe('sha256-one')
    expect(cached.music[0].title).toBe('First')
  })

  it('atomically switches the current pointer to a new version', async () => {
    await saveCatalog(catalog('sha256-one', 'First'))
    await saveCatalog(catalog('sha256-two', 'Second'))
    const cached = await readCurrentCatalog()

    expect(cached.catalogVersion).toBe('sha256-two')
    expect(cached.music[0].title).toBe('Second')
  })
})
