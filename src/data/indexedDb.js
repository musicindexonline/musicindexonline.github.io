const DATABASE_NAME = 'music-catalog'
const DATABASE_VERSION = 1
const META_STORE = 'catalog-meta'
const VERSION_STORE = 'catalog-versions'

let databasePromise

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function transactionResult(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
    transaction.onabort = () => reject(transaction.error || new Error('IndexedDB transaction aborted'))
  })
}

export function openCatalogDatabase() {
  if (databasePromise) return databasePromise

  databasePromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is not available'))
      return
    }

    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION)
    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(META_STORE)) {
        database.createObjectStore(META_STORE, {keyPath: 'id'})
      }
      if (!database.objectStoreNames.contains(VERSION_STORE)) {
        database.createObjectStore(VERSION_STORE, {keyPath: 'catalogVersion'})
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
    request.onblocked = () => reject(new Error('IndexedDB upgrade is blocked'))
  })

  databasePromise.catch(() => {
    databasePromise = undefined
  })
  return databasePromise
}

export async function readCurrentCatalog() {
  const database = await openCatalogDatabase()
  const transaction = database.transaction([META_STORE, VERSION_STORE], 'readonly')
  const metaRequest = transaction.objectStore(META_STORE).get('current')
  const meta = await requestResult(metaRequest)
  if (!meta) return null

  const catalog = await requestResult(
    transaction.objectStore(VERSION_STORE).get(meta.catalogVersion),
  )
  return catalog || null
}

export async function saveCatalog(catalog) {
  const database = await openCatalogDatabase()
  const transaction = database.transaction([META_STORE, VERSION_STORE], 'readwrite')
  const versionStore = transaction.objectStore(VERSION_STORE)
  const metaStore = transaction.objectStore(META_STORE)

  versionStore.put({
    schemaVersion: catalog.schemaVersion,
    catalogVersion: catalog.catalogVersion,
    publishedAt: catalog.publishedAt || null,
    music: catalog.music,
    composerMap: catalog.composerMap,
    downloadedAt: new Date().toISOString(),
  })
  metaStore.put({
    id: 'current',
    schemaVersion: catalog.schemaVersion,
    catalogVersion: catalog.catalogVersion,
  })

  await transactionResult(transaction)
  await pruneOldVersions(catalog.catalogVersion)
}

async function pruneOldVersions(currentVersion) {
  try {
    const database = await openCatalogDatabase()
    const readTransaction = database.transaction(VERSION_STORE, 'readonly')
    const versions = await requestResult(readTransaction.objectStore(VERSION_STORE).getAll())
    const versionsToKeep = new Set(
      versions
        .sort((a, b) => String(b.downloadedAt).localeCompare(String(a.downloadedAt)))
        .slice(0, 2)
        .map((version) => version.catalogVersion),
    )
    versionsToKeep.add(currentVersion)

    const deleteTransaction = database.transaction(VERSION_STORE, 'readwrite')
    const store = deleteTransaction.objectStore(VERSION_STORE)
    for (const version of versions) {
      if (!versionsToKeep.has(version.catalogVersion)) {
        store.delete(version.catalogVersion)
      }
    }
    await transactionResult(deleteTransaction)
  } catch {
    // Pruning is best-effort and must not affect a successfully saved catalog.
  }
}

export async function deleteCatalogDatabase() {
  if (databasePromise) {
    const database = await databasePromise.catch(() => null)
    database?.close()
  }
  databasePromise = undefined

  if (typeof indexedDB === 'undefined') return
  await new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DATABASE_NAME)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
    request.onblocked = () => reject(new Error('IndexedDB deletion is blocked'))
  })
}

export {DATABASE_NAME, META_STORE, VERSION_STORE}
