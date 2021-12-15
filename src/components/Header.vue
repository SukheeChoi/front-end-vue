<template>
  <!-- header -->
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
              <span>{{userInfo.prntOrgNm}}</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">{{userInfo.orgNm}}</a>
          </li>
          <li><a href="javascript:void(0);">{{userInfo.userNm}} {{userInfo.jbgrNm}}</a></li>
        </ul>

        <div class="btns">
          <button type="button" class="confirm" @click="sidebarShowUpdate">
            알림<span class="count">23</span>
          </button>
          <button type="button" class="setting">설정</button>
          <button type="button" class="logout" @click="logout">로그아웃</button>
        </div>
      </div>
    </div>
  </header>
  <!-- //header -->
</template>


<script>
export default {
  name: "Header",
  data(){
    return{
      userInfo : JSON.parse(localStorage.getItem("userInfo"))
    }
  },
  methods: {
    sidebarShowUpdate() {
      this.$emit("sidebarShow");
    },
    logout(){
      localStorage.removeItem("userInfo")
      this.$router.push("/oss-login");
    }
  }
};
</script>