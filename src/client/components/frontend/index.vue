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
</style>
<template>
    <section class="content">
        <div class="wrapper">
            <section class="row padder m-b-n-sm">
                <div id="view" class="clearfix">
                    <article class="col-xs-12 m-t-md" v-for="(vo, key) in article" :key="key">
                        <div class="row verticalCenter no-gutter">
                            <div class="col-xs-12 col-sm-8 text-left">
                                <p class="article-title h2">
                                    <router-link :to="{ path: 'details/' + vo.id + '.html'}">{{ vo.title }}</router-link>
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
                                    <div class="markdown-body editormd-html-preview" v-html="markdown_2_html(vo.content)">
                                    </div>
                                </div>
                                <div class="show_all"></div>
                                <p class="more m-b-none m-t-md">
                                    <router-link :to="{ path: 'details/' + vo.id + '.html'}">阅读全文 »</router-link>
                                </p>
                            </div>
                        </div>
                        <div class="line line-dashed article-b-b line-lg "></div>
                    </article>
                </div>
                <nav class="padder text-center" style="margin-bottom: 8px">
                    <a name="prev" href="" class="pull-left">« 上一页</a>
                    <a name="next" href="#" class="pull-right">下一页 »</a>
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
var marked = require('marked');
export default {
    data() {
        return {
            article: [

            ],
            length: 5
        }
    },
    methods: {
        get_lists() {
            var start = this.$route.params.page || 0;
            var length = 5;
            this.$http.get(util.format('/article/get_lists/%s/%s', start, length)).then(result => {
                this.article = result.data;
            }, err => {

            })
        },
        markdown_2_html(md){
            return marked(md)
        }
    },
    filters: {
        markdown_2_html: function(md) {
            return marked(md);
        }
    },
    mounted() {
        console.log(this.article)
        this.get_lists();
    }
}
</script>

