<template>
    <el-container>
        <el-header class="bgFFF"><sideHeader></sideHeader></el-header>
        <el-main>
            <el-row id="changePhone" type="flex" justify="center">
                <el-col>
                    <!-- <topHeader></topHeader> -->
                    <el-row type="flex" justify="center" class="main-content">
                    <div class="content">
                        <div class="top-header">更改手机号</div>
                        <div class="box-item">
                            <span>手机号：</span>
                            <input type="text" placeholder="请输入手机号" :value="phone" v-if="isStart" disabled>
                            <input type="text" placeholder="请输入新手机号" v-model="newPhone" v-else>
                        </div>
                        <div class="box-item mtop-10">
                            <span>验证码：</span>
                            <input type="text" v-model="code" placeholder="请输入验证码" class="code-input">
                            <el-button :type="typeStatus" :disabled="isdisabled" @click="getCode">{{countdown}}</el-button>
                        </div>
                        <div class="tip">注意：更换手机号后需要用新的手机号重新登录</div>
                        <div class="btn">
                            <el-button type="primary" @click="verifyPhone" v-if="isStart">下一步</el-button>
                            <el-button type="primary" @click="setNewPhone" v-else>确认</el-button>
                        </div>
                    </div>
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
    // import header from './components/header.vue'
    import sideHeader from "@/views/asset/components/sideHeader.vue"
    import {usermobilenumber,sendCore,verifyoldphone,replacephone} from '@/api/user/user.js'
    export default {
        data () {
            return {
                phone:"",
                info:{},
                isStart:true,
                isdisabled:false,
                countdown:"获取验证码",
                typeStatus:"primary",
                code:"",
                newPhone:"",
                timer:"",
                staffId:""
            }
        },
        methods:{
            getUserPhone() {
                let that = this;
                usermobilenumber().then(res => {
                    if (res.data.code == 200) {
                        that.info = res.data.data;
                        that.phone = res.data.data.staff_phone.substr(0,3)+"****"+res.data.data.staff_phone.substr(-4)
                    }
                })
            },
            verifyPhone() {
                let that = this;
                if (!that.code) {
                    that.$message({
                        message: '请输入验证码',
                        type: 'warning'
                    })
                    return
                }
                verifyoldphone(that.code).then(res => {
                    console.log(res.data);
                    if (res.data.code == 200) {
                        that.isStart = false;
                        that.code = "";
                        that.isdisabled = false;
                        that.countdown = "获取验证码";
                        that.typeStatus = "primary";
                        clearInterval(that.timer);
                    } else {
                        // that.$message.error(res.data.error)
                        that.$message.error("验证失败");
                    }
                })
            },
            getCode() {
                let that = this;
                let data = {
                    phone:that.isStart?that.info.staff_phone:that.newPhone,
                    diff:that.isStart?"oldPhone":"newPhone"
                }
                sendCore(data).then(res => {
                    if (res.data.flag) {
                        that.$message({
                            message: '发送验证码成功',
                            type: 'success'
                        })
                        that.isdisabled = true;
                        that.countdown = "60 S";
                        that.typeStatus = "info";
                        let num = 59;
                        that.timer = setInterval(() => {
                            that.countdown = num-- + " S";
                            if (!num) {
                                clearInterval(that.timer);
                                that.countdown = "获取验证码";
                                that.isdisabled = false;
                                that.typeStatus = "primary";
                            }
                        }, 1000);
                    } else {
                        that.$message.error(res.data.error)
                    }
                    
                })
                
                
            },
            setNewPhone() {
                let that = this;
                if (!that.newPhone) {
                    that.$message({
                        message: '请输入新手机号码',
                        type: 'warning'
                    })
                }
                if (!that.code) {
                    that.$message({
                        message: '请输入验证码',
                        type: 'warning'
                    })
                }
                let data = {
                    tel:that.newPhone,
                    code:that.code,
                    id:that.staffId
                }
                replacephone(data).then(res =>{
                    if (res.data.code == 200) {
                        that.$message({
                            type:'success',
                            message:"更新手机号成功"
                        })
                        that.$router.back();
                    } else {
                        that.$message.error(res.data.error)
                    }
                    
                })
            }
        },
        mounted() {
            this.getUserPhone();
            this.staffId = this.$route.query.staffId;
        },
        components:{sideHeader}
    }
</script>
<style lang="stylus" scoped>
.el-main
    padding 10px
#changePhone
    background #fff
    height 100vh
    width 100%
    padding-top 20px
    >.el-col
        width 800px
        .main-content
            height 700px
            border 1px solid #cccccc
            .content
                width 388px
                height 388px
                margin-top 100px
                border 1px solid #cccccc
                border-radius 5px
                overflow hidden
                .top-header
                    line-height 40px
                    background-color #f8f8f8
                    color #333333
                    font-size 14px
                    padding-left 20px
                    border-bottom 1px solid #cccccc 
                    margin-bottom 50px
                .box-item
                    height 40px
                    background-color #f2f2f2
                    display flex
                    align-items center
                    padding-left 20px
                    position relative
                    input 
                        border 0
                        background-color #f2f2f2
                        height 35px
                        outline 0
                        width 60%
                    .code-input
                        width 50%
                    button
                        width 100px
                        height 30px
                        padding 0
                        position absolute
                        right 10px
                .tip    
                    color #ff0000
                    font-size 12px
                    padding-left 20px
                    margin-top 10px
                .btn
                    text-align center
                    margin-top 28px
                    button
                        height 30px
                        padding 0
                        width 90px
</style>
