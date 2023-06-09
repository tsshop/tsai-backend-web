import request from '@/utils/request'

// 查询短信配置列表
export function listSmsConfig(query) {
  return request({
    url: '/ai/SmsConfig/list',
    method: 'get',
    params: query
  })
}

// 查询短信配置详细
export function getSmsConfig(id) {
  return request({
    url: '/ai/SmsConfig/' + id,
    method: 'get'
  })
}

// 新增短信配置
export function addSmsConfig(data) {
  return request({
    url: '/ai/SmsConfig',
    method: 'post',
    data: data
  })
}

// 修改短信配置
export function updateSmsConfig(data) {
  return request({
    url: '/ai/SmsConfig',
    method: 'put',
    data: data
  })
}

// 删除短信配置
export function delSmsConfig(id) {
  return request({
    url: '/ai/SmsConfig/' + id,
    method: 'delete'
  })
}
