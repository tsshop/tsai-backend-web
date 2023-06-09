import request from '@/utils/request'

// 查询模板列表
export function listTemplate(query) {
  return request({
    url: '/ai/Template/list',
    method: 'get',
    params: query
  })
}

// 查询模板详细
export function getTemplate(id) {
  return request({
    url: '/ai/Template/' + id,
    method: 'get'
  })
}

// 新增模板
export function addTemplate(data) {
  return request({
    url: '/ai/Template',
    method: 'post',
    data: data
  })
}

// 修改模板
export function updateTemplate(data) {
  return request({
    url: '/ai/Template',
    method: 'put',
    data: data
  })
}

// 删除模板
export function delTemplate(id) {
  return request({
    url: '/ai/Template/' + id,
    method: 'delete'
  })
}
