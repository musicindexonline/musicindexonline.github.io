export function adaptCatalog(catalog) {
  if (!catalog || !Array.isArray(catalog.music)) {
    throw new Error('Catalog music must be an array')
  }
  if (!catalog.composerMap || typeof catalog.composerMap !== 'object') {
    throw new Error('Catalog composerMap must be an object')
  }

  const composerMap = {...catalog.composerMap}
  const data = catalog.music.map((work) => ({
    ...work,
    composerShort: composerMap[work.composer] || work.composer,
  }))

  return {
    data,
    composerMap,
    catalogVersion: catalog.catalogVersion,
    schemaVersion: catalog.schemaVersion,
  }
}
