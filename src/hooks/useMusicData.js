import {useEffect, useMemo, useState} from 'react'
import {adaptCatalog} from '../data/catalogAdapter'
import {readCurrentCatalog} from '../data/indexedDb'
import {synchronizeCatalog} from '../data/catalogSync'

const emptyCatalog = {
  data: [],
  composerMap: {},
  catalogVersion: null,
  schemaVersion: null,
}

let refreshPromise

async function refreshCatalog(currentCatalog) {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const result = await synchronizeCatalog(currentCatalog)
      return result.updated ? result.catalog : null
    })().finally(() => {
      refreshPromise = undefined
    })
  }

  return refreshPromise
}

function requestPersistentStorage() {
  try {
    navigator.storage?.persist?.().catch(() => {})
  } catch {
    // Persistent storage is optional.
  }
}

export default function useMusicData() {
  const [state, setState] = useState({
    catalog: null,
    source: 'none',
    loading: true,
    error: null,
    syncError: null,
  })

  useEffect(() => {
    let active = true

    async function load() {
      let cachedCatalog = null

      try {
        const cached = await readCurrentCatalog()
        if (cached) {
          cachedCatalog = cached
        }
      } catch (error) {
        console.warn('Unable to read catalog cache:', error)
      }

      if (!active) return
      setState({
        catalog: cachedCatalog,
        source: cachedCatalog ? 'cache' : 'none',
        loading: !cachedCatalog,
        error: null,
        syncError: null,
      })
      requestPersistentStorage()

      try {
        const updated = await refreshCatalog(cachedCatalog)
        if (updated && active) {
          setState({
            catalog: updated,
            source: 'remote',
            loading: false,
            error: null,
            syncError: null,
          })
        }
      } catch (error) {
        if (active) {
          if (cachedCatalog) {
            setState((current) => ({...current, syncError: error}))
          } else {
            setState({
              catalog: null,
              source: 'none',
              loading: false,
              error,
              syncError: null,
            })
          }
        }
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  const adapted = useMemo(
    () => state.catalog ? adaptCatalog(state.catalog) : emptyCatalog,
    [state.catalog],
  )

  return {
    data: adapted.data,
    composerMap: adapted.composerMap,
    catalogVersion: adapted.catalogVersion,
    schemaVersion: adapted.schemaVersion,
    source: state.source,
    hasCatalog: Boolean(state.catalog),
    loading: state.loading,
    error: state.error,
    syncError: state.syncError,
  }
}
