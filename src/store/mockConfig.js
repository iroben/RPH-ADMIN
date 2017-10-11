import Mock from 'mockjs'
const Random = Mock.Random
import aipurl from './apiurl';
import lodash from 'lodash'

// 循环生成表达式
let aipurl_ = {};
const url = lodash.forEach(aipurl, (item, key) => {
  let orgUrl = item.split(',')[1];
  aipurl_[key] = RegExp(orgUrl);
});

// 静态变量
const CUR_DATE = Mock.mock('@date');


// 上传
Mock.mock(aipurl_.upload, {
  code: 1,
  'data': {
    'url|1': ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2729669462,3505178923&fm=27&gp=0.jpg', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4036019110,69628737&fm=27&gp=0.jpg', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=493129893,3752275036&fm=27&gp=0.jpg']
  }
});

// 登陆
Mock.mock(aipurl_.searchOrg, {
  code: 1,
  'data': [
    {
      'id':'@id',
      'code':'D4E014',
      'name':'广东省-深圳市-宝安区'
    } 
  ]
});
Mock.mock(aipurl_.login, {
  code: 1,
  'msg': '登陆成功'
});
Mock.mock(aipurl_.logout, {
  code: 1,
  'msg': '退出成功'
});
// 首页查找
Mock.mock(aipurl_.quickQuery, {
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
    'door_status|1': ['开', '关']
  }]
});
// 区域选择
Mock.mock(aipurl_.orgTree, {
  code: 1,
  'data|2': [{
    'id|+1': [0, 1],
    'classNo': '0',
    'className': '省份',
    'name|+1': ['全部', '广东省', '广西省'],
    'child|2': [{
      'id|+1': [0, 1],
      'classNo': '1',
      'className': '市',
      'name|+1': ['全部', '深圳市'],
      'child|2': [{
        'id|+1': [0, 1],
        'classNo': '2',
        'className': '区',
        'name|+1': ['全部', '宝安区']
      }]
    }],
  }]
});
// 项目选择
Mock.mock(aipurl_.projectSubTree, {
  code: 1,
  'data|2-3': [{
    'id': '@id',
    'class': 'project',
    'className|1': '项目',
    'name|1': ['伴山家园', '四海新城', '小户人家', '前海公寓'],
    'child|2-3': [{
      'id': '@id',
      'class': 'floor',
      'className': '楼栋',
      'name|1': ['A栋', 'B栋', 'C栋', 'D栋']
    }]
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

Mock.mock(aipurl_.floorMembers, {
  code: 1,
  'data|2-10': [{
    id: '@id',

    'floor|1-100': 1,
    'house|1-10': [{
      'location_ids': '1-1-1',
      'number|1-100': 1,
      'total|+1': [0, 10],
      'owner': {
        id: '@id',
        'name|1': ['小明', '小红', '小花', '小南']
      }
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

Mock.mock(aipurl_.memberHistorys, {
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

Mock.mock(aipurl_.memberFamilys, {
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

Mock.mock(aipurl_.memberInfo, {
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

Mock.mock(aipurl_.openRecord, {
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

Mock.mock(aipurl_.resourceLocks, {
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

Mock.mock(aipurl_.floorLocks, {
  code: 1,
  'data|2-4': [{
    id: '@id',
    'name|1': ['A栋311', 'B栋311', 'C栋311']
  }],
});

Mock.mock(aipurl_.resources, {
  code: 1,
  'data|10-15': [{
    'id': '@id',
    'project|1': ['伴山家园', '四海新城', '小户人家', '前海公寓'],
    'floor|1': ['A栋', 'B栋', 'C栋'],
    'house_number': '410',
    'area': '100平米',
    'house_type': '3室1厅',
    'count': 20,
    'rent_date': '@date',
    'door_number': 'bx1-3123',
    'door_box_number': 'BXS-sdfsfds',
    'rent_pirce': '3800元'
  }],
  page: {
    'total|1-15': 1,
    'page|1-15': 1,
    'cur|1-10': 1,
    'pagesize': 3,
    'pages|1-15': 1
  }
});

Mock.mock(aipurl_.getHuxing, {
  code: 1,
  data: {
    '1': '一室一厅',
    '2': '两室一厅',
    '3': '三室一厅',
  }
});

Mock.mock(aipurl_.delMembers, {
  code: 1,
  msg: '删除成功'
});


// resourceIndex
