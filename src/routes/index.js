import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const routes = [{
        path: '/',
        redirect: '/main',
    },
    {
        path: '/main',
        name: 'main',
        component: () =>
            import ('@/views/AppMain'),
        // 임시
        redirect: '/com',
        props: {
            left: {
                show: true,
            },
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/AppLogin'),
    },
    {
        path: '/:pathMatch(.*)*',
        component: () =>
            import ('@/views/AppNotFound'),
    },
    {
        path: '/oss-login',
        name: 'login',
        component: () =>
            import ('../views/login/OssLogin.vue'),
    },
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

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
/*
router.beforeEach((to, from, next) => {
    if (to.name !== 'ossLogin' && store.state.login.accessToken == '') {
        next('/oss-login');
    }
    next();

});
*/
export default router;