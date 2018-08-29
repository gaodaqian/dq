# vuejs

## 基础

兼容性 不支持 IE8及以下版本

稳定版 2.5.17

**安装引入方式**：

- 直接用 `<script>` 引入  直接下载并用`<script>` 标签引入 会被注册为一个全局变量

::: warning
开发环境不要使用压缩版本 会失去所有常见错误及警告！
:::

- CDN

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
```

- NPM

```bash
# 最新稳定版
$ npm install vue
```

**介绍**：

`vue` 是一套用于构建用户界面的渐进式框架, 自底向上逐层应用 `vue` 核心库只关注视图层

**Vue实例**：

- 创建一个`Vue`实例

```js
var vm = new Vue({
  //选项
})
```

- 数据和方法

实例被创建时，`data`对象中所有属性加入响应式系统。

:::tip
唯一例外的是使用 `Object.freeze()`， 会阻止修改现有的属性，意味着响应式系统无法再追踪变化。
:::

除了数据属性。`vue` 实例还暴有用的实例属性和方法($ 前缀)

- 实例生命周期钩子

`beforeCreate created`

`beforeMount mounted`

`beforeUpdate updated`

`beforeDestroy deatoryed`

![ ](./media/lifecycle.jpeg)

**模版语法**：

`vuejs` 基于 `html` 模版语法

- 文本

`"Mustache"`语法

```html
<span>Message: {{ msg }}</span>
```

`v-once` 执行一次性插值

- 原始 HTML

使用`v-html`指令

- 特性

Mustache 语法不能作用在 HTML 特性上，遇到**布尔**特性的情况应该使用 `v-bind` 指令

```html
<div v-bind:id="dynamicId"></div>
```

- 使用 JavaScript 表达式

```js
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

**指令**：

指令 (Directives) 是带有 v- 前缀的特殊特性。

- 参数

一些指令能够接受一个参数，在指令后以冒号表示。例如，v-bind 指令可以用于响应式地更新 HTML 特性：

```html
<a v-bind:href="url">...</a>
```

- 修饰符

修饰符 (Modifiers) 是以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 `event.preventDefault()`：

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

- 缩写

Vue.js 为 v-bind 和 v-on 这两个最常用的指令，提供了特定简写：

v-bind 缩写

```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
```

v-on 缩写

```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```

**计算属性和侦听器**：

- 基础例子

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

```html
Original message: "Hello"

Computed reversed message: "olleH"
```

声明的计算属性将用作`vm`的属性的`getter`函数

- 计算属性缓存 VS 方法

计算属性是基于它们的依赖进行缓存的 只在相关依赖发生改变时它们才会重新求值

相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。

- 计算属性 VS 侦听属性

TODO

- 计算属性的 `setter`

计算属性默认只有 `getter`,不过在需要时你也可以提供一个 setter ：

```js
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

- 侦听器 `watch`

当需要在数据变化时**执行异步或开销较大**的操作时，这个方式是最有用的。

**Class 与 Style 绑定**：
