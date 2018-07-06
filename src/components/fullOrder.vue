<template>
    <div id="fullOrder">
        <el-table 
        :data="dd"
        style="width:100%" size="mini">        
        <el-table-column            
            label="商品"            
            width="380">
            <template slot-scope="scope">
                <div class="title-info-num">
                    订单号：9876543210&nbsp;&nbsp;2018/5/10&nbsp;15:13
                </div>            
                <div class="goods-exhibition" @mouseenter="enter" @mouseleave="leave" @click="goDetail()">
                    <div class="goods-pic">
                        <div class="news">1</div>
                    </div>
                    <div class="goods-data">
                        <p>铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞</p>
                        <p>商品编码：12345678941</p>
                        <p>颜色：黑色积分看电视</p>
                        <p class="price">￥25</p>                        
                        <el-button type="primary" size="mini">还有更多商品</el-button >
                    </div>
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
                <!--等待付款-->
                <div class="title-info-num">
                    订单号：9876543210&nbsp;&nbsp;2018/5/10&nbsp;15:13
                </div>            
                <div class="goods-exhibition">
                    <div class="goods-pic">
                        <div class="news">1</div>
                    </div>
                    <div class="goods-data">
                        <p>铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞铜芯火花塞火花塞</p>
                        <p>商品编码：12345678941</p>
                        <p>颜色：黑色</p>
                        <p class="price">￥25</p>
                        <!-- <button>还有更多商品</button> -->
                    </div>
                </div>
                {{scope.row.name}}                
            </template>
        </el-table-column>
        <el-table-column            
            label="收货人地址"
            width="240">
            <template slot-scope="scope">
                <!-- 等待发货 -->
                <div class="title-info">
                    <span class="to-color">等待发货</span>
                </div>
                <div class="goods-addres">
                    <p><span>小红</span><span>123456789102</span></p>
                    <p>广东省广州市越秀区广园东路登峰街191号百瑞什么名字都大厦616</p>
                </div>  
                 <!--等待付款 -->
                <div class="title-info">
                    <span class="to-color">等待付款</span>
                </div>
                <div class="goods-addres"> 
                    <p><span>小红</span><span>123456789102</span></p>
                    <p>广东省广州市越秀区广园东路登峰街191号百瑞什么名字都大厦616</p>
                </div>              
                {{scope.row.name}}                
            </template> 
        </el-table-column>
        <!-- keep-alive -->
        <el-table-column            
            label="客户备注"
            width="180">
            <template slot-scope="scope">
                <!--等待发货-->
                <div class="title-info">                   
                </div>
                <div class="goods-remarks">
                    <p>发货怒米欧几发货怒米欧几发货怒米欧几发货怒米欧几</p>
                </div>
                <!--等待付款-->
                <div class="title-info">                   
                </div>
                <div class="goods-remarks">
                    <p>发货怒米欧几发货怒米欧几发货怒米欧几发货怒米欧几</p>
                </div>
                {{scope.row.name}}                
            </template>
        </el-table-column>
        <el-table-column           
            label="订单金额"
            width="166">
            <template slot-scope="scope">
                <!--等待发货-->
                <div class="title-info">                   
                </div>
                <div class="goods-money">
                    <p>运费：<span>+10</span></p>
                    <p>优惠：<span>-2</span></p>
                    <p>实付金额：<span>50</span></p>
                </div>
                <!--等待付款-->
                <div class="title-info">                   
                </div>
                <div class="goods-money">
                    <p>运费：<span>+10</span></p>
                    <p>优惠：<span>-2</span></p>
                    <p>实付金额：<span>50</span></p>
                </div>
                {{scope.row.name}}                
            </template>
        </el-table-column>
        <el-table-column           
            label="操作"
            width="234">
            <template slot-scope="scope">
                <!--等待发货-->
                <div class="title-info">    
                    <div class="consultation">
                        <span>下单人：小明</span>                 
                        <img src="../images/orderImg/liaotian_icon.png" width="26">
                    </div>                                                          
                </div>
                <div class="goods-operation">
                    <div class="left-btn">
                    </div>
                    <div class="right-btn">
                        <el-button type="primary" size="mini" @click="remarks">员工备注</el-button >
                        <el-button type="primary" size="mini" @click="confirmGoods">确定发货</el-button >
                    </div>
                </div>
                <!--等待付款-->
                <div class="title-info"> 
                    <div class="consultation">
                        <span>下单人：小明</span>                 
                        <img src="../images/orderImg/liaotian_icon.png" width="26">
                    </div>                  
                </div>
                <div class="goods-operation">
                    <div class="left-btn">
                        <el-button type="primary" size="mini" @click="modifyFreight">修改运费</el-button >
                        <el-button type="primary" size="mini">设置优惠</el-button >
                    </div>
                    <div class="right-btn">
                        <el-button type="primary" size="mini" @click="remarks">员工备注</el-button >                                              
                    </div>
                </div>
                {{scope.row.name}}                
            </template>
        </el-table-column>
        </el-table>        
        <!--确定发货弹窗-->                                   
        <div class="model" v-show="abc" @click="colse(1)"> 
            <div class="logistics-info" @click.stop="colse(2)">
                <div class="addres-info">
                    <p>填写发货信息</p> 
                    <img src="../images/orderImg/jiah.png" @click="open">               
                </div>
                <div class="logistics-mode">
                    <!-- <el-tabs v-model="activeName2" type="card">    
                        <el-tab-pane label="物流配送" name="first">123</el-tab-pane>
                        <el-tab-pane label="自主配送" name="second">456</el-tab-pane>                        
                    </el-tabs> -->
                    <el-button type="primary" size="mini" :class="{choice:active=='logistics'?false:true}" @click="distribution(1)">物流配送</el-button>
                    <el-button type="primary" size="mini" :class="{choice:active=='self'?false:true}" @click="distribution(2)">自主配送</el-button>
                </div>
                <div class="logistics-Choice" v-if="active=='logistics'">
                    <div class="">
                        <div class="order-detail"> 
                            <label>物流配送：</label>
                            <el-select v-model="value" placeholder="请选择" size="mini" class="el-sel">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>                       
                        </div> 
                        <div class="logistics-num">
                            <label>物流单号：</label>
                            <el-input v-model="logisticsNum" placeholder="请输入物流单号" class="logistics-input" size="mini"></el-input>
                        </div>                        
                    </div>
                </div>
                <div v-else class="self">
                    <p>"选择自主配送，无需物流配送，订单详情将
生成一个二维码，商家自主送到买家后，由买家扫描二
维码并确认收货即可！"</p>                    
                </div>
                <div class="logistics-btn">
                    <el-button type="primary" size="mini" @click="colse(3)">确定发货</el-button>
                </div>
            </div>   
            <!-- 添加物流 -->
            <div class="add-model" v-show="isNotOpen" @click.stop="colse(4)">    
                <div class="add-log">添加物流</div> 
                <div class="add-log-info">
                    <label>物流名称：</label>
                    <el-input v-model="logisticsName" placeholder="请输入物流名称" class="logistics-input" size="mini"></el-input>
                </div>  
                <div class="add-log-info">
                    <label>物流电话：</label>
                    <el-input v-model="logisticsPhone" placeholder="请输入物流电话" class="logistics-input" size="mini"></el-input>
                </div>  
                <div class="bot-btn">
                    <el-button type="primary" size="mini" @click.stop="colse(5)">取消</el-button>
                    <el-button type="primary" size="mini">确定</el-button>
                </div>                   
            </div>        
        </div> 
        <!-- //备注模态框 -->
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
    </div>
</template>

<script>
import { MessageBox } from 'element-ui';
export default {
    data(){
        return{ 
            dd:[{
                name: ''
            }],
            isNotOpen: false,
            abc: false,
            options: [{
                value: '选项1',
                label: '运城'
                }, {
                value: '选项2',
                label: '申通快递'
                }, {
                value: '选项3',
                label: '中通快递'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
        value: '',
        input: '', 
        logisticsNum: '',
        logisticsName: '',
        logisticsPhone: '',
        active: 'logistics',    
        activeName2: 'first',
        remarksModel: false,
        show: false,
        div: [
            {abc: 123},
            {abc: 123},
            {abc: 123},
            {abc: 123},
            {abc: 123},
            {abc: 123},
            {abc: 123},
            {abc: 123},
        ]
        }            
    },
    methods:{
        open(){            
            this.isNotOpen = !this.isNotOpen;
        },
        modifyFreight(){
           this.$prompt('修改运费', {
            confirmButtonText: '确定',
            cancelButtonText: '取消', 
            center: true,                  
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '您修改的运费是：'+ value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
    confirmGoods(){
        this.abc = !this.abc;
        $('html,body').css('overflow','hidden');
    },
    colse(num){
        if(num==1||num==3){
            this.abc = false;
           $('html,body').css('overflow','hidden');
        }
        else if(num==5){
            this.isNotOpen =false;
        }     
        else{
            return;
        }   
    },
    colseRemarks(num){
        if(num==1){
            this.remarksModel = false;
        }
        else{
            return;
        }
    },
    distribution(choice){
        if(choice==1){
            this.active = 'logistics'
        }
        else if(choice==2){
            this.active = 'self'
        }        
    },
    remarks(){
        this.remarksModel = true;
         $('html,body').css('overflow','hidden');
    },
    enter(){  
        this.show = true;      
    },
    leave(){
        this.show = false;
    },
    goDetail(){
        alert(123);
        this.$router.push({path: 'profile/orderdetail'})
    }
    },    
    commponents:{
        MessageBox,
    },
    created(){
        
    }
}
</script>
<style scoped>
/* #fullOrder .el-button{
    background-color: #1491f2;
    color: #FFF;
} */
#fullOrder >>> .el-input_inner{
    text-align: center!important;
}
#fullOrder >>> .el-table_1_column_1 .is-leaf{
    padding-left: 20px;
}
#fullOrder >>> .el-button+.el-button{
    margin-left: 0;
}
#fullOrder >>> .el-table th{
    background-color: #f2f2f2;    
}
#fullOrder >>> .el-table thead {
    color: #333;
    font-size: 14px;    
}
#fullOrder >>> .el-table th, .el-table tr{
    background-color: #f8f8f8;
}
#fullOrder >>> .el-table .cell{
    padding: 0;
    margin-top: 15px;
}
.title-info{
    width: 100%;
    height: 40px;
    line-height: 40px; 
    background-color: #f8f8f8;              
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
.title-info-num{
    width: 100%;
    height: 40px;
    line-height: 40px; 
    background-color: #f8f8f8;  
    padding-left: 20px;        
}
.goods-exhibition{   
    min-height: 140px;
    border-top: 1px solid #E8E9EB;
    border-bottom: 1px solid #E8E9EB;
    border-left: 1px solid #E8E9EB;
    padding-top: 20px;
    padding-bottom: 20px;   
    padding-left: 20px;
    padding-right: 5px;  
    position: relative; 
}
.goods-addres{
    width: 100%;
    min-height: 140px;
    border-top: 1px solid #E8E9EB;
    border-bottom: 1px solid #E8E9EB;              
}
.goods-remarks{
    width: 100%;
    min-height: 140px;
    border-top: 1px solid #E8E9EB;
    border-bottom: 1px solid #E8E9EB;
    font-size: 12px;
    color: #333;
    padding-top: 20px;    
}
.goods-remarks p{
    width: 80%;
}
.goods-money{
    min-height: 140px;
    border-top: 1px solid #E8E9EB;
    border-bottom: 1px solid #E8E9EB;    
    padding-top: 20px;    
}
.goods-money p {
    margin-bottom: 10px;   
}
.goods-money p span{
    color: red;
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
.goods-pic{
    background-color: #333;
    width: 100px;
    height: 100px;     
    margin-right: 10px;
    float: left;
    position: relative;
}
.goods-data{
    float: left; 
    width: 202px;                        
    font-size: 12px;           
}
.goods-data button{
    float: right;    
    margin-top: -5px;
}
.goods-data .price{
    display: inline-block;
    color: #333; 
    margin-top: 6px;
       
}
.goods-data p:first-child{
    font-size: 14px;
    overflow: hidden;/*内容超出后隐藏*/
    text-overflow: ellipsis;/* 超出内容显示为省略号*/
    white-space: nowrap;/*文本不进行换行*/
    color: #333;
    margin-bottom: 6px;
}
.goods-data p:last-child{
    color: #333;          
}
.goods-data p{
    margin-bottom: 2px;
    color: #666;    
}
.goods-addres{
    padding-top: 20px;       
    color: #333;
    font-size: 16px;
    width: 100%;    
}
.goods-addres p:first-child{
    font-size:18px;
    margin-bottom: 15px;
    width: 85%;
}
.goods-addres p:last-child{
    width: 80%;    
    
}
.goods-addres p span:first-child{
    margin-right: 30px;
}
.to-color{
    color: #1491f2!important;    
}
/* 确定发货弹窗 */
.model{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(127,127,127,0.6);
    justify-content: center;
    display: flex;
    align-items: center;   
}
.logistics-info{
    width: 320px;
    height: 320px;
    background-color: #FFF;    
}
.addres-info{
    width: 100%;
    height: 40px;
    background-color: #f2f2f2;
    justify-content: space-between;
    align-items: center;
    display: flex;
}
.addres-info p{
    color: #333;
    font-size: 16px;        
    padding-left: 112px;    
}
.addres-info img{ 
    width: 40px;    
}
.logistics-mode{
    justify-content: center;
    align-items: center;
    display: flex;
    height: 86px;
}
.logistics-mode button{
    width: 120px;    
}
.choice{
    background-color: #FFF;
    color: #1491f2;
}
.order-detail{
    font-size: 14px;
    color: #333;
    justify-content: center;
    align-items: center;
    display: flex;
}
.order-detail .el-sel{
    width: 166px;
}
.logistics-num{
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}
.logistics-num .logistics-input{
    width: 166px;
}
.logistics-btn{
    text-align: center;
    margin-top: 36px;
}
.add-model{    
    position: relative;  
    z-index: 100;             
    left: 10px;
    top: -80px;      
    width: 230px;
    height: 160px;
    background-color: #FFF;     
}
.add-log{    
    width: 100%;
    height: 30px;
    background-color: #f2f2f2;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
}
.add-log-info{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    color: #333333;
    font-size: 14px;
}
.add-log-info .logistics-input{
    width: 128px;
}
.bot-btn{
    width: 100%;
    height: 30px;    
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
}
.bot-btn button{
    width: 50%;
    height: 100%;
    font-size: 14px;
    border: none;
}
.bot-btn button:first-child{
    background-color: #f2f2f2;
    color: #333;
}
.self{
    width: 100%;    
    padding-left: 16px;
    margin-bottom: 56px;
}
.self p{
    width: 288px;
    font-size: 12px;
    color: #333;
    height: 49px;
    line-height: 18px;
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
    text-overflow: ellipsis;/* 超出内容显示为省略号*/
    white-space: nowrap;/*文本不进行换行*/
    color: #fff;
    margin-bottom: 6px;
}
</style>
