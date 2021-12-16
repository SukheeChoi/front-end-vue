import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/AppMain'),
    props: {
      left: {
        show: true,
      },
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/AppLogin'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/AppNotFound'),
  },
  {
    path: '/oss-login',
    name: 'login',
    component: () => import('../views/login/OssLogin.vue'),
  },
  // {
  //   path: "/part-timer-login",
  //   name: "partTimerLogin",
  //   component: () => import ("../views/login/PartTimerLogin.vue")
  // },
  // {
  //   path: "/sup-login",
  //   name: "supLogin",
  //   component: () => import ("../views/login/SupLogin.vue")
  // },
];

const apps = (process.env.VUE_APP_APPS || '').split(',');

for (const app of apps) {
  let module;
  try {
    module = require(`@/apps/${app.trim().toLowerCase()}/routes`);
    if (module && module.default && Array.isArray(module.default)) {
      routes.push(...module.default);
    }
  } catch (error) {
    console.error(error);
  }
}

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
