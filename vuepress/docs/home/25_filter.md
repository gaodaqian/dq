# filter

[momentjs](http://momentjs.com/)

```bash
npm install moment --save
```

```js
// main.js 全局
import moment from 'moment'

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

filter两个参数 第一个是函数名  第二个是时间格式化处理的函数
```

```html
{{ newsinfo.add_time | dateformat}
```

```js
// 局部
import moment from 'moment'

export default {
  data() {
    return {
      date: new Date()
    }
  },
  filters: {
    dateString(value, format) {
      return moment(value).format(format || 'YYYY-MM-DD, HH:mm:ss a')
    }
  }
}
```

```html
<p>{{date | dateString}}</p>
<p>{{date | dateString('YYYY-MM-DD')}}</p>
```