import axios from "axios";
import router from '../router/router'

// export const baseURL = "http://api.staraid.cn:8088/";
const baseURL = "https:/localhost:8088";

//创建一个axios实例
const service = axios.create({
  baseURL,
});

//请求拦截

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    config.headers['Authorization'] = token
    return config;
  }
  // error => {
  //   return Promise.reject("出错啦");
  // }
);

//响应拦截
/**
 * 根据后端的开发规范进行相应的操作
 * 
 */
service.interceptors.response.use(
  (response) => {
    //根据返回不同的状态码来做后续处理
    // console.log("返回的数据", response);
    if (response.data.code !== '00000') {
        localStorage.clear()
        router.push('/login')
    }
    return response;
  },
  error => {
      if (error.response.data.code === 'A1871') {
          localStorage.clear()
          router.push('/login')
      }
    return Promise.reject(error);
  }
);
export default service;
