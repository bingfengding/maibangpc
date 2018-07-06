<template>
  <el-container>
    <el-header class="bgFFF">
      <sideHeader></sideHeader>
    </el-header>
    <el-main>
      <div class="income">
        <div class="income-content">
          <div class="top-header">
            <div class="btn">
              <el-button :type="shop" @click="setActiveItem(1)">店铺金库</el-button>
              <el-button :type="merchant" @click="setActiveItem(2)">微信商户</el-button>
            </div>
            <div class="date">
              <el-date-picker
                v-model="selectDate"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="getSelectTime"
                :picker-options="pickerOptions0">
              </el-date-picker>
            </div>
          </div>
          <div class="ul-content">
            <ul>
              <li v-for="(item, index) in incomeList" :key="index" @click="showIncomeDetail(item.id)">
                <div class="li-top">
                  <span v-if="item.change_type == 1">提现</span>
                  <span v-if="item.change_type == 2">订单收入</span>
                  <span v-if="item.change_type == 3">微信收取手续费</span>
                  <span v-if="item.change_type == 4">店铺商户收入</span>
                  <span class="price" v-if="item.change_type == 1 || item.change_type == 3">-{{item.change_sum}}</span>
                  <span class="price red" v-if="item.change_type == 2 || item.change_type == 4">+{{item.change_sum}}</span>
                </div>
                <div class="li-center" v-if="item.trade_platform == 1">[微信支付]</div>
                <div class="li-center" v-if="item.trade_platform == 2">[支付宝支付]</div>
                <div class="li-center" v-if="item.trade_platform == 3">[网银支付]</div>
                <div class="li-bottom">{{item.change_time}}</div>
                <img src="@/images/common/grayright-icon.png" alt="" class="right-icon">
              </li>
            </ul>
            <div class="no-data" v-if="incomeList.length == 0">
              暂无数据
            </div>
          </div>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="prev, pager, next"
              :total="recordSum">
            </el-pagination>
            <span class="demonstration">共{{recordSum}}条，每页10条</span>
          </div>
        </div>
      </div>
      <income-card ref="income" v-bind:incomeDetail="incomeDetail"></income-card>
    </el-main>
  </el-container>
</template>
<script>
import sideHeader from "./components/sideHeader.vue";
import incomeCard from "./components/incomeCard.vue";
import {
  platformWasteBook,
  mchWasteBook,
  wasteBookDetail
} from "@/api/asset/asset.js";
export default {
  data() {
    return {
      incomeDetail: {},
      selectDate: "",
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      shop: "primary",
      merchant: "",
      currentPage: 1,
      recordSum: 0,
      incomeList: []
    };
  },
  methods: {
    setActiveItem(type) {
      if (type == 1) {
        this.shop = "primary";
        this.merchant = "";
        this.currentPage = 1;
        this.getPlatformWasteBook();
      } else {
        this.shop = "";
        this.merchant = "primary";
        this.currentPage = 1;
        this.getMerchantWasteBook();
      }
    },
    getMerchantWasteBook() {
      let that = this;
      let param = {
        page: this.currentPage, // 页码
        startTime: this.selectDate[0],
        endTime: this.selectDate[1]
      };
      mchWasteBook(param).then(res => {
        console.log(res.data);

        if (res.data.code == 200) {
          that.recordSum = res.data.data.recordSum;
          that.incomeList = res.data.data.incomeList;
        } else {
          this.$message(res.data.error);
        }
      });
    },
    getPlatformWasteBook() {
      let that = this;
      let param = {
        page: this.currentPage, // 页码
        startTime: this.selectDate[0],
        endTime: this.selectDate[1]
      };
      platformWasteBook(param).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          that.recordSum = res.data.data.recordSum;
          that.incomeList = res.data.data.incomeList;
        } else {
          this.$message(res.data.error);
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.shop == "primary") {
        this.getPlatformWasteBook();
      } else {
        this.getMerchantWasteBook();
      }
    },
    handleSizeChange() {},
    getSelectTime(val) {
      this.selectDate = val;
      if (this.shop == "primary") {
        this.currentPage = 1;
        this.getPlatformWasteBook();
      } else {
        this.currentPage = 1;
        this.getMerchantWasteBook();
      }
    },
    showIncomeDetail(id) {
      let that = this;
      wasteBookDetail(id).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          let detail = [];
          for (var key in res.data.data.detail) {
            detail.push([key, res.data.data.detail[key]]);
          }
          res.data.data.detail = detail
          that.incomeDetail = res.data.data;
          that.$refs.income.showToast();
        } else {
          that.$message.error(that.data.error)
        }
      });
    }
  },
  created() {
    this.getPlatformWasteBook();
  },
  components: { sideHeader, incomeCard }
};
</script>

<style lang="stylus" scoped>
.el-main {
  padding: 10px;

  .income {
    background-color: #fff;
    padding: 10px;
    min-height: 735px;

    .income-content {
      position: relative;
      width: 600px;

      .top-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .btn {
          button {
            height: 30px;
            line-height: 0;
            text-align: center;
            width: 90px;
            padding: 0;
            border: 0;
          }
        }
      }

      .ul-content {
        ul {
          li {
            background-color: #f8f8f8;
            padding: 10px 10px 10px 20px;
            color: #333333;
            font-size: 14px;
            position: relative;
            margin-bottom: 10px;

            .li-top {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .price {
                position: absolute;
                top: 20px;
                right: 20px;
              }

              .red {
                color: #ff0000;
              }

              .green {
                color: #72d2a8;
              }
            }

            .li-center {
              margin: 10px 0;
            }

            .right-icon {
              position: absolute;
              right: 10px;
              bottom: 10px;
            }
          }
        }
      }

      .block {
        display: flex;
        justify-content: center;
        align-items: center;

        .demonstration {
          font-size: 12px;
          color: #333333;
          position: absolute;
          right: 0;
        }
      }
      .no-data {
        line-height 88px
        text-align center
      }
    }
  }
}
</style>
