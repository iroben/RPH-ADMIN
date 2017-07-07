const menus = [{
  icon: 'earth',
  name: 'test',
  txt: '例子',
  sublist: [{
    name: 'form',
    txt: '表单验证',
  }, {
    name: 'table',
    txt: '表格填充',
  }]
}, {
  icon: 'ios-home',
  name: 'house',
  txt: '房源管理',
  sublist: []
}, {
  icon: 'person-stalker',
  name: 'members',
  txt: '人员管理',
  sublist: []
}, {
  icon: 'ios-keypad',
  name: 'business',
  txt: '业务管理',
  sublist: [{
    name: 'menbers',
    txt: '人员审核',
  }, {
    name: 'repair',
    txt: '维修处理',
  }, {
    name: 'renew',
    txt: '续租审批',
  }, {
    name: 'checkout',
    txt: '退房审批',
  }, {
    name: 'complaint',
    txt: '投诉建议',
  }]
}, {
  icon: 'ios-analytics',
  name: 'system',
  txt: '系统管理',
  sublist: [{
    name: 'role',
    txt: '角色管理',
  }, {
    name: 'repair',
    txt: '维修处理',
  }, {
    name: 'user',
    txt: '用户管理',
  }, {
    name: 'statistics',
    txt: '统计管理',
  }, {
    name: 'msg',
    txt: '消息管理',
  }, {
    name: 'lock',
    txt: '门锁管理',
  }]
}];


export default menus;
