# vueSSRApi

## createRender

使用(可选)选项创建一个 `Renderer`实例。

## createBundleRenderer

使用 `server bundle` 和(可选)选项创建一个 `BunderRenderer` 实例

## Class:Renderer

### renderer.renderToString

将 Vue 实例渲染为 字符串

### renderer.renderToStream

将 Vue 实例渲染为一个 Node.js 可读流

## Class: createBundleRenderer

### bundleRenderer.renderToString

将 bundle 实例渲染为 字符串

### bundleRenderer.renderToStream

将 bundle 实例渲染为一个 Node.js 可读流

## Renderer 选项

### template

为整个页面的 HTML 提供一个模版

### clientManifest

提供一个由 `vue-server-renderer/client-plugin` 生成的客户端构建 mainfest 对象

### inject

控制使用 `template`时是否执行自动注入。

### shouldPreload

用来控制什么文件应该生成资源预加载提示

### shouldPrefetch

用来控制哪些文件，需要生成资源提示。

### runInNewContext

只用于 `createBundleRenderer`

### basedir

只用于 `createBundleRenderer`

显式的声明 `server bundle` 运行目录

### cache

提供组件缓存具体实现

### directives

对于自定义指令允许提供服务器端实现

## webpack 插件

webpack 插件作为独立文件提供，应当直接 `require`