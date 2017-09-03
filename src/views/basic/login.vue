<template>
  <div>
    <Modal class-name="vertical-center-modal" class="login-modal" v-model="showLogin" width="360" :closable="false" :mask-closable="false">
      <p slot="header" class="login-header">
        <span>优课在线管理系统</span>
      </p>
      <div style="text-align:center">
        <Form ref="formData" :model="formData" :rules="ruleValidate">
          <Form-item prop="account">
            <Input v-model="formData.account" size="large" placeholder="请输入用户名" @on-enter="handleSubmit('formData')"></Input>
          </Form-item>
          <Form-item prop="password">
            <Input type="password" v-model="formData.password" size="large" placeholder="请输入密码" @on-enter="handleSubmit('formData')"></Input>
          </Form-item>
          <Form-item>
            <div class="login-remember">
              记住密码:
              <i-switch v-model="remember" size="small"></i-switch>
            </div>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button html-type="submit" :type="loginStaus == 0 ? 'primary' : 'error'" :loading="loginStaus == 1" @click="handleSubmit('formData')" size="large" icon="log-in" long>
          {{loginStaus == 1 ? '登录中...' : '登录'}}
        </Button>
      </div>
    </Modal>
    <div class="ivu-login-mask"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      remember: true,
      showLogin: true,
      loginStaus: 0, // 0: 未登录, 1:登录
      orgLoading: false, // 机构搜索中
      orgList: [], // 机构列表
      formData: {
        org_id: '',
        account: '',
        password: ''
      },
      ruleValidate: {
        org_id: [{
          required: true,
          message: '请选择您的机构'
        }],
        account: [{
          required: true,
          message: '请输入用户名'
        }],
        password: [{
          required: true,
          message: '请输入密码'
        }]
      }
    }
  },
  mounted() {
    this.setDefault();
  },
  methods: {
    setDefault() {
      this.formData.account = this.$cookie.get('acc') || '';
      this.formData.password = this.$cookie.get('pass') || '';
    },
    setRemember(status) {
      if (status) {
        this.$cookie.set('acc', this.formData.account, {
          expires: '1M'
        });
        this.$cookie.set('pass', this.formData.password, {
          expires: '1M'
        });
      } else {
        this.$cookie.delete('acc');
        this.$cookie.delete('pass');
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.formData.status = this.toggleStatus ? 10 : 20;
          this.$apis.login(this.formData).then(res => {

            // 获取MENUS
            this.$store.dispatch('menus');

            // 登录完成设置用户email cookie
            this.$cookie.set('uemail', this.formData.account, {
              expires: '1M'
            });
            this.$store.commit('userEmail', this.formData.account);

            // 如果为记住密码, 则记住账号 cookie
            this.setRemember(this.remember);

            // 跳转到首页
            this.$router.push({
              name: 'home'
            });
            this.$Message.success('登录成功!');
          });
        }
      })
    }
  }
}

</script>
<style>
.login-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-modal .ivu-modal{
  margin: 0;
}

.login-modal .login-header {
  color: #f60;
  text-align: center;
  font-size: 18px;
}

.login-modal .ivu-modal-body {
  padding-bottom: 0;
}

.login-modal .ivu-modal-content {
  z-index: 1001;
}

.login-modal .login-remember {
  text-align: left;
}

.ivu-login-mask {
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 1000;
  width: 100%;
  background-color: #141a48;
  background-image: url(../../images/login-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}


/*.ivu-login-mask {
  animation: mysecond ease-in-out 2.5s;
  -moz-animation: mysecond ease-in-out 2.5s;
  -webkit-animation: mysecond ease-in-out 2.5s;
  -o-animation: mysecond ease-in-out 2.5s;
}*/

@keyframes mysecond {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@-moz-keyframes mysecond {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@-webkit-keyframes mysecond {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@-o-keyframes mysecond {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.login-modal .ivu-modal-mask {
  display: none;
}

</style>
