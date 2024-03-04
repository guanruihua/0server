import path from 'path'
import rollupTypescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
// import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import { eslint } from 'rollup-plugin-eslint'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json';
import pkg from './package.json'

const paths = {
  input: path.join(__dirname, '/src/index.ts'),
  output: path.join(__dirname, '/lib')
}

// rollup 配置项
const rollupConfig = {
  input: paths.input,
  output: [
    // 输出 commonjs 规范的代码
    {
      file: path.join(paths.output, 'index.js'),
      format: 'cjs',
      name: pkg.name
    },
    // 输出 es 规范的代码
    {
      file: path.join(paths.output, 'index.esm.js'),
      format: 'es',
      name: pkg.name
    }
  ],
  external: ['canvas'],
  // plugins 需要注意引用顺序
  plugins: [
    // 验证导入的文件
    // eslint({
    //   throwOnError: true, // lint 结果有错误将会抛出异常
    //   throwOnWarning: true,
    //   include: ['src/**/*.ts', 'src/*.ts'],
    //   // exclude: ['node_modules/**', 'lib/**', '*.js']
    //   exclude: ['node_modules/**', 'lib/**']
    // }),

    // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
    commonjs(),
    json(),
    // 配合 commnjs 解析第三方模块
    resolve({
      preferBuiltins: true,
      // 将自定义选项传递给解析插件
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    rollupTypescript(),
    babel({
      runtimeHelpers: true,
      // 只转换源代码，不运行外部依赖
      exclude: 'node_modules/**',
      // babel 默认不支持 ts 需要手动添加
      extensions: [...DEFAULT_EXTENSIONS, '.ts']
    }),
    terser()
  ]
}

export default rollupConfig
