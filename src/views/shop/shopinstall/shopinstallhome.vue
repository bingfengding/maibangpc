
<template>
  <!-- 店铺装修 -->
  <el-container id="shopInstallHome">
    <!-- header头 -->
    <el-header class="bgFFF">
     <el-breadcrumb> 
        <el-breadcrumb-item>
          模板商城
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 主体内容 -->
    <el-main>
      <el-row type="flex" justify="space-between">
        <el-row class="mainBody bgFFF">
          <p>您当前使用的店铺装修模板是“{{userTitle}}”，其他个性化模板可根据您的需求进行选择</p>
          <el-row class="templateLists" type="flex" justify="start">
              <el-col 
                :span="6"
                
                v-for="(item,index) in items" 
                :key="item.id">
                <div class="templateItem">
                  <div class="itemImg">
                  <img :src="item.cover_picture" alt="">
                </div>
                <div class="templateItemFooter">
                  <el-button 
                    size="small"
                    @click="goTo(index)"
                    :type="use_id-2==index?'primary':''"
                  >
                    {{use_id-2==index?'点击编辑':"点击启用"}}
                  </el-button>
                </div>
                <i class="el-icon-circle-check" v-show="use_id-2==index"></i>
                </div>
              </el-col>
          </el-row>
        </el-row>
        
      </el-row>
    </el-main> 
  </el-container>
</template>
<script>
import { collects, detail, useTemplate } from "api/shop/install";
export default {
  data() {
    return {
      use_id: 0,
      dialogVisible: false,
      userTitle: "体验模板",
      shopInstallImg: [],
      items: []
    };
  },
  computed: {
    ifChange() {
      return this.$store.state.shopinstall.if_save;
    }
  },
  watch: {
    ifChange: function() {
      this.templateList();
    }
  },
  created() {
    this.templateList();
  },

  methods: {
    // 获取初始信息
    templateList() {
      collects().then(result => {
        let base = result.data.data;
        this.items = base;
        base.forEach((value, index) => {
          if (value.is_use) {
            console.log(value);
            this.shopInstalContent = value.title;
            this.use_id = value.id;
            this.userTitle = value.title;
          }
        });
      });
    },
    // 模板选择
    goTo(index) {
      // 点击专业版
      if (this.use_id !== index + 2) {
        // 其他时候
        this.$confirm(
          "每次修改模板，微信商城可以直接使用，小程序则需要微信审核，审核期间不影响之前的小程序使用，审核时间预计2-3个工作日。",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        )
          .then(() => {
            useTemplate(index + 2).then(res => {
              if (res.data.code == 200) {
                this.templateList();
                this.$message.success("模板切换成功");
              } else {
                this.$message.error(res.data.error);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消模板切换"
            });
          });
      } else if (this.use_id === 2 && index === 0) {
        detail(this.use_id).then(result => {
          if (result.data.code == 200) {
            if (result.data.data.canUse) {
              this.$store.commit("addinfo_change_template_id", 2);
              this.$router.push({ path: "addinfo2" });
            } else {
              this.$message.error("未订购专业版，请先订购");
            }
          } else {
            this.$message.error(result.data.error);
          }
        });
      } else if (this.use_id === 3 && index === 1) {
        detail(this.use_id).then(result => {
          if (result.data.code == 200) {
            if (result.data.data.canUse) {
              this.$store.commit("addinfo_change_template_id", 3);
              this.$router.push({ path: "addinfo3" });
            } else {
              this.$message.error("未订购专业版，请先订购");
            }
          } else {
            this.$message.error(result.data.error);
          }
        });
      } else if (this.use_id === 4 && index === 2) {
        detail(this.use_id).then(result => {
          if (result.data.code == 200) {
            if (result.data.data.canUse) {
              this.$store.commit("addinfo_change_template_id", 4);
              this.$router.push({ path: "addinfo4" });
            } else {
              this.$message.error("未订购专业版，请先订购");
            }
          } else {
            this.$message.error(result.data.error);
          }
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>

#shopInstallHome
  .el-header
    margin-left 1px
    .el-breadcrumb
      line-height 60px
  .el-main
    padding 10px
    .mainBody
      width 100%
      padding 30px 20px 100px 20px
      min-height 750px
      .templateLists
        position relative
        flex-wrap wrap
        .el-col
          min-width 260px
        .templateItem
          width 234px
          height 476px
          margin 30px 30px 0 0
          padding 5px
          box-shadow 0 2px 6px hsla(0, 0%, 55%, 0.5)
          position relative
          text-align center
          img
            width 100%
            height auto
          .templateItemFooter
            display flex
            width 100%
            justify-content center
            position absolute
            bottom 15px
            margin-left -10px
        .el-icon-circle-check
          color #4dd865
          position absolute
          top -10px
          right -10px
          font-size 40px
          width 40px
          height 40px
          text-align center
          line-height 40px
          border-radius 50%
          background-color #ffffff
</style>
