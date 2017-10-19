// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import nProgress from 'nprogress';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import './assets/html_common.scss';
import './assets/admin_common.scss';
import "nprogress/nprogress.css";
import 'element-ui/lib/theme-default/index.css';
import axios from 'axios';


Vue.use(ElementUI);
Vue.use(Vuex);

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    document.title = to.meta.title + ' - 一桶浆糊的博客';
    nProgress.start();
    next();
});

router.afterEach((to, from, next) => {
    nProgress.done();
    window.scroll(0, 0)
})

/************配置vuex************/
const store = new Vuex.Store({
    state: {
        isCollapse: false
    },
    getters: {
        getIsCollapse: (state, getters, rootState) => {
            return state.isCollapse
        }
    },
    mutations: {
        changeIsCollapse(state) {
            state.isCollapse = !state.isCollapse;
        }
    },
});
/************配置vuex************/

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})