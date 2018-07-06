<template>
   <div class="record_content">
      <div class="noText" v-if="type == 'all' && record.length == 0">
       <p>暂无聊天记录</p>
     </div>
     <div class="noText" v-if="type == 'img' && record_img.length == 0">
       <p>暂无图片</p>
     </div>
    <div class="recordText"  v-if="record">
         <ul class="chatData" v-if="type != 'img'">
                       <li style="text-align:left" class="chatMessage_left"  v-for="(item,index) in record" :key="index">
                                 <img :src="item.senderHead" class="head">
                                <div :class="{'chatMessage_data':true,'user': isUser == item.senderId}">
                                    <div class="receiverNameAndTime">
                                    <span class="receiverName">{{item.senderName}}</span>
                                    <span>{{item.sendTime}}</span>
                                    </div>
                                  <div :class="{'text':true,'productData':item.messageType == 2 || item.messageType == 7}" >
                                      <div class="icon"></div>
                                      <p v-if="item.messageType == 1">
                                        {{item.content}}
                                      </p>
                                      <img :src="item.content" v-if="item.messageType == 4" class="recordImg">
                                       <div class="product_item" v-if="item.messageType == 2" @click="goToProduct(item.productId)">
                                        <p>{{item.content.productName}}</p>
                                        <div class="product_more">
                                          <div class="product_left">
                                            <p>商品编码:{{item.content.productNum}}</p>
                                            <p>￥{{item.content.productPrice}}</p>
                                          </div>
                                          <div class="product_right">
                                            <img :src="item.content.productImg">
                                          </div>
                                        </div>
                                      </div>
                                      <div class="order_item" v-if="item.messageType == 7" @click="goOrddetail(item.content.orderId)">
                                        <p>订单号:{{item.content.orderNum}}</p>
                                        <div class="order_more">
                                          <div class="order_left">
                                            <p>{{item.content.receiver}}</p>
                                            <p>{{item.content.receivingAddress}}</p>
                                          </div>
                                        </div>
                                      </div>
                                   </div>
                               
                                </div>
                        </li>
                   </ul>
                   <ul class="chatData" v-if="type == 'img'">
                       <li style="text-align:left" class="chatMessage_left"  v-for="(item,index) in record_img" :key="index">
                                 <img :src="item.senderHead"  class="head">
                                <div :class="{'chatMessage_data':true,'user': isUser == item.senderId}">
                                    <div class="receiverNameAndTime">
                                    <span class="receiverName">{{item.senderName}}</span>
                                    <span>{{item.sendTime}}</span>
                                    </div>
                                  <div class="text">
                                      <div class="icon"></div>
                                      <img :src="item.content" v-if="item.messageType == 4" class="recordImg">
                                      </div>
                                </div>
                        </li>
                   </ul>
    </div>
    <div class="record_page"  v-if="record">
      <a title="上一页"><el-button icon="el-icon-arrow-left"  type="text" @click="last" :disabled="noLast"></el-button></a>
      <a title="下一页"><el-button icon="el-icon-arrow-right"  type="text" @click="next" :disabled="noNext"></el-button></a>
    </div>
   </div>
</template>
<script>
import { getchatRecord } from "@/api/chat/chat";
import { timetrans, b64DecodeUnicode } from "@/utils/webSocket.js";
export default {
  data() {
    return {
      isUser: localStorage.getItem("userId"),
      page: 1,
      record: [],
      noLast: false,
      noNext: true,
      record_img: [],
      imgDialog: false,
      dialogImageUrl: null
    };
  },
  watch: {
    text(val) {
     let that = this
     setTimeout(function(){
        that.$nextTick(() => {
          // alert(document.querySelector(".chatData").scrollHeight)
           console.log(document.querySelector(".recordText").scrollHeight)
           document.querySelector(".recordText").scrollTop = document.querySelector(".recordText").scrollHeight;
        });
     },200)
    },
    page(val) {
      if (val == 1) {
        this.noNext = true;
      } else {
        this.noNext = false;
      }
      this.getChatRecordFn();
    },
    record() {
     let that = this
     setTimeout(function(){
        that.$nextTick(() => {
          // alert(document.querySelector(".chatData").scrollHeight)
           console.log(document.querySelector(".recordText").scrollHeight)
           document.querySelector(".recordText").scrollTop = document.querySelector(".recordText").scrollHeight;
        });
     },200)
    },
    type(val) {
     let that = this
     setTimeout(function(){
        that.$nextTick(() => {
          // alert(document.querySelector(".chatData").scrollHeight)
           console.log(document.querySelector(".recordText").scrollHeight)
           document.querySelector(".recordText").scrollTop = document.querySelector(".recordText").scrollHeight;
        });
     },200)
      this.page = 1
      this.getChatRecordFn()
      console.log(val);
    }
  },
  props: ["type"],
  methods: {
    goToProduct(id){
      this.$router.push({path:'/goods/publishProduct/productpreview',query: {id:id}})
    },
    goOrddetail(id) {
      this.$router.push({ path: "/order/orddetail", query: { id: id } });
    },
    showImg(url){
      this.imgDialog = true
      this.dialogImageUrl = url
    },
    last() {
      this.page++;
    },
    next() {
      this.page--;
    },
    getChatRecordFn() {
      let data = {
        chatType: "userChat",
        page: this.page,
        receiverId: this.$store.state.chat.activeUser.receiverId
      };
      getchatRecord(data).then(res => {
        this.record_img = []
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
            this.record_img.push(val);
          }
          if(val.messageType == 2){
            val.content = JSON.parse(val.content)
          }
           if(val.messageType == 7){
            val.content = JSON.parse(val.content)
          }
        });
        this.record = res.data.data;
        console.log(this.record)
        if (this.record.length < 20) {
          this.noLast = true;
        } else {
          this.noLast = false;
        }
      });
    }
  },
  mounted() {
    this.getChatRecordFn();
  }
};
</script>
<style scoped>
.record_content{
  height: calc(100% - 153px);
  width: 315px
}
.record_page {
  width: 100%;
  height: 30px;
  background: #f0f0f0;
  text-align: center;
  color: black;
  line-height: 30px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.record_page >>> .el-button--text {
  margin: 0 10px;
  color: black;
  font-size: 22px;
  font-weight: bold;
}
.record_page >>> .el-button--text:hover {
  color: #1491f2;
}
.recordText {
  overflow-y: auto;
  height: 100%;
}
.recordImg {
  width: 100px;
  border-radius: 0 !important;
}
/* 聊天左边 */
.chatMessage_left {
  display: flex;
  justify-content: flex-start;
  position: relative;
  margin: 15px 0;
}
.head {
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  flex: 0 0 30px;
}
.chatMessage_left .chatMessage_data {
  position: relative;
  padding-top: 18px;
}
.chatMessage_left .chatMessage_data .receiverNameAndTime {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 1;
  width: 265px;
}
.chatMessage_left .chatMessage_data span {
  color: #999999;
  font-size: 12px;
}
.chatMessage_left .chatMessage_data .receiverNameAndTime .receiverName {
  padding: 0 15px;
}
.chatMessage_left .chatMessage_data .text {
  color: #333333;
  font-size: 14px;
  background-color: #f0f0f0;
  color: #333333;
  /* margin: 21px 15px 5px 15px; */
  padding: 10px 10px;
  margin-left: 15px;
  border-radius: 5px;
  height: 100%;
}
.chatMessage_left .chatMessage_data .text p {
  line-height: 1.5;
  text-align: left;
  word-break: break-word;
}
.chatMessage_left .icon {
  width: 0;
  height: 0;
  border-right: 23px solid #f0f0f0;
  border-top: 0px solid transparent;
  border-bottom: 12px solid transparent;
  position: absolute;
  left: 0;
  top: 40px;
}
.user .receiverNameAndTime span {
  color: #1491f2 !important;
}
.user .text {
  color: white !important;
  background: #1491f2 !important;
}
.user .text .icon {
  border-right-color: #1491f2;
}
.noText {
  color: #cccccc;
  font-size: 14px;
  text-align: center;
  margin-top: 100px;
}
/* 聊天的订单样式 */
.order_item {
  width: 200px;
  height: 60px;
  cursor: pointer;
}
.order_item p {
  color: #333333;
  font-size: 14px;
  width: 14em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.order_left p {
  font-size: 12px;
  color: #777777;
  width: 14em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 聊天的商品样式 */
.product_item {
  width: 200px;
  height: 70px;
  cursor: pointer;
}
.productText {
  background-color: #f2f2f2 !important;
}
.productIcon {
  border-left: 23px solid #f2f2f2 !important;
}
.product_item p {
  /* color: white; */
  font-size: 14px;
  width: 10em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product_item .product_more {
  display: flex;
  justify-content: space-between;
}
.product_right img{
  width: 50px;
  height: 50px;
  border-radius: 0%;
}
</style>
