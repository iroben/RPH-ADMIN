<template>
  <div>
    <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="80">
      <Form-item prop="email" label="邮箱">
        <Tag type="dot" color="green">{{userEmail}}</Tag>
      </Form-item>
      <Form-item prop="pass" label="旧密码">
        <Input type="password" v-model="formData.pass" size="large" placeholder="请输入旧密码"></Input>
      </Form-item>
      <Form-item prop="newpass" label="新密码">
        <Input type="password" v-model="formData.newpass" size="large" placeholder="请输入新密码"></Input>
      </Form-item>
      <Form-item prop="passwdCheck" label="确认密码">
        <Input type="password" v-model="formData.passwdCheck" size="large" placeholder="请确认新密码"></Input>
      </Form-item>
      <Form-item>
        <Button :type="changeStaus == 0 ? 'primary' : 'error'" :loading="changeStaus == 1" @click="handleSubmit('formData')" size="large" long>
          {{changeStaus == 1 ? '密码修改中...' : '修改密码'}}
        </Button>
      </Form-item>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!reg.test(value)) {
        callback(new Error('密码由数字, 字母组成(8-16位)'));
      } else if (value == this.formData.pass) {
        callback(new Error('新密码与旧密码相同'));
      } else {
        if (this.formData.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formData.validateField('passwdCheck');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (!reg.test(value)) {
        callback(new Error('密码由数字, 字母组成(8-16位)'));
      } else if (value !== this.formData.newpass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      changeStaus: 0, // 0: 未登录, 1:登录
      formData: {
        email: this.userEmail,
        pass: '',
        newpass: '',
        passwdCheck: ''
      },
      ruleValidate: {
        pass: [{
          required: true,
          message: '请输入旧密码'
        }],
        newpass: [{
          required: true,
          message: '请输入旧密码'
        }, {
          validator: validatePass,
          trigger: 'blur'
        }],
        passwdCheck: [{
          required: true,
          message: '请输入旧密码'
        }, {
          validator: validatePassCheck,
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    userEmail() {
      return this.$store.getters.userEmail;
    },
    isEdit() {
      return this.$route.name == 'portal.news.edit';
    }
  },
  methods: {
    deleteRemember(status) {
      this.$cookie.delete('pass');
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.changeStaus = 1;
          this.$apis.modifyPasswd(this.formData).then(res => {
            this.changeStaus = 0;
            this.deleteRemember();
            this.$Message.success('密码修改成功!');
            this.$refs[name].resetFields();
          }).catch(res => {
            this.changeStaus = 0;
          });
        }
      })
    }
  }
}

</script>
<style>


</style>
