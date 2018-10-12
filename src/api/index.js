import request from '@/utils/request'

export function getOsskeyList(){
  return request({
    url: '/osskey',
    method: 'get' 
  })
}

export function createOsskey(params){
  return request({
    url: '/osskey/create',
    method: 'post',
    data: params
  })
}

