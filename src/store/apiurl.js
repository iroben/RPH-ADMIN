/**
 * api接口文档
 * 例: "login": "POST,/user/login",
 */
export default {
    // login
    'login': 'POST,/account/execLogin',
    'logout': 'POST,/account/logout',
    'modifyPasswd': 'POST,/account/modifyPasswd',
    // common
    'menus': 'GET,/system/menu',

    'upload': 'POST,/upload/file', // 上传

    'searchOrg':'GET,/system/org/searchOrg',
    'config': 'GET,/system/config', // 获取配置信息
    'getHuxing': 'GET,/system/config/getHuxing', // 获取户型
    
    // 首页
    'statistics':'GET,/front/statistics',// 统计
    'toDoList': 'POST,/front/toDoList',// 待办任务
    'msgList': 'POST,/front/msgList',// 消息通知
    'docList': 'POST,/front/docList',// 文档管理
    'quickQuery': 'POST,/front/quickQuery',// 快速查找
    
    // 项目
    'projectTree': 'GET,/project/projectTree', // 获取项目树
    'projectSubTree': 'GET,/project/projectSubTree', // 获取项目楼栋
    // 项目管理
    'addProject': 'POST,/project/add',
    'deleteProjects': 'DELETE,/project/del',
    'editProject': 'POST,/project/edit',
    'projectInfo': 'GET,/project/info',

    // 楼栋管理
    'floors': 'POST,/floor/list',
    'addFloor': 'POST,/floor/add',
    'delFloors': 'DELETE,/floor/del',
    'editFloor': 'POST,/floor/edit',
    'floorInfo': 'GET,/floor/info',
    
    'projectFloors': 'GET,/floor/listForProject',
    // 房源管理
    'resources': 'GET,/resource/list',
    'addResource': 'POST,/resource/add',
    'delResources': 'DELETE,/resource/del',
    'editResource': 'POST,/resource/edit',
    'resourceInfo': 'GET,/resource/info',
    
    'projectResources': 'GET,/resource/listForProject',
    'floorResources': 'GET,/resource/listForFloor',
    'lockResources': 'GET,/resource/listForLock',
    
    // 门锁管理
    'doorlocks': 'POST,/doorlock/list',
    'addDoorlock': 'POST,/doorlock/add',
    'delDoorlocks': 'DELETE,/doorlock/del',
    'editDoorlock': 'POST,/doorlock/edit',
    'doorlockInfo': 'GET,/doorlock/info',
    
    'projectLocks': 'GET,/doorlock/listForProject',
    'floorLocks': 'GET,/doorlock/listForFloor',
    'resourceLocks': 'GET,/doorlock/listForResource',

    'openRecord':'GET,/doorlock/openRecord',// 开门记录
    'doorlockHistory':'GET,/doorlock/history',// 开门记录
    'doorlockRepair': 'GET,/doorlock/repair', // 维修历史

    // 人员管理
    'members': 'POST,/member/list',
    'membersByFloor': 'GET,/member/byfloor', // 按楼层分组
    'membersDelete': 'POST,/member/delete', 

    'addMember': 'POST,/member/add', // 添加人员
    'delMembers': 'DELETE,/member/del',
    'editMember': 'POST,/member/edit',
    'memberInfo': 'GET,/member/info',

    'memberLocationEdit': 'GET,/member/location',// 保存住户房源信息
    'memberHistorys': 'GET,/member/history',// 历史住户
    'memberFamilys': 'GET,/member/family/list', // 家庭成员

    'projectMembers': 'GET,/member/listForProject',
    'floorMembers': 'GET,/member/listForFloor',
    'resourceMembers': 'GET,/member/listForResource',

    // 系统管理
    'users': 'POST,/system/user/list',
    'addUser':'POST,/system/user/add',
    'delUsers':'DELETE,/system/user/del',
    'editUser':'POST,/system/user/edit',
    'userInfo':'GET,/system/user/info',
      
    'roles': 'POST,/system/role/list',
    'addRole':'POST,/system/role/add',
    'delRoles':'DELETE,/system/role/del',
    'editRole':'POST,/system/role/edit',
    'roleInfo':'GET,/system/role/info',

    'codes': 'POST,/system/code/list',
    'addCode':'POST,/system/code/add',
    'delCodes':'DELETE,/system/code/del',
    'editCode':'POST,/system/code/edit',
    'codeInfo':'GET,/system/code/info',

    'orgTree': 'POST,/system/org/tree',
    'orgs': 'POST,/system/org/list',
    'addOrg':'POST,/system/org/add',
    'delOrgs':'DELETE,/system/org/del',
    'editOrg':'POST,/system/org/edit',
    'orgInfo':'GET,/system/org/info',

    'propertyCompanys': 'POST,/system/propertyCompany/list',
    'addPropertyCompany':'POST,/system/propertyCompany/add',
    'delPropertyCompanys':'DELETE,/system/propertyCompany/del',
    'editPropertyCompany':'POST,/system/propertyCompany/edit',
    'propertyCompanyInfo':'GET,/system/propertyCompany/info'
};