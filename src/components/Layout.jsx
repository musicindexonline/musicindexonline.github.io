import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Container, Box, TextField, InputAdornment, IconButton, Slide, Fade, useTheme, useMediaQuery } from '@mui/material'
import musicLogo from '../assets/icon.svg'

const searchInputSx = (theme) => ({
  width: '100%',
  maxWidth: '320px',
  '& .MuiOutlinedInput-root': {
    bgcolor: theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(255,255,255,0.20)',
    color: theme.palette.primary.contrastText,
    borderRadius: '9999px',
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.20)'
        : theme.palette.primary.contrastText + '55',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.40)'
        : theme.palette.primary.contrastText + 'BB',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.primary.contrastText,
    opacity: 1,
  },
})

function Layout({ children, searchTerm, onSearchChange }) {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isCompact = useMediaQuery(theme.breakpoints.down('md'))
  const isVeryCompact = useMediaQuery('(max-width:480px)')

  const [searchExpanded, setSearchExpanded] = useState(false)
  const [titleHidden, setTitleHidden] = useState(false)
  const [showSearchButton, setShowSearchButton] = useState(true)
  const [backButtonVisible, setBackButtonVisible] = useState(false)
  const searchInputRef = useRef(null)
  const animTimerRef = useRef(null)

  const showSearchInput = !!searchTerm || searchExpanded
  const onSettings = location.pathname === '/settings' || location.pathname === '/readme'

  useEffect(() => {
    setBackButtonVisible(onSettings)
  }, [onSettings])

  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchExpanded])

  useEffect(() => {
    return () => {
      if (animTimerRef.current) clearTimeout(animTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (searchTerm) {
      setShowSearchButton(false)
    }
  }, [searchTerm])

  const collapseSearch = () => {
    setSearchExpanded(false)
  }

  const handleSlideExited = () => {
    setShowSearchButton(true)
    setTitleHidden(false)
  }

  const handleSearchToggle = () => {
    if (showSearchInput) {
      if (searchTerm) onSearchChange('')
      collapseSearch()
    } else {
      setShowSearchButton(false)
      setTitleHidden(true)
      animTimerRef.current = setTimeout(() => {
        setSearchExpanded(true)
      }, 100)
    }
  }

  const handleSearchBlur = () => {
    if (!searchTerm) {
      collapseSearch()
    }
  }

  const showTitle = !isVeryCompact && (!isCompact || !showSearchInput) && !titleHidden

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="sticky" sx={{ top: 0, zIndex: 1100, bgcolor: theme.palette.mode === 'dark' ? '#9E6B47' : '#8C5D3E' }}>
        <Toolbar sx={{ overflow: 'hidden' }}>
          <Slide direction="right" in={backButtonVisible} mountOnEnter unmountOnExit timeout={250}>
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                flexShrink: 0,
                mr: 2,
                height: '40px',
                width: '40px',
                borderRadius: '9999px',
                bgcolor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(255,255,255,0.20)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.20)'
                  : theme.palette.primary.contrastText + '55',
                transition: 'border-color 200ms ease, background-color 200ms ease',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.15)'
                    : 'rgba(255,255,255,0.30)',
                  borderColor: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.40)'
                    : theme.palette.primary.contrastText + 'BB',
                },
              }}
            >
              <span
                className="mdi mdi-arrow-left"
                style={{ color: theme.palette.primary.contrastText, fontSize: '1.5rem' }}
              />
            </IconButton>
          </Slide>
          <Box
            sx={{
              mr: 2,
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
              transition: 'margin 250ms ease',
            }}
          >
            <img
              src={musicLogo}
              alt="Music Logo"
              onClick={handleLogoClick}
              style={{ width: '2.25rem', height: '2.25rem', display: 'block', cursor: 'pointer' }}
            />
          </Box>

          <Fade in={showTitle} unmountOnExit>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                fontFamily: '"Playfair Display", "EB Garamond", Georgia, serif',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: 'primary.contrastText',
              }}
            >
              Music Index Online
            </Typography>
          </Fade>

          {isCompact ? (
            <>
              <Slide direction="left" in={!onSettings} mountOnEnter unmountOnExit timeout={250}>
                <Box sx={{ display: 'flex', alignItems: 'center', flex: (showSearchInput || !showTitle) ? '1 1 auto' : '0 0 auto' }}>
                  {showSearchButton && (
                    <>
                      {!showTitle && <Box sx={{ flexGrow: 1 }} />}
                      <IconButton color="inherit" onClick={handleSearchToggle} sx={{ flexShrink: 0 }}>
                        <span
                          className="mdi mdi-magnify"
                          style={{ color: theme.palette.primary.contrastText, fontSize: '1.5rem' }}
                        />
                      </IconButton>
                    </>
                  )}
                  <Slide direction="left" in={showSearchInput} mountOnEnter unmountOnExit onExited={handleSlideExited}>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <TextField
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        size="small"
                        inputRef={searchInputRef}
                        onBlur={handleSearchBlur}
                        autoFocus
                        sx={searchInputSx(theme)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                size="small"
                                onClick={handleSearchToggle}
                                sx={{ color: theme.palette.primary.contrastText, p: 0.5 }}
                              >
                                <span className="mdi mdi-close" style={{ fontSize: '1.1rem' }} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Slide>
                  {showSearchInput && <Box sx={{ width: 40, flexShrink: 0 }} />}
                </Box>
              </Slide>
            </>
          ) : (
            <Slide direction="left" in={!onSettings} mountOnEnter unmountOnExit timeout={250}>
              <TextField
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                size="small"
                sx={{
                  width: { xs: '55%', sm: '40%', md: '320px' },
                  ...searchInputSx(theme),
                  flexShrink: 0,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span
                        className="mdi mdi-magnify"
                        style={{
                          color: theme.palette.primary.contrastText,
                          fontSize: '1.15rem',
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Slide>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ py: 3 }}>
        {children}
        <Box component="footer" sx={{ mt: 4, py: 3, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary">
            © 2026 BUG STUDIO
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Layout