import request from '@/utils/request'

// 查询反馈列表
export function listFeedback(query) {
  return request({
    url: '/ai/Feedback/list',
    method: 'get',
    params: query
  })
}

// 查询反馈详细
export function getFeedback(id) {
  return request({
    url: '/ai/Feedback/' + id,
    method: 'get'
  })
}

// 新增反馈
export function addFeedback(data) {
  return request({
    url: '/ai/Feedback',
    method: 'post',
    data: data
  })
}

// 修改反馈
export function updateFeedback(data) {
  return request({
    url: '/ai/Feedback',
    method: 'put',
    data: data
  })
}

// 删除反馈
export function delFeedback(id) {
  return request({
    url: '/ai/Feedback/' + id,
    method: 'delete'
  })
}
