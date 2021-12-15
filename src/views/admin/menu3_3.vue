<template>
    <div class="main-container pd-10">
    <!-- header -->
    <header class="flex-container">
        <h1 class="h1">표준용어</h1>
        <div>
            <button class="btn btn-active">조회</button>
        </div>
    </header>
    <!-- //header -->
    <!-- search -->
    <ul class="search-zone">
        <li>
            <label class="t">검색키워드</label>
            <div class="ow-select">
                <select class="w-100">
                    <option value="">용어명</option>
                    <option value="">물리명</option>
                    <option value="">도메인</option>
                    <option value="">공통코드그룹</option>
                </select>
            </div>
            <div class="ow-input">
                <input type="text" class="w-200" />
            </div>
        </li>
    </ul>
    <!-- //search -->
    <!-- control button -->
    <header class="flex-container">
        <h2 class="h2"></h2>
        <div class="control-btn align-right mt-20">
            <button class="ow-btn type-state"><span>엑셀다운로드</span></button>
            <button class="ow-btn type-state"><span>물리명수동생성</span></button>
            <button class="ow-btn type-state"><span>물리명자동생성</span></button>
            <button class="ow-btn type-state"><span>저장</span></button>
            <button class="ow-btn type-state"><span>추가</span></button>
            <button class="ow-btn type-state"><span>삭제</span></button>
            <button class="ow-btn type-state"><span>초기화</span></button>
        </div>
    </header>
    <!-- //control button -->

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
            <wj-flex-grid-column :header="'용어명'" :binding="'1'" :width="250" />
            <wj-flex-grid-column :header="'물리명'" :binding="'2'" width="*" />
            <wj-flex-grid-column :header="'도메인'" :binding="'3'" width="*" />
            <wj-flex-grid-column :header="'데이터타입'" :binding="'4'" width="*" />
            <wj-flex-grid-column :header="'공통코드그룹'" :binding="'5'" width="*" />
            <wj-flex-grid-column :header="'최종수정자'" :binding="'6'" :width="150" />
            <wj-flex-grid-column :header="'최종수정일시'" :binding="'7'" :width="200" />
        </wj-flex-grid>
    </div>
    <!--// grid -->

    </div>
</template>

<script>
export default {
  name: 'Menu1_1', 
  components: {
  },
  
  data: function(){
    return {
      result: [
        { "1":"원장구분코드", "2":"LEDG_CLCD", "3":"구분코드CH1", "4":"CHAR(1)", "5":"원장구분코드", "6":"이강훈", "7":"2021-12-10 11:17"},
        { "1":"고객구분", "2":"CUST_TPCD", "3":"구분코드CH1", "4":"CHAR(1)", "5":"원장구분코드", "6":"김성태", "7":"2021-12-10 15:08"},
        { "1":"사용여부", "2":"USE_YN", "3":"구분코드CH1", "4":"CHAR(1)", "5":"사용여부", "6":"정재원", "7":"2021-12-05 09:33"},
        { "1":"회사구분코드", "2":"ORG_CD", "3":"구분코드CH3", "4":"CHAR(3)", "5":"회사구분코드", "6":"이명규", "7":"2021-12-09 09:09"}
      ],
      result2: [
        { "1":"소득발총", "2":"이강훈", "3":"2021-10-18 09:31"}
      ],
    }
  },
  methods: {
        initForm(popup){
            this[popup.hostElement.id] = popup;
        },
    },
};
</script>

