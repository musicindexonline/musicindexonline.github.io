import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Divider,
    ToggleButton,
    ToggleButtonGroup,
    Select,
    MenuItem,
    FormControl,
    Switch,
    Button,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import Layout from '../components/Layout'
import musicLogo from '../assets/icon.svg'

function Settings({ themeMode, onSetThemeMode, fontSizeScale, onSetFontSizeScale, clickCopyEnabled, onSetClickCopyEnabled, itemsPerPage, onSetItemsPerPage }) {
    const navigate = useNavigate()
    const theme = useTheme()
    const isCompact = useMediaQuery('(max-width:480px)')
    const handleThemeChange = (event, next) => {
        if (next && onSetThemeMode) {
            onSetThemeMode(next)
        }
    }

    const fontSizeOptions = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]

    const handleFontSizeChange = (event) => {
        if (onSetFontSizeScale) {
            onSetFontSizeScale(event.target.value)
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
                                <ToggleButton
                                    value="light"
                                    aria-label="light mode"
                                    sx={isCompact ? { minWidth: 40, minHeight: 40, p: 0 } : {}}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: isCompact ? 0.5 : 1 }}>
                                        <span className="mdi mdi-weather-sunny" />
                                        {!isCompact && (
                                            <Typography
                                                sx={{
                                                    fontFamily: '"EB Garamond", serif',
                                                    textTransform: 'none',
                                                    fontSize: '0.95rem',
                                                }}
                                            >
                                                Light
                                            </Typography>
                                        )}
                                    </Box>
                                </ToggleButton>
                                <ToggleButton
                                    value="dark"
                                    aria-label="dark mode"
                                    sx={isCompact ? { minWidth: 40, minHeight: 40, p: 0 } : {}}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: isCompact ? 0.5 : 1 }}>
                                        <span className="mdi mdi-weather-night" />
                                        {!isCompact && (
                                            <Typography
                                                sx={{
                                                    fontFamily: '"EB Garamond", serif',
                                                    textTransform: 'none',
                                                    fontSize: '0.95rem',
                                                }}
                                            >
                                                Dark
                                            </Typography>
                                        )}
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
                                <FormControl size="small" sx={{ minWidth: isCompact ? 90 : 180 }}>
                                    <Select
                                        value={fontSizeScale}
                                        onChange={handleFontSizeChange}
                                        aria-label="text size"
                                    >
                                        {fontSizeOptions.map((val) => (
                                            <MenuItem key={val} value={val}>
                                                {Math.round(val * 100)}%
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

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
                    className="mdi mdi-tune-variant"
                    style={{ fontSize: '1.5rem' }}
                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: '"EB Garamond", serif',
                                        fontWeight: 600,
                                    }}
                                >
                                    Features
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
                            <Box sx={{ minWidth: 0 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontFamily: '"EB Garamond", Georgia, serif',
                                        fontWeight: 600,
                                        fontSize: '1.15rem',
                                    }}
                                >
                                    Click copy
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontFamily: '"EB Garamond", Georgia, serif', mt: 0.5 }}
                                >
                                    Tap title or tags to copy text
                                </Typography>
                            </Box>
                            <Switch
                                checked={clickCopyEnabled}
                                onChange={(event) => {
                                    if (onSetClickCopyEnabled) {
                                        onSetClickCopyEnabled(event.target.checked)
                                    }
                                }}
                                aria-label="click copy"
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 2,
                                mt: 3,
                            }}
                        >
                            <Box sx={{ minWidth: 0 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontFamily: '"EB Garamond", Georgia, serif',
                                        fontWeight: 600,
                                        fontSize: '1.15rem',
                                    }}
                                >
                                    Works per page
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontFamily: '"EB Garamond", Georgia, serif', mt: 0.5 }}
                                >
                                    Number of works displayed per page
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                    height: 46,
                                }}
                            >
                                <IconButton
                                    onClick={() => {
                                        if (onSetItemsPerPage && itemsPerPage > 5) {
                                            onSetItemsPerPage(itemsPerPage - 5)
                                        }
                                    }}
                                    disabled={itemsPerPage <= 5}
                                    size="small"
                                    sx={{
                                        borderRadius: 0,
                                        borderRight: 1,
                                        borderColor: 'divider',
                                        '&:hover': { bgcolor: 'action.hover' },
                                        height: '100%',
                                        width: 46,
                                    }}
                                >
                                    <span className="mdi mdi-minus" style={{ fontSize: '1rem' }} />
                                </IconButton>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        px: 1.5,
                                        minWidth: 36,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: '"EB Garamond", Georgia, serif',
                                            fontSize: '0.95rem',
                                            fontWeight: 600,
                                            lineHeight: 1,
                                        }}
                                    >
                                        {itemsPerPage}
                                    </Typography>
                                </Box>
                                <IconButton
                                    onClick={() => {
                                        if (onSetItemsPerPage && itemsPerPage < 100) {
                                            onSetItemsPerPage(itemsPerPage + 5)
                                        }
                                    }}
                                    disabled={itemsPerPage >= 100}
                                    size="small"
                                    sx={{
                                        borderRadius: 0,
                                        borderLeft: 1,
                                        borderColor: 'divider',
                                        '&:hover': { bgcolor: 'action.hover' },
                                        height: '100%',
                                        width: 46,
                                    }}
                                >
                                    <span className="mdi mdi-plus" style={{ fontSize: '1rem' }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

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
                    className="mdi mdi-information-outline"
                    style={{ fontSize: '1.5rem' }}
                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: '"EB Garamond", serif',
                                        fontWeight: 600,
                                    }}
                                >
                                    About
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
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0 }}>
                                <Box
                                    component="img"
                                    src={musicLogo}
                                    alt="Music Index Online"
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        flexShrink: 0,
                                        filter: theme.palette.mode === 'light' ? 'invert(1)' : 'none',
                                    }}
                                />
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontFamily: '"Playfair Display", "EB Garamond", Georgia, serif',
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                        }}
                                    >
                                        Music Index Online
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontFamily: '"EB Garamond", Georgia, serif' }}
                                    >
                                        An open-source catalog of classical masterworks - search, browse and explore.
                                    </Typography>
                                </Box>
                            </Box>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={!isCompact ? <span className="mdi mdi-open-in-new" /> : undefined}
                                onClick={() => navigate('/readme')}
                                sx={{
                                    fontFamily: '"EB Garamond", serif',
                                    textTransform: 'none',
                                    fontSize: '0.95rem',
                                    borderRadius: 2,
                                    ...(isCompact && { minWidth: 40, minHeight: 40, p: 0 }),
                                }}
                            >
                                {isCompact ? (
                                    <span className="mdi mdi-open-in-new" />
                                ) : (
                                    'README'
                                )}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Layout>
    )
}

export default Settings