<template>
  <div class="card">
    <div class="card-header">
      Read
    </div>
    <div class="card-body">
      <div v-if="board != null">
        <div class="d-flex">
          <div>
            <p>bno: {{board.bno}}</p>
            <p>btitle: {{board.btitle}}</p>
            <p>bcontent: {{board.bcontent}}</p>
            <p>mid: {{board.mid}}</p>
            <p>bdate: {{new Date(board.bdate).toLocaleDateString()}}</p>
            <p>bhitcount: {{board.bhitcount}}</p>
            <p v-if="board.battachoname">
              battachoname: {{board.battachoname}}
              <button @click="downloadBattach" class="btn btn-info btn-sm ml-2">다운로드</button>
            </p>
          </div>
          <div v-if="board.battachoname != null" class="ml-5">
            <img :src="battach" width="300"/>
          </div>
        </div>

        <div>
          <router-link :to="`/menu07/board/list?pageNo=${pageNo}`" 
            class="btn btn-info btn-sm mr-2">목록</router-link>
          <router-link :to="`/menu07/board/updateform?bno=${$route.query.bno}&pageNo=${$route.query.pageNo}`" 
            class="btn btn-info btn-sm mr-2">수정</router-link>
          <button class="btn btn-info btn-sm mr-2" @click="handleRemove">삭제</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import apiBoard from '@/apis/board';
import { ref } from 'vue';

import fileDownload from 'js-file-download';

const route = useRoute();
const router = useRouter();

const bno = route.query.bno;
const pageNo = route.query.pageNo;
const hit = route.query.hit;
const board = ref(null);
const battach = ref(null);

async function getBoard() {
  // const dbBoard = await apiBoard.readBoard(bno, hit)
  // board.value = dbBoard;

  apiBoard.readBoard(bno, hit)
  .then((data) => {
    board.value = data;
  });

  // const blob = await apiBoard.downloadBoardAttach(bno)
  // if(blob != null) {
  //   battach.value = URL.createObjectURL(blob);
  // }

  apiBoard.downloadBoardAttach(bno)
  .then((data) => {
    if(data != null) {
      battach.value = URL.createObjectURL(data);
    }
  });
}
getBoard();

async function downloadBattach() {
  const blob = await apiBoard.downloadBoardAttach(bno);
  if(blob != null) {
    // 파일을 다운로드 받게 하기 위해서,
    // fileDownload() 함수에
    // blob타입으로 받아온 데이터, 저장할 파일이름 순서로 인자로 줌.
    fileDownload(blob, board.value.battachoname);
  }
}

async function handleRemove() {
  const result = await apiBoard.deleteBoard(bno);
  if(result === 'success') {
    router.push(`/menu07/board/list?pageNo=${pageNo}`);
  }
}

</script>

<style scoped>
</style>