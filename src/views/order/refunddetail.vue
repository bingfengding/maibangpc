<template>
    <el-container id="orderrefund">
        <!-- header头 -->
        <el-header class="bgFFF">
        <el-breadcrumb>
            <el-breadcrumb-item>
            <span class="refund-status" v-if="status==0" style="color:red;cursor:pointer;" @click="back">退款处理中</span>   
            <span class="refund-status" v-if="status==2||status==4" style="color:red;cursor:pointer;" @click="back">同意退款</span>   
            <span class="refund-status" v-if="status==3" style="color:red;cursor:pointer;" @click="back">拒绝退款</span>   
            <span class="refund-status" v-if="status==1" style="color:red;cursor:pointer;" @click="back">取消退款</span>           
            /退款订单详情
            </el-breadcrumb-item>        
        </el-breadcrumb>
        </el-header>       
    <!-- 只要区域 -->     
        <el-main class="main"> 
            <div class="main-content">
                <p>订单信息</p>
                <div class="refuse-detail">                    
                    <div class="details-pic bg-color">    
                        <div class="pis-one icon1" v-if="status==0||status==2||status==3||status==4">
                            <img src="../../images/orderImg/refund1.png">
                            <p>申请退款</p> 
                        </div> 
                        <img src="../../images/orderImg/dian.png" class="img" v-if="status==2||status==3||status==4"> 
                        <div class="pis-one icon2" v-if="status==2||status==4">
                            <img src="../../images/orderImg/refund2.png"> 
                            <p>同意退款</p>
                        </div> 
                        <div class="pis-one icon3" v-if="status==3">
                            <img src="../../images/orderImg/refund2_2.png"> 
                            <p>拒绝退款</p>
                        </div>  
                        <img src="../../images/orderImg/dian.png" class="img" v-if="status==4||status==2">
                    <div class="pis-one icon4" v-if="status==4||status==2">
                        <img src="../../images/orderImg/refund3.png">
                        <p class="last">退款成功</p> 
                    </div>                          
                </div><!--details-pic结束-->           
                </div><!--refuse-detail结束-->
                <div class="service-num">
                    <span>服务号：{{service_id}}</span>
                    <span class="color-999" v-if="status==2">已退款</span>
                    <span class="color-red" v-if="status==0">申请退款中</span>
                    <span class="color-999" v-if="status==1">买家取消退款</span>
                    <span class="color-999" v-if="status==3">已拒绝退款</span>
                    <span class="color-999" v-if="status==4">已自动退款</span>
                </div><!--service-num结束-->                
                <div class="service-num">订单号：<span class="color-1491f2">{{order.order_num}}</span></div><!--service-num结束-->
                <div class="order-info">
                    <p>总数量：{{allnum}}</p>
                    <p>订单金额：<span>&yen;&nbsp;{{allmoney}}</span></p>
                    <p>经手业务员：{{staff_name}}</p>
                </div><!--service-num结束-->
                <div class="refunse-reason" v-if="issue_describe">
                    <div class="refunse-text">
                        <p>申请理由</p>
                        <p>{{issue_describe}}</p>
                    </div>                    
                </div><!--refunse-reason结束-->
                <div class="refunse-reason" v-if="reason">
                    <div class="refunse-text">
                        <p>拒绝理由</p>
                        <p>{{reason}}</p>
                    </div>                    
                </div><!--refunse-reason结束-->
                <div class="operation" v-if="status==0">
                    <div class="operation-type">
                        <el-button type="prinary" size="mini" @click="refund">拒绝退款</el-button>
                        <el-button type="prinary" size="mini" @click="agree">同意退款</el-button>
                    </div>  
                    <div class="prompt">
                        <p>倒计时：<span style="color:#ff0000">如商家不处理7天将自动退款</span></p>                        
                    </div>                  
                </div><!--refunse-reason结束-->
                <div class="goods-info">
                    <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                        <el-table-column                        
                        label="商品"
                        width="220">
                            <template slot-scope="scope">
                                <div class="goods-exhibition">
                                    <div class="goods-pic">
                                        <img :src="scope.row.pro_image" width="100%"  height="100%">
                                    </div>
                                    <div class="goods-data">
                                        <p>{{scope.row.product_name}}</p>                                                                                              
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column                       
                        label="商品属性"
                        width="120">
                            <template slot-scope="scope">
                                <div class="goods-attribute">
                                    <div>{{scope.row.pro_sku_name}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column                        
                        label="编码"
                        width="140">
                            <template slot-scope="scope">
                                <div class="goods-attribute">
                                    <div>{{scope.row.product_sku_num}}</div>
                                </div>
                            </template>                            
                        </el-table-column>                        
                        <el-table-column                        
                        label="单价">
                            <template slot-scope="scope">
                                <div class="goods-attribute">
                                    <div class="price">&yen;&nbsp;{{scope.row.pro_sku_allmoney}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column                        
                        label="数量">
                            <template slot-scope="scope">
                                <div class="goods-attribute">
                                    <div>{{scope.row.number}}</div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>                
            </div>
        </el-main>  
        <!-- //同意弹框 -->
        <div class="argee-model" v-if="showArgee" @click="colseArgee(1)">
            <div class="argee-content" @click.stop="colseArgee(2)">
                <div class="argee-text">同意退款</div>
                <div class="argee-btn">
                    <el-button type="prinary" class="argee-cancel" size="mini" @click="colseArgee(3)">取消</el-button>
                    <el-button type="prinary" class="argee-determine" size="mini" @click="argeeRefund">同意退款</el-button>
                </div>
            </div>
        </div>
        <!-- 拒绝弹框 -->
        <div class="refuse-model" v-if="showRefuse" @click="colseRefuse(1)">
            <div class="refuse-content" @click.stop="colseRefuse(2)">
                <div class="refuse-title">拒绝退款</div>
                <div class="refuse-text">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入拒绝退款理由"
                        v-model="textarea" class="textarea">
                    </el-input>
                </div>
                <div class="refuse-operation">
                    <el-button type="prinary" size="mini" class="refuse-cancel" @click="colseRefuse(3)">取消</el-button>
                    <el-button type="prinary" size="mini" class="refuse-determine" @click="refuseDetermine">确定拒绝</el-button> 
                </div>
            </div>
        </div>          
    </el-container>
</template>

<script>
import refundOrder from '@/views/order/assemblys/refund/refundOrder'
import {refundDetail,agreeToReturn,refuseRefund} from '@/api/order/ordermanage'
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
            tableData:[{
                    product_name: '',//产品名称
                    product_sku_num: '',//编码
                    pro_sku_allmoney: '',//单价
                    pro_sku_name: '',//属性
                    pro_image: '',//图片 
                    number: '',                   
            }],  
            service_id: '',//服务号             
            status: '',//退款状态
            allmoney: '',//订单金额
            allnum: '',//订单数量
            issue_describe: '',//申请理由
            reason: '',//拒绝原因
            staff_name: '',//员工
            order:{
                order_num: '',//订单号
            },     
            agreen_time: '',  
            returnId: '',//退款id 
            //退款id
            returnId: '',    
             //是否弹窗同意退款
            showArgee: false,
            //是否弹窗拒绝退款
            showRefuse: false,  
            //提交拒绝退款理由
            textarea: ''     
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        onSubmit() {
            console.log('submit!');
        },
        //创建时
        getData(){           
            let data = {
                returnId: this.returnId
            }
            refundDetail(data).then(res =>{
                console.log(res);
                if(res.data.code==200){                    
                    this.service_id = res.data.data.service_id
                    this.status = res.data.data.status
                    this.allmoney = res.data.data.allmoney
                    this.allnum = res.data.data.allnum
                    this.issue_describe = res.data.data.issue_describe
                    this.reason = res.data.data.reason
                    this.staff_name = res.data.data.staff_name
                    this.order.order_num = res.data.data.order.order_num
                    this.agreen_time = res.data.data.agreen_time
                    this.tableData = res.data.data.products;
                    this.returnId = res.data.data.id;
                }                
            })
        },
        //提交同意退款
        argeeRefund(){
            let data = {
                returnId: this.returnId
            }
            agreeToReturn(data).then(res =>{
                console.log(res) 
                if(res.data.code==200){
                    this.showArgee = false;
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.getData();
                }
                else if(res.data.code==400){
                    this.showArgee = false;
                    this.$message.error(res.data.error);                    
                    this.getData();
                }
            },err =>{
                console.log(res)
            })
        },
        //拒绝退款
        refuseDetermine(){
            if(this.textarea.length<1){
                this.$message.error('拒绝退款理由不能为空哦！');
            }
            else{
                let data = {
                    returnId: this.returnId,
                    reason: this.textarea,
                }
                refuseRefund(data).then(res =>{
                    console.log(res)
                    if(res.data.code==200){
                        this.showRefuse = false;
                        this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.getData();
                    }
                    else if(res.data.code==400){
                        this.showRefuse = false;
                        this.$message.error(res.data.error);
                        this.getData();
                    }
                })
            }            
        },
        //弹出是否同意退款
        agree(){           
            this.showArgee = true;
        },
        //关闭同意退款
        colseArgee(num){
            if(num == 1||num == 3){
                this.showArgee = false;
            }
            else{
                return;
            }
        },
        //拒绝退款弹框
        refund(){           
            this.showRefuse = true;            
        },
        //关闭拒绝退款弹窗
        colseRefuse(num){
            if(num == 1||num == 3){
                this.showRefuse = false;                
            }
            else{
                return;
            }
        },
    },
    components:{
        refundOrder,    
    },
    created(){
        this.returnId = this.$route.query.id;        
        this.getData();        
    },
}
</script>
<style scoped>  
/* #orderrefund >>> .el-tabs--top.el-tabs--card .el-tabs__item:last-child{
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
}
#orderrefund >>> .el-button{
    background-color: #1491f2;
    color: #FFF;
    margin-left: 100px;
    width: 80px;
    font-size: 14px;
    border-radius: 4px;
}
#orderrefund >>> .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 150px;
}
#orderrefund >>> .el-breadcrumb{
    line-height: 60px;
}
#orderrefund >>> .el-main{    
    margin-top: 10px;
    margin-left: 10px;
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
} */
#orderrefund >>> .el-table--border th:first-child .cell{
    text-align: left!important;  
    padding-left: 20px;  
}
#orderrefund >>> .el-table th>.cell{
    /* padding-left: 20px; */
    text-align: center;
}
#orderrefund >>> .el-button{
    width: 90px;
    height: 30px;
    background-color: #1491f2;
    color: #fff;
}
#orderrefund >>> .el-table th{
    background-color: #f2f2f2;   
}
#orderrefund >>> .el-main{    
    margin-top: 10px;
    margin-left: 10px;
}
.main{
    background-color: #FFF;    
    height: 100vh;
    font-size: 14px;
}
#orderrefund >>> .el-breadcrumb{
    line-height: 60px;
}
.main-content{
    width: 740px;
}
/* 申请状态 */
.details-pic{    
    height: 100px;    
    text-align: center;         
    display: flex;
    justify-content: flex-start; 
    align-items: center;  
    border-bottom: 1px solid #CCC;     
}
.details-pic .pis-one{   
    width: 100px;                    
}
.details-pic .pis-one img{
    width: 43.5%;            
}
.details-pic .pis-one p{
    font-size: 24px;    
    color: #333333;
}
.details-pic .pis-one .last{
    margin-top: 6px;
}
.details-pic img{
    width: 56px;    
}
.details-pic .img{    
    width: 120px;
    height: 8px;
}
.color-6{
    color: #1491f2!important;
}
/* 服务号 */
.service-num {
    border-bottom: 1px solid #ccc;
    height: 54px;
    line-height: 54px;
}
.service-num span:first-child{
    margin-right: 20px;
}
.color-333{
    color: #999;
}
.color-red{
    color: #ff0000;
}
.color-1491f2{
    color: #1491f2;
}
.order-info{
    border-bottom: 1px solid #CCC;
    height: 140px;
    line-height: 46px;
}
.order-info p span{
    color: red;
}
.refunse-reason{
    min-height: 100px;
    border-bottom: 1px solid #ccc; 
    justify-content: flex-start;       
    display:flex;
    align-items: center;
    margin-bottom: 30px;
}
.refunse-reason .refunse-text p:first-child{
    margin-bottom: 10px;
    padding-top: 10px;
}
.refunse-reason .refunse-text p:last-child{
    padding-bottom: 10px;
}
/* 商品信息 */
.goods-exhibition{    
    display: flex;
    justify-content: flex-start;   
    padding-left: 10px;     
}
.goods-pic{
    width: 60px;    
    height: 60px;
    margin-right: 10px;
    /* background-color: #ccc; */
}
.goods-data{
   width: 120px;
}
.goods-attribute{
    display: flex;
    justify-content: center;
    align-items: center;
}
.goods-attribute .price{
    color: red;
}
.operation{
    height: 100px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 30px;
}
.operation-type{
    margin-bottom: 20px;
}
.operation-type button:first-child{
    margin-right: 20px;
}
/* 同意模态框 */
.argee-model{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(127,127,127,0.6);    
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}
.argee-text{
    width: 100%;
    text-align: center;
}
.argee-content{
    width: 285px;
    height: 122px;
    background-color: #FFF;    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;    
}
.argee-btn .argee-cancel{
    background-color: #FFF!important;
    color: #1491f2!important;
    border: 1px solid #1491f2;
    width: 100px!important;
}
.argee-btn .argee-determine{        
    width: 100px!important;
}
/* 拒绝退款弹框 */
.refuse-model{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(127,127,127,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}
.refuse-content{
    width: 400px;
    height: 284px;
    background-color: #FFF;
}
.refuse-title{
    height: 55px;
    line-height: 55px;
    margin-left: 20px;

}
.refuse-text{
    text-align: center;
    font-size: 14px;
    color: #333;
}
.textarea{
    width: 380px;    
    margin-left: auto;
    margin-right: auto;
}
.refuse-operation{
    margin-top: 76px;
    text-align: right;
    margin-right: 10px;
}
.refuse-operation .refuse-cancel{
    background-color: #FFF!important;
    color: #1491f2!important;
    border: 1px solid #1491f2;
    width: 90px!important;
}
.refuse-operation .refuse-determine{   
    width: 90px!important;
}
</style>