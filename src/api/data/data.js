import request from "@/utils/request"

//我的金库
export const salestrend = (param) => {
    return request({
        url: '/pc_seller/statistics/salestrend',
        method: 'get',
        params: param
    })
}

export function getSalestatistics(data) { //销售统计首页信息
    return request({
        url: '/pc_seller/statistics/salestatistics',
        method: 'post',
        data: {
            ...data
        }
    })
}

export function getStaffs() { //获取商城全部员工
    return request({
        url: '/pc_seller/statistics/staffs',
        method: 'post',
    })
}