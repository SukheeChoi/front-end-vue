<template>
  <ow-grid :initialized="init" :footer="false" ref="grid" v-bind="$attrs">
    <template #left>
      <slot name="left"></slot>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
    <slot></slot>
  </ow-grid>
</template>
<script>
import _ from 'lodash';

import { reactive, ref, toRefs, onMounted } from 'vue';
import { SelectionMode } from '@grapecity/wijmo.grid';
import * as wjGrid from '@grapecity/wijmo.grid';
import utils from '@/utils/commUtils.js';

export default {
  name: 'OwTreeGrid',
  inheritAttrs: false,
  components: {},
  props: {
    initialized: Function,
    selector: Boolean,
    drag: {
      type: Object,
      default: () => ({
        allowAdding: 'add', // add : add row, set : set row data
        targetType: [],
        dragType: [],
        key: [],
        readonly: [],
        nodeTypeId: 'nodeType',
        readOnlyNodeTypeId: 'nodeType',
      }),
    },
    selectionMode: {
      type: [Number, String],
      default: SelectionMode.Row,
    },
    childItemsPath: {
      type: String,
      default: 'children',
    },
  },
  setup(props) {
    const NODE_TYPE_ID = props.drag.nodeTypeId ? props.drag.nodeTypeId : 'nodeType',
          READ_ONLY_NODE_TYPE_ID = props.drag.readOnlyNodeTypeId ? props.drag.readOnlyNodeTypeId : NODE_TYPE_ID;

    const state = reactive({
      grid: null,
      drag: props.drag,
      sourceCollection: _.cloneDeep(props.itemsSource),
    });

    const init = (grid) => {
      if (props.initialized) {
        props.initialized(grid);
      }

      formatItem(grid);

      grid.selectionMode = props.selectionMode;
      grid.childItemsPath = props.childItemsPath;
      state.grid = grid;
    };

    const grid = ref(null);

    const read = () => grid.value.read();
    const save = () => grid.value.save();
    const remove = () => grid.value.remove();
    const add = () => grid.value.add();

    onMounted(() => {
      if (props.drag) {
        makeDragSource(state.grid);
        if (grid.value.allowStatus) {
          makeDropTarget(state.grid);
        }
      }
    });

    let originalGrid = null,
      dragDiv = null,
      dragRow1 = null,
      dragRow2 = null;

    const addCellIcon = (s, e) => {
      if (e.panel.cellType != wjGrid.CellType.Cell) {
        return;
      }

      let row = e.getRow(),
        col = e.getColumn();
      if (col.cssClass == 'icon') {
        if (s.activeEditor !== null) {
          return;
        }

        let padding = row.level * 20,
          collapse = '',
          icon = utils.getOwIcon(row.dataItem[NODE_TYPE_ID]) ?? '',
          text = e.cell.innerText ?? '';

        // has child node, add collapse/expand buttons
        if (row.hasChildren) {
          if (row.isCollapsed) {
            collapse = utils.getWjGlyph('right', 'collapse');
          } else {
            collapse = utils.getWjGlyph('down-right', 'collapse');
          }
        } else {
          padding += 18;
        }

        e.cell.innerHTML = collapse + icon + text;

        // osstem logo
        if (row.dataItem[NODE_TYPE_ID] == 'org' && row.dataItem.ehrOrgCd == '0000') {
          icon = utils.getOwIcon('osstem');
          e.cell.innerHTML = collapse + row.dataItem.orgNm + icon;
        }

        e.cell.style.paddingLeft = padding + 'px';
      }
    };

    const formatItem = (grid) => {
      grid.formatItem.addHandler(function (s, e) {
        addCellIcon(s, e);
      });
    };

    const createImage = () => {
      if (!dragDiv) {
        dragDiv = document.createElement('div');
        dragDiv.setAttribute('droppable', true);
        dragDiv.style.position = 'absolute';
        dragDiv.style.zIndex = 999;
        dragDiv.style.outline = '2px solid rgba(90, 160, 215, .5)';

        document.body.appendChild(dragDiv);
      }
    };

    const removeImage = () => {
      if (dragDiv) {
        dragDiv.style.display = 'none';
      }
    };

    const getDataHierarchy = (grid, rowIndex) => {
      dragRow1 = rowIndex;
      dragRow2 = rowIndex;
      let _lvl = grid.rows[rowIndex].level;
      if (grid.rows[rowIndex].hasChildren) {
        for (let i = rowIndex; i < grid.rows.length - 1; i++) {
          if (grid.rows[i].level == _lvl) {
            break;
          }
          dragRow2++;
        }
      }
    };

    const addItem = (grid, target) => {
      let targetRow = grid.hitTest(target).row,
        dragRow = target.dataTransfer.getData('text'),
        dataItem = originalGrid.rows[+dragRow].dataItem,
        isTargetValid = false;

      if ((!dragRow || !targetRow) && (dragRow < 0 || targetRow < 0)) {
        return false;
      }

      let item = _.cloneDeep(dataItem),
        targetItem = grid.rows[targetRow].dataItem;

      if (item[props.childItemsPath]) {
        delete item[props.childItemsPath];
      }

      item.rowStatus = 'C';
      item[NODE_TYPE_ID] = state.drag.dragType.at(0);

      state.drag.targetType.forEach((type) => {
        if (targetItem[NODE_TYPE_ID] === type) {
          isTargetValid = true;
        }
      });

      state.drag.dragType.forEach((type) => {
        if (targetItem[NODE_TYPE_ID] === type) {
          isTargetValid = true;
        }
      });

      if (!isTargetValid) {
        return;
      }

      if (!targetItem[props.childItemsPath]) {
        if (state.drag.targetType.includes(targetItem[NODE_TYPE_ID])) {
          if (state.drag.allowAdding === 'set') {
            utils.setDragItemKey(item, targetItem, state.drag.key);
          } else {
            utils.setDragItemKey(targetItem, item, state.drag.key);
          }

          utils.addChildItem(grid, targetItem, targetRow, item, props.childItemsPath, state.drag.allowAdding);
        } else {
          // find closest parent
          let parent = [];
          if (!targetItem[props.childItemsPath]) {
            for (let r = targetRow; r >= 0; r--) {
              if (grid.rows[r].hasChildren) {
                parent = grid.rows[r].dataItem;
                break;
              }
            }
          }

          utils.setDragItemKey(parent, item, state.drag.key);

          if (!state.drag.targetType.includes(parent[NODE_TYPE_ID])) {
            return;
          }

          if (utils.chkChildItem(parent, item, state.drag.key)) {
            return;
          }

          utils.addChildItem(grid, parent, targetRow, item, props.childItemsPath, state.drag.allowAdding);
        }
      } else {
        utils.setDragItemKey(targetItem, item, state.drag.key);

        if (utils.chkChildItem(targetItem, item, state.drag.key)) {
          return;
        }

        utils.addChildItem(grid, targetItem, targetRow, item, props.childItemsPath, state.drag.allowAdding);
      }

      return true;
    };

    const makeDragSource = (s) => {
      // make rows draggable
      s.itemFormatter = (panel, r, c, cell) => {
        let row = panel.rows[r];

        if (panel.cellType == wjGrid.CellType.RowHeader) {
          if (s.rowHeaders.columns[c].binding !== 'drag') {
            cell.draggable = false;
            return;
          } else {
            cell.draggable = true;
          }

          if (state.drag.readonly) {
            state.drag.readonly.forEach((type) => {
              if (type == row.dataItem[READ_ONLY_NODE_TYPE_ID]) {
                cell.innerHTML = '';
                cell.draggable = false;
              }
            });
          }
        }
      };

      // disable built-in row drag/drop
      s.addEventListener(
        s.hostElement,
        'mousedown',
        (e) => {
          if (s.hitTest(e).cellType == wjGrid.CellType.RowHeader) {
            e.stopPropagation();
          }
        },
        true
      );

      // handle drag start
      s.addEventListener(
        s.hostElement,
        'dragstart',
        (e) => {
          createImage();

          let ht = s.hitTest(e);
          if (ht.cellType == wjGrid.CellType.RowHeader) {
            s.select(new wjGrid.CellRange(ht.row, 0, ht.row, s.columns.length - 1));
            originalGrid = s; // drag가 시작된 그리드
            e.dataTransfer.effectAllowed = 'copy';
            getDataHierarchy(s, ht.row.toString());

            e.dataTransfer.setData('text', dragRow2);
          }
        },
        true
      );
    };

    // enable drop operations on an element
    const makeDropTarget = (s) => {
      const allowStatus = s.itemsSource._vm.allowStatus ?? s.itemsSource._vm.grid.allowStatus;

      s.hostElement.addEventListener('dragover', (e) => {
        let ht = s.hitTest(e),
          dragRow = e.dataTransfer.getData('text');

        if (!allowStatus) {
          return;
        }

        if (!ht || ht.panel === null) {
          removeImage();
          return;
        }
        // prevent Dragging for Selected items Children and the Cell panel
        if (ht.row >= dragRow1 && ht.row < dragRow2) {
          removeImage();
          return;
        }

        if (dragRow != null && dragDiv) {
          dragDiv.style.display = 'inline-block';
          e.dataTransfer.dropEffect = 'copy';
          e.preventDefault();

          let _rect = s.rowHeaders.getCellBoundingRect(ht.row + 1, 0);
          dragDiv.style.width = s.hostElement.clientWidth + 'px';
          dragDiv.style.top = _rect.top + window.pageYOffset + 'px';
          dragDiv.style.left = _rect.left + window.pageXOffset + 'px';
        }
      });

      s.hostElement.addEventListener('drop', (e) => {
        let item = originalGrid.rows[+e.dataTransfer.getData('text')].dataItem;

        if (s != originalGrid) {
          addItem(s, e);
        } else {
          if (!allowStatus) {
            removeImage();
            return;
          }

          if (addItem(s, e)) {
            removeItem(s.itemsSource.sourceCollection, item, state.drag.key);

            const Index = Symbol('Index').toString();
            let isSymbol = false;

            for (let i = 0; i < s.collectionView.itemsRemoved.length; i++) {
              if (s.collectionView.itemsRemoved[i][Index] === item[Index]) {
                isSymbol = true;
              }
            }

            if (!isSymbol) {
              item.rowStatus = 'D';
              s.collectionView.itemsRemoved.push(item);
              s.collectionView.refresh();
            }
          }
        }

        removeImage();

        s.collectionView.refresh();
        e.preventDefault();
      });
    };

    const removeItem = (dataItem, item, itemKey) => {
      for (let i = 0; i < dataItem.length; i++) {
        if (utils.removeChildItem(dataItem[i], item, itemKey)) {
          break;
        }
      }
    };

    return {
      ...toRefs(state),
      init,
      makeDragSource,
      makeDropTarget,
      grid,
      read,
      remove,
      save,
    };
  },
};
</script>
<style lang="scss" scoped></style>
