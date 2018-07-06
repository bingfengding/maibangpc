import request from '@/utils/request';
// 获取主页数据
export function enterprisehomes() {
  return request({
    url: "/pc_seller/index/enterprisehomes",
    method: "post",
  })
}

// 获取店铺数据
export function getMerchantNameLogo() {
  return request({
    url: "/pc_seller/store/getMerchantNameLogo",
    method: "post",
  })
}
