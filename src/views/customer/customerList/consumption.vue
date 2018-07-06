<template>
    <div class="consumption">
        <div class="consumption_header">
            <span class="customer"><router-link to="customerList">客户列表</router-link></span><span>/消费记录</span>
        </div>
        <div class="consumption_content">
            <div class="search_content">
                <span>筛选日期:</span>
                <span>
                    <el-date-picker
                        v-model="starData"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始日期"
                        size="small">
                    </el-date-picker>
                </span>
                <span style="color: #999999;">至</span>
                 <span>
                    <el-date-picker
                        v-model="endData"
                        type="date"
                        value-format="yyyy-MM-dd"
                        size="small"
                        placeholder="结束日期">
                    </el-date-picker>
                </span>
                <br/>
                <el-button type="primary" size="small" class="searchBtn" @click="getConsumptiontFn">筛选</el-button>
            </div>
            <el-table  :data="consumptionList">
            <el-table-column
            prop="order_time"
                label="日期">
            </el-table-column>
            <el-table-column
            prop="product_name"
                label="商品名">
            </el-table-column>
            <el-table-column
                label="消费金额">
                <template slot-scope="scope">
                    <span style="color: red">{{scope.row.order_money_amount}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="110">
                <template slot-scope="scope">
                <div class="operation">
                <el-button  type="primary" size="mini" @click="goOrddetail(scope.row.id)">详情</el-button>
                </div>
                </template>
            </el-table-column>
            </el-table>
            <div class="demonstration"  v-if="count_num">
                <span class="money">该时间段总消费:<span style="color: red">￥{{data_count}}</span></span>
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="total">
                </el-pagination>
                <span class="page">共{{count_num}}条,每页10条</span>

            </div>
        </div>
    </div>
</template>
<script>
import { getConsumptiont } from "api/customer/customer";
export default {
  data() {
    return {
      starData: null,
      endData: null,
      page: 1,
      consumptionList: [],
      total: null,
      data_count: null,
      count_num: 0
    };
  },
  watch: {
    page(val) {
      this.getConsumptiontFn();
    }
  },
  methods: {
    handleCurrentChange(val) {
      //分页
      this.page = val;
    },
    getConsumptiontFn() {
      let data = {
        id: this.$route.query.id,
        start_time: this.starData,
        last_time: this.endData,
        page: this.page
      };
      getConsumptiont(data).then(res => {
        if (res.data.data === "数据为空") {
          this.consumptionList = [];
          this.data_count = 0;
          this.total = null;
          this.count_num = 0;
          return;
        }
        this.consumptionList = res.data.data;
        this.data_count = res.data.data_count;
        this.total = res.data.page_num * 10;
        this.count_num = res.data.count_num;
      });
    },
    goOrddetail(id) {
      this.$router.push({ path: "/order/orddetail", query: { id: id } });
    }
  },
  mounted() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1
    if(month < 9){
        month = '0' + month
    }
    date.setDate(0);
    this.starData = year + "-" + month + "-" + 0+1;
    this.endData = year + "-" + month + "-" + date.getDate();
    this.getConsumptiontFn();
  }
};
</script>

<style lang="stylus">
.demonstration {
    text-align: center;
    position: relative;
    margin-top: 20px;

    .money {
        position: absolute;
        left: 0;
        color: #333333;
        font-size: 14px;
        top: 50%;
        height: 20px;
        margin-top: -10px;
    }

    .page {
        position: absolute;
        right: 0;
        color: #333333;
        font-size: 12px;
        top: 50%;
        height: 16px;
        margin-top: -8px;
    }
}

.consumption_header {
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

.consumption_content {
    margin: 10px;
    padding: 10px 10px 10px 10px;
    background: white;
    min-height: 600px;

    .el-table th {
        background-color: #f8f8f8;
    }

    .search_content {
        color: #333333;
        font-size: 14px;
        height: 120px;
        background-color: #f8f8f8;
        margin-bottom: 20px;
        padding: 20px 10px;

        span {
            margin: 0 5px;
        }

        .searchBtn {
            margin-left: 79px;
            margin-top: 20px;
        }
    }
}
</style>

