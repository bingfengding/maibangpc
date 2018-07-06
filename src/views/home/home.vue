<template>
<el-container id="home">
  <el-header class="bgBlue">
    <el-row type="flex" justify="start">
      <div class="font14 colorFFF headerText">
        <p v-if="versions=='two'" v-cloak>您的商城属于汽配商城专业版</p>
        <p v-else>您的商城属于免费体验版，请订购(专业版)</p>
        <p>咨询电话：150 9999 4364</p>
      </div>
      <div class="headerInput" v-show="versions!='two'" v-cloak>
        <button @click="toBug">立即订购</button>
      </div>
    </el-row>
  </el-header>
  <el-main class="bgFFF">
    <el-row type="flex" justify="space-between">
      <el-row class="mainBody">
        <!-- 个人状态情况 -->
        <el-col class="homeMyinfo" :span="24">
          <span class="homeMe">{{shop_name}}</span>
          <router-link to="asset/service">
            <el-button type="success" 
            v-if="versions=='two'"
            v-cloak
            :title="'您的专业版剩余时间为'+surplus_time+'天'"
            >已订购</el-button>
            <el-button 
              type="info" 
              size="mini"
              v-else-if="versions=='one'"
              v-cloak
              title="您未订阅专业版"
            >未订购</el-button>
            <el-button type="warning" v-else-if="versions=='four'"
            :title="'您的专业版剩余只剩下'+surplus_time+'天'"
            v-cloak
            >快过期</el-button>
            <el-button type="danger" v-else-if="versions=='three'"
            title="您所订购的专业版已到期"
            v-cloak
            >已过期</el-button>
          </router-link>
          <!-- <span class="homeExpire bgRed font14 colorFFF">已到期</span> -->
          <el-button type="success" class="homeWarrant font14" v-if="isMerchantOrderServic">汽配帮手担保</el-button>
      
        </el-col>
        <!-- 销售额情况 -->
        <el-row :gutter="20" class="homeSale textCen colorFFF">
           <el-col :span="12">
            <div class="homeYesterdaySale bgBlue homeSaleMain ">
              <p class="font20">{{form.nowSalesData.nowSales}}</p>
              <p>今天销售额(元)</p>
              <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="8">
                  浏览量：
                  <span>{{form.nowSalesData.nowInteractive}}</span></el-col>
                <el-col :span="8">
                  订单量：
                  <span>{{form.nowSalesData.nowOrderVolume}}</span></el-col>
                <el-col :span="8">
                  销售量：
                  <span>{{form.nowSalesData.nowSalesVolume}}</span></el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="homeTodaySale bgBlue homeSaleMain">
              <p class="font20">
                {{form.yesterdaySalesData.nowSales}}</p>
              <p>昨天销售额(元)</p>
              <el-row type="flex">
                <el-col :span="8">
                  浏览量：
                  <span>{{form.yesterdaySalesData.nowInteractive}}</span></el-col>
                <el-col :span="8">
                  订单量：
                  <span>{{form.yesterdaySalesData.nowOrderVolume}}</span></el-col>
                <el-col :span="8">
                  销售量：
                  <span>{{form.yesterdaySalesData.nowSalesVolume}}</span></el-col>
              </el-row>
            </div >
          </el-col>
         
        </el-row>
          <!-- 发货状态 -->
          <el-row type="flex" justify="space-between" class="textCen homeState">
            <el-col :span="6">
              <p><router-link :to="{path:'order/profile',query: {name: 'pendingPayment'}}"><span class="blue">{{form.unPrice}}</span></router-link></p>
              <p>待付款</p>
            </el-col>
            <el-col :span="6">
              <p>
                <router-link :to="{path:'order/profile',query: {name: 'pendingDelivery'}}"><span class="blue">{{form.unShipped}}</span></router-link></p>
              <p>待发货</p>
            </el-col>
            <el-col :span="6">
              <p><router-link :to="{path:'order/profile',query: {name: 'toBeReceived'}}"><span class="blue">{{form.unReceive}}</span></router-link></p>
              <p>待收货</p>
            </el-col>
            <el-col :span="6">
              <p><router-link :to="{path:'order/refund',query: {name: 'handling'}}"><span class="blue">{{form.productReturn}}</span></router-link></p>
              <p>退款中</p>
            </el-col>
          </el-row>
          <!-- 常用功能 -->
          <el-row class="homeFnt">
            <p class="font20 fontBlod homeEdit">
              常用功能
              <!-- <el-button 
              type="primary"
              size="small"
              >
                编辑
              </el-button> -->
            </p>
            <el-row :gutter="2">
              <el-col v-for="fnt in homeFnt" :key="fnt.key" :span="4" >
                <router-link :to="fnt.to" @click.native.stop="helpOpen(fnt.name)">
                <div class="pointer">
                  <i :style="fnt.imgUrl"></i>
                  <span>{{fnt.name}}</span>
                </div>
                </router-link>
                
              </el-col>
            </el-row>
          </el-row>
      </el-row>

    </el-row>

  </el-main>
</el-container>
</template>
<script>
import { getCookie } from "utils/cookies";
import { enterprisehomes } from "@/api/home/home";
import { storeHome, getMerchantInfo } from "api/shop/profile";
import { judgecertification } from "api/shop/authentication";
import { getMembersList } from "api/shop/members/members";
export default {
  data() {
    return {
      isMerchantOrderServic: false,
      versions: "one",
      surplus_time: 0,
      content: "未订购",
      shop_name: "",
      form: {
        certificationType: "",
        productReturn: "",
        unPrice: 0,
        unShipped: 0,
        unReceive: 0,
        productReturn: 0,
        certificationType: "",
        user_id: "",
        staff_id: "",

        nowSalesData: {
          nowSalesVolume: 0,
          nowSales: 0,
          nowOrderVolume: 0,
          nowInteractive: 0
        },
        merchantInfo: {
          abbreviation: "",
          merchant_logo: ""
        },
        yesterdaySalesData: {
          nowSalesVolume: 0,
          nowSales: 0,
          nowOrderVolume: 0,
          nowInteractive: 0
        },
        versions: {
          versions: "",
          surplus_time: 0,
          content: ""
        }
      },
      homeFnt: [
        {
          to: "shop/public",
          imgUrl:
            "background-image:url(" + require("../../assets/home_01.png") + ")",
          name: "微信公众号",
          url: "",
          key: 1
        },

        {
          to: "goods",
          imgUrl:
            "background-image:url(" + require("../../assets/home_02.png") + ")",
          name: "商品管理",
          url: "",
          key: 2
        },
        {
          to: "shop/profile",
          imgUrl:
            "background-image:url(" + require("../../assets/home_03.png") + ")",
          name: "店铺管理",
          url: "",
          key: 3
        },
        {
          to: "customer",
          imgUrl:
            "background-image:url(" + require("../../assets/home_11.png") + ")",
          name: "客户管理",
          url: "",
          key: 4
        },
        {
          to: "set/shopinfo",
          imgUrl:
            "background-image:url(" + require("../../assets/home_05.png") + ")",
          name: "折扣设置",
          url: "",
          key: 5
        },
        {
          to: "shop/program",
          imgUrl:
            "background-image:url(" + require("../../assets/home_06.png") + ")",
          name: "微信小程序",
          url: "",
          key: 6
        },
        {
          to: "shop/member",
          imgUrl:
            "background-image:url(" + require("../../assets/home_07.png") + ")",
          name: "成员管理",
          url: "",
          key: 7
        },
        {
          to: "asset/me",
          imgUrl:
            "background-image:url(" + require("../../assets/home_08.png") + ")",
          name: "我的金库",
          url: "",
          key: 8
        },
        {
          to: "order/profile",
          imgUrl:
            "background-image:url(" + require("../../assets/home_09.png") + ")",
          name: "订单管理",
          url: "",
          key: 9
        },
        {
          to: "",
          imgUrl:
            "background-image:url(" + require("../../assets/home_10.png") + ")",
          name: "帮助中心",
          url: "",
          key: 10
        }
      ]
    };
  },
  created() {
    this.reset();
  },
  mounted() {},
  methods: {
    //初始化
    reset() {
      storeHome().then(result => {
        if (result.data.code == 200) {
          this.shop_name = result.data.data.merchantInfo.shop_name;
          this.isMerchantOrderServic =
            result.data.data.merchantInfo.isMerchantOrderServic;
        } else {
          this.$message.error(result.data.error);
        }
      });

      getMembersList().then(res => {
        if (res.data.code === 200) {
        } else {
          this.$message({
            message: result.data.error,
            type: "error"
          });
        }
      });
      enterprisehomes().then(result => {
        if (result.data.code == 200) {
          this.versions = result.data.data.versions.versions;
          this.surplus_time = result.data.data.versions.surplus_time;
          this.content = result.data.data.versions.content;
          this.form = result.data.data;
          localStorage.setItem("userName", result.data.data.userName);
        } else {
          this.$message({
            message: result.data.error,
            type: "error"
          });
        }
      });
    },
    //跳转到立即订购
    toBug() {
      this.$router.push({ path: "asset/service" });
    },
    helpOpen(value) {
      if (value === "帮助中心") {
        const { href } = this.$router.resolve({
          path: "/userhelpHome"
        });
        window.open(href, "_blank");
      }
    }
  }
};
</script>
<style lang="css" scoped>
#app-main {
  margin-left: 0 !important;
}
</style>
<style lang="stylus" scoped>
body, #app-main
  margin-left 0 !important
#home
  height 100%
  .el-main
    margin 10px
    height 100%
    min-height 750px
    .homeMyinfo
      .el-button
        width 50px
        height 20px
        padding 0
        span
          width 100%
          line-height 20px
      span
        margin-right 20px
        vertical-align middle
      .homeExpire
        border-radius 4px
        padding 0 5px
      .homeWarrant
        width 120px
    .mainBody
      width 100%
      height 100%
      margin-right 0px
      .homeSale
        height 150px
        margin 36px
        .homeSaleMain
          height 150px
          padding 30px 20px 0 20px
          .el-row
            margin-top 30px
    .homeState
      height 150px
      background-color #f2f2f2
      padding 50px 5% 0 5%
    .homeFnt
      margin-top 50px
      margin-bottom 50px
      >p
        margin-bottom 30px
      .el-row
        .el-col
          margin-top 2px
          div
            height 64px
            background-color #f2f2f2
            line-height @height
            i
              width 20px
              height 20px
              display inline-block
              vertical-align middle
              padding 0 20px
              background-position center center
              background-repeat no-repeat
              background-size 20px 20px
          div:hover
            background-color #e7f4fe
        .el-col-4
          width 20%
  .homeEdit
    position relative
    .el-button
      position absolute
      right 0
  .el-header
    padding 10px 30px
    .headerText
      p
        line-height 22px
    .headerInput
      padding-left 30px
      padding-top 4px
      button
        width 100px
        height 36px
        color #1491f2
        background-color #fff
        outline none
        line-height 36px
        padding 0
        margin 0
        border-radius 4px
        border none
        cursor pointer
[v-cloak]
  display none
</style>
