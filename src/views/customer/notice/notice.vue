<template>
    <div class="order">
          <div class="noData" v-if="!infor_num">
                <p>暂无通知</p>
            </div>
        <div class="order_content">
            <div class="item" v-for="(item,index) in noticeList" :key="index" v-if="infor_num">
                <div class="item_header">
                    <span class="type">{{item.msg_title}}</span>
                    <span class="time">{{item.msg_time}}</span>
                </div>
                    <p style="color: #999999;">{{item.msg_content}}</p>
            </div>
        </div>
        <div class="pagination" v-if="infor_num">
              <el-pagination
                layout="prev, pager, next"
                 @current-change="handleCurrentChange"
                :total="total">
            </el-pagination>
            <span v-if="noticeList">
                <p>共{{infor_num}}条,每页10条</p>
            </span>
        </div>
    </div>
</template>
<script>
import { getNoticeList } from "@/api/customer/notice/notice";
export default {
  data() {
    return {
      noticeList: [],
      page: 1,
      total: null,
      infor_num: null
    };
  },
  watch:{
      page(){
          this.getNoticeFn()
      }
  },
  methods: {
    handleCurrentChange(val){
          this.page = val
      },
    //请求通知列表
    getNoticeFn() {
      let data = {
        page: this.page
      };
      getNoticeList(data).then(res => {
        this.noticeList = res.data.data;
        this.total = res.data.pageSum * 10 
        this.infor_num = res.data.infor_num
      });
    }
  },
  mounted() {
    this.getNoticeFn();
  }
};
</script>

<style scoped>
.noData {
  width: 550px;
  height: 80px;
  font-size: 14px;
  line-height: 80px;
  text-align: center;
  background-color: #f2f2f2;
  border-radius: 5px;
  border-radius: 5px;
  color: #666666;
}
.item {
  width: 550px;
  min-height: 80px;
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  margin-top: 10px;
}
.order_item_left_data {
  display: flex;
  justify-content: space-between;
}
.item_header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 15px;
  margin-bottom: 20px;
}
.img {
  width: 70px;
  height: 70px;
  background: white;
  border-radius: 5px;
}
.text {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-around;
}
.time {
  font-size: 12px;
}
.pagination{
    width: 550px;
    text-align: center;
    font-size: 13px;
    position: relative;
    margin-top: 20px;
}
.pagination span{
    position: absolute;
    top: 50%;
    height: 20px;
    margin-top: -10px;
    line-height: 20px;
    right: 0
}
</style>
