import axios from 'axios';
import qs from 'qs';
import apiurl from './apiurl';
import iView from 'iview';
import env from '../config/env';

// 配置开发与线上URI
const ajaxUrl = env === 'development' ? 'http://api.uooc.online:8088' : env === 'production' ? 'https://www.url.com' : 'https://debug.url.com';

// 加载中组件
let LoadTip = {
    msg: null,
    open() {
        // iView.LoadingBar.start();
        this.msg = iView.Message.loading({
            content: '正在加载中...',
            duration: 0
        });
    },
    close() {
        // iView.LoadingBar.finish();
        setTimeout(this.msg, 500);
    }
};

let apis = {};

// 配置axios实例
let ainstance = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: true, // default
    // `onDownloadProgress` allows handling of progress events for downloads
    transformRequest: function(data) {
        LoadTip.open();
        return data;
    },
    validateStatus: function(status) {
        if (status >= 200 && status < 300) {
            return status >= 200 && status < 300; // default
        } else {
            iView.Message.error('请求错误（' + status + ")，请尝试刷新网页。");
        }
    },

    // headers: {'X-Requested-With': 'XMLHttpRequest'},
    // `transformRequest` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // The last function in the array must return a string, an ArrayBuffer, FormData, or a Stream
    // transformRequest: [function (data) {
    //   // Do whatever you want to transform the data
    //
    //   return data;
    // }],
    //
    // // `transformResponse` allows changes to the response data to be made before
    // // it is passed to then/catch
    // transformResponse: [function (data) {
    //   // Do whatever you want to transform the data
    //
    //   return data;
    // }]
});

// 遍历api.url配置实例
for (let i in apiurl) {
    let parmas = apiurl[i].split(','),
        url = parmas[0],
        method = parmas[1] ? parmas[1].toUpperCase() : 'GET',
        curInstance;

    apis[i] = (parmas) => {
        parmas = parmas || {};

        if (method === 'POST') {
            curInstance = ainstance.post(url, qs.stringify(parmas));
        } else if (method === 'GET') {
            curInstance = ainstance.get(url, {
                params: parmas
            });
        }

        return curInstance.then((response) => {
            LoadTip.close();
            if (typeof response.data !== 'object') {
                return Promise.reject({
                    code: 'DATAERROR',
                    msg: '数据请求Error'
                });
            }

            // 如果返回code不为1, 则请求异常 [未登录, 没有权限]
            if (response.data.code != 1) {
                return Promise.reject(response.data);
            }

            return response.data;
        }).catch((result) => {
            LoadTip.close();
            if (result.code == 401 && !parmas.noLogin) { // 未登录
                window.loginFromUrl = location.href;
                location.href = '/#/login';
            } else if (result.code == 450) { // 未验证
                // console.log('未认证');
            } else if (result.code == 'ECONNABORTED') {
                iView.Message.error('请求超时，请检查网络链接并尝试刷新网页。');
                return;
            } else if (result.code == 'DATAERROR') {
                if (parmas.noErrorMsg) {
                    return;
                }
                let emsg = result.msg;
                iView.Message.error(emsg ? emsg : '数据请求error');
            } else {
                if (parmas.noErrorMsg) {
                    return;
                }
                iView.Message.error(result.msg || '数据请求error');
            }
            return Promise.reject(result);
        });
    };
}

function install(Vue) {
    if (install.installed) {
        return;
    }
    install.installed = true;

    Object.defineProperty(Vue.prototype, '$apis', {
        get: function get() {
            return apis;
        }
    });

}

var inBrowser = typeof window !== 'undefined';
apis.install = install;

if (inBrowser && window.Vue) {
    window.Vue.use(apis);
}

export default apis;
