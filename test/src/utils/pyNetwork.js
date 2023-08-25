import Vue from 'vue'
import axios from 'axios'
import { pyUrl } from './url'
import store from '../store'

// 创建实例
const service = axios.create({
  baseURL: pyUrl, //
  timeout: 55000
})

// 请求拦截器
service.interceptors.request.use(config => {
 //判断token是否存在
 if (localStorage.getItem('token')) {
  // 在请求头中添加token
    // config.headers.token = localStorage.getItem('token');
    config.headers['token'] = localStorage.getItem('token');
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

  }
 
  return config;
}, error => {
  Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(

  response => {
    debugger;
    console.log(response.data)
    // 抛出401错误，因为token失效，重新刷新页面，清空缓存，跳转到登录界面
    if (response.data.code == 401 || response.data.code === 403) {
      store.dispatch('userInfo/logout')
      .then(() => {
        location.reload();
      });
    }

    return response.data;
  },
  error => {
    const { status } = error.response;
    debugger;
    if (status === 401 || status === 403) {
        store.dispatch('userInfo/logout')
        .then(() => {
          location.reload();
        });
        Vue.prototype.$message.error({
          content: 'token失效，或长时间未操作，请重新登录',
          duration: 5
        })
    } else {
        Vue.prototype.$message.error({
          content: '网络异常，请稍后再试',
          duration: 5
        })
    }

    return Promise.reject(error)
  }
)

export default service;