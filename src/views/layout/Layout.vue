<template>
  <div class="app-wrapper">
      <sidebar></sidebar>
        <el-container class="container">
          <bar v-if="$route.name != 'home'"></bar>
          <app-main></app-main>
          <usinghelp></usinghelp>
        </el-container>
        <!-- 聊天组件 -->
        <send-message></send-message>
        <web-chat></web-chat>
        <mysmall></mysmall>
        <small-chat></small-chat>
        <share></share>
        <!-- 聊天 end -->
  </div>
</template>

<script>
import sidebar from "./components/sidebar";
import bar from "./components/navigationBar";
import AppMain from "./components/AppMain";
import usinghelp from "./components/usinghelp";
import webChat from "../chat/webChat";
import sendMessage from "../chat/sendMessage";
import mysmall from "../chat/small";
import smallChat from "../chat/smallWebChat";
import share from "../share/share";
import { ws } from "utils/webSocket"
export default {
  components: {
    AppMain,
    sidebar,
    bar,
    webChat,
    sendMessage,
    mysmall,
    smallChat,
    share,
    usinghelp
  },
  beforeCreate() {
    if (localStorage.getItem("shop_name")) {
      document.title = localStorage.getItem("shop_name");
    }
  },
  methods:{
    init(){
       this.$store.dispatch("show");
      this.$store.dispatch("close");
      this.$store.dispatch("closeWebChat");
    },
  },
  mounted(){
    window.addEventListener("beforeunload",function(e){ //当浏览器关闭 关闭websocket连接
      ws.close()
    })
  },
  created(){
    this.init()
  }
};
</script>

<style lang="stylus">
.app-wrapper
  position relative
  height 100%
  width 100%
.container
  margin-left 90px
  height 100%
  position relative
  overflow scroll
.app-right
  width 300px
  background white
  border-left 1px solid #cccccc
  height 100%
</style>
