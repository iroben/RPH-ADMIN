<template>
  <div>
    <!--  tableFuncs -->
    <div class="tableFuncs">
      <Button-group shape="circle">
        <Button type="primary" icon="plus-circled" @click="goRouter('members.add')"> 人员 </Button>
        <Button icon="close" @click="delGroup()"> 删除 </Button>
        <Button icon="stats-bars">
          <Dropdown placement="bottom">
            报表输出
            <Icon style="margin-left: 5px;" type="arrow-down-b"></Icon>
            <DropdownMenu slot="list">
              <DropdownItem>报表1</DropdownItem>
              <DropdownItem>报表2</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Button>
        <Button :icon="toggleStatus ? 'navicon-round' : 'grid'" @click="changeToggle">视图切换</Button>
        <Button title="重置" @click="resetFilter" icon="loop">重置</Button>
      </Button-group>
    </div>
    <div class="header-line"></div>
    <Row :gutter="20">
      <Col span="4">
      <OrgMenus @onchange="changeMenus"></OrgMenus>
      </Col>
      <Col span="20">
      <template v-if="toggleStatus">
        <div class="tableTools" style="border: 0;">
          <Row class="tableTools-inner">
            <Col span="19">
            <Form ref="queryForm" :label-width="70" label-position="left" inline>
              <Form-item label="人员类别:" :label-width="70" prop="type">
                <Select v-model="queryParams.type" @on-change="getData(1)" filterable>
                  <Option value="" label="全部"></Option>
                  <Option value="1" label="申请人"></Option>
                  <Option value="2" label="非申请人"></Option>
                </Select>
              </Form-item>
              <Form-item label="户型:" :label-width="40" prop="huxing">
                <Select v-model="queryParams.huxing" @on-change="getData(1)" filterable>
                  <Option value="" label="全部"></Option>
                  <Option :value="key" v-for="(value, key) in huxingList" :key="key" :label="value"></Option>
                </Select>
              </Form-item>
              <Form-item label="" :label-width="1">
                <Button shape="circle" @click="toggleSearch">高级查询
                  <Icon style="margin-left: 5px;" :type="searchVisible ? 'chevron-up' : 'chevron-down'"></Icon>
                </Button>
              </Form-item>
            </Form>
            </Col>
            <Col span="5">
            <Input icon="search" prop="keyword" v-model="queryParams.keyword" placeholder="手机号/姓名" @on-click="getData(1)" @on-enter="getData(1)"></Input>
            </Col>
          </Row>
        </div>
        <MchoosePanel :visible="searchVisible"></MchoosePanel>
        <TableScoller>
          <Table ref="table" :columns="columns" :data="tableData" @on-row-click="rowClick" @on-row-dblclick="dbclick" @on-selection-change="selectionChange" stripe border></Table>
        </TableScoller>
        <div class="pagination" v-if="page.total">
          <Page :total="page.total" :current="page.cur" @on-change="getData" :page-size="pageSize" show-elevator show-total></Page>
        </div>
      </template>
      <template v-if="!toggleStatus">
        <table class="cardtable" style="width: 100%; margin-top: 20px;">
          <tr v-for="item in cardData">
            <th width="90" style="font-size:16px;">
              <Icon type="ios-navigate" style="margin-right: 5px;"></Icon>{{item.floor}}层</th>
            <td>
              <div class="houseitem" v-for="houseItem in item.house">
                <div class="houseitem-numner" :class="{'houseitem-empty' : houseItem.total <= 0}">
                  <span class="houseitem-numner-l"><Icon type="ios-navigate" style="margin-right: 5px;"></Icon>房号:{{houseItem.number}}</span>
                  <span class="houseitem-numner-r" v-if="houseItem.total > 0">{{houseItem.total}}人</span>
                  <span class="houseitem-numner-r" v-if="houseItem.total <= 0">空置</span>
                </div>
                <div class="houseitem-members">
                  <Tag v-if="houseItem.total > 0" type="dot" color="green">{{houseItem.owner.name + '(房主)'}}</Tag>
                </div>
                <div class="houseitem-bot">
                  <Button icon="android-contacts" v-if="houseItem.total <= 0" long @click="goAddOwner(houseItem.location_ids)"> <span>添加人员</span> </Button>
                  <Button icon="android-contacts" v-if="houseItem.total > 0" long @click="goFamily(houseItem)"> <span>管理人员</span> </Button>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <div class="pagination" v-if="page.total">
          <Page :total="cardPage.total" :current="cardPage.cur" @on-change="getCardData" :page-size="pageSize" show-elevator show-total></Page>
        </div>
      </template>
      </Col>
    </Row>
    <Modal v-model="modelFamily" width="1100">
      <p slot="footer">
      </p>
      <Row>
        <Col span="12">
        <strong style="color: red; font-size: 14px;">房号:{{modelItem.number}}</strong>
        </Col>
        <Col span="12" style="text-align: right">
        <Button icon="android-contacts" type="primary" size="small" style="margin-bottom: 10px;" @click="goAddOwner(modelItem.location_ids)">添加人员</Button>
        </Col>
      </Row>
      <Table ref="studentTable" :columns="columns" :data="familyData" @on-selection-change="selectionChange" stripe border></Table>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeParams: {}, // 当前选中表格行数据
      selectedGroup: [], // 表格批量选中行数据
      selectedGroupNames: [], // 表格批量选中行Names
      modalLoading: false, // 加载状态
      queryParams: { // 表格筛选条件
        keyword: '',
        org_id: '',
        huxing: ''
      },
      chooseParams: {},
      searchVisible: false,
      toggleStatus: 1,
      huxingList: [],
      modelFamily: false,
      modelItem: '',
      tableData: [], // 表格数据
      cardData: [],
      cardPage: {},
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
          const isSuper = row.super == 1;
          return this.$lodash.renderButtonGroup(h, params, [{
            icon: 'close',
            click: () => {
              this.activeParams = params;
              this.delData();
            }
          }, {
            icon: 'edit',
            click: () => {
              this.goEdit(params.row.id);
            }
          }])
        }
      }]
    }
  },
  computed: {
    pageSize() { // 分页大小
      return this.$store.getters.pageSize;
    },
    canGroup() { // 当前是否支持批量操作
      return this.selectedGroup.length > 0;
    }
  },
  created() {
    // 获取户型
    this.$lodash.api(this,'getHuxing').then(res => {
      this.huxingList = res.data;
    })
    // 获取数据
    const curPage = this.$route.query.page || 1;
    this.getData(curPage);
  },
  methods: {
    changeMenus(parms) {
      this.chooseParams = parms;
      if (this.toggleStatus) {
        this.getData(1);
      } else {
        this.getCardData(1);
      }

    },
    rowClick(params, e) {

    },
    dbclick(row) {
      this.goEdit(row.id);
    },
    toggleSearch() {
      this.searchVisible = !this.searchVisible;
    },
    goEdit(id) {
      this.$router.push({
        'name': 'members.edit',
        'params': {
          id
        }
      });
    },
    goFamily(item) {
      this.modelFamily = true;
      this.modelItem = item;
      this.$apis.membersFamily({
        id: item.owner.id
      }).then(res => {
        this.familyData = res.data
      })
    },
    goAddOwner(location_ids) {
      this.goRouter('members.add', {}, {
        location: location_ids
      })
    },
    getCardData(page) {
      this.$apis.membersByFloor({
        page: page || this.cardPage.cur,
        floor: this.cardquery || '',
        ids: this.chooseParams.ids
      }).then(res => {
        this.cardData = res.data;
        this.cardPage = res.page;
      })
    },
    changeToggle() {
      this.toggleStatus = this.toggleStatus == 0 ? 1 : 0;
      this.cardquery = '';
    },
    // 跳转到指定ROUTER
    goRouter(name, params, query) {
      const params_ = params || {};
      const query_ = query || {};
      this.$router.push({
        name: name,
        query: query_,
        params: params_
      });
    },
    // 重置Query
    resetFilter() {
      this.isRest = true;
      this.$lodash.forEach(this.queryParams, (value, key) => {
        this.queryParams[key] = '';
      });
      setTimeout(() => {
        this.getData(1, true);
      });
    },
    // 清除表格多选
    clearSelected() {
      this.$refs['table'].selectAll(false);
      this.selectedGroup = [];
    },
    // 表格多选
    selectionChange(selection, index) {
      this.selectedGroup = this.$lodash.map(selection, 'id');
      this.selectedGroupNames = this.$lodash.map(selection, 'name');
    },
    // 获取表格数据, foceReset
    // 参数在resetFilter时生效, 阻止由重置query数据而导致的多次GET
    getData(page, forceReset) {
      const Promise = this.$lodash.getTableData(this, {
        methodName: 'members',
        page: page,
        ids: this.chooseParams.ids
      }, !!forceReset);
    },
    // 批量删除Table数据
    delGroup() {
      if (!this.canGroup) {
        this.$Message.warning('请选择您要删除的数据');
      } else {
        this.$Modal.confirm({
          title: '确认删除?',
          content: this.selectedGroupNames.join(', '),
          loading: true,
          onOk: () => {
            const ids = this.selectedGroup.join(',');
            this.$apis.membersDelete({
              ids
            }).then((res) => {
              this.$lodash.delTableGroup(this);
              this.clearSelected();
              this.$Modal.remove();
            });
          }
        });
      }
    },
    // 单个Table删除表格
    delData() {
      const row = this.activeParams.row;
      this.$Modal.confirm({
        title: '确认删除?',
        content: row.name,
        loading: true,
        onOk: () => {
          this.$apis.membersDelete({
            ids: row.id
          }).then((res) => {
            this.$lodash.delTableActive(this, '删除成功');
            this.$Modal.remove();
          });
        }
      })
    }
  }
}

</script>
<style>
.familyCard {
  margin-bottom: 15px;
  background-color: #fafafa !important;
}

.cardtable {
  border: 1px solid #ddd;
  border-collapse: collapse;
}

.cardtable th,
.cardtable td {
  border: 1px solid #ddd;
  padding: 5px;
}

.houseitem {
  float: left;
  width: 200px;
  margin: 5px;
  background-color: #eee;
  border-radius: 2px;
  overflow: hidden;
}

.houseitem-numner {
  display: block;
  background-color: #2d8cf0;
  color: #fff;
  font-size: 14px;
  padding: 6px 10px;
  width: 100%;
  height: 33px;
}

.houseitem-members {
  padding: 10px;
  height: 50px;
}

.houseitem-members .ivu-tag {
  width: 100%;
  text-align: center;
}

.houseitem-bot {
  padding: 10px;
}

.houseitem-numner-l {
  float: left;
  font-weight: 700;
}

.houseitem-numner-r {
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  float: right;
  padding: 0 8px;
}

.houseitem-empty {
  background-color: #ed3f14;
}

</style>
