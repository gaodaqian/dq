# vueMucic

## vue cli

```shell
npm install stylus stylus-loader --save-dev
```

## 修改 eslint 规则

```js
//.eslintrc.js 配置rules 修改 eslint 规则
 'eol-last': 0,
    'space-before-function-paren': 0
```

## webpack 配置别名

```js
//webpack.base.conf.js  webpack 基本配置 alias别名
resolve: {
  extensions: ['.js', '.vue', '.json'],
  alias: {
    '@': resolve('src'),
    'common': resolve('src/common'),
  }
```

:::tip
修改配置项  需要重启服务
:::

## 路由重定向

- redirect

## jsonp原理

动态创建 `<script>` 标签 src 指向服务端地址 callback

```js
https://github.com/webmodules/jsonp
```

## 浏览器刷新 17 毫秒一次

## vue-lazyload

`https://github.com/hilongjw/vue-lazyload`

## click冲突问题(scroll)

```css
//添加 class
class="needsclick"
```

## 搜索

### 搜索历史 根据localstorage searchHistory 是否展示

- 点 x 拉家桶 清空本地存储 vuex数据

mapMutations methods

mapGetters computed