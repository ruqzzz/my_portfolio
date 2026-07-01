# Rin_sporfolio

Static personal portfolio website for **Rin Watanabe** — Python developer, building fast and accessible apps.

## Site structure

```
/
├── index.html              # About page (main)
├── blogs.html              # Blog placeholder
├── achievements.html       # Achievements placeholder
├── 404.html                # Custom not-found page
├── docs/
│   └── sample-page.html    # Layout reference page
├── styles/
│   └── styles.css          # Global styles and colour variables
├── scripts/
│   └── main.js             # Nav, TOC, scroll-spy
├── assets/
│   ├── images/             # Logo, hero video, OG image
│   └── icons/              # Favicons and web manifest
├── deploy/
│   └── notes.txt           # Cloudflare Pages deployment steps
├── LICENSE
└── README.md
```

## Local preview

Serve the site root with any static file server:

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Open `http://localhost:8080` in your browser.

## Editing content

- **Page content:** edit HTML files directly (`index.html`, etc.)
- **Colours:** edit CSS custom properties in `styles/styles.css` `:root`
- **Images/video:** place files in `assets/images/` and update paths in HTML if needed
- **Navigation:** edit the `<header>` block (identical across all pages)

## Deployment

Hosted on **Cloudflare Pages** from GitHub. See `deploy/notes.txt` for step-by-step instructions.

Live URL format: `https://[your-project-name].pages.dev`

## License

MIT — see [LICENSE](LICENSE).
