<template>
  <!-- 主体认证 -->
  <div class="bigBody">
    <success v-if="if_success && $store.state.shopinstall.show_who==2">
    </success>
    <el-container id="shopAuthenticationEnterprise" v-else-if="$store.state.shopinstall.show_who==3">
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
            <el-col>
              <!-- <p class="beforBgblue">
                <i class="bgBlue"></i>
              汽配帮手认证说明：通过企业认证，让客户对您的商城有更深的印象和信任</p> -->
              <p class="beforBgblue">
                <i class="bgBlue"></i>
              主体信息</p>  
              <el-row type="flex" justify="center">
                <el-radio :label="1" @click.native="switchPersol">个人认证</el-radio>
                <el-radio :label="2" v-model="radio">企业认证</el-radio>
              </el-row>   
              <el-row class="shopAuthenticationForm">
                  <transition name="fade" mode="out-in">
                  <!-- 企业认证表单 -->
                    <el-form 
                    ref="enterpriseForm" :model="enterpriseForm" 
                    label-width="100px"   
                    :rules="enterpriseRules"
                    >
                      <el-form-item 
                      label="企业名称:"
                      prop="trade_name"
                      >
                        <el-input
                        placeholder="请输入企业名称"
                        :disabled="disabled"
                        v-model="enterpriseForm.trade_name"></el-input>
                      </el-form-item>
                      <el-form-item

                      label="企业法人:"
                      prop="corporation_name"
                      >
                        <el-input
                        placeholder="请输入企业法人姓名"
                        :disabled="disabled"
                        v-model="enterpriseForm.corporation_name"></el-input>
                      </el-form-item>
                      <el-form-item 
                      label="身份证号码:"
                      prop="idcard_num"
                      >
                        <el-input
                        placeholder="请输入身份证号码"
                        :disabled="disabled" 
                        v-model="enterpriseForm.idcard_num"
                        maxlength="18"></el-input>
                      </el-form-item>
                      <el-form-item 
                      label="营业执照号:"
                      prop="credit_code"
                      >
                        <el-input 
                        :disabled="disabled"
                        placeholder="请输入营业执照号码"
                        v-model="enterpriseForm.credit_code"
                        maxlength="18"></el-input>
                      </el-form-item>
                      <!-- 营业执照上传 -->
                      <el-form-item label="营业执照:" prop="relative_license_img" class="relative_license">
                        <el-row type="flex" justify="start" v-model="enterpriseForm.relative_license_img">
                          <el-col :span="8">
                            <el-upload
                              :disabled="disabled"
                              class="avatar-uploader"
                              action="pc_seller/pc_seller/images/ImgUploads"
                              :show-file-list="false"
                              :before-upload="beforeUpload"
                              :http-request= "customUpLicense">
                                <img v-if="imageUrlLicense" :src="imageUrlLicense" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                          </el-col>
                          <el-col :span="10" class="examplesText">
                            <span>示例: </span>
                            <i class="examplesImg"><img src="../../assets/shop/license.jpg" alt=""></i>
                          </el-col>
                        </el-row>
                      </el-form-item>
                      <!-- 身份证正面上传 -->
                      <el-form-item label="身份证正面:"
                      prop="relative_idcard_front"
                      >
                        <el-row type="flex" 
                        justify="start"  v-model="enterpriseForm.relative_idcard_front">
                          <el-col :span="8">
                            <el-upload
                            :disabled="disabled"
                          class="avatar-uploader"
                          action="pc_seller/pc_seller/images/ImgUploads"
                          :show-file-list="false"
                          :before-upload="beforeUpload"
                          :http-request= "customUp">
                          <img v-if="imageUrlEn" :src="imageUrlEn" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                          </el-col>
                          <el-col :span="10" class="examplesText">
                            <span >示例: </span>
                            <i class="examplesImg"><img src="../../assets/shop/id.jpg" alt=""></i>
                          </el-col>
                        </el-row>
                      </el-form-item>
                      <!-- 身份证反面上传 -->
                      <el-form-item label="身份证反面:"
                      prop="relative_idcard_contrary">
                        <el-row type="flex" justify="start"
                        v-model="enterpriseForm.relative_idcard_contrary">
                          <el-col :span="8">
                            <el-upload
                            :disabled="disabled"
                          class="avatar-uploader"
                          action="pc_seller/pc_seller/images/ImgUploads"
                          :show-file-list="false"
                          :before-upload="beforeUpload"
                          :http-request= "customUpBg">
                          <img v-if="imageUrlEnBg" :src="imageUrlEnBg" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                          </el-col>
                          <el-col :span="10" class="examplesText">
                            <span>示例: </span>
                            <i class="examplesImg"><img src="../../assets/shop/idBg.jpg" alt=""></i>
                          </el-col>
                        </el-row>
                      </el-form-item>
                      <el-form-item>
                        <p class="lineHeight40"><span class="fontBlod">注意：</span>提交申请前，请确认填写信息是否正确，提交的图片是否清晰，审核通过后，当前页面将不能修改，如需修改，请联系汽配帮手客服。</p>
                      </el-form-item>
                      <el-form-item class="onSubmitEnterprise"  >

                        <el-row type="flex" justify="center">
                          <div class="font14">
                            <el-button 
                            :type="message?'danger':'primary'"
                            :disabled="disabled" 
                            @click="submitEnterprise('enterpriseForm')">{{messageButton}}</el-button>
                            <p class="colorRed">
                              {{message}}
                              <span 
                              class="pointer blue" v-if="message"
                              @click="resubmit"
                              >再次认证</span>
                            </p>
                          </div>
                        </el-row>
                      </el-form-item>
                    </el-form>
                  </transition>                   
              </el-row>            
            </el-col>         
          </el-row>
        </el-row>
      </el-main>
    </el-container>
    <error v-else-if="$store.state.shopinstall.show_who==1"></error>
  </div>
</template>
<script>
import success from "views/shop/shopauthenticationsuccess.vue";
import error from "views/shop/shopauthenticationerror.vue";
import {
  judgecertification,
  userrealname,
  setMerchantNotice,
  enterpriseverify,
  shopcertification,
  imgUploads
} from "api/shop/authentication";
export default {
  data() {
    let idNum = (rule, value, callback) => {
      let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的身份证号码"));
      } else {
        callback();
      }
    };
    let licenseName = (rule, value, callback) => {
      let licenseReg = /^([0-9a-zA-Z]{18}$|\d{15}$)/;
      if (!licenseReg.test(value)) {
        callback(new Error("请输入正确的营业执照号码"));
      } else {
        callback();
      }
    };
    return {
      if_success: false,
      disabled: false,
      message: "",
      messageButton: "提交认证",
      status: 0,
      cer_type: 3,
      radio: 2,
      imageUrlEn: "",
      imageUrlEnBg: "",
      imageUrlLicense: "",
      enterpriseForm: {
        trade_name: "",
        credit_code: "",
        corporation_name: "",
        idcard_num: "",
        relative_license_img: "",
        relative_idcard_front: "",
        relative_idcard_contrary: ""
      },
      // 企业表单验证
      enterpriseRules: {
        // 企业姓名
        trade_name: [
          {
            required: true,
            message: "企业名称不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            message: "长度不能小于2个字符",
            trigger: "blur"
          }
        ],
        // 企业法人
        corporation_name: [
          {
            required: true,
            message: "企业法人不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            message: "请输入正确的姓名",
            trigger: "blur"
          }
        ],
        // 营业执照号码
        credit_code: [
          {
            required: true,
            message: "营业执照号码不能为空",
            trigger: "blur"
          },
          {
            validator: licenseName,
            trigger: "blur"
          }
        ],
        // 身份证号码
        idcard_num: [
          {
            required: true,
            message: "身份证号码不能为空",
            trigger: "blur"
          },
          {
            validator: idNum,
            trigger: "blur"
          }
        ],
        relative_license_img: [
          {
            required: true,
            message: "请上传营业执照",
            trigger: "blur"
          }
        ],
        relative_idcard_front: [
          {
            required: true,
            message: "请上传身份证正面",
            trigger: "blur"
          }
        ],
        relative_idcard_contrary: [
          {
            required: true,
            message: "请上传身份证反面",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.start();
  },
  methods: {
    start() {
      // 获取企业认证数据
      enterpriseverify().then(result => {
        if (result.data.code == 200) {
          if (result.data.data.per_cer) {
            if (result.data.data.per_cer.status == 2) {
              this.if_success = true;
              this.$store.commit("change_who", { num: 2 });
            }
          }
          if (result.data.data.enter_cer) {
            this.enterpriseForm = result.data.data.enter_cer;
            this.imageUrlEn = result.data.data.enter_cer.idcard_front_thum;
            this.imageUrlEnBg = result.data.data.enter_cer.idcard_contrary_thum;
            this.imageUrlLicense = result.data.data.enter_cer.license_img_thum;
            this.cer_type = result.data.data.enter_cer.cer_type;
            this.status = result.data.data.enter_cer.status;
            if (this.status == 1) {
              this.disabled = true;
              this.messageButton = "审核中";
            } else if (this.status == 3) {
              this.disabled = true;
              this.messageButton = "审核失败";
              this.message = "对不起，您的企业认证审核未通过！请";
            } else if (this.status == 2) {
              this.disabled = true;
              this.if_success = true;
              this.$store.commit("change_who", { num: 2 });
              this.messageButton = "审核通过";
            } else {
              this.disabled = false;
              this.messageButton = "提交认证";
            }
          } else {
            this.disabled = false;
            this.messageButton = "提交认证";
          }
        }
      });
    },
    // 切换为个人注册界面
    switchPersol() {
      console.log(this.status);
      if (this.status == 2 || this.status == 1) {
        this.$message.success("您已经提交企业认证，无须再次提交个人认证");
      } else {
        this.$store.commit("change_who", { num: 1 });
      }
    },
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
    // 提交身份证正面
    customUp(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = () => {
        this.imageUrlEn = reader.result;
        imgUploads(3, reader.result).then(result => {
          this.enterpriseForm.relative_idcard_front =
            result.data.data.originImg;
        });
      };
    },
    // 提交身份证反面
    customUpBg(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = () => {
        this.imageUrlEnBg = reader.result;
        imgUploads(3, reader.result).then(result => {
          this.enterpriseForm.relative_idcard_contrary =
            result.data.data.originImg;
        });
      };
    },
    // 重新申请
    resubmit() {
      this.disabled = false;
      this.messageButton = "提交认证";
      this.message = "";
    },
    // 提交营业执照
    customUpLicense(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = () => {
        this.imageUrlLicense = reader.result;
        imgUploads(3, reader.result).then(result => {
          this.enterpriseForm.relative_license_img = result.data.data.originImg;
        });
      };
    },
    // 提交企业认证
    submitEnterprise(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          shopcertification(this.enterpriseForm).then(result => {
            if (result.data.code == 200) {
              this.$message({
                message: "提交认证成功",
                type: "success"
              });
              this.start();
            } else {
              this.$message({
                message: result.data.error,
                type: "error"
              });
            }
            // this.$refs[formName].resetFields();
            // this.imageUrlEn = "";
            // this.imageUrlEnBg = "";
            // this.imageUrlLicense = "";
          });
        } else {
          return false;
        }
      });
    }
  },
  components: {
    success,
    error
  }
};
</script>

<style lang="stylus" scoped>
.avatar-uploader
  border 1px dashed #d9d9d9
  width 180px
  height 116px
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden
  vertical-align middle
  display table-cell

  .avatar-uploader-icon
    font-size 28px
    color #8c939d
    width 180px
    height 180px
    line-height 180px
    text-align center
  .avatar
    position absolute
    margin auto
    top -9999px
    right -9999px
    bottom -9999px
    left -9999px
    max-width 100%
    max-height 100%
.avatar-uploader:hover
  border-color #1491f2
#shopAuthenticationEnterprise
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
      >.el-col
        width 800px
        .beforBgblue
          i
            display inline-block
            width 4px
            height 16px
            vertical-align middle
        .beforBgblue:first-of-type
          margin-bottom 50px
          margin-top 20px
        .beforBgblue:last-of-type
          margin-bottom 30px
        >.el-row
          margin-bottom 30px
        .shopAuthenticationForm
          .el-input
            width 230px
          .onSubmitPersonal
            margin-bottom 10px
            .el-button
              width 180px
          .onSubmitEnterprise
            margin-bottom 10px
            margin-left -100px
            .el-button
              width 180px
          .examplesText
            display flex
            align-items flex-start
  .examplesImg
    width 180px
    height 116px
    display inline-block
    background-color red
    margin-left 10px
    img
      width 180px
      height 116px
  .relative_license
    .examplesImg
      width 140px
      height 200px
      img
        width 140px
        height 200px
  .lineHeight40
    line-height 20px
.bigBody
  width 100%
</style>

