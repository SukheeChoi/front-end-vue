<template>
  <!-- row -->
  <div class="row">
    <!-- header -->
    <header class="headline-wrap">
      <h1 class="h1">메뉴관리</h1>
      <div>
        <button class="ow-btn type-reference">조회</button>
      </div>
    </header>
    <!-- //header -->
  </div>
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

      <div class="ow-flex-wrap mt-20">
        <h2 class="h2">화면 목록</h2>
      </div>

      <!-- grid -->
      <div class="ow-grid">
        <wj-flex-grid
          id="grid"
          ref="grid"
          :items-source="result2"
          :allowDragging="false"
          :allowSorting="false"
          selection-mode="Row"
          headersVisibility="Column"
          :initialized="initializeGrid"
          class="mt-10"
          style="min-height: 374px; max-height: 374px"
          :isReadOnly="true"
        >
          <wj-flex-grid-column :header="'checkboxColumn'" :binding="'checkboxColumn'" :width="50" :isReadOnly="true">
            <wj-flex-grid-cell-template cellType="ColumnHeader">
              <input type="checkbox" v-model="highlightDownloads" />
            </wj-flex-grid-cell-template>
            <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
              <input v-model="cell.row.isCollapsed" type="checkbox" checked="false" />
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
          <wj-flex-grid-column header="번호" :width="70">
            <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
              {{ new Intl.NumberFormat().format(pageSize * (currentPage - 1) + cell.row.index + 1) }}
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>

          <wj-flex-grid-column binding="loginId" header="화면ID" :width="300"></wj-flex-grid-column>

          <wj-flex-grid-column binding="userNm" header="화면명" width="*"></wj-flex-grid-column>
          <wj-flex-grid-column binding="userNm" header="화면URL" width="*"></wj-flex-grid-column>
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
          <h2 class="h2">메뉴 목록</h2>
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

        <!-- grid -->
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
            <wj-flex-grid-column binding="name" header="업무코드" :width="'*'" />
            <wj-flex-grid-column binding="hours" header="폴더/프로그램명" :width="'*'" :allow-sorting="false" />
            <wj-flex-grid-column binding="rate" header="화면ID" :width="'*'" />
            <wj-flex-grid-column binding="rate" header="화면URL" :width="'*'" />
            <wj-flex-grid-column binding="rate" header="순서" data-type="Number" :width="'*'" />
            <wj-flex-grid-column binding="name" header="표시안함" :width="'*'" />
            <wj-flex-grid-column binding="name" header="직책권한" :width="'*'" />
            <wj-flex-grid-column binding="name" header="대상" :width="'*'" />
          </wj-flex-grid>
        </div>
        <!--// grid -->
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
      currentTab: 0,
      grouped: true,
      selectedItems: [],
      selector: null,
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
      result2: [],
    };
  },

  created() {},

  methods: {
    initializeGrid(flex) {
      flex.beginningEdit.addHandler((s, e) => {
        let col = s.columns[e.col];
        if (col.binding != 'checkboxColumn') {
          let item = s.rows[e.row].dataItem;
          if (item.checkboxColumn) {
            e.cancel = true;
          }
        }
      });
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
  },
};
</script>
