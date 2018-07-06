import request from "@/utils/request";
// 获取线下门店详情
export const outletsDetail = (outletsId) => {
  let data = {
    outletsId
  };
  return request({
    url: "/pc_seller/StoreOutlets/outletsDetail",
    method: "post",
    data
  });
}

// 获取线下门店列表
export const outletsList = () => {
  return request({
    url: "/pc_seller/StoreOutlets/outletsList",
    method: "post",
  });
}
// 编辑线下网点
export const saveOutlets = (program) => {
  let data = {
    ...program
  };
  console.log(data);
  return request({
    url: "/pc_seller/StoreOutlets/saveOutlets",
    method: "post",
    data
  });
}
// 删除网点

export const deleteOutlets = (outletsId) => {
  let data = {
    outletsId
  };
  return request({
    url: "/pc_seller/StoreOutlets/deleteOutlets",
    method: "post",
    data
  });
}
