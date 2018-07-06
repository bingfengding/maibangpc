import store from '../store'

export function b64EncodeUnicode(str) { //转换为b64
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}
export function b64DecodeUnicode(str) { //64转
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")              
    );
  }

  export function timetrans(date){ //时间戳转换为时间
    var date = new Date(date*1000);//如果date为13位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}

export function change(ty, ti, con, re) { //ty 类型 ti时间 con 内容 re是否是对方发过来的
    if (ty == 1) {
      var data = {
        content: con,
        time: ti,
        messageType: re
      };
    }
    if (ty == 4) {
      //图片处理
      var data = {
        type: "img",
        content: con,
        time: ti,
        messageType: re
      };
    }
    if (ty == 2) {
      //商品的处理
      var data = {
        type: "product",
        time: ti,
        ...con,
        messageType: re
      };
    }
    if(ty == 7){
        //订单的处理
      var data = {
          type: "order",
          time: ti,
          ...con,
          messageType: re
      }
    }
    return data
  }
export const ws = {
    wsServer: "wss://app.ymaibang.com:9090",
    // wss://app.ymaibang.com:9090 线上环境
    // ws://192.168.1.254:9000 测试环境
    ws: null,
    isClose: false, //判断是不是退出登录
    init: function (data) {
        if(store.state.chat.isCloseWebsocket){ //如果是退出登录就不需要再执行连接
            return;
        }
        this.ws = new WebSocket(this.wsServer);
        let that = this
        let timer = setInterval(function(){
            if (that.ws.readyState === that.ws.OPEN){
                clearInterval(timer)
                let socket = {
                    "name": "identityVerify",
                    "data": {
                        "userId": localStorage.getItem("userId"),    // 用户ID
                        "platform": 5,    // 发出消息的平台（1：汽配帮手，2：C端微信，3：C端QQ，4：C端浏览器，5：B端PC）
                        "merchantId": localStorage.getItem("storeId"),    // B端socket认证需要此参数
                    }
                }
                that.ws.send(JSON.stringify(socket))
                console.log("发送验证成功")
                
            }
        },500)
       
        this.ws.onmessage = function (evt) {
            console.log(evt)
            console.log(JSON.parse(evt.data),"数据")
            let data = JSON.parse(evt.data)
            console.log('接收服务端推送的信息: '+ evt.data);
            if(data.name == 'receiveMessageSendStatus'){
                store.dispatch("updateChat")
            }
            if(data.name == 'receiveUserMessage'){ //接收到信息
                if(data.data.senderId == store.state.chat.activeUser.receiverId){ //是当前聊天窗口
                    let val = {
                        "name": "sendChangeMessageStatus",
                        "data": {
                            "messageId": data.data.messageId,    // 消息ID
                            "chatType": 2,    // 1:客服聊天，2：用户之间聊天
                            "changeType": 1,    // 修改类型（1：修改消息已读，2：修改语音已听）
                        }
                    }
                    // this.ws.sendData(val)
                    this.send(JSON.stringify(val))
                }
                store.dispatch("updateChat")
                let message = sessionStorage.getItem(data.data.senderId) ? JSON.parse(sessionStorage.getItem(data.data.senderId)) : []
                let content = {
                    messageType: 'receive',
                    content: b64DecodeUnicode(data.data.content),
                    time: timetrans(data.data.sendTime)
                }
                if(data.data.messageType == 2){ //商品处理
                     content.content = JSON.parse(content.content)
                      content.content.type = 'product'
                      for(let key in content.content){
                        content[key] = content.content[key]
                     }
                 }
                 if(data.data.messageType == 4){ //图片处理
                     if(data.data.messageFrom != 7){
                        content.content = 'https://image.ymaibang.com/' + content.content;
                      }else{
                        content.content = content.content;
                      }
                     content.type = 'img'
                 }
                 if(data.data.messageType == 7){
                     content.content = JSON.parse(content.content)
                     content.content.type = 'order'
                     for(let key in content.content){
                        content[key] = content.content[key]
                     }
                     console.log(content.content,"订单数据")
                     
                 }
                message.push(content)
                sessionStorage.setItem(data.data.senderId,JSON.stringify(message))
            }
           
        };
        this.ws.onerror = function (evt) {
            console.log('socket连接错误: ' + evt);
        };
        this.ws.addEventListener("close", function(event) {
            console.log(event)
            console.log("断开了")
            that.init()
          });
    },
    sendData: function (data) {
        if (this.ws.readyState === this.ws.OPEN) {
            console.log(data)
            this.ws.send(JSON.stringify(data))
            console.log("发送成功")
            let that = this
        }else{
            console.log("重新连接")
            let that = this
            that.init()
            setTimeout(function () {
                that.sendData(data)
            }, 300);
        }
    },
    close: function(val){
        this.ws.close()
        store.dispatch("closeWebsoket",true)
        this.ws.onclose = function(event) {
            // var code = event.code;
            // var reason = event.reason;
            // var wasClean = event.wasClean;
            // handle close event
            console.log("关闭连接")
          };
    },
    sendChangeMessageStatus: function(data){ //变成已读
        if (this.ws.readyState === this.ws.OPEN) {
            console.log(data)
            this.ws.send(JSON.stringify(data))
            console.log(JSON.stringify(data),"发送成功")
        }
    }
}

