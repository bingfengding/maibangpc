<template>
  <div id="orderService">
    <el-container>
      <el-header class="bgFFF">
        <sideHeader></sideHeader>
      </el-header>
      <el-main>
        <el-row class="mainBody" type="flex" justify="center" v-if="!ifOrderServiceDetail">
          <el-col :span="16" >
            <el-row type="flex" justify="center">
              <el-col :span="16">
                <el-steps :active="active" finish-status="success" align-center>
                  <el-step title="立即订购"></el-step>
                  <el-step title="确认订购信息"></el-step>
                  <el-step title="确认付款"></el-step>
                  <el-step title="完成订购"></el-step>
                </el-steps>
              </el-col>
            </el-row>
            <div class="line "></div>
            <el-row class="items" type="flex" justify="center" v-if="active ===0">
              <!-- 立即订购的页面 -->
              <el-row >
                <el-col class="itemHeader colorFFF">
                 <p>{{form.title}}{{form.period}}期</p>
                 <p class="money font14 "><span class="colorRed">￥{{form.price}}</span>/{{form.period}}期</p>
                 <el-button plain @click="immediately">立即订购</el-button>
                </el-col>
                <el-col class="itemBody font14">
                  <p class="color999">功能</p>
                  <ul >
                    <li v-for="(item,index) in form.version_explain" :key="index">
                      {{item}}
                    </li>
                  </ul>
                </el-col>
              </el-row>
            </el-row>
            <!-- 确认订购的页面 -->
            <el-row v-if="active===1" class="sureItems" type="flex" justify="center">
              <el-col>
                <el-row>
                  <div class="sureItemsShop">
                    <p>订购店铺：{{shop_name}}</p>
                  </div>
                  <div class="sureItemsMain">
                    <p>服务名称：{{form.service_name}}</p>
                    <p>服务类型：软件产品</p>
                    <p>生效周期：{{form.period}}(订购成功后立即生效)</p>
                    <p>服务价格：<span class="colorRed">￥{{form.price}}</span></p>
                  </div>
                  <div class="sureItemsFooter">
                    <div>
                      <span> 邀请码：</span>
                      <el-input 
                      v-model="invitation" 
                      size="small"
                      placeholder="填写好友分享的邀请码"></el-input>
                    </div>
                    <div class="payable">
                      <p>应付款：<span class="colorRed">￥{{form.price}}</span>
                      </p>
                    </div>
                    <div><el-button type="primary"
                      @click="suerPay"
                     size="small" 
                     class="fr">同意协议并付款</el-button></div>
                  </div>
                </el-row>
                <div class="sureAgreement">
                  <el-row type="flex" justify="center">
                    <div>
                      <el-checkbox v-model="checked"></el-checkbox>
                    <span class="font14">阅读并同意</span>
                    <span 
                      class="blue pointer font14"
                      @click="toAgreement"
                    >《迈邦汽配帮手软件协议》</span>
                    </div>
                    
                  </el-row> 
                </div>
              </el-col>

            </el-row>

            <!-- 付款的页面 -->
            <el-row v-if="active===2" class="surePayment" type="flex" justify="center">
              <el-col>
                <div class="surePaymentText">确认付款</div>
                <div class="surePaymentMain">
                  <p>店铺名称：{{shop_name}}</p>
                  <p>应付金额：<span class="colorRed">{{form.price}}元</span></p>
                  <p><span>微信扫码支付</span></p>
                </div>
                <el-row class="surePaymentFooter" type="flex" justify="space-between">
                  <el-col 
                  :span="8"
                  >
                    <div class="surePaymentFooterImg">
                      <img :src="sureForm.code_url" alt="">
                    </div>
                  </el-col>
                  <el-col :span="14" class="surePaymentFooterTitle">
                    <div><img src="../../assets/shop/server_03.png" alt=""></div>  
                    <p>扫码支付，成功后自动完成订购</p>
                    <div>
                       <el-button type="primary" size="small" @click="paymentSituation">已支付完成</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <!-- 订购成功 -->
            <el-row v-if="active===3" class="successPayment" type="flex" justify="center">
              <el-col>
                <div class="successPaymentText">恭喜你，已成功订购汽配商城专业版</div>
                <div class="successPaymentMain">
                  <p>店铺名称：{{endForm.shop_name}}</p>
                  <p>实付金额：<span class="colorRed">{{endForm.payment_amount}}元</span></p>
                  <p>订购时间：{{endForm.pay_time}}</p>
                  <p>期限：专业版{{form.period}}</p>
                  <p>到期时间：{{endForm.end_time}}</p>
                </div>
                <el-row class="successPaymentFooter">
                  <el-col>
                    <el-button type="primary" size="small" @click="renew">续费</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          
        </el-row>
        <el-row  v-else class="mainBody">
          <el-col :span="16">
            <div class="orderServiceDetail">
              <el-row class="orderServiceDetailHeader">
                <el-col :span="12">订购店铺：{{orderForm.shop_name}}</el-col>
                <el-col :span="12" class="functionRight">
                  <el-row type="flex" justify="center">
                    <p>功能</p>
                  </el-row>
                  
                  </el-col>
              </el-row>
              <el-row class="orderServiceDetailMain font14">
                <el-col :span="12" class="orderServiceDetailMainLeft">
                  <p>
                    服务名称：{{orderForm.service_name}}
                  </p>
                  <p>服务类型：{{orderForm.service_type}}</p>
                  <p>到期时间：{{orderForm.end_time}}</p>
                </el-col>
                <el-col :span="12" class="orderServiceDetailMainRight">
                  <el-row type="flex" justify="center">
                    <ul>
                      <li v-for="(item,index) in orderForm.version_explain" :key="index">{{item}}</li>
                      </ul>  
                  </el-row>
                  
                </el-col>
              </el-row>
              <el-row class="orderServiceDetailFooter" type="flex" justify="center">
                <el-button type="primary" size="small" @click="toRenew">
                  续费
                </el-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import sideHeader from "./components/sideHeader.vue";
import {
  getOrderService,
  submitOrderService,
  orderServicePayInfo,
  orderServiceDetail
} from "api/asset/orderservice";
export default {
  data() {
    return {
      checked: true, //判断是否选择了同意协议
      ifOrderServiceDetail: false,
      invitation: "", // 邀请码
      shop_name: "", //店铺名称
      active: 0,
      form: {
        id: "",
        title: "",
        price: "",
        service_name: "",
        period: "",
        version_explain: []
      },
      sureForm: {
        appid: "",
        code_url: "",
        mch_id: "",
        nonce_str: "",
        order_num: "",
        prepay_id: "",
        result_code: "",
        return_msg: "",
        sign: "",
        trade_type: ""
      },
      endForm: {
        buy_period: "",
        end_time: "",
        pay_time: "",
        payment_amount: "",
        shop_name: ""
      },
      orderForm: {
        shop_name: "",
        service_name: "",
        service_type: "",
        end_time: "",
        version_explain: []
      }
    };
  },
  created() {},
  mounted() {
    this.orderService();
  },
  methods: {
    // 跳转到协议页面
    toAgreement() {
      console.log(this.$router);
      const { href } = this.$router.resolve({
        path: "/protocol"
      });
      window.open(href, "_blank");
    },
    // 判断是否成功订购
    paymentSituation() {
      console.log(this.sureForm.order_num);
      orderServicePayInfo({ order_num: this.sureForm.order_num }).then(res => {
        if (res.data.code === 200) {
          this.endForm = res.data.data;
          this.active = 3;
        } else {
          this.$message.error(res.data.error);
        }
      });
    },
    //立即订购
    immediately() {
      this.active = 1;
    },
    // 初始设置
    orderService() {
      this.shop_name = localStorage.getItem("shop_name");
      // 判断是否有订购情况
      orderServiceDetail().then(res => {
        if (res.data.code == 200) {
          this.ifOrderServiceDetail = true;
          this.orderForm = res.data.data;
        } else {
          this.ifOrderServiceDetail = false;
        }
      });
      getOrderService().then(result => {
        if (result.data.code == 200) {
          console.log(result);
          this.form.title = result.data.data[0].title;
          this.form.service_name = result.data.data[0].service_name;
          this.form.price = result.data.data[0].price;
          this.form.version_explain = result.data.data[0].version_explain;
          this.form.period = result.data.data[0].period;
          this.form.id = result.data.data[0].id;
        } else {
          this.$message.error(result.data.error);
        }
      });
    },
    // 确认订单信息
    suerPay() {
      if (this.checked) {
        this.active = 2;
        console.log(this.invitation);
        submitOrderService({
          invitationCode: this.invitation,
          orderServiceId: this.form.id
        }).then(res => {
          if (res.data.code === 200) {
            console.log(res.data.data);
            this.sureForm = res.data.data;
          }
        });
      } else {
        this.$message.error("请先同意迈邦汽配帮手软件协议");
      }
    },
    // 续费
    renew() {
      this.active = 0;
    },
    toRenew() {
      this.ifOrderServiceDetail = false;
    }
  },
  // 组件
  components: {
    sideHeader
  }
};
</script>
<style lang="stylus" scoped>
#orderService
  .el-main
    padding 10px
    .mainBody
      background-color #ffffff
      min-height 750px
      padding-bottom 50px
      .el-steps
        min-width 500px
        padding 50px 0
      .line
        width 100%
        height 1px
        background-color #cccccc
      .items
        padding-top 50px
        >.el-row
          box-shadow 0 2px 6px hsla(0, 0%, 55%, 0.5)
          width 300px
          .itemHeader
            background url('../../assets/shop/service_01.png') no-repeat
            background-size 100% 100%
            padding 30px
            text-align center
            .money
              padding 30px 0
              span
                font-size 24px
                // vertical-align middle
            .el-button
              width 160px
          .itemBody
            padding 30px 30px 130px 30px
            background url('../../assets/shop/service_02.png') no-repeat
            background-size 100% 100%
            ul
              padding-left 20px
              li
                line-height 30px
                list-style-type disc
      .sureItems
        margin-top 50px
        >.el-col
          max-width 420px
          >.el-row
            border 1px solid #cccccc
            .sureItemsShop
              padding 20px
              border-bottom 1px solid #cccccc
              background-color #f8f8f8
            .sureItemsMain
              background-color #f8f8f8
              padding 20px
              p
                line-height 30px
            .sureItemsFooter
              padding 20px 20px 50px 20px
              background-color #f2f2f2
              position relative
              .el-input
                width 180px
              .payable
                padding 40px 0 20px 0
                text-align right
              .el-button:before
                content ''
                clear both
        .sureAgreement
          padding-top 10px
      .surePayment
        margin-top 50px
        >.el-col
          padding 20px
          border 1px solid #cccccc
          max-width 500px
          .surePaymentText
            padding-bottom 20px
          .surePaymentMain
            border-top 1px solid #cccccc
            padding-top 10px
            border-bottom 1px solid #cccccc
            p
              line-height 40px
            p:last-of-type
              padding-top 20px
              line-height 30px
              span
                display inline-block
                padding 0 10px
                border-top 1px solid #cccccc
                border-left 1px solid #cccccc
                border-right 1px solid #cccccc
          .surePaymentFooter
            padding 20px
            .surePaymentFooterImg
              width 150px
              height 150px
              background-color #666666
              img
                width auto
                max-width 150px
                height auto
            .surePaymentFooterTitle
              padding-top 30px
              p
                margin 10px 0 26px 0
      .successPayment
        margin-top 50px
        >.el-col
          padding 20px
          border 1px solid #cccccc
          max-width 500px
          .successPaymentText
            padding-bottom 20px
          .successPaymentMain
            border-top 1px solid #cccccc
            padding-top 10px
            border-bottom 1px solid #cccccc
            p
              line-height 40px
          .successPaymentFooter
            padding 20px
            .el-button
              width 90px
      .orderServiceDetail
        margin 20px
        padding 20px
        max-width 700px
        min-height 410px
        border 1px solid #ccc
        .orderServiceDetailHeader
          padding-bottom 20px
          border-bottom 1px solid #cccccc
          .functionRight
            p
              min-width 140px
        .orderServiceDetailMain
          p
            padding-top 20px
          .orderServiceDetailMainLeft
            border-right 1px solid #ccc
            min-height 200px
          .orderServiceDetailMainRight
            padding-top 20px
            list-style-type disc
            ul
              min-width 140px
              li
                list-style-type disc
                line-height 30px
        .orderServiceDetailFooter
          margin-top 50px
          padding-top 30px
          border-top 1px solid #cccccc
          .el-button
            width 120px
</style>
