<template>
    <div>
        <nav id="sidebar" class="behavior_1">
            <div class="text-center m-t-lg profile ">
                <a href="#" class="block">
                    <img src="https://blog.ssliuq.com/Uploads/Picture/2017-06-06/59369fb016efa.png" class="thumb-lg avatar image_logo" alt="">
                </a>
                <span class="m-t-md block h4 sidebar_title hidden-sm hidden-xs">一桶浆糊的博客</span>
            </div>
            <ul class="nav_list padder-lg">
                <li class="list-inline m-t-md block">
                    <router-link class="block" to="/index.html" title="首页">
                        <i class="iconfont fa fa-home"></i>
                        <span class="text-md visible-md-inline visible-lg-inline">首页</span>
                    </router-link>
                </li>
                <li class="list-inline m-t-md">
                    <router-link class="block" to="/archives.html" title="归档">
                        <i class="iconfont fa fa-archive"></i>
                        <span class="text-md visible-md-inline visible-lg-inline">归档</span>
                    </router-link>
                </li>
                <li class="list-inline m-t-md">
                    <router-link class="block" to="/tags.html" title="标签">
                        <i class="iconfont fa fa-tags"></i>
                        <span class="text-md visible-md-inline visible-lg-inline">标签</span>
                    </router-link>
                </li>
                <li class="list-inline m-t-md">
                    <a class="block" href="#" title="关于">
                        <i class="iconfont fa fa-user"></i>
                        <span class="text-md visible-md-inline visible-lg-inline">关于</span>
                    </a>
                </li>
                <li class="list-inline m-t-md">
                    <router-link class="block" to="/bing.html" title="bing每日图片">
                        <i class="iconfont fa fa-file-image-o"></i>
                        <span class="text-md visible-md-inline visible-lg-inline">图片</span>
                    </router-link>
                </li>
                <li class="list-inline m-t-md">
                    <a class="block" href="#" title="分享">
                        <i class="iconfont fa fa-share-alt"></i>
                        <span class="text-md visible-md-inline visible-lg-inline">分享</span>
                    </a>
                </li>
                <li class="list-inline m-t-md">
                    <a href="#" target="_blank" class="share">
                        <i class="fa fa-weibo iconfont"></i>
                    </a>
                    <a href="#" target="_blank" class="share">
                        <i class="fa fa-github iconfont"></i>
                    </a>
                    <a href="#" target="_blank" class="share">
                        <i class="fa fa-twitter iconfont"></i>
                    </a>
                </li>
            </ul>
        </nav>
        <header class="header navbar navbar-inverse navbar-fixed-top visible-xs-block">
            <div id="menuToggle">
                <i class="fa fa-align-justify"></i>
            </div>
            <p class="text-center text-lg header_title m-b-none">一桶浆糊的博客</p>
            <a href="#" class="me"><img src="https://blog.ssliuq.com/Uploads/Picture/2017-06-06/59369fb016efa.png" class=" avatar " alt=""></a>
        </header>
        <div id="sidebar-mask"></div>
    </div>
</template>
<style>

</style>
<script>
//窗口改变,取消side展示
$(window).resize(() => {
    $("body").removeClass("side");
});
//mobile touch事件 & click 事件
$('body').on('touchstart click', '#sidebar-mask', () => {
    $("body").removeClass("side");
    return false;
});
//toggle 展示side
$('body').on('click', '#menuToggle,.nav_list',() => {
    window.scrollTo(0, 0);
    $("body").toggleClass("side");
});
</script>