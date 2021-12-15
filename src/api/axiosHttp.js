import axios from "axios";
//import auth from "../store/auth";

const instance = axios.create({
    //baseURL: process.env.OWS_BASE_URL,
    baseURL: 'http://localhost:9080',
    headers: {
        "Content-Type": "application/json",
        "Authorization": ''
    }
});

instance.interceptors.request.use(
    function(config) {
        //config.headers.Authorization = `Bearer ${auth.state.accessToken}`
        config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
        return config
    },
    function(error) {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function(response) {
        return response;
    },

    function(error) {
        if (error.response.status === 401) {
            alert('로그인 정보가 없습니다.')
            window.location.href = '/unauthorized'
        } else {
            return Promise.reject(error);
        }
    }
);

export default instance;