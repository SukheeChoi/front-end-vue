<template>
  <div class="main-container pd-10">
    <!-- header -->
    <header class="headline-wrap">
      <h1 class="h1">표준단어</h1>
      <div>
        <button class="ow-btn type-state" @click="wPopup.show(true)">
          금칙어
        </button>
        <button class="ow-btn type-reference" @click="wPopup2.show(true)">
          조회
        </button>
      </div>
    </header>
    <!-- //header -->

    <!-- search -->
    <div class="search-zone">
      <div class="row">
        <div class="col-3">
          <label class="t">표준단어유형</label>
          <div class="ow-select" style="width: var(--input-w-150)">
            <select>
              <option value="">수식어</option>
              <option value="">도메인</option>
            </select>
          </div>
        </div>
        <div class="col-4">
          <label class="t">검색 키워드</label>
          <div class="ow-select mr-5" style="width: var(--input-w-150)">
            <select>
              <option value="1">표준단어명</option>
              <option value="2">표준약어</option>
              <option value="3">영문명</option>
            </select>
          </div>
          <div class="ow-input" style="width: var(--input-w-200)">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
    <!-- //search -->

    <!-- control button -->
    <header class="flex-container">
      <h2 class="h2"></h2>
      <div class="control-btn align-right mt-20">
        <button class="ow-btn type-state"><span>엑셀다운로드</span></button>
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
        :selectionMode="'ListBox'"
        :itemsSource="result"
      >
        <wj-flex-grid-column :header="'번호'" :width="70">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            {{ cell.row.index + 1 }}
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column
          :header="'표준단어명'"
          :binding="'1'"
          :width="250"
        />
        <wj-flex-grid-column :header="'표준약어'" :binding="'2'" width="*" />
        <wj-flex-grid-column :header="'영문명'" :binding="'3'" :width="250" />
        <wj-flex-grid-column
          :header="'표준단어유형'"
          :binding="'4'"
          :width="100"
        />
        <wj-flex-grid-column
          :header="'최종수정자'"
          :binding="'5'"
          :width="150"
        />
        <wj-flex-grid-column
          :header="'최종수정일시'"
          :binding="'6'"
          :width="150"
        />
      </wj-flex-grid>
    </div>
    <!--// grid -->

    <!-- pagination -->
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
    </div>
    <!-- //pagination -->

    <!-- header2 -->
    <header class="headline-wrap">
      <h3 class="h3">연관금칙어</h3>
    </header>
    <!-- //header2 -->

    <!-- grid2 -->
    <div class="ow-grid">
      <wj-flex-grid
        headersVisibility="Column"
        :selectionMode="'ListBox'"
        :isReadOnly="true"
        :itemsSource="result2"
      >
        <wj-flex-grid-column :header="'번호'" :width="70">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            {{ cell.row.index + 1 }}
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column :header="'금칙어명'" :binding="'1'" width="*" />
        <wj-flex-grid-column
          :header="'최종수정자'"
          :binding="'2'"
          :width="250"
        />
        <wj-flex-grid-column
          :header="'최종수정일시'"
          :binding="'3'"
          :width="250"
        />
      </wj-flex-grid>
    </div>
    <!--// grid2 -->
  </div>

  <!-- wj-popup xl -->
  <wj-popup
    id="wPopup"
    class="modal-xl"
    :isDraggable="false"
    :initialized="initForm"
  >
    <header class="modal-header">
      <h5 class="modal-title">금칙어</h5>
      <button type="button" aria-label="Close" class="close wj-hide">×</button>
    </header>
    <div class="modal-body ow-scroll-wrap" style="height: 640px">
      <div class="layer-body">
        <!-- search -->
        <div class="search-zone">
          <div class="row">
            <div class="col-4">
              <label class="t">검색 키워드</label>
              <div class="ow-select mr-5" style="width: var(--input-w-150)">
                <select>
                  <option value="1">금칙어</option>
                  <option value="2">표준단어명</option>
                  <option value="3">표준약어</option>
                </select>
              </div>
              <div class="ow-input" style="width: var(--input-w-200)">
                <input type="text" />
              </div>
            </div>
            <div class="col">
              <div class="d-flex ml-auto">
                <button class="ow-btn type-util">조회</button>
              </div>
            </div>
          </div>
        </div>
        <!-- //search -->
        <!-- control button -->
        <header class="flex-container">
          <h2 class="h2"></h2>
          <div class="control-btn align-right mt-20">
            <button class="ow-btn type-state"><span>엑셀다운로드</span></button>
            <button class="ow-btn type-state"><span>저장</span></button>
            <button class="ow-btn type-state"><span>+</span></button>
            <button class="ow-btn type-state"><span>-</span></button>
            <button class="ow-btn type-state"><span>⌒</span></button>
          </div>
        </header>
        <!-- //control button -->
        <!-- grid -->
        <div class="ow-grid mt-10">
          <wj-flex-grid
            headersVisibility="Column"
            :selectionMode="'ListBox'"
            :itemsSource="result_popup"
          >
            <wj-flex-grid-column
              :header="'checkboxColumn'"
              :binding="'checkboxColumn'"
              :width="50"
              :isReadOnly="true"
            >
              <wj-flex-grid-cell-template cellType="ColumnHeader">
                <input type="checkbox" v-model="highlightDownloads" />
              </wj-flex-grid-cell-template>
              <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                <input
                  v-model="cell.row.isCollapsed"
                  type="checkbox"
                  checked="false"
                />
              </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'금칙어'"
              :binding="'1'"
              :width="150"
            />
            <wj-flex-grid-column
              :header="'표준단어명'"
              :binding="'2'"
              :width="150"
            />
            <wj-flex-grid-column
              :header="'표준약어'"
              :binding="'3'"
              width="*"
            />
            <wj-flex-grid-column
              :header="'최종수정자'"
              :binding="'4'"
              :width="150"
            />
            <wj-flex-grid-column
              :header="'최종수정일시'"
              :binding="'5'"
              :width="200"
            />
          </wj-flex-grid>
        </div>
        <!--// grid -->
      </div>
      <div class="layer-foot">
        <div class="actions">
          <button class="ow-btn type-base color-gray wj-hide">취소</button>
          <button class="ow-btn type-base color-dark wj-hide">확인</button>
        </div>
      </div>
    </div>
  </wj-popup>
  <!-- //wj-popup xl -->

  <!-- wj-popup xl -->
  <wj-popup
    id="wPopup2"
    class="modal-xl"
    :isDraggable="false"
    :initialized="initForm"
  >
    <header class="modal-header">
      <h5 class="modal-title">표준단어 검색</h5>
      <button type="button" aria-label="Close" class="close wj-hide">×</button>
    </header>
    <div class="modal-body ow-scroll-wrap" style="height: 640px">
      <div class="layer-body">
        <!-- search -->
        <div class="search-zone">
          <div class="row">
            <div class="col-4">
              <label class="t">표준단어유형</label>
              <div class="ow-select" style="width: var(--input-w-150)">
                <select>
                  <option value="">수식어</option>
                  <option value="">도메인</option>
                </select>
              </div>
            </div>
            <div class="col-4">
              <label class="t">검색 키워드</label>
              <div class="ow-select mr-5" style="width: var(--input-w-150)">
                <select>
                  <option value="1">표준단어명</option>
                  <option value="2">표준약어</option>
                  <option value="3">영문명</option>
                </select>
              </div>
              <div class="ow-input" style="width: var(--input-w-200)">
                <input type="text" />
              </div>
            </div>
            <div class="col">
              <div class="d-flex ml-auto">
                <button class="ow-btn type-reference">선택</button>
                <button class="ow-btn type-util">조회</button>
              </div>
            </div>
          </div>
        </div>
        <!-- //search -->

        <!-- grid -->
        <div class="ow-grid mt-10">
          <wj-flex-grid
            :selectionMode="'ListBox'"
            :itemsSource="result_popup2"
            :isReadOnly="true"
            headersVisibility="Column"
          >
            <ow-check-column v-model="getValues"> </ow-check-column>
            <wj-flex-grid-column
              :header="'표준단어명'"
              :binding="'1'"
              :width="150"
            />
            <wj-flex-grid-column
              :header="'표준약어'"
              :binding="'2'"
              :width="150"
            />
            <wj-flex-grid-column :header="'영문명'" :binding="'3'" width="*" />
            <wj-flex-grid-column
              :header="'표준단어유형'"
              :binding="'4'"
              :width="150"
            />
            <wj-flex-grid-column
              :header="'최종수정자'"
              :binding="'5'"
              :width="100"
            />
            <wj-flex-grid-column
              :header="'최종수정일시'"
              :binding="'6'"
              :width="200"
            />
          </wj-flex-grid>
        </div>
        <!--// grid -->
      </div>
      <div class="layer-foot">
        <div class="actions">
          <button class="ow-btn type-base color-gray wj-hide">취소</button>
          <button class="ow-btn type-base color-dark wj-hide">확인</button>
        </div>
      </div>
    </div>
  </wj-popup>
  <!-- //wj-popup xl -->
</template>

<script>
import OwCheckColumn from '../components/wijmo/grid/OwCheckColumn.vue';

export default {
  name: 'Menu1_1',
  components: {
    OwCheckColumn,
  },

  data: function () {
    return {
      result: [
        {
          1: '소득발생',
          2: 'ICOC',
          3: 'Income Occurrence',
          4: '수식어',
          5: '이강훈',
          6: '2021-12-10 11:17',
        },
        {
          1: '수령인',
          2: 'RECV',
          3: 'Receiver',
          4: '수식어',
          5: '이강훈',
          6: '2021-12-09 09:10',
        },
        {
          1: '일일이제',
          2: 'DATF',
          3: 'Daily Transfer To Account',
          4: '수식어',
          5: '이강훈',
          6: '2021-12-01 12:17',
        },
        {
          1: '가전제품',
          2: 'HMAP',
          3: 'Home Applications',
          4: '수식어',
          5: '이강훈',
          6: '2021-12-05 13:20',
        },
        {
          1: '직원',
          2: 'EMPL',
          3: 'Employee',
          4: '수식어',
          5: '이강훈',
          6: '2021-12-10 11:17',
        },
      ],
      result2: [{ 1: '소득발총', 2: '이강훈', 3: '2021-10-18 09:31' }],
      result_popup: [
        {
          checkboxColumn: '',
          1: 'CUSTOMER',
          2: '고객',
          3: 'CUST',
          4: '이강훈',
          5: '2020-12-31 10:00',
        },
        {
          checkboxColumn: '',
          1: 'EMAIL',
          2: '이메일',
          3: 'EML',
          4: '이강훈',
          5: '2020-12-31 10:00',
        },
      ],
      result_popup2: [
        {
          1: '소득발생',
          2: 'ICOC',
          3: 'Income Occurrence',
          4: '수식어',
          5: '이강훈',
          6: '2021-12-10 11:17',
        },
        {
          1: '수령인',
          2: 'RECV',
          3: 'Receiver',
          4: '수식어',
          5: '이강훈',
          6: '2021-12-09 09:10',
        },
        {
          1: '일일이제',
          2: 'DATF',
          3: 'Daily Transfer To Account',
          4: '수식어',
          5: '이강훈',
          6: '2021-12-01 12:17',
        },
        {
          1: '가전제품',
          2: 'HMAP',
          3: 'Home Applications',
          4: '수식어',
          5: '이강훈',
          6: '2021-12-05 13:20',
        },
      ],
      getValues: [],
    };
  },
  methods: {
    initForm(popup) {
      this[popup.hostElement.id] = popup;
    },
  },
};
</script>
