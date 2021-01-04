import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Router)
Vue.use(ElementUI);


let router = new Router({
  routes: [
    {
      alias: '/home',
      path: '/',
      component: () => import('../components/pages/index'),
      meta: { selected: '/' },
      children: [
        { path: 'home', component: () => import('../components/pages/home'), meta: { selected: '/home' } },
        { path: 'menu', component: () => import('../components/pages/menu/index'), meta: { selected: '/menu' } },
        { path: 'menu/add', component: () => import('../components/pages/menu/info'), meta: { selected: '/menu' } },
        { path: 'menu/:id', component: () => import('../components/pages/menu/info'), meta: { selected: '/menu' } },
        { path: 'role', component: () => import('../components/pages/role/index'), meta: { selected: '/role' } },
        { path: 'role/add', component: () => import('../components/pages/role/info'), meta: { selected: '/role' } },
        { path: 'role/:id', component: () => import('../components/pages/role/info'), meta: { selected: '/role' } },
        { path: 'user', component: () => import('../components/pages/user/index'), meta: { selected: '/user' } },
        { path: 'user/add', component: () => import('../components/pages/user/info'), meta: { selected: '/user' } },
        { path: 'user/:id', component: () => import('../components/pages/user/info'), meta: { selected: '/user' } },
        { path: 'cate', component: () => import('../components/pages/cate/index'), meta: { selected: '/cate' } },
        { path: 'cate/add', component: () => import('../components/pages/cate/info'), meta: { selected: '/cate' } },
        { path: 'cate/:id', component: () => import('../components/pages/cate/info'), meta: { selected: '/cate' } },
        { path: 'specs', component: () => import('../components/pages/specs/index'), meta: { selected: '/specs' } },
        { path: 'specs/add', component: () => import('../components/pages/specs/info'), meta: { selected: '/specs' } },
        { path: 'specs/:id', component: () => import('../components/pages/specs/info'), meta: { selected: '/specs' } },
        { path: 'goods', component: () => import('../components/pages/goods/index'), meta: { selected: '/goods' } },
        { path: 'goods/add', component: () => import('../components/pages/goods/info'), meta: { selected: '/goods' } },
        { path: 'goods/:id', component: () => import('../components/pages/goods/info'), meta: { selected: '/goods' } },
        { path: 'member', component: () => import('../components/pages/member/index'), meta: { selected: '/member' } },
        { path: 'member/add', component: () => import('../components/pages/member/info'), meta: { selected: '/member' } },
        { path: 'member/:id', component: () => import('../components/pages/member/info'), meta: { selected: '/member' } },
        { path: 'banner', component: () => import('../components/pages/banner/index'), meta: { selected: '/banner' } },
        { path: 'banner/add', component: () => import('../components/pages/banner/info'), meta: { selected: '/banner' } },
        { path: 'banner/:id', component: () => import('../components/pages/banner/info'), meta: { selected: '/banner' } },
        { path: 'seck', component: () => import('../components/pages/seck/index'), meta: { selected: '/seck' } },
        { path: 'seck/add', component: () => import('../components/pages/seck/info'), meta: { selected: '/seck' } },
        { path: 'seck/:id', component: () => import('../components/pages/seck/info'), meta: { selected: '/seck' } },
      ]
    },
    {
      path: '/login',
      component: () => import('../components/pages/login')
    }
  ]
})

import store from '../store'
router.beforeEach((to, from, next) => {
  if (to.fullPath === '/login') {
    next();
  } else {
    var info = store.state.userinfo
    // var username = sessionStorage.getItem('username');
    if (info === null) {
      next('/login');
    } else {
      let nowPath = to.meta.selected
      var allPath = info.menus_url
      if (info.menus_url.indexOf('/') == -1) {
        allPath.push('/')
        allPath.push('/home')
      }
      if (allPath.indexOf(nowPath) != -1) {
        next()
      } else {
        next('/')
      }
    }
  }
})
export default router