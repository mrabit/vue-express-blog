import Vue from 'vue';
import Router from 'vue-router';
import NotFoundComponent from '../components/notFound.vue';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        redirect: '/index.html'
    }, {
        path: '/index.html',
        name: 'index',
        components: {
            default: (resolve) => void(require(['../components/frontend/index.vue'], resolve)),
            side: (resolve) => void(require(['../components/frontend/common/side.vue'], resolve)),
            footer: (resolve) => void(require(['../components/frontend/common/footer.vue'], resolve))
        },
        meta: {
            title: '首页 - 一桶浆糊的博客'
        }
    }, {
        path: '/index/:page.html',
        name: 'index',
        components: {
            default: (resolve) => void(require(['../components/frontend/index.vue'], resolve)),
            side: (resolve) => void(require(['../components/frontend/common/side.vue'], resolve)),
            footer: (resolve) => void(require(['../components/frontend/common/footer.vue'], resolve))
        },
        meta: {
            title: '首页 - 一桶浆糊的博客'
        }
    }, {
        path: '/details/:id.html',
        name: 'details',
        components: {
            default: (resolve) => void(require(['../components/frontend/details.vue'], resolve)),
            side: (resolve) => void(require(['../components/frontend/common/side.vue'], resolve)),
            footer: (resolve) => void(require(['../components/frontend/common/footer.vue'], resolve))
        },
        meta: {
            title: '详情 - 一桶浆糊的博客'
        }
    }, {
        path: '/archives.html',
        name: 'archives',
        components: {
            default: (resolve) => void(require(['../components/frontend/archives.vue'], resolve)),
            side: (resolve) => void(require(['../components/frontend/common/side.vue'], resolve)),
            footer: (resolve) => void(require(['../components/frontend/common/footer.vue'], resolve))
        },
        meta: {
            title: '归档 - 一桶浆糊的博客'
        }
    }, {
        path: '/tags.html',
        name: 'tags',
        components: {
            default: (resolve) => void(require(['../components/frontend/tags.vue'], resolve)),
            side: (resolve) => void(require(['../components/frontend/common/side.vue'], resolve)),
            footer: (resolve) => void(require(['../components/frontend/common/footer.vue'], resolve))
        },
        meta: {
            title: '标签 - 一桶浆糊的博客'
        }
    }, {
        path: '*',
        components: {
            default: NotFoundComponent,
            side: (resolve) => void(require(['../components/frontend/common/side.vue'], resolve)),
            footer: (resolve) => void(require(['../components/frontend/common/footer.vue'], resolve))
        },
        meta: {
            title: '首页 - 一桶浆糊的博客'
        }
    }]
})