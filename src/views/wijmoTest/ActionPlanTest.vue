<template>
  <ow-panel>
    <template #title> Action Plan </template>
    <div class="ow-panel-top">
      <h4>10-28(목)</h4>
      <div class="d-flex ml-auto">
        <button class="ow-btn type-icon layout">
          <span class="sr-only">보기1</span>
        </button>
        <button class="ow-btn type-icon layout">
          <span class="sr-only">보기2</span>
        </button>
        <button class="ow-btn type-icon layout">
          <span class="sr-only">보기3</span>
        </button>
      </div>
    </div>
    <div class="grid-schedule-area">
      <div class="current-time-bar" style="top: calc(34px + 24px * 4)"></div>
      <div class="grid-schedule xs">
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
                <td class="customtd bg-color-blue">
                  <div>
                    <span>09:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue">
                  <div class="gs-content">
                    <div class="gs-label">개별</div>
                    <span class="text"
                      >중립과제 점검 물류기획, 국내 물류,해외물류 법인물류</span
                    >
                    <div class="option">
                      <div class="ow-checkbox ml-2">
                        <input type="checkbox" id="ow-chk1" />
                        <label for="ow-chk1"></label>
                      </div>
                      <button class="ow-btn type-icon clock">
                        <span class="sr-only">시계 아이콘</span>
                      </button>
                      <input class="" type="text" value="09:00~10:00" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue"></td>
                <td class="customtd input-td bg-color-blue"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue">
                  <div>
                    <span>10:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue">
                  <div class="gs-content">
                    <div class="option">
                      <div class="ow-checkbox ml-2">
                        <input type="checkbox" id="ow-chk2" />
                        <label for="ow-chk2"></label>
                      </div>
                      <button class="ow-btn type-icon clock">
                        <span class="sr-only">시계 아이콘</span>
                      </button>
                      <input class="" type="text" value="09:00~10:00" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd"></td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue">
                  <div>
                    <span>11:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue">
                  <div class="gs-content">
                    <div class="gs-label">개별</div>
                    <span class="text"
                      >(국내물류 )상품발주요청 검토 및 결재</span
                    >
                    <div class="option">
                      <div class="ow-checkbox ml-2">
                        <input type="checkbox" id="ow-chk3" />
                        <label for="ow-chk3"></label>
                      </div>
                      <button class="ow-btn type-icon clock">
                        <span class="sr-only">시계 아이콘</span>
                      </button>
                      <input type="text" value="09:00~10:00" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue"></td>
                <td class="customtd input-td bg-color-blue"></td>
              </tr>
              <tr>
                <td class="customtd">
                  <div>
                    <span>12:00</span>
                  </div>
                </td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd"></td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow">
                  <div>
                    <span>13:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-yellow">
                  <div class="gs-content">
                    <div class="gs-label green">회의</div>
                    <span class="text">입고진행 점검 - 국내물류, 해외물류</span>
                    <div class="option">
                      <div class="ow-checkbox ml-2">
                        <input type="checkbox" id="ow-chk4" />
                        <label for="ow-chk4"></label>
                      </div>
                      <button class="ow-btn type-icon clock">
                        <span class="sr-only">시계 아이콘</span>
                      </button>
                      <input type="text" value="09:00~10:00" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow"></td>
                <td class="customtd input-td bg-color-yellow"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue">
                  <div>
                    <span>14:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue">
                  <div class="gs-content">
                    <div class="gs-label">개별</div>
                    <span class="text">채용면접</span>
                    <div class="option">
                      <div class="ow-checkbox ml-2">
                        <input type="checkbox" id="ow-chk5" />
                        <label for="ow-chk5"></label>
                      </div>
                      <button class="ow-btn type-icon clock">
                        <span class="sr-only">시계 아이콘</span>
                      </button>
                      <input type="text" value="09:00~10:00" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue"></td>
                <td class="customtd input-td bg-color-blue"></td>
              </tr>
              <tr>
                <td class="customtd">
                  <div>
                    <span>15:00</span>
                  </div>
                </td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd"></td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow">
                  <div>
                    <span>16:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-yellow">
                  <div class="gs-content">
                    <div class="gs-label green">회의</div>
                    <span class="text">출고진행점검-국내물류, 해외물류</span>
                    <div class="option">
                      <div class="ow-checkbox ml-2">
                        <input type="checkbox" id="ow-chk6" />
                        <label for="ow-chk6"></label>
                      </div>
                      <button class="ow-btn type-icon clock">
                        <span class="sr-only">시계 아이콘</span>
                      </button>
                      <input type="text" value="09:00~10:00" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow"></td>
                <td class="customtd input-td bg-color-yellow"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow">
                  <div>
                    <span>17:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-yellow">
                  <div class="gs-content">
                    <div class="gs-label green">회의</div>
                    <span class="text">재고점검-국내물류,해외물류</span>
                    <div class="option">
                      <div class="ow-checkbox ml-2">
                        <input type="checkbox" id="ow-chk7" />
                        <label for="ow-chk7"></label>
                      </div>
                      <button class="ow-btn type-icon clock">
                        <span class="sr-only">시계 아이콘</span>
                      </button>
                      <input type="text" value="09:00~10:00" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow"></td>
                <td class="customtd input-td bg-color-yellow"></td>
              </tr>
              <tr>
                <td class="customtd">
                  <div>
                    <span>18:00</span>
                  </div>
                </td>
                <td class="customtd input-td"></td>
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
                <td class="customtd bg-color-blue">
                  <div>
                    <span>09:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue">
                  <div class="gs-content">
                    <div class="gs-label">개별</div>
                    <span class="text"
                      >중립과제 점검 물류기획, 국내 물류,해외물류 법인물류</span
                    >
                    <div class="option">
                      <div class="ow-checkbox">
                        <input type="checkbox" id="ow-chk2-1" />
                        <label for="ow-chk2-1"></label>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue">
                  <div class="gs-content">
                    <div class="gs-label">개별</div>
                    <span class="text"
                      >중립과제 점검 물류기획, 국내 물류,해외물류 법인물류</span
                    >
                    <div class="option">
                      <div class="ow-checkbox">
                        <input type="checkbox" id="ow-chk2-2" />
                        <label for="ow-chk2-2"></label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue"></td>
                <td class="customtd input-td bg-color-blue"></td>
                <td class="customtd input-td bg-color-blue"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue">
                  <div>
                    <span>10:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue"></td>
                <td class="customtd input-td bg-color-blue"></td>
              </tr>
              <tr>
                <td class="customtd"></td>
                <td class="customtd input-td"></td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue">
                  <div>
                    <span>11:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue">
                  <div class="gs-content">
                    <div class="gs-label">개별</div>
                    <span class="text"
                      >(국내물류 )상품발주요청 검토 및 결재</span
                    >
                    <div class="option">
                      <div class="ow-checkbox">
                        <input type="checkbox" id="ow-chk2-3" />
                        <label for="ow-chk2-3"></label>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue">
                  <div class="gs-content">
                    <div class="gs-label">개별</div>
                    <span class="text"
                      >(국내물류 )상품발주요청 검토 및 결재</span
                    >
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue"></td>
                <td class="customtd input-td bg-color-blue"></td>
                <td class="customtd input-td bg-color-blue"></td>
              </tr>
              <tr>
                <td class="customtd">
                  <div>
                    <span>12:00</span>
                  </div>
                </td>
                <td class="customtd input-td"></td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd"></td>
                <td class="customtd input-td"></td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow">
                  <div>
                    <span>13:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-yellow">
                  <div class="gs-content">
                    <div class="gs-label green">회의</div>
                    <span class="text">입고진행 점검 - 국내물류, 해외물류</span>
                    <div class="option">
                      <div class="ow-checkbox">
                        <input type="checkbox" id="ow-chk2-4" />
                        <label for="ow-chk2-4"></label>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="customtd input-td bg-color-yellow">
                  <div class="gs-content">
                    <div class="gs-label green">회의</div>
                    <span class="text">입고진행 점검 - 국내물류, 해외물류</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow"></td>
                <td class="customtd input-td bg-color-yellow"></td>
                <td class="customtd input-td bg-color-yellow"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue">
                  <div>
                    <span>14:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue">
                  <div class="gs-content">
                    <div class="gs-label">개별</div>
                    <span class="text">채용면접</span>
                    <div class="option">
                      <div class="ow-checkbox ml-2">
                        <input type="checkbox" id="ow-chk2-5" />
                        <label for="ow-chk2-5"></label>
                      </div>
                      <button class="ow-btn type-icon clock">
                        <span class="sr-only">시계 아이콘</span>
                      </button>
                      <input type="text" value="09:00~10:00" />
                    </div>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue">
                  <div class="gs-content">
                    <div class="gs-label">개별</div>
                    <span class="text">채용면접</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue"></td>
                <td class="customtd input-td bg-color-blue"></td>
                <td class="customtd input-td bg-color-blue"></td>
              </tr>
              <tr>
                <td class="customtd">
                  <div>
                    <span>15:00</span>
                  </div>
                </td>
                <td class="customtd input-td"></td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd"></td>
                <td class="customtd input-td"></td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow">
                  <div>
                    <span>16:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-yellow">
                  <div class="gs-content">
                    <div class="gs-label green">회의</div>
                    <span class="text">출고진행점검-국내물류, 해외물류</span>
                    <div class="option">
                      <div class="ow-checkbox ml-2">
                        <input type="checkbox" id="ow-chk2-6" />
                        <label for="ow-chk2-6"></label>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="customtd input-td bg-color-yellow">
                  <div class="gs-content">
                    <div class="gs-label green">회의</div>
                    <span class="text">출고진행점검-국내물류, 해외물류</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow"></td>
                <td class="customtd input-td bg-color-yellow"></td>
                <td class="customtd input-td bg-color-yellow"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow">
                  <div>
                    <span>17:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-yellow">
                  <div class="gs-content">
                    <div class="gs-label green">회의</div>
                    <span class="text">재고점검-국내물류,해외물류</span>
                    <div class="option">
                      <div class="ow-checkbox ml-2">
                        <input type="checkbox" id="ow-chk2-7" />
                        <label for="ow-chk2-7"></label>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="customtd input-td bg-color-yellow">
                  <div class="gs-content">
                    <div class="gs-label green">회의</div>
                    <span class="text">재고점검-국내물류,해외물류</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow"></td>
                <td class="customtd input-td bg-color-yellow"></td>
                <td class="customtd input-td bg-color-yellow"></td>
              </tr>
              <tr>
                <td class="customtd">
                  <div>
                    <span>18:00</span>
                  </div>
                </td>
                <td class="customtd input-td"></td>
                <td class="customtd input-td"></td>
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
                <td class="customtd bg-color-blue">
                  <div>
                    <span>09:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue">
                  <div class="gs-content">
                    <div class="gs-label">개별</div>
                    <span class="text"
                      >중립과제 점검 물류기획, 국내 물류,해외물류 법인물류</span
                    >
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue"></td>
                <td class="customtd input-td bg-color-blue"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue">
                  <div>
                    <span>10:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue"></td>
              </tr>
              <tr>
                <td class="customtd"></td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue">
                  <div>
                    <span>11:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue">
                  <div class="gs-content">
                    <div class="gs-label">개별</div>
                    <span class="text"
                      >(국내물류 )상품발주요청 검토 및 결재</span
                    >
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue"></td>
                <td class="customtd input-td bg-color-blue"></td>
              </tr>
              <tr>
                <td class="customtd">
                  <div>
                    <span>12:00</span>
                  </div>
                </td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd"></td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow">
                  <div>
                    <span>13:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-yellow">
                  <div class="gs-content">
                    <div class="gs-label green">회의</div>
                    <span class="text">입고진행 점검 - 국내물류, 해외물류</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow"></td>
                <td class="customtd input-td bg-color-yellow"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue">
                  <div>
                    <span>14:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-blue">
                  <div class="gs-content">
                    <div class="gs-label">개별</div>
                    <span class="text">채용면접</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-blue"></td>
                <td class="customtd input-td bg-color-blue"></td>
              </tr>
              <tr>
                <td class="customtd">
                  <div>
                    <span>15:00</span>
                  </div>
                </td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd"></td>
                <td class="customtd input-td"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow">
                  <div>
                    <span>16:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-yellow">
                  <div class="gs-content">
                    <div class="gs-label green">회의</div>
                    <span class="text">출고진행점검-국내물류, 해외물류</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow"></td>
                <td class="customtd input-td bg-color-yellow"></td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow">
                  <div>
                    <span>17:00</span>
                  </div>
                </td>
                <td class="customtd input-td bg-color-yellow">
                  <div class="gs-content">
                    <div class="gs-label green">회의</div>
                    <span class="text">재고점검-국내물류,해외물류</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="customtd bg-color-yellow"></td>
                <td class="customtd input-td bg-color-yellow"></td>
              </tr>
              <tr>
                <td class="customtd">
                  <div>
                    <span>18:00</span>
                  </div>
                </td>
                <td class="customtd input-td"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </ow-panel>
</template>
<script>
import OwPanel from '@/components/common/OwPanel';
export default {
  name: 'AppActionPlan',
  components: {
    OwPanel,
  },
  data() {
    return {
      tabs: ['보기1', '보기2', '보기3'],
      currentTab: 0,
    };
  },
};
</script>
