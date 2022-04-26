<template>
  <!-- tree menu -->
  <div class="ow-node-tree-wrap">
    <div class="ow-node-tree-head">
      <h3>검색</h3>
      <ow-input search @lookup="lookup"></ow-input>
    </div>
    <div class="ow-node-tree-body">
      <ow-tree-view
        :initialized="initTreeView"
        :items-source="treeData"
        :format-item="formatItem"
        :display-member-path="['orgNm', 'userNm']"
        child-items-path="children"
        :expand-on-load="false"
        v-bind="$attrs"
      ></ow-tree-view>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

import { reactive, toRefs } from 'vue';
import { addClass, removeClass, hasClass } from '@grapecity/wijmo';
import OwTreeView from '@/components/tree/OwTreeView';
import { getOrganization } from '@/api/tree';

const CLS_FILTERED = 'filtered';
const CLS_MATCHED = 'matched';

const CLS_ORG = 'org';
const CLS_USER = 'user';

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
    const state = reactive({
      treeData: [],
    });

    const traversal = (nodes, keyword) => {
      const regex = /(<span class="highlight">|<\/span>)/gi;
      const keywordReg = new RegExp(keyword, 'gi');

      for (const node of nodes) {
        const dataItem = node.dataItem;
        const name = dataItem.orgNm ?? dataItem.userNm ?? '';
        const isMatched = !!keyword && name.includes(keyword);

        if (isMatched) {
          for (let self = node; self; self = self.parentNode) {
            self.isCollapsed = false;
            const element = self.element;
            const html = element.innerHTML.replace(regex, '');

            if (keywordReg.test(element.textContent)) {
              addClass(element, 'show');
            }
            element.innerHTML = html.replace(keywordReg, '<span class="highlight">$&</span>');
            addClass(element, CLS_MATCHED);
          }
        } else {
          node.isCollapsed = !!node.parentNode;
          const element = node.element;
          const html = element.innerHTML.replace(regex, '');
          element.innerHTML = html;
          removeClass(element, CLS_MATCHED);
        }
        if (
          node.parentNode &&
          hasClass(node.parentNode.element, 'show') &&
          hasClass(node.parentNode.element, CLS_MATCHED)
        ) {
          console.log(node);
          if (hasClass(node.element, CLS_USER)) {
            addClass(node.element, CLS_MATCHED);
          }
          console.log(node.parentNode, node);
        }
        if (node.nodes) {
          traversal(node.nodes, keyword);
        }
      }
    };

    const lookup = (keyword) => {
      const treeView = state.treeView;
      keyword = keyword.replace(/\s/g, '');
      if (!keyword) {
        removeClass(treeView.hostElement, CLS_FILTERED);
      }
      traversal(treeView.nodes, _.toUpper(keyword));
      if (keyword) {
        addClass(treeView.hostElement, CLS_FILTERED);
      }
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
