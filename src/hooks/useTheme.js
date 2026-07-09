import { useState, useEffect, useCallback } from 'react'

export default function useTheme() {
    const getInitialMode = () => {
        try {
            const saved = localStorage.getItem('siteTheme')
            if (saved === 'light' || saved === 'dark') return saved
        } catch (e) {}
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        return 'light'
    }

    const [mode, setMode] = useState(getInitialMode)

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', mode)
        }
    }, [mode])

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = (e) => {
            try {
                if (!localStorage.getItem('siteTheme')) {
                    setMode(e.matches ? 'dark' : 'light')
                }
            } catch (err) {
                setMode(e.matches ? 'dark' : 'light')
            }
        }
        if (media.addEventListener) {
            media.addEventListener('change', handler)
            return () => media.removeEventListener('change', handler)
        } else {
            media.addListener(handler)
            return () => media.removeListener(handler)
        }
    }, [])

    const setThemeMode = useCallback((next) => {
        if (next !== 'light' && next !== 'dark') return
        try {
            localStorage.setItem('siteTheme', next)
        } catch (e) {}
        setMode(next)
    }, [])

    const toggleMode = useCallback(() => {
        setMode((prev) => {
            const next = prev === 'dark' ? 'light' : 'dark'
            try {
                localStorage.setItem('siteTheme', next)
            } catch (e) {}
            return next
        })
    }, [])

    return { mode, toggleMode, setMode: setThemeMode }
}