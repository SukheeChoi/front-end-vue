<template>
  <ow-flex-wrap class="size-full" col align="center">
    <ow-flex-item justify="center" align="flex-end">
      <h1>404 Not Found</h1>
    </ow-flex-item>
    <ow-flex-item>
      <div>{{ n }}초 후에 이전 페이지로 돌아갑니다.</div>
    </ow-flex-item>
  </ow-flex-wrap>
</template>
<script>
import { reactive, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';

let interval;

export default {
  name: 'AppNotFound',
  setup() {
    const router = useRouter();

    const state = reactive({
      n: 5,
    });

    interval = setInterval(() => (state.n -= 1), 1000);

    watch(
      () => state.n,
      (n) => {
        if (n === 0) {
          clearInterval(interval);
          router.back();
        }
      }
    );

    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 6rem;
}
</style>
