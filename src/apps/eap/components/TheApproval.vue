<template>
  <!-- ow-panel -->
  <div class="ow-panel mt-4">
    <div class="ow-panel-header">
      <div class="ow-panel-title">결재함</div>
      <div class="ow-panel-side">
        <button class="ow-btn type-icon add">
          <span class="sr-only">new tab</span>
        </button>
        <button class="ow-btn type-icon modify">
          <span class="sr-only">modal</span>
        </button>
      </div>
    </div>
    <div class="ow-panel-body">
      <!-- 상단 탭 -->
      <ul class="summary-list pt-5 pb-5 mb-5">
        <li
          v-for="(tab, index) in docuTabs"
          :key="index"
          :class="{
            'k-state-active': currentDocuTab === index,
          }"
          @click="currentDocuTab = index"
          class="ow-btn"
        >
          <span class="head">{{ tab }}</span>
          <span class="head point">{{
            Math.floor(Math.random() * (10 - 1 + 1)) + 1
          }}</span>
          <span class="head">건</span>
        </li>
      </ul>
      <!-- //상단 탭 -->
      <div v-show="currentDocuTab == 0" class="tab-content">
        <!-- 대기 -->
        <table class="ow-table table-striped">
          <colgroup>
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <td class="customtd input-td">
                <div class="gs-content d-flex">
                  <a href="javascript:void(0);">
                    <span class="text">(OW공통개발팀)정보시스템 지원 요청</span>
                  </a>
                  <div class="option d-flex ml-auto">
                    <div class="progress" style="width: 100px">
                      <div
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="4"
                        aria-valuenow="1"
                        class="progress-bar"
                        style="width: 25%; font-size: 0px"
                      >
                        25
                      </div>
                    </div>
                    <span class="ml-5">1/4</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="customtd input-td"></td>
            </tr>
            <tr>
              <td class="customtd input-td"></td>
            </tr>
            <tr>
              <td class="customtd input-td"></td>
            </tr>
            <tr>
              <td class="customtd input-td"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="currentDocuTab == 1" class="tab-content">
        <!-- 진행 -->
        <table class="ow-table table-striped">
          <colgroup>
            <col width="*" />
            <col width="100px" />
            <col width="30px" />
          </colgroup>
          <tbody>
            <tr>
              <td class="customtd input-td bg-color-blue-2">
                <div class="gs-content">
                  <a href="javascript:void(0);">
                    <span class="text">(OW공통개발팀)정보시스템 지원 요청</span>
                  </a>
                  <!-- <a>
                                  <span class="ml-10">NEW</span>
                                </a> -->
                </div>
              </td>
              <td>
                <div class="option">
                  <span>PROGRESS</span>
                  <!-- <span><img src="@/assets/images/demo/1111/img-progress_bar.png" alt="" width="90px"></span > -->
                </div>
              </td>
              <td>
                <div class="option">NEW</div>
              </td>
            </tr>
            <tr>
              <td class="customtd input-td">
                <div class="gs-content">
                  <a href="javascript:void(0);">
                    <span class="text"
                      >(OW공통개발팀)노트북, 모니터 구매 신청</span
                    >
                  </a>
                  <!-- <a>
                                  <span class="ml-10">NEW</span>
                                </a> -->
                </div>
              </td>
              <td>
                <div class="option">
                  <span>PROGRESS</span>
                </div>
              </td>
              <td>
                <div class="option">NEW</div>
              </td>
            </tr>
            <tr>
              <td class="customtd input-td bg-color-blue-2">
                <div class="gs-content">
                  <a href="javascript:void(0);">
                    <span class="text"
                      >(OW공통개발팀)신규입사자 방화벽 접속 허용 요청</span
                    >
                  </a>
                </div>
              </td>
              <td>
                <div class="option">
                  <span>PROGRESS</span>
                </div>
              </td>
              <td>
                <div class="option">NEW</div>
              </td>
            </tr>
            <tr>
              <td class="customtd input-td">
                <div class="gs-content">
                  <a href="javascript:void(0);">
                    <span class="text"
                      >(OW공통개발팀)IP Phone 신규 사용 요청</span
                    >
                  </a>
                </div>
              </td>
              <td>
                <div class="option">
                  <span>PROGRESS</span>
                </div>
              </td>
              <td>
                <div class="option">NEW</div>
              </td>
            </tr>
            <tr>
              <td class="customtd input-td bg-color-blue-2">
                <div class="gs-content">
                  <a href="javascript:void(0);">
                    <span class="text"
                      >(OW공통개발팀)뱃지, 수첩, 다이어리 지급 요청</span
                    >
                  </a>
                </div>
              </td>
              <td>
                <div class="option">
                  <span>PROGRESS</span>
                </div>
              </td>
              <td>
                <div class="option">NEW</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="currentDocuTab == 2" class="tab-content">
        <!-- 완료 -->
        <table class="ow-table table-striped">
          <colgroup>
            <col width="*" />
            <col width="100px" />
            <col width="30px" />
          </colgroup>
          <tbody>
            <tr>
              <td class="customtd input-td bg-color-blue-2">
                <div class="gs-content">
                  <a href="javascript:void(0);">
                    <span class="text">(OW공통개발팀)정보시스템 지원 요청</span>
                  </a>
                  <!-- <a>
                                  <span class="ml-10">NEW</span>
                                </a> -->
                </div>
              </td>
              <td>
                <div class="option">
                  <span>PROGRESS</span>
                </div>
              </td>
              <td>
                <div class="option">NEW</div>
              </td>
            </tr>
            <tr>
              <td class="customtd input-td">
                <div class="gs-content">
                  <a href="javascript:void(0);">
                    <span class="text"
                      >(OW공통개발팀)노트북, 모니터 구매 신청</span
                    >
                  </a>
                  <!-- <a>
                                  <span class="ml-10">NEW</span>
                                </a> -->
                </div>
              </td>
              <td>
                <div class="option">
                  <span>PROGRESS</span>
                </div>
              </td>
              <td>
                <div class="option">NEW</div>
              </td>
            </tr>
            <tr>
              <td class="customtd input-td bg-color-blue-2">
                <div class="gs-content">
                  <a href="javascript:void(0);">
                    <span class="text"
                      >(OW공통개발팀)신규입사자 방화벽 접속 허용 요청</span
                    >
                  </a>
                </div>
              </td>
              <td>
                <div class="option">
                  <span>PROGRESS</span>
                </div>
              </td>
              <td>
                <div class="option">NEW</div>
              </td>
            </tr>
            <tr>
              <td class="customtd input-td">
                <div class="gs-content">
                  <a href="javascript:void(0);">
                    <span class="text"
                      >(OW공통개발팀)IP Phone 신규 사용 요청</span
                    >
                  </a>
                </div>
              </td>
              <td>
                <div class="option">
                  <span>PROGRESS</span>
                </div>
              </td>
              <td>
                <div class="option">NEW</div>
              </td>
            </tr>
            <tr>
              <td class="customtd input-td bg-color-blue-2">
                <div class="gs-content">
                  <a href="javascript:void(0);">
                    <span class="text"></span>
                  </a>
                </div>
              </td>
              <td>
                <div class="option">
                  <span></span>
                </div>
              </td>
              <td>
                <div class="option"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="currentDocuTab == 3" class="tab-content">
        <!-- 반려 -->
        <table class="ow-table table-striped">
          <colgroup>
            <col width="*" />
            <col width="100px" />
            <col width="30px" />
          </colgroup>
          <tbody>
            <tr>
              <td class="customtd input-td bg-color-blue-2">
                <div class="gs-content">
                  <a href="javascript:void(0);">
                    <span class="text">(OW공통개발팀)정보시스템 지원 요청</span>
                  </a>
                  <!-- <a>
                                  <span class="ml-10">NEW</span>
                                </a> -->
                </div>
              </td>
              <td>
                <div class="option">
                  <span>PROGRESS</span>
                </div>
              </td>
              <td>
                <div class="option">NEW</div>
              </td>
            </tr>
            <tr>
              <td class="customtd input-td">
                <div class="gs-content">
                  <a href="javascript:void(0);">
                    <span class="text"
                      >(OW공통개발팀)IP Phone 신규 사용 요청</span
                    >
                  </a>
                  <!-- <a>
                                  <span class="ml-10">NEW</span>
                                </a> -->
                </div>
              </td>
              <td>
                <div class="option">
                  <span>PROGRESS</span>
                </div>
              </td>
              <td>
                <div class="option">NEW</div>
              </td>
            </tr>
            <tr>
              <td class="customtd bg-color-blue-2 input-td"></td>
              <td>
                <div class="option">
                  <!-- <span>PROGRESS</span> -->
                </div>
              </td>
              <td>
                <div class="option"></div>
              </td>
            </tr>
            <tr>
              <td class="customtd input-td"></td>
              <td>
                <div class="option">
                  <!-- <span>PROGRESS</span> -->
                </div>
              </td>
              <td>
                <div class="option"></div>
              </td>
            </tr>
            <tr>
              <td class="customtd bg-color-blue-2 input-td"></td>
              <td>
                <div class="option">
                  <!-- <span>PROGRESS</span> -->
                </div>
              </td>
              <td>
                <div class="option"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- //ow-panel -->
</template>
<script>
export default {
  name: 'AppApproval',
  data() {
    return {
      docuTabs: ['대기', '진행', '완료', '반려'],
      currentDocuTab: 0,
    };
  },
};
</script>
