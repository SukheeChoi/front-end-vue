<template>
  <div class="main-container">
    <!-- header -->
    <header class="headline-wrap">
      <h1 class="h1">화면접속 이력</h1>
      <div>
        <button class="ow-btn type-reference">조회</button>
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
          <label class="t">상차일</label>
          <form class="k-form ml-10" @submit.prevent>
            <fieldset>
              <label class="k-form-field">
                <!-- <DatePicker :default-value="new Date()" :default-Show="false" :format="'yyyy-MM-dd'"></DatePicker> -->
              </label>
              <label class="k-form-field las">
                <span class="as-date">~</span>
                <!-- <DatePicker :default-value="new Date()" :default-Show="false" :format="'yyyy-MM-dd'"></DatePicker> -->
              </label>
            </fieldset>
          </form>
        </div>
      </li>
    </ul>
    <!-- //search -->
    
    <div class="d-flex mt-10">
      <div class="col-4">
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
                <wj-flex-grid-column :header="'화면ID'" :binding="'field02'"/>
                <wj-flex-grid-column :header="'화면명'" :binding="'field03'"/>
                <wj-flex-grid-column :header="'시스템유형'" :binding="'field04'"/>
                <wj-flex-grid-column :header="'접속수'" :binding="'field05'"/>
            </wj-flex-grid>
        </div>
      </div>
      <div class="col-8 ml-10 mt-15">
        <h2 class="h2">일자별 상세 이력</h2>
          <div class="ow-grid">
                <wj-flex-grid
                    headersVisibility="Column"
                    selectionMode="0"
                    :itemsSource="result2" 
                >
                    <wj-flex-grid-column :header="'번호'" :width="70">
                    <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                        {{cell.row.index + 1}}
                    </wj-flex-grid-cell-template>

                    </wj-flex-grid-column>
                    <wj-flex-grid-column :header="'접속일자'" :binding="'field02'"/>
                    <wj-flex-grid-column :header="'화면ID'" :binding="'field03'"/>
                    <wj-flex-grid-column :header="'화면명'" :binding="'field04'"/>
                    <wj-flex-grid-column :header="'시스템유형'" :binding="'field05'"/>
                    <wj-flex-grid-column :header="'접속수'" :binding="'field06'"/>
                </wj-flex-grid>
          </div>
        <!-- <div class="title-area mt-25"> -->
          <h2 class="h2">사용자별 상세 이력</h2>
          <button class="btn btn-type5"><span>엑셀다운로드</span></button>
          <div class="ow-grid">
                <wj-flex-grid
                    headersVisibility="Column"
                    selectionMode="0"
                    :itemsSource="result3" 
                >
                    <wj-flex-grid-column :header="'번호'" :width="70">
                    <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                        {{cell.row.index + 1}}
                    </wj-flex-grid-cell-template>

                    </wj-flex-grid-column>
                    <wj-flex-grid-column :header="'접속일자'" :binding="'field02'"/>
                    <wj-flex-grid-column :header="'화면ID'" :binding="'field03'"/>
                    <wj-flex-grid-column :header="'화면명'" :binding="'field04'"/>
                    <wj-flex-grid-column :header="'시스템유형'" :binding="'field05'"/>
                    <wj-flex-grid-column :header="'로그인ID'" :binding="'field06'"/>
                    <wj-flex-grid-column :header="'사용자명'" :binding="'field07'"/>
                    <wj-flex-grid-column :header="'IP주소'" :binding="'field08'"/>
                    <wj-flex-grid-column :header="'접속일시'" :binding="'field09'"/>
                </wj-flex-grid>
          </div>
        <!-- </div> -->

        
      </div>
    </div>

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
        { title: "화면ID", field: "field02", width: "*", cell: 'cell02' },
        { title: "화면명", field: "field03", width: "*", cell: 'cell03' },
        { title: "시스템유형", field: "field04", width: "90px", cell: 'cell04' },
        { title: "접속수", field: "field05", width: "90px", cell: 'cell05' },
      ],
      columns2: [
        { title: "번호", field: 'field01', width: "70px",  cell: 'cell01' },
        { title: "접속일자", field: "field02", width: "120px", cell: 'cell02' },
        { title: "화면ID", field: "field03", width: "120px", cell: 'cell03' },
        { title: "화면명", field: "field04", width: "*", cell: 'cell04' },
        { title: "시스템유형", field: "field05", width: "120px", cell: 'cell05' },
        { title: "접속수", field: "field06", width: "90px", cell: 'cell06' },
      ],
      columns3: [
        { title: "번호", field: 'field01', width: "70px",  cell: 'cell01' },
        { title: "접속일자", field: "field02", width: "120px", cell: 'cell02' },
        { title: "화면ID", field: "field03", width: "180px", cell: 'cell03' },
        { title: "화면명", field: "field04", width: "*", cell: 'cell04' },
        { title: "시스템유형", field: "field05", width: "90px", cell: 'cell05' },
        { title: "로그인ID", field: "field06", width: "120px", cell: 'cell06' },
        { title: "사용자명", field: "field07", width: "120px", cell: 'cell07' },
        { title: "IP주소", field: "field08", width: "120px", cell: 'cell08' },
        { title: "접속일시", field: "field09", width: "150px", cell: 'cell09' },
      ],
      result: [
        { "field01":"", "field02":"VIEW-W-00005", "field03":"공통코드", "field04":"관리자", "field05":"21"},
        { "field01":"", "field02":"VIEW-S-00001", "field03":"권한목록", "field04":"관리자", "field05":"12"},
        { "field01":"", "field02":"VIEW-U-00001", "field03":"영업보고서", "field04":"사용자", "field05":"315"},
        { "field01":"", "field02":"VIEW-U-00002", "field03":"영업목록", "field04":"사용자", "field05":"80"},
        { "field01":"", "field02":"VIEW-U-00003", "field03":"재고목록", "field04":"사용자", "field05":"27"},
        { "field01":"", "field02":"VIEW-C-00001", "field03":"공통코드관리", "field04":"관리자", "field05":"4"},
        { "field01":"", "field02":"VIEW-W-00008", "field03":"배치결과", "field04":"관리자", "field05":"5"},
        { "field01":"", "field02":"VIEW-W-00007", "field03":"배치작업관리", "field04":"관리자", "field05":"2"},
        { "field01":"", "field02":"VIEW-W-00014", "field03":"사용자관리", "field04":"관리자", "field05":"8"},
        { "field01":"", "field02":"VIEW-W-00035", "field03":"사용자로그인이력", "field04":"관리자", "field05":"15"},
        { "field01":"", "field02":"VIEW-W-00013", "field03":"역할관리", "field04":"사용자", "field05":"2"},
        { "field01":"", "field02":"VIEW-W-00012", "field03":"역할권한관리", "field04":"사용자", "field05":"5"},
        { "field01":"", "field02":"", "field03":"", "field04":"", "field05":""},
        { "field01":"", "field02":"", "field03":"", "field04":"", "field05":""},
        { "field01":"", "field02":"", "field03":"", "field04":"", "field05":""},
        { "field01":"", "field02":"", "field03":"", "field04":"", "field05":""},
        { "field01":"", "field02":"", "field03":"", "field04":"", "field05":""},
        { "field01":"", "field02":"", "field03":"", "field04":"", "field05":""},
        { "field01":"", "field02":"", "field03":"", "field04":"", "field05":""},
        { "field01":"", "field02":"", "field03":"", "field04":"", "field05":""},
      ],
      result2: [
        { "field01":"", "field02":"2020-09-13", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자","field06":"7"},
        { "field01":"", "field02":"2020-09-14", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자","field06":"3", "field07":""},
        { "field01":"", "field02":"2020-09-15", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자","field06":"1", "field07":""},
        { "field01":"", "field02":"2020-09-16", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자","field06":"5", "field07":""},
        { "field01":"", "field02":"2020-09-17", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자","field06":"2", "field07":""},
        { "field01":"", "field02":"2020-09-18", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자","field06":"1", "field07":""},
        { "field01":"", "field02":"2020-09-19", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자","field06":"2", "field07":""},
      ],
      result3: [
        { "field01":"", "field02":"2020-09-13", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자", "field06":"25062810","field07":"정재원","field08":"10.150.39.101", "field09":"2020-09-13 08:36:50"},
        { "field01":"", "field02":"2020-09-13", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자", "field06":"24020306","field07":"김범조","field08":"10.230.7.39", "field09":"2020-09-13 10:13:20"},
        { "field01":"", "field02":"2020-09-13", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자", "field06":"25062808","field07":"김성태","field08":"10.230.3.220", "field09":"2020-09-13 17:01:52"},
        { "field01":"", "field02":"2020-09-13", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자", "field06":"24020308","field07":"김새한","field08":"10.230.7.42", "field09":"2020-09-13 08:05:13"},
        { "field01":"", "field02":"2020-09-13", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자", "field06":"25040111","field07":"최관식","field08":"10.230.7.43", "field09":"2020-09-13 09:42:47"},
        { "field01":"", "field02":"2020-09-13", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자", "field06":"25042607","field07":"노대성","field08":"10.230.3.12", "field09":"2020-09-13 08:54:59"},
        { "field01":"", "field02":"2020-09-13", "field03":"VIEW-W-00005", "field04":"공통코드","field05":"관리자", "field06":"24010601","field07":"박민영","field08":"10.150.39.103", "field09":"2020-09-13 13:10:33"},
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

