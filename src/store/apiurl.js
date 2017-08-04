/**
 * api接口文档
 * 例: "login": "POST,/user/login",
 */
export default {
  // Common
  'login': 'POST,/account/execLogin',
  'logout': 'POST,/account/logout',
  'menus': 'GET,/system/menu',
  'modifyPasswd': 'POST,/account/modifyPasswd',
  'searchOrg': 'GET,/system/org/list',
  'config': 'GET,/system/config' // 获取配置信息
};
