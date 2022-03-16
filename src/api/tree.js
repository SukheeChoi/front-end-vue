import http from '@/api';

const ORG_URI = '/com/OrgMgr';

const GET_NODE_LIST = '/getNodeList';
const GET_NODE_LIST_WITH_USERS = '/getNodeListWithUser';

/**
 * 조직도 정보 반환
 *
 * @param {String} orgCd 트리의 시작 조직 코드
 * @param {Boolean} withUsers 트리의 사용자 포함 여부
 * @returns {Array} 조직도 정보
 */
export async function getOrganization(orgCd = null, withUsers = false) {
  const URI = ORG_URI + (withUsers ? GET_NODE_LIST_WITH_USERS : GET_NODE_LIST);
  const res = await http.get(URI, { orgCd });
  return res.data.data;
}