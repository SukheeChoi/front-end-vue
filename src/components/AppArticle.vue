<template>
  <article class="ow-article">
    <ow-flex-wrap col>
      <slot></slot>
    </ow-flex-wrap>
  </article>
</template>
<script>
export default {
  name: 'AppArticle',
};
</script>
<style lang="scss" scoped>
.ow-article {
  height: 100%;
}
</style>
