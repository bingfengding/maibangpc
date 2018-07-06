import request from '@/utils/request'

export function getOrderList(data) {
    return request({
        url: "/pc_seller/message/ordermessageinform",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function changeOrderMsgStatus(data) {
    return request({
        url: "/pc_seller/message/changeOrderMsgStatus",
        method: 'post',
        data: {
            ...data
        }
    })
}