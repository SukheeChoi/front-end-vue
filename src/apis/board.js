import axios from "axios";
import apiAuth from '@/apis/auth';

// 게시물 목록 요청
async function getBoardList(pageNo=1) {
  let response = null;
  console.log('11111111111111');
  try {
    response = await axios.get('/board/list', {params: {pageNo: pageNo}});
    console.log('222222222222222' + 'pageNo : ' + pageNo);
    return {result: 'success', data: response.data, pageNo: pageNo};
    // console.log(response);
  } catch(error) {
    console.log('3333333333333333333333');
    if(error.response) {
      // 서버 응답이 있다
      if(error.response.status === 403) {
        if(await apiAuth.refreshToken()) {
          console.log('~~~~~~~~~~~~~~~~');
          response = await axios.get('/board/list', {params: {pageNo: pageNo}});
          return {result: 'success', data: response.data, pageNo: pageNo};
        }
      }
    } else {
      // 네크워크 오류
      return {result: 'fail-network'};
    }
  }

}

// 게시물 작성(멀티 파트로 구성해서 전달)
async function createBoard(multipartFormData) {
  let dbBoard = null;
  try {
    const response = await axios.post('/board/', multipartFormData);
    dbBoard = response.data;
  } catch(error) {
    if(error.response) {
      // 서버 응답이 있다
      if(error.response.status === 403) {
        if(await apiAuth.refreshToken()) {
          console.log('~~~~~~~~~~~~~~~~');
          const response = await axios.post('/board/', multipartFormData);
          dbBoard = response.data;
        }
      }
    }
    console.log(error);
  }

  return dbBoard;
}

// 게시물 가져오기
async function readBoard(bno, hit) {
  let board = null;
  try {
    const response = await axios.get(`/board/${bno}?hit=${hit}`);
    board = response.data;
  } catch(error) {
    console.log(error);
    if(error.response.status === 403) {
      if(await apiAuth.refreshToken()) {
        console.log('~~~~~~~~~~~~~~~~');
        const response = await axios.get(`/board/${bno}?hit=${hit}`);
        board = response.data;
      }
    }
  }
  return board;
}

// 파일 다운로드
async function downloadBoardAttach(bno) {
  let blob = null;
  try {
    const response = await axios.get(`/board/battach/${bno}`, {responseType: 'blob'});
    blob = response.data;
  } catch(error) {
    console.log(error);
    if(error.response.status === 403) {
      if(await apiAuth.refreshToken()) {
        console.log('~~~~~~~~~~~~~~~~');
        const response = await axios.get(`/board/battach/${bno}`, {responseType: 'blob'});
        blob = response.data;
      }
    }
  }
  return blob;
}

// 게시물 삭제
async function deleteBoard(bno) {
  let result = null;
  try {
    const response = await axios.delete(`/board/${bno}`);
    result = response.data.result;
  } catch(error) {
    console.log(error);
    if(error.response.status === 403) {
      if(await apiAuth.refreshToken()) {
        console.log('~~~~~~~~~~~~~~~~');
        const response = await axios.delete(`/board/${bno}`);
        result = response.data.result;
      }
    }
  }
  return result;
}

// 게시물 수정
async function updateBoard(multipartFormData) {
  let dbBoard = null;
  try {
    const response = await axios.put(`/board/`, multipartFormData);
    dbBoard = response.data;
  } catch(error) {
    console.log(error);
    if(error.response.status === 403) {
      if(await apiAuth.refreshToken()) {
        console.log('~~~~~~~~~~~~~~~~');
        const response = await axios.put(`/board/`, multipartFormData);
        dbBoard = response.data;
      }
    }
  }
  return dbBoard;
}


// 내보내기
export default {
  getBoardList
  , createBoard
  , readBoard
  , downloadBoardAttach
  , deleteBoard
  , updateBoard
}