export default [
  {
    path: '/adm',
    name: 'adm',
    component: () => import('@/views/AppMain'),
    props: {},
    children: [
      {
        path: 'Aa',
        name: 'Aa',
        component: () => import('@/app/com/views/AppAa'),
      },
      // {
      //   path: 'bt',
      //   name: 'bt',
      //   meta: {
      //     title: '배치관리',
      //   },
      //   component: () => import('@/app/com/views/BatchMgmt'),
      // },
      // {
      //   path: 'au',
      //   name: 'au',
      //   meta: {
      //     title: '권한관리',
      //   },
      //   component: () => import('@/app/com/views/BatchMgmt'),
      // },
      // {
      //   path: 'st',
      //   name: 'st',
      //   meta: {
      //     title: '데이터표준',
      //   },
      //   component: () => import('@/app/com/views/BatchMgmt'),
      // },
      // {
      //   path: 'rp',
      //   name: 'rp',
      //   meta: {
      //     title: '보고서',
      //   },
      //   component: () => import('@/app/com/views/BatchMgmt'),
      // },
      // {
      //   path: 'cf',
      //   name: 'cf',
      //   meta: {
      //     title: '설정',
      //   },
      //   component: () => import('@/app/com/views/BatchMgmt'),
      // },
      // {
      //   path: 'if',
      //   name: 'if',
      //   meta: {
      //     title: '인터페이스',
      //   },
      //   component: () => import('@/app/com/views/BatchMgmt'),
      // },
      // {
      //   path: 'pe',
      //   name: 'pe',
      //   meta: {
      //     title: '개인화 설정',
      //   },
      //   component: () => import('@/app/com/views/BatchMgmt'),
      // },
    ],
  },
];
