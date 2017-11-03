<template>
    <section class="content">
        <div class="wrapper">
            <section class="row padder">
                <article class="col-xs-12 padder-v">
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
export default {
  computed: {
    user() {
      return this.$store.getters["frontend/getUser"];
    }
  },
  mounted() {
    editormd.markdownToHTML("editormd", {
      htmlDecode: "style,script,iframe", // you can filter tags decode
      emoji: true,
      taskList: true,
      tex: true, // 默认不解析
      flowChart: true, // 默认不解析
      sequenceDiagram: true // 默认不解析
    });
  }
};
</script>