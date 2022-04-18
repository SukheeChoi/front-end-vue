<template>
  <ow-tree-view
    :initialized="initTreeView"
    :items-source="treeData"
    :format-item="onFormatItem"
    :display-member-path="['orgNm', 'userNm']"
    child-items-path="children"
    v-bind="$attrs"
  ></ow-tree-view>
</template>
<script>
import _ from 'lodash';

import { computed, reactive, toRef, toRefs } from 'vue';

import { addClass, removeClass, hasClass } from '@grapecity/wijmo';

import OwTreeView from '@/components/wijmo/tree/OwTreeView';

import { getOrganization } from '@/api/tree';

const CLS_F = 'filtered';
const CLS_M = 'matched';

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

    const initTreeView = async (s) => {
      state.treeView = s;
      state.treeData = await getOrganization(props.orgCd, props.withUsers);
      if (props.initialized) {
        props.initialized(s);
      }
    };

    const onFormatItem = (s, e) => {
      if (e.dataItem.orgNm) {
        e.element.classList.add('org');
      }
      if (e.dataItem.empNo) {
        e.element.classList.add('user');
      }
    };

    return {
      ...toRefs(state),
      initTreeView,
      onFormatItem,
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
  position: relative;
  &.filtering::after {
    content: '찾는중...';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 20%;
    background-color: rgba(255, 255, 255, 1);
  }
  &.filtered {
    :deep(.wj-node:not(.matched)) {
      display: none;
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
