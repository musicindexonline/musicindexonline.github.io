import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import Settings from './pages/Settings'
import { lightTheme, darkTheme } from './theme'
import useTheme from './hooks/useTheme'
import '@mdi/font/css/materialdesignicons.min.css'
import './App.css'

function Root() {
  const { mode, toggleMode, setMode } = useTheme()
  const theme = mode === 'dark' ? darkTheme : lightTheme
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={<App onToggleTheme={toggleMode} themeMode={mode} />} />
          <Route
            path="/settings"
            element={<Settings themeMode={mode} onSetThemeMode={setMode} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)