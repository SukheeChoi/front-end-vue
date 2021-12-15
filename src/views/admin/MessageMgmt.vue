<template>
    <!-- header -->
    <header class="headline-wrap">
        <h1 class="h1">메세지소스</h1>
        <div>
            <button class="ow-btn type-state" @click="wPopup.show(true)">
                <span>엑셀Import</span>
            </button>
            <button class="ow-btn type-state"><span>엑셀Export</span></button>
            <button class="ow-btn type-state"><span>조회</span></button>
        </div>
    </header>
    <!-- //header -->
    <!-- search -->
    <div class="search-zone">
        <div class="row">
            <div class="col-3">
                <label class="t">번들</label>
                <div class="ow-select" style="width: var(--input-w-150)">
                    <select>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                </div>
            </div>
            <div class="col-3">
                <label class="t">메세지 키</label>
                <div class="ow-input" style="width: var(--input-w-200)">
                    <input type="text" />
                </div>
            </div>
            <div class="col-3">
                <label class="t">메세지 실행</label>
                <div class="ow-input" style="width: var(--input-w-200)">
                    <input type="text" />
                </div>
            </div>
            <div class="col-3">
                <label class="t">언어</label>
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
    <div class="ow-flex-wrap mt-20">
        <div class="item align-x-end">
            <button class="ow-btn type-state"><span>저장</span></button>
            <button class="ow-btn type-state"><span>+</span></button>
            <button class="ow-btn type-state"><span>-</span></button>
            <button class="ow-btn type-state refresh"><span></span></button>
        </div>
    </div>
    <!-- //control button -->
    <div class="ow-grid mt-10">
        <wj-flex-grid
            headersVisibility="Column"
            :selectionMode="'ListBox'"
            :itemsSource="result"
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
            <!-- 넘버링 -->
            <wj-flex-grid-column :header="'번호'" :width="70">
                <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    {{ cell.row.index + 1 }}
                </wj-flex-grid-cell-template>
            </wj-flex-grid-column>

            <!-- select 삽입 -->
            <wj-flex-grid-column
                :header="'번들'"
                :binding="'field2'"
                :width="200"
            />

            <wj-flex-grid-column
                :header="'언어'"
                :binding="'field3'"
                :width="'*'"
            />
            <wj-flex-grid-column
                :header="'메세지 키'"
                :binding="'field4'"
                :width="'*'"
            />
            <wj-flex-grid-column
                :header="'메세지 실행'"
                :binding="'field5'"
                :width="'*'"
            />
            <wj-flex-grid-column
                :header="'최종 업데이트 일자'"
                :binding="'field6'"
                :width="'*'"
            >
                <wj-flex-grid-cell-template
                    cellType="ColumnHeader"
                    :autoSizeRows="false"
                    v-slot="cell"
                >
                    {{ cell.col.header }}
                    <div class="ow-input" style="position: initial;">
                        <input type="submit" class="btn-search" />
                    </div>
                </wj-flex-grid-cell-template>
            </wj-flex-grid-column>
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

    <!-- wj-popup xl -->
    <wj-popup
        id="wPopup"
        class="modal-xl"
        :isDraggable="false"
        :initialized="initForm"
    >
        <header class="modal-header">
            <h5 class="modal-title">메세지소스 업로드</h5>
            <button type="button" aria-label="Close" class="close wj-hide">
                ×
            </button>
        </header>
        <div class="modal-body ow-scroll-wrap" style="height:640px">
            <div class="layer-body">
                <div class="ow-flex-wrap mb-10">
                    <div class="item align-x-end">
                        <button class="ow-btn type-state">
                            <span>템플릿다운로드</span>
                        </button>
                        <button class="ow-btn type-state">
                            <span>행삭제</span>
                        </button>
                        <button class="ow-btn type-state">
                            <span>저장</span>
                        </button>
                    </div>
                </div>
                <!-- search -->
                <div class="search-zone">
                    <div class="ow-input" style="width: var(--input-w-200)">
                        <input type="file" id="upload-file" />
                    </div>
                </div>
                <!-- //search -->

                <!-- grid -->
                <div class="ow-grid mt-10">
                    <wj-flex-grid
                        headersVisibility="Column"
                        :selectionMode="'ListBox'"
                        :itemsSource="resultPop"
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
                            :header="'번들'"
                            :binding="'field2'"
                            :width="70"
                        />
                        <wj-flex-grid-column
                            :header="'언어'"
                            :binding="'field3'"
                            :width="70"
                        />
                        <wj-flex-grid-column
                            :header="'메세지 키'"
                            :binding="'field4'"
                            :width="200"
                        />
                        <wj-flex-grid-column
                            :header="'메세지 설명'"
                            :binding="'field5'"
                            :width="200"
                        />
                        <wj-flex-grid-column
                            :header="'에러 여부'"
                            :binding="'field6'"
                            :width="200"
                        />
                        <wj-flex-grid-column
                            :header="'에러 메세지'"
                            :binding="'field7'"
                            :width="200"
                        />
                    </wj-flex-grid>
                </div>
                <!--// grid -->
            </div>
        </div>
    </wj-popup>
    <!-- //wj-popup xl -->
</template>

<script>
export default {
    name: "메세지보기",
    components: {},

    data: function() {
        return {
            visibleMenu54_P1: false,
            result: [
                {
                    id: "1",
                    field2: "btn",
                    field3: "ko",
                    field4: "cmm btn batExecuteimmediate",
                    field5: "배치즉시실행",
                    field6: "2021-09-14",
                    "": "",
                },
                {
                    id: "2",
                    field2: "btn",
                    field3: "en",
                    field4: "cmm.btn.batExecuteImmediate",
                    field5: "Batch Immediate Exec",
                    field6: "2020-07-02",
                    "": "",
                },
                {
                    id: "3",
                    field2: "error",
                    field3: "ko",
                    field4: "cmm.err.canNotChangeToCurrentPasswd",
                    field5: "현재 사용중인 비밀번호로는 변경할 수 없습니다.",
                    field6: "2020-06-30",
                    "": "",
                },
                {
                    id: "4",
                    field2: "error",
                    field3: "ko",
                    field4: "cmm.err.idgnr.select.idblock",
                    field5: "ID 생성 조회 과정에서 에러가 발생하였습니다.",
                    field6: "2020-05-08",
                    "": "",
                },
                {
                    id: "5",
                    field2: "error",
                    field3: "ko",
                    field4: "cmm.err.idgnr.update.idblock",
                    field5: "ID 생성 업데이트 과정에서 에러가 발생하였습니다.",
                    field6: "2020-05-08",
                    "": "",
                },
                {
                    id: "6",
                    field2: "error",
                    field3: "ko",
                    field4: "cmm.err.invalid.currentPw",
                    field5: "현재 비밀번호가 올바르지 않습니다.",
                    field6: "2020-06-24",
                    "": "",
                },
                {
                    id: "7",
                    field2: "error",
                    field3: "ko",
                    field4: "cmm.err.invalid.prevPasswd",
                    field5: "이전에 사용된 비밀번호입니다.",
                    field6: "2020-06-24",
                    "": "",
                },
            ],
            resultPop: [
                {
                    "": "",
                    field2: "btn",
                    field3: "ko",
                    field4: "cmm btn batExecuteimmediate",
                    field5: "배치즉시실행",
                    field6: "Y",
                    field7: "중복데이터",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    field6: "",
                    field7: "",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    field6: "",
                    field7: "",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    field6: "",
                    field7: "",
                },
                {
                    "": "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    field6: "",
                    field7: "",
                },
                // { "":"", "field2":"", "field3":"", "field4":"", "field5":"", "field6":"", "field7":"" },
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

<style lang="scss" scoped>
@import "~@/assets/ow-admin";
</style>
