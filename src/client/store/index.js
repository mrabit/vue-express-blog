import Vue from 'vue';
import Vuex from 'vuex';
import admin from './modules/admin';
import frontend from './modules/frontend';
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    admin,
    frontend
  },
});
