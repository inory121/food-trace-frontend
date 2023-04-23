import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import { Loading, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
// Vue.use(ElementPlus)
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = 'http://localhost:8081/api'
import moment from 'moment'
// import 'aplayer/dist/APlayer.min.css';
// import Aplayer from 'vue-aplayer'
// Vue.component("aplayer", Aplayer)
import APlayer from '@moefe/vue-aplayer';
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png', // set the default cover
  productionTip: false, // disable console output
});

/* 全局多彩加载层 */
Vue.prototype.$baseColorfullLoading = (index, text) => {
  let loading
  if (!index) {
    loading = Loading.service({
      lock: true,
      text: text || "正在登录...",
      spinner: 'dots-loader',
      background: 'hsla(0,0%,100%,.8)',
    })
  } else {
    switch (index) {
      case 1:
        index = 'dots'
        break
      case 2:
        index = 'gauge'
        break
      case 3:
        index = 'inner-circles'
        break
      case 4:
        index = 'plus'
        break
    }
    loading = Loading.service({
      lock: true,
      text: text || "正在登录...",
      spinner: index + '-loader',
      background: 'hsla(0,0%,100%,.8)',
    })
  }
  return loading
}

/* 全局Confirm */
Vue.prototype.$baseConfirm = (content, title, callback1, callback2) => {
  MessageBox.confirm(content, title || '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    closeOnClickModal: false,
    type: 'warning',
  })
    .then(() => {
      if (callback1) {
        callback1()
      }
    })
    .catch(() => {
      if (callback2) {
        callback2()
      }
    })
}


/** 
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

Vue.config.productionTip = false
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format("YYYY-MM-DD HH:mm:ss")
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
