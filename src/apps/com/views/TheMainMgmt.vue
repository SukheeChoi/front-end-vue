<template>
  <!-- header -->
  <header class="headline-wrap">
    <h1 class="h1">부서별 메인화면 관리</h1>
    <div>
      <button class="ow-btn type-reference">조회</button>
    </div>
  </header>
  <!-- //header -->
  <!-- row -->
  <div class="row mt-10">
    <div class="col-6">
      <!-- search -->
      <div class="search-zone">
        <div class="row">
          <div class="col-4">
            <label class="t">시스템구분</label>
            <div class="ow-select" style="width: var(--input-w-100)">
              <select>
                <option value="">공통</option>
                <option value="">생산물류</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <label class="t">업무코드</label>
            <div class="ow-select" style="width: var(--input-w-100)">
              <select>
                <option value="">공통</option>
                <option value="">생산</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <!-- //search -->
      <!-- control button -->
      <div class="ow-flex-wrap mt-20">
        <h2 class="h2">화면 목록</h2>
      </div>
      <!-- //control button -->

      <!-- grid -->
      <div class="ow-grid">
        <wj-flex-grid
          id="grid"
          ref="grid"
          :items-source="result"
          :allowDragging="false"
          :allowSorting="false"
          selection-mode="Row"
          :initialized="initGrid"
          class="mt-10"
          style="min-height: 374px; max-height: 374px"
          :isReadOnly="true"
        >
          <wj-flex-grid-column binding="loginId" header="화면ID" width="*"></wj-flex-grid-column>
          <wj-flex-grid-column binding="userNm" header="화면명" width="*"></wj-flex-grid-column>
          <wj-flex-grid-column binding="userNm" header="화면URL" width="*"></wj-flex-grid-column>
          <wj-flex-grid-column binding="userNm" header="사용" width="*"></wj-flex-grid-column>
        </wj-flex-grid>
      </div>

      <!--// grid -->
    </div>
    <div class="col-6">
      <div class="main-container pd-10">
        <!-- search -->
        <div class="search-zone">
          <div class="row">
            <div class="col-4">
              <label class="t">부서명</label>
              <div class="ow-input" style="width: var(--input-w-150)">
                <input type="text" />
              </div>
            </div>
            <div class="col-4">
              <label class="t">상위부서포함</label>
              <div class="ow-select" style="width: var(--input-w-100)">
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
          <h2 class="h2">부서/개인/메인화면 설정 목록</h2>
          <div class="item align-x-end">
            <button class="ow-btn type-state">
              <span>추가</span>
            </button>
            <button class="ow-btn type-state">
              <span>삭제</span>
            </button>
            <button class="ow-btn type-state">
              <span>저장</span>
            </button>
          </div>
        </div>
        <!-- //control button -->

        <div class="ow-grid">
          <wj-flex-grid
            :deferResizing="true"
            :showMarquee="true"
            :itemsSource="result3"
            :initialized="initGrid"
            :child-items-path="['checks', 'earnings', 'group']"
            :isReadOnly="false"
            :isEditable="true"
            style="height: 500px"
            class="mt-10"
          >
            <wj-flex-grid-column binding="name" header="부서" :width="'*'" />
            <wj-flex-grid-column binding="hours" header="화면ID" :width="'*'" :allow-sorting="false" />
            <wj-flex-grid-column binding="hours" header="화면명" :width="'*'" :allow-sorting="false" />
            <wj-flex-grid-column binding="useYn" header="사용" :width="'*'" :dataMap="useYnList" />
          </wj-flex-grid>
        </div>
      </div>
    </div>
  </div>
  <!-- //row -->
</template>

<script>
import { Selector } from '@grapecity/wijmo.grid.selector';
import { CollectionView, PropertyGroupDescription } from '@grapecity/wijmo';

export default {
  name: 'Sample2_1',
  components: {},

  data: function () {
    return {
      totalCount: 0, // [Mandatory] 전체 검색 건수
      currentPage: 1, // [Mandatory] 현재 페이지 번호
      pageSize: 100, // [Mandatory] 그리드에 보여지는 행 수 (Default=10)
      maxPages: 10, // [Mandatory] Pagination 에 보여지는 숫자 개수 (Default=10 [1][2][3][4][5]..)
      grid: null,
      currentTab: 0,
      grouped: true,
      selectedItems: [],
      selector: null,
      useYnList: ['Y', 'N'],
      result: [
        {
          name: 'Jack Smith',
          checks: [
            {
              name: 'check1',
              earnings: [
                { name: 'hourly', hours: 30.0, rate: 15.0 },
                { name: 'overtime', hours: 10.0, rate: 20.0 },
                { name: 'bonus', hours: 5.0, rate: 30.0 },
              ],
            },
            {
              name: 'check2',
              earnings: [
                { name: 'hourly', hours: 20.0, rate: 18.0 },
                { name: 'overtime', hours: 20.0, rate: 24.0 },
              ],
            },
          ],
        },
        {
          name: 'Bob Smith',
          checks: [
            {
              name: 'check1',
              earnings: [
                { name: 'hourly', hours: 30.0, rate: 15.0 },
                { name: 'overtime', hours: 10.0, rate: 20.0 },
                { name: 'bonus', hours: 5.0, rate: 30.0 },
              ],
            },
            {
              name: 'check2',
              earnings: [
                { name: 'hourly', hours: 20.0, rate: 18.0 },
                { name: 'overtime', hours: 20.0, rate: 24.0 },
              ],
            },
          ],
        },
        {
          name: 'Jane Smith',
          checks: [
            {
              name: 'check1',
              earnings: [
                { name: 'hourly', hours: 30.0, rate: 15.0 },
                { name: 'overtime', hours: 10.0, rate: 20.0 },
                { name: 'bonus', hours: 5.0, rate: 30.0 },
              ],
            },
            {
              name: 'check2',
              earnings: [
                { name: 'hourly', hours: 20.0, rate: 18.0 },
                { name: 'overtime', hours: 20.0, rate: 24.0 },
              ],
            },
          ],
        },
      ],
      result2: [],
      result3: new CollectionView([
        {
          deptnm: '오스템임플란트',
          checks: [
            {
              deptnm: 'OW개발총괄본부',
              earnings: [
                {
                  deptnm: 'OW공통개발실',
                  deptid: 30.0,
                  useYn: 'Y',
                  group: [{ deptnm: '사용자관리 업무그룹' }],
                },
                { deptnm: 'OW서비스개발실', deptid: 10.0, useYn: 'Y' },
                { deptnm: 'OW물류개발실', deptid: 5.0, useYn: 'N' },
              ],
            },
            {
              deptnm: '국내영업총괄본부',
              earnings: [
                { deptnm: '서울동부영업본부', deptid: 20.0, useYn: 'Y' },
                { deptnm: '경기영업본부', deptid: 20.0, useYn: 'Y' },
              ],
            },
          ],
        },
      ]),
    };
  },

  created() {
    this.result2 = new CollectionView([], {
      trackChanges: true,
    });
    this.getList(1);
  },

  methods: {
    gridInitialized(grid) {
      this.grid = grid;
    },
    initGrid: function (grid) {
      this.setGroups(true);
      this.selector = new Selector(grid, {
        itemChecked: () => {
          this.selectedItems = grid.rows.filter((r) => r.isSelected);
        },
      });
    },
    setGroups: function (groupsOn) {
      let groups = this.result3.groupDescriptions;
      groups.clear();
      if (groupsOn) {
        groups.push(new PropertyGroupDescription('name'), new PropertyGroupDescription('checks'));
      }
      this.grouped = groupsOn;
    },
    async getList(page = 1) {
      try {
        if (page == 1) {
          this.totalCount = 0; // Required to be initialized
        }
        this.currentPage = page; // Required to be set
        this.result.sourceCollection = [];

        const { totalCount, data } = await getData(page, this.pageSize);
        this.totalCount = totalCount; // Required to be set
        this.result.sourceCollection = data;
      } catch (err) {}
    },
  },
};

// Get list from client side
async function getData(pageNo, pageSize) {
  const totalCount = 1999;
  let startIndex = (pageNo - 1) * pageSize + 1;
  let endIndex = startIndex + pageSize - 1;
  if (endIndex > totalCount) {
    endIndex = totalCount;
  }

  const data = [];
  for (let i = startIndex; i <= endIndex; i++) {
    data.push({
      loginId: 'CODE_' + String(i).padStart(4, '0'),
      userNm: 'NAME_' + String(i).padStart(4, '0'),
    });
  }

  return {
    totalCount,
    data,
  };
}
</script>
