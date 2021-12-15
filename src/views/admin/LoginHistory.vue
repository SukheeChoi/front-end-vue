<template>
  <div class="main-container pd-10">
    <!-- header -->
    <header class="flex-container">
      <h1 class="h1">사용자로그인 이력</h1>
      <div>
        <button class="btn btn-active" @click="toggleMenu31_P2">조회</button>
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
                <wj-flex-grid-column :header="'로그인일자'" :binding="'field02'"/>
                <wj-flex-grid-column :header="'로그인 사용자 수'" :binding="'field03'"/>
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
                    <wj-flex-grid-column :header="'로그인일자'" :binding="'field02'"/>
                    <wj-flex-grid-column :header="'로그인ID'" :binding="'field03'"/>
                    <wj-flex-grid-column :header="'사용자명'" :binding="'field04'"/>
                    <wj-flex-grid-column :header="'로그인수'" :binding="'field05'"/>
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
                    <wj-flex-grid-column :header="'로그인일자'" :binding="'field02'"/>
                    <wj-flex-grid-column :header="'로그인ID'" :binding="'field03'"/>
                    <wj-flex-grid-column :header="'사용자명'" :binding="'field04'"/>
                    <wj-flex-grid-column :header="'시스템유형'" :binding="'field05'"/>
                    <wj-flex-grid-column :header="'IP주소'" :binding="'field06'"/>
                    <wj-flex-grid-column :header="'로그인일시'" :binding="'field07'"/>
                    <wj-flex-grid-column :header="'로그아웃일시'" :binding="'field08'"/>
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
      currentTab: 0,
      tabs: ['사용자로그인 이력', '화면접속 이력', '엑셀다운로드 이력'],
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
        { title: "로그인일자", field: "field02", width: "*", cell: 'cell02' },
        { title: "로그인 사용자 수", field: "field03", width: "*", cell: 'cell03' },
      ],
      columns2: [
        { title: "번호", field: 'field01', width: "70px",  cell: 'cell01' },
        { title: "로그인일자", field: "field02", width: "120px", cell: 'cell02' },
        { title: "로그인ID", field: "field03", width: "180px", cell: 'cell03' },
        { title: "사용자명", field: "field04", width: "*", cell: 'cell04' },
        { title: "로그인수", field: "field05", width: "90px", cell: 'cell05' },
      ],
      columns3: [
        { title: "번호", field: 'field01', width: "70px",  cell: 'cell01' },
        { title: "로그인일자", field: "field02", width: "120px", cell: 'cell02' },
        { title: "로그인ID", field: "field03", width: "180px", cell: 'cell03' },
        { title: "사용자명", field: "field04", width: "*", cell: 'cell04' },
        { title: "시스템유형", field: "field05", width: "90px", cell: 'cell05' },
        { title: "IP주소", field: "field06", width: "120px", cell: 'cell06' },
        { title: "로그인일시", field: "field07", width: "120px", cell: 'cell07' },
        { title: "로그아웃일시", field: "field08", width: "120px", cell: 'cell08' },
      ],
      result: [
        { "field01":"", "field02":"2020-09-13", "field03":"11"},
        { "field01":"", "field02":"2020-09-12", "field03":"25"},
        { "field01":"", "field02":"2020-09-11", "field03":"73"},
        { "field01":"", "field02":"2020-09-10", "field03":"22"},
        { "field01":"", "field02":"2020-09-09", "field03":"33"},
        { "field01":"", "field02":"2020-09-08", "field03":"10"},
        { "field01":"", "field02":"2020-09-07", "field03":"24"},
        { "field01":"", "field02":"2020-09-06", "field03":"76"},
        { "field01":"", "field02":"2020-09-05", "field03":"28"},
        { "field01":"", "field02":"2020-09-04", "field03":"34"},
        { "field01":"", "field02":"2020-09-03", "field03":"7"},
        { "field01":"", "field02":"2020-09-02", "field03":"18"},
        { "field01":"", "field02":"2020-09-01", "field03":"28"},
        { "field01":"", "field02":"2020-08-31", "field03":"73"},
        { "field01":"", "field02":"2020-08-30", "field03":"20"},
        { "field01":"", "field02":"2020-08-29", "field03":"38"},
        { "field01":"", "field02":"2020-08-28", "field03":"19"},
        { "field01":"", "field02":"2020-08-27", "field03":"20"},
        { "field01":"", "field02":"2020-08-26", "field03":"78"},
        { "field01":"", "field02":"2020-08-25", "field03":"27"},
      ],
      result2: [
        { "field01":"", "field02":"2020-09-13", "field03":"25062810", "field04":"정재원","field05":"3"},
        { "field01":"", "field02":"2020-09-13", "field03":"24020306", "field04":"김범조","field05":"2"},
        { "field01":"", "field02":"2020-09-13", "field03":"25062808", "field04":"김성태","field05":"1"},
        { "field01":"", "field02":"2020-09-13", "field03":"24020308", "field04":"김새한","field05":"3"},
        { "field01":"", "field02":"2020-09-13", "field03":"25040111", "field04":"최관식","field05":"1"},
        { "field01":"", "field02":"2020-09-13", "field03":"25042607", "field04":"노대성","field05":"3"},
        { "field01":"", "field02":"2020-09-13", "field03":"24010601", "field04":"박민영","field05":"1"},
      ],
      result3: [
        { "field01":"", "field02":"2020-09-13", "field03":"25062810", "field04":"정재원","field05":"사용자","field06":"10.150.39.101","field07":"2020-09-13 08:36:50", "field08":"2020-09-13 17:36:50"},
        { "field01":"", "field02":"2020-09-13", "field03":"25062810", "field04":"정재원","field05":"사용자","field06":"10.150.39.101","field07":"2020-09-13 10:13:20", "field08":"2020-09-13 18:13:16"},
        { "field01":"", "field02":"2020-09-13", "field03":"25062810", "field04":"정재원","field05":"사용자","field06":"10.150.39.101","field07":"2020-09-13 17:01:10", "field08":"2020-09-13 17:01:59"},
        { "field01":"", "field02":"", "field03":"", "field04":"","field05":"","field06":"","field07":"", "field08":""},
        { "field01":"", "field02":"", "field03":"", "field04":"","field05":"","field06":"","field07":"", "field08":""},
        { "field01":"", "field02":"", "field03":"", "field04":"","field05":"","field06":"","field07":"", "field08":""},
        { "field01":"", "field02":"", "field03":"", "field04":"","field05":"","field06":"","field07":"", "field08":""},
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

