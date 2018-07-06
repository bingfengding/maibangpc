import request from '@/utils/request'
// 商家通知设置详情
export function merchantNoticSetting(program) {
  let data = {
    ...program
  }
  return request({
    url: "/pc_seller/staff/staffNoticSetting",

    method: "post",
    data
  })
}


// 设置店铺通知
export function setMerchantNotice(noticeType, noticeStatus) {
  let data = {
    noticeType,
    noticeStatus
  }
  return request({
    url: "/pc_seller/staff/setStaffNoticeSetting",

    method: "post",
    data
  })
}
