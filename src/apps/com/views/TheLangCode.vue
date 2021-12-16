<template>
  <!-- header -->
  <header class="headline-wrap">
    <h1 class="h1">언어코드</h1>
    <div>
      <button class="ow-btn type-state"><span>저장</span></button>
      <button class="ow-btn type-state"><span>+</span></button>
      <button class="ow-btn type-state"><span>-</span></button>
      <button class="ow-btn type-state"><span>⌒</span></button>
    </div>
  </header>
  <!-- //header -->

  <div class="ow-grid mt-10">
    <wj-flex-grid headersVisibility="Column" :selectionMode="'ListBox'" :itemsSource="result">
      <wj-flex-grid-column :header="'checkboxColumn'" :binding="'checkboxColumn'" :width="50" :isReadOnly="true">
        <wj-flex-grid-cell-template cellType="ColumnHeader">
          <input type="checkbox" v-model="highlightDownloads" />
        </wj-flex-grid-cell-template>
        <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
          <input v-model="cell.row.isCollapsed" type="checkbox" checked="false" />
        </wj-flex-grid-cell-template>
      </wj-flex-grid-column>
      <!-- 넘버링 -->
      <wj-flex-grid-column :header="'번호'" :width="70">
        <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
          {{ cell.row.index + 1 }}
        </wj-flex-grid-cell-template>
      </wj-flex-grid-column>

      <!-- select 삽입 -->
      <wj-flex-grid-column :header="'언어코드'" :binding="'field2'" :width="200" />

      <wj-flex-grid-column :header="'언어명'" :binding="'field3'" :width="'*'" />
      <wj-flex-grid-column :header="'사용여부'" :binding="'field4'" :width="200" />
    </wj-flex-grid>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  components: {},

  data: function () {
    return {
      pageable: true,

      result: [
        { field1: '', field2: 'ko', field3: 'korean', field4: 'Y' },
        { field1: '', field2: 'en', field3: 'english', field4: 'Y' },
        { field1: '', field2: 'ch', field3: 'chinese', field4: 'Y' },
        { field1: '', field2: 'jp', field3: 'japanese', field4: 'Y' },
        { field1: '', field2: 'sp', field3: 'spanish', field4: 'Y' },
      ],
      // useyn: [{ Y }, { N }],
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
