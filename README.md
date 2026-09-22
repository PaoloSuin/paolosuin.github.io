# Paolo Suin — personal academic website

A self-contained static site designed for GitHub Pages.

## Files

- `index.html` — content and page structure
- `styles.css` — visual design and responsive layout
- `script.js` — theme toggle, mobile navigation, paper accordions, scroll reveals, animated background
- `assets/favicon.svg` — site icon

## Deploy on GitHub Pages

1. Create a repository called `YOUR_GITHUB_USERNAME.github.io` (or use any repository and enable Pages).
2. Copy all files in this folder to the repository root.
3. Commit and push.
4. In GitHub: **Settings → Pages → Deploy from a branch → main / root**.
5. Your site should appear at `https://YOUR_GITHUB_USERNAME.github.io/`.

## Things to personalize before publishing

The site is already populated with Paolo-specific research content, but I recommend checking these items:

- **Email**: the current button uses `paolo.suin@lam.fr`; replace it if you prefer your current CEA address.
- **Affiliation wording**: currently `CEA Paris-Saclay / IRFU`.
- **Publications**: the page intentionally shows only a curated set. The NASA ADS button provides the full list.
- **CV**: if you want a CV button, add `assets/Paolo_Suin_CV.pdf` and link it from the hero/header.
- **Portrait**: intentionally omitted. The design uses a scientific scale-map instead, so it works immediately without a photo. A portrait can be added later without changing the overall layout.

## Design direction

The reference site by Nadine Soliman is strong because it is direct and publication-first. This version keeps that academic clarity while adding:

- a distinctive animated molecular-cloud/flow background;
- an interactive multi-scale star-formation hero;
- research cards built around the scientific questions rather than a generic skills grid;
- expandable publication summaries;
- responsive navigation and light/dark themes;
- no framework or build system, so GitHub Pages deployment remains trivial.

## Local preview

From this folder run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
