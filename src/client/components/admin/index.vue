<template>
    <div class="app-content">
        <div class="wrapper">
            首页
        </div>
    </div>
</template>
<script>
export default {
  mounted() {
    this.$http.post("/api/check_token");
  }
};
</script>