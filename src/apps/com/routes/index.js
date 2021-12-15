export default [
  {
    path: '/com',
    name: 'com',
    component: () => import('@/views/AppMain'),
    children: [
      {
        path: 'BatchMgmt',
        name: 'COMBT001',
        component: () => import('@/apps/com/views/TheBatchMgmt'),
      },
    ],
  },
];
