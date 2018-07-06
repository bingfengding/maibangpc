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
                            <el-carousel height="150px">
                            <el-carousel-item v-for="item in data.priceList" :key="item">
                                <img width="100%" height="100%" :src="item" alt="">
                            </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>

                    <div class="information">
                        <p v-if="data.input[0].value">{{data.input[0].value}}</p>
                        <p class="red" v-if="data.product.length!=0">
                            ￥<span v-if="data.product[changeBlue].wholesale_rules==null">{{data.product[changeBlue].product_price}}</span>
                              <span v-else>{{data.product[changeBlue].wholesale_rules[0].sell_money}}</span>
                        </p>
                        <p><span class="right">库存：<span v-if="data.product.length!=0">{{data.product[changeBlue].product_inventory}}</span></span><span>商品编码:<span v-if="data.input[1].value">{{data.input[1].value}}</span></span></p>
                    </div>

                    <div class="commodityNum">
                        <div class="sellNum" @click="showDetails">
                            已选择数量：<span v-if="data.product.length!=0">{{data.product[0].sku_name}}</span>  数量：{{num}}
                            <i><img src="@/images/common/grayright-icon.png" alt=""></i>
                        </div>
                        <div class="extent" v-for="value in extend">
                            {{value.name}}：{{value.value}}
                        </div>
                    </div>

                    <el-dialog
                    :visible.sync="dialogVisible"
                    width="30%">
                        <div class="top">
                            <div class="top-right">
                                <img v-if="data.product[changeBlue].sku_img" :src="data.product[changeBlue].sku_img" alt="" width="100%" height="100%">
                                <img v-else :src="data.product[changeBlue].imageUrl" alt="" width="100%" height="100%">
                            </div>
                            <div v-if="data.product[changeBlue].wholesale_rules==null" class="top-left">
                                <p class="red">￥{{data.product[changeBlue].product_price}}</p>
                                <p>编码：{{data.input[1].value}}</p>
                                <p>库存：{{data.product[changeBlue].product_inventory}}</p>
                            </div>
                            <div v-else class="top-left">
                                <p class="red" v-for="value in data.product[changeBlue].wholesale_rules">{{value.start_sum}}件-{{value.end_sum}}件（￥{{value.sell_money}}/件）</p>
                            </div>
                        </div>
                        <div class="shul">
                            <span>购买数量</span>
                            <div class="shul-right fr">
                                <a class="left fl" @click="Addandsubtract(1)">
                                     -
                                </a>
                                <div class="center fl">
                                    {{num}}
                                </div>
                                <a class="right fr" @click="Addandsubtract(2)">
                                    +
                                </a>
                            </div>
                        </div>
                        <div class="bottor">
                            <ul>
                                <li v-for="(value,index) in this.data.product" :class="{liBlue:changeBlue==index}" @click="change(index)">{{value.sku_name}}</li>
                            </ul>
                        </div>
                    </el-dialog>

                    <div class="company">
                        <div class="company-x">
                            <img :src="logo" alt="">
                            <span class="fl">{{txt}}</span>
                            <span class="right">进店逛逛</span>
                        </div>
                        <div class="enterprise-Certification">
                            <span> <img src="@/assets/goods/yesyuan.png" alt="" width="15" height="15">企业认证</span>
                        </div>
                    </div>

                    <div class="Details">
                        <img src="@/assets/goods/xq.png" alt="">
                    </div>
                    <div class="textMs">
                        <span>{{data.textarea}}</span>
                    </div>

                    <div class="imgList">
                        <img v-for="value in data.detailspriceList" width="100%" :src="value" alt="">
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
import {getMerchantInfo,detail} from "@/api/goods/goods"
export default {
    data () {
        return {
            logo:'',
            txt:'',
            data:'',
            extend:'',
            dialogVisible:false,
            changeBlue:0,
            num:1,
        };
    },
    components: {},
    beforeRouteUpdate (to, from, next) {
        next()
        this.product()
    },
    created(){
        this.product()
    },
    methods:{
        product(){
            if(this.$route.query.id){
                this.haveID()
            }else{
                this.getdata()
                this.data = JSON.parse(localStorage.data)

                this.extend = this.data.input.slice(3)
                // localStorage.removeItem('data')
                if(this.data.product[0].type=='wholesale' || this.data.product[0].sku_type=='wholesale'){
                    this.data.product[0].product_price = this.data.product[0].wholesale_rules[0].sell_money
                }
            }
        },
        getdata(){
            getMerchantInfo().then(res=>{
                this.logo = res.data.data.store_msg.merchant_logo
                this.txt = res.data.data.store_msg.shop_name
            })
        },
        back(){
            this.$router.go(-1)
        },
        haveID(){
            let data = {
                productId:this.$route.query.id
            }
            detail(data).then(res=>{
                res.data.data.sku_name = res.data.data.classify_name
                res.data.data.priceList = res.data.data.productPictures
                res.data.data.product = res.data.data.sku
                res.data.data.textarea = res.data.data.product_details
                res.data.data.detailspriceList = res.data.data.productDescribePictures
                res.data.data.input = [{},{}]
                res.data.data.input[1].value = res.data.data.product_sku_num
                res.data.data.input[0].value = res.data.data.product_name

                this.exten = res.data.data.extended_properties
                delete res.data.data.classify_name
                delete res.data.data.productPictures
                delete res.data.data.sku
                delete res.data.data.product_details
                delete res.data.data.productDescribePictures
                this.data = res.data.data

                if(this.data.product[0].type=='wholesale' || this.data.product[0].sell_type==2){
                    this.data.product[0].product_price = this.data.product[0].wholesale_rules[0].sell_money
                }
            })

            getMerchantInfo().then(res=>{
                this.logo = res.data.data.store_msg.merchant_logo
                this.txt = res.data.data.store_msg.shop_name
            })
        },
        showDetails(){
            this.dialogVisible = true
        },
        change(n){
            this.changeBlue=n
        },
        Addandsubtract(n){
            if(n==1){
                if(this.num<=1){
                    this.num=1
                }else{
                    this.num--
                }
            }else{
                this.num++
            }
        }
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
                    height 540px
                    background-color pink
                    .el-carousel{
                        height 540px
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
                    position relative
                    .sellNum{
                        height 40px
                        line-height 40px
                        i{
                            position absolute
                            right 5px
                            top 3px
                        }
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
                            margin-right 70px
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
                    height 25px
                }
                .textMs{
                    max-resolution 10px
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
                    justify-content space-between
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
                            width 130px
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
                .top{
                    width:100%;
                    height 100px;
                    position relative
                    display flex
                    border-bottom 1px solid #ccc 
                    .top-right{
                        width 150px;
                        height 150px;
                        position absolute
                        margin-top -60px
                    }
                    .top-left{
                        margin-left 170px
                        margin-top 10px
                        P{
                            margin-top 10px
                        }
                        .red{
                            color red
                        }
                    }
                }
                .shul{
                    width 100%
                    height 70px
                    padding-top 25px
                    position relative
                    border-bottom 1px solid #ccc
                    .shul-right{
                        width 100px
                        height 25px
                        .left,.right{
                            width 25px;
                            height 25px;
                            background-color #ccc
                            text-align center
                            line-height 25px
                            font-weight 900
                            font-size 20px
                            cursor pointer
                        }
                        .center{
                            width 50px
                            text-align center
                            line-height 25px
                        }
                    }
                }
                .bottor{
                    width 100%
                    height 200px
                    padding-top 30px
                    li{
                        display inline-block
                        padding 5px
                        border-radius 5px
                        border 1px solid #1491f2
                        line-height 30px
                        color #1491f2
                        margin-right 10px
                        cursor pointer
                    }
                    .liBlue{
                        background-color #1491f2
                        color #ffffff
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
        height:540px!important;
    }
    .productpreview .el-carousel__item{
        height:540px!important;
    }
    .productpreview .el-dialog{
        width: 400px!important;
        position: absolute;
        left: 50%;
        margin-left: -230px;
    }
</style>
