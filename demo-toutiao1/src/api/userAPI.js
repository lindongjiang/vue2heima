import request from "@/utils/request";

// 注意下面的接口调用就是掩饰，没有user请求
export const getUserInfoAPI = function() {
 return request.get('/user')
}