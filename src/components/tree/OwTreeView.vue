<template>
  <wj-tree-view
    :auto-collapse="autoCollapse"
    :is-animated="isAnimated"
    :show-checkboxes="showCheckboxes"
    :initialized="init"
  ></wj-tree-view>
</template>

<script>
import { WjTreeView } from '@grapecity/wijmo.vue2.nav';
import { TreeView } from '@grapecity/wijmo.nav';

export default {
  name: 'OwTreeView',
  components: {
    WjTreeView,
  },
  props: {
    autoCollapse: Boolean,
    isAnimated: Boolean,
    initialized: Function,
    showCheckboxes: Boolean,
  },
  setup(props) {
    const init = (s) => {
      s.formatItem.addHandler((s, e) => {
        const item = e.dataItem;
        let display;
        if (Array.isArray(s.displayMemberPath)) {
          for (const displayMemberPath of s.displayMemberPath) {
            if ((display = item[displayMemberPath])) {
              break;
            }
          }
        } else {
          display = item[s.displayMemberPath];
        }
        const textNode = e.element.querySelector('.' + TreeView._CNDT);
        if (textNode) {
          textNode.textContent = display;
        }
      });

      s.checkedItemsChanged.addHandler(
        function () {
          this.checkedAllItems = [];
          const selector = '.' + TreeView._CND + ' > input:checked.' + TreeView._CNDC;
          const checkboxes = this._root.querySelectorAll(selector);
          for (const checkbox of checkboxes) {
            const data = checkbox.parentElement[TreeView._DATAITEM_KEY];
            this.checkedAllItems.push(data);
          }
        }.bind(s)
      );

      if (props.initialized) {
        props.initialized(s);
      }
    };

    return {
      init,
    };
  },
};
</script>
