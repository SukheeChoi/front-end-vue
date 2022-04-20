<template>
  <ow-flex-wrap>
    <ow-flex-item class="size-full" col>
      <ow-input search @lookup="lookup"></ow-input>
      <ow-tree-view
        :initialized="initTreeView"
        :items-source="treeData"
        :format-item="formatItem"
        :display-member-path="['orgNm', 'userNm']"
        child-items-path="children"
        :expand-on-load="false"
        v-bind="$attrs"
      ></ow-tree-view>
    </ow-flex-item>
  </ow-flex-wrap>
</template>
<script>
import _ from 'lodash';

import { reactive, toRefs } from 'vue';
import { addClass, removeClass } from '@grapecity/wijmo';
import OwTreeView from '@/components/wijmo/tree/OwTreeView';
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
</style>
