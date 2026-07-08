import musicData from '../data/music.json'
import composerMap from '../data/composerMap.json'

const data = (musicData || []).map(work => ({
  ...work,
  composerShort: composerMap[work.composer] || work.composer,
}))

export { composerMap }

export default function useMusicData() {
  return { data, loading: false, error: null }
}