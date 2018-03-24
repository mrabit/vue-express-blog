<style scoped>
#view>article.col-xs-12:nth-child(1) {
  margin-top: 0 !important;
}

.no-gutter.verticalCenter {
  min-height: inherit;
}

.tags_list {
  border-bottom: 1px solid #e9e9e9;
}

</style>
<template>
  <section class="content">
    <div class="wrapper">
      <section class="row padder m-b-n-sm">
        <div id="view" class="clearfix">
          <loading :show="!article_lists.length && !haveNotArticle"></loading>
          <p v-if="tags_id" class="article-title h2 padder-v padder">标签 - {{tags_name}} <small>共找到结果 {{count}} 条</small></p>
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
          <router-link name="prev" :class="{ invisible: this.currentPage <= 1 }" :to="'/index/' + (this.currentPage - 1) + '.html' + (this.tags_id?'?tags_id=' + this.tags_id : '')" class="pull-left">« 上一页</router-link>
          <router-link name="next" :class="{ invisible: this.currentPage >= this.totalPage }" :to="'/index/' + (this.currentPage + 1) + '.html' + (this.tags_id?'?tags_id=' + this.tags_id : '')" class="pull-right">下一页 »</router-link>
          <span class="w-sm text-center">
              <router-link to="/archives.html">博客归档</router-link>
          </span>
        </nav>
      </section>
    </div>
  </section>
</template>
<script>
import util from "util";
import loading from "../loading";
import {
  mapGetters
} from 'vuex';
export default {
  components: {
    loading
  },
  data() {
    return {
      article_lists: [],
      pageSize: 5,
      totalPage: 0,
      haveNotArticle: false,
      count: 0,
      tags_name: ''
    };
  },
  computed: {
    ...mapGetters({
      tags_arr: 'getTagsArr'
    }),
    currentPage() {
      return parseInt(this.$route.params.page || 1);
    },
    tags_id() {
      this.$store.dispatch('getTags');
      return this.$route.query.tags_id;
    },
  },
  watch: {
    $route: "get_lists",
    tags_arr(val) {
      if (!this.tags_id) return;
      this.tags_name = val.filter(k => {
        return k.id == this.tags_id
      })[0]['tags_name'];
      document.title = "标签 - " + this.tags_name + " - 一桶浆糊的博客";
    }
  },
  methods: {
    get_lists() {
      this.article_lists = [];
      var currentPage = this.currentPage;
      var pageSize = this.pageSize;
      //访问页面小于1
      if (currentPage < 1) {
        this.$router.push(
          "/index/1.html" + (this.tags_id ? "?tags_id=" + this.tags_id : "")
        );
      }
      this.$http
        .get(
          util.format(
            "/article/get_lists/%s/%s" +
            (this.tags_id ? "?tags_id=" + this.tags_id : ""),
            currentPage,
            pageSize
          )
        )
        .then(
          d => {
            var data = d.data;
            if (data.success) {
              var result = data.result;
              this.article_lists = result.article_lists;
              this.totalPage = result.totalPage;
              this.count = result.count;
              //访问页面超出最大页数
              if (currentPage > this.totalPage && this.totalPage) {
                this.$router.push(
                  "/index/" +
                  this.totalPage +
                  ".html" +
                  (this.tags_id ? "?tags_id=" + this.tags_id : "")
                );
              }
              if (!this.totalPage) {
                this.haveNotArticle = true;
                return false;
              }
              this.$nextTick(() => {
                var editormd_arr = document.getElementsByClassName(
                  "editormd_container"
                );

                for (var i = 0; i < editormd_arr.length; i++) {
                  var temp = editormd_arr[i];
                  editormd.markdownToHTML(temp["id"], {
                    htmlDecode: "style,script,iframe", // you can filter tags decode
                    emoji: true,
                    taskList: true,
                    tex: true, // 默认不解析
                    flowChart: true, // 默认不解析
                    sequenceDiagram: true // 默认不解析
                  });
                }
              });
            }
          },
          err => {}
        );
    },
    unescape: function(html) {
      return html
        .replace(html ? /&(?!#?\w+;)/g : /&/g, "&amp;")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ");
    },
    is_html(int) {
      return !!int;
    }
  },
  mounted() {
    this.get_lists();
  }
};

</script>
