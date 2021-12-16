<template>
  <!-- header -->
  <header class="headline-wrap">
    <h1 class="h1">공통코드</h1>
    <div>
      <button class="ow-btn type-reference">조회</button>
    </div>
  </header>
  <!-- //header -->
  <!-- search -->
  <div class="search-zone">
    <div class="row">
      <div class="col-3">
        <label class="t">공통코드그룹ID</label>
        <div class="ow-input" style="width: var(--input-w-200)">
          <input type="text" />
        </div>
      </div>
      <div class="col-3">
        <label class="t">공통코드그룹명</label>
        <div class="ow-input" style="width: var(--input-w-200)">
          <input type="text" />
        </div>
      </div>
      <div class="col-3">
        <label class="t">업무그룹명</label>
        <div class="ow-input" style="width: var(--input-w-200)">
          <input type="text" />
        </div>
      </div>
      <div class="col-3">
        <label class="t">사용여부</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">Y</option>
            <option value="">N</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <!-- //search -->
  <!-- control button -->
  <div class="ow-flex-wrap mt-20">
    <h2 class="h2">공통코드그룹</h2>
    <div class="item align-x-end">
      <button class="ow-btn type-state"><span>저장</span></button>
      <button class="ow-btn type-state"><span>+</span></button>
      <button class="ow-btn type-state"><span>-</span></button>
      <button class="ow-btn type-state"><span>⌒</span></button>
    </div>
  </div>
  <!-- //control button -->

  <div class="ow-grid mt-10">
    <wj-flex-grid :itemsSource="result" :isReadOnly="true" :selectionMode="'ListBox'" headersVisibility="Column">
      <wj-flex-grid-column :header="'checkboxColumn'" :binding="'checkboxColumn'" :width="50" :isReadOnly="true">
        <wj-flex-grid-cell-template cellType="ColumnHeader">
          <input type="checkbox" v-model="highlightDownloads" />
        </wj-flex-grid-cell-template>
        <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
          <input v-model="cell.row.isCollapsed" type="checkbox" checked="false" />
        </wj-flex-grid-cell-template>
      </wj-flex-grid-column>
      <wj-flex-grid-column :header="'언어설정'" :binding="'field2'" width="*">
        <div class="d-flex-c-c">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <button class="ow-btn type-util" @click="wPopup.show(true)">언어설정</button>
          </wj-flex-grid-cell-template>
        </div>
      </wj-flex-grid-column>
      <wj-flex-grid-column :header="'공통코드그룹ID'" :binding="'field3'" width="*" />
      <wj-flex-grid-column :header="'공통코드그룹명'" :binding="'field4'" width="*" />
      <wj-flex-grid-column :header="'사용여부'" :binding="'field5'" width="*" />
      <wj-flex-grid-column :header="'비고'" :binding="'field6'" width="*" />
      <wj-flex-grid-column :header="'확장컬럼 텍스트'" :binding="'field7'" width="*" />
    </wj-flex-grid>
    <div class="ow-flex-wrap">
      <div class="item">
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
      <div class="item size-fix">
        <div class="counter-board">전체 <span>999</span> 건</div>
      </div>
    </div>
  </div>

  <!-- control button -->
  <div class="ow-flex-wrap mt-20">
    <h2 class="h2">공통코드</h2>
    <div class="item align-x-end">
      <button class="ow-btn type-state"><span>저장</span></button>
      <button class="ow-btn type-state"><span>+</span></button>
      <button class="ow-btn type-state"><span>-</span></button>
      <button class="ow-btn type-state"><span>⌒</span></button>
    </div>
  </div>
  <!-- //control button -->

  <div class="ow-grid mt-10">
    <wj-flex-grid :itemsSource="result2" :isReadOnly="true" :selectionMode="'ListBox'" headersVisibility="Column">
      <wj-flex-grid-column :header="'checkboxColumn'" :binding="'checkboxColumn'" :width="50" :isReadOnly="true">
        <wj-flex-grid-cell-template cellType="ColumnHeader">
          <input type="checkbox" v-model="highlightDownloads" />
        </wj-flex-grid-cell-template>
        <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
          <input v-model="cell.row.isCollapsed" type="checkbox" checked="false" />
        </wj-flex-grid-cell-template>
      </wj-flex-grid-column>
      <wj-flex-grid-column :header="' '" :binding="'field2'" :width="100">
        <div class="d-flex-c-c">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <button class="ow-btn type-util" @click="wPopup2.show(true)">언어설정</button>
          </wj-flex-grid-cell-template>
        </div>
      </wj-flex-grid-column>
      <wj-flex-grid-column :header="'공통코드그룹ID'" :binding="'field3'" width="*" />
      <wj-flex-grid-column :header="'공통코드그룹명'" :binding="'field4'" width="*" />
      <wj-flex-grid-column :header="'공통코드'" :binding="'field5'" width="*" />
      <wj-flex-grid-column :header="'공통코드명'" :binding="'field5'" width="*" />
      <wj-flex-grid-column :header="'순서'" :binding="'field5'" width="*" />
      <wj-flex-grid-column :header="'사용여부'" :binding="'field5'" width="*" />
      <wj-flex-grid-column :header="'비고1'" :binding="'field6'" width="*" />
      <wj-flex-grid-column :header="'비고2'" :binding="'field7'" width="*" />
      <wj-flex-grid-column :header="'비고3'" :binding="'field7'" width="*" />
      <wj-flex-grid-column :header="'비고4'" :binding="'field7'" width="*" />
      <wj-flex-grid-column :header="'비고5'" :binding="'field7'" width="*" />
    </wj-flex-grid>
    <div class="ow-flex-wrap">
      <div class="item">
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
      <div class="item size-fix">
        <div class="counter-board">전체 <span>999</span> 건</div>
      </div>
    </div>
  </div>

  <!-- wj-popup1 -->
  <wj-popup id="wPopup" class="modal-xl" :isDraggable="false" :initialized="initForm">
    <header class="modal-header">
      <h5 class="modal-title">공통코드그룹 언어 설정</h5>
      <button type="button" aria-label="Close" class="close wj-hide">×</button>
    </header>
    <div class="modal-body ow-scroll-wrap" style="height: 640px">
      <div class="layer-body">
        <div class="ow-flex-wrap mb-10">
          <div class="item align-x-end">
            <button class="ow-btn type-state">
              <span>저장</span>
            </button>
            <button class="ow-btn type-state">
              <span>+</span>
            </button>
            <button class="ow-btn type-state">
              <span>-</span>
            </button>
            <button class="ow-btn type-state refresh">
              <span></span>
            </button>
          </div>
        </div>

        <!-- grid -->
        <div class="ow-grid mt-10">
          <wj-flex-grid headersVisibility="Column" :selectionMode="'ListBox'" :itemsSource="resultPop">
            <wj-flex-grid-column :header="'checkboxColumn'" :binding="'checkboxColumn'" :width="50" :isReadOnly="true">
              <wj-flex-grid-cell-template cellType="ColumnHeader">
                <input type="checkbox" v-model="highlightDownloads" />
              </wj-flex-grid-cell-template>
              <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                <input v-model="cell.row.isCollapsed" type="checkbox" checked="false" />
              </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
            <wj-flex-grid-column :header="'공통코드그룹ID'" :binding="'field2'" width="*" />
            <wj-flex-grid-column :header="'언어'" :binding="'field3'" width="*" />
            <wj-flex-grid-column :header="'공통코드그룹명'" :binding="'field4'" width="*">
              <wj-flex-grid-cell-template cellType="ColumnHeader" :autoSizeRows="false" v-slot="cell">
                {{ cell.col.header }}
                <div class="ow-input" style="position: initial">
                  <input type="submit" class="btn-search" />
                </div>
              </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
          </wj-flex-grid>
        </div>
        <!--// grid -->
      </div>
    </div>
  </wj-popup>
  <!-- //wj-popup1 -->

  <!-- wj-popup2 -->
  <wj-popup id="wPopup2" class="modal-xl" :isDraggable="false" :initialized="initForm">
    <header class="modal-header">
      <h5 class="modal-title">공통코드 언어 설정</h5>
      <button type="button" aria-label="Close" class="close wj-hide">×</button>
    </header>
    <div class="modal-body ow-scroll-wrap" style="height: 640px">
      <div class="layer-body">
        <div class="ow-flex-wrap mb-10">
          <div class="item align-x-end">
            <button class="ow-btn type-state">
              <span>저장</span>
            </button>
            <button class="ow-btn type-state">
              <span>+</span>
            </button>
            <button class="ow-btn type-state">
              <span>-</span>
            </button>
            <button class="ow-btn type-state refresh">
              <span></span>
            </button>
          </div>
        </div>

        <!-- grid -->
        <div class="ow-grid mt-10">
          <wj-flex-grid headersVisibility="Column" :selectionMode="'ListBox'" :itemsSource="resultPop2">
            <wj-flex-grid-column :header="'checkboxColumn'" :binding="'checkboxColumn'" :width="50" :isReadOnly="true">
              <wj-flex-grid-cell-template cellType="ColumnHeader">
                <input type="checkbox" v-model="highlightDownloads" />
              </wj-flex-grid-cell-template>
              <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                <input v-model="cell.row.isCollapsed" type="checkbox" checked="false" />
              </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
            <wj-flex-grid-column :header="'공통코드그룹ID'" :binding="'field2'" width="*" />
            <wj-flex-grid-column :header="'공통코드'" :binding="'field3'" width="*" />
            <wj-flex-grid-column :header="'언어'" :binding="'field3'" width="*" />
            <wj-flex-grid-column :header="'공통코드명'" :binding="'field4'" width="*">
              <wj-flex-grid-cell-template cellType="ColumnHeader" :autoSizeRows="false" v-slot="cell">
                {{ cell.col.header }}
                <div class="ow-input" style="position: initial">
                  <input type="submit" class="btn-search" />
                </div>
              </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
          </wj-flex-grid>
        </div>
        <!--// grid -->
      </div>
    </div>
  </wj-popup>
  <!-- //wj-popup2 -->
</template>

<script>
export default {
  name: 'Menu',
  components: {},

  data: function () {
    return {
      pageable: true,

      result: [
        {
          '': '',
          field2: '',
          field3: 'USE_YN',
          field4: '사용여부',
          field5: 'Y',
          field6: '',
          field7: '',
        },
        {
          '': '',
          field2: '',
          field3: 'CRUD_TP',
          field4: 'CRUD유형',
          field5: 'Y',
          field6: '',
          field7: '',
        },
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
          '': '',
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
          '': '',
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
          '': '',
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
          '': '',
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
          '': '',
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
          '': '',
        },
      ],
      resultPop: [
        { field2: 'SCRN_TP', field3: 'ko', field4: '화면유형' },
        { field2: 'SCRN_TP', field3: 'ko', field4: '화면유형' },
        { field2: 'SCRN_TP', field3: 'ko', field4: '화면유형' },
        { field2: 'SCRN_TP', field3: 'ko', field4: '화면유형' },
        { field2: 'SCRN_TP', field3: 'ko', field4: '화면유형' },
      ],
      resultPop2: [
        {
          field2: 'SCRN_TP',
          field1: '02',
          field3: 'ko',
          field4: '화면유형',
        },
        {
          field2: 'SCRN_TP',
          field1: '',
          field3: 'ko',
          field4: '화면유형',
        },
        {
          field2: 'SCRN_TP',
          field1: '',
          field3: 'ko',
          field4: '화면유형',
        },
        {
          field2: 'SCRN_TP',
          field1: '',
          field3: 'ko',
          field4: '화면유형',
        },
        {
          field2: 'SCRN_TP',
          field1: '',
          field3: 'ko',
          field4: '화면유형',
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    initForm(popup) {
      this[popup.hostElement.id] = popup;
    },
  },
};
</script>
