<template>
  <!-- header -->
  <header class="headline-wrap">
    <h1 class="h1">알림 설정 가능 목록</h1>
    <div>
      <button class="ow-btn type-reference">조회</button>
      <button class="ow-btn type-state">추가</button>
    </div>
  </header>
  <!-- //header -->
  <div class="flex-container mt-20">
    <h2 class="h2">알림 설정 가능 목록</h2>
  </div>
  <!-- search -->
  <div class="search-zone mt-10">
    <div class="row">
      <div class="col-3">
        <label class="t">알림업무그룹</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">주문</option>
            <option value=""></option>
          </select>
        </div>
      </div>
      <div class="col-3">
        <label class="t">알림업무명</label>
        <div class="ow-input" style="width: var(--input-w-200)">
          <input type="text" />
        </div>
      </div>
      <div class="col-3">
        <label class="t">알림수신 대상유형</label>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">전체</option>
            <option value=""></option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <!-- //search -->

  <div class="ow-grid mt-10">
    <wj-flex-grid headersVisibility="Column" selectionMode="0" :itemsSource="result">
      <wj-flex-grid-column :header="'checkboxColumn'" :binding="'checkboxColumn'" :width="50" :isReadOnly="true">
        <wj-flex-grid-cell-template cellType="ColumnHeader">
          <input type="checkbox" v-model="highlightDownloads" />
        </wj-flex-grid-cell-template>
        <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
          <input v-model="cell.row.isCollapsed" type="checkbox" checked="false" />
        </wj-flex-grid-cell-template>
      </wj-flex-grid-column>
      <wj-flex-grid-column :header="'알림업무그룹'" :binding="'field1'" width="*" />
      <wj-flex-grid-column :header="'알림업무'" :binding="'field2'" width="*" />
      <wj-flex-grid-column :header="'알림내용 및 설명'" :binding="'field3'" width="*" />
      <wj-flex-grid-column :header="'수신대상'" :binding="'field4'" width="*" />
      <wj-flex-grid-column :header="'작성시'" :binding="'field5'" width="*" />
      <wj-flex-grid-column :header="'수신시'" :binding="'field6'" width="*" />
      <wj-flex-grid-column :header="'완료시'" :binding="'field7'" width="*" />
      <wj-flex-grid-column :header="'취소시'" :binding="'field8'" width="*" />
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

  <!-- sub title -->
  <div class="flex-container mt-20">
    <h2 class="h2">설정된 알림 대상 목록</h2>
    <!-- control button -->
    <div>
      <button class="ow-btn type-state"><span>삭제</span></button>
    </div>
    <!-- //control button -->
  </div>
  <!-- //sub title -->
  <div class="ow-grid mt-10">
    <wj-flex-grid headersVisibility="Column" selectionMode="0" :itemsSource="result2">
      <wj-flex-grid-column :header="'checkboxColumn'" :binding="'checkboxColumn'" :width="50" :isReadOnly="true">
        <wj-flex-grid-cell-template cellType="ColumnHeader">
          <input type="checkbox" v-model="highlightDownloads" />
        </wj-flex-grid-cell-template>
        <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
          <input v-model="cell.row.isCollapsed" type="checkbox" checked="false" />
        </wj-flex-grid-cell-template>
      </wj-flex-grid-column>
      <wj-flex-grid-column :header="'알림업무그룹'" :binding="'field1'" width="*" />
      <wj-flex-grid-column :header="'알림업무'" :binding="'field2'" width="*" />
      <wj-flex-grid-column :header="'알림내용 및 설명'" :binding="'field3'" width="*" />
      <wj-flex-grid-column :header="'작성시'" :binding="'field4'" width="*" />
      <wj-flex-grid-column :header="'수신시'" :binding="'field5'" width="*" />
      <wj-flex-grid-column :header="'완료시'" :binding="'field6'" width="*" />
      <wj-flex-grid-column :header="'취소시'" :binding="'field7'" width="*" />
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

  <!-- sub title -->
  <div class="flex-container mt-20">
    <h2 class="h2">알림 설정 내용</h2>
    <!-- control button -->
    <div>
      <button class="ow-btn type-state"><span>저장</span></button>
      <button class="ow-btn type-state"><span>취소</span></button>
    </div>
    <!-- //control button -->
  </div>
  <!-- //sub title -->
  <!-- 상세 table -->
  <div class="ow-table-type-data mt-10">
    <table class="tbl-tpye-2">
      <colgroup>
        <col style="width: 200px" />
        <col />
        <col />
        <col style="width: 0px" />
        <col style="width: 0px" />
      </colgroup>

      <tr>
        <th>알림업무</th>
        <td colspan="5">
          <div class="ow-input" style="width: var(--input-w-500)">
            <input type="text" />
          </div>
        </td>
        <th>중요도설정</th>
        <td colspan="3">
          <ul class="importance">
            <li class="mark on"><span>최하</span></li>
            <li class="mark on"><span>하</span></li>
            <li class="mark on"><span>중</span></li>
            <li class="mark on"><span>상</span></li>
            <li class="mark"><span>최상</span></li>
          </ul>
        </td>
      </tr>
      <tr>
        <th rowspan="3">알림내용 및 설명</th>
        <td colspan="5" rowspan="3">
          <textarea name="" id="" cols="50%" rows="5" class="w100p"></textarea>
        </td>
        <th>미확인시 반복알림</th>
        <td>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          </div>
        </td>
        <th>반복횟수</th>
        <td>
          <div class="ow-select" style="width: var(--input-w-150)">
            <select>
              <option value="">3회</option>
              <option value="">1회</option>
            </select>
          </div>
        </td>
      </tr>
      <tr>
        <th>작성시 알림</th>
        <td>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          </div>
        </td>
        <th>완료시 알림</th>
        <td>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          </div>
        </td>
      </tr>
      <tr>
        <th>수신시 알림</th>
        <td>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          </div>
        </td>
        <th>취소시 알림</th>
        <td>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          </div>
        </td>
      </tr>
      <tr>
        <th>상단뱃지에 추가</th>
        <td colspan="5">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          </div>
        </td>
        <th>오래된 항목 지우기</th>
        <td>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          </div>
        </td>
        <th>기간설정</th>
        <td>
          <div class="ow-select" style="width: var(--input-w-150)">
            <select>
              <option value="">1개월</option>
              <option value="">3개월</option>
            </select>
          </div>
        </td>
      </tr>
      <tr>
        <th>자동 알림창 표시</th>
        <td colspan="5">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          </div>
        </td>
        <th>전체알림해제</th>
        <td colspan="3">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          </div>
        </td>
      </tr>
    </table>
    <!-- <div class="col-7 ml-30">
      <table class="tbl-tpye-2">
        <colgroup>
          <col style="width: 150px" />
          <col style="width: " />
          <col style="width: 150px" />
          <col style="width: " />
        </colgroup>
        <tr>
          <th>중요도설정</th>
          <td colspan="3">
            <ul class="importance">
              <li class="mark on"><span>최하</span></li>
              <li class="mark on"><span>하</span></li>
              <li class="mark on"><span>중</span></li>
              <li class="mark on"><span>상</span></li>
              <li class="mark"><span>최상</span></li>
            </ul>
          </td>
        </tr>
        <tr>
          <th>미확인시 반복알림</th>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
            </div>
          </td>
          <th>반복횟수</th>
          <td>
            <div class="ow-select" style="width: var(--input-w-150)">
              <select>
                <option value="">3회</option>
                <option value="">1회</option>
              </select>
            </div>
          </td>
        </tr>
        <tr>
          <th>작성시 알림</th>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
            </div>
          </td>
          <th>완료시 알림</th>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>수신시 알림</th>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
            </div>
          </td>
          <th>취소시 알림</th>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>오래된 항목 지우기</th>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
            </div>
          </td>
          <th>기간설정</th>
          <td>
            <div class="ow-select" style="width: var(--input-w-150)">
              <select>
                <option value="">1개월</option>
                <option value="">3개월</option>
              </select>
            </div>
          </td>
        </tr>
        <tr>
          <th>전체알림해제</th>
          <td colspan="3">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
            </div>
          </td>
        </tr>
      </table>
    </div> -->
  </div>
  <!-- //상세 table -->
</template>

<script>
export default {
  name: 'admin',
  components: {},

  data: function () {
    return {
      pageable: true,
      result: [
        {
          field1: '주문',
          field2: '주문시 관련 담당자 자동 알림',
          field3: '주문시 피킹/배송 담당자에 대한 자동 알림',
          field4: '담당',
          field5: 'Y',
          field6: 'Y',
          field7: 'Y',
          field8: 'Y',
        },
        {
          group: '배송',
          work: '배송업무 시작시 담당자 알림',
          content: '배송 업무가 시작되었을 때 관련 담당자에게 자동 알림',
          target: '참조',
          date1: 'Y',
          date2: 'Y',
          date3: 'N',
          date4: 'Y',
        },
        {
          group: '',
          work: '',
          content: '',
          target: '',
          date1: '',
          date2: '',
          date3: '',
          date4: '',
        },
        // { "group":"", "work":"", "content":"", "target":"", "date1":"", "date2":"", "date3":"", "date4":"" },
        // { "group":"", "work":"", "content":"", "target":"", "date1":"", "date2":"", "date3":"", "date4":"" },
      ],
      result2: [
        {
          field1: '주문',
          field2: '주문시 관련 담당자 자동 알림',
          field3: '주문시 피킹/배송 담당자에 대한 자동 알림',
          field4: '담당',
          field5: 'Y',
          field6: 'Y',
          field7: 'Y',
          field8: 'Y',
        },
        {
          group: '배송',
          work: '배송업무 시작시 담당자 알림',
          content: '배송 업무가 시작되었을 때 관련 담당자에게 자동 알림',
          target: '참조',
          date1: 'Y',
          date2: 'Y',
          date3: 'N',
          date4: 'Y',
        },
        {
          group: '',
          work: '',
          content: '',
          target: '',
          date1: '',
          date2: '',
          date3: '',
          date4: '',
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
