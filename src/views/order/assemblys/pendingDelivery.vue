<template>
    <div id="pendingDelivery">
        <el-table         
        :data="tableData"
        style="min-width: 900px"
        >        
        <el-table-column            
            label="商品"            
            min-width="284">
            <template slot-scope="scope">
                <div class="title-info-num">
                    订单号：{{scope.row.order_num}}&nbsp;&nbsp;{{scope.row.order_time}}
                </div>            
                <div class="goods-exhibition" @click="goDetail(scope.row.id)" v-for="(item,index) in scope.row.proData" :key="index" v-if="scope.row.proData.length==1">
                    <div class="goods-pic">
                        <img :src="item.sku_img" width="100%" height="100%">  
                        <div class="news">{{item.product_amount}}</div>                      
                    </div>
                    <div class="goods-data">
                        <p>{{item.product_name}}</p>
                        <p>编码：{{item.product_sku_num}}</p>
                        <p>{{item.product_sku_name}}</p>
                        <p class="price">&yen;&nbsp;{{item.product_total_prices}}</p>                        
                        <!-- <el-button type="primary" size="mini">还有更多商品</el-button > -->
                    </div>
                </div>
                <el-popover
                    placement="bottom-start"
                    title="标题"                   
                    v-if="scope.row.proData.length>1">                    
                        <div class="show-goods">                            
                            <div class="show-exhibition" v-for="(data,index) in goodsData" :key="index" @click="goDetail(scope.row.id)">
                                <div class="show-pic">
                                    <img :src="data.sku_img" width="100%" height="100%">
                                    <div class="news">{{data.product_amount}}</div>
                                </div>
                                <div class="show-data">
                                    <p>{{data.product_name}}</p>
                                    <p>编码：{{data.product_sku_num}}</p>
                                    <p>{{data.product_sku_name}}</p>
                                    <p class="price">&yen;&nbsp;{{data.product_total_prices}}</p>                                                
                                </div>
                            </div>                                                                                                                                                                                  
                    </div>
                    <div class="goods-exhibition" slot="reference"  @mousemove="enter(scope.row.proData)" @click="goDetail(scope.row.id)">
                        <div class="goods-pic">                        
                            <img :src="scope.row.proData[0].sku_img" width="100%" height="100%">
                            <div class="news">{{scope.row.product_total}}</div>
                        </div>
                        <div class="goods-data">
                            <p>{{scope.row.proData[0].product_name}}</p>
                            <p>编码：{{scope.row.proData[0].product_sku_num}}</p>
                            <p>{{scope.row.proData[0].product_sku_name}}</p>
                            <p class="price">&yen;&nbsp;{{scope.row.proData[0].product_total_prices}}</p>                        
                            <el-button type="primary" size="mini">还有更多商品</el-button >
                        </div>
                    </div>  
                    </el-popover>        
                    <!-- div商品显示 -->                                                   
            </template>
        </el-table-column>
        <el-table-column            
            label="收货人地址"
            min-width="125">
            <template slot-scope="scope">
                <!-- 等待发货 -->
                <div class="title-info">
                    <span style="color: #1491f2" v-if="scope.row.status==2">等待发货</span>
                    <span style="color: #1491f2" v-if="scope.row.status==1">等待付款</span>
                    <span style="color: #1491f2" v-if="scope.row.status==5">等待收货</span>
                    <span style="color: #1491f2" v-if="scope.row.status==3">商家自配</span>
                    <span style="color: #1491f2" v-if="scope.row.status==4">买家自取</span>
                    <span style="color: #999" v-if="scope.row.status==9||scope.row.status==10">已完成</span>
                    <span style="color: #999" v-if="scope.row.status==12||scope.row.status==11">已取消订单</span>
                </div>
                <div class="goods-addres" v-if="scope.row.rec_address">
                    <p><span v-if="scope.row.rec_address.name">{{scope.row.rec_address.name}}</span><span v-else>没有找到相关的收货人名字</span><span v-if="scope.row.rec_address.phone">{{scope.row.rec_address.phone}}</span><span v-else>没有找到相关的的电话</span></p>
                    <p v-if="scope.row.rec_address.address">{{scope.row.rec_address.address}}</p>
                    <p v-else>没有找到相关的收货人地址</p>
                </div>       
                <div class="goods-addres" v-if="scope.row.rec_address==null">
                    <p><span>没有找到相关的收货人名字</span><span>没有找到相关的的电话</span></p>                    
                    <p>没有找到相关的收货人地址</p>
                </div>  
            
            </template> 
        </el-table-column>
        <!-- keep-alive -->
        <el-table-column            
            label="客户备注"
            min-width="100">
            <template slot-scope="scope">
                <!--等待发货-->
                <div class="title-info">                   
                </div>
                <div class="goods-remarks">
                    <p>{{scope.row.remarks}}</p>
                </div>
                <!--等待付款-->
                <!-- <div class="title-info">                   
                </div>
                <div class="goods-remarks">
                    <p>发货怒米欧几发货怒米欧几发货怒米欧几发货怒米欧几</p>
                </div>                               -->
            </template>
        </el-table-column>
        <el-table-column           
            label="订单金额"
            min-width="126">
            <template slot-scope="scope">
                <!--等待发货-->
                <div class="title-info">                   
                </div>
                <div class="goods-money">
                    <p>运费：<span v-if="scope.row.freight>0">+&yen;&nbsp;{{scope.row.freight}}</span><span v-else>此订单不含运费</span>
                    </p>
                    <p>优惠：<span>-&yen;&nbsp;{{scope.row.discount_price}}</span></p>
                    <p>实付金额：<span>&yen;&nbsp;{{scope.row.payment_amount}}</span></p>
                </div>
                <!--等待付款-->
                <!-- <div class="title-info">                   
                </div>
                <div class="goods-money">
                    <p>运费：<span>+10</span></p>
                    <p>优惠：<span>-2</span></p>
                    <p>实付金额：<span>50</span></p>
                </div>                                -->
            </template>
        </el-table-column>
        <el-table-column           
            label="操作"
            min-width="260">
            <template slot-scope="scope">
                <!--等待发货-->
                <div class="title-info">    
                    <div class="consultation">
                        <span @click="toCustomer(scope.row.remark_name,scope.row.user_id)">下单人：{{scope.row.remark_name}}</span>                 
                        <!-- <span v-else @click="toCustomer(scope.row.orderBelongUser.name)">下单人：{{scope.row.orderBelongUser.name}} </span>                  -->
                        <img src="../../../images/orderImg/liaotian_icon.png" width="26" @click="liaotian(scope.row)">
                    </div>                                                          
                </div>
                <div class="goods-operation">
                    <div class="left-btn">
                        <!-- <img :src="src" v-if="scope.row.status==3" width="100%"> -->
                         <el-button type="primary" size="mini" @click="modifyFreight(scope.row.id)" v-if="scope.row.status==1">修改运费</el-button >
                        <el-button type="primary" size="mini" @click="modifyDiscount(scope.row.id)" v-if="scope.row.status==1">修改优惠</el-button >
                        <el-button type="primary" size="mini" @click="remarks(scope.row.id)">员工备注</el-button >
                        <el-button type="primary" size="mini" @click="confirmGood(scope.row.id)" v-if="scope.row.status==2">确定发货</el-button >
                        <el-button type="primary" size="mini" @click="confirmGoods(scope.row.id,scope.row.status)" v-if="scope.row.status==3||scope.row.status==5">修改发货</el-button >
                    </div>
                    <div class="right-btn">
                        <el-button type="primary" size="mini" @click="printOrder(scope.row.id)">打印订单</el-button >                        
                    </div>
                </div>
                <!--等待付款-->
                <!-- <div class="title-info"> 
                    <div class="consultation">
                        <span>下单人：小明</span>                 
                        <img src="@/images/orderImg/liaotian_icon.png" width="26">
                    </div>                  
                </div>
                <div class="goods-operation">
                    <div class="left-btn">
                        <el-button type="primary" size="mini" @click="modifyFreight">修改运费</el-button >
                        <el-button type="primary" size="mini" @click="modifyDiscount">修改优惠</el-button >
                    </div>
                    <div class="right-btn">
                        <el-button type="primary" size="mini" @click="remarks">员工备注</el-button >                                              
                    </div>
                </div>                         -->
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
                :total="allTypeCount[1]">
            </el-pagination>
            <span>共{{allTypeCount[1]}}条，一页10条</span>            
        </div>           
        <!--确定发货弹窗-->                                   
        <div class="model" v-show="abc" @click="colse(1)"> 
            <div class="logistics-info" @click.stop="colse(2)">
                <div class="addres-info">
                    <p>填写发货信息</p> 
                    <img src="../../../images/orderImg/jiah.png" @click="open">               
                </div>
                <div class="logistics-mode">
                    <!-- <el-tabs v-model="activeName2" type="card">    
                        <el-tab-pane label="物流配送" name="first">123</el-tab-pane>
                        <el-tab-pane label="自主配送" name="second">456</el-tab-pane>                        
                    </el-tabs> -->
                    <el-button type="primary" size="mini" :class="{choice:active=='logistics'?false:true}" @click="distribution(1)" class="button1">物流配送</el-button>
                    <el-button type="primary" size="mini" :class="{choice:active=='self'?false:true}" @click="distribution(2)" class="button2">自主配送</el-button>
                </div>
                <div class="logistics-Choice" v-if="active=='logistics'">
                    <div class="">
                        <div class="order-detail"> 
                            <label>物流配送：</label>
                            <el-select v-model="value" placeholder="请选择" size="mini" class="el-sel"  @change="choiceType">
                                <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.logistics_name"   
                                :value="item.id">                               
                                </el-option>
                            </el-select>                       
                        </div> 
                        <div class="logistics-num">
                            <label>物流单号：</label>
                            <el-input v-model="logisticsNum" placeholder="请输入物流单号" class="logistics-input" size="mini" onkeyup="value=value.replace(/[^\w\-]/ig,'')"></el-input>
                        </div>                        
                    </div>
                </div>
                <div v-else class="self">
                    <p>"选择自主配送，无需物流配送，订单详情将
生成一个二维码，商家自主送到买家后，由买家扫描二
维码并确认收货即可！"</p>                  
                </div>
                <div class="logistics-btn">
                    <el-button type="primary" size="mini" @click="confirmToGoods">确定发货</el-button>
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
                    <el-input v-model="logisticsPhone" placeholder="请输入物流电话" class="logistics-input" size="mini" onkeyup="value=value.replace(/[^\w\-]/ig,'')" ></el-input>
                </div>  
                <div class="bot-btn">
                    <el-button type="primary" size="mini" @click.stop="colse(5)">取消</el-button>
                    <el-button type="primary" size="mini" @click="addLog">确定</el-button>
                </div>                   
            </div>        
        </div> 
        <!-- //备注模态框 -->
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
    </div>
</template>

<script>
import { MessageBox, Loading } from 'element-ui';
import {orderList,addOrderRemark,staffremark,confirmDelivery,qrOwnDelivery,modifyDiscountPrice,changeOrderFreightCost} from '@/api/order/ordermanage';
import {logisticsList,addLogistics} from '@/api/set/setmanage'
export default {
    data(){
        return{ 
            from: {
                receiverName: '', // 收货人姓名
                receverPhone: '', // 收货人手机号
                productName: '',  // 商品名
                orderNumber: '',  // 订单编号
                orderTime: {  // 下单时间
                    start: '',
                    end: '',
                }
            },
            goodsData: [
               
            ],
            tableData: [{
                phone: '',
                orderBelongUser:{
                    name: ''
                },
                remark_name: '',
                order_time: '',//订单时间
                order_num: '',//订单号
                payment_amount: '',//支付金额
                orderProductTotalPrice: '',//订单产品总价
                rec_address: {
                    address: '',//地址
                    name: '',//名字
                    phone: '',                    
                },
                id: '',//订单id
                remark_name: '',//名称备注
                remarks: '',//备注
                status: '',//订单状态。
                proData:[{
                    product_name: '',//产品名称
                    product_amount: '',//产品数量
                    product_sku_name: '',//颜色
                    product_sku_num: '',//编码
                    sku_img: '',//产品图片                    
                }],
                product_total: '',//产品总数 
                freight: '',//运费
                discount_price: '',//价格折扣                                 
            },],
            isNotOpen: false,
            abc: false,
            options: [{
                id: '',
                logistics_name: ''
                },],
            //提交员工备注
            remarkContent: '',//
            //判斷是否可以修改發貨類型
            isNotLogistics: '',
            //获取员工信息
            remarkData: '',
            //订单id
            orderId: '',
            //數量    
            allTypeCount: '',
        value: '',
        wl_name: '',
        input: '', 
        logisticsNum: '',
        logisticsName: '',
        logisticsPhone: '',
        active: 'logistics',    
        activeName2: 'first',
        remarksModel: false,
        show: false,       
        //发货类型1物流2自配
        sendMode: 1,
        //頁數
        page: 1,
        //默忍頁數
        currentPage1: 1,
        //物流信息
        wlData:[
            {
                
            }
        ],
        proData: [],
        loading: false,
        staffId:null
        }            
    },
    // watch:{
    //     zizujianzizujian(){
//        
    //     }
    // },
    methods:{
        parentMsg(from){            
            console.log(from) 
            if(from.num=="收货人姓名"){               
                this.from.receiverName = from.orderNum
            }            
            else if(from.num=="收货人手机号"){               
                this.from.receverPhone = from.orderNum
            }
            else if(from.num=="订单号"){                
                this.from.orderNumber = from.orderNum
            }
                // this.from.receiverName = from // 收货人姓名
                // this.from.receverPhone, // 收货人手机号
                this.from.productName = from.commodityName  // 商品名
                // this.from.orderNumber,  // 订单编号
                this.from.orderTime.start = from.value1
                this.from.orderTime.end = from.value2 
                this.getData();
        },
        //提示
        liaotian(data){
            if(this.staffId == data.staff_id){
                let val = {
                  receiverId: data.orderBelongUser.userId,
                  receiverName: data.remark_name || data.orderBelongUser.name,
                  receiverHead: data.orderBelongUser.avatar,
                  orderId: data.id,
                  order_num: data.order_num,
                  rec_address: data.rec_address.address,
                  order_name: data.rec_address.name
                };
                this.$store.dispatch("show", val);
                return;
            }
           this.$message({
               type: "error",
               message: "该客户不是你跟的单哦。"
           });
        },
         handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        //currentPage 改变时会触发
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);            
            this.page = val;           
            localStorage.setItem("page",val); 
            this.getData();
        },
        //修改优惠
        modifyDiscount(id){            
           this.$prompt('修改优惠', {
            confirmButtonText: '确定',
            cancelButtonText: '取消', 
            center: true,                  
        }).then(({ value }) => {
            let data = {
                orderId: id,
                discountPrice: value, 
            }
            modifyDiscountPrice(data).then(res =>{
                console.log(res)
                if(res.data.code==200){
                    this.$message({
                        type: 'success',
                        message: '您修改的优惠是：'+ value
                    });
                    this.getData();
                }
                else if(res.data.code==400){
                    this.$message.error(res.data.error)
                }
                else if(res.data.code==500){
                    this.$message.error(res.data.error)
                }
            },err =>{
               this.$message.error(err);
            })                        
            }
        );
    },
        choiceType(value){
            let obj = [];
            obj = this.options.find((item)=>{
            return item.id === value;
            });
            console.log(obj.logistics_name);
            this.wl_name = obj.logistics_name;
        },
        //确认发货
        confirmToGoods(){    
            if(!this.wl_name){
                this.wl_name = this.options[0].logistics_name;
            }                         
            if(this.active=='logistics'){      
            if(this.logisticsNum.length<1){
                this.$message.error('请输入物流单号');
                return false;
            }           
            else{
                let data = {
                sendMode: this.sendMode,                 
                wl_id: this.value,
                wl_num: this.logisticsNum,
                wl_name: this.wl_name,
                orderId: this.orderId,
                }
            confirmDelivery(data).then(res =>{                
                if(res.data.code==200){
                    this.abc = false;
                    if(res.data.data.flag){
                        this.$message({
                        message: res.data.data.msg,
                        type: 'success'
                    });   
                    }    
                    else{
                        this.$message.error(res.data.data.msg);
                    }                             
                    this.logisticsNum = '';    
                    this.abc = false;
                    this.getData();
                }                                
                else if(res.data.code==400){
                    this.abc = false;
                    this.$message.error(res.data.error)
                    this.logisticsNum = '';
                }
                else if(res.data.code==500){
                    this.abc = false;
                    this.$message.error(res.data.error)
                    this.logisticsNum = '';
                }                           
            },err =>{
                this.$message.error(err);
            })
            }    
            }        
            else{
                let data = {
                sendMode: this.sendMode,                 
                wl_id: this.value,
                wl_num: this.logisticsNum,
                wl_name: this.wl_name,
                orderId: this.orderId
                }
            confirmDelivery(data).then(res =>{                
                if(res.data.code==200){                    
                   if(res.data.data.flag){
                        this.$message({
                        message: res.data.data.msg,
                        type: 'success'
                    });   
                    }    
                    else{
                        this.$message.error(res.data.data.msg);
                    }                     
                    this.logisticsNum = ''; 
                    this.abc = false;
                    this.getData();
                }                
                  
                else if(res.data.code==400){
                    this.abc = false;
                    this.$message.error(res.data.error)
                    this.logisticsNum = '';
                }
                else if(res.data.code==500){
                    this.abc = false;
                    this.$message.error(res.data.error)
                    this.logisticsNum = '';
                }           
            },err =>{
                this.$message.error(err);
            })
            }
        },
        //添加物流
        addLog(){           
            if(this.logisticsName.length<1){
                this.$message.error('物流名称不能为空哦！');
                return false;
            }
            else if(this.logisticsPhone.length<1){
                this.$message.error('物流电话不能为空哦！');
            }            
            else{
                let data = {
                    name: this.logisticsName,
                    tel: this.logisticsPhone,
                } 
                addLogistics(data).then(res =>{
                    console.log(res)
                    if(res.data.code==200){
                        this.logisticsName = '';
                        this.logisticsPhone = '';
                        this.isNotOpen = false;
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.getLogisticsList();
                    }                                          
                    else if(res.data.code==400){
                        this.logisticsName = '';
                        this.logisticsPhone = '';
                        this.isNotOpen = false;
                        this.$message.error(res.data.error)
                    }         
                },err =>{
                    console.log(err)
                })  
            }                         
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
                    this.$message.error(res.data.err)
                })

            }            
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
        open(){            
            this.isNotOpen = !this.isNotOpen;
        },
        //修改运费
        modifyFreight(){
           this.$prompt('修改运费', {
            confirmButtonText: '确定',
            cancelButtonText: '取消', 
            center: true,                  
            }).then(({ value }) => {
                let data  = {
                    orderId: this.orderId,
                    freightCost: value,
                }
                changeOrderFreightCost(data).then(res =>{
                    if(res.data.code==200){                    
                        this.$message({
                            type: 'success',
                            message: '您修改的运费是：'+ value
                        });
                        this.getData();
                    }                    
                    else if(res.data.code==400){
                        this.$message.error(res.data.error)
                    }
                    else if(res.data.code==500){
                        this.$message.error(res.data.error)
                    }
                },err =>{
                    this.$message.error(err);
                })          
            }
            );
        },       
        confirmGood(id){
            this.orderId = id;            
            this.abc = !this.abc;
            $('html,body').css('overflow','hidden');                        
            this.getLogisticsList();
        },
    //确定发货窗口
    confirmGoods(id,status){        
        this.orderId = id;
        this.isNotLogistics = status;
        this.abc = !this.abc;
        $('html,body').css('overflow','hidden');
        if(status!=3){
            $(".logistics-mode .button2").attr("disabled", true);
            this.active = 'logistics'
        }
        else if(status==3){
            $(".logistics-mode .button2").removeAttr("disabled");
        }
        
        this.getLogisticsList();
    },
    //获取物流列表
    getLogisticsList(){        
        logisticsList().then(res =>{
            console.log(res,'物流')
            if(res.data.code==200){
                this.options = res.data.data;
                this.value = res.data.data[0].id
            }
        })
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
            this.sendMode = choice;          
        }
        else if(choice==2){
            this.active = 'self'
            this.sendMode = choice;            
        }        
    },
    //弹员工备注
    remarks(id){
        this.orderId = id
        this.remarksModel = true;
         $('html,body').css('overflow','hidden');
         this.Multipurpose();
    },
    //鼠标移入时
    enter(goodsData,event){         
        this.show = true;            
        this.goodsData = goodsData;        
        // console.log(item,'1')
        // console.log(this.goodsData,'2')
    },
    //鼠标移出时
    leave(){
        this.show = true;       
    // console.log(this.items)
    },
    //转跳订单详情
    goDetail(id){               
        this.$router.push({path:"orddetail",query:{id:id}})
    },
    toCustomer(name,id){
        this.$router.push({path: '/customer/customerList',query:{name:name,user_id:id}});
    },
    //子传父
    up(){        
        this.$emit('upup',this.allTypeCount); //主动触发upup方法，'hehe'为向父组件传递的数据
    },
    //创建时
    getData(){       
        this.tableData = [];         
        let params = {
            page: this.page,
            type: 1,
             options:{
                receiverName: this.from.receiverName,
                receiverPhone: this.from.receverPhone,
                productName:  this.from.productName,
                orderNumber:  this.from.orderNumber,
                orderTime:{
                    start: this.from.orderTime.start,
                    end: this.from.orderTime.end,
                }
            }
        }
        orderList(params).then(res =>{
            console.log(params)
            if(res.data.code==200){  
                this.staffId = res.data.data.self.staffId              
                console.log(res)
                this.tableData = res.data.data.orders;   
                this.allTypeCount = res.data.data.allTypeCount                                                                                                                                        
                this.up()
            }
            else if(res.data.code == 400){                 
                this.$message.error('加载失败！')               
            }
        },err =>{            
                this.$message.error(err)  
        })
        
        
    },
    printOrder(id) {
        const {href} = this.$router.resolve({
            path: '/printOrder',
            query: {
                id:id
            }
        })
        window.open(href, '_blank')
    }
    },    
    commponents:{
        MessageBox,
    },
    //  props: ['zizujian'],
    created(){
        if(localStorage.getItem('page')){
            this.page = localStorage.getItem('page');
            this.currentPage1 = parseInt(localStorage.getItem('page'));
        }
        else{
            this.page = 1;
            this.currentPage1 = 1;
        }
        this.getData();
    }
}
</script>
<style scoped>
#pendingDelivery >>> .el-table::before{
    height: 0;    
    z-index: 0;
}
#pendingDelivery >>> .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #FFF;    
}
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
/* #fullOrder .el-button{
    background-color: #1491f2;
    color: #FFF;
} */
#pendingDelivery >>> .el-pagination{
    text-align: center
}
#pendingDelivery >>> .el-table th:nth-child(1){
    padding-left: 20px;
}
#pendingDelivery >>> .el-table th:nth-child(5){
    padding-right: 20px;
    text-align: right;
}
#pendingDelivery >>> .el-input_inner{
    text-align: center!important;
}
#pendingDelivery >>> .el-table_1_column_1 .is-leaf{
    padding-left: 20px;
}
#pendingDelivery >>> .el-button+.el-button{
    margin-left: 0;
}
#pendingDelivery >>> .el-table th{
    background-color: #f2f2f2;    
}
#pendingDelivery >>> .el-table thead {
    color: #333;
    font-size: 14px;    
}
#pendingDelivery >>> .el-table th, .el-table tr{
    background-color: #f8f8f8;
}
#pendingDelivery >>> .el-table .cell{   
    padding: 0;     
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
    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
    font-size: 12px;   
}
.goods-exhibition{   
    min-height: 140px;
    border-top: 1px solid #E8E9EB;
    border-bottom: 1px solid #E8E9EB;
    border-left: 1px solid #E8E9EB;         
    display: flex;
    justify-content: flex-start;
    align-items: center;   
    cursor: pointer; 
    /* position: absolute; */
}
.goods-addres{
    width: 100%;
    height: 140px;
    border-top: 1px solid #E8E9EB;
    border-bottom: 1px solid #E8E9EB;
    overflow: auto;              
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
    width: 90%;   
}
.goods-money{
    min-height: 140px;
    border-top: 1px solid #E8E9EB;
    border-bottom: 1px solid #E8E9EB;    
    padding-top: 20px;    
    font-size: 12px;
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
    justify-content: flex-end;   
    align-items: center;   
}
.goods-operation .left-btn{
    width: 100px;    
    height: 100px;
    display: inline-flex;    
    flex-wrap: wrap; 
    align-items: center;    
    /* border: 1px solid red; */
    /* overflow: hidden; */
}
.goods-operation .right-btn{
    width: 100px;
    height: 100px;                     
    display: inline-flex;     
    flex-wrap: wrap;
    align-items: center;    
    margin-left: 20px;
}
.goods-pic{
    /* background-color: #333; */
    width: 100px;
    height: 100px;        
    margin-left: 20px; 
    margin-right: 10px;   
    position: relative;
}
.goods-data{   
    max-width: 150px;                        
    font-size: 12px;           
}
.goods-data button{
    float: right;    
    margin-top: -5px;
    margin-left: 10px;
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
    margin-bottom: 2px;
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
    font-size: 12px;
    width: 100%;    
}
.goods-addres p:first-child{
    font-size:14px;
    margin-bottom: 2px;
    width: 100%;
}
/* .goods-addres p:last-child{
    width: 90%;        
} */
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
    background-color: #FFF!important;
    color: #1491f2!important;
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
    background-color: #f2f2f2!important;
    color: #333!important;
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
    /* border: 1px solid red; */
    width: 580px;      
    height: 400px;     
    background-color: #f2f2f2;      
    z-index: 100;
    display: flex;     
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
.show-data p{
    margin-bottom: 6px;
}
.show-data p:first-child{
    font-size: 14px;
    overflow: hidden;/*内容超出后隐藏*/
    text-overflow: ellipsis;/*    超出内容显示为省略号*/
    white-space: nowrap;/*文本不进行换行*/
    color: #333;
    margin-bottom: 10px;
}
.not-data{
    text-align: center;
    font-size: 20px;
}
</style>
