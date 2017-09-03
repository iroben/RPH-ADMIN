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
  'config': 'GET,/system/config', // 获取配置信息

	// 项目
	'projectTree': 'GET./gessss', // 获取项目树
	'subTree': 'GET,/subTree', // 获取区
	'thirdTee': 'GET./thirdTee', // 获取项目

	// 人员管理
	'members': 'GET,/test',
	'membersDelete': 'POST/del',
	'addMembers': 'POST,/test', // 添加人员
	'membersInfo': 'GET,/info',
	'membersLocation': 'GET,/info',
	'membersLocationEdit': 'POST/,info',
	'membersFamily': 'GET,/info',
	'membersLockHistory': 'GET,/info',
};
