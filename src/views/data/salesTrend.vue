<template>
  <div id="salesTrend">
    <el-container>
      <el-header class="bgFFF"><sideHeader></sideHeader></el-header>
      <el-main>
        <div class="salestrend">
          <div class="salestrend-content">
            <div class="top-header">
              <div>筛选年份：
                <el-date-picker
                  v-model="year"
                  type="year"
                  value-format="yyyy"
                  @change="selectYear"
                  placeholder="按年份筛选"
                  :picker-options="pickerOptions0">
                </el-date-picker>
                <span class="demonstration">筛选月份：</span>
                <el-date-picker
                  v-model="yearmonth"
                  type="month"
                  value-format="yyyy-MM"
                  @change="selectMonth"
                  placeholder="按月份筛选"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
              <div class="btn">
                <el-button type="primary" @click="getSalestrend">筛选</el-button>
              </div>
            </div>
            <div class="date-txt">
              {{dataMessage.year}}年<span v-if="dataMessage.month">{{dataMessage.month}}月</span>销售趋势
            </div>
            <div id="Trend" style="width:100%;height:700px;">

            </div>
            <div class="sales">
              <div class="item">
                <div class="item-detail" v-if="dataMessage.salesData">
                  <div class="num yellow">￥{{dataMessage.salesData.oneSales}}</div>
                  <div>当<span v-if="dataMessage.month">月</span><span v-else>年</span>销售总额</div>
                </div>
              </div>
              <div class="item" v-if="dataMessage.salesVolumeData">
                <div class="item-detail">
                  <div class="num blue">{{dataMessage.salesVolumeData.oneSalesVolume}}</div>
                  <div>当<span v-if="dataMessage.month">月</span><span v-else>年</span>销售数量</div>
                </div>
              </div>
              <div class="item" v-if="dataMessage.salesData">
                <div class="item-detail">
                  <div class="num green" v-if="dataMessage.salesData.core == 1">
                    <img src="@/images/data/goup.png" alt="">
                    <span>{{dataMessage.salesData.comparisonSales}}</span>
                  </div>
                  <div class="num red" v-else>
                    <img src="@/images/data/down.png" alt="">
                    <span>{{dataMessage.salesData.comparisonSales}}</span>
                  </div>
                  <div>对比上<span v-if="dataMessage.month">月</span><span v-else>年</span>金额</div>
                </div>
              </div>
              <div class="item" v-if="dataMessage.salesVolumeData">
                <div class="item-detail">
                  <div class="num green"  v-if="dataMessage.salesVolumeData.core == 1">
                    <img src="@/images/data/goup.png" alt="">
                    <span>{{dataMessage.salesVolumeData.comparisonSalesVolume}}</span>
                  </div>
                  <div class="num red"  v-else>
                    <img src="@/images/data/down.png" alt="">
                    <span>{{dataMessage.salesVolumeData.comparisonSalesVolume}}</span>
                  </div>
                  <div>对比上<span v-if="dataMessage.month">月</span><span v-else>年</span>销售</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  // 引入图例组件
  require('echarts/lib/component/legend')
  import sideHeader from "@/components/sideHeader/sideHeader.vue"
  import {salestrend} from "@/api/data/data.js"
  export default {
    data() {
      return {
        year:"",
        yearmonth:"",
        selectedYear:"",
        selectedMonth:"",
        dataMessage:{},
        pickerOptions0:{
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6;
          }
        },
        pickerOptions1:{
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6;
          }
        }
      }
    },
    methods:{
      getSalestrend(){
        let that = this;
        if (parseInt(this.selectedYear) < parseInt(that.dataMessage.year)) {
          if (!that.dataMessage.isMerchantOrderServic) {
            that.$message({
              type:"warning",
              message:"购买专业版才能查看往年销售趋势哟！"
            })
            return
          }
        }
        
        let param = {
          year:this.selectedYear,
          month:this.selectedMonth
        }
        salestrend(param).then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            that.dataMessage = res.data.data;
            that.drawLine()
          } else {
            that.$message.error(res.data.error)
          }
        })
        
      },
      selectYear(time) {
        this.selectedYear = time
        this.yearmonth = ""
        this.selectedMonth = ""
      },
      selectMonth(time) {
        let year = time.substr(0,4);
        let month = time.substr(5);
        this.selectedYear = year
        this.selectedMonth = month
        this.year = ""
      },
      drawLine() {
        let that = this;
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('Trend'))
        let option = {
            tooltip: {
                trigger: 'axis',
                textStyle:{    //图例文字的样式
                    // color:'#ff9626',
                    fontSize:12,
                },
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
                data:['数量','金额'],
                top:45,
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top:'25%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                // splitNumber: 2,
                // scale: true,
                // show:false,
                splitLine:{  //网格设置
            　　　　show:false
            　　},
                boundaryGap: false,
                // axisTick: { //设置刻度线显示
                //     show: false
                // },
                axisLine:{ //设置x，y轴的线
                    lineStyle:{
                        color:'#454545',
                        // width:0
                    }
                },
                axisPointer: {  //设置坐标轴指示线
                    // show: false
                    lineStyle:{
                        width:0
                    }
                },
                data: that.dataMessage.abscissa
            },
            yAxis: {
                type: 'value',
                // boundaryGap: [0, '100%'],
                axisLine:{
                    lineStyle:{
                        color:'#999999',
                        // width:0,//这里是为了突出显示加上的
                    }
                },
                splitLine:{
            　　　　show:false
            　　},
                axisTick: {
                    show: false
                },
                // data : data.salesVolume,
            },
            series: [
                {
                    name: '数量',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: '#3baaff',
                            // labelLine : {
                            //     show : false
                            // }
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: '#70baf4'
                        }
                    },
                    data: that.dataMessage.salesVolume
                },
                {
                    name: '金额',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: '#ff9626',
                            // labelLine : {
                            //     show : false
                            // }
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: '#ff9626'
                        }
                    },
                    data: that.dataMessage.sales
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    },
    created() {
      this.getSalestrend()
    },
    components:{sideHeader}
  }
</script>
<style lang="stylus" scoped>
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
            .blue
              color #1491f2
            .green
              color #32e09c
        
</style>
