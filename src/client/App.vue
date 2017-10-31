<template>
  <div id="app">
    <router-view name="side" />
    <router-view/>
    <router-view name="footer" />
    <router-view name="404" />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>

</style>
