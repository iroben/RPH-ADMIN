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
  'data': {
    tabs: [{
      id: '@id',
      title: '塔楼A'
    }, {
      id: '@id',
      title: '塔楼B'
    }],
    'list|2-10': [{
      id: '@id',
      'floor|1-100': 1,
      'house|1-10': [{
        'number|1-100': 1,
        'members|0-3': [{
          id: '@id',
          'name|1': ['小明', '小红', '小花', '小南']
        }]
      }]
    }]
  },
  page: {
    'total|1-15': 1,
    'page|1-15': 1,
    'cur|1-10': 1,
    pagesize: 3,
    'pages|1-15': 1
  }
});
