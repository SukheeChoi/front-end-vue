export default {
  USE_YN: [
    { name: 'Y', value: 'Y' },
    { name: 'N', value: 'N' },
  ],
  SCREEN_TP: [
    { value: 'MAIN', name: '메인화면' },
    { value: 'DASHBAORD', name: 'DashBoard' },
  ],
  DATA_AUTH: [
    { value: '-1', name: '처리안함' },
    { value: '100', name: '본인자료' },
    { value: '200', name: '본인부서자료' },
    { value: '300', name: '상위부서자료' },
    { value: '400', name: '사용자정의 부서그룹' },
    { value: '0', name: '전체' },
  ],
  TO_ROLE: [
    { value: '0', name: '없음' },
    { value: '1', name: '만' },
    { value: '2', name: '이상' },
    { value: '3', name: '까지' },
    { value: '4', name: '사이' },
  ],
  USER_SEARCH_KEY: [
    { value: '1', name: '이름' },
    { value: '2', name: '사번' },
    { value: '3', name: '전화번호' },
    { value: '4', name: '이메일' },
  ],
  SCREEN_LAYOUT: [
    { name: '', value: 0, scrnRto: [] },
    { name: '라디오1', value: 1, scrnRto: [100], path: 'dashboard_1.png' },
    { name: '라디오2', value: 2, scrnRto: [50, 50], path: 'dashboard_2.png' },
    { name: '라디오3', value: 3, scrnRto: [50, 50, 100], path: 'dashboard_3.png' },
    { name: '라디오4', value: 4, scrnRto: [100, 100], path: 'dashboard_4.png' },
    { name: '라디오5', value: 5, scrnRto: [100, 50, 50], path: 'dashboard_5.png' },
    { name: '라디오6', value: 6, scrnRto: [50, 50, 50, 50], path: 'dashboard_6.png' },
    { name: '라디오7', value: 7, scrnRto: [33, 33, 33, 33, 33, 33], path: 'dashboard_7.png' },
    { name: '라디오8', value: 8, scrnRto: [50, 50, 33, 33, 33], path: 'dashboard_8.png' },
    { name: '라디오9', value: 9, scrnRto: [33, 33, 33, 50, 50], path: 'dashboard_9.png' },
    { name: '라디오10', value: 10, scrnRto: [100, 33, 33, 33], path: 'dashboard_10.png' },
    { name: '라디오11', value: 11, scrnRto: [33, 33, 33, 100], path: 'dashboard_11.png' },
  ],
  SYM_LCTN: [
    { value: '', name: '공백' },
    { value: 'P', name: '앞' },
    { value: 'S', name: '뒤' },
  ],
  MSG_TPL_GRP_TP: [
    { value: '01', name: '시스템' },
    { value: '02', name: '사용자' },
  ],
  MSG_TPL_TP: [
    { value: '01', name: 'Email' },
    { value: '02', name: 'SMS' },
    { value: '03', name: 'Mobile Push' },
    { value: '04', name: 'Web Push' },
    { value: '05', name: 'Kakao' },
  ],
  TPL_CN_FMT_TP: [
    { value: '01', name: 'HTML' },
    { value: '02', name: 'TEXT' },
  ],
  CTRY_CD: [{ value: 'ko', name: '대한민국' }],
  CD_PSNT_DVCD: [
    { value: 'CM', name: '공통코드' },
    { value: 'DV', name: '개별코드' },
    { value: 'IF', name: '연계코드' },
  ],
  CONN_SYS_CD: [
    { value: 'SAP', name: 'SAP' },
    { value: 'CRM', name: 'CRM' },
    { value: 'CIMS', name: 'CIMS' },
  ],
  OW_TASK_CD: [
    { value: 'LIF', name: 'LIF' },
    { value: 'LCM', name: 'LCM' },
    { value: 'LOG', name: 'LOG' },
  ],
};
