import {describe, expect, it} from 'vitest'
import {filterWorks} from './search'

const composerMap = {
  'Antonio Vivaldi': 'Vivaldi',
  'Johann Sebastian Bach': 'Bach',
}

const works = [
  {
    composer: 'Johann Sebastian Bach',
    composerShort: 'Bach',
    title: 'Cantata',
    op: 'BWV 1',
    genre: 'Cantata',
    period: 'Baroque',
    movements: [],
  },
  {
    composer: 'Antonio Vivaldi',
    composerShort: 'Vivaldi',
    title: 'Concerto',
    op: 'RV 1',
    genre: 'Concerto',
    period: 'Baroque',
    movements: [],
  },
]

describe('catalog search', () => {
  it('sorts through the active composer map', () => {
    const result = filterWorks(works, '', {composer: [], genre: [], period: []}, composerMap)
    expect(result.map((work) => work.composerShort)).toEqual(['Vivaldi', 'Bach'])
  })

  it('filters composers through the active composer map', () => {
    const result = filterWorks(
      works,
      '',
      {composer: ['Bach'], genre: [], period: []},
      composerMap,
    )
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Cantata')
  })
})
