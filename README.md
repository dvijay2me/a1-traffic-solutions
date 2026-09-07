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

`https://formspree.io/f/xoeqkqnl`

with the real Formspree endpoint before expecting direct online form delivery. Until then, the existing JavaScript fallback opens the visitor's email client.

## Important

For a repository project site such as:

`https://USERNAME.github.io/a1-traffic-solutions/`

the links are deliberately relative rather than root-absolute (`/about/`) so the site also works correctly when hosted under a repository subpath.

## Visual image refresh

The site now uses business-appropriate traffic, analytics, workplace and career imagery in the same visual positions as the supplied reference screenshots. Primary images are loaded from Unsplash's image CDN and local fallback crops from the supplied screenshots are included under `assets/site-images/` so the layout still has imagery if a remote image cannot be loaded.

Primary image sources:
- Traffic/highway hero: https://unsplash.com/photos/an-aerial-view-of-a-highway-in-a-city-zrD2FLzFkbE
- Office/team imagery: https://unsplash.com/photos/people-collaborating-on-office-laptop-Qx7A7SChpnI and https://unsplash.com/photos/people-working-at-university-computer-workspace-bK5t_WPETow
- Career/interview imagery: https://unsplash.com/photos/two-people-in-a-business-meeting-with-a-clipboard-HcS7MOSp-94
- Traffic/control-room imagery: https://unsplash.com/photos/control-room-with-monitors-and-chairs-NSlqiFRyafY
- Traffic/city analytics imagery: https://unsplash.com/photos/aerial-view-of-a-city-street-at-night-hpKMQlCwBc8

The remote images are used only as presentation assets; no API keys or private credentials are embedded in the site.


## Social, chat and privacy

- Social links are limited to the A1 Traffic Solutions LinkedIn profile: https://www.linkedin.com/in/arul-a1-traffic-solutions-522147431/
- tawk.to live chat is installed site-wide using the supplied property/widget IDs.
- The supplied tawk.to JavaScript API key is **not embedded in the static frontend**. tawk.to's secure JavaScript mode requires a server-side HMAC using the API key; exposing the key in GitHub Pages source would defeat that security model.
- Privacy Policy: `/privacy-policy/` (live URL: https://a1traffic-solutions.com/privacy-policy/)
- For EU/EEA/UK visitors and other jurisdictions where consent is required, configure tawk.to's visitor Consent Form in the tawk.to dashboard before relying on the chat widget for consent management.
