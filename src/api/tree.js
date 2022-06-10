'use strict';

import http from '@/api';

const ORG_URI = '/com/OrgMgr';

const GET_ORG_NODE_LIST = '/getNodeList';
const GET_ORG_NODE_LIST_WITH_USERS = '/getNodeListWithUser';

const ROOT_ORG_CD = '0000';

/**
 * 조직도 정보 반환
 *
 * @param {String} ehrOrgCd 트리의 시작 조직 코드
 * @param {Boolean} withUsers 트리의 사용자 포함 여부
 * @returns {Array} 조직도 정보
 */
export async function getOrganization(ehrOrgCd = ROOT_ORG_CD, withUsers = false) {
  const URI = ORG_URI + (withUsers ? GET_ORG_NODE_LIST_WITH_USERS : GET_ORG_NODE_LIST);
  const res = await http.get(URI, {
    params: {
      ehrOrgCd,
    },
  });
  return res.data.data;
}

/**
 * 조직도 정보 반환(사용자 포함)
 *
 * @param {String} orgCd 트리의 시작 조직 코드
 * @returns {Array} 조직도 정보(사용자 포함)
 */
export function getOrganizationWithUsers(ehrOrgCd) {
  return getOrganization(ehrOrgCd, true);
}
