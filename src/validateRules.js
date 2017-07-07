// 自定义验证规则
const rules = {
  phone(rule, value, callback) {
    const isPhone = /^(13[0-9]|15[0-9]|18[0-9])\d{8}$/.test(value); // 验证手机号码
    if (value && !isPhone) {
      callback(new Error('电话号码格式不正确!'));
    } else {
      callback();
    }
  },
  validatePass(rule, value, callback) {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    if (value === '') {
      callback(new Error('请输入密码'));
    } else if (!reg.test(value)) {
      callback(new Error('密码由数字, 字母组成(8-16位)'));
    } else {
      callback();
    }
  }
};

function install(Vue) {
  if (install.installed) {
    return;
  }
  install.installed = true;

  Object.defineProperty(Vue.prototype, '$rules', {
    get: function get() {
      return rules;
    }
  });

}

var inBrowser = typeof window !== 'undefined';
rules.install = install;

if (inBrowser && window.Vue) {
  window.Vue.use(rules);
}

export default rules;
