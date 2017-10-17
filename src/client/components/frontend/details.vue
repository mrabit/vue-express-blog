<style scoped>
.invisible {
    visibility: hidden
}

.paging {
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
}
</style>
<template>
    <section class="content">
        <div class="wrapper">
            <section class="row padder">
                <transition enter-active-class="animated fadeIn">
                    <article class="col-xs-12" v-if="show">
                        <div class="row verticalCenter no-gutter">
                            <div class="col-xs-12 col-sm-8 text-left">
                                <p class="article-title h2">{{ article.title }}</p>
                            </div>
                            <div class="col-sm-4 hidden-xs text-right">
                                <div class="meta l-h-2x">
                                    <span class="author"> {{ article.uname }} </span>
                                    <span>发布于</span>
                                    <time :datetime="article.create_time">{{ article.release_time }}</time>
                                </div>
                                <!-- <div class="meta">
                                                                                    <small class="text-muted">
                                                                                        <span id="changyan_count_unit"></span> Comments</small>
                                                                                    <script type="text/javascript" src="https://assets.changyan.sohu.com/upload/plugins/plugins.count.js"></script>
                                                                                </div> -->
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 section-content">
                                <div class="entry-content m-t-md block" id="entry-content">
                                    <blockquote class="hidden-xs" v-if="article.reprint_url">
                                        <p>原文：
                                            <a :href="article.reprint_url" target="_blank">{{ article.reprint_url }}</a>
                                        </p>
                                    </blockquote>
                                    <!--遗留问题  数据库存在以前编辑器的文章 需判断-->

                                    <div id="editormd" v-if="!article.is_html">
                                        <textarea name="editormd" style="display: none" v-html="article.content"></textarea>
                                    </div>
                                    <div v-else v-html="article.content">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="line line-dashed article-b-b line-lg "></div>
                        <div class="details_info">
                            <router-link :to="'/details/' + this.$route.params.id + '.html'">
                                <p class="text-ellipsis" style="display: block;white-space: inherit;">
                                    <span style="color:#666;">本文链接：{{ location_href }}</span>
                                </p>
                            </router-link>
                            <p>--
                                <acronym title="End of File">EOF</acronym> --</p>
                        </div>
                        <div class="post-info">
                            <p style="margin-bottom: 15px">
                                作者
                                <a href="/author/admin" data-user="">
                                    <code class="notebook">{{ article.uname }}</code>
                                </a> 发表于
                                <i>{{ article.create_time }}</i>
                                <span v-if="article.modify_time">
                                    ，最后修改于
                                    <i>{{ article.modify_time }}</i>
                                </span>
                            </p>
                        </div>
                        <nav class="text-center clearfix paging" v-if="adjoin">
                            <router-link name="prev" :to="'/details/' + adjoin[0]['id'] + '.html'" class="pull-left" v-if="adjoin[0]">
                                &lt;&lt;&nbsp;{{ adjoin[0]['title'] }}
                            </router-link>
                            <router-link name="next" :to="'/details/' + adjoin[1]['id'] + '.html'" class="pull-right" v-if="adjoin[1]">
                                {{ adjoin[1]['title'] }}&nbsp;&gt;&gt;
                            </router-link>
                        </nav>
                        <p class="h1 text-muted m-t-md">Comments</p>
                        <!--PC版-->
                        <!-- <div id="SOHUCS" sid="{$article['result']['id']}"></div> -->
                    </article>
                </transition>
            </section>
        </div>
    </section>
</template>
<script>
var marked = require('marked');
export default {
    data() {
        return {
            article: {
                id: 0,
                title: '',
                uname: '',
                reprint_url: '',
                content: '',
                create_time: '',
                release_time: '',
                modify_time: '',
                is_html: true
            },
            adjoin: [],
            show: false
        }
    },
    computed: {
        location_href() {
            return window.location.origin + '/details/' + this.$route.params.id + '.html';
        },
        marked_to_html() {
            return marked(this.article.content);
        }
    },
    watch: {
        "$route": "get_article_details"
    },
    methods: {
        get_article_details() {
            this.$http.get('/article/get_details/' + this.$route.params.id).then(response => {
                this.article = response.data.article[0];
                this.adjoin = response.data.adjoin;
                document.title = response.data.article[0].title;
                debugger;
                var a = editormd.markdownToHTML("editormd", {
                    htmlDecode: "style,script,iframe",  // you can filter tags decode
                    emoji: true,
                    taskList: true,
                    tex: true,  // 默认不解析
                    flowChart: true,  // 默认不解析
                    sequenceDiagram: true,  // 默认不解析
                });
                this.show = true;
            });
        }
    },
    mounted() {
        this.$nextTick(function() {
            // Code that will run only after the
            // entire view has been rendered
            this.get_article_details();
        })
    }
}
</script>