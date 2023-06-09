import request from '@/utils/request'

// 查询使用次数订单列表
export function listOrderNumber(query) {
  return request({
    url: '/ai/OrderNumber/list',
    method: 'get',
    params: query
  })
}

// 查询使用次数订单详细
export function getOrderNumber(id) {
  return request({
    url: '/ai/OrderNumber/' + id,
    method: 'get'
  })
}

// 新增使用次数订单
export function addOrderNumber(data) {
  return request({
    url: '/ai/OrderNumber',
    method: 'post',
    data: data
  })
}

// 修改使用次数订单
export function updateOrderNumber(data) {
  return request({
    url: '/ai/OrderNumber',
    method: 'put',
    data: data
  })
}

// 删除使用次数订单
export function delOrderNumber(id) {
  return request({
    url: '/ai/OrderNumber/' + id,
    method: 'delete'
  })
}
