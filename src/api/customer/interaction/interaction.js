import request from '@/utils/request'

export function getinteractionMessage(data) {
    return request({
        url: "/pc_seller/message/getinteractionMessage",
        method: 'post',
        data: {
            ...data
        }
    })
}