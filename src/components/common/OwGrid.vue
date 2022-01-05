<template>
  <div class="ow-grid-wrap">
    <ow-flex-wrap class="dir-col">
      <ow-flex-item class="headline-wrap">
        <ow-flex-wrap>
          <!-- left top -->
          <ow-flex-item class="align-x-start">
            <slot name="left"></slot>
          </ow-flex-item>
          <!-- right top -->
          <ow-flex-item class="align-x-end">
            <slot name="right"></slot>
          </ow-flex-item>
        </ow-flex-wrap>
      </ow-flex-item>
      <!-- grid -->
      <ow-flex-item>
        <slot></slot>
      </ow-flex-item>
      <!-- pagination -->
      <ow-flex-item class="mt-5 mb-5">
        <template v-if="state.hasPagination">
          <ow-flex-wrap>
            <ow-flex-item class="align-x-start" style="--gap-item: 2px">
              <button type="button" class="ow-button type-icon">
                <i class="fas fa-cog fa-fw" />
              </button>
              <ow-select :items="state.pageSizeList" v-model="state.pageSize" style="--width: 80px" />
            </ow-flex-item>
            <ow-flex-item class="align-x-center">
              <b-pagination
                class="ow-pagination"
                first-class="go-first"
                prev-class="go-prev"
                next-class="go-next"
                last-class="go-last"
                :total-rows="state.totalCount"
                :per-page="state.pageSize"
                :limit="10"
                v-model="state.pageNo"
              />
            </ow-flex-item>
            <ow-flex-item class="align-x-end">
              <div class="counter-board">
                전체 <span> {{ state.totalCount }} </span> 건
              </div>
            </ow-flex-item>
          </ow-flex-wrap>
        </template>
      </ow-flex-item>
    </ow-flex-wrap>
  </div>
</template>
<script>
import { computed, reactive, ref, watch } from 'vue';

export default {
  name: 'OwGrid',
  components: {},
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    pageNo: {
      type: Number,
      default: 1,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      pageSize: ref(props.pageSize),
      pageNo: ref(props.pageNo),
      totalCount: ref(props.totalCount),
      hasPagination: computed(() => props.totalCount > props.pageSize),
      pageSizeList: computed(() =>
        [10, 20, 50, 100].map((value) => {
          return { name: `${value}건`, value };
        })
      ),
    });

    watch(
      () => state.pageNo,
      () => emit('pageChange', state.pageNo, state.pageSize)
    );
    watch(
      () => state.pageSize,
      () => (state.pageNo = 1)
    );

    return {
      state,
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-flex-wrap {
  --wrap-height: auto;

  .size-fix {
    --bg: transparent;
  }
}
.ow-grid-wrap {
  width: 100%;
  .headline-wrap {
    border-bottom: none;
  }
  .counter-board {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
