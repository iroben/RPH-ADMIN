<template>
  <div>
  <!--   <ul>
      <li>门锁编辑, 新开页面</li>
      <li>基本信息</li>
      <li>房源信息, 安装时间与结束时间</li>
      <li>门锁记录</li>
    </ul>  -->
    <!--  tableFuncs -->
    <div class="tableFuncs">
      <Button-group shape="circle">
        <!-- <Button type="primary" icon="plus-circled" @click="editBox('add')">通讯盒</Button> -->
        <Button type="primary" icon="plus-circled" @click="goAddLock('add')">门锁</Button>
        <Button icon="close">批量删除</Button>
        <Button icon="stats-bars">报表输出</Button>
      </Button-group>
    </div>
    <div class="header-line"></div>
    <Row :gutter="20" class="left-menu">
      <div class="left-menu-line"></div>
      <Col span="4">
      <OrgMenus></OrgMenus>
      </Col>
      <Col span="20">
      <div class="tableTools" style="border: 0;">
        <Row class="tableTools-inner">
          <Col span="19">
          <Form ref="queryForm" :label-width="70" label-position="left" inline>
            <Form-item label="通讯盒:" :label-width="60" prop="status">
              <Select v-model="queryParams.status" @on-change="getData(1)" filterable>
                <Option value="" label="SKT通讯盒"></Option>
                <Option value="1" label="STLI通讯盒"></Option>
              </Select>
            </Form-item>
            <Form-item label="门锁状态:" :label-width="70" prop="status">
              <Select v-model="queryParams.status" @on-change="getData(1)" filterable>
                <Option value="" label="损坏"></Option>
                <Option value="1" label="正常"></Option>
              </Select>
            </Form-item>
            <Form-item label="开关状态:" :label-width="70" prop="status">
              <Select v-model="queryParams.status" @on-change="getData(1)" filterable>
                <Option value="" label="开"></Option>
                <Option value="1" label="关"></Option>
              </Select>
            </Form-item>
          </Form>
          </Col>
          <Col span="5">
          <Input icon="search" prop="keyword" v-model="queryParams.keyword" placeholder="门锁编号" @on-click="getData(1)" @on-enter="getData(1)"></Input>
          </Col>
        </Row>
      </div>
      <TableScoller>
        <Table ref="table" :columns="columns" :data="tableData" @on-row-dblclick="dbclick" @on-selection-change="selectionChange" stripe border></Table>
      </TableScoller>
      <div class="pagination">
        <Page :total="page.total" :current="page.cur" @on-change="getData" :page-size="pageSize" show-elevator show-total></Page>
      </div>
      </Col>
    </Row>
    <!-- model -->
    <Modal v-model="modelDoorlock" width="450">
      <p slot="header" class="del-header">
        <Icon type="information-circled"></Icon>
        <span>{{isEditDoorlock ? '编辑' : '添加'}}门锁</span>
      </p>
      <div class="del-content del-content-center">
        <Form ref="formDoorLock" :model="formDoorLock" :label-width="80">
          <Form-item label="门锁序号" prop="name">
            <Input v-model="formDoorLock.door_number" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="门锁品牌" prop="user_no">
            <Select v-model="queryParams.primary" @on-change="getData(1)" filterable>
              <Option value="" label="SKT通讯盒"></Option>
              <Option value="1" label="STLI通讯盒"></Option>
            </Select>
          </Form-item>
          <Form-item label="通讯盒序号" prop="name">
            <Input v-model="formDoorLock.box_number" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="门锁密码">
            <Input v-model="formDoorLock.passwod" placeholder="请输入"></Input>
          </Form-item>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button :type="isEditDoorlock ? 'error': 'primary'" long :loading="modalLoading" size="large" @click="del">确认</Button>
      </div>
    </Modal>
    <Modal v-model="modelDoorBox" width="450">
      <p slot="header" class="del-header">
        <Icon type="information-circled"></Icon>
        <span>{{isEditDoorbox ? '编辑' : '添加'}}盒子</span>
      </p>
      <div class="del-content del-content-center">
        <Form ref="formDoorbox" :model="formDoorbox" :label-width="80">
          <Form-item label="盒子序号" prop="name">
            <Input v-model="formDoorbox.box_number" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="盒子品牌" prop="name">
            <Input v-model="formDoorbox.company" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="项目" prop="name">
            <Select v-model="queryParams.project" @on-change="getData(1)" filterable>
              <Option value="" label="半山家园"></Option>
              <Option value="1" label="四海形成"></Option>
            </Select>
          </Form-item>
          <Form-item label="楼栋" prop="name">
            <Select v-model="queryParams.loudong" @on-change="getData(1)" filterable>
              <Option value="" label="A栋111"></Option>
              <Option value="1" label="B栋211"></Option>
            </Select>
          </Form-item>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button :type="isEditDoorbox ? 'error': 'primary'" long :loading="modalLoading" size="large" @click="del">确认</Button>
      </div>
    </Modal>
    <!-- Del Model -->
    <Modal v-model="modelDel" width="300" @on-cancel="clearDel">
      <p slot="header" class="del-header">
        <Icon type="information-circled"></Icon>
        <span>删除</span>
      </p>
      <div class="del-content del-content-center">
        <p>{{selectedGroupNames}}?</p>
      </div>
      <div slot="footer">
        <Button type="error" long :loading="modalLoading" size="large" @click="del">确认</Button>
      </div>
    </Modal>
    <!-- TimeLine -->
    <div v-if="modelSlider">
      <div class="aside">
        <div class="aisde-header">
          <Date-picker :value="doorHistoryDate" type="date" placeholder="请选择日期" format="yyyy年MM月dd日" style="width: 100%"></Date-picker>
        </div>
        <div class="aisde-container">
          <Timeline>
            <Timeline-item color="red">
              <Icon type="clock" slot="dot"></Icon>
              <strong style="color: #ed3f14;">box012x-door234开门记录</strong>
            </Timeline-item>
            <Timeline-item>
              <p class="time">2017-08-02 08:09:10</p>
              <p class="content">
                <Tag color="blue">张晓明: &emsp;关门</Tag>
              </p>
            </Timeline-item>
            <Timeline-item color="green">
              <p class="time">2017-08-02 08:09:10</p>
              <p class="content">
                <Tag color="green">张晓明: &emsp;秘钥开门</Tag>
              </p>
            </Timeline-item>
            <Timeline-item>
              <p class="time">2017-08-02 08:09:10</p>
              <p class="content">
                <Tag color="blue">张晓明: &emsp;关门</Tag>
              </p>
            </Timeline-item>
            <Timeline-item color="green">
              <p class="time">2017-08-02 08:09:10</p>
              <p class="content">
                <Tag color="green">张晓明: &emsp;指纹开门</Tag>
              </p>
            </Timeline-item>
            <Timeline-item>
              <p class="time">2017-08-02 08:09:10</p>
              <p class="content">
                <Tag color="blue">张晓明: &emsp;关门</Tag>
              </p>
            </Timeline-item>
            <Timeline-item color="green">
              <p class="time">2017-08-02 08:09:10</p>
              <p class="content">
                <Tag color="green">张晓明: &emsp;卡片开门</Tag>
              </p>
            </Timeline-item>
          </Timeline>
        </div>
        <div class="aisde-footer">
          <Button type="primary" long @click="toggleSlider">确定</Button>
        </div>
      </div>
      <div class="aside-shadow" @click="toggleSlider()"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modelSlider: false,
      doorHistoryDate: '2016-01-01',
      isEditDoorbox: false,
      modelDoorBox: false,
      formDoorbox: {},
      isEditDoorlock: false,
      modelDoorlock: false,
      formDoorLock: {},
      isEditInfo: false,
      isProject: true,
      formData: {},
      tabActive: 'resource',
      activeName: 1,

      toggleStatus: 1,
      activeParams: null, // 当前操作行数据
      selection: [], // 全选数组
      selectedGroup: [], // 多选中的行
      selectedGroupNames: [],
      modelDel: false, // 删除model显示隐藏
      modalLoading: false, // 加载按钮加载中提示
      queryParams: { // 表头筛选
        type: '',
        birth: '',
        huxing: '',
        keyword: ''
      },
      tableData: [],
      cardData: [],
      modelFamily: false,
      familyData: [],
      page: {
        total: 15,
        pagesize: 1
      },
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '门锁编号', // 门锁序号, 房源编号, 房源名称, 通讯盒序号, 绑定时间, 撤换时间, 有效日期
        key: 'id'
      }, {
        title: '门锁品牌',
        key: 'company',
        align: 'center',
        width: 120
      }, {
        title: '通讯盒',
        key: 'box_number',
        align: 'center',
        className: 'avatarImg',
        width: 130
      }, {
        title: '门锁号',
        key: 'box_number',
        align: 'center',
        className: 'avatarImg',
        width: 130
      }, {
        title: '有效日期',
        key: 'avalid_date',
        align: 'center'
      }, {
        title: '开关状态',
        key: 'open_status',
        width: 120,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          const isopen = row.open_status == 1;
          return h('Tag', {
            props: {
              type: 'border',
              color: isopen ? 'green' : 'red'
            }
          }, isopen ? '开' : '关')
        }
      }, {
        title: '门锁状态',
        key: 'status',
        width: 90,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          const isok = row.status == 1;
          return h('Tag', {
            props: {
              type: 'border',
              color: isok ? 'green' : 'red'
            }
          }, isok ? '正常' : '损坏')
        }
      }, {
        title: '电量',
        key: 'power',
        width: 120,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          return h('i-circle', {
            style: {
              'marginTop': '5px'
            },
            props: {
              percent: row.power,
              'stroke-width': 8,
              'stroke-color': '#5cb85c',
              size: 36
            }
          }, row.power)
        }
      }, {
        title: '上次开门',
        key: 'last_open',
        align: 'center',
        width: 160,
      }, {
        title: '操作',
        key: 'address',
        width: 120,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          const isSuper = row.super == 1;
          return h('ButtonGroup', [
            h('Button', {
              props: {
                disabled: isSuper,
                type: 'ghost',
                icon: 'close',
                size: 'small'
              },
              on: {
                click: () => {
                  this.selectedGroup = [row];
                  this.showDel();
                }
              }
            }),
            h('Button', {
              props: {
                type: 'ghost',
                icon: 'edit',
                size: 'small'
              },
              on: {
                click: () => {
                  this.goDoorLockEdit(row);
                }
              }
            })
          ]);
        }
      }]
    }
  },
  computed: {
    pageSize() {
      return this.$store.getters.pageSize;
    }
  },
  created() {
    const curPage = this.$route.query.page || 1;
    this.getData(curPage);
  },
  watch: {
    tabActive() {
      this.isEditInfo = false;
    }
  },
  methods: {
    toggleSlider() {
      this.modelSlider = !this.modelSlider;
    },
    goDoorLockEdit(row){
      this.$router.push({
          'name': 'doorlock.edit',
          'params': {
              id: row.id
          }
      });
    },
    editBox(params) {
      this.isEditDoorbox = params != 'add';
      if (params == 'add') {
        this.$lodash.forEach(this.formDoorbox, (value, key, item) => {
          this.formDoorbox[key] = '';
        });
      } else {
        this.$lodash.assign(this.formDoorbox, params);
      }
      this.modelDoorBox = true;
    },
    goAddLock(params) {
      this.$router.push({
        'name': 'doorlock.add'
      });
    },
    dbclick(row){
      this.goDoorLockEdit(row);
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getData(page) {
      this.tableData = this.$lodash.testData({
        id: 123132,
        door_number: 'door234',
        box_number: 'box012x',
        source_number: 'ssb323',
        source_name: '伴山家园B323',
        passwod: '123323',
        company: 'SKT',
        avalid_date: '2017-08-09 2019-08-09',
        open_status: 1,
        status: 0,
        power: 80,
        last_open: '2017-08-09 08:09:52',
        bind_time: '2017-08-09 08:09:52',
        last_open_user: '张晓明'
      });
      return;
      let params_ = {
        page: page || this.page.cur + 1,
        pagesize: this.pageSize
      };
      this.$lodash.assign(params_, this.queryParams);
      this.$apis.admin(params_).then(res => {
        let _rdada = res.data.data || [];
        let page_ = res.data.page;
        page_.cur *= 1;
        page_.total *= 1;
        page_.cur = page_.cur || 1;
        this.tableData = _rdada;
        this.page = res.data.page;
        this.$router.push({
          query: {
            page: this.page.cur
          }
        });
      });
    },
    selectionChange(selection, index) { // 全选选中
      this.selection = selection;
      this.selectedGroup = selection;
    },
    selectMenu(name) {
      const isProject = name.split('-')[0] === 'project';
      this.tabActive = 'resource';
      this.isProject = isProject;
    },
    showDel() {
      if (this.selectedGroup.length <= 0) {
        this.$Message.warning('请选择您要删除用户');
        return;
      }
      this.selectedGroupNames = this.selectedGroup[0].id;
      this.modelDel = true;
    },
    clearDel() {
      this.$refs['table'].selectAll(false);
      this.selectedGroup = [];
    },
    del() {
      const ids = this.$lodash.map(this.selectedGroup, 'id');
      this.modalLoading = true;
      this.$apis.adminDelete({
        id: ids.join(',')
      }).then(res => {
        this.$lodash.forEach(ids, (curid) => {
          this.$lodash.forEach(this.tableData, (item, index) => {
            if (item && item.id == curid) {
              this.tableData.splice(index, 1);
              --this.page.total;
            }
          });
        });

        if (this.tableData.length + 1 == this.pageSize) {
          this.getData(this.page.cur);
        } else if (this.tableData <= 0 && this.page.cur != 1) {
          this.getData(this.page.cur - 1);
        } else {
          this.getData(1);
        }
        this.modalLoading = false;
        this.modelDel = false;
        this.$Message.success('删除成功');
      });
    }
  }
}
</script>
<style>
.left-menu {
  position: relative;
}

.left-menu-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  content: '';
  display: block;
  width: 100%;
  height: 40px;
  border-right: 1px solid #ddd;
}

.poptip-list div:before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 100%;
  background-color: #5cadff;
}

.txt-blue {
  color: #2d8cf0;
}

.aside {
  position: fixed;
  z-index: 9999999;
  top: 0;
  bottom: 0;
  right: 0;
  width: 300px;
  background-color: #fff;
}

.aside-shadow {
  position: fixed;
  z-index: 999999;
  content: '';
  display: block;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.7;
}

.aisde-header {
  height: 72px;
  padding: 20px;
}

.aisde-container {
  overflow-y: auto;
  position: absolute;
  width: 100%;
  top: 72px;
  bottom: 53px;
  padding: 10px 20px;
}

.aisde-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 52px;
  padding: 10px 20px;
  border-top: 1px solid #ddd;
  background-color: #fafafa;
}

.aside .ivu-icon {
  margin: 0 5px;
}

.aisde-container .time {
  font-weight: 700;
  padding-bottom: 5px
}
</style>