<template>
    <el-container id="orderdetail">
        <!-- header头 -->
        <el-header class="bgFFF">
        <el-breadcrumb>
            <el-breadcrumb-item>                
            <span v-if="ordersData.status==1" @click="back" style="color: #1491f2;cursor:pointer;">待付款</span>
            <span v-if="ordersData.status==2"  @click="back" style="color: #1491f2;cursor:pointer;">待发货</span>
            <span v-if="ordersData.status==3"  @click="back" style="color: #1491f2;cursor:pointer;">商家自配</span>
            <span v-if="ordersData.status==4"  @click="back" style="color: #1491f2;cursor:pointer;">买家自取</span>
            <span v-if="ordersData.status==5"  @click="back" style="color: #1491f2;cursor:pointer;">待发货</span>
            <span v-if="ordersData.status==10||ordersData.status==9" @click="back" style="color: #1491f2;cursor:pointer;">已完成</span>
            <span v-if="ordersData.status==11||ordersData.status==12" @click="back" style="color: #1491f2;cursor:pointer;">已取消订单</span>
            /订单详情
            </el-breadcrumb-item>        
        </el-breadcrumb>
        </el-header>       
    <!-- 只要区域 -->     
        <el-main class="main"> 
            <div class="main-content">  
                <p class="info">订单信息</p>
                <div class="refuse-detail">                    
                    <div class="pay-time">
                        <p v-if="ordersData.pay_time">付款时间：{{ordersData.pay_time}}</p>
                        <p v-else>付款时间：等待付款</p>    
                    </div>               
                    <div class="order-num">
                        <p>订单号：{{ordersData.order_num}}
                            <span style="color:#ff0000" v-if="ordersData.status==2">等待发货</span>
                            <span style="color:#ff0000" v-if="ordersData.status==1">等待付款</span>
                            <span style="color:#ff0000" v-if="ordersData.status==3">商家自配</span>
                            <span style="color:#ff0000" v-if="ordersData.status==4">买家自取</span>
                            <span style="color:#ff0000" v-if="ordersData.status==5">等待收货</span>
                            <span style="color:#999" v-if="ordersData.status==10||ordersData.status==9">已完成</span>
                            <span style="color:#999" v-if="ordersData.status==11||ordersData.status==12">已取消订单</span>
                        </p>    
                    </div>           
                </div><!--refuse-detail结束-->
                <div class="service-num">
                    <div class="freight">
                        <span>运费：</span><span class="color-999"></span>
                        <span class="color-red" v-if="ordersData.freight>0">+&yen;&nbsp;{{ordersData.freight}}</span>
                        <span class="color-red" v-else>此订单不含运费</span>
                    </div>
                    <div class="salesman">
                        <el-button type="prinary" v-if="ordersData.status==1" size="mini" @click="modifyFreight">修改运费</el-button><!-- v-if="ordersData.status==1"-->
                        <p v-else>经手业务员：{{ordersData.staff_name}}</p>                        
                    </div>
                </div><!--service-num结束-->                
                <div class="service-num">
                    <div class="freight">
                        <span>优惠：</span><span class="color-999"></span><span class="color-red">-&yen;&nbsp;{{ordersData.discount_price}}</span>
                    </div>
                    <div class="salesman" v-if="ordersData.status==1"><!---->
                        <!-- <p>发货员：XXX</p>       -->
                        <el-button type="prinary" size="mini" @click="modifyDiscount">修改优惠</el-button>                  
                    </div>                    
                </div><!--service-num结束-->
                <div class="pay-mode" v-if="ordersData.order_platform=='weixin'" style="min-height: 34px;">
                    <div style="min-width:330px;">支付方式：<img src="../../images/orderImg/weixinpay.png" width="76"> </div>
                    <div style="min-width: 460px;">
                        <el-button type="prinary" size="mini" @click="confirmGood" v-if="ordersData.status==2">确定发货</el-button>
                        <el-button type="prinary" size="mini" @click="confirmGoods" v-if="ordersData.status==3||ordersData.status==5">修改发货</el-button>
                    </div>
                </div><!--service-num结束-->
                <div class="deliver-goods">
                    <div class="goods-price">
                        <p>实付金额：<span class="color-red">&yen;&nbsp;{{ordersData.payment_amount}}</span></p>
                    </div>      
                    <div class="confirm-goods">
                        <!-- <el-button type="prinary" size="mini" @click="confirmGoods" v-if="ordersData.status==2">确定发货</el-button>
                        <el-button type="prinary" size="mini" @click="confirmGoods" v-if="ordersData.status==3||ordersData.status==5">修改发货</el-button> -->
                        <el-button type="prinary" size="mini" v-if="ordersData.status==2||ordersData.status==3||ordersData.status==5" @click="printOrder">打印订单</el-button>                        
                    </div>
                </div><!--refunse-reason结束--> 
                <div class="staff-remarks">
                    <div class="remarks" @click="remarks">
                        员工备注： <span style="color: #1491f2;">{{ordersData.staffRemark}}</span>                        
                        <!-- <div class="news">1</div> -->
                    </div>
                </div><!--staff-remarks结束-->
                <div class="invoice-info" v-if="ordersData.orderInvoice.orderInvoice.invoice_type==1||ordersData.orderInvoice.orderInvoice.invoice_type==2"><!--v-if="ordersData.orderInvoice"-->
                    <div class="info" v-if="ordersData.orderInvoice.orderInvoice.invoice_type==1">发票：<span @click="showSpecialInvoice">增值税专用发票</span></div>
                    <div class="info" v-if="ordersData.orderInvoice.orderInvoice.invoice_type==2">发票：<span @click="showOrdinaryInvoice">增值税普通发票</span></div>
                </div>
                <div class="refunse-reason" v-if="ordersData.remarks">
                    <div class="refunse-text" >
                        <p>客户备注</p>
                        <p>{{ordersData.remarks}}</p>
                    </div>                    
                </div><!--refunse-reason结束-->
                <div class="refunse-reason">
                    <div class="refunse-text">
                        <p>买家信息</p>
                        <div class="consultation">
                            <span @click="toCustomer(ordersData.remarkName,ordersData.user_id)">下单人：{{ordersData.remarkName}}</span>
                            <!-- <span v-else @click="toCustomer(ordersData.orderBelongUser.name)">下单人：{{ordersData.orderBelongUser.name}}</span>                  -->
                            <img src="../../images/orderImg/liaotian_icon.png" width="20" @click="liaotian(ordersData)">
                        </div>
                    </div>                    
                </div><!--refunse-reason结束-->
                <div class="refunse-reason">
                    <div class="refunse-text">
                        <p class="text-p"><span class="consignee-name">收货人：{{ordersData.rec_address.name}}</span><span class="consignee-phone">联系电话： {{ordersData.rec_address.phone}}</span></p>
                        <p>{{ordersData.rec_address.address}}</p>
                    </div>                    
                </div><!--refunse-reason结束-->
                <div class="distribution-info" v-if="ordersData.logisticsInfo">
                    <div class="refunse-text">
                        <p>配送信息</p>
                        <p>
                            <span>日期：{{ordersData.logisticsInfo.addtime}}</span>
                            <span>物流： {{ordersData.logisticsInfo.logistics_name}}</span>
                            <span>单号：{{ordersData.logisticsInfo.logistics_num}}</span>
                        </p>
                    </div>
                </div><!--distribution结束-->
                <div class="goods-info">
                    <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                        <el-table-column
                        prop="date"
                        label="商品"
                        width="220"
                        class="childth">
                            <template slot-scope="scope">
                                <div class="goods-exhibition">
                                    <div class="goods-pic">
                                        <img :src="scope.row.sku_img" width="100%"  height="100%">
                                    </div>
                                    <div class="goods-data">
                                        <p>{{scope.row.product_name}}</p>                                                                                              
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="商品属性"
                        width="120">
                            <template slot-scope="scope">
                                <div class="goods-attribute">
                                    <div>{{scope.row.product_sku_name}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="编码"
                        width="166">
                            <template slot-scope="scope">
                                <div class="goods-attribute">
                                    <div>{{scope.row.product_sku_num}}</div>
                                </div>
                            </template>                            
                        </el-table-column>                        
                        <el-table-column
                        prop="address"
                        label="单价">
                            <template slot-scope="scope">
                                <div class="goods-attribute">
                                    <div class="price">&yen;&nbsp;{{scope.row.unit_price}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="数量">
                            <template slot-scope="scope">
                                <div class="goods-attribute">
                                    <div>{{scope.row.product_amount}}</div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>  
                <!-- 二维码 -->
                <div class="scan-code" v-if="ordersData.status==3">
                    <div class="code-img">
                        <!-- <img :src="../../images/orderImg/refund1.png" width="100%"> -->
                        <img :src="src" width="100%" height="100%">
                    </div>
                    <div class="code-explain">
                        <h3>提示</h3>
                        <p>商家自主配送完成，由下单买家利用微信/QQ扫描此二维码进去并确认收货即可！</p>
                    </div>
                </div><!--two-code结束-->
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
        <!-- 专用发票弹窗 -->
        <div class="invoice-model" v-if="isNotShowSpecialInvoice" @click="colseInvoice(1)">
            <div class="invoice-content" @click.stop="colseInvoice(2)">
                <div class="text-1"><p>增值税专用发票</p><img src="../../images/orderImg/close-icon.png" width="12" @click="colseInvoice(3)"></div> 
                <div class="text-2"><p>公司名称：<span>{{ordersData.orderInvoice.orderInvoice.company_name}}</span></p></div> 
                <div class="text-2"><p>纳税识别号：<span>{{ordersData.orderInvoice.orderInvoice.pay_taxes_num}}</span></p></div> 
                <div class="text-2">
                    <p>
                        <span class="address">企业注册地址：</span>
                        <span class="textwb">{{ordersData.orderInvoice.orderInvoice.company_address}}</span>
                    </p>
                    <div style="clear:both"></div>
                </div> 
                <div class="text-2"><p>电话：<span>{{ordersData.orderInvoice.orderInvoice.company_phone}}</span></p></div> 
                <div class="text-2"><p>开户银行：<span>{{ordersData.orderInvoice.orderInvoice.bank_name}}</span></p></div> 
                <div class="text-2"><p>银行账户：<span>{{ordersData.orderInvoice.orderInvoice.bank_account}}</span></p></div>                                
            </div>
        </div>
        <!-- 普通发票弹窗 -->
        <div class="invoice-model" v-if="isNotShowOrdinaryInvoice" @click="colseOrdinaryInvoice(1)">
            <div class="ordinary-invoice-content" @click.stop="colseOrdinaryInvoice(2)">
                <div class="text-1"><p>增值税专用发票</p><img src="../../images/orderImg/close-icon.png" width="12" @click="colseOrdinaryInvoice(3)"></div> 
                <div class="text-2"><p>公司名称：<span v-if="ordersData.orderInvoice.orderInvoice.invoice_top">{{ordersData.orderInvoice.orderInvoice.invoice_top}}</span><span v-else>{{ordersData.orderInvoice.orderInvoice.company_name}}</span></p></div>                                               
            </div>
        </div>
         <!--确定发货弹窗-->                                   
        <div class="model" v-show="abc" @click="colse(1)"> 
            <div class="logistics-info" @click.stop="colse(2)">
                <div class="addres-info">
                    <p>填写发货信息</p> 
                    <img src="../../images/orderImg/jiah.png" @click="open">               
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
                            <el-select v-model="value" placeholder="请选择" size="mini" class="el-sel" @change="choiceType">
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
                            <el-input v-model="logisticsNum" placeholder="请输入物流单号" class="logistics-input" size="mini" oninput="this.value=this.value.replace(/[^0-9.]+/,'');"></el-input>
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
                    <el-input v-model="logisticsPhone" placeholder="请输入物流电话" class="logistics-input" size="mini"></el-input>
                </div>  
                <div class="bot-btn">
                    <el-button type="primary" size="mini" @click.stop="colse(5)">取消</el-button>
                    <el-button type="primary" size="mini" @click="addLog">确定</el-button>
                </div>                   
            </div>        
        </div> 
        </el-main>            
    </el-container>
</template>

<script>
import refundOrder from '@/views/order/assemblys/refund/refundOrder'
import {orderDetail,addOrderRemark,staffremark,qrOwnDelivery,confirmDelivery,modifyDiscountPrice,changeOrderFreightCost} from '@/api/order/ordermanage'
import {logisticsList,addLogistics} from '@/api/set/setmanage'
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
            tableData: [{                
            },],
            remarksModel: false,  
            //是否显示专用发票   
            isNotShowSpecialInvoice: false,     
            //是否显示普通发票
            isNotShowOrdinaryInvoice : false, 
            //确定发货
            abc: false,   
            isNotOpen: false, 
            logisticsNum: '',
            logisticsName: '',
            logisticsPhone: '',
            active: 'logistics',         
            value: '',     
            options: [{
                id: '',
                logistics_name: ''
                }, ],
            orderId: '',//订单id
            src: '',
            sendMode: 1,
            //订单信息
            ordersData:{
                remarkName: '',
                orderInvoice: { 
                    orderInvoice:{
                        invoice_top: '',  // 发票抬头
                        invoice_type: '',  // 发票类型 1增值税专票,  2增值税普票
                        company_name: '', // 公司名称
                        pay_taxes_num: '', // 纳税识别号
                        company_address: "",  // 企业注册地址
                        company_phone: "", // 电话号码
                        bank_name: "",  // 开户银行
                        bank_account: '' // 银行账号
                    }
                },//订单发票
                order_platform: '',//支付方式
                pay_time: '',//支付时间
                status: '',//订单状态
                staff_name: '',//员工
                freight: '',//运费
                order_num: '',//订单号
                remarks: '',//备注
                rec_address: {
                    address: '',//地址
                    name: '',//名字
                    phone: '',//电话                    
                }         ,
                payment_amount: '',//支付金额   
                //显示最新的员工备注  
                staffRemark: '', 
                discount_price: '',//折扣
                logisticsInfo:{
                    addtime: '',//添加时间
                    logistics_name: '',//物流名称
                    logistics_num: '',//物流单号
                },
                orderBelongUser:{
                    name: '',
                }
            },
            //获取员工备注信息
            remarkData: '',
            //提交员工备注
            remarkContent: '',                      
        }
    },
    watch:{
        '$route'(to,from){            
            this.orderId = this.$route.query.id;        
            this.getData();
        }
    //     $route(){  
    //     this.orderId = this.$route.query.id;                
    //   },  
    //   orderId() {            
    //     this.getData();
    //   },  
    },
    methods:{        
        choiceType(value){
            let obj = [];
            obj = this.options.find((item)=>{
            return item.id === value;
            });
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
                    this.getData();
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
                    this.getData();
                }                
            },err =>{
                this.$message.error(err);
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
        toCustomer(name,id){
            this.$router.push({path: '/customer/customerList',query:{name:name,user_id:id}});
        },
        //创建时
        getData(){        
            let data = {
                id: this.orderId
            }
            orderDetail(data).then(res =>{
                console.log(res,"详情")
                if(res.data.code==200){
                    this.ordersData = res.data.data;
                    this.tableData = res.data.data.proData;
                    this.src = "/pc_seller/phpcode/qrOwnDelivery?orderId="+this.orderId+"&storeId="+localStorage.getItem('storeId');                                                            
                }
                                
            },err=>{
                this.$message.error(err)
            })                     
        },        
        onSubmit() {
            console.log('submit!');
        },
        //弹员工备注
        remarks(){
           this.remarksModel = true;
            $('html,body').css('overflow','hidden');
            this.Multipurpose();
        },
        //关闭员工备注
        colseRemarks(num){
            if(num==1){
                this.remarksModel = false;
            }
            else{
                return;
            }
        },
        //弹专用发票
        showSpecialInvoice(){           
            this.isNotShowSpecialInvoice = true;            
        },
        //弹普通发票
        showOrdinaryInvoice(){
            this.isNotShowOrdinaryInvoice = true;
        },
        //关闭专用发票
        colseInvoice(num){
            if(num==1||num==3){
                this.isNotShowSpecialInvoice = false;
            }
            else{
                return;
            }
        },
        //关闭普通发票
        colseOrdinaryInvoice(num){
            if(num == 1||num == 3){
                this.isNotShowOrdinaryInvoice = false
            }
            else{
                return;
            }
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
            let data = {
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
        });
        },       
        //修改优惠
        modifyDiscount(){           
           this.$prompt('修改优惠', {
            confirmButtonText: '确定',
            cancelButtonText: '取消', 
            center: true,                  
        }).then(({ value }) => {
            let data = {
                orderId: this.orderId,
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
                    this.$message.error(res.data.error);
                }
                else if(res.data.code==500){
                    this.$message,error(res.data.error)
                }
            },err =>{
                this.$message.error(err)
            })            
            });
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
                        this.isNotOpen = false;
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.getLogisticsList();
                    }                    
                },err =>{
                    console.log(err)
                })  
            }             
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
    confirmGood(){                    
        this.abc = !this.abc;
        $('html,body').css('overflow','hidden');                        
        this.getLogisticsList();
    },
    //确定发货
    confirmGoods(){                       
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
    liaotian(data){
        if(localStorage.getItem("userName") == data.staff_name){ //需要后台返回一个user_id判断
            let val = {
                receiverId: data.orderBelongUser.userId,
                receiverName: data.remarkName || data.orderBelongUser.name,
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
        console.log(data)
    },
     back(){            
            this.$router.go(-1)
    },
    printOrder() {
        const {href} = this.$router.resolve({
            path: '/printOrder',
            query: {
                id:this.orderId
            }
        })
        window.open(href, '_blank')
    }
    },
    components:{
        refundOrder,    
    },
    created(){
        this.orderId = this.$route.query.id;        
        this.getData();            
    },
    //路由参数变化，组件并不用刷新的钩子函数
    // beforeRouteEnter(to,from,next){       
    //     console.log('beforRouteEnter')  
    //     console.log(this) // 结果为undefined，因为在执行beforRouteEnter时候，组件还没有被创建出来；先执行beforRouteEnter，再执行beforeCreate
    //     next((vm)=>{ //参数vm就是当前组件的实例。
    //         vm.test = this.orderId
    //     })
    // },
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
#orderdetail >>> .el-table--border th:first-child .cell{
    text-align: left!important;
    padding-left: 20px!important;
}
#orderdetail >>> .el-table th>.cell{
    /* padding-left: 20px; */
    text-align: center;
}
#orderdetail >>> .el-button{
    background-color: #1491f2;
    color: #FFF;
    width: 90px;
    height: 30px; 
    margin: 8px 0;   
}
#orderdetail >>> .el-table th{
    background-color: #f2f2f2;
}
#orderdetail >>> .el-main{    
    margin-top: 10px;
    margin-left: 10px;
}
.main{
    background-color: #FFF;    
    height: 100vh;
    font-size: 14px;
}
#orderdetail >>> .el-breadcrumb{
    line-height: 60px;
}
.main-content{
    width: 740px;
}
.main-content .info{   
    font-size: 16px; 
    color: #333;
    margin-bottom: 10px;    
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
    min-height: 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.service-num .freight{
    min-width: 330px;
}
.service-num .salesman{
    min-width: 460px;    
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
}
.refunse-reason .refunse-text p:first-child{
    margin-bottom: 10px;
    padding-top: 10px;
    font-size: 16px;
    color: #333;
}
.refunse-reason .refunse-text p:last-child{
    padding-bottom: 10px;    
}
.refunse-reason .refunse-text .text-p{
    font-size: 14px!important;
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 10px;
}
.refunse-reason .refunse-text p span:first-child{       
    margin-right: 94px;    
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
    margin-right: 5px;
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
.refund-status{
    color: #1491f2;
}
.refuse-detail{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #CCC;
    height: 34px;    
}
.refuse-detail .pay-time{
    min-width: 330px;
}
.refuse-detail .order-num{
    min-width: 460px;       
}
.refuse-detail .order-num p span{
    padding-left: 20px;    
}
.pay-mode{
    justify-content: space-between;
    display: flex;
    align-items: center;
    height: 34px;
    border-bottom: 1px solid #ccc;
}
.pay-mode img{
    padding-left: 10px;    
}
.deliver-goods{
    justify-content: space-between;
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #ccc;
}
.deliver-goods .goods-price{
    min-width: 330px;
}
.deliver-goods .confirm-goods{
    min-width: 460px;
}
.staff-remarks{
    height: 50px;
    border-bottom: 1px solid #CCC;
}
.staff-remarks .remarks{
    cursor: pointer;
    position: relative;
    margin-top: 10px;
}
.invoice-info{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;    
}
.invoice-info .info span{
    cursor: pointer;
    color: #1491f2;
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
    top: -10px;
    left: 56px;        
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
.consultation{
    justify-content: flex-end;
    align-items: center;
    display: flex;
}
.consultation span{
    font-size: 14px;
    margin-right: 20px;
    cursor: pointer;
}
.consultation img{
    cursor: pointer;
}
.goods-info{
    margin-top: 30px;
}
/* 发票模态框 */
.invoice-model{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(127,127,127,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 专用发票 */
.invoice-content{
    width: 350px;
    height: 380px;
    background-color: #FFF;
    padding-left: 20px;
    overflow: auto;
    margin-bottom: 300px;
}
/* 普通发票 */
.ordinary-invoice-content{
    width: 350px;
    height: 150px;
    background-color: #FFF;
    padding-left: 20px;
    border-radius: 4px;    
    margin-bottom: 300px;
}
.ordinary-invoice-content .text-2{
    border: none;
}
.text-1{
    color: #333;
    font-size: 16px;
    margin-top: 20px;
    position: relative;
}
.text-1 img{
    position: absolute;
    top: 5px;
    right: 20px;
    cursor: pointer;
}
.text-2{
    border-bottom: 1px solid #ccc;
    padding: 15px 0;
}
.text-2 p span{
    color: #999999;
}
.text-2 p .address{
    color: #333;
    float: left;
}
.textwb{
    width: 180px;
    margin-right: 18px;    
    float: left;
}
.distribution-info{    
    display: flex;
    justify-content: flex-start; 
    align-items: center;
}
.distribution-info .refunse-text p:first-child{
    font-size:16px;
    margin-bottom: 10px;
    margin-top: 20px;
}
.distribution-info .refunse-text p span{
    margin-right: 69px;       
}
.scan-code{
    padding-top: 30px;
    padding-bottom: 70px;
    padding-right: 6.4%;
    display: flex;
    justify-content: flex-start;
}
.code-explain{
    width: 280px;   
}
.code-img{
    width: 150px;       
    margin-right: 22px;    
}
.code-explain h3{
    color: #333;
    font-size: 16px;  
    padding-bottom: 30px;  
}
.code-explain p{
    color: #999;
    font-size: 14px;
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
    margin-top: 16px;
}
.bot-btn button{
    width: 50%!important;
    height: 100%!important;
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
    width: 120px!important;    
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
.not-data{
    text-align: center;
    font-size: 20px;
}
</style>