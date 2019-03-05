import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'
const pkg = require('./package.json')

const entryName = 'index'
const libraryName = 'asch-web'

export default {
  // input: `src/${libraryName}.ts`,
  input: `src/${entryName}.ts`,
  output: [
    // { file: pkg.main, name: camelCase(libraryName), format: 'cjs', sourcemap: true },
    // { file: pkg.module, format: 'es', sourcemap: true },
    { file: `dist/${libraryName}.cjs.js`, name: camelCase(libraryName), format: 'cjs', sourcemap: true },
    // { file: `dist/${libraryName}.es.js`, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    globals(),
    builtins(),
    // Allow json resolution
    json(),
    babel({
      exclude: 'node_modules/**'  // 排除node_modules 下的文件
    }),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    // commonjs({
    //   include: 'node_modules/**',
    //   sourceMap: false
    // }),
    
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({
      jsnext: false,  // 该属性是指定将Node包转换为ES2015模块
      // main 和 browser 属性将使插件决定将那些文件应用到bundle中
      main: true,  // Default: true 
      browser: true // Default: false
    }),
    commonjs(),
    // Resolve source maps to the original source
    sourceMaps(),
  ],
}
