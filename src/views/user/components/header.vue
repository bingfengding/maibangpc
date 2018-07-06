<template>
    <el-row class="top-header" type="flex" justify="space-between">
        <el-col :span="8">
            <span class="font20 fontWeight">
                <i class="bgImg"></i>
                汽配帮手 |
            </span>
            <span class="font18 color-6">个人账号设置</span>
        </el-col>
        <el-col :span="8">
            <el-row type="flex" justify="end">
                <span class="font14">
                    {{$store.state.usersModule.currentUser.userName}}
                </span>
                <span  class="pointer font14 color-theme mleft-20" @click="chooseShop">选择店铺</span>
                <span  class="pointer font14 color-theme mleft-20" @click="logout">退出</span>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        methods:{
            chooseShop() {
                this.$router.push({path:"/chooseShop"})
            },
            logout() {
                this.$confirm('确定要退出登录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning',
                    center: true
                }).then(() => {
                    localStorage.clear()
                    this.$router.push({path:"/login"})
                }).catch(() => {
                });
            }
        }
    }
</script>
<style lang="stylus" scoped>
.top-header
    min-width 900px
    line-height 70px
    padding 0 5px
    span
        vertical-align middle
    i
        display inline-block
        width 30px
        height 30px
        vertical-align middle
        background-image url('../../../assets/icon.png')
</style>
