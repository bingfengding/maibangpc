import request from "@/utils/request"



// 获取订购服务信息
export const getOrderService = () => {
  return request({
    url: '/pc_seller/orderService/getOrderService',

    method: 'post'
  })
}

// 同意协议并付款
export const submitOrderService = (program) => {
  let data = {
    ...program
  }
  return request({
    url: '/pc_seller/orderService/submitOrderService',
    method: 'post',
    data
  })
}

// 判断是否成功付款
export const orderServicePayInfo = (program) => {
  let data = {
    ...program
  }
  return request({
    url: "/pc_seller/orderService/orderServicePayInfo",
    method: "post",
    data

  })
}

//判断是否有订购情况
export const orderServiceDetail = () => {
  return request({
    url: "/pc_seller/orderService/orderServiceDetail",
    method: "post",
  })

}
