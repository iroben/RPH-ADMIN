<template>
  <div>
    <!--  tableFuncs -->
    <div class="tableFuncs">
      <Button-group shape="circle">
        <Button type="primary" :icon="!toggleEdit ? 'navicon-round' : 'grid'" @click="toggleEditStatus">
          <span>角色管理</span>
        </Button>
      </Button-group>
    </div>
    <div class="fixed-main">
      <div class="fixed-left">
        <waterfall ref="waterFall" :line-gap="waterfallWidth" :fixed-height="true" :watch="roleData">
          <!-- each component is wrapped by a waterfall slot -->
          <waterfall-slot v-for="(role, index) in roleData" :width="waterfallWidth - 20" :height="waterHeight(role.range)" :order="index" :key="role.id">
            <div style="padding-right: 15px;">
              <Card style="margin-bottom: 15px;">
                <p slot="title">
                  <Icon type="person"></Icon>
                  {{role.name+ '_' + (index+1)}}
                </p>
                <Button-group slot="extra" v-show="toggleEdit">
                  <Button type="text" size="small" shape="circle" icon="edit">编辑</Button>
                  <Button @click="del(role, index)" type="text" size="small" shape="circle" icon="android-close">删除</Button>
                </Button-group>
                <div class="role-empty" v-if="!role.range.length">
                  <Icon type="help-buoy" size="24"></Icon>
                  <p>暂无权限</p>
                </div>
                <div class="role-list" v-if="role.range.length">
                  <Tag v-if="role.range.length" color="blue" v-for="(item, index) in role.range" @on-close="handleClose(role.range, index)">
                    {{roleSelect[item]}}
                  </Tag>
                </div>
              </Card>
            </div>
          </waterfall-slot>
        </waterfall>
      </div>
      <Card class="fixed-right">
        <div slot="title">
          <Icon type="android-search"></Icon>
          添加角色
        </div>
        <a href="#" slot="extra" @click.prevent="handleReset('formAddRole')">
          <Icon type="refresh"></Icon>
          重置
        </a>
        <Form ref="formAddRole" :model="formAddRole" label-position="top">
          <Form-item label="角色名称" prop="name">
            <Input v-model="formAddRole.name" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="配置权限" prop="phone">
            <Select v-model="formAddRole.range" placement="top" multiple>
              <Option-group label="房源管理">
                <Option :value="1" label="添加房源"></Option>
                <Option :value="2" label="编辑人员"></Option>
                <Option :value="3" label="删除人员"></Option>
              </Option-group>
            </Select>
          </Form-item>
          <Form-item label="范围" prop="name">
          类似京东选择地址
            <Input v-model="formAddRole.name" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="权限全选/清空" prop="phone">
            <i-switch size="large" v-model="switchStatus" @on-change="switchChange">
              <span slot="open">全选</span>
              <span slot="close">清空</span>
            </i-switch>
          </Form-item>
          <Button type="error" icon="ios-search" long @click="addRole">确定</Button>
        </Form>
      </Card>
    </div>
  </div>
</template>
<script>
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
export default {
  components: {
    Waterfall,
    WaterfallSlot
  },
  data() {
    return {
      toggleEdit: false,
      screenWidth: document.body.clientWidth,
      roleData: [],
      roleSelect: {
        '1': '添加房源',
        '2': '编辑人员',
        '3': '删除人员',
        '4': '删除人员',
        '5': '删除人员',
        '6': '删除人员',
      },
      switchStatus: false,
      formAddRole: {
        name: '',
        range: [],
      }
    }
  },
  computed: {
    waterfallWidth() {
      return (this.screenWidth - 320 - 40) / 3;
    }
  },
  mounted() {
    window.onresize = () => {
      return this.screenWidth = document.body.clientWidth;
    };
    this.roleData = this.$lodash.testData({
      id: 1,
      name: '超级管理员',
      range: [1, 2, 3],
      width: 100,
    }, 4);
    setTimeout(() => {
      this.$refs.waterFall.autoResizeHandler()
    }, 3000)
  },
  methods: {
    del(role, index) {
      this.$Modal.confirm({
        title: '删除角色',
        content: '确认删除' + role.name + '?',
        onOk: () => {
          this.roleData.splice(index, 1);
        }
      })
    },
    toggleEditStatus() {
      this.toggleEdit = !this.toggleEdit;
    },
    waterHeight(rangeSize) {
      const leng = rangeSize.length;
      const diff = rangeSize.length > 0 ? leng * 22 : 88;
      return diff + 85 + 15 + 15;
    },
    handleClose(list, index) {
      list.splice(index, 1);
    },
    switchChange() {
      if (this.switchStatus) {
        this.formAddRole.range = [1, 2, 3, 4, 5, 6];
      } else {
        this.formAddRole.range = [];
      }
    },
    setAllRange() {
      this.formAddRole.range = [1, 2, 3, 4, 5, 6];
    },
    handleReset(name) {
      this.formAddRole.range = [];
      this.switchStatus = false;
      this.$refs[name].resetFields();
    },
    addRole() {
      const addrole = this.$lodash.assign({}, this.formAddRole);
      this.roleData.push(addrole);
    }
  }
}
</script>
<style scoped>
.fixed-main {
  min-height: 500px;
  position: relative;
  ;
}

.fixed-left {
  padding-right: 300px;
}

.fixed-right {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}

.role-empty,
.role-list {
  /*min-height: 90px;*/
}

.role-empty {
  color: #999;
  text-align: center;
  padding: 20px;
}

.role-list .ivu-tag {
  text-align: center;
  width: 100%;
  height: 22px;
  line-height: 22px;
  margin: 0 0 5px 0;
}
</style>