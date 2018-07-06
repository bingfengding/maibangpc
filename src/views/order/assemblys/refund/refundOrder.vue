<template>    
    <div id="refundOrder">
        <el-table       
        :data="tableData"   
         style="min-width: 866px;">
            <el-table-column           
            label="商品"
            min-width="284">
                <template slot-scope="scope">       
                    <div class="title-info-num">服务号：{{scope.row.service_id}}&nbsp;&nbsp;{{scope.row.apply_time}}</div>
                    <div class="goods-exhibition" @click="goDetail(scope.row.id)" v-for="(item,index) in scope.row.products" :key="index" v-if="scope.row.products.length==1">
                        <div class="goods-pic">
                            <img :src="item.pro_image" width="100%" height="100%"> 
                            <div class="news">{{item.number}}</div>
                        </div>
                        <div class="goods-data">
                            <p>{{item.product_name}}</p>
                            <p>编码：{{item.product_sku_num}}</p>
                            <p>{{item.pro_sku_name}}</p>
                            <p class="price">&yen;&nbsp;{{item.unitPrice}}</p>                        
                            <!-- <el-button type="primary" size="mini">还有更多商品</el-button > -->
                        </div>
                </div>
                <el-popover         
                    placement="top-start"                                                              
                    trigger="hover" 
                    v-if="scope.row.products.length>1">                    
                        <div class="show-goods">                            
                            <div class="show-exhibition" v-for="(data,index) in goodsData" :key="index" @click="goDetail(scope.row.id)">
                                <div class="show-pic">
                                    <img :src="data.pro_image" width="100%" height="100%">
                                    <div class="news">{{data.number}}</div>
                                </div>
                                <div class="show-data">
                                    <p>{{data.product_name}}</p>
                                    <p>编码：{{data.product_sku_num}}</p>
                                    <p>{{data.pro_sku_name}}</p>
                                    <p class="price">&yen;&nbsp;{{data.unitPrice}}</p>                                                
                                </div>
                            </div>                                                                                                                                                                                  
                    </div>
                    <div class="goods-exhibition" slot="reference"  @mousemove="enter(scope.row.products)" @click="goDetail(scope.row.id)">
                        <div class="goods-pic">                        
                            <img :src="scope.row.products[0].sku_img" width="100%" height="100%">
                            <div class="news">{{scope.row.products.length}}</div>
                        </div>
                        <div class="goods-data">
                            <p>{{scope.row.products[0].product_name}}</p>
                            <p>编码：{{scope.row.products[0].product_sku_num}}</p>
                            <p>{{scope.row.products[0].pro_sku_name}}</p>
                            <p class="price">&yen;&nbsp;{{scope.row.products[0].unitPrice}}</p>                        
                        <el-button type="primary" size="mini" style="width:100px;" >还有更多商品</el-button >
                        </div>
                    </div>                      
                    </el-popover>    
                    <div class="goods-exhibition" v-if="scope.row.products.length==0">
                        <div style="background-color: #CCC" class="goods-pic">                                                    
                        </div>
                        <div class="goods-data">
                            <p>非常抱歉没有找到您的商品</p>
                            <!-- <p>商品编码：</p>
                            <p>颜色：</p>
                            <p class="price">&yen;</p>                         -->
                            <!-- <el-button type="primary" size="mini">还有更多商品</el-button > -->
                        </div>
                    </div>                                         
                </template>
             </el-table-column>
            <el-table-column
            label="退款理由"
            min-width="100">
                <template slot-scope="scope">
                    <div class="title-info-num2">
                        <p class="color-1491f2" v-if="scope.row.status==0">申请退款中</p>
                        <p class="color-1491f2" v-if="scope.row.status==1">买家取消退款</p>
                        <p class="color-1491f2" v-if="scope.row.status==2">已退款</p>
                        <p class="color-1491f2" v-if="scope.row.status==3">已拒绝退款</p>
                        <p class="color-1491f2" v-if="scope.row.status==4">已自动退款</p>                        
                    </div>               
                    <div class="goods-remarks" style="font-szie:14px;">
                        <p>{{scope.row.issue_describe}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column 
            label="订单金额" 
            min-width="136">
                <template slot-scope="scope">
                    <div class="title-info-num2" style="font-size: 12px;">订单号：{{scope.row.order.order_num}}</div>                    
                    <div class="refund-money" >退款金额：<span>&yen;&nbsp;{{scope.row.allmoney}}</span></div>                                  
                </template>
            </el-table-column>
            <el-table-column 
            label="经手业务员" 
            min-width="70">
                <template slot-scope="scope">      
                    <div class="title-info-num2"></div>      
                    <div class="staff-name">{{scope.row.staff_name}}</div>
            </template>        
            </el-table-column>
            <el-table-column 
            label="操作" 
            min-width="260">
                <template slot-scope="scope">  
                    <div class="title-info"> 
                    <div class="consultation">
                        <span @click="toCustomer(scope.row.remarkName)">下单人：{{scope.row.remarkName}}</span>  
                        <!-- <span v-else @click="toCustomer(scope.row.returnBelongUser.name)">下单人：{{scope.row.returnBelongUser.name}}</span>                  -->
                        <img src="@/images/orderImg/liaotian_icon.png" width="26" @click="liaotian">
                    </div>                  
                </div>
                <div class="goods-operation">
                    <div class="left-btn">
                        <el-button type="primary" size="mini" @click="agree(scope.row.id)" v-if="scope.row.status==0">同意退款</el-button >
                        <el-button type="primary" size="mini" @click="refund(scope.row.id)" v-if="scope.row.status==0">拒绝退款</el-button >
                    </div>
                    <div class="right-btn">
                        <el-button type="primary" size="mini" @click="remarks(scope.row.id)">员工备注</el-button >                                              
                    </div>                   
                </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="foot">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="10"
                layout="prev, pager, next"
                :total="allStatusCount.all">
            </el-pagination>
            <span>共{{allStatusCount.all}}条，一页10条</span>
        </div>        
        <!-- //员工备注模态框 -->
        <div class="remarksModel" v-if="remarksModel" @click="colseRemarks(1)">
            <div class="remsrks-content" @click.stop="colseRemarks(2)">               
                <div class="staff-remsrks">
                    <p>员工备注</p>
                     <!-- 循环 -->
                    <div class="staff" v-for="(items,index) in remarkData" :key="index" v-if="remarkData">
                        <div class="staff-info">
                            <div class="info-left">
                                <div class="head">
                                    {{items.length}}
                                    <!-- <img :src="@/images/orderImg/liaotian_icon.png"> -->                                    
                                    <img :src="items.staff.staff_img" width="100%" height="100%">
                                </div>
                                <span>{{items.staff.staff_name}}</span>
                            </div>
                            <div class="info-right"><p>{{items.remark_time}}</p></div>
                        </div>
                        <div class="remsrks">
                            {{items.remark_content}}
                        </div>
                    </div>    
                    <div class="not-data" v-if="remarkData.length==0">
                        <p>暂时没有数据</p>    
                    </div>                                   
                </div>              
                <div class="submission">
                    <el-input size="mini" type="text" class="sub-input" v-model="remarkContent"></el-input>
                    <el-button type="prinary" class="sub-prinary" size="mini" @click="addRemarks">备注</el-button>
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
                    <el-button type="prinary" size="mini" class="refuse-determine" @click="refuseDetermine">确定拒绝</el-button> 
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
import {refundList,staffremark,addOrderRemark,agreeToReturn,refuseRefund} from '@/api/order/ordermanage'
import { Loading } from 'element-ui'
export default {
    data(){
        return {
            from:{
                orderNumber: '',
                serviceNumber: '',
                applyTime: {
                    start: '',
                    end: '',                    
                },
                status: 'all',
            },
            // props:['123'],//传给父级
            all: null,
            page_num: null,
            goodsData: [],
            tableData: [{
                remarkName: '',
                returnBelongUser:{
                    name: '',
                },
                apply_time: '',
                id: '',//订单id
                service_id: '',//服务号
                status: '',//申请退款状态0申请退款中1买家取消退款2已退款3已拒绝退款4已自动退款
                issue_describe: '',//退款理由
                allmoney: '',//退款金额
                order:{
                        order_num:'',//订单号
                        id: '',//订单id
                        rec_address:{
                            name: '',//下单人
                        }
                    },//订单信息
                staff_name: '',//经手业务员
                time: '',//时间
                products:[{
                    // pro_image: '',//图片
                    // pro_sku_allmoney: '',//金额
                    // product_name: '',//产品名称
                    // product_sku_num: '',//编码
                    // pro_sku_name: '',//颜色
                },
                ],
            }],
            show: '',
            remarksModel: false,
            //是否弹窗同意退款
            showArgee: false,
            //是否弹窗拒绝退款
            showRefuse: false,
            //拒绝退款理由
            textarea: '',
            //默认的页数
            currentPage1: 1,  
            //设置分页
            page: 1,   
            //订单id
            orderId: '',    
            //提交备注内容
            remarkContent: '',  
            //获取的员工备注
            // remark_content: '',
            //获取员工时间差
            // remark_time: '',
            //获取员工信息
            // staff:{
                // staff_name: '',//员工名字
                // staff_img: '',//员工头像
            // }
            //获取员工备注信息
            remarkData: '',
            allStatusCount: [],
            loading: false
        }
    },
   //props: ['zizujian'],
    watch:{
        
    },
    methods:{
        parentMsg(from){            
            console.log(from)    
            if(from.refundState=="全部"){               
                this.from.refundState = 'all';
            }        
            else if(from.refundState=="退款中"){           
                this.from.status = 'applying';
            }        
            else if(from.refundState=="退款成功"){               
                this.from.status = 'success';
            }        
            else if(from.refundState=="拒绝退款"){                
                this.from.status = 'refuse';
            }        
            else if(from.refundState=="取消退款"){                
                this.from.status = 'cancel';
            }
            this.from.orderNumber = from.orderNum
            this.from.serviceNumber = from.serviceNum
            this.from.applyTime.start = from.value1
            this.from.applyTime.end = from.value2                      
            this.getData();
        },
        setParent(){
            this.$emit('getChild','这是你儿子的信息')
        },
         //提示
        liaotian(){
           this.$message('请移步到app聊天');
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        //currentPage 改变时会触发
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);            
            this.page = val;         
            localStorage.setItem("refunsPage",val);   
            this.getData();
        },
        //添加备注
        addRemarks(){
            if(this.remarkContent.length<1){
                this.$message.error('备注内容不能为空哦！')
            }
            else{
                let data = {
                    orderId: this.orderId,
                    content: this.remarkContent,
                }
                addOrderRemark(data).then(res =>{
                    console.log(res)
                    // 
                    if(res.data.code==200){
                        this.remarkContent = '';
                        this.Multipurpose();
                    }                    
                    else if(res.data.code==400){
                        this.remarkContent = '';
                        this.$message.error(res.data.error)
                    }
                    else if(res.data.code==500){
                        this.remarkContent = ''
                        this.$message.error(res.data.error)
                    }
                },err =>{
                    this.$message.error(err);
                })

            }            
        },
        up(){        
            this.$emit('upup',this.allStatusCount); //主动触发upup方法，'hehe'为向父组件传递的数据
        },
        //创建时
        getData(){                                                                        
            this.tableData = []; 
            let params = {
                page: this.page,
                options:{
                    serviceNumber: this.from.serviceNumber,
                    status: this.from.status,                
                    orderNumber:  this.from.orderNumber,
                    applyTime:{
                        start: this.from.applyTime.start,
                        end: this.from.applyTime.end,
                    }                    
                }
            }
            refundList(params).then(res =>{
                console.log(res,'退款')                
                if(res.data.code==200){                    
                    this.tableData = res.data.data.productReturns;                  
                    // console.log(this.tableData.status)                 
                    this.applying = res.data.data.allStatusCount.applying;
                    this.allStatusCount = res.data.data.allStatusCount 
                    this.up();  
                }
                else if(res.data.code==400){  
                    this.$message.error('加载失败！')                  
                    this.tableData = [];
                }
            },err =>{      
                this.$message.error(err)             
                console.log(res)
            })
        },
        //弹出是否同意退款
        agree(id){           
            this.showArgee = true;
            this.orderId = id
        },
        //鼠标移入移出事件
        enter(goodsData){  
            this.show = true;  
             this.goodsData = goodsData;    
            //  console.log(this.goodsData)
        },
        leave(){
            this.show = false;
        },
        //转动详情页面
        goDetail(id){            
            // this.$router.push({path:'reddetail',query:{id:this.id}})
            this.$router.push({path:'reddetail',query:{id:id}})
        },
        toCustomer(name){
            this.$router.push({path: '/customer/customerList',query:{name:name}});
        },
        //员工备注弹框
        remarks(id){            
            this.orderId = id;
            this.remarksModel = true;
            $('html,body').css('overflow','hidden');  
            this.Multipurpose();
        },
        //多用
        Multipurpose(){
            let data = {
                orderId: this.orderId,
            }
            staffremark(data).then(res =>{
                console.log(res,'获取员工备注')                
                if(res.data.code==200){
                    // this.remark_content = res.data.data.remark_content;
                    // this.remark_time = res.data.data.remark_time;
                    // this.staff = res.data.data.staff;
                    this.remarkData = res.data.data;                    
                }
            })
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
        refund(id){            
            this.showRefuse = true;    
            this.orderId = id;       
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
        //提交同意退款
        argeeRefund(){           
            let data = {
                returnId: this.orderId
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
                }
                else if(res.data.code==500){
                    this.showArgee = false;
                    this.$message.error(res.data.error);                                        
                }
            },err =>{
                this.$message.error(err);
            })
        },
        //拒绝退款
        refuseDetermine(){            
            if(this.textarea.length<1){
                this.$message.error('拒绝退款理由不能为空哦！');
            }
            else{
                let data = {
                    returnId: this.orderId,
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
                    }
                    else if(res.data.code==500){
                        this.showRefuse = false;
                        this.$message.error(res.data.error);                       
                    }
                },err =>{
                    this.$message.error(err);
                })
            }            
        },
    },
    created(){
        if(localStorage.getItem('refunsPage')){
            this.page = localStorage.getItem('refunsPage');
            this.currentPage1 = parseInt(localStorage.getItem('refunsPage'));
        } 
        else{
            this.page = 1;
            this.currentPage1 = 1;
        }
        this.getData()
    }
}
</script>
<style scoped>
.foot{
    /* border: 1px solid red; */
    margin-top: 50px;
    position: relative;
    height: 100px;
}
.foot span{
    position: absolute;
    right: 20px;
    top: 6px;
    font-size: 12px;
    color: #000;
}
#refundOrder >>> .el-table th:nth-child(1){
    padding-left: 20px;
} 
#refundOrder >>> .el-table th:nth-child(5){
    padding-right: 20px;
    text-align: right;
}  
#refundOrder >>> .el-table th:last-child{
    text-align: right;
}   
#refundOrder >>> .el-pagination{
    text-align: center;
}
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
}
#refundOrder >>> .el-table th:last-child .cell{
    color: red;
}
#refundOrder >>> .el-table th, .el-table tr{
    background-color: #f8f8f8;    
}
.title-info-num{
    width: 100%;
    height: 40px;
    line-height: 40px; 
    background-color: #f8f8f8;  
    padding-left: 20px;   
    margin-top: 15px;   
    font-size: 12px;  
}
.title-info-num2{
    width: 100%;
    height: 40px;
    line-height: 40px; 
    background-color: #f8f8f8;    
    margin-top: 15px;          
}
.color-1491f2{
    color: #1491f2;
    margin-top: 15px;
}
.goods-exhibition{   
    min-height: 140px;
    border-top: 1px solid #E8E9EB;
    border-bottom: 1px solid #E8E9EB;
    border-left: 1px solid #E8E9EB;         
    display: flex;
    justify-content: flex-start;
    align-items: center;       
    padding-left: 20px;         
    cursor: pointer;
}
.goods-pic{
    /* background-color: #333; */
    width: 100px;
    height: 100px;             
    position: relative;    
    margin-right: 10px;
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
    max-width: 150px;                        
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
    margin-top: 15px;
}
.consultation span{
    font-size: 14px;
    margin-right: 20px;
    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
    justify-content: flex-end;   
    align-items: center;
}
.goods-operation .left-btn{
    width: 100px;    
    height: 100px;      
    display: inline-flex;    
    flex-wrap: wrap; 
    align-items: center;    
}
.goods-operation .right-btn{
    width: 100px;
    height: 100px;                      
    display: inline-flex;     
    flex-wrap: wrap;
    align-items: center;        
}
/* 鼠标移入移出显示商品 */
.show-goods{
    width: 580px;      
    height: 400px; 
    flex-flow: row wrap;/*子元素溢出父容器时换行*/
    background-color: #f2f2f2;
    position: absolute;    
    z-index: 100;
    display: flex;
    justify-content: space-between;   
    flex-flow: row wrap;/*子元素溢出父容器时换行*/
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    overflow: auto;   
    cursor: pointer; 
}
/* 鼠标移入显示 */
.show-exhibition{
    width: 50%;             
    position: relative;
    color: #333;
    margin-bottom: 20px;
}
.show-pic{
    /* background-color: #ccc; */
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
    color: #333;
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
.not-data{
    margin-top: 50px;
    font-size: 20px;
    text-align: center;
}
</style>