<template>
    <el-container>
        <el-header class="bgFFF">
            <el-breadcrumb>
            <el-breadcrumb-item>
                {{navName}}
            </el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <div class="accontList">
                <div class="accountList-content">
                    <div class="top-header">
                        我的银行卡
                    </div>
                    <div class="list-content">
                        <ul>
                            <li v-for="(item,index) in accountList" :key="index">
                                <img :src="item.banks.img" alt="" v-if="item.account_type == 1">
                                <img :src="item.banks.corporate_img" alt="" v-else>
                                <span class="num">{{item.bank_num}}</span>
                                <span class="delet-btn pointer" @click="deletAccount(item.id)">删除</span>
                            </li>
                            <li @click="addAccount" class="pointer" v-if="accountList.length < 5">
                                <img src="@/images/asset/addccount.png" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>
<script>
    import {accountList,deleteAccount,certificationData} from "@/api/asset/asset.js"
    export default {
        data() {
            return {
                navName:"提现账户管理",
                accountList:[],
                cerData:{}
            }
        },
        methods:{
            addAccount() {
                if (this.cerData.is_creator) {
                    if (!this.cerData.cerInfo) {
                         this.$message('请先到店铺管理进行主体认证')
                         return
                    }
                    if (this.cerData.cerInfo.status == 2) {
                        this.$router.push({path:"/asset/addAccount"})
                    } else {
                        if (this.cerData.cerInfo.cer_type == 1) {
                            if (this.status == 1) {
                                this.$message('个人认证正在审核中暂时不能添加提现账户，请耐心等待')
                            } else {
                                this.$message('个人认证未通过，请前往再次提交认证')
                            }
                        } else {
                            if (this.cerData.cerInfo.status == 1) {
                                this.$message('企业认证正在审核中暂时不能添加提现账户，请耐心等待')
                            } else {
                                this.$message('企业认证未通过，请前往再次提交认证')
                            }
                        }
                        
                        return
                    }
                } else {
                    if (!this.cerData.cerInfo) {
                         this.$message('请先到账号设置即个人中心进行实名认证')
                         return
                    }
                    if (this.cerData.cerInfo.status == 2) {
                        this.$router.push({path:"/asset/addAccount"})
                    } else {
                        if (this.cerData.cerInfo.status == 1) {
                            this.$message('实名认证正在审核中暂时不能添加提现账户，请耐心等待')
                        } else {
                            this.$message('实名认证审核失败，请前往再次认证')
                        }
                        return
                    }
                }
                
            },
            getAccountList() {
                let that = this;
                accountList().then(res => {
                    console.log(res.data);
                    that.accountList = res.data.data;
                    that.accountList.map(function(a) {
                        a.bank_num = that.formatBankNumber(a.bank_num)
                    })
                })
            },
            formatBankNumber(bankNumber){
                return bankNumber.substr(0,4)+"********"+bankNumber.substr(-6);
            },
            deletAccount(id) {
                let that = this;
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteAccount(id).then(res => {
                        console.log(res.data);   
                        if (res.data.flag) {
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            that.getAccountList()
                        } else {
                            that.$message.error(res.data.error);
                        }            
                    })
                }).catch(() => {

                });
                
            },
            getCertificationData() {
                let that = this;
                certificationData().then(res => {
                    console.log(res.data);
                    if (res.data.code == 200) {
                        that.cerData = res.data.data;
                    }
                })
            }
        },
        mounted() {
            this.getAccountList();
            this.getCertificationData();
        },
        components:{}
    }
</script>
<style scoped lang="stylus">
.el-header
  margin-left 1px
  .el-breadcrumb
    line-height 60px
.el-main
  padding 10px
  .accontList
    background-color #fff
    padding 10px
    min-height 735px
    .accountList-content
        border 1px solid #cccccc
    .top-header
        line-height 40px
        background-color #f8f8f8
        padding-left 20px
        color #333333
        font-size 14px
        border-bottom 1px solid #cccccc
    .list-content
        min-height 540px
        padding 10px
        ul
            display flex
            flex-wrap wrap
            li
                height 150px
                width 300px
                position relative
                background-color #eeeeee
                margin-right 50px
                margin-bottom 30px
                border-radius 5px
                img 
                    width 100%
                .num
                    position absolute
                    left 10px
                    bottom 30px
                    color #ffffff
                    font-size 20px
                .delet-btn 
                    display none
                    color #fff
                    font-size 16px
                    position absolute
                    bottom 10px
                    right 10px
            li:hover
                .delet-btn
                    display block
</style>
