import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { Box, CircularProgress, Alert, Paper, Snackbar, Typography } from '@mui/material'
import Layout from './components/Layout'
import FilterBar from './components/FilterBar'
import WorkList from './components/WorkList'
import useMusicData, { composerMap } from './hooks/useMusicData'
import { filterWorks } from './utils/search'

function getComposerShort(composer) {
  return composerMap[composer] || composer
}

const ITEMS_PER_PAGE = 20

function App({ onToggleTheme, themeMode, clickCopyEnabled }) {
  const { data, loading, error } = useMusicData()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ composer: [], genre: [], period: [] })
  const [page, setPage] = useState(1)

  const filteredData = useMemo(() => filterWorks(data, searchTerm, filters), [data, searchTerm, filters])

  React.useEffect(() => {
    setPage(1)
  }, [searchTerm, filters])

  const total = filteredData.length
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, total)
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

  const allComposers = [...new Set(data.map(w => getComposerShort(w.composer)))].sort()
  const allGenres = [...new Set(data.filter(w => w.genre).map(w => w.genre))].sort()
  const allPeriods = [...new Set(data.filter(w => w.period).map(w => w.period))].sort()

  return (
    <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
      <Paper elevation={0} sx={{ mt: -3, mb: 2, pt: 3, pb: 2, border: 0, borderRadius: 0, position: 'sticky', top: { xs: '56px', sm: '64px' }, zIndex: 1000, bgcolor: 'transparent', backdropFilter: 'saturate(1.5) blur(14px)', WebkitBackdropFilter: 'saturate(1.5) blur(14px)' }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2, mt: 1 }}>
            Failed to load data: {error.message}
          </Alert>
        )}

        <FilterBar
          composers={allComposers}
          genres={allGenres}
          periods={allPeriods}
          filters={filters}
          onFilterChange={setFilters}
          countText={countText}
        />
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <WorkList
          data={data}
          searchTerm={searchTerm}
          filters={filters}
          page={page}
          onPageChange={setPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onCopyText={showCopied}
          clickCopyEnabled={clickCopyEnabled}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
          <Box component="span" className="mdi mdi-check-circle-outline" sx={{ fontSize: '1.25rem', lineHeight: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>Copied</Typography>
        </Box>
      </Snackbar>
    </Layout>
  )
}

export default App