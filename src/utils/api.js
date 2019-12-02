import request from './request'

export const getDataList = data => request({
  url: 'getDatas',
  method: 'get',
  params: data
})
