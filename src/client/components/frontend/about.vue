<template>
    <section class="content">
        <div class="wrapper">
            <section class="row padder">
                <article class="col-xs-12 padder-v">
                    <p class="article-title h2">关于</p>
                    <div class="entry-content" v-html="user.about">
                        
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
  }
};
</script>