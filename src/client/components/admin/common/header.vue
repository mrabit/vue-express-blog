<template>
    <header id="header" class="app-header navbar" role="menu">
        <!-- navbar header -->
        <div class="navbar-header bg-dark">
            <button class="pull-right visible-xs dk" ui-toggle-class="show" target=".navbar-collapse">
                <i class="glyphicon glyphicon-cog"></i>
            </button>
            <button @click="changeIsCollapse" class="pull-right visible-xs" ui-toggle-class="off-screen" target=".app-aside" ui-scroll="app">
                <i class="glyphicon glyphicon-align-justify"></i>
            </button>
            <!-- brand -->
            <a href="#/" class="navbar-brand text-lt">
                <i class="fa fa-btc"></i>
                <!--<img src="img/logo.png" alt="." class="hide">-->
                <span class="hidden-folded m-l-xs">一桶浆糊</span>
            </a>
            <!-- / brand -->
        </div>
        <!-- / navbar header -->

        <!-- navbar collapse -->
        <div class="collapse pos-rlt navbar-collapse box-shadow bg-white-only">
            <!-- buttons -->
            <div class="nav navbar-nav hidden-xs">
                <div @click="changeIsCollapse" class="btn no-shadow navbar-btn">
                    <i class="fa fa-dedent fa-fw text"></i>
                    <i class="fa fa-indent fa-fw text-active"></i>
                </div>
                <!--<a href="#" class="btn no-shadow navbar-btn" ui-toggle-class="show" target="#aside-user">-->
                <!--<i class="icon-user fa-fw"></i>-->
                <!--</a>-->
            </div>
            <!-- / buttons -->

            <!-- link and dropdown -->
            <ul class="nav navbar-nav hidden-sm">
                <li class="dropdown">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                        <i class="fa fa-fw fa-plus visible-xs-inline-block"></i>
                        <span translate="header.navbar.new.NEW">New</span>
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li>
                            <a href="/admin/article/add.html" data-event="article_list">新文章</a>
                        </li>
                        <!--<li>-->
                        <!--<a href="">-->
                        <!--<span class="badge bg-info pull-right">5</span>-->
                        <!--<span translate="header.navbar.new.TASK">Task</span>-->
                        <!--</a>-->
                        <!--</li>-->
                        <!--<li><a href="" translate="header.navbar.new.USER">User</a></li>-->
                        <!--<li class="divider"></li>-->
                        <!--<li>-->
                        <!--<a href="">-->
                        <!--<span class="badge bg-danger pull-right">4</span>-->
                        <!--<span translate="header.navbar.new.EMAIL">Email</span>-->
                        <!--</a>-->
                        <!--</li>-->
                    </ul>
                </li>
            </ul>
            <!-- / link and dropdown -->

            <!-- search form -->
            <form class="navbar-form navbar-form-sm navbar-left shift" ui-shift="prependTo" data-target=".navbar-collapse" role="search">
                <div class="form-group">
                    <div class="input-group">
                        <input type="text" class="form-control input-sm bg-light no-border rounded padder" placeholder="Search projects...">
                        <span class="input-group-btn">
                            <button type="submit" class="btn btn-sm bg-light rounded">
                                <i class="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </form>
            <!-- / search form -->

            <!-- nabar right -->
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle clear">
                        <span class="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                            <img src="/Uploads/Picture/2017-06-06/59369fb016efa.png" alt="...">
                            <i class="on md b-white bottom"></i>
                        </span>
                        <span class="hidden-sm hidden-md">admin</span>
                        <b class="caret"></b>
                    </a>
                    <!-- dropdown -->
                    <ul class="dropdown-menu  w">
                        <!--<li class="divider"></li>-->
                        <li>
                            <a class="no-ajax" href="/admin/login/logout.html">退出登录</a>
                        </li>
                    </ul>
                    <!-- / dropdown -->
                </li>
            </ul>
            <!-- / navbar right -->
        </div>
        <!-- / navbar collapse -->
    </header>
</template>
<script>
export default {
    methods: {
        changeIsCollapse() {
            this.$store.commit("changeIsCollapse");
        }
    },
    mounted() {

        //dropdown点击事件
        +function(a) {
            "use strict";
            function b(b) {
                b && 3 === b.which || (a(e).remove(), a(f).each(function() {
                    let d = a(this), e = c(d), f = { relatedTarget: this };
                    e.hasClass("open") && (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f)))
                }))
            }

            function c(b) {
                let c = b.attr("data-target");
                c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
                let d = c && a(c);
                return d && d.length ? d : b.parent()
            }

            function d(b) {
                return this.each(function() {
                    let c = a(this), d = c.data("bs.dropdown");
                    d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
                })
            }

            let e = ".dropdown-backdrop", f = '[data-toggle="dropdown"]', g = function(b) {
                a(b).on("click.bs.dropdown", this.toggle);
            };
            g.VERSION = "3.3.4", g.prototype.toggle = function(d) {
                let e = a(this);
                if (!e.is(".disabled, :disabled")) {
                    let f = c(e), g = f.hasClass("open");
                    if (b(), !g) {
                        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                        let h = { relatedTarget: this };
                        if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                        e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
                    }
                    return !1
                }
            }, g.prototype.keydown = function(b) {
                if (/(38|40|27|32)/.test(b.which) && !/input|textarea/i.test(b.target.tagName)) {
                    let d = a(this);
                    if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                        let e = c(d), g = e.hasClass("open");
                        if (!g && 27 != b.which || g && 27 == b.which) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                        let h = " li:not(.disabled):visible a", i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                        if (i.length) {
                            let j = i.index(b.target);
                            38 == b.which && j > 0 && j-- , 40 == b.which && j < i.length - 1 && j++ , ~j || (j = 0), i.eq(j).trigger("focus")
                        }
                    }
                }
            };
            let h = a.fn.dropdown;
            a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
                return a.fn.dropdown = h, this
            }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
                a.stopPropagation()
            }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', g.prototype.keydown)
        }(jQuery);
    }
}
</script>