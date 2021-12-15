<template>
    <div class="main-container">
        <!-- header -->
        <header class="headline-wrap">
            <h1 class="h1">사용자관리</h1>
            <div>
                <button class="ow-btn type-state">신규</button>
                <button class="ow-btn type-reference">조회</button>
            </div>
        </header>
        <!-- //header -->
        <!-- search -->
        <div class="search-zone">
            <div class="row">
                <div class="col-3">
                    <label class="t">조직</label>
                    <div class="ow-input" style="width: var(--input-w-200)">
                        <input type="text" />
                        <input type="submit" class="btn-search" />
                    </div>
                </div>
                <div class="col-3">
                    <label class="t">검색키워드</label>
                    <div class="ow-select" style="width: var(--input-w-150)">
                        <select>
                            <option value="">이름</option>
                            <option value="">사번</option>
                            <option value="">전화번호</option>
                            <option value="">이메일</option>
                        </select>
                    </div>
                    <div class="ow-input" style="width: var(--input-w-200)">
                        <input type="text" />
                    </div>
                </div>
                <div class="col-3">
                    <label class="t">상태</label>
                    <div class="ow-select" style="width: var(--input-w-150)">
                        <select>
                            <option value="">재직</option>
                            <option value="">퇴사</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <!-- //search -->

        <div class="ow-grid">
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
                    :header="'사번'"
                    :binding="'field2'"
                    width="*"
                />
                <wj-flex-grid-column
                    :header="'이름'"
                    :binding="'field3'"
                    width="*"
                />
                <wj-flex-grid-column
                    :header="'사용언어'"
                    :binding="'field4'"
                    width="*"
                />
                <wj-flex-grid-column
                    :header="'부서'"
                    :binding="'field5'"
                    width="*"
                />
                <wj-flex-grid-column
                    :header="'전화번호'"
                    :binding="'field6'"
                    width="*"
                />
                <wj-flex-grid-column
                    :header="'이메일'"
                    :binding="'field7'"
                    width="*"
                />
                <wj-flex-grid-column
                    :header="'최종로그인일시'"
                    :binding="'field8'"
                    width="*"
                />
                <wj-flex-grid-column
                    :header="'상태'"
                    :binding="'field9'"
                    width="*"
                />
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

        <!-- sub title(탭 스타일) -->
        <div class="flex-container mt-20">
            <b-tabs nav-wrapper-class="ow-tabs type-main">
                <b-tab
                    v-for="(tab, index) in tabs"
                    :key="tab"
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
                <div class="control-btn align-right">
                    <button class="ow-btn type-state"><span>저장</span></button>
                </div>
            </template>
            <template v-if="currentTab == 1">
                <button class="ow-btn type-reference">
                    조회
                </button>
            </template>
            <!-- //control button -->
        </div>
        <!-- //control button -->
        <!-- //sub title(탭 스타일) -->
        <div class="tab-content">
            <div v-show="currentTab == 0">
                <!--  table -->
                <div class="ow-table-type-data">
                    <table class="">
                        <colgroup>
                            <col style="width:200px" />
                            <col />
                            <col style="width:200px" />
                            <col />
                            <col style="width:200px" />
                            <col />
                        </colgroup>
                        <tr>
                            <th>사번</th>
                            <td>
                                <span>25062810</span>
                            </td>
                            <th>이름</th>
                            <td>
                                <span>정재원 팀원 (사원)</span>
                            </td>
                            <th>부서</th>
                            <td>
                                <span>OW공통UI개발팀</span>
                            </td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td>
                                <span>070-4871-0131</span>
                            </td>
                            <th>휴대전화번호</th>
                            <td>
                                <span>010-5218-8445</span>
                            </td>
                            <th>이메일</th>
                            <td>
                                <span>jjwon@osstem.com</span>
                            </td>
                        </tr>
                        <tr>
                            <th>직군</th>
                            <td>
                                <span>연구개발</span>
                            </td>
                            <th>고용형태</th>
                            <td>
                                <span>정규직</span>
                            </td>
                            <th>상태</th>
                            <td>
                                <span>재직</span>
                            </td>
                        </tr>
                        <tr>
                            <th>입사일자</th>
                            <td>
                                <span>2020-06-28</span>
                            </td>
                            <th>퇴사일자</th>
                            <td>
                                <span></span>
                            </td>
                            <th>사용언어</th>
                            <td>
                                <div class="ow-select">
                                    <select>
                                        <option value="">ko</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>유효시작일자</th>
                            <td>
                                <span></span>
                            </td>
                            <th>유효종료일자</th>
                            <td>
                                <span></span>
                            </td>
                            <th>최종로그인일시</th>
                            <td>
                                <span>2020-09-01 11:36</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- // table -->
            </div>
            <div v-show="currentTab == 1">
                <!-- search -->
                <div class="search-zone">
                    <div class="row">
                        <div class="col-3">
                            <label class="t">로그인일자</label>
                            <div class="datapicker-wrap">
                                <div class="ow-input type-button">
                                    <date-picker
                                        id="dateTimeInput1"
                                        v-model="date"
                                        :config="options"
                                    ></date-picker>
                                    <label
                                        for="dateTimeInput1"
                                        class="btn-calendar"
                                    ></label>
                                </div>
                                <div class="mark">~</div>
                                <div class="ow-input type-button">
                                    <date-picker
                                        id="dateTimeInput2"
                                        v-model="date"
                                        :config="options"
                                    ></date-picker>
                                    <label
                                        for="dateTimeInput2"
                                        class="btn-calendar"
                                    ></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- //search -->
                <!-- grid -->
                <div class="ow-grid">
                    <wj-flex-grid
                        headersVisibility="Column"
                        selectionMode="0"
                        :itemsSource="resultTab2"
                    >
                        <wj-flex-grid-column :header="'번호'" :width="70">
                            <wj-flex-grid-cell-template
                                cellType="Cell"
                                v-slot="cell"
                            >
                                {{ cell.row.index + 1 }}
                            </wj-flex-grid-cell-template>
                        </wj-flex-grid-column>
                        <wj-flex-grid-column
                            :header="'로그인일자'"
                            :binding="'field2'"
                            :width="250"
                        />
                        <wj-flex-grid-column
                            :header="'IP주소'"
                            :binding="'field3'"
                            width="*"
                        />
                        <wj-flex-grid-column
                            :header="'로그인일시'"
                            :binding="'field4'"
                            :width="250"
                        />
                        <wj-flex-grid-column
                            :header="'로그아웃일시'"
                            :binding="'field5'"
                            :width="250"
                        />
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
                            <div class="counter-board">
                                전체 <span>999</span> 건
                            </div>
                        </div>
                    </div>
                </div>
                <!--// grid -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Menu",
    components: {},

    data: function() {
        return {
            currentTab: 0,
            tabs: ["상세정보", "접속이력"],
            visibleMenu31_P1: false,
            visibleMenu31_P2: false,
            pageable: true,
            date: new Date(),
            options: {
                format: "YYYY-MM-DD",
                useCurrent: false,
            },
            configs: {
                timePicker: {
                    format: "LT",
                    useCurrent: false,
                },
            },
            form: {
                time: null,
                startDate: null,
                endDate: null,
            },
            columns: [
                { title: "번호", field: "", width: "70px", cell: "cellNum1" },
                { title: "사번", field: "field2", width: "", cell: "cellNum2" },
                { title: "이름", field: "field3", width: "", cell: "cellNum3" },
                {
                    title: "사용언어",
                    field: "field4",
                    width: "*",
                    cell: "cellNum4",
                },
                { title: "부서", field: "field5", width: "", cell: "cellNum5" },
                {
                    title: "전화번호",
                    field: "field6",
                    width: "",
                    cell: "cellNum6",
                },
                {
                    title: "이메일",
                    field: "field7",
                    width: "",
                    cell: "cellNum7",
                },
                {
                    title: "최종로그인일시",
                    field: "field8",
                    width: "",
                    cell: "cellNum8",
                },
                { title: "상태", field: "field9", width: "", cell: "cellNum9" },
            ],
            result: [
                {
                    field1: "1",
                    field2: "28502810",
                    field3: "최관식",
                    field4: "ko",
                    field5: "OW공통개발실",
                    field6: "",
                    field7: "",
                    field8: "",
                    field9: "",
                },
                {
                    field1: "2",
                    field2: "28502801",
                    field3: "김범조",
                    field4: "ko",
                    field5: "OW공통개발팀",
                    field6: "",
                    field7: "",
                    field8: "",
                    field9: "",
                },
                {
                    field1: "3",
                    field2: "27502103",
                    field3: "김성태",
                    field4: "ko",
                    field5: "OW공통개발팀",
                    field6: "",
                    field7: "",
                    field8: "",
                    field9: "",
                },
                {
                    field1: "4",
                    field2: "27502106",
                    field3: "이강훈",
                    field4: "ko",
                    field5: "OW공통개발팀",
                    field6: "",
                    field7: "",
                    field8: "",
                    field9: "",
                },
                {
                    field1: "5",
                    field2: "27502108",
                    field3: "이명규",
                    field4: "ko",
                    field5: "OW공통개발팀",
                    field6: "",
                    field7: "",
                    field8: "",
                    field9: "",
                },
                {
                    field1: "6",
                    field2: "27502113",
                    field3: "정재원",
                    field4: "ko",
                    field5: "OW공통개발팀",
                    field6: "",
                    field7: "",
                    field8: "",
                    field9: "",
                },
            ],
            columnsTab2: [
                { title: "번호", field: "", width: "70px", cell: "cellNum1" },
                {
                    title: "로그인일자",
                    field: "field2",
                    width: "",
                    cell: "cellNum2",
                },
                {
                    title: "IP주소",
                    field: "field3",
                    width: "",
                    cell: "cellNum3",
                },
                {
                    title: "로그인일시",
                    field: "field4",
                    width: "*",
                    cell: "cellNum4",
                },
                {
                    title: "로그아웃일시",
                    field: "field5",
                    width: "",
                    cell: "cellNum5",
                },
                { title: "", field: "", width: "", cell: "cellNum6" },
            ],
            resultTab2: [
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    "": "",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    "": "",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    "": "",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    "": "",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    "": "",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
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
    methods: {
        onSearchByWord(e) {
            const word = this.searchForm.searchWord;
            if (!word) {
                this.showKendoAlertDialog("검색어를 입력하세요.");
                return;
            }
            const searchParams = {
                searchType: this.searchForm.searchType,
                searchWord: word,
            };
            this.getData(searchParams);
        },
        createRandomData(count) {
            return Array(count)
                .fill({})
                .map((_, idx) => ({
                    no: idx + 1,
                }));
        },
    },
};
</script>
