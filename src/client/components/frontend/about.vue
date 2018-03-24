<template>
  <section class="content">
    <div class="wrapper">
      <section class="row padder">
        <loading :show="loading"></loading>
        <article class="col-xs-12 padder-v" v-show="!loading">
          <p class="article-title h2">关于</p>
          <div class="entry-content m-t-md">
            <div id="editormd">
              <textarea name="editormd" style="display: none" v-html="user.about"></textarea>
            </div>
          </div>
        </article>
      </section>
    </div>
  </section>
</template>
<script>
import loading from '../loading.vue';
import {
  mapGetters
} from 'vuex';
export default {
  components: {
    loading
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  watch: {
    user() {
      this.loading = false;
      this.$nextTick(_ => {
        editormd.markdownToHTML("editormd", {
          htmlDecode: "style,script,iframe", // you can filter tags decode
          emoji: true,
          taskList: true,
          tex: true, // 默认不解析
          flowChart: true, // 默认不解析
          sequenceDiagram: true // 默认不解析
        });
      })
    }
  },
  mounted() {
    this.$store.dispatch('getUserInfo');
  }
};

</script>
