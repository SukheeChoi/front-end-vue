<template>
  <div class="card">
    <div class="card-header">
      WriteForm
    </div>
    <div class="card-body">
      <form v-if="board" v-on:submit.prevent="handleUpdate">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">제목</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="board.btitle"/>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">내용</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="board.bcontent"/>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">첨부그림</label>
          <div class="col-sm-10">
            <input type="file" class="form-control-file" ref="newBattach" @change="previewImg"/>
          </div>
        </div>

        <div>
          <img :src="battach" width="200"/>
        </div>

        <div class="form-group row mt-3">
          <div class="col-sm-12 d-flex justify-content-center">
            <input type="submit" class="btn btn-primary btn-sm mr-2" value="수정"/>
            <input type="button" class="btn btn-primary btn-sm" value="취소" v-on:click="handleCancel"/>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiBoard from '@/apis/board';

const route = useRoute();
const router = useRouter();
const board = ref(null);
const bno = route.query.bno;
const pageNo = route.query.pageNo;
const newBattach = ref(null);
const battach = ref(null);

async function getBoard() {
  const dbBoard = await apiBoard.readBoard(bno, false);
  board.value = dbBoard;

  const blob = await apiBoard.downloadBoardAttach(bno);
  if(blob != null) {
    battach.value = URL.createObjectURL(blob);
  }

}

getBoard();

async function handleUpdate() {
  const multipartFormData = new FormData();
  multipartFormData.append('btitle', board.value.btitle);
  multipartFormData.append('bcontent', board.value.bcontent);
  multipartFormData.append('bno', bno);
  // multipartFormData.append('bno', board.value.bno);
  if(newBattach.value.files.length != 0) {
    multipartFormData.append('battach', newBattach.value.files[0]);
  }
  await apiBoard.updateBoard(multipartFormData);
  router.push(`/menu07/board/read?bno=${bno}&pageNo=${pageNo}&hit=false`);
}

function handleCancel() {
  router.push(`/menu07/board/read?bno=${bno}&pageNo=${pageNo}&hit=false`);
}

function previewImg() {
  if(newBattach.value.files.length != 0) {
    battach.value = URL.createObjectURL(newBattach.value.files[0]);
  } else {
    battach.value = null;
  }
}

</script>

<style scoped>
</style>