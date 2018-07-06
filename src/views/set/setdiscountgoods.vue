<template>
  <el-container id="setdiscountgoods">
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
          编辑折扣商品
        </el-breadcrumb-item>        
      </el-breadcrumb>
    </el-header>
    <el-main>        
        <div class="edit-goods" v-if="data!='没有找到相关商品信息'">
            <div class="edit-info">
                <p>商品名称：<span class="color-1491f2">{{data.product_name}}</span></p>
                <p>编码：{{data.product_sku_num}}</p>
                <p>价格：<span class="color-red">&yen;{{price}}</span></p>
                <!-- <p v-if="sku"><span class="color-red">价格：&yen;{{price}}</span></p> -->
                <div class="choice-type">
                    <el-radio-group v-model="radio2" @change="abc(index)" v-for="(item,index) in data.sku" :key="index">
                        <el-radio :label="item.id" border >{{item.sku_name}}</el-radio>                        
                    </el-radio-group>
                </div>
            </div>
            <div class="commodityInfo">
                <p>设置折后价</p>
                <div class="set-price">
                    <el-form ref="form" :model="form">
                        <div class="money">
                            <el-form-item label="￥" label-width="30px" size="mini" class="ba">
                                <el-input v-model="form.price" class="input" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="%" label-width="30px" size="mini" class="ba">
                                <el-input v-model="form.percentage" class="input" disabled type="number"></el-input>
                            </el-form-item>
                        </div>      
                        <div style="clear:both"></div>            
                        <div class="time">
                             <el-form-item class="invalid">
                                <label>生效时间</label>
                                <el-date-picker
                                    v-model="form.startTime"
                                    type="datetime"
                                    placeholder="选择日期"                                   
                                    size="mini"
                                    class="choice-date"
                                    :picker-options="pickerBeginDateBefore"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item class="invalid">
                                <label>失效时间</label>
                                <el-date-picker
                                    v-model="form.endTime"
                                    type="datetime"
                                    placeholder="选择日期"
                                    size="mini"
                                    class="choice-date"
                                    :picker-options="pickerBeginDateAfter"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    >
                                </el-date-picker>
                            </el-form-item>
                            <div style="clear:both"></div>
                        </div>                                         
                    </el-form>
                </div>   
                <div class="isnotcustomerprice">
                    <div class="customer-left">是否覆盖客户专属价格</div> 
                    <div class="customer-right">
                        <el-switch
                            style="display: block"
                            v-model="ordinary"                    
                            active-color="#13ce66"
                            inactive-color="black"
                            @change="switchChange">
                        </el-switch>
                    </div>  
                </div>                             
            </div>
            <div class="operation">
                <el-button type="prinary" size="mini" class="btn1" @click="gourl()">浏览商品</el-button>
                <el-button type="prinary" size="mini" class="btn1" v-if="Verification==1||Verification==3" @click="recovery()">恢复原价</el-button>
                <el-button type="prinary" size="mini" class="btn2" v-if="Verification==1||Verification==2||Verification==4" @click="preservation">保存</el-button>                               
            </div>
        </div>
        <div v-if="data=='没有找到相关商品信息'" style="text-align: center;margin-top:20px">
            <p>没有找到相关商品信息</p>
        </div>
    </el-main>
  </el-container>
</template>
<script>
import notBeginning from '@/views/set/assemblys/discount/notBeginning'//未进行
import conducting from '@/views/set/assemblys/discount/conducting'//进行中
import  {discountgoodsedit,submitDiscountDood,recoverPrice,judgeUserPermission,getSkuDiscount} from '@/api/set/setmanage'
export default {
    data(){
      return{   
            sku_name: '',
            form: {
                percentage: '',
                price: '',
                endTime: '',
                startTime: '',
            },
            Verification: '',   
            notBeg: '',
            isNotCan: '',                
            pickerBeginDateBefore: {
            disabledDate: (time) => {               
                let beginDateVal =new Date( this.form.endTime).getTime();
                if (beginDateVal) {
                    return time.getTime() > beginDateVal||time.getTime() < Date.now() - 8.64e7;
                }
                else{
                   return time.getTime() < Date.now() - 8.64e7
                }
            }
         },
         pickerBeginDateAfter: {
            disabledDate: (time) => {
                //要转化 new Date 格式
                let beginDateVal =new Date( this.form.startTime).getTime();                
                if (beginDateVal) {
                    return time.getTime() < beginDateVal;
                }
                else{
                    return time.getTime() < Date.now() - 8.64e7;
                }
            }
         },
        radio2: "",             
        ordinary: false, 
        data:{        
            id: '',
            product_name: '',
            product_sku_num: '',
            product_id: '',
        }    ,
        price: '',
        sku: [
            {product_price: '',}
        ],
        discountData: {    
                 
        },
        dis_status: '',  
        cover: 2,        
        disId: '',
        historyData:{

        },
      }
    },    
    watch:{       
            form: {
                deep: true,
                handler: function (newVal,oldVal){                    
                    if(parseInt(oldVal.price)<0){
                        this.$message.error("折扣价不能为负哦！");
                        this.form.price = '';
                    }     
                    if(oldVal.price>=parseInt(this.price)){                
                        this.$message.error("折后价需小于原价");
                        this.form.price = '';
                        this.form.percentage = '';
                    }
                    else{
                        this.form.percentage = (this.form.price/this.price*100).toFixed(0)
                    }
                }
            },            
    },
    methods:{        
        //转跳路由
        gourl(){           
            localStorage.setItem('radio2',this.radio2);
            localStorage.setItem('price',this.form.price);
            localStorage.setItem('percentage',this.form.percentage);
            localStorage.setItem('startTime',this.form.startTime);
            localStorage.setItem('endTime',this.form.endTime);
            localStorage.setItem('sku_name',this.sku_name); 
            localStorage.setItem('toprice',this.price);        
            localStorage.setItem('ordinary',this.ordinary);                            
            this.$router.push({path:'browseTheGoods',query:{id:this.data.id,sku_id:this.sku_id}});            
        },
        //恢复原价
        recovery(){     
            judgeUserPermission().then(res =>{
                if(res.data.code==200){                    
                    let data = {
                    disId: this.disId
                    }
                    recoverPrice(data).then(res =>{
                        console.log(res);
                        if(res.data.code==200){         
                            this.$message({
                                message: res.data.data,
                                type: 'success'
                            });
                            this.$router.push({path: 'shopinfo'})
                        }
                        else if(res.data.code==400){                                             
                            if(res.data.error == "商品折扣id为空"){
                                this.$message.error('您都还没有设置该属性呢！');
                            }
                        }                
                    },err =>{
                        console.log(err)
                    })
                }
                else if(res.data.code==400){
                    this.$message.error(res.data.error);
                }
            },err =>{
                this.$message.error(err);
            })                                          
        },
        //是否覆盖
        switchChange(){
            if(this.ordinary){
                this.cover = 1
            }
            else{
                this.cover = 2;
            }
        },
        //提交折扣商品
        preservation(){                                
            judgeUserPermission().then(res =>{
                console.log(res,'判断');
                if(res.data.code==200){
                    this.switchChange()        
                    if(this.dis_status==1){
                        this.$message.error('已经设置该属性哦！');                
                    }
                    else if(this.form.price.length<1){
                    this.$message.error('折后价不能为空！');
                    }
                    else if(this.form.startTime==''){
                        this.$message.error('生效时间不能为空！');
                    }
                    else if(this.form.endTime==''){
                        this.$message.error('失效时间不能为空！');
                    }
                    else{
                        let data = {
                            skuId: this.radio2,
                            proId: this.data.id,                    
                            disPrice: this.form.price,
                            cover: this.cover,
                            startTime: this.form.startTime,
                            endTime: this.form.endTime,
                        }
                        submitDiscountDood(data).then(res =>{
                            console.log(res);
                            if(res.data.code==200){
                                this.$message({
                                    message: res.data.data,
                                    type: 'success'
                                });
                                this.$router.push({path: 'shopinfo'})
                            }
                            else if(res.data.code==400){
                                this.$message.error(res.data.error);
                            }
                        },err =>{
                            console.log(err)
                        })
                    }                                             
                }else if(res.data.code==400){
                    this.$message.error(res.data.error);
                } 
            })              
        },
        //设置折扣价
        // pricechange(){                             
        //     if(parseInt(this.form.price)<0){
        //         this.$message.error("折扣价不能为负哦！");
        //         this.form.price = '';
        //     }     
        //     if(this.form.price>=parseInt(this.price)){                
        //        this.$message.error("折后价需小于原价");
        //        this.form.price = '';
        //        this.form.percentage = '';
        //     }
        //     else{
        //         this.form.percentage = (this.form.price/this.price*100).toFixed(0)
        //     }
        // },
        //创建时
        getData(){                        
            let data = {
                id: this.id,
                sku_id: this.sku_id,
            }
            discountgoodsedit(data).then(res =>{
                console.log(data)
                console.log(res)                
                    console.log(res,'123');                    
                    this.data = res.data;                                                 
                    // res.data.sku.forEach(val => {
                    //     this.discountData = val.discountData;                                                                                                                                                 
                    //     if(this.sku_id==val.id){                                                        
                    //         this.form.startTime = val.discountData.start_time;
                    //         this.form.endTime = val.discountData.end_time;
                    //         this.form.price = val.discountData.discount_price;
                    //         this.form.percentage = val.discountData.discount_percent; 
                    //         this.price = val.product_price;                                                                                                               
                    //         this.disId = val.discountData.id;  
                    //         if(val.discountData.cover_clients==2){                               
                    //             this.ordinary = false;
                    //             }
                    //         else{
                    //             this.ordinary = true;
                    //         }                                                                                
                    //     }
                    //     else{
                    //         this.price = this.data.sku[0].product_price;
                    //         this.radio2 = this.data.sku[0].id;  
                    //         this.disId = this.data.sku[0].discountData.id;                                                                                                  
                    //     }                                                                                              
                    // });                 
                                                                 
                        // this.price = this.data.sku[0].product_price;                                                                            
                        // this.radio2 = this.data.sku[0].id;       
                        // this.disId = this.data.sku[0].discountData.id;    
                        // this.form.price = this.data.sku[0].discountData.discount_price;
                        // this.form.percentage = this.data.sku[0].discountData.discount_percent; 
                        // this.form.startTime =  this.data.sku[0].discountData.start_time
                        // this.form.endTime =  this.data.sku[0].discountData.end_time  
                        // this.dis_status =  this.data.sku[0].discountData.dis_status  
                        // if(this.data.sku[0].discountData){
                        //     this.cover = this.data.sku[0].discountData.cover_clients;
                        // }                                                                                                                                                                        
                    // }                                                                      
            })
            let getSku = {
                proId: this.id,
                skuId: this.sku_id,
            }
            getSkuDiscount(getSku).then(res=>{
                console.log(res);                
                // alert(localStorage.getItem('radio2'))
                // if(localStorage.getItem('radio2')||localStorage.getItem('price')||localStorage.getItem('percentage')||localStorage.getItem('startTime')||localStorage.getItem('endTime')){
                //     this.form.startTime = localStorage.getItem('startTime');
                //     this.form.endTime = localStorage.getItem('endTime');
                //     this.form.price = localStorage.getItem('price');
                //     this.form.percentage = localStorage.getItem('percentage'); 
                //     this.radio2 = localStorage.getItem('radio2');
                //     this.price = localStorage.getItem('price');                                                                                                                                  
                // }
                // else{
                    if(localStorage.getItem('radio2')||localStorage.getItem('price')||localStorage.getItem('percentage')||localStorage.getItem('startTime')||localStorage.getItem('endTime')){                                                                                   
                    //    alert(localStorage.getItem('radio2'));
                       this.form.startTime = localStorage.getItem('startTime');
                        this.form.endTime = localStorage.getItem('endTime');
                        this.form.price = localStorage.getItem('price');
                        this.form.percentage = localStorage.getItem('percentage'); 
                        this.radio2 = parseInt(localStorage.getItem('radio2'));  
                        this.price = localStorage.getItem('toprice');                          
                    }
                    else{                        
                        this.form.startTime = res.data.discountData.start_time;
                        this.form.endTime = res.data.discountData.end_time;
                        this.form.price = res.data.discountData.discount_price;
                        this.form.percentage = res.data.discountData.discount_percent; 
                        this.radio2 = res.data.id;
                        this.price = res.data.product_price;                                                                                                               
                        this.disId = res.data.discountData.id;  
                        if(res.data.discountData.cover_clients==2){                               
                            this.ordinary = false;
                            }
                        else{
                            this.ordinary = true;
                        }                 
                    }                     
                // }                                                                                                                                           
            })   
        },
       handleClick(tab, event) {
        console.log(tab, event);    
      },
      abc(index){            
            this.price = this.data.sku[index].product_price;
            this.form.price = this.data.sku[index].discountData.discount_price;
            this.form.percentage = this.data.sku[index].discountData.discount_percent; 
            this.form.startTime =  this.data.sku[index].discountData.start_time
            this.form.endTime =  this.data.sku[index].discountData.end_time 
            this.disId = this.data.sku[index].discountData.id;
            this.dis_status = this.data.sku[index].discountData.dis_status;            
            this.cover = this.data.sku[index].discountData.cover_clients;
            this.sku_id = this.data.sku[index].id;
            this.sku_name = this.data.sku[index].sku_name                      
            if(this.cover==1){
                this.ordinary = true;
            }
            else{
                this.ordinary = false;
            }
      }
    },
    components:{   
      notBeginning, conducting  
    },
    created(){        
        this.id = this.$route.query.id;
        this.sku_id = this.$route.query.sku_id;        
        this.Verification = this.$route.query.Verification       
        this.getData();
    }
}
</script>
<style scoped>
#setdiscountgoods >>> .el-input.is-disabled .el-input__inner{
    background-color: #fff;
    color: #333
}
#setdiscountgoods >>> .el-radio.is-bordered{
    margin-right:20px;
}
#setdiscountgoods >>>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    float:left;
    margin-right: 20px;
}
#setdiscountgoods >>> .el-form-item__label{
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;;
    padding-left: 6px;
    padding-right: 6px;     
}
#setdiscountgoods >>> .el-input--mini .el-input__inner{
    height: 30px;
    line-height: 30px;
}
#setdiscountgoods >>> .el-input__inner{
    border-radius: 0 4px 4px 0;
    text-align: center;
}
.ba{
    background-color: #FFF;
    color: #1491f2;    
    height: 30px;
}
.input{
    width: 67px;    
    height: 30px;    
}
.choice-date{
    width: 150px;
}
.invalid{
    float: left;
    margin-right: 20px;
    font-size: 14px;
}
#setdiscountgoods >>> .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    color: #1491f2;
    background-color: #FFF;
    border-radius: 4px;
}
#setdiscountgoods >>> .el-radio__inner{
    width: 0;
    border: 0;       
}
#setdiscountgoods >>> .el-tabs__header{
  margin: 0;
}
#setdiscountgoods >>> .el-table th{
  background-color: #f2f2f2;
}
#setdiscountgoods >>> .el-badge__content{
  border: none;
}
#setdiscountgoods >>> .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: none;
}
#setdiscountgoods >>> .el-tabs--card>.el-tabs__header .el-tabs__item{
    border: none;    
}
#setdiscountgoods >>> .el-tabs__item{
    width: 100px;
    text-align: center;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
} 
#setdiscountgoods >>> .el-tabs__item.is-active{
  background-color: #1491f2;
  color: #FFF;
}
#setdiscountgoods >>> .el-tabs--card>.el-tabs__header{
  border: none;
}
.order-exhibition{
  position: relative;
}
.color-red{
    color: #ff0000;
    padding-left: 10px;   
}
.color-1491f2{
    color: #1491f2;
}
.edit-info{
    border-bottom: 1px solid #ccc;
    padding-bottom: 24px;
    width:470px;
}
.edit-info p{
    color: #666;
    font-size: 14px;
    margin-top: 18px;
}
.edit-info p:first-child{
    color: #333;
    margin-top: 0;
}
.choice-type{
    margin-top: 10px;
}
.set-price{
    margin-top: 20px;
}
.clear{
    clear: both;
    border: none!important;
}
.commodityInfo{
    margin-top: 20px;
}
.isnotcustomerprice{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 28px;
}
.edit-goods{
    width: 470px;
}
.operation{
    width: 100%;
    text-align: right;
}
.operation{
    margin-top: 20px;
}
.btn1{
    width: 90px;
    height: 30px;
    border: 1px solid #1491f2;
    color: #1491f2;
}
.btn2{
    width: 90px;
    height: 30px;
    background-color: #1491f2;
    color: #FFF;
}
</style>
<style lang="stylus" scoped>
#setdiscountgoods
    .el-header
        margin-left 1px
    .el-breadcrumb
        line-height 60px
    .el-main        
        height: 100vh;
        margin-left: 10px;
        margin-top: 10px;
        background-color: #FFF;                     
</style>