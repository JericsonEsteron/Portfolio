import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

function compressPlayableHtml() {
  return {
    name: 'compress-playable-html',
    enforce: 'pre',
    load(id) {
      const [filePath, query] = id.split('?')
      if (query !== 'raw' || !filePath.endsWith('.html') || !filePath.includes('Playable Ads')) return undefined

      const compressedSource = gzipSync(readFileSync(filePath), { level: 9 }).toString('base64')
      return `export default ${JSON.stringify(compressedSource)}`
    },
  }
}

export default defineConfig({
  // Relative URLs allow the site to work at a GitHub Pages project URL
  // (for example, /portfolio/) as well as from a locally opened build.
  base: './',
  plugins: [compressPlayableHtml(), react(), viteSingleFile()],
  build: {
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    modulePreload: { polyfill: false },
  },
})
