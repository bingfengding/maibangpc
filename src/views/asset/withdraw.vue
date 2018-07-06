<template>
  <div id="withdraw">
    <el-container>
      <el-header class="bgFFF"><sideHeader></sideHeader></el-header>
      <el-main>
        <div class="withdraw">
          <div class="withdraw-content">
            <div class="top-header">
              <span>申请提现</span>
            </div>
            <div class="center-content">
              <div class="item">
                <span class="left">可提现金额：</span>
                <span class="price">{{info.cofferSum}}</span>元
              </div>
              <div class="item">
                <span class="left">到账账户：</span>
                <el-select v-model="value" placeholder="请选择提现账户">
                  <el-option
                    v-for="item in info.data"
                    :key="item.value"
                    :label="item.bank_name + item.bank_num"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div class="item">
                <span class="left">提现金额：</span>
                <el-input v-model="inputMoney" placeholder="请输入内容" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"></el-input>元
              </div>
              <div class="item">
                <span class="left"></span>
                <p>一天只能提现一次，单笔提现金额最多50000， 提现 申请提交成功后，1-2天会审核提交银行，不同银行的 到账时间有所不同。</p>
              </div>
              <div class="item">
                <span class="left"></span>
                <el-button type="primary" @click="conmitWithdraw">提现</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import sideHeader from "./components/sideHeader.vue"
  import {withdrawalAccount,commitWithdrawals} from "@/api/asset/asset.js"
  import {validateNum} from "@/utils/validate.js"
  export default {
    data() {
      return {
        value: '',
        inputMoney:'',
        info:{}
      }
    },
    methods:{
      getMessage() {
        withdrawalAccount().then(res => {
          console.log(res.data);
          if (res.data.flag) {
            this.info = res.data
          }
        })
        console.log(this.info);
      },
      conmitWithdraw() {
        let that = this;
        console.log(this.value+"选择账号");
        if (!this.value) {
          this.$message({
            message: '请选择提现账户',
            type: 'warning'
          });
          return
        }
        if (!this.inputMoney || this.inputMoney == 0) {
          this.$message({
            message: '请输入提现金额',
            type: 'warning'
          });
          return
        } else {
          if (this.inputMoney > this.info.cofferSum) {
            this.$message({
              message: '可提现金额为'+this.info.cofferSum,
              type: 'warning'
            });
          } else {
            if (this.inputMoney < 10) {
              this.$message({
                message: '最小提现金额为10元',
                type: 'warning'
              });
            }
          }
        }
        let data = {
          w_amount:this.inputMoney,
          id:this.value
        }
        commitWithdrawals(data).then(res=>{
          if (res.data.flag) {
            that.$message({
              message: res.data.msg,
              type: 'success'
            });
            that.getMessage();
            that.inputMoney = "";
          } else {
            that.$message.error(res.data.error);
          }
        })
      }
    },
    created() {
      this.getMessage()
    },
    components:{sideHeader}
  }
</script>

<style lang="stylus" scoped>
.el-main
  padding 10px
  .withdraw
    padding 10px
    background-color #fff
    height 735px
    .withdraw-content
      border 1px solid #ccc
      .top-header
        line-height 44px
        color #333333
        font-size 14px
        padding-left 20px
        background-color #f8f8f8
        border-bottom 1px solid #cccccc
      .center-content
        height 385px
        padding 40px 66px
        .item
          display flex
          align-items center
          margin-bottom 20px
          .left
            width 100px
            display inline-block
            text-align right 
            font-size 14px
            color #333333
          .price
            color #ff0000
            font-weight bold
          .el-input
            width 120px
            height 30px
            margin-right 5px
            .el-input__inner
              height 30px
              line-height 30px
          p
            width 285px
            color #999999
            font-size 12px
            margin-top 10px
          button
            height 30px
            line-height 0
            width 90px
            margin-top 30px
</style>
