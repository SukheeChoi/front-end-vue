<template>
    <!-- header -->
    <header class="headline-wrap">
        <h1 class="h1">화면관리</h1>
        <div>
            <button class="ow-btn type-reference">조회</button>
        </div>
    </header>
    <!-- //header -->

    <!-- search -->
    <div class="search-zone">
        <div class="row">
            <div class="col-3">
                <label class="t">시스템구분</label>
                <div class="ow-select" style="width: var(--input-w-150)">
                    <select>
                        <option value="">공통(com)</option>
                        <option value="">생산물류(log)</option>
                    </select>
                </div>
            </div>
            <div class="col-3">
                <label class="t">업무코드</label>
                <div class="ow-select" style="width: var(--input-w-150)">
                    <select>
                        <option value="">공통(com)</option>
                        <option value="">생산(pro)</option>
                        <option value="">물류(loe)</option>
                    </select>
                </div>
            </div>
            <div class="col-3">
                <div class="ow-select" style="width: var(--input-w-150)">
                    <select>
                        <option value="">화면명</option>
                    </select>
                </div>
                <div class="ow-input" style="width: var(--input-w-200)">
                    <input type="text" />
                </div>
            </div>
            <div class="col-3">
                <label class="t">사용여부</label>
                <div class="ow-select" style="width: var(--input-w-150)">
                    <select>
                        <option value="">전체</option>
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
        <h2 class="h2">화면 목록</h2>
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

    <div class="ow-grid mt-10">
        <wj-flex-grid
            :itemsSource="result2"
            headersVisibility="Column"
            :initialized="initializeGrid"
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
                :header="'번호'"
                :binding="'field1'"
                :width="70"
                :isReadOnly="true"
            >
                <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    {{ cell.row.index + 1 }}
                </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
            <wj-flex-grid-column
                :header="'시스템구분'"
                :binding="'field2'"
                :dataMap="systemlist"
                width="*"
            />
            <wj-flex-grid-column
                :header="'업무코드'"
                :binding="'field3'"
                :dataMap="bizlist"
                width="*"
            />
            <wj-flex-grid-column
                :header="'화면ID'"
                :binding="'field4'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'화면명'"
                :binding="'field5'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'화면URL'"
                :binding="'field6'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'데이터권한'"
                :binding="'field7'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'CRUD제어'"
                :binding="'field8'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'대쉬보드'"
                :binding="'field9'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'오늘의할일'"
                :binding="'field10'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'화면비율'"
                :binding="'field11'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'사용'"
                :binding="'field12'"
                width="*"
            />
        </wj-flex-grid>
    </div>
</template>

<script>
export default {
    name: "Menu",
    components: {},

    data: function() {
        return {
            treeData: [],
            pageable: true,
            expanded: true,
            systemlist: ["공통", "생산물류", "경영지원"],
            bizlist: ["공통", "생산", "물류", "구매"],
            // Search
            searchForm: {
                searchType: "invoiceNumber",
                searchWord: "",
                startDate: new Date(),
                endDate: new Date(),
            },
            result: [
                {
                    items: [
                        {
                            header: "영업",
                            items: [
                                { header: "영업" },
                                { header: "" },
                                { header: "" },
                            ],
                        },
                        {
                            header: "주문",
                            items: [{ header: "" }, { header: "" }],
                        },
                        {
                            header: "교육",
                            items: [
                                { header: "" },
                                { header: "" },
                                { header: "" },
                                { header: "" },
                                { header: "" },
                            ],
                        },
                    ],
                },
            ],
            result2: [
                {
                    checkboxColumn: "",
                    field01: "",
                    field02: "",
                    field03: "",
                    field04: "",
                    field05: "",
                    field06: "",
                    field07: "",
                    field08: "",
                    field09: "",
                    field10: "",
                    field11: "",
                    field12: "",
                    field13: "",
                },
                {
                    checkboxColumn: "",
                    field01: "",
                    field02: "",
                    field03: "",
                    field04: "",
                    field05: "",
                    field06: "",
                    field07: "",
                    field08: "",
                    field09: "",
                    field10: "",
                    field11: "",
                    field12: "",
                    field13: "",
                },
                {
                    checkboxColumn: "",
                    field01: "",
                    field02: "",
                    field03: "",
                    field04: "",
                    field05: "",
                    field06: "",
                    field07: "",
                    field08: "",
                    field09: "",
                    field10: "",
                    field11: "",
                    field12: "",
                    field13: "",
                },
                {
                    checkboxColumn: "",
                    field01: "",
                    field02: "",
                    field03: "",
                    field04: "",
                    field05: "",
                    field06: "",
                    field07: "",
                    field08: "",
                    field09: "",
                    field10: "",
                    field11: "",
                    field12: "",
                    field13: "",
                },
                {
                    checkboxColumn: "",
                    field01: "",
                    field02: "",
                    field03: "",
                    field04: "",
                    field05: "",
                    field06: "",
                    field07: "",
                    field08: "",
                    field09: "",
                    field10: "",
                    field11: "",
                    field12: "",
                    field13: "",
                },
                {
                    checkboxColumn: "",
                    field01: "",
                    field02: "",
                    field03: "",
                    field04: "",
                    field05: "",
                    field06: "",
                    field07: "",
                    field08: "",
                    field09: "",
                    field10: "",
                    field11: "",
                    field12: "",
                    field13: "",
                },
                {
                    checkboxColumn: "",
                    field01: "",
                    field02: "",
                    field03: "",
                    field04: "",
                    field05: "",
                    field06: "",
                    field07: "",
                    field08: "",
                    field09: "",
                    field10: "",
                    field11: "",
                    field12: "",
                    field13: "",
                },
                {
                    checkboxColumn: "",
                    field01: "",
                    field02: "",
                    field03: "",
                    field04: "",
                    field05: "",
                    field06: "",
                    field07: "",
                    field08: "",
                    field09: "",
                    field10: "",
                    field11: "",
                    field12: "",
                    field13: "",
                },
            ],
        };
    },
    created() {},
    mounted() {},
    methods: {
        initializeGrid(flex) {
            flex.beginningEdit.addHandler((s, e) => {
                let col = s.columns[e.col];
                if (col.binding != "checkboxColumn") {
                    let item = s.rows[e.row].dataItem;
                    if (item.checkboxColumn) {
                        e.cancel = true;
                    }
                }
            });
        },
    },
};
</script>
