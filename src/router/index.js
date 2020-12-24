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
        { path: 'user', component: () => import('../components/pages/user'), meta: { selected: '/user' } },
        { path: 'menu', component: () => import('../components/pages/menu'), meta: { selected: '/menu' } },
        { path: 'menu/add', component: () => import('../components/pages/addmenu'), meta: { selected: '/menu' } }
      ]
    }
  ]
})
