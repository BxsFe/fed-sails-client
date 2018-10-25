import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/osskey',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'osskey',
        component: () => import('@/views/osskey'),
        meta: { title: 'osskey', icon: 'example' }
      }
    ]
  },
  {
    path: '/registry',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'registry',
        component: () => import('@/views/registry'),
        meta: { title: '仓库管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/ossPath',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ossPath',
        component: () => import('@/views/ossPath'),
        meta: { title: 'ossPath', icon: 'example' }
      }
    ]
  },
  {
    path: '/upload',
    component: Layout,
    name: 'upload',
    meta: { title: '上传oss' },
    children: [
      {
        path: 'upload-image',
        name: 'image',
        component: () => import('@/views/upload-image'),
        meta: { title: '上传图片', icon: 'example' }
      },
      {
        path: 'upload-assets',
        name: 'assets',
        component: () => import('@/views/upload-assets'),
        meta: { title: '上传资源', icon: 'example' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
