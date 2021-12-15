<template>
  <div class="main-container pd-10">
    <!-- header -->
    <header class="flex-container">
      <h1 class="h1">배치결과</h1>
      <div>
        <button class="btn btn-type1">엑셀다운로드</button>
        <button class="btn btn-active">조회</button>
      </div>
    </header>
    <!-- //header -->
    <ul class="search-zone">
      <li>
        <label class="t">배치작업명</label>
        <input type="text" class="form-style w-217" />
      </li>
      <li>
        <label class="t">대상시스템</label>
        <select class="form-style w-100">
          <option value=""></option>
          <option value=""></option>
        </select>
      </li>
      <li>
        <label class="t">상태</label>
        <select class="form-style w-100">
          <option value=""></option>
          <option value=""></option>
        </select>
      </li>
      <li>
      </li>
      <li>
        <label class="t">실행시작일</label>
        <div class="data-area">
          <form class="k-form" style="border:none !important; margin-bottm:8px" @submit.prevent>
              <fieldset>
                  <label class="k-form-field">
                      <DatePicker :default-value="new Date()" :default-Show="false" :format="'yyyy/MM/dd'"></DatePicker>
                  </label>
                  <label class="k-form-field las">
                    <span class="as-date">~</span>
                      <DatePicker :default-value="new Date()" :default-Show="false" :format="'yyyy/MM/dd'"></DatePicker>
                  </label>
              </fieldset>
            </form>
        </div>
      </li>
      <li>
        <label class="t">실행종료일</label>
        <div class="data-area">
          <form class="k-form" style="border:none !important; margin-bottm:8px" @submit.prevent>
              <fieldset>
                  <label class="k-form-field">
                      <DatePicker :default-value="new Date()" :default-Show="false" :format="'yyyy/MM/dd'"></DatePicker>
                  </label>
                  <label class="k-form-field las">
                    <span class="as-date">~</span>
                      <DatePicker :default-value="new Date()" :default-Show="false" :format="'yyyy/MM/dd'"></DatePicker>
                  </label>
              </fieldset>
            </form>
        </div>
      </li>
    </ul>
    <!-- //search -->
 
    <div class="align-right btn-poz">
      <button class="btn btn-type2">엑셀 Export</button>
    </div>
    <Grid 
      class="oss-table-grid mt-05"
      :style="{ height: '' }"
      :data-items="result"
      :columns="columns"
      :pageable="pageable"
      :scrollable="'none'"
    >
      <template #cellNum1="{props}">
        <td class="customtd">
          {{ props.dataIndex }}
        </td>
      </template>
      <template #cellNum2="{props}">
        <td class="customtd text-left">
          {{ props.dataItem.batchID }}
        </td>
      </template>
      <template #cellNum3="{props}">
        <td class="customtd text-left">
          {{ props.dataItem.bathchWork }}
        </td>
      </template>
      <template #cellNum4="{props}">
        <td class="customtd">
          {{ props.dataItem.sys }}
        </td>
      </template>
      <template #cellNum5="{props}">
        <td class="customtd">
          {{ props.dataItem.status }}
        </td>
      </template>
      <template #cellNum6="{props}">
        <td class="customtd text-left">
          {{ props.dataItem.result }}
        </td>
      </template>
      <template #cellNum7="{props}">
        <td class="customtd">
          {{ props.dataItem.timeStart }}
        </td>
      </template>
      <template #cellNum8="{props}">
        <td class="customtd">
          {{ props.dataItem.timeEnd }}
        </td>
      </template>
      <template #cellNum9="{props}">
        <td class="customtd text-left">
          {{ props.dataItem.disc }}
        </td>
      </template>
      <template #cellNum10="{props}">
        <td class="customtd">
          {{ props.dataItem.charge }}
        </td>
      </template>
      <template #cellNum11="{props}">
        <td class="customtd">
          {{ props.dataItem.date }}
        </td>
      </template>
    </Grid>

  </div>
</template>

<script>
// import "@grapecity/wijmo.styles/wijmo.css";
// import "@grapecity/wijmo.vue2.grid";

// import KendoDialog from "@/components/common/KendoDialog.vue";
// import KendoGridLoading from "@/components/common/KendoGridLoading.vue";

export default {
  name: 'menu1_2', 
  components: {
    // KendoDialog,
    // KendoGridLoading
  },
  data: function(){
    return {
      visibleMenu1_1: false,
      visibleMenu31_P2: false,
      pageable: true,
      columns: [
        { title: "번호",     field: '', width: "70px",  cell: 'cellNum1' },
        { title: "배치결과ID",field: "batchID", width: "150px", cell: 'cellNum2' },
        { title: "배치작업명", field: "bathchWork", width: "*", cell: 'cellNum3' },
        { title: "대상시스템", field: "sys", width: "100px", cell: 'cellNum4' },
        { title: "상태", field: "status", width: "100px", cell: 'cellNum5' },
        { title: "실행결과", field: "result", width: "250px", cell: 'cellNum6' },
        { title: "실행시작일시", field: "timeStart", width: "150px", cell: 'cellNum7' },
        { title: "실행종료일시", field: "timeEnd", width: "150px", cell: 'cellNum8' },
        { title: "조치내용", field: "disc", width: "250px", cell: 'cellNum9' },
        { title: "조치자", field: "charge", width: "100px", cell: 'cellNum10' },
        { title: "조치일시", field: "date", width: "150px", cell: 'cellNum11' },
      ],
      result: [
        { "":"", "batchID":"BTR202007000171", "bathchWork": "SAP ITEM Master 수집",  "sys":"SAP", "status":"실행", "result":"총 100건 중 100건 수행", "timeStart":"2021-09-02 12:00", "timeEnd":"2021-09-03 13:00", "disc":"프로그램 수정 및 재실행", "charge":"정재원", "date":"2021-09-14 14:20"},
        { "":"", "batchID":"BTR202007000172", "bathchWork": "ECRM 영업활동 발송안내",  "sys":"ECRM", "status":"성공", "result":"총 100건 중 100건 수행", "timeStart":"2021-09-02 12:00", "timeEnd":"2021-09-03 13:00", "disc":"프로그램 수정 및 재실행", "charge":"정재원", "date":"2021-09-14 14:20"},
        { "":"", "batchID":"BTR202007000173", "bathchWork": "SAP ITEM Master 수집",  "sys":"SAP", "status":"성공", "result":"총 100건 중 100건 수행", "timeStart":"2021-09-02 12:00", "timeEnd":"2021-09-03 13:00", "disc":"프로그램 수정 및 재실행", "charge":"정재원", "date":"2021-09-14 14:20"},
        { "":"", "batchID":"BTR202007000174", "bathchWork": "SAP ITEM Master 수집",  "sys":"SAP", "status":"실패", "result":"오류발생", "timeStart":"2021-09-02 12:00", "timeEnd":"2021-09-03 13:00", "disc":"프로그램 수정 및 재실행", "charge":"정재원", "date":"2021-09-14 14:20"},
        { "":"", "batchID":"BTR202007000175", "bathchWork": "SAP ITEM Master 수집",  "sys":"SAP", "status":"성공", "result":"총 100건 중 100건 수행", "timeStart":"2021-09-02 12:00", "timeEnd":"2021-09-03 13:00", "disc":"프로그램 수정 및 재실행", "charge":"정재원", "date":"2021-09-14 14:20"},
        { "":"", "batchID":"BTR202007000176", "bathchWork": "SAP ITEM Master 수집",  "sys":"SAP", "status":"성공", "result":"총 100건 중 100건 수행", "timeStart":"2021-09-02 12:00", "timeEnd":"2021-09-03 13:00", "disc":"프로그램 수정 및 재실행", "charge":"정재원", "date":"2021-09-14 14:20"},
        { "":"", "batchID":"BTR202007000177", "bathchWork": "SAP ITEM Master 수집",  "sys":"SAP", "status":"성공", "result":"총 100건 중 100건 수행", "timeStart":"2021-09-02 12:00", "timeEnd":"2021-09-03 13:00", "disc":"프로그램 수정 및 재실행", "charge":"정재원", "date":"2021-09-14 14:20"},
        { "":"", "batchID":"BTR202007000178", "bathchWork": "SAP ITEM Master 수집",  "sys":"SAP", "status":"성공", "result":"총 100건 중 100건 수행", "timeStart":"2021-09-02 12:00", "timeEnd":"2021-09-03 13:00", "disc":"프로그램 수정 및 재실행", "charge":"정재원", "date":"2021-09-14 14:20"},
      ],
    }
  },
  created() {
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

  }
};
</script>
