import request from '@/utils/request'

// 查询VIP订单列表
export function listOrderVip(query) {
  return request({
    url: '/ai/OrderVip/list',
    method: 'get',
    params: query
  })
}

// 查询VIP订单详细
export function getOrderVip(id) {
  return request({
    url: '/ai/OrderVip/' + id,
    method: 'get'
  })
}

// 新增VIP订单
export function addOrderVip(data) {
  return request({
    url: '/ai/OrderVip',
    method: 'post',
    data: data
  })
}

// 修改VIP订单
export function updateOrderVip(data) {
  return request({
    url: '/ai/OrderVip',
    method: 'put',
    data: data
  })
}

// 删除VIP订单
export function delOrderVip(id) {
  return request({
    url: '/ai/OrderVip/' + id,
    method: 'delete'
  })
}
