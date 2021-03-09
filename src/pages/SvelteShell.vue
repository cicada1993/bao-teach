<template>
  <div ref="container" class="svelte-page"></div>
</template>
<script>
import SvelteApp from "@/svelte/App";
export default {
  data() {
    return {};
  },
  mounted() {
    let svelteApp = new SvelteApp({
      target: this.$refs.container,
      props: {
        title: "my svelte app",
      },
    });
  },
};
</script>

<style lang="less">
</style>