<template>
  <div>
    <Affix style="float:left">
      <Menu :active-name="active" @on-select="menuSelect" style="width: 180px;">
        <MenuGroup :title="'楼栋:' + editInfor.name">
          <MenuItem name="info">
          <Icon type="document-text"></Icon>
          基本信息
          </MenuItem>
          <MenuItem name="source">
          <Icon type="android-compass"></Icon>
          房源列表
          </MenuItem>
        </MenuGroup>
      </Menu>
    </Affix>
    <div style="margin-left: 200px;" v-if="active == 'info'">
      <Form ref="editForm" :model="formData" :rules="ruleValidate" label-position="right" :label-width="90">
            <Row :gutter="16">
                <Col span="14" offset="5">
                <div class="form-title">
                    <Icon type="document-text"></Icon>楼栋信息:
                </div>
                <Form-item label="选择项目" prop="project">
                    <MchooseLocation v-model="formData.location" :max="2" style="margin-bottom: 0"></MchooseLocation>
                    <Input v-model="formData.location" placeholder="请输入" style="display:none;"></Input>
                </Form-item>
                <Form-item label="楼栋名称" prop="name">
                    <Input v-model="formData.name" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="总楼层" prop="total">
                    <Slider :max="100" :min="1" v-model="formData.total" show-input :tip-format="totalFormat"></Slider>
                </Form-item>
                <Form-item label="配套" prop="peitao">
                    <Select v-model="formData.peitao" multiple placeholder="请选择">
                        <Option value="1">冰箱</Option>
                        <Option value="2">洗衣机</Option>
                        <Option value="3">台灯</Option>
                        <Option value="4">空调</Option>
                    </Select>
                </Form-item>
                <Form-item label="楼栋介绍" prop="intro">
                    <Input v-model="formData.intro" type="textarea" placeholder="请输入" :rows="3"></Input>
                </Form-item>
                <Form-item label="上传图片" class="avatar-list">
                    <AvaterView placement="left" uri="data:image/jpeg;base64,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"></AvaterView>
                    <div class="clear"></div>
                    <VueCoreImageUpload></VueCoreImageUpload>
                </Form-item>
                </Col>
            </Row>
            <Row style="text-align: center; padding: 20px">
                <Button size="large" type="primary" icon="checkmark-circled" @click="handleSubmit()">提交</Button>
                <Button size="large" type="ghost" icon="refresh" @click="handleReset()" style="margin-left: 8px">重置</Button>
            </Row>
        </Form>
    </div>
    <div style="margin-left: 200px;" v-if="active == 'source'">
      <TableScoller>
        <Table ref="tableC" :columns="columnsC" @on-row-dblclick="goSourceEdit" :data="tableFloor" stripe border></Table>
      </TableScoller>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: '0',
      dateValue: '', // 日历控件
      editInfor: {}, // 表单详情
      formData: {
        id: 1,
          project: '',
          total: 1,
          peitao: [],
          photos: '',
          intro: '',
          project: '',
          location: ''
      },
      ruleValidate: {
        name: [{
          required: true,
          message: '请输入项目名称'
        }],
        number: [{
          required: true,
          message: '请输入项目编号'
        }],
        address: [{
          required: true,
          message: '请输入项目地址'
        }]
      },
      locations: [],
      tableFloor: [],
      columnsC: [{
        title: '项目',
        key: 'project',
        width: 140
      }, {
        title: '楼栋',
        key: 'floor',
        align: 'center',
        className: 'avatarImg',
        width: 130
      }, {
        title: '房号',
        key: 'house_number',
        align: 'center',
        width: 80
      }, {
        title: '面积',
        key: 'area',
        width: 110,
        align: 'center'
      }, {
        title: '户型',
        key: 'house_type',
        width: 120,
        align: 'center'
      }, {
        title: '入住人数',
        key: 'count',
        width: 90,
        align: 'center'
      }, {
        title: '租期',
        key: 'rent_date',
        align: 'center',
        width: 120,
      }, {
        title: '门锁编号',
        key: 'door_number',
        align: 'center'
      }, {
        title: '通信盒编号',
        key: 'door_box_number',
        align: 'center'
      }, {
        title: '房租',
        key: 'rent_pirce',
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
                  this.activeParams = params;
                  this.delSource();
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
    id() {
      return this.$route.params.id;
    },
    paramsFilter() { // 表单提交字段
      return ['id', 'project', 'total', 'peitao', 'photos', 'intro', 'location'];
    }
  },
  watch: {
    active(name) {
      if (name == 'info') {
        this.getInfo();
      } else if (name == 'source') {
        this.getSource();
      }
    },
  },
  created() {
    this.active = 'info';
    this.$store.commit('breadcrumb', [{
      name: '房源管理',
      href: '/resource'
    }]);
  },
  methods: {
    goEdit(row) {
      this.active == 'info';
      setTimeout(() => {
        this.active = 'info';
      })
      this.$router.push({
        'name': 'members.edit',
        'params': {
          id: row.id
        }
      });
    },
    goSourceEdit(row) {
      this.$router.push({
        'name': 'resource.edit',
        'params': {
          id: row.id
        }
      });
    },
    goFloorEdit(row) {
      this.$router.push({
        'name': 'floor.edit',
        'params': {
          id: row.id
        }
      });
    },
    menuSelect(name) {
      this.active = name;
    },
    getInfo() {
      this.$lodash.api(this, 'floorInfo', {
        id: this.id
      }).then(res => {
        this.editInfor = res.data;
        this.$lodash.assign(this.formData, this.editInfor);
        this.$store.commit('updateActiveTab', {
          title: '编辑楼栋:' + this.editInfor.name
        });
      })
    },
    getSource() {
      this.$lodash.api(this, 'floorSource', {
        uid: this.uid
      }).then(res => {
        this.tableFloor = res.data.data || [];
      })
    },
    locationEdit(location) {
      this.$lodash.api(this, 'membersLocationEdit', {
        uid: this.uid,
        location
      }).then(res => {
        this.$Message.success('编辑成功');
      })
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    // 提交成功后返回
    submitBack() {
      this.$router.push({
        name: 'resource.index'
      });
    },
    // 图片上传成功
    imageUploaded(url) {
      this.formData.avatar = url;
    },
    // 清除日历控件
    dateClear() {
      this.formData.birth = '';
    },
    // 日历改变
    dateChange(dateRange) {
      const curDateRange = this.$refs.date.formattingDate(this.dateValue);
      this.formData.birth = curDateRange;
    },
    // 提交表单
    handleSubmit(name) {
      // 验证通过
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$lodash.api(this, 'projectEdit', this.formData).then(res => {
            this.submitBack();
            this.$Message.success('编辑成功');
          });
        }
      })
    },
    // 重置表单
    handleReset(name) {
      this.$refs.date.handleClear();
      this.$refs[name].resetFields();
      this.$lodash.assign(this.formData, this.editInfor);
    },
    // 单个Table删除表格
    delSource() {
      const row = this.activeParams.row;
      this.$Modal.confirm({
        title: '确认删除',
        content: row.project + '-' + row.project + '-' + row.house_number,
        loading: true,
        onOk: () => {
          this.$lodash.api(this, 'resourceDelete', {
            id: row.id
          }).then(res => {
            this.$Modal.remove();
            this.getSource();
          }, 1000)
        }
      })
    }
  }
}

</script>
<style scoped>
.ivu-menu-item-group-title {
  display: none;
}

</style>
