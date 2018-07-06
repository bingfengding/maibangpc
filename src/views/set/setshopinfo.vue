<template>
  <el-container id="setshopinfo">
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
          折扣商品设置
        </el-breadcrumb-item>        
      </el-breadcrumb>
    </el-header>
    <el-main>        
      <div class="order-exhibition">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="未开始" name="first"><notBeginning v-if="activeName == 'first'"></notBeginning></el-tab-pane>                      
          <el-tab-pane label="进行中" name="second"><conducting  v-if="activeName == 'second'"></conducting></el-tab-pane>
        </el-tabs>
        <!-- <el-button type="prinary" size="mini" class="addgoods">添加商品</el-button>        
        <el-button type="prinary" size="mini" class="recovery">恢复原价</el-button> -->
      </div>     
    </el-main>
  </el-container>
</template>

<script>
import notBeginning from '@/views/set/assemblys/discount/notBeginning'//未进行
import conducting from '@/views/set/assemblys/discount/conducting'//进行中
export default {
    data(){
      return{        
        active: 'phone', 
        currentTab: "phone",  
        //默认第一的组件
        activeName: 'first',
      }
    },
    methods:{    
       handleClick(tab, event) {
        console.log(tab.index);
        localStorage.setItem('active',this.activeName)        
      },             
      getData(){
        // localStorage.setItem('active',this.activeName)  
        if(localStorage.getItem('active')){
          this.activeName = localStorage.getItem('active');
        }              
      }
    },
    components:{   
      notBeginning, conducting  
    },
    created(){
        this.getData();        
    }
}
</script>
<style scoped>
#setshopinfo >>> .el-tabs__header{
  margin: 0;
}
#setshopinfo >>> .el-table th{
  background-color: #f2f2f2;
}
#setshopinfo >>> .el-badge__content{
  border: none;
}
#setshopinfo >>> .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: none;
}
#setshopinfo >>> .el-tabs--card>.el-tabs__header .el-tabs__item{
    border: none;    
}
#setshopinfo >>> .el-tabs__item{
    width: 100px;
    text-align: center;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
} 
#setshopinfo >>> .el-tabs__item.is-active{
  background-color: #1491f2;
  color: #FFF;
}
#setshopinfo >>> .el-tabs--card>.el-tabs__header{
  border: none;
}
.order-exhibition{
  position: relative;
}
</style>
<style lang="stylus" scoped>
#setshopinfo
    .el-header
        margin-left 1px
    .el-breadcrumb
        line-height 60px
    .el-main        
        height: 100vh;
        margin-left: 10px;
        margin-top: 10px;
        background-color: #FFF;                        
</style>