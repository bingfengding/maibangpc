<template>
    <!-- 店铺装修 -->
      <el-container id="shopInstallAddInfo4">
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
              popper-class="addinfo4Poper"
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
                        <el-button type="primary" size="mini" @click="saveAddinfo4">保存</el-button>
                      </div>
                   </div>
                </el-row>
            </div>
              <div class="addinfo4 pointer" slot="reference" >
                <img :src="bgUrl" alt="">
                <div class="mongolian"></div>
                <div class="editText">编辑</div>
              </div>
            </el-popover>
            <div class="main">
              <div class="mainCenter">
                <div class="incoImg">
                  <img src="../../../assets/shop/install/addinfo4_03.png" alt="">
                  <p class="incoImgText colorFFF"> 
                    Free Loop
                    <span class="font12 bgBlue">关注</span>
                  </p>
                </div>
                
                <img src="../../../assets/shop/install/addinfo4_02.png" alt="">
                
              </div>
              <el-row class="adDiv pointer">
                <el-col :span="16" class="adDivLeft" @click.native="showDialogImg(1)">
                  <img :src="broadcasts[0].picture" alt="" v-if="broadcasts[0].picture">
                  <img src="../../../assets/shop/install/addinfo4_04.png" alt="" v-else>
                  <div class="editText">编辑</div>
                </el-col>
                <el-col :span="8">
                  <div class="adDivRight" @click="showDialogImg(2)">
                    <img :src="broadcasts[1].picture" alt="" v-if="broadcasts[1].picture">
                    <div class="adDivTopText textCen" v-else>
                      第二个商品
                    </div>
                    <div class="editText">编辑</div>
                  </div>
                  <div  class="adDivRight" @click="showDialogImg(3)">
                    <img :src="broadcasts[2].picture" alt="" v-if="broadcasts[2].picture">
                    <div class="adDivBottomText textCen" v-else>
                      第三个商品
                    </div>
                    <div class="editText">编辑</div>
                  </div>
                </el-col>
              </el-row>
              <div class="footer">
              <img src="../../../assets/shop/install/addinfo4_01.png" alt="">
            </div>
            </div>
          </el-col>
        </el-row>
          <adtemplate class="adtemplate"></adtemplate>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { mapMutations } from "vuex";
import adtemplate from "views/shop/shopinstall/adtemplate";
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
      bgUrl: require("../../../assets/shop/install/addinfo4_05.jpg"),
      addImgItems: {
        chooseID: 0,
        radio: 0,
        picture_relative: "",
        describe: "",
        url: "",
        productId: 0
      },
      broadcasts: [
        {
          picture: "",
          picture_relative: "",
          product_id: "",
          describe: "",
          index: 1
        },
        {
          picture: "",
          picture_relative: "",
          product_id: "",
          describe: "",
          index: 2
        },
        {
          picture: "",
          picture_relative: "",
          product_id: "",
          describe: "",
          index: 3
        }
      ]
    };
  },
  created() {
    this.initialization();
  },
  computed: {
    changAdd() {
      return this.$store.state.addinfo.changeAdd;
    }
  },
  watch: {
    changAdd: function() {
      console.log("watch");
      this.initialization();
    }
  },
  methods: {
    ...mapMutations(["change_addimgitems", "addinfo_change_diglogvisibleimg"]),
    initialization() {
      this.$store.commit("addinfo_change_template_id", 4);
      detail(this.$store.state.addinfo.template_id).then(res => {
        if (res.data.code === 200) {
          if (res.data.data.backgroundPicture) {
            this.bgUrl = res.data.data.backgroundPicture;
          }
          if (res.data.data.template.length) {
            let base = res.data.data.template;
            let baseA = [
              {
                picture: "",
                product_id: 0,
                picture_relative: "",
                describe: "",
                index: 1
              },
              {
                picture: "",
                product_id: 0,
                picture_relative: "",
                describe: "",
                index: 2
              },
              {
                picture: "",
                product_id: 0,
                picture_relative: "",
                describe: "",
                index: 3
              }
            ];
            base.forEach((element, index) => {
              baseA[element.index - 1] = element;
            });
            this.broadcasts = baseA;
          } else {
          }
        } else {
          this$message.error(data.error);
        }
      });
    },
    //轮播图改变
    templateOpen(id = 0) {
      this.addImgItems.chooseID = id;
      this.addImgItems.picture_relative = this.broadcasts[id].picture_relative;
      this.addImgItems.url = this.broadcasts[id].picture;
      this.addImgItems.radio = this.broadcasts[id].product_id;
      this.addImgItems.productId = this.broadcasts[id].product_id;
      this.addImgItems.describe = this.broadcasts[id].describe;
      this.$store.commit("change_addimgitems", this.addImgItems);
    },
    showDialogImg(index) {
      this.$store.commit("addinfo_change_diglogvisibleimg", 1);
      this.templateOpen(index - 1);
    },
    //图片上传之前
    beforeUpload(file) {
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
      let reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = () => {
        imgUploads(1, reader.result).then(result => {
          this.imgUrl = reader.result;
          this.url = result.data.data.originImg;
          console.log(this.imgUrl);
        });
      };
    },
    //保存背景图
    saveAddinfo4() {
      setBackgroundPicture(
        this.$store.state.addinfo.template_id,
        this.url
      ).then(res => {
        if (res.data.code === 200) {
          this.$message.success("保存成功");
          this.visible = false;
          this.initialization();
        } else {
          this.$message.error(res.data.error);
        }
      });
    }
  },
  components: {
    adtemplate
  }
};
</script>

<style lang="stylus" scoped>
#shopInstallAddInfo4
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
        .main
          position relative
          .mainCenter
            width 375px
            height 92px
            >img
              height 100%
              width 100%
            .incoImg
              height 80px
              position absolute
              top -40px
              left 10px
              display flex
              justify-content flex-start
              img
                width 80px
                height 80px
              .incoImgText
                margin-left 20px
                padding-top 10px
                width 200px
                span
                  display inline-block
                  width 40px
                  height 18px
                  margin-left 10px
                  border-radius 10px
                  text-align center
          .footer
            img
              width 100%
          .adDiv
            height 200px
            width 375px
            .adDivLeft
              height 200px
              position relative
              overflow hidden
              img
                position absolute
                margin auto
                top -9999px
                right -9999px
                bottom -9999px
                left -9999px
                min-width 100%
                min-height 100%
            .adDivRight
              height 100px
              position relative
              overflow hidden
              img
                position absolute
                margin auto
                top -9999px
                right -9999px
                bottom -9999px
                left -9999px
                min-width 100%
                min-height 100%
              .adDivTopText
                line-height 100px
                background-color #ff7ec4
              .adDivBottomText
                line-height 100px
                background-color #ffbe32
        .addinfo4
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
            background-color rgba(0, 0, 0, 0.4)
            top 0
            left 0
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
.addinfo4Poper
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
.addinfo4Poper {
  background-color: #f8f8f8;
}
.addinfo4Poper .selectAddinfo .line {
  height: 1px;
  background-color: #cccccc;
  margin: 10px 0;
}
.addinfo4Poper .el-upload {
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.addinfo4Poper .el-upload img {
  width: 80px;
  height: 80px;
}
</style>
