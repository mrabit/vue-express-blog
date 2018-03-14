<style>

</style>
<template>
  <div class="app-content">
      <div class="app-content-body">
          <loading :show="loading"></loading>
          <div v-show="!loading">
            <div class="bg-light lter b-b wrapper-md">
              <h1 class="m-n font-thin h3">标签管理</h1>
            </div>
            <div class="wrapper clearfix m-b-md">
              <el-tag slot="reference"
                  class="m-r-sm"
                    v-for="tag in tags"
                  :key="tag.name"
                  :closable="true"
                  :type="tag.type"
                  >
                  {{tag.name}}
              </el-tag>
            </div>
          </div>
      </div>
  </div>
</template>
<script>
import loading from "../loading";
export default {
  components: { loading },
  data() {
    return {
      tags: [
      ],
      tags_type: [
        '',
        'gray',
        'primary',
        'success',
        'warning',
        'danger',
      ],
      loading: true
    };
  },
  methods: {
    get_all_tags() {
      this.loading = true;
      this.$http.get("/api/tags/get_all_tags").then(d => {
        const data = d.data;
        if(data.success) {
          this.tags = data.result.map((k,v) => {
            return {
              name: k.tags_name,
              id: k.id,
              type: this.tags_type[Math.floor(Math.random()*(this.tags_type.length-0+1)+0)]
            }
          });
          this.loading = false;
        }
      });
    }
  },
  created() {
    this.get_all_tags();
  }
};
</script>
