import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import Settings from './pages/Settings'
import Readme from './pages/Readme'
import { lightTheme, darkTheme } from './theme'
import useTheme from './hooks/useTheme'
import '@mdi/font/css/materialdesignicons.min.css'
import './App.css'

function Root() {
  const { mode, toggleMode, setMode, fontSizeScale, setFontSizeScale, clickCopyEnabled, setClickCopyEnabled } = useTheme()
  const theme = mode === 'dark' ? darkTheme : lightTheme
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={<App onToggleTheme={toggleMode} themeMode={mode} clickCopyEnabled={clickCopyEnabled} />} />
          <Route
            path="/settings"
            element={<Settings themeMode={mode} onSetThemeMode={setMode} fontSizeScale={fontSizeScale} onSetFontSizeScale={setFontSizeScale} clickCopyEnabled={clickCopyEnabled} onSetClickCopyEnabled={setClickCopyEnabled} />}
          />
          <Route path="/readme" element={<Readme />} />
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