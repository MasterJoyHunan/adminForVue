import Vue from 'vue'
import Router from 'vue-router'

// 在开发环境中不使用延迟加载，因为延迟加载太多页面会导致webpack热更新太慢。 所以只有在生产中使用延迟加载;
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
    {path: '/login', component: () => import('@/views/login/index'), hidden: true},
    {path: '/404', component: () => import('@/views/404'), hidden: true},

    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        name: 'dashboard',
        children: [{
            path: 'dashboard',
            name: 'index',
            component: () => import('@/views/dashboard/index'),
            meta: {title: '首页', icon: 'table'},
        }]
    },
    {
        path: '/admin',
        component: Layout,
        name: 'admin',
        redirect: '/admin/user',
        meta: {title: '后台管理', icon: 'admin-manage'},
        children: [
            {
                path: 'user',
                name: 'admin-user',
                component: () => import('@/views/admin/user/index'),
                meta: {title: '后台用户列表'},
            },
            {
                path: 'addAdmin',
                name: 'add-admin',
                component: ()=> import('@/views/admin/user/addUser'),
                meta: {title: '添加管理员'},
                hidden: true
            },
            {
                path: 'role',
                name: 'admin-role',
                component: () => import('@/views/admin/role/index'),
                meta: {title: '角色管理'}
            },
            {
                path: 'node',
                name: 'admin-node',
                component: () => import('@/views/admin/node/index'),
                meta: {title: '节点管理'}
            },
        ]
    },
    {
        path: '/system',
        name: 'system',
        component: Layout,
        alwaysShow: true,
        redirect: '/system/database',
        meta: {title: '系统管理', icon: 'system'},
        children: [
            {
                path: 'database',
                name: 'database-list',
                component: () => import('@/views/system/database/index'),
                meta: {title: '数据库备份还原'},
            },
        ]
    },
    {
        path: '/product',
        name: 'product',
        component: Layout,
        alwaysShow: true,
        meta: {title: '商品管理', icon: 'product'},
        children: [
            {
                path: 'cate',
                name: 'product-cate',
                component: () => import('@/views/product/cate/index'),
                meta: {title: '商品分类'},
            },
            {
                path: 'goods',
                name: 'product-goods',
                component: () => import('@/views/product/pro/index'),
                meta: {title: '商品管理'},
            },
        ]
    },
    {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

