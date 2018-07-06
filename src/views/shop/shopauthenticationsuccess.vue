<template>
  <el-container id="shopAuthenticationSuccess">
    <el-header  class="bgFFF">
    <el-breadcrumb>
      <el-breadcrumb-item>
        主体认证
      </el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
      <el-row type="flex" justify="space-between">
        <el-row class="mainBody bgFFF" justify="center" type="flex">  
          <el-col :span="16" class="allInfo">
            <el-row class="authenticationInfo">
              <div class="authenticationInfoText">
                <p v-if="judgecertificationData.cer_type==2">恭喜你,个人认证已通过</p>
                <p v-else>恭喜你,企业认证已通过</p>
                <p class="font14" v-if="judgecertificationData.cer_type==2">如果你是个人商家，通过实名认证，可以管理金库，发布刷刷推文等</p>
                <p class="font14" v-else>通过企业认证，让客户对您的商城有更深的印象和信任</p>
              </div>

              <i class="el-icon-circle-check"></i>
              <router-link to="enterprise">
                <el-button
                 type="primary" 
                 size="small" v-if="judgecertificationData.cer_type==2"
                 @click="toEn"
                 >升级企业认证</el-button>
              </router-link>
            </el-row>
            <div class="authenticationMain">
              <el-row>
                <el-col :span="24"><p>主体认证信息</p></el-col>
                <el-col :span="12" class="font14">
                  <p v-if="judgecertificationData.cer_type==2">
                    姓名:{{realnews.corporation_name}}</p>
                  <p v-else>法人姓名:{{realnews.corporation_name}}</p>
                </el-col>
                <el-col :span="12" class="font14">
                  <p>认证时间：{{realnews.cer_time}}</p>
                </el-col>
                <el-col :span="12" class="font14" v-show="judgecertificationData.cer_type==1">
                <p>企业名称：{{realnews.trade_name}}</p>
                </el-col>
                <el-col :span="12" class="font14" v-show="judgecertificationData.cer_type==1">
                <p>营业执照：{{realnews.credit_code}}</p>
                </el-col>
              <el-col :span="12" class="font14">
                <p>身份证：{{realnews.idcard_num}}</p>
                </el-col>
              <el-col :span="12" class="font14">
                <p>联系电话：{{realnews.user_phone}}</p>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { judgecertification, enterpriseverify } from "api/shop/authentication";
export default {
  data() {
    return {
      judgecertificationData: {
        status: 1,
        cer_type: 2
      },
      realnews: {}
    };
  },

  created() {
    this.start();
    // judgecertification().then(result => {
    //   if (result.data.code == 200) {
    //     if (result.data.data.cer_type == 3 || !(result.data.data.status == 2)) {
    //     } else {
    //       this.judgecertificationData.cer_type = result.data.data.cer_type;
    //       this.judgecertificationData.status = result.data.data.status;
    //       if (result.data.data.cer_type == 2) {
    //         userrealname().then(result => {
    //           console.log(result);
    //           if (result.data.code == 200) {
    //             this.realnews = result.data.data.realnews;
    //           } else {
    //             this.$message.error(result.data.error);
    //           }
    //         });
    //       } else if (result.data.data.cer_type == 1) {
    //         enterpriseverify().then(result => {
    //           this.realnews = result.data.data;
    //           console.log(this.realnews);
    //         });
    //       }
    //     }
    //   } else {
    //     this.$message.error(result.data.error);
    //   }
    // });
  },
  methods: {
    start() {
      enterpriseverify().then(res => {
        if (res.data.code == 200) {
          if (res.data.data.enter_cer && res.data.data.enter_cer.status === 2) {
            this.realnews = res.data.data.enter_cer;
            this.judgecertificationData.cer_type = 1;
          } else if (
            res.data.data.per_cer &&
            res.data.data.per_cer.status === 2
          ) {
            this.realnews = res.data.data.per_cer;
            this.judgecertificationData.cer_type = 2;
          }
        } else {
          this.$message.error(res.data.error);
        }
      });
    },
    toEn() {
      this.$store.commit("change_who", { num: 3 });
      // this.$router.push("enterprise");
    }
  }
};
</script>

<style lang="stylus" scoped>
#shopAuthenticationSuccess
  .el-header
    margin-left 1px
    .el-breadcrumb
      line-height 60px
  .el-main
    padding 10px 10px 50px 10px
    .mainBody
      width 100%
      min-width 750px
      padding 10px
      .allInfo
        border 1px solid #cccccc
        .authenticationInfo
          height 90px
          background-color #f8f8f8
          padding 20px 0 0 100px
          .authenticationInfoText
            p:first-of-type
              margin-bottom 10px
          .el-button
            position absolute
            top 10px
            right 50px
          .el-icon-circle-check
            position absolute
            top 50%
            left 50px
            margin-top -17px
            display inline-block
            width 34px
            height 34px
            font-size 34px
            color #85cc24
        .authenticationMain
          height 600px
          padding 50px
          .el-col
            line-height 50px
</style>
