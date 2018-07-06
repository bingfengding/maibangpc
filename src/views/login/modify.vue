<template>
  <el-row id="modify"  
  @mouseup.native="fnUp(verX,verY,$event)"
   @mousemove.native="fnMove(disX,disY,$event)"
  > 
    <el-col>
      <el-row type="flex" justify="center">
        <img src="../../assets/login/login_logo.png" alt="">
      </el-row>
      <!-- 修改密码界面 -->
      <el-form ref="modifyForm" :model="modifyForm" :rules="rules" label-width="90px" id="modifyForm" class="bgFFF" name="modifyForm">
        <el-form-item class="hidePassword">
           <el-input 
            type="text"
          >
          </el-input>
          <el-input 
            type="password"
          >
          </el-input>
        </el-form-item> 
        <el-form-item label="手机号" class="modifyBottom" prop="phone">
          <el-input 
            v-model="modifyForm.phone" 
            placeholder="请输入手机号"
            auto-complete="off"
            autofocus
            maxlength=11
          >
          </el-input>
        </el-form-item >  
        <el-form-item label="验证码" class="modifyBottom" prop="code">
          <div class="modifyCode"><el-input 
            v-model="modifyForm.code" 
            placeholder="请输入验证码"
            auto-complete="off"
            maxlength=6   
          >
          </el-input>
          <el-button type="primary" :disabled="disabled" @click="getCode">{{disNum}}</el-button>
          </div>
          
          <div 
            class="box" 
            :class="verifyShow? 'verifyShow':''"
           
            :style="success?'display:none':''"
          >
            <div class="imgBox" ref="imgBox" :class="down? 'verifyShow':''" ondragstart="return false">
              <img :src="url" alt="" ref="verImg" class="verImg">
              <div class="verify" ref="verify" :style="verifyStyle" ></div>
              <div class="verified" ref="verified" :style="verifiedStyle"></div>
            </div>
            <div class="handle" ref="handle">
              <span 
                class="swiper" 
                ref="swiper" 
                @mousedown="fnDown(verX,verY,$event)"
               
                :style="swiperLeft"
              ></span>
              <span class="slider" ref="slider" :class="down?'sliderShow':''">{{success?successText:text}}</span>
            </div>
          </div>
        </el-form-item> 
        <el-form-item label="新密码" class="modifyBottom" prop="psw">
          <el-input 
            :type="pswShow? 'text':'password'"
            v-model="modifyForm.psw" 
            maxlength="20"
            placeholder="请输入新密码"
          >
          <i slot="suffix" 
          class="el-input__icon el-icon-view" @click="psdShow" :class="pswShow ? 'blue':''"></i>
          </el-input>
        </el-form-item>  
        <el-form-item label="确认密码" class="modifyBottom" prop="rePsw">
          <el-input 
            :type="pswShow? 'text':'password'"
            v-model="modifyForm.rePsw" 
            maxlength="20"
            placeholder="请确认密码" 
          >
          </el-input>
        </el-form-item>
        
          <el-button type="primary" class="modifyButtom" @click="subReg('modifyForm')">确认修改</el-button>
          <div class="textCen zIndex">
            <div class="font14 color999">
              
              <router-link class="color999 pointer" to="/login">返回登录</router-link>
            </div>
           
          </div>

      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import { truePhone, modifyPsw } from "@/api/login/login";
import { validatePhone } from "@/utils/validate";
export default {
  data() {
    // 表单验证方法
    // 手机号验证

    // 密码验证
    let pswChecking = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else if ((value + "").length < 5) {
        return callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    // 确认密码验证
    let rePswChecking = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else if ((value + "").length < 5) {
        return callback(new Error("密码不能小于6位"));
      } else if (value !== this.modifyForm.psw) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let codeChecking = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if ((value + "").length < 5) {
        return callback(new Error("请输入六位验证码"));
      } else {
        callback();
      }
    };
    return {
      disabled: false,
      verifyShow: false,
      disNum: "获取验证码",
      url: "",
      bgUrl: "",
      imgs: [],
      down: false,
      verX: "",
      verY: "",
      disX: "",
      disY: "",
      move: false,
      top: "",
      l: 0,
      success: false,
      successText: "验证成功",
      text: "向右拖动滑块",
      swiperLeft: "left:0px",
      verifyLeft: "left:0px",
      verifyStyle: {
        position: "",
        top: "",
        bgUrl: "",
        left: ""
      },
      verifiedStyle: {
        left: "",
        top: ""
      },

      modifyForm: {
        phone: "",
        psw: "",
        code: "",
        rePsw: ""
      },
      pswShow: false,
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        psw: [{ validator: pswChecking, trigger: "blur" }],
        rePsw: [{ validator: rePswChecking, trigger: "blur" }],
        code: [{ validator: codeChecking, trigger: "blur" }]
      }
    };
  },
  watch: {
    success(val, oldVal) {
      this.waitCode(val, oldVal);
    }
  },
  computed: {},
  mounted() {
    this.random();
  },
  methods: {
    // 等待验证
    waitCode(val, oldVal) {
      this.getCode();
    },
    getCode() {
      this.verifyShow = true;
      if (this.success) {
        truePhone(this.modifyForm.phone).then(res => {
          if (res.data.code === 200) {
            this.disabled = true;
            this.disNum = "60 S";
            let num = 59;
            let timer = setInterval(() => {
              this.disNum = num-- + " S";

              if (!num) {
                clearInterval(timer);
                this.disNum = "获取验证码";
                this.disabled = false;
              }
            }, 1000);
          } else {
            this.$message.error(res.data.error);
          }
        });
      }
    },

    start() {
      let verImg = this.$refs.verImg;
      // 获取图片高度

      // 随机生成坐标（图片框固定宽度为300px，高度不定）
      this.verX = 120 * (1 + Math.random()) - 30 + "px";
      this.verY = 140 / 4 + Math.random() * 70 - 30 + "px";
      this.left = this.verX;
      this.verifiedStyle = Object.assign({}, this.verifiedStyle, {
        left: this.verX,
        top: this.verY
      });
      this.verifyStyle = Object.assign({}, this.verifyStyle, {
        top: this.verY,
        backgroundPosition: "-" + this.verX + " -" + this.verY,
        backgroundImage: this.bgUrl
      });
    },
    //按下
    fnDown(verX, verY, e) {
      this.move = true;
      this.success = false;

      // 开始按下
      this.down = true;
      // 获取鼠标到按钮的距离

      this.disX = e.clientX - $(this.$refs.verImg).offset().left;
      this.disY = e.clientY - $(this.$refs.verImg).offset().top;

      // 释放
    },
    fnUp(verX, verY, e) {
      var stopL = $(this.$refs.verify).offset().left - 28;

      this.verifyStyle = Object.assign({}, this.verifyStyle, {
        left: ""
      });
      // 解除绑定，并将滑动模块归位

      this.down = false;
      this.move = false;
      // 误差在2px以内则算做成功
      if (Math.abs(this.l - parseFloat(this.verX)) > 2) {
        this.swiperLeft = "0px";

        this.refreshImg();
        this.start();
      } else {
        this.swiperLeft = "left:" + 210 + "px";
        this.success = true;
      }
    },
    // 移动

    fnMove(posX, posY, e) {
      if (this.move) {
        // 这里的e是以鼠标为参考
        var l = e.clientX - posX - $(this.$refs.handle).offset().left,
          winW = $(this.$refs.handle).width() - 29;
        // 限制拖动范围只能在handle中
        if (l < 0) {
          l = 0;
        } else if (l > winW) {
          l = winW;
        }
        this.swiperLeft = "left:" + l + "px";
        this.verifyStyle = Object.assign({}, this.verifyStyle, {
          left: l + "px"
        });
        this.l = l;
      }
    },
    refreshImg() {
      // 随机生成下标
      let index = Math.round(Math.random() * 11);
      let imgH = 0;
      this.url = require("../../assets/login/" + this.imgs[index] + ".jpg");

      this.bgUrl =
        "url(" +
        require("../../assets/login/" + this.imgs[index] + ".jpg") +
        ")";
    },
    random() {
      // 图片集合
      for (let i = 1; i < 14; i++) {
        this.imgs.push("" + i + i);
      }
      // 随机添加背景图refreshImgcol
      this.refreshImg();
      window.onload = this.start();
    },
    // 显示密码
    psdShow() {
      if (this.pswShow) {
        this.pswShow = false;
      } else {
        this.pswShow = true;
      }
    },
    //  提交表单
    subReg(formName) {
      this.$refs[formName].validate().then(() => {
        modifyPsw(
          this.modifyForm.phone,
          this.modifyForm.code,
          this.modifyForm.psw
        ).then(result => {
          if (result.data.code == 200) {
            this.$store.commit("setPhone", { phone: this.modifyForm.phone });
            this.$message({
              message: "修改成功,请重新登录",
              type: "success"
            });
            this.$router.push({
              path: "/login"
            });
          } else if (result.data.code != 200) {
            this.$message({
              message: result.data.error,
              type: "error"
            });
            this.$refs[formName].resetFields();
          }
        });
      });
    }
  }
};
</script>
<style lang="stylus">
#modify
  width 100%
  min-height 100vh
  padding-bottom 100px
  background-image url('../../assets/login/login_bg.png')
  background-size cover
  display flex
  align-items center
  justify-content center
  >.el-col
    width 350px
    #modifyForm
      border-radius 4px
      padding 10px 20px 40px 20px
      .modifyButtom
        position relative
        width 100%
        z-index 20
        margin-top 20px
      .modifyCode
        display flex
        justify-content space-between
        .el-button
          width 90px
          height 30px
          margin-top 10px
          padding 0
          span
            display inline-block
            width 90px
            height 30px
            line-height 30px
  input
    border none
    outline none
  .modifyBottom
    border-bottom 1px solid #cccccc
  .el-form-item
    height 50px
    margin-bottom 14px
    .el-form-item__label
      height 50px
      line-height 50px
      font-size 16px
      padding 0 8px 0 0
    .el-form-item__content
      height 50px
      line-height 50px
      .el-icon-view
        font-size 16px
  .box
    position relative
    top -130px
    left 250px
    width 240px
    opacity 0
    &.verifyShow
      opacity 1
    .imgBox
      width 100%
      height 140px
      position relative
      overflow hidden
      user-select none
      img
        width 100%
        height 140px
        user-select none
      .verify
        position absolute
        width 30px
        height 30px
        border-radius 5px
        background-size 240px
        background-repeat no-repeat
        background-attachment scroll
        box-shadow 0 0 10px 0 rgba(0, 0, 0, 0.4), 0 0 10px 0 rgba(90, 90, 90, 0.4)
        z-index 10
      .verified
        position absolute
        width 30px
        height 30px
        border-radius 5px
        background-color rgba(0, 0, 0, 0.1)
        -webkit-box-shadow 0 0 10px 0 rgba(0, 0, 0, 0.4) inset
        box-shadow 0 0 10px 0 rgba(0, 0, 0, 0.4) inset
    .handle
      background-color #f5f5f5
      box-shadow 0 0 20px 0 rgba(0, 0, 0, 0.2) inset
      display flex
      width 100%
      height 30px
      border-radius 20px
      user-select none
      .slider
        padding-left 40px
        line-height 30px
        opacity 1
        transition opacity 0.5s ease-in-out
        color #aaaaaa
      .swiper
        position absolute
        width 30px
        height 30px
        border-radius 50%
        background-color #1491f2
        box-shadow 2px 2px 6px 0 rgba(0, 0, 0, 0.2)
  .sliderShow
    opacity 0
  .zIndex
    position relative
    z-index 20
    margin-top 30px
  .hidePassword
    width 0
    height 0
    overflow hidden
    position absolute
</style>
