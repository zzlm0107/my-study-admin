//  src/utils/request.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import useStore from '@/store' // pinia

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`)
    }
    const { user } = useStore()
    if (user.token) {
      config.headers.Authorization = `${localStorage.get('token')}`
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data
    if (code === '00000') {
      return response.data
    } else {
      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      })
      return Promise.reject(new Error(msg || 'Error'))
    }
  },
  (error) => {
    const { code, msg } = error.response.data
    if (code === 'A0230') {  // token 过期
      localStorage.clear() // 清除浏览器全部缓存
      window.location.href = '/' // 跳转登录页
      ElMessageBox.alert('当前页面已失效，请重新登录', '提示', {})
        .then(() => {
        })
        .catch(() => {
        })
    } else {
      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      })
    }
    return Promise.reject(new Error(msg || 'Error'))
  }
)

// 导出 axios 实例
export default service
