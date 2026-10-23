# Music Index Online

*An open-source catalog of classical masterworks — search, browse and explore.*

## Introduction

Music Index Online is a searchable, open-source catalog of classical music works. It indexes compositions by composer, title, opus number, genre, and period, with detailed movement listings — all presented through an elegant, distraction-free interface.

Whether you're a performer checking a program, a listener discovering new repertoire, or a researcher cataloging works, Music Index Online makes it easy to find and copy the information you need.

**Website:** [https://musicindexonline.github.io/](https://musicindexonline.github.io/)

**GitHub Repository:** [https://github.com/musicindexonline/musicindexonline.github.io/](https://github.com/musicindexonline/musicindexonline.github.io/)

## Features

### Search & Browse

- **Full-text search** — search across composers, titles, opus numbers, periods, and movements
- **Multi-dimensional filtering** — filter by composer, genre, and period simultaneously
- **Smart ordering** — works are ordered by composer chronologically, and within each composer by opus/catalogue number
- **Detailed movement listings** — every work includes its full movement structure
- **Pagination** — works are displayed in pages for easy navigation

### Copy & Clipboard

- **Click copy** — tap titles, composer tags, genre tags, period tags, or movement titles to copy text to clipboard
- **Diverse copy rules** — customize what gets copied when you click:
  - **Work title clicked:** Work title / Composer & Work title / Composer (Short) & Work title
  - **Composer tag clicked:** Composer / Composer (Short)
  - **Movement title clicked:** Movement title / Work title & Movement title / Composer, Work title & Movement title / Composer (Short), Work title & Movement title
  - **Copy button:** Plain text / Cue code

### Appearance & Customization

- **Dark & light themes** — automatically adapts to your system preference, with manual toggle
- **Adjustable text size** — scale text from 50% to 200% to suit your reading preference
- **Works per page** — set how many works display per page

### Navigation & Interaction

- **Click logo to scroll top** — tap the logo in the navigation bar to smoothly return to the top of the page
- **Responsive design** — works beautifully on desktop, tablet, and mobile devices
- **Smooth animations** — polished transitions for search expansion, filtering, and card interactions
- **Back button** — quickly return to the main catalog

### Settings & Support

- **Centralized settings page** — manage all preferences in one place
- **README page** — view project documentation within the website
- **Support the project** — Like this project? Go to `Settings > Support` to support ongoing development

## Feedback

Found a bug, have a suggestion, or want to request a feature?  
Feel free to [open an issue](https://github.com/musicindexonline/musicindexonline.github.io/issues) — all feedback is welcome.

## Local Development

The website uses the separate
[data repository](https://github.com/musicindexonline/data) through the
`/data/v1/stable.json` route. To test remotely updated data locally, start the
data repository on port `4174` before starting Vite:

```powershell
cd D:\MusicIndexOnlineData
npm install
npm run serve
```

```powershell
cd D:\MusicIndexOnline
npm install
npm run dev
```

Vite proxies `/data/` to `http://127.0.0.1:4174`. Set `CATALOG_DEV_ORIGIN` to
use a different local data origin, and set `VITE_CATALOG_MANIFEST_URL` to use a
different manifest URL.

Run `npm test` for the IndexedDB, download, adapter, and search tests, then run
`npm run build` for a production build.

## License

This project is open source and available under the MIT License.

## Credits

- Built with [React](https://react.dev), [Vite](https://vitejs.dev), and [MUI](https://mui.com)
- Typography by [Playfair Display](https://fonts.google.com/specimen/Playfair_Display), [EB Garamond](https://fonts.google.com/specimen/EB_Garamond), and [Source Sans 3](https://fonts.google.com/specimen/Source_Sans_3) via Google Fonts
- Icons by [Material Design Icons](https://pictogrammers.com/library/mdi/)
- Hosted by [GitHub Pages](https://pages.github.com)


<p align="center">
  <sub>© 2026 Music Index Online</sub>
</p>
