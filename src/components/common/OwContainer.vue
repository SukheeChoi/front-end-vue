<template>
  <div class="ow-container" :class="containerClass" :style="containerStyle">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'OwContainer',
  setup(props, context) {
    const slots = context.slots.default();
    let counts = 0;
    for (const slot of slots) {
      if (slot.type.name === 'OwContent') {
        counts += 1;
      }
    }
    const sizes = [];
    for (let i = 0, length = counts - 1; i < length; i += 1) {
      sizes.push(`--size-${i + 1}:auto;`);
    }

    const containerClass = `row-${counts}-set`;
    const containerStyle = sizes.join(';');

    return {
      containerClass,
      containerStyle,
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-container {
  width: 100%;
}
</style>
