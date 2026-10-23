import {describe, expect, it} from 'vitest'
import {adaptCatalog} from './catalogAdapter'

describe('catalog adapter', () => {
  it('adds the active composer short name without changing source data', () => {
    const source = {
      schemaVersion: '1.0.0',
      catalogVersion: 'sha256-test',
      music: [
        {
          composer: 'Antonio Vivaldi',
          title: 'Il Giustino',
          op: 'RV 717',
          genre: 'Opera',
          period: 'Baroque',
          movements: [],
        },
      ],
      composerMap: {'Antonio Vivaldi': 'Vivaldi'},
    }

    const adapted = adaptCatalog(source)
    expect(adapted.data[0].composerShort).toBe('Vivaldi')
    expect(source.music[0]).not.toHaveProperty('composerShort')
  })
})
