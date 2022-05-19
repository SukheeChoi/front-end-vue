export default [
    {
        path: "/menu02/exam01binding"
        , component: () => import(/* webpackChunkName: "menu02" */ '../views/menu02/Exam01Binding.vue')
    }
    , {
        path: "/menu02/exam02refdata"
        , component: () => import(/* webpackChunkName: "menu02" */ '../views/menu02/Exam02RefData.vue')
    }
    , {
        path: "/menu02/exam03reactivedata"
        , component: () => import(/* webpackChunkName: "menu02" */ '../views/menu02/Exam03ReactiveData.vue')
    }
    , {
        path: "/menu02/exam04attrbinding"
        , component: () => import(/* webpackChunkName: "menu02" */ '../views/menu02/Exam04AttrBinding')
    }
    , {
        path: "/menu02/exam05formbinding"
        , component: () => import(/* webpackChunkName: "menu02" */ '../views/menu02/Exam05FormBinding.vue')
    }
];