import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [
		react(),
		{
			name: 'load+transform-js-files-as-jsx',
			async transform(code, id) {
				if (!id.match(/src\/.*\.js$/)) {
					return null
				}

				return transformWithEsbuild(code, id, {
					loader: 'jsx',
					jsx: 'automatic'
				})
			}
		}
	],

	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx'
			}
		}
	}
})
