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
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
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
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/month-cost-record-new')
    }]
  },
  {
    path: '/cost',
    component: Layout,
    redirect: '/cost/item',
    name: 'cost',
    meta: { title: '消费管理', icon: 'example' },
    children: [
      {
        path: 'item',
        name: 'item',
        component: () => import('@/views/cost-manage/b-cost-item'),
        meta: { title: '消费项目', icon: 'table' }
      },
      {
        path: 'record',
        name: 'record',
        component: () => import('@/views/cost-manage/b-cost-record'),
        meta: { title: '消费记录', icon: 'tree' }
      },
      {
        path: 'record-date',
        name: 'record-date',
        component: () => import('@/views/cost-manage/b-cost-record-date'),
        meta: { title: '消费记录-日', icon: 'tree' }
      },
      {
        path: 'record-month',
        name: 'record-month',
        component: () => import('@/views/cost-manage/b-cost-record-month'),
        meta: { title: '消费记录-日历', icon: 'tree' }
      },
      {
        path: 'record-month1',
        name: 'record-month1',
        component: () => import('@/views/cost-manage/b-cost-record-month1'),
        meta: { title: '消费记录-日历1', icon: 'tree' }
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    redirect: '/system/user',
    component: Layout,
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system-manage/sys-user'),
        meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system-manage/SysRoleList'),
        meta: { title: '角色管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'store',
        name: 'Store',
        component: () => import('@/views/store/index'),
        meta: { title: 'Store', icon: 'store' }
      }
    ]
  },
  {
    path: '/elementUI',
    component: Layout,
    redirect: '/ElementUI/layout',
    name: 'elementUI',
    meta: { title: 'ElementUI', icon: 'ElementUI' },
    children: [
      {path: 'layout', name: 'Layout', component: () => import('@/views/elementUI/layout'), meta: { title: 'Layout', icon: 'layout' }},
      {path: 'container', name: 'Container', component: () => import('@/views/elementUI/container'), meta: { title: 'Container', icon: 'container' }},
      {path: 'button', name: 'Button', component: () => import('@/views/elementUI/button'), meta: { title: 'Button', icon: 'button' }}
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
