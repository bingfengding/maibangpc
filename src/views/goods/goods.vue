<template>
    <el-container id="goods">        
        <el-container class="commodity">
            <transition name="el-fade-in" mode="out-in">
                <router-view></router-view>
            </transition>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data () {
      return {
        routerItems: [
            {
            index: "/goods/admin",
            text: "商品管理",
            key: "1"
            },
            {
            index: "/goods/classificationManagement",
            text: "分类管理",
            key: "2"
            },
            {
            index: "/goods/freightManagement",
            text: "运费管理",
            key: "3"
            },
        ]
      };
    },

    components: {},

    create(){},

    methods:{},
}

</script>
<style lang="stylus" scoped>
#goods
  .el-aside
    height 100vh
    >p
      height 61px
      border-bottom 1px solid #f2f2f2
      line-height 60px
    .el-menu
      padding-top 10px
      border 0
      .el-menu-item
        height 40px
        line-height 40px
        margin-bottom 15px
      .el-menu-item:focus, .el-menu-item:hover
        background-color #f2f2f2
      .el-menu-item.is-active
        background-clip #1491f2
</style>

<style scoped>
.commodity{
        margin-left: 133px;
    }
</style>
