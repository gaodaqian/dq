# vuexApi

## Vuex.Store

```js
import Vuex from 'vuex'

const store = new Vuex.Store(){...}
```

## Vuex.Store 构造器选项

### state

Vuex.Store实例的根 state 对象。

### mutations

在 store 上注册 mutations,处理同步

### actions

在 store 上注册 actions,处理异步

### getters

派生 state

### modules

### plugins

一个数组 应用在 store 上的插件方法

### strict

严格模式

## Vuex.Store 实例属性

- state

根状态 只读

- getters

暴露出注册的 getter 只读

## Vuex.Store 实例方法

- commit

提交 `mutations`

- dispatch

分发 `action`

- replaceState

替换 store 根状态

- watch

响应式监听

- subscribe

订阅 store 的 mutation

- subscribeAction

订阅 store 的 action

- registerModule

注册一个动态模块

- unregisterModule

卸载一个动态模块

- hotUpdate

热替换新的 action 和 mutation

## 组件绑定的辅助函数

- mapState

返回 store 的状态

- mapGetters

返回 getter 的返回值

- mapActions

分发 action

- mapMutations

提交 mutation

- createNamespacedHelpers

创建基于命名空间的组件绑定辅助函数