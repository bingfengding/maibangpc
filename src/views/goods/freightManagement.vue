<template>
    <el-container class="freightManagement">
        <el-header class="bgFFF">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    运费模板
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <el-main>
            <div class="add-shipping-template">
                <router-link to='addShippingTemplate'>添加运费模板</router-link>
            </div>

            <div class="freight-template" v-for="(value,index) in data">
                <span>{{value.name}}</span>
                <el-button type="text" class="fr" @click="del(value.id)">删除</el-button>
                <el-button type="text" class="fr" @click="edit(value.id)">编辑</el-button>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import {freightTemplateList,deleteShippingTemplate} from '@/api/goods/goods'
export default {
    data () {
         return {
            data:[],
         };
    },

    components: {},

    created(){
        this.getData()
    },

    methods:{
        getData(){
            freightTemplateList().then(res=>{
                if(res.data.code==200){
                    this.data = res.data.data
                }
            })
        },
        del(id){  //删除
            this.$confirm('删除后将无法恢复，确定删除？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            let data ={
                templateId:id
            }
            deleteShippingTemplate(data).then(res=>{
                if(res.data.code==200){
                    this.getData()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: res.data.msg
                    });    
                }
            })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        edit(id){
            this.$router.push({path:'addShippingTemplate',query:{type:1,id:id}})
        }
    },
    
}

</script>
<style scoped>

.freightManagement .el-header .el-breadcrumb{
    height: 60px;
    line-height:60px;
}
.el-main{
    margin: 10px;
    background-color: #fff;
}
.add-shipping-template{
    margin-bottom: 20px;
}
.add-shipping-template a{
    color: #1491f2;
}
.freight-template{
    width: 40%;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    background-color: #f8f8f8;
    margin-bottom: 10px;
}
.freight-template .el-button{
    padding: 0;
    margin-right: 10px;
    margin-top: 2px;
}
</style>