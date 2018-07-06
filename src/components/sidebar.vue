<template>
<div id="sidebar" class="bg333">
  <ul class="textCen">
    <li class="bgImg"></li>
    <transition-group name="list" tag="ul">
    <li v-for="aside in asides" :key="aside.id" @click="changeBg(aside.id)" :class="activeName == aside.id ? 'bgFFF' :''">
      <router-link :to="'/'+aside.to" :class="activeName !== aside.id ? 'colorCCC' :''">
        <i class="sidebarIcon bgimg" :style=" activeName == aside.id? aside.urlB : aside.url"></i>
        {{aside.msg}}
      </router-link>
   </li>
    </transition-group>
  </ul>
</div>

</template>
<script>
export default {
  data() {
    return {
      activeName: "",
      enter: false,
      asides: [
        {
          msg: "概况",
          to: "home",
          id: "home",
          url:
            "background-image:url(" + require("../assets/aside_01.png") + ")",
          urlB:
            "background-image:url(" + require("../assets/aside_01b.png") + ")"
        },
        {
          msg: "店铺",
          to: "shop",
          id: "shop",
          url:
            "background-image:url(" + require("../assets/aside_02.png") + ")",
          urlB:
            "background-image:url(" + require("../assets/aside_02b.png") + ")"
        },
        {
          msg: "商品",
          to: "goods",
          id: "goods",
          url:
            "background-image:url(" + require("../assets/aside_03.png") + ")",
          urlB:
            "background-image:url(" + require("../assets/aside_03b.png") + ")"
        },
        {
          msg: "订单",
          to: "order",
          id: "order",
          url:
            "background-image:url(" + require("../assets/aside_04.png") + ")",
          urlB:
            "background-image:url(" + require("../assets/aside_04b.png") + ")"
        },
        {
          msg: "金库",
          to: "asset",
          id: "asset",
          url:
            "background-image:url(" + require("../assets/aside_05.png") + ")",
          urlB:
            "background-image:url(" + require("../assets/aside_05b.png") + ")"
        },
        {
          msg: "客户",
          to: "customer",
          id: "customer",
          url:
            "background-image:url(" + require("../assets/aside_06.png") + ")",
          urlB:
            "background-image:url(" + require("../assets/aside_06b.png") + ")"
        },
        {
          msg: "数据",
          to: "data",
          id: "data",
          url:
            "background-image:url(" + require("../assets/aside_07.png") + ")",
          urlB:
            "background-image:url(" + require("../assets/aside_07b.png") + ")"
        },
        {
          msg: "设置",
          to: "set",
          id: "set",
          url:
            "background-image:url(" + require("../assets/aside_08.png") + ")",
          urlB:
            "background-image:url(" + require("../assets/aside_08b.png") + ")"
        }
      ]
    };
  },

  watch: {
    $route(to, from) {
      let str = to.path;
      let len = this.asides.length;
      if (!this.activeName) {
        for (let i = 0; i < len; i++) {
          let _str = this.asides[i].id;
          if (str.search(_str) === 1) {
            this.activeName = _str;
            return;
          }
        }
      }
    }
  },
  mounted() {},
  methods: {
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
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../style/reset.css'
#sidebar
  position fixed
  width 90px
  height 100%
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
      background-image url('../assets/icon.png')
      background-size 40px auto
      margin-bottom 0
.list-enter-active
  transition all 0.3s
.list-leave-active
  transition all 0.3s
.list-enter
  opacity 0
.list-leave-to
  opacity 0
</style>
