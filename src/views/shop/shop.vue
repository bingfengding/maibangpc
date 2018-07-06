<template>
  <el-container id="shop">
    <el-container>
      <transition name="el-fade-in" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive> 
      </transition>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  watch: {},

  methods: {}
};
</script>
<style lang="stylus" scoped>
#shop
  >.el-container
    margin-left 134px
</style>
