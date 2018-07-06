<template>
    <div class="message">
     <div class="message_item" @mousedown="down(index,$event)" @click="chat(item)" v-for="(item,index) in messageList" :key="index">
         <span class="top" v-if="item.topStatus"></span>
         <span class="noRead" v-if="item.notReadNum != 0">{{item.notReadNum}}</span>
         <div class="message_left">
             <div class="img">
             <img :src="item.receiverHead">
             </div>
             <div class="name">
                 <p class="name_p">{{item.receiverName}}</p>
                 <p class="some_message">{{item.content}}</p>
             </div>
         </div>
          <div class="message_right">
              {{item.sendTime}}
          </div>
          <div class="close" v-if="showClose && activeIndex == index">
              <span @click.stop="setTopFn(1)" v-if="!item.topStatus">置顶聊天</span>
              <span v-if="item.topStatus" @click.stop="setTopFn(0)" >取消置顶</span>
              <span @click.stop="closeThisMessage">移除该会话</span>
          </div>
     </div>
     <div class="noMessage" v-if="messageList.length == 0">
         <p>暂无会话</p>
     </div>
    </div>
</template>
<script>
import {
  getChatList,
  setTop,
  deleteMessageList,
  getchatRecord
} from "@/api/chat/chat";
import { timetrans, b64DecodeUnicode, ws ,change } from "@/utils/webSocket.js";
export default {
  data() {
    return {
      showClose: false,
      user: [],
      messageList: [],
      id: null,
      hide: true,
      id2: null,
      page: 1,
      message: [] //存储信息保存在本地
    };
  },
  watch: {
    update() {
      console.log("收到信息");
      this.page = 1
      this.getChatListFn();
    }
  },
  computed: {
    update() {
      return this.$store.state.chat.update;
    }
  },
  methods: {
    setTopFn(type) {
      //置顶
      let data = {
        id: this.id,
        topStatus: type
      };
      setTop(data).then(res => {
        this.hide = true;
        this.showClose = false;
        this.getChatListFn();
      });
    },
    getChatListFn() {
      let params = {
        page: this.page
      }
      getChatList(params).then(res => {
        // if(!res.data.data.notReadSum){
        //      sessionStorage.removeItem("noReadMessage")
        // }else{
        //      sessionStorage.setItem("noReadMessage",res.data.data.notReadSum)
        // }
        this.$store.dispatch("getNoReadMessage", res.data.data.notReadSum);
        res.data.data.messageList.forEach(val => {
          if (val.messageType == 1) {
            val.content = b64DecodeUnicode(val.content);
          }
          if (val.messageType == 4) {
            val.content = "[图片]";
          }
          if (val.messageType == 2) {
            val.content = "[商品]";
          }
          if(val.messageType == 7){
            val.content = "[订单]"
          }
        });
        if(this.page != 1){
          this.messageList.push(...res.data.data.messageList);
        }else{
          this.messageList=res.data.data.messageList;
        }
        
      });
    },
    chat(item) {
      if(this.$store.state.chat.activeUser){
        if(item.receiverId == this.$store.state.chat.activeUser.receiverId){
          this.$store.dispatch("show", item);
          return;
        }
      }
      this.message = []
      let data = {
        //改变未读状态
        chatType: "userChat",
        page: 1,
        receiverId: item.receiverId
      };
      getchatRecord(data).then(res => {
        let message = [];
        this.getChatListFn();
        res.data.data.forEach(val => {
          val.sendTime = timetrans(val.sendTime);
          if (val.baseType == 1) {
            val.content = b64DecodeUnicode(val.content);
          }
          if (val.messageType == 4) {
            if(val.messageFrom != 7){
              val.content = 'https://image.ymaibang.com/' + val.content;
            }else{
              val.content = val.content;
            }
          }
          if (val.messageType == 2) {
            val.content = JSON.parse(val.content);
          }
          if(val.messageType == 7){
            val.content = JSON.parse(val.content)
          }
          if (val.senderId == localStorage.getItem("userId")) {
            //是本人发送的
            this.message.push(change(val.messageType,val.sendTime,val.content)) 
          } else {
             this.message.push(change(val.messageType,val.sendTime,val.content,'receive'))
          }
        });
        sessionStorage.setItem(item.receiverId,JSON.stringify(this.message))
        this.$store.dispatch("show", item);
      });
    },

    storage(id, data) {
      sessionStorage.setItem(id, JSON.stringify(data));
    },
    down(index, e) {
      this.id = this.messageList[index].id;
      if (this.messageList[index].id != this.id2) {
        this.id2 = this.messageList[index].id;
        this.showClose = false;
      }
      if (this.hide) {
        this.showClose = false;
      }
      this.activeIndex = index;
      if (e.button == 2) {
        this.showClose = true;
        this.hide = false;
        document.oncontextmenu = function(e) {
          return false;
        };
      }
    },
    closeThisMessage() {
      let data = {
        id: this.id
      };
      deleteMessageList(data).then(res => {
        this.hide = true;
        this.showClose = false;
        this.getChatListFn();
      });
    },
   
  },
  mounted() {
    let that = this;
    document.addEventListener("click", function(event) {
      that.showClose = false;
    });
    //   this.getChatListFn()
    window.addEventListener("scroll",function(){ //滚动加载聊天列表
       if(document.querySelector(".message").scrollTop > that.page * 800){
        that.page++
        that.getChatListFn();
      }
    },true)
  },
  activated() {
    this.getChatListFn();
  }
};
</script>

<style scoped>
.message {
  cursor: default;
  height: 450px;
  overflow-y: auto;
  background: white;
}
/* .chat_item {
  height: 450px;
  overflow-y: auto
} */
.message_item {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px 10px;
  position: relative;
}
.close {
  position: absolute;
  width: 150px;
  height: 60px;
  background-color: #ffffff;
  border: solid 1px #e5e5e5;
  bottom: -40px;
  left: 130px;
  z-index: 10;
}
.close span {
  display: block;
  height: 30px;
  line-height: 30px;
  color: #333333;
  font-size: 14px;
  padding-left: 20px;
}
.close span:hover {
  background-color: #e5e5e5;
}
.message_item:hover {
  background-color: #f2f2f2;
}
.message_left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 0 0 200px;
}
.name {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 44px;
  margin-left: 10px;
}
.name p {
  width: 10em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.some_message {
  font-size: 12px;
  color: #cccccc;
  width: 12em;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.img img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}
.message_right {
  color: #cccccc;
  font-size: 12px;
  flex: 1;
  text-align: right;
}
.top {
  top: 5px;
  left: 0;
  position: absolute;
  display: block;
  border-left: 12px solid #1491f2;
  border-top: 0px solid transparent;
  border-bottom: 12px solid transparent;
}
.noMessage {
  text-align: center;
  font-size: 14px;
  color: #cccccc;
  padding-top: 100px;
}
.noRead {
  position: absolute;
  right: 20px;
  min-width: 17px;
  max-height: 17px;
  border-radius: 50%;
  background: #f56c6c;
  bottom: 10px;
  color: white;
  font-size: 10px;
  text-align: center;
  line-height: 17px;
}
</style>
