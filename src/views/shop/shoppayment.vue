<template>
  <!-- 支付方式 -->
  <el-container id="shopPayment">
    <!-- header头 -->
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
          支付方式
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 主体内容 -->
    <el-main>
      <el-row type="flex" justify="space-between">
        <el-row class="mainBody bgFFF">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item name="1" >
              <template slot="title">
                微信支付 — 代销
                <i class="header-icon el-icon-caret-bottom"></i>
                <div @click.stop="stops">
                  <el-switch
                  v-model="payWays.platformWechatPay"
                  active-color="#13ce66"
                  inactive-color="#CCCCCC"
                  disabled
                  >       
                </el-switch></div>
                
              </template>
              <div>
                买家通过微信支付并完成交易后，货款将自动结算至店铺
                </div>
                <div>
                金库，您可随时申请提现
              </div>
           
            </el-collapse-item>
            <!-- <el-collapse-item name="2">
              <template slot="title">
                商家自主微信支付
                <i class="header-icon el-icon-caret-bottom"></i>
                <div @click.stop="stops">
                  <el-switch
                  v-model="value2"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text = "已启用"
                  inactive-text	="未启用"
                  >       
                </el-switch></div>
              </template>
              <div>
                买家通过微信支付并完成交易后，货款将自动结算至店铺
                金库，您可随时申请提现
              </div>
            </el-collapse-item>
            <el-collapse-item name="3">
              <template slot="title">
                支付宝支付
                <i class="header-icon el-icon-caret-bottom"></i>
                <div @click.stop="stops">
                  <el-switch
                  v-model="value3"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text = "已启用"
                  inactive-text	="未启用"
                  >       
                </el-switch></div>
              </template>
              <div>
                买家通过微信支付并完成交易后，货款将自动结算至店铺
                金库，您可随时申请提现
              </div>
            </el-collapse-item>
            <el-collapse-item name="4">
              <template slot="title">
                银联支付
                <i class="header-icon el-icon-caret-bottom"></i>
                <div @click.stop="stops">
                  <el-switch
                  v-model="value4"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text = "已启用"
                  inactive-text	="未启用"
                  >       
                </el-switch></div>
              </template>
               <transition name="fade" mode="out-in">
                 <div>
                买家通过微信支付并完成交易后，货款将自动结算至店铺
                金库，您可随时申请提现
              </div>
              </transition>
              
            </el-collapse-item>
            <el-collapse-item name="5">
              <template slot="title">
                货到付款
                <i class="header-icon el-icon-caret-bottom"></i>
                <div @click.stop="stops">
                  <el-switch
                  v-model="value5"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text = "已启用"
                  inactive-text	="未启用"
                  >       
                </el-switch></div>
              </template>
              <transition name="fade" mode="out-in">
                <div>
                  买家通过微信支付并完成交易后，货款将自动结算至店铺
                  金库，您可随时申请提现
                </div>
              </transition>
            </el-collapse-item> -->
          </el-collapse>
        </el-row>
      
      </el-row>
    </el-main>
    
  </el-container>
</template>
<script>
import { setPayWay, payWay } from "api/shop/payment";
export default {
  data() {
    return {
      activeNames: ["1"],
      payWays: {
        platformWechatPay: true,
        merchantWechatPay: false,
        platformAlipay: false,
        platformUnionPay: false,
        cashOnDelivery: false
      }
    };
  },
  mounted() {
    payWay().then(result => {
      console.log(result);
      if (result.data.code == 200) {
        this.payWays.platformWechatPay =
          result.data.data.payWays.platform_wechat_pay - 1 ? false : true;
        this.payWays.merchantWechatPay = result.data.data.payWays
          .merchant_wechat_pay
          ? false
          : true;
        this.payWays.platformAlipay = result.data.data.payWays.platform_alipay
          ? false
          : true;
        this.payWays.platformUnionPay = result.data.data.payWays
          .platform_union_pay
          ? false
          : true;
        this.payWays.cashOnDelivery = result.data.data.payWays.cash_on_delivery
          ? false
          : true;
      } else {
        this.$message({
          message: result.data.error,
          type: "error"
        });
      }
    });
    // setPayWay(this.payWays);
  },
  methods: {
    handleChange(val) {
      console.log(val);
      event.cancelBubble = true;
    },
    stops(event) {}
  }
};
</script>
<style lang="stylus" scoped>
#shopPayment
  .el-header
    margin-left 1px
    .el-breadcrumb
      line-height 60px
  .el-main
    padding 10px
    .mainBody
      width 100%
      padding 10px 10px 100px 10px
      min-height 750px
</style>

<style>
#shopPayment div {
  border: 1px solid transparent;
}
#shopPayment .el-collapse-item__header {
  border: 1px solid #ccc;
  padding-left: 20px;
  background-color: #f8f8f8;
  margin-top: 20px;
  position: relative;
  border-radius: 4px;
}
#shopPayment .el-collapse-item__content {
  padding: 20px 0 0 20px;
}
#shopPayment .el-icon-arrow-right {
  display: none;
}
#shopPayment .el-switch {
  position: absolute;
  top: 14px;
  right: 8px;
}
</style>