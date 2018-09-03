# WangDoc

## TODO

vue 官网 两遍

vue 源码视频一遍

vue 项目 2个

面试题

## JavaScript 基础数据类型

1. `null` 转为数值 `0`, `undefined`  转为数值 `NaN`

2. `undefined` `null` `false` `0` `NaN` `""` `''` 转为布尔值都为 `false`

3. `js` 数据类型

`number` `string` `undefined` `null` `object` `symbol(es6)`

对象是 **复杂数据类型**, 分为3个子类型 `object` `array` `function`

js 判断数据类型:

- `typeof`

- `instanceof`

- `object.prototype.toString`

- `parseInt()` 将字符串转为整数 要么是十进制整数 要么是 `NaN`

- `parseFloat()` 将字符串转为浮点数

- `isNaN()` 判断是否为 `NaN`

- `isFinite()` 返回布尔值 是否为正常的数值

5.对象属性的读取

点运算符  方括号运算符

键名必须放在引号里 否则当成 **变量**

数字可以不加引号 会自动转成字符串

数值键名不能使用点运算符, 会被当成 **小数点** 只能用方括号

`obj.p ``obj['p']`
  
6.对象属性的查看

`Object.keys` 返回键名

7.对象属性的删除

删除成功返回 `true`

`delete`:

- 删除一个不存在的属性, `delete` 不报错返回 `true`

- 只有一种情况返回false 该属性存在 不可删除

- `delete` 只能删除对象本身的属性 不能删除继承的属性

8.in运算符

检查对象是否包含某个属性 检查的是 **键名**

9.函数

- 函数声明三种方式

- `function` 命令

- 函数表达式

- `function` 构造函数 `new`

10.函数内部变量提升

`var` 被提升到函数体头部
函数执行的作用域 是定义时决定的

- 传递方式

函数参数是原始类型的值（数值、字符串、布尔值） 传值传递
函数内部不会影响外部

复合类型的值（数组、对象、其他函数） 传址传递
原始值的地址 内部修改会影响原始值 （如修改的不是参数对象的某个属性 而是全部参数 则不会影响原始值）

10.`arguments`

正常模式  `arguments` 对象可以修改
严格模式 修改无效 但不会报错

11.闭包

定义在函数内部的函数
函数内部的子函数读取函数内部变量 返回

12.`eval(string)`

计算字符串 执行 `js` 代码
`eval` **别名调用 全局作用域**

13.数组

数组的本质是一种特殊的对象  `typeof` 返回 `object`
数组不能用点运算符 只能用方括号

14.`for...in`

`for...in` 可以遍历对象 数组
不仅遍历数组数字键 还会遍历非数字键  不推荐遍历数组
推荐 `for` 循环 `while` 循环
数组的 `foEach`

15.**length属性不遍历空位**

`forEach`  `for...in` `object.keys` 遍历 空位会被跳过 `undefined` 不会跳过

## 算术运算符

1. 10 个

加法 减法 乘法 除法 指数 余数 自增 自减 数值 负数值
除了加法  其他运算符都不会重载
只要有一个运算子是字符串  加法会变成连接运算符

2.对象的相加

`obj.value（）` 返回对象自身
`toString` 转为字符串

## 语法专题

1. 强制转换

`Number` `Stirng` `Boolean`

- `Number` 将任意类型转为数值

原始类型的值 可以被解析 转为原来的值 不可以返回 `NaN` `true` 为 `1` `false`, `null` 为 `0` `undefined` 为 `NaN`

对象 返回 `NaN` 除非是包含单个数值的数组

```js
Number([5])
```

- `String` 将任意类型转为字符串

原始类型 直接转为字符串
对象 返回一个类型字符串

```js
String({a: 1}) // "[object Object]"
```

数组  返回数组的字符串形式

```js
String([1, 2, 3]) // "1,2,3"
```

- `Boolean` 将任意类型转为布尔值

除了 `undefined` `null` `-0或0` `NaN` `''` 为false
其他都为true

- toString 判断数据类型

`Object.prototype.toString.call(2)` 返回`[object Number]`

- 原型链相关方法

`Object.creat` 指定原型对象 属性 返回新对象

`Object.getPrototypeOf`  获取对象的 `prototype` 对象

- 存取器

存值 `setter`
取值 `getter`

2.Array

- `Array.isArray()` 返回布尔值  参数是否为数组

- 实例方法

`valueof()` 对该对象求值  数组返回本身

`toString()` 返回数组的字符串形

`push()` 末端添加一个或多个元素 返回新数组 会改变原数组

**push和pop后进先出**:

**push和shift先进先出**:

`pop()`  删除最后一个元素 返回该元素 会改变原数组

`shift()` 删除数组第一个元素 返回该元素 会改变原数组

`unshift()` 数组第一个位置添加元素 返回新数组长度 会改变原数组

`join()` 指定参数作为分隔符 连成字符串返回 默认逗号分隔

`concat()` 多个数组合并 返回新数组 原数组不变 （如数组包括对象，返回当前数组浅拷贝，对象的引用）

`reverse()` 反转数组 返回新数组 会改变原数组

`slice(start,end)` 提取数组的一部分 返回新数组 原数组不变 可以将类似数组的对象转为真正的数组 `Array.prototype.slice.call()`

`splice()` 删除原数组的一部分 可以在删除位置添加新成员 返回被删除元素 会改变原数组 第一个参数起始位置 第二个删除个数 更多参数 表示插入数组的新元素

`sort()` 排序 会改变原数组 按字典顺序 自定义方式排序 传入一个函数作为参数 return

`map()`  数组遍历 有返回值 把每次执行结果返回

`forEach()` 数组遍历 无返回值 无法中断  中断用for

`filter()`过滤数组成员 满足条件组成新数组返回 不会改变原数组

`some()` 判断是否符合条件 只要一个true 整个true 否则false 空数组返回false

`every()` 判断是否符合条件 所有true 返回true 否则false 空数组返回true

`reduce()` 依次处理数组每个成员 累计为一个值 从左到右

`reduceRight()` 从右到左

`indexOf()` 第一次出现的位置 没有返回-1 可接受第二个参数指定搜索位置

`lastIndexOf` 最后一次出现的位置 没有返回-1

3.包装对象  三个原生对象 原始类型的值包装成对象

`Numnber`

`String`

`Boolean`

4.Numnber

`Number.prototype.toString()` 转为字符串形式 接受一个参数 进制

`Number.prototype.toFixed()`  指定位数的小数

`Number.prototype.toExponential()` 科学计数法形式

`Number.prototype.toPrecision()` 指定位数的有效数字 四舍五入不精确

5.String

`String.prototype.chartAt()` 返回指定位置的字符

`String.prototype.slice()` 取出子字符并返回 不改变原字符串 第一个开始 第二个结束

`String.prototype.substring()`  取出子字符并返回 不改变原字符串 第一个参数开始  第二个参数结束位置

`String.prototype.substr()` 取出子字符并返回 不改变原字符串 第一个开始 **第二个长度**

`String.prototype.trim()` 去除两端空格 返回新字符串

`String.prototype.toLowerCase()，String.prototype.toUpperCase()` 返回新小写，大写

`String.prototype.split()` 给定规则分割字符串  返回新数组

6.Math对象

`Math.abs()` 绝对值

`Math.ceil` 向上取整

`Math.floor` 向下取整

`Math.max` 最大值

`Math.min` 最小值

`Math.pow` 指数运算

`Math.sqrt` 平方根

`Math.log`自然对数

`Math.exp` e的指数

`Math.round`四舍五入

`Math.random` 随机数

7.Date对象

`Date()` 返回当前时间字符串

`Date.now` 返回当前时间零点的毫秒数（1970.1.1 00:00:00）

`Date.parse` 解析日期字符串

`Date.UTC` 返回该时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数。

- to类方法

`toString()` 返回一个完整的日期字符串

`toUTCString()` 返回对应的 UTC 时间 比北京时间晚8个小时

`toJSON()` 返回一个符合 JSON 格式的 ISO 日期字符串

- get类方法

`getTime` 返回实例距离1970.1.1 00：00:00的毫秒数

`getDate`返回每个月几号

`getDay` 返回星期几  星期一为0

`getYear` 返回距离1900年数

`getFullYear` 返回四位年份

`getMonth`返回月份 0为1月

`getHours` 返回小时（0-23）

`getMinutes`返回分钟
  
`getSeconds` 返回秒

`getMilliseconds` 返回毫秒 （0-999）

8.JSON对象

`JSON.stringify` 转为 JSON 字符串

`JSON.parse`转为 JSON 对象

 ## 面向对象编程

1. 构造函数

- new

- 第一个字母大写

2.this关键字

- 构造函数中 表示实例对象

- 谁调用就是谁

- 函数内部 指函数当前运行环境

- 全局使用 指向window

- 对象 指所在的对象

**绑定this的方法(固定this指向)**:

- call 指定this指向 参数是一个对象 参数为空,null,underfined 默认传window

接受多个参数 第一个参数为指定的对象 后面为函数调用所需参数

`func.call(thisValue, arg1, arg2, ...)`

- apply 和call类似 唯一区别 接受一个**数组**做为参数 传入数组

`func.apply(thisValue, [arg1, arg2, ...])`

- bind 将函数体内的this绑定到某个对象 返回新函数 每运行一次 返回一个新函数

3.对象的继承

- prototype 原型对象的作用就是定义所有实例对象共享的属性和方法

- 原型链 所有对象都有自己的原型对象  原型对象也是对象 也有自己的原型...

所有对象都继承了 `Object.prototype` 属性

`Object.prototype`的原型是Null 尽头

`Object.getPrototypeOf` 返回参数对象的原型 最后找不到 返回 `undefined`

4.`constructor` 属性  原型对象上的 `constructor` 属性  表示原型对象与构造函数的关系

`prototype` 对象有一个constructor 属性 默认指向 `prototype` 对象所在的构造函数

`constructor` 属性作用可以得知某个实例对象是哪个构造函数产生的

5.`instanceof` 返回布尔值 判断对象是否为构造函数的实例

判断值类型 只能用于对象 不适合原始类型的值

6.模块

实现特定功能的一组属性和方法的封装 独立

7.`object` 相关方法

`Object.getPrototypeOf` 返回参数对象的原型

`Object.setPrototypeOf` 设置原型  返回参数对象 接受两个参数 第一个现有对象 第二个原型对象

`Object.create` 从一个实例对象生成另一个实例对象 接受一个对象作为参数 返回一个实例对象

`Object.prototype.isProtoTypeOf` 判断对象是否为参数对象的原型

`Object.prototype.__proto__` 实例对象__proto__属性 指向当前对象的原型对象（构造函数的prototype） 返回该对象的原型

`Object.getOwnPropertyNames` 返回一个数组 成员参数的自身属性 不包括继承的属性名

`Object.prototype.hasownproperty` 返回布尔值 判断属性定义在自身还是原型链

`in` 返回布尔值 判断对象是否具有某个属性 不区分是自身属性还是继承

`for...in` 获取对象所有属性 不区分自身还是继承

## 异步操作

`setTimeout` 多少毫秒之后执行

`setInterval` 每隔一段时间执行一次

- `promise` 对象

`promise` 是一个对象 也是一个构造函数 所有的异步任务返回一个promise实例

`.then` 方法指定下一步的回调函数

- `promise` 对象三种状态

`pending` 异步操作未完成

`fulfilled` 成功

`rejected` 失败

`pending fulfilled` 称为 `resolved` 已定型

## Dom

文档对象模型 将网页转为js对象 从而可以操作

- 节点 七种类型

`Document` 文档树顶层节点 文档节点 9

`DocumentType` doctype标签 10

`Element` html元素节点  1

`Attribute` 元素的属性 2

`Text` 文本节点 3

`Comment` 注释 8

`DocumentFragment` 文档的片段 11

原生节点对象 `Node`

- `Node`接口

属性

`Node.prototype.nodeType` 返回整数值  表示节点类型

`Node.prototype.nodeName` 返回节点名称

`Node.prototype.nodeValue` 返回字符串 表示当前节点本身的文本值

`Node.prototype.baseURL` 返回字符串 表示当前网页的绝对路径

方法

`Node.prototype.appendChild` 接受一个节点对象作为参数 插入到当前节点

`Node.prototype.insertBefore` 将某个节点插入父节点内部的指定位置

`Node.prototype.removeChild` 接受一个参数 当前节点移除该节点

`Node.prototype.replaceChild` 将一个新节点  替换当前节点的某个子节点

- `Nodelist` 接口

`Nodelist`实例是一个类似数组的对象  以下方法可以得到 `Nodelist` 实例

`Node.childNodes`

`document.querySelectAll()`

- `HTMLCollection` 接口

`HTMLCollection` 是一个节点对象的集合 只能包含**元素节点**

- `ParentNode` 接口 `ChildNode` 接口

`ParentNode.children` 遍历某个节点的所有元素子节点

`ParentNode.firstElementChild` 返回当前节点的第一个元素子节点 没有子节点 返回null

`childNode.remove` 从父节点删除当前节点

`childNode.before` 当前节点前面插入一个或多个同级节点

- `Document` 节点

`document.body` 指向body节点

`document.domain` 返回当前文档的域名 不包含协议 接口

`document.write` 向当前文档写入内容

`document.querySelector()` 返回匹配该选择器的元素节点

`document.getElementsByTagName` 搜索html标签名

`document.getElementsByClassName` 返回所有class符合条件的元素

`document.creatElement` 生成元素节点

- Element 节点

 `Element.id`  元素的Id

 `Element.tagName` 返回元素的大写标签名

 `Element.innerHTML`  返回字符串 HTML代码

- 元素节点实例方法

`getAttribute` 读取某个属性的值

`getAttributeNames` 返回当前元素的所有属性名

`setAttribute` 写入属性值

`hasAttribute` 某个属性是否存在

`hasAttributes` 当前元素是否有属性

`removeAtteribute` 删除属性

## 事件

- `EventTarget` 接口

主要提供是三个实例方法

1. `addEventLister` 绑定事件监听函数

2. `removeEventLister` 移除事件监听

3. `dispathEvent` 触发事件

- 事件模型

浏览器的事件模型 就是通过监听函数对事件的反应

事件的传播  捕获 目标 冒泡

- `Event`对象

`Event.bubbles` 事件是否会冒泡 只读属性

`Event.eventPhase` 事件目前所处阶段  只读属性

`Event.cancelable` 事件是否可以取消

`Event.cancelBubble` 阻止事件传播

`Event.defaultPrevented` 事件是否调用过`Event.preventDefault`

`Event.preventDefault()` 阻止浏览器默认行为

- 鼠标事件

`click` `dbclick` `mousedown` `mouseup` `mouseenter` `mouseout`

- 键盘事件

`keydown` `keypress` `keyup`

- 进度事件

`abort` `error` `load` `progress`

- 表单事件

`input`事件 `select` `change` `invalid` `submit`

- 触摸事件

`Touch` `TouchList`  `TouchEvent`

- 拖拉事件

`drap` `drapstart` `drapend`

- 其他常见事件

`unload` `sroll` `cut` `copy` `focus` `blur`

## 浏览器模型

- `defer` `async`

异步加载js

`defer` 浏览器解析html 并行下载scrit 完成html解析 执行下载完的js

`async` 浏览器解析html 并行下载scrit js下载完 执行js 恢复解析html

js脚本之前没有依赖关系 `async` 有依赖关系 `defer`

同时使用 浏览器由 `async` 决定

- 浏览器的组成

核心两部分  渲染引擎 js解释器

- 重流 重绘

布局显示到页面  绘制

页面生成以后 脚本操作 样式操作 会触发重流和重绘

重流必然重绘 重绘不一定重流

**技巧**:

- 读取Dom或写入，尽量写在一起

- 缓存dom信息

- 一次性改变样式

- 动画使用absoult/fixed定位 减少对其他元素的影星

- 只有必要时才显示隐藏元素

- 使用window.requestAnimationFrame() 可以把爱吗推迟下一次重流时执行

- 使用虚拟DOM库

**js引擎**:

浏览器对js处理过程

1. 读取代码 词法分析

2. 对词法进行语法分析 将代码整理成语法树

3. 将代码转为字节码

4. 将字节码转为机器码

- window

`window.top` 指向最顶层窗口 只要用于子窗口里面获取顶层的父窗口

`window.locationbar` 地址栏对象

`window.doucment` document 对象

`window.location` 获取当前窗口的url

`window.navigator` 获取环境信息

`window.history` 浏览器的浏览历史

`window.localStorage` 本地储存

**事件**:

- `load`事件 `onload`属性

`load` 事件发生在文档在浏览器窗口加载完毕时

`window.onload` 属性可以指定这个事件的回调函数

- `error`事件 `onerror`属性

 浏览器脚本发生错误 触发 `window.error` 事件  通过 `window.onerror` 属性对事件指定回调

- `navigator`  `screen` 对象

`window.navigator` 指向包含浏览器和系统信息的 `navigator` 对象

**navigator对象的属性**:

`navigator.userAgent` 浏览器的厂商和版本信息

`navigator.platform` 用户操作系统信息

`navigator.online` 在线还是离线

**screen对象**:

提供现实设备的信息

`screen.height` 浏览器窗口所在的屏幕高度

`screen.orientation` 返回一个对象 表示屏幕的方向 `type` 属性 表示屏幕的具体方向

- `cookie`

`window.navigator.cookieEnabled` 浏览器是否打开 `cookie` 返回一个布尔值

有效期内有效 不设置有效期 当前会话有效 浏览器关闭 会话结束 `cookie`删除

浏览器根据的是本地时间 本地时间不精确  可以使用 `Max-Age` `cookie`存在的秒数

`document.cookie` 当前网页的cookie 没设置HTTPOnly的情况下

- `XMLHttpRequest` 对象

浏览器与服务器之前采用HTTP协议通信

脚本发起通信 AJAX通信

**AJAX几个步骤**:

- 创建 `XMLHttpRequest` 实例

- 发出 `HTTP` 请求

- 接收服务器传回的数据

- 更新网页数据

`XMLHttpRequest` 本身是个构造函数 `new`生成实例 没有任何参数

新建实例 使用`open()`方法发出HTTP请求

指定回调 监听通信状态(`readyState`)

**XMLHttpRequest实例属性**:

`XMLHttpRequest.readyState` 返回一个整数 表示实例对象当前状态

**1** 表示`XMLHttpRequest`实例已经生成  但 `open()` 方法未被调用

**2** 表示实例 `send()` 方法已经调用 服务器返回的头信息和状态吗已经收到

**3** 表示正在接受服务器传来的数据体

**4** 表示服务器返回的数据已经接受完成或者失败

`XMLHttpRequest.response` 服务器返回的数据体 可以是任何数据类型 字符串 对象 二进制

`XMLHttpRequest.status` 返回一个整数 表示HTTP状态码

- 200 ok

- 301 永久移动

- 302 暂时移动

- 304 未修改

- 401 未授权

- 403 禁止访问

- 404 not found

- 500 服务器发生错误

**同源**:

- 协议域名端口

`window.postMessage` h5新API 跨文档通信

**AJAX**:

只能发给同源的网址

三种方法

- JSONP

添加 `script` 标签 发送 `JSON` 数据 该请求有一个`callback`参数(必须)

服务器收到请求后 会把数据放在回调参数返回

- webSocket

一种通信协议 使用 `ws://` 加密 `wss://` 非加密 作为协议前缀

不实行同源政策 只有服务器之前 就可以跨域

`webSocket`请求头 有一个字段 `Origin` 表示请求源

- CORS

跨域资源共享 允许任何类型的请求

浏览器自动完成 关键是服务器 服务器实现了CORS接口 就可以跨域通信

- CORS请求分两类

`简单请求`

1. 请求方式是一下三种方法之一  `HEAD` `GET` `POST`

2. HTTP请求头不超出一下几种字段  `Accept` `Accept-language` `Content-language` `Last-Event-ID` `Content-Type 只限三个值` (application/x-www-form-urlencoded、multipart/form-data、text/plain)

浏览器直接发出 `CORS`请求 **自动**在头信息增加一个 `Origin`字段

CORS默认不包含Cookie

需要包含cookie信息 服务器指定`access-Control-ALlow-Credentials`字段 不能为* 必须明确域名

开发者AJAX请求打开 `withCredentials`属性

`非简单请求`

`PUT` `DELETE` 或者 `Cotent-Type`字段类型 `application/json`

非简单请求的CORS请求 会在正式通信之前 增加一次HTTP请求 称为"预检"

"预检"请求的请求方法是 `OPTIONS` 表示这个请求是用来询问

确认允许跨域 HTTP回应 关键字段 `Accept-Control-Allow-Origin`

否认“预检”请求 返回正常的HTTP回应 但是没有任何CORS相关的头信息字段或明确表示请求不符合条件

- `CORS` `JSONP` 比较

使用目的相同 但 JSONP 更强大 JSONP 只支持 GET 请求  CORS 支持所有HTTP请求

- Storage 接口

用于浏览器保存数据

`sessionStorage` 保存数据用于浏览器会话 会话结束 窗口关闭 数据被清空

`localStorage` 保存数据长期存在

- history 对象

`window.history`

`history.length` 当前窗口访问过的网址数量

`history.back()`  移动到上个网址

`history.forward()` 移动到下个网址

`history.go()` 接受一个整数作为参数 移动到参数指定网址

- `location` `url` `URLSearchParams` 对象

- `location`对象

**属性**:

1. `location.href` 整个url

2. `location.host` 主机

3. `location.port` 端口

4. `location.hash` 片段字符串部分 从#开始

5. `location.Origin` url协议、主机名、端口

**方法**:

1. `location.assign()`  接受url作为参数 跳转到新的url

2. `location.replace()` 接受url作为参数 跳转到新的url 和 assign 区别 replace会在 history里面删除当前网址

3. `location.reload()` 重新加载当前网址

- URL编码解码

1. endodeURI 除了元字符 语意字符之外 进行转义

2. encodeURIComponent 转义所有字符

3. decodeURI 解码

4. decodeURIComponent 片段解码

- `ArryBuffer` `Blob`对象

`ArryBuffer`对象表示一段二进制数据 用来模拟内存里面的数据

`Blob`对象表示一个二进制文件到数据内容 比如图片文件的内容

- `File` 对象 代表一个文件 用来读写文件信息 继承Blob

- 表单  `FormDate` 对象

表单 `Form`

`FormDate()` 构造函数参数是一个表单元素  参数可选 省略 为空表单 否则会处理键值对

实例方法

`FormDate.get()` 获取指定键值

`FormDate.set()` 设置指定键值

`FormDate.append()` 添加一个键值对

- `indexedDB` 浏览器提供的本地数据库

- `web Worker` 为 js 创造多线程 允许主线程创建 worker 线程

## ToDo

```js
对象属性的方法
object.defineProperty  通过描述对象 定义或修改某个属性 返回修改后的对象

obj实例方法
object.prototype.valueof 返回当前对象对应的值
object.prototype.toString 返回对应的字符串
obj.hasownproperty 是否为对象`自身`的属性
Object.getPrototypeOf
Object.create
Object.assign
数组方法  slice forEach push
Object.prototype.isPrototypeOf
Object.getOwnPropertyDescriptors
call
map
```