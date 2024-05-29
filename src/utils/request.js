import axios from "axios";
import { Message as ElMessage } from 'element-ui';
import router from '../router';
// 创建一个新的axios实例
const request = axios.create({
    baseURL: '/api',
    timeout: 30000,
    headers: {
     'Content-Type': 'application/json; charset=utf-8'
   }
});

// 添加请求拦截器
request.interceptors.request.use((config)=>{
    return config;
}, (err)=>{
    // 请求错误的回调
    return Promise.reject(err);
});

// 添加响应拦截器
request.interceptors.response.use((result) => {
    //判断业务状态码
    if (result.status === 200) {
        return result.data;
    } 
    
    // 异步操作的状态转换为失败
    return Promise.reject(result.data);
    
}, (error) => {
    // HTTP状态码处理，如401
    if (error.response && error.response.status === 401) {
        ElMessage.error('请先登录');
        router.push('/login');
    } else {
        // 处理其他HTTP错误
        const responseMessage = error.response && error.response.data && error.response.data.message;
        ElMessage.error(responseMessage || '服务异常');
    }
    return Promise.reject(error);
});

export default request;
