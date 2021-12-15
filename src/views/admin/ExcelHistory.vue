<template>
  <div class="main-container">
    <!-- header -->
    <header class="flex-container">
      <h1 class="h1">엑셀다운로드 이력</h1>
      <div>
        <button class="btn btn-active">조회</button>
      </div>
    </header>
    <!-- //header -->
    <!-- search -->
    <ul class="search-zone">
      <li>
        <label class="t">시스템유형</label>
        <select class="form-style w-200">
          <option value="" disabled selected>시스템유형</option>
        </select>
      </li>
      <li>
        <div class="data-area">
          <label class="t">일자</label>
          <form class="k-form" @submit.prevent>
            <fieldset>
              <label class="k-form-field">
                <!-- <DatePicker :default-value="new Date()" :default-Show="false" :format="'yyyy-MM-dd'"></DatePicker> -->
                <wj-input-date id="theInputDateTime" :value="date" :initialized="initDateTime">
                </wj-input-date>
              </label>
              <label class="k-form-field las">
                <span class="as-date">~</span>
                <!-- <DatePicker :default-value="new Date()" :default-Show="false" :format="'yyyy-MM-dd'"></DatePicker> -->
                <wj-input-date id="theInputDateTime" :value="date" :initialized="initDateTime">
                </wj-input-date>
              </label>
            </fieldset>
          </form>
        </div>
      </li>
      <li>
        <label class="t">화면ID</label>
        <input type="text" class="form-style w-200" />
      </li>
      <li>
        <label class="t">화면명</label>
        <input type="text" class="form-style w-200" />
      </li>
      <li>
        <label class="t">사번</label>
        <input type="text" class="form-style w-200" />
      </li>
      <li>
        <label class="t">사용자명</label>
        <input type="text" class="form-style w-217" />
      </li>
    </ul>
    <!-- //search -->

    <!-- grid -->
    <div class="ow-grid">
        <wj-flex-grid
            headersVisibility="Column"
            selectionMode="0"
            :itemsSource="result" 
        >
            <wj-flex-grid-column :header="'번호'" :width="70">
            <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                {{cell.row.index + 1}}
            </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
            <wj-flex-grid-column :header="'화면ID'" :binding="'field02'" :width="150" />
            <wj-flex-grid-column :header="'화면명'" :binding="'field03'" :width="450" />
            <wj-flex-grid-column :header="'시스템유형'" :binding="'field04'" :width="100" />
            <wj-flex-grid-column :header="'파일명'" :binding="'field05'" width="*" />
            <wj-flex-grid-column :header="'다운로드 수'" :binding="'field06'" :width="100" />
        </wj-flex-grid>
    </div>
    <!--// grid -->
    <!-- control button -->
    <header class="flex-container">
        <h2 class="h2">사용자별 상세이력</h2>
        <div class="control-btn align-right mt-20">
            <button class="btn btn-type5"><span>엑셀다운로드</span></button>
        </div>
    </header>
    <!-- //control button -->

    <!-- grid -->
    <div class="ow-grid">
        <wj-flex-grid
            headersVisibility="Column"
            selectionMode="0"
            :itemsSource="result1" 
        >
            <wj-flex-grid-column :header="'번호'" :width="70">
            <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                {{cell.row.index + 1}}
            </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
            <wj-flex-grid-column :header="'화면ID'" :binding="'field02'" :width="250" />
            <wj-flex-grid-column :header="'화면명'" :binding="'field03'" width="*" />
            <wj-flex-grid-column :header="'시스템유형'" :binding="'field04'" :width="150" />
            <wj-flex-grid-column :header="'파일명'" :binding="'field05'" :width="200" />
            <wj-flex-grid-column :header="'사번'" :binding="'field06'" :width="150" />
            <wj-flex-grid-column :header="'사용자명'" :binding="'field07'" :width="150" />
            <wj-flex-grid-column :header="'IP주소'" :binding="'field08'" :width="200" />
            <wj-flex-grid-column :header="'다운로드 일시'" :binding="'field09'" :width="250" />
        </wj-flex-grid>
    </div>
    <!--// grid -->



  </div>
</template>

<script>

export default {
  name: 'Menu', 
  components: {

  },
  
  data: function(){
    return {
      visibleMenu31_P1: false,
      visibleMenu31_P2: false,
      pageable: true,
      // Search
      searchForm: {
        searchType: 'invoiceNumber',
        searchWord: '',
        startDate: new Date(),
        endDate: new Date(),
      },
      columns: [
        { title: "번호", field: 'field01', width: "70px",  cell: 'cell01' },
        { title: "화면ID", field: "field02", width: "180px", cell: 'cell02' },
        { title: "화면명", field: "field03", width: "*", cell: 'cell03' },
        { title: "시스템유형", field: "field04", width: "150px", cell: 'cell04' },
        { title: "파일명", field: "field05", width: "*", cell: 'cell05' },
        { title: "다운로드 수", field: "field06", width: "90px", cell: 'cell06' },
      ],
      columns1: [
        { title: "번호", field: 'field01', width: "70px",  cell: 'cell01' },
        { title: "화면ID", field: "field02", width: "120px", cell: 'cell02' },
        { title: "화면명", field: "field03", width: "*", cell: 'cell03' },
        { title: "시스템유형", field: "field04", width: "120px", cell: 'cell04' },
        { title: "파일명", field: "field05", width: "180px", cell: 'cell05' },
        { title: "사번", field: "field06", width: "90px", cell: 'cell06' },
        { title: "사용자명", field: "field07", width: "90px", cell: 'cell07' },
        { title: "IP주소", field: "field08", width: "120px", cell: 'cell08' },
        { title: "다운로드 일시", field: "field09", width: "180px", cell: 'cell09' },
      ],
      result: [
        { "field01":"", "field02":"VIEW-W-00005", "field03":"사용자관리>사용자목록", "field04":"관리자", "field05":"user-excel-dn.xlsx", "field06":"3"},
        { "field01":"", "field02":"VIEW-S-00001", "field03":"권한관리>권한목록", "field04":"관리자", "field05":"auth-edcel-dn.xlsx", "field06":"12"},
        { "field01":"", "field02":"VIEW-U-00001", "field03":"대시보드>영업보고서", "field04":"사용자", "field05":"dash-excel-dn.xlsx", "field06":"315"},
        { "field01":"", "field02":"VIEW-U-00002", "field03":"영업관리>영업목록", "field04":"사용자", "field05":"sales-excel-dn.xlsx", "field06":"80"},
        { "field01":"", "field02":"VIEW-U-00003", "field03":"재고관리>재고목록", "field04":"사용자", "field05":"stock-excel-dn.xlsx", "field06":"27"},
        { "field01":"", "field02":"VIEW-C-00001", "field03":"공통코드>코드관리", "field04":"관리자", "field05":"comcode-excel-dn.xlsx", "field06":"4"},
        { "field01":"", "field02":"VIEW-W-00008", "field03":"배치관리>배치결과", "field04":"사용자", "field05":"batch-excel-dn.xlsx", "field06":"5"},
        // { "field01":"", "field02":"", "field03":"", "field04":"", "field05":"", "field06":""},
      ],
      result1: [
        { "field01":"", "field02":"VIEW-W-00005", "field03":"사용자관리>사용자목록", "field04":"관리자", "field05":"user-excel-dn.xlsx", "field06":"25062810", "field07":"정재원", "field08":"10.230.3.51", "field09":"2020-09-11 10:56"},
        { "field01":"", "field02":"VIEW-W-00005", "field03":"사용자관리>사용자목록", "field04":"관리자", "field05":"user-excel-dn.xlsx", "field06":"24020306", "field07":"김범조", "field08":"10.230.7.39", "field09":"2020-04-01 17:40"},
        { "field01":"", "field02":"VIEW-W-00005", "field03":"사용자관리>사용자목록", "field04":"관리자", "field05":"user-excel-dn.xlsx", "field06":"25062808", "field07":"김성태", "field08":"10.230.3.220", "field09":"2020-09-10 17:35"},
        // { "field01":"", "field02":"V-S-00001", "field03":"사용자관리>사용자목록", "field04":"관리자", "field05":"user-excel-dn.xlsx", "field06":"24020308", "field07":"김새한", "field08":"10.230.7.42", "field09":"2020-09-10 10:11"},
        // { "field01":"", "field02":"V-S-00001", "field03":"사용자관리>사용자목록", "field04":"관리자", "field05":"user-excel-dn.xlsx", "field06":"25062810", "field07":"최관식", "field08":"10.230.7.43", "field09":"2020-08-01 16:01"},
        // { "field01":"", "field02":"V-S-00001", "field03":"사용자관리>사용자목록", "field04":"관리자", "field05":"user-excel-dn.xlsx", "field06":"25062810", "field07":"노대성", "field08":"10.230.3.12", "field09":"2020-08-01 13:22"},
        // { "field01":"", "field02":"V-S-00001", "field03":"사용자관리>사용자목록", "field04":"관리자", "field05":"user-excel-dn.xlsx", "field06":"25062810", "field07":"박민영", "field08":"10.230.3.51", "field09":"2020-08-11 14:50"},
      ],
      result_p1: [
        { "forbidden":"CUSTOMER", "wordname":"고객", "word":"CUST", "writer":"이민호", "date":"2021-09-01 11:00" },
        { "forbidden":"EMAIL", "wordname":"이메일", "word":"EML", "writer":"최상민", "date":"2021-08-30 01:01" },
        { "forbidden":"", "wordname":"", "word":"", "writer":"", "date":"" },
        { "forbidden":"", "wordname":"", "word":"", "writer":"", "date":"" },
        { "forbidden":"", "wordname":"", "word":"", "writer":"", "date":"" },
        { "forbidden":"", "wordname":"", "word":"", "writer":"", "date":"" },
        { "forbidden":"", "wordname":"", "word":"", "writer":"", "date":"" },
        { "forbidden":"", "wordname":"", "word":"", "writer":"", "date":"" },
        { "forbidden":"", "wordname":"", "word":"", "writer":"", "date":"" },
        { "forbidden":"", "wordname":"", "word":"", "writer":"", "date":"" },
      ],
      result_p2: [
        { "wordname":"소독발생", "word":"ICOC", "eng":"Income Occurrence", "wordtype":"수식어", "writer":"김영세", "date":"2021-09-08 11:29" },
        { "wordname":"수령인", "word":"RECV", "eng":"Receiver", "wordtype":"수식어", "writer":"이희웅", "date":"2021-09-02 09:00" },
        { "wordname":"일일이제", "word":"DATF", "eng":"Daily Transfer To Account", "wordtype":"수식어", "writer":"김민제", "date":"2021-09-01 01:20" },
        { "wordname":"가전제품", "word":"HMAP", "eng":"Home Applications", "wordtype":"수식어", "writer":"이영호", "date":"2021-08-31 20:00" },
        { "wordname":"직원", "word":"EMPL", "eng":"Employee", "wordtype":"수식어", "writer":"이해란", "date":"2021-08-28 10:10" },
        { "wordname":"명세표", "word":"DTSH", "eng":"Details Sheet", "wordtype":"수식어", "writer":"정해인", "date":"2021-08-12 10:19" },
        { "wordname":"", "word":"", "eng":" ", "wordtype":"", "writer":"", "date":"" },
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
    toggleMenu31_P2() {
      this.visibleMenu31_P2 = !this.visibleMenu31_P2;
    }, 
    onCloseMenu31_P2() {
      this.toggleMenu31_P2();
    }, 
    onSubmitMenu31_P2() {
      this.toggleMenu31_P2();
    },
  }
};
</script>

