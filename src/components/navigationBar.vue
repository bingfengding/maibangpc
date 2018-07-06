<template>
    <div class="bar" v-if="routes">
     <div class="bar_name">{{routes.name}}</div>
     <div class="bar_nav">
       
         <transition-group name="list" tag="ul">
         <router-link tag="li" :to="item.path" v-for="(item,index) in routes.children" :key="index" :class="{active: $route.name == item.name}">{{item.name}}</router-link>
         </transition-group>
      
     </div>
   </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      routes: null,
      hide: false
    };
  },
  mounted() {},
  watch: {
    $route(to, from) {
      this.$router.options.routes.forEach(val => {
        if (val.path == this.$route.matched[0].path) {
          this.routes = val;
          console.log(this.routes, "这是筛选的路由");
        }
      });
      var appmain = document.getElementById("app-main");
      if (to.path == "/home") {
        this.hide = true;
        appmain.style.marginLeft = "0";
      } else {
        this.hide = false;
        appmain.style.marginLeft = "133px";
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.bar
  text-align center
  width 133px
  height 100%
  font-size 16px
  background white
  position fixed
.bar_name
  height 60px
  line-height 60px
  border-right 1px solid #f2f2f2
  border-bottom 1px solid #f2f2f2
.bar_nav
  ul
    padding-top 15px
    li:not(:first-of-type)
      font-size 16px
      display block
      height 40px
      line-height 40px
      margin-bottom 15px
      width 100%
      cursor pointer
      &:hover
        background-color #f2f2f2
.active
  color #1491f2
.list-enter-active, .list-leave-active
  transition all 0.5s
.list-enter, .list-leave-to
  opacity 0
</style>
