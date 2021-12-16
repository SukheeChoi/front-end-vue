<template>
  <!-- header -->
  <header class="headline-wrap">
    <h1 class="h1">시스템설정</h1>
    <div>
      <button class="ow-btn type-state">캐시 초기화</button>
      <button class="ow-btn type-state">저장</button>
    </div>
  </header>
  <!-- //header -->

  <!-- sub title -->
  <div class="flex-container mt-20">
    <h2 class="h2">기본통화</h2>
  </div>
  <!-- //sub title -->
  <!-- search -->
  <div class="search-zone">
    <div class="row">
      <div class="col-3">
        <label class="t">기본통화</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">KRW(Won)</option>
            <option value=""></option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <!-- //search -->

  <!-- sub title -->
  <div class="flex-container mt-20">
    <h2 class="h2">날짜포맷</h2>
  </div>
  <!-- //sub title -->
  <!-- search -->
  <div class="search-zone">
    <div class="row">
      <div class="col-3">
        <label class="t">날짜포맷</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">yyyy-MM-dd</option>
            <option value=""></option>
          </select>
        </div>
      </div>
      <div class="col-3">
        <label class="t">년월포맷</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">yyyy-MM</option>
            <option value=""></option>
          </select>
        </div>
      </div>
      <div class="col-3">
        <label class="t">시간포맷</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">HH:mm:ss</option>
            <option value=""></option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <!-- //search -->

  <!-- sub title -->
  <div class="flex-container mt-20">
    <h2 class="h2">기본언어</h2>
  </div>
  <!-- //sub title -->
  <!-- search -->
  <div class="search-zone">
    <div class="row">
      <div class="col-3">
        <label class="t">지원언어</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">ko,en</option>
            <option value=""></option>
          </select>
        </div>
      </div>
      <div class="col-3">
        <label class="t">기본언어</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">ko</option>
            <option value=""></option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <!-- //search -->
</template>

<script>
export default {
  name: 'Menu',
  components: {},

  data: function () {
    return {
      visibleMenu54_P1: false,
      pageable: true,
      columns: [
        { title: '', field: '', width: '100px', cell: 'cellNum1' },
        {
          title: '공통코드 그룹ID',
          field: 'field2',
          width: '',
          cell: 'cellNum2',
        },
        {
          title: '공통코드 그룹명',
          field: 'field3',
          width: '',
          cell: 'cellNum3',
        },
        {
          title: '시스템코드여부',
          field: 'field4',
          width: '*',
          cell: 'cellNum4',
        },
        {
          title: '사용여부',
          field: 'field5',
          width: '',
          cell: 'cellNum5',
        },
        { title: '비고', field: 'field6', width: '', cell: 'cellNum6' },
        {
          title: '확장컬럼 텍스트',
          field: 'field6',
          width: '',
          cell: 'cellNum7',
        },
      ],
      result: [
        {
          '': '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
          field6: '',
          field7: '',
        },
        {
          '': '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
          field6: '',
          field7: '',
        },
        {
          '': '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
          field6: '',
          field7: '',
        },
        {
          '': '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
          field6: '',
          field7: '',
        },
        {
          '': '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
          field6: '',
          field7: '',
        },
        {
          '': '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
          field6: '',
          field7: '',
        },
      ],
      columns2: [
        { title: '', field: '', width: '100px', cell: 'cellNum1' },
        {
          title: '공통코드 그룹ID',
          field: 'field2',
          width: '',
          cell: 'cellNum2',
        },
        {
          title: '공통코드 그룹명',
          field: 'field3',
          width: '',
          cell: 'cellNum3',
        },
        {
          title: '공통코드',
          field: 'field4',
          width: '',
          cell: 'cellNum4',
        },
        {
          title: '공통코드명',
          field: 'field5',
          width: '',
          cell: 'cellNum5',
        },
        {
          title: '순서',
          field: 'field6',
          width: '*',
          cell: 'cellNum6',
        },
        {
          title: '사용여부',
          field: 'field7',
          width: '',
          cell: 'cellNum7',
        },
        {
          title: '비고1',
          field: 'field8',
          width: '',
          cell: 'cellNum8',
        },
        {
          title: '비고2',
          field: 'field9',
          width: '',
          cell: 'cellNum9',
        },
        {
          title: '비고3',
          field: 'field10',
          width: '',
          cell: 'cellNum10',
        },
        {
          title: '비고4',
          field: 'field11',
          width: '',
          cell: 'cellNum11',
        },
        {
          title: '비고5',
          field: 'field12',
          width: '',
          cell: 'cellNum12',
        },
        { title: '', field: 'field13', width: '', cell: 'cellNum13' },
      ],
      result2: [
        {
          '': '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
          field6: '',
          field7: '',
          field8: '',
          field9: '',
          field10: '',
          field11: '',
          field12: '',
          field13: '',
        },
        {
          '': '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
          field6: '',
          field7: '',
          field8: '',
          field9: '',
          field10: '',
          field11: '',
          field12: '',
          field13: '',
        },
        {
          '': '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
          field6: '',
          field7: '',
          field8: '',
          field9: '',
          field10: '',
          field11: '',
          field12: '',
          field13: '',
        },
        {
          '': '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
          field6: '',
          field7: '',
          field8: '',
          field9: '',
          field10: '',
          field11: '',
          field12: '',
          field13: '',
        },
        {
          '': '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
          field6: '',
          field7: '',
          field8: '',
          field9: '',
          field10: '',
          field11: '',
          field12: '',
          field13: '',
        },
        {
          '': '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
          field6: '',
          field7: '',
          field8: '',
          field9: '',
          field10: '',
          field11: '',
          field12: '',
          field13: '',
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
    toggleMenu54_P1() {
      this.visibleMenu54_P1 = !this.visibleMenu54_P1;
    },
    onCloseMenu54_P1() {
      this.toggleMenu54_P1();
    },
    onSubmitMenu54_P1() {
      this.toggleMenu54_P1();
    },
  },
};
</script>
