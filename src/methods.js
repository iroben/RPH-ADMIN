// lodash方法
import lodash from 'lodash';

// 公共方法
let methods = {
  testData(formtExamp, size) {
    const result = [];
    let count = size || 15;
    for (let i = 0; i < count; i++) {
      result.push(formtExamp);
    }
    return result;
  },
  /**
   * [delTableActive 删除表格activeParams数据]
   * @param  {[Object]} contxt [this对象]
   * @param  {[String]} tipMsg [删除成功后的提示信息]
   * contxt必须项
   * 1. activeParams, 2. tableData 表格数据, 3. page 分页对象, 4. pageSize // 每页显示条数
   * contxt非必须
   * 1. modalLoading, 2. modelDel
   */
  delTableActive(contxt, tipMsg) {
    contxt.tableData.splice(contxt.activeParams.index, 1);
    --contxt.page.total;
    if (contxt.tableData.length + 1 == contxt.pageSize) {
      contxt.getData(contxt.page.cur);
    } else if (contxt.tableData <= 0 && contxt.page.cur != 1) {
      contxt.getData(contxt.page.cur - 1);
    }
    contxt.modalLoading = false;
    contxt.modelDel = false;
    contxt.$Message.success(tipMsg || '删除成功');
  },
  /**
   * [delTableGroup 批量删除表格selectedGroup]
   * @param  {[Object]} contxt [this对象]
   * @param  {[String]} tipMsg [删除成功后的提示信息]
   * contxt必须
   * 1. selectedGroup, 2. tableData 表格数据, 3. page 分页对象, 4. pageSize // 每页显示条数
   * contxt非必须
   * 1. modalLoading, 2. modelDel
   */
  delTableGroup(contxt, tipMsg) {
    this.setTableGroup(contxt, (item, index) => {
      contxt.tableData.splice(index, 1);
      --contxt.page.total;
    }, tipMsg);
    if (contxt.tableData.length + 1 == contxt.pageSize) {
      contxt.getData(contxt.page.cur);
    } else if (contxt.tableData <= 0 && contxt.page.cur != 1) {
      contxt.getData(contxt.page.cur - 1);
    } else {
      contxt.getData(1);
    }
  },
  /**
   * [setTableGroup 批量操作表格selectedGroup]
   * @param  {[Object]} contxt [this对象]
   * @param  {[String]} tipMsg [成功后的提示]
   * contxt必须项
   * 1. selectedGroup, 2. tableData 表格数据, 3.callback 回调
   */
  setTableGroup(contxt, callback, tipMsg) {
    lodash.forEach(contxt.selectedGroup, (curid) => {
      lodash.forEach(contxt.tableData, (item, index) => {
        if (item && item.id == curid) {
          callback(item, index);
        }
      });
    });
    contxt.$Message.success(tipMsg || '操作成功');
  },
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
  // 计算2日期之间相差的周数或天数
  getDateDiff(date, date2, day) {
    // 参数不能为空
    if (!date || !date2) return "";

    // 格式化传入日期获得毫秒数
    var start = new Date(date.replace(new RegExp("-", "gm"), "/"));
    var end = new Date(date2.replace(new RegExp("-", "gm"), "/"));
    var diff = end > start ? Math.ceil((end - start) / (1000 * 60 * 60 * 24)) : 0;

    // 取正数
    if (diff < 0) {
      diff *= -1;
    };

    if (day == 'day') {
      // 存在第三个参数 'day' 则返回当前的天数
      return diff;
    } else {
      // 否则返回当前周数
      var w = Math.ceil(diff / 7);
      return w;
    };
  }
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