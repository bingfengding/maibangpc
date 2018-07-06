import request from '@/utils/request'
// 添加退货人地址信息
export function returnGoodsAddress(program) {
  let data = {
    ...program
  }
  return request({
    url: "/pc_seller/MerchantAddress/addEditmerchantAddress",

    method: "post",
    data
  })
}

// 添加退货人地址列表
export function getmerchantAddressList(program) {
  let data = {
    ...program
  }
  return request({
    url: "/pc_seller/MerchantAddress/getmerchantAddressList",
    method: "post",
    data
  })
}

// 删除退货人地址列表
export function deleteMerchantAddress(program) {

  let data = {
    ...program
  }
  return request({
    url: "/pc_seller/MerchantAddress/deleteMerchantAddress",

    method: "post",
    data
  })
}

// 获取退货地址详情
export function merchantAddressDetail(program) {
  let data = {
    ...program
  }
  return request({
    url: "/pc_seller/MerchantAddress/merchantAddressDetail",

    method: "post",
    data
  })
}

// 修改默认地址
export function changeMerchantAddress(program) {
  let data = {
    ...program

  }
  return request({
    url: "/pc_seller/MerchantAddress/changeMerchantAddress",
    method: "post",
    data
  })

}
