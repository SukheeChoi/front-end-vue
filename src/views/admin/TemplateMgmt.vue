<template>
    <!-- header -->
    <header class="headline-wrap">
        <h1 class="h1">메세지 템플릿</h1>
        <div>
            <button class="ow-btn type-reference">조회</button>
        </div>
    </header>
    <!-- //header -->
    <!-- search -->
    <div class="search-zone">
        <div class="row">
            <div class="col-3">
                <label class="t">템플릿그룹ID</label>
                <div class="ow-input" style="width: var(--input-w-200)">
                    <input type="text" />
                    <input type="submit" class="btn-search" />
                </div>
            </div>
            <div class="col-3">
                <label class="t">템플릿그룹명</label>
                <div class="ow-input" style="width: var(--input-w-200)">
                    <input type="text" />
                    <input type="submit" class="btn-search" />
                </div>
            </div>
            <div class="col-3">
                <label class="t">템플릿그룹유형</label>
                <div class="ow-select" style="width: var(--input-w-150)">
                    <select>
                        <option value="">시스템</option>
                        <option value="">사용자</option>
                    </select>
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
            <button class="ow-btn type-state"><span>저장</span></button>
            <button class="ow-btn type-state"><span>+</span></button>
            <button class="ow-btn type-state"><span>-</span></button>
            <button class="ow-btn type-state"><span>⌒</span></button>
        </div>
    </div>
    <!-- //control button -->

    <div class="ow-grid">
        <wj-flex-grid
            :itemsSource="result"
            :isReadOnly="true"
            headersVisibility="Column"
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
                :binding="'field0'"
                :width="70"
            >
                <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    {{ cell.row.index + 1 }}
                </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
            <wj-flex-grid-column
                :header="'템플릿그룹ID'"
                :binding="'field1'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'템플릿그룹명'"
                :binding="'field2'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'템플릿그룹유형'"
                :binding="'field3'"
                width="*"
            />
            <wj-flex-grid-column
                :header="'사용여부'"
                :binding="'field4'"
                width="*"
            />
            <wj-flex-grid-column :header="' '" :binding="'field6'" width="*" />
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
        <h2 class="h2">메세지 템플릿</h2>
    </div>
    <!-- //sub title -->

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
                <button class="ow-btn type-state" @click="wPopup.show(true)">
                    <span>추가</span>
                </button>
                <button class="ow-btn type-state" @click="wPopup.show(true)">
                    <span>수정</span>
                </button>
                <button class="ow-btn type-state"><span>삭제</span></button>
                <button class="ow-btn type-state"><span>⌒</span></button>
            </div>
        </template>
        <!-- //control button -->
    </div>

    <div class="tab-content">
        <div v-show="currentTab == 0">
            <!-- grid -->
            <div class="ow-grid">
                <wj-flex-grid
                    headersVisibility="Column"
                    selectionMode="0"
                    :itemsSource="result2"
                >
                    <wj-flex-grid-column
                        :header="'템플릿그룹ID'"
                        :binding="'field1'"
                        width="*"
                    />
                    <wj-flex-grid-column
                        :header="'템플릿그룹명'"
                        :binding="'field2'"
                        width="*"
                    />
                    <wj-flex-grid-column
                        :header="'유형'"
                        :binding="'field3'"
                        width="*"
                    />
                    <wj-flex-grid-column
                        :header="'메세지 제목'"
                        :binding="'field4'"
                        width="*"
                    />
                    <wj-flex-grid-column
                        :header="'내용 형식'"
                        :binding="'field5'"
                        width="*"
                    />
                    <wj-flex-grid-column
                        :header="'기본여부'"
                        :binding="'field6'"
                        width="*"
                    />
                    <wj-flex-grid-column
                        :header="'사용여부'"
                        :binding="'field7'"
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
                        <div class="counter-board">
                            전체 <span>999</span> 건
                        </div>
                    </div>
                </div>
            </div>
            <!--// grid -->
        </div>
    </div>
    <!-- //sub title(탭 스타일) -->

    <!-- wj-popup1 -->
    <wj-popup
        id="wPopup"
        class="modal-xl"
        :isDraggable="false"
        :initialized="initForm"
    >
        <header class="modal-header">
            <h5 class="modal-title">메세지 템플릿</h5>
            <button type="button" aria-label="Close" class="close wj-hide">
                ×
            </button>
        </header>
        <div class="modal-body ow-scroll-wrap" style="height:640px">
            <div class="layer-body">
                <div class="ow-flex-wrap mb-10">
                    <div class="item align-x-end">
                        <button class="ow-btn type-state">
                            <span>저장</span>
                        </button>
                    </div>
                </div>

                <!-- 상세 table -->
                <table class="ow-table-type-info">
                    <colgroup>
                        <col style="width:160px" />
                        <col style="width:30%" />
                        <col style="width:160px" />
                        <col style="width:50%" />
                    </colgroup>
                    <tr>
                        <th>템플릿 그룹ID</th>
                        <td>
                            <span>TM-S-000001</span>
                        </td>
                        <th>템플릿 그룹명</th>
                        <td>
                            <span>회원가입 축하 자동 발송 템플릿</span>
                        </td>
                    </tr>
                    <tr>
                        <th class="required">템플릿 유형</th>
                        <td>
                            <div class="ow-select">
                                <select name="" id="">
                                    <option value="" selected hidden
                                        >Email</option
                                    >
                                    <option value="">SMS</option>
                                    <option value="">Mobile Push</option>
                                    <option value="">Web Push</option>
                                    <option value="">Kakao</option>
                                </select>
                            </div>
                        </td>
                        <th class="required">기본여부</th>
                        <td>
                            <div class="ow-radio">
                                <input
                                    type="radio"
                                    id="ow-radio1"
                                    name="radio-group-3"
                                    checked
                                />
                                <label for="ow-radio1">Y</label>
                            </div>
                            <div class="ow-radio">
                                <input
                                    type="radio"
                                    id="ow-radio2"
                                    name="radio-group-3"
                                />
                                <label for="ow-radio2">N</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="required">메세지 제목</th>
                        <td colspan="5">
                            <div class="ow-input" style="">
                                <input type="text" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="required">메세지 내용</th>
                        <td colspan="5">
                            <textarea name="" id="" cols="137" rows="20">
                  ${custNm}님 감사합니다.
                </textarea
                            >
                        </td>
                    </tr>
                    <tr>
                        <th class="required">내용 형식</th>
                        <td>
                            <div class="ow-radio">
                                <input
                                    type="radio"
                                    id="ow-radio5"
                                    name="radio-group-1"
                                    checked
                                />
                                <label for="ow-radio5">HTML</label>
                            </div>
                            <div class="ow-radio">
                                <input
                                    type="radio"
                                    id="ow-radio6"
                                    name="radio-group-1"
                                />
                                <label for="ow-radio6">TEXT</label>
                            </div>
                        </td>
                        <th class="required">시용여부</th>
                        <td>
                            <div class="ow-radio">
                                <input
                                    type="radio"
                                    id="ow-radio3"
                                    name="radio-group-2"
                                    checked
                                />
                                <label for="ow-radio3">Y</label>
                            </div>
                            <div class="ow-radio">
                                <input
                                    type="radio"
                                    id="ow-radio4"
                                    name="radio-group-2"
                                />
                                <label for="ow-radio4">N</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>최초등록자</th>
                        <td>
                            <span></span>
                        </td>
                        <th>최초등록일시</th>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                    <tr>
                        <th>최종수정자</th>
                        <td>
                            <span></span>
                        </td>
                        <th>최종수정일시</th>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </table>

                <!-- //상세 table -->
            </div>
        </div>
    </wj-popup>
    <!-- //wj-popup1 -->
</template>

<script>
export default {
    name: "admin",
    components: {},

    data: function() {
        return {
            currentTab: 0,
            tabs: ["메세지 템플릿"],
            visibleMenu56_P1: false,
            pageable: true,
            result: [
                {
                    field1: "TM-S-000001",
                    field2: "회원가입 축하 자동 발송 템플릿",
                    field3: "시스템",
                    field4: "Y",
                },
                {
                    field1: "TM-S-000001",
                    field2: "회원가입 축하 자동 발송 템플릿",
                    field3: "시스템",
                    field4: "Y",
                },
                {
                    field1: "TM-S-000001",
                    field2: "회원가입 축하 자동 발송 템플릿",
                    field3: "시스템",
                    field4: "Y",
                },
            ],
            result2: [
                {
                    field1: "TM-S-000001",
                    field2: "회원가입 축하 자동 발송 템플릿",
                    field3: "Email",
                    field4: "{()} 님 가입을 축하합니다.",
                    field5: "html",
                    field6: "Y",
                    field7: "Y",
                },
                {
                    field1: "TM-S-000001",
                    field2: "회원가입 축하 자동 발송 템플릿",
                    field3: "Email",
                    field4: "{()} 님 가입을 축하합니다.",
                    field5: "html",
                    field6: "Y",
                    field7: "Y",
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
