import axios from 'axios';

const instance = axios.create({
    //baseURL: process.env.OWS_BASE_URL,
    baseURL: 'http://localhost:9080',
    headers: {
        'Content-Type': 'application/json',
        Authorization: '',
    },
});

// 요청 인터셉터
axios.interceptors.request.use(
    function(config) {
        // 요청을 보내기 전에 수행할 일
        //config.headers.Authorization = `Bearer ${auth.state.accessToken}`
        config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
        return config;
    },
    function(error) {
        // 오류 요청을 보내기전 수행할 일
        return Promise.reject(error);
    }
);

// 응답 인터셉터
instance.interceptors.response.use(
    function(response) {
        // 응답 데이터를 가공
        return response;
    },
    function(error) {
        // 오류 응답을 처리
        return Promise.reject(error);
    }
);

export { instance };