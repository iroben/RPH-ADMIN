<template>
  <div>
    <!--  tableFuncs -->
    <div class="tableFuncs">
      <Button-group shape="circle">
        <Button type="primary" icon="android-done-all" @click="tipIdentify()">
          <span>批量认证</span>
        </Button>
      </Button-group>
    </div>
    <!-- tableTools -->
    <div class="tableTools">
      <div class="tableTools-inner">
        <Row :gutter="16">
          <Col span="5">
          <Col span="8"><strong class="tool-label">开课单位:</strong></Col>
          <Col span="16">
          <Select v-model="queryParams.org_id" @on-change="getData(1)" filterable>
            <Option value="" label="全部"></Option>
            <Option :value="org.org_id" :key="org.org_id" v-for="org in orgList" :label="org.org_name"></Option>
          </Select>
          </Col>
          </Col>
          <Col span="5">
          <Col span="8"><strong class="tool-label">学科:</strong></Col>
          <Col span="16">
          <Select v-model="queryParams.category" @on-change="getData(1)" filterable>
            <Option value="" label="全部"></Option>
            <Option :value="cate.id" :key="cate.id" v-for="cate in categories" :label="cate.name"> </Option>
          </Select>
          </Col>
          </Col>
          <Col span="4">
          <Col span="8"><strong class="tool-label">学分:</strong></Col>
          <Col span="16">
          <Select v-model="queryParams.uc_credit" @on-change="getData(1)" filterable>
            <Option value="" label="全部"></Option>
            <Option :value="credit.uc_credit" :key="credit.uc_credit" v-for="credit in creditList" :label="credit.uc_credit"></Option>
          </Select>
          </Col>
          </Col>
          <Col span="4">
          <Col span="8"><strong class="tool-label">认证:</strong></Col>
          <Col span="16">
          <Select v-model="queryParams.identify" @on-change="getData(1)" filterable>
            <Option value="" label="全部"></Option>
            <Option :value="key" :key="key" v-for="(value, key) in identifyList" :label="value"></Option>
          </Select>
          </Col>
          </Col>
          <Col span="4" offset="2">
          <Input v-model="queryParams.keyword" icon="search" placeholder="课程名称/教师名称..." @on-click="getData(1)" @on-enter="getData(1)"></Input>
          </Col>
        </Row>
      </div>
    </div>
    <!-- Table -->
    <Table ref="studentTable" :columns="columns" :data="tableData" @on-selection-change="selectionChange" stripe border></Table>
    <div class="pagination">
      <Page :total="page.total" :current="page.cur" @on-change="getData" :page-size="pageSize" show-elevator show-total></Page>
    </div>
    <!-- identify Model -->
    <Modal v-model="modelIdenfity" width="300" @on-cancel="clearSelected">
      <p slot="header" style="color:#f60; text-align:center">
        <Icon type="information-circled"></Icon>
        <span>认证课程</span>
      </p>
      <div style="text-align:left">
        <ul class="model-list">
          <li v-for="names in selectedGroupNames">{{names}}</li>
        </ul>
      </div>
      <div slot="footer">
        <Button type="error" long :loading="modalLoading" @click="identify">认证</Button>
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
        modelIdenfity: false, // 认证model
        modalLoading: false, // 加载按钮加载中提示
        queryParams: { // 表头筛选
          uc_credit: '',
          identify: '',
          category: '',
          org_id: '',
          keyword: '',
        },
        orgList: [],
        categories: [],
        creditList: [],
        identifyList: [],
        courseStatus: [],
        tableData: [],
        page: {}, // 分页
        columns: [{
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '课程编号',
          key: 'course_id',
          sortable: true,
          width: 110
        }, {
          title: '课程名称',
          key: 'name',
          className: 'avatarImg'
        }, {
          title: '开课单位',
          key: 'org_name',
          width: 130,
          render: (h, params) => {
            const row = params.row;
            return h('span', row.org_name + '/' + row.uname);
          }
        }, {
          title: '学科类别',
          key: 'category',
          width: 100
        }, {
          title: '学分',
          key: 'uc_credit',
          sortable: true,
          align: 'center',
          width: 80,
          render: (h, params) => {
            const row = params.row;
            return h('Tag', row.uc_credit);
          }
        }, {
          title: '开课时间',
          key: 'start_time',
          width: 100
        }, {
          title: '课程状态',
          key: 'status',
          sortable: true,
          width: 135,
          render: (h, params) => {
            const row = params.row;
            return h('Tag', {
              props: {
                type: 'dot',
                color: row.status >= 31 ? 'green' : ''
              }
            }, row.status_name);
          }
        }, {
          title: '认证状态',
          key: 'identify',
          align: 'center',
          sortable: true,
          width: 110,
          render: (h, params) => {
            const row = params.row;
            const isIdentify = row.identify == 1;
            return h('Tag', {
              props: {
                type: 'border',
                color: isIdentify ? 'green' : 'red'
              }
            }, isIdentify ? '已认证' : '未认证');
          }
        }, {
          title: '操作',
          key: 'address',
          width: 120,
          // fixed: 'right',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            const isIdentify = row.identify == 1;
            return h('ButtonGroup', [
              h('Button', {
                props: {
                  type: 'ghost',
                  icon: 'earth',
                  size: 'small'
                },
                attrs: {
                  title: '查看'
                },
                on: {
                  click: () => {
                    this.$Message.info('console:' + row.name);
                    console.log(row);
                  }
                }
              }),
              h('Button', {
                props: {
                  disabled: isIdentify,
                  type: 'ghost',
                  icon: 'ios-paw',
                  size: 'small'
                },
                attrs: {
                  title: '认证课程'
                },
                on: {
                  click: () => {
                    this.selectedGroup = [row];
                    this.identify();
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

      // Test数据所以写在store里面的, 
      // 可以通过 this.$apis.funcName获取
      this.$store.dispatch('tableFilter').then(res => {
        const result = res.data;
        this.orgList = result.org_list;
        this.categories = result.categories;
        this.creditList = result.credit_list;
        this.identifyList = result.identify;
        this.courseStatus = result.status;
      });

      const curPage = this.$route.query.page || 1;
      this.getData(curPage);
    },
    methods: {
      selectionChange(selection, index) { // 全选选中
        this.selection = selection;
        this.selectedGroup = selection;
      },
      clearSelected() {
        this.$refs['studentTable'].selectAll(false);
        this.selectedGroup = [];
      },
      getData(page) {
        let params_ = {
          page: page || this.page.cur + 1,
          pagesize: this.pageSize
        };
        this.$lodash.assign(params_, this.queryParams);
        this.$Message.info('获取Data, page: ' + params_.page + '请查看console 参数');
        console.log(params_);

        this.$store.dispatch('tableData').then(res => {
          let result = res.data.data || [];

          // 遍历设置disabled
          this.$lodash.forEach(result, (item) => {
            if (item && item.identify == 1) {
              item._disabled = true;
            }
          })

          this.tableData = result;
          this.page = res.data.page;
          this.$router.push({
            query: {
              page: this.page.cur
            }
          });
        });
      },
      tipIdentify() {
        this.modalLoading = false;
        if (this.selectedGroup.length <= 0) {
          this.$Message.warning('请选择您要认证的课程');
          return;
        }
        this.selectedGroupNames = this.$lodash.map(this.selectedGroup, 'name');
        this.modelIdenfity = true;
      },
      identify() {
        const ids = this.$lodash.map(this.selectedGroup, 'id');
        this.modalLoading = true;
        this.$store.dispatch('identify').then(res => {
            this.$lodash.forEach(this.tableData, (item, index) => {
              const inArray = this.$lodash.indexOf(ids, item.id) > -1;
              if (item && inArray) {
                item.identify = 1;
              }
            });
            this.modalLoading = false;
            this.modelIdenfity = false;
            this.$Message.success('认证成功');
          })
          // this.$apis.identifyCourse({
          //   id: ids.join(',')
          // }).then(res => {
          //   this.$lodash.forEach(this.tableData, (item, index) => {
          //     const inArray = this.$lodash.indexOf(ids, item.id) > -1;
          //     if (item && inArray) {
          //       item.identify = 1;
          //     }
          //   });
          //   this.modalLoading = false;
          //   this.modelIdenfity = false;
          //   this.$Message.success('认证成功');
          // });
      }
    }
}
</script>
