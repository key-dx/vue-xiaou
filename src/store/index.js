import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import createPersistedState from 'vuex-persistedstate'
var store = new Vuex.Store({

  state: {
    menuData: [],
    userinfo: null
  },
  mutations: {
    setMenuData(state, data) {
      state.menuData.push(data)
    },
    setUserinfo(state, data) {
      state.userinfo = data
    }
  },
  actions: {
    setUserinfoSync(context, data) {
      context.commit('setUserinfo', data)

    }
  },
  plugins: [createPersistedState()],
})
export default store