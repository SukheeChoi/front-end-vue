export default [
    {
        path: "/menu07/exam01asynccontrol"
        , component: () => import(/* webpackChunkName: "menu07" */ '../views/menu07/Exam01AsyncControl.vue')
    }
    , {
        path: "/menu07/board/list"
        , component: () => import(/* webpackChunkName: "menu07" */ '../views/menu07/board/List.vue')
    }
    , {
        path: "/menu07/board/writeform"
        , component: () => import(/* webpackChunkName: "menu07" */ '../views/menu07/board/WriteForm.vue')
    }
    , {
        path: "/menu07/board/read"
        , component: () => import(/* webpackChunkName: "menu07" */ '../views/menu07/board/Read.vue')
    }
    , {
        path: "/menu07/board/updateform"
        , component: () => import(/* webpackChunkName: "menu07" */ '../views/menu07/board/UpdateForm.vue')
    }
    , {
        path: "/menu07/auth/join"
        , component: () => import(/* webpackChunkName: "menu07" */ '../views/menu07/auth/Join.vue')
    }
    , {
        path: "/menu07/auth/login"
        , component: () => import(/* webpackChunkName: "menu07" */ '../views/menu07/auth/Login.vue')
    }
];