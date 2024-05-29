// 通用键名
const INFO_KEY = 'user_info'
// 获取个人信息
export const getInfo = () => {
    const result = localStorage.getItem(INFO_KEY)
    return result ? JSON.parse(result) : {
      token: '',
      userName: ''
    }
  }
  // 获取getToken
export const getToken = () => {
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : {
    token: ''
  }
}
  
  // 设置个人信息
  export const setInfo = (info) => {
    localStorage.setItem(INFO_KEY, JSON.stringify(info))
  }
  
  // 移除个人信息
  export const removeInfo = () => {
    localStorage.removeItem(INFO_KEY)
  }