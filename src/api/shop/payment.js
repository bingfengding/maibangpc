import request from '@/utils/request'
import {
  isArray
} from 'util';
// 获取支付方式
export function payWay(program) {

  let data = {
    ...program
  }
  return request({
    url: "/pc_seller/store/payWay",


    method: "post",
    data
  })
}


// 设置支付方式
export function setPayWay(payWays) {
  let data = {
    payWays
  }

  return request({
    url: "/pc_seller/store/setPayWay",


    method: "post",
    data
  })
}
