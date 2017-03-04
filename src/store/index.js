import Vuex from 'vuex'
import Vue from 'vue'
import {actions, mutations, state} from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  mutations, actions, state
})

export default store
