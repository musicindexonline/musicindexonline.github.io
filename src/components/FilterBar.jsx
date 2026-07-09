import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider
} from '@mui/material'

function FilterBar({
  composers,
  genres,
  periods,
  filters,
  onFilterChange,
  countText = '',
}) {
  const navigate = useNavigate()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleChange = (field) => (event) => {
    onFilterChange({ ...filters, [field]: event.target.value })
  }

  const clearFilters = () => {
    onFilterChange({ composer: '', genre: '', period: '' })
  }

  const activeFilterCount =
    (filters.composer ? 1 : 0) + (filters.genre ? 1 : 0) + (filters.period ? 1 : 0)
  const hasFilters = activeFilterCount > 0

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="h6" color="text.secondary" sx={{ flexShrink: 0, fontFamily: '"EB Garamond", serif', fontWeight: 500, fontSize: '1.05rem' }}>
        {countText}
      </Typography>

      <Box sx={{ flex: 1 }} />

      <Button
        variant="contained"
        color="primary"
        onClick={() => setDialogOpen(true)}
        startIcon={<span className={`mdi ${hasFilters ? 'mdi-filter' : 'mdi-filter-outline'}`} />}
        sx={{
          borderRadius: '6px',
          py: { xs: 0, sm: 0.8 },
          px: { xs: 0, sm: 1.5 },
          minWidth: { xs: 40, sm: 'auto' },
          width: { xs: 40, sm: 'auto' },
          height: { xs: 40, sm: 'auto' },
          fontFamily: '"EB Garamond", serif',
          fontSize: '0.95rem',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
          '& .MuiButton-startIcon': { mr: { xs: 0, sm: 0.5 }, ml: { xs: 0, sm: -0.25 } },
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
          Filter
          {hasFilters && (
            <Box
              component="span"
              sx={{
                ml: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20,
                bgcolor: (t) => t.palette.primary.contrastText,
                color: 'primary.main',
                borderRadius: '50%',
                fontSize: 11,
                lineHeight: 1,
              }}
            >
              {activeFilterCount}
            </Box>
          )}
        </Box>
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate('/settings')}
        startIcon={<span className="mdi mdi-cog-outline" />}
        sx={{
          borderRadius: '6px',
          py: { xs: 0, sm: 0.8 },
          px: { xs: 0, sm: 1.5 },
          minWidth: { xs: 40, sm: 'auto' },
          width: { xs: 40, sm: 'auto' },
          height: { xs: 40, sm: 'auto' },
          fontFamily: '"EB Garamond", serif',
          fontSize: '0.95rem',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          boxShadow: 'none',
          color: (t) => t.palette.primary.contrastText,
          '& .MuiButton-startIcon': {
            mr: { xs: 0, sm: 0.5 },
            ml: { xs: 0, sm: -0.25 },
            color: (t) => t.palette.primary.contrastText,
          },
          '& .MuiButton-icon': { color: (t) => t.palette.primary.contrastText },
          '&:hover': { boxShadow: 'none' },
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
          Settings
        </Box>
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="filter-dialog-title"
        sx={{
          backdropFilter: 'blur(8px)',
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(8px)',
          },
        }}
        PaperProps={{
          sx: {
            minWidth: 340,
            maxWidth: '90vw',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
          },
        }}
      >
        <DialogTitle
          id="filter-dialog-title"
          sx={{
            pb: 1,
            fontFamily: '"EB Garamond", serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box component="span">Filter</Box>
          <Button
            onClick={clearFilters}
            disabled={!hasFilters}
            color="primary"
            startIcon={<span className="mdi mdi-restore" style={{ fontSize: '1.1rem' }} />}
            sx={{
              fontFamily: '"EB Garamond", serif',
              textTransform: 'none',
              fontSize: '0.95rem',
              py: 0.5,
            }}
          >
            Reset
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2, flex: 1, overflowY: 'auto' }}>
          <Box sx={{ minWidth: 300 }}>
            <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
              <InputLabel id="composer-filter-label">Composer</InputLabel>
              <Select
                labelId="composer-filter-label"
                value={filters.composer}
                label="Composer"
                onChange={handleChange('composer')}
              >
                <MenuItem value="">All composers</MenuItem>
                {composers.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
              <InputLabel id="genre-filter-label">Genre</InputLabel>
              <Select
                labelId="genre-filter-label"
                value={filters.genre}
                label="Genre"
                onChange={handleChange('genre')}
              >
                <MenuItem value="">All genres</MenuItem>
                {genres.map((g) => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel id="period-filter-label">Period</InputLabel>
              <Select
                labelId="period-filter-label"
                value={filters.period}
                label="Period"
                onChange={handleChange('period')}
              >
                <MenuItem value="">All periods</MenuItem>
                {periods.map((p) => (
                  <MenuItem key={p} value={p}>{p}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ px: 2, py: 1.5 }}>
          <Button
            onClick={() => setDialogOpen(false)}
            variant="contained"
            color="primary"
            sx={{ fontFamily: '"EB Garamond", serif', textTransform: 'none', fontSize: '0.95rem', borderRadius: '6px', boxShadow: 'none' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default FilterBar