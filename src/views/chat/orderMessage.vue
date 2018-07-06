<template>
    <div class="order">
        <div class="order_item" v-for="(item,index) in orderList" :key="index" @mouseover="showRead(index)" @mouseout="hideRead" @click="goOrddetail(item.order_id)">
          <span class="noRead" v-if="item.msg_status == 2"></span>
            <div class="order_item_header">
                <span class="type">{{item.order_status_describe}}</span>
                <span class="time">{{item.add_time}}</span>
                <span class="goRead" v-if="item.msg_status == 2 && index == isShowRead " @click.stop="read(item.id)">标记已读</span>
            </div>
            <div class="order_item_content">
                <img :src="item.pro_img">
                <div class="order_data">
                    <span class="name">{{item.user_name}}</span>
                    <span class="code">订单号：{{item.order_num}}</span>
                </div>
            </div>
        </div>
         <div class="noOrder" v-if="orderList.length == 0">
           <p>暂无订单</p>
       </div>
          <span class="getMore" @click="goToOrder" v-if="orderList.length == 10">查看更多订单通知</span>
          <!-- <p class="noMore" v-if="orderListLength < 10">没有更多内容</p> -->
    </div>
</template>
<script>
import { getOrderList,changeOrderMsgStatus } from "@/api/customer/order/order";
export default {
  data() {
    return {
      orderList: [],
      page: 1,
      total: null,
      orderListLength: null,
      isShowRead:null,
    };
  },
  methods: {
    goToOrder(){
      this.$router.push("/customer/notice")
    },
    goOrddetail(id) {
      this.read(id)
      this.$router.push({ path: "/order/orddetail", query: { id: id } });
    },
    read(id){
      changeOrderMsgStatus({id:id}).then(res=>{
          this.getOrderListFn()
      })
    },
    showRead(id){
      this.isShowRead = id
    },
    hideRead(){
      this.isShowRead = null
    },
    //请求列表
    getOrderListFn() {
      let data = {
        page: this.page
      };
      getOrderList(data).then(res => {
        console.log(res);
        if (res.data.data.orderMsgList) {
          this.orderList = res.data.data.orderMsgList;
          console.log(this.orderList, "这是数据");
          this.orderListLength = this.orderList.length;
          this.total = res.data.data.pageSum * 10;
        }
      });
    }
  },
  activated() {
    this.getOrderListFn();
  }
};
</script>
<style scoped>
.order {
  padding: 10px;
  cursor: default;
  height: 450px;
  overflow-y: auto;
  background: white;
}
.order_item {
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
}
.order_item_header {
  display: flex;
  justify-content: space-between;
  color: #2f2c2c;
  font-size: 13px;
  position: relative;
}
.order_item_content img {
  width: 50px;
  height: 50px;
}
.type {
  color: #1491f2;
  width: 12em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}
.code {
  color: #666666;
  font-size: 12px;
}
.order_item_content {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}
.order_data {
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
  width: 100%;
  display: block
}
.noMore {
  color: #1491f2;
  font-size: 12px;
  text-align: center;
  margin-top: 15px;
}
.noOrder {
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
.goRead{
  color: #1491f2;
  position: absolute;
  top:0px;
  right: 0px;
  width: 100px;
  background: #f2f2f2;
  text-align: right
}
</style>
