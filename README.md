# NovaWebTools

A free, browser-based toolbox of 20 everyday utilities — text tools, developer
tools, calculators, converters and small productivity helpers. Every tool runs
entirely client-side: nothing is uploaded to a server.

This repository is a professionally refactored, production-ready version of a
single-file prototype. **No UI, design, or functionality was changed** — only
the code organization.

## Project structure

```
NovaWebTools/
├── index.html            Home page — tool directory, search, category chips, modal
├── about.html             About page
├── contact.html           Contact page
├── robots.txt              Search-engine crawl rules
├── sitemap.xml              XML sitemap
├── README.md                 This file
│
├── css/
│   ├── style.css           Variables, resets, header, hero, footer
│   ├── components.css      Tool grid, cards, category headers, ad slots
│   ├── modal.css            Modal chrome, form controls, buttons, outputs
│   ├── utilities.css         Small helper classes used inside individual tools
│   └── responsive.css         Breakpoint overrides
│
├── js/
│   ├── app.js               Entry point — wires up theme, modal, and search
│   ├── theme.js              Dark / light theme toggle
│   ├── search.js              Category chips, search box, tool grid rendering
│   ├── modal.js                Modal open/close plumbing
│   ├── tools.js                 Category + tool registry, merges tool modules
│   ├── utils.js                  Shared helpers: icons, DOM query, clipboard
│   │
│   └── tools/
│       ├── text-tools.js         Word Counter, Character Counter, Case Converter,
│       │                          Text Reverser, Lorem Ipsum, Duplicate Line Remover
│       ├── developer-tools.js     JSON Formatter, Base64, URL Encoder,
│       │                           Password Generator, Color Converter
│       ├── calculator-tools.js     Calculator, BMI, Age Calculator, Percentage
│       ├── converter-tools.js       Length Converter, Temperature Converter
│       └── utility-tools.js          Random Number Generator, Stopwatch, To-Do List
│
└── assets/
    ├── images/            (reserved for future use)
    ├── icons/              (reserved for future use — icons are currently inline SVG)
    └── fonts/                (reserved for future use — fonts are loaded from Google Fonts)
```

## Architecture notes

- **CSS** is split by concern (base/reset, components, modal, utilities,
  responsive) and loaded in `index.html` in that order so cascade/specificity
  behaves identically to the original single `<style>` block.
- **JavaScript** uses native ES6 modules (`<script type="module">`), so there
  is no build step required — just open `index.html` via a local web server
  (ES modules are blocked on the `file://` protocol by browsers, so serve the
  folder with something like `npx serve`, `python3 -m http.server`, or GitHub
  Pages).
- Each of the 20 tools keeps its exact original markup, styling classes, and
  logic. Tools are grouped into 5 category files under `js/tools/`, each well
  under the 300–400 line guideline.
- `js/utils.js` centralizes the icon set, the `$` / `$all` DOM helpers (scoped
  to `#modalBody`, matching the original inline behavior), the clipboard
  helper, and a small shared `state` object (used to track the Stopwatch's
  `setInterval` id so the modal can clear it on close).
- `js/tools.js` merges every category module into one `TOOL_RENDER` lookup
  table, plus exports the `CATS` and `TOOLS` registries used for the search
  page and category chips.
- `js/modal.js` owns opening/closing the tool modal.
- `js/search.js` owns the search box, category chips, and the tool grid.
- `js/theme.js` owns the dark/light theme toggle.
- `js/app.js` is the only script referenced from `index.html`; it imports and
  initializes the other modules.

## SEO, Analytics & Schema

All original SEO meta tags (title, description, keywords, canonical, Open
Graph, Twitter Card), the JSON-LD `WebApplication` schema markup, and the
Google Analytics (`gtag.js`) snippet have been preserved exactly as they were
in `index.html`.

## Running locally

```bash
cd NovaWebTools
python3 -m http.server 8080
# then open http://localhost:8080/
```
