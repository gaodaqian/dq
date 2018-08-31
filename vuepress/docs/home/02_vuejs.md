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

- 绑定 Html Class

1.对象语法

可以为一个对象  动态的切换 Class

```html
<div v-bind:class="{ active: isActive }"></div>
```

上面语法表示 `active` 这个 class 存在与否取决于数据属性 `isActive`

也可以在对象中传入更多属性动态切换多个 `class` 此外`v-bind:class`也可以和普通 `class`属性共存 如下：

```html
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }"
>
</div>
```

```js
data: {
  isActive: true,
  hasError: false
}
```

渲染结果为：

```html
<div class="static active"></div>
```

绑定的对象不必内联定义在模版里 可以直接定义一个对象

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

也可以在这个绑定一个**返回对象的计算属性** 这是一个常用且强大的模式

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject(){
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
````

2.数组语法

我们可以把一个数组传给 v-bind:class, 以应用一个 class 列表

```html
<div v-bind:class= "[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染结果为：

```html
<div class="active text-danger"></div>
```

根据条件切换列表 class 三元表达式

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

这样始终添加 `errorClass`, 只有 `isActive` 为 `true` 添加`activeClass`

多个条件 class会繁琐 数组中也可以使用对象语法

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

3.用在组件上

当一个自定义组件上使用 class 属性时，这些类将添加到该组件的根元素上面，元素上已经存在的类不会被覆盖。

例如。声明了这个组件：

```js
Vue.component('my-component',{
  template: '<p class="foo bar">Hi</p>'
})
```

然后使用时添加一些 class:

```html
<my-component class="baz boo"></my-component>
```

HTML 将被渲染为：

```html
<p class="foo bar baz boo"></p>
```

对于带数据绑定 class 也同样适用：

```html
<my-component :class="{ active: isActive}"></my-component>
```

当`isActive`为`true`,HTML 将被渲染为：

```html
<p class="foo bar active"></p>
```

- 绑定内联样式

1.对象语法

`v-bind:style` css属性名可以用驼峰式或短横线分割

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px'}"></div>
```

```js
data: {
  activeColor:'red',
  fontSize:30
}
```

直接绑定到一个样式对象通常更好 模版更清晰：

```html
<div v-bind:style="styleObject"></div>
```

```js
data: {
  styleObject: {
    color: 'red',
    fontSize: 30
  }
}
```

2.数组语法

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

**条件渲染**：

- `v-if`

在 `<template>` 元素上使用 `v-if` 条件渲染分组

`v-else`元素必须紧跟在  `v-if` 或 `v-else-if`元素的后面 否则不会被识别

用唯一 `key` 值管理可复用当元素 完全独立 每次切换输入框将被**重新渲染**

- `v-show`

根据条件展示元素  不同的是  `v-show` 的元素始终会被渲染并保存在 DOM 中，`v-show` 只是切换元素的 `display` 属性

:::tip
注意，`v-show` 不支持 `<template>` 元素。也不支持 `v-else`
:::

- `v-if` vs `v-show`

`v-if` 是真正当条件渲染，因为它会确保在切换过程中条件内的事件监听器和子组件适当当被销毁和重建。如果初始渲染条件为假，则什么都不做，直到条件为真，才会渲染条件块。

`v-show` 不管初始条件是什么，元素总会被渲染。并且只是简单当基于css进行切换。

总的来说，`v-if`有更高的**切换开销**， `v-show`有更高的**初始渲染开销**，需要频繁切换`v-show`，条件改变比较少 `v-if`

- `v-if` 与 `v-for` 一起使用

`v-for` 比 `v-if` 优先级高

**列表渲染**：

1. `v-for`把一个数组对应为一组元素

`v-for`指令根据数组选项列表进行渲染 需要使用 `item in items` 形式的特殊语法 `items`是源数据数组  `item`是数组元素迭代当别名

```html
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```

```js
var example1 = new Vue({
  e: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

渲染结果为：

```html
 Foo
 Bar
```

在 `v-for` 中，还支持可选第二个参数为当前项的索引。

2.一个对象的 `v-for`

也可以通过一个对象的属性来迭代

```html
<ul id="v-for-object">
  <li v-for="value in object">
  {{ value }}
  </li>
</ul>
```

```js
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
})
```

渲染结果为：

```html
John
Doe
30
```

:::tip
在遍历对象时，是按 `object.keys()` 的结果遍历， 但不能保证它的结果在不同的 JavaScript 引擎下是一致的
:::

3.`key`

默认“就地复用”策略 如数据项顺序被改变 vue 不会移动 DOM 来匹配数据项的顺序，而是简单复用此处每个元素

这个默认模式是高效的，但不适用**不依赖子组件状态或临时 DOM 状态（表单输入值）的列表渲染输出**

需要提供一个唯一的 `key` 属性,以便追踪每个节点的身份，从而重用和重新排序现有元素。

4.数组更新检测

**变异方法**: 会改变这些方法的原始数组

会触发视图更新

`push()`、 `pop()`、 `shift()`、 `unshift()`、 `splice()`、 `sort()`、 `reverse()`

**替换数组**:

相比之下，也有非变异方法，例如： `filter()` `concat()` `slice()`

这些不会改变原始数组，但会返回一个新数组，当使用非变异方法时，可以用新数组替换旧数组

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

相同元素的数组去替换原来的数组是非常高效的操作

**注意事项**：

由于 JavaScript 的限制，Vue 不能检测以下变动的数组

1.当你利用索引直接设置一个项时，例如： `vm.items[indexOfItem] = newValue`

2.当你修改数组的长度时， 例如：`vm.items.length = newLength`

举个例子：

```js
var vm = new Vue({
  data: {
    items:[ 'a', 'b', 'c']
  }
})

vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2  // 不是响应性的
```

有两种方式可以实现 `vm.items[indexOfItem] = newValue` 相同的效果，同时触发状态更新

```js
//vue set
Vue.set(vm.items, indexOfItem, newValue)
```

```js
//数组的方法 Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

也可以使用 `vm.$set` 实例方法， 全局方法 `Vue.set` 的别名：

```js
vm.$set(vm.items, indexOfItem, newValue)
```

为了解决第二类问题，可以使用 `splice`:

```js
//2.当你修改数组的长度时， 例如：`vm.items.length = newLength`
vm.items.splice(newLength)
```

5.对象更新检测注意事项

由于 JavaScript 的限制，Vue 不能检测对象属性的添加和删除：

```js
var vm = new Vue({
  data:{
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

对于已经创建的实例， Vue 不能动态添加根级别的响应式属性。但是，可以使用 `Vue.set(Pbject, key, value)` 向嵌套对象添加响应式属性。例如：

```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```

可以添加一个新的`age`属性到嵌套的`userProfile` 对象：

```js
Vue.set(vm.userProfile, 'age', 27)
```

也可以使用`vm.$set`

```js
vm.$set('userProfile', 'age', 27 )
```

有时可能需要为已有独享赋予多个新属性，比如使用 `Object.assgin()` 或 `_.extend()`。这种情况，**应该用两个对象的属性创建一个新对象**。

想要响应式属性，**不要这样** 如下：

```js
Object.activeClass(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

**要这样**:

```js
vm.userProfile = Object.assgin({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

6.显示过滤/排序结果

7.一段取值范围的 `v-for`

8.`v-for on a <template>`

9.`v-for` with `v-if`

10.一个组件的 `v-for`

**事件处理**：

1.监听事件

`v-on`监听 DOM 事件

2.事件处理方法

`v-on`接收一个需要调用的方法名称

3.内联处理器中的方法

除了绑定到一个方法，也可以在内联 JavaScript 语句中调用方法：

```html
<div id="example-3">
  <button v-on:click="say('hi')">Say Hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```

```js
new Vue({
  el:"example-3",
  methods: {
    say(message){
      alert(message)
    }
  }
})
```

有时需要在内联语句处理器中访问原始 DOM 事件。可用特殊变量 `$event` 把它传入方法：

```html
<button v-on:click="warn('Form cannot be submitted yet.', $event)">Submit</button>
```

```js
methods: {
  warn(message.$event){
    //现在可以访问原生事件对象
    if(event) event.preventDefault()
    alert(message)
  }
}
```

4.事件修饰符

修饰符是用点开头的指令后缀表示

- `.stop`

- `.prevent`

- `.capture`

- `.self`

- `.once`

- `.passive`

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

:::warning
使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。
:::

> 2.1.4 新增

不像其它只能对原生的 DOM 事件起作用的修饰符，.once 修饰符还能被用到自定义的组件事件上。

```html
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

> 2.3.0 新增

Vue 还对应 `addEventLister` 中的 `passive` 选项提供了 `.passive`修饰符

主要是为了在阻止事件默认行为导致的卡顿

```html
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

这个`.passive`修饰符尤其能够**提升移动端性能**

:::warning
不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。
:::

4.按键修饰符

```html
<!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
<input v-on:keyup.13="submit">
```

按键别名

`.enter`

`.tab`

`.delete`

`.esc`

`.space`

`.up`

`.down`

`.left`

`.right`

```html
<!-- 同上 -->
<input v-on:keyup.enter="submit">

<!-- 缩写语法 -->
<input @keyup.enter="submit">
```

**通过全局 `config.keyCodes` 对象自定义按键修饰符别名**:

```js
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

- 自动匹配按键修饰符

> 2.5.0 新增

你也可直接将 KeyboardEvent.key 暴露的任意有效按键名转换为 kebab-case 来作为修饰符：

```html
<input @keyup.page-down="onPageDown">
```

上面例子中。处理函数仅在 `$event.key === 'pageDown'` 时被调用

:::warning
有一些按键 (.esc 以及所有的方向键) 在 IE9 中有不同的 key 值, 如果你想支持 IE9，它们的内置别名应该是首选。
:::

5.系统修饰符

> 2.1.0 新增

可以用一下修饰符实现仅在按下相应按键时才触发鼠标或键盘事件的监听器

- `.ctrl`

- `.alt`

- `.shift`

- `.meta`

> `.exact`修饰符 2.5.0新增

允许你控制由精确的系统修饰符组合触发的事件

```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

> 鼠标按钮修饰符 2.2.0 新增

- `.left`

- `.right`

- `.middle`

6.为什么在 HTML 中监听事件

- 能轻松定位 JavaScript 代码里对应的方法

- 无须在 `JavaScript`,手动绑定事件， `ViewModel` 代码非常纯粹 和 `Dom`完全解藕，更易于测试

- 当一个 `ViewModel` 被销毁时，所有事件处理器都会自动删除。

**表单输入绑定**：

> 基础用法：

`v-model` 在表单 `<input>`、 `<textarea>`、 `<select>`元素上创建双向数据绑定

:::warning
v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。
:::

- 文本

```html
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

- 多行文本

```html
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

:::warning
在文本区域插值 (`<textarea></textarea>`) 并不会生效，应用 v-model 来代替。
:::

- 复选框

单个复选框 绑定到布尔值

多个复选框，绑定到同一个数组

- 单选按钮

- 选择框

```html
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```

```js
new Vue({
  el: '...',
  data: {
    selected: ''
  }
})
```

:::tip
如果 v-model 表达式的初始值未能匹配任何选项，`<select>` 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像上面这样提供一个值为空的禁用选项
:::

> 值绑定：

对于单选按钮。复选框及选择框的选项，`v-model` 绑定的值通常是静态字符串（对于复选框也可以是布尔值）：

```html
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

绑定到 Vue 实例的动态属性上，`v-bind`实现

- 复选框

- 单选按钮

- 选择框的选项

```html
<select v-model="selected">
    <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```

```js
// 当选中时
typeof vm.selected // => 'object'
vm.selected.number // => 123
```

> 修饰符：

- `.lazy`

默认情况下， `v-model` 在每次 `input`事件触发后将会更新，添加`.lazy`修饰符。将转变为使用 `change` 事件时同步：

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
```

- `.number`

自动把用户输入值转为数值类型

```html
<input v-model.number="age" type="number">
```

- `.trim`

自动过滤用户输入的首尾空白字符

```html
<input v-model.trim="msg" >
```

> 在组件上使用 `v-model`：

见下一节 **组件基础**

**组件基础**：

组件是**可复用的 Vue 实例**，且带有一个名字。所以他们与 `new vue`接收相同的选项，例如：`data`、`computed`、`watch`以及生命周期钩子，仅有的例外是像`el`这样根实例特有的选项

- 组件的复用

组件可以进行任意次数复用，每用一次组件，就会有一个它的新实例被创建。

**data必须是一个函数**：

因为每个实例可以维护一份被返回对象的独立拷贝

```js
data() {
  return {}
}
```

- 组件的组织

通常一个应用会以一棵嵌套的组件树形式来组织，为了能够在模版中使用，这些组件必须先注册以便 vue 能够识别。

这里两种组件注册类型： 全局注册和局部注册

- 通过 prop 向子组件递数据

prop 是你可以在组件上注册当一些自定义特性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。可以用一个 `props` 选项将其包含在该组件可接受的 `prop`列表中

```js
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```

一个组件默认可以拥有任意数量的 `prop`,任意值都可以传递给任何 `prop`。能够在组件实例中反问这个值，就像访问`data`中的值一样。

一个`prop`被注册后，就可以这样把数据作为一个自定义特性传递过来：

```html
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
```

然而在一个典型应用中，可能在`data`中有一个博文的数组：

```js
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
```

并想要为每篇博文渲染一个组件：

```html
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```

如上，`v-bind`可以动态传递`prop`

- 单个根元素

模板的内容包裹在一个父元素内

```html
<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>
```

当组件变得复杂时，变成接受一个单独的prop:

```html
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>
```

```js
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
```

- 通过事件向父级组件发送消息

点击按钮需要告诉父组件要做的事情，vue 提供了自定义事件解决。可以调用内建的`$emit`方法并传入事件名，来向父组件触发一个事件：

```html
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
```

然后在博文组件使用 `v-on` 监听这个事件

```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
```

1.使用事件抛出一个值

使用`$emit`的第二个参数来抛出

```html
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

当父组件监听这个事件的时候，通过`$event`访问抛出的这个值：

```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
```

或者，如果这个事件处理函数是一个方法：

```html
<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>
```

那么这个值将作为第一个参数传入这个方法：

```js
methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

2.在组件上使用`v-model`

自定义事件也可以用于创建支持`v-model`的自定义输入组件

```html
 <input v-model="searchText">
```

等价于：

```html
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

当用在组件上，`v-model`则会这样：

```html
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```

为了它正常工作，这个组件内的`<input>`必须：

1.将其 `value`特性绑定到一个名叫 `value`的`prop`上

2.在其`input`事件被触发时，将新当值通过自定义的`input`事件抛出。 代码如下：

```js
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```

现在 `v-model` 就应该可以在这个组件上完美地工作起来了：

```html
<custom-input v-model="searchText"></custom-input>
```

- 通过插槽分发内容

需要向一个组件传递内容，像这样：

```html
<alert-box>
  Something bad happened.
</alert-box>
```

Vue `<slot>`

```js
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

只要在需要的地方加入插槽就行了

- 动态组件

不同组件进行状态切换，Vue的`<component>`元素加一个特殊的 `is` 特性来实现：

```html
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```

`currentTabComponent`可以包括 已注册组件的名字 或 一个组件的选项对象。

- 解析 DOM 模版时的注意事项

有些 HTML 元素，如 `ul`、`ol`、`table`、`select`,对于哪些元素可以出现在内部是有限制的。而有些元素`li`、`tr`、`option`只能出现在特定元素内部。

这会导致一些问题：

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

这个自定义组件会被作为无效内容提升到外部，导致渲染结果出错。`is` 特性给出一个变通的方法：

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```

需要注意的是**如果从一下来源使用模版的话，这条限制是不存在的**：

1.字符串(例如：`template: '...'`)

2.单文件组件 (`.vue`)

3.`<script type="text/x-template">`

## 深入了解组件

**组件注册**：

- 组件名

W3C 规范中自定义组件名(字母全小写且必须包含一个连字符)

1.组件名大小写

两种方式：

**使用 kebab-case**：短横线分隔命名,定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`。

**使用 PascalCase**: 驼峰式命名,引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>`和 `<MyComponentName>` 都是可接受的

- 全局注册

这些组件是全局注册的。也就是说它们在注册之后可以用在任何新创建的 `Vue` 根实例 `(new Vue)` 的模板中。

```js
Vue.component('my-component-name', {
  // ... 选项 ...
})
```

- 局部注册

全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。

在这些情况下，你可以通过一个普通的 JavaScript 对象来定义组件：

```js
var ComponentA = { /* ... */ }
```

然后在 components 选项中定义你想要使用的组件：

```js
new Vue({
  el: '#app'
  components: {
    'component-a': ComponentA
  }
})
```

对于 `components` 对象中的每个属性来说，其属性名就是自定义元素的名字，其属性值就是这个组件的选项对象。

**注意局部注册的组件在其子组件中不可用**，如果希望 `componentA`在`componentB` 中可用，需要这样写：

```js
var ComponentA = { /* ... */ }

var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
```

或者通过 `Babel` 和 `webpack` 使用 `ES2015`模块：

```js
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  },
  // ...
}
```

注意在 ES2015+ 中，在对象中放一个类似 `ComponentA` 的变量名其实是 `ComponentA: ComponentA` 的缩写，即这个变量名同时是：

1.用在模版中的自定义元素的名称

2.包含了这个组件选项的变量名

- 模块系统

`import`/`require`

1.在模块系统中局部注册

我们推荐创建一个 `components` 目录，并将每个组件放置在其各自的文件中。

例如，在一个假设的 ComponentB.js 或 ComponentB.vue 文件中：

```js
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    ComponentA,
    ComponentC
  },
  // ...
}
```

现在 `ComponentA` 和 `ComponentC` 都可以在 `ComponentB` 的模板中使用了。

2.基础组件的自动化全局注册

基础组件：只包裹了一个输入框或者按钮之类的元素。

使用`webpack`，就可以使用`require.context`只全局注册通用的基础组件。入口文件(如：`src/main.js`) 中全局导入基础组件的示例代码：

```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

**记住全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生**。

**prop**：

- `prop`的大小写

HTML 中的特性名是大小写不敏感，这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：

```js
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

```html
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```

如果你使用字符串模板，那么这个限制就不存在了。

- `prop`类型

以字符串数组形式列出的 prop：

```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

为每个 prop 都有指定的值类型

```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object
}
```

- 传递静态或动态`prop`

像这样，你已经知道了可以像这样给 prop 传入一个静态的值：

```html
<blog-post title="My journey with Vue"></blog-post>
```

你也知道 prop 可以通过 v-bind 动态赋值，例如：

```html
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post v-bind:title="post.title + ' by ' + post.author.name"></blog-post>
```

在上述两个示例中，我们传入的值都是字符串类型的，但实际上任何类型的值都可以传给一个 prop。

1.传入一个数字

```html
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:likes="post.likes"></blog-post>
```

2.传人一个布尔值

```html
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:is-published="post.isPublished"></blog-post>
```

3.传人一个数组

```html
<!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:comment-ids="post.commentIds"></blog-post>
```

4.传人一个对象

```html
<!-- 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:author="{ name: 'Veronica', company: 'Veridian Dynamics' }"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:author="post.author"></blog-post>
```

5.传人一个对象的所有属性

可以使用不带参数的 `v-bind` (取代 v-bind:prop-name)。例如，对于一个给定的对象 `post`：

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

模版：

```html
<blog-post v-bind="post"></blog-post>
```

等价于：

```html
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

- 单向数据流

- `prop`验证

- 非`prop`的特性

**自定义事件**：

**插槽**：

**动态组件 & 异步组件**：

**处理边界情况**：

## 过渡 & 动画

**进入/离开 & 列表过渡**：

**状态过渡**：

## 可复用性 & 组合

**混入**：

**自定义指令**：

**渲染函数 & JSX**：

**插件**：

**过滤器**：

## 工具

**生产环境部署**：

**单文件组件**：

**单元测试**：

**TypeScript支持**：

## 模块化

**路由**：

**状态管理**：

**服务端渲染**：

## 内在

**深入响应式原理**：

## 迁移

**从 Vue1.x 迁移**：

**从 Vue Router 0.7x迁移**：

**从 Vuex 0.6x 迁移到 1.0**：

## 更多

**对比其他框架**：

**加入 vuejs 社区**：

**认识团队**：