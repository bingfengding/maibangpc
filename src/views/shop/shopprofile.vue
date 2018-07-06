<template>
 <!-- 店铺概况 -->
 <el-container id="shopProfile">
    <!-- header头 -->
    <el-header class="bgFFF">
     <el-breadcrumb>
     
        <el-breadcrumb-item>
          店铺概况
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 主体内容 -->
    <el-main>
      <el-row type="flex" justify="space-between">
        <el-row class="mainBody bgFFF ">
          <el-col :span="24" class="shopProfileInfo bgImg">
            <div class="shopProfileInfoImg">
              <img :src="merchantInfo.merchant_logo" alt="">
            </div>
            <div class="shopProfileText">
              <p>
                <span class="font20 fontWeight">
                  {{merchantInfo.shop_name}}
                </span>
                <span class="font14 colorFFF" v-show="merchantInfo.isMerchantOrderServic">
                  汽配帮手担保
                </span>
              </p>
              <p class="shopProfileInfoState">
                <span class="smallLabel">
                  <i class="el-icon-circle-check-outline" 
                  :class="status == 2? 'colorGreen' :''"
                  circle></i>
                  <span v-if="cer_type == 2 ||(cer_type == 1 && status == 3)" >个人认证</span> 
                  <span v-else-if="cer_type == 1 &&status != 3" >企业认证</span>
                  <span v-else>未认证</span>
                </span>
                <span  class="smallLabel">
                  <i class="el-icon-circle-check-outline"
                  :class="merchantInfo.isMerchantOrderServic?'colorGreen':''" 
                  circle></i>
                  担保交易
                </span >
                <span  class="smallLabel">
                  <i class="el-icon-circle-check-outline" :class="merchantInfo.isOutlets?'colorGreen':''" circle></i>
                  <span >线下门店</span>
                </span>
              </p>
            </div>
          </el-col>
          <el-col :span="24" class="shopProfileYesterday textCen">
            <el-row type="flex" justify="space-around">
              <el-col :span="5">
                <p><span class="blue font20">{{yesterdaySalesData.nowSales}}</span></p>
                <p class="font14">
                  昨日销售额
                </p>
              </el-col>
              <el-col :span="5">
                <p><span class="blue font20">{{yesterdaySalesData.nowInteractive}}</span></p>
                <p class="font14">
                  昨日浏览量
                </p>
              </el-col>
              <el-col :span="5">
                <p><span class="blue font20">{{yesterdaySalesData.nowOrderVolume}}</span></p>
                <p class="font14">
                  昨日订单量
                </p>
              </el-col>
              <el-col :span="5">
                <p><span class="blue font20">{{yesterdaySalesData.nowSalesVolume}}</span></p>
                <p class="font14">
                  昨日销售量
                </p>
              </el-col>
            </el-row>
          </el-col>
          <el-col  :span="24">
            <div class="salestrend">
          <div class="salestrend-content">
            <div class="date-txt">
              {{dataMessage.year}}年<span v-if="dataMessage.month">{{dataMessage.month}}月</span>销售趋势
              <router-link to="/data">
                <span class="blue">详情》</span>
              </router-link>
            </div>
            <div id="Trend" style="width:100%;height:700px;">
            </div>
            
          </div>
        </div>
          </el-col>
        </el-row>
      
      </el-row>
    </el-main>

  </el-container>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
// 引入图例组件
require("echarts/lib/component/legend");
import { enterprisehomes, storeStatistics, storeHome } from "api/shop/profile";
import { salestrend } from "@/api/data/data.js";
import { judgecertification } from "api/shop/authentication";
export default {
  data() {
    return {
      merchantInfo: {
        shop_name: "",
        merchant_logo: "",
        isMerchantOrderServic: "",
        is_creator: "",
        isOutlets: ""
      },
      merchant_logo: "",
      cer_type: "3",
      status: "0",
      year: "",
      yearmonth: "",
      selectedYear: "",
      selectedMonth: "",
      dataMessage: {},
      certification: {
        type: 1,
        status: 1
      },

      abscissas: [],
      salesVolume: [],
      sales: [],
      orderVolume: [],
      pageView: [],
      yesterdaySalesData: {
        nowSalesVolume: 0,
        nowSales: 0,
        nowOrderVolume: 0,
        nowInteractive: 0
      }
    };
  },
  created() {
    // 获取验证详情
    judgecertification().then(result => {
      if (result.data.code == 200) {
        this.cer_type = result.data.data.cer_type;
        this.status = result.data.data.status;
      } else {
        this.$message.error(result.data.error);
      }
      console.log(this.cer_type, this.status);
    });
    this.getSalestrend();
    enterprisehomes().then(result => {
      this.yesterdaySalesData.nowSalesVolume =
        result.data.data.yesterdaySalesData.nowSalesVolume;
      this.yesterdaySalesData.nowSales =
        result.data.data.yesterdaySalesData.nowSales;
      this.yesterdaySalesData.nowOrderVolume =
        result.data.data.yesterdaySalesData.nowOrderVolume;
      this.yesterdaySalesData.nowInteractive =
        result.data.data.yesterdaySalesData.nowInteractive;
    });
    storeHome().then(result => {
      if (result.data.code === 200) {
        this.merchantInfo = result.data.data.merchantInfo;
        this.certification = result.data.data.certification;
      } else {
        this.$message.error(result.data.error);
      }
    });
  },
  mounted() {},
  methods: {
    getSalestrend() {
      let that = this;
      let param = {
        year: this.selectedYear,
        month: this.selectedMonth
      };
      salestrend(param).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          that.dataMessage = res.data.data;
          that.drawLine();
        } else {
          that.$message.error(res.data.error);
        }
      });
    },
    selectYear(time) {
      this.selectedYear = time;
      this.yearmonth = "";
      this.selectedMonth = "";
    },
    selectMonth(time) {
      let year = time.substr(0, 4);
      let month = time.substr(5);
      this.selectedYear = year;
      this.selectedMonth = month;
      this.year = "";
    },
    drawLine() {
      let that = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("Trend"));
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            //图例文字的样式
            // color:'#ff9626',
            fontSize: 12
          }
          // backgroundColor:"rgb(255, 255, 255)",
          // extraCssText: 'box-shadow: 0px 4px 24px 0px rgba(147, 147, 147, 0.3);'
        },
        // title: {
        //     left: 16,
        //     top: 16,
        //     text: data.year+'年'+data.month+'月'+'销售趋势',
        //     color:"#454545"
        // },
        legend: {
          data: ["数量", "金额"],
          top: 45
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "15%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          // splitNumber: 2,
          // scale: true,
          // show:false,
          splitLine: {
            //网格设置
            show: false
          },
          boundaryGap: false,
          // axisTick: { //设置刻度线显示
          //     show: false
          // },
          axisLine: {
            //设置x，y轴的线
            lineStyle: {
              color: "#454545"
              // width:0
            }
          },
          axisPointer: {
            //设置坐标轴指示线
            // show: false
            lineStyle: {
              width: 0
            }
          },
          data: that.dataMessage.abscissa
        },
        yAxis: {
          type: "value",
          // boundaryGap: [0, '100%'],
          axisLine: {
            lineStyle: {
              color: "#999999"
              // width:0,//这里是为了突出显示加上的
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
          // data : data.salesVolume,
        },
        series: [
          {
            name: "数量",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              normal: {
                color: "#3baaff"
                // labelLine : {
                //     show : false
                // }
              }
            },
            areaStyle: {
              normal: {
                color: "#70baf4"
              }
            },
            data: that.dataMessage.salesVolume
          },
          {
            name: "金额",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              normal: {
                color: "#ff9626"
                // labelLine : {
                //     show : false
                // }
              }
            },
            areaStyle: {
              normal: {
                color: "#ff9626"
              }
            },
            data: that.dataMessage.sales
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="stylus" scoped>
#shopProfile
  .el-header
    margin-left 1px
    .el-breadcrumb
      line-height 60px
  .el-main
    padding 10px
    .salestrend
      background-color #ffffff
      min-height 735px
    .salestrend-content
      padding 10px
      .top-header
        height 120px
        background #f8f8f8
        padding 20px
        color #333333
        font-size 14px
        .btn
          margin-left 80px
          margin-top 20px
          button
            width 50px
            height 30px
            line-height 0
            padding 0
            font-size 14px
        .demonstration
          margin-left 30px
      .date-txt
        height 40px
        line-height 40px
        padding-left 20px
        margin-top 20px
        background-color #f8f8f8
        color #333333
        font-size 14px
        font-weight bold
      .sales
        height 300px
        background #f8f8f8
        display flex
        align-items center
        .item
          width 33.3333%
          display flex
          align-items center
          justify-content center
          .item-detail
            text-align center
            font-size 20px
            color #333333
            .num
              font-size 30px
            .yellow
              color #ff9626
            .red
              color #ff000b
            .green
              color #32e09c
    .mainBody
      width 100%
      margin-right 0px
      padding 20px 10px 0 10px
      min-height 750px
      .shopProfileInfo
        height 60px
        margin-left 10px
        padding-left 80px
        background-size 60px auto
        background-position center left
        position relative
        .shopProfileInfoImg
          width 60px
          height 60px
          display inline-block
          position absolute
          top 0
          left 0
          img
            width 60px
            height 60px
        .shopProfileText
          margin-top -6px
          .fontWeight
            vertical-align middle
          .colorFFF
            background-color #67c23a
            padding 0 10px
            border-radius 4px
            vertical-align middle
          .shopProfileInfoState
            margin-top 20px
            .smallLabel
              padding-right 30px
      .shopProfileYesterday
        background-color #f8f8f8
        height 100px
        margin-top 50px
        .el-row
          padding 26px 40px 0 40px
      .filterDate
        background-color #f8f8f8
        margin-top 50px
        padding 20px
        .filterDateButton
          padding-left 70px
          margin-top 20px
      .charts
        width 100%
        margin-top 20px
</style>

