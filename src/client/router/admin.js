import NotFoundComponent from '../components/notFound.vue';

export default {
    path: '/admin',
    component: (resolve) => void(require(['../Admin.vue'], resolve)),
    redirect: '/admin/index.html',
    children: [{
        path: 'login.html',
        meta: {
            title: '登录',
            login: true
        },
        components: {
            default: (resolve) => void(require(['../components/admin/login.vue'], resolve)),
        }
    }, {
        path: 'index.html',
        meta: {
            title: '首页',
            requireAuth: true
        },
        components: {
            default: (resolve) => void(require(['../components/admin/index.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: 'article_list.html',
        meta: {
            title: '文章列表',
            requireAuth: true
        },
        components: {
            default: (resolve) => void(require(['../components/admin/article_list.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: 'article_add.html',
        meta: {
            title: '新增文章',
            requireAuth: true
        },
        components: {
            default: (resolve) => void(require(['../components/admin/article_add.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: 'article_edit.html',
        meta: {
            title: '修改文章',
            requireAuth: true
        },
        components: {
            default: (resolve) => void(require(['../components/admin/article_add.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: 'article_tags.html',
        meta: {
            title: '标签管理',
            requireAuth: true
        },
        components: {
            default: (resolve) => void(require(['../components/admin/article_tags.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: 'profile.html',
        meta: {
            title: '修改资料',
            requireAuth: true
        },
        components: {
            default: (resolve) => void(require(['../components/admin/profile.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: 'edit_about.html',
        meta: {
            title: '修改关于',
            requireAuth: true
        },
        components: {
            default: (resolve) => void(require(['../components/admin/edit_about.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: 'passwd.html',
        meta: {
            title: '修改密码',
            requireAuth: true
        },
        components: {
            default: (resolve) => void(require(['../components/admin/passwd.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: 'wx_auth.html',
        meta: {
            title: '微信权限',
            requireAuth: true
        },
        components: {
            default: (resolve) => void(require(['../components/admin/wx_auth.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: 'links.html',
        meta: {
            title: '友链配置',
            requireAuth: true
        },
        components: {
            default: (resolve) => void(require(['../components/admin/links.vue'], resolve)),
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve)),
        }
    }, {
        path: '*',
        components: {
            default: NotFoundComponent,
            side: (resolve) => void(require(['../components/admin/common/side.vue'], resolve)),
            header: (resolve) => void(require(['../components/admin/common/header.vue'], resolve))
        },
        meta: {
            title: '首页',
            requireAuth: true
        }
    }]
}