# VueLoader

## 介绍

Vue Loader 是一个 `webpack` 的 Loader.

## 处理资源路径

## 使用预处理器

使用预处理器需要匹配对应的 Loader。根据`lang`特性自动推断使用的 Loader

### Sass

```shell
npm install -D sass-loader node-sass
```

`webpack`配置：

```js
module.exports = {
  module: {
    rules: [
      // ... 忽略其它规则

      // 普通的 `.scss` 文件和 `*.vue` 文件中的
      // `<style lang="scss">` 块都应用它
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  // 插件忽略
}
```

### Less

```shell
npm install -D less less-loader
```

```js
// webpack.config.js -> module.rules
{
  test: /\.less$/,
  use: [
    'vue-style-loader',
    'css-loader',
    'less-loader'
  ]
}
```

### Stylus

```shell
npm install -D stylus stylus-loader
```

### PostCss

```shell
npm install -D postcss-loader
```

### Babel

```shell
npmpm installnstal  -D babel-core babel-loader
```

### TypeScript

```shell
npm install -D typescript ts-loader
```

### Pug

```shell
npm install -D pug pug-plain-loader
```

## Scoped CSS

`<style>`标签有 `scoped` 属性，它的 css 只作用于当前组件中的元素。

### 深度作用选择器

`>>>`

有些 `Sass` 之类的预处理器无法正确解析 `>>>`, 使用`/deep/`操作符代替。

## CSS Modules

用于模块化和组合 css 系统

### 用法：

1.CSS Modules 必须通过向 css-loader 传入 modules: true 来开启：

```js
// webpack.config.js
{
  module: {
    rules: [
      // ... 其它规则省略
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              // 开启 CSS Modules
              modules: true,
              // 自定义生成的类名
              localIdentName: '[local]_[hash:base64:8]'
            }
          }
        ]
      }
    ]
  }
}
```

2.在`<style>`上添加 `module`特性：

```js
<style module>
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>
```

3.可以在模版中通过一个动态类绑定来使用：

```html
<template>
  <p :class="$style.red">
    This should be red
  </p>
</template>
```

也支持 :class 的对象/数组语法：

```html
<template>
  <div>
    <p :class="{ [$style.red]: isRed }">
      Am I red?
    </p>
    <p :class="[$style.red, $style.bold]">
      Red and bold
    </p>
  </div>
</template>
```

也可以通过 JavaScript 访问：

```html
<script>
export default {
  created () {
    console.log(this.$style.red)
    // -> "red_1VyoJ-uZ"
    // 一个基于文件名和类名生成的标识符
  }
}
</script>
```

## 热重载

`<style>` 会通过 `vue-style-loader` 自行热重载

### 用法

使用 `vue-cli`，热重载使开箱即用。

手动设置工程时， 热重载会在启动 `webpack-dev-server --hot` 服务自动开始。

### 关闭热重载

热重载默认开启

- webpack 的 `target`的值是 `node` 服务端渲染

- webpack 会压缩代码

- `process.env.NODE_ENv === 'producttion'`

使用 `hotReload: false`关闭热重载：

```js
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        hotReload: false // 关闭热重载
      }
    }
  ]
}
```

## 函数式组件

要声明一个函数式组件模版，设置 `functional` 特性在模版中

```html
<template functional>
  <div>{{ props.foo }}</div>
</template>
```

## 自定义块

## CSS 提取

## 代码校验

## 测试