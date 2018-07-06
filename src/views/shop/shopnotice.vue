<template>
  <!-- 交易与物流通知 -->
  <el-container id="shopNotice">
    <!-- header头 -->
    <el-header class="bgFFF">
     <el-breadcrumb>   
      <el-breadcrumb-item>
        交易和物流通知
      </el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 主体内容 -->
    <el-main>
      <el-row type="flex" justify="space-between">
        <el-row class="mainBody bgFFF">
          <div class="notice">
            <span>客户下单未付款时通知</span>
            <el-switch
              v-model="unpaid"
              active-color="#13ce66"
              inactive-color="#CCCCCC"
          
              @change = "setNotice('unpaid',unpaid)"
              >     
            </el-switch>
          </div>
          <div class="notice">
            <span>客户订单付款成功通知</span>
            <el-switch
              v-model="paySuccess"
              active-color="#13ce66"
              inactive-color="#CCCCCC"
            
              @change = "setNotice('paySuccess',paySuccess)"
              >     
            </el-switch>
          </div>
          <div class="notice">
            <span>订单发货成功通知</span>
            <el-switch
              v-model="deliveryRelease"
              active-color="#13ce66"
              inactive-color="#CCCCCC"
           
              @change = "setNotice('deliveryRelease',deliveryRelease)"
              >     
            </el-switch>
          </div>
          <div class="notice">
            <span>客户确认发货成功通知</span>
            <el-switch
              v-model="confirmReceipt"
              active-color="#13ce66"
              inactive-color="#CCCCCC"
           
              @change = "setNotice('confirmReceipt',confirmReceipt)"
              >     
            </el-switch>
          </div>
        </el-row>
  
      </el-row>
    </el-main>
    
  </el-container>
</template>
<script>
import { setMerchantNotice, merchantNoticSetting } from "api/shop/notice";
export default {
  data() {
    return {
      paySuccess: false,
      confirmReceipt: false,
      deliveryRelease: false,
      unpaid: false
    };
  },
  mounted() {
    merchantNoticSetting().then(result => {
      console.log(result);
      this.paySuccess = result.data.data.pay_success - 1 ? false : true;
      this.confirmReceipt = result.data.data.confirm_receipt - 1 ? false : true;
      this.deliveryRelease =
        result.data.data.delivery_release - 1 ? false : true;
      this.unpaid = result.data.data.unpaid - 1 ? false : true;
    });
  },
  methods: {
    setNotice(value, num) {
      setMerchantNotice(value, num ? 1 : 2).then(result => {
        console.log(result);
        if (result.data.code == 200) {
        } else {
          this.$message({
            message: result.data.error,
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
#shopNotice
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
      .notice
        height 60px
        background-color #f8f8f8
        border 1px solid #ccc
        line-height 60px
        padding 0 20px
        position relative
        margin-bottom 20px
        border-radius 4px
        .el-switch
          position absolute
          top 20px
          right 8px
</style>
