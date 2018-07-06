<template>
    <div class="app-useinghelp">
        <div class="service-box-content bg-f8">
            <div class="item">一对一客服经理：{{serviceMessagae.nickname || "汽配帮手-野果"}}</div>
            <div class="item">电话：{{serviceMessagae.phone || "15099994364"}}</div>
            <el-button  icon="el-icon-service" @click="onlineService">在线咨询</el-button>
        </div>
        <div class="app-box-content bg-f8">
            <el-popover
                placement="left"
                width="260"
                trigger="hover">
                <div class="app-qrcode">
                    <div class="tip-text">
                        <p>扫码下载</p>
                        <p>汽配帮手APP</p>
                    </div>
                    <img src="@/images/common/appqrcode.png" alt="" class="qrcode">
                </div>
                <div slot="reference" class="content">
                    <i class="el-icon-mobile-phone"></i>
                    <div>
                        <div>汽配帮手APP</div>
                        <div class="font-14">用手机随时随地管理客户</div>
                    </div>
                </div>
            </el-popover>
        </div>
        <div class="hot-topics-content">
            <div class="top-header">
                <h3>热点问题</h3><el-button type="text" @click="goProblemDetail">更多</el-button>
            </div>
            <div class="content">
                <ul>
                    <li v-for="(item, index) in problem" :key="index" @click="goProblemDetail(item.id)">{{item.name}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import {getHelphome,customerServiceName} from "@/api/help/help.js"
    export default{
        data() {
            return {
                problem:{},
                serviceMessagae:{}
            }
        },
        methods:{
            getHotProblem() {
                let that = this;
                getHelphome().then(res => {
                    console.log(res.data);
                    
                    if (res.data.code == 200) {
                        that.problem = res.data.data;
                    } else {
                        that.$message.error(res.data.error)
                    }
                })
            },
            goProblemDetail(id) {
                const {href} = this.$router.resolve({
                        path: '/userhelpHome',
                        query: {
                            id:id
                        }
                    })
                window.open(href, '_blank')
            },
            getCustomerService() {
                let that = this;
                customerServiceName().then(res => {
                    console.log(res.data);
                    if (res.data.code == 200) {
                        that.serviceMessagae = res.data.data;
                    } else {
                        that.$message.error(res.data.error)
                    }
                    
                })
            },
            onlineService() {
                let qq;
                if (this.serviceMessagae.qq) {
                    qq = this.serviceMessagae.qq;
                } else {
                    qq = 1667684799;
                }
                location.href="tencent://message/?uin="+this.serviceMessagae.qq+"&Site=Sambow&Menu=yes"
            }
        },
        mounted() {
            this.getHotProblem();
            this.getCustomerService();
        }
    }
</script>
<style scoped>
    .app-useinghelp{
        width: 290px;
        background: white;
        border-left: 1px solid #cccccc;
        /* min-height: 1080px; */
        height: 100vh;
        padding:60px 25px;
    }
    .bg-f8{
        background-color: #f8f8f8;
    }
    .service-box-content{
        padding: 10px 30px;
        text-align: center;
        font-size: 14px;
    }
    .service-box-content .item {
        margin-bottom: 10px;
    }
    .service-box-content button {
        width: 180px;
        height: 24px;
        padding: 0;
    }
    .app-box-content{
        padding: 20px 0 20px 30px;
        font-size: 18px;
        margin-top: 32px;
    }
    .app-box-content .content {
        display: flex;
        align-items: center;
    }
    .app-box-content .el-icon-mobile-phone {
        font-size: 28px;
        margin-right: 15px;
    }
    .font-14 {
        font-size: 14px;
    }
    .app-qrcode{
        display: flex;
        padding: 15px 20px;
        justify-content: space-between;
        font-size: 14px;
        color: #666666;
    }
    .app-qrcode .tip-text p{
        margin-bottom: 15px;
    }
    .app-qrcode img{
        height: 90px;
        width: 90px;
        background: #666666;
    }
    .hot-topics-content .top-header{
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-top: 30px;
    }
    .hot-topics-content .top-header h3{
        margin-right: 8px;
    }
    .hot-topics-content .content ul li{
        margin-top: 20px;
        color: #333333;
        font-size: 14px;
        cursor: pointer;
    }
</style>
