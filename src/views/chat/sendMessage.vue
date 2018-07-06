<template>
  <div v-show="$store.state.chat.show">
    <div :class="{'chat': !big,'bigChat': big}" v-show="$store.state.chat.show" v-drag >
        <div :class="{'chat_left': !big,'bigChat_left': big}" v-if="$store.state.chat.userArr.length > 1" @mousedown.stop="down">
            <ul>
                <li v-for="(item,index) in $store.state.chat.userArr" :key="index" :class="{'userList': true,'active': item.receiverName == $store.state.chat.activeUser.receiverName }"
                 @click="select(item)">
                    <div class="user">
                        <img :src="item.receiverHead">
                         <span class="leftUserList">{{item.receiverName}}</span>
                    </div>
                    <span class="el-icon-circle-close closeThis" @click.stop="closeThis(item)"></span>
                </li>
            </ul>
        </div>
        <div :class="{'chat_right': !big,'bigChat_right': big}">
            <div class="chat_header">
                <div class="chat_header_user" @mousedown.stop="down">
                    <div class="avatar">
                        <img :src=" $store.state.chat.activeUser.receiverHead">
                    </div>
                    <span>{{name}}</span>
                </div>
                <div class="close" @mousedown.stop="down">
                    <a href="#" title="最小化"><span class="el-icon-minus" @click.stop="small"></span></a>
                    <a href="#" title="最大化"><span @click.stop="bigWin" v-if="!big"><img src="../../images/chat/fang.png"></span></a>
                    <a href="#" title="向下还原"><span @click.stop="smallWin" v-if="big"><img src="../../images/chat/suo.png"></span></a>
                    <a href="#" title="关闭"><span @click="close" class="el-icon-close close"></span></a>
                </div>
            </div>
            <div  @mousedown.stop="down" :class="{'chat_content': !big,'bigChat_content': big}">
              <div class="sendOrderBox" v-if="isShowSendOrderBox">
                <span>订单号: {{$store.state.chat.activeUser.order_num}}</span>
                <span>
                  <span class="sendOrderBtn" @click="sendOrder">发送</span>
                  <span class="el-icon-circle-close-outline" @click="closeIsShowSendOrderBox" style="cursor:pointer;font-size:16px"></span>
                </span>
              </div>
               <span class="el-icon-time getMoreMessage" @click="getMoreMessage" v-if="activeMessage && activeMessage.length == 20 && moreMessage">查看更多信息</span>
                   <ul class="chatData">
                       <!-- <li style="text-align:left" class="chatMessage_left"  v-for="(item,index) in myMessage" :key="index" v-if="item.type == 'receive'">
                                 <img :src=" $store.state.chat.activeUser.receiverHead">
                                <div class="chatMessage_data">
                                    <div class="receiverNameAndTime">
                                    <span class="receiverName">{{name}}</span>
                                    <span>2018-3-15 9:00</span>
                                    </div>
                                  <div class="text">
                                      <div class="icon"></div>
                                      <p>
                                        {{item.content}}
                                      </p>
                                      </div>
                                </div>
                        </li> -->
                        <li :class="{'chatMessage_right':item.messageType != 'receive','chatMessage_left': item.messageType == 'receive'} " v-for="(item,index) in myMessage" :key="index">
                                <img :src="userImg" v-if="item.messageType != 'receive'">
                                <img :src=" $store.state.chat.activeUser.receiverHead" v-if="item.messageType == 'receive'">
                                <div class="chatMessage_data">
                                    <div class="receiverNameAndTime">
                                    <span class="receiverName" v-if="item.messageType != 'receive'">{{userName}}</span>
                                     <span class="receiverName" v-if="item.messageType == 'receive'">{{name}}</span>
                                    <span>{{item.time}}</span>
                                    </div>
                                  <div :class="{'text': true,'productText':item.type == 'product' || item.type == 'order' }"  @click="showImg(item)">
                                      <div :class="{'icon':true,'productIcon': item.messageType != 'receive' && item.type == 'product' ||  item.messageType != 'receive' && item.type == 'order'}"></div>
                                      <p v-if="item.type != 'product' && item.type != 'img' && item.type != 'order'">
                                        <span v-if="!item.type && item.type != 'img'">{{item.content}}</span>
                                        <span v-if="item.type && item.type != 'img'" style="font-size:14px">{{item.content}}</span>
                                      </p>
                                      <div class="product_item" v-if="item.type == 'product'" @click="goToProduct(item.productId)">
                                        <p>{{item.productName}}</p>
                                        <div class="product_more">
                                          <div class="product_left">
                                            <p>商品编码:{{item.productNum}}</p>
                                            <p>￥{{item.productPrice}}</p>
                                          </div>
                                          <div class="product_right">
                                            <img :src="item.productImg" style="cursor:pointer">
                                          </div>
                                        </div>
                                      </div>
                                      <div class="order_item" v-if="item.type == 'order'" @click="goOrddetail(item.orderId,item.messageType)">
                                        <p>订单号:{{item.orderNum}}</p>
                                        <div class="order_more">
                                          <div class="order_left">
                                            <p>{{item.receiver}}</p>
                                            <p>{{item.receivingAddress}}</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="img_message" v-if="item.type == 'img'">
                                        <img :src="item.content" class="img_message">
                                      </div>
                                      </div>
                                </div>
                        </li>
                   </ul>
            </div>
            <div class="char_footer" @mousedown.stop="down">
                <div class="char_footer_header">
                    <div class="select">
                        <div class="selectImg">
                          <el-upload
                        action="123"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        :before-upload="beforeUpload"
                        accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG.GIF,"
                        multiple>
                          <span class="selectBtn"><img src="../../images/chat/img.png"></span>
                        </el-upload>
                        </div>
                        <span class="el-icon-goods" @click="showProduct"></span>
                    </div>
                    <div class="chatList">
                        <span class="el-icon-time"></span>
                        <span class="show_record" @click="showRecord">聊天记录</span>
                    </div>
                </div>
                <div class="char_footer_content" >
                    <textarea class="textarea" autofocus="autofocus" v-model="text" @keyup.enter="send"></textarea>
                </div>
                <div class="char_footer_footer">
                    <el-button size="small" class="btn" @click="close">关闭</el-button>
                    <el-button size="small" class="btn" @click.stop="send">发送</el-button>
                    <el-popover
                    placement="bottom"
                    width="280"
                    trigger="click">
                    <span class="commonText" @click="commonTextBtn(item)">
                      <span class="text">您好，请问有什么可以帮助到您的？</span>
                    </span>
                    <span class="commonText" @click="commonTextBtn(item)">
                      <span class="text">关注我们的微商城，实时获取最新商品哦！</span>
                    </span>
                    <span class="commonText" @click="commonTextBtn(item)" v-for="(item,index) in commonText" :key="index">
                      <span class="text">{{item}}</span>
                      <span class="el-icon-circle-close-outline" @click.stop="delCommonText(index)"></span>
                    </span>
                    <span class="createText" @click="showCommonDialog">添加常用语</span>
                     <span class="el-icon-caret-bottom selectText" slot="reference" @click="getCommonText"></span>
                    </el-popover>
                </div>
            </div>
        </div>
        <div class="record" v-if="isShowRecord"  @mousedown.stop="down">
           <div class="record_header"></div>
           <div class="record_nav">
             <span>信息记录</span>
             <span class="el-icon-close close_record" @click="showRecord"></span>
           </div>
           <div class="record_table">
             <span @click="showRecordType('all')" :class="{'active': recordType == 'all'}">全部</span>
             <span @click="showRecordType('img')" :class="{'active': recordType == 'img'}">图片</span>
           </div>
              <recordtext :type="recordType"></recordtext>
              <!-- <recordimg v-if=" recordType == 'img'"></recordimg> -->
        </div>
        
    </div>
    <div class="dislog">
    <el-dialog title="选择商品" :visible.sync="productDialog" width="400px" :before-close="clear">
      <div class="search">
        <el-input
          placeholder="输入你想要找的商品"
          v-model="searchProduct"
         >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div class="product">
          <p v-if="!listSum" style="text-align:center;padding-top:50px">暂无商品</p>
          <el-checkbox-group v-model="checkProductArr"  @change="checkProduct">
            <el-checkbox :label="item" v-for=" (item,index) in productList" :key="index">
              <div class="product_data">
                <img :src="item.productImg" width="50" height="50">
                <div class="product_text">
                  <p style="color: #333333;font-size: 14px;">{{item.productName}}</p>
                  <p style="color: #666666;font-size: 12px;">编码：{{item.productNum}}</p>
                </div>
              </div>
              
            </el-checkbox>
          </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer" v-if="listSum">
         <div class="pagination">
              <el-pagination
                layout="prev, pager, next"
                 @current-change="handleCurrentChange"
                :total="total">
            </el-pagination>
        </div>
        <el-button type="primary" @click="sendProduct" size="small">发送</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="commonTextDialog" width="400px" title="添加常用语" center="">
      <el-input v-model="createCommonText"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="commonTextDialog = false">取 消</el-button>
        <el-button type="primary" @click="createCommonTextBtn">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="imgDialog">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    </div>
  </div>
</template>
<script>
//实现思路： 如果服务器接收到信息会向我发送通知，以此来刷新界面
import { getchatRecord, productList } from "@/api/chat/chat";
import {
  b64EncodeUnicode,
  ws,
  b64DecodeUnicode,
  timetrans,
  change
} from "@/utils/webSocket.js";
import {imgUploads} from '@/api/goods/goods'
import recordtext from "./record/recordText";
import recordimg from "./record/recordImg";
export default {
  data() {
    return {
      showChat: false,
      createCommonText: null, //常用语
      imgDialog: false,
      productDialog: false,
      dialogImageUrl: null,
      commonText: [],
      text: null,
      myMessage: [],
      big: false,
      isShowRecord: false,
      userName: localStorage.getItem("userName"),
      userImg: localStorage.getItem("userAvatar"),
      websock: null,
      recordType: "all",
      record_img: [],
      productList: [],
      page: 1,
      checkProductArr: [],
      name: null,
      searchProduct: null,
      listSum: null,
      total: 0,
      inmgList:[],
      moreMessage: [],
      isShowSendOrderBox: false,
      commonTextDialog: false,
    };
  },
  computed: {
    changeActive() {
      return this.$store.state.chat.activeUser;
    },
    update() { //检测是否需要更新
      return this.$store.state.chat.update;
    },
    activeMessage(){
      return JSON.parse(sessionStorage.getItem(this.$store.state.chat.activeUser.receiverId))
    },
    commonTextLocalStorage(){
      return this.commonText.concat(JSON.parse(localStorage.getItem("commonText")))
    }
  },
  watch: {
    update() { //检测是否需要更新
        this.myMessage = JSON.parse(
          sessionStorage.getItem(this.$store.state.chat.activeUser.receiverId)
        );
        this.scrollTop()
    },
    changeActive: {
      handler: function(newVal, oldVal) { //深度监听当前窗口的改变
        this.isShowSendOrderBox = newVal.orderId ? true :false //如果是发送订单
        newVal.orderId ? this.orderChat() : ''
        //如果当前聊天改变
        let myMessage = JSON.parse(sessionStorage.getItem(newVal.receiverId)) ? JSON.parse(sessionStorage.getItem(newVal.receiverId)) : [];
        this.myMessage = myMessage;
        console.log(this.myMessage)
        this.name = newVal.receiverName;
        this.record_img = [];
        this.page = 1
        this.isShowRecord = false;
        this.moreMessage = true
        this.scrollTop()
      },
      deep: true
    },
    // myMessage() {
    //   this.$nextTick(() => {
    //     alert(document.querySelector(".chatData").scrollHeight + 42)
    //         document.querySelector(
    //           ".chat_content"
    //         ).scrollTop = document.querySelector(".chatData").scrollHeight + 42;
    //       });
    // },
    searchProduct(val) {
      console.log(val);
      this.getProduct();
    }
  },
  components: { recordtext, recordimg },
  methods: {
    getCommonText(){
      let text = localStorage.getItem("commonText") ? JSON.parse(localStorage.getItem("commonText")) : []
      this.commonText = text
    },
    showCommonDialog(){ //添加常用语
     this.commonTextDialog = true
    },
    delCommonText(index){ //删除常用语
      this.commonText.splice(index,1)
      localStorage.setItem("commonText", this.commonText)
    },
    createCommonTextBtn(){
      if(!this.createCommonText){
        this.$message({
          type: 'error',
          message: "不能为空！"
        })
        return;
      }
      let text = localStorage.getItem("commonText") ? JSON.parse(localStorage.getItem("commonText")) : []
      text.push(this.createCommonText)
      localStorage.setItem("commonText",JSON.stringify(text))
       this.commonTextDialog = false
       this.$message({
         type: 'success',
         message: "添加成功！"
       })
    },
    orderChat() { //如果是发送订单就请求聊天记录
      let data = {
        //改变未读状态
        chatType: "userChat",
        page: 1,
        receiverId: this.$store.state.chat.activeUser.receiverId
      };
      getchatRecord(data).then(res => {
        let message = [];
        res.data.data.forEach(val => {
          val.sendTime = timetrans(val.sendTime);
          if (val.baseType == 1) {
            val.content = b64DecodeUnicode(val.content);
          }
          if (val.messageType == 4) {
            if(val.messageFrom != 7){
              val.content = 'https://image.ymaibang.com/' + val.content;
              return;
            }
            val.content = val.content;
          }
          if (val.messageType == 2) {
            val.content = JSON.parse(val.content);
          }
          if(val.messageType == 7){
            val.content = JSON.parse(val.content)
          }
          if (val.senderId == localStorage.getItem("userId")) {
            //是本人发送的
            message.push(change(val.messageType,val.sendTime,val.content)) 
          } else {
             message.push(change(val.messageType,val.sendTime,val.content,'receive'))
          }
        });
        sessionStorage.setItem(this.$store.state.chat.activeUser.receiverId,JSON.stringify(message))
         this.myMessage = JSON.parse(
          sessionStorage.getItem(this.$store.state.chat.activeUser.receiverId)
        );
        this.scrollTop()
      });
    },
    sendOrder(){ //发送订单
      this.sendData(JSON.stringify(this.$store.state.chat.activeUser.orderId),7)
      this.storage({ 
        receiver: this.$store.state.chat.activeUser.order_name, 
        time: null,
        type: 'order',
        receivingAddress:this.$store.state.chat.activeUser.rec_address,
        orderNum:this.$store.state.chat.activeUser.order_num ,
        orderId:this.$store.state.chat.activeUser.orderId
      });
      this.isShowSendOrderBox = false
    },
    closeIsShowSendOrderBox(){ //关闭发送订单box
       this.isShowSendOrderBox = false
    },
    showImg(item){
      if(item.type != 'img'){
          return;
      }
      this.dialogImageUrl = item.content
      this.imgDialog = true
    },
    scrollTop(){ //让滚动条保持底部
     let that = this
     setTimeout(function(){
        that.$nextTick(() => {
          // alert(document.querySelector(".chatData").scrollHeight)
           console.log(document.querySelector(".chatData").scrollHeight)
           if(document.querySelector(".bigChat_content")){
             document.querySelector(".bigChat_content").scrollTop = document.querySelector(".chatData").scrollHeight;
             return
           }
           document.querySelector(".chat_content").scrollTop = document.querySelector(".chatData").scrollHeight;
        });
     },200)
      
    },
    getMoreMessage(){ //查看更多信息
      var height = document.querySelector(".chat_content").scrollHeight
      this.page++
      let data = {
        chatType: "userChat",
        page: this.page,
        receiverId: this.$store.state.chat.activeUser.receiverId
      };
      getchatRecord(data).then(res => {
        let message = [];
        res.data.data.forEach(val => {
          val.sendTime = timetrans(val.sendTime);
          if (val.baseType == 1) {
            val.content = b64DecodeUnicode(val.content);
          }
          if (val.messageType == 4) {
            val.content = "https://image.ymaibang.com/" + val.content;
            // this.record_img.push(val);
          }
          if (val.messageType == 2) {
            val.content = JSON.parse(val.content);
          }
          if (val.senderId == localStorage.getItem("userId")) {
            //是本人发送的
             message.push(change(val.messageType,val.sendTime,val.content)) 
          } else {
             message.push(change(val.messageType,val.sendTime,val.content,'receive'))
          }
        });
        let m = sessionStorage.getItem(this.$store.state.chat.activeUser.receiverId)
        let m2 = message.concat(JSON.parse(m))
        if(message.length < 20){
          this.moreMessage = false
        }
        sessionStorage.setItem(this.$store.state.chat.activeUser.receiverId,JSON.stringify(m2))
        this.myMessage = JSON.parse(
          sessionStorage.getItem(this.$store.state.chat.activeUser.receiverId)
        );
        this.$nextTick(() => { //查看更多聊天 滚动条的特殊处理
          if(document.querySelector(".bigChat_content")){
             document.querySelector(".bigChat_content").scrollTop = document.querySelector(".chatData").scrollHeight - height;
             return;
           }
           document.querySelector(".chat_content").scrollTop = document.querySelector(".chatData").scrollHeight - height;
        });
      });
    },
    goToProduct(id){
      this.$router.push({path:'/goods/publishProduct/productpreview',query: {id:id}})
    },
    goOrddetail(id,type) {
      if(type && type === 'receive'){ //不能打开对方发来的订单信息
        return;
      }
      this.$router.push({ path: "/order/orddetail", query: { id: id } });
    },
    //上传图片的接口
     uploadSuccess(res,fileList){
            let reader = new FileReader();
            reader.readAsDataURL(fileList.raw);
            reader.onload = () => {
                let imageUrl = reader.result;
                imgUploads(5, imageUrl).then(res => {
                    if(res.data.result==1){
                       let img = 'https://image.ymaibang.com/'+res.data.data.originImg
                        this.storage({ content: img, time: null,type: 'img' });
                        this.sendData(img,4)
                    }
                });
            };
     },
     uploadError(){

     },
     beforeUpload(file){ //发送图片的限制
         
     },
    clear() { //退出选择商品 清除数据
      this.productDialog = false;
      this.searchProduct = null;
    },
    storage(data) {
      //储存聊天信息
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let min = date.getMinutes();
      let second = date.getSeconds()
      let time = year + "-" + month + "-" + day + " " + hour + ":" + min + ':' + second; //发送的时间
      let myMessage = JSON.parse(
        sessionStorage.getItem(this.$store.state.chat.activeUser.receiverId)
      )
        ? JSON.parse(
            sessionStorage.getItem(this.$store.state.chat.activeUser.receiverId)
          )
        : [];
      data.time = time;
      this.myMessage.push(data);
      myMessage.push(data);
      myMessage = JSON.stringify(myMessage);
      sessionStorage.setItem(
        this.$store.state.chat.activeUser.receiverId,
        myMessage
      );
      this.scrollTop()
      // this.myMessage.push(myMessage);
      
    },
    sendProduct() {
      //发送商品
      this.checkProductArr.forEach(val => {
        val.type = "product";
        this.storage(val);
        let product = {
          productId: val.productId, // 商品ID
          skuId: val.skuId // 属性ID
        };
        this.sendData(JSON.stringify(product), 2);
      });
      this.checkProductArr = [];
      this.productDialog = false;
    },
    checkProduct() {
      //选择商品
      console.log(this.checkProductArr);
    },
    showProduct() {
      //显示商品弹框、
      this.getProduct();
      this.productDialog = true;
    },
    getProduct() { //获取商品
      let data = {
        merchantId: localStorage.getItem("storeId"),
        searchContent: this.searchProduct,
        page: this.page
      };
      productList(data).then(res => {
        console.log(res);
        this.productList = res.data.data;
        this.listSum = res.data.listSum;
        this.total = res.data.listSum / 2;
      });
    },
    handleCurrentChange(val) { //商品的分页
      this.page++;
    },
    showRecordType(type) { //选择聊天记录类型
      this.recordType = type;
    },
    down() {}, //阻止拖拽
    showRecord() { //显示聊天记录框
      this.isShowRecord = !this.isShowRecord;
      this.recordType = "all";
    },
    bigWin() {
      this.big = true;
    },
    smallWin() {
      this.big = false;
    },
    commonTextBtn(item) {
      this.text = item;
    },
    close() {
      this.$store.dispatch("close");
    },
    send() { //文字的发送
      let re = /^[\s]*$/;
      let val = this.text.match(re);
      document.querySelector("textarea").onkeydown = function(event) {
        if (event.which == 13) {
          event.cancelBubble = true;
          event.preventDefault();
          event.stopPropagation();
        }
      };
      if (val != null) {
        this.$message({
          showClose: true,
          message: "发送内容不能为空，请重新输入。",
          duration: 1000
        });
        return;
      }
      this.sendData(this.text, 1);
      this.storage({ content: this.text, time: null });
      this.text = "";
      this.scrollTop()
    },
    sendData(val, type) {
      //发送给服务器
      if (this.$store.state.chat.activeUser.type) {
        var chatType = this.$store.state.chat.activeUser.type;
      } else {
        var chatType = "userChat";
      }

      let date = new Date();
      let time = date.getTime(date);
      let data = {
        name: "sendUserMessage",
        data: {
          messageType: type, // 消息类型（1：文字，2：商品，3：表情，4：图片，5：语音，7：订单）
          chatType: chatType, // 聊天类型（userChat：用户间聊天，customerService:客服聊天,staffChat:团队聊天）
          platform: 7, // 发出消息的平台
          receiverId: this.$store.state.chat.activeUser.receiverId, // 接收人ID（用户之间聊天：接收人user_id，客服聊天：客服ID）
          merchantId: localStorage.getItem("storeId"), // 店铺ID
          submitTime: time, //APP端发送该消息时的时间戳，发送成功会返回该值判断对应是哪条消息
          content: b64EncodeUnicode(val) // base64编码
        }
      };
      ws.sendData(data);
      this.scrollTop()
    },
    //关闭当前
    closeThis(item) {
      this.$store.dispatch("closeThis", item);
    },
    select(item) {
      this.$store.dispatch("select", item);
    },
    small() {
      this.$store.dispatch("small");
    }
  },
  directives: { //\自定义指令
    drag: function(box) {
      box.onmousedown = function(ev) {
        var disX = ev.clientX - box.offsetLeft;
        var disY = ev.clientY - box.offsetTop;
        document.onmousemove = function(ev) {
          var l = ev.clientX - disX;
          var t = ev.clientY - disY;
          box.style.left = l + "px";
          box.style.top = t + "px";
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  },
  mounted() {
    ws.init(); //开启websocket连接
  }
};
</script>

<style scoped>
.chat {
  height: 520px;
  background: white;
  border: 1px solid #cccccc;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  top: calc(50% - 260px);
  left: calc(50% - 300px);
  justify-content: space-between;
  position: fixed;
}
.product {
  height: 400px;
  overflow-y: auto;
  padding: 0 10px;
  margin: 10px 0;
}
.dislog >>> .el-input--prefix .el-input__inner {
  background: #f2f2f2;
}
.product >>> .el-checkbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-direction: row-reverse;
  padding: 5px 0;
  border-bottom: 1px solid #e5e5e5;
}
.product >>> .el-checkbox + .el-checkbox {
  margin: 0;
}
.dislog >>> .el-dialog__body {
  padding: 10px !important;
}
.product_data {
  display: flex;
  justify-content: space-between;
}
.product_data div {
  margin-left: 5px;
}
.product_text {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.bigChat {
  background: white;
  border: 1px solid #cccccc;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.3);
  z-index: 1200;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0 !important;
  left: 0 !important;
  height: 100%;
}
.chat_right {
  width: 600px;
  position: relative;
}
.bigChat_right {
  width: 100%;
  position: relative;
  height: 100%;
}
.bigChat_left {
  width: 180px;
  height: 100%;
  overflow-y: auto;
  background: #e5e5e5;
}
/* 聊天头部 */
.chat_header {
  height: 80px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.chat_header_user {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 5px;
}
.avatar img {
  width: 50px;
  height: 50px;
}
.close {
  cursor: pointer;
  font-size: 24px;
}

/* 聊天头部end */

/* 聊天主体 */
.char_footer_header {
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
}
.selectImg {
  cursor: pointer;
  width: 24px;
  font-size: 0;
  height: 24px;
}
.selectImg label {
  cursor: pointer;
}
.selectImg img {
  width: 100%;
  height: 100%;
}
.select {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chat_content {
  width: 100%;
  height: 288px;
  float: left;
  overflow-y: auto;
}
.bigChat_content {
  width: 100%;
  height: calc(100% - 230px);
  float: left;
  overflow-y: auto;
}
.el-icon-goods {
  font-size: 24px;
  color: #515151;
  cursor: pointer;
  margin-left: 5px;
}
/* 聊天左边 */
.chatMessage_left {
  display: flex;
  justify-content: flex-start;
  position: relative;
  margin: 25px 15px 15px 10px;
  text-align: left;
}
.chatMessage_left img {
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex: 0 0 40px;
}
.chatMessage_left .chatMessage_data {
  position: relative;
  padding-top: 18px
}
.chatMessage_left .chatMessage_data .receiverNameAndTime {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 1;
  width: 500px;
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
  padding: 10px 10px;
  border-radius: 5px;
  /* height:  */
    color: #fff;
    margin-left: 15px;
    height: 100%;
    overflow: hidden;
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
/* 聊天右边 */
.chatMessage_right {
  position: relative;
  margin: 25px 15px 15px 10px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  text-align: right;
}
.chatMessage_right .chatMessage_data .receiverNameAndTime {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1;
  width: 500px;
}
.chatMessage_right img {
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  float: right;
  flex: 0 0 40px;
}
.chatMessage_right .chatMessage_data {
  position: relative;
  padding-top: 15px
}
.chatMessage_right .chatMessage_data .receiverNameAndTime span {
  color: #999999;
  font-size: 12px;
  float: right;
}
.chatMessage_right .chatMessage_data .receiverNameAndTime {
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
}
.chatMessage_right .chatMessage_data .receiverNameAndTime .receiverName {
  padding: 0 15px;
}
.chatMessage_right .chatMessage_data .text {
  color: #333333;
  font-size: 14px;
  background-color: #1491f2;
  color: white;
  /* margin: 21px 15px 5px 15px; */
  margin-right: 15px;
  height: 100%;
  overflow: hidden;
  padding: 10px 10px;
  border-radius: 5px;
  
}
.chatMessage_right .chatMessage_data .text p {
  line-height: 1.5;
  text-align: left;
  word-break: break-word;
}
.chatMessage_right .icon {
  width: 0;
  height: 0;
  border-left: 23px solid #1491f2;
  border-top: 0px solid transparent;
  border-bottom: 12px solid transparent;
  position: absolute;
  right: 0px;
  top: 40px;
}
/* 聊天右边结束 */
/* 聊天尾部 */
.char_footer_content {
  width: 100%;
  height: 80px;
  padding: 10px;
}
.textarea {
  resize: none;
  width: 100%;
  border: 0;
  outline: none;
  height: 100%;
  font-size: 14px;
}
.edContWarp {
  outline: none;
  border: 0;
  width: 100%;
  height: 70px;
  padding: 0 10px;
  font-size: 16px;
  overflow-y: auto;
}
.char_footer {
  height: 150px;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #cccccc;
  width: 100%;
  background: white;
}
.char_footer_footer {
  height: 35px;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.btn {
  width: 70px;
  height: 30px;
  background-color: #5fb878;
  border-radius: 5px;
  color: white;
}
.selectText {
  width: 30px;
  height: 30px;
  background-color: #5fb878;
  border-radius: 3px;
  color: white;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  margin-right: 20px;
  cursor: pointer;
}
.commonText {
  cursor: pointer;
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  width: 17em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between
  }
  .commonText .text{
  width: 15em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  }
.commonText:hover {
  background-color: #f2f2f2;
}
.createText {
  background-color: #1491f2;
  height: 30px;
  text-align: center;
  color: white;
  width: 100%;
  display: block;
  line-height: 30px;
  font-size: 14px;
  cursor: pointer;
}
.chat_left {
  width: 180px;
  height: 520px;
  overflow-y: auto;
  background: #e5e5e5;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.userList {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  cursor: pointer;
  padding: 5px 5px;
}
.userList .user {
  display: flex;
  align-items: center;
}
.closeThis {
  opacity: 0;
  transition: 0.5s;
}
.userList:hover {
  background: #f2f2f2;
}
.userList:hover .closeThis {
  opacity: 1;
}
.userList img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  padding: 5px;
}
.active {
  background: #f3f3f3;
}
.record {
  width: 315px;
  height: 100%;
  background-color: white;
  box-shadow: 16px 0px 24px rgba(0, 0, 0, 0.01);
  border-left: 1px solid #cccccc;
}
.record_header {
  height: 49px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #cccccc;
}
.record_nav {
  height: 30px;
  background-color: #f0f0f0;
  padding-left: 10px;
}
.record_nav span {
  color: #333333;
  font-size: 14px;
  line-height: 30px;
}
.close_record {
  border-right: 1px solid #cccccc;
  padding-right: 5px;
  cursor: pointer;
}
.show_record {
  cursor: pointer;
}
.chat >>> .el-popover {
  padding: 0 !important;
}
/* 聊天记录 */
.record_table {
  padding: 10px;
}
.record_table span {
  height: 24px;
  width: 60px;
  border-radius: 5px;

  display: inline-block;
  font-size: 14px;
  color: black;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
}
.record_table .active {
  background-color: #1491f2;
  color: white;
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
  color: #333333;
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
.product_left p {
  font-size: 12px;
  color: #333333;
  width: 10em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product_right img {
  width: 50px;
  height: 50px;
  border-radius: 0;
}
.pagination {
  text-align: center;
}
.img_message{
  width: 100px;
}
.img_message img{
  width: 100%;
  height: 100%;
  border-radius: 0;
  cursor: pointer;
}
.getMoreMessage{
  font-size: 12px;
  color: #1491f2;
  width:100%;
  display: block;
  text-align: center;
  margin: 15px 0;
  cursor: pointer;
}
.sendOrderBox{
  width:100%;
  position: absolute;
  top:80px;
  height: 40px;
  background: #fbb954;
  z-index: 1000;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  display: flex;
  color: white;
  font-size: 14px;
}
.sendOrderBtn{
  border:1px solid white;
  display: inline-block;
  border-radius: 5px;
  padding:3px 10px;
  margin-right: 20px;
  cursor: pointer;
}
.leftUserList{
    width: 6em;
    overflow:  hidden;
    text-overflow: ellipsis;
    white-space:  nowrap;

}
</style>

