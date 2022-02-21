<template>
  <ow-flex-grid v-bind="$attrs" :initialized="init">
    <slot></slot>
  </ow-flex-grid>
</template>
<script>
import _ from 'lodash';

import { reactive, ref, computed, watch, toRefs, onMounted } from 'vue';
import { CollectionView } from '@grapecity/wijmo';
import { AllowDragging, SelectionMode, Column, RowCol } from '@grapecity/wijmo.grid';
import { Selector } from '@grapecity/wijmo.grid.selector';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjGrid from '@grapecity/wijmo.grid';
import utils from '@/utils/commUtils.js';

export default {
  name: 'OwTreeGrid',
  inheritAttrs: false,
  components: {},
  props: {
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
  setup(props, { emit }) {
    const state = reactive({
      grid: null,
      drag: props.drag,
      sourceCollection: _.cloneDeep(props.itemsSource),
    });

    const init = (grid) => {
      if (props.selector) {
        addSelector(grid);
      }
      formatItem(grid);
      grid.selectionMode = props.selectionMode;
      grid.childItemsPath = props.childItemsPath;

      state.grid = grid;
    };

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

    const trimSelector = (s, e) => {
      let col = e.panel.columns[e.col],
          row = e.panel.rows[e.row];

      if (col.name == 'chk') {
        if (row.dataItem && row.dataItem.nodeType == state.drag.nodeType) {
          // remove buttons from first column
          e.cell.innerHTML = e.cell.textContent.trim();
        }
        e.cell.style.paddingLeft = null;
      }
    }

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
      if (!state.drag.icon) {
        return;
      }

      let row = e.panel.rows[e.row],
        binding = s.columns[e.col].binding;

      state.drag.icon.forEach((col) => {
        if (binding == col) {
          if (row.dataItem && row.dataItem[col]) {
            e.cell.innerHTML =
              row.dataItem[col] +
              (utils.getOwIcon(row.dataItem.nodeType) ? utils.getOwIcon(row.dataItem.nodeType) : '');
          }
        }
      });

      // 조직도 icon 추가
      if (binding == 'orgNm') {
        let padding = row.level * 13;
        if (!row.hasChildren) {
          padding += 20;
        } else {
          // has child node, add collapse/expand buttons
          // clear content
          e.cell.innerHTML = '';
          let collapse = '',
            icon = '';

          if (row.isCollapsed) {
            collapse = utils.getWjGlyph('right', 'collapse');
          } else {
            collapse = utils.getWjGlyph('down-right', 'collapse');
          }

          if (row.dataItem.nodeType == 'org') {
            if (row.dataItem.orgCd == '0000') {
              icon = utils.getOwIcon('osstem');
            } else {
              icon = utils.getOwIcon(row.dataItem.nodeType);
            }
          }

          e.cell.innerHTML = collapse + row.dataItem.orgNm + icon;
        }
        e.cell.style.paddingLeft = padding + 'px';
      }
    };

    const formatItem = (grid) => {
      if (grid.allowDragging > 1) { //None
        // const rowHeaders = grid.rowHeaders.columns,
        //       drag = (element) => element.binding == 'drag';
        // if (rowHeaders.findIndex(drag) < 0) {
        //   grid.rowHeaders.columns.push(new wjcGrid.Column({ binding: 'drag', header: ' ', align: 'center' }));
        // }

        // grid.rowHeaders.columns[0].binding = 'drag';
        // grid.rowHeaders.columns[0].header = ' ';
        // grid.rowHeaders.columns.push(new wjcGrid.Column({ binding: 'rowStatus', header: ' ', align: 'center' }));
        grid.hostElement.style.width = getComputedStyle(grid.hostElement).getPropertyValue('width');

        // console.log('grid.rowHeaders', grid.rowHeaders);
      }

      grid.formatItem.addHandler(function(s, e) {
        trimSelector(s, e);
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
        parentRow = 0,
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
        } else if (row.hasChildren != true && row._data.orgCd == _item.orgCd) {
          console.log('row.hasChildren', row);
        }
      });

      if (findIdx) {
        return false;
      }

      if (!grid.rows[ht.row].dataItem.children) {
        if (grid.rows[ht.row].dataItem.nodeType == 'org') {
          grid.rows[ht.row].dataItem.children = [];
          grid.rows[ht.row].dataItem.children.splice(0, 0, _item);
        } else {
          grid.rows[parentRow].dataItem.children.splice(0, 0, _item);
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

        if (s == originalGrid && s.rows[s.hitTest(e).row].dataItem.nodeType != state.drag.nodeType) {
          removeImage();
          return;
        }

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
    };
  },
};
</script>
<style lang="scss" scoped></style>
