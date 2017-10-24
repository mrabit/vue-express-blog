<style>
#view > article.col-xs-12:nth-child(1) {
  margin-top: 0 !important;
}
</style>
<template>
    <section class="content">
        <div class="wrapper">
            <section class="row padder">
                <loading :show="!img_lists.length && !haveNotImage"></loading>
                <article class="col-xs-12 padder-v m-b-n-md"  v-show="img_lists.length">
                    <p class="article-title h2">Bing每日一图</p>
                    <div class="entry-content m-t-md">
                        <section class="bing_main">
                            <div class="bing_article" @click="open_url(item.img_url)" :data-description="item.img_time" v-for="(item, index) in img_lists" :key="index"
                                :data-title="item.img_title">
                                <img :src="item.img_url + '-preview.50p'"
                                    :title="item.img_title"
                                    :alt="item.img_title">
                            </div>
                        </section>
                        <nav class="padder text-center paging m-t-md">
                            <router-link name="prev" :class="{ invisible: this.currentPage <= 1 }" :to="'/bing/' + (this.currentPage - 1) + '.html'" class="pull-left">« 上一页</router-link>
                            <router-link name="next" :class="{ invisible: this.currentPage >= this.totalPage }" :to="'/bing/' + (this.currentPage + 1) + '.html'" class="pull-right">下一页 »</router-link>
                            <span class="w-sm text-center">
                                <a href="/bing" target="_blank">今日美图</a>
                            </span>
                        </nav>
                    </div>
                </article>
                <div class="text-left padder" v-if="haveNotImage" style="min-height: 15vh">
                    暂无数据
                </div>
            </section>
        </div>
    </section>
</template>
<script>
// /bing/get_img_lists/1/10
import loading from "../loading";
export default {
  components: { loading },
  data() {
    return {
      img_lists: [],
      pageSize: 9,
      totalPage: 0,
      haveNotImage: false
    };
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.params.page || 1);
    }
  },
  watch: {
      '$route': 'get_img_lists'
  },
  methods: {
    open_url(url) {
      var a = document.createElement("a");
      a.href = url;
      a.setAttribute("target", "_blank");
      a.click();
    },
    format_img_url(url) {
      return url.replace("http:", "");
    },
    get_img_lists() {
      var currentPage = this.currentPage;
      var pageSize = this.pageSize;
      this.$http
        .get("/bing/get_img_lists/" + currentPage + "/" + this.pageSize)
        .then(result => {
          this.img_lists = result.data.img_list;
          this.totalPage = result.data.totalPage;

          //访问页面超出最大页数
          if (currentPage > this.totalPage && this.totalPage) {
            this.$router.push("/bing/" + this.totalPage + ".html");
          }
          if (!this.totalPage) {
            this.haveNotImage = true;
            return false;
          }

          this.show = true;
        });
    }
  },
  mounted() {
    this.get_img_lists();
  }
};
</script>