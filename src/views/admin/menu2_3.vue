<template>
    <!-- header -->
    <header class="headline-wrap">
        <h1 class="h1">업무그룹관리</h1>
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
        <div class="item align-x-end">
            <button class="ow-btn type-state"><span>추가</span></button>
            <button class="ow-btn type-state"><span>삭제</span></button>
            <button class="ow-btn type-state"><span>저장</span></button>
        </div>
    </div>
    <!-- //control button -->

    <div class="ow-grid mt-10">
        <wj-flex-grid
            :itemsSource="result"
            :isReadOnly="true"
            headersVisibility="Column"
        >
            <wj-flex-grid-column
                :header="'번호'"
                :binding="'field1'"
                :width="70"
            >
                <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    {{ cell.row.index + 1 }}
                </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
            <wj-flex-grid-column
                :header="'시스템구분'"
                :binding="'field2'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'업무코드'"
                :binding="'field3'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'업무그룹ID'"
                :binding="'field4'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'업무그룹명'"
                :binding="'field5'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'업무그룹 설명'"
                :binding="'field6'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'사용'"
                :binding="'field6'"
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
            visibleMenu31_P1: false,
            visibleMenu31_P2: false,
            pageable: true,
            selectedItems: [],
            selector: null,
            columns: [
                { title: "번호", field: "", width: "70px", cell: "cellNum1" },
                {
                    title: "권한그룹유형",
                    field: "field2",
                    width: "",
                    cell: "cellNum2",
                },
                {
                    title: "권한그룹ID",
                    field: "field3",
                    width: "",
                    cell: "cellNum3",
                },
                {
                    title: "권한그룹명",
                    field: "field4",
                    width: "*",
                    cell: "cellNum4",
                },
                {
                    title: "권한그룹 설명",
                    field: "field5",
                    width: "",
                    cell: "cellNum5",
                },
                { title: "순서", field: "field6", width: "", cell: "cellNum6" },
                { title: "", field: "", width: "", cell: "cellNum7" },
            ],
            result: [
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    field6: "",
                    "": "",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    field6: "",
                    "": "",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    field6: "",
                    "": "",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    field6: "",
                    "": "",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    field6: "",
                    "": "",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    field6: "",
                    "": "",
                },
            ],
        };
    },
    created() {
        // this.result = this.createRandomData(7);
        // this.result2 = this.createRandomData(7);
        // this.result_p1 = this.createRandomData(10);
        // this.result_p2 = this.createRandomData(10);
    },
    mounted() {},
    methods: {},
};
</script>
