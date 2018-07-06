import request from '@/utils/request'

//订单列表
export function orderList(params){//page页码，type=>	0未付款/1待发货/2未收货/3所有订单    
    return request({
        url: "/pc_seller/order/ordermanage",
        method: "get",
        params:{
            ...params
        }
    })
}
//退换货列表
export function refundList(params){   
    return request({
        url: "/pc_seller/order/productReturns",
        method: "get",
        params:{
            ...params
        }
    })
}
//订单详情
export function orderDetail(data){//订单id    
    return request({
        url: "/pc_seller/order/orderdetail",
        method: "post",
        data:{
            ...data
        }
    })
}
//退款详情
export function refundDetail(data){//退款订单id    
    return request({
        url: "/pc_seller/order/returnDetail",
        method: "post",
        data:{
            ...data
        }
    })
}
//同意退款
export function agreeToReturn(data){//退款订单id    
    return request({
        url: "/pc_seller/order/agreeToReturn",
        method: "post",
        data:{
            ...data
        }
    })
}
//拒绝退款
export function refuseRefund(data){//退款订单id    
    return request({
        url: "/pc_seller/order/refuseRefund",
        method: "post",
        data:{
            ...data
        }
    })
}
//发货添加物流信息
export function confirmDelivery(data){//1：物流，2：自配,物流id,物流单号,物流名称,订单id
    // const data = {
    //     sendMode,//1：物流，2：自配
    //     wl_id,//物流id
    //     wl_num,//物流单号
    //     wl_name,//物流名称
    //     orderId,//订单id
    // }
    return request({
        url: "/pc_seller/order/confirmDelivery",
        method: "post",
        data:{
            ...data
        }
    })
}
//解码买家自取的二维码
export function decryptCustomerQrCode(data){//1：物流，2：自配,物流id,物流单号,物流名称,订单id
    // const data = {
    //     qrcode,//二维码信息
    // }
    return request({
        url: "/pc_seller/order/decryptCustomerQrCode",
        method: "post",
        data:{
            ...data
        }
    })
}
//待付款自动取消订单
export function orderCancellation(data){
    // const data = {
    //     orderID,//订单id
    // }
    return request({
        url: "/pc_seller/order/orderCancellation",
        method: "post",
        data:{
            ...data
        }
    })
}
//确认收货
export function confirmOrder(data){
    // const data = {
    //     orderId,//订单id
    // }
    return request({
        url: "/pc_seller/order/confirmOrder",
        method: "post",
        data:{
            ...data
        }
    })
}
//获取订单备注列表
export function staffremark(data){
    // const data = {
    //     orderId,//订单id
    // }
    return request({
        url: "/pc_seller/order/staffremark",
        method: "post",
        data:{
            ...data
        }
    })
}
//添加订单备注
export function addOrderRemark(data){
    // const data = {
    //     orderId,//订单id
    //     content,//备注内容
    // }
    return request({
        url: "/pc_seller/order/addOrderRemark",
        method: "post",
        data:{
            ...data
        }
    })
}
//修改运费
export function changeOrderFreightCost(data){
    // const data = {
    //     orderId,//订单id
    //     freightCost,//运费（小于0为不包邮）
    // }
    return request({
        url: "/pc_seller/order/changeOrderFreightCost",
        method: "post",
        data:{
            ...data
        }
    })
}
//商家自配二维码
export function qrOwnDelivery(data){    
    return request({
        url: "/pc_seller/phpcode/qrOwnDelivery",
        method: "get",  
        data:{
            ...data
        }     
    })
}
//修改優惠
export function modifyDiscountPrice(data){    
    return request({
        url: "/pc_seller/order/modifyDiscountPrice",
        method: "post",       
        data: {
            ...data
        }
    })
}
