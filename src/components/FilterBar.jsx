import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Menu,
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
  onToggleTheme,
  themeMode,
}) {
  const [menuAnchor, setMenuAnchor] = useState(null)
  const isDark = themeMode === 'dark'

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
        onClick={(e) => setMenuAnchor(e.currentTarget)}
        startIcon={<span className="mdi mdi-filter-menu" />}
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
        onClick={onToggleTheme}
        startIcon={<span className={`mdi ${isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'}`} />}
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
          {isDark ? 'Light' : 'Dark'}
        </Box>
      </Button>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        PaperProps={{ sx: { minWidth: 280, p: 1 } }}
        MenuListProps={{ dense: true }}
      >
        <Box sx={{ px: 1, pb: 1 }}>
          <FormControl fullWidth size="small" sx={{ mb: 1 }}>
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
          <FormControl fullWidth size="small" sx={{ mb: 1 }}>
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

        {hasFilters && (
          <>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={clearFilters}
              sx={{ justifyContent: 'center', color: 'primary.main', gap: 1 }}
            >
              <span className="mdi mdi-restore" style={{ fontSize: '1.1rem' }} />
              Reset filter
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  )
}

export default FilterBar