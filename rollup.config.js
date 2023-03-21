import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

const config = defineConfig({
  // 核心的输入选项
  input: 'src/index.ts', // 必要项
  output: {
    // 必要项 (可以是一个数组，用于多输出的情况)
    // 核心的输出选项
    /* 
        format
        该选项用于指定生成 bundle 的格式。可以是以下之一：
        amd - 异步模块定义，适用于 RequireJS 等模块加载器
        cjs - CommonJS，适用于 Node 环境和其他打包工具（别名：commonjs）
        es - 将 bundle 保留为 ES 模块文件，适用于其他打包工具以及支持 <script type=module> 标签的浏览器（别名: esm，module）
        iife - 自执行函数，适用于 <script> 标签。（如果你要为你的应用创建 bundle，那么你很可能用它。）
        umd - 通用模块定义，生成的包同时支持 amd、cjs 和 iife 三种格式
        system - SystemJS 模块加载器的原生格式（别名: systemjs）
      */
    format: 'umd', // 必要项
    plugins: [],
    dir: 'dist', //该选项用于指定所有生成 chunk 文件所在的目录。如果生成多个 chunk，则此选项是必须的。否则，可以使用 file 选项代替。
    // file,
    // file: 'dist/bundle.js',
    /* 
        globals
        用来忽略打包（umd 或 iife 规范）后的代码的代码依赖，比如：代码中依赖externalId，且externalId在代码使用globalVariable标识，则可以配置:
       */
    // globals: {
    //   [externalId]: 'globalVariable',
    // },

    /* 
        name
        以umd 或 iife 规范打包后的代码，需要注册在全局对象中的名字
      */
    name: 'XS_TOOLS',

    // 高级输出选项

    /* 
        默认值："[name]-[hash].js"
        该选项用于对代码分割中产生的 chunk 文件自定义命名。它支持以下形式：
        [format]：输出（output）选项中定义的 format 的值，例如：es 或 cjs。
        [hash]：哈希值，由 chunk 文件本身的内容和所有它依赖的文件的内容共同组成。
        [name]：chunk 的名字。它可以通过 output.manualChunks 显示设置，或者通过插件调用 this.emitFile 设置。如果没有做任何设置，它将会根据 chunk 的内容来确定。
      */
    // chunkFileNames: '[name]-[hash]-[format].js',
    /* 
        assetFileNames  
        该选项用于自定义构建结果中的静态文件名称。它支持以下占位符：
        [extname]：包含点的静态文件扩展名，例如：.css。
        [ext]：不包含点的文件扩展名，例如：css。
        [hash]：基于静态文件的名称和内容的哈希。
        [name]：静态文件的名称，不包含扩展名。
      */
    // assetFileNames,
    /* 
        banner/footer
        该选项用于在 bundle 顶部添加一个字符串，或者在构建结果末尾添加一个字符串。当然，它也支持返回一个字符串的异步函数。（注意：banner 和 footer 选项不会破坏 sourcemaps。）
      */
    // banner: '/* current version ' + version + ' */',
    // footer: '/* @xiansheng_ */',
    // footer: 'const VERSION = ' + version,
    /* 
        compact
        该选项用于压缩 Rollup 产生的额外代码。请注意，这个选项不会影响用户的代码。在构建已经压缩好的代码时，这个选择是很有用的。
      */
    // compact,
    /* 
        entryFileNames
        该选项用于指定 chunks 的入口文件名。支持以下形式：
      */
    // entryFileNames,
    // extend,
    // hoistTransitiveImports,
    // inlineDynamicImports,
    // interop,
    // intro,
    // manualChunks,
    // minifyInternalExports,
    // outro,
    // paths,
    // preserveModules,

    /* 
        sourcemap
        如果该选项值为 true，那么每个文件都将生成一个独立的 sourcemap 文件。如果值为 “inline”，那么 sourcemap 会以 data URI 的形式附加到输出文件末尾。如果值为 “hidden”，那么它的表现和 true 相同，不同的是，bundle 文件中没有 sourcemap 的注释。
      */
    sourcemap: true,
    /* 
        sourcemapExcludeSources
        如果该选项的值为 true，那么实际源代码将不会被添加到 sourcemap 文件中，从而使其变得更小。
      */
    // sourcemapExcludeSources,
    // sourcemapFile,
    // sourcemapPathTransform,

    // 危险区
    // amd,
    // esModule,
    // exports,
    // externalLiveBindings,
    // freeze,
    // indent,
    // namespaceToStringTag,
    // noConflict,
    // preferConst,
    // strict,
    // systemNullSetters,
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      clean: true,
    }),
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false, loose: true }]],
      plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
      exclude: 'node_modules/**',
    }),
    terser(),
  ],
  // external: [],

  // // 高级输入选项
  /* 
      cache
      该选项用于指定先前的 bundle 的缓存。当它设置后，Rollup 只会对改变的部分进行重新分析，从而加速观察模式（watch mode）中的后续构建。如果将它设置为 false，则会阻止 bundle 生成缓存，还会导致插件的缓存失效。
    */
  // cache,
  // onwarn,
  // preserveEntrySignatures,
  // strictDeprecations,

  // // 危险区
  // acorn,
  // acornInjectPlugins,
  // context,
  // moduleContext,
  // preserveSymlinks,
  // shimMissingExports,
  // treeshake,

  // // 实验性
  // experimentalCacheExpiry,
  // perf,

  // watch:
  //   {
  //     buildDelay,
  //     chokidar,
  //     clearScreen,
  //     skipWrite,
  //     exclude,
  //     include,
  //   } | false,
})
export default config
