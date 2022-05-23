import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import menu01 from './menu01';
import menu02 from './menu02';
import menu03 from './menu03';
import menu04 from './menu04';
import menu05 from './menu05';

const routes = [
  {
    path: '/',
    name: "home",
    component: HomeView
  }
  , {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
  , ...menu01
  , ...menu02
  , ...menu03
  , ...menu04
  , ...menu05
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
