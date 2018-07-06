<template>
    <div class="order">
         <div class="noData" v-if="!order_num">
                <p>暂无订单</p>
            </div>
        <div class="order_content">
            <div class="item" v-for="(item,index) in orderList" :key="index" @mouseover="showRead(index)" @mouseout="hideRead" @click="goOrddetail(item.order_id)">
                <div class="order_item_left">
                    <p class="type">{{item.order_status_describe}}</p>
                    <div class="order_item_left_data">
                        <div class="img">
                            <img :src="item.pro_img">
                        </div>
                        <div class="text">
                            <p class="product_name">
                                {{item.user_name}}
                            </p>
                            <p class="product_code">订单号：{{item.order_num}}</p>
                        </div>
                    </div>
                </div>
                <div class="order_item_right">
                    <span>{{item.add_time}}</span>
                    <span class="goRead" v-if="item.msg_status == 2 && index == isShowRead " @click.stop="read(item.id)">标记已读</span>
                </div>
                <span class="noRead" v-if="item.msg_status == 2"></span>
            </div>
        </div>
         <div class="pagination" v-if="order_num">
              <el-pagination
                layout="prev, pager, next"
                 @current-change="handleCurrentChange"
                :total="total">
            </el-pagination>
            <span v-if="orderList">
                <p>共{{order_num}}条,每页10条</p>
            </span>
        </div>
    </div>
</template>
<script>
import { getOrderList,changeOrderMsgStatus } from "@/api/customer/order/order";
export default {
  data() {
    return {
      orderList: null,
      page: 1,
      total: null,
      isShowRead: null,
      order_num: null
    };
  },
  watch:{
      page(){
          this.getOrderListFn()
      }
  },
  methods: {
      handleCurrentChange(val){
          this.page = val
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
    //请求通知列表
    getOrderListFn() {
      let data = {
        page: this.page
      };
      getOrderList(data).then(res => {
        this.orderList = res.data.data.orderMsgList;
        this.total = res.data.data.pageSum * 10 
        this.order_num = res.data.data.order_num
      });
    }
  },
  mounted() {
    this.getOrderListFn();
  }
};
</script>
<style scoped>
 .item{
     width: 550px;
	height: 120px;
	background-color: #f2f2f2;
	border-radius: 5px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
     font-size: 14px;
     margin-top: 10px;
     cursor: pointer;
     position: relative;
    
 }
 .order_item_left_data{
     display: flex;
     justify-content: space-between
 }
 .type{
     color: #1491f2;
     margin-bottom: 10px;
 }
 .img img{
     width: 70px;
     height: 70px;
     background: white;
     border-radius: 5px;
 }
 .text{
     display: flex;
     flex-direction: column;
     margin-left: 10px;
     justify-content: space-around
 }
 .order_item_right{
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
.goRead{
  color: #1491f2;
  position: absolute;
  top:10px;
  right: 10px;
  width: 100px;
  background: #f2f2f2;
  text-align: right
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
