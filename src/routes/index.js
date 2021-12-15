import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/AppMain'),
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
];

const apps = (process.env.VUE_APP_APPS || '').split(',');

for (const app of apps) {
  const module = require(`@/app/${app.toLowerCase()}/routes`).default;
  if (module && Array.isArray(module)) {
    routes.push(...module);
  }
}

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
