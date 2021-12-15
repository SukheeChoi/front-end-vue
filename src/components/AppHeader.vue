<template>
  <header id="header" class="header">
    <div class="info-area">
      <h1 class="logo">OW OSSTEM</h1>

      <ul class="location">
        <li><span>국내영업총괄본부(본부장)</span></li>
        <li><span>고객요청</span></li>
        <li class="active"><span>메인</span></li>
      </ul>

      <div class="util-wrap">
        <ul class="meuns">
          <li>
            <a href="javascript:void(0);">
              <i class="person"><span class="sr-only">유저 아이콘</span></i>
              <span>국내영업총괄본부</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">국내영업</a>
          </li>
          <li>
            <a href="javascript:void(0);">홍길동 전무</a>
          </li>
        </ul>

        <div class="btns">
          <button type="button" class="confirm">
            알림<span class="count">23</span>
          </button>
          <button type="button" class="setting">설정</button>
          <button type="button" class="logout">로그아웃</button>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      // userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
      user: {},
    };
  },
  methods: {},
};
</script>
