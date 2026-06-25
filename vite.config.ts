import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const IMAGE_EXTS = /\.(jpe?g|png|webp|avif)$/i

function fleetManifestPlugin() {
  return {
    name: 'fleet-manifest',
    buildStart() {
      const fleetDir = path.join(__dirname, 'public/images/fleet')
      const manifest: Record<string, string[]> = {}
      try {
        for (const slug of fs.readdirSync(fleetDir)) {
          const slugDir = path.join(fleetDir, slug)
          if (!fs.statSync(slugDir).isDirectory()) continue
          manifest[slug] = fs.readdirSync(slugDir)
            .filter((f: string) => IMAGE_EXTS.test(f))
            .sort()
            .map((f: string) => `/images/fleet/${slug}/${f}`)
        }
      } catch {
        // fleet dir empty — use empty manifest
      }
      const out = path.join(__dirname, 'src/generated/fleet-manifest.json')
      fs.mkdirSync(path.dirname(out), { recursive: true })
      fs.writeFileSync(out, JSON.stringify(manifest, null, 2))
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), fleetManifestPlugin()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    watch: {
      ignored: ['**/public/images/**'],
    },
  },
})
