import request from '@/utils/request'

export function getCustomer(data) { //客户/员工客户列表
    return request({
        url: "/pc_seller/customer/clientscontacts",
        method: "post",
        data: {
            ...data
        }
    })
}

export function productList(data) { //商品列表
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/product/products",
        method: "post",
        data
    })
}

export function categoryList() { //分类列表
    return request({
        url: "/pc_seller/product/classify",
        method: "post",
    })
}

export function productCategoryList() { //商品分类列表
    return request({
        url: "/pc_seller/classify/classify",
        method: "post",
    })
}

export function addAndEditCategories(data) { //新增和编辑分类
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/product/classify",
        method: "post",
        data
    })
}

export function attributeInformation() { //属性信息
    return request({
        url: "/pc_seller/product/properties",
        method: "post",
    })
}
export function searchCustomer(data) { //搜索
    return request({
        url: "/pc_seller/customer/searchClientsContacts",
        method: "post",
        data: {
            ...data
        }
    })
}

export function clientsgroup(data) { //未合作与已合作客户列表
    return request({
        url: "/pc_seller/customer/clientsgroup",
        method: "post",
        data: {
            ...data
        }
    })
}

export function searchClientsGroup(data) { //搜索未合作与已合作列表
    return request({
        url: "/pc_seller/customer/searchClientsGroup",
        method: "post",
        data: {
            ...data
        }
    })
}

export function staffList(data) { //业务员列表
    return request({
        url: "/pc_seller/customer/staffList",
        method: "post",
        data: {
            ...data
        }
    })
}

export function updateCustomer(data) { //更改客户姓名
    return request({
        url: "/pc_seller/customer/editeName",
        method: "post",
        data: {
            ...data
        }
    })
}

export function changeStaff(data) { //更改客户业务员
    return request({
        url: "/pc_seller/customer/changeStaff",
        method: "post",
        data: {
            ...data
        }
    })
}

export function batchChangeStaff(data) { //批量更改客户业务员
    return request({
        url: "/pc_seller/customer/batchChangeStaff",
        method: "post",
        data: {
            ...data
        }
    })
}

export function checkClientSku(data) { //检查是否符合设置客户专属价
    return request({
        url: "/pc_seller/clientsku/checkClientSku",
        method: "post",
        data: {
            ...data
        }
    })
}
export function checkSatffPermission(data) { //检查是否符合设修改客户信息
    return request({
        url: "/pc_seller/Clientsku/checkSatffPermission",
        method: "post",
        data: {
            ...data
        }
    })
}
export function getConsumptiont(data) { //客户消费记录
    return request({
        url: "/pc_seller/customer/getConsumerList",
        method: "post",
        data: {
            ...data
        }
    })
}




// export function productList(data) { //商品列表
//   data = {
//     ...data
//   }
//   return request({
//     url: "/pc_seller/product/products",
//     method: "post",
//     data
//   })
// }

// export function categoryList() { //分类列表
//   return request({
//     url: "/pc_seller/product/classify",
//     method: "post",
//   })
// }

// export function productCategoryList() { //商品分类列表
//   return request({
//     url: "/pc_seller/classify/classify",
//     method: "post",
//   })
// }

// export function addAndEditCategories(data) { //新增和编辑分类
//   data = {
//     ...data
//   }
//   return request({
//     url: "/pc_seller/product/classify",
//     method: "post",
//     data
//   })
// }

// export function attributeInformation() { //属性信息
//   return request({
//     url: "/pc_seller/product/properties",
//     method: "post",
//   })
// }>>>>>>> .r168