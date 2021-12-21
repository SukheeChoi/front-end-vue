<template>
  <!-- header -->
  <header class="headline-wrap">
    <h1 class="h1">언어코드</h1>
    <div>
      <button @click="insData()" class="ow-btn type-state"><span>저장</span></button>
      <button @click="addRow()" class="ow-btn type-state"><span>+</span></button>
      <button @click="delRow()" class="ow-btn type-state"><span>-</span></button>
      <button class="ow-btn type-state"><span>⌒</span></button>
    </div>
  </header>
  <!-- //header -->

  <div class="ow-grid mt-10">
    <!-- :newRowAtTop="true" -->
    <!-- :allowAddNew="true" -->
    <wj-flex-grid :selectionMode="'Row'" :itemsSource="result" :allowDelete="true" :initialized="initGrid">
      <ow-check-column :header="'chk'" :width="50" :isReadOnly="true" @checkedData="checkedData"> </ow-check-column>

      <!-- 넘버링 -->
      <wj-flex-grid-column :header="'번호'" :width="70" :isReadOnly="true">
        <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
          {{ cell.row.index + 1 }}
        </wj-flex-grid-cell-template>
      </wj-flex-grid-column>

      <!-- select 삽입 -->
      <wj-flex-grid-column :header="'언어코드'" :binding="'field2'" :width="200" />
      <wj-flex-grid-column :header="'언어명'" :binding="'field3'" :width="'*'" />
      <wj-flex-grid-column :header="'사용여부'" :binding="'field4'" :width="200" :dataMap="useYnList" />
    </wj-flex-grid>
  </div>

  <!-- <div class="col-xs-6">
    <h4>Edited Items:</h4>
    <wj-flex-grid class="changed edited" :itemsSource="result.itemsEdited" :isReadOnly="true"> </wj-flex-grid>

    <h4>Added Items:</h4>
    <wj-flex-grid class="changed added" :itemsSource="result.itemsAdded" :isReadOnly="true"> </wj-flex-grid>

    <h4>Removed Items:</h4>
    <wj-flex-grid class="changed removed" :itemsSource="result.itemsRemoved" :isReadOnly="true"> </wj-flex-grid>
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
      pageable: true,
      useYnList: ['Y', 'N'],
      selectedItems: [],
      selector: null,
      result: new CollectionView(
        [
          { field1: '', field2: 'ko', field3: 'korean', field4: 'Y' },
          { field1: '', field2: 'en', field3: 'english', field4: 'Y' },
          { field1: '', field2: 'ch', field3: 'chinese', field4: 'Y' },
          { field1: '', field2: 'jp', field3: 'japanese', field4: 'Y' },
          { field1: '', field2: 'sp', field3: 'spanish', field4: 'N' },
        ],
        {
          trackChanges: true,
        }
      ),
      getValues: [],
    };
  },
  created() {},
  mounted() {},
  methods: {
    initGrid(view) {
      this.view = view;
      // let view = this.result.CollectionView;
      // console.log(view);
      // view.remove(view.currentItem);
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
