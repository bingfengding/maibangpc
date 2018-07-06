<template>    
    <div id="conducting">
        <el-button type="prinary" size="mini" class="addgoods" @click="addCommodity">添加商品</el-button> 
        <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="商品"
      width="360">
      <template slot-scope="scope" v-if="tableData3">
          <div class="goods-exhibition">
            <div class="goods-pic">   
                <img :src="scope.row.skuData.sku_img" width="100%" height="100%">             
            </div>
            <div class="goods-data">
                <p>{{scope.row.proData.product_name}}</p>
                <p>编码：{{scope.row.proData.product_sku_num}}</p>
                <p><span class="color-red">折后价&yen;{{scope.row.discount_price}}</span><del>&yen; {{scope.row.skuData.product_price}}</del></p>                                      
                <!-- <el-button type="primary" size="mini">还有更多商品</el-button > -->
            </div>
          </div>
      </template>
    </el-table-column>
    <el-table-column     
      label="属性"
      width="280">
        <template slot-scope="scope" v-if="tableData3">
            <p>{{scope.row.skuData.sku_name}}</p>
        </template>
    </el-table-column>
    <el-table-column     
      label="期限"
      show-overflow-tooltip
      width="200">
        <template slot-scope="scope" v-if="tableData3">
                {{scope.row.start_time}}-{{scope.row.end_time}}
        </template>
    </el-table-column>
    <el-table-column      
      label="操作"
      show-overflow-tooltip
     >
          <template slot-scope="scope" v-if="tableData3">
              <a href="javascript: ;" @click="goUrl(scope.row.product_id,scope.row.sku_id,3)">编辑</a>
          </template>
    </el-table-column>
  </el-table>
  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div> -->             
    <el-button type="prinary" size="mini" class="recovery" @click="recovery()">恢复原价</el-button>
  <div class="foot">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="10"
            layout="prev, pager, next"
            :total="discount_count">
        </el-pagination>    
        <span v-if="discount_count">共{{discount_count}}条，一页10条</span>
        <span v-else>共0条，一页10条</span>
  </div>
    <!--添加商品-->
        <div class="add-model" v-if="isNotOpen" @click="colse(1)">
            <div class="add-content" @click.stop="colse(2)">
                <div class="top-cont">
                    <p>选择商品</p>
                    <img src="../../../../images/orderImg/close-icon.png" width="12px" @click="colse(3)">
                </div>
                <div class="choice">
                    <el-input
                        placeholder="请输入内容"
                        v-model="input10"
                        clearable
                        size="mini"
                        class="search">
                    </el-input>
                </div>
                <div class="show-goods" v-for="(item,index) in goodsData" :key="index" v-if="goodsData!='没有找到相关商品'" @click="goDetails(item.id,item.sku.id,4)">
                    <div class="goods-img">
                        <img :src="item.pro_img_id" width="100%" height="100%">
                    </div>
                    <div class="goods-data">
                      <p style="font-size: 14px;color: #333">{{item.product_name}}</p>
                      <p style="font-size: 12px;color: #666">编码：{{item.product_sku_num}}</p>
                      <p><span style="color:#ff0000;padding-right:10px;font-size: 12px" v-if="item.sku_discount">折后价&yen;{{item.sku_discount.discount_price}}</span>
                      <del style="font-size: 12px;color: #666" v-if="item.sku_discount">&yen;{{item.sku.product_price}}</del><span v-else>{{item.sku.product_price}}</span></p>
                    </div>                    
                </div>
                <div v-if="goodsData=='没有找到相关商品'" class="isnotfind">
                  <p>没有找到相关商品</p>
                </div>
                <div class="foot1">
                    <el-pagination
                        @size-change="handleSizeChange2"
                        @current-change="handleCurrentChange2"
                        :current-page.sync="currentPage2"
                        :page-size="5"
                        layout="prev, pager, next"
                        :total="pro_list_count"
                        class="wid" v-if="goodsData!='没有找到相关商品'">                       
                    </el-pagination>
                    <span>共{{pro_list_count}}条，一页5条</span>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
import {discountgoods,getProList,recoverPrice,judgeUserPermission} from '@/api/set/setmanage'
  export default {
    data() {
      return {
        tableData3: [{
            add_time: '',//添加时间
            cover_clients: '',
            discount_price: '',//折扣
            end_time: '',//结束时间
            id: '',//id
            start_time: '',//开始时间
            end_time: '',//结束时间
            status: '',//状态
            sku_id: '',//
            product_id: '',//
            proData: {                  
                id: '',
                pro_img_id: '',
                product_name: '',
                product_sku_num: '',                
            },
            skuData:{
              id: '',
              product_price: '',
              sku_img: '',
              sku_name: '',
              sku_img_id: '',
            },            
        },],
        multipleSelection: [],
        currentPage1: 1,    
        currentPage2: 1,
        //模態框
        isNotOpen: false,
        // 搜索內容
        input10: '',
        goodsData: [],
        page: 1,
        pro_list_count: 50,
        disId: '',
        discount_count: null,
      }      
    },
    watch:{
      input10(val,oldval){
          this.page = '',    
          this.getGoods()          
      }
    },
    methods: {
      //恢复原价
      recovery(){  
            if(!this.disId){
                this.$message.error('您都还没有选择商品呢！');
                return false;
            }
            judgeUserPermission().then(res =>{
                if(res.data.code==200){                    
                    let data = {
                    disId: this.disId
                    }
                    recoverPrice(data).then(res =>{
                        if(res.data.code==200){         
                            this.$message({
                                message: res.data.data,
                                type: 'success'
                            });
                            this.getData();
                        }
                        else if(res.data.code==400){                                             
                            if(res.data.error == '商品折扣id为空'){
                                this.$message.error('您都还没有选择商品呢！');
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
      handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        //currentPage 改变时会触发
        handleCurrentChange(val) {           
            console.log(`当前页: ${val}`);            
            this.page = val;            
            this.getData();
        },
      handleSizeChange2(val) {
            console.log(`每页 ${val} 条`);
        },
        //currentPage 改变时会触发
        handleCurrentChange2(val) {            
            console.log(`当前页: ${val}`);            
            this.page = val;            
            this.getGoods();
        },
        goDetails(id,sku_id,a){
          this.isNotOpen = false;
          this.$router.push({path: 'setdiscountgoods',query:{id:id,sku_id:sku_id,Verification:a}})
        },
      //关闭添加商品
      colse(num){
        if(num==1||num==3){
            this.isNotOpen = false;
           $('html,body').css('overflow','hidden');
        }        
        else{
            return;
        }   
    },
      //打開添加商品窗口
      addCommodity(){
          this.isNotOpen = true;
          this.getGoods();
      },
      getGoods(){
          let data = {
              page: this.page,
              searchText: this.input10,            
            }
          getProList(data).then(res =>{
              console.log(res)
              if(res.data.code==200){
                  this.goodsData = res.data.data;
                  this.pro_list_count = res.data.pro_list_count;
              }
              else if(res.data.code==400){
                console.log(res)
                this.goodsData = res.data.data;                
              }
          })
      },
      timetrans(date){
        var date = new Date(date*1000);//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '/';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D;
      },    
      //创建时
      getData(){
          let data = {
            type: 2,//未开始
            page: this.page,
          }
          this.tableData3 = [];
          discountgoods(data).then(res =>{
            console.log(res,'哈哈')
             if(res.data.code==200){
               if(res.data.data){
                 this.tableData3 = res.data.data 
                  res.data.data.forEach(val =>{
                   val.start_time = this.timetrans(val.start_time)
                   val.end_time = this.timetrans(val.end_time);
                 })  
               }   
               else{
                 this.tableData3 = [];
               }                          
                if(res.data.discount_count){                  
                  this.discount_count = res.data.discount_count
                }                
             }
             else if(res.data.code == 400){
               this.tableData3 = [];
             }
          })
      },
      toggleSelection(rows) {               
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);            
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;        
        // console.log(val[0].sku_id)
        if(val.length==1){          
          console.log(val)
          this.disId = val[0].id
        }      
        else if(val.length>1){
            this.disId = val[0].id;
            this.$message.error('目前只能选择一个商品恢复哦！');
        }  
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },     
      goUrl(id,sku_id,a){          
          //转跳编辑商品
          this.$router.push({path: 'setdiscountgoods',query:{id:id,sku_id:sku_id,Verification:a}})
      }
    },
    created(){
      this.getData();
    }
  }
</script>
<style scoped>
.wid{
    max-width: 380px;
}
#conducting >>> .el-table th:nth-child(5){
    text-align: right;        
    padding-right: 20px; 
}
#conducting >>> .el-table td:nth-child(5){
    text-align: right;             
}
#conducting >>> a{
    color: #1491f2;
    padding-right: 20px;
}
#conducting >>> .el-pagination{
    text-align: center;    
}
.goods-exhibition{           
    display: flex;
    justify-content: space-between;   
    padding-right: 60px;    
    display: flex;
    justify-content: space-between;    
    align-items: center;
}
.goods-pic{
    /* background-color: #333; */
    width: 60px;
    height: 60px;             
    position: relative;    
}
.goods-data{        
    width: 200px;                        
    font-size: 14px;           
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
.goods-data p{    
    color: #666;    
}
.color-red{
    color: #ff0000;
    padding-right: 15px;
}
.addgoods{
    float:right;
}
.recovery{
    position: relative;
    top: 10px;
}
/* 添加商品窗口 */
.add-model{
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
.add-content{
    width: 400px;
    height: 500px;
    background-color: #FFF;    
}
.top-cont{
  text-align: center;
  position: relative;
  height: 50px;
  line-height: 50px;
}
.top-cont img{
  position: absolute;
  top: 18px;
  right: 10px;
  cursor: pointer;
}
.choice{
  text-align: center;
}
.search{
  width: 380px;
}
.show-goods{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  height: 70px;
  border-bottom: 1px solid #CCC;
  cursor: pointer;
}
.goods-img{
  /* background-color: red; */
  width: 50px;
  height: 50px;  
  margin-right: 10px;  
}
.isnotfind{
  text-align: center;
  margin-top: 100px;
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
.foot1{
    margin-top: 20px;
    position: relative;       
}
.foot1 span{
    position: absolute;
    right: 10px;
    top: 30px;
    font-size: 12px;
    color: #000;
}
</style>