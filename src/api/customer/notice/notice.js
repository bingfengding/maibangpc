import request from '@/utils/request'

export function getNoticeList(data) {
    return request({
        url: "/pc_seller/message/informmessage",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function changeInforMsgStatus(data) {
    return request({
        url: "/pc_seller/message/changeInforMsgStatus",
        method: 'post',
        data: {
            ...data
        }
    })
}