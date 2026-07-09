import React from 'react'
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Divider,
    ToggleButton,
    ToggleButtonGroup,
    Slider,
} from '@mui/material'
import Layout from '../components/Layout'

function Settings({ themeMode, onSetThemeMode, fontSizeScale, onSetFontSizeScale }) {
    const handleThemeChange = (event, next) => {
        if (next && onSetThemeMode) {
            onSetThemeMode(next)
        }
    }

    const handleFontSizeChange = (event, newValue) => {
        if (onSetFontSizeScale) {
            onSetFontSizeScale(newValue)
        }
    }

    return (
        <Layout>
            <Box sx={{ mt: 2, mb: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontFamily: '"Playfair Display", "EB Garamond", Georgia, serif',
                        fontWeight: 700,
                        mb: 3,
                    }}
                >
                    Settings
                </Typography>

                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 2,
                        border: 1,
                        borderColor: 'divider',
                        mb: 3,
                        overflow: 'hidden',
                    }}
                >
                    <CardHeader
                        title={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <span
                    className="mdi mdi-palette-outline"
                    style={{ fontSize: '1.5rem' }}
                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: '"EB Garamond", serif',
                                        fontWeight: 600,
                                    }}
                                >
                                    Appearance
                                </Typography>
                            </Box>
                        }
                        sx={{ pb: 1 }}
                    />
                    <Divider />
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 2,
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontFamily: '"EB Garamond", Georgia, serif',
                                    fontWeight: 600,
                                    fontSize: '1.15rem',
                                    flexShrink: 0,
                                }}
                            >
                                Theme mode
                            </Typography>
                            <ToggleButtonGroup
                                value={themeMode}
                                exclusive
                                onChange={handleThemeChange}
                                aria-label="theme mode"
                                size="small"
                            >
                                <ToggleButton value="light" aria-label="light mode">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
                                        <span className="mdi mdi-weather-sunny" />
                                        <Typography
                                            sx={{
                                                fontFamily: '"EB Garamond", serif',
                                                textTransform: 'none',
                                                fontSize: '0.95rem',
                                            }}
                                        >
                                            Light
                                        </Typography>
                                    </Box>
                                </ToggleButton>
                                <ToggleButton value="dark" aria-label="dark mode">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
                                        <span className="mdi mdi-weather-night" />
                                        <Typography
                                            sx={{
                                                fontFamily: '"EB Garamond", serif',
                                                textTransform: 'none',
                                                fontSize: '0.95rem',
                                            }}
                                        >
                                            Dark
                                        </Typography>
                                    </Box>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontFamily: '"EB Garamond", Georgia, serif',
                                        fontWeight: 600,
                                        fontSize: '1.15rem',
                                        flexShrink: 0,
                                    }}
                                >
                                    Text size
                                </Typography>
                                <Box sx={{ minWidth: 180 }}>
                                    <Slider
                                        value={fontSizeScale}
                                        onChange={handleFontSizeChange}
                                        min={0.5}
                                        max={2.0}
                                        step={0.05}
                                        aria-label="text size"
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Layout>
    )
}

export default Settings