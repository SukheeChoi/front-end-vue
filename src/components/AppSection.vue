<template>
  <section>
    <slot></slot>
  </section>
</template>
<script>
export default {
  name: 'AppSection',
};
</script>
<style lang="scss" scoped>
section {
  border: 2px solid rgba(19, 89, 184, 1);
}
</style>
