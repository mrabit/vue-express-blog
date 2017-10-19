export default {
    path: '/admin',
    component: (resolve) => void(require(['../Admin.vue'], resolve)),
    children: [{
        path: 'index.html',
        meta: {
            title: '登录哈哈'
        },
        components: {
            default: (resolve) => void(require(['../components/admin/index.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: 'article_list.html',
        meta: {
            title: '文章列表'
        },
        components: {
            default: (resolve) => void(require(['../components/admin/article_list.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }]
}