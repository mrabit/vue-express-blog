import NotFoundComponent from '../components/notFound.vue';

export default {
    path: '/admin',
    component: (resolve) => void(require(['../Admin.vue'], resolve)),
    redirect: '/admin/index.html',
    children: [{
        path: 'index.html',
        meta: {
            title: '首页'
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
    }, {
        path: 'article_add.html',
        meta: {
            title: '新增文章'
        },
        components: {
            default: (resolve) => void(require(['../components/admin/article_add.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: 'article_edit.html',
        meta: {
            title: '修改文章'
        },
        components: {
            default: (resolve) => void(require(['../components/admin/article_add.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: 'article_tags.html',
        meta: {
            title: '标签管理'
        },
        components: {
            default: (resolve) => void(require(['../components/admin/article_tags.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: '/admin/*',
        components: {
            default: NotFoundComponent,
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve))
        },
        meta: {
            title: '首页'
        }
    }]
}