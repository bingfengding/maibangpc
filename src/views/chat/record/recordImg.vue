<template>
   <div class="record_content">
     <div class="noImg" v-if="!img.length > 0">
       <p>暂无图片</p>
     </div>
    <div class="recordImg" v-if="img.length > 0">
         <ul class="chatData">
                       <li style="text-align:left" class="chatMessage_left"  v-for="(item,index) in img" :key="index">
                                 <img :src="item.senderHead">
                                <div :class="{'chatMessage_data':true,'user': isUser == item.senderId}">
                                    <div class="receiverNameAndTime">
                                    <span class="receiverName">{{item.senderName}}</span>
                                    <span>{{item.sendTime}}</span>
                                    </div>
                                  <div class="text">
                                      <div class="icon"></div>
                                      <p v-if="item.messageType != 4">
                                        {{item.content}}
                                      </p>
                                      <img :src="item.content" v-if="item.messageType == 4" class="recordImg">
                                      </div>
                                </div>
                        </li>
                   </ul>
    </div>
    <div class="record_page" v-if="img.length > 0">
         <span class="el-icon-arrow-left"></span>
    </div>
   </div>
</template>
<script>
export default {
    data(){
        return{
          isUser: localStorage.getItem("userId")
        }
    },
    watch:{
        img(val){
           this.$nextTick(()=>{
           document.querySelector(
          ".recordImg"
         ).scrollTop = document.querySelector(".recordImg").scrollHeight;
        })
         
        }
    },
    props:["img"],
}
</script>
<style scoped>
.record_page{
  width: 100%;
  height: 30px;
  background: #f0f0f0;

}
.recordImg{
    overflow-y: auto;
    height: 365px;
}

/* 聊天左边 */
.chatMessage_left {
  display: flex;
  justify-content: flex-start;
  position: relative;
  margin: 15px 15px 15px 10px;
}
.chatMessage_left img {
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  flex: 0 0 30px;
}
.chatMessage_left .chatMessage_data {
  position: relative;
}
.chatMessage_left .chatMessage_data .receiverNameAndTime {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 1;
  width: 200px;
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
  margin: 21px 15px 5px 15px;
  padding: 10px 10px;
  border-radius: 5px;
}
.chatMessage_left .chatMessage_data .text p {
  line-height: 1.5;
  text-align: left;
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
.user .receiverNameAndTime span{
  color: #1491f2 !important;
}
.user .text{
    color: white !important;
    background: #1491f2 !important
}
.user .text .icon {
    border-right-color: #1491f2
}
.noImg{
  color: #cccccc;
  font-size: 14px;
  text-align: center;
  margin-top: 100px;
}
</style>
