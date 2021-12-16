import restApi from "./restApi";

class Login {
    requestLogin(url, id, pw) {
        const params = { "loginId": id, "password": pw };
        return restApi.approve(url, params);
    }

    getUserInfo(url, id) {
        const params = { "userId": id };
        return restApi.execute(url, params);
    }

    getUserAuth(url) {
        return restApi.get(url);
    }


}
export default new Login();