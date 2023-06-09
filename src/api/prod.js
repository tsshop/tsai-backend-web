import request from '@/utils/request'

// 查询商品列表
export function listProd(query) {
  return request({
    url: '/au/prod/list',
    method: 'get',
    params: query
  })
}

// 查询商品详细
export function getProd(prodId) {
  return request({
    url: '/au/prod/' + prodId,
    method: 'get'
  })
}

// 新增商品
export function addProd(data) {
  return request({
    url: '/au/prod',
    method: 'post',
    data: data
  })
}

// 修改商品
export function updateProd(data) {
  return request({
    url: '/au/prod',
    method: 'put',
    data: data
  })
}

// 删除商品
export function delProd(prodId) {
  return request({
    url: '/au/prod/' + prodId,
    method: 'delete'
  })
}
