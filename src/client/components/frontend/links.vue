<template>
  <section class="content">
    <div class="wrapper">
      <section class="row padder">
        <loading :show="loading"></loading>
        <article class="col-xs-12 padder-v" v-if="!loading">
          <p class="article-title h2">友链</p>
          <div class="entry-content m-t-md">
            <ul class="padder-lg padder-v  m-l-md">
              <li v-for="(item, index) in links_list" :key="index">
                <a target="_blank" :href="item.site_url" :title="item.site_name">{{item.site_name}}</a>
              </li>
            </ul>
          </div>
        </article>
      </section>
    </div>
  </section>
</template>
<script>
import loading from "../loading";
export default {
  components: {
    loading
  },
  data() {
    return {
      links_list: [],
      loading: false
    };
  },
  methods: {
    get_links_list() {
      this.$http.get("/links/getLinksList").then(
        d => {
          var data = d.data;
          if (data.success) {
            this.links_list = data.result;
          }
        },
        err => {}
      );
    }
  },
  mounted() {
    this.get_links_list();
  }
};

</script>
