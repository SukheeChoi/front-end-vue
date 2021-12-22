import axios from 'axios';
import store from '../store';
import auth from "@/store/auth";

const instance = axios.create({
    baseURL: process.env.VUE_APP_SERVER_IP,
    //baseURL: 'http://localhost:9080',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": ''
    },
});

// 요청 인터셉터
instance.interceptors.request.use(
    function(config) {
        // 요청을 보내기 전에 수행할 일
        console.log()
        config.headers.Authorization = `Bearer ${store.state.login.accessToken}`
            //config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
        return config;
    },
    function(error) {
        // 오류 요청을 보내기전 수행할 일
        return Promise.reject(error);
    }
);

// 응답 인터셉터
instance.interceptors.response.use(

    (response) => {
        return response;
    },
    async(error) => {
        const {
            config,
            response: { status },
        } = error;

        if (status == 401) {
            if (error.response.data.message === 'STATUS_EXPIRED') {
                const originalRequest = config;
                //const refreshToken = await AsyncStorage.getItem('refreshToken');
                const { data } = await axios.post(
                    'http://localhost:9080/com/login/modify-token',
                    null, {
                        params: { userId: '25052408' },
                    }
                );

                const newAccessToken = data.data;
                store.commit('setToken', newAccessToken);
                //isTokenRefreshing = false;
                axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                // 새로운 토큰으로 지연되었던 요청 진행
                // onTokenRefreshed(newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            }
            const retryOriginalRequest = new Promise((resolve) => {
                addRefreshSubscriber((newAccessToken) => {
                    originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
                    resolve(axios(originalRequest));
                });
            });
            return retryOriginalRequest;
        }
        return Promise.reject(error);
    }

    /*
    function(response) {
        // 응답 데이터를 가공
        return response;
    },
    function(error) {
        // 오류 응답을 처리

        if (error.response.status === 401 ||
            store.state.login.accessToken === null) {
            window.location.href = "/oss-login"
        }

        return Promise.reject(error);
    }
    */
);

export default instance;