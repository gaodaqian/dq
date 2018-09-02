# VueSourceCode

## 准备工作

::: warning daqian
sasa
:::

- `Flow` js静态检查工具

vue源码用flow做js静态类型检查

编译阶段检查 由类型错误引起的bug 不影响代码运行

```bash
npm install -g flow-bin //安装flow

flow

.flowconfig 文件  /*@flow*/ 标记需要flow检查
```

- 类型检查的两种方式

1. 类型推断

2. 类型注释

  类型注释  以 ：开头

```js {5}
function add (x: number, y: number) {
  return x + y
}

add('hello',11)
```

数组

```js
  var arr: Array<number> = [1, 2, 3]

  arr.push('hello')
```

类和对象

任意类型

 `:?` `viod`  可以为`null` `undefined`

- `libdef` 识别第三方库 自定义类型

- 源码目录设计 src目录

编译相关 `compiler`目录

内置组件 响应  vdom `core`

平台相关编译 辅助util `platforms`  `web` `weex`

服务端渲染 `server`

解析式 vue文件编译js对象 `sfc`

共享目录 `shared`

- vuejs构建

基于`rollup`构建

`webpack` 更强大  css js 图片

`rollup`更适合js库编译 更轻量

`runtime-only` 不需要编译 直接写template 性能 推荐

`runtime-compiler` 需要编译

- 从入口开始

## 数据驱动

- 核心思想 数据驱动

不直接操作dom 通过修改数据 利于维护

**new vue**:

`init` `proxy`

`vm.$mount` 挂载

**vue实例挂载的实现** （自定义watcher 渲染watcher）

 `el`解析 判断 `renderFunction` 转化为 `template`  最终编译成
 `renderFunction` 调用`$mount` 执行  `mountComponent`

**vm_render**方法  返回VNode

`自己手写`

`编译生成`

- Virtual DOM

用一个原生的 js 对象去描述一个 DOM 节点

`Virtual DOM` 是用`VNode`这么一个 `Class` 去描述

`VNode` `VNode`树  

借鉴开源库 `snabbdom`

`VNode`是对真实 DOM 的一种抽象 用来映射真实的 DOM 渲染

核心定义  几个关键属性   标签名  数据 子节点 键值

映射真实的 DOM 要经历 `VNode` 的 `create` `diff` `patch` 等过程

1. `create` 通过 `createElement` 创建`VNode` 最终调用 `_creatELement` 函数

有 children 生成 `VNode tree`  映射 `DOM tree`

children

`normalizeChildren`   `normalizeArrayChildren`函数 递归更多层 变成一维数组

`simpleNormalizeChildren`  `Array.prototype.concat` 变成一维数组

创建 `VNode`

**diff**:

**`patch`**方法 浏览器环境  创建各种钩子 （hooks）

调用 `createPatchFunction({ nodeOPs, modules})`  返回 `function path`

`nodeOPs` 实际 dom 操作

`modules` 属性 class 钩子函数

`insert` 先插入子节点 后插入父节点 `createChildren`  父节点挂载到真实的Dom上

`patch`过程  先创建新节点 删除旧节点 单步调试

函数柯里化 把接收多个参数的函数变换成接受单一函数的参数  返回接受余下的参数 返回结果

- update 方法

把 `VNode` 渲染成真实的 DOM

```js
new VUe - init - $mount - compile - render - vnode - patch - dom
```

## 组件化

`component` 组件 `VNode` 创建过程

`createComponent`方法  

**创建组件构造器** 继承于 `V`

组件 `vnode data hooks` merge到组件的`vnode hooks`

生成组件`VNode`

**`installComponentHooks`函数**  创建不同的钩子 初始化hook 挂载到`data.hooks`

组件 `componentOptions`: VNodeComponentOptions

- 组件`patch`过程

**`patch` 流程**

```js
`createComponent` - 子组件初始化 - 子组件 render - 子组件patch
```

**activeInstance**:

`activeInstance` 为当前激活 vm 实例  `vm.$vnode`为组件占位的 vnode  `vm._vode`为组件渲染的 vnode

**嵌套组件插入顺序 先子后父**:

- 配置合并

1. new vue `mergeOptions` 遵循一定的合并策略

2. 子组件 `initInternalComponent` 组件初始化合并  合并更快 不遵循合并策略

子组件构造函数  先合并 `V options`和组件`options`

`mixin` 扩展一些东西 合并全局`options`

- 生命周期

初始化及数据更新过程各个阶段执行不同的钩子函数

```js
new vue - init - beforecreate - create
```

初始化过程  

`beforecreate` 拿不到组件数据  `initState` 初始化`data` `prop` router vuex

`create`  可以拿到数据

```js
vm._self = vm

initLifecycle(vm)

initEvents(vm)

initRender(vm)

callHook(vm, 'beforecreate')

initInjections(vm)

initState(vm)

initProvide(vm)

callHook(vm, 'created')
```

挂载方法

`beforeMount` 先父后子

`mounted` 先子后父插入队列  首次渲染 可以访问DOM

数据更新之后

`beforeUpdate`

`updated` 重新渲染

组件销毁

`beforeDestroy`

`destroyed` 定时器销毁

- 组件注册过程

`全局注册`  可以在任意地方使用 `V`组件上扩展

`局部注册` 当前组件使用

- 异步组件

原理 本质是2次渲染 先渲染成注释节点 组件加载成功 `forceRender` 通过重新渲染

3种方式

1. 工厂函数

2. `promise`实现方式

`import`  函数返回一个 `promise` 对象

3.高级异步组件

```c
注释节点 - loading resolve reject timeout- 最终节点
```

## 响应式原理

数据驱动 触发 DOM 变化

- 响应式对象

核心 ES5  `Object.defineProperty`

```js
Object.defineProperty(obj, prop, descriptor)
```

`Object.defineProperty` 对象上定义一个新属性  也可以修改对象现有属性 并返回这个对象  `vue`添加 `getter` `setter`

`def()`  `__ob__`  不可枚举 如子属性也是对象 递归把该对象变成响应式

- 依赖收集

访问对象属性  触发`getter` 完成依赖收集    计算`watcher` `addDep` push 到 subs  收集当前`watcher` 作为订阅者

- 派发更新

改变更新数据 触发`setter` `watcher` 执行 `update` `watcher run` `nextTick` 重新渲染组件

- `nextTick`

把执行的任务推入一个队列

变成数据处罚 `watcher` update, 但是 `watchers` `flush` 是在`nextTick`之后  重新渲染是异步

`macrotasks` 宏任务

`microtasks` 微任务

- 检查变化注意事项

哪些数据变化不能被检测到  对象新增删除 数组下标访问修改添加数据检测不到  

本质 内部手动依赖更新派发 `dep.notify()`

```js
1. vue.set( Object | Array, key | index, value) //vue api

2. this.items.push() //数组原生方法
```

- 计算属性 侦听属性

`computed`  initComputed  updateComponent 通过`computed watcher`实现

`watch` initWatch `user watcher`  配置`deep` `synnc`

- 组件更新  新旧vnode `diff`过程 `render watcher`

更新过程 `渲染 watcher`  `patch`

新旧节点不同   创建新节点- 更新父占位节点 删除旧节点

新旧节点相同  获取`children` 不同情况 不同更新逻辑

- 响应式原理图

数据发生变化 通知相应的观察者 dep实例 收集当前正在计算的watcher 通知调用 dep.notify `update`

![ ](./media/reactive.png)

## vue编译

- parse

AST 抽象语法树 javascipt对象 对模版的描述 引用类型 拷贝一个副本

```js
Object.assgin({}, obj)
```

`parse()` 调用`parseHTML(template)` 传入配置

`parseHTML(template)` html解析  不断调用 `advance()`

AST 创建过程

```bash
start - createASTElement -
```

- optimize 优化过程

对 AST 打标记 (静态节点) 深度遍历 AST 树 优化重新渲染对静态节点的处理逻辑

`markStatic` 静态节点

`markStaticRoots` 静态根

- codegen 代码生成阶段

AST 树转为可执行的代码  不同情况生成不同代码块

## 扩展

- `event`

`addHandler`

- `v-model`

双向响应式原理

表单上

组件上

- `slot`

普通插槽 父组件编译渲染阶段生产vnodes 子组件直接拿渲染好的vnodes

作用域插槽 只有渲染自组建才会执行渲染函数生成 vnodes

- `keep-alive`

包裹动态组件 缓存活动组件 手写`render`函数

抽象组件 不会渲染节点 建立组件链 缓存`vnode`

`include`

`exclude` 不需要缓存的组件

首次渲染 缓存渲染

- `transition`

过渡动画 跨平台 `render`函数渲染

- `transition-group` 列表过渡 会渲染成真实对元素

## vue-router

3种路由方式

`hash`(浏览器都支持)、`history`(h5)、`abstract`（非浏览器环境）

2种组件

- router-link  `to`属性指定链接

- router-view 路由出口

- vue插件注册原理

提供静态`install`方法 `Vue.mixin`会给每个组件注入 `beforecreate`、`destroyed`

`beforecreate` 私有属性定义和路由初始化工作 `router.init`  然后执行`history.transitionTo` 路由过渡 执行`matcher`

`destroyed`

- 路由组册流程

- `createMatcher`初始化逻辑  根据路由配置 创建映射表 路径 名称到路由 `record`

- `match`匹配过程 根据传入位置路径计算新对位置 并匹配到相应路由 `record` 根据新位置 返回创建的新路径

- 路径切换

1.导航守卫

:::tip
“导航”表示路由正在发生变化 执行路径切换 执行的钩子函数
:::

```bash
`resolveQueue`

updated - activated - deactivated
```

2.url

3.组件

## vuex

:::tip
状态管理模式  集中式存储

state 数据源 数据驱动

view  template 声明式的方式 把 state 映射到视图

actions methods
:::

- vuex 核心思想

核心就是store(仓库)

vuex 和 单纯的全局对象两点不同

1.vuex 的状态存储是响应式

2.不能直接改变 store 中的状态 唯一途径提交 mutation

![ ](./media/vuex.png)

- vuex 初始化

vuexs安装过程

```js
import -  use - module (state, mutations, actions, getters)
```

store实例化过程

```js
const store = new Vuex.store({
  modules: {
    a: moduleA,
    b: moduleB
  },
  state: {
    count: 1
  }
})

const app = new vue({
  el: '#app',
  store
})
```

- 源码

执行 vue.use、实际执行 install、vuexinit

执行 new Store、

方法 `dispatch` `commit`

- 初始化`module`

`newModuleCollection`

每个 `module` 分别定义 state getters mutations actions

- API

数据存储API `store.state`

`commit` mutation[type]  同步修改

`dispatch`分发 `actions`  异步 本质提交 `mutation`

- 语法糖实现

**数据获取**：

`mapState`

normalizeNamespace 参数处理 最终变成数组 key value 对象

`mapGetters`

**数据存储和修改**：

`mapMutations`

`mappedMutation`   this.$store.commit

`mapActions`

- 动态注册 module

`registerModule`

扩展 modules

installModule

resetStoreVM

注销 `unregisterModule`

操作 `store`

- 插件机制 从外部追踪 `store` 内部变化

`createLogger()` 对象深拷贝(state 引用类型) `deepCopy`  递归方式 `cache` 保留对象

logger插件实现原理  日志方式记录`Mutation`变化过程