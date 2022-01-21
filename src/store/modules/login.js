import { Menu } from '@/model';

export default {
  namespace: true,
  state: {
    accessToken: '',
    userInfo: '',
    ttl: '',
    menus: [],
  },
  getters: {
    getMenus(state) {
      return state.menus.map(({ title, name, children }) => Menu.create(title, name, children));
    },
    getRootOrg(state) {
      let orgData = [];
      
      if (state.userInfo.orgList) {
        if (state.userInfo.orgList[0].children) {
          orgData = {
            orgCd: state.userInfo.orgList[0].children[0].orgCd,
            orgNm: state.userInfo.orgList[0].children[0].orgNm,
          };
        } else {
          orgData = {
            orgCd: state.userInfo.orgList[0].orgCd,
            orgNm: state.userInfo.orgList[0].orgNm,
          };
        }
      }
      return orgData;
    },
    getOrgList(state) {
      let orgList = [];
      if (state.userInfo.orgList) {
        
      
        let orgData = state.userInfo.orgList || [];

        while (orgData[0].children) {
          orgList.push({
            orgCd: orgData[0].children[0].orgCd,
            orgNm: orgData[0].children[0].orgNm,
          });
          orgData = orgData[0].children;
        }
        if (orgList.length > 1) {
          orgList.shift();
        }
      }

      return orgList || [];

    }
  },
  mutations: {
    setToken(state, payload) {
      state.accessToken = payload;
    },
    setTtl(state, payload) {
      state.ttl = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    setMenus(state, payload) {
      state.menus = payload;
    },
  },
};
