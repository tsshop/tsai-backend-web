import request from '@/utils/request'

// 查询模板类型列表
export function listTemplateType(query) {
  return request({
    url: '/ai/TemplateType/list',
    method: 'get',
    params: query
  })
}

// 查询模板类型详细
export function getTemplateType(id) {
  return request({
    url: '/ai/TemplateType/' + id,
    method: 'get'
  })
}

// 新增模板类型
export function addTemplateType(data) {
  return request({
    url: '/ai/TemplateType',
    method: 'post',
    data: data
  })
}

// 修改模板类型
export function updateTemplateType(data) {
  return request({
    url: '/ai/TemplateType',
    method: 'put',
    data: data
  })
}

// 删除模板类型
export function delTemplateType(id) {
  return request({
    url: '/ai/TemplateType/' + id,
    method: 'delete'
  })
}
