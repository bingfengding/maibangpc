import axios from 'axios'
import qs from 'qs'

import {
  Message
} from 'element-ui'
import store from '@/store'
// console.log(process.env.BASE_API + "");

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // request timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
})
service.interceptors.request.use(
  config => {
    // console.log('%c 发起请求 =====>', 'color: #4CAF50; font-weight: bold', config)
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);
// request interceptor
service.interceptors.request.use(config => {
  if (config.method === "post") {
    // 序列化
    config.data = qs.stringify(config.data);
    // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
  }


  // Do something before request is sent
  //   if (store.getters.token) {
  //     config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  //   }
  return config
}, error => {
  console.log('err' + error) // for debug
  Message({
    //  饿了么的消息弹窗组件,类似toast
    showClose: true,
    message: error,
    type: "error.message"
  });
  console.log(error);
  return Promise.reject(error)
})

// respone interceptor
service.interceptors.request.use(config => {
  const loginToken = localStorage.getItem('currentUser_token')
  const storeId = localStorage.getItem('storeId')
  if (loginToken) {
    config.headers['MPKToken'] = loginToken
  }
  if (config.method === 'post') {
    config.data = {
      loginToken: loginToken,
      storeId: storeId,
      ...config.data
    }
  } else if (config.method === 'get') {
    config.params = {
      loginToken: loginToken,
      storeId: storeId,
      ...config.params
    }
  }
  // console.log(config);
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
//http request 拦截器

// respone interceptor
service.interceptors.response.use(
  response => response,
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })




export default service
