<template>
 <!-- 店铺概况 -->
 <el-container id="orderProfile">
    <!-- header头 -->
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
        全部订单
        </el-breadcrumb-item>        
      </el-breadcrumb>
    </el-header>
    <!-- 主体内容 -->
    <el-main>      
      <!-- 订单筛选 -->
      <div class="order-screen">
          <el-form ref="form" :model="form" >
            <div class="form-left">
              <el-form-item>
                 <el-select v-model="form.num" placeholder="请选择" size="mini" class="order-num">
                <el-option label="订单号" value="订单号"></el-option>
                <el-option label="收货人姓名" value="收货人姓名"></el-option>
                <el-option label="收货人手机号" value="收货人手机号"></el-option>
                </el-select>                                  
                <el-input v-model="form.orderNum" size="mini"></el-input>                     
              </el-form-item>
            <el-form-item label="商品名称：" label-width="100px" size="mini">   
            <el-input v-model="form.commodityName"></el-input>      
            </el-form-item>            
            </div>   
            <div class="form-right">              
              <el-form-item label="下单时间：" label-width="100px" size="mini"> 
                <el-date-picker
                  v-model="form.value1"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss"                  
                  >
                </el-date-picker>
                至
                <el-date-picker
                    v-model="form.value2"
                    type="datetime"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>              
             <div class="order-left">                    
              <div style="clear:both"></div>                      
            </div>               
            </div>
            <div style="clear:both"></div>         
            <el-form-item>
              <el-button type="primary" @click="onSubmit" class="primary">筛选</el-button>             
            </el-form-item>
          </el-form>
      </div>    
      <div style="clear:both"></div>
      <div class="tabs">
        <ul>         
         <li :class="{active: name === 'fullOrder'}" @click="toggleTab('fullOrder')">全部</li>
          <el-badge :value="msg[0]" :max="99" v-if="msg[0]!=0"><li @click="toggleTab('pendingPayment')" :class="{active: name === 'pendingPayment'}" >待付款</li></el-badge>
          <el-badge v-else><li @click="toggleTab('pendingPayment')" :class="{active: name === 'pendingPayment'}" >待付款</li></el-badge>
          <el-badge :value="msg[1]" :max="99" v-if="msg[1]!=0"><li @click="toggleTab('pendingDelivery')" :class="{active: name === 'pendingDelivery'}">待发货</li></el-badge>
          <el-badge v-else><li @click="toggleTab('pendingDelivery')" :class="{active: name === 'pendingDelivery'}">待发货</li></el-badge>
          <el-badge :value="msg[2]" :max="99" v-if="msg[2]!=0"><li @click="toggleTab('toBeReceived')" :class="{active: name === 'toBeReceived'}">待收货</li></el-badge>
          <el-badge v-else><li @click="toggleTab('toBeReceived')" :class="{active: name === 'toBeReceived'}">待收货</li></el-badge>
          <el-badge ><li @click="toggleTab('completed')" :class="{active: name === 'completed'}">已完成</li></el-badge>
          <el-badge ><li @click="toggleTab('cancelled')" :class="{active: name === 'cancelled'}">已取消</li></el-badge>
        </ul>                    
      </div> 
      <fullOrder :is="currentTab" ref="child" @upup="change" :msg="msg" class="pleft"></fullOrder>                
    </el-main>
  </el-container>
</template>
<script>
import fullOrder from '@/views/order/assemblys/fullOrder'//全部
import pendingPayment from '@/views/order/assemblys/pendingPayment'//待付款
import pendingDelivery from '@/views/order/assemblys/pendingDelivery'//待发货
import toBeReceived from '@/views/order/assemblys/toBeReceived'//待收货
import completed from '@/views/order/assemblys/completed'//已完成
import cancelled from '@/views/order/assemblys/cancelled'//已取消
import {orderList} from '@/api/order/ordermanage'
export default {
    data(){
      return{                 
        form: {         
          logistics: '',//物流方式
          orderType: '',//付款方式
          state: '',//状态
          orderNum: '',//订单号文本框
          commodityName: '',//商品名称                   
          num: '',//订单号                             
          value1: '',//下单时间始
          value2: '', //下单时间末               
        },    
        allTypeCount: [],
        // routerSwitch:[
        //   {to: '',title: '全部' ,name: 'fullOrder'},
        //   {to: 'pendingPayment',title: '待付款',name: 'pendingPayment'},
        //   {to: 'pendingDelivery',title: '待发货',name: 'pendingDelivery'},
        //   {to: 'toBeReceived',title: '待收货',name: 'toBeReceived'},
        //   {to: 'exchangeOfGoods',title: '退还货',name: 'exchangeOfGoods'},
        // ],
        ind: '',  
        changeRed: 0,
        activeName2: 'first', 
        currentTab: 'fullOrder', // currentTab 用于标识当前触发的子组件
        name: 'fullOrder',
        msg: [],
        // path: null,
      };            
    },
    // props: [this.form],  
    // watch:{
    //    path(newVal,oldVal){
    //      if(oldVal){
    //        localStorage.removeItem('page')
    //      }               
    //    }
    // }, 
    watch:{ 
          
    },    
    methods:{
      // beforeRouteEnter (to, from, next) {          
      //     console.log(to,'dsa')  
      //     console.log(from,'from')  
      //     console.log(next,'shen')  
      //     next();  
      // },  
      onSubmit() {
        // console.log(this.form);    
        if (this.form) {
              this.$refs.child.parentMsg(this.form)
        }   
      },    
      handleClick(tab, event) {
        console.log(tab, event);
      }    ,
      toggleTab(tab) {
        console.log(tab);          
          if(this.currentTab != tab){
            localStorage.removeItem('page') ;
          }                   
          this.currentTab = tab; // tab 为当前触发标签页的组件名 
          this.name = tab;
          localStorage.setItem('order',tab);                            
          // this.currentTab = localStorage.getItem('curr');                                     
      },
      getDate(){                                
          if(localStorage.getItem('order')){
              this.currentTab = localStorage.getItem('order');
              this.name = localStorage.getItem('order');
          }  
          else if(this.$route.query.name){
              this.currentTab = this.$route.query.name;
              this.name = this.$route.query.name;
          }        
          else{
            this.currentTab = 'fullOrder'
            this.name = 'fullOrder'
          }
      },      
      // getData(){
      //     let data = {
      //         page: this.page,
      //         type: 3
      //     }
      //     orderList(data).then(res =>{
      //         if(res.data.code==200){
      //             console.log(res)
      //             this.tableData = res.data.data.orders;   
      //             this.allTypeCount = res.data.data.allTypeCount                                                                
      //         }
      //     })
      //   },
      change(msg) {
        this.msg = msg;
        console.log(msg,'这是你儿子转来的')
      },
      // isTab(){
      //   alert(this.$route.path);
      //   if(this.$route.path==='/orddetail'){
      //     alert(1)
      //   }else {
      //     alert(2)
      //   }
      // }
    },    
    components:{
      fullOrder,pendingPayment,pendingDelivery,toBeReceived,cancelled,completed
    },
    created(){      
      // this.path = this.$route.path     
      this.getDate();              
    }
}
</script>
<style scoped>

#orderProfile >>> .el-badge__content.is-fixed{
  right: 30px;
}
#orderProfile >>> .el-badge__content{
  border: none;
}
#orderProfile >>> .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: none;
}
#orderProfile >>> .el-tabs--card>.el-tabs__header .el-tabs__item{
    border: none;    
}
#orderProfile >>> .el-tabs__item{
    width: 100px;
    text-align: center;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
}
#orderProfile >>> .el-tabs__header{
  margin: 0 0 0;
}
#orderProfile >>> .order-exhibition .el-tabs__nav-scroll{
  width: 100%;  
  background-color: #FFF;
  padding-top: 30px;
}
#orderProfile >>> .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
  border: none;
}
#orderProfile >>> .el-tabs__item.is-active{
  background-color: #1491f2;
  color: #FFF;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.order-exhibition{  
  height: 60px;
  width: 100px;
  border: 1px solid red;
}
.tabs{
  min-width: 660px;
  padding-top: 20px;
  padding-left: 10px;
}
.tabs ul{    
  height: 30px;
  line-height: 30px;
}
.tabs ul li{
  float: left;
  width: 100px;
  text-align: center;
  cursor: pointer;
}
.active{
  background-color: #1491f2;
  color: #FFF;
  border-radius: 4px;
}
.pleft{
  margin-left: 10px;
}
</style>
<style lang="stylus" scoped>
#orderProfile       
  width: calc(100% - 1px); 
  .el-header
    margin-left 1px
    .el-breadcrumb
      line-height 60px
  .el-main
    overflow-x hidden
    min-width: 900px;
    padding 0;   
    margin-left: 10px;
    margin-top: 10px;  
    background-color: #FFF;    
    .order-exhibition             
      .el-tabs
        width: 100%!important;
        background-coloe: #FFF!important;
        height: 40px;
      float: left;
      width: 100%;      
      height: 100vh        
      ul
        width: 100%;
        background-color: #FFF;               
        padding-top: 20px;
        li
          list-style: none
          float: left;          
          width: 100px;            
          cursor: pointer                    
          text-align: center;
          padding: 5px 0;
          font-size: 14px;
          color: #333;
        .li-active
          background-color: #1491f2;   
          color: #FFF;
          border-radius: 4px   
    .order-screen
      float: left             
      width: 100%;
      margin-left: 10px;
      margin-top: 10px;
      padding-left: 10px;
      background-color: #f8f8f8;
    .main-right
      float: right
      width: 300px;     
      height: 1000px;
      border: 1px solid blue;      
    .el-button
      padding: 6px 20px 6px 20px
    .primary
      margin-left: 100px      
    .order-pay-method
      margin-top: 8px
    .order-left
      margin-top: 6px;      
    .el-form-item
      margin: 8px 0 0 0!important
    .order-time
      width: 300px      
    .order-sel
      width: 100px!important
    .el-date-picker
      width: 100px!important      
    .order-detail
      float: left           
      margin: 0px 
      padding: 0px
    .order-logistics
      float:left
    .form-left
      float:left   
      margin-right: 20px;       
    .form-right
      float left  
      margin-top: 10px;            
    .order-num
      width: 100px!important
      float: left!important;
    .el-select
      width: 150px    
    .el-input
      width: 150px
    .mainBody
      width 100%
      margin-right 0px
      padding 20px 10px 0 10px
      height 740px
      .shopProfileInfo
        height 60px
        margin-left 10px
        padding-left 80px
        background-image url('../../assets/icon.png')
        background-size 60px auto
        background-position center left
        >div
          margin-top -6px
          .fontWeight
            vertical-align middle
          .colorFFF
            background-color #3cb034
            padding 0 10px
            border-radius 4px
            vertical-align middle
          .shopProfileInfoState
            margin-top 20px
            span
              padding-right 30px
            span:nth-of-type(2)
              i
                color #3cb034
      .shopProfileToday
        height 150px
        margin-top 50px
        padding 30px 10% 0 10%
        .el-row
          margin-top 30px
      .shopProfileYesterday
        background-color #f8f8f8
        height 100px
        margin-top 50px
        .el-row
          padding 26px 40px 0 40px
</style>

