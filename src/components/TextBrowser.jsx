import React, { useState, useRef, useCallback } from 'react'
import { Box, Paper, Typography, IconButton } from '@mui/material'

function TextBrowser({ title, content, onClose }) {
    const [copied, setCopied] = useState(false)
    const timerRef = useRef(null)

    const handleCopy = useCallback(async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(content)
            } else {
                const textarea = document.createElement('textarea')
                textarea.value = content
                textarea.style.position = 'fixed'
                textarea.style.opacity = '0'
                document.body.appendChild(textarea)
                textarea.select()
                document.execCommand('copy')
                document.body.removeChild(textarea)
            }
            setCopied(true)
            if (timerRef.current) clearTimeout(timerRef.current)
            timerRef.current = setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }, [content])

    return (
        <Paper
            variant="outlined"
            sx={{
                mt: 2,
                mb: 2,
                borderRadius: 2,
                overflow: 'hidden',
                borderColor: 'divider',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2,
                    py: 1,
                    bgcolor: 'action.hover',
                    borderBottom: 1,
                    borderColor: 'divider',
                    userSelect: 'none',
                }}
            >
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontFamily: '"EB Garamond", Georgia, serif',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                    }}
                >
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <IconButton size="small" onClick={handleCopy}>
                        <span
                            className={`mdi ${copied ? 'mdi-check' : 'mdi-content-copy'}`}
                            style={{ fontSize: '1.1rem' }}
                        />
                    </IconButton>
                    {onClose && (
                        <IconButton size="small" onClick={onClose}>
                            <span className="mdi mdi-close" style={{ fontSize: '1.1rem' }} />
                        </IconButton>
                    )}
                </Box>
            </Box>
            <Box
                sx={{
                    p: 2,
                    maxHeight: 320,
                    overflow: 'auto',
                    fontFamily: '"EB Garamond", Georgia, serif',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    userSelect: 'text',
                }}
            >
                {content}
            </Box>
        </Paper>
    )
}

export default TextBrowser