import Vue from 'vue'
import Vuex from 'vuex'
import cinema from './module/cinema'
import city from './module/city'
import tabbar from './module/tabbarshowModule'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer(data){
      return {
        city:data.city
      }
    }
  })],
  state: {
    isTabbarShow:true
  },
  mutations: {
    show(state){
      state.isTabbarShow = true
    },
    hide(state){
      state.isTabbarShow = false
    }
  },
  actions: {
  },
  modules: {
    cinema,
    city,
    tabbar
  }
})
