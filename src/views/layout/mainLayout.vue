<template>
    <div id="main">
        <Header />
        <!-- wrap -->
        <div id="wrap" class="wrap">
            <!-- content -->
            <div class="content">
                <div class="content_tab">
                    <b-tabs nav-wrapper-class="nav-tabs-wrap" v-model="tabIdx">
                        <b-tab
                            v-for="tab in tabs"
                            :key="tab"
                            :title="tab"
                            lazy
                            @click="changeComponent(tab)"
                        >
                            <template #title>
                                <strong>{{ tab }}</strong>
                            </template>
                        </b-tab>
                    </b-tabs>
                </div>
                <div class="content_body">
                    <div class="container-fluid">
                        <div class="row">
                            <!-- left -->
                            <div class="col fix-left">
                                <!-- ow-panel -->
                                <div class="ow-panel">
                                    <div class="ow-panel-header">
                                        <div class="ow-panel-title">
                                            Action Plan
                                        </div>
                                        <div class="ow-panel-side">side</div>
                                    </div>
                                    <div class="ow-panel-body">
                                        <div class="ow-panel-top">
                                            <h4>10-28(목)</h4>
                                            <div class="d-flex ml-auto">
                                                <button
                                                    v-for="(tab, index) in tabs"
                                                    :key="index"
                                                    :class="{
                                                        checkedOn:
                                                            currentTab ===
                                                            index,
                                                    }"
                                                    @click="currentTab = index"
                                                    class="ow-btn type-icon layout"
                                                >
                                                    <span class="sr-only">{{
                                                        tab
                                                    }}</span>
                                                </button>
                                            </div>
                                        </div>
                                        <!-- 캘린더 영역 -->
                                        <div class="grid-schedule-area">
                                            <!-- 시간 바 -->
                                            <div
                                                class="current-time-bar"
                                                style="top:calc(34px + 24px * 4)"
                                            ></div>
                                            <!-- //시간 바 -->
                                            <!-- 캘린더 -->
                                            <div class="grid-schedule xs">
                                                <!-- 1st -->
                                                <div v-show="currentTab == 0">
                                                    <table>
                                                        <colgroup>
                                                            <col width="45px" />
                                                            <col width="*" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>시간</th>
                                                                <th>할일</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >09:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label"
                                                                        >
                                                                            개별
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >중립과제
                                                                            점검
                                                                            물류기획,
                                                                            국내
                                                                            물류,해외물류
                                                                            법인물류</span
                                                                        >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox ml-2"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk1"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk1"
                                                                                ></label>
                                                                            </div>
                                                                            <button
                                                                                class="ow-btn type-icon clock"
                                                                            >
                                                                                <span
                                                                                    class="sr-only"
                                                                                    >시계
                                                                                    아이콘</span
                                                                                >
                                                                            </button>
                                                                            <input
                                                                                class=""
                                                                                type="text"
                                                                                value="09:00~10:00"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >10:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox ml-2"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk2"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk2"
                                                                                ></label>
                                                                            </div>
                                                                            <button
                                                                                class="ow-btn type-icon clock"
                                                                            >
                                                                                <span
                                                                                    class="sr-only"
                                                                                    >시계
                                                                                    아이콘</span
                                                                                >
                                                                            </button>
                                                                            <input
                                                                                class=""
                                                                                type="text"
                                                                                value="09:00~10:00"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >11:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label"
                                                                        >
                                                                            개별
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >(국내물류
                                                                            )상품발주요청
                                                                            검토
                                                                            및
                                                                            결재</span
                                                                        >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox ml-2"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk3"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk3"
                                                                                ></label>
                                                                            </div>
                                                                            <button
                                                                                class="ow-btn type-icon clock"
                                                                            >
                                                                                <span
                                                                                    class="sr-only"
                                                                                    >시계
                                                                                    아이콘</span
                                                                                >
                                                                            </button>
                                                                            <input
                                                                                type="text"
                                                                                value="09:00~10:00"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >12:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >13:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label green"
                                                                        >
                                                                            회의
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >입고진행
                                                                            점검
                                                                            -
                                                                            국내물류,
                                                                            해외물류</span
                                                                        >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox ml-2"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk4"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk4"
                                                                                ></label>
                                                                            </div>
                                                                            <button
                                                                                class="ow-btn type-icon clock"
                                                                            >
                                                                                <span
                                                                                    class="sr-only"
                                                                                    >시계
                                                                                    아이콘</span
                                                                                >
                                                                            </button>
                                                                            <input
                                                                                type="text"
                                                                                value="09:00~10:00"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >14:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label"
                                                                        >
                                                                            개별
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >채용면접</span
                                                                        >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox ml-2"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk5"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk5"
                                                                                ></label>
                                                                            </div>
                                                                            <button
                                                                                class="ow-btn type-icon clock"
                                                                            >
                                                                                <span
                                                                                    class="sr-only"
                                                                                    >시계
                                                                                    아이콘</span
                                                                                >
                                                                            </button>
                                                                            <input
                                                                                type="text"
                                                                                value="09:00~10:00"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >15:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >16:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label green"
                                                                        >
                                                                            회의
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >출고진행점검-국내물류,
                                                                            해외물류</span
                                                                        >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox ml-2"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk6"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk6"
                                                                                ></label>
                                                                            </div>
                                                                            <button
                                                                                class="ow-btn type-icon clock"
                                                                            >
                                                                                <span
                                                                                    class="sr-only"
                                                                                    >시계
                                                                                    아이콘</span
                                                                                >
                                                                            </button>
                                                                            <input
                                                                                type="text"
                                                                                value="09:00~10:00"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >17:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label green"
                                                                        >
                                                                            회의
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >재고점검-국내물류,해외물류</span
                                                                        >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox ml-2"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk7"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk7"
                                                                                ></label>
                                                                            </div>
                                                                            <button
                                                                                class="ow-btn type-icon clock"
                                                                            >
                                                                                <span
                                                                                    class="sr-only"
                                                                                    >시계
                                                                                    아이콘</span
                                                                                >
                                                                            </button>
                                                                            <input
                                                                                type="text"
                                                                                value="09:00~10:00"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >18:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!-- //1st -->
                                                <!-- 2nd -->
                                                <div v-show="currentTab == 1">
                                                    <table>
                                                        <colgroup>
                                                            <col width="45px" />
                                                            <col width="*" />
                                                            <col width="*" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>시간</th>
                                                                <th>할일</th>
                                                                <th>한일</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >09:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label"
                                                                        >
                                                                            개별
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >중립과제
                                                                            점검
                                                                            물류기획,
                                                                            국내
                                                                            물류,해외물류
                                                                            법인물류</span
                                                                        >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk2-1"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk2-1"
                                                                                ></label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label"
                                                                        >
                                                                            개별
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >중립과제
                                                                            점검
                                                                            물류기획,
                                                                            국내
                                                                            물류,해외물류
                                                                            법인물류</span
                                                                        >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk2-2"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk2-2"
                                                                                ></label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >10:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >11:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label"
                                                                        >
                                                                            개별
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >(국내물류
                                                                            )상품발주요청
                                                                            검토
                                                                            및
                                                                            결재</span
                                                                        >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk2-3"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk2-3"
                                                                                ></label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label"
                                                                        >
                                                                            개별
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >(국내물류
                                                                            )상품발주요청
                                                                            검토
                                                                            및
                                                                            결재</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >12:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >13:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label green"
                                                                        >
                                                                            회의
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >입고진행
                                                                            점검
                                                                            -
                                                                            국내물류,
                                                                            해외물류</span
                                                                        >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk2-4"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk2-4"
                                                                                ></label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label green"
                                                                        >
                                                                            회의
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >입고진행
                                                                            점검
                                                                            -
                                                                            국내물류,
                                                                            해외물류</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >14:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label"
                                                                        >
                                                                            개별
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >채용면접</span
                                                                        >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox ml-2"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk2-5"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk2-5"
                                                                                ></label>
                                                                            </div>
                                                                            <button
                                                                                class="ow-btn type-icon clock"
                                                                            >
                                                                                <span
                                                                                    class="sr-only"
                                                                                    >시계
                                                                                    아이콘</span
                                                                                >
                                                                            </button>
                                                                            <input
                                                                                type="text"
                                                                                value="09:00~10:00"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label"
                                                                        >
                                                                            개별
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >채용면접</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >15:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >16:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label green"
                                                                        >
                                                                            회의
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >출고진행점검-국내물류,
                                                                            해외물류</span
                                                                        >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox ml-2"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk2-6"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk2-6"
                                                                                ></label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label green"
                                                                        >
                                                                            회의
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >출고진행점검-국내물류,
                                                                            해외물류</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >17:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label green"
                                                                        >
                                                                            회의
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >재고점검-국내물류,해외물류</span
                                                                        >
                                                                        <div
                                                                            class="option"
                                                                        >
                                                                            <div
                                                                                class="ow-checkbox ml-2"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="ow-chk2-7"
                                                                                />
                                                                                <label
                                                                                    for="ow-chk2-7"
                                                                                ></label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label green"
                                                                        >
                                                                            회의
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >재고점검-국내물류,해외물류</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >18:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!-- //2nd -->
                                                <!-- 3rd -->
                                                <div v-show="currentTab == 2">
                                                    <table>
                                                        <colgroup>
                                                            <col width="45px" />
                                                            <col width="*" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>시간</th>
                                                                <th>한일</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >09:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label"
                                                                        >
                                                                            개별
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >중립과제
                                                                            점검
                                                                            물류기획,
                                                                            국내
                                                                            물류,해외물류
                                                                            법인물류</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >10:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >11:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label"
                                                                        >
                                                                            개별
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >(국내물류
                                                                            )상품발주요청
                                                                            검토
                                                                            및
                                                                            결재</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >12:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >13:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label green"
                                                                        >
                                                                            회의
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >입고진행
                                                                            점검
                                                                            -
                                                                            국내물류,
                                                                            해외물류</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >14:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label"
                                                                        >
                                                                            개별
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >채용면접</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-blue"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-blue"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >15:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >16:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label green"
                                                                        >
                                                                            회의
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >출고진행점검-국내물류,
                                                                            해외물류</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >17:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                >
                                                                    <div
                                                                        class="gs-content"
                                                                    >
                                                                        <div
                                                                            class="gs-label green"
                                                                        >
                                                                            회의
                                                                        </div>
                                                                        <span
                                                                            class="text"
                                                                            >재고점검-국내물류,해외물류</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd bg-color-yellow"
                                                                ></td>
                                                                <td
                                                                    class="customtd input-td bg-color-yellow"
                                                                ></td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    class="customtd"
                                                                >
                                                                    <div>
                                                                        <span
                                                                            >18:00</span
                                                                        >
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    class="customtd input-td"
                                                                ></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!-- //3rd -->
                                            </div>
                                            <!-- //캘린더 -->
                                        </div>
                                        <!-- //캘린더 영역 -->
                                    </div>
                                </div>
                                <!-- //ow-panel -->
                                <!-- ow-panel -->
                                <div class="ow-panel mt-4">
                                    <div class="ow-panel-header">
                                        <div class="ow-panel-title">결재함</div>
                                        <div class="ow-panel-side">
                                            <button
                                                class="ow-btn type-icon add"
                                            >
                                                <span class="sr-only"
                                                    >new tab</span
                                                >
                                            </button>
                                            <button
                                                class="ow-btn type-icon modify"
                                            >
                                                <span class="sr-only"
                                                    >modal</span
                                                >
                                            </button>
                                        </div>
                                    </div>
                                    <div class="ow-panel-body">
                                        <!-- 상단 탭 -->
                                        <ul class="summary-list pt-5 pb-5 mb-5">
                                            <li
                                                v-for="(tab, index) in DocuTabs"
                                                :key="index"
                                                :class="{
                                                    'k-state-active':
                                                        currentDocuTab ===
                                                        index,
                                                }"
                                                @click="currentDocuTab = index"
                                                class="ow-btn"
                                            >
                                                <span class="head">{{
                                                    tab
                                                }}</span>
                                                <span class="head point">{{
                                                    Math.floor(
                                                        Math.random() *
                                                            (10 - 1 + 1)
                                                    ) + 1
                                                }}</span>
                                                <span class="head">건</span>
                                            </li>
                                        </ul>
                                        <!-- //상단 탭 -->
                                        <div
                                            v-show="currentDocuTab == 0"
                                            class="tab-content"
                                        >
                                            <!-- 대기 -->
                                            <table
                                                class="ow-table table-striped"
                                            >
                                                <colgroup>
                                                    <col width="*" />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td"
                                                        >
                                                            <div
                                                                class="gs-content d-flex"
                                                            >
                                                                <a
                                                                    href="javascript:void(0);"
                                                                >
                                                                    <span
                                                                        class="text"
                                                                        >(OW공통개발팀)정보시스템
                                                                        지원
                                                                        요청</span
                                                                    >
                                                                </a>
                                                                <div
                                                                    class="option d-flex ml-auto"
                                                                >
                                                                    <div
                                                                        class="progress"
                                                                        style="width: 100px;"
                                                                    >
                                                                        <div
                                                                            role="progressbar"
                                                                            aria-valuemin="0"
                                                                            aria-valuemax="4"
                                                                            aria-valuenow="1"
                                                                            class="progress-bar"
                                                                            style="width: 25%; font-size: 0px;"
                                                                        >
                                                                            25
                                                                        </div>
                                                                    </div>
                                                                    <span
                                                                        class="ml-5"
                                                                        >1/4</span
                                                                    >
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td"
                                                        ></td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td"
                                                        ></td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td"
                                                        ></td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td"
                                                        ></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div
                                            v-show="currentDocuTab == 1"
                                            class="tab-content"
                                        >
                                            <!-- 진행 -->
                                            <table
                                                class="ow-table table-striped"
                                            >
                                                <colgroup>
                                                    <col width="*" />
                                                    <col width="100px" />
                                                    <col width="30px" />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td bg-color-blue-2"
                                                        >
                                                            <div
                                                                class="gs-content"
                                                            >
                                                                <a
                                                                    href="javascript:void(0);"
                                                                >
                                                                    <span
                                                                        class="text"
                                                                        >(OW공통개발팀)정보시스템
                                                                        지원
                                                                        요청</span
                                                                    >
                                                                </a>
                                                                <!-- <a>
                                  <span class="ml-10">NEW</span>
                                </a> -->
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                <span
                                                                    >PROGRESS</span
                                                                >
                                                                <!-- <span><img src="@/assets/images/demo/1111/img-progress_bar.png" alt="" width="90px"></span > -->
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                NEW
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td"
                                                        >
                                                            <div
                                                                class="gs-content"
                                                            >
                                                                <a
                                                                    href="javascript:void(0);"
                                                                >
                                                                    <span
                                                                        class="text"
                                                                        >(OW공통개발팀)노트북,
                                                                        모니터
                                                                        구매
                                                                        신청</span
                                                                    >
                                                                </a>
                                                                <!-- <a>
                                  <span class="ml-10">NEW</span>
                                </a> -->
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                <span
                                                                    >PROGRESS</span
                                                                >
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                NEW
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td bg-color-blue-2"
                                                        >
                                                            <div
                                                                class="gs-content"
                                                            >
                                                                <a
                                                                    href="javascript:void(0);"
                                                                >
                                                                    <span
                                                                        class="text"
                                                                        >(OW공통개발팀)신규입사자
                                                                        방화벽
                                                                        접속
                                                                        허용
                                                                        요청</span
                                                                    >
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                <span
                                                                    >PROGRESS</span
                                                                >
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                NEW
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td"
                                                        >
                                                            <div
                                                                class="gs-content"
                                                            >
                                                                <a
                                                                    href="javascript:void(0);"
                                                                >
                                                                    <span
                                                                        class="text"
                                                                        >(OW공통개발팀)IP
                                                                        Phone
                                                                        신규
                                                                        사용
                                                                        요청</span
                                                                    >
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                <span
                                                                    >PROGRESS</span
                                                                >
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                NEW
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td bg-color-blue-2"
                                                        >
                                                            <div
                                                                class="gs-content"
                                                            >
                                                                <a
                                                                    href="javascript:void(0);"
                                                                >
                                                                    <span
                                                                        class="text"
                                                                        >(OW공통개발팀)뱃지,
                                                                        수첩,
                                                                        다이어리
                                                                        지급
                                                                        요청</span
                                                                    >
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                <span
                                                                    >PROGRESS</span
                                                                >
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                NEW
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div
                                            v-show="currentDocuTab == 2"
                                            class="tab-content"
                                        >
                                            <!-- 완료 -->
                                            <table
                                                class="ow-table table-striped"
                                            >
                                                <colgroup>
                                                    <col width="*" />
                                                    <col width="100px" />
                                                    <col width="30px" />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td bg-color-blue-2"
                                                        >
                                                            <div
                                                                class="gs-content"
                                                            >
                                                                <a
                                                                    href="javascript:void(0);"
                                                                >
                                                                    <span
                                                                        class="text"
                                                                        >(OW공통개발팀)정보시스템
                                                                        지원
                                                                        요청</span
                                                                    >
                                                                </a>
                                                                <!-- <a>
                                  <span class="ml-10">NEW</span>
                                </a> -->
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                <span
                                                                    >PROGRESS</span
                                                                >
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                NEW
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td"
                                                        >
                                                            <div
                                                                class="gs-content"
                                                            >
                                                                <a
                                                                    href="javascript:void(0);"
                                                                >
                                                                    <span
                                                                        class="text"
                                                                        >(OW공통개발팀)노트북,
                                                                        모니터
                                                                        구매
                                                                        신청</span
                                                                    >
                                                                </a>
                                                                <!-- <a>
                                  <span class="ml-10">NEW</span>
                                </a> -->
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                <span
                                                                    >PROGRESS</span
                                                                >
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                NEW
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td bg-color-blue-2"
                                                        >
                                                            <div
                                                                class="gs-content"
                                                            >
                                                                <a
                                                                    href="javascript:void(0);"
                                                                >
                                                                    <span
                                                                        class="text"
                                                                        >(OW공통개발팀)신규입사자
                                                                        방화벽
                                                                        접속
                                                                        허용
                                                                        요청</span
                                                                    >
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                <span
                                                                    >PROGRESS</span
                                                                >
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                NEW
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td"
                                                        >
                                                            <div
                                                                class="gs-content"
                                                            >
                                                                <a
                                                                    href="javascript:void(0);"
                                                                >
                                                                    <span
                                                                        class="text"
                                                                        >(OW공통개발팀)IP
                                                                        Phone
                                                                        신규
                                                                        사용
                                                                        요청</span
                                                                    >
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                <span
                                                                    >PROGRESS</span
                                                                >
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                NEW
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td bg-color-blue-2"
                                                        >
                                                            <div
                                                                class="gs-content"
                                                            >
                                                                <a
                                                                    href="javascript:void(0);"
                                                                >
                                                                    <span
                                                                        class="text"
                                                                    ></span>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                <span></span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div
                                                                class="option"
                                                            ></div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div
                                            v-show="currentDocuTab == 3"
                                            class="tab-content"
                                        >
                                            <!-- 반려 -->
                                            <table
                                                class="ow-table table-striped"
                                            >
                                                <colgroup>
                                                    <col width="*" />
                                                    <col width="100px" />
                                                    <col width="30px" />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td bg-color-blue-2"
                                                        >
                                                            <div
                                                                class="gs-content"
                                                            >
                                                                <a
                                                                    href="javascript:void(0);"
                                                                >
                                                                    <span
                                                                        class="text"
                                                                        >(OW공통개발팀)정보시스템
                                                                        지원
                                                                        요청</span
                                                                    >
                                                                </a>
                                                                <!-- <a>
                                  <span class="ml-10">NEW</span>
                                </a> -->
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                <span
                                                                    >PROGRESS</span
                                                                >
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                NEW
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td"
                                                        >
                                                            <div
                                                                class="gs-content"
                                                            >
                                                                <a
                                                                    href="javascript:void(0);"
                                                                >
                                                                    <span
                                                                        class="text"
                                                                        >(OW공통개발팀)IP
                                                                        Phone
                                                                        신규
                                                                        사용
                                                                        요청</span
                                                                    >
                                                                </a>
                                                                <!-- <a>
                                  <span class="ml-10">NEW</span>
                                </a> -->
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                <span
                                                                    >PROGRESS</span
                                                                >
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="option">
                                                                NEW
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd  bg-color-blue-2 input-td"
                                                        ></td>
                                                        <td>
                                                            <div class="option">
                                                                <!-- <span>PROGRESS</span> -->
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div
                                                                class="option"
                                                            ></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd input-td"
                                                        ></td>
                                                        <td>
                                                            <div class="option">
                                                                <!-- <span>PROGRESS</span> -->
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div
                                                                class="option"
                                                            ></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="customtd  bg-color-blue-2 input-td"
                                                        ></td>
                                                        <td>
                                                            <div class="option">
                                                                <!-- <span>PROGRESS</span> -->
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div
                                                                class="option"
                                                            ></div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- //ow-panel -->
                            </div>
                            <!-- //left -->
                            <!-- right -->
                            <div class="col">
                                <!--dashboard-->
                                <Dashboard
                                    :tiles="tiles"
                                    @remove-tile="removeTile"
                                    @drag-start="dragStart"
                                    @drag-over="dragOver"
                                    @drag-finish="dragFinish"
                                    @drag-end="dragEnd"
                                />
                                <keep-alive>
                                    <component
                                        v-bind:is="selectedComponent"
                                    ></component>
                                </keep-alive>
                            </div>
                            <!-- //right -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- //content -->
        </div>
        <!-- //wrap -->

        <!-- toast -->
        <transition name="slide-fade" appear>
            <template v-if="toastShow">
                <div
                    class="ow-toast fixed-postion-bottom-right"
                    ref="toast"
                    @click="sidebarShowUpdate"
                >
                    <div class="toast-area">
                        <div class="toast-wrap">
                            <div class="toast-top">
                                <ul class="summary-list xs">
                                    <li>
                                        <span class="head">홍길동</span>
                                    </li>
                                    <li>
                                        <span>물류본부</span>
                                    </li>
                                    <li>
                                        <span>10-22 11:50</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="toast-contents">
                                <p class="text-para">
                                    AA 제품 피킹 완료 - 주문서 내역을 확인후
                                    빠른 처리가 요구됩니다. 처리후 관련 내역을
                                    담당 부서에 통보해처리후 관련 내역을 담당
                                    부서에 통보해
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </transition>
        <!-- //toast -->

        <!-- side -->
        <template v-if="sidebarShow">
            <div id="sidebar" ref="sidebar">
                <transition appear name="custom-classes-transition">
                    <!-- toast black bg -->
                    <div class="ow-toast toast-slide">
                        <!-- toast black bg top -->
                        <div class="toast-area-top mb-15">
                            <button
                                class="ow-btn type-icon arrow"
                                @click="sidebarShowUpdate"
                            >
                                <i class="triangle right"></i>
                                <i class="triangle right"></i>
                                <span class="sr-only">닫기</span>
                            </button>
                        </div>
                        <div class="toast-top-option mb-20">
                            <select class="ow-select dark">
                                <option>국내물류영업팀</option>
                                <option>국내물류영업팀</option>
                            </select>
                            <select class="ow-select dark ml-2">
                                <option>피킹</option>
                                <option>피킹</option>
                            </select>
                        </div>
                        <!-- //toast black bg top -->
                        <!-- 1st toast -->
                        <template v-if="sidebarShow">
                            <div class="toast">
                                <div class="toast-body">
                                    <div class="toast-area">
                                        <div class="toast-wrap">
                                            <div class="toast-top mb-10">
                                                <ul class="summary-list xs">
                                                    <li>
                                                        <span class="head"
                                                            >홍길동</span
                                                        >
                                                    </li>
                                                    <li>
                                                        <span>물류본부</span>
                                                    </li>
                                                    <li>
                                                        <span>10-22 11:50</span>
                                                    </li>
                                                </ul>
                                                <button
                                                    class="ow-btn type-icon cross"
                                                >
                                                    <i class="cross"></i>
                                                    <div class="sr-only">
                                                        닫기
                                                    </div>
                                                </button>
                                            </div>
                                            <div class="toast-contents">
                                                <p class="text-para">
                                                    AA 제품 피킹 완료 - 주문서
                                                    내역을 확인후 빠른 처리
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <!-- //1st toast -->
                        <!-- 2nd toast -->
                        <template v-if="sidebarShow">
                            <div class="toast">
                                <div class="toast-body">
                                    <div class="toast-area">
                                        <div class="toast-wrap">
                                            <div class="toast-top mb-10">
                                                <ul class="summary-list xs">
                                                    <li>
                                                        <span class="head"
                                                            >홍길동</span
                                                        >
                                                    </li>
                                                    <li>
                                                        <span>물류본부</span>
                                                    </li>
                                                    <li>
                                                        <span>10-22 11:50</span>
                                                    </li>
                                                </ul>
                                                <button
                                                    class="ow-btn type-icon cross"
                                                >
                                                    <i class="cross"></i>
                                                    <div class="sr-only">
                                                        닫기
                                                    </div>
                                                </button>
                                            </div>
                                            <div class="toast-contents">
                                                <p class="text-para">
                                                    AA 제품 피킹 완료 - 주문서
                                                    내역을 확인후 빠른 처리가
                                                    요구됩니다. 처리후 관련
                                                    내역을 담당 부서에
                                                    통보해주시기 바랍니다. 관련
                                                    부서는 국내물류운영팀이며
                                                    담당자는 고길동입니다.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <!-- //2nd toast -->
                        <!-- toast black bg bottom -->
                        <div class="toast-area-bottom">
                            <ul class="summary-list xs">
                                <li>
                                    <a href="javascript:void(0)">
                                        <span>설정</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <span>모든알림지우기</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <!-- //toast black bg bottom -->
                    </div>
                    <!-- //toast black bg -->
                </transition>
            </div>
        </template>
        <!-- //side -->
    </div>
</template>

<script src="@/views/layout/script/mainLayout.js" />

<style lang="sass">
@import '@/assets/ow-admin.scss'
</style>
