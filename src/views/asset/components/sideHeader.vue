<template>
  <div>
   <el-breadcrumb>
      <el-breadcrumb-item>
        {{navName}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navName:""
    }
  },
  created() {
    this.navName = this.$route.name;
  }
}
</script>

<style lang="stylus" scoped>
.el-header
  margin-left 1px
  .el-breadcrumb
    line-height 60px
</style>
