<template>
    <el-container>
        <el-header class="bgFFF"><sideHeader></sideHeader></el-header>
        <el-main>
            <el-row id="realName" type="flex" justify="center">
                <el-col>
                    <el-row type="flex" justify="center" class="main-content" v-if="!issuccess">
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
                                    maxlength="12"
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
                                justify="space-around"
                                v-model="personalForm.relative_idcard_front"
                                >
                                    <el-col>
                                        <el-upload
                                            class="avatar-uploader"
                                            action="/pc_seller/images/ImgUploads"
                                            :show-file-list="false"
                                            :disabled="disabled"
                                            :http-request= "customUp">
                                            <img 
                                            v-if="imageUrl" 
                                            :src="imageUrl" 
                                            class="avatar" >
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </el-col>
                                    <el-col class="examplesText">
                                        <span>示例:</span>
                                        <i class="examplesImg"><img src="@/assets/shop/id.jpg" alt=""></i>
                                    </el-col>
                                </el-row>
                                </el-form-item>
                                <!-- 身份证反面上传 -->
                                <el-form-item 
                                label="身份证反面:"
                                prop="relative_idcard_contrary"
                                >
                                <el-row type="flex" justify="space-around"  v-model="personalForm.relative_idcard_contrary">
                                    <el-col>
                                        <el-upload
                                            :disabled="disabled"
                                            class="avatar-uploader"
                                            action="/pc_seller/images/ImgUploads"
                                            :show-file-list="false"
                                            :http-request= "customUpBg"
                                        >
                                            <img v-if="imageUrlBg" :src="imageUrlBg" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </el-col>
                                    <el-col  class="examplesText">
                                        <span>示例:</span>
                                        <i class="examplesImg"><img src="@/assets/shop/idBg.jpg" alt=""></i>
                                    </el-col>
                                </el-row>
                                </el-form-item>
                                <p class="tip-text">注意：<span>提交申请前请确认信息是否正确，信息错误将导致审核不能修改，审核通过后，营业执照，法人法人姓名，身份证将不能修改，请您认真确认提交申请的信息。</span></p>
                                <el-row type="flex" justify="center">
                                    <div class="edit-btn">
                                        <el-button 
                                        :disabled="disabled"
                                        :type="type" 
                                        @click="submitPersonal('personalForm')">{{messageButton}}</el-button>
                                        <p class="font14 colorRed">{{message}}<span class="blue pointer" v-if="message" @click="resubmit">再次认证</span></p>
                                    </div>
                                </el-row>
                            </el-form>
                        </transition>
                    </el-row>
                    <el-row  class="allInfo" v-if="issuccess">
                        <el-row class="authenticationInfo">
                        <div class="authenticationInfoText">
                            <p>恭喜你,实名认证已通过</p>
                        </div>
                        <i class="el-icon-circle-check"></i>
                        </el-row>
                        <div class="authenticationMain">
                        <el-row>
                            <el-col :span="24"><p>实名认证信息</p></el-col>
                            <el-col :span="12" class="font14"><p>姓名:{{personalForm.corporation_name}}</p></el-col>
                            <el-col :span="12" class="font14"><p>认证时间：{{personalForm.cer_time}}</p></el-col>
                            <el-col :span="12" class="font14"><p>身份证：{{personalForm.idcard_num}}</p></el-col>
                            <el-col :span="12" class="font14"><p>联系电话：{{personalForm.user_phone}}</p></el-col>
                        </el-row>
                        </div>
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
import sideHeader from "@/views/asset/components/sideHeader.vue";
import {userRealNameAuth,userrealname} from "@/api/user/user.js"
import {imgUploads} from "api/shop/authentication";

export default {
  data() {
    return {
      disabled: false,
      message: "",
      type:"primary",
      messageButton: "提交认证",
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
            max: 12,
            message: "姓名长度在2到12个字符",
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
            validator: "idNum",
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
      },
      userMessage:{},
      issuccess:false,
    };
  },
  methods: {
      //自定义上传身份证正面
    customUp(file) {
      console.log(file);
      const isJPG =
        file.file.type === "image/jpeg" ||
        file.file.type === "image/png" ||
        file.file.type === "image/jpg" ||
        file.file.type === "image/gif";
      const isLt2M = file.file.size / 1024 / 1024 < 4;
      if (!isJPG) {
        this.$message.error("请使用png/jpeg/gif/jpg格式的图片!");
      }
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
      console.log(file);
      const isJPG =
        file.file.type === "image/jpeg" ||
        file.file.type === "image/png" ||
        file.file.type === "image/jpg" ||
        file.file.type === "image/gif";
      const isLt2M = file.file.size / 1024 / 1024 < 4;
      if (!isJPG) {
        this.$message.error("请使用png/jpeg/gif/jpg格式的图片!");
      }
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
    // 提交申请
    submitPersonal(formName) {
        let that = this;
        this.$refs[formName].validate(valid => {
            if (valid) {
                userRealNameAuth(this.personalForm)
                .then(result => {
                    if (result.data.code == 200) {
                        that.$message({
                            message: "提交认证成功",
                            type: "success"
                        });
                        that.disabled = true;
                        that.type = "info";
                        that.messageButton = "审核中";
                    } else {
                        that.$message.error(res.data.error)
                    }
                })
                .catch(err => {});
            } else {
                return false;
            }
        });
    },
    getUserAutoMessage() {
        let that = this;
        userrealname().then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
                that.personalForm = res.data.data.realnews;
                that.imageUrl = res.data.data.realnews.idcard_front;
                that.imageUrlBg = res.data.data.realnews.idcard_contrary;
                if (res.data.data.realnews.status == 1) {
                    that.disabled = true;
                    that.type = "info";
                    that.messageButton = "审核中";
                } else if(res.data.data.realnews.status == 3) {
                    that.type = "danger";
                    that.disabled = true;
                    that.messageButton = "审核失败";
                    that.message = "对不起，您的实名认证未通过！"
                } else if(res.data.data.realnews.status == 2) {
                    that.issuccess = true;
                }
            } else {
                // that.issuccess = true;
                // that.$message.error(res.data.error)
            }
        })
    },
    // 重新申请
    resubmit() {
      this.disabled = false;
      this.messageButton = "提交认证";
      this.type = "primary";
    }
  },
  mounted() {
      this.getUserAutoMessage();
  },
  components: { sideHeader }
};
</script>
<style lang="stylus" scoped>
.el-main {
    padding: 10px;
}

#realName {
    background-color: #fff;
    height: 100vh;

    .main-content {
        width: 900px;
        min-height: 500px;
        margin: 20px auto;
        border: 1px solid #ccc;
        padding: 50px 150px;
    }
    .el-input{
        width: 50%;
    }
}

.avatar-uploader {
    border: 1px dashed #d9d9d9;
    width: 180px;
    height: 116px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 180px;
        height: 116px;
        line-height: 116px;
        text-align: center;
    }

    .avatar {
        width: 180px;
        height: 116px;
        display: block;
    }
}

.avatar-uploader:hover {
    border-color #1491f2 {
        .el-col {
            width: 800px;
            .beforBgblue {
                i {
                    display: inline-block;
                    width: 4px;
                    height: 16px;
                    vertical-align: middle;
                }
            }

            .beforBgblue:first-of-type {
                margin-bottom: 50px;
                margin-top: 20px;
            }

            .beforBgblue:last-of-type {
                margin-bottom: 30px;
            }

            >.el-row {
                margin-bottom: 30px;
            }

            .shopAuthenticationForm {
                .el-input {
                    width: 230px;
                }

                .onSubmitPersonal {
                    margin-bottom: 10px;
                    margin-left: -100px;

                    .el-button {
                        width: 180px;
                    }
                }
            }
        }
    }

    .examplesImg {
        width: 180px;
        height: 116px;
        display: inline-block;
        background-color: red;
        margin-left: 10px;

        img {
            width: 180px;
            height: auto;
        }
    }
}
.examplesText {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}
.tip-text {
    line-height:1.5;
    font-size: 14px;
    span{
        color:#999999;
    }
}
.edit-btn{
    margin-top:50px;
    button {
        width:270px;
    }
}

.allInfo {
    border: 1px solid #cccccc;
    width:900px;
    margin 20px auto;
    .authenticationInfo {
        height: 90px;
        background-color: #f8f8f8;
        padding: 20px 0 0 100px;
        .authenticationInfoText {
            p:first-of-type {
                margin-bottom: 10px;
            }
        }

        .el-button {
        position: absolute;
        top: 10px;
        right: 50px;
        }

        .el-icon-circle-check {
        position: absolute;
        top: 10px;
        left: 50px;
        display: inline-block;
        width: 34px;
        height: 34px;
        font-size: 34px;
        color: #85cc24;
        }
    }

    .authenticationMain {
        height: 600px;
        padding: 50px;

        .el-col {
        line-height: 50px;
        }
    }
}   
</style>
