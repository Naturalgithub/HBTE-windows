// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from './btnPermission'
import ElementUI from 'element-ui'
import util from '@/utils'
import Router from 'vue-router'
import axios from 'axios'

import VueLazyLoad from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import 'font-awesome/css/font-awesome.css'

import App from './App.vue'
import router from './router'
import store from './vuex'
import i18n from './i18n/i18n'

// 挂载swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
import vuescroll from 'vuescroll'

Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(axios, VueAxios)

Vue.use(vuescroll)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('@/assets/common/placeholder.png')
})

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://47.98.145.222:8080/'
// axios.defaults.baseURL = 'http://192.168.2.156:8080/'
// axios.defaults.baseURL = 'http://192.168.2.38:8080/'

//  获取角色信息，根据用户权限动态加载路由
router.beforeEach((to, from, next) => {
  console.log(store.getters.token)
  // debugger

  {
    if (store.getters.token) {
      store.dispatch('setToken', store.getters.token)
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (!store.getters.info.role) {
          // const role = ['/markdown', '/erji', '/erji2', '/siji', '/wuji']
          !(async function getAddRouters () {
            // 省略 axios 请求代码 通过 token 向后台请求用户权限等信息，这里用假数据赋值
            await store.dispatch('getInfo', {
              role: 'superAdmin',
              permissions: '超级管理员'
            })
            await store.dispatch('newRoutes', store.getters.info.role)
            console.log(store.getters.addRouters)
            await router.addRoutes(store.getters.addRouters)
            next({ path: '/' })
          }())
        } else {
          let is404 = to.matched.some(record => {
            if (record.meta.role) {
              return record.meta.role.indexOf(store.getters.info.role) === -1
            }
          })
          if (is404) {
            next({ path: '/404' })
            return false
          }
          next()
        }
      }
    } else {
      if (to.path === '/login') {
        next()
      }
      next({ path: '/login' })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  util,
  router,
  store,
  i18n,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})

// 禁止全局路由错误
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
