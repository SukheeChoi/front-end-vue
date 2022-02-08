import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import login from '@/api/login.js';
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
            require('@/views/dashboard/ThePanel1'),
            require('@/views/dashboard/ThePanel2'),
            require('@/views/dashboard/ThePanel3'),
            require('@/views/dashboard/ThePanel4'),
            require('@/views/dashboard/ThePanel5'),
            require('@/views/dashboard/ThePanel6'),
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
  },
];
function loadRoutes() {
  const context = require.context('@@', true, /(\/routes\/)index\.js$/);
  for (const key of context.keys()) {
    const module = context(key);
    if (module.default) {
      routes.push(...module.default);
    }
  }
}

loadRoutes();

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to, from, failure) => {
  console.log(to);
  console.log(from);
});

function findName(menus, path) {
  var name = '';
  if (menus.path === path) {
    console.log(menus.path);
    console.log(menus.name);
    name = menus.name;
    return name;
  }

  if (menus.children) {
    for (var i = 0; i < menus.children.length; i++) {
      name = findName(menus.children[i], path);
      if (name.length > 0) {
        return name;
      }
    }
  }
  return name;
}

router.beforeEach((to, from, next) => {
  console.log('routing wait....................');
  console.log(to);
  console.log(from);

  const devMode = true;
  const now = new Date();

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
