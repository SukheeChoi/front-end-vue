<template>
  <!-- header -->
  <!-- <header class="headline-wrap">
    <h1 class="h1">업무그룹관리</h1>
    <div>
      <button class="ow-btn type-reference">조회</button>
    </div>
  </header> -->
  <!-- //header -->
  <!-- search -->
  <div class="search-zone">
    <div class="row">
      <div class="col-3">
        <label class="t">시스템구분</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">공통(com)</option>
            <option value="">생산물류(log)</option>
          </select>
        </div>
      </div>
      <div class="col-3">
        <label class="t">업무코드</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">공통(com)</option>
            <option value="">생산(pro)</option>
            <option value="">물류(loe)</option>
          </select>
        </div>
      </div>
      <div class="col-3">
        <label class="t">업무그룹명</label>
        <div class="ow-input" style="width: var(--input-w-200)">
          <input type="text" />
        </div>
      </div>
      <div class="col-3">
        <label class="t">사용여부</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">Y</option>
            <option value="">N</option>
          </select>
        </div>
      </div>
      <div>
        <button class="ow-btn type-reference">조회</button>
      </div>
    </div>
  </div>
  <!-- //search -->
  <!-- control button -->
  <div class="ow-flex-wrap mt-20">
    <div class="item align-x-end">
      <button class="ow-btn type-state"><span>추가</span></button>
      <button class="ow-btn type-state"><span>삭제</span></button>
      <button class="ow-btn type-state"><span>저장</span></button>
    </div>
  </div>
  <!-- //control button -->

  <div class="ow-grid mt-10">
    <wj-flex-grid
      :itemsSource="result"
      :isReadOnly="true"
      selectionMode="Row"
      headersVisibility="Column"
    >
      <ow-check-column
        :header="'chk'"
        :width="50"
        :isReadOnly="true"
        @checkedData="checkedData"
      >
      </ow-check-column>
      <wj-flex-grid-column :header="'번호'" :binding="'field1'" :width="70">
        <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
          {{ cell.row.index + 1 }}
        </wj-flex-grid-cell-template>
      </wj-flex-grid-column>
      <wj-flex-grid-column
        :header="'시스템구분'"
        :binding="'field1'"
        width="*"
      />
      <wj-flex-grid-column :header="'업무코드'" :binding="'field2'" width="*" />
      <wj-flex-grid-column
        :header="'업무그룹ID'"
        :binding="'field3'"
        width="*"
      />
      <wj-flex-grid-column
        :header="'업무그룹명'"
        :binding="'field4'"
        width="*"
      />
      <wj-flex-grid-column
        :header="'업무그룹 설명'"
        :binding="'field5'"
        width="*"
      />
      <wj-flex-grid-column :header="'사용'" :binding="'field6'" width="*" />
    </wj-flex-grid>
    <!--pagination-->
    <div class="ow-flex-wrap">
      <div class="item align-x-center">
        <b-pagination
          class="ow-pagination"
          first-class="go-first"
          prev-class="go-prev"
          next-class="go-next"
          last-class="go-last"
          align="center"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          :limit="10"
          aria-controls="my-table"
        ></b-pagination>
      </div>
      <div class="item pos-right">
        <div class="counter-board">전체 <span>999</span> 건</div>
      </div>
    </div>
  </div>

  <!-- chang data -->
  <!-- <div class="col-xs-6">
    <h4>Edited Items:</h4>
    <wj-flex-grid
      class="changed edited"
      :itemsSource="result.itemsEdited"
      :isReadOnly="true"
    >
    </wj-flex-grid>

    <h4>Added Items:</h4>
    <wj-flex-grid
      class="changed added"
      :itemsSource="result.itemsAdded"
      :isReadOnly="true"
    >
    </wj-flex-grid>

    <h4>Removed Items:</h4>
    <wj-flex-grid
      class="changed removed"
      :itemsSource="result.itemsRemoved"
      :isReadOnly="true"
    >
    </wj-flex-grid>
  </div> -->
</template>

<script>
import { CollectionView } from '@grapecity/wijmo';
import axios from 'axios';
import _ from 'lodash';
import OwCheckColumn from '../components/wijmo/grid/OwCheckColumn.vue';

const columns = { field1: '', field2: '', field3: '', field4: '' };

export default {
  name: 'Menu',
  components: { OwCheckColumn },

  data: function () {
    return {
      visibleMenu31_P1: false,
      visibleMenu31_P2: false,
      pageable: true,
      selectedItems: [],
      selector: null,
      useYnList: ['Y', 'N'],
      getValues: [],
      result: new CollectionView(
        [
          {
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            field5: '',
            field6: 'Y',
          },
          {
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            field5: '',
            field6: 'Y',
          },
          {
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            field5: '',
            field6: 'Y',
          },
          {
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            field5: '',
            field6: 'Y',
          },
          {
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            field5: '',
            field6: 'Y',
          },
        ],
        {
          trackChanges: true,
        }
      ),
    };
  },
  created() {},
  mounted() {},
  methods: {
    initGrid(view) {
      this.view = view;
    },
    getSearch() {
      axios
        .get(``)
        .then()
        .then((result) => {
          //callback
          result;
          this.result.push(result.data);
        });
    },
    addRow() {
      let addData = _.cloneDeep(columns);
      this.result.addNew(addData);
      this.result.commitNew();
      // console.log('view', view.itemsSource.items[0]);
    },
    delRow() {
      for (let i = 0; i < this.getValues.length; i++) {
        this.result.remove(this.getValues[i]);
      }
    },
    checkedData(checkedValues) {
      this.getValues = [...checkedValues];
    },
  },
};
</script>
