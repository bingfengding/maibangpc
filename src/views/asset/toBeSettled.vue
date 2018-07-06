<template>
  <div id="assetme">
    <el-container>

      <!-- <el-main>
        我的金库
      </el-main> -->
      <el-header class="bgFFF"><sideHeader></sideHeader></el-header>
      <el-main>
        <div class="tobesettled">
          <div class="content">
            <div class="top-header">
              <div class="header-content">
                <div class="price">{{unbalanceSum}}</div>
                <div>待结算总额</div>
              </div>
            </div>
            <div class="ul-content">
              <ul>
                <li v-for="(item,index) in list" :key="index">
                  <router-link :to="{path:'/order/orddetail?id='+item.id+''}">
                    <div class="box-flex">
                      <span>{{item.nickname}}</span>
                      <span>{{item.payment_amount}}</span>
                    </div>
                    <div class="date">{{item.pay_time}}</div>
                  </router-link>
                </li>
              </ul>
              <div class="no-data" v-if="list.length == 0">
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
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import sideHeader from "./components/sideHeader.vue"
  import {unbalanceList} from "@/api/asset/asset.js"
  export default {
    data() {
      return {
        currentPage:1,
        list:[],
        unbalanceSum:0.00,
        recordSum:0
      }
    },
    methods:{
      getunbalanceList() {
        let that = this;
        unbalanceList(this.currentPage).then(res=>{
          console.log(res.data);
          if (res.data.flag) {
            that.list = res.data.data;
            that.recordSum = res.data.recordSum;
            that.unbalanceSum =  res.data.unbalanceSum;
          } else {
            that.list = [];
          }
        })
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getunbalanceList();
      }
    },
    created() {
      this.getunbalanceList()
    },
    components:{sideHeader}
  }
</script>

<style lang="stylus" scoped>
.el-main
  padding 10px
  .tobesettled
    padding 10px
    background-color #fff
    min-height 735px
    .content
      width 600px
      position relative
      .top-header
        height 120px
        width 100%
        background-color #1491f2
        display flex
        align-items center
        justify-content center
        .header-content
          text-align center
          color #fff
          font-size 14px
          .price
            font-size 30px
      .ul-content
        ul
          li
            padding 10px 20px
            background-color #f8f8f8
            margin-bottom 10px
            .box-flex
              display flex
              justify-content space-between
              margin-bottom 16px
              color #333333
              font-size 14px
            .date
              color #999999
              font-size 14px
            a
              display block
      .block 
        display flex
        justify-content center
        align-items center
        .demonstration
          font-size 12px
          color #333333
          position absolute
          right 0
      .no-data 
        line-height 88px
        text-align center
      
</style>
