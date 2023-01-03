import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
// import visualizer from 'rollup-plugin-visualizer';
import terser from '@rollup/plugin-terser'

const pkg = require('./package.json')

const libraryName = 'marmiton-api'

export default {
  input: `src/${libraryName}.ts`,
  output: [
    { file: pkg.module, format: 'es', sourcemap: false },
    { file: pkg.module, format: 'cjs', sourcemap: false },
    // Browser config won't work, XSS
    // { file: pkg.browser, format: 'iife', sourcemap: false, name: "marmiton" },
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    json(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // visualizer(),
    // Resolve source maps to the original source
    sourceMaps(),
    // Minify
    terser(),
  ],
}
