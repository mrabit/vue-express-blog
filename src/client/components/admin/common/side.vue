<style>
.bg-dark {
  background-color: #324157;
}
</style>

<template>
    <div class="app-aside hidden-xs bg-dark" :class="{'off-screen': offScreen}">
        <div class="clearfix hidden-xs text-center hide show" id="aside-user">
            <div class="dropdown wrapper">
                <div>
                    <span class="thumb-lg w-auto-folded avatar m-t-sm">
                        <img :src="user.user_header_img" class="img-full" alt="...">
                    </span>
                </div>
                <div class="hidden-folded">
                    <span class="clear">
                        <span class="block m-t-sm">
                            <strong class="font-bold text-lt">{{ user.uname }}</strong>
                        </span>
                        <span class="text-muted text-xs block">欢迎回来.</span>
                        <span class="text-muted text-xs block">上次登录: {{ user.last_login_time | format_time }}</span>
                    </span>
                    <div class="quick-stats">
                        <ul class="no-padder">
                            <li class="inline">
                                <span>456
                                    <i>今日文章</i>
                                </span>
                            </li>
                            <li class="inline">
                                <span>2,345
                                    <i>今日访客</i>
                                </span>
                            </li>
                            <li class="inline">
                                <span>120
                                    <i>历史访客</i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="line dk hidden-folded"></div>
        </div>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
            @select="select_menu" :collapse="isCollapse" :unique-opened="true" :router="true"
            background-color="#324157"
            text-color="#a6a8b1"
            active-text-color="#20a0ff">
            <el-menu-item index="/admin/index.html">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2" class="bg-dark">
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span slot="title">文章管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/admin/article_list.html">文章列表</el-menu-item>
                    <el-menu-item index="/admin/article_add.html">发布文章</el-menu-item>
                    <el-menu-item index="/admin/article_edit.html">修改文章</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" class="bg-dark">
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span slot="title">标签管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/admin/article_tags.html">标签展示</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" class="bg-dark">
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span slot="title">用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/admin/profile.html">修改资料</el-menu-item>
                    <el-menu-item index="/admin/wx_auth.html">微信权限</el-menu-item>
                    <el-menu-item index="/admin/edit_about.html">修改关于</el-menu-item>
                    <el-menu-item index="/admin/passwd.html">修改密码</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
import moment from "moment";
var WebStorageCache = require("web-storage-cache");
var wsCache = new WebStorageCache();
var config = require("../../../config");

export default {
  data() {
    return {
      offScreen: false
    };
  },
  filters: {
    format_time(time) {
      return moment(time * 1000).format("YYYY-MM-DD HH:mm");
    }
  },
  computed: {
    user() {
      return this.$store.getters["admin/getUser"];
    },
    isCollapse() {
      var boolean = this.$store.getters["admin/getIsCollapse"];
      var body = document.body;
      if (body.clientWidth <= 768) {
        this.offScreen = boolean;
        return false;
      } else {
        boolean
          ? body.classList.add("app-aside-folded")
          : body.classList.remove("app-aside-folded");
      }

      return boolean;
    }
  },
  methods: {
    select_menu(index) {
      var isOpened = document.getElementsByClassName("is-opened")[0];
      if (index.indexOf("-") < 0 && isOpened) {
        var elMenu = isOpened.getElementsByClassName("el-submenu__title")[0];
        elMenu.click();
      }
    }
  },
  mounted() {
    // 获取token缓存;
    var token = wsCache.get("token");
    // 存在token,构建websocket通讯
    if (token) {
      token = token.token;
      var ws = new WebSocket(config.socket + "?token");
      ws.onopen = function() {
        // 发送当前token到服务器,做校验
        ws.send(token);
      };
      ws.onmessage = evt => {
        // 接收消息
        var data = JSON.parse(evt.data);
        // 下线通知
        if (data.code == 107) {
          alert(data.message);
          wsCache.delete("token");
          this.$router.push("/admin/login.html");
          ws.close();
        }
      };
    }
  }
};
</script>
