export default [
  {
    path: '/com',
    name: 'com',
    redirect: '/com/BatchMgmt',
    component: () => import('@/views/AppMain'),
    children: [
      // 배치관리(BT)
      {
        path: 'Batch',
        name: 'COMBT',
        redirect: '/com/BatchMgmt',
      },
      {
        path: 'BatchMgmt',
        name: 'COMBT001',
        component: () => import('@/apps/com/views/TheBatchMgmt'),
      },
      {
        path: 'BatchResult',
        name: 'COMBT002',
        component: () => import('@/apps/com/views/TheBatchResult'),
      },
      {
        path: 'BatchHistory',
        name: 'COMBT003',
        component: () => import('@/apps/com/views/TheBatchHistory'),
      },
      // 권한관리(AU)
      {
        path: 'Auth',
        name: 'COMAU',
        redirect: '/com/UserMgmt',
      },
      {
        path: 'UserMgmt',
        name: 'COMAU001',
        component: () => import('@/apps/com/views/TheUserMgmt'),
      },
      {
        path: 'EtcUserMgmt',
        name: 'COMAU002',
        component: () => import('@/apps/com/views/TheEtcUserMgmt'),
      },
      {
        path: 'BizGroupMgmt',
        name: 'COMAU003',
        component: () => import('@/apps/com/views/TheBizGroupMgmt'),
      },
      {
        path: 'DeptBizGroup',
        name: 'COMAU004',
        component: () => import('@/apps/com/views/TheDeptBizGroup'),
      },
      {
        path: 'ScreenMgmt',
        name: 'COMAU005',
        component: () => import('@/apps/com/views/TheScreenMgmt'),
      },
      {
        path: 'MenuMgmt',
        name: 'COMAU006',
        component: () => import('@/apps/com/views/TheMenuMgmt'),
      },
      {
        path: 'BizGroupMenu',
        name: 'COMAU007',
        component: () => import('@/apps/com/views/TheBizGroupMenu'),
      },
      {
        path: 'UserBizGroup',
        name: 'COMAU008',
        component: () => import('@/apps/com/views/TheUserBizGroup'),
      },
      {
        path: 'MainMgmt',
        name: 'COMAU009',
        component: () => import('@/apps/com/views/TheMainMgmt'),
      },
      {
        path: 'DashboardMgmt',
        name: 'COMAU010',
        component: () => import('@/apps/com/views/TheDashboardMgmt'),
      },
      // 데이터표준(ST)
      {
        path: 'Standard',
        name: 'COMST',
        redirect: '/com/WordMgmt',
      },
      {
        path: 'WordMgmt',
        name: 'COMST001',
        component: () => import('@/apps/com/views/TheWordMgmt'),
      },
      {
        path: 'ForbiddenWord',
        name: 'COMST002',
        component: () => import('@/apps/com/views/TheForbiddenWord'),
      },
      {
        path: 'TermsMgmt',
        name: 'COMST003',
        component: () => import('@/apps/com/views/TheTermsMgmt'),
      },
      {
        path: 'DomainMgmt',
        name: 'COMST004',
        component: () => import('@/apps/com/views/TheDomainMgmt'),
      },
      // 보고서(RP)
      {
        path: 'Report',
        name: 'COMRP',
        redirect: '/com/LoginHistory',
      },
      {
        path: 'LoginHistory',
        name: 'COMRP001',
        component: () => import('@/apps/com/views/TheLoginHistory'),
      },
      {
        path: 'AccessHistory',
        name: 'COMRP002',
        component: () => import('@/apps/com/views/TheAccessHistory'),
      },
      {
        path: 'ExcelHistory',
        name: 'COMRP003',
        component: () => import('@/apps/com/views/TheExcelHistory'),
      },
      // 설정(CF)
      {
        path: 'Configuration',
        name: 'COMCF',
        redirect: '/com/LangCode',
      },
      {
        path: 'LangCode',
        name: 'COMCF001',
        component: () => import('@/apps/com/views/TheLangCode'),
      },
      {
        path: 'TimeZone',
        name: 'COMCF002',
        component: () => import('@/apps/com/views/TheTimeZone'),
      },
      {
        path: 'Currency',
        name: 'COMCF003',
        component: () => import('@/apps/com/views/TheCurrency'),
      },
      {
        path: 'MessageMgmt',
        name: 'COMCF004',
        component: () => import('@/apps/com/views/TheMessageMgmt'),
      },
      {
        path: 'CodeMgmt',
        name: 'COMCF005',
        component: () => import('@/apps/com/views/TheCodeMgmt'),
      },
      {
        path: 'TemplateMgmt',
        name: 'COMCF006',
        component: () => import('@/apps/com/views/TheTemplateMgmt'),
      },
      {
        path: 'SystemConfig',
        name: 'COMCF007',
        component: () => import('@/apps/com/views/TheSystemConfig'),
      },
      {
        path: 'PasswordMgmt',
        name: 'COMCF008',
        component: () => import('@/apps/com/views/ThePasswordMgmt'),
      },
      // 인터페이스(IF)
      {
        path: 'Interface',
        name: 'COMIF',
        redirect: '/com/InterfaceMgmt',
      },
      {
        path: 'InterfaceMgmt',
        name: 'COMIF001',
        component: () => import('@/apps/com/views/TheInterfaceMgmt'),
      },
      {
        path: 'InterfaceStatus',
        name: 'COMIF002',
        component: () => import('@/apps/com/views/TheInterfaceStatus'),
      },
      // 개인화 설정(PE)
      {
        path: 'Personalization',
        name: 'COMPE',
        redirect: '/com/PersonalInfo',
      },
      {
        path: 'PersonalInfo',
        name: 'COMPE001',
        component: () => import('@/apps/com/views/ThePersonalInfo'),
      },
      {
        path: 'PasswordChange',
        name: 'COMPE002',
        component: () => import('@/apps/com/views/ThePasswordChange'),
      },
      {
        path: 'ApprovalPassword',
        name: 'COMPE003',
        component: () => import('@/apps/com/views/TheApprovalPassword'),
      },
      {
        path: 'AbsenceMgmt',
        name: 'COMPE004',
        component: () => import('@/apps/com/views/TheAbsenceMgmt'),
      },
      {
        path: 'NoticeMgmt',
        name: 'COMPE005',
        component: () => import('@/apps/com/views/TheNoticeMgmt'),
      },
    ],
  },
];
