import request from '@/utils/request'

export function getChatList(params) {
    params = {
        ...params
    }
    return request({
        url: "/pc_seller/chat/messageList",
        method: "get",
        params
    })
}

export function getchatRecord(data) { //获取聊天记录
    return request({
        url: "/pc_seller/chat/chatRecord",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function setTop(data) { //置顶
    return request({
        url: "/pc_seller/chat/setTop",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function deleteMessageList(data) { //删除聊天
    return request({
        url: "/pc_seller/chat/deleteMessageList",
        method: 'post',
        data: {
            ...data
        }
    })
}

export function productList(data) { //商品列表
    return request({
        url: "/pc_seller/chat/productList",
        method: 'post',
        data: {
            ...data
        }
    })
}