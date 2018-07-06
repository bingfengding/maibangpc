import request from "@/utils/request"

//我的金库
export const mycoffers = () =>{

    return request({
      url: '/pc_seller/coffers/mycoffers',
      method: 'get',
      params: {}
    })
}

//提现账户
export const withdrawalAccount = () => {
  return request({
    url: '/pc_seller/coffers/withdrawalAccount',
    method: 'post',
    data: {}
  })
}

// 提交提现记录
export const commitWithdrawals = (data) => {

  return request({
    url: '/pc_seller/coffers/withdrawals',
    method: 'post',
    data: data
  })
}

// 未结算金额列表
export const unbalanceList = (page) => {

  return request({
    url: '/pc_seller/coffers/unbalance',
    method: 'get',
    params: {
      page: page
    }

  })
}

// 店铺平台金库收支记录列表
export const platformWasteBook = (param) => {

  return request({
    url: '/pc_seller/coffers/platformWasteBook',
    method: 'get',
    params: param
  })
}

// 店铺商户收支记录列表
export const mchWasteBook = (param) => {

  return request({
    url: '/pc_seller/coffers/mchWasteBook',
    method: 'get',
    params: param
  })
}

// 收支记录详情
export const wasteBookDetail = (id) => {

  return request({
    url: '/pc_seller/coffers/wasteBookDetail',
    method: 'get',
    params: {
      wasteBookId: id
    }
  })
}


// 提现账户列表
export const accountList = () => {

  return request({
    url: '/pc_seller/coffers/accountlist',
    method: 'get',
    params: {}
  })
}


// 删除提现账户
export const deleteAccount = (bankId) => {

  return request({
    url: '/pc_seller/coffers/delAccount',
    method: 'post',
    data: {
      id: bankId
    }
  })
}

// 获取银行品牌列表
export const BankList = (bankId) => {

  return request({
    url: '/pc_seller/coffers/banks',
    method: 'post',
    data: {
      id: bankId
    }
  })
}

// 添加银行卡账户
export const addbandCard = (data) => {

  return request({
    url: '/pc_seller/coffers/addbandCard',
    method: 'post',
    data: data
  })
}


// 获取店铺名称
export const getShopName = (bankId) => {

  return request({
    url: '/pc_seller/store/getMerchantNameLogo',
    method: 'post',
    data: {
      id: bankId
    }
  })
}

// 添加银行卡账户
export const certificationData = () => {

  return request({
    url: '/pc_seller/coffers/getCerData',
    method: 'get',
    params:{}
  })
}
