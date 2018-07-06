<template>
    <el-container class="goodsadmin">
        <el-header class="bgFFF">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    商品管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        
        <el-main>
            <div class="table-header">
                <button :class="{tab:true,tabChange:changetab==0}" @click="changeTab(0)">出售中</button>
                <button :class="{tab:true,tabChange:changetab==1}" @click="changeTab(1)">售罄的</button>
                <button :class="{tab:true,tabChange:changetab==2}" @click="changeTab(2)">仓库中</button>
                <div class="button-two fr">
                    <el-button  size="small" @click="publishProduct">添加商品</el-button>
                    <el-select v-model="value" placeholder="所有分类" size='small' @change='classChange'>
                        <el-option
                        v-for="item in options"
                        :key="item.classify_name"
                        :label="item.classify_name"
                        :value="item.id"
                        >
                        </el-option>
                    </el-select>
                    <el-input
                    class="inline-input"
                    size='small'
                    placeholder="搜索"
                    v-model="state1"
                    clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>

                </div>
            </div>
            <component :is="currentView" :status='status' ref="child"></component>
        </el-main>
    </el-container>
    
          
</template>

<script>
import selling from '@/components/goodsManagement/selling'
import {productCategoryList} from '@/api/goods/goods'
export default {
    data () {
         return {
            activeName: 'first',
            changetab:0,
            value:'',   //所有分类
            state1:'',  //可搜索
            currentView:selling,
            status:2,  //（1：仓库中，2：出售中， 5：售罄）
            options:[],//商品分类
         };
    },

    components: {
        selling
    },

    created(){
        productCategoryList().then(res=>{
            this.options=res.data.data.classify
            this.options.unshift({classify_name:'所有分类',id:''})
        })
    },

    methods:{
        changeTab(n){   //选项卡
            if(n==0){
                this.changetab=0
                this.status=2
                this.$refs.child.changePage()
                this.$refs.child.getData(2,this.state1)
            }else if(n==1){
                this.changetab=1
                this.status=5
                this.$refs.child.changePage()
                this.$refs.child.getData(5,this.state1)
            }else if(n==2){
                this.changetab=2
                this.status=1
                this.$refs.child.changePage()
                this.$refs.child.getData(1,this.state1)
            }
        },
        publishProduct(){   //发布商品
            this.$router.push({path:'publishProduct'})
        },
        classChange(res){
            this.$refs.child.changeClass(res)
        }
    },
    watch:{
        state1(val,oldval){
            this.$refs.child.getData('',val)
        }
    },
}

</script>
<style scoped>
.el-main{
    margin: 10px;
    padding: 0;
}
.el-main .tab{
    display: inline-block;
    width: 70px;
    height: 30px;
    background-color: #fff;
    line-height: 30px;
    color: #000;
    font-size: 14px;
    text-align: center;
    border: none;
}
.el-main .tabChange{
    background-color: #1491f2;
    color: #fff;
}
.table-header{
    width: 100%;
    height: 60px;
    background-color: #fff;
    padding: 15px 20px 0 20px;
}
.table-header .el-select{
    width: 110px;
}
.table-header .el-autocomplete{
    width: 110px;
}
.table-header .el-select{
    margin: 0 10px;
}
.goodsadmin .el-tabs__nav-wrap{
    padding-left: 10px;
}
.goodsadmin .el-tabs__nav{
    height: 60px;
    line-height: 60px;
}
.goodsadmin .el-header{
    padding: 0px;
}
.button-two .inline-input{
    width: 150px;
}
</style>

<style>
.goodsadmin .el-header .el-breadcrumb{
    height: 60px;
    line-height:60px;
    padding-left: 20px;
}
.goodsadmin .el-tabs__nav-wrap{
    padding-left: 20px;
    background-color: #fff;
}
.goodsadmin .el-tabs__nav{
    height: 60px;
    line-height: 60px;
}
.goodsadmin .el-tabs__header{
    margin: 0px;
}

</style>
