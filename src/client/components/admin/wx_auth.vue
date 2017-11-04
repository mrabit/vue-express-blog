<template>
    <section class="app-content">
        <div class="app-content-body">
            <loading :show="loading"></loading>
            <div v-show="!loading">
                <div class="bg-light lter b-b wrapper-md">
                    <h1 class="m-n font-thin h3">微信权限管理</h1>
                </div>
                <div class="wrapper clearfix m-b-md">
                </div>
            </div>
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
      loading: true
    };
  }
};
</script>
