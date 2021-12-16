<template>
  <!-- header -->
  <header class="headline-wrap">
    <h1 class="h1">통화코드</h1>
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
      <wj-flex-grid-column :header="'통화코드'" :binding="'field2'" :width="200" />

      <wj-flex-grid-column :header="'통화기호'" :binding="'field3'" :width="'*'" />
      <wj-flex-grid-column :header="'통화명'" :binding="'field4'" :width="'*'" />
      <wj-flex-grid-column :header="'통화기호위치'" :binding="'field5'" :width="200" />
      <wj-flex-grid-column :header="'통화단위금액'" :binding="'field6'" :width="'*'" />
      <wj-flex-grid-column :header="'소수점 자리수'" :binding="'field7'" :width="'*'" />
      <wj-flex-grid-column :header="'통화단위기호'" :binding="'field8'" :width="'*'" />
      <wj-flex-grid-column :header="'소수점 기호'" :binding="'field9'" :width="'*'" />
      <wj-flex-grid-column :header="'환율관리여부'" :binding="'field10'" :width="'*'" />
    </wj-flex-grid>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  components: {},

  data: function () {
    return {
      visibleMenu31_P1: false,
      visibleMenu31_P2: false,
      pageable: true,
      columns: [
        { title: '번호', field: '', width: '70px', cell: 'cellNum1' },
        {
          title: '통화코드',
          field: 'field2',
          width: '200px',
          cell: 'cellNum2',
        },
        {
          title: '통화기호',
          field: 'field3',
          width: '150px',
          cell: 'cellNum3',
        },
        {
          title: '통화명',
          field: 'field4',
          width: '*',
          cell: 'cellNum4',
        },
        {
          title: '통화기호위치',
          field: 'field4',
          width: '150px',
          cell: 'cellNum5',
        },
        {
          title: '통화단위금액',
          field: 'field4',
          width: '150px',
          cell: 'cellNum6',
        },
        {
          title: '소수점 자리수',
          field: 'field4',
          width: '150px',
          cell: 'cellNum7',
        },
        {
          title: '통화단위기호',
          field: 'field4',
          width: '150px',
          cell: 'cellNum8',
        },
        {
          title: '소수점 기호',
          field: 'field4',
          width: '150px',
          cell: 'cellNum9',
        },
        {
          title: '환율관리여부',
          field: 'field4',
          width: '150px',
          cell: 'cellNum10',
        },
      ],
      result: [
        {
          '': '',
          field2: 'KRW',
          field3: '₩',
          field4: '원',
          field5: '앞',
          field6: '1000',
          field7: '0',
          field8: ',',
          field9: '.',
          field10: 'N',
        },
        {
          '': '',
          field2: 'USD',
          field3: '$',
          field4: 'US 달러',
          field5: '앞',
          field6: '',
          field7: '0',
          field8: ',',
          field9: '.',
          field10: 'Y',
        },
        {
          '': '',
          field2: 'EUR',
          field3: '€',
          field4: '유로',
          field5: '앞',
          field6: '',
          field7: '0',
          field8: ',',
          field9: '.',
          field10: 'Y',
        },
        {
          '': '',
          field2: 'JPY',
          field3: '¥',
          field4: '옌',
          field5: '앞',
          field6: '',
          field7: '0',
          field8: ',',
          field9: '.',
          field10: 'Y',
        },
        {
          '': '',
          field2: 'CNY',
          field3: '¥',
          field4: '위안',
          field5: '앞',
          field6: '',
          field7: '0',
          field8: ',',
          field9: '.',
          field10: 'Y',
        },
      ],
    };
  },
  created() {
    // this.result = this.createRandomData(7);
    // this.result2 = this.createRandomData(7);
    // this.result_p1 = this.createRandomData(10);
    // this.result_p2 = this.createRandomData(10);
  },
  mounted() {},
  methods: {
    createRandomData(count) {
      return Array(count)
        .fill({})
        .map((_, idx) => ({
          no: idx + 1,
        }));
    },
  },
};
</script>
