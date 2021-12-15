import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'application/json';

const LOGIN_URL = 'http://localhost:9080/com/login';


const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Authorization": ''
    }
});

instance.interceptors.request.use(
    function(config) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
        return config;

    },
    function(error) {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    function(response) {
        console.log(response);
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
)

export default instance;

/* 로그인 시도 */
/*
function doLogin(loginId, password) {
    return axios.post(LOGIN_URL + 'do-login', {
            loginId: loginId,
            password: password
        })
        .then(response => {
            if (response.data.access)
        })
}
*/
/* 사용자 정보 획득 */
/*
function getUserInfo() {
    return axios.get("user-info")
}
*/
/* 권한 정보 획득 */
/*
function getUserAuth() {
    return axios.get("auth-info")
}
*/