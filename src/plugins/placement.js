'use strict';

import { instance } from '@/main';
import { t } from '@/plugins/i18n';

import {
  // 권한
  PermissionName,
  // 권한 요청
  PermissionDescriptor,
  // 권한 상태
  PermissionState,
} from '@/model';

// Multi-Screen Window Placement API 폴리필
// Note: 정확히 Multi-Screen Window Placement API 폴리필을 할 수 없습니다.
if (!('getScreenDetails' in window)) {
  window.getScreenDetails = new Promise((resolve) => {
    resolve([window.screen]);
  });
  window.screen.isExtended = false;
}

const descriptor = new PermissionDescriptor(PermissionName.WINDOW_PLACEMENT);

let permissionStatus;

// 창 정보
let screenDetails = null;

// 창 확장 여부
let isScreenExtended = false;

// 창 목록
let cachedSubScreens = [];

// 창 열기 유지
let cachedCallUrls = [];

// 창 배치 권한 지원 여부
const isSupported =
  'navigator' in window && 'permissions' in window.navigator && 'query' in window.navigator.permissions;

// 창 배치 권한 변경 이벤트
async function permissionStatusChangeHandler(e) {
  permissionStatus = e.currentTarget;
  if (isScreenExtended) {
    switch (permissionStatus.state) {
      // 창 배치 권한 거절
      case PermissionState.DENIED:
        // 스크린 정보 초기화
        screenDetails = null;
        return await instance.alert(t('permission.window-placement.denied'));
      // 창 배치 권한 요청
      case PermissionState.PROMPT:
        // 스크린 정보 초기화
        screenDetails = null;
        return await requestPermission();
      // 창 배치 권한 수락
      case PermissionState.GRANTED:
        screenDetails = await getScreenInfo();
    }
    if (cachedCallUrls) {
      openSubScreens(cachedCallUrls);
      cachedCallUrls = [];
    }
  }
}

// 창 배치 권한 요청
async function requestPermission() {
  if (await instance.confirm(t('permission.window-placement.promprt'))) {
    await window.getScreenDetails();
  }
}

// 창 배치 변경 핸들러
function screenChangeHandler(e) {
  closeSubScreens();
}

// 창 배치 정보
async function getScreenInfo() {
  const info = await window.getScreenDetails();
  info.removeEventListener('screenchange', screenChangeHandler);
  info.addEventListener('screenchange', screenChangeHandler);
  return info;
}

// 서브 브라우저 닫기
function closeSubScreens() {
  for (const cachedSubScreen of cachedSubScreens) {
    if (!cachedSubScreen.closed) {
      cachedSubScreen.close();
    }
  }
  cachedSubScreens = [];
}

// 서브 브라우저 열기
function openSubScreens(urls) {
  if (!isScreenExtended) {
    return instance.alert(t('permission.window-placement.extend'));
  }
  if (!screenDetails) {
    cachedCallUrls = urls;
    return permissionStatus.dispatchEvent(new Event('change'));
  }
  // 기존 서브 브라우저 닫기
  closeSubScreens();
  // 스크린 정보(현재 화면을 제외한)
  const subScreens = screenDetails.screens.filter((screenDetail) => screenDetail != screenDetails.currentScreen);
  // 새로운 서브 브라우저 생성
  for (let i = 0, length = Math.min(subScreens.length, urls.length); i < length; i += 1) {
    const url = urls.at(i);
    const screen = subScreens.at(i);
    const features = [
      `left=${screen.availLeft}`,
      `top=0`,
      `width=${screen.availWidth}`,
      `height=${screen.availHeight}`,
      `menubar=no`,
      `toolbar=no`,
      `location=no`,
      `status=no`,
      `resizable=no`,
      `scrollbars=no`,
    ].join(',');
    cachedSubScreens.push(window.open(url, '_blank', features));
  }
}

// 초기화
async function initialize() {
  // 확장 여부
  isScreenExtended = window.screen.isExtended;

  // 권한
  permissionStatus = await window.navigator.permissions.query(descriptor);

  // 권한 변경 이벤트 추가
  permissionStatus.removeEventListener('change', permissionStatusChangeHandler);
  permissionStatus.addEventListener('change', permissionStatusChangeHandler);

  // 권한 이벤트 실행
  permissionStatus.dispatchEvent(new Event('change'));
}

export default {
  install: async (app) => {
    // 창의 오프너가 존재한다면 수행하지 않는다.
    if (window.opener) {
      return;
    }

    // 권한에 대한 객체가 없다.
    if (!isSupported) {
      return instance.alert(t('permission.window-placement.notSupported'));
    }

    // 스크린이 변경된다면 초기화 과정을 다시 수행한다.
    window.screen.addEventListener('change', initialize);

    // 스크린 변경 이벤트 실행
    window.screen.dispatchEvent(new Event('change'));

    app.mixin({
      methods: {
        $_openSubScreens(...urls) {
          openSubScreens(...urls);
        },
      },
    });
  },
};
