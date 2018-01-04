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
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axios';
import webStorageCache from 'web-storage-cache';

Vue.use(ElementUI);
Vue.use(Vuex);

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
var wsCache = new webStorageCache();

router.beforeEach((to, from, next) => {
    document.title = to.meta.title + ' - 一桶浆糊的博客';
    var path = to.path;
    // tp3.2路由地址跳转
    // 标签页匹配
    // /index/index/tags_id/16.html
    var reg3 = /^(\/home|)\/index\/.*?\/tags_id\/(\d+).html/;
    if (reg3.test(path)) {
        return next(path.replace(reg3, "/index.html?tags_id=$2"));
    }
    // 其余页面匹配
    // /index/index/page/2.html
    // /home/index/details/id/34.html
    // /home/tags/index.html
    var reg = /^(\/home|)\/index(\/.*?)\/.*?(\/\d+.html)/;
    var reg2 = /^(\/home|)(\/.*?)\/index(.html)/;
    var strReplace = reg.test(path) ? reg : (reg2.test(path) ? reg2 : null);
    if (strReplace) {
        return next(path.replace(strReplace, "$2$3"));
    }
    var user = wsCache.get('token');
    // 登录页, 存在登录信息, 调用接口判断token生效则跳转后台首页
    if (to.meta.login && user) {
        axios.post('/api/check_token').then(result => {
            nProgress.start();
            return next('/admin/index.html');
        });
    }

    // 是否需要认证权限
    if (to.meta.requireAuth) {
        // 不存在token信息,跳转登录页
        if (!user) {
            return next('/admin/login.html')
        }
        // 刷新本地token过期时间
        wsCache.touch('token', 60 * 60);
    }
    nProgress.start();
    next();
});

router.afterEach((to, from, next) => {
    nProgress.done();
    window.scroll(0, 0)
})

/************配置vuex************/
const store = new Vuex.Store({
    modules: {
        admin: {
            namespaced: true,
            state: {
                isCollapse: false,
                user: {}
            },
            getters: {
                getIsCollapse: (state, getters, rootState) => {
                    return state.isCollapse
                },
                getUser: (state, getter, rootState) => {
                    return state.user;
                }
            },
            mutations: {
                changeIsCollapse(state) {
                    state.isCollapse = !state.isCollapse;
                },
                changeUser(state, val) {
                    state.user = val;
                }
            }
        },
        frontend: {
            namespaced: true,
            state: {
                user: {}
            },
            getters: {
                getUser(state) {
                    return state.user;
                }
            },
            mutations: {
                changeUser(state, val) {
                    state.user = val;
                }
            }
        }
    }
});
/************配置vuex************/

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})