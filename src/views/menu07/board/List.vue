<template>
  <div class="card">
    <div class="card-header">
      List
    </div>
    <div class="card-body">
      <div v-if="page != null">
        <div class="mb-3">
          <router-link to="/menu07/board/writeform" class="btn btn-info btn-sm">생성</router-link>
        </div>
        <table class="table table-sm table-striped table-bordered">
            <thead>
              <tr>
                <th class="text-center" style="width:70px">번호</th>
                <th class="text-center">제목</th>
                <th class="text-center" style="width:90px">글쓴이</th>
                <th class="text-center" style="width:120px">날짜</th>
                <th class="text-center" style="width:70px">조회수</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="board in page.boards" :key="board.bno">
                <td class="text-center">{{board.bno}}</td>
                <td>
                  <router-link :to="`/menu07/board/read?bno=${board.bno}&pageNo=${page.pager.pageNo}&hit=true`">{{board.btitle}}</router-link>
                </td>
                <td class="text-center">{{board.mid}}</td>
                <td class="text-center">{{new Date(board.bdate).toLocaleDateString()}}</td>
                <td class="text-center">{{board.bhitcount}}</td>
              </tr>
              <tr>
                <td colspan="5" class="text-center">
                  <button @click="changePageNo(1)" class="btn btn-outline-primary btn-sm mr-1">처음</button>
                  <button v-if="page.pager.groupNo > 1" @click="changePageNo(page.pager.startPageNo-1)" class="btn btn-outline-info btn-sm mr-1">이전</button>
                  <!-- <button v-for="pageNo in range(page.pager.startPageNo, page.pager.endPageNo)" :key="pageNo" @click="changePageNo(pageNo)" class="btn btn-sm mr-1" :class="{'btn-outline-success':(page.pager.pageNo!=pageNo), 'btn-danger':(page.pager.pageNo==pageNo)}">{{pageNo}}</button> -->
                  <button v-for="pageNo in range(page.pager.startPageNo, page.pager.endPageNo)" :key="pageNo" @click="changePageNo(pageNo)" class="btn btn-sm mr-1" :class="(page.pager.pageNo==pageNo)?'btn-danger':'btn-outline-success'">{{pageNo}}</button>
                  <button v-if="page.pager.groupNo < page.pager.totalGroupNo" @click="changePageNo(page.pager.endPageNo+1)" class="btn btn-outline-info btn-sm mr-1">다음</button>
                  <button @click="changePageNo(page.pager.totalPageNo)" class="btn btn-outline-primary btn-sm mr-1">맨끝</button>
                </td>
              </tr>
            </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import apiBoard from '@/apis/board';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

// 반응형 속성 선언
const page = ref(null);
const route = useRoute();
const router = useRouter();
const store = useStore();
if(store.state.userId === '') {
  router.push('/menu07/auth/login');
}

// 라우팅시에 전달된 Query String에서 pageNo를 읽기
let pageNo = route.query.pageNo;
console.log('~~~~~~~~~~~~~~~route.query.pageNo : ' + route.query.pageNo);
if(pageNo === 'undefined') {
  pageNo = 1;
}

// Rest API와 통신해서 페이지에 대한 정보(게시물 목록+페이저)를 page 속성에 저장
async function getBoardList(pageNo=1) {
  const result = await apiBoard.getBoardList(pageNo);
  console.log('List.vue pageNo : ' + pageNo);//
  console.log('~~~~~~~~~~~~~~~~~List.vue');//
  if(result.result === 'success') {
    page.value = result.data;
  } else {
    router.push('/menu07/auth/login');
  }
}
getBoardList(pageNo);

function range(start, end) {
  const numbers = [];
  for(var i=start; i<=end; i++) {
    numbers.push(i);
  }
  return numbers;
}

function changePageNo(pageNo) {
  router.push(`/menu07/board/list?pageNo=${pageNo}`);
}

watch(route, (newUrl, oldUrl) => {
  if(newUrl.path === '/menu07/board/list') {
    if(newUrl.query.pageNo) {
      // console.log('JSON.stringify(newUrl): ' + JSON.stringify(newUrl));
      getBoardList(newUrl.query.pageNo);
    } else {
      getBoardList(1);
    }
  }
});

</script>

<style scoped>
</style>