import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    menuData: [
      {
        pid: 0,
        type: 1,
        title: "首页",
        icon: "el-icon-menu",
        url: "",
        status: 1
      },
      {
        type: 1,
        pid: 0,
        title: "系统设置",
        icon: "el-icon-setting",
        url: "",
        status: 1
      },
      {
        type: 2,
        pid:1,
        title: "菜单管理",
        icon: "",
        url: "/menu",
        status: 1
      },
      {
        type: 2,
        pid:1,
        title: "角色管理",
        icon: "",
        url: "/user",
        status: 1
      },
      {
        type: 1,
        pid: 0,
        title: "商城设置",
        icon: "el-icon-goods",
        url: "",
        status: 0
      }]
  },
  mutations: {
    setMenuData(state, data) {
      state.menuData.push(data)
    }
  }
})
export default store