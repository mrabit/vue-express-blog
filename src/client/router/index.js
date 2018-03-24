import Vue from 'vue';
import Router from 'vue-router';
import NotFoundComponent from '../components/notFound.vue';
import admin from './admin';

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
      title: '首页'
    }
  }, {
    path: '/index/:page.html',
    name: 'page',
    components: {
      default: (resolve) => void(require(['../components/frontend/index.vue'], resolve)),
      side: (resolve) => void(require(['../components/frontend/common/side.vue'], resolve)),
      footer: (resolve) => void(require(['../components/frontend/common/footer.vue'], resolve))
    },
    meta: {
      title: '首页'
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
      title: '详情'
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
      title: '归档'
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
      title: '标签'
    }
  }, {
    path: '/bing.html',
    name: 'bing',
    components: {
      default: (resolve) => void(require(['../components/frontend/bing.vue'], resolve)),
      side: (resolve) => void(require(['../components/frontend/common/side.vue'], resolve)),
      footer: (resolve) => void(require(['../components/frontend/common/footer.vue'], resolve))
    },
    meta: {
      title: 'bing每日一图'
    }
  }, {
    path: '/bing/:page.html',
    name: 'bing_page',
    components: {
      default: (resolve) => void(require(['../components/frontend/bing.vue'], resolve)),
      side: (resolve) => void(require(['../components/frontend/common/side.vue'], resolve)),
      footer: (resolve) => void(require(['../components/frontend/common/footer.vue'], resolve))
    },
    meta: {
      title: 'bing每日一图'
    }
  }, {
    path: '/about.html',
    name: 'about',
    components: {
      default: (resolve) => void(require(['../components/frontend/about.vue'], resolve)),
      side: (resolve) => void(require(['../components/frontend/common/side.vue'], resolve)),
      footer: (resolve) => void(require(['../components/frontend/common/footer.vue'], resolve))
    },
    meta: {
      title: '关于'
    }
  }, {
    path: '/links.html',
    name: 'links',
    components: {
      default: (resolve) => void(require(['../components/frontend/links.vue'], resolve)),
      side: (resolve) => void(require(['../components/frontend/common/side.vue'], resolve)),
      footer: (resolve) => void(require(['../components/frontend/common/footer.vue'], resolve))
    },
    meta: {
      title: '友链'
    }
  }, admin, {
    path: '*',
    components: {
      default: NotFoundComponent,
      side: (resolve) => void(require(['../components/frontend/common/side.vue'], resolve)),
      footer: (resolve) => void(require(['../components/frontend/common/footer.vue'], resolve))
    },
    meta: {
      title: '首页'
    }
  }]
})
