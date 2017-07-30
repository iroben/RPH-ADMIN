<template>
  <div>
    <!--  tableFuncs -->
    <div class="tableFuncs">
      <Button-group shape="circle">
        <Button type="primary" icon="plus" @click="goAdd()">添加人员</Button>
        <Button icon="refresh" @click="handleReset('queryForm')">重置查询</Button>
        <Button icon="stats-bars">报表输出</Button>
        <Button :icon="toggleStatus ? 'navicon-round' : 'grid'" @click="changeToggle"></Button>
      </Button-group>
    </div>
    <div class="header-line"></div>
    <Row :gutter="20">
      <Col span="4">
      <Menu theme="light" active-name="1-2" :open-names="['1']" width="auto" :accordion="true">
        <Submenu name="1">
          <template slot="title">
            <Icon type="flag"></Icon>
            伴山家园
          </template>
          <Menu-item name="1-1">A栋111</Menu-item>
          <Menu-item name="1-2">B栋211</Menu-item>
          <Menu-item name="1-3">C栋311</Menu-item>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="flag"></Icon>
            青年公寓
          </template>
          <Menu-item name="1-1">A111</Menu-item>
          <Menu-item name="1-2">B211</Menu-item>
          <Menu-item name="1-3">C311</Menu-item>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="flag"></Icon>
            四海新城
          </template>
          <Menu-item name="1-1">A栋111</Menu-item>
          <Menu-item name="1-2">B栋211</Menu-item>
          <Menu-item name="1-3">C栋311</Menu-item>
        </Submenu>
      </Menu>
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
                <Option value="1" label="一室一厅"></Option>
                <Option value="2" label="二室一厅"></Option>
                <Option value="3" label="三室一厅"></Option>
              </Select>
            </Form-item>
            <Form-item label="出生日期:" :label-width="70" prop="birth">
              <Date-picker v-model="queryParams.birth" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker>
            </Form-item>
          </Form>
          </Col>
          <Col span="5">
          <Input icon="search" prop="keyword" v-model="queryParams.keyword" placeholder="工作单位/手机号/姓名" @on-click="getData(1)" @on-enter="getData(1)"></Input>
          </Col>
        </Row>
      </div>
      <template v-if="toggleStatus">
        <Table ref="studentTable" :columns="columns" :data="tableData" @on-selection-change="selectionChange" stripe border></Table>
        <div class="pagination">
          <Page :total="page.total" :current="page.cur" @on-change="getData" :page-size="pageSize" show-elevator show-total></Page>
        </div>
      </template>
      <template v-if="!toggleStatus">
        <Alert type="info" show-icon>伴山家园&emsp; A栋B11 &emsp; 35套空置 </Alert>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
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
                  this.goEdit(params.row.id);
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
  mounted() {
    const curPage = this.$route.query.page || 1;
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
    });
    this.getData(curPage);
  },
  methods: {
    goAdd() {
      this.$router.push({
        'name': 'members.add'
      });
    },
    goEdit(id) {
      this.$router.push({
        'name': 'members.edit',
        'params': {
          id
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
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
    getData(page) {
      this.tableData = this.$lodash.testData({
        id: '2222',
        name: '张晓明',
        house_number: 'B栋410',
        gender: '男',
        birth: '1991-04-15',
        card_id: 430726199104155779,
        org: '深圳大学',
        phone: '18664357434',
        door_status: 'open'
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
    showDel() {
      if (this.selectedGroup.length <= 0) {
        this.$Message.warning('请选择您要删除用户');
        return;
      }
      this.selectedGroupNames = this.$lodash.map(this.selectedGroup, 'name').join(', ');
      this.modelDel = true;
    },
    clearDel() {
      this.$refs['studentTable'].selectAll(false);
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
.ulist .ivu-tag {
  width: 100%;
  margin-bottom: 5px;
}

.familyCard {
  margin-bottom: 15px;
  background-color: #fafafa !important;
}
</style>