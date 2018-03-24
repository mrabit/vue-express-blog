<template>
  <div>
    <nav id="sidebar" class="behavior_1">
      <div class="text-center m-t-lg profile ">
        <a href="#" class="block">
                    <img :src="user.user_header_img" class="thumb-lg avatar image_logo" alt="">
                </a>
        <span class="m-t-md block h4 sidebar_title hidden-sm hidden-xs">{{ user.blog_name }}的博客</span>
      </div>
      <ul class="nav_list padder-lg">
        <li class="list-inline m-t-md block" v-for="(item, index) in side_btn" :key="index">
          <router-link class="block" :to="item.href" :title="item.title">
            <i :class="item.icons" @click="removeCLass(!isSide)"></i>
            <span class="text-md visible-md-inline visible-lg-inline">{{ item.span }}</span>
          </router-link>
        </li>
        <li class="list-inline m-t-md">
          <a :href="item.href" v-if="item.href != '#'" target="_blank" class="share" v-for="(item, index) in share_btn" :key="index">
                        <i :class="item.icons" @click="removeCLass(!isSide)"></i>
                    </a>
        </li>
      </ul>
    </nav>
    <header class="header navbar navbar-inverse navbar-fixed-top visible-xs-block">
      <div id="menuToggle" @click="removeCLass(!isSide)">
        <i class="fa fa-align-justify"></i>
      </div>
      <p class="text-center text-lg header_title m-b-none">{{ user.blog_name }}的博客</p>
      <a href="#" class="me"><img :src="user.user_header_img" class=" avatar " alt=""></a>
    </header>
    <div id="sidebar-mask"></div>
  </div>
</template>
<style>


</style>
<script>
import {
  mapGetters
} from 'vuex';
export default {
  data() {
    return {
      isSide: false,
      side_btn: [{
          title: "首页",
          span: "首页",
          icons: "iconfont fa fa-home",
          href: "/index.html"
        },
        {
          title: "归档",
          span: "归档",
          icons: "iconfont fa fa-archive",
          href: "/archives.html"
        },
        {
          title: "标签",
          span: "标签",
          icons: "iconfont fa fa-tags",
          href: "/tags.html"
        },
        {
          title: "关于",
          span: "关于",
          icons: "iconfont fa fa-user",
          href: "/about.html"
        },
        {
          bing每日图片: "图片",
          span: "图片",
          icons: "iconfont fa fa-file-image-o",
          href: "/bing.html"
        },
        {
          title: "友链",
          span: "友链",
          icons: "iconfont fa fa-share-alt",
          href: "/links.html"
        }
      ],
      share_btn: [{
          href: "#",
          icons: "fa fa-weibo iconfont"
        },
        {
          href: "#",
          icons: "fa fa-github iconfont"
        },
        {
          href: "#",
          icons: "fa fa-twitter iconfont"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    removeCLass(boolean) {
      this.isSide = boolean;
      var body = document.body;
      boolean ? body.classList.add("side") : body.classList.remove("side");
    }
  },
  watch: {
    user(val) {
      this.share_btn[0].href = val.weibo;
      this.share_btn[1].href = val.github;
      this.share_btn[2].href = val.twitter;
    }
  },
  mounted() {
    document.getElementById("sidebar-mask").onclick = () => {
      this.removeCLass(false);
    };
    this.$store.dispatch('getUserInfo');
  }
};

</script>
