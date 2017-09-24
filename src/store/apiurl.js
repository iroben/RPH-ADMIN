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
    'config': 'GET,/system/config', // 获取配置信息
    
    'memberSearch': 'GET,/member/search',// 首页查找

    // 项目
    'projectTree': 'GET,/gessss', // 获取项目树
    'subTree': 'GET,/subTree', // 获取区
    'thirdTee': 'GET,/thirdTee', // 获取项目

    // 人员管理
    'members': 'GET,/members/index',
    'membersByFloor': 'GET,/member/byfloor',
    'membersDelete': 'POST,/del',
    'addMembers': 'POST,/test', // 添加人员
    'membersInfo': 'GET,/member/info',
    'membersLocation': 'GET,/members/location',
    'membersLocationEdit': 'POST,/info',
    'membersFamily': 'GET,/membersFamily/info',
    'membersLockHistory': 'GET,/members/history',


    // 房源管理
    'projectAdd': 'POST,/add',
    'projectEdit': 'POST,/Edit',
    'projectInfo': 'GET,/info',
    'projectMembers': 'GET,/info',
    'projectLocks': 'GET,/lock',
    'projectFloor': 'GET,/floor',
    
    // 楼栋管理
    'floorAdd': 'POST,/floorAdd',
    'floorEdit': 'POST,/floorEdit',
    'floorInfo': 'POST,/floor',
    'floorSource': 'POST,/floor',
    'floorLocks': 'POST,/floor',
    'floorMembers': 'POST,/floor',
    
    // 房源管理
    'resourceInfo': 'GET,/add',
    'resourceDelete': 'POST,/123',
    'resourceAdd': 'POST,/add',
    'resourceEdit': 'POST,/Edit',
    'resourceLocks': 'POST,/floor',
    'resourceMembers': 'POST,/floor',
    
    // 门锁管理
    'doorlockAdd': 'POST,/floor',
    'doorlockEdit': 'POST,/floor',
    'doorlockInfo': 'POST,/floor',
    'doorlockDelete': 'POST,/floor',
    'doorlockSource': 'POST,/floor',
    'doorlockHistory': 'POST,/floor',

    // common
    'getHuxing': 'GET,/huxing', // 获取户型

};