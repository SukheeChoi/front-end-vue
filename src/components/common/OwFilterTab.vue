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
    <teleport to="#ows-teleport-modal">
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
import { computed, reactive, ref, toRefs, onMounted, onUnmounted } from 'vue';

import _ from 'lodash';

import { hasClass } from '@grapecity/wijmo';

import OwModal from '@/components/common/OwModal';

const DEBOUNCE_WAIT = 300;
const DEBOUNCE_MAX_WAIT = 3000;

class TreeNode {
  constructor(item, parent, displayMemberPath, childItemsPath) {
    this._item = item;
    this._parent = parent; // TreeNode
    this._displayMemberPath = displayMemberPath;
    this._childItemsPath = childItemsPath;
  }

  get item() {
    return this._item;
  }

  get parent() {
    return this._parent;
  }

  get name() {
    return this._item[this._displayMemberPath];
  }

  get children() {
    const children = [];
    if (this._item[this._childItemsPath]) {
      for (const child of this._item[this._childItemsPath]) {
        children.push(new TreeNode(child, this, this._displayMemberPath, this._childItemsPath));
      }
    }
    return children;
  }

  get hasChildren() {
    const children = this.children;
    return children && children.length > 0;
  }

  get siblings() {
    const siblings = [];
    if (this.parent) {
      for (const sibling of this.parent.children) {
        if (this.item !== sibling.item) {
          siblings.push(sibling);
        }
      }
    }
    return siblings;
  }

  get hasSiblings() {
    const siblings = this.siblings;
    return siblings && siblings.length > 0;
  }

  get index() {
    let at = 0;
    if (this.parent) {
      for (const sibling of this.parent.children) {
        if (this.item === sibling.item) {
          break;
        }
        at += 1;
      }
    }
    return at;
  }

  get level() {
    let level = 0;
    for (let self = this; self; self = self.parent) level += 1;
    return level;
  }
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

    const displayMemberPath = props.displayMemberPath;
    const childItemsPath = props.childItemsPath;

    const state = reactive({
      item: computed(() => setRootItem(props.items)),
      treeNodeList: computed(() => asTreeNodeList(state.item)),
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

    const setRootItem = (items = []) => {
      if (items instanceof Array) {
        if (items.length > 1) {
          return {
            [displayMemberPath]: '전체',
            [childItemsPath]: items,
          };
        }
        return items.at(0);
      }
      return items;
    };

    const traversal = (treeNode) => {
      if (treeNode.hasChildren) {
        for (const child of treeNode.children) {
          traversal(child);
        }
      }
      if (treeNode.level > state.depth) {
        state.depth = treeNode.level;
      }
    };

    const asTreeNodeList = (item, parent) => {
      const treeNode = new TreeNode(item, parent, displayMemberPath, childItemsPath);
      traversal(treeNode);
      return treeNode;
    };

    const filterFlatNodeList = () => {
      const flatNodeList = [];
      if (!state.selectedNode) {
        state.selectedNode = state.treeNodeList;
      }
      const selectedNode = state.selectedNode;
      const isLeafNode = !selectedNode.hasChildren;
      if (isLeafNode) {
        flatNodeList.push(...selectedNode.siblings);
        flatNodeList.splice(selectedNode.index, 0, selectedNode);
      } else {
        flatNodeList.push(selectedNode);
        flatNodeList.push(...selectedNode.children);
      }
      for (let node = selectedNode.parent; node; node = node.parent) {
        flatNodeList.unshift(node);
      }
      return flatNodeList;
    };

    const filterPhaseNodeList = () => {
      const phaseNodeList = new Array(state.depth);
      const selectedNode = state.selectedNode;
      if (selectedNode && selectedNode.parent) {
        for (let node = selectedNode; node; node = node.parent) {
          phaseNodeList[node.level - 1] = node.siblings;
          phaseNodeList[node.level - 1].splice(node.index, 0, node);
        }
        if (selectedNode.hasChildren) {
          phaseNodeList[selectedNode.level] = selectedNode.children;
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
      const selectedNode = state.selectedNode;
      const classes = {};
      classes[`level-${flatNode.level}`] = true;
      classes.start = flatNode.level === 1;
      classes.end = selectedNode
        ? selectedNode.hasChildren
          ? selectedNode === flatNode
          : selectedNode.parent === flatNode
        : false;
      classes.depth = !!flatNode.hasChildren;
      classes.active = !classes.depth && selectedNode === flatNode;
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
