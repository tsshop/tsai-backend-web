import request from '@/utils/request'

// 获取检测数据
export const getSense = (query) => {
  return request({
    url: '/show/checkInfo',
    method: 'get',
    params:query
  })
}

// 获取雷达数据
export const getRadar = (query) => {
  return request({
    url: '/show/radarInfo',
    method: 'get',
    params:query
  })
}

// 统计
export const geTtotalData = (query) => {
  return request({
    url: '/show/count',
    method: 'get',
    params:query
  })
}

// Ai小助手报警 和 安全守卫
export const getHealthAlarm = (query) => {
  return request({
    url: '/show/alarm',
    method: 'get',
    params:query
  })
}
