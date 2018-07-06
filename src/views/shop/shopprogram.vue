<template>
  <!-- 公众号 -->
  <el-container id="shopProgram">
    <!-- header头 -->
    <el-header class="bgFFF">
     <el-breadcrumb>
  
        <el-breadcrumb-item>
          微信小程序
        </el-breadcrumb-item>
        
      </el-breadcrumb>
    </el-header>
    <!-- 主体内容 -->
    <el-main>
      <el-row type="flex" justify="space-between">
        <el-row class="mainBody bgFFF">
          <el-row type="flex" justify="space-between">
            <el-col :span="10" class="shopBinding">
              <p class="colorGreen">绑定微信小程序号，把店铺和微信打通</p>
              <p>绑定后即可在这里管理你的小程序，汽配帮手提供比微信官方后台更强大的功能！</p>
              <div>
                <el-button type="success" @click="bindingPublic">我有微信小程序,立即设置</el-button>
              </div>
            </el-col>
            <el-col :span="6" class="font14 shopPrompt">
              <p>温馨提示：</p>
              <ul>
                <li>
                  一个小程序只能和一个店铺绑定
                </li>
                <li>
                  为保证所有功能正常，授权时请保持默认选择，把权限统一授权给汽配帮手
                </li>
              </ul>
              
              
            </el-col>
          </el-row>
          
        </el-row>
   
      </el-row>
    </el-main>
    
  </el-container>
</template>
<script>
import { getMerchantNameLogo } from "api/home/home";
export default {
  data() {
    return {
      storeId: 0
    };
  },
  mounted() {
    this.storeId = window.localStorage.getItem("storeId");
  },
  created() {
    this.initial();
  },
  methods: {
    //  重置数据
    initial() {
      // 获取店铺信息
      getMerchantNameLogo().then(res => {
        if (res.data.code == 200) {
          this.isMerchantOrderServic = res.data.data.isMerchantOrderServic;
        } else {
          this.$message.error(res.data.error);
        }
      });
    },
    bindingPublic() {
      if (this.isMerchantOrderServic) {
        window.open(
          `https://weixin.ymaibang.com/open/component_start_auth.php?merchant_id=${
            this.storeId
          }&auth_type=2`
        );
        this.$confirm("请在新窗口中完成微信小程序授权", "提示", {
          cancelButtonText: "已成功设置",
          confirmButtonText: "授权失败,重试"
        })
          .then(() => {
            this.bindingPublic();
          })
          .catch(() => {});
      } else {
        this.$message.error("请先订购专业版");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
#shopProgram
  .el-header
    margin-left 1px
    .el-breadcrumb
      line-height 60px
  .el-main
    padding 10px
    .mainBody
      width 100%
      padding 50px 30px 100px 30px
      min-height 750px
      .shopPrompt
        padding-top 50px
        ul, li
          list-style disc
      .shopBinding
        p:nth-of-type(2)
          margin 30px 0
</style>

