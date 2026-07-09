import React, { useState } from 'react'
import { Box, Typography, Divider, Link, Collapse } from '@mui/material'
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

const linkSx = {
    fontFamily: '"EB Garamond", Georgia, serif',
    fontWeight: 600,
}

const mitLicense = `MIT License

Copyright (c) 2026 BUG STUDIO

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`

function Readme() {
    const [licenseOpen, setLicenseOpen] = useState(false)

    return (
        <Layout>
            <Box sx={{ mt: 2, mb: 4, maxWidth: '800px', mx: 'auto', userSelect: 'text' }}>
                <Typography variant="h4" sx={h1Sx}>
                    Music Index Online
                </Typography>

                <Typography variant="body1" sx={{ ...bodySx, fontStyle: 'italic' }}>
                    An open-source catalog of classical masterworks — search, browse and explore.
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h5" sx={h2Sx}>
                    Introduction
                </Typography>

                <Typography variant="body1" sx={bodySx}>
                    Music Index Online is a searchable, open-source catalog of classical music works.
                    It indexes compositions by composer, title, opus number, genre, and period, with
                    detailed movement listings — all presented through an elegant, distraction-free interface.
                </Typography>

                <Typography variant="body1" sx={bodySx}>
                    Whether you're a performer checking a program, a listener discovering new repertoire,
                    or a researcher cataloging works, Music Index Online makes it easy to find and copy the
                    information you need.
                </Typography>

                <Typography variant="body1" sx={bodySx}>
                    <strong>Visit:</strong>{' '}
                    <Link
                        href="https://sudo0015.github.io/MusicIndexOnline/"
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        sx={linkSx}
                    >
                        https://sudo0015.github.io/MusicIndexOnline/
                    </Link>
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h5" sx={h2Sx}>
                    Features
                </Typography>

                <Box component="ul" sx={{ pl: 3, my: 1, '& li': { mb: 0.5 } }}>
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
                            <strong>One-click copy</strong> — copy any composer, title, genre, or movement to your clipboard
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" sx={bodySx}>
                            <strong>Dark &amp; light themes</strong> — automatically adapts to your system preference, with manual toggle
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" sx={bodySx}>
                            <strong>Responsive design</strong> — works beautifully on desktop, tablet, and mobile
                        </Typography>
                    </li>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h5" sx={h2Sx}>
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
                    />
                </Collapse>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h5" sx={h2Sx}>
                    Credits
                </Typography>

                <Box component="ul" sx={{ pl: 3, my: 1, '& li': { mb: 0.5 } }}>
                    <li>
                        <Typography variant="body1" sx={bodySx}>
                            Built with{' '}
                            <Link href="https://react.dev" target="_blank" rel="noopener noreferrer" underline="hover" sx={linkSx}>React</Link>
                            {', '}
                            <Link href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" underline="hover" sx={linkSx}>Vite</Link>
                            {', and '}
                            <Link href="https://mui.com" target="_blank" rel="noopener noreferrer" underline="hover" sx={linkSx}>MUI</Link>
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" sx={bodySx}>
                            Typography by{' '}
                            <Link href="https://fonts.google.com/specimen/Playfair+Display" target="_blank" rel="noopener noreferrer" underline="hover" sx={linkSx}>Playfair Display</Link>
                            {', '}
                            <Link href="https://fonts.google.com/specimen/EB+Garamond" target="_blank" rel="noopener noreferrer" underline="hover" sx={linkSx}>EB Garamond</Link>
                            {', and '}
                            <Link href="https://fonts.google.com/specimen/Source+Sans+3" target="_blank" rel="noopener noreferrer" underline="hover" sx={linkSx}>Source Sans 3</Link>
                            {' via Google Fonts'}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" sx={bodySx}>
                            Icons by{' '}
                            <Link href="https://pictogrammers.com/library/mdi/" target="_blank" rel="noopener noreferrer" underline="hover" sx={linkSx}>Material Design Icons</Link>
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" sx={bodySx}>
                            Hosted by{' '}
                            <Link href="https://pages.github.com" target="_blank" rel="noopener noreferrer" underline="hover" sx={linkSx}>GitHub Pages</Link>
                        </Typography>
                    </li>
                </Box>
            </Box>
        </Layout>
    )
}

export default Readme