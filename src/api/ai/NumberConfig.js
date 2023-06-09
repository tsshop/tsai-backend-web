import request from '@/utils/request'

// 查询使用次数套餐列表
export function listNumberConfig(query) {
  return request({
    url: '/ai/NumberConfig/list',
    method: 'get',
    params: query
  })
}

// 查询使用次数套餐详细
export function getNumberConfig(id) {
  return request({
    url: '/ai/NumberConfig/' + id,
    method: 'get'
  })
}

// 新增使用次数套餐
export function addNumberConfig(data) {
  return request({
    url: '/ai/NumberConfig',
    method: 'post',
    data: data
  })
}

// 修改使用次数套餐
export function updateNumberConfig(data) {
  return request({
    url: '/ai/NumberConfig',
    method: 'put',
    data: data
  })
}

// 删除使用次数套餐
export function delNumberConfig(id) {
  return request({
    url: '/ai/NumberConfig/' + id,
    method: 'delete'
  })
}
