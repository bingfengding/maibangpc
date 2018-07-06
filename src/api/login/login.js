import request from "@/utils/request";

// 验证注册手机号码
export function validateRegPhone(phone) {
  let data = {
    phone
  };
  return request({
    url: "/pc_seller/authentication/registerVerifyCode",

    method: "post",
    data
  });
}
// 提交注册表单申请
export function submitRegForm(account, verifyCode, password) {
  let data = {
    account,
    verifyCode,
    password
  };
  return request({
    url: "/pc_seller/authentication/register",

    method: "post",
    data
  });
}

// 登录
export function login(account, password) {
  let data = {
    account,
    password
  };
  console.log(data);
  return request({
    url: "/pc_seller/authentication/login",

    method: "post",
    data
  });
}
// 核对手机号码
export function truePhone(phone) {
  let data = {
    phone
  };
  return request({
    url: "/pc_seller/authentication/passwordForgotVerifyCode",

    method: "post",
    data
  });
}

// 修改密码提交表单
export function modifyPsw(account, verifyCode, password) {
  let data = {
    account,
    verifyCode,
    password
  };
  return request({
    url: "/pc_seller/authentication/passwordForgot",

    method: "post",
    data
  });
}
// 创建店铺提交表单申请
export function establishShop(program) {
  let data = {
    ...program
  };
  return request({
    url: "/pc_seller/store/store",

    method: "post",
    data
  });
}

// 请求店铺ID信息
export function storeId(token) {
  return request({
    url: "/pc_seller/store/stores",

    method: "get",
    params: {
      token
    }
  });
}

// 获取个人信息
export function usermessage() {
  return request({
    url: "/pc_seller/user/usermessage",

    method: "post"
  });
}


// 修改店铺信息
export function completeMaterial(token, program) {

  let data = {
    token,
    ...program
  }
  return request({
    url: "/pc_seller/store/completeMaterial",

    method: "post",
    data

  })
}

// 获取店铺详情


export function storeDetail(storeId) {
  let data = {
    storeId
  }
  return request({
    url: "/pc_seller/store/detail",

    method: "post",
    data

  })
}

// 经营分类
export function businessClassify() {
  return request({
    url: "/pc_seller/store/businessClassify",

    method: "post"
  })
}

// 经营身份
export function businessIdentifies() {
  return request({
    url: "/pc_seller/store/businessIdentifies",
    method: "post"
  })
}

