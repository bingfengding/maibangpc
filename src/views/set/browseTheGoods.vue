<template>
    <el-container class="productpreview">
        <el-main>
            <div class="out-box">
                <div class="box">
                    <div class="header-top">
                        <span class="curan" @click="back">返回</span>
                        <span>商品详情</span>
                        <span>...</span>
                    </div>

                    <div class="celimg">
                        <div class="block">
                            <el-carousel height="150px" v-if="data.pro_msg">
                            <el-carousel-item v-for="item in data.pro_msg.productPictures" :key="item">
                                <img width="100%" height="100%" :src="item" alt="">
                            </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <div class="information">
                        <p >{{data.pro_msg.product_name}}</p>
                        <p>
                            <span class="red" v-if="browse.price">￥{{browse.price}}</span>
                            <span class="red" v-else-if="discount_price">￥{{discount_price}}</span>
                            <span style="background-color:#ffac28;color:#FFF;font-size: 12px;padding:2px 3px;border-radius:4px;margin-left:10px;margin-right: 10px;" v-if="discount_price||browse.price">折扣价</span>
                            <del style="color:#999;font-size:14px" v-if="discount_price||browse.price">￥{{product_price}}</del>    
                            <span style="color:#f00;font-size:14px" v-else>￥{{product_price}}</span>                            
                        </p>
                        <p><span class="right">库存：{{data.product_inventory}}<span></span></span><span>品牌编码:{{data.product_sku_num}}<span ></span></span></p>
                    </div>

                    <div class="commodityNum">
                        <div class="sellNum">
                            选择数量：<span v-if="browse.sku_name">{{browse.sku_name}}</span><span v-else-if="data.sku_name">{{data.sku_name}}</span>  数量：1
                            <img src="@/assets/goods/right.png" style="float: right;padding-top:12px;margin-right: 10px">
                        </div>
                        <div class="extent" v-if="extended_properties.length">
                            <p style="float:left">{{name}}：</p>    
                            <p style="float:left" v-if="applyCat">
                                <span v-for ="(items,index) in applyCat" :key="index" class="applay">{{items.content}}、</span>                                
                            </p>  
                            <p v-if="val" style="float:left"><span>{{val}}</span></p>                          
                        </div>
                    </div>
                    <div class="company">
                        <div class="company-x">
                            <img :src="shopInfo.merchant_logo" alt="">
                            <span class="fl">{{shopInfo.shop_name}}</span>
                            <img src="@/assets/goods/right.png" style="width:10px;height: 20px;float: right;padding-top:2px;margin-right: 6px">
                            <span style="float: right;margin-right: 22px">进店逛逛</span>                            
                        </div>
                        <div class="enterprise-Certification">
                            <span> <img src="@/assets/goods/yesyuan.png" alt="" width="15" height="15">企业认证</span>
                        </div>
                    </div>
                    <div class="Details">
                        <img src="@/assets/goods/xq.png" alt="">
                    </div>
                    <div class="imgList" v-for="(li,index) in data.pro_msg.productDescribePictures" :key="index">
                        <img  width="100%" :src="li" alt="" >
                    </div>

                    <div class="on-floor">
                        <span>店铺主页 |</span>
                        <span>会员中心 |</span>
                        <span>关注我们 |</span>
                        <span>线下门店 |</span>
                        <span>店铺信息</span>
                    </div>
                    <div class="floor-four">
                        <div class="left">
                            <ul>
                                <li class="fl">
                                    <img src="@/assets/goods/kf.png" alt="">
                                    <h5>咨询</h5>
                                </li>
                                <li class="fl">
                                    <img src="@/assets/goods/xin.png" alt="">
                                    <h5>收藏</h5>
                                </li>
                            </ul>
                        </div>
                        <div class="right">
                            <span>加入购物车</span>
                            <span class="teo">立即结算</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>        
    </el-container>
</template>

<script>
import {previewProduct,getMerchantInfo,getSkuDiscount} from "@/api/set/setmanage"
export default {
    data () {
        return {
            browse: {

            },
            proId: '',
            product_name: '',//商品名
            product_sku_num: '',//编码
            logo:'',
            txt:'',
            data:'',
            extend:'',
            data:{
                pro_msg:'',
                product_inventory: '',//第一个属性库存
                product_sku_num: '',//编码
                sku_name: '',//第一个属性的名
            },
            shopInfo:{
                merchant_logo: '',//logo
                shop_name: '',//商铺名称
            },
            sku_id: '',
            discount_price: '',//折扣价信息        
            product_price: '',//原价 
            name: '',              
            applyCat: [
            ],
            extended_properties: [],
            val:'',
           
        };
    },

    components: {},   
    methods:{
        getdata(){
            getMerchantInfo().then(res =>{
                console.log(res);
                this.shopInfo = res.data.data.store_msg   
            })
            let getSku = {
                proId: this.proId,
                skuId: this.sku_id
            }
            getSkuDiscount(getSku).then(res =>{
                console.log(res);
                this.discount_price = res.data.discountData.discount_price;
                this.product_price = res.data.product_price;
            })
            let data = {
                proId: this.proId,               
            }            
            previewProduct(data).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.data.pro_msg = res.data.data.pro_msg;
                    this.data.product_inventory = res.data.data.pro_msg.sku[0].product_inventory
                    this.data.product_sku_num = res.data.data.pro_msg.product_sku_num
                    this.data.sku_name = res.data.data.pro_msg.sku[0].sku_name  
                    this.extended_properties = res.data.data.pro_msg.extended_properties;
                    if(res.data.data.pro_msg.extended_properties.length!=0){                       
                        this.name = res.data.data.pro_msg.extended_properties[0].name;
                        // console.log(res.data.data.pro_msg.extended_properties[0].value.length)
                        // console.log(res.data.data.pro_msg.extended_properties[0].value);                       
                        if(Array.isArray(res.data.data.pro_msg.extended_properties[0].value)){                                             
                            res.data.data.pro_msg.extended_properties[0].value.forEach(val => {
                            this.applyCat.push(val);
                            });
                        }       
                        else{                                         
                            this.val = res.data.data.pro_msg.extended_properties[0].value;                                                    
                        }            
                    }                                          
                    // this.applyCat = res.data.data.pro_msg.extended_properties[0].value  
                    // console.log(res.data.data.pro_msg.extended_properties[0].value[0].brand_name);
                    // console.log(res.data.data.pro_msg.extended_properties[0].value.length);                                                                                                
                }                
            },err =>{
                this.$message.error(err);
            })
        },
        back(){
            this.$router.go(-1)
        }
    },
     created(){
         if(localStorage.getItem('price') != "undefined"){
            this.browse.price = localStorage.getItem('price')
         }
         else{
             this.browse.price = '';
         }       
         if(localStorage.getItem('sku_name')    ){
            this.browse.sku_name = localStorage.getItem('sku_name')
         }
         else{
             this.browse.sku_name = '';
         }        
        this.proId = this.$route.query.id
        this.sku_id = this.$route.query.sku_id;
        this.getdata()
        // this.data = JSON.parse(localStorage.data)
        // this.extend = this.data.input.slice(3)
        // console.log(this.data)
        // localStorage.removeItem('data')
    },
}

</script>
<style lang="stylus" scoped>
    .productpreview{
        .out-box{
            width 560px
            padding 7px
            background-color #f2f2f2
            margin 0 auto
            .curan{
                cursor pointer
            }
        }
        .el-main{
            padding 0
            background-color #fff
            padding 50px
            .box{
                width 545px
                .header-top{
                    padding 0 10px
                    background-color #000
                    width 100%
                    height 40px
                    color #ffffff
                    line-height 40px
                    display flex
                    justify-content space-between
                }
                .celimg{
                    width 100%
                    height 350px
                    background-color pink
                    .el-carousel{
                        height 350px
                    }
                }
                .information{
                    width 100%
                    height 120px
                    background-color #fff
                    margin-top 10px
                    padding-top 5px
                    padding-left 10px
                    p{
                        margin 12px 0
                        span{
                            color #999999
                        }
                        .right{
                            margin-right 30px
                        }
                    }
                    .red{
                        color red
                    }
                }
                .commodityNum{
                    padding 0 5px
                    margin-top 10px
                    background-color #fff
                    .sellNum{
                        height 40px
                        line-height 40px
                    }
                    .extent{
                        height 40px
                        line-height 40px
                        border-top 1px solid #ccc                        
                    }
                }
                .company{
                    width 100%
                    height 95px
                    background-color #fff
                    margin-top 10px
                    padding 0 10px
                    .company-x{
                        position relative
                        height 45px
                        padding-top 10px
                        border-bottom 1px solid #ccc
                        img{
                            width 30px
                            height 30px
                            border-radius 50%
                            margin-right 20px
                            float left
                        }
                        .right{
                            right 0
                            position absolute
                        }
                    }
                    .enterprise-Certification{
                        height 40px
                        line-height 40px
                        img{
                            margin-right 10px
                        }
                    }
                }
                .Details{
                    margin-top 20px
                    text-align center
                    height 70px
                }
                .imgList{
                    img{
                        margin-bottom 5px
                    }
                }
                .on-floor{
                    margin-top 30px
                    text-align center
                    margin-bottom 30px
                }
                .floor-four{
                    height 75px
                    background-color #fff
                    display flex
                    justify-content flex-start
                    .left{
                        width 280px
                        height 75px
                        li{
                            margin-left 70px
                            padding-top 5px
                            h5{
                                text-align center
                            }
                        }
                    }
                    .right{
                        width 280px
                        height 75px                        
                        span{
                            display inline-block
                            width 133px
                            height 75px
                            line-height 75px
                            text-align center
                        }
                        .teo{
                            background-color #118bea
                            color #fff
                        }
                    }
                }
            }
        }
        .el-carousel__item h3 {
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            line-height: 150px;
            margin: 0;
        }

        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }
        
        .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
        }
    }
</style>

<style>
    .productpreview .el-carousel__container{
        height:350px!important;
    }
    .extent p:last-child{
        width: 300px;       
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden; 
    }
</style>
