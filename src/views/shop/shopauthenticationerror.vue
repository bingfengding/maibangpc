<template>
  <!-- 主体认证 -->

    <el-container id="shopAuthenticationError">
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
            汽配帮手认证说明：如果您是个人商家、通过实名认证、可以管理金库等</p> -->
            <p class="beforBgblue">
              <i class="bgBlue"></i>
            主体信息</p>  
            <el-row type="flex" justify="center">
              <el-radio :label="1"  v-model="radio">个人认证</el-radio>
              <el-radio :label="2" @click.native="switchEnterprise">企业认证</el-radio>
            </el-row>
            <el-row class="shopAuthenticationForm">
                <!-- 个人认证表单 -->
                 <transition name="fade" mode="out-in">
                  <el-form 
                  ref="personalForm" 
                  :model="personalForm"
                  status-icon 
                  label-width="100px" 
                  :rules="personalRules">
                    <el-form-item label="证件姓名:" prop="corporation_name">
                      <el-input 
                      v-model="personalForm.corporation_name"
                      maxlength="20"
                      :disabled="disabled"
                      placeholder="请输入证件姓名"
                      >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="证件号码:" prop="idcard_num">
                      <el-input 
                      :disabled="disabled"
                      placeholder="请输入身份证号码"
                      v-model="personalForm.idcard_num"></el-input>
                    </el-form-item>
                    <!-- 身份证正面上传 -->
                    <el-form-item 
                    label="身份证正面:"
                    prop="relative_idcard_front"
                    >
                      <el-row 
                      type="flex" 
                      justify="start"
                      v-model="personalForm.relative_idcard_front"
                      >
                        <el-col :span="8">
                           <el-upload
                        class="avatar-uploader"
                        action="pc_seller/pc_seller/images/ImgUploads"
                        :show-file-list="false"
                        :disabled="disabled"
                        :before-upload="beforeUpload"
                        :http-request= "customUp">
                        <img 
                        v-if="imageUrl" 
                        :src="imageUrl" 
                        class="avatar" >
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                        </el-col>
                        <el-col :span="10" class="examplesText">
                          <span>示例:</span>
                          <i class="examplesImg"><img src="../../assets/shop/id.jpg" alt=""></i>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <!-- 身份证反面上传 -->
                    <el-form-item 
                    label="身份证反面:"
                    prop="relative_idcard_contrary"
                    >
                      <el-row type="flex" justify="start"  v-model="personalForm.relative_idcard_contrary">
                        <el-col :span="8">
                           <el-upload
                            :disabled="disabled"
                            class="avatar-uploader"
                            action="pc_seller/pc_seller/images/ImgUploads"
                            :before-upload="beforeUpload"
                            :show-file-list="false"
                            :http-request= "customUpBg"
                          >
                        <img v-if="imageUrlBg" :src="imageUrlBg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                        </el-col>
                        <el-col :span="10" class="examplesText">
                          <span>示例:</span>
                          <i class="examplesImg"><img src="../../assets/shop/idBg.jpg" alt=""></i>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item>
                      <p><span class="fontBlod">注意：</span>提交申请前，请确认填写信息是否正确，提交的图片是否清晰，审核通过后，当前页面将不能修改，如需修改，请联系汽配帮手客服。</p>
                    </el-form-item>
                    <el-form-item class="onSubmitPersonal">
                      <el-row type="flex" justify="center">
                        <div>
                          <el-button 
                          :disabled="disabled"
                          :type="message ?'danger':'primary'" 
                          @click="submitPersonal('personalForm')">{{messageButton}}</el-button>
                          <p class="font14 colorRed">{{message}}<span class="blue pointer" v-if="message" @click="resubmit">再次认证</span></p>
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

  
</template>
<script>
import {
  enterpriseverify,
  judgecertification,
  userrealname,
  setMerchantNotice,
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

    return {
      disabled: false,
      message: "",
      messageButton: "提交认证",
      status: 0,
      cer_type: 3,
      radio: 1,
      imageUrl: "",
      imageUrlBg: "",
      personalForm: {
        corporation_name: "",
        idcard_num: "",
        relative_idcard_front: "",
        relative_idcard_contrary: ""
      },
      // 个人表单验证
      personalRules: {
        //  姓名验证
        corporation_name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        //  身份证号码验证
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
        relative_idcard_contrary: [
          {
            required: true,
            message: "请上传身份证正面",
            trigger: "blur"
          }
        ],
        relative_idcard_front: [
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
  mounted() {},
  methods: {
    // 初始化信息
    start() {
      // 查询审核状态设置对应信息
      // judgecertification().then(result => {
      //   if (result.data.code == 200) {
      //     this.cer_type = result.data.data.cer_type;
      //     this.status = result.data.data.status;
      //     console.log(this.cer_type, this.status);
      //     if (this.status == 2) {
      //       this.$store.commit("change_who", { num: 1 });
      //     }
      //     if (this.cer_type == 2 && this.status == 1) {
      //       this.disabled = true;
      //       this.messageButton = "审核中";
      //     } else if (this.cer_type == 2 && this.status == 3) {
      //       this.disabled = true;
      //       this.message = "对不起，您的个人认证审核未通过！请";
      //       this.messageButton = "审核失败";
      //     } else if (this.cer_type == 2 && this.status == 2) {
      //       this.disabled = true;
      //       this.messageButton = "审核通过";
      //       // } else if (this.cer_type == 1 && this.status == 2) {
      //       //   this.disabled = true;
      //       //   this.messageButton = "审核通过";
      //       // } else if (this.cer_type == 1 && this.status == 1) {
      //       //   this.disabled = true;
      //       //   this.messageButton = "审核中";
      //       // } else if (this.cer_type == 1 && this.status == 3) {
      //       //   this.disabled = true;
      //       //   this.message = "对不起，您的企业认证审核未通过！请";
      //       //   this.messageButton = "审核失败";
      //       //
      //     } else {
      //       this.disabled = false;
      //       this.messageButton = "提交认证";
      //     }
      //   } else {
      //     this.$message.error(result.data.error);
      //   }
      // });
      // 获取个人信息
      enterpriseverify().then(result => {
        if (result.data.code == 200) {
          if (result.data.data.per_cer) {
            console.log(result.data.data);
            let base = result.data.data.per_cer;
            this.personalForm.corporation_name = base.corporation_name;
            this.personalForm.idcard_num = base.idcard_num;
            this.personalForm.relative_idcard_contrary =
              base.relative_idcard_contrary;
            this.personalForm.relative_idcard_front =
              base.relative_idcard_front;
            this.imageUrl = base.idcard_front;
            this.imageUrlBg = base.idcard_contrary;
            this.cer_type = base.cer_type;
            this.status = base.status;
            if (this.status == 2) {
              this.disabled = true;
              this.messageButton = "审核通过";
              this.$store.commit("change_who", { num: 1 });
            } else if (this.status == 1) {
              this.disabled = true;
              this.messageButton = "审核中";
            } else if (this.status == 3) {
              this.disabled = true;
              this.message = "对不起，您的个人认证审核未通过！请";
              this.messageButton = "审核失败";
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
    //切换到企业页面
    switchEnterprise() {
      this.$store.commit("change_who", { num: 3 });
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
    //自定义上传身份证正面
    customUp(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        imgUploads(3, reader.result).then(result => {
          this.personalForm.relative_idcard_front = result.data.data.originImg;
        });
      };
    },
    //自定义上传身份证背面
    customUpBg(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = () => {
        this.imageUrlBg = reader.result;
        imgUploads(3, reader.result).then(result => {
          this.personalForm.relative_idcard_contrary =
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
    // 提交申请
    submitPersonal(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          setMerchantNotice(this.personalForm)
            .then(result => {
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
            })
            .catch(err => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
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
    height 116px
    line-height 116px
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
#shopAuthenticationError
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
      position relative
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
            margin-left -100px
            .el-button
              width 180px
  .examplesImg
    width 180px
    height 116px
    display inline-block
    background-color red
    margin-left 10px
    img
      width 180px
      height auto
  .examplesText
    display flex
    align-items flex-start
.bigBody
  width 100%
</style>
<style>
</style>
