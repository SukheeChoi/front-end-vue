<template>
  <ow-grid v-bind="$attrs" :initialized="init" :footer="false" ref="grid">
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
import { Selector } from '@grapecity/wijmo.grid.selector';
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
      default: () => [],
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

    onMounted(() => {
      if (props.drag) {
        makeDragSource(state.grid);
        makeDropTarget(state.grid);
      }
    });

    let originalGrid = null,
        dragDiv = null,
        dragRow1 = null,
        dragRow2 = null;

    const addSelector = (grid) => {
      let chkIdx;
      grid.columns.forEach((col) => {
        if (col.name == 'chk') {
          chkIdx = col.index;
        }
      });
      return new Selector(grid.columns[chkIdx], {});
    };

    const addHeaderIcon = (grid, e) => {
      if (e.panel.cellType != wjGrid.CellType.RowHeader) {
        return;
      }

      let row = e.panel.rows[e.row],
        colHeader = grid.rowHeaders.columns[e.col];

      if (colHeader.binding == 'rowStatus') {
        if (row.dataItem.rowStatus == 'U') {
          e.cell.innerHTML = utils.getWjGlyph('pencil');
        } else if (row.dataItem.rowStatus == 'C') {
          e.cell.innerHTML = utils.getWjGlyph('asterisk');
        } else {
          e.cell.innerHTML = '';
        }
      } else if (colHeader.binding == 'drag') {
        e.cell.innerHTML = utils.getWjGlyph('drag', 'button');
      }
    };

    const addCellIcon = (s, e) => {
      if (e.panel.cellType != wjGrid.CellType.Cell) {
        return;
      }

      let row = e.panel.rows[e.row],
          col = e.panel.columns[e.col];

      if (col.cssClass == 'icon') {
        let padding = row.level * 13,
            collapse = '',
            iconType = state.drag.iconType?.toLowerCase() ?? '',
            icon = utils.getOwIcon(row.dataItem[iconType]) ?? '',
            text = e.cell.innerText ?? '';

        // has child node, add collapse/expand buttons
        if (row.hasChildren) {
          if (row.isCollapsed) {
            collapse = utils.getWjGlyph('right', 'collapse');
          } else {
            collapse = utils.getWjGlyph('down-right', 'collapse');
          }
        }

        e.cell.innerHTML = collapse + icon + text;

        // osstem logo
        if (row.dataItem.nodeType == 'org' && row.dataItem.orgCd == '0000') {
          icon = utils.getOwIcon('osstem');
          e.cell.innerHTML = collapse + row.dataItem.orgNm + icon; 
        }

        e.cell.style.paddingLeft = padding + 'px';
      }
    };

    const formatItem = (grid) => {
      grid.formatItem.addHandler(function(s, e) {
        addHeaderIcon(grid, e);
        addCellIcon(s, e);
      });
    }

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
        for (let i = rowIndex + 1; i < grid.rows.length - 1; i++) {
          if (grid.rows[i].level == _lvl) {
            break;
          }
          dragRow2++;
        }
      }
    };

    const addItem = (grid, target) => {
      let ht = grid.hitTest(target),
        dragRow = target.dataTransfer.getData('text'),
        item = originalGrid.rows[parseInt(dragRow)].dataItem,
        parentRow = -1,
        findIdx = false;

      if (!dragRow || !ht.row) {
        return false;
      }

      let _item = _.cloneDeep(item);
      _item.orgCd = grid.rows[ht.row].dataItem.orgCd;
      _item.rowStatus = 'C';

      grid.rows.forEach((row) => {
        if (row.hasChildren == true && row._data.orgCd == _item.orgCd) {
          parentRow = row.index;

          row.dataItem.children.forEach((findRow) => {
            if (findRow.bizGrpId == item.bizGrpId) {
              findIdx = true;
            }
          });
        }
      });

      if (findIdx) {
        return false;
      }

      if (!grid.rows[ht.row].dataItem.children) {
        let findType = false;
        if (state.drag.nodeType) {
          state.drag.nodeType.forEach((type) => {
            if (grid.rows[ht.row].dataItem.nodeType == type) {
              findType = true;
            }
          })
        }

        if (findType) {
          grid.rows[ht.row].dataItem.children = [];
          grid.rows[ht.row].dataItem.children.splice(0, 0, _item);
        } else {
          if (parentRow >= 0) {
            grid.rows[parentRow].dataItem.children.splice(0, 0, _item);
          }
        }
      } else {
        grid.rows[ht.row].dataItem.children.splice(0, 0, _item);
      }

      grid.collectionView.itemsAdded.push(_item);

      return true;
    };

    const makeDragSource = (s) => {
      // make rows draggable
      s.itemFormatter = (panel, r, c, cell) => {
        let row = panel.rows[r];
        
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          cell.draggable = true;

          if (state.drag.readonly) {
            state.drag.readonly.forEach((type) => {
              if (type == row.dataItem.nodeType) {
                cell.draggable = false;
              }
            });
          }

          if (s.rowHeaders.columns[c].binding != 'drag') {
            cell.draggable = false;
          }
        }
      };

      // disable built-in row drag/drop
      s.addEventListener(s.hostElement, "mousedown", (e) => {
          if (s.hitTest(e).cellType == wjGrid.CellType.RowHeader) {
            e.stopPropagation();
          }
        },
        true
      );

      // handle drag start
      s.addEventListener(s.hostElement, "dragstart", (e) => {
          createImage();
          let ht = s.hitTest(e);
          if (ht.cellType == wjGrid.CellType.RowHeader) {
            s.select(new wjGrid.CellRange(ht.row, 0, ht.row, s.columns.length - 1));
            originalGrid = s; // drag가 시작된 그리드
            e.dataTransfer.effectAllowed = "copy";
            getDataHierarchy(s, ht.row.toString());

            e.dataTransfer.setData('text', dragRow2);
          }
        },
        true
      );
    }

    // enable drop operations on an element
    const makeDropTarget = (s) => {
      s.hostElement.addEventListener("dragover", (e) => {
        let ht = s.hitTest(e);
        let dragRow = e.dataTransfer.getData("text");
        if (!ht || ht.panel == null) {
          return;
        }
        // prevent Dragging for Selected items Children and the Cell panel
        if (ht.row >= dragRow1 && ht.row < dragRow2) {
          removeImage();
          return;
        }
        if (dragRow != null) {
          dragDiv.style.display = 'inline-block';
          e.dataTransfer.dropEffect = "copy";
          e.preventDefault();

          let _rect = s.rowHeaders.getCellBoundingRect(ht.row + 1, 0);
          dragDiv.style.width = s.hostElement.clientWidth + 'px';
          dragDiv.style.top = _rect.top + window.pageYOffset + 'px';
          dragDiv.style.left = _rect.left + window.pageXOffset + 'px';
        }
      });

      s.hostElement.addEventListener("drop", (e) => {
        let item = originalGrid.rows[parseInt(e.dataTransfer.getData("text"))].dataItem; //drag data

        if (s != originalGrid) {
          addItem(s, e);
        } else {
          if (addItem(s, e)) {
            item.rowStatus = 'D';
            utils.removeBizGrpItem(s.collectionView.sourceCollection[0], item, state.drag.key); //delete item
            s.collectionView.itemsRemoved.push(item);
          }
        }

        removeImage();

        s.collectionView.refresh();
        e.preventDefault();
      });
    }

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
