<template>
  <div>
    <div class="tableFuncs">
      <Button-group shape="circle">
        <Button type="ghost" icon="ios-undo" @click="goBack">
          <span>返回</span>
        </Button>
      </Button-group>
    </div>
    <Form ref="formData" :model="formData" :rules="ruleValidate" label-position="left" :label-width="80">
      <Row :gutter="16">
        <Col span="16">
        <Form-item v-if="!isEdit" label="Email" prop="email">
          <Input v-model="formData.email" placeholder="请输入"></Input>
        </Form-item>
        <Form-item v-if="isEdit && adminUser" label="管理员">
          <Alert type="info" style="float:left;">
            <Icon type="person" style="margin-right: 15px; color: #2d8cf0;"></Icon>{{adminUser}}</Alert>
          <Alert v-if="isSuper" type="warning" show-icon style="float:left; clear: both; width: 300px;">当前为超级管理员用户, 拥有所有权限.</Alert>
        </Form-item>
        <Form-item label="权限配置" prop="title">
          <Tree class="adminTree" :data="formData.tree" ref="tree" show-checkbox></Tree>
        </Form-item>
        <Form-item label="显示/隐藏" prop="status">
          <i-switch size="large" v-model="toggleStatus" @on-change="changeStatus">
            <span slot="open">激活</span>
            <span slot="close">冻结</span>
          </i-switch>
        </Form-item>
        <Form-item>
          <Button :type="isEdit ? 'error' : 'primary'" icon="checkmark-circled" @click="handleSubmit('formData')">提交</Button>
          <Button type="ghost" icon="refresh" @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
        </Form-item>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      adminUser: '',
      editInfor: null,
      toggleStatus: true,
      isSuper: false,
      formData: {
        tree: [],
        email: '',
      },
      ruleValidate: {
        email: [{
          required: true,
          message: '请输入Email'
        }, {
          type: 'email',
          message: '请输入合法的Email'
        }]
      },
      treeData: []
    }
  },
  computed: {
    isEdit() {
      return this.$route.name == 'system.admin.edit';
    },
    adminId() {
      return this.$route.params.adminId;
    }
  },
  mounted() {
    this.$apis.adminInfo({
      id: this.adminId || 0
    }).then(res => {
      let result = res.data;

      if (this.isEdit) {
        this.adminUser = result.user_info.name + '(' + result.user_info.email + ')';
        this.isSuper = result.user_info.super == 1; // 是否为超级管理员
        this.toggleStatus = result.user_info.status == 1;
      } else {
        this.isSuper = false;
        this.toggleStatus = true;
      }

      this.$lodash.forEach(result.tree, (parent) => {
        parent.expand = true;
        if (this.isSuper) {
          parent.disableCheckbox = true;
          this.$lodash.forEach(parent.children, (item) => {
            item.disableCheckbox = true;
          });
        }
      });

      this.editInfor = result;
      this.$lodash.assignIn(this.formData, this.editInfor);
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    imageuploaded(res) {
      this.formData.new_avatar = res.data.url;
    },
    changeStatus() {
      this.formData.status = this.toggleStatus ? 10 : 20;
    },
    editorChange(contents) {
      this.formData.contents = contents;
    },
    handleSubmit(name) {
      let ids = [];
      let selectedTree = this.$refs['tree'].getCheckedNodes();
      this.$lodash.forEach(selectedTree, (item) => {
        const isInArray = this.$lodash.indexOf(ids, item.parent) > -1;
        ids.push(item.id);
      });
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$apis.adminEdit({
            id: this.adminId || 0,
            email: this.formData.email,
            status: this.toggleStatus ? 1 : 0,
            menus: ids.join(',')
          }).then(res => {
            this.$Message.success('保存成功!');
            if (this.isEdit) {
              this.goBack();
            } else {
              this.$router.push({
                name: 'system.admin'
              });
            }
          });
        }
      })
    },
    handleReset(name) {
      this.$router.go(0)
    }
  }
}

</script>
<style>
.adminTree .ivu-tree-children li {
  padding: 10px 20px;
  border: 1px solid #dddee1;
  color: #fff;
  margin-bottom: 10px;
  background: #f8f8f9;
}

.adminTree .ivu-tree-children li span {
  font-size: 16px;
  font-weight: 700;
  color: #2d8cf0;
}

.adminTree .ivu-tree-children .ivu-tree-children {
  border: none;
  margin: 0;
  padding-left: 0;
}

.adminTree .ivu-tree-children .ivu-tree-children li {
  padding: 5px 20px;
  border: none;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}

.adminTree .ivu-tree-children .ivu-tree-children li span {
  font-size: 14px;
  font-weight: normal;
  color: #495060;
}

.adminTree .ivu-tree-arrow {
  display: none;
  margin: 0 10px;
}

.adminTree .ivu-tree-title-selected,
.adminTree .ivu-tree-title:hover,
.adminTree .ivu-tree-title-selected:hover {
  background: none;
}

</style>
