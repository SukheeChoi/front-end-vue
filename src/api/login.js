import restApi from "./restApi";
import store from "@/store";
import axios from 'axios';

class Login {
    requestLogin(url, id, pw, type) {
        const params = { loginId: id, password: pw, userType: type };
        //return restApi.approve(url, null, '', params);
        return restApi.approve(url, JSON.stringify(params), "Login");
    }
    requestReissueToken(url, id) {
        const params = { userId: id };
        return restApi.get(url, params, "ReissueToken");
    }

    getUserInfo(url, id) {
        const params = { "userId": id };
        return restApi.get(url, params, "UserInfo");
    }

    getMenuList(url) {
        const params = {
            userId: store.state.login.userId,
            orgCd: store.state.login.orgCd
        };

        return restApi.getListPost(url, JSON.stringify(params));
    }

    getUserAuth(url) {
        return restApi.get(url);
    }

    requestModifyToken(url, id) {
        const params = { "userId": id };
        return restApi.approve(url, params);
    }

    setAuth(response) {
        const jsonData = JSON.parse(response.data.data);
        const accessToken = jsonData.accessToken;
        const ttl = jsonData.ttl;

        store.commit('setToken', accessToken);
        store.commit('setTtl', ttl);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    }


}
export default new Login();