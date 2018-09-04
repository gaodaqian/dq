# VueRouter

## 安装

### 直接下载

`https://unpkg.com/vue-router/dist/vue-router.js`

Unpkg.com 提供了基于 NPM 的 CDN 链接。

`https://unpkg.com/vue-router@2.0.0/dist/vue-router.js`指定 版本号 或者 Tag

### NPM

```shell
npm install  vue-router
```

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

### 构建开发版

如果你想使用最新的开发版，就得从 GitHub 上直接 clone，然后自己 build 一个 vue-router。

```shell
git clone https://github.com/vuejs/vue-router.git node_modules/vue-router
cd node_modules/vue-router
npm install
npm run build
```

## 介绍

:::tip
版本说明

对于 TypeScript 用户来说，`vue-router@3.0+` 依赖 `vue@2.5+`，反之亦然。
:::

`Vue Router` 是 Vue.js 官方的路由管理器。

## 基础

### 起步

将组件 (components) 映射到路由 (routes)，然后告诉 Vue Router 在哪里渲染它们。

通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问路由器

### 动态路由匹配

```js
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

一个“路径参数”使用冒号 `:`标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。于是，我们可以更新 `User` 的模板，输出当前用户的 `ID`：

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
```

也可以在一个路由中设置多段“路径参数”，对应的值都会设置到 $route.params 中。例如：

```js
模式：

/user/:username/post/:post_id

匹配路径：

/user/evan/post/123

$route.params：

{ username: 'evan', post_id: 123 }
```

`$route.query` (如果 URL 中有查询参数)、`·`$route.hash` 等等。

1.响应路由参数的变化

复用组件。意味者组件的生命周期钩子不会再被调用。想要路由参数变化，`watch``$router`对象：

```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

或者使用 2.2 中引入的`beforeRouterUpdate`导航守卫：

```js
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

2.高级匹配模式

`vue-router` 使用 `path-to-regexp` 作为路径匹配引擎，支持很多高级匹配模式。例如：可选的动态路径参数、匹配零个或多个...

3.匹配优先级

按照路由定义的顺序

### 嵌套路由

要在嵌套的出口中渲染组件，需要在 `VueRouter` 的参数中使用 `children` 配置：

如果你想要渲染点什么，可以提供一个 空的 子路由

```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

### 编程式导航

除了使用`<router-view>`创建 a 标签来定义导航链接，也可以通过编写代码实现：

```js
router.push(location, onComplete?, onAbort?)
```

:::tip
注意：在 Vue 实例内部，你可以通过 `$router` 访问路由实例。因此你可以调用 `this.$router.push`。
:::

`router.push` 这个方法会向 `history` 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

声明式

`<router-link :to="...">`  `<router-link :to="..." replace>`

编程式

`router.push(...)`  `router.replace(...)`

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

:::tip
注意：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path`
:::

```js
const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

**同样的规则也适用于 `router-link` 组件的 to 属性。**

```js
router.replace(location, onComplete?, onAbort?)
```

跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录

```js
router.go(n)
```

这个方法的参数是一个整数，意思是在 `history` 记录中向前或者后退多少步，类似 `window.history.go(n)`。

### 命名路由

通过一个名称来标识一个路由,可以在创建 `Router` 实例的时候，在 `routes` 配置中给某个路由设置名称。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

和代码调用 router.push() 是一回事：

```js
router.push({ name: 'user', params: { userId: 123 }})
```

### 命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示.

如果 `router-view` 没有设置名字，那么默认为 `default`。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件,**确保正确使用 components 配置 (带上 s)：**

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

### 命名视图-嵌套命名视图

```js
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

### 重定向和别名

重定向也是通过 routes 配置来完成，下面例子是从 /a 重定向到 /b：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

重定向的目标也可以是一个命名的路由,甚至是一个方法，动态返回重定向目标.

别名意味着另一个名字：  '/a'的别名'/b'

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

### 路由组件传参

1.布尔模式

2.对象模式

3.函数模式

### HTML 5 History 模式

`vue-router` 默认 `hash` 模式

`history` 模式

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 `http://oursite.com/user/id` 就会返回 `404`，这就不好看了。

:::tip
所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 `index.html` 页面，这个页面就是你 app 依赖的页面。
:::

### 后端配置例子

- Apache

- nginx

- 原生 Node.js

- 基于 Node.js 的 Express

- Internet Information Services (IIS)

- Caddy

- Firebase 主机

### 警告

因为这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件。为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
```

## 进阶

### 导航守卫

`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。

**记住参数或查询的改变并不会触发进入/离开的导航守卫**。可以通过观察 `$router` 对象应对这些变化，或使用`beforeRouteUpdate`组件内守卫。

- 全局守卫

使用 `router.beforeEach` 注册一个全局**前置守卫**：

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

每个守卫方法接收三个参数：

1.`to: Router` 即将要进入的目标路由队形

2.`from: Router` 当前导航要离开的路由

3.`next: Function` 一定要调用这个方法来 `resolve` 这个钩子。执行效果依赖`next`方法调用的参数。

`next()` 进行下一个钩子

`next(false)` 中断当前导航

`next('/')` 或者 `next({ path: '/'})`跳转到一个不同的地址

`next(error)` 如果传人的参数是一个`Error`实例，导航终止且错误会传递给`router.onError`

:::tip
确保要调用 `next` 方法，否则钩子就不会被 resolved。
:::

- 全局解析守卫

> 2.5.0 新增

`router.beforeResolve`注册一个**全局解析守卫**,在导航被确认之前，同时在所有组件内守卫和异步路由组件**被解析之后**，解析守卫就被调用

- 全局后置钩子

全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：

```js
router.afterEach((to, from) => {
  // ...
})
```

- 路由独享的守卫

可以在路由配置上直接定义 `beforeEnter` 守卫：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

- 组件内的守卫

1.`beforeRouterEnter`  不能 访问 this,组件实例还没被创建

2.`beforeRouterUpdate` 在当前路由改变，但是该组件被复用时调用,可以访问组件实例 `this`

3.`beforeRouterLeave` 这个离开守卫通常用来禁止用户在还未保存修改前突然离开。 `next(false)` 来取消。

- 完整的导航解析流程

1.导航被触发。

2.失活的组件里调用离开守卫。

3.调用全局 `beforeEach` 前置守卫。

4.在重用的组件里调用`beforeRouteUpdate`守卫。

5.在路由配置里调用 `beforeEnter`。

6.解析异步路由组件。

7.在被激活的组件里调用 `beforeRouterEnter`。

8.调用全局的`beforeResolve`全局解析守卫。

9.导航被确认。

10.调用全局`afterEach`钩子。

11.触发 DOM 更新。

12.用创建好的实例调用`beforeRouterEnter` 守卫中传给`next`的回调函数。

### 路由元信息

定义路由的时候可以配置`meta`字段:

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

如何访问这个 `meta` 字段呢？

一个路由匹配到的所有路由记录会暴露为 `$router` 对象（还有导航守卫的路由对象）的 `$router.matched` 数组。遍历这个来检查记录中的`meta`字段。

### 过渡动效

`<router-view>` 是基本的动态组件,用 `<transition>` 组件给它添加一些过渡效果

```html
<transition>
  <router-view></router-view>
</transition>
```

### 单个路由的过渡

在各路由组件内使用 `<transition>` 并设置不同的 name。

### 基于路由的动态过渡

动态设置过渡效果：

```html
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
```

```js
// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
```

### 数据获取

有时候进入某路由后，需要从服务端获取数据。可以通过两种方式：

- **导航完成之后获取**：先完成导航，在组件 `created` 生命周期钩子获取数据，在获取期间显示“加载中”之类的提示

- **导航完成之前获取**：导航完成之，在路由进入的守卫中获取数据，获取成功之后执行导航。`beforeRouteEnter` 守卫中获取数据，当数据获取成功后只调用 `next` 方法。

:::tip
在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，显示一些进度条或者别的指示。如果数据获取失败，同样有必要展示一些全局的错误提醒。
:::

### 滚动行为

自定义路由切换时页面如何滚动。

:::tip
注意：这个功能只在支持 `history.pushState` 的浏览器中有用。
:::

当创建一个`Router`实例，可以提供一个`scrollBehavior`方法：

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```

`scrollBehavior`接受 `to`和`from`路由对象。第三个参数`savedPosition` 当且仅当`popstate`导航通过浏览器前进/后退按钮触发才可用。

也可以返回一个 `promise`来得出预期的位置

### 路由懒加载

结合 `Vue` 的异步组件和 `Webpack` 的代码分割功能，轻松实现路由组件的懒加载。

首先，可以将异步组件定义为返回一个 Promise 的工厂函数

```js
const Foo = () => Promise.resolve({ /* 组件定义对象 */ })
```

第二，在 `Webpack 2` 中，我们可以使用动态 `import`语法来定义代码分块点 (split point)：

```js
import('./Foo.vue') // 返回 Promise
```

:::tip
注意

如果您使用的是 Babel，你将需要添加 `syntax-dynamic-import` 插件，才能使 Babel 可以正确地解析语法。
:::

结合这两者，这就是如何定义一个能够被 Webpack 自动代码分割的异步组件。

```js
const Foo = () => import('./Foo.vue')
```

### 把组件按组分块

有时候我们想把某个路由下的所有组件都打包在`同个异步块 (chunk)` 中。只需要使用 命名 `chunk`，一个**特殊的注释语法**来提供 chunk name (需要 Webpack > 2.4)。

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```