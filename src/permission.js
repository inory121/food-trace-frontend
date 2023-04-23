import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {  // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {  // 判断当前用户是否已拉取完user_info信息
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')  // 拉取info
          console.log(roles);
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)  // 生成可访问的路由表
          console.log(accessRoutes);
          router.addRoutes(accessRoutes)  // 动态添加可访问路由表
          next({ ...to, replace: true })  // 确保addRoutes已完成
        } catch (error) {
          console.log(error);
          await store.dispatch('user/resetToken')  // 出现错误则清除token
          Message.error({
            message: "出现错误，请稍后再试"
          })
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {  // 在免登陆白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`)  // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
