<template>
  <el-container id="order">  
    <el-container class="container">
      <transition name="el-fade-in" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {        
    };
  },
  watch: {},

  methods: {}
};
</script>
<style scoped>
.container{
  margin-left: 133px;
}
  /* .el-aside
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
        background-clip #1491f2 */
</style>
