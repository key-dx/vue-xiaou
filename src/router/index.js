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
        { path: 'menu', component: () => import('../components/pages/menu/index'), meta: { selected: '/menu' } },
        { path: 'menu/add', component: () => import('../components/pages/menu/info'), meta: { selected: '/menu' } },
        { path: 'menu/:id', component: () => import('../components/pages/menu/info'), meta: { selected: '/menu' } },
        { path: 'role', component: () => import('../components/pages/role/index'), meta: { selected: '/role' } },
        { path: 'role/add', component: () => import('../components/pages/role/info'), meta: { selected: '/role' } },
        { path: 'role/:id', component: () => import('../components/pages/role/info'), meta: { selected: '/role' } },
        { path: 'user', component: () => import('../components/pages/user/index'), meta: { selected: '/user' } },
        { path: 'user/add', component: () => import('../components/pages/user/info'), meta: { selected: '/user' } },
        { path: 'user/:id', component: () => import('../components/pages/user/info'), meta: { selected: '/user' } },
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
      let allPath = info.menus_url
      allPath.push('/')
      allPath.push('/404')
      if (allPath.indexOf(nowPath) != -1) {
        next()
      } else {
        next('/')
      }

    }
  }
})
export default router