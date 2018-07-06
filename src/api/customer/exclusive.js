import request from '@/utils/request'

export function getProductList(data) { //获取商品列表
    return request({
        url: "/pc_seller/clientsku/clientsexclusiveprice",
        method: "post",
        data: {
            ...data
        }
    })
}

export function getProSku(data) { //获取商品属性
    return request({
        url: "/pc_seller/clientsku/getProSku",
        method: "post",
        data: {
            ...data
        }
    })
}

export function operateClientsSku(data) { //操作属性价格
    return request({
        url: "/pc_seller/clientsku/operateClientsSku",
        method: "post",
        data: {
            ...data
        }
    })
}