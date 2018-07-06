import request from '@/utils/request'

export function productList(data) {   //商品列表
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/product/products",
        method: "post",
        data
    })
}

export function categoryList(data) {   //分类列表
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/product/classify",
        method: "post",
        data
    })
}

export function productCategoryList(data) {   //商品分类列表
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/classify/classify",
        method: "post",
        data
    })
}

export function addAndEditCategories(data) {   //新增和编辑分类
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/classify/addEditParts",
        method: "post",
        data
    })
}

export function attributeInformation() {   //属性信息
    return request({
        url: "/pc_seller/product/properties",
        method: "post",
    })
}

export function addAttributes(data) {   //添加属性
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/product/addProperty",
        method: "post",
        data
    })
}

export function deleteAttribute(data) {   //删除属性
    data = {
        ...data
    }

    return request({
        url: "/pc_seller/product/deleteProperty",
        method: "post",
        data
    })
}

export function dropOff(data) {   //下架/上架
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/product/changeStatus",
        method: "post",
        data
    })
}

export function deletegoods(data) {   //删除
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/product/deleteProduct",
        method: "post",
        data
    })
}

export function deleteCategory(data) {   //删除分类
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/classify/deleteClassify",
        method: "post",
        data
    })
}


export function freightTemplateList() {   //运费模板列表
    return request({
        url: "/pc_seller/freepost/templates",
        method: "post",
    })
}

export function deleteShippingTemplate(data) {   //删除运费模板
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/freepost/deleteTemplate",
        method: "post",
        data
    })
}

export function addShippingTemplate(data) {   //添加运费模板
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/freepost/createNewTemplate",
        method: "post",
        data
    })
}


export function freightTemplateDetails(params) {   //运费模板详情
    return request({
        url: "/pc_seller/freepost/templateItems",
        method: "get",
        params: {
            ...params
        }
    })
}

export function editDhippingTemplate(data) {   //编辑运费模板
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/freepost/editTemplate",
        method: "post",
        data
    })
}

export function mainbrandlist() {   //获取主营品牌列表
    return request({
        url: "/pc_seller/productmodel/majorBrandList",
        method: "post",
    })
}

export function modellist(data) {   //获取车型列表
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/productmodel/getCarModelList",
        method: "post",
        data
    })
}

export function getbrand(data) {   //获取品牌
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/productmodel/carBrandsModelsParameters",
        method: "post",
        data
    })
}


export function getalistofyears(data) {   //获取年款列表
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/productmodel/getYearList",
        method: "post",
        data
    })
}

export function getYearParameterList(data) {   //获取年款对象的版本列表
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/productmodel/getYearParameterList",
        method: "post",
        data
    })
}

export function classificationDetails(data) {   //分类详情
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/classify/classifyDetail",
        method: "post",
        data
    })
}


export function detail(data) {   //商品详情
    return request({
        url: "/pc_seller/product/detail",
        method: "get",
        params:{
            ...data
        }
    })
}


export function imgUploads(imageType, imgBase64) {  //上传图片
    let data = {
        imageType,
        imgBase64
    }
    return request({
        url: "/pc_seller/images/ImgUploads",
        method: "post",
        data
    })
}

export function Confirmthereleaseofgoods(data) {  //添加商品
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/product/addProduct",
        method: "post",
        data
    })
}

export function editProduct(data) {  //编辑商品
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/product/editProduct",
        method: "post",
        data
    })
}

export function changeClassify(data) {  //修改分类
    data = {
        ...data
    }
    return request({
        url: "/pc_seller/product/changeClassify",
        method: "post",
        data
    })
}

export function getMerchantInfo() {  //获取店铺
    return request({
        url: "/pc_seller/discount/getMerchantInfo",
        method: "post",
    })
}

export function provinces() {  //运费模板列表
    return request({
        url: "/pc_seller/freepost/provinces",
        method: "post",
    })
}