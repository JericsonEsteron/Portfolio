# Jericson Esteron — Game Developer Portfolio

React/Vite portfolio for GitHub Pages. The production build is a self-contained
`dist/index.html` file with local images, PDFs, styles, and playable-ad content
inlined into the page.

## Local development

```bash
npm install
npm run dev
```

To create the standalone production page:

```bash
npm run build
```

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the
portfolio whenever `main` is updated. In the repository settings, set
**Pages → Build and deployment → Source** to **GitHub Actions**.
