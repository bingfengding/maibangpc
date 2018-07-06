import request from "@/utils/request";
// 获取主页数据
export function enterprisehomes() {
  return request({
    url: "/pc_seller/index/enterprisehomes",

    method: "post"
  });
}

// 店铺概况里的趋势统计
export function storeStatistics(year, month) {
  let data = {
    year,
    month
  };
  return request({
    url: "/pc_seller/store/storeStatistics",

    method: "post",
    data
  });
}

// 获取店铺信息
export function getMerchantInfo() {
  return request({
    url: "/pc_seller/discount/getMerchantInfo",

    method: "post"
  });
}

// 获取店铺信息
export function storeHome() {
  return request({
    url: "/pc_seller/store/storeHome",

    method: "post"
  });
}
