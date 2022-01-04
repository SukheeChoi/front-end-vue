import restApi from "./restApi";

class Login {
    requestLogin(url, id, pw, type) {
        const params = { "loginId": id, "password": pw, "userType": type };
        return restApi.approve(url, params);
    }

    getUserInfo(url, id) {
        const params = { "userId": id };
        return restApi.get(url, params);
    }

    getUserAuth(url) {
        return restApi.get(url);
    }

    requestModifyToken(url, id) {
        const params = { "userId": id };
        return restApi.approve(url, params);
    }


}
export default new Login();