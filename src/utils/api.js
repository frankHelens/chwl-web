import request from './request'

// 列表接口
export const getDataList = data => request({
  url: 'getDatas',
  method: 'get',
  params: data
})
// 更新接口
export const updateData = data => request({
  url: 'update',
  method: 'get',
  params: data
})

// 获取城市列表
export const cityData = data => request({
  url: 'citys',
  method: 'get',
  params: data
})

// 更新状态
export const updateStatus = (id, data) => request({
  url: `updateStatus/${id}`,
  method: 'get',
  params: data
})
