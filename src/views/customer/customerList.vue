<template>
    <div class="customerList">
        <div class="customerList_header">
          <span class="active_route">{{$route.name}}</span>
        </div>
       <div class="customer_content">
            <div class="customer_left">
              <div class="customerTab">
                <el-badge  class="item">
                    <span :class="{'tab': true,'active_span':type == '0'}" @click="change('0')">全部</span>
                </el-badge>
                <el-badge  class="item">
                    <span :class="{'tab': true,'active_span':type == '1'}"  @click="change('1')">已合作客户</span>
                </el-badge>
                <el-badge class="item">
                    <span :class="{'tab': true,'active_span':type == '2'}"  @click="change('2')">未合作客户</span>
                </el-badge>
              </div>
               <div class="searchBox" @keyup.enter="search">
                   <el-input
                      size="small"
                      placeholder="搜索您要找的客户"
                      v-model="searchData"
                      >
                      <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
                    </el-input>
                </div>
                <div class="notice_view">
                    <all-customer  :searchText="searchText" :customerType="type" :clientId="client_id"></all-customer>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import allCustomer from "./customerList/allCustomer";
export default {
  data() {
    return {
      searchText: null,
      page: 1,
      searchData: null,
      type: 0,
      client_id: null
    };
  },
  watch: {
    searchData(val){
        this.searchText = val
        if(this.$route.query.name){
         this.$route.query.name = val
        }
        if(!val){
          this.client_id = null
          this.$route.query.user_id = 'no'
        }
    }

  },
  components: {
    allCustomer,
  },
  methods:{
    search(){
       if(this.$route.query.name){
         this.searchData = this.$route.query.name
         this.searchText = this.$route.query.name
          this.client_id = this.$route.query.user_id
         return;
      }
        this.searchText = this.searchData
    },
    change(val){
       if(this.$route.query.name){
        //  this.searchText = this.$route.query.name
         this.searchData = this.$route.query.name
         this.searchText = this.$route.query.name
          this.client_id = this.$route.query.user_id
         this.type = val
         return;
      }
      // this.searchText = null
      // this.searchData = null
      this.type = val
    }
  },
  mounted(){
     if(this.$route.query.name){
        this.searchData = this.$route.query.name
         this.searchText = this.$route.query.name
         this.client_id = this.$route.query.user_id
      }
  }
};
</script>
<style scoped>
.active_route{
  font-size: 14px;
}
.customerList {
  min-height: 100%;
}
.customerList_header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: white;
  padding-left: 17px;
}
.customer_content {
  width: 100%;
  min-height: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.searchBox{
  position: absolute;
  top: 10px;
  right: 15px;
}
.customer_left {
  width: 100%;
  background: white;
  padding: 15px;
  position: relative;
  min-height: 600px;
  
}
.customer_left >>> .el-input--small .el-input__inner{
  background: #f8f8f8;
  width: 300px;
}
.tab {
  padding: 0;
  width: 100px;
  line-height: 30px;
  height: 30px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  color: #333333;
}
.active_span {
  color: white;
  background-color: #1491f2;
  border-radius: 5px;
}
</style>
