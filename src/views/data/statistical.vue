<template>
    <div class="statistical">
        <div class="statistical_header">
            <span class="customer">销售记录</span>
        </div>
        <div class="statistical_content">
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
                <el-select v-model="staffId" placeholder="全部成员" size="small" style="margin-left: 79px;margin-top: 10px">
                  <el-option
                    v-for="item in staffList"
                    :key="item.id"
                    :label="item.staff_name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <br/>
                <el-button type="primary" size="small" class="searchBtn" @click="getSalestatisticsFn">筛选</el-button>
            </div>
            <span class="span">订单: <span style="color: #1491f2;">{{orderSum}}</span></span>
            <span class="span">商品：<span style="color: #1491f2;">{{productSum}}</span></span>
            <span class="span">总金额: <span style="color: red">{{totalMoney}}</span></span>
            <el-table  :data="salestatistics" style="margin-top: 20px">
            <el-table-column
            prop="order_time"
                label="日期">
            </el-table-column>
            <el-table-column
            prop="user_name"
                label="客户名">
            </el-table-column>
            <el-table-column
                label="消费金额">
                <template slot-scope="scope">
                    <span style="color: red">{{scope.row.payment_amount}}</span>
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
            <div class="demonstration" v-if="orderSum">
                <el-pagination
                    layout="prev, pager, next"
                     @current-change="handleCurrentChange"
                    :total="total">
                </el-pagination>
                <span class="page">共{{orderSum}}条,每页10条</span>

            </div>
        </div>
    </div>
</template>
<script>
import { getSalestatistics, getStaffs } from "@/api/data/data.js";
export default {
  data() {
    return {
      starData: null,
      endData: null,
      page: 1,
      salestatistics: [],
      total: null,
      data_count: null,
      count_num: 0,
      staffId: null,
      staffList: [],
      totalMoney: null,
      total: null,
      productSum: null,
      orderSum: null
    };
  },
  watch: {
    page() {
      this.getSalestatisticsFn();
    },
    starData(val) {
      if (this.endData) {
        var stdt = new Date(this.starData.replace("-", "/"));
        var etdt = new Date(this.endData.replace("-", "/"));
        if (stdt > etdt) {
          this.$message({
            type: "error",
            message: "开始日期必须小于结束日期"
          });
          this.starData = "";
        }
      }
    },
    endData(val) {
      var stdt = new Date(this.starData.replace("-", "/"));
      var etdt = new Date(this.endData.replace("-", "/"));
      if (stdt > etdt) {
        this.$message({
          type: "error",
          message: "结束日期必须大于开始日期"
        });
        this.endData = "";
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
    },
    getStaffsFn() {
      //请求所有员工
      getStaffs().then(res => {
        this.staffList = res.data.data.staffList;
      });
    },
    getSalestatisticsFn() {
      //请求列表
      let data = {
        staff_id: this.staffId,
        start_time: this.starData,
        last_time: this.endData,
        page: this.page
      };
      getSalestatistics(data).then(res => {
        this.salestatistics = res.data.data.list;
        this.totalMoney = res.data.data.totalMoney;
        this.total = res.data.data.pageSum * 10;
        this.productSum = res.data.data.productSum;
        this.orderSum = res.data.data.orderSum;
      });
    },
    goOrddetail(id) {
      this.$router.push({ path: "/order/orddetail", query: { id: id } });
    }
  },
  mounted() {
    console.log(this.$route)
    this.getStaffsFn();
    if (this.$route.params.staffId) {
      this.staffId = this.$route.params.staffId
      let date = new Date();
      let year = date.getFullYear();
      let month = date.setMonth(this.$route.params.date);
      date.setDate(0);
      this.staffId = this.$route.params.staffId;
      this.starData = year + "-" + this.$route.params.date + "-" + 1;
      this.endData =
        year + "-" + this.$route.params.date + "-" + date.getDate();
      this.getSalestatisticsFn();
    } else {
      //请求本月记录
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1
      if(month < 9){
        month = '0' + month
      }
      date.setDate(0);
      this.starData = year + "-" + month + "-" + 0+1;
      this.endData = year + "-" + month + "-" + date.getDate();
      this.getSalestatisticsFn();
    }
  }
};
</script>

<style lang="stylus">
.demonstration {
    text-align: center;
    position: relative;
    margin-top: 20px;

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

.statistical_header {
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

.statistical_content {
    margin: 10px;
    padding: 10px 10px 10px 10px;
    background: white;
    min-height: 600px;

    .span {
        color: #333333;
        font-size: 14px;
        margin-right: 100px;
    }

    .el-table th {
        background-color: #f8f8f8;
    }

    .search_content {
        color: #333333;
        font-size: 14px;
        height: 160px;
        background-color: #f8f8f8;
        margin-bottom: 20px;
        padding: 20px 10px;

        span {
            margin: 0 5px;
        }

        .el-input {
            width: 220px;
        }

        .searchBtn {
            margin-left: 79px;
            margin-top: 20px;
        }
    }
}
</style>

