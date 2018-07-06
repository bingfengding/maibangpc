import request from '@/utils/request'

// 商家通知设置详情
export function collects() {
  return request({
    url: "/pc_seller/template/collects",

    method: "post",
  })
}

// 获取商品列表
export let searchMerchantProduct = () => {
  return request({
    url: "/pc_seller/search/searchMerchantProduct",
    method: "post",
  })
}

// 保存商品广告
export function saveMerchantAdvertisement(template_id, advertisement, index) {
  let data = {
    template_id,
    advertisement,
    index
  };
  console.log(data);
  return request({
    url: "/pc_seller/advertisement/saveMerchantAdvertisement",
    method: "post",
    data
  })
}

// 获取模板数据
export function detail(template_id) {
  return request({
    url: "/pc_seller/template/detail",

    method: "post",
    params: {
      template_id
    }
  })
}


// 启用模板
export function useTemplate(template_id) {
  return request({
    url: "/pc_seller/template/useTemplate",
    method: "post",
    data: {
      template_id
    }
  })
}
//设置背景
export function setBackgroundPicture(template_id, background_picture) {
  let data = {
    template_id,
    background_picture
  }
  return request({
    url: "/pc_seller/template/setBackgroundPicture",
    method: "post",
    data
  })
}
// 是否小程序审核通过
export function checkMiniProgram() {

  return request({
    url: "/pc_seller/template/checkMiniProgram",
    method: "post",

  })
}
