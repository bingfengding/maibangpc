import request from '@/utils/request'

//显示电话
export function alterpassword(){
    return request({
        url: "/pc_seller/setting/alterpassword",
        method: "post",       
    })
}
//修改密码
export function editPassWord(data){
    return request({
        url: "/pc_seller/setting/editPassWord",
        method: "post",
        data:{
            ...data
        }
    })
}
//获取反馈的问题
export function showFeedBackManage(){
    return request({
        url: "/pc_seller/setting/showFeedBackManage",
        method: "post",            
    })
}
//问题反馈
export function feedbackmanage(data){
    return request({
        url: "/pc_seller/setting/feedbackmanage",
        method: "post",
        data:{
            ...data
        }
    })
}
//问题反馈详情
export function feedbackdetail(data){   
    return request({
        url: "/pc_seller/setting/feedbackdetail",
        method: "post",
        data:{
            ...data
        }
    })
}
//验证旧手机号验证码
export function oldphone(data){
    return request({
        url: "/pc_seller/user/oldphone",
        method: "post",
        data:{
            ...data
        }
    })
}
//获取认证信息是否存在
export function getCerData(data){
    return request({
        url: "/pc_seller/coffers/getCerData",
        method: "post",
        data:{
            ...data
        }
    })
}
//获取验证码/seller/login/sendCore
export function getCode(data){
    return request({
        url: "/pc_seller/login/sendCore",
        method: "post",
        data:{
            ...data
        }
    })
}
//设置发票开启关闭
export function invoicee(data){
    return request({
        url: "/pc_seller/invoice/invoice",
        method: "post",
        data:{
            ...data
        }
    })
}
//发票设置状态
export function getInvoiceStatus(data){
    return request({
        url: "/pc_seller/invoice/getInvoiceStatus",
        method: "post",
        data:{
            ...data
        }
    })
}
//获取商城公告
export function storeannouncement(){
    return request({
        url: "/pc_seller/bulletin/storeannouncement",
        method: "post",        
    })
}
//保存商城公告
export function saveStoreannouncement(data){
    return request({
        url: "/pc_seller/bulletin/saveStoreannouncement",
        method: "post",  
        data:{
            ...data
        }      
    })
}
//物流列表
export function logisticsList(){
    return request({
        url: "/pc_seller/Logistics/logisticsList",
        method: "post",             
    })
}
//物流添加
export function addLogistics(data){
    return request({
        url: "/pc_seller/Logistics/addLogistics",
        method: "post",       
        data:{
            ...data
        }      
    })
}
//物流编辑  /seller/Logistics/deleteLogistics
export function editLogistics(data){
    return request({
        url: "/pc_seller/Logistics/editLogistics",
        method: "post",       
        data:{
            ...data
        }      
    })
}
//物流编辑  /
export function deleteLogistics(data){
    return request({
        url: "/pc_seller/Logistics/deleteLogistics",
        method: "post",       
        data:{
            ...data
        }      
    })
}
//获取商品列表
export function getProList(data){
    return request({
        url: "/pc_seller/discount/getProList",
        method: "post",       
        data:{
            ...data
        }      
    })
}
//折扣商品设置详情seller/discount/discountgoods
export function discountgoodsedit(data){
    return request({
        url: "/pc_seller/discount/discountgoodsedit",
        method: "post",       
        data:{
            ...data
        }      
    })
}
//折扣商品列表
export function discountgoods(data){
    return request({
        url: "/pc_seller/discount/discountgoods",
        method: "post",       
        data:{
            ...data
        }      
    })
}
//提交折扣商品
export function submitDiscountDood(data){
    return request({
        url: "/pc_seller/discount/submitDiscountDood",
        method: "post",       
        data:{
            ...data
        }      
    })
}
//获取属性的属性价格信息
export function getSkuDiscount(data){
    return request({
        url: "/pc_seller/discount/getSkuDiscount",
        method: "post",       
        data:{
            ...data
        }      
    })
}
//恢复原价
export function recoverPrice(data){
    return request({
        url: "/pc_seller/discount/recoverPrice",
        method: "post",       
        data:{
            ...data
        }      
    })
}
//预览商品
export function previewProduct(data){
    return request({
        url: "/pc_seller/discount/previewProduct",
        method: "post",       
        data:{
            ...data
        }      
    })
}
//获取商铺信息
export function getMerchantInfo(){
    return request({
        url: "/pc_seller/discount/getMerchantInfo",
        method: "post",                
    })
}
//获取商铺信息
export function ImgUploads(data){
    return request({
        url: "/pc_seller/images/ImgUploads",
        method: "post",   
        data:{
            ...data
        }             
    })
}
//判断是否可以修改
export function judgeUserPermission(){
    return request({
        url: "/pc_seller/discount/judgeUserPermission",
        method: "get",                   
    })
}