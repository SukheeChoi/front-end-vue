<template>
  <div class="ow-filter-tab">
    <div class="ow-filter-tab-wrap" :class="{ 'has-arrow': overflow }" ref="root">
      <template v-if="overflow">
        <button class="ow-filter-btn-move prev" @click="move">&#60;</button>
      </template>
      <div class="ow-filter-tab-list" ref="filter">
        <template v-for="flatNode in filteredFlatNodeList" :key="flatNode">
          <button
            class="ow-filter-tab-btn"
            :class="getTabButtonClass(flatNode)"
            @click="$emit('update:modelValue', (selectedNode = flatNode))"
          >
            {{ flatNode.name }}
          </button>
        </template>
      </div>
      <template v-if="overflow">
        <button class="ow-filter-btn-move next" @click="move">&#62;</button>
      </template>
    </div>
    <button class="ow-filter-tab-btn more" @click="$refs.modal.open">
      <i class="circle"></i>
      <i class="circle"></i>
      <i class="circle"></i>
      <span class="sr-only">팝업 보기</span>
    </button>
    <teleport to="#teleport">
      <ow-modal type="XXL" ref="modal">
        <template #action>
          <button type="button" class="ow-btn type-base color-dark" @click.prevent="$refs.modal.onCancel">확인</button>
        </template>
        <ow-flex-wrap col>
          <ow-flex-item col fix>
            <ow-flex-wrap class="items-between">
              <ow-flex-item fix>
                <button class="ow-btn type-state refresh" @click="$emit('update:modelValue', (selectedNode = null))">
                  초기화
                </button>
              </ow-flex-item>
              <ow-flex-item fix>
                <template v-if="search.category && search.category.length > 0">
                  <ow-select label="검색" :items="search.category" v-model="search.scope"></ow-select>
                </template>
                <ow-input placeholder="검색어를 입력하세요." search @keyup="lookup"></ow-input>
              </ow-flex-item>
            </ow-flex-wrap>
          </ow-flex-item>
          <ow-flex-wrap class="size-full mt-16" :gap="0">
            <template v-for="(phaseNodeList, index) in filteredPhaseNodeList" :key="phaseNodeList">
              <ow-flex-item class="contents-box-wrap">
                <div class="contents-box">
                  <h3>{{ groupNames.at(index) ?? '' }}</h3>
                  <ul class="contents-box-list" style="height: 320px">
                    <template v-for="phaseNode in phaseNodeList" :key="phaseNode">
                      <li>
                        <a
                          :class="{ active: containsTreeNode(phaseNode) }"
                          @click="$emit('update:modelValue', (selectedNode = phaseNode))"
                          >{{ phaseNode.name }}</a
                        >
                      </li>
                    </template>
                  </ul>
                </div>
              </ow-flex-item>
            </template>
          </ow-flex-wrap>
        </ow-flex-wrap>
      </ow-modal>
    </teleport>
  </div>
</template>
<script>
import { computed, reactive, ref, toRefs, onMounted, onUnmounted, nextTick, toRef, unref } from 'vue';

import _ from 'lodash';

import { hasClass } from '@grapecity/wijmo';

import OwModal from '@/components/common/OwModal';

const DEBOUNCE_WAIT = 300;
const DEBOUNCE_MAX_WAIT = 3000;

class TreeNode {
  constructor(item, name, parent, children) {
    this.item = item;
    this.name = name;
    this.parent = parent;
    this.children = children;
  }

  get siblings() {
    const siblings = [];
    if (this.parent && this.parent.children) {
      for (const sibling of this.parent.children) {
        if (this !== sibling) {
          siblings.push(sibling);
        }
      }
    }
    return siblings;
  }

  get index() {
    if (this.parent && this.parent.children) {
      const children = this.parent.children;
      for (let i = 0, length = children.length; i < length; i += 1) {
        const sibling = children.at(i);
        if (this === sibling) {
          return i;
        }
      }
    }
    return 0;
  }

  get level() {
    let level = 0;
    for (let self = this; self; self = self.parent) level += 1;
    return level;
  }
}

function setRootNode(items = [], root = { name: '전체', items }) {
  if (items instanceof Array) {
    if (items.length > 1) {
      return root;
    }
    return items.at(0);
  }
  return items;
}

export default {
  name: 'OwFilterTab',
  components: {
    OwModal,
  },
  props: {
    displayMemberPath: {
      type: String,
      default: 'name',
    },
    childItemsPath: {
      type: String,
      default: 'items',
    },
    groupNames: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Object,
      default: () => [],
    },
    step: {
      type: Number,
      default: 1,
    },
    modelValue: Object,
  },
  setup(props, { emit }) {
    const root = ref(null);
    const filter = ref(null);
    const modal = ref(null);

    const item = computed(() => setRootNode(props.items));

    const state = reactive({
      treeNodeList: computed(() => asTreeNodeList(unref(item))),
      filteredFlatNodeList: computed(() => filterFlatNodeList()),
      filteredPhaseNodeList: computed(() => filterPhaseNodeList()),
      selectedNode: null,
      depth: 0,
      overflow: false,
      search: {
        category: computed(() => props.groupNames.map((name, value) => ({ name, value }))),
        scope: -1,
        keyword: '',
      },
    });

    const asTreeNodeList = (item, parent) => {
      const treeNode = new TreeNode(item, item[props.displayMemberPath], parent, item[props.childItemsPath]);
      if (treeNode.children) {
        treeNode.children = treeNode.children.map((child) => asTreeNodeList(child, treeNode));
      }
      if (treeNode.level > state.depth) {
        state.depth = treeNode.level;
      }
      return treeNode;
    };

    const filterFlatNodeList = () => {
      const flatNodeList = [];
      if (!state.selectedNode) {
        state.selectedNode = unref(state.treeNodeList);
      }
      const selectedNode = state.selectedNode;
      const isLeafNode = !selectedNode.children;
      if (isLeafNode) {
        const siblings = selectedNode.siblings;
        if (siblings) {
          flatNodeList.push(...siblings);
        }
        flatNodeList.splice(selectedNode.index, 0, selectedNode);
      } else {
        const children = selectedNode.children;
        if (children) {
          flatNodeList.push(...children);
        }
        flatNodeList.splice(0, 0, selectedNode);
      }
      for (let node = selectedNode.parent; node; node = node.parent) {
        flatNodeList.unshift(node);
      }
      return flatNodeList;
    };

    const filterPhaseNodeList = () => {
      const phaseNodeList = new Array(state.depth);
      if (state.selectedNode && state.selectedNode.parent) {
        for (let node = state.selectedNode; node; node = node.parent) {
          const nodeList = node.siblings ?? [];
          nodeList.splice(node.index, 0, node);
          phaseNodeList[node.level - 1] = nodeList;
        }
        if (state.selectedNode.children) {
          phaseNodeList[state.selectedNode.level] = state.selectedNode.children;
        }
      } else {
        for (let i = 0, length = state.depth; i < length; i += 1) {
          const _phaseNodeList = [];
          if (i > 0) {
            const prevPhaseNodeList = phaseNodeList.at(i - 1);
            for (const prevPhaseNode of prevPhaseNodeList) {
              if (prevPhaseNode.children) {
                _phaseNodeList.push(...prevPhaseNode.children);
              }
            }
          } else {
            _phaseNodeList.push(state.treeNodeList);
          }
          phaseNodeList[i] = _phaseNodeList;
        }
      }
      if (state.search.scope > -1 && state.search.keyword) {
        let filterTargetNodeList = phaseNodeList.at(state.search.scope + 1);
        filterTargetNodeList = filterTargetNodeList.filter((targetNode) => {
          return containsTreeNode(targetNode) || (targetNode.name || '').includes(state.search.keyword);
        });
        phaseNodeList[state.search.scope + 1] = filterTargetNodeList;
      }
      return _.tail(phaseNodeList);
    };

    const getTabButtonClass = (flatNode) => {
      const classes = {};
      classes[`level-${flatNode.level}`] = true;
      classes.start = flatNode.level === 1;
      classes.end = state.selectedNode
        ? state.selectedNode.children
          ? state.selectedNode === flatNode
          : state.selectedNode.parent === flatNode
        : false;
      classes.depth = !!flatNode.children;
      classes.active = !classes.depth && state.selectedNode === flatNode;
      return classes;
    };

    const containsTreeNode = (treeNode) => {
      for (let node = state.selectedNode; node; node = node.parent) {
        if (node === treeNode) {
          return true;
        }
      }
      return false;
    };

    const lookup = (e) => {
      const debounce = _.debounce(
        () => {
          state.search.keyword = e.target.value;
        },
        DEBOUNCE_WAIT,
        {
          maxWait: DEBOUNCE_MAX_WAIT,
        }
      );
      debounce();
      if (e.keyCode === 13) {
        debounce.flush();
      }
    };

    const getContentRect = (dom) => {
      return DOMRectReadOnly.fromRect(dom?.getBoundingClientRect() ?? null);
      if (dom) {
        return DOMRectReadOnly.fromRect(dom.getBoundingClientRect());
      }
    };

    let index = 0;
    const move = _.throttle((e) => {
      const { value: inner } = filter;

      const filterList = Array.from(inner.querySelectorAll('.ow-filter-tab-btn'));
      if (filterList.length > 0) {
        if (hasClass(e.target, 'prev')) {
          index = Math.max(0, (index -= props.step));
        } else {
          index = Math.min(state.filteredFlatNodeList.length - 1, (index += props.step));
        }

        const { left: point1 } = getContentRect(inner);
        const { left: point2 } = getContentRect(filterList.at(index));

        inner.style.transform = `translateX(${point1 - point2}px)`;
      }
    }, 300);

    const observer = new ResizeObserver((entries) => {
      const { value: outer } = root;
      const { value: inner } = filter;

      for (const entry of entries) {
        const { width: outerWidth } = getContentRect(outer);
        const { width: innerWidth } = entry.contentRect;
        if (entry.target === inner) {
          if (!(state.overflow = Math.floor(outerWidth) < Math.floor(innerWidth))) {
            index = 0;
            inner.style.transform = 'none';
          }
        }
      }
    });

    onMounted(() => {
      observer.observe(filter.value);
    });

    onUnmounted(() => {
      observer.disconnect();
    });

    return {
      root,
      filter,
      modal,
      ...toRefs(state),
      getTabButtonClass,
      containsTreeNode,
      move,
      lookup,
    };
  },
};
</script>
<style lang="scss" scoped>
.ow-filter-tab {
  &-wrap {
    &.has-arrow {
      padding: 0 11px;
    }
  }
  &-list {
    display: flex;
    transition: all 0.2s ease-in-out;
  }
  &-btn {
    word-break: keep-all;
    &.more {
      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
  }
}
</style>
