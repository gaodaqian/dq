# VueAPI

## 全局配置

`vue.config`是个对象，包含 Vue 的全局配置。

- `slient`

类型：`boolean`

默认值：`false`

用法：

```js
Vue.config.silent = true
```

取消 Vue 所有的日志与警告。

- `optionMergeStrategies`

自定义合并策略的选项

- `devtools`

配置是否允许 `vue-devtools` 检查代码。开发版本默认为 `true`，生产版本默认为 `false`。生产版本设为 `true` 可以启用检查。

- `errorHandler`

指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例。

- `warnHandler`

为 Vue 的运行时`警告`赋予一个自定义处理函数。注意这只会在**开发者环境下生效，在生产环境下它会被忽略**。

- `ignoredElements`

须使 Vue 忽略在 Vue 之外的自定义元素

- `keyCodes`

给 `v-on` 自定义键位别名。

- `performance`

设置为 `true` 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪。只适用于开发模式和支持 `performance.mark` API 的浏览器上。

- `productionTip`

设置为 `false` 以阻止 vue 在启动时生成生产提示。

## 全局 API

- `Vue.extend( options )`

使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。在 `Vue.extend()` 中它必须是函数.

- `Vue.nextTick( [callback, context] )`

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

- `Vue.set( target, key, value )`

向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。

:::tip
注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。
:::

- `Vue.delete( target, key )`

删除对象的属性。

- `Vue.directive( id, [definition] )`

注册或获取全局指令。

- `Vue.filter( id, [definition] )`

注册或获取全局过滤器。

- `Vue.component( id, [definition] )`

注册或获取全局组件。注册还会自动使用给定的id设置组件的名称

- `Vue.use( plugin )`

安装 `Vue.js` 插件。如果插件是一个对象，必须提供 `install` 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

- `Vue.mixin( mixin )`

全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混入，向组件注入自定义的行为。不推荐在应用代码中使用。

- `Vue.compile( template )`

在 render 函数中编译模板字符串。只在独立构建时有效

- `Vue.version`

提供字符串形式的 Vue 安装版本号

## 选项 / 数据

- `data`

Vue 实例的数据对象, Vue 将会递归将 data 属性转换为`getter/setter`,从而让 data 的属性能够响应数据变化。（根级响应式属性）

实例创建后，可以通过 `vm.$data`访问原始数据对象，vue 实例也代理了 data 对象上的所有属性， 访问 `vm.a` 等价于 `vm.$data.a`

- `props`

`props`可以是数组/对象，用来接受来自父组件的数据。

- `propsData`

**只用于 new 创建的实例中**。

创建实例时传递 `props`，主要作用是方便测试。

- `computed`

计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 `this` 上下文自动地绑定为 Vue 实例。

**计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算**.

- `methods`

`methods` 将被混入到 Vue 实例中。可以直接通过 `VM` 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。

:::tip
不应该使用箭头函数来定义 method 函数
:::

- `watch`

一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象.Vue 实例将会在实例化时调用 `$watch()`，遍历 `watch` 对象的每一个属性。

## 选项 / DOM

- `el`

提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标.

在实例挂载之后，元素可以用 `vm.$el` 访问。

- `template`

一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽。

:::tip
如果 Vue 选项中包含渲染函数，该模板将被忽略。
:::

- `render`

字符串模板的代替方案，允许你发挥 `JavaScript` 最大的编程能力。该渲染函数接收一个 `createElement` 方法作为第一个参数用来创建 `VNode`。

- `renderError`

> 2.2.0 新增

**只在开发者环境下工作**。

当 `render` 函数遭遇错误时，提供另外一种渲染输出。其错误将会作为第二个参数传递到 `renderError`。这个功能配合 `hot-reload` 非常实用

## 选项 / 生命周期钩子

- `beforeCreate`

在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

- `created`

在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，`$el` 属性目前不可见。

- `beforeMount`

在挂载开始之前被调用：相关的 render 函数首次被调用。

- `mounted`

`el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子

- `beforeUpdate`

数据更新时调用，发生在虚拟 `DOM` 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。

- `updated`

由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

- `activated`

keep-alive 组件激活时调用。

**该钩子在服务器端渲染期间不被调用**.

- `deactivated`

keep-alive 组件停用时调用。

- `beforeDestroy`

实例销毁之前调用。在这一步，实例仍然完全可用。

**该钩子在服务器端渲染期间不被调用**.

- `destroyed`

Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

**该钩子在服务器端渲染期间不被调用**.

- `errorCaptured`

> 2.5.0 新增

当捕获一个来自子孙组件的错误时被调用

## 选项 / 资源

- `directives`

包含 Vue 实例可用指令的哈希表。

- `filters`

包含 Vue 实例可用过滤器的哈希表。

- `components`

包含 Vue 实例可用组件的哈希表。

## 选项 / 组合

- `parent`

指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 `this.$parent` 访问父实例，子实例被推入父实例的 `$children` 数组中。

:::tip
节制地使用 `$parent` 和 `$children` - 它们的主要目的是作为访问组件的应急方法。更推荐用 `props` 和 `events` 实现父子组件通信
:::

- `mixins`

`mixins` 选项接受一个混入对象的数组。他们将在 `Vue.extend()` 里最终选择使用相同的选项合并逻辑合并

- `extends`

允许声明扩展另一个组件.而无需使用 `Vue.extend`。这主要是为了便于扩展单文件组件。

- `provide / inject`

> 2.2.0 新增

:::tip
`provide` 和 `inject` 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中。
:::

这对选项需要一起使用,以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深,并在起上下游关系成立的时间里始终生效.

## 选项 / 其它

- `name`

允许组件模板递归地调用自身。注意，组件在全局用 `Vue.component()` 注册时，全局 ID 自动作为组件的 name。

- `delimiters`

改变纯文本插入分隔符。

- `functional`

使组件无状态 (没有 data ) 和无实例 (没有 this 上下文)。他们用一个简单的 render 函数返回虚拟节点使他们更容易渲染。

- `model`

> 2.2.0 新增

允许一个自定义组件在使用 `v-model` 时定制 prop 和 event

- `inheritAttrs`

> 2.4.0 新增

默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。

- `comments`

> 2.4.0 新增

当设为 `true` 时，将会保留且渲染模板中的 HTML 注释。默认行为是舍弃它们。

## 实例属性

- `vm.$data`

Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象属性的访问。

- `vm.$props`

> 2.2.0 新增

当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象属性的访问。

- `el`

Vue 实例使用的根 DOM 元素。

- `vm.$options`

用于当前 Vue 实例的初始化选项。需要在选项中包含自定义属性时会有用处：

```js
new Vue({
  customOption: 'foo',
  created: function () {
    console.log(this.$options.customOption) // => 'foo'
  }
})
```

- `vm.$parent`

父实例，如果当前实例有的话。

- `vm.$root`

当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。

- `vm.$children`

当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。

- `vm.$slots`

用来访问被插槽分发的内容。

- `vm.$scopedSlots`

用来访问作用域插槽。

- `vm.$refs`

一个对象，持有注册过 `ref` 特性 的所有 DOM 元素和组件实例。

- `vm.$isServer`

当前 Vue 实例是否运行于服务器。

- `vm.$attrs`

包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (`class` 和 `style` 除外)。

- `vm.$listeners`

包含了父作用域中的 (不含 .native 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用。

## 实例方法 / 数据

- `vm.$watch( expOrFn, callback, [options] )`

观察 Vue 实例变化的一个表达式或计算属性函数。

- `vm.$set( target, key, value )`

这是全局 `Vue.set` 的别名。

- `vm.$delete( target, key )`

这是全局 `Vue.delete` 的别名。

## 实例方法 / 事件

- `vm.$on( event, callback )`

监听当前实例上的自定义事件。事件可以由vm.$emit触发。

- `vm.$once( event, callback )`

监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。

- `vm.$off( [event, callback] )`

移除自定义事件监听器。

- `vm.$emit( eventName, […args] )`

触发当前实例上的事件。附加参数都会传给监听器回调。

## 实例方法 / 生命周期

- `vm.$mount( [elementOrSelector] )`

`vm.$mount()` 手动地挂载一个未挂载的实例。

- `vm.$forceUpdate()`

迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。'

- `vm.$nextTick( [callback] )`

将回调延迟到下次 DOM 更新循环之后执行,它跟全局方法 `Vue.nextTick` 一样，不同的是回调的 this 自动绑定到调用它的实例上。

- `vm.$destroy()`

完全销毁一个实例。

触发 `beforeDestroy` 和 `destroyed` 的钩子。

:::tip
在大多数场景中你不应该调用这个方法。最好使用 `v-if` 和 `v-for` 指令以数据驱动的方式控制子组件的生命周期。
:::

## 指令

- `v-text`

更新元素的 textContent。

- `v-html`

更新元素的 innerHTML 。

- `v-show`

根据表达式之真假值，切换元素的 display CSS 属性。

- `v-if`

根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。

:::tip
当和 v-for 一起使用时，v-for 的优先级比 v-if 更高。
:::

- `v-else`

- `v-else-if`

> 2.1.0 新增

表示 `v-if` 的 “else if 块”。可以链式调用。

- `v-for`

基于源数据多次渲染元素或模板块。

- `v-on`

`@`

绑定事件监听器。

- `v-bind`

`:`

动态地绑定一个或多个特性，或一个组件 `prop` 到表达式。

- `v-model`

在表单控件或者组件上创建双向绑定。

- `v-pre`

跳过这个元素和它的子元素的编译过程。

- `v-cloak`

这个指令保持在元素上直到关联实例结束编译。

- `v-once`

只渲染元素和组件一次。

## 特殊特性

- `key`

`key` 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

- `ref`

`ref` 被用来给元素或子组件注册引用信息。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例

- `slot`

用于标记往哪个具名插槽中插入子组件内容。

- `slot-scope`

> 2.5.0 新增

用于标记往哪个具名插槽中插入子组件内容。

- `is`

用于动态组件且基于 DOM 内模板的限制来工作。

## 内置的组件

- `component`

- `transition`

- `transition-group`

- `keep-alive`

缓存不活动的组件

- `include` 和 `exclude`

> 2.1.0 新增

`include` 和 `exclude` 属性允许组件有条件地缓存

- `slot`

组件模板之中的内容分发插槽,`<slot>`元素自身将被替换。

## VNode 接口

## 服务端渲染
