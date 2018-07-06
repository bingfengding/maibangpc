<template>    
    <div id="refundOrder">
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
            label="商品"
            min-width="380">
                <template slot-scope="scope">       
                    <div class="title-info-num">服务号：9876543210&nbsp;&nbsp;2018/5/10&nbsp;15:13</div>
                    <div class="goods-exhibition" @mouseenter="enter" @mouseleave="leave" @click="goDetail()">
                        <div class="goods-pic">
                            <div class="news">999</div>
                        </div>
                        <div class="goods-data">
                            <p>铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞</p>
                            <p>商品编码：123456789</p>
                            <p>颜色：黑色积分看电视</p>
                            <p class="price">￥25</p>                        
                            <!-- <el-button type="primary" size="mini">还有更多商品</el-button > -->
                        </div>
                        <div class="show-goods" v-if="show" @mouseenter="enter" @mouseleave="leave">                                        
                    <div class="show-exhibition">
                        <div class="show-pic">
                            <div class="news">1</div>
                        </div>
                        <div class="show-data">
                            <p>铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞</p>
                            <p>商品编码：12345678941</p>
                            <p>颜色：黑色积分看电视</p>
                            <p class="price">￥25</p>                                                
                        </div>
                    </div> 
                    <div class="show-exhibition">
                        <div class="show-pic">
                            <div class="news">1</div>
                        </div>
                        <div class="show-data">
                            <p>铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞</p>
                            <p>商品编码：12345678941</p>
                            <p>颜色：黑色积分看电视</p>
                            <p class="price">￥25</p>                                                
                        </div>
                    </div>
                    <div class="show-exhibition">
                        <div class="show-pic">
                            <div class="news">1</div>
                        </div>
                        <div class="show-data">
                            <p>铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞</p>
                            <p>商品编码：123456789</p>
                            <p>颜色：黑色积分看电视</p>
                            <p class="price">￥25</p>                                                
                        </div>
                    </div>
                    <div class="show-exhibition">
                        <div class="show-pic">
                            <div class="news">1</div>
                        </div>
                        <div class="show-data">
                            <p>铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞</p>
                            <p>商品编码：12345678941</p>
                            <p>颜色：黑色积分看电视</p>
                            <p class="price">￥25</p>                                                
                        </div>
                    </div>                   
                    <!-- <div class="right">456</div> -->
                </div>
                </div>
                </template>
             </el-table-column>
            <el-table-column
            label="退款理由"
            min-width="200">
                <template slot-scope="scope">
                    <div class="title-info-num2">申请退款中</div>               
                    <div class="goods-remarks">
                        <p>发货怒米欧几发货怒米欧几发货怒米欧几发货</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="订单金额" min-width="160">
                <template slot-scope="scope">
                    <div class="title-info-num2">订单号：9876543210</div>                    
                    <div class="refund-money">退款金额：<span>58</span></div>                                  
                </template>
            </el-table-column>
            <el-table-column 
            label="经手业务员" 
            min-width="140">
                <template slot-scope="scope">      
                    <div class="title-info-num2"></div>      
                    <div class="staff-name">小红</div>
            </template>        
            </el-table-column>
            <el-table-column 
            label="操作" 
            min-width="200">
                <template slot-scope="scope">  
                    <div class="title-info"> 
                    <div class="consultation">
                        <span>下单人：小明</span>                 
                        <img src="../images/orderImg/liaotian_icon.png" width="26">
                    </div>                  
                </div>
                <div class="goods-operation">
                    <div class="left-btn">
                        <el-button type="primary" size="mini" @click="agree">同意退款</el-button >
                        <el-button type="primary" size="mini" @click="refund">拒绝退款</el-button >
                    </div>
                    <div class="right-btn">
                        <el-button type="primary" size="mini" @click="remarks">员工备注</el-button >                                              
                    </div>                   
                </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- //员工备注模态框 -->
        <div class="remarksModel" v-if="remarksModel" @click="colseRemarks(1)">
            <div class="remsrks-content" @click.stop="colseRemarks(2)">               
                <div class="staff-remsrks">
                    <p>员工备注</p>
                     <!-- 循环 -->
                    <div class="staff">
                        <div class="staff-info">
                            <div class="info-left">
                                <div class="head"><img src="../images/orderImg/liaotian_icon.png"></div>
                                <span>小芳</span>
                            </div>
                            <div class="info-right"><p>33秒前</p></div>
                        </div>
                        <div class="remsrks">
                            爱是佛科技我忘记我微积分分解分解见覅额磨粉机我文件
                        </div>
                    </div>                                       
                </div>              
                <div class="submission">
                    <el-input size="mini" type="text" class="sub-input"></el-input>
                    <el-button type="prinary" class="sub-prinary" size="mini">备注</el-button>
                </div>  
            </div>            
        </div>
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
                    <el-button type="prinary" size="mini" class="refuse-determine">确定拒绝</el-button> 
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    data(){
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            show: '',
            remarksModel: false,
            //是否弹窗同意退款
            showArgee: false,
            //是否弹窗拒绝退款
            showRefuse: false,
            //拒绝退款理由
            textarea: '',
        }
    },
    methods:{
        //弹出是否同意退款
        agree(){
            // alert(123)
            this.showArgee = true;
        },
        //鼠标移入移出事件
        enter(){  
            this.show = true;      
        },
        leave(){
            this.show = false;
        },
        //转动详情页面
        goDetail(){
            alert(123);
            this.$router.push({path: 'profile/orderdetail'})
        },
        //员工备注弹框
        remarks(){
            this.remarksModel = true;
            $('html,body').css('overflow','hidden');
        },
        //关闭员工弹框
        colseRemarks(num){
            if(num==1){
                this.remarksModel = false;
            }
            else{
                return;
            }
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
            // alert(123)
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

}
</script>
<style scoped>
#refundOrder >>> .el-textarea__inner{
    height: 103px;
}
#refundOrder >>> .el-message-box__content{
    text-align: center;
}
#refundOrder >>> .el-message-box{
    text-align: center;
}
#refundOrder >>> .el-table td, .el-table th{
    padding: 0;
}
#refundOrder >>> .el-table td, .el-table th.is-leaf{
    border: none;
}
#refundOrder >>> .el-button{
    margin-left: 0;
}
#refundOrder >>> .el-table .cell{   
    padding: 0; 
    margin-top: 15px;
}
#refundOrder >>> .el-table th, .el-table tr{
    background-color: #f2f2f2;    
}
.title-info-num{
    width: 100%;
    height: 40px;
    line-height: 40px; 
    background-color: #f8f8f8;  
    padding-left: 20px;        
}
.title-info-num2{
    width: 100%;
    height: 40px;
    line-height: 40px; 
    background-color: #f8f8f8;          
}
.goods-exhibition{   
    min-height: 140px;
    border-top: 1px solid #E8E9EB;
    border-bottom: 1px solid #E8E9EB;
    border-left: 1px solid #E8E9EB;         
    display: flex;
    justify-content: space-between;
    padding-top: 20px;   
    padding-right: 60px;        
}
.goods-pic{
    background-color: #333;
    width: 100px;
    height: 100px;             
    position: relative;
    margin-left: 20px;
}
/* 消息小圈圈 */
.news{
    height: 16px;
    line-height: 16px;
    text-align: center;
    min-width: 20px;
    padding: 0 3px;
    border-radius: 50px;
    font-size: 12px;
    text-align: center;
    background-color: #ED231E;
    position: absolute;
    top: -6px;
    right: -6px;        
    color:#fff;
}
.goods-data{        
    width: 200px;                        
    font-size: 12px;           
}
.goods-data .price{
    display: inline-block;
    color: #333; 
    margin-top: 3px;    
}
.goods-data p:first-child{
    font-size: 14px;
    overflow: hidden;/*内容超出后隐藏*/
    text-overflow: ellipsis;/* 超出内容显示为省略号*/
    white-space: nowrap;/*文本不进行换行*/
    color: #333;
}
.goods-data p:last-child{
    color: #333;          
}
.goods-data p{    
    color: #666;    
}
.title-info{
    width: 100%;
    height: 40px;
    line-height: 40px; 
    background-color: #f8f8f8;              
}
.goods-remarks{
    width: 100%;
    height: 140px;
    overflow: auto;
    border-top: 1px solid #E8E9EB;
    border-bottom: 1px solid #E8E9EB;
    font-size: 12px;
    color: #333;  
    padding-top: 20px;      
}
.goods-remarks p{
    width: 80%;
}
.staff-name{
    min-height: 140px;
    border-top: 1px solid #E8E9EB;
    border-bottom: 1px solid #E8E9EB;
    padding-top: 20px;    
}
.refund-money{    
    width: 100%;
    min-height: 140px;
    border-top: 1px solid #E8E9EB;
    border-bottom: 1px solid #E8E9EB;   
    padding-top: 20px;     
}
.refund-money span{
    color: red;
}
.consultation{
    justify-content: flex-end;
    align-items: center;    
    display: flex;    
}
.consultation span{
    font-size: 14px;
    margin-right: 20px;
}
.consultation img{
    margin-right: 20px;
    cursor:pointer;
}
.goods-operation{
    width: 100%;   
    min-height: 140px;
    border-top: 1px solid #E8E9EB;
    border-bottom: 1px solid #E8E9EB;
    border-right: 1px solid #E8E9EB;   
    display: flex;
    justify-content: space-between;   
    align-items: center;
}
.goods-operation .left-btn{
    width: 50%;    
    height: 100px;      
    display: inline-flex;    
    flex-wrap: wrap; 
    align-items: center;    
}
.goods-operation .right-btn{
    width: 50%;
    height: 100px;                      
    display: inline-flex;     
    flex-wrap: wrap;
    align-items: center;    
}
/* 鼠标移入移出显示商品 */
.show-goods{
    width: 580px;      
    height: 210px; 
    flex-flow: row wrap;/*子元素溢出父容器时换行*/
    background-color: rgba(0,0,0,0.9);
    position: absolute;    
    z-index: 100;
    display: flex;
    justify-content: space-between;   
    flex-flow: row wrap;/*子元素溢出父容器时换行*/
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    overflow: auto;    
}
/* 鼠标移入显示 */
.show-exhibition{
    width: 50%;             
    position: relative;
    color: #fff;
    margin-bottom: 20px;
}
.show-pic{
    background-color: #ccc;
    width: 100px;
    height: 100px;     
    margin-right: 10px;
    float: left;
    position: relative;
}
.show-data{
    font-size: 12px; 
}
.show-data p:first-child{
    font-size: 14px;
    overflow: hidden;/*内容超出后隐藏*/
    text-overflow: ellipsis;/*    超出内容显示为省略号*/
    white-space: nowrap;/*文本不进行换行*/
    color: #fff;
    margin-bottom: 6px;
}
/* 备注模态框 */
.remarksModel{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(127,127,127,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}
.remsrks-content{
    width: 500px;
    height: 590px;
    background-color: #FFF;
    overflow: auto;
}
.staff-remsrks{
    color: #333;
    padding-left: 20px;
    overflow: auto;
    height: 500px;    
}
.staff-remsrks p{
    width: 100%;
    font-size: 14px;
    height: 36px;
    padding-top: 19px;   
    margin-bottom: 9px;
}   
.staff{
    background-color: #f2f2f2;
    width: 460px;
    padding-right: 10px;
    padding-left: 10px;
    font-size: 14px;
    color: #333;
    margin-top: 10px;
}
.staff-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
.info-left{
    justify-content: flex-start;
    display: flex;
    align-items: center;
}
.info-left .head{
    width: 30px;
    height: 30px;
    border-radius: 100%;
    overflow: hidden;   
    margin: 10px;
    margin-left: 0;
}
.head img{
    width: 100%;
    height: 100%;
}
.remsrks{
    padding-top: 10px;
    padding-bottom: 40px;   
}
.submission{
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.submission .sub-input{
    width: 380px;
    margin-right: 10px;
    
}
.submission .sub-prinary{
    background-color: #1491f2;
    color: #FFF;
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