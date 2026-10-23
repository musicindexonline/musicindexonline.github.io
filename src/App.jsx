import React, {useState, useMemo, useCallback, useRef, useEffect} from 'react'
import {Box, CircularProgress, Paper, Snackbar, Typography} from '@mui/material'
import Layout from './components/Layout'
import FilterBar from './components/FilterBar'
import WorkList from './components/WorkList'
import useMusicData from './hooks/useMusicData'
import {filterWorks} from './utils/search'

function getComposerShort(composer, composerMap) {
  return composerMap[composer] || composer
}

function App({onToggleTheme, themeMode, clickCopyEnabled, clickCopyRules, itemsPerPage = 20}) {
  const {data, composerMap, catalogVersion, loading, error, hasCatalog} = useMusicData()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({composer: [], genre: [], period: []})
  const [page, setPage] = useState(1)

  const filteredData = useMemo(
    () => filterWorks(data, searchTerm, filters, composerMap),
    [data, searchTerm, filters, composerMap],
  )

  const filterOptions = useMemo(() => ({
    composers: [...new Set(Object.values(composerMap))].sort(),
    genres: [...new Set(data.filter(w => w.genre).map(w => w.genre))].sort(),
    periods: [...new Set(data.filter(w => w.period).map(w => w.period))].sort(),
  }), [data, composerMap])

  React.useEffect(() => {
    setPage(1)
  }, [searchTerm, filters])

  React.useEffect(() => {
    setPage(1)
    setFilters((current) => ({
      composer: current.composer.filter(value => filterOptions.composers.includes(value)),
      genre: current.genre.filter(value => filterOptions.genres.includes(value)),
      period: current.period.filter(value => filterOptions.periods.includes(value)),
    }))
  }, [catalogVersion])

  const total = filteredData.length
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, total)
  const countText = total > 0 ? `${startIndex + 1}-${endIndex} of ${total} works` : `${total} works`

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const snackbarTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (snackbarTimerRef.current) {
        clearTimeout(snackbarTimerRef.current)
      }
    }
  }, [])

  const showCopied = useCallback(() => {
    if (snackbarTimerRef.current) {
      clearTimeout(snackbarTimerRef.current)
    }
    setSnackbarOpen(true)
    snackbarTimerRef.current = setTimeout(() => {
      setSnackbarOpen(false)
      snackbarTimerRef.current = null
    }, 1500)
  }, [])

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return
    if (snackbarTimerRef.current) {
      clearTimeout(snackbarTimerRef.current)
      snackbarTimerRef.current = null
    }
    setSnackbarOpen(false)
  }

  const buildCopyText = useCallback((rule, context) => {
    if (!rule || !context) return ''
    const {work, movement} = context
    const composerShort = getComposerShort(work.composer, composerMap)

    const keywordMap = {
      workTitle: work.title,
      composer: work.composer,
      composerShort: composerShort,
      movementTitle: movement,
    }

    const ruleToKeywords = {
      workTitle: ['workTitle'],
      composerWorkTitle: ['composer', 'workTitle'],
      composerShortWorkTitle: ['composerShort', 'workTitle'],
      composer: ['composer'],
      composerShort: ['composerShort'],
      movementTitle: ['movementTitle'],
      workTitleMovementTitle: ['workTitle', 'movementTitle'],
      composerWorkTitleMovementTitle: ['composer', 'workTitle', 'movementTitle'],
      composerShortWorkTitleMovementTitle: ['composerShort', 'workTitle', 'movementTitle'],
    }

    const keywords = ruleToKeywords[rule] || []
    const parts = keywords
      .map((k) => keywordMap[k])
      .filter((v) => v !== undefined && v !== null && v !== '')
    return parts.join(': ')
  }, [composerMap])

  return (
    <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
      <Paper elevation={0} sx={{
        mt: -3,
        mb: 2,
        pt: 3,
        pb: 2,
        border: 0,
        borderRadius: 0,
        position: 'sticky',
        top: {xs: '56px', sm: '64px'},
        zIndex: 1000,
        bgcolor: 'transparent',
        backdropFilter: 'saturate(1.5) blur(14px)',
        WebkitBackdropFilter: 'saturate(1.5) blur(14px)'
      }}>
        <FilterBar
          composers={filterOptions.composers}
          genres={filterOptions.genres}
          periods={filterOptions.periods}
          filters={filters}
          onFilterChange={setFilters}
          countText={countText}
        />
      </Paper>

      {loading ? (
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
          <CircularProgress/>
        </Box>
      ) : !hasCatalog ? (
        <Box sx={{textAlign: 'center', mt: 6, py: 4}}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No catalog data available
          </Typography>
          {error?.message && (
            <Typography variant="body2" color="text.secondary">
              {error.message}
            </Typography>
          )}
        </Box>
      ) : (
        <WorkList
          data={data}
          searchTerm={searchTerm}
          filters={filters}
          page={page}
          onPageChange={setPage}
          itemsPerPage={itemsPerPage}
          onCopyText={showCopied}
          clickCopyEnabled={clickCopyEnabled}
          clickCopyRules={clickCopyRules}
          buildCopyText={buildCopyText}
          composerMap={composerMap}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: 'success.main',
            color: 'success.contrastText',
            px: 2,
            py: 1,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Box component="span" className="mdi mdi-check-circle-outline"
               sx={{fontSize: '1.25rem', lineHeight: 1}}/>
          <Typography variant="body2" sx={{fontWeight: 500}}>Copied</Typography>
        </Box>
      </Snackbar>
    </Layout>
  )
}

export default App
