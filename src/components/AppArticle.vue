<template>
  <article class="ow-article">
    <slot></slot>
  </article>
</template>
<script>
export default {
  name: 'AppArticle',
};
</script>
<style lang="scss" scoped>
.ow-article {
  overflow: auto;
}
</style>
