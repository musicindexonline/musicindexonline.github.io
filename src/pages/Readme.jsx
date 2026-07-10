import React, {useState, useCallback, useRef, useEffect} from 'react'
import {Box, Typography, Divider, Link, Collapse, Snackbar, IconButton, Tooltip, Fade, useMediaQuery} from '@mui/material'
import Layout from '../components/Layout'
import TextBrowser from '../components/TextBrowser'

const h1Sx = {
  fontFamily: '"Playfair Display", "EB Garamond", Georgia, serif',
  fontWeight: 700,
  mt: 3,
  mb: 1,
}

const h2Sx = {
  fontFamily: '"Playfair Display", "EB Garamond", Georgia, serif',
  fontWeight: 700,
  mt: 3,
  mb: 1,
}

const bodySx = {
  fontFamily: '"EB Garamond", Georgia, serif',
  lineHeight: 1.8,
  mb: 1,
}

const h3Sx = {
  fontFamily: '"Playfair Display", "EB Garamond", Georgia, serif',
  fontWeight: 600,
  mt: 2,
  mb: 1,
}

const linkSx = {
  fontFamily: '"EB Garamond", Georgia, serif',
  fontWeight: 600,
  wordBreak: 'break-all',
}

const tocItems = [
  { id: 'introduction', text: 'Introduction', level: 1 },
  { id: 'features', text: 'Features', level: 1 },
  { id: 'search-browse', text: 'Search & Browse', level: 2 },
  { id: 'copy-clipboard', text: 'Copy & Clipboard', level: 2 },
  { id: 'appearance-customization', text: 'Appearance & Customization', level: 2 },
  { id: 'navigation-interaction', text: 'Navigation & Interaction', level: 2 },
  { id: 'settings-support', text: 'Settings & Support', level: 2 },
  { id: 'feedback', text: 'Feedback', level: 1 },
  { id: 'license', text: 'License', level: 1 },
  { id: 'credits', text: 'Credits', level: 1 },
]

const mitLicense = `MIT License

Copyright (c) 2026 Music Index Online

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`

function Readme() {
  const [licenseOpen, setLicenseOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [tocOpen, setTocOpen] = useState(true)
  const [showTocContent, setShowTocContent] = useState(true)
  const isWideScreen = useMediaQuery('(min-width:1400px)')
  const snackbarTimerRef = useRef(null)
  const tocRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tocRef.current && !tocRef.current.contains(event.target)) {
        setTocOpen(false)
      }
    }
    if (tocOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [tocOpen])

  useEffect(() => {
    if (tocOpen) {
      const timer = setTimeout(() => setShowTocContent(true), 200)
      return () => clearTimeout(timer)
    } else {
      setShowTocContent(false)
    }
  }, [tocOpen])

  useEffect(() => {
    setTocOpen(isWideScreen)
  }, [isWideScreen])

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

  const handleTocClick = useCallback((event, id) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const appBarHeight = 64
      const rect = target.getBoundingClientRect()
      const scrollTop = window.pageYOffset + rect.top - appBarHeight
      window.scrollTo({ top: scrollTop, behavior: 'smooth' })
    }
  }, [])

  const tocBaseSx = {
    position: 'fixed',
    top: '100px',
    right: {
      xs: '8px',
      sm: '16px',
      md: '32px'
    },
    width: {
      xs: 'calc(100vw - 16px)',
      sm: '220px'
    },
    maxWidth: '220px',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
    p: 2,
    bgcolor: 'background.paper',
    boxShadow: 2,
    zIndex: 1000,
    maxHeight: 'calc(100vh - 140px)',
    overflowY: 'auto',
    transition: 'width 0.2s ease, height 0.2s ease, padding 0.2s ease',
    ...(!tocOpen && {
      width: '44px',
      height: '44px',
      p: 0,
      overflow: 'hidden',
      cursor: 'pointer',
    }),
  }

  return (
    <Layout>
      <Box sx={{mt: 2, mb: 4, maxWidth: '800px', mx: 'auto', userSelect: 'text', position: 'relative'}}>
        <Box ref={tocRef} sx={tocBaseSx}>
          <Fade in={showTocContent} unmountOnExit>
            <Box>
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1, mb: 1, borderBottom: 1, borderColor: 'divider'}}>
                <Typography variant="subtitle2" sx={{fontWeight: 700, fontFamily: '"Playfair Display", "EB Garamond", Georgia, serif', textAlign: 'left'}}>
                  Contents
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setTocOpen(false)}
                  sx={{width: 28, height: 28}}
                >
                  <span className="mdi mdi-chevron-right" style={{fontSize: '1.1rem'}} />
                </IconButton>
              </Box>
              {tocItems.map((item) => (
                <Box
                  key={item.id}
                  component="a"
                  href={`#${item.id}`}
                  onClick={(e) => handleTocClick(e, item.id)}
                  sx={{
                    display: 'block',
                    color: 'text.primary',
                    textDecoration: 'none',
                    py: 0.75,
                    px: 1,
                    pl: item.level === 2 ? 3 : 1,
                    borderRadius: 1,
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    cursor: 'pointer',
                    fontFamily: '"EB Garamond", Georgia, serif',
                    transition: 'background-color 150ms ease',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  {item.text}
                </Box>
              ))}
            </Box>
          </Fade>
          {!tocOpen && (
            <Tooltip title="Contents">
              <IconButton
                onClick={() => setTocOpen(true)}
                sx={{
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                }}
              >
                <span className="mdi mdi-format-list-bulleted" style={{fontSize: '1.3rem'}} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Typography variant="h4" sx={h1Sx}>
          Music Index Online
        </Typography>

        <Typography variant="body1" sx={{...bodySx, fontStyle: 'italic'}}>
          An open-source catalog of classical masterworks — search, browse and explore.
        </Typography>

        <Divider sx={{my: 2}}/>

        <Typography variant="h5" id="introduction" sx={h2Sx}>
          Introduction
        </Typography>

        <Typography variant="body1" sx={bodySx}>
          Music Index Online is a searchable, open-source catalog of classical music works. It indexes compositions by composer, title, opus number, genre, and period, with detailed movement listings — all presented through an elegant, distraction-free interface.
        </Typography>

        <Typography variant="body1" sx={bodySx}>
          Whether you're a performer checking a program, a listener discovering new repertoire, or a researcher cataloging works, Music Index Online makes it easy to find and copy the information you need.
        </Typography>

        <Typography variant="body1" sx={bodySx}>
          <strong>Website:</strong>{' '}
          <Link
            href="https://musicindexonline.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={linkSx}
          >
            https://musicindexonline.github.io/
          </Link>
        </Typography>

        <Typography variant="body1" sx={bodySx}>
          <strong>GitHub Repository:</strong>{' '}
          <Link
            href="https://github.com/musicindexonline/musicindexonline.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={linkSx}
          >
            https://github.com/musicindexonline/musicindexonline.github.io/
          </Link>
        </Typography>

        <Divider sx={{my: 2}}/>

        <Typography variant="h5" id="features" sx={h2Sx}>
          Features
        </Typography>

        <Typography variant="h6" id="search-browse" sx={h3Sx}>
          Search &amp; Browse
        </Typography>
        <Box component="ul" sx={{pl: 3, my: 1, '& li': {mb: 0.5}}}>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Full-text search</strong> — search across composers, titles, opus numbers, periods, and movements
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Multi-dimensional filtering</strong> — filter by composer, genre, and period simultaneously
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Detailed movement listings</strong> — every work includes its full movement structure
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Pagination</strong> — works are displayed in pages for easy navigation
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Expandable work cards</strong> — click to reveal/hide movement details
            </Typography>
          </li>
        </Box>

        <Typography variant="h6" id="copy-clipboard" sx={h3Sx}>
          Copy &amp; Clipboard
        </Typography>
        <Box component="ul" sx={{pl: 3, my: 1, '& li': {mb: 0.5}}}>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Click copy</strong> — tap titles, composer tags, genre tags, period tags, or movement titles to copy text to clipboard
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Diverse copy rules</strong> — customize what gets copied when you click:
            </Typography>
            <Box component="ul" sx={{pl: 3, my: 1, '& li': {mb: 0.5}, listStyleType: 'disc'}}>
              <li>
                <Typography variant="body1" sx={bodySx}>
                  <strong>Work title clicked:</strong> Work title / Composer &amp; Work title / Composer (Short) &amp; Work title
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={bodySx}>
                  <strong>Composer tag clicked:</strong> Composer / Composer (Short)
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={bodySx}>
                  <strong>Movement title clicked:</strong> Movement title / Work title &amp; Movement title / Composer, Work title &amp; Movement title / Composer (Short), Work title &amp; Movement title
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={bodySx}>
                  <strong>Copy button:</strong> Plain text / Cue code
                </Typography>
              </li>
            </Box>
          </li>
        </Box>

        <Typography variant="h6" id="appearance-customization" sx={h3Sx}>
          Appearance &amp; Customization
        </Typography>
        <Box component="ul" sx={{pl: 3, my: 1, '& li': {mb: 0.5}}}>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Dark &amp; light themes</strong> — automatically adapts to your system preference, with manual toggle
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Adjustable text size</strong> — scale text from 50% to 200% to suit your reading preference
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Works per page</strong> — set how many works display per page
            </Typography>
          </li>
        </Box>

        <Typography variant="h6" id="navigation-interaction" sx={h3Sx}>
          Navigation &amp; Interaction
        </Typography>
        <Box component="ul" sx={{pl: 3, my: 1, '& li': {mb: 0.5}}}>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Click logo to scroll top</strong> — tap the logo in the navigation bar to smoothly return to the top of the page
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Responsive design</strong> — works beautifully on desktop, tablet, and mobile devices
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Smooth animations</strong> — polished transitions for search expansion, filtering, and card interactions
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Back button</strong> — quickly return to the main catalog
            </Typography>
          </li>
        </Box>

        <Typography variant="h6" id="settings-support" sx={h3Sx}>
          Settings &amp; Support
        </Typography>
        <Box component="ul" sx={{pl: 3, my: 1, '& li': {mb: 0.5}}}>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Centralized settings page</strong> — manage all preferences in one place
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>README page</strong> — view project documentation within the website
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              <strong>Support the project</strong> — Like this project? Go to{' '}
              <Link
                href="https://musicindexonline.github.io/#/settings"
                underline="hover"
                sx={linkSx}
              >
                Settings &gt; Support
              </Link>
              {' to support ongoing development'}
            </Typography>
          </li>
        </Box>

        <Divider sx={{my: 2}}/>

        <Typography variant="h5" id="feedback" sx={h2Sx}>
          Feedback
        </Typography>

        <Typography variant="body1" sx={bodySx}>
          Found a bug, have a suggestion, or want to request a feature?{' '}
          Feel free to{' '}
          <Link
            href="https://github.com/musicindexonline/musicindexonline.github.io/issues"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={linkSx}
          >
            open an issue
          </Link>
          {' — all feedback is welcome.'}
        </Typography>

        <Divider sx={{my: 2}}/>

        <Typography variant="h5" id="license" sx={h2Sx}>
          License
        </Typography>

        <Typography variant="body1" sx={bodySx}>
          This project is open source and available under the{' '}
          <Link
            component="button"
            onClick={() => setLicenseOpen(!licenseOpen)}
            underline="hover"
            sx={linkSx}
          >
            MIT License
          </Link>
          .
        </Typography>

        <Collapse in={licenseOpen}>
          <TextBrowser
            title="MIT License"
            content={mitLicense}
            onClose={() => setLicenseOpen(false)}
            onCopyText={showCopied}
          />
        </Collapse>

        <Divider sx={{my: 2}}/>

        <Typography variant="h5" id="credits" sx={h2Sx}>
          Credits
        </Typography>

        <Box component="ul" sx={{pl: 3, my: 1, '& li': {mb: 0.5}}}>
          <li>
            <Typography variant="body1" sx={bodySx}>
              Built with{' '}
              <Link href="https://react.dev" target="_blank" rel="noopener noreferrer" underline="hover"
                    sx={linkSx}>React</Link>
              {', '}
              <Link href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" underline="hover"
                    sx={linkSx}>Vite</Link>
              {', and '}
              <Link href="https://mui.com" target="_blank" rel="noopener noreferrer" underline="hover"
                    sx={linkSx}>MUI</Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              Typography by{' '}
              <Link href="https://fonts.google.com/specimen/Playfair+Display" target="_blank" rel="noopener noreferrer"
                    underline="hover" sx={linkSx}>Playfair Display</Link>
              {', '}
              <Link href="https://fonts.google.com/specimen/EB+Garamond" target="_blank" rel="noopener noreferrer"
                    underline="hover" sx={linkSx}>EB Garamond</Link>
              {', and '}
              <Link href="https://fonts.google.com/specimen/Source+Sans+3" target="_blank" rel="noopener noreferrer"
                    underline="hover" sx={linkSx}>Source Sans 3</Link>
              {' via Google Fonts'}
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              Icons by{' '}
              <Link href="https://pictogrammers.com/library/mdi/" target="_blank" rel="noopener noreferrer"
                    underline="hover" sx={linkSx}>Material Design Icons</Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={bodySx}>
              Hosted by{' '}
              <Link href="https://pages.github.com" target="_blank" rel="noopener noreferrer" underline="hover"
                    sx={linkSx}>GitHub Pages</Link>
            </Typography>
          </li>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        onClose={(event, reason) => {
          if (reason === 'clickaway') return
          if (snackbarTimerRef.current) {
            clearTimeout(snackbarTimerRef.current)
            snackbarTimerRef.current = null
          }
          setSnackbarOpen(false)
        }}
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

export default Readme