// lodash方法
import lodash from 'lodash';

// 公共方法
let methods = {
  /**
   * [filterValue 获取keyArray包含属性的对象]
   * @param  {[Object]} orginData [原对象]
   * @param  {[Array]} keyArray  [所需属性]
   * @return {[Object]}          [新对象]
   */
  filterValue(orginData, keyArray) {
    let nobj = {};
    lodash.forEach(orginData, (value, key) => {
      var isNeed = lodash.indexOf(keyArray, key) > -1;
      if (isNeed) {
        nobj[key] = value;
      }
    });
    return nobj;
  },
};

lodash.assignIn(methods, lodash);

function install(Vue) {
  if (install.installed) {
    return;
  }
  install.installed = true;

  Object.defineProperty(Vue.prototype, '$lodash', {
    get: function get() {
      return methods;
    }
  });

}

var inBrowser = typeof window !== 'undefined';
methods.install = install;

if (inBrowser && window.Vue) {
  window.Vue.use(methods);
}

export default methods;
