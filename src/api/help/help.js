import request from "@/utils/request"


//获取热门问题
export const getHelphome = () => {
  return request({
    url: '/pc_seller/usinghelp/getHelphome',
    method: 'post',
    params: {}
  })
}

//获取全部问题分类
export const getAllProblem = () => {
  return request({
    url: '/pc_seller/usinghelp/getAllproblem',
    method: 'post',
    params: {}
  })
}

//获取分类下问题列表
export const getProblemlist = (id) => {

  return request({
    url: '/pc_seller/usinghelp/getProblemlist',
    method: 'post',
    data: {
        id:id
    }
  })
}

//获取问题详情
export const getSolutionDetail = (id) => {

  return request({
    url: '/pc_seller/usinghelp/getSolution',
    method: 'post',
    data: {
      id: id
    }
  })
}

//获取客服信息
export const customerServiceName = () => {

  return request({
    url: '/pc_seller/message/customerServiceName',
    method: 'get',
    param:{}
  })
}

//获取搜索问题
export const searchQuestion = (val) => {

  return request({
    url: '/pc_seller/usinghelp/searchQuestion',
    method: 'post',
    data: {
      search_key:val
    }
  })
}

//解决未解决问题
export const getSolveSum = (data) => {

  return request({
    url: '/pc_seller/usinghelp/getSolveSum',
    method: 'post',
    data: data
  })
}
