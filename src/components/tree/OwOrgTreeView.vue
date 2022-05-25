<template>
  <!-- tree menu -->
  <div class="ow-node-tree-wrap">
    <div class="ow-node-tree-head">
      <h3>검색</h3>
      <ow-input search @lookup="lookup"></ow-input>
    </div>
    <div class="ow-node-tree-body" ref="tree">
      <ow-tree-view
        :initialized="initTreeView"
        :items-source="treeData"
        :format-item="formatItem"
        :display-member-path="['userNm', 'orgNm']"
        child-items-path="children"
        :expand-on-load="false"
        v-bind="$attrs"
      ></ow-tree-view>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

import OwTreeView from '@/components/tree/OwTreeView';

import {
  //
  ref,
  reactive,
  toRefs,
} from 'vue';
import {
  //
  addClass,
  removeClass,
  hasClass,
} from '@grapecity/wijmo';
import {
  //
  TreeView,
} from '@grapecity/wijmo.nav';
import {
  //
  getOrganization,
} from '@/api/tree';

const CLS_FILTERED = 'filtered';
const CLS_MATCHED = 'matched';

const CLS_ORG = 'org';
const CLS_USER = 'user';

function setNodeText(node, keyword, text) {
  const element = node.element;
  const regex = /(<span class="highlight">|<\/span>)/gi;
  const keywordReg = new RegExp(keyword, 'gi');
  const textElement = element.querySelector('.' + TreeView._CNDT);
  let textContent = textElement.textContent;
  textContent = textContent.replace(regex, '');
  textContent = textContent.replace(keywordReg, text);
  textElement.innerHTML = textContent;
}

function getNodeText(node, displayMemberPath) {
  const item = node.dataItem;
  for (const displayMember of displayMemberPath) {
    const text = item[displayMember];
    if (text) {
      return text;
    }
  }
  return '';
}

function traversal(s, nodes, keyword) {
  for (const node of nodes) {
    const text = getNodeText(node, s.displayMemberPath);
    const isMatched = !!keyword && _.toUpper(text).includes(keyword);
    if (isMatched) {
      for (let self = node; self; self = self.parentNode) {
        self.isCollapsed = false;
        setNodeText(self, keyword, '<span class="highlight">$&</span>');
        addClass(self.element, CLS_MATCHED);
      }
    } else {
      node.isCollapsed = !!node.parentNode;
      setNodeText(node, keyword, '');
      removeClass(node.element, CLS_MATCHED);
    }
    if (node.nodes) {
      traversal(s, node.nodes, keyword);
    }
    if (isMatched && node.nodes) {
      for (const child of node.nodes) {
        const element = child.element;
        if (hasClass(element, CLS_USER)) {
          addClass(element, CLS_MATCHED);
        }
      }
    }
  }
}

export default {
  inheritAttrs: false,
  name: 'OwOrgTreeView',
  components: {
    OwTreeView,
  },
  props: {
    orgCd: String,
    withUsers: Boolean,
    initialized: Function,
  },
  setup(props) {
    const tree = ref();

    const state = reactive({
      treeData: [],
    });

    const lookup = (keyword) => {
      keyword = keyword.replace(/\s/g, '');
      const treeView = state.treeView;
      const hostElement = treeView.hostElement;
      if (!keyword) {
        removeClass(hostElement, CLS_FILTERED);
      }
      traversal(treeView, treeView.nodes, _.toUpper(keyword));
      if (keyword) {
        addClass(hostElement, CLS_FILTERED);
      }
      tree.value.scrollTop = 0;
    };

    const initTreeView = async (s) => {
      state.treeView = s;
      state.treeData = await getOrganization(props.orgCd, props.withUsers);

      s.loadedItems.addHandler(() => {
        const root = s.nodes.at(0);
        if (root) {
          root.isCollapsed = false;
        }
      });

      if (props.initialized) {
        props.initialized(s);
      }
    };

    const formatItem = (s, e) => {
      const item = e.dataItem;
      const element = e.element;
      if (item.orgNm) {
        addClass(element, CLS_ORG);
      } else if (item.userNm) {
        addClass(element, CLS_USER);
      }
    };

    return {
      tree,
      ...toRefs(state),
      initTreeView,
      formatItem,
      lookup,
    };
  },
};
</script>

<style lang="scss" scoped>
$org-img: '~@/assets/images/icon/ico_organization.svg';
$user-img: '~@/assets/images/icon/ico_people.svg';

@mixin image-default($img) {
  .wj-node-text {
    &::before {
      content: '';
      display: inline-block;
      margin-right: 5px;
      background-image: url($img);
      width: 15px;
      height: 15px;
    }
  }
}
.wj-treeview {
  &.filtered {
    :deep(.wj-node:not(.matched)) {
      display: none;
    }
    :deep(.highlight) {
      background-color: yellow;
    }
  }
  :deep(.org) {
    @include image-default(#{$org-img});
  }
  :deep(.user) {
    @include image-default(#{$user-img});
  }
}

// ow-node-tree
.ow-node-tree-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #d7dce3;
  overflow: auto;
  .ow-node-tree-head {
    border-top: 0;
    border-right: 0;
    border-left: 0;
  }
  .ow-node-tree-body {
    padding: 6px;
    flex: 1;
    overflow: auto;
  }
}
.ow-node-tree-head {
  padding: 0 6px;
  height: 34px;
  border: 1px solid #d7dce3;
  background-color: #f1f5f9;
  display: flex;
  justify-content: normal;
  align-items: center;
  h3 {
    flex-shrink: 0;
    font-size: 12px;
    line-height: 100%;
    + :deep(.ow-combobox) {
      margin-left: 5px;
    }
  }
}
</style>
