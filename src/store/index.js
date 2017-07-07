import Vue from 'vue';
import Vuex from 'vuex';
import apis from './apis';

/* modules */

/* use Vuex*/
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

// states
const state = {
  orgId: 9,
  userEmail: '', // 用户Email
  orgInfo: null, // 机构详情
  pageSize: 15, // 分页
  uploadUrl: 'http://doc210.uooc.online/upload/index'
};

// getters
const getters = {
  orgId: state => state.orgId,
  orgInfo: state => state.orgInfo,
  userEmail: state => state.userEmail,
  pageSize: state => state.pageSize,
  uploadUrl: state => state.uploadUrl
};

// actions
const actions = {
  orgInfo({ commit, state }) {
    return apis.orgInfo().then(res => {
      commit('orgInfo', res.data);
      return res;
    });
  },
  login() {
    const response = {
      code: 1,
      msg: "登录成功"
    }
    return response;
  },
  orgList() {
    const response = {
      code: 1,
      msg: "",
      data: [{
        id: 184056211,
        name: "北京大学"
      }, {
        id: 1755651828,
        name: "深圳大学"
      }, {
        id: 1318237993,
        name: "中国人民大学"
      }, {
        id: 792742922,
        name: "深圳大学继续教育学院"
      }, {
        id: 221111663,
        name: "优课大学"
      }, {
        id: 1662696000,
        name: "安徽建筑大学"
      }, {
        id: 1103647397,
        name: "长春大学"
      }, {
        id: 666233734,
        name: "长春光华学院"
      }, {
        id: 73564411,
        name: "成都信息工程大学继续教育学院"
      }, {
        id: 1515215324,
        name: "重庆工商大学"
      }, {
        id: 943586865,
        name: "重庆警察学院"
      }, {
        id: 518690578,
        name: "重庆文理学院"
      }, {
        id: 2094541943,
        name: "重庆邮电大学"
      }, {
        id: 1384498344,
        name: "东莞理工学院"
      }, {
        id: 863149453,
        name: "佛山科学技术学院"
      }, {
        id: 287322862,
        name: "福建工程学院"
      }, {
        id: 1997392835,
        name: "广东财经大学"
      }, {
        id: 1442537508,
        name: "广东工业大学"
      }, {
        id: 732444953,
        name: "广东海洋大学"
      }, {
        id: 160816762,
        name: "广东开放大学"
      }, {
        id: 1849915231,
        name: "广东科技学院"
      }, {
        id: 1278218160,
        name: "广东理工学院"
      }, {
        id: 572368021,
        name: "广东石油化工学院"
      }, {
        id: 13336054,
        name: "广东外语外贸大学"
      }, {
        id: 1723339307,
        name: "广东医科大学"
      }, {
        id: 1197845260,
        name: "广西科技大学"
      }, {
        id: 626212961,
        name: "广西师范大学"
      }, {
        id: 2063604034,
        name: "广州大学"
      }, {
        id: 1508749735,
        name: "广州大学华软软件学院"
      }, {
        id: 1071339160,
        name: "贵州大学"
      }, {
        id: 495513597,
        name: "哈尔滨理工大学"
      }, {
        id: 1920304350,
        name: "海南师范大学"
      }, {
        id: 1344494899,
        name: "韩山师范学院"
      }, {
        id: 907080212,
        name: "杭州电子科技大学"
      }, {
        id: 352160585,
        name: "合肥工业大学"
      }, {
        id: 1789600682,
        name: "河南理工大学"
      }, {
        id: 1217984655,
        name: "菏泽学院"
      }, {
        id: 692425184,
        name: "黑龙江工程学院昆仑旅游学院"
      }, {
        id: 255014597,
        name: "湖北工程学院"
      }, {
        id: 1843449638,
        name: "湖北民族学院"
      }, {
        id: 1137599515,
        name: "华南理工大学广州学院"
      }, {
        id: 565919100,
        name: "华南农业大学"
      }, {
        id: 107532881,
        name: "济南大学"
      }, {
        id: 1683385010,
        name: "佳木斯大学"
      }, {
        id: 973276055,
        name: "嘉应学院"
      }, {
        id: 418437320,
        name: "江汉大学文理学院"
      }, {
        id: 2128507181,
        name: "江苏大学"
      }, {
        id: 1552619022,
        name: "江苏师范大学"
      }, {
        id: 1031319395,
        name: "金陵科技学院"
      }, {
        id: 321274948,
        name: "喀什大学"
      }, {
        id: 1897077945,
        name: "辽宁大学"
      }, {
        id: 1472247194,
        name: "聊城大学"
      }, {
        id: 900614911,
        name: "岭南师范学院"
      }, {
        id: 194765776,
        name: "绵阳师范学院"
      }, {
        id: 1749596213,
        name: "南方科技大学"
      }, {
        id: 1312182550,
        name: "南方医科大学"
      }, {
        id: 753137227,
        name: "内蒙古大学"
      }, {
        id: 47222444,
        name: "宁波大红鹰学院"
      }, {
        id: 1623074689,
        name: "宁波工程学院"
      }, {
        id: 1097596130,
        name: "宁波公安海警学院"
      }, {
        id: 660116935,
        name: "海南热带海洋学院"
      }, {
        id: 84290104,
        name: "三峡大学"
      }, {
        id: 1542701853,
        name: "厦门理工学院"
      }, {
        id: 966826110,
        name: "山西传媒学院"
      }, {
        id: 529412435,
        name: "山西大学"
      }, {
        id: 2088487348,
        name: "汕头大学"
      }, {
        id: 1378447081,
        name: "韶关学院"
      }, {
        id: 806750154,
        name: "深圳大学1"
      }, {
        id: 381934639,
        name: "首都师范大学"
      }, {
        id: 1957786880,
        name: "五邑大学"
      }, {
        id: 1251871333,
        name: "武汉纺织大学"
      }, {
        id: 726377286,
        name: "武汉科技大学"
      }, {
        id: 154762171,
        name: "西安文理学院"
      }, {
        id: 1877348508,
        name: "西藏大学"
      }, {
        id: 1305717233,
        name: "湘潭大学"
      }, {
        id: 595676882,
        name: "新疆大学"
      }, {
        id: 7268151,
        name: "新疆师范大学"
      }, {
        id: 1717288040,
        name: "燕山大学"
      }, {
        id: 1141462349,
        name: "扬州大学"
      }, {
        id: 452390318,
        name: "宜春学院"
      }, {
        id: 2023981699,
        name: "玉溪师范大学"
      }, {
        id: 1586584548,
        name: "云南大学"
      }, {
        id: 1065283801,
        name: "浙江海洋学院"
      }, {
        id: 489392442,
        name: "浙江师范大学"
      }, {
        id: 1931030047,
        name: "浙江万里学院"
      }, {
        id: 1371981680,
        name: "中山大学新华学院"
      }, {
        id: 934517845,
        name: "仲恺农业工程学院"
      }, {
        id: 341914806,
        name: "牡丹江师范学院"
      }, {
        id: 1783549419,
        name: "郑州师范学院"
      }, {
        id: 1211917004,
        name: "南昌大学"
      }, {
        id: 787036961,
        name: "天津中德应用技术大学"
      }, {
        id: 215404546,
        name: "青岛理工大学"
      }, {
        id: 1652844903,
        name: "贵州大学科技学院"
      }, {
        id: 1131482712,
        name: "湖北师范大学"
      }, {
        id: 1466195931,
        name: "优课在线"
      }]
    };
    return response;
  },
  tableFilter() {
    const response = {
      code: 1,
      msg: "",
      data: {
        identify: [
          "未认证",
          "已认证"
        ],
        categories: [{
          id: 458047115,
          pid: "0",
          name: "经管法学",
          children: [{
            id: "5",
            pid: "1",
            name: "法学"
          }, {
            id: "6",
            pid: "1",
            name: "管理学"
          }]
        }, {
          id: 2033899500,
          pid: "0",
          name: "文学艺术",
          children: [{
            id: "7",
            pid: "2",
            name: "文学"
          }, {
            id: "8",
            pid: "2",
            name: "艺术学"
          }]
        }, {
          id: 1609067713,
          pid: "0",
          name: "理工学科",
          children: [{
            id: "9",
            pid: "3",
            name: "教育学"
          }, {
            id: "10",
            pid: "3",
            name: "历史学"
          }]
        }, {
          id: 1037370658,
          pid: "0",
          name: "社会科学"
        }, {
          id: 73564411,
          pid: "0",
          name: "test"
        }],
        org_list: [{
          org_id: "9",
          org_name: "北京大学"
        }],
        credit_list: [{
          uc_credit: "0.0"
        }, {
          uc_credit: "1.0"
        }, {
          uc_credit: "2.0"
        }, {
          uc_credit: "3.0"
        }, {
          uc_credit: "5.0"
        }],
        status: {
          10: "未提交",
          20: "审核中",
          25: "未通过审核",
          30: "通过审核",
          31: "开课中",
          32: "复习模式",
          33: "考试中",
          34: "统计成绩",
          35: "公示成绩",
          40: "已归档"
        },
        union_status: {
          10: "未提交",
          20: "审核中",
          25: "未通过审核",
          30: "通过审核"
        },
        attr: [
          "MOOC",
          "SPOC"
        ],
        union_list: [{
          id: "111",
          name: "优课联盟"
        }, {
          id: "112",
          name: "MOOC联盟"
        }, {
          id: "123",
          name: "李秀君TEST"
        }]
      }
    }
    return response;
  },
  tableData() {
    const response = {
      code: 1,
      msg: "",
      data: {
        data: [{
          id: "10224",
          identify: 1,
          course_id: 1609067713,
          status: "31",
          parent: 1609067713,
          name: "第一行不能选中",
          org_id: "9",
          parent_name: "积极心理学春季",
          org_name: "北京大学",
          uname: "朱正勇",
          category: "文学艺术",
          uc_credit: "1.0",
          learn_hours: "1",
          start_time: "2016-07-04 11:59:00",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "7068",
          identify: "0",
          course_id: 1999902355,
          status: "31",
          parent: 2136719814,
          name: "中药与美容（新开）",
          org_id: "9",
          parent_name: "中药与美容",
          org_name: "北京大学",
          uname: "朱正勇",
          category: "经管法学",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 16:33:12",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "6965",
          identify: "0",
          course_id: 289894846,
          status: "32",
          parent: 1417545143,
          name: "周期1",
          org_id: "9",
          parent_name: "图片上传的测试",
          org_name: "北京大学",
          uname: "pollux",
          category: "test",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 15:55:46",
          price: "0.00",
          status_name: "复习模式"
        }, {
          id: "6765",
          identify: "0",
          course_id: 504484386,
          status: "32",
          parent: 1560897083,
          name: "周期1: 周期测试0531",
          org_id: "9",
          parent_name: "SSSSSSS周期测试0531",
          org_name: "北京大学",
          uname: "pollux",
          category: "test",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 14:22:34",
          price: "0.00",
          status_name: "复习模式"
        }, {
          id: "6664",
          identify: "0",
          course_id: 1517774060,
          status: "31",
          parent: 2136719814,
          name: "中药与美容",
          org_id: "9",
          parent_name: "中药与美容",
          org_name: "北京大学",
          uname: "朱正勇",
          category: "经管法学",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 14:01:42",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "6563",
          identify: "0",
          course_id: 92917643,
          status: "32",
          parent: 426649829,
          name: "测试课程详情",
          org_id: "9",
          parent_name: "测试课程详情",
          org_name: "北京大学",
          uname: "pollux",
          category: "理工学科",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 13:46:43",
          price: "0.00",
          status_name: "复习模式"
        }, {
          id: "6462",
          identify: "0",
          course_id: 1106157173,
          status: "31",
          parent: 947950464,
          name: "测试周期学习",
          org_id: "9",
          parent_name: "测试课程周期 5-31",
          org_name: "北京大学",
          uname: "pollux",
          category: "文学艺术",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 11:26:31",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "6361",
          identify: "0",
          course_id: 668743510,
          status: "31",
          parent: 947950464,
          name: "测试周期归档",
          org_id: "9",
          parent_name: "测试课程周期 5-31",
          org_name: "北京大学",
          uname: "pollux",
          category: "文学艺术",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 11:27:14",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "6260",
          identify: "0",
          course_id: 1320809209,
          status: "31",
          parent: 1523841711,
          name: "科学计算与数学建模第1次开课",
          org_id: "9",
          parent_name: "科学计算与数学建模111",
          org_name: "北京大学",
          uname: "朱正勇",
          category: "理工学科",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 10:06:43",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "6159",
          identify: "0",
          course_id: 1905704456,
          status: "31",
          parent: 1078719540,
          name: "化工过程分析与合成春季",
          org_id: "9",
          parent_name: "化工过程分析与合成",
          org_name: "北京大学",
          uname: "朱正勇",
          category: "",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-27 17:34:24",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "7371",
          identify: "0",
          course_id: 735003689,
          status: "31",
          parent: 160816762,
          name: "大学计算机—计算思维导论第3次开课",
          org_id: "9",
          parent_name: "大学计算机—计算思维导论",
          org_name: "北京大学",
          uname: "朱正勇",
          category: "理工学科",
          uc_credit: "0.0",
          learn_hours: "10",
          start_time: "2017-05-31 17:00:22",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "8076",
          identify: "0",
          course_id: 1440854004,
          status: "32",
          parent: 707517160,
          name: "yes",
          org_id: "9",
          parent_name: "yes",
          org_name: "北京大学",
          uname: "pollux",
          category: "",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 16:46:00",
          price: "0.00",
          status_name: "复习模式"
        }, {
          id: "9637",
          identify: "0",
          course_id: 518690578,
          status: "31",
          parent: 518690578,
          name: "数据库原理及应用1",
          org_id: "9",
          parent_name: "数据库原理及应用1",
          org_name: "北京大学",
          uname: "林康生",
          category: "理工学科",
          uc_credit: "3.0",
          learn_hours: "53",
          start_time: "2016-07-01 14:25:00",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "9300",
          identify: "0",
          course_id: 531987555,
          status: "31",
          parent: 1792175994,
          name: "课程学习测试",
          org_id: "9",
          parent_name: "课程学习测试",
          org_name: "北京大学",
          uname: "pollux",
          category: "",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-06-09 09:57:30",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "9091",
          identify: "0",
          course_id: 1256543359,
          status: "33",
          parent: 1256543359,
          name: "数学分析3399",
          org_id: "9",
          parent_name: "数学分析33",
          org_name: "北京大学",
          uname: "李秀君老师",
          category: "理工学科",
          uc_credit: "4.0",
          learn_hours: "12",
          start_time: "2016-12-21 00:00:00",
          price: "0.00",
          status_name: "考试中"
        }],
        page: {
          start: 1,
          end: 2,
          pages: 2,
          total: 30,
          size: 15,
          cur: 1
        }
      }
    };
    return response;
  },
  identify() {
    const response = {
      code: 1,
      msg: "",
      data: {
        data: [{
          id: "10224",
          identify: "1",
          course_id: 1609067713,
          status: "31",
          parent: 1609067713,
          name: "积极心理学春季",
          org_id: "9",
          parent_name: "积极心理学春季",
          org_name: "北京大学",
          uname: "朱正勇",
          category: "文学艺术",
          uc_credit: "1.0",
          learn_hours: "1",
          start_time: "2016-07-04 11:59:00",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "7068",
          identify: "1",
          course_id: 1999902355,
          status: "31",
          parent: 2136719814,
          name: "中药与美容（新开）",
          org_id: "9",
          parent_name: "中药与美容",
          org_name: "北京大学",
          uname: "朱正勇",
          category: "经管法学",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 16:33:12",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "6965",
          identify: "1",
          course_id: 289894846,
          status: "32",
          parent: 1417545143,
          name: "周期1",
          org_id: "9",
          parent_name: "图片上传的测试",
          org_name: "北京大学",
          uname: "pollux",
          category: "test",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 15:55:46",
          price: "0.00",
          status_name: "复习模式"
        }, {
          id: "6765",
          identify: "1",
          course_id: 504484386,
          status: "32",
          parent: 1560897083,
          name: "周期1: 周期测试0531",
          org_id: "9",
          parent_name: "SSSSSSS周期测试0531",
          org_name: "北京大学",
          uname: "pollux",
          category: "test",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 14:22:34",
          price: "0.00",
          status_name: "复习模式"
        }, {
          id: "6664",
          identify: "1",
          course_id: 1517774060,
          status: "31",
          parent: 2136719814,
          name: "中药与美容",
          org_id: "9",
          parent_name: "中药与美容",
          org_name: "北京大学",
          uname: "朱正勇",
          category: "经管法学",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 14:01:42",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "6563",
          identify: "1",
          course_id: 92917643,
          status: "32",
          parent: 426649829,
          name: "测试课程详情",
          org_id: "9",
          parent_name: "测试课程详情",
          org_name: "北京大学",
          uname: "pollux",
          category: "理工学科",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 13:46:43",
          price: "0.00",
          status_name: "复习模式"
        }, {
          id: "6462",
          identify: "1",
          course_id: 1106157173,
          status: "31",
          parent: 947950464,
          name: "测试周期学习",
          org_id: "9",
          parent_name: "测试课程周期 5-31",
          org_name: "北京大学",
          uname: "pollux",
          category: "文学艺术",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 11:26:31",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "6361",
          identify: "1",
          course_id: 668743510,
          status: "31",
          parent: 947950464,
          name: "测试周期归档",
          org_id: "9",
          parent_name: "测试课程周期 5-31",
          org_name: "北京大学",
          uname: "pollux",
          category: "文学艺术",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 11:27:14",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "6260",
          identify: "1",
          course_id: 1320809209,
          status: "31",
          parent: 1523841711,
          name: "科学计算与数学建模第1次开课",
          org_id: "9",
          parent_name: "科学计算与数学建模111",
          org_name: "北京大学",
          uname: "朱正勇",
          category: "理工学科",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 10:06:43",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "6159",
          identify: "1",
          course_id: 1905704456,
          status: "31",
          parent: 1078719540,
          name: "化工过程分析与合成春季",
          org_id: "9",
          parent_name: "化工过程分析与合成",
          org_name: "北京大学",
          uname: "朱正勇",
          category: "",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-27 17:34:24",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "7371",
          identify: "1",
          course_id: 735003689,
          status: "31",
          parent: 160816762,
          name: "大学计算机—计算思维导论第3次开课",
          org_id: "9",
          parent_name: "大学计算机—计算思维导论",
          org_name: "北京大学",
          uname: "朱正勇",
          category: "理工学科",
          uc_credit: "0.0",
          learn_hours: "10",
          start_time: "2017-05-31 17:00:22",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "8076",
          identify: "1",
          course_id: 1440854004,
          status: "32",
          parent: 707517160,
          name: "yes",
          org_id: "9",
          parent_name: "yes",
          org_name: "北京大学",
          uname: "pollux",
          category: "",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-05-31 16:46:00",
          price: "0.00",
          status_name: "复习模式"
        }, {
          id: "9637",
          identify: "1",
          course_id: 518690578,
          status: "31",
          parent: 518690578,
          name: "数据库原理及应用1",
          org_id: "9",
          parent_name: "数据库原理及应用1",
          org_name: "北京大学",
          uname: "林康生",
          category: "理工学科",
          uc_credit: "3.0",
          learn_hours: "53",
          start_time: "2016-07-01 14:25:00",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "9300",
          identify: "1",
          course_id: 531987555,
          status: "31",
          parent: 1792175994,
          name: "课程学习测试",
          org_id: "9",
          parent_name: "课程学习测试",
          org_name: "北京大学",
          uname: "pollux",
          category: "",
          uc_credit: "0.0",
          learn_hours: "1",
          start_time: "2017-06-09 09:57:30",
          price: "0.00",
          status_name: "开课中"
        }, {
          id: "9197",
          identify: "1",
          course_id: 1590191123,
          status: "31",
          parent: 1990861854,
          name: "程序设计基础（C语言）1",
          org_id: "10",
          parent_name: "程序设计基础（C语言）",
          org_name: "深圳大学",
          uname: "wnjnln",
          category: "理工学科",
          uc_credit: "5.0",
          learn_hours: "5",
          start_time: "2017-05-22 00:00:00",
          price: "0.00",
          status_name: "开课中"
        }],
        page: {
          start: 1,
          end: 3,
          pages: 3,
          total: "33",
          size: 15,
          cur: 1
        }
      }
    };
    return response;
  }
};

// mutations
const mutations = {
  orgInfo(state, info) {
    state.orgInfo = info;
  },
  userEmail(state, email) {
    state.userEmail = email;
  },
  upPageSize(state, pagesize) {
    state.pageSize = pagesize;
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
});
