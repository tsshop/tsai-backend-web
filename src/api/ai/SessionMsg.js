import request from '@/utils/request'

// 查询会话聊天记录列表
export function listSessionMsg(query) {
  return request({
    url: '/ai/SessionMsg/list',
    method: 'get',
    params: query
  })
}

// 查询会话聊天记录详细
export function getSessionMsg(id) {
  return request({
    url: '/ai/SessionMsg/' + id,
    method: 'get'
  })
}

// 新增会话聊天记录
export function addSessionMsg(data) {
  return request({
    url: '/ai/SessionMsg',
    method: 'post',
    data: data
  })
}

// 修改会话聊天记录
export function updateSessionMsg(data) {
  return request({
    url: '/ai/SessionMsg',
    method: 'put',
    data: data
  })
}

// 删除会话聊天记录
export function delSessionMsg(id) {
  return request({
    url: '/ai/SessionMsg/' + id,
    method: 'delete'
  })
}
