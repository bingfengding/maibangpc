import request from "@/utils/request";
// 获取菜单信息
export const menu = () => {
  return request({
    url: "/pc_seller/WechatMenu/menu",
    method: "post"
  });

}

//提交菜单信息

export const submitMenu = (program) => {
  let data = {
    ...program
  }
  return request({
    url: "/pc_seller/WechatMenu/submitMenu",
    method: "post",
    data
  });
}


//获取是否有权限
export const checkPermissions = (requirePermissionParam) => {
  let params = {
    requirePermissionParam
  }
  return request({
    url: "/pc_seller/staff/checkPermissions",
    method: "get",
    params
  });
}
//获取是否是创建人与权限
export const judgePermisson = () => {
  return request({
    url: "/pc_seller/MerchantAddress/judgePermisson",
    method: "post",
  });
}

// 获取公众号绑定情况
export const wechatBindingInfo = (authType) => {
  let data = {
    authType
  }
  return request({
    url: "/pc_seller/store/wechatBindingInfo",
    method: "post",
    data
  });
}
