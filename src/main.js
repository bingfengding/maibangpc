import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import VueAxios from "vue-axios";
import Qs from "qs";
import store from "./store";
import "style/reset.css";
import "element-ui/lib/theme-chalk/display.css";
import Share from 'vue-social-share'  
Vue.use(Share)  
Vue.config.productionTip = false;

Vue.use(ElementUI);
router.beforeEach((to, from, next) => {
  console.log(to.path,'进入')
  console.log(from.path,'离开')
  // if (from.path === "/order/orddetail" && to.path != "/order/profile") {
  //   if (localStorage.getItem("invoiceType")) {
  //       localStorage.removeItem("invoiceType")
  //   }
  //   alert('离开了')
  // }  
  if(to.path=='/order/orddetail'&&from.path=='/order/profile'){

  }
  else if(to.path=='/order/profile'&&from.path=='/order/orddetail'){

  }
  else if(to.path=='/order/profile'&&from.path=='/'){

  }
  else{
      if(localStorage.getItem('page')){
        localStorage.removeItem('page');
      }      
      if(localStorage.getItem('order')){
        localStorage.removeItem('order');
      }
  }
  if(to.path=='/order/reddetail'&&from.path=='/order/refund'){

  }
  else if(to.path=='/order/refund'&&from.path=='/order/reddetail'){

  }
  else if(to.path=='/order/refund'&&from.path=='/'){

  }
  else{
      if(localStorage.getItem('refunsPage')){
        localStorage.removeItem('refunsPage');
      }      
      if(localStorage.getItem('refund')){
        localStorage.removeItem('refund');
      }
  }
  if(from.path=='/set/setdiscountgoods'&&to.path=='/set/browseTheGoods') {                           
  }  
  else if(from.path=='/set/browseTheGoods'&&to.path=='/set/setdiscountgoods'){    
  } 
  else{
      if(localStorage.getItem('startTime')){
        localStorage.removeItem('startTime');
      }
      if(localStorage.getItem('radio2')){
        localStorage.removeItem('radio2');
      }
      if(localStorage.getItem('percentage')){
        localStorage.removeItem('percentage');
      }
      if(localStorage.getItem('price')){
        localStorage.removeItem('price');
      }
      if(localStorage.getItem('endTime')){
        localStorage.removeItem('endTime');
      }  
      if(localStorage.getItem('toprice')){
        localStorage.removeItem('toprice');
      }          
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
