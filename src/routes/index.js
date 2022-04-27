import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import login from '@/api/login.js';
import { requestReissueToken } from '@/api/login.js';
import loading from '../store/modules/loading';
const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/views/AppMain'),
    redirect: 'main',
    props: {
      left: {
        show: true,
      },
    },
    children: [
      {
        path: 'main',
        name: 'main',
        component: () => import('@/views/AppDashboard'),
        props: {
          components: [
            require('@/views/dashboard/Panel1'),
            require('@/views/dashboard/Panel2'),
            require('@/views/dashboard/Panel3'),
            require('@/views/dashboard/Panel4'),
            require('@/views/dashboard/Panel5'),
            require('@/views/dashboard/Panel6'),
          ],
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/AppLogin'),
  },
  {
    path: '/tabletMain',
    name: 'tabletMain',
    component: () => import('@/views/TabletMain'),
  },
  {
    path: '/tabletLogin',
    name: 'tabletLogin',
    component: () => import('@/views/TabletLogin'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/AppNotFound'),
  },
];
function loadRoutes() {
  console.log('initialize loadRoutes');
  store.commit('setRouteRootChildClear');
  var routeRootList = store.getters.getRouteRootList;
  var screenList = store.getters.getScreenList;
  for (var i = 0; i < routeRootList.length; i++) {
    store.commit('setRouteChildList', { root: routeRootList[i], child: screenList[i + 1].children });
    routes.push(routeRootList[i]);
  }

  const context = require.context('@@', true, /(\/routes\/)index\.js$/);
  for (const key of context.keys()) {
    const module = context(key);
    if (module.default) {
      console.log(module.default);
      routes.push(...module.default);
    }
  }
}

loadRoutes();

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to, from, failure) => {});

router.beforeEach(async (to, from, next) => {
  console.log(to);
  const routeList = store.getters.getRouteList;

  const devMode = false;
  const now = new Date();

  // console.log('token time   : ' + store.getters.getTtl);
  // console.log('current time : ' + now.getTime());
  const nowTime = now.getTime();

  if (devMode === false && to.fullPath !== '/login' && store.getters.getTtl < now.getTime()) {
    console.log('need refreshing');
    const newData = await requestReissueToken('/com/Auth', store.getters.getUserInfo.userId);
    //login.setAuth(newData);
    store.commit('setAuth', newData.data.data);
  }

  if (devMode === false && to.fullPath !== '/login' && store.state.login.ttl < now.getTime()) {
    //store.commit('reset');
    //router.push('/login');
  }

  if (devMode === false && to.fullPath !== '/login' && !store.state.login.accessToken) {
    store.commit('reset');
    router.push('/login');
  }

  next();
});

export default router;
