<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <Col span="6">
      <div class="card-info card-info-primary">
        <a href="#/resource" class="card-info-mask">
          <div class="inner">
            <Icon type="eye" size="30"></Icon>
          </div>
        </a>
        <Card class="homecard" :bordered="false">
          <h3>房源数</h3>
          <p>9,380</p>
        </Card>
      </div>
      </Col>
      <Col span="6">
      <div class="card-info card-info-success">
        <a href="#/resource" class="card-info-mask">
          <div class="inner">
            <Icon type="eye" size="30"></Icon>
          </div>
        </a>
        <Card class="homecard" :bordered="false">
          <h3>空置房源数</h3>
          <p>2,211</p>
        </Card>
      </div>
      </Col>
      <Col span="6">
      <div class="card-info card-info-warning">
        <a href="#/members" class="card-info-mask">
          <div class="inner">
            <Icon type="eye" size="30"></Icon>
          </div>
        </a>
        <Card class="homecard" :bordered="false">
          <h3>住户总数</h3>
          <p>18,210</p>
        </Card>
      </div>
      </Col>
      <Col span="6">
      <div class="card-info card-info-error">
        <a href="#/members" class="card-info-mask">
          <div class="inner">
            <Icon type="eye" size="30"></Icon>
          </div>
        </a>
        <Card class="homecard" :bordered="false">
          <h3>新增住户总数(近一个月)</h3>
          <p>9,380</p>
        </Card>
      </div>
      </Col>
    </Row>
    <Row :gutter="24" style="margin-top: 20px;">
      <Col span="24">
      <Tabs v-model="tabName" :animated="false">
        <Button v-if="tabName == 'todo'" shape="circle" size="small" slot="extra" icon="android-done-all">标记完成</Button>
        <Button v-if="tabName == 'news'" shape="circle" size="small" slot="extra" icon="eye">标记为已读</Button>
        <Button v-if="tabName == 'files'" shape="circle" size="small" slot="extra" icon="android-upload">上传文档</Button>
        <Tab-pane label="待办事项" name="todo" icon="android-checkmark-circle">
          <Table ref="todoTable" :columns="todoColumns" :data="todoTableData" stripe></Table>
          <div class="pagination">
            <Page :total="page.total" :current="page.cur" :page-size="page.pagesize" show-elevator show-total></Page>
          </div>
        </Tab-pane>
        <Tab-pane :label="newsLabel" name="news" icon="ionic">
          <Table ref="newsTable" :columns="newsColumns" :data="newsTableData" stripe></Table>
          <div class="pagination">
            <Page :total="page.total" :current="page.cur" :page-size="page.pagesize" show-elevator show-total></Page>
          </div>
        </Tab-pane>
        <Tab-pane label="文档管理" name="files" icon="android-folder-open">
          <Table ref="filesTable" :columns="filesColumns" :data="filesTableData" stripe></Table>
          <div class="pagination">
            <Page :total="page.total" :current="page.cur" :page-size="page.pagesize" show-elevator show-total></Page>
          </div>
        </Tab-pane>
        <Tab-pane label="快速查找" name="search" icon="search">
          <Form ref="formSearch" :model="formSearch" label-width="80" label-position="left" :inline="true">
            <Form-item label="姓名:" label-width="50" prop="name">
              <Input v-model="formSearch.name" placeholder="请输入姓名"></Input>
            </Form-item>
            <Form-item label="手机号码:" prop="phone">
              <Input v-model="formSearch.phone" placeholder="请输入手机号码"></Input>
            </Form-item>
            <Form-item label="身份证号码:" prop="cardId">
              <Input v-model="formSearch.cardId" placeholder="请输入身份证号码"></Input>
            </Form-item>
            <Form-item label-width="1" label="" prop="cardId">
              <Button type="primary" shape="circle" @click="handleSearch" style="margin-right: 10px;" icon="search">快速查询</Button>
              <Button shape="circle" icon="refresh" @click="handleReset('formSearch')"></Button>
            </Form-item>
          </Form>
          <Table ref="searchTable" :columns="searchColumns" :data="searchTableData" stripe></Table>
        </Tab-pane>
      </Tabs>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabName: 'todo',
      formSearch: {
        name: '',
        phone: '',
        cardId: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空' }
        ]
      },
      newsLabel: (h) => {
        return h('span', [
          h('span', '消息通知'),
          h('Badge', {
            props: {
              count: 3
            }
          })
        ])
      },
      page: {
        total: 15,
        cur: 1,
        pagesize: 15,
        pagesize: 15
      },
      todoTableData: [],
      newsTableData: [],
      filesTableData: [],
      searchTableData: [],
      todoColumns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '标题',
        key: 'title',
      }, {
        title: '类型',
        key: 'type',
        width: 140,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          return h('Tag', {
            props: {
              type: 'border',
              color: 'green'
            },
          }, row.type);
        }
      }, {
        title: '提交时间',
        width: 180,
        key: 'created_time',
      }, {
        title: '操作',
        key: 'address',
        width: 100,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          return h('ButtonGroup', [
            h('Button', {
              props: {
                type: 'ghost',
                icon: 'checkmark-circled',
                size: 'small'
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: '标记完成',
                    content: '是否将<strong class="color-danger spe-modal-font">' + row.title + '</strong>标记为已完成?'
                  })
                }
              }
            })
          ]);
        }
      }],
      newsColumns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '标题',
        key: 'title',
      }, {
        title: '类型',
        key: 'type',
        width: 140,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          return h('Tag', {
            props: {
              type: 'border',
              color: 'green'
            },
          }, row.type);
        }
      }, {
        title: '提交时间',
        width: 180,
        key: 'created_time',
      }, {
        title: '操作',
        key: 'address',
        width: 100,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          return h('ButtonGroup', [
            h('Button', {
              props: {
                type: 'ghost',
                icon: 'eye',
                size: 'small'
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: '标记为已读',
                    content: '是否将<strong class="color-info spe-modal-font">' + row.title + '</strong>标记为已已读?'
                  })
                }
              }
            })
          ]);
        }
      }],
      filesColumns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '文档名称',
        key: 'title',
      }, {
        title: '文件类型',
        key: 'type',
        width: 140,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          return h('Tag', {
            props: {
              type: 'border',
              color: 'green'
            },
          }, row.type);
        }
      }, {
        title: '文件大小',
        key: 'size',
        width: 140,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          return h('Tag', {
            props: {
              type: 'border',
            },
          }, row.size);
        }
      }, {
        title: '上传时间',
        width: 180,
        key: 'created_time',
      }, {
        title: '操作',
        key: 'address',
        width: 100,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          return h('ButtonGroup', [
            h('Button', {
              props: {
                type: 'ghost',
                icon: 'android-download',
                size: 'small'
              },
              on: {

              }
            })
          ]);
        }
      }],
      searchColumns: [{
        title: '姓名',
        key: 'name',
        className: 'avatarImg',
        width: 100
      }, {
        title: '房号',
        key: 'house_number',
        align: 'center',
        className: 'avatarImg',
        width: 100
      }, {
        title: '性别',
        key: 'gender',
        align: 'center',
        width: 80
      }, {
        title: '出生日期',
        key: 'birth',
        width: 110,
        align: 'center'
      }, {
        title: '身份证号',
        key: 'card_id',
        width: 180,
        align: 'center'
      }, {
        title: '工作单位',
        key: 'org',
      }, {
        title: '手机号码',
        key: 'phone',
        width: 120,
      }, {
        title: '门锁权限',
        key: 'door_status',
        align: 'center'
      }, {
        title: '操作',
        key: 'address',
        width: 100,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          return this.$lodash.renderButtonGroup(h, params, [{
            icon: 'edit',
            click: () => {
              this.$router.push({
                'name': 'members.edit',
                'params': {
                  id: row.id
                }
              });
            }
          }])
        }
      }]
    }
  },
  computed: {

  },
  methods: {
    handleSearch() {
      this.$apis.memberSearch(this.formSearch).then(res => {
        this.searchTableData = res.data;
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  created() {
    this.$store.commit('breadcrumb', []);
    this.todoTableData = this.$lodash.testData({
      title: '半山公寓人员信息审核',
      type: '人员管理',
      created_time: '2017-08-09 08:50'
    })

    this.newsTableData = this.$lodash.testData({
      title: '半山公寓-B322-张晓明添加了家庭成员',
      type: '添加成员',
      created_time: '2017-08-11 09:50'
    })

    this.filesTableData = this.$lodash.testData({
      title: '冰海新城B栋公寓人员表',
      type: '.excel',
      size: '10MB',
      created_time: '2017-08-09 08:50'
    })
  }
}

</script>
<style type="text/css">
.card-info {
  position: relative;
  color: #fff;
  text-align: center;
  border-radius: 3px;
}

.card-info .ivu-card {
  background: none;
}

.card-info-primary {
  background-color: #2d8cf0;
}

.card-info h3 {
  opacity: 0.9;
}

.card-info p {
  font-size: 40px;
}

.card-info-success {
  background-color: #19be6b
}

.card-info-warning {
  background-color: #ff9900;
}

.card-info-error {
  background-color: #ed3f14;
}

.card-info-mask {
  opacity: 0;
  display: none;
  position: absolute;
  z-index: 2;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
}

.card-info-mask .inner {
  text-align: center;
  display: table;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.card-info-mask .ivu-icon {
  color: #fff;
  display: table-cell;
  vertical-align: middle;
}






/*hover*/

.card-info:hover .homecard {
  filter: blur(3px);
  transform: scale(0.8);
}

.card-info:hover .card-info-mask {
  display: block;
  opacity: 1;
}

.homecard,
.card-info-mask {
  transition: all 2s ease-in-out;
}

</style>
