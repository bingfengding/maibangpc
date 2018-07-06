import request from "@/utils/request"

//个人中心信息
export const userMessage = () => {

  return request({
    url: '/pc_seller/user/usermessage',
    method: 'post',
    data: {}
  })
}

//个人名片
export const usertwodimensioncode = () => {

  return request({
    url: '/pc_seller/user/usertwodimensioncode',
    method: 'post',
    data: {}
  })
}

//获取手机号
export const usermobilenumber = () => {

  return request({
    url: '/pc_seller/user/usermobilenumber',
    method: 'get',
    param: {}
  })
}

//获取验证码
export const sendCore = (data) => {

  return request({
    url: '/pc_seller/login/sendCore',
    method: 'post',
    data: data
  })
}

//验证旧手机号
export const verifyoldphone = (code) => {

  return request({
    url: '/pc_seller/user/oldphone',
    method: 'post',
    data: {
      code:code
    }
  })
}

//设置新手机号
export const replacephone = (data) => {

  return request({
    url: '/pc_seller/user/replacephone',
    method: 'post',
    data: data
  })
}

//修改用户信息
export const editeUserinfo = (data) => {

  return request({
    url: '/pc_seller/user/editeUserinfo',
    method: 'post',
    data: data
  })
}

//修改用户信息
export const userRealNameAuth = (data) => {

  return request({
    url: '/pc_seller/user/userRealNameAuth',
    method: 'post',
    data: data
  })
}

//修改用户信息
export const userrealname = (data) => {

  return request({
    url: '/pc_seller/user/userrealname',
    method: 'post',
    params:{}
  })
}
