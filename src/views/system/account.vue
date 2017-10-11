<template>
  <div>
    <!--  tableFuncs -->
    <div class="tableFuncs">
      <Button-group shape="circle">
        <Button type="primary" icon="plus-circled" @click="goAdd">
          <span>添加账号</span>
        </Button>
        <Button icon="close">批量删除</Button>
      </Button-group>
    </div>
    <!-- tableTools -->
    <div class="tableTools">
      <div class="tableTools-inner" style="max-width: 1200px;">
        <Row :gutter="16">
          <Col span="5">
          <Input v-model="queryParams.keyword" icon="search" placeholder="邮箱/姓名" @on-click="getData(1)" @on-enter="getData(1)"></Input>
          </Col>
        </Row>
      </div>
    </div>
    <!-- Table -->
    <Table ref="studentTable" :columns="columns" :data="tableData" @on-row-dblclick="dbclick" @on-selection-change="selectionChange" stripe border></Table>
    <div class="pagination">
      <Page :total="page.total" :current="page.cur" @on-change="getData" :page-size="pageSize" show-elevator show-total></Page>
    </div>
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
      activeParams: null, // 当前操作行数据
      selection: [], // 全选数组
      selectedGroup: [], // 多选中的行
      selectedGroupNames: [],
      modelDel: false, // 删除model显示隐藏
      modalLoading: false, // 加载按钮加载中提示
      queryParams: { // 表头筛选
        keyword: ''
      },
      tableData: [],
      page: {},
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '用户ID',
        key: 'id',
        width: 120
      }, {
        title: '用户名称',
        key: 'name',
        width: 140
      }, {
        title: '手机号码',
        key: 'phone',
        width: 195
      }, {
        title: '用户角色',
        key: 'role',
        align: 'center',
        width: 150,
        render: (h, params) => {
          return h('Tag', {
            props: {
              type: 'border',
              color: 'red'
            }
          }, params.row.role)
        }
      }, {
        title: '状态',
        key: 'status',
        width: 120,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          const isForzen = row.status != 1; // 已冻结
          return h('i-switch', {
            props: {
              size: 'large',
              value: !isForzen,
            },
            on: {
              'on-change': (switchStatus) => {
                this.selectedGroup = [row];
                this.studentFrozen(!switchStatus);
              }
            }
          }, [h('span', {
            slot: 'open'
          }, '激活'), h('span', {
            slot: 'close'
          }, '冻结')])
        }
      }, {
        title: '最后登录时间',
        key: 'last_login_time',
        render: (h, params) => {
          const row = params.row;
          return h('span', row.last_login_time || '-');
        }
      }, {
        title: '最后登录IP',
        key: 'last_ip',
        render: (h, params) => {
          const row = params.row;
          return h('span', row.last_ip || '-');
        }
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
  created() {
    const curPage = this.$route.query.page || 1;
    this.getData(curPage);
  },
  methods: {
    goAdd() {
      this.$router.push({
        'name': 'system.account.add'
      });
    },
    goEdit(id) {
      this.$router.push({
        'name': 'system.account.edit',
        'params': {
          id
        }
      });
    },
    dbclick(row){
      this.goEdit(row.id);
    },
    getData(page) {
      this.tableData = this.$lodash.testData({
        id: '123123213',
        name: '张晓明',
        phone: '18664354871',
        status: 1,
        role: '超级管理员',
        last_login_time: '2017-08-02',
        last_ip: '192.78.23'
      })
      return false;
      let params_ = {
        page: page || this.page.cur + 1,
        pagesize: this.pageSize
      };
      this.$lodash.assign(params_, this.queryParams);
      this.$apis.userList(params_).then(res => {
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
      this.$apis.delUser({
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