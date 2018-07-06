<template>
    <div class="exclusive">
        <div class="exclusive_header">
            <span class="customer"><router-link to="customerList">客户列表</router-link></span><span>/设置专属价</span>
        </div>
        <div class="exclusive_content">
           <div class="searchBox" @keyup.enter="search">
                   <el-input
                      size="small"
                      placeholder="搜索您要找的商品"
                      v-model="searchText">
                      <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
                    </el-input>
            </div>
        <el-table
          :data="productList">
          <el-table-column
                type="selection">
          </el-table-column>
          <el-table-column
            label="商品/价格">
            <template slot-scope="scope">
                <div class="product_data">
                    <div class="img">
                        <img :src="scope.row.product_img">
                    </div>
                    <div class="product_text">
                        <span class="product_name">{{scope.row.product_name}}</span>
                        <span class="product_price"><span class="clients_price" v-if="scope.row.clients_price">专属价:￥{{scope.row.clients_price}}</span>￥{{scope.row.product_price}}</span>
                        <span class="product_code">商品编号:{{scope.row.product_sku_num}}</span>
                    </div>
                </div>
            </template>
          </el-table-column>
          <el-table-column
            label="属性">
            <template slot-scope="scope">
                <div class="sku_content">
                    <span :class="{'sku_item':true,'active_sku': productList[scope.$index].sku_id == item.id }" v-for="(item,index) in scope.row.product_sku" :key="index"
                     @click="selectActive(scope.$index,scope.row.product_sku[index])">
                      <a :title="item.sku_name"> {{item.sku_name}}</a>
                     </span>
                </div>
            </template>
          </el-table-column>
          <el-table-column
            label="设置专属价">
            <template slot-scope="scope">
                <div>
                    <span>专属价:</span>
                    <input type="number" class="money" v-model="scope.row.clients_price">
                </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="110">
            <template slot-scope="scope">
             <div class="operation">
              <el-button  type="primary" size="mini" @click="updateSkuMoney(scope.$index)">确定修改</el-button>
             </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="demonstration" v-if="pro_count">
            <el-pagination
                layout="prev, pager, next"
                 @current-change="handleCurrentChange"
                :total="total">
            </el-pagination>
             <span>
                <p>共{{pro_count}}条,每页10条</p>
            </span>
        </div>
        </div>
    </div>
</template>
<script>
import {
  getProductList,
  getProSku,
  operateClientsSku
} from "@/api/customer/exclusive.js";
export default {
  data() {
    return {
      page: 1,
      searchText: null,
      productList: [],
      total: null,
      active_sku: [],
      active: null, //判断高亮
      activeId: null,
      activeIndex: 0,
      pro_count: null
    };
  },
  watch:{
      page(){
          this.getProductListFn()
      }
  },
  methods: {
      search(){ //搜索的方法
          if(this.page == 1){
             this.getProductListFn()
            }else{
             this.page = 1 
            }
      },
      handleCurrentChange(val){//分页
         this.page = val
      },
    updateSkuMoney(index) {
     let data = {
         clients_id: this.$route.query.id,
         sku_id:  this.productList[index].sku_id,
         price: this.productList[index].clients_price
     }
     operateClientsSku(data).then(res=>{
         if(res.data.code == 200){
            this.new("修改成功")
         }
     })
    },
    selectActive(index, val) {
      //选择当前
      this.activeId = val.id
    //   this.activeIndex = skuIndex
      this.active = val.id;
      this.$set(this.productList[index], "product_price", val.product_price);
      this.$set(this.productList[index], "clients_price", val.clients_price);
      this.productList[index].sku_id = val.id
    },
    getProductListFn() {
      //获取商品列表
      let data = {
        clientsId: this.$route.query.id,
        page: this.page,
        proName: this.searchText
      };
      getProductList(data).then(res => {
        this.total = res.data.count_num * 10
        this.pro_count = res.data.pro_count
        this.productList = res.data.data;
        this.productList.forEach(val => {
          if (val.product_sku.length > 0) {
            //   this.$set(val,'product_price',val.product_sku[0].product_price)
            val.product_price = val.product_sku[0].product_price;
            this.$set(val,'sku_id',val.product_sku[0].id)
            if (val.product_sku[0].clients_price) {
              val.clients_price = val.product_sku[0].clients_price;
            //   this.$set(val,'clients_price',val.product_sku[0].clients_price)
            }
            this.active_sku.push(val.product_sku[0].id);
          }
        });
      });
    },
    new(data){
        this.$message({
            type: 'success',
            message: data
        })
        this.getProductListFn();
    }
  },
  mounted() {
    this.getProductListFn();
  }
};
</script>
<style lang="stylus" scoped>
.demonstration{
    text-align center;
    position relative
}
.demonstration span{
    position: absolute;
    top: 50%;
    height: 20px;
    margin-top: -10px;
    line-height: 20px;
    right: 0;
    font-size: 13px;
}
.exclusive_header {
    height: 60px;
    background: white;
    width: 100%;
    font-size: 14px;
    line-height: 60px;
    padding-left: 20px;

    .customer a {
        color: #1491f2;
    }
}

.exclusive_content {
    margin: 10px;
    padding: 20px 10px 10px 10px;
    background: white;
    min-height: 600px;

    .searchBox {
        width: 300px;
    }
    .el-table th {
            background-color: #f8f8f8;
        }
    .sku_content {

        .sku_item {
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
            border-radius: 5px;
            border: 1px solid #cccccc;
            display: inline-block;
            margin-right: 5px;
            margin-bottom: 5px;
            cursor: pointer;
            width:4em;          
            word-break:keep-all; 
            white-space:nowrap; 
            overflow:hidden;   
            text-overflow:ellipsis;
            text-align center
        }

        .active_sku {
            color: #1491f2;
            border: solid 1px #1491f2;
        }
    }

    .product_data {
        display: flex;
        justify-content: flex-start;
    }

    .img img {
        width: 60px;
        height: 60px;
    }

    .money {
        width: 60px;
        height: 30px;
        border-radius: 5px;
        border: solid 1px #cccccc;
        display: inline-block;
        outline: none;
        color: red;
        text-align: center;
    }

    .product_text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        line-height: 1;
        height: 60px;
        margin-left: 10px;

        .product_name {
            color: #333333;
            font-size: 14px;
            font-weight: 800;
        }

        .clients_price {
            color: #ff0000;
            font-size: 13px;
            margin-right: 5px;
        }

        .product_price {
            color: #999999;
            font-size: 12px;
        }

        .product_code {
            color: #999999;
            font-size: 12px;
        }
    }
}
</style>

