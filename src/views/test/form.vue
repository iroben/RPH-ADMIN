<template>
  <div>
    <Form ref="orgFrom" :model="formData" :rules="ruleValidate" label-position="top">
      <Row :gutter="16">
        <Col span="16">
        <Form-item label="网站" prop="link">
          <Input v-model="formData.link" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="简介" prop="intro">
          <vueEditor :content="formData.intro" :height="230" @change="editorChange"></vueEditor>
          <Input v-model="formData.intro" placeholder="请输入" style="display:none;"></Input>
        </Form-item>
        </Col>
        <Col span="8">
        <Form-item label="管理员邮箱" prop="email">
          <Input v-model="formData.email" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="负责人" prop="chargeman">
          <Input v-model="formData.chargeman" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="负责人联系方式" prop="chargeman_contact">
          <Input v-model="formData.chargeman_contact" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="学生认证方式" prop="identify_mode">
          <Select v-model="formData.identify_mode" placeholder="请选择">
            <Option value="10">学生自认证</Option>
            <Option value="20">机构导入认证</Option>
            <Option value="30">介入认证</Option>
          </Select>
        </Form-item>
        <Form-item label="LOGO" prop="logo">
          <div class="img-long" v-if="formData.logo">
            <img :src="formData.logo" style="width:100px;">
          </div>
          <vue-core-image-upload ref="cropper" crop="server" class="ivu-btn ivu-btn-primary" text="上传图片" :crop="true" @imageuploaded="imageuploaded" :data="uploadData" :max-file-size="5242880" :url="uploadUrl">
          </vue-core-image-upload>
        </Form-item>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col>
        <Form-item>
          <Button type="primary" icon="checkmark-circled" @click="handleSubmit('orgFrom')">提交</Button>
          <Button type="ghost" icon="refresh" @click="handleReset('orgFrom')" style="margin-left: 8px">重置</Button>
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
        uploadData: { // 上传参数配置
          id: this.orgId,
          type: 'org'
        },
        editInfor: null,
        formData: { // 表单参数
          name: '',
          logo: '',
          link: '',
          intro: '',
          email: '',
          chargeman: '',
          chargeman_contact: '',
          identify_mode: ''
        },
        ruleValidate: { // 验证规则
          name: [{
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          }],
          link: [{
            type: 'url',
            message: '请输入合法的URL(需要以 http:// , 或者 https:// 开头)',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          }, {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }],
          chargeman: [{
            required: true,
            message: '请填写负责人',
            trigger: 'blur'
          }],
          chargeman_contact: [{
            required: true,
            message: '请填写联系方式',
            trigger: 'blur'
          }, {
            validator: this.$rules.phone, // 自定义的规则
            trigger: 'blur'
          }],
          identify_mode: [{
            required: true,
            message: '请选择认证方式',
            trigger: 'blur'
          }],
        }
      }
    },
    computed: {
      orgId() {
        return this.$store.getters.orgId;
      },
      uploadUrl() {
        return this.$store.getters.uploadUrl;
      },
      isEdit() {
        return false;
      }
    },
    mounted() {
      if(this.isEdit){
        // 可以在stor里面定义dispatch
        this.$store.dispatch('orgInfo').then(res => {
          this.editInfor = res.data;
          this.$lodash.assign(this.formData, this.editInfor);
        });
        // 或者this.$apis.funcName 直接获取
        // this.$apis.funcName({
        //   id: 'test'
        // }).then(res => {
        //   console.log(res);
        //   this.editInfor = res.data;
        //   this.$lodash.assign(this.formData, this.editInfor);
        // });
      }
    },
    methods: {
      imageuploaded(res) { // 上传成功后回调
        this.formData.logo = res.data.url;
      },
      editorChange(contents) { // 富文本改变回调
        this.formData.intro = contents;
      },
      handleSubmit(name) { // 验证通过后提交
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$apis.orgInfoEdit(this.formData).then(res => {
              this.$Message.success('更新成功!');
            });
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.$lodash.assign(this.formData, this.editInfor);
      }
    }
}
</script>
