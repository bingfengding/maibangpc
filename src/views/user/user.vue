<template>
    <el-container>
        <el-header class="bgFFF"><sideHeader></sideHeader></el-header>
        <el-main>
            <el-row id="user" type="flex" justify="center">
                <el-col>
                    <!-- <topHeader></topHeader> -->
                    <el-row :gutter="20" type="flex" justify="center" class="main-content">
                        <el-col :span="14">
                            <div class="content">
                                <div class="box-item header-img">
                                    <span>头像：</span>
                                    <img :src="form.staff_img_thum" alt="">
                                    <!-- <span class="pointer color-theme">修改</span> -->
                                    <el-button  type="text" @click="setHeadImg">修改</el-button>

                                </div>
                                <div class="box-item">
                                    <span>名字：</span>
                                    <input type="text" maxlength="12" v-model="form.staff_name" placeholder="请输入名字">
                                </div>
                                <div class="box-item">
                                    <span>性别：</span>
                                    <el-radio v-model="form.staff_sex" label="男">男</el-radio>
                                    <el-radio v-model="form.staff_sex" label="女">女</el-radio>
                                </div>
                                <div class="box-item justify-sb" @click="setShowCard">
                                    <span>我的名片：</span>
                                    <img src="@/images/common/grayright-icon.png" alt="" class="mright-20">
                                    <div class="qr-card" v-if="isShowCard">
                                        <el-card class="box-card">
                                            <div class="card-header">
                                                {{cardInfo.staff_name}}的名片
                                            </div>
                                            <div class="card-detail">
                                                <div class="logo">
                                                    <img :src="cardInfo.staff_img" alt="">
                                                    <!-- <span>{{cardInfo.merchantMsg.shop_name}}</span> -->
                                                    <span>{{cardInfo.staff_name}}</span>
                                                </div>
                                                <div class="qrcode">
                                                    <img :src="qrCode" alt="">
                                                </div>
                                                <div class="tip">
                                                    扫描二维码，进入商城关注
                                                </div>
                                            </div>
                                        </el-card>
                                        <div class="qipei">
                                            <img :src="cardInfo.merchantMsg.shop_logo" alt="">
                                            {{cardInfo.merchantMsg.shop_name}}
                                        </div>
                                        <div class="share-btn">
                                            <el-button type="primary" @click="share">分享</el-button>
                                        </div>
                                    </div>
                                </div>
                                <router-link :to="{path:'/set/userinfo/changePhone',query:{staffId:form.id}}">
                                    <div class="box-item justify-sb">
                                        <span>更换手机号：</span>
                                        <span>{{form.staff_phone}}</span>
                                        <img src="@/images/common/grayright-icon.png" alt="" class="mright-20">
                                    </div>
                                </router-link>
                                <router-link :to="{path:'/set/userinfo/realNameAuthentication'}" v-if="!form.is_creator && form.authentication_type != 1">
                                    <div class="box-item justify-sb">
                                        <span>实名认证：</span>
                                        <span v-if="!form.authentication_type">未认证</span>
                                        <span v-else>
                                            <label v-if="form.authentication == 1">实名认证申请中</label>
                                            <label v-if="form.authentication == 2">实名认证已通过</label>
                                            <label v-if="form.authentication == 3">实名认证未通过</label>
                                        </span>
                                        <img src="@/images/common/grayright-icon.png" alt="" class="mright-20">
                                    </div>
                                </router-link>
                                <div class="btn">
                                    <el-button type="primary" class="save-btn" @click="saveUserMessage">保存</el-button>
                                    <!-- <el-button type="text" @click="backToHome">返回店铺后台</el-button> -->
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <cropper ref="cropper" @cropper-callback="cropperCallback"></cropper>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
// import header from './components/header.vue'
import sideHeader from "@/views/asset/components/sideHeader.vue";
import {
  userMessage,
  usertwodimensioncode,
  editeUserinfo
} from "@/api/user/user.js";
import cropper from "@/components/cropper/index.vue";
export default {
  data() {
    return {
      isShowCard: false,
      form: {},
      cardInfo: "",
      qrCode: "",
      importFileUrl: "/pc_seller/images/ImgUploads",
      upLoadData: {
        imageType: "1"
      },
      avatarUrl2: null,
      showCropper: true
    };
  },
  methods: {
    getUserMessage() {
      let that = this;
      userMessage().then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          that.form = res.data.data.userinfo;
        } else {
          that.$message.error(res.data.error);
        }
      });
    },
    setShowCard() {
      let that = this;
      if (that.isShowCard) {
        that.isShowCard = false;
        return;
      }
      if (that.cardInfo) {
        console.log(that.cardInfo);

        that.isShowCard = true;
        return;
      }
      usertwodimensioncode().then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          that.cardInfo = res.data.data;
          that.qrCode =
            res.data.data.or_code +
            "?staff_id=" +
            that.form.id +
            "&merchant_id=" +
            that.form.merchant_id;
          that.isShowCard = true;
        } else {
          that.$message.error(res.data.error);
        }
      });
    },
    backToHome() {
      this.$router.push({ path: "/home" });
    },
    setHeadImg() {
      this.$refs.cropper.setshowCropper();
    },
    cropperCallback(data) {
      let that = this;
      if (data.result == 1) {
        that.form.relative_staff_img = data.data.thumImg;
        that.form.staff_img_thum = data.data.fullpathThumImg;
      } else {
        that.$message.error(data.msg);
      }
    },
    saveUserMessage() {
      let that = this;
      if (!this.form.staff_name) {
        that.$message({
          type: "warning",
          message: "请输入名字"
        });
        return;
      }
      if (this.form.staff_name.length < 2) {
        that.$message({
          type: "warning",
          message: "名字不能小于两个字"
        });
        return;
      }
      let data = {
        sex: this.form.staff_sex,
        name: this.form.staff_name,
        relative_staff_img: this.form.relative_staff_img
      };
      editeUserinfo(data).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          that.$message({
            type: "success",
            message: "保存成功"
          });
          console.log(this.form);
          // localStorage.setItem("userName",that.form.staff_name)
          that.$store.commit("setUserName", that.form.staff_name);
          that.$store.commit("setUserAvatar", that.form.staff_img_thum);
          // that.$router.go(0)
        }
      });
    },
    share() {
      let url = this.cardInfo.url + "&mallad=ad";
      let data = {
        img: this.cardInfo.merchantMsg.shop_logo,
        title: this.cardInfo.merchantMsg.shop_name,
        url: url
      };
      console.log(data);
      this.$store.dispatch("changeUrl", data);
      this.$store.dispatch("showShare");
    }
  },
  mounted() {
    this.getUserMessage();
  },
  components: { sideHeader, cropper },
  destroyed() {
    this.$store.dispatch("hideShare"); // 关闭分享
  }
};
</script>
<style lang="stylus" scoped>
.el-main
    padding 10px
#user
    background #fff
    height 100%
    width 100%
    padding-top 20px
    height 100vh
    >.el-col
        width 800px
        // width 60%
    .main-content
        height 700px
        // height 80%
        border 1px solid #cccccc
        .content
            margin-top 110px
            .box-item
                height 50px
                border-bottom 1px solid #cccccc
                display flex
                align-items center
                position relative
                span
                    margin-right 15px
                input
                    outline none
                    border 0
                    width 80%
                    height 45px
            .header-img
                height 80px
                img
                    height 60px
                    width 60px
                    background-color #666666
                    margin 10px 0
                    border-radius 5px
                    margin-right 20px
            .btn
                margin-top 20px
                .save-btn
                    width 90px
                    height 30px
                    padding 0
                    font-size 14px
    .justify-sb
        justify-content space-between
    .qr-card
        position absolute
        right -380px
        top 0
        width 380px
        height 430px
        border 1px solid #1491f2
        border-radius 5px
        background-color #fff
        i
            display inline-block
            width 30px
            height 30px
            vertical-align middle
            background-image url('../../assets/icon.png')
        .card-detail
            text-align center
            .logo
                margin 20px auto
                img
                    display inline-block
                    height 24px
                    width 24px
                    background-color #333333
                    vertical-align middle
                    border-radius 50%
                span
                    vertical-align middle
            .qrcode
                img
                    display inline-block
                    height 150px
                    width 150px
                    background-color #eeeeee
            .tip
                color #333333
                font-size 14px
                margin-top 20px
        .qipei
            margin-top 10px
            margin-left 20px
            img
                display inline-block
                width 30px
                height 30px
                vertical-align middle
        .share-btn
            margin-top 20px
            text-align center
            button
                width 120px
                height 30px
                padding 0
</style>

