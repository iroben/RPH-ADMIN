<template>
  <div>
    <Affix style="float:left">
      <Menu :active-name="active" @on-select="menuSelect" style="width: 180px">
        <MenuGroup :title="'人员:' + editInfor.name">
          <MenuItem name="info">
          <Icon type="document-text"></Icon>
          基本信息
          </MenuItem>
          <MenuItem name="location">
          <Icon type="ios-navigate"></Icon>
          房源位置
          </MenuItem>
          <MenuItem name="family">
          <Icon type="person-stalker"></Icon>
          家庭成员
          </MenuItem>
          <MenuItem name="lock">
          <Icon type="clock"></Icon>
          门锁记录
          </MenuItem>
        </MenuGroup>
      </Menu>
    </Affix>
    <div style="margin-left: 200px;" v-if="active == 'info'">
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="100">
        <Row :gutter="16">
          <Col span="14" offset="5">
          <Form-item label="姓名" prop="name">
            <Input v-model="formData.name" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="性别" prop="gender">
            <Radio-group v-model="formData.gender">
              <Radio label="1">男</Radio>
              <Radio label="2">女</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="身份证号码" prop="card_id">
            <Input v-model="formData.card_id" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="出生日期" prop="birth">
            <Date-picker style="width: 100%; " ref="date" v-model="dateValue" type="date" format="yyyy-MM-dd" @on-ok="dateChange" @on-clear="dateClear" confirm placement="bottom-start" placeholder="选择出生日期"></Date-picker>
          </Form-item>
          <Form-item label="身份" prop="relation">
            <Select v-model="formData.relation" placeholder="请选择身份">
              <Option value="0">本人</Option>
              <Option value="1">配偶</Option>
              <Option value="2">子女</Option>
              <Option value="3">父母</Option>
            </Select>
          </Form-item>
          <Form-item label="手机号码" prop="phone">
            <Input v-model="formData.phone" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="工作单位" prop="org">
            <Input v-model="formData.org" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="审核意见" prop="sugestion">
            <Input v-model="formData.sugestion" type="textarea" :autosize="{minRows: 5,maxRows: 8}" placeholder="请输入..."></Input>
          </Form-item>
          <Form-item label="用户头像" class="avatar-list">
            <div class="img-long" v-if="formData.avatar">
              <img :src="formData.avatar">
            </div>
            <vue-core-image-upload text="上传头像" cropRatio="1:1" @uploaded="imageUploaded">
            </vue-core-image-upload>
          </Form-item>
          <div class="form-title">
            <Icon type="ios-navigate"></Icon>房源位置:
          </div>
          <Form-item label="位置" prop="location">
            <MchooseLocation v-model="formData.location" :max="4"></MchooseLocation>
          </Form-item>
          <Form-item label="">
            <Button type="primary" icon="checkmark-circled" @click="handleSubmit('formData')">提交</Button>
            <Button icon="refresh" @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
          </Form-item>
          </Col>
        </Row>
        <Row style="text-align: center; padding: 20px">
        </Row>
      </Form>
    </div>
    <Row :gutter="20" style="margin-left: 200px;" v-if="active == 'location'">
      <Col span="12" v-for="item in locations">
      <Card style="margin-bottom: 15px;">
        <p slot="title">
          <Icon type="android-time"></Icon>
          入住时间: {{item.start_time}}&ensp;至&ensp;{{item.end_time}}
        </p>
        <span slot="extra">
              <Icon type="location"></Icon>
              {{item.status_msg}}
          </span>
        <div class="location-show">
          <span v-if="item.status == 0">{{item.location_msg}}</span>
          <MchooseLocation style=" flaot: left; margin-bottom: 10px;" v-if="item.status == 1" v-model="item.location" :max="4"></MchooseLocation>
        </div>
        <div>
          <Button style="margin-right: 8px;" v-if="item.status == 1" type="error" icon="checkmark-circled" @click="locationEdit(item.location)">保存</Button>
          <Button type="link" icon="eye" @click="goSourceView(item.id)">查看</Button>
        </div>
      </Card>
      </Col>
    </Row>
    <div style="margin-left: 200px;" v-if="active == 'family'">
      <TableScoller>
        <Table ref="tableA" :columns="columnsA" @on-row-dblclick="goEdit" :data="tableFamily" stripe border></Table>
      </TableScoller>
    </div>
    <div style="margin-left: 200px;" v-if="active == 'lock'">
      <Table ref="tableB" :columns="columnsB" :data="tableLock" stripe border></Table>
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
        id: '',
        name: '',
        relation: '',
        resource: '',
        gender: 1,
        card_id: '',
        sugestion: '',
        birth: '',
        phone: '',
        org: ''
      },
      locations: [],
      tableFamily: [],
      tableLock: [],
      columnsA: [{
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
        title: '身份',
        key: 'relation',
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
            icon: 'edit',
            title: '编辑',
            click: () => {
              this.goEdit(params.row);
            }
          }])
        }
      }],
      columnsB: [{
        title: '姓名',
        key: 'name'
      }, {
        title: '房号',
        key: 'house_number'
      }, {
        title: '入住时间',
        key: 'start_time'
      }, {
        title: '操作时间',
        key: 'open_time'
      }, {
        title: '操作',
        key: 'status',
        width: 140,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          const isActive = row.status == 1;
          return h('Tag', {
            props: {
              type: 'border',
              color: isActive ? 'green' : 'red'
            }
          }, row.status_msg);
        }
      }, {
        title: '操作方式',
        key: 'way',
        width: 140,
        align: 'center',
        render: (h, params) => {
          const row = params.row;
          const isActive = row.status == 1;
          return h('Tag', {
            props: {
              type: 'border',
              color: 'red'
            }
          }, row.way);
        }
      }],
      ruleValidate: {
        name: [{
          required: true,
          message: '请输入姓名'
        }],
        resource: [{
          required: true,
          message: '请选择房源'
        }],
        floor: [{
          required: true,
          message: '请选择楼栋'
        }],
        relation: [{
          required: true,
          message: '请选择身份'
        }],
        card_id: [{
          required: true,
          message: '请填写身份证号码'
        }],
        phone: [{
          required: true,
          validator: this.$rules.phone,
          message: '请填写手机号码'
        }]
      },
    }
  },
  computed: {
    uid() {
      return this.$route.params.id;
    },
    paramsFilter() { // 表单提交字段
      return ['id', 'name', 'relation', 'resource', 'gender', 'card_id', 'sugestion', 'birth', 'phone', 'org'];
    }
  },
  watch: {
    active(name) {
      if (name == 'info') {
        this.getInfo();
      } else if (name == 'location') {
        this.getLocation();
      } else if (name == 'family') {
        this.getFamily();
      } else if (name == 'lock') {
        this.getLock();
      }
    },
  },
  created() {
    this.active = 'info';
    this.$store.commit('breadcrumb', [{
      name: '人员管理',
      href: '/members'
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
    goSourceView(id) {
      this.$router.push({
        'name': 'project.edit',
        'params': {
          id: id
        }
      })
    },
    menuSelect(name) {
      this.active = name;
    },
    getInfo() {
      this.$apis.membersInfo({
        uid: this.uid
      }).then(res => {
        this.editInfor = res.data;
        this.dateValue = this.editInfor.birth;
        this.$lodash.assign(this.formData, this.editInfor);
        this.$store.commit('tabChange', { name: this.$route.name, title: '编辑人员:' + this.editInfor.name });
        setTimeout(() => {
          this.$store.commit('metaName', '编辑人员-' + this.editInfor.house_number);
        })

      })
    },
    getLocation() {
      this.$apis.membersLocation({
        uid: this.uid
      }).then(res => {
        this.locations = res.data;
      })
    },
    getFamily() {
      this.$apis.membersFamily({
        uid: this.uid
      }).then(res => {
        console.log(res)
        this.tableFamily = res.data || [];
      })
    },
    getLock() {
      this.$apis.membersLockHistory({
        uid: this.uid
      }).then(res => {
        console.log(res)
        this.tableLock = res.data || [];
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
    // 提交成功后返回
    submitBack() {
      this.$router.push({
        name: 'members.index'
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
          let params = this.$lodash.filterValue(this.formData, this.paramsFilter);
          params.resource = params.resource.replace(/\-/g, ',');
          this.$lodash.api(this, 'addMembers', params).then(res => {
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
    }
  }
}

</script>
<style scoped>
.ivu-menu-item-group-title {
  display: none;
}

.location-show {
  display: block;
  height: 42px;
}

.location-show span {
  line-height: 42px;
}

</style>
