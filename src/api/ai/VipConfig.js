import request from '@/utils/request'

// 查询vip套餐列表
export function listVipConfig(query) {
  return request({
    url: '/ai/VipConfig/list',
    method: 'get',
    params: query
  })
}

// 查询vip套餐详细
export function getVipConfig(id) {
  return request({
    url: '/ai/VipConfig/' + id,
    method: 'get'
  })
}

// 新增vip套餐
export function addVipConfig(data) {
  return request({
    url: '/ai/VipConfig',
    method: 'post',
    data: data
  })
}

// 修改vip套餐
export function updateVipConfig(data) {
  return request({
    url: '/ai/VipConfig',
    method: 'put',
    data: data
  })
}

// 删除vip套餐
export function delVipConfig(id) {
  return request({
    url: '/ai/VipConfig/' + id,
    method: 'delete'
  })
}
