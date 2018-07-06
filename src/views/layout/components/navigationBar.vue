<template>
    <div class="bar" v-if="routes">
     <div class="bar_name">{{routes.name}}</div>
     <div class="bar_nav wrapper" ref="wrapper">
       <ul v-if="isCreater" class="content">
         <router-link tag="li" :to="item.path" v-for="(item,index) in routes.children" :key="index" :class="{active: route.name == item.name}" v-if="item.name">{{item.name}}</router-link>
       </ul>
       <ul v-else class="content">
         <router-link tag="li" :to="item.path" v-for="(item,index) in routes.children" :key="index" :class="{active: route.name == item.name}" v-if="item.name && !item.noCache">{{item.name}}</router-link>
       </ul>
     </div>
   </div>
</template>

<script>
import { mapGetters } from "vuex";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      name: null,
      routes: null,
      hide: false,
      route: null,
      judgeRoute: [
        {
          //特殊的路由
          path: "/customer/consumption",
          name: "客户列表"
        },
        {
          path: "/customer/exclusive",
          name: "客户列表"
        },
        {
          path: "/shop/shopSectorMember",
          name: "店铺成员"
        },
        {
          path: "/order/orddetail",
          name: "全部订单"
        },
        {
          path: "/order/reddetail",
          name: "退款订单"
        },
        {
          path: "/set/setdiscountgoods",
          name: "折扣设置"
        },
        {
          path: "/set/setModifyPwd",
          name: "修改密码"
        },
        {
          path: "/set/browseTheGoods",
          name: "折扣设置"
        }
      ]
    };
  },
  methods: {
    setNavBarItem() {
      this.route = this.$route;
      for (let i = 0; i < this.judgeRoute.length; i++) {
        //特殊的路由处理
        if (this.$route.path == this.judgeRoute[i].path) {
          let route = Object.assign({}, this.$route);
          route.name = this.judgeRoute[i].name;
          this.route = route;
        }
      }
      this.$router.options.routes.forEach(val => {
        if (val.path == this.$route.matched[0].path) {
          this.routes = val;
        }
      });
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.wrapper, {});
      // let wrapper = document.querySelector('.wrapper')
      // console.log(wrapper);

      // let scroll = new BScroll(wrapper)
      // console.log(scroll);
    }
  },
  computed: {
    ...mapGetters(["isCreater"])
  },
  mounted() {
    this.$nextTick(() => {
      // this.scroll = new Bscroll(this.$refs.wrapper, {})
    });
  },
  created() {
    this.setNavBarItem();
  },
  watch: {
    $route(to, from) {
      this.setNavBarItem();
      // this.route = this.$route;
      // for (let i = 0; i < this.judgeRoute.length; i++) {
      //   //特殊的路由处理
      //   if (this.$route.path == this.judgeRoute[i].path) {
      //     let route = Object.assign({}, this.$route);
      //     route.name = this.judgeRoute[i].name;
      //     this.route = route;
      //   }
      // }

      // this.$router.options.routes.forEach(val => {
      //   if (val.path == this.$route.matched[0].path) {
      //     this.routes = val;
      //     console.log(val)
      //   }
      // });
    }
  }
};
</script>
<style scoped lang="stylus" scoped>
.bar
  text-align center
  width 133px
  height 100%
  font-size 16px
  background white
  position fixed
  z-index 40
.bar_name
  height 60px
  line-height 60px
  border-right 1px solid #f2f2f2
  border-bottom 1px solid #f2f2f2
.bar_nav
  position relative
  overflow hidden
  width 133px
  height 80vh
  padding-bottom 60px
  ul
    // position: absolute;
    // left: -20px;
    // right:-20px;
    // overflow-x: hidden;
    // overflow-y: scroll;
    padding-top 15px
    li
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
</style>
