<template>
    <div class="notice">
        <div class="notice_item" v-for="(item,index) in noticeList" :key="index" @mouseover="showRead">
            <span class="noRead" v-if="item.msg_status == 2"></span>
            <div class="notice_item_header">
                <span class="type">{{item.msg_title}}</span>
                <span class="time">{{item.msg_time}}</span>
            </div>
            <div class="notice_item_content">
               <p>{{item.msg_content}}</p>
            </div>
        </div>
        <div class="noNotice" v-if="noticeList.length == 0">
           <p>暂无通知</p>
       </div>
       <span class="getMore" @click="goToNotice" v-if="noticeList.length == 10">查看更多通知</span>
        <!-- <p class="getMore">加载更多</p> -->
        <!-- <p class="noMore">没有更多内容</p> -->
    </div>
</template>
<script>
import {
  getNoticeList,
  changeInforMsgStatus
} from "@/api/customer/notice/notice";
export default {
  data() {
    return {
      noticeList: [],
      page: 1,
      total: null
    };
  },
  methods: {
    showRead() {
    },
    goToOrder(){
      this.$router.push("/customer/notice")
    },
    //请求通知列表
    getNoticeFn() {
      let data = {
        page: this.page
      };
      getNoticeList(data).then(res => {
        console.log(res);
        this.noticeList = res.data.data;
        this.total = res.data.pageSum * 10;
      });
    }
  },
  activated() {
    changeInforMsgStatus().then(res => {
      this.getNoticeFn();
    });
  }
};
</script>
<style scoped>
.notice {
  padding: 10px;
  cursor: default;
  height: 450px;
  overflow-y: auto;
}
.notice_item {
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  position: relative;
  cursor: pointer;
}
.notice_item_header {
  display: flex;
  justify-content: space-between;
  color: #2f2c2c;
  font-size: 13px;
}
.type {
  color: #1491f2;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 12em;
  white-space: nowrap;
}
.code {
  color: #666666;
  font-size: 12px;
}
.notice_item_content {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  color: #666666;
  font-size: 12px;
}
.notice_data {
  display: flex;
  height: 50px;
  flex-direction: column;
  justify-content: space-between;
  color: #333333;
  font-size: 14px;
  margin-left: 10px;
}
.getMore {
  color: #1491f2;
  font-size: 12px;
  text-align: center;
  margin: 15px 0;
  cursor: pointer;
  display: block;
  width: 100%;
}
.noMore {
  color: #1491f2;
  font-size: 12px;
  text-align: center;
  margin-top: 15px;
}
.noNotice {
  text-align: center;
  font-size: 14px;
  color: #cccccc;
  padding-top: 100px;
}
.noRead {
  position: absolute;
  right: 20px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: red;
  bottom: 10px;
  color: white;
  font-size: 10px;
  text-align: center;
  line-height: 15px;
}
</style>
