# A1 Traffic Solutions — GitHub Pages deployment

This is a GitHub Pages-ready static website.

## Structure

- `index.html` — Home
- `about/index.html` — `/about/`
- `services/index.html` — `/services/`
- `careers/index.html` — `/careers/`
- `contact/index.html` — `/contact/`
- `css/style.css`
- `js/script.js`
- `assets/favicon.svg`
- `.nojekyll`
- `404.html`

The site intentionally keeps CSS, JavaScript and assets in separate folders. GitHub Pages does **not** require everything to be in one directory; nested folders are fully supported.

## Clean URLs / permalinks

The primary URLs are:

- `/`
- `/about/`
- `/services/`
- `/careers/`
- `/contact/`

The old `.html` URLs are retained as compatibility redirects:

- `/about.html` → `/about/`
- `/services.html` → `/services/`
- `/careers.html` → `/careers/`
- `/contact.html` → `/contact/`

## GitHub Pages

Upload the **contents of this folder** to the repository root (not the outer folder itself), then enable:

**Settings → Pages → Deploy from a branch → main → /(root)**

No build step is required.

## Contact form

The contact form currently contains a placeholder Formspree endpoint. Replace:

`https://formspree.io/f/YOUR_FORM_ID`

with the real Formspree endpoint before expecting direct online form delivery. Until then, the existing JavaScript fallback opens the visitor's email client.

## Important

For a repository project site such as:

`https://USERNAME.github.io/a1-traffic-solutions/`

the links are deliberately relative rather than root-absolute (`/about/`) so the site also works correctly when hosted under a repository subpath.
