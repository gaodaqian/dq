import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import axios from 'axios'

import 'common/stylus/index.styl'

Vue.prototype.axios = axios
Vue.config.productionTip = false

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
