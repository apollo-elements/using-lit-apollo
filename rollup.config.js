import { terser } from 'rollup-plugin-terser';
import { generateSW } from 'rollup-plugin-workbox'
import html from '@open-wc/rollup-plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import license from 'rollup-plugin-license';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import workboxConfig from './workbox-config.js'

export default {
  input: 'index.html',
  output: { dir: 'dist' },
  plugins: [
    html(),
    minifyHTML(),
    license({
      thirdParty: {
        includePrivate: true,
        output: 'dist/dependencies.txt',
      },
    }),
    resolve(),
    generateSW(workboxConfig),
    terser({
      warnings: true,
      keep_fnames: true,
      compress: {
        passes: 2
      },
      mangle: {
        properties: false,
        keep_fnames: true
      },
      output: {
        comments: () => false,
      },
    }),
  ]
}