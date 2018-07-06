<template>
  <el-row id="login" class="bgImg"
    @mouseup.native="stopClick?fnUp(verX,verY,$event):''"
    @mousemove.native="fnMove(disX,disY,$event)"
  >
    <el-col>
      <el-row type="flex" justify="center">
        <img src="../../assets/login/login_logo.png" alt="">
      </el-row>
      <el-form 
        ref="loginForm" 
        :model="loginForm" 
        label-width="70px" 
        id="loginForm" 
        class="bgFFF"
        :rules="loginRules"
        ondragstart="return false"
      >
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
        <el-form-item 
        label="手机号" 
        class="loginBottom"
        prop="phone"
        >
          <el-input 
            v-model="loginForm.phone" 
            placeholder="注册时填写的手机号码"
            auto-complete="off"
            autofocus
            maxlength=11
          >
          </el-input>
        </el-form-item >   
        <el-form-item 
        label="密码" 
        class="loginBottom"
        prop="psw"
        >
          <el-input 
            :type="pswShow? 'text':'password'"
            v-model="loginForm.psw" 
            placeholder="请输入密码"
            maxlength="20"
          >
          <i slot="suffix" 
          class="el-input__icon el-icon-view" @click="psdShow" :class="pswShow ? 'blue':''"></i>
          </el-input>
        </el-form-item>  
        <el-form-item label="验证码"
        ondragstart="return false"
        >
          <div 
            class="box" 
            :class="down? 'verifyShow':''"
            ondragstart="return false"
          >
            <div class="imgBox" ref="imgBox" :class="down? 'verifyShow':''" ondragstart="return false">
              <img :src="url" alt="" ref="verImg" class="verImg">
              <div class="verify" ref="verify" :style="verifyStyle" ></div>
              <div class="verified" ref="verified" :style="verifiedStyle"></div>
            </div>
            <div class="handle" ref="handle"
           
            >
              <span 
                class="swiper" 
                ref="swiper" 
                @mousedown="stopClick?fnDown(verX,verY,$event):''"
               
                :style="swiperLeft"
              ></span>
              <span class="slider" ref="slider" :class="down?'sliderShow':''">{{success?successText:text}}</span>
            </div>
          </div>
        </el-form-item> 
          <el-button type="primary" class="loginButtom" @click="subLogin('loginForm')">登录</el-button>
          <div class="textCen zIndex">
            <div >
              <router-link class="font14 color999 pointer" to="/modify">忘记密码</router-link>
            </div>
            <div class="loginOr">
              <span class="font14 colorFFF">or</span>
            </div>
            <div>
              <router-link class="font14 color999 pointer" to="/reg">注册</router-link>
            </div>  
          </div>

      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import { login } from "@/api/login/login";
import { setCookie } from "utils/cookies";
import { validatePhone } from "@/utils/validate";
export default {
  name: "Login",
  data() {
    // 手机号码验证
    let loginPsw = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else if ((value + "").length < 5) {
        return callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      pc: true,
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
      stopClick: true,
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

      loginForm: {
        phone: "",
        psw: ""
      },
      pswShow: false,
      loginRules: {
        phone: {
          validator: validatePhone,
          trigger: "blur"
        },
        psw: {
          validator: loginPsw,
          trigger: "blur"
        }
      }
    };
  },
  watch: {},
  computed: {},
  created() {
    this.isPc();
    this.hasPhone();
  },
  mounted() {
    this.random();
  },
  methods: {
    // 判断是否已经保存手机号码
    hasPhone() {
      if (this.$store.state.usersModule.phone) {
        this.loginForm.phone = this.$store.state.usersModule.phone;
      }
    },
    // 判断是否为pc
    isPc() {
      //判断pc端与移动端

      var userAgentInfo = navigator.userAgent;
      var Agents = new Array(
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ); //判断用户代理头信息
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) != -1) {
          flag = false;
          break;
        }
      }
      if (flag) {
        this.pc = true;
      } else {
        this.pc = false;
      }
      return flag; //true为pc端，false为非pc端
    },

    // 设置随机数据
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
      this.fnMove();
      this.move = true;
      // 开始按下
      this.down = true;
      // 获取鼠标到按钮的距离
      this.disX = e.clientX - $(this.$refs.verImg).offset().left;
      this.disY = e.clientY - $(this.$refs.verImg).offset().top;
    },
    // 释放
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
        this.stopClick = false;
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
    subLogin(formName) {
      this.$refs[formName].validate().then(valid => {
        if (valid) {
          if (!this.success) {
            this.$message.error("请先通过验证");
            return;
          }
          login(this.loginForm.phone, this.loginForm.psw).then(result => {
            if (result.data.code == 200) {
              let token = result.data.data.token;
              setCookie(token);
              if (token != "") {
                this.$store.commit("setUser", {
                  user_name: name,
                  user_token: token
                });
              }
              this.$router.push({
                path: "/chooseShop"
              }); //登录成功之后重定向到首页
            } else {
              this.swiperLeft = "0px";
              this.refreshImg();
              this.start();
              this.success = false;
              this.stopClick = true;
              this.$message({
                message: result.data.error,
                type: "error"
              });
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus">
#login
  width 100%
  padding-bottom 100px
  min-height 100vh
  background-image url('../../assets/login/login_bg.png')
  background-size cover
  display flex
  align-items center
  justify-content center
  >.el-col
    width 350px
    #loginForm
      border-radius 4px
      padding 10px 20px 40px 20px
      .loginButtom
        position relative
        width 100%
        z-index 20
        margin-top 20px
  input
    border none
    outline none
  .loginBottom
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
    &.verifyShow
      margin-top -126px
    .imgBox
      width 100%
      height 140px
      position relative
      overflow hidden
      opacity 0
      user-select none
      &.verifyShow
        opacity 1
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
      position absolute
      top 14px
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
    .loginOr
      border-bottom 1px solid #ccc
      position relative
      margin-bottom 20px
      span
        display inline-block
        width 18px
        height 18px
        line-height 18px
        border-radius 50%
        background-color #999
        position relative
        top 10px
  .hidePassword
    width 0
    height 0
    overflow hidden
    position absolute
</style>
