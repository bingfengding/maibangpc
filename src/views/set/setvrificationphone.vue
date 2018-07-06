<template>
  <el-container id="setvrificationphone">
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
          手机号验证
        </el-breadcrumb-item>        
      </el-breadcrumb>
    </el-header>
    <el-main>        
          <div class="main-content">  
          <div class="top">手机号验证</div>      
          <div class="cent">
              <div class="phone">
                  <label>手机号：</label>
                  <input type="text" v-model="new_tel" disabled>                  
              </div>
              <div class="yan">
                  <div class="yancode">
                    <label>验证码：</label>
                    <input type="text" placeholder="请输入验证码" v-model="code" maxlength="6" oninput="this.value=this.value.replace(/[^0-9.]+/,'');" class="btn">                    
                  </div>   
                  <div class="getcode">
                  <input class="button" :plain="true" type="button" value="获取验证码"  @click="getCode()" >
                  </div>               
              </div>
              <div class="next">
                <el-button type="prinary" :plain="true" size="mini" @click="next">下一步</el-button>
              </div>
          </div>            
        </div>                        
    </el-main>
  </el-container>
</template>

<script>
import verifyingphone from "@/views/set/assemblys/verifyingphone";
import modifypwd from "@/views/set/assemblys/modifypwd";
import { alterpassword, getCode, oldphone } from "@/api/set/setmanage";
export default {
  data() {
    return {
      new_tel: "",
      phone: "",
      code: "",
      setTime: {
        countdown: 59,
        t1: ""
      },
      active: "phone",
      currentTab: "phone"
    };
  },
  methods: {
    getCode() {
      let data = {
        phone: this.phone,
        diff: "pwd"
      };
      $(".yan .button").attr("disabled", true);
      this.setTime.t1 = setInterval(() => {
        $(".yan .button").removeAttr("disabled");
      }, 60000);
      getCode(data).then(res => {
        console.log(res);
        this.setTime.t1 = setInterval(() => {
          this.getTime();
        }, 1000);
        this.$message({
          message: res.data.msg,
          type: "success"
        });
      });
    },
    getTime() {
      if (this.setTime.countdown == 0) {
        $(".yan .button").removeAttr("disabled");
        $(".yan .button").val("重新获取");
        clearInterval(this.setTime.t1);
        this.setTime.countdown = 59;
        $(".yan .button").removeClass("act");
        return;
      } else {
        $(".yan .button").attr("disabled", true);
        $(".yan .button").val(this.setTime.countdown + "s");
        this.setTime.countdown--;
        $(".yan .button").addClass("act");
      }
    },
    next() {
      let data = {
        phone: this.new_tel,
        code: this.code
      };
      if (this.code.length < 6) {
        this.$message.error("清输入正确的验证码！");
      } else {
        oldphone(data).then(res => {
          if (res.data.code == 200) {
            this.$router.push({ path: "setModifyPwd" });
            clearInterval(this.setTime.t1);
            $(".yan .button").removeAttr("disabled");
            $(".yan .button").val("获取验证码");
          } else if (res.data.code == 400) {
            this.$message.error("清检查输入的验证码！");
          }
        });
      }
    },
    //创建时
    getData() {
      alterpassword().then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.new_tel = res.data.data.new_tel;
          this.phone = res.data.data.phone;
        }
      });
    }
  },
  components: {
    verifyingphone,
    modifypwd
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
#setvrificationphone >>> .el-tabs__nav-wrap {
  height: 0px;
  background-color: red;
}
#setshopinfo >>> .btn {
  background-color: #1491f2;
}
</style>
<style lang="stylus" scoped>
#setvrificationphone
  .el-header
    margin-left 1px
  .el-breadcrumb
    line-height 60px
  .el-main
    height 100vh
    margin-left 10px
    margin-top 10px
    background-color #FFF
    justify-content center
    align-items center
    display flex
    .main-content
      width 388px
      height 388px
      background-color #fff
      border 1px solid #CCC
      margin-bottom 200px
      color #333
    .top
      background-color #f8f8f8
      height 40px
      line-height 40px
      padding-left 20px
    .cent
      margin-top 50px
      height 40px
      line-height 40px
      .phone
        background-color #f8f8f8
        padding-left 20px
      input
        border none
        height 30px
        font-size 16px
        background-color #f8f8f8
      .yan
        margin-top 10px
        background-color #f8f8f8
        padding-left 20px
        justify-content space-between
        display flex
        input
          width 100px
        .getcode
          input
            margin-right 10px
            border 1px solid #1491f2
            color #FFF
            border-radius 4px
            background-color #1491f2
        .yancode
          input
            outline none
      .next
        width 100%
        text-align center
        margin-top 50px
        button
          width 90px
          background-color #1491f2
          color #FFF
          font-size 14px
</style>