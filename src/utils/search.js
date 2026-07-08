import composerMap from '../data/composerMap.json'

function getComposerShort(composer) {
  return composerMap[composer] || composer
}

function cleanSearchText(text) {
  return text.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function getMatchScore(work, keywords) {
  const searchableFields = [
    work.composer,
    getComposerShort(work.composer),
    work.title,
    work.op,
    work.period,
    ...(work.movements || [])
  ]
    .filter(Boolean)
    .map(f => f.toLowerCase())

  let score = 0
  for (const kw of keywords) {
    if (searchableFields.some(field => field.includes(kw))) {
      score++
    }
  }
  return score
}

export function filterWorks(data, searchTerm, filters) {
  let result = data

  if (searchTerm.trim()) {
    const cleaned = cleanSearchText(searchTerm)
    const keywords = cleaned.toLowerCase().split(/\s+/).filter(Boolean)

    if (keywords.length > 0) {
      result = result
        .map(work => ({ work, score: getMatchScore(work, keywords) }))
        .filter(entry => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(entry => entry.work)
    }
  }

  if (filters.composer) {
    result = result.filter(work => getComposerShort(work.composer) === filters.composer)
  }

  if (filters.genre) {
    result = result.filter(work => work.genre === filters.genre)
  }

  if (filters.period) {
    result = result.filter(work => work.period === filters.period)
  }

  return result
}

export function getAllComposers(data) {
  return [...new Set(data.map(w => getComposerShort(w.composer)))].sort()
}

export function getAllGenres(data) {
  return [...new Set(data.filter(w => w.genre).map(w => w.genre))].sort()
}

export function getAllPeriods(data) {
  return [...new Set(data.filter(w => w.period).map(w => w.period))].sort()
}