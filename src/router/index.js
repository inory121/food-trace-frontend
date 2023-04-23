import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // farmer
  {
    path: '/farmer',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/farmer/index'),
      meta: { title: '养殖信息录入', icon: 'farm-1', roles: ['farmer'] }
    }]
  },

  //butcher
  {
    path: '/butcher',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/butcher/index'),
      meta: { title: '屠宰加工信息录入', icon: 'butcher', roles: ['butcher'] }
    }]
  },

  //transporter
  {
    path: '/transporter',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/transporter/index'),
      meta: { title: '物流运输信息录入', icon: 'transport', roles: ['transporter'] }
    }]
  },

  //seller
  {
    path: '/seller',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/seller/index'),
      meta: { title: '销售信息录入', icon: 'sale', roles: ['seller'] }
    }]
  },

  //consumer
  {
    path: '/consumer',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/consumer/index'),
      meta: { title: '食品溯源查询', icon: 'trace', roles: ['consumer'] }
    }]
  },

  //supervision
  {
    path: '/supervision',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/supervision/index'),
      meta: { title: '信息更改审核', icon: 'supervision', roles: ['supervision'] }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
