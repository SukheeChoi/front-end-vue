<template>
  <!-- header -->
  <header class="headline-wrap">
    <h1 class="h1">배치작업관리</h1>
    <div>
      <button class="ow-btn type-reference">조회</button>
    </div>
  </header>
  <!-- //header -->

  <!-- search -->
  <div class="search-zone">
    <div class="row">
      <div class="col-3">
        <label class="t">배치작업명</label>
        <div class="ow-input" style="width: var(--input-w-200)">
          <input type="text" />
        </div>
      </div>
      <div class="col-3">
        <label class="t">배치프로그램명</label>
        <div class="ow-input" style="width: var(--input-w-200)">
          <input type="text" />
        </div>
      </div>
      <div class="col-3">
        <label class="t">배치유형</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">Quartzlob</option>
            <option value="">Shell</option>
          </select>
        </div>
      </div>
      <div class="col-3">
        <label class="t">사용여부</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <label class="t">대상시스템</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <!-- //search -->

  <!-- control button -->
  <div class="ow-flex-wrap mt-20 control-btn">
    <div class="item align-x-end">
      <button class="ow-btn type-state"><span>추가</span></button>
      <button class="ow-btn type-state"><span>삭제</span></button>
    </div>
  </div>
  <!-- //control button -->

  <!-- grid -->
  <div class="ow-grid">
    <wj-flex-grid headersVisibility="Column" selectionMode="0" :itemsSource="result">
      <wj-flex-grid-column :header="'번호'" :width="70">
        <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
          {{ cell.row.index + 1 }}
        </wj-flex-grid-cell-template>
      </wj-flex-grid-column>
      <wj-flex-grid-column :header="'배치작업명'" :binding="'batch'" :width="250" />
      <wj-flex-grid-column :header="'배치유형'" :binding="'bType'" :width="250" />
      <wj-flex-grid-column :header="'배치프로그램명'" :binding="'pro'" width="*" />
      <wj-flex-grid-column :header="'배치파라미터'" :binding="'param'" :width="250" />
      <wj-flex-grid-column :header="'최종상태'" :binding="'status'" :width="100" />
      <wj-flex-grid-column :header="'대상시스템'" :binding="'sys'" :width="100" />
      <wj-flex-grid-column :header="'사용여부'" :binding="'use'" :width="100" />
    </wj-flex-grid>
  </div>
  <!--// grid -->

  <!-- bottom -->
  <div class="ow-tabs-wrap mt-20">
    <b-tabs nav-wrapper-class="ow-tabs type-content">
      <b-tab
        v-for="(tab, index) in tabs"
        :key="tab"
        :class="{ active: currentTab === index }"
        :title="tab"
        lazy
        @click="currentTab = index"
      >
        <template #title>
          <strong>{{ tab }}</strong>
        </template>
      </b-tab>
    </b-tabs>
    <!-- control button -->
    <template v-if="currentTab == 0">
      <div class="ow-tabs-side">
        <button class="ow-btn type-state"><span>배치즉시실행</span></button>
        <button class="ow-btn type-state"><span>추가</span></button>
        <button class="ow-btn type-state"><span>삭제</span></button>
      </div>
    </template>
    <template v-if="currentTab == 1">
      <div class="ow-tabs-side">
        <button class="ow-btn type-state"><span>새로고침</span></button>
        <button class="ow-btn type-state"><span>추가</span></button>
        <button class="ow-btn type-state"><span>삭제</span></button>
      </div>
    </template>
    <template v-if="currentTab == 2">
      <div class="ow-tabs-side">
        <button class="ow-btn type-state"><span>배치즉시실행</span></button>
        <button class="ow-btn type-state"><span>추가</span></button>
        <button class="ow-btn type-state"><span>삭제</span></button>
      </div>
    </template>
    <!-- //control button -->
  </div>
  <div class="tab-content pt-10">
    <div v-show="currentTab == 0">
      <!-- grid -->
      <div class="ow-grid">
        <wj-flex-grid headersVisibility="Column" selectionMode="0" :itemsSource="resultTab1">
          <wj-flex-grid-column :header="'번호'" :width="70">
            <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
              {{ cell.row.index + 1 }}
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
          <wj-flex-grid-column :header="'배치작업명'" :binding="'batch'" :width="250" />
          <wj-flex-grid-column :header="'배치실행주기(Cron표현식)'" :binding="'status'" width="*" />
          <wj-flex-grid-column :header="'타임존'" :binding="'tz'" :width="150" />
        </wj-flex-grid>
      </div>
      <!--// grid -->
    </div>

    <div v-show="currentTab == 1">
      <!-- grid -->
      <div class="ow-grid">
        <wj-flex-grid headersVisibility="Column" selectionMode="0" :itemsSource="resultTab2">
          <wj-flex-grid-column :header="'번호'" :width="70">
            <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
              {{ cell.row.index + 1 }}
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
          <wj-flex-grid-column :header="'배치결과ID'" :binding="'batchID'" :width="250" />
          <wj-flex-grid-column :header="'상태'" :binding="'status'" :width="100" />
          <wj-flex-grid-column :header="'실행결과'" :binding="'result'" width="*" />
          <wj-flex-grid-column :header="'실행시작일시'" :binding="'timeStart'" :width="150" />
          <wj-flex-grid-column :header="'실행종료일시'" :binding="'timeEnd'" :width="150" />
          <wj-flex-grid-column :header="'조치내용'" :binding="'desc'" :width="250" />
          <wj-flex-grid-column :header="'조치자'" :binding="'charge'" :width="150" />
          <wj-flex-grid-column :header="'조치일시'" :binding="'date'" :width="150" />
        </wj-flex-grid>
      </div>
      <!--// grid -->
    </div>

    <div v-show="currentTab == 2">
      <!-- grid -->
      <div class="ow-grid">
        <wj-flex-grid headersVisibility="Column" selectionMode="0" :itemsSource="resultTab3">
          <wj-flex-grid-column :header="'번호'" :width="70">
            <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
              {{ cell.row.index + 1 }}
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
          <wj-flex-grid-column :header="'이름'" :binding="'name'" :width="150" />
          <wj-flex-grid-column :header="'로그인ID'" :binding="'loginID'" width="*">
            <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
              {{ cell.item.loginID }}
              <button type="button" class="ow-btn type-flat ml-5" @click="wPopup.show(true)">선택</button>
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
          <wj-flex-grid-column :header="'휴대전화번호'" :binding="'mobile'" :width="150" />
          <wj-flex-grid-column :header="'이메일'" :binding="'emailAdd'" :width="250" />
          <wj-flex-grid-column :header="'SMS수신'" :binding="'sms'" :width="150">
            <wj-flex-grid-cell-template cellType="Cell">
              <input type="checkbox" class="k-checkbox" id="" name="" />
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
          <wj-flex-grid-column :header="'이메일수신'" :binding="'email'" :width="150">
            <wj-flex-grid-cell-template cellType="Cell">
              <input type="checkbox" class="k-checkbox" id="" name="" />
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
          <wj-flex-grid-column :header="'등록일시'" :binding="'date'" :width="150" />
        </wj-flex-grid>
      </div>
      <!--// grid -->
    </div>
  </div>
  <!-- //bottom -->

  <!-- wj-popup xl -->
  <wj-popup id="wPopup" class="modal-xl" :isDraggable="false" :initialized="initForm">
    <header class="modal-header">
      <h5 class="modal-title">사용자조회</h5>
      <button type="button" aria-label="Close" class="close wj-hide">×</button>
    </header>
    <div class="modal-body">
      <div class="layer-body">
        <!-- search -->
        <div class="search-zone">
          <div class="row">
            <div class="col-4">
              <label class="t">검색 키워드</label>
              <div class="ow-select mr-5" style="width: var(--input-w-150)">
                <select>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
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
          <wj-flex-grid headersVisibility="Column" selectionMode="0" :itemsSource="result">
            <wj-flex-grid-column :header="'번호'" :width="70">
              <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                {{ cell.row.index + 1 }}
              </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
            <wj-flex-grid-column :header="'배치작업명'" :binding="'batch'" :width="150" />
            <wj-flex-grid-column :header="'배치유형'" :binding="'bType'" :width="80" />
            <wj-flex-grid-column :header="'배치프로그램명'" :binding="'pro'" width="*" />
            <wj-flex-grid-column :header="'배치파라미터'" :binding="'param'" :width="150" />
            <wj-flex-grid-column :header="'최종상태'" :binding="'status'" :width="80" />
            <wj-flex-grid-column :header="'대상시스템'" :binding="'sys'" :width="80" />
            <wj-flex-grid-column :header="'사용여부'" :binding="'use'" :width="80" />
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
export default {
  name: 'Menu1_1',
  components: {},

  data: function () {
    return {
      currentTab: 0,
      tabs: ['배치스케줄', '배치결과', '담당자'],
      result: [
        {
          batch: 'SAP ITEM Master 수집',
          bTpye: 'QuartzJob',
          pro: 'com.osstem.ows.bm. job.sap.GetItemMasterBeanJob',
          param: 'sDate:20200108,eDate:20201231',
          status: '성공',
          sys: 'SAP',
          use: '사용',
        },
        {
          batch: 'ECRM 영업활동 발송안내',
          bTpye: 'Quartzlob',
          pro: 'com.osstem.ows.bm. job.ecrm.SendSmsBeanJob',
          param: 'sDate 20200113,eDate:20201231',
          status: '성공',
          sys: 'ECRM',
          use: '사용',
        },
        {
          batch: 'SAP ITEM Master 수집',
          bTpye: 'Quartzlob',
          pro: 'com.osstem.ows.bm',
          param: 'sDate 2021-09-13',
          status: '성공',
          sys: 'SAP',
          use: '사용',
        },
        {
          batch: 'SAP ITEM Master 수집',
          bTpye: 'Quartzlob',
          pro: 'com.osstem.ows.bm',
          param: 'sDate 2021-09-13',
          status: '성공',
          sys: 'SAP',
          use: '사용',
        },
        {
          batch: 'SAP ITEM Master 수집',
          bTpye: 'Quartzlob',
          pro: 'com.osstem.ows.bm',
          param: 'sDate 2021-09-13',
          status: '성공',
          sys: 'SAP',
          use: '사용',
        },
        {
          batch: 'SAP ITEM Master 수집',
          bTpye: 'Quartzlob',
          pro: 'com.osstem.ows.bm',
          param: 'sDate 2021-09-13',
          status: '성공',
          sys: 'SAP',
          use: '사용',
        },
      ],
      result_p1: [
        {
          id: '정희원',
          user: 'jhwlove',
          status: '활성',
          num: '010-9872-0282',
          email: 'heewon@gmail.com',
          start: '2021-09-12 12:00',
          end: '2021-09-12 12:00',
        },
        {
          id: '이미소',
          user: 'smaillee',
          status: '비활성',
          num: '010-2232-0833',
          email: 'smilelee@nate.com',
          start: '2021-09-12 12:00',
          end: '2021-09-12 12:00',
        },
        { id: '', user: '', status: '', num: '', email: '', start: '', end: '' },
        { id: '', user: '', status: '', num: '', email: '', start: '', end: '' },
        { id: '', user: '', status: '', num: '', email: '', start: '', end: '' },
        { id: '', user: '', status: '', num: '', email: '', start: '', end: '' },
        { id: '', user: '', status: '', num: '', email: '', start: '', end: '' },
      ],
      resultTab1: [{ batch: 'SAP ITEM Master 수업', status: '0 00 01**?', tz: '대한민국/서울' }],
      resultTab2: [
        {
          batchID: 'BTR202007000171',
          status: '실행',
          result: '총 100건 중 100건 수행',
          timeStart: '2020-01-01 01:00:00',
          timeEnd: '2020-01-01 01:10:00',
          desc: '',
          charge: '',
          date: '',
        },
        {
          batchID: 'BTR202007000172',
          status: '성공',
          result: '총 100건 중 100건 수행',
          timeStart: '2020-01-01 03:30:01',
          timeEnd: '2020-01-01 04:00:13',
          desc: '',
          charge: '',
          date: '',
        },
        {
          batchID: 'BTR202007000173',
          status: '성공',
          result: '총 100건 중 100건 수행',
          timeStart: '2020-01-01 01:30:00',
          timeEnd: '2020-01-01 01:35:59',
          desc: '',
          charge: '',
          date: '',
        },
        {
          batchID: 'BTR202007000174',
          status: '성공',
          result: '총 100건 중 100건 수행',
          timeStart: '2020-01-01 01:30:13',
          timeEnd: '2020-01-01 02:14:55',
          desc: '',
          charge: '',
          date: '',
        },
        {
          batchID: 'BTR202007000175',
          status: '실패',
          result: '오류발생',
          timeStart: '2020-01-01 01:30:13',
          timeEnd: '2020-01-01 01:40:22',
          desc: '프로그램 수정 및 재실행',
          charge: '정재원',
          date: '2020-01-02 04:35:27',
        },
        {
          batchID: 'BTR202007000176',
          status: '성공',
          result: '총 100건 중 100건 수행',
          timeStart: '2020-01-01 01:30:13',
          timeEnd: '2020-01-01 01:35:05',
          desc: '',
          charge: '',
          date: '',
        },
        {
          batchID: 'BTR202007000177',
          status: '성공',
          result: '총 100건 중 100건 수행',
          timeStart: '2020-01-01 01:30:13',
          timeEnd: '2020-01-01 01:48:42',
          desc: '',
          charge: '',
          date: '',
        },
        {
          batchID: 'BTR202007000178',
          status: '성공',
          result: '총 100건 중 100건 수행',
          timeStart: '2020-01-01 01:30:13',
          timeEnd: '2020-01-01 02:08:01',
          desc: '',
          charge: '',
          date: '',
        },
      ],
      resultTab3: [
        {
          name: '정현희',
          loginID: '24020306',
          mobile: '010-5218-8445',
          emailAdd: 'jhh85@osstem.com',
          sms: '',
          email: '',
          date: '2020-09-01 11:20:21',
        },
        {
          name: '이미소',
          loginID: '25062808',
          mobile: '010-9893-0002',
          emailAdd: 'lms@osstem.com',
          sms: '',
          email: '',
          date: '2020-01-01 13:55:08',
        },
        {
          name: '정재원',
          loginID: '25062810',
          mobile: '010-5842-4287',
          emailAdd: 'jjwon@osstem.com',
          sms: '',
          email: '',
          date: '2020-01-01 07:23:49',
        },
      ],
    };
  },
  methods: {
    initForm(popup) {
      this[popup.hostElement.id] = popup;
    },
  },
};
</script>
