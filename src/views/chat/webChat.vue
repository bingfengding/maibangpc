<template>
    <div class="chat">
        <div class="chat_content" v-show="$store.state.chat.isShowChat" v-drag :style="{position:'fixed',
        width:'300px',
        height:'570px',
        bottom:0,
        right:0,
        cursor: 'move' ,
        background:'white'}">
      <div class="chat_header">
          <div class="chat_user">
              <img :src="$store.state.usersModule.userAvatar ? this.$store.state.usersModule.userAvatar : userAvatar">
              <p>{{$store.state.usersModule.userName ? this.$store.state.usersModule.userName : userName}}</p>
          </div>
          <span class="el-icon-close" @click.stop="closeWebchat"></span>
      </div>
      <div class="chat_container" @mousedown.stop="stopDown">
           <div class="chat_nav">
             <div  :class="{active: active == 'message'}" @click="active = 'message'">
               <el-badge :value="$store.state.chat.noRead" class="item">
               <span >
                   <img src="../../images/chat/xinxi.png">
               </span>
               </el-badge>
             </div>
             <div   :class="{active: active == 'order'}" @click="active = 'order'">
               <el-badge  class="item">
              <span>
                   <img src="../../images/chat/dingdan.png">
               </span>
               </el-badge>
             </div>
             <div  :class="{active: active == 'notice'}" @click="active = 'notice'">
               <el-badge  class="item">
               <span>
                   <img src="../../images/chat/tongzhi.png">
               </span>
               </el-badge>
             </div>
           </div>
           <div class="chat_item">
              <keep-alive><message v-if="active == 'message'"></message></keep-alive>
              <keep-alive><order-message v-if="active == 'order'"></order-message></keep-alive>
              <keep-alive><notice v-if="active == 'notice'"></notice></keep-alive>
           </div>
      </div>
        </div>
    </div>
</template>
<script>
// message : 聊天列表  recordText:聊天记录 smallWebChat:最小化通知中心 small：最小化聊天框 sendMessage:发送聊天窗口
import { mapGetters } from "vuex";
import message from "./message"; 
import orderMessage from "./orderMessage";  //订单
import notice from "./notice"; //通知
export default {
  data() {
    return {
      active: "message",
      userName: localStorage.getItem("userName"),
      noReadNum: sessionStorage.getItem("noReadMessage"),
      noReadNotice: null
    };
  },
  components: {
    message,
    orderMessage,
    notice
  },

  computed: {
    noRead() {
      return sessionStorage.getItem("noReadMessage");
    },
    userAvatar() {
      return localStorage.getItem("userAvatar");
    },
    getterUserName() {
      return this.$store.getters.userName;
    },
    avatar(){
      return this.$store.state.UsersModule.userAvatar
    }
  },
  watch: {
    noReadNum(val) {
      this.noReadNum = val;
    },
    getterUserName() {
      this.userName = this.$store.getters.userName;
    },
  },
  directives: { //自定义指令 拖拽
    drag: function(box) {
      box.onmousedown = function(ev) {
        var disX = ev.clientX - box.offsetLeft;
        var disY = ev.clientY - box.offsetTop;
        document.onmousemove = function(ev) {
          var l = ev.clientX - disX;
          var t = ev.clientY - disY;
          box.style.left = l + "px";
          box.style.top = t + "px";
          if (parseInt(box.style.left) + 300 >= document.body.clientWidth) {
            box.style.left = document.body.clientWidth - 300 + "px";
          }
          if (parseInt(box.style.left) <= 0) {
            box.style.left = 0 + "px";
          }
          if (parseInt(box.style.top) + 570 >= document.body.clientHeight) {
            box.style.top = document.body.clientHeight - 570 + "px";
          }
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  },
  methods: {
    stopDown() {}, //可阻止其它部位的拖拽
    closeWebchat() { //关闭窗口
      this.$store.dispatch("closeWebChat");
    }
  },
};
</script>


<style scoped>
.chat_content {
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
  z-index: 10;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.chat_header {
  width: 300px;
  height: 80px;
  background-color: #cccccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.chat_header span {
  font-size: 20px;
  color: black;
  font-weight: 500;
  cursor: pointer;
}
.chat_user {
  display: flex;
  align-items: center;
}
.chat_user img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}
.chat_nav {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  color: #666666;
  background: #cccccc;
}
.chat_nav div {
  flex: 1;
  text-align: center;
  cursor: pointer;
  height: 40px;
}
.chat_nav .active {
  border-bottom: 3px solid #1491f2;
}

.chat >>> .el-badge__content {
  border: 0px !important;
}
</style>
