<template>
  <div id="customer">
   <!-- <div class="customer_left">
     <div class="customer_name">{{routesData.name}}</div>
     <div class="customer_nav">
       <ul>
         <router-link tag="li" :to="item.path" v-for="(item,index) in routesData.children" :key="index" :class="{active: $route.name == item.name}">{{item.name}}</router-link>
       </ul>
     </div>
   </div> -->
   <div class="customer_right">
    
     <div class="customer_right_content">
     </div>
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routesData: null
    };
  },
  created() {
    this.routesData = this.$router.options.routes[6];
  }
};
</script>

<style scoped>
#customer {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.customer_left {
  text-align: center;
  width: 133px;
  height: 100%;
  font-size: 16px;
  background: white;
  position: fixed;
}
.customer_name {
  height: 60px;
  line-height: 60px;
  border-right: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
}
.customer_nav {
  font-size: 0;
}
.customer_nav li {
  font-size: 16px;
  display: block;
  margin: 20px 0;
  width: 100%;
  cursor: pointer;
}
.active {
  color: #1491f2;
}
/* 右侧 */
.customer_right {
  width: 100%;
  margin-left: 133px;
}
.customer_right_header {
  height: 60px;
  line-height: 60px;
  position: fixed;
  background: white;
  width: 100%;
}
.active_route {
  font-size: 14px;
  margin-left: 17px;
}
.customer_right_content {
  height: 100%;
  margin-top: 60px;
}
</style>

