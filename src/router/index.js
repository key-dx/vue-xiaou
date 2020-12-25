import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Router)
Vue.use(ElementUI);
export default new Router({
  routes: [
    {
      alias: '/home',
      path: '/',
      component: () => import('../components/pages/index'),
      meta: { selected: '/' },
      children: [
        { path: 'menu', component: () => import('../components/pages/menu'), meta: { selected: '/menu' } },
        { path: 'menu/add', component: () => import('../components/pages/addmenu'), meta: { selected: '/menu' } },
        { path: 'menu/:id', component: () => import('../components/pages/addmenu'), meta: { selected: '/menu' } },
        { path: 'role', component: () => import('../components/pages/role'), meta: { selected: '/role' } },
        { path: 'role/add', component: () => import('../components/pages/addrole'), meta: { selected: '/role' } },
        { path: 'role/:id', component: () => import('../components/pages/addrole'), meta: { selected: '/role' } },
      ]
    }
  ]
})
