import Vue from "vue"
import Router from "vue-router"
/* Layout */
import Layout from "../views/layout/Layout"

// 在开发环境中不使用延迟加载，因为延迟加载太多页面会导致webpack热更新太慢。 所以只有在生产中使用延迟加载;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
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
    {
        path: "/login",
        component: () => import("@/views/login/index"),
        hidden: true
    },
    {
        path: "/404",
        component: () => import("@/views/404"),
        hidden: true
    },
    {
        path: "",
        component: Layout,
        redirect: "dashboard",
        name: "dashboard",
        children: [
            {
                path: "dashboard",
                name: "index",
                component: () => import("@/views/dashboard/index"),
                meta: { title: "首页", icon: "table" }
            }
        ]
    },
    {
        path: "/admin",
        component: Layout,
        name: "admin",
        redirect: "/admin/user",
        meta: { title: "后台管理", icon: "admin-manage" },
        children: [
            {
                path: "user",
                name: "admin-user",
                component: () => import("@/views/admin/user/index"),
                meta: { title: "后台用户列表" }
            },
            {
                path: "addAdmin",
                name: "add-admin",
                component: () => import("@/views/admin/user/addUser"),
                meta: { title: "添加管理员" },
                hidden: true
            },
            {
                path: "role",
                name: "admin-role",
                component: () => import("@/views/admin/role/index"),
                meta: { title: "角色管理" }
            },
            {
                path: "node",
                name: "admin-node",
                component: () => import("@/views/admin/node/index"),
                meta: { title: "节点管理" }
            }
        ]
    },
    {
        path: "/member",
        name: "member",
        component: Layout,
        alwaysShow: true,
        redirect: "/member/index",
        meta: { title: "会员管理", icon: "member" },
        children: [
            {
                path: "index",
                name: "member-list",
                component: () => import("@/views/member/index"),
                meta: { title: "会员列表" }
            }
        ]
    },
    {
        path: "/system",
        name: "system",
        component: Layout,
        alwaysShow: true,
        redirect: "/system/database",
        meta: { title: "系统管理", icon: "system" },
        children: [
            {
                path: "database",
                name: "database-list",
                component: () => import("@/views/system/database/index"),
                meta: { title: "数据库备份还原" }
            }
        ]
    },
    {
        path: "/product",
        name: "product",
        component: Layout,
        alwaysShow: true,
        redirect: "/product/goods",
        meta: { title: "商品管理", icon: "product" },
        children: [
            {
                path: "cate",
                name: "product-cate",
                component: () => import("@/views/product/cate/index"),
                meta: { title: "商品分类" }
            },
            {
                path: "goods",
                name: "product-goods",
                component: () => import("@/views/product/pro/index"),
                meta: { title: "商品管理" }
            },
            {
                path: "addgoods",
                name: "product-addgoods",
                component: () => import("@/views/product/pro/addPro"),
                meta: { title: "商品添加" },
                hidden: true
            },
            {
                path: "editgoods",
                name: "product-editgoods",
                component: () => import("@/views/product/pro/editPro"),
                meta: { title: "商品修改" },
                hidden: true
            }
        ]
    },
    {
        path: "/order",
        name: "order",
        component: Layout,
        alwaysShow: true,
        redirect: "/order/order",
        meta: { title: "订单管理", icon: "order" },
        children: [
            {
                path: "order",
                name: "order-list",
                component: () => import("@/views/order/order/index"),
                meta: { title: "订单列表" }
            },
            {
                path: "detail",
                name: "order-detail",
                component: () => import("@/views/order/order/detail"),
                meta: { title: "订单详情" },
                hidden: true
            },
            {
                path: "express",
                name: "express-list",
                component: () => import("@/views/order/express/index"),
                meta: { title: "快递公司" }
            }
        ]
    },
    {
        path: "/recommend",
        name: "recommend",
        component: Layout,
        alwaysShow: true,
        redirect: "/recommend/index",
        meta: { title: "推荐管理", icon: "recommend" },
        children: [
            {
                path: "index",
                name: "recommend-list",
                component: () => import("@/views/recommend/postion/index"),
                meta: { title: "推荐位置管理" }
            },
            {
                path: "content",
                name: "recommend-content",
                component: () => import("@/views/recommend/content/index"),
                meta: { title: "推荐内容管理" }
            }
        ]
    },
    { path: "*", redirect: "/404", hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
