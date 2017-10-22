<style>
.bg-dark {
    background-color: #324157;
}

.el-menu--collapse {
    width: 60px;
}
</style>

<template>
    <div class="app-aside hidden-xs bg-dark" :class="{'off-screen': offScreen}">
        <div class="clearfix hidden-xs text-center hide show" id="aside-user">
            <div class="dropdown wrapper">
                <a href="app.page.profile">
                    <span class="thumb-lg w-auto-folded avatar m-t-sm">
                        <img src="/Uploads/Picture/2017-06-06/59369fb016efa.png" class="img-full" alt="...">
                    </span>
                </a>
                <a href="#" class=" hidden-folded">
                    <span class="clear">
                        <span class="block m-t-sm">
                            <strong class="font-bold text-lt">一桶浆糊</strong>
                        </span>
                        <span class="text-muted text-xs block">欢迎回来.</span>
                        <span class="text-muted text-xs block">上次登录:2017-10-10 23:15</span>
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
                </a>
            </div>
            <div class="line dk hidden-folded"></div>
        </div>
        <el-menu theme="dark" :default-active="$route.path" class="el-menu-vertical-demo" @select="select_menu" :collapse="isCollapse" :unique-opened="true" :router="true">
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
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            offScreen: false
        }
    },
    computed: {
        isCollapse() {
            var boolean = this.$store.getters.getIsCollapse;
            var body = document.body;
            if (body.clientWidth <= 768) {
                this.offScreen = boolean;
                return false;
            } else {
                boolean ?
                    body.classList.add('app-aside-folded') :
                    body.classList.remove('app-aside-folded');
            }

            return boolean;
        }
    },
    methods: {
        select_menu(index) {
            var isOpened = document.getElementsByClassName('is-opened')[0];
            if (index.indexOf('-') < 0 && isOpened) {
                var elMenu = isOpened.getElementsByClassName('el-submenu__title')[0];
                elMenu.click();
            }
        }
    },
    created() {
    }
}
</script>
