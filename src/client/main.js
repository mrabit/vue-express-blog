// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/html_common.scss';
import axios from 'axios';
import nProgress from 'nprogress';
import "nprogress/nprogress.css";

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    nProgress.start();
    next();
});

router.afterEach((to, from, next) => {
    nProgress.done();
    window.scroll(0, 0)
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})