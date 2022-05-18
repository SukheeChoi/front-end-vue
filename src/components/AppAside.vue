<template>
  <aside>
    <!-- 사이드바 영역 S -->
    <transition name="sidebar">
      <div class="ow-toast toast-slide"  v-if="sidebarOpen">
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
                        <span class="head">{{ message.sndNm }}</span>
                      </li>
                      <li>
                        <span>{{ message.orgNm }}</span>
                      </li>
                      <li>
                        <span>{{ formatDateTime(message.sndDtm) }}</span>
                      </li>
                    </ul>
                    <button class="ow-btn type-icon cross" @click="removeMessage(message)">
                      <i class="cross"></i>
                      <div class="sr-only">닫기</div>
                    </button>
                  </div>
                  <div class="toast-contents">
                    <p class="text-para">{{ message.msg }}</p>
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
                  <span class="head">{{ latestMessage.sndNm }}</span>
                </li>
                <li>
                  <span>{{ latestMessage.orgNm }}</span>
                </li>
                <li>
                  <span>{{ formatDateTime(latestMessage.sndDtm) }}</span>
                </li>
              </ul>
            </div>
            <div class="toast-contents">
              <p class="text-para">{{ latestMessage.msg }}</p>
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
import _ from 'lodash';
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

    const formatDateTime = ((dateTime) => {
      let formatDt = new Date(dateTime);
      return _.padStart(formatDt.getMonth() + 1, 2, 0) +
              '-' +
              _.padStart(formatDt.getDate(), 2, 0) +
              ' ' +
              _.padStart(formatDt.getHours(), 2, 0) +
              ':' +
              _.padStart(formatDt.getMinutes(), 2, 0);
    });

    const state = reactive({
      sidebar,
      alert,
      receiveList,
      messages: computed(() => store.getters["message/latestMessages"]),
      latestMessage: computed(() => store.getters["message/latestMessage"]),
    });

    // Computed
    const alertOpen = computed(() => {
      return store.getters["alert/open"];
    });

    const sidebarOpen = computed(() => {
      return store.getters["sidebar/open"];
    })

    // Methods
    const close = () => {
      store.commit('sidebar/close');
    };

    const removeMessage = (message) => {
      store.dispatch('message/remove', message);
    };

    const removeAllMessage = () => {
      store.dispatch('message/removeAll');
    };

    // const check = () => {};

    // Hooks
    onMounted(() => {
      store.commit('sidebar/close');
      store.commit('alert/close');
    });

    return {
      // State
      ...toRefs(state),
      // Computed
      alertOpen,
      sidebarOpen,
      // Methods
      close,
      removeMessage,
      removeAllMessage,
      formatDateTime,
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
