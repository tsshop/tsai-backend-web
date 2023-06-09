import request from '@/utils/request'

// 查询会话记录列表
export function listSessionLog(query) {
  return request({
    url: '/ai/SessionLog/list',
    method: 'get',
    params: query
  })
}

// 查询会话记录详细
export function getSessionLog(id) {
  return request({
    url: '/ai/SessionLog/' + id,
    method: 'get'
  })
}

// 新增会话记录
export function addSessionLog(data) {
  return request({
    url: '/ai/SessionLog',
    method: 'post',
    data: data
  })
}

// 修改会话记录
export function updateSessionLog(data) {
  return request({
    url: '/ai/SessionLog',
    method: 'put',
    data: data
  })
}

// 删除会话记录
export function delSessionLog(id) {
  return request({
    url: '/ai/SessionLog/' + id,
    method: 'delete'
  })
}
