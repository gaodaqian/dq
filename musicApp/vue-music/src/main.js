import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

import 'common/stylus/index.styl'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
