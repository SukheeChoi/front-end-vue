<template>
  <div class="loginWarp">
    <div class="container">
      <div></div>
      <section>        
        <div class="titWrap">
          <label>회사선택</label>
          <select id="" v-model="companyType">
            <option value="" disabled selected hidden> 회사선택</option>
            <option value="osstem">오스템임플란트(주)</option>
            <option value="osstemPama">오스템파마</option>
          </select>
        </div>
        <div class="titWrap">
          <label>사원번호</label>
          <input type="text" id="userId" v-model="loginId" @keydown.enter="setFocus" ref="userId" placeholder="사원번호">
        </div>
        <div class="titWrap">
          <label>비밀번호</label>
          <input type="password" id="password" v-model="password" ref="password" placeholder="비밀번호" @keydown.enter="onClickLogin">
        </div>
        <button class="btn-login" @click="onClickLogin" type="submit">로그인</button>        
        <footer>
          <p>로그인 관련 문의는 담당 관리자에게 문의하세요.</p>
          <p>담당자 연락처: 02-1234-5678 / <a href="mailto:admin@osstem.com">admin@osstem.com</a></p>
          <p class="copyright">&copy;Osstem Implant Co.,LTD. All right reserved.</p>
        </footer>
      </section>
    </div>
    
  </div>
</template>
<script>
export default{
  setup() {
    
  },
}
</script>
