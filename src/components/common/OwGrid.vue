<template>
  <div class="ow-grid-wrap">
    <ow-flex-container class="dir-col">
      <ow-flex-content class="headline-wrap">
        <ow-flex-container>
          <!-- left top -->
          <ow-flex-content class="align-x-start">
            <slot name="left"></slot>
          </ow-flex-content>
          <!-- right top -->
          <ow-flex-content class="align-x-end">
            <slot name="right"></slot>
          </ow-flex-content>
        </ow-flex-container>
      </ow-flex-content>
      <!-- grid -->
      <ow-flex-content>
        <slot></slot>
      </ow-flex-content>
      <!-- pagination -->
      <ow-flex-content class="mt-5 mb-5">
        <template v-if="state.hasPagination">
          <ow-flex-container>
            <ow-flex-content class="align-x-start" style="--gap-item: 2px">
              <button type="button" class="ow-button type-icon">
                <i class="fas fa-cog fa-fw" />
              </button>
              <ow-select
                :items="state.pageSizeList"
                v-model="state.pageSize"
                style="--width: 80px"
              />
            </ow-flex-content>
            <ow-flex-content class="align-x-center">
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
            </ow-flex-content>
            <ow-flex-content class="align-x-end">
              <div class="counter-board">
                전체 <span> {{ state.totalCount }} </span> 건
              </div>
            </ow-flex-content>
          </ow-flex-container>
        </template>
      </ow-flex-content>
    </ow-flex-container>
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
