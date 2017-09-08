<template>
  <div>
    <!--  tableFuncs -->
    <div class="tableFuncs">
      <Button-group shape="circle">
        <Button type="primary" icon="plus-circled" @click="goRouter('members.add')">
          人员
        </Button>
        <Button icon="close" @click="delGroup()">
          删除
        </Button>
        <Button icon="stats-bars">
          <Dropdown placement="bottom">
            报表输出<Icon style="margin-left: 5px;" type="arrow-down-b"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem>报表1</DropdownItem>
                <DropdownItem>报表2</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        </Button>
        <Button :icon="toggleStatus ? 'navicon-round' : 'grid'" @click="changeToggle"></Button>
        <Button title="重置" @click="resetFilter" icon="loop">重置</Button>
      </Button-group>
    </div>
    <div class="header-line"></div>
    <Row :gutter="20">
      <Col span="4">
      <OrgMenus></OrgMenus>
      </Col>
      <Col span="20">
      <div class="tableTools" style="border: 0;">
        <Row class="tableTools-inner">
          <Col span="19">
          <Form ref="queryForm" :label-width="70" label-position="left" inline>
            <Form-item label="房源类别:" :label-width="70" prop="type">
              <Select v-model="queryParams.type" @on-change="getData(1)" filterable>
                <Option value="" label="全部"></Option>
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
          <Input icon="search" prop="keyword" v-model="queryParams.keyword" placeholder="工作单位/手机号/姓名" @on-click="getData(1)" @on-enter="getData(1)"></Input>
          </Col>
        </Row>
      </div>
      <MchoosePanel :visible="searchVisible"></MchoosePanel>
      <template v-if="toggleStatus">
        <TableScoller>
          <Table ref="table" :columns="columns" :data="tableData" @on-row-dblclick="dbclick" @on-selection-change="selectionChange" stripe border></Table>
        </TableScoller>
        <div class="pagination">
          <Page :total="page.total" :current="page.cur" @on-change="getData" :page-size="pageSize" show-elevator show-total></Page>
        </div>
      </template>
      <template v-if="!toggleStatus">
        <Card style="margin-bottom: 20px;">
          <p slot="title">
            伴山家园,A栋B11,35套空置
          </p>
          <Row :gutter="15">
            <Col :span="6" v-for="houseItem in cardData">
            <Card class="familyCard">
              <div slot="title">
                <Icon type="android-pin" style="margin-right:3px"></Icon>
                {{houseItem.house_number}}
              </div>
              <span slot="extra">
                            {{houseItem.family_count}}人
                        </span>
              <div class="ulist">
                <Tag v-for="family in houseItem.family" type="dot" :color="family.isManager ? 'red' : ''">{{family.name}}&emsp;{{family.isManager ? '(申请人)' : ''}}</Tag>
              </div>
              <Button type="primary" icon="android-contacts" long @click="goFamily">
                <span>管理人员</span>
              </Button>
            </Card>
            </Col>
          </Row>
        </Card>
        <Card style="margin-bottom: 20px;">
          <p slot="title">
            四海新城,C栋B11,35套空置
          </p>
          <Row :gutter="15">
            <Col :span="6" v-for="houseItem in cardData">
            <Card class="familyCard">
              <div slot="title">
                <Icon type="android-pin" style="margin-right:3px"></Icon>
                {{houseItem.house_number}}
              </div>
              <span slot="extra">
                            {{houseItem.family_count}}人
                        </span>
              <div class="ulist">
                <Tag v-for="family in houseItem.family" type="dot" :color="family.isManager ? 'red' : ''">{{family.name}}&emsp;{{family.isManager ? '(申请人)' : ''}}</Tag>
              </div>
              <Button type="primary" icon="android-contacts" long @click="goFamily">
                <span>管理人员</span>
              </Button>
            </Card>
            </Col>
          </Row>
        </Card>
      </template>
      </Col>
    </Row>
    <Modal v-model="modelFamily" title="普通的Modal对话框标题" width="1100">
      <p slot="header">
        <Icon type="information-circled"></Icon>
        <span>B栋311</span>
      </p>
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
      searchVisible: false,
      toggleStatus: 1,
      huxingList: [],
      tableData: [], // 表格数据
      page: {}, // 分页
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
    this.$lodash.api(this, 'getHuxing', {}).then(res => {
      this.huxingList = res.data;
    });

    this.cardData = this.$lodash.testData({
      house_number: 'B栋411',
      family: [{
        'name': '张晓玲',
        'isManager': true,
      }, {
        'name': '张晓明',
        'isManager': false,
      }, {
        'name': '大花',
        'isManager': false,
      }],
      family_count: 3
    }, 4);

    // 获取数据
    const curPage = this.$route.query.page || 1;
    this.getData(curPage);
  },
  methods: {
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
    goFamily() {
      this.modelFamily = true;
      this.familyData = this.$lodash.testData({
        id: '2222',
        name: '张晓玲',
        house_number: 'B栋410',
        gender: '女',
        birth: '1991-04-15',
        card_id: 430726199104155779,
        org: '北京大学',
        phone: '18664357434',
        door_status: 'open'
      }, 3);
    },
    changeToggle() {
      this.toggleStatus = this.toggleStatus == 0 ? 1 : 0;
    },
    // 跳转到指定ROUTER
    goRouter(name, params, query) {
      const params_ = params || {};
      const query_ = params || {};
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
        page: page
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
            this.$lodash.api(this, 'membersDelete', {
              ids
            }).then((res) => {
              this.$lodash.delTableGroup(this);
              this.clearSelected();
              this.$Modal.remove();
            }, 1000);
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
          setTimeout(res => {
            this.$lodash.delTableActive(this, '删除成功');
            this.$Modal.remove();
          }, 1000)
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

</style>
