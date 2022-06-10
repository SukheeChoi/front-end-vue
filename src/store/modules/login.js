export default {
  namespace: true,
  state: {
    accessToken: '',
    userInfo: '',
    ttl: '',
    isLogin: false,
  },
  getters: {
    init(state) {
      state.accessToken = '';
      state.userInfo = '';
      state.ttl = '';
      state.savedIdInfo = '';
    },
    getToken(state) {
      return state.accessToken;
    },
    getTtl(state) {
      return state.ttl;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
    getRootOrg(state) {
      let orgData = [];
      if (typeof state.userInfo === 'undefined') {
        return orgData;
      }
      if (typeof state.userInfo.ehrOrgList !== 'undefined') {
        if (state.userInfo.ehrOrgList[0].children && state.userInfo.ehrOrgList[0].children.length > 0) {
          orgData = {
            ehrOrgCd: state.userInfo.ehrOrgList[0].children[0].ehrOrgCd,
            orgNm: state.userInfo.ehrOrgList[0].children[0].orgNm,
          };
        } else {
          orgData = {
            ehrOrgCd: state.userInfo.ehrOrgList[0].ehrOrgCd,
            orgNm: state.userInfo.ehrOrgList[0].orgNm,
          };
        }
      }
      return orgData;
    },
    getOrgList(state) {
      let ehrOrgList = [];
      if (state.userInfo.length <= 0 || typeof state.userInfo === 'undefined') {
        return ehrOrgList;
      }
      if (state.userInfo.ehrOrgList[0].children.length <= 0) {
        return ehrOrgList;
      }
      let orgData = state.userInfo.ehrOrgList[0].children;

      while (orgData[0].children && orgData[0].children.length > 0) {
        ehrOrgList.push({
          ehrOrgCd: orgData[0].children[0].ehrOrgCd,
          orgNm: orgData[0].children[0].orgNm,
        });
        orgData = orgData[0].children;
      }

      return ehrOrgList || [];
    },
    isLogin(state) {
      return state.isLogin;
    },
  },
  mutations: {
    setAuth(state, payload) {
      //const jsonData = JSON.parse(payload);
      const jsonData = payload;
      const accessToken = jsonData.accessToken;
      const ttl = jsonData.ttl;

      state.accessToken = accessToken;
      state.ttl = ttl;
    },

    setToken(state, payload) {
      state.accessToken = payload;
    },
    setTtl(state, payload) {
      state.ttl = payload;
    },
    setUserInfo(state, payload) {
      //const jsonData = JSON.parse(payload);
      const jsonData = payload;
      state.userInfo = jsonData;
      state.isLogin = true;
    },
  },
};
