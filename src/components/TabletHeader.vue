<template>
  <header class="header">
    <div class="info-area">
      <router-link :to="{name: 'tabletMain'}">
        <h1 class="logo">OW OSSTEM</h1>
      </router-link>
      <ul class="location">

      </ul>
      <div class="util-wrap">
        <ul class="menus">

        </ul>

        <div class="btns">
          <button type="button" class="setting">설정</button>
          <button type="button" class="logout" @click="logout();">로그아웃</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  
}
</script>
<style lang="scss">
@import '@/assets/css/layout/globalMobile.scss';
</style>