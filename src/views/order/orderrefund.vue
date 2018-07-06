<template>
    <el-container id="orderrefund">
        <!-- header头 -->
        <el-header class="bgFFF">
        <el-breadcrumb>
            <el-breadcrumb-item>
            退款订单
            </el-breadcrumb-item>        
        </el-breadcrumb>
        </el-header>       
    <!-- 只要区域 -->     
        <el-main class="main"> 
            <div class="order-screen">                       
            <el-form label-width="100px" :model="form" size="mini" :inline="true" class="main-form">
                <el-form-item label="订单号：" >
                    <el-input v-model="form.orderNum" class="form-input"></el-input>
                </el-form-item>
                <el-form-item label="申请时间：" label-width="100px" size="mini"> 
                <el-date-picker
                    v-model="form.value1"
                    type="datetime"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                至
                <el-date-picker
                    v-model="form.value2"
                    type="datetime"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                </el-form-item>
                <br>
                <el-form-item label="服务号：" size="mini" >
                    <el-input v-model="form.serviceNum" class="form-input"></el-input>
                </el-form-item>
                <el-form-item label="退款状态：">
                    <el-select v-model="form.refundState" placeholder="请选择" size="mini" class="order-sel">
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="退款中" value="退款中"></el-option>
                    <el-option label="退款成功" value="退款成功"></el-option>
                    <el-option label="拒绝退款" value="拒绝退款"></el-option>
                    <el-option label="取消退款" value="取消退款"></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-button type="primar" size="mini" @click="onSubmit" class="xu">查询</el-button>
                </el-form>
            </div>
            <div style="clear:both"></div>
        <div class="order-exhibition">          
            <!-- <el-tabs v-model="activeName2" type="card" >
            <el-tab-pane label="全部" name="first"><refund-order></refund-order></el-tab-pane>
            <el-tab-pane label="退款处理中" name="second">退款处理中</el-tab-pane>
            <el-tab-pane label="退款成功" name="third">退款成功</el-tab-pane>
            <el-tab-pane label="拒绝退款" name="fourth">拒绝退款</el-tab-pane>
            </el-tabs> -->
            <ul>          
                <el-badge ><li :class="{active: name === 'refundOrder'}" @click="toggleTab('refundOrder')">全部</li></el-badge>
                <el-badge :value="msg.applying" :max="99" v-if="msg.applying!=0"><li @click="toggleTab('handling')" :class="{active: name === 'handling'}">退款处理中</li></el-badge>
                <el-badge v-else><li @click="toggleTab('handling')" :class="{active: name === 'handling'}">退款处理中</li></el-badge>
                <el-badge><li @click="toggleTab('refundSuccess')" :class="{active: name === 'refundSuccess'}">退款成功</li></el-badge>
                <el-badge><li @click="toggleTab('refuseRefund')" :class="{active: name === 'refuseRefund'}">拒绝退款</li></el-badge>               
            </ul>
        </div>  
        <refundOrder :is="currentTab" ref="child" @upup="change" :msg="msg" class="refund"></refundOrder>     
        </el-main>            
    </el-container>
</template>
<script>
import refundOrder from '@/views/order/assemblys/refund/refundOrder'//全部
import handling from '@/views/order/assemblys/refund/handling'//退款处理中
import refundSuccess from '@/views/order/assemblys/refund/refundSuccess'//退款成功
import refuseRefund from '@/views/order/assemblys/refund/refuseRefund'//拒绝退款
export default {
    data(){
        return{
            form: {
                orderNum: '',//订单号
                value1: '',
                value2: '',
                serviceNum: '',//服务号
                refundState: '',//退款状态
            },
            activeName2: 'first',
            currentTab: 'refundOrder',
            name: 'refundOrder',    
            msg: {}  ,               
        }
    },
    methods:{
        setParent(data){
            console.log(data);
        },
        onSubmit() {
            console.log('submit!');
            if (this.form) {
              this.$refs.child.parentMsg(this.form)
            }   
        },
        toggleTab(tab) {
            if(this.currentTab != tab){
                localStorage.removeItem('refunsPage');
            }
            this.currentTab = tab; // tab 为当前触发标签页的组件名        
            this.name = tab       
            localStorage.setItem('refund',tab); 
      },
      change(msg) {
        this.msg = msg;
        console.log(msg,'这是你儿子转来的')
      },
      getDate(){      
          if(localStorage.getItem('refund')){
                this.currentTab = localStorage.getItem('refund');
                this.name = localStorage.getItem('refund');
            } 
            else if(this.$route.query.name){
                this.currentTab = this.$route.query.name;
                this.name = this.$route.query.name;
            }
            else{
                this.currentTab = 'refundOrder'
                this.name = 'refundOrder'
            }                    
      },
    },
    components:{
        refundOrder, 
        handling,   
        refundSuccess,
        refuseRefund
    },
    created(){
        this.getDate();
    },
}
</script>
<style scoped>
#orderrefund >>> .el-badge__content.is-fixed{
  right: 30px;
}  
#orderrefund >>> .el-tabs--top.el-tabs--card .el-tabs__item:last-child{
    padding-left: 0;
}
#orderrefund >>> .el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2){
    padding-left: 0;    
}
#orderrefund >>> .el-tabs__item.is-active{
    background-color: #1491f2;
    color: #FFF;
}
#orderrefund >>> .el-tabs__item{
    color: #333;
    width: 100px;
    text-align: center;
    padding: 0;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
}
#orderrefund >>> .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: none;
}
#orderrefund >>> .el-tabs--card>.el-tabs__header .el-tabs__item{
    border: none;    
}
#orderrefund >>> .el-tabs__nav-wrap {
    padding-top: 30px;
}
#orderrefund >>> .el-main{
    padding: 0;
    padding-top: 10px;
    padding-left: 10px;     
    background-color: #f8f8f8   
}
#orderrefund >>> .el-button{
    background-color: #1491f2;
    color: #FFF;   
    width: 80px;
    font-size: 12px;
    border-radius: 4px;
}
#orderrefund >>> .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 150px;
}
#orderrefund >>> .el-breadcrumb{
    line-height: 60px;
}
.xu{
    margin-left: 100px;
}
.main{
    background-color: #FFF;
}
.main-form{
    background-color: #f8f8f8;
    padding-top: 20px;  
    padding-bottom: 20px;    
}
.form-input{
    width: 220px;
}
.order-time{
    width: 300px;
}
.order-sel{
    width: 120px;
}
.order-exhibition{
    min-width: 660px;
    padding-top: 20px;      
    padding-left: 10px;
}
.order-exhibition ul{
    height: 30px;
    line-height: 30px;
}
.order-exhibition ul li{
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
.refund{
    padding-left: 10px;
}
</style>
<style lang="stylus" scoped>
#orderrefund 
    width: 100%;
    .el-main
        overflow-x hidden
        padding 0;   
        margin-left: 10px;
        margin-top: 10px;  
        background-color: #FFF;         
        .order-screen
            width: 100%;
            margin-left: 10px;
            margin-top: 10px;
            padding-left: 10px;
            background-color: #f8f8f8;
</style>