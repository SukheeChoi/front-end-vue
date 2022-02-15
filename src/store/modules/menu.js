import { Menu } from '@/model';
const namespace = true;

const state = () => ({
  screenList: [],
  routeRootList: [],
  routeChildList: [],
  routeList: [],
  myMenuList: [],
});

const mutations = {
  setScreenList(state, payload) {
    state.screenList = payload;
  },
  setRouteRootList(state) {
    var rootRoutes = [];

    for (var i = 1; i < state.screenList.length; i++){
      rootRoutes.push({
        path: state.screenList[i].path,
        name: state.screenList[i].name,
        redirect: state.screenList[i].redirect,
        component: () => import('@/views/AppMain'),
        children: []
      });
    }
    state.routeRootList = rootRoutes;
  },
  setRouteRootChildClear(state) {
    for (var i = 0; i < state.routeRootList.length; i++){
      state.routeRootList[i].component = () => import("@/views/AppMain");
      state.routeRootList[i].children = [];
    }
  },
  setRouteChildList(state, {root, child}) {
    for (var i = 0; i < child.length; i++) {
      if (child[i].children) {
        this.commit('setRouteChildList', { root: root, child: child[i].children });
      }
      if (child[i].redirect) {
        root.children.push({
          path: child[i].path,
          name: child[i].name,
          redirect: child[i].redirect,
        });
      } else {
        const fileName = child[i].component;
        root.children.push({
          path: child[i].path,
          name: child[i].name,
          component: () => import('@@/' + fileName),
        });
      }
    }
  },
  setRouteList(state, payload) {
    state.routeList = payload;
  },
  setMyMenuList(state, myMenuList = []) {
    state.myMenuList.splice(0);
    state.myMenuList.push(...myMenuList);
  },
  
};

const actions = {
};

const getters = {

  getRouteRootList(state) {
    return state.routeRootList || [];
  },
  getRouteChildList(state) {
    return state.routeChildList || [];
  }
  /*
  getRootRouteList(state) {
    var rootRoutes = [];
    for (var i = 1; i < state.screenList.length; i++){
      rootRoutes.push({
        path: state.screenList[i].path,
        name: state.screenList[i].name,
        redirect: state.screenList[i].redirect,
        component: () => import("@/views/AppMain"),
        children: []
      });
    }
    return rootRoutes;
  }
  */,
  getChildrenRouteList: (state) => (root, child) =>{
    for (var i = 0; i < child.length; i++){
      if (child[i].children) {
        root.children.push(getters.getChildrenRouteList(root, child[i].children));
        //getters.getChildrenRouteList(root, child[i].children);
      }
      
      if (child[i].redirect) {
        root.children.push({
          path: child[i].path,
          name: child[i].name,
          redirect: child[i].redirect
        })
      } else {
        root.children.push({
          path: child[i].paht,
          name: child[i].name,
          component: () => import(child[i].component)
        })
      }
    }
    return root;
  },
  getScreenList(state) {
    if (typeof state.screenList === 'undefined') {
      return [];
    }

    return state.screenList.map(({ title, name, children }) => Menu.create(title, name, children));
  },
  getRouteList(state) {
    return state.routeList || [];
  },
  getMyMenuList(state) {
    return state.myMenuList || [];
  },
};

export default {
  namespace,
  state,
  mutations,
  actions,
  getters,
};
