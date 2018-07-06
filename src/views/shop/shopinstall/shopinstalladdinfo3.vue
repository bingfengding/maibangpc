<template>
    <!-- 店铺装修 -->
      <el-container id="shopInstallAddInfo3">
    <!-- header头 -->
    <el-header class="bgFFF">
     <el-breadcrumb> 
        <el-breadcrumb-item :to="{path:'home'}">     
          模板商城
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          模板详情
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 主体内容 -->
    <el-main>
      <el-row class="mainBody bgFFF">
        <el-row type="flex" justify="center">
          <el-col class="templateCenter">
            <div class="header">
              <div>
                <img src="../../../assets/shop/install/addinfo2_01.png" alt="">
              </div>
              <div>
                <img src="../../../assets/shop/install/addinfo3_01.png" alt="">
              </div>
            </div>
            <el-popover
              popper-class="addinfo3Poper"
              placement="right-start"
              width="350"
              v-model="visible"
              trigger="click">
              <div class="selectAddinfo">
                <p>店铺信息</p>
                <div class="line"> </div>
                <el-row type="flex" justify="start">
                  <p class="bgImgText">背景图片：</p>
                  <div class="upMain">
                    <el-upload class="avatar-uploader"
                      action="pc_seller/pc_seller/images/ImgUploads"
                      :show-file-list = "false"
                      :before-upload = "beforeUpload"
                      :http-request	= "beforeAvatarUpload"
                      >
                        <img v-if="imgUrl" :src="imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon">
                        </i>
                      </el-upload>
                      <p>
                        建议尺寸：750X750像素，尺寸不匹配时图片将被压缩或拉伸以铺画面
                      </p>
                      <div class="upFooter">
                        <el-button size="mini" plain @click="visible=false">取消</el-button>
                        <el-button type="primary" size="mini" @click="saveAddinfo3">保存</el-button>
                      </div>
                   </div>
                </el-row>
            </div>
              <div class="addinfo3 pointer" slot="reference">
                <img :src="bgUrl" alt="">
                <div class="mongolian"></div>
                <el-row class="addinfo3Name colorFFF font14">
                  <div class="outNameImg">
                    <div class="nameImg">
                      <img src="../../../assets/shop/install/addinfo3_04.png" alt="">
                    </div>
                  </div>
                  <div class="nameTitle"><span>Free Loop</span></div>
                  <p>全部商品999 <span class=" bgBlue" @click.stop>关注</span></p>
                </el-row>
                <div class="editText">编辑</div>
              </div>
            </el-popover>
            
            <div class="footer">
              <img src="../../../assets/shop/install/addinfo3_02.png" alt="">
            </div>
          </el-col>
        </el-row>
          
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { imgUploads } from "api/shop/authentication";
import {
  detail,
  useTemplate,
  setBackgroundPicture,
  searchMerchantProduct,
  saveMerchantAdvertisement
} from "api/shop/install";
export default {
  data() {
    return {
      visible: false,
      imgUrl: "",
      url: "",
      bgUrl: require("../../../assets/shop/install/addinfo3_03.png")
    };
  },
  created() {
    this.initialization();
  },
  computed: {},
  watch: {},
  methods: {
    initialization() {
      this.$store.commit("addinfo_change_template_id", 3);
      detail(3).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data);
          if (res.data.data.backgroundPicture) {
            this.bgUrl = res.data.data.backgroundPicture;
          }
        }
      });
    },
    //图片上传之前
    beforeUpload(file) {
      console.log("上传之前");
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("请使用png/jpg格式的图片!");
      } else if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //图片自定义上传
    beforeAvatarUpload(file) {
      console.log("上传开始");
      let reader = new FileReader();
      reader.readAsDataURL(file.file);
      console.log(file.file);
      reader.onload = () => {
        imgUploads(1, reader.result).then(result => {
          this.imgUrl = reader.result;
          this.url = result.data.data.originImg;
          console.log(this.imgUrl);
        });
      };
    },
    saveAddinfo3() {
      setBackgroundPicture(3, this.url).then(res => {
        if (res.data.code === 200) {
          this.$message.success("保存成功");
          this.visible = false;
          this.initialization();
        } else {
          this.$message.error(res.data.error);
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
#shopInstallAddInfo3
  .el-header
    margin-left 1px
    .el-breadcrumb
      line-height 60px
  .el-main
    padding 10px
    .mainBody
      width 100%
      padding 20px 20px 80px 20px
      position relative
      min-height 750px
      .templateCenter
        width 375px
        position relative
        .header
          font-size 0
          img
            width 100%
        .footer
          img
            width 100%
        .addinfo3
          height 250px
          overflow hidden
          position relative
          >img
            position absolute
            margin auto
            top -9999px
            right -9999px
            bottom -9999px
            left -9999px
            min-width 100%
            min-height 100%
          .mongolian
            position absolute
            width 100%
            height 100%
            background-color rgba(0, 0, 0, 0.5)
            top 0
            left 0
          .addinfo3Name
            position absolute
            left 50%
            top 50%
            transform translate(-50%, -50%)
            width 200px
            height 200px
            padding-top 20px
            .outNameImg
              display flex
              justify-content center
              .nameImg
                width 70px
                height 70px
                border-radius 50%
                overflow hidden
                display flex
                justify-content center
                align-items middle
            .nameTitle
              text-align center
              span
                display inline-block
                border-bottom 1px solid #ffffff
                font-size 16px
                line-height 40px
            p
              text-align center
              padding-top 10px
              span
                display inline-block
                width 40px
                height 18px
                font-size 12px
                line-height 18px
                border-radius 10px
      .editText
        position absolute
        right 0
        bottom 0
        color #ffffff
        font-size 14px
        width 34px
        line-height 34px
        height 34px
        background-color #1491f2
        text-align center
        border-top-left-radius 4px
.addinfo3Poper
  .bgImgText
    width 70px
  .upMain
    width 250px
    .avatar-uploader
      .el-upload
        i
          font-size 40px
    p
      color #cccccc
      font-size 12px
      padding 10px 0 20px 0
    .upFooter
      text-align right
</style>

<style>
.addinfo3Poper {
  background-color: #f8f8f8;
}
.addinfo3Poper .selectAddinfo .line {
  height: 1px;
  background-color: #cccccc;
  margin: 10px 0;
}
.addinfo3Poper .el-upload {
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.addinfo3Poper .el-upload img {
  width: 80px;
  height: 80px;
}
</style>
