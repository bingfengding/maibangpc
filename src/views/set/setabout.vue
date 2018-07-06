<template>
  <el-container id="setabout">
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
          关于我们
        </el-breadcrumb-item>        
      </el-breadcrumb>
    </el-header>
    <!--主要区域-->
    <el-main class="main">
        <div class="main-content">
            <p>公司简介</p>
            <div class="company-profile">
                <p>广州迈邦科技有限公司互联网研发和技术服务，特为汽车配件生意人研发出
【汽配帮手APP】，帮助 汽配生意人开创： 网上商城、网上推广、网上销售、
管理配件、管理客户、管理员工等，实现线上网 络和线下实体相结合，让汽
配生意享受互联网带来的便捷与收获。</p>        
            </div>
            <div class="link">
                <p class="weixin">微信公众号：<span class="color-1491f2" @click="getFeedBack">迈邦服务</span></p>
                <p>汽配帮手官网：<a href="http://www.ymaibang.com" target="_blank" class="color-1491f2">www.ymaibang.com</a></p>
            </div>
        </div>
        <!-- 关注弹窗 -->
    <div class="invoice-model" v-if="getFeedback" @click="colsegetFeedback(1)">
        <div class="invoice-content" @click.stop="colsegetFeedback(2)">
            <div class="text-1"><p>公众号【迈邦服务】</p><img src="../../images/orderImg/close-icon.png" width="12" @click="colsegetFeedback(3)"></div>             
            <div class="cont-text">请进入”<span class="color-#45c01a">微信-》扫一扫</span>“，关注我们</div>
            <div class="cont-img"><img src="../../images/setImg/img.png" width="220" height="150"><img src="../../images/setImg/gz.png" width="220" ></div>
            <!-- <div class="cont-img"><img src="../../images/setImg/gz.png" width="220"></div> -->
        </div>
    </div>  
    </el-main>
  </el-container>
</template>
<script>
export default {
    data(){
      return{
           getFeedback: false,
      }
    },
    methods:{
        //获取问题反馈信息
        getFeedBack(){           
            this.getFeedback = true;
        },
        //关闭窗口
       colsegetFeedback(num){
        if(num==1||num==3){
            this.getFeedback = false;
        }
        else{
            return;
        }
        },
    },
    components:{

    },
    created(){

    },
}
</script>
<style scoped>
#setabout a{
    color: #1491f2;
}
/* 发票模态框 */
.invoice-model{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(127,127,127,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 专用发票 */
.invoice-content{
    width: 400px;
    height: 500px;
    background-color: #FFF;
    padding-left: 20px;
    overflow: auto;    
}
.invoice-content p{
    margin-bottom: 10px;
}
/* 普通发票 */
/* .ordinary-invoice-content{
    width: 350px;
    height: 150px;
    background-color: #FFF;
    padding-left: 20px;
    border-radius: 4px;    
    margin-bottom: 300px;
} */
.ordinary-invoice-content .text-2{
    border: none;
}
.text-1{
    color: #333;
    font-size: 16px;
    margin-top: 20px;
    position: relative;
    text-align: center;
}
.text-1 img{
    position: absolute;
    top: 5px;
    right: 20px;
    cursor: pointer;
}
.cont-text{
    text-align: center;
    margin-top: 30px;
}
.text-2{
    border-bottom: 1px solid #ccc;
    padding: 15px 0;
}
.text-2 p span{
    color: #999999;
}
.text-2 p .address{
    color: #333;
    float: left;
}
.cont-text span{
    color: #45c01a
}
.cont-img{
    margin-top: 30px;
    text-align: center;
}
</style>
<style lang="stylus" scoped>
#setabout
    .el-header
        margin-left 1px
        .el-breadcrumb
            line-height 60px
    .el-main 
        margin-top: 10px;
        margin-left: 10px;
        background-color: #FFF;
        height 100vh
        .main 
            font-size: 14px;            
        .company-profile
            width: 542px;
            margin-top: 18px;
        .link
            margin-top: 28px;
            .weixin
                margin-bottom: 28px;
                .color-1491f2
                    color: #1491f2;
                    cursor pointer
</style>