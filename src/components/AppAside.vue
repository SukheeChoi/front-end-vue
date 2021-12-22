<template>
  <aside>
    <!-- 사이드바 영역 S -->
    <transition name="sidebar">
      <div class="ow-toast toast-slide" v-if="sidebar.open">
        <div class="toast-area-top mb-15">
          <button class="ow-btn type-icon arrow" @click="close">
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
        <div class="toast">
          <div class="toast-body">
            <div class="toast-area">
              <div class="toast-wrap">
                <div class="toast-top mb-10">
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
                  <button class="ow-btn type-icon cross" @click="close">
                    <i class="cross"></i>
                    <div class="sr-only">닫기</div>
                  </button>
                </div>
                <div class="toast-contents">
                  <p class="text-para">AA 제품 피킹 완료 - 주문서 내역을 확인후 빠른 처리</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="toast">
          <div class="toast-body">
            <div class="toast-area">
              <div class="toast-wrap">
                <div class="toast-top mb-10">
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
                  <button class="ow-btn type-icon cross">
                    <i class="cross"></i>
                    <div class="sr-only">닫기</div>
                  </button>
                </div>
                <div class="toast-contents">
                  <p class="text-para">
                    AA 제품 피킹 완료 - 주문서 내역을 확인후 빠른 처리가 요구됩니다. 처리후 관련 내역을 담당 부서에
                    통보해주시기 바랍니다. 관련 부서는 국내물류운영팀이며 담당자는 고길동입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </transition>
    <!-- 사이드바 영역 E -->
    <!-- 푸시 알람 영역 S -->
    <transition name="alert">
      <div class="ow-toast fixed-postion-bottom-right" v-if="alert.open">
        <div class="toast-area" @click="check">
          <div class="toast-wrap">
            <div class="toast-top">
              <ul class="summary-list xs">
                <li>
                  <span class="head">{{ alertUserName }}</span>
                </li>
                <li>
                  <span>{{ alertDeptName }}</span>
                </li>
                <li>
                  <span>{{ alertTime }}</span>
                </li>
              </ul>
            </div>
            <div class="toast-contents">
              <p class="text-para">{{ alertMessage }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 푸시 알람 영역 E -->
  </aside>
</template>
<script>
import { reactive, toRefs, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'AppAside',
  components: {},
  /**
   * context.attrs
   * context.slots
   * context.parent
   * context.root
   * context.emit
   */
  setup() {
    const store = useStore();

    const { sidebar, alert } = store.state.notification;

    const state = reactive({
      sidebar,
      alert,
    });

    // Computed
    const alertUserName = computed(() => {
      return store.getters.getAlertUserName;
    });

    const alertDeptName = computed(() => {
      return store.getters.getAlertDeptName;
    });

    const alertTime = computed(() => {
      return store.getters.getAlertTime;
    });

    const alertMessage = computed(() => {
      return store.getters.getAlertMessage;
    });

    // Methods
    const close = () => {
      store.commit('setCloseSidebar');
    };

    // const check = () => {};

    // Hooks
    onMounted(() => {
      store.commit('setCloseSidebar');
      store.commit('setCloseAlert');
    });

    return {
      // State
      ...toRefs(state),
      // Computed
      alertUserName,
      alertDeptName,
      alertTime,
      alertMessage,
      // Methods
      close,
    };
  },
};
</script>
<style lang="scss" scoped>
/** 
 * v-enter-from: enter의 시작 상태. 엘리먼트가 삽입되기 전에 적용되고 한 프레임 후에 제거됩니다.
 * v-enter-active: enter의 활성 상태. 전체 진입 단계 동안 적용됩니다. 엘리먼트가 삽입되기 전에 적용됩니다. 트랜지션 / 애니메이션이 완료되면 제거됩니다. 이 클래스는 진입 트랜지션에서 duration, delay, easing curve를 정의 하는데 사용 될 수 있습니다.
 * v-enter-to: 진입 상태의 끝에서 실행됩니다. 엘리먼트가 삽입된 후(동시에v-enter-from 가 제거됨) 트랜지션/애니메이션이 끝나면 제거되는 하나의 프레임을 추가했습니다.
 * v-leave-from: leave를 위한 시작 상태. 진출 트랜지션이 트리거 될 때 적용되고 한 프레임 후에 제거됩니다.
 * v-leave-active: leave의 활성 상태. 전체 진출 상태에서 적용됩니다. 진출 트랜지션이 트리거되면 적용되고 트랜지션 / 애니메이션이 완료되면 제거됩니다. 이 클래스는 진출 트랜지션에서 duration, delay, easing curve를 정의 하는데 사용 될 수 있습니다.
 * v-leave-to: 진출 상태 끝에서 실행됩니다. 진출 트랜지션이 트리거되고 (동시에 v-leave-from 가 제거됨) 트랜지션 / 애니메이션이 끝나면 제거되는 하나의 프레임을 추가 했습니다.
 */
.sidebar-enter-from,
.sidebar-leave-to,
.alert-enter-from,
.alert-leave-to {
  opacity: 0;
}

.sidebar-enter-active,
.sidebar-leave-active,
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease-out;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(90px);
}

.alert-enter-from,
.alert-leave-to {
  transform: translateY(30px);
}
</style>
