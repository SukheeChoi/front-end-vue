<template>
  <ow-flex-wrap class="dir-col">
    <ow-flex-item class="headline-wrap">
      <ow-flex-wrap>
        <template v-if="hasSlot">
          <!-- left top -->
          <ow-flex-item class="align-x-start">
            <slot name="left"></slot>
          </ow-flex-item>
          <!-- right top -->
          <ow-flex-item class="align-x-end">
            <slot name="right"></slot>
          </ow-flex-item>
        </template>
        <template v-else>
          <!-- left top -->
          <ow-flex-item class="align-x-start">
            <h1 class="h1">{{ state.title }}</h1>
          </ow-flex-item>
          <!-- right top -->
          <ow-flex-item class="align-x-end">
            <button v-if="state.buttons.excel" class="ow-btn type-state excel" @click="state.store.excel()">Excel 다운로드</button>
            <template v-if="mode=='edit'">
              <button v-if="state.buttons.undo" class="ow-btn type-state refresh" @click="state.store.undo()">초기화</button>
              <button v-if="state.buttons.add" class="ow-btn type-state" @click="state.store.add()"><span>추가</span></button>
              <button v-if="state.buttons.del" class="ow-btn type-state" @click="state.store.del()"><span>삭제</span></button>
              <button v-if="state.buttons.save" class="ow-btn type-state" @click="state.store.save()"><span>저장</span></button>
            </template>
          </ow-flex-item>
        </template>
      </ow-flex-wrap>
    </ow-flex-item>
    <!-- grid -->
    <ow-flex-item>
      <div class="ow-grid-wrap">
        <slot></slot>
      </div>
    </ow-flex-item>
    <!-- pagination -->
    <ow-flex-item class="mt-10 mb-10">
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
          <div class="counter-board">전체<span>{{ state.totalCount }}</span>건</div>
        </ow-flex-item>
      </ow-flex-wrap>
    </ow-flex-item>
  </ow-flex-wrap>
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
    opt: {
      type: Object
    },
    title: {
      type: String,
      default: ""
    },
    mode: {
      default: "edit"
    },
    hasSlot: {
      type: Boolean,
      default: true
    },
    buttons: {
      default: {
        excel : false,
        undo : true,
        add : true,
        del : true,
        save : true
      }
    },
    store: {
      default: null
    },
    pageSizeList: {
      type: Array,
      default: [5, 10, 20, 30, 50, 100, 150, 300, 500]
    }
  },
  setup(props, { emit }) {
    let tmpState = {};

    if (props.opt && props.opt.pageNo) {
      tmpState = reactive({
        title: ref(props.title),
        mode: ref(props.mode),
        buttons: ref(props.buttons),
        store: ref(props.store),
        pageSize: ref(props.opt.pageSize),
        pageNo: ref(props.opt.pageNo),
        totalCount: computed(() => props.opt.totalCount),
        hasPagination: computed(() => props.opt.totalCount > props.opt.pageSize),
        pageSizeList: computed(() => props.pageSizeList.map((value) => {
            return { name: `${value}건`, value };
          })
        )
      });
    } else {
      tmpState = reactive({
        title: ref(props.title),
        mode: ref(props.mode),
        buttons: ref(props.buttons),
        pageSize: ref(props.pageSize),
        pageNo: ref(props.pageNo),
        totalCount: computed(() => props.totalCount),
        hasPagination: computed(() => props.totalCount > props.pageSize),
        pageSizeList: computed(() => props.pageSizeList.map((value) => {
            return { name: `${value}건`, value };
          })
        )
      });
    }

    const state = tmpState;

    watch(
      () => state.pageNo,
      () => {
         if (state.store != null) {
           state.store.getList(state.pageNo, state.pageSize);
         } else {
           emit('pageChange', state.pageNo, state.pageSize);
         }
       }
    );
    watch(
      () => state.pageSize,
      () => {
        //현재 데이터 있는 페이지로 이동
        if (state.totalCount > 0) {
            let tempPageNo = Math.ceil(state.totalCount / state.pageSize);
            if (state.pageNo > tempPageNo) {
                state.pageNo = tempPageNo;
            }
        }

        if (state.store != null) {
          state.store.getList(state.pageNo, state.pageSize);
        } else {
          emit('pageChange', (state.pageNo = 1), state.pageSize);
        }
      }
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
.headline-wrap {
  border-bottom: none;
}
.counter-board {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
