import request from '@/utils/request'

// 查询群二维码列表
export function listGroupQrCode(query) {
  return request({
    url: '/ai/GroupQrCode/list',
    method: 'get',
    params: query
  })
}

// 查询群二维码详细
export function getGroupQrCode(id) {
  return request({
    url: '/ai/GroupQrCode/' + id,
    method: 'get'
  })
}

// 新增群二维码
export function addGroupQrCode(data) {
  return request({
    url: '/ai/GroupQrCode',
    method: 'post',
    data: data
  })
}

// 修改群二维码
export function updateGroupQrCode(data) {
  return request({
    url: '/ai/GroupQrCode',
    method: 'put',
    data: data
  })
}

// 删除群二维码
export function delGroupQrCode(id) {
  return request({
    url: '/ai/GroupQrCode/' + id,
    method: 'delete'
  })
}
