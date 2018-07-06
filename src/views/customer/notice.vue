<template>
    <div class="notice">
        <div class="notice_header">
          <span class="active_route">{{$route.name}}</span>
        </div>
        <div class="notice_content">
        <div class="notice_left">
            
            <!-- <el-tabs v-model="activeName">
                <el-tab-pane label="订单" name="first">
                    <order v-if="'first' == activeName"></order>
                </el-tab-pane>
                <el-tab-pane label="通知" name="second">
                  <order v-if="'first' == activeName"></order>
                </el-tab-pane>
                <el-tab-pane label="互动" name="third">
                    <order v-if="'first' == activeName"></order>
                </el-tab-pane>
            </el-tabs> -->
            <el-badge  class="item">
                <span :class="{'tab': true,'active_span':activeName == 'order'}" @click="activeName = 'order'">订单</span>
            </el-badge>
            <el-badge class="item">
                <span :class="{'tab': true,'active_span':activeName == 'notice'}"  @click="activeName = 'notice'">通知</span>
            </el-badge>
            <el-badge  class="item">
                <span :class="{'tab': true,'active_span':activeName == 'interaction'}"  @click="activeName = 'interaction'">互动</span>
            </el-badge>
            <div class="notice_view">
                 <order v-if="'order' == activeName"></order>
                  <notice v-if="'notice' == activeName"></notice>
                   <interaction v-if="'interaction' == activeName"></interaction>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import interaction from "./notice/interaction"
import notice from "./notice/notice"
import order from "./notice/order"
export default {
    data(){
        return{
            activeName: 'order'
        }
    },
    watch:{
        activeName(val){
            console.log(val)
        }
    },
    components:{
        interaction,
        notice,
        order
    }
}
</script>

<style scoped>
.active_route{
    font-size: 14px;
}
 .notice{
    min-height: 100%;
    width: 100%
 }
 .notice_header{
     width:100%;
     height: 60px;
     line-height: 60px;
     background: white;
     padding-left: 17px;
 }
 .notice_content{
    width: 100%;
     min-height: 100%;
     padding: 10px 10px 0 10px;
 }
 .notice_left{
    background: white;
    min-height: 600px;
    padding: 20px;
    font-size: 0
 }
 .notice_header ul li{
     display: inline-block;
    width: 60px;
	height: 30px;
	border-radius: 5px;
    line-height: 30px;
    text-align: center;
 }
  .notice >>> .el-tabs__item.is-active{
     color: white;
    background-color: #1491f2;
	border-radius: 5px;
 }
  .notice >>>  .el-tabs__nav-wrap::after{
      height: 0;
  }
    .notice >>> .el-tabs__active-bar{
        height: 0;
    }
  .notice >>>   .el-tabs__item{
      padding: 0;
      width: 60px;
      line-height: 30px;
      height: 30px;
      text-align: center;
  }
  .tab{
      width: 60px;
	height: 30px;
	border-radius: 5px;
    display: inline-block;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
  .active_span{
	background-color: #1491f2;
    color: #ffffff;
  }
  .notice_view{
      margin-top: 10px;
      width: 100%;
      height: 100%;
  }
 .notice >>>  .el-badge__content.is-fixed {
 right: 20px;
 z-index: 100;
 border: 0px;
}
</style>
