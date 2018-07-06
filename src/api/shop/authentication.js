import request from '@/utils/request'

// 核查是否认证
export function judgecertification() {
  return request({
    url: "/pc_seller/store/judgecertification",
    method: "post",
  })
}


// 获取个人实名认证信息
export function userrealname() {
  return request({
    url: "/pc_seller/user/userrealname",
    method: "post",
  })
}


// 个人实名认证

export function setMerchantNotice(program) {
  let data = {
    ...program

  }
  return request({
    url: "/pc_seller/user/userRealNameAuth",

    method: "post",
    data
  })
}
// 企业认证信息获取

export function enterpriseverify() {
  return request({
    url: "/pc_seller/store/enterpriseverify",

    method: "post",
  })
}

// 企业认证
export function shopcertification(program) {
  let data = {
    ...program
  }
  return request({
    url: "/pc_seller/store/shopcertification",

    method: "post",
    data
  })
}

// 图片上传
export function imgUploads(imageType, imgBase64) {
  let data = {
    imageType,
    imgBase64
  }
  return request({
    url: "/pc_seller/images/ImgUploads",

    method: "post",
    data
  })
}
