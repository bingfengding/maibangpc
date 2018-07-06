<template>
  <div id="assetme">
    <el-container>
      <el-header class="bgFFF"><sideHeader></sideHeader></el-header>
      <el-main>
        <div class="assetme">
          <div class="assetme-content">
            <div class="header-top">
              <div class="header-content">
                <div>可提现金额（元）</div>
                <div class="price">{{info.sum}}</div>
              </div>
            </div>
            <div class="self-price" v-if="info.wechatMch">
              <div>自主商家金额：0.00</div>
            </div>
            <div class="nav">
              <!-- <router-link ></router-link> -->
              <router-link :to="{path:'/asset/withdraw'}" class="nav-item">
                <img src="@/images/asset/withdraw-icon.png" alt="">
                <span>提现</span>
              </router-link>
              <router-link :to="{path:'/asset/toBeSettled'}" class="nav-item">
                <img src="@/images/asset/tobesettle-icon.png" alt="">
                <span>待结算</span>
              </router-link>
              <router-link :to="{path:'/asset/income'}" class="nav-item">
                <img src="@/images/asset/income-icon.png" alt="">
                <span>收支明细</span>
              </router-link>
              <router-link :to="{path:'/asset/accountList'}" class="nav-item">
                <img src="@/images/asset/manage-icon.png" alt="">
                <span>账户管理</span>
              </router-link>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import sideHeader from "./components/sideHeader.vue"
  import {mycoffers} from "@/api/asset/asset.js"
  export default {
    data() {
      return {
        info:{}
      }
    },
    methods:{
      getMyCoffers(){
        mycoffers().then(res=>{
          console.log(res.data.data);
          if (res.data.code == 200) {
            this.info = res.data.data
          } else {

          }
        })
      }
    },
    created() {
      this.getMyCoffers()
    },
    components:{sideHeader}
  }
</script>

<style lang="stylus" scoped>
.el-main
  padding 10px
  .assetme-content
    background-color  #fff
    padding 10px
    height 735px
   .header-top
      height 120px
      background-color #1491f2
      display flex
      align-items center
      justify-content center
      .header-content
        color #fff
        text-align center
        font-size 14px
        .price
          font-size 30px
    .self-price 
      height 40px
      display flex
      align-items center
      background-color #fff6eb
      justify-content center
      color #ff9933
    .nav 
      display flex
      height 120px
      align-items center
      border  1px solid #cccccc
      .nav-item
        width 25%     
        text-align center
        vertical-align middle
        display block
        img
          display inline-block 
          height 52px
          width 46px
        span 
          display block
          margin-top 16px
          color #1491f2
          font-size 16px
      .nav-item:first-child,.nav-item:last-child
        img
          width 56px
          height 41px
          margin-bottom 11px
</style>
