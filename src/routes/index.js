import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
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
            require(`@/components/dummy/Dummy1`),
            require(`@/components/dummy/Dummy2`),
            require(`@/components/dummy/Dummy3`),
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
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/AppNotFound'),
  }
];

const apps = (process.env.VUE_APP_APPS || '').split(',');

for (const app of apps) {
  let module;
  try {
    module = require(`@@/${app.trim().toLowerCase()}/routes`);
    if (module && module.default && Array.isArray(module.default)) {
      routes.push(...module.default);
    }
  } catch (error) {
    console.error(error);
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('routing wait....................');
  /*
  console.log("routing wait....................");
  if (to.fullPath !== '/login') {
    router.push({path:'/login'})
    next("/login")
  }
  */
  const devMode = true;
  if (devMode === false && to.fullPath !=='/login' && store.state.login.accessToken.length <= 0) {
    console.log("auth error")
    router.push("/login")
  }
  next();
});

export default router;
