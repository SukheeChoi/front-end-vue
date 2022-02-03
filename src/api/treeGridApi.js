import _ from 'lodash';
import restApi from '@/api/restApi.js';
import utils from '@/utils/commUtils.js';
import ValidatorTypes from '@/utils/commVTypes.js';
import { CollectionView, hasClass, addClass, removeClass } from "@grapecity/wijmo";
import * as gridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjGrid from '@grapecity/wijmo.grid';
import { Selector } from '@grapecity/wijmo.grid.selector';
import "@grapecity/wijmo.styles/wijmo.css";
import * as wijmo from "@grapecity/wijmo";

export class TreeGridApi extends CollectionView {
    _id = '';
    _uri = '';
    _qry = {};
    _opt = {};
    _model = '';
    _values = [];
    _orgValues = [];
    _newValues = [];
    _vm = null;
    _gridView = null;
    _storeChain = [];
    _selector = null;
    _orgGrid = null;
    _dragOpt = {};

    constructor(uri, model, id = '', opt) {
        super([], { trackChanges: true });
        this._id = id;
        this._uri = uri;
        this._model = model;
        this._newValues = utils.copyDefaultValues(model);
        this._dragOpt = opt;
    }

    addQueryChain(stores) {
        this._storeChain = stores;
    }

    init(vm, grid, qry = null, opt = null, autoLoading = true) {
        this._vm = vm;
        this._gridView = grid;

        grid.cellEditEnding.addHandler(this.valid);
        this.addSelector(grid);
        this.formatItem(grid);

        if (qry == null) {
            qry = this._vm.qry;
        }

        if (opt == null) {
            opt = this._vm.opt;
        }

        this._qry = qry;
        this._opt = opt;

        if (autoLoading) {
            this.getList();
        }
    }

    undo() {
        this.clearChanges();
        this.sourceCollection = _.cloneDeep(this._orgValues);
    }

    mergePagingParams(pageNo = -1, pageSize = -1) {
        let opt = {};

        if (pageNo > 0) {
            this._opt.pageNo = pageNo;
        }

        if (pageSize > 0) {
            this._opt.pageSize = pageSize;
        }

        if (this._opt.pageNo && this._opt.pageSize) {
            opt = {
                pageNo: this._opt.pageNo,
                pageSize: this._opt.pageSize,
            };
        }

        return opt;
    }

    async getList(pageNo = -1, pageSize = -1, qry = null) {
        let opt = this.mergePagingParams(pageNo, pageSize);

        if (qry != null) {
            this._qry = Object.assign(this._qry, qry);
        }

        let resData = await restApi.getList(this._uri, Object.assign(this._qry, opt), this._id);

        if (resData.data.code == 'OK') {
            this._orgValues = _.cloneDeep(resData.data.data);
            this.sourceCollection = resData.data.data;
            this._opt.totalCount = resData.data.totalCount;
            this._gridView.select(-1, -1);

            if (this._storeChain.length > 0) {
                var dataItem = null;

                if (this.sourceCollection.length > 0) {
                    dataItem = this.sourceCollection[0];
                }

                chainQuery(dataItem);
            }
        } else {
            await this._vm.alert(resData.data.message);
        }
    }

    chainQuery(dataItem) {
        let qryData = utils.copyKeyValues(dataItem, this._model);

        for (var store of this._storeChain) {
            if (qryData == null) {
                store.sourceCollection = [];
            } else {
                store.getList(1, qryData);
            }
        }
    }

    add() {
        let addData = _.cloneDeep(this._newValues);

        if (this._gridView.newRowAtTop) {
            this.sourceCollection.splice(0, 0, addData);
        } else {
            this.sourceCollection.push(addData);
        }

        this.itemsAdded.push(addData);
        this.refresh();
    }

    async del() {
        this._values = this._gridView.selectedItems;
        if (this._values.length == 0) {
            this._vm.alert('삭제할 자료를 선택하세요.');
            return;
        }

        const ok = await this._vm.confirm('선택하신 자료를 삭제하시겠습니까?');

        if (!ok) {
            return;
        }

        let delList = [];

        for (let value of this._values) {
            if (value.rowStatus != 'C') {
                delList.push(value);
            }
        }

        if (delList.length > 0) {
            this.refreshQuery(await restApi.removeList(this._uri, delList, this._id));
        } else {
            for (let value of this._values) {
                if (value.rowStatus == 'C') {
                    this.remove(value);
                }
            }
        }
    }

    async save() {
        if (this.itemsAdded.length + this.itemsEdited.length == 0) {
            this._vm.alert('신규로 추가된 자료나 수정된 자료가 없습니다.');
            return;
        }

        const ok = await this._vm.confirm('수정 혹은 추가된 자료를 저장하시겠습니까?');
        if (!ok) {
            return;
        }

        let saveList = [];

        if (this.itemsAdded.length > 0) {
            for (let i = 0; i < this.itemsAdded.length; i++) {
                saveList.push(this.itemsAdded.at(i));
            }
        }

        if (this.itemsEdited.length > 0) {
            for (let i = 0; i < this.itemsEdited.length; i++) {
                saveList.push(this.itemsEdited.at(i));
            }
        }

        if (this.itemsRemoved.length > 0) {
            for (let i = 0; i < this.itemsRemoved.length; i++) {
                saveList.push(this.itemsRemoved.at(i));
            }
        }

        this.refreshQuery(await restApi.save(this._uri, saveList, this._id));
    }

    clear() {
        const newItem = new this.constructor(this._uri, this._model, this._id);
        newItem.init(this._vm, this._gridView);
    }

    async refreshQuery(resData) {
        if (resData.data) {
            if (resData.data.code == 'OK') {
                await this.getList();
            } else {
                await this._vm.alert(resData.data.message);
            }
        }
    }

    static markRecordStatus(grid, e) {
        const oldVal = grid.getCellData(e.row, e.col, true),
            newVal = grid.activeEditor.value;

        if (grid.getCellData(e.row, 'rowStatus') == 'C') {
            return;
        }

        if (oldVal == newVal) {
            return;
        }

        grid.setCellData(e.row, 'rowStatus', 'U');
    }

    async excel() {
        const today = new Date();
        let filename = today.toString();

        if (this._opt.filename) {
            filename = this._opt.filename;
        }

        gridXlsx.FlexGridXlsxConverter.saveAsync(this._gridView, {}, filename + '.xlsx');
    }

    valid(grid, e) {
        let col = grid.columns[e.col];
        let fields = grid.itemsSource._model.fields;
        let index = fields.findIndex((field) => field.id === col.binding);
        let field = fields[index];

        if (field.vType) {
            let result = ValidatorTypes[field.vType + 'Validator'](grid.activeEditor.value, field);

            if (!result.isValid) {
                e.cancel = true;
                e.stayInEditMode = true;

                let edtHandler = grid._edtHdl;
                let rng = edtHandler._rng;
                let cell = grid.cells.getCellElement(rng.row, rng.col);

                if (cell) {
                    edtHandler._setCellError(cell, result.message);
                }

                return;
            }
        }

        TreeGridApi.markRecordStatus(grid, e);
    }

    static alignHeader(e) {
        if (hasClass(e.cell, "wj-header")) {
            addClass(e.cell, "wj-align-center");
        }
    }

    formatItem(grid) {
        if (grid.allowDragging != 0) { //None
            grid.rowHeaders.columns[0].binding = 'drag';
            grid.rowHeaders.columns[0].header = ' ';
            grid.rowHeaders.columns.push(new wjcGrid.Column({ binding: 'rowStatus', header: ' ', align: 'center' }));
            grid.hostElement.style.width = getComputedStyle(grid.hostElement).getPropertyValue('width');
        }

        grid.formatItem.addHandler(function(s, e) {
            let col = e.panel.columns[e.col],
                row = e.panel.rows[e.row],
                binding = grid.columns[e.col].binding,
                colHeader = grid.rowHeaders.columns[e.col],
                dragId = s.itemsSource._dragOpt.id;

            TreeGridApi.alignHeader(e);

            if (row.dataItem) {
                if (col.name == 'chk' && row.dataItem.type == dragId) {
                    // remove buttons from first column
                    e.cell.innerHTML = e.cell.textContent.trim();
                }
                e.cell.style.paddingLeft = null;
            }

            if (e.panel.cellType == wjGrid.CellType.RowHeader) {
                if (colHeader.binding == 'rowStatus') {
                    e.cell.innerHTML = '';
                    let html =
                        '' +
                        '<button class="ow-btn type-icon">' +
                        '<span class="' +
                        (row.dataItem.rowStatus == 'U' ?
                            'wj-glyph-pencil' :
                            row.dataItem.rowStatus == 'C' ?
                            'wj-glyph-asterisk' :
                            '') +
                        '">' +
                        '</span>' +
                        '</button>' +
                        '';
                    e.cell.innerHTML = html;
                }
                if (colHeader.binding == 'drag') {
                    e.cell.innerHTML = '';
                    // add buttons
                    let html =
                        '' +
                        '<button class="wj-btn wj-btn-glyph">' +
                        '<span class="' +
                        'wj-glyph-drag' +
                        '">' +
                        '</span>' +
                        '</button>' +
                        '';
                    e.cell.innerHTML = html;
                }
            }

            // 조직도 icon 추가
            if (binding == 'orgNm') {
                let padding = row.level * 13;
                if (!row.hasChildren) {
                    padding += 20;
                } else {
                    // has child node, add collapse/expand buttons
                    // clear content
                    e.cell.innerHTML = '';
                    // add buttons
                    let html =
                        '' +
                        '<button class="wj-btn wj-btn-glyph wj-elem-collapse" tabindex="-1" aria-label="Toggle Group">' +
                        '<span class="' +
                        (row.isCollapsed ? 'wj-glyph-right' : 'wj-glyph-down-right') +
                        '">' +
                        '</span>' +
                        '</button>' +
                        '' +
                        row.dataItem.orgNm +
                        '' +
                        '<button class="ow-btn type-icon">' +
                        '<i class="' +
                        (row.dataItem.type == dragId ? 'ow-icon organization' : '') +
                        '">' +
                        '</i>' +
                        '</button>' +
                        '';
                    e.cell.innerHTML = html;
                }
                e.cell.style.paddingLeft = padding + 'px';
            }
        });

        grid.selectionMode = "Row";
    }

    addSelector(grid) {
        let chkIdx;
        grid.columns.forEach((col) => {
            if (col.name == 'chk') {
                chkIdx = col.index;
            }
        });
        this._selector = new Selector(grid.columns[chkIdx], {});
    }

    /* Drag Event Start */
    // create  marker for target FlexGrid
    _createImage() {
        if (typeof this.div === 'undefined') {
            this.div = document.createElement('div');
            this.div.classList.add('wj-dragover');
            this.div.setAttribute('droppable', true);

            this.div.style.position = 'absolute';
            this.div.style.height = '1px';
            this.div.style.backgroundColor = 'rgba(0,0,0,1)';
            this.div.style.zIndex = 999;

            document.body.appendChild(this.div);
        }
    }

    _removeImage() {
        if (this.div) {
            this.div.style.display = 'none'
        }
    }

    // get selected item with childrens and row range
    _getDataHierarchy(grid, rowIndex) {
        this.row1 = rowIndex;
        this.row2 = rowIndex;
        let _lvl = grid.rows[rowIndex].level;
        if (grid.rows[rowIndex].hasChildren) {
            for (let i = rowIndex + 1; i < grid.rows.length - 1; i++) {
                if (grid.rows[i].level == _lvl) {
                    break;
                }
                this.row2++;
            }
        }
    }

    _makeDragSource(s) {
        // make rows draggable
        s.itemFormatter = (panel, r, c, cell) => {
            let row = panel.rows[r];

            if (panel.cellType == wjGrid.CellType.RowHeader) {
                cell.draggable = true;
            }
        };
        // disable built-in row drag/drop
        s.addEventListener(
                s.hostElement,
                "mousedown",
                (e) => {
                    if (s.hitTest(e).cellType == wjGrid.CellType.RowHeader) {
                        e.stopPropagation();
                    }
                },
                true
            )
            // handle drag start
        s.addEventListener(
            s.hostElement,
            "dragstart",
            (e) => {
                this._createImage();
                let ht = s.hitTest(e);
                if (ht.cellType == wjGrid.CellType.RowHeader) {
                    s.select(new wjGrid.CellRange(ht.row, 0, ht.row, s.columns.length - 1));
                    this._orgGrid = s; // drag가 시작된 그리드
                    e.dataTransfer.effectAllowed = "copy";
                    this._getDataHierarchy(s, ht.row.toString());

                    e.dataTransfer.setData('text', this.row2);
                }
            },
            true
        );
    }

    // enable drop operations on an element
    _makeDropTarget(s) {
        s.hostElement.addEventListener("dragover", (e) => {
            let ht = s.hitTest(e);
            let dragRow = e.dataTransfer.getData("text");
            if (!ht || ht.panel == null) {
                return;
            }
            // prevent Dragging for Selected items Children and the Cell panel
            if (
                (ht.row >= this.row1 && ht.row < this.row2) ||
                ht.panel.cellType != wjGrid.CellType.RowHeader
            ) {
                this._removeImage();
                return;
            }
            if (dragRow != null) {
                this.div.style.display = 'inline-block';
                e.dataTransfer.dropEffect = "copy";
                e.preventDefault();

                let _rect = s.rowHeaders.getCellBoundingRect(ht.row + 1, 0);
                this.div.style.width = s.hostElement.clientWidth + 'px';
                this.div.style.top = _rect.top + window.pageYOffset + 'px';
                this.div.style.left = _rect.left + window.pageXOffset + 'px';
            }
        });

        s.hostElement.addEventListener("drop", (e) => {
            let item = this._orgGrid.rows[parseInt(e.dataTransfer.getData("text"))].dataItem; //drag data

            if (s.hostElement.id == this._orgGrid.hostElement.id && s.rows[s.hitTest(e).row].dataItem.type != s.hostElement.id) {
                this._removeImage();
                return;
            }

            if (s.hostElement.id != this._orgGrid.hostElement.id) {
                this._addItem(s, e);
            } else {
                if (this._addItem(s, e)) {
                    utils.removeBizGrpItem(s.collectionView.sourceCollection[0], item, this._dragOpt.itemKey); //delete item
                    this.itemsRemoved.push(item);
                }
            }

            this._removeImage();

            s.collectionView.refresh();
            e.preventDefault();
        });
    }

    _addItem(grid, target) {
            let ht = grid.hitTest(target),
                dragRow = target.dataTransfer.getData("text"),
                item = this._orgGrid.rows[parseInt(dragRow)].dataItem;

            if (!dragRow || ht.row == dragRow) {
                return false;
            }

            if (!grid.rows[ht.row].dataItem.children) {
                grid.rows[ht.row].dataItem.children = [];
            }

            let _item = _.cloneDeep(item);
            _item.orgCd = grid.rows[ht.row].dataItem.orgCd;
            _item.rowStatus = 'C';

            grid.rows[ht.row].dataItem.children.splice(0, 0, _item); //추가
            grid.itemsSource.itemsAdded.push(_item);

            return true;
        }
        /* Drag Event End */
}