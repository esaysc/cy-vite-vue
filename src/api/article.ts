import request from '../utils/request' // 引入封装得axios

// 获取新闻列表
export function getArticleList(data: any) {
  return request({
    url: '/article',
    method: 'post',
    data: data,
  })
}
