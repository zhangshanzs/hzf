/**封装axios */
import axios from "axios";
import { Toast } from "antd-mobile";

// 基地址
const BASE_URL = 'https://api-haoke-web.itheima.net';
// 使用自定义配置新建axios实例
const http = axios.create({
  baseURL: BASE_URL,
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 参数2为0时，toast不会消失；隐藏toast需要手动调用hide
  Toast.loading('Loading...', 0)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 隐藏提示
  Toast.hide()
  // 简化返回的数据
  const data = response.data
  return data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export { BASE_URL }
export default http