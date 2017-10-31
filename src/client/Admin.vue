<template>
  <div class="main">
    <router-view name="header"></router-view>
    <router-view name="side"></router-view>
    <router-view></router-view>
  </div>
</template>
<script>
import webStorageCache from "web-storage-cache";
var wsCache = new webStorageCache();
export default {
  created() {
    this.$store.commit("admin/changeUser", (wsCache.get("token") || {})["user"]);
  }
};
</script>
