# vueRouterApi

## `<router-link>`

`<router-link>` 组件 路由导航，通过 `to` 指定目标地址，默认渲染成`<a>`标签，可以配置`tag`生成别的标签，当目标路由成功激活，链接元素会自动设置一个激活的 css 类名。

`<router-link>`比 `<a href="...">` 的好处：

- 无论 HTML5 histroy 模式，还是 hash 模式，表现行为一致，所以，切换路由模式，或者 IE9 降级使用 hash 模式，无须改动。

- 在 HTML5 histroy 模式下，`<router-link>`会守卫点击事件，让浏览器不再重新加载页面。

- 在 HTML5 histroy 模式下使用`base`选项后，所有的 `to`属性都不需要写基路径来。

### 将激活 class 应用在外层元素

有时候要让激活的 class 应用在外层元素，而不是 `<a>` 标签本身，这种情况下，`<a>` 将作为真实的连接，而“激活时的class”则设置到外层的`<li>`.

```html
<router-link tag="li" to="/foo">
  <a>/foo</a>
</router-link>
```

## `<router-link>` Props

### to

表示目标路由链接。

当被点击后，内部会把 `to` 的值传到 `router.push()`.

### replace

设置`replace`，点击时会调用 `router.replace()`而不是 `router.push()`，不会留下 `histroy` 记录。

### append

设置 `append`，在当前相对路径添加基路径。

### tag

设置渲染标签

### active-class

设置 链接激活时使用的 CSS 类名。

### exact

"是否激活" 默认类名

### event

声明可以用来触发导航的事件。

### exact-active-class

配置当链接被精确匹配的时候应该激活的 class。

## `<router-view>`

 `<router-view>` 组件是个 `functional` 组件，渲染路径匹配到的视图组件。

## `<router-view>` Props

### name

如果 `<router-view>` 设置了名称， 渲染对应路由配置中的组件。

## Router 构建选项

### routers

- 类型`Array<RouteConfig>`

### mode

配置路由模式：

- hash  支持所有浏览器

- histroy 依赖 HTML5 Histroy API 和服务器配置

- abstract 支持 JavaScript 运行环境，如： Node.js 服务端。**如果没发现浏览器API,路由强制进入这个模式**

### base

基路径。

### linkActiveCLass

`<router-link>` 默认激活的 class 类名

### linkExactActiveClass

`<router-link>` 精确激活的默认 class 类名

### scrollBehavior

滚动行为

### parseQuery / stringifyQuery

自定义查询字符串解析/反解析函数

### fallback

当浏览器不支持 `history.pushState` 控制路由是否应该回退到 hash 模式。默认值为 true。

## Router 实例属性

### router.app

`router`的 Vue 根实例

### router.mode

路由使用的模式

### router.currentRoute

当前路由对应的路由信息对象

## Router 实例方法

### router.beforeEach

### router.beforeResolve

### router.afterEach

增加全局导航守卫。

在 2.5.0+ 这三个方法返回一个移除已注册的守卫/钩子的函数。

### router.push

### router.replace

### router.go

### router.back

### router.forward

动态导航到一个新的 URL。

### router.getMatchedComponents

通常在服务端渲染预加载时，返回目标或是当前路由匹配的组件数组。

### router.resolve

`router.resolve(location, current?, append?)`

解析目标位置

### router.addRouters

动态添加更多路由的规则

### router.onReady

路由完成初始导航调用，可以解析所有异步进入钩子和路由初始化相关的异步组件。

### router.onError

路由导航出错时调用

## 路由对象

一个路由对象表示当前激活的路由状态信息。url解析信息，路由记录。

每次导航成功都会产生一个新对象。

路由对象出现在多个地方：

- 组件内，`this.$route`

- `$route`观察回调内

- `router.match(location)` 返回值

### 路由对象属性

- `$router.path`

当前路由路径。

- `$router.params`

包含动态片段和全匹配片段。没有参数，为空对象

- `$router.query`

URL 查询参数。

- `router.hash`

当前路由的 hash 值。

- `router.fullPath`

完成解析后的 URL

- `router.matched`

当前路由的所有嵌套路径的路由记录

- `router.name`

路由名称

- `router.rediretedFrom`

如果存在重定向，为重定向来源的路由名称

## 组件注入

### 注入的属性

通过 Vue 根实例的 `router` 配置传入 `router`,下面这些属性成员会被注入到每个子组件。

- this.$router

`router`实例

- this.$route

只读属性， `immutable`不可变 可以`watch`监测

当前激活的路由信息对象。

### 增加的组件配置选项

- beforeRouteEnter

- beforeRouteUpdate

- beforeRouteLleave