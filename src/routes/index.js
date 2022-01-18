import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import menuMaker from '@/routes/menuMaker.js';
/*
const setComponet = {
  props: ['path'],
  //component: () => import('@@/com/views/The' + {{ path }})
  //template: () => import('/src/app/com/views/TheBatchMgmt')
  render(h, ctx) {
    return h(()=> import('@@/com/views/TheBatchMgmt'), ctx.data, ctx.children)
  }
}*/
/*
function setComponent() {
  return () => import('@@/com/views/The{{$route.params.path}}')
}
*/
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
  },
/*
  {
    path: '/com',
    name: 'com',
    redirect: '/com/Batch',
    component: () => import('@/views/AppMain'),
    props: {
      left: {
        show: false,
      },
    },
    meta: {
      title: '공통관리',
    },
    children: [
      
      {
        path: 'Batch',
        name: 'COMBT',
        redirect: '/com/BatchMgmt',
        meta: {
          breadcrumbs: '배치관리',
        },
      },
      {
        path: ':path',
       //component: setComponent,
        //component: setComponent('BatchMgmt'),
        //component: () => import('@/views/ComComponent'),
        props: true
        
        props: (route) => ({
          selectedComp: route.params.path
        })
        
        //component: () => import('@@/com/views/The'+route.params.path),
      },
    ],
  },
*/
  /*
  {
    path: '/com',
    name: 'com',
    redirect: '/com/Batch',
    component: () => import('@/views/AppMain'),
    props: {
      left: {
        show: false,
      },
    },
    meta: {
      title: '공통관리',
    },
    children: [
      // 배치관리(BT)
      {
        path: 'Batch',
        name: 'COMBT',
        redirect: '/com/BatchMgmt',
        meta: {
          breadcrumbs: '배치관리',
        },
      },
      {
        path: 'BatchMgmt',
        name: 'COMBT001',
        component: () => import('@@/com/views/TheBatchMgmt'),
        meta: {
          title: '배치작업',
        },
      }
    ],
  },
  */
];/*
function setComponent(name) {
  return () => import('/src/app/com/views/The' + name);
}
*/
function loadRoutes() {
  const context = require.context('@/app', true, /(\/routes\/)index\.js$/);
  for (const key of context.keys()) {
    const module = context(key);
    if (module.default) {
      routes.push(...module.default);
    }
  }
}

loadRoutes();

// const apps = (process.env.VUE_APP_APPS || '').split(',');

// for (const app of apps) {
//   let module;
//   try {
//     module = require(`@@/${app.trim().toLowerCase()}/routes`);
//     if (module && module.default && Array.isArray(module.default)) {
//       routes.push(...module.default);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to, from, failure) => {
  console.log(to);
  console.log(from);
  /*
  if (from.fullPath === '/login') {
    if (store.state.login.menus.length > 0) {
          let dynamicRouter = [];
          const MenuList = store.state.login.menus;
          for (var i = 0; i < MenuList.length; i++) {
            //newRoutes.append(menuMaker.tree(jsonArr[i]));
            dynamicRouter.push(menuMaker.tree(MenuList[i], true));
          }
          for (var i = 0; i < dynamicRouter.length; i++) {
            //router.addRoute(dynamicRouter[i]);
            routes.push(dynamicRouter[i]);
          }
          
      //this.$store.commit('setMenus', dynamicRouter);

        }
  }
  */
});
/*
function findName(menus, path) {
  var name = "";
  
  if (menus.length > 1) {
    for (var i = 0; i < menus.length; i++){
      if (menus[i].path === path) {
        return menus[i].name;
      }

      if (menus[i].children) {
        return findName(menus[i].children, path);
      }

    }
  }
  if (menus.children) {
    return findName(menus.children, path);
  }
  
  name = menus.path === path ? menus.name : "";
  
  return name;

}*/
function findName(menus, path) {
  var name ="";
  if (menus.path === path) {
    console.log(menus.path);
    console.log(menus.name)
    name = menus.name;
    return name;
  }

  if (menus.children) {
    for (var i = 0; i < menus.children.length; i++){
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
  //router.push({ path: '/com/BatchMgmt', name: 'COMBT001', component: () => import('@@/com/views/TheBatchMgmt'), meta: { title: '배치작업' } })
  /*
  if (to.name === undefined && store.state.login.menus.length > 0) {
    console.log(to.name);
    var menus = store.state.login.menus;
    console.log(menus);
    for (var i = 0; i < menus.length; i++) {
      console.log(to.path.split('/')[2]);
      to.name = findName(menus[i], to.path.split('/')[2]);
    }
  }
 */
  /*
  console.log("routing wait....................");
  if (to.fullPath !== '/login') {
    router.push({path:'/login'})
    next("/login")
  }
  */
  const devMode = true;
  if (devMode === false && to.fullPath !== '/login' && store.state.login.accessToken.length <= 0) {
    console.log('auth error');
    router.push('/login');
  }
  
  next();
});

export default router;
