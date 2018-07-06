<template>
<div id="sidebar" class="bg333">
  <ul class="textCen">
    <li class="bgImg">
      <img :src="bgImg" >
    </li>
    <li v-for="aside in asides" :key="aside.id" @click="changeBg(aside.id)" :class="activeName == aside.id ? 'bgFFF' :''">
      <router-link :to="aside.to" :class="activeName !== aside.id ? 'colorCCC' :''">
        <i class="sidebarIcon bgimg" :style=" activeName == aside.id? aside.urlB : aside.url"></i>
        {{aside.msg}}
      </router-link>
      
   </li>
   <li>
     <el-popover
      placement="top-start"
      :title="username"
      width="150"
      trigger="hover">
      <div class="user-info-nav">
        <ul>
          <li>
            <router-link :to="{path:'/set/userinfo/index'}">
              <span>账号设置</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{path:'/chooseShop'}">
              <span>切换店铺</span>
            </router-link>
          </li>
          <li @click="logout">
            <router-link to="">
              <span>退出登录</span>
            </router-link>
          </li>
        </ul>
      </div>
      <li id="app-user-info" slot="reference">{{userName || username}}</li>
    </el-popover>
   </li>
  </ul>
</div>

</template>
<script>
import { mapGetters } from "vuex";
import { getMerchantNameLogo } from "api/home/home";
import { ws } from "utils/webSocket";
import { setCookie } from "utils/cookies";
export default {
  data() {
    return {
      bgImg: require("../../../assets/icon.png"),
      activeName: "",
      enter: false,
      username: "",
      asides: [
        {
          msg: "概况",
          to: "/home",
          id: "/home",
          url: "background-image:url(" + require("@/assets/aside_01.png") + ")",
          urlB:
            "background-image:url(" + require("@/assets/aside_01b.png") + ")"
        },
        {
          msg: "店铺",
          to: "/shop",
          id: "/shop",
          url: "background-image:url(" + require("@/assets/aside_02.png") + ")",
          urlB:
            "background-image:url(" + require("@/assets/aside_02b.png") + ")"
        },
        {
          msg: "商品",
          to: "/goods",
          id: "/goods",
          url: "background-image:url(" + require("@/assets/aside_03.png") + ")",
          urlB:
            "background-image:url(" + require("@/assets/aside_03b.png") + ")"
        },
        {
          msg: "订单",
          to: "/order",
          id: "/order",
          url: "background-image:url(" + require("@/assets/aside_04.png") + ")",
          urlB:
            "background-image:url(" + require("@/assets/aside_04b.png") + ")"
        },
        {
          msg: "金库",
          to: "/asset",
          id: "/asset",
          url: "background-image:url(" + require("@/assets/aside_05.png") + ")",
          urlB:
            "background-image:url(" + require("@/assets/aside_05b.png") + ")"
        },
        {
          msg: "客户",
          to: "/customer",
          id: "/customer",
          url: "background-image:url(" + require("@/assets/aside_06.png") + ")",
          urlB:
            "background-image:url(" + require("@/assets/aside_06b.png") + ")"
        },
        {
          msg: "数据",
          to: "/data",
          id: "/data",
          url: "background-image:url(" + require("@/assets/aside_07.png") + ")",
          urlB:
            "background-image:url(" + require("@/assets/aside_07b.png") + ")"
        },
        {
          msg: "设置",
          to: "/set",
          id: "/set",
          url: "background-image:url(" + require("@/assets/aside_08.png") + ")",
          urlB:
            "background-image:url(" + require("@/assets/aside_08b.png") + ")"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["userName"]),
    changeImageShop() {
      return this.$store.state.homeInfo.shop_image_change;
    }
  },
  watch: {
    changeImageShop() {
      this.InitializationImg();
    },
    $route(to, from) {
      // let str = to.path;
      // let len = this.asides.length;
      // if (!this.activeName) {
      //   for (let i = 0; i < len; i++) {
      //     let _str = this.asides[i].id;
      //     if (str.search(_str) === 1) {
      //       this.activeName = _str;
      //       return;
      //     }
      //   }
      // }
      // console.log(this.$route.matched);
      // if (this.$route.matched[0].path) {
      this.activeName = this.$route.matched[0].path;

      var appmain = document.getElementById("app-main");
      if (to.path == "/home") {
        this.hide = true;
        appmain.style.marginLeft = "0";
      } else {
        this.hide = false;
        appmain.style.marginLeft = "133px";
      }
      // }
      console.log(this.$store.state.userName);

      if (this.userName) {
        this.username = this.userName;
      } else {
        this.username = localStorage.getItem("userName");
        this.$store.commit("setUserName", this.username);
      }
    }
  },
  created() {
    getMerchantNameLogo().then(res => {
      if (res.data.code == 200) {
        this.bgImg = res.data.data.merchant_logo;
        //是否是创建人
        this.$store.commit("setIsCreater", res.data.data.is_creator);
      }
    });
    this.InitializationImg();
  },
  mounted() {
    // console.log(this.$route);
    let that = this;
    // var activeSidebar = sessionStorage.getItem('activeSidebar')
    this.activeName = this.$route.matched[0].path;
    setTimeout(function() {
      that.getUserName();
    }, 100);
  },
  activated() {
    // console.log('进来了'+this.$store.state.activeSidebar);
  },
  methods: {
    // 重置图片
    InitializationImg() {
      getMerchantNameLogo().then(res => {
        if (res.data.code == 200) {
          this.bgImg = res.data.data.merchant_logo;
        } else {
          this.$message.error(res.data.error);
        }
      });
    },
    changeBg(id) {
      this.activeName = id;
    },
    changeActive(to, from) {
      let str = to.path;
      let len = this.asides.length;
      for (let i = 0; i < len; i++) {
        let _str = this.asides[i];
        str.match(_str);
        this.activeName = _str;
      }
    },
    getUserName() {
      this.username = localStorage.getItem("userName");
    },
    logout() {
      this.$confirm("确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // type: 'warning',
        center: true
      })
        .then(() => {
          ws.close();
          localStorage.clear();
          setCookie("", -1);
          document.title = "汽配帮手";
          this.$router.push({ path: "/login" });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../style/reset.css'
#sidebar
  position fixed
  width 90px
  height 100%
  z-index 30
  li
    margin-bottom 15px
    line-height 40px
    a
      display block
      .sidebarIcon
        display inline-block
        width 20px
        height 20px
        vertical-align middle
        background-position center center
        background-repeat no-repeat
        background-size 100% auto
  li:not(:first-of-type):not(.bgFFF):hover
    background-color #666
  .textCen
    >.bgImg
      height 70px
      margin-bottom 0
      img
        width 40px
        height 40px
        margin-top 15px
  #app-user-info
    background-color #666666
    color #ffffff
    position fixed
    bottom 0
    left 0
    width 90px
    line-height 40px
    margin-bottom 0
    font-size 16px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    padding 0 12px
.user-info-nav
  margin 0 -13px
  border-top 1px solid #cccccc
  li
    line-height 30px
    font-size 16px
    margin 10px 0
    a
      display block
      padding-left 20px
    a:hover
      background-color #1491f2
      color #fff
</style>

