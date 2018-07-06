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
            <div class="addAccount">
                <div class="addAccount-content">
                    <div class="top-header">
                        添加提现账户
                    </div>
                    <div class="content">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="店铺名称:">
                                <span>{{shopName}}</span>
                            </el-form-item>
                            <el-form-item label="账户类型:">
                                <el-button size="small" :class="personal?'active':''" @click="setAccountType(1)">个人账户</el-button>
                                <el-button size="small" :class="personal?'':'active'" @click="setAccountType(2)">公司账户</el-button>
                            </el-form-item>
                            <el-form-item label="账户:">
                                <el-input v-model="form.name" placeholder="请输入账户名称"></el-input>
                            </el-form-item>
                            <el-form-item label="卡号:">
                                <el-input type="number" v-model="form.num" placeholder="请输入卡号"></el-input>
                            </el-form-item>
                            <el-form-item label="银行">
                                <el-select v-model="form.region" placeholder="请选择银行卡">
                                <el-option :label="item.bank_name" :value="item.id" v-for="(item,index) in bankList" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" size="medium">添加</el-button>
                            </el-form-item>
                            </el-form>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>
<script>
    import sideHeader from "../components/sideHeader.vue"
    import {getShopName,BankList,addbandCard} from "@/api/asset/asset.js"
    export default{
        data() {
            return {
                navName:"提现账户管理",
                form:{},
                personal:true,
                shopName:"",
                bankList:[]
            }
        },
        methods:{
            setAccountType(type) {
                if (type == 1) {
                    this.personal = true
                } else {
                    this.personal = false
                }
            },
            getMerchantShopName() {
                let that = this;
                getShopName().then(res => {
                    console.log(res.data);
                    if (res.data.code == 200) {
                        that.shopName = res.data.data.shop_name
                    }
                })
            },
            getBankList() {
                let that = this;
                BankList().then(res => {
                    console.log(res); 
                    if (res.data.code == 200) {
                        that.bankList = res.data.data
                    } else {
                        that.$message.error(res.data.error);
                    }                    
                })
            },
            onSubmit() {
                let that = this;
                
                if (!this.form.name) {
                    this.$message('请输入账户名称');
                    return
                }
                if (!this.form.num) {
                    this.$message('请输入卡号');
                    return
                }
                if (!this.form.region) {
                    this.$message('请选择银行');
                    return
                }
                console.log(this.form);
                
                let data = {
                    "bank_id": this.form.region,    // 银行品牌ID
                    "bank_num": this.form.num,    // 银行卡号
                    "account_name": this.form.name,    // 账户名称
                    "account_type": this.personal?1:2   // 账户类型（1：个人账户，2：公账）
                }
                addbandCard(data).then(res => {
                    console.log(res.data);
                    if (res.data.code == 200) {
                        that.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        that.$router.back();
                    } else {
                        that.$message.error(res.data.error)
                    }
                })
                
            }
        },
        mounted() {
            this.getMerchantShopName();
            this.getBankList();
        },
        components:{sideHeader}
    }
</script>
<style lang="stylus" scoped>
.el-header
  margin-left 1px
  .el-breadcrumb
    line-height 60px
.el-main
  padding 10px
.addAccount
    background-color #fff
    padding 10px
    min-height 735px
    .addAccount-content
        border 1px solid #cccccc
        .top-header
            line-height 40px
            background-color #f8f8f8
            padding-left 20px
            color #333333
            font-size 14px
            border-bottom 1px solid #cccccc
        .content
            margin-left 100px
            margin-top 20px
            .item
                margin-bottom 25px
            .el-input
                width 280px
            .active
                border 1px solid #ff0000
                background-color #fff9f1
                color #333333
</style>
