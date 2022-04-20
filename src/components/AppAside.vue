<template>
  <aside>
    <!-- 사이드바 영역 S -->
    <transition name="sidebar">
      <div class="ow-toast toast-slide">
        <div class="toast-area-top mb-15">
          <button class="ow-btn type-icon arrow" @click="close">
            <i class="triangle right"></i>
            <i class="triangle right"></i>
            <span class="sr-only">닫기</span>
          </button>
        </div>
        <div class="toast-list">
          <div class="toast" v-for="message in messages" :key="message">
            <div class="toast-body">
              <div class="toast-area">
                <div class="toast-wrap">
                  <div class="toast-top mb-10">
                    <ul class="summary-list xs">
                      <li>
                        <span class="head">이름</span>
                      </li>
                      <li>
                        <span>조직명</span>
                      </li>
                      <li>
                        <span>{{ message.time }}</span>
                      </li>
                    </ul>
                    <button class="ow-btn type-icon cross" @click="removeMessage(message)">
                      <i class="cross"></i>
                      <div class="sr-only">닫기</div>
                    </button>
                  </div>
                  <div class="toast-contents">
                    <p class="text-para">{{ message.message }}</p>
                  </div>
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
              <a href="javascript:void(0)" @click="removeAllMessage()">
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
      <div class="ow-toast fixed-postion-bottom-right" v-if="alertOpen">
        <div class="toast-area" @click="check">
          <div class="toast-wrap">
            <div class="toast-top">
              <ul class="summary-list xs">
                <li>
                  <span class="head">{{ alertUserName }}</span>
                </li>
                <li>
                  <span>{{ alertOrgName }}</span>
                </li>
                <li>
                  <span>{{ alertDateTime }}</span>
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

    const { sidebar, alert, receiveList } = store.state.notification;

    const state = reactive({
      sidebar,
      alert,
      receiveList,
      messages: computed(() => store.getters.latestMessages),
    });

    // Computed
    const alertUserName = computed(() => {
      return store.getters.getAlertUserName;
    });

    const alertOrgName = computed(() => {
      return store.getters.getAlertOrgName;
    });

    const alertDateTime = computed(() => {
      return store.getters.getAlertDateTime;
    });

    const alertMessage = computed(() => {
      return store.getters.getAlertMessage;
    });

    const alertOpen = computed(() => {
      return store.getters.getAlertOpen;
    });

    // Methods
    const close = () => {
      store.commit('setCloseSidebar');
    };

    const removeMessage = (message) => {
      store.dispatch('confirmMessage', message);
    };

    const removeAllMessage = () => {
      store.commit('removeAllMessage');
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
      alertOrgName,
      alertDateTime,
      alertMessage,
      alertOpen,
      // Methods
      close,
      removeMessage,
      removeAllMessage,
    };
  },
};
</script>
<style lang="scss" scoped>
.toast-list {
  height: calc(100% - 80px);
  overflow: auto;
  .toast {
    &:hover {
      cursor: default;
      transform: scale(0.98);
    }
  }
}
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
