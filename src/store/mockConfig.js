import Mock from 'mockjs'
const Random = Mock.Random
import aipurl from './apiurl';
import lodash from 'lodash'

// 循环生成表达式
let aipurl_ = {};
const url = lodash.forEach(aipurl, (item, key) => {
  let orgUrl = item.split(',')[1];
  let orgUrlAr = orgUrl.split('/');
  aipurl_[key] = RegExp(orgUrl);
});

// 静态变量
const CUR_DATE = Mock.mock('@date');

// 首页查找
Mock.mock(aipurl_.memberSearch, {
  code: 1,
  'data|1-3': [{
    'id': '@id',
    'name|1': [
      '张晓明',
      '小花',
      '夏明',
    ],
    'house_number|1-100': 1,
    'gender|1': ['男', '女'],
    'birth': '@date',
    'card_id': '430726199104155779',
    'org|1': ['深圳大学', '北京大学'],
    'phone|1': ['18664357415', '13975646645'],
    'door_status|1': ['开', '关'],
  }]
});

// 人员管理
Mock.mock(aipurl_.members, {
  code: 1,
  'data|1-15': [{
    'id': '@id',
    'name|1': [
      '张晓明',
      '小花',
      '夏明',
    ],
    'house_number|1-100': 1,
    'gender|1': ['男', '女'],
    'birth': '@date',
    'card_id': '430726199104155779',
    'org|1': ['深圳大学', '北京大学'],
    'phone|1': ['18664357415', '13975646645'],
    'door_status|1': ['开', '关'],
  }],
  page: {
    'total|1-15': 1,
    'page|1-15': 1,
    'cur|1-10': 1,
    pagesize: 3,
    'pages|1-15': 1
  }
});

Mock.mock(aipurl_.membersByFloor, {
  code: 1,
  'data|2-10': [{
    id: '@id',
    'floor|1-100': 1,
    'house|1-10': [{
      'number|1-100': 1,
      'members|0-1': [{
        id: '@id',
        'name|1': ['小明', '小红', '小花', '小南']
      }]
    }]
  }],
  page: {
    'total|1-15': 1,
    'page|1-15': 1,
    'cur|1-10': 1,
    pagesize: 3,
    'pages|1-15': 1
  }
});

Mock.mock(aipurl_.membersLocation, {
  code: 1,
  'data|2': [{
    id: '@id',
    start_time: '@date',
    end_time: '@date',
    'status|+1': [1, 0],
    'status_msg|+1': ['入住中', '已退房'],
    location_msg: '半山家园,A栋,B311',
    location: '1,1,1,1'
  }]
});

Mock.mock(aipurl_.membersFamily, {
  code: 1,
  'data|4': [{
    id: '@id',
    'name|+1': ['张晓明', '李双', '小明', '张华'],
    'relation|+1': ['丈夫', '妻子', '儿子', '父亲'],
    house_number: 'B栋410',
    status: 1,
    status_msg: '挂失中',
    gender: '男',
    birth: '1991-04-15',
    card_id: 430726199104155779,
    org: '深圳大学',
    phone: '18664357434',
    door_status: 'open',
    'history|1': [1, 0]
  }],
  page: {
    'total|1-15': 1,
    'page|1-15': 1,
    'cur|1-10': 1,
    pagesize: 3,
    'pages|1-15': 1
  }
});

Mock.mock(aipurl_.membersInfo, {
  code: 1,
  data: {
    id: '1',
    name: '张晓明',
    house_number: 'B栋411',
    relation: '1',
    resource: '1,1,1',
    gender: 1,
    card_id: '430728199904155517',
    sugestion: '审核的建议信息',
    birth: '1990-04-16',
    phone: '18664357412',
    org: '腾讯科技有限公司'
  }
});

Mock.mock(aipurl_.membersLockHistory, {
  code: 1,
  'data|4': [{
    id: '@id',
    'name|+1': ['张晓明', '李双', '小明', '张华'],
    'start_time': '@date',
    'house_number': 'B栋401',
    open_time: '2017-08-09 08:55',
    'status|1': [1, 0],
    'status_msg|1': ['开门', '关门'],
    'way|1': ['指纹开锁', '微信开锁', '短信开锁']
  }],
  page: {
    'total|1-15': 1,
    'page|1-15': 1,
    'cur|1-10': 1,
    pagesize: 3,
    'pages|1-15': 1
  }
});

Mock.mock(aipurl_.projectMembers, {
  code: 1,
  'data|10-15': [{
    id: '@id',
    name: '李双',
    house_number: 'B栋410',
    relation: '丈夫',
    status: 1,
    status_msg: '挂失中',
    gender: '男',
    birth: '1991-04-15',
    card_id: 430726199104155779,
    org: '深圳大学',
    phone: '18664357434',
    door_status: 'open',
    'history|1': [1, 0]
  }],
  page: {
    'total|1-15': 1,
    'page|1-15': 1,
    'cur|1-10': 1,
    pagesize: 3,
    'pages|1-15': 1
  }
});

Mock.mock(aipurl_.doorlockSource, {
  code: 1,
  'data|10-15': [{
    id: '@id',
    'project|1': ['伴山家园', '四海新城'],
    'floor|1': ['A栋', 'B栋', 'C栋'],
    house_number: '410',
    area: '100平米',
    house_type: '3室1厅',
    'count|10-20': 1,
    rent_date: '@date',
    door_number: 'bx1-3123',
    door_box_number: 'BXS-sdfsfds',
    rent_pirce: '3800元',
    'history|1': 1
  }],
  page: {
    'total|1-15': 1,
    'page|1-15': 1,
    'cur|1-10': 1,
    pagesize: 3,
    'pages|1-15': 1
  }
});

Mock.mock(aipurl_.doorlockFloor, {
  code: 1,
  'data|2-4': [{
    id: '@id',
    'name|1': ['A栋311', 'B栋311', 'C栋311']
  }],
});

Mock.mock(aipurl_.doorlockHistory, {
  code: 1,
  'data|2-4': [{
    id: '@id',
    name: '张晓明',
    open_time: '@datetime',
    status: 1,
    status_msg: '开门',
    way: '指纹开锁'
  }],
  page: {
    'total|1-15': 1,
    'page|1-15': 1,
    'cur|1-10': 1,
    pagesize: 3,
    'pages|1-15': 1
  }
});



