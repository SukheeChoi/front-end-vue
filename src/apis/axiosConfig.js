import axios from 'axios';

// 기본 경로 설정
axios.defaults.baseURL = 'http://localhost';

// 요청 HTTP에 Authorization 헤더 추가
function addAuthHeader(accessToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

// 요청 HTTP에 Authorization 헤더 제거
function removeAuthHeader() {
  delete axios.defaults.headers.common['Authorization'];
}

export default {
  addAuthHeader
  , removeAuthHeader
}