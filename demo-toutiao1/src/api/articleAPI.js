// 文章相关的api，都封装在这个模块
import request from "@/utils/request"

// 向外按需导出一个API 函数
export  const getArticleListAPI = function(_page, _limit) {
  return request.get('/articles', {
    params: {
      // 可以简写为
      _page,
      _limit
      // _page: _page,
      // _limit: _limit
      
    }
  })
}