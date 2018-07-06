import request from "@/utils/request"

//图片上传裁剪
export const uploadImg = (data) => {

  return request({
    url: '/pc_seller/images/ImgUploads',
    method: 'post',
    data: data
  })
}
