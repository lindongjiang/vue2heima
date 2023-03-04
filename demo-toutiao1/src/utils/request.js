import axios from 'axios'

const request = axios.create({
  // 请求根路径
  baseURL:' https://applet-base-api-t.itheima.net'
})

export default request
// https://applet-base-api-t.itheima.net/articles    新接口