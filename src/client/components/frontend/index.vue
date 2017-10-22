<style scoped>
.invisible {
    visibility: hidden
}

#view>article.col-xs-12:nth-child(1) {
    margin-top: 0!important;
}

.no-gutter.verticalCenter {
    min-height: inherit;
}

[v-cloak] {
    display: none;
}
</style>
<template>
    <section class="content" v-cloak>
        <div class="wrapper">
            <section class="row padder m-b-n-sm">
                <div id="view" class="clearfix">
                    <loading :show="!article_lists.length && !haveNotArticle"></loading>
                    <article class="col-xs-12 m-t-md" v-show="article_lists.length" v-for="(vo, key) in article_lists" :key="key">
                        <div class="row verticalCenter no-gutter">
                            <div class="col-xs-12 col-sm-8 text-left">
                                <p class="article-title h2">
                                    <router-link :to="{ path: '/details/' + vo.id + '.html'}">{{ vo.title }}</router-link>
                                </p>
                            </div>
                            <div class="col-sm-4 hidden-xs text-right">
                                <div class="meta l-h-2x">
                                    <span class="author"> {{ vo.uname }} </span>
                                    <span>发布于</span>
                                    <time :datetime="vo.create_time">{{ vo.release_time }}</time>
                                </div>
                                <div class="meta">
                                    <small class="text-muted">
                                        <span :id="'sourceId::' + vo.id" class="cy_cmt_count">0</span> Comments
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 section-content">
                                <div class="entry-content m-t-md block show-section-block">
                                    <blockquote class="hidden-xs" v-if="vo.reprint_url">
                                        <p>原文：
                                            <a :href="vo.reprint_url" target="_blank">{{ vo.reprint_url }}</a>
                                        </p>
                                    </blockquote>
                                    <div class="editormd_container" v-if="!is_html(vo.is_html)" :id="vo.id">
                                        <textarea style="display: none" v-html="vo.content"></textarea>
                                    </div>
                                    <div v-else v-html="unescape(vo.content)">
                                    </div>
                                </div>
                                <div class="show_all"></div>
                                <p class="more m-b-none m-t-md">
                                    <router-link :to="{ path: '/details/' + vo.id + '.html'}">阅读全文 »</router-link>
                                </p>
                            </div>
                        </div>
                        <div class="line line-dashed article-b-b line-lg "></div>
                    </article>
                    <div class="text-left padder" v-if="haveNotArticle" style="min-height: 15vh">
                        暂无数据
                    </div>
                </div>
                <nav class="padder text-center" style="margin-bottom: 8px" v-if="!haveNotArticle">
                    <router-link name="prev" v-if="this.currentPage > 1" :to="'/index/' + (this.currentPage - 1) + '.html' + (this.tags_id?'?tags_id=' + this.tags_id : '')" class="pull-left">« 上一页</router-link>
                    <router-link name="next" v-if="this.currentPage < this.totalPage" :to="'/index/' + (this.currentPage + 1) + '.html' + (this.tags_id?'?tags_id=' + this.tags_id : '')" class="pull-right">下一页 »</router-link>
                    <span class="w-sm text-center">
                        <router-link to="/archives.html">博客归档</router-link>
                    </span>
                </nav>
            </section>
        </div>
    </section>
</template>
<script>
import util from 'util';
import loading from '../loading';
export default {
    components: {
        loading
    },
    data() {
        return {
            article_lists: [

            ],
            length: 5,
            totalPage: 0,
            haveNotArticle: false
        }
    },
    computed: {
        currentPage() {
            return parseInt(this.$route.params.page || 1);
        },
        tags_id() {
            return this.$route.query.tags_id;
        }
    },
    watch: {
        "$route": "get_lists"
    },
    methods: {
        get_lists() {
            var page = this.currentPage;
            var length = 5;
            //访问页面小于1
            if (page < 1) {
                this.$router.push('/index/1.html' + (this.tags_id ? '?tags_id=' + this.tags_id : ''));
            }
            this.$http.get(util.format('/article/get_lists/%s/%s' + (this.tags_id ? '?tags_id=' + this.tags_id : ''), page, length)).then(result => {
                this.article_lists = result.data.article_lists;
                this.totalPage = result.data.totalPage;
                //访问页面超出最大页数
                if (page > this.totalPage && this.totalPage) {
                    this.$router.push('/index/' + this.totalPage + '.html' + (this.tags_id ? '?tags_id=' + this.tags_id : ''));
                }
                if(!this.totalPage){
                    this.haveNotArticle = true;
                    return false;
                }
                this.$nextTick(() => {
                    var editormd_arr = document.getElementsByClassName('editormd_container');
                    for (var i = 0; i < editormd_arr.length; i++) {
                        var temp = editormd_arr[i];
                        editormd.markdownToHTML(temp['id'], {
                            htmlDecode: "style,script,iframe",  // you can filter tags decode
                            emoji: true,
                            taskList: true,
                            tex: true,  // 默认不解析
                            flowChart: true,  // 默认不解析
                            sequenceDiagram: true,  // 默认不解析
                        });
                    }
                });
            }, err => {

            })
        },
        unescape: function(html) {
            return html
                .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, "\"")
                .replace(/&#39;/g, "\'")
                .replace(/&nbsp;/g, " ");
        },
        is_html(int){
            console.log(int)
            return !!int;
        }
    },
    filters: {
        markdown_2_html: function(md) {
            return md;
        }
    },
    mounted() {
        this.get_lists();
    }
}
</script>

