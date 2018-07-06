<template>
    <el-container class="addShippingTemplate">
        <el-header class="bgFFF">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    {{title}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <el-main>
            <div class="muName">
                <span>模板名称：</span>
                <input type="text" class="input" v-model="muName" maxlength="12">
                <p v-if="show">模板名称不能为空</p>
            </div>

            <div class="range">
                <el-button type="primary" @click="newDistribution">新增配送范围和运费</el-button>
            </div>

            <div class="delivery-area">
                <div class="box">
                    配送范围：
                </div>
                <div class="delivery-table">
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                        label="可配送区域"
                        width="480">
                        <template slot-scope="scope">
                            <div class="spanBox">
                                <span style="margin-left: 10px" v-for="value in scope.row.addresses">{{ value.province_name }}</span>
                            </div>
                            <el-button type="text fr" @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
                            <el-button type="text fr" @click.native.prevent="areaEdit(scope.$index)">编辑</el-button>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="首重（kg）">
                        <template slot-scope="scope">
                            <input type="number" class="input" v-model="scope.row.maxWeightWhichWillChangePrice">
                        </template>
                        </el-table-column>
                        <el-table-column label="运费（元）">
                        <template slot-scope="scope">
                            <input type="number" class="input" v-model="scope.row.price">
                        </template>
                        </el-table-column>
                        <el-table-column label="续重（kg）">
                        <template slot-scope="scope">
                            <input type="number" class="input" v-model="scope.row.extractWeightUnit">
                        </template>
                        </el-table-column>
                        <el-table-column label="续费（元）">
                        <template slot-scope="scope">
                            <input type="number" class="input" v-model="scope.row.extractPrice">
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <el-dialog :visible.sync="dialogTableVisible" :show-close='false'>
                <div class="boxc">
                    <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        style="width: 100%"
                        max-height="250"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        label="可选省份">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </template>
                        </el-table-column>
                    </el-table>
                    <div class="button">
                        <el-button size="small" @click="dialogTableVisible=false">取消</el-button>
                        <el-button type="primary" size="small" @click="adddetermine">确定</el-button>
                    </div>
                </div>
            </el-dialog>

            <div class="save">
                <el-button type="primary" @click="save">保存</el-button>
            </div>

            
        </el-main>
    </el-container>
</template>

<script>
import {addShippingTemplate,freightTemplateDetails,editDhippingTemplate,provinces} from '@/api/goods/goods'
export default {
    data () {
         return {
             tableData: [{
                addresses:[],
                maxWeightWhichWillChangePrice:"",  //首重,
                extractWeightUnit:"",   //续重,
                extractPrice:"",        //续费
                price:"",   //运费
                type:1,    //1重量/2数量
            }],
            tableData3: [], //省份
            title:'',   
            muName:'',//模板名称
            show:'',
            dialogTableVisible:false,//编辑模态框
            index:'',   //编辑的索引
        };
    },
    components: {},
    created(){
        provinces().then(res=>{
            this.tableData3=res.data.data
        })
        if(this.$route.query.type==1){
            this.title='编辑运费模板'
            this.getData()
        }else{
            this.title='添加运费模板'
        }
    },

    methods:{
        getData(){
            let data = {
                templateId:this.$route.query.id
            }
            freightTemplateDetails(data).then(res=>{
                if(res.data.code==200){
                    this.muName=res.data.data.name
                    this.tableData = res.data.data.freightCostItems
                }
            })
        },
        save(){     //保存
            if(this.$route.query.type==1){
                let edit = false
                this.tableData.filter(res=>{
                    if(res.addresses.length==0){
                        edit=true
                    }
                })
                if(this.muName!=''){
                    this.show=false
                }
                if(this.muName==''){
                    this.show=true
                }else if(edit){
                    this.$message.error('请编辑配送区域');
                }else if(this.tableData.length==0){
                    this.$message.error('请添加配送区域');
                }else{
                    let data ={
                        templateId:this.$route.query.id,
                        name:this.muName,
                        freightCostItems:this.tableData
                    }
                    editDhippingTemplate(data).then(res=>{
                        if(res.data.code==200){
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.$router.go(-1)
                        }else{
                            this.$message({
                                message: res.data.error,
                                type: 'warning'
                            });
                        }
                    })
                }
            }else{
                let edit = false
                this.tableData.filter(res=>{
                    if(res.addresses.length==0){
                        edit=true
                    }
                })
                if(this.muName!=''){
                    this.show=false
                }
                if(this.muName==''){
                    this.show=true
                }else if(edit){
                    this.$message.error('请编辑配送区域');
                }else if(this.tableData.length==0){
                    this.$message.error('请添加配送区域');
                }else{
                    let data ={
                        name:this.muName,
                        freightCostItems:this.tableData
                    }

                    addShippingTemplate(data).then(res=>{
                        if(res.data.code==200){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.$router.go(-1)
                        }else{
                            this.$message({
                                message: res.data.error,
                                type: 'warning'
                            });
                        }
                    })
                }
            }
        },
        newDistribution(){  //新增配送范围和运费
            this.tableData.push(
                {
                    addresses:[],
                    maxWeightWhichWillChangePrice:"",  //首重,
                    extractWeightUnit:"",   //续重,
                    extractPrice:"",        //续费
                    price:"",   //运费
                    type:1,    //1重量/2数量
                }
            )
        },
        areaEdit(index){    //编辑
            this.index=index
            this.dialogTableVisible=true
            this.$refs.multipleTable.clearSelection();
        },
        handleSelectionChange(val){    //选中项
            this.tableData[this.index].addresses=[]
            val.filter(res=>{
                this.tableData[this.index].addresses.push({
                    province_id:res.id,province_name:res.name
                })
            })
        },
        adddetermine(){ //选地址确定
            if(this.tableData[this.index].addresses.length==0){
                this.$message.error('最少需选择一个地址');
            }else{
                this.dialogTableVisible=false
            }
        },
        deleteRow(index, rows){    //删除
            this.$confirm('删除后将无法恢复，确定删除？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            })
            .then(() => {
                rows.splice(index, 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!',
                });
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    },
}

</script>
<style scoped>
.addShippingTemplate .el-header .el-breadcrumb{
    height: 60px;
    line-height: 60px;
}
.el-main{
    background-color: #fff;
    margin-top: 10px;
    margin-left: 10px;
    padding-top: 30px;
}
.muName .input{
    width: 250px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 2px;
    font-size: 16px;
    padding-left: 5px;
}
.muName p{
    margin-top: 10px;
    margin-left: 85px;
    color: red;
}
.range{
    margin-top: 20px;
    margin-left: 85px;
}
.delivery-table{
    border: 1px solid #ccc;
    margin-bottom: 100px;
}
.delivery-area{
    margin-top: 30px;
}
.delivery-area .box{
    float: left;
}
.delivery-area .delivery-table{
    width: 90%;
    float: left;
}
.addShippingTemplate >>> .el-table th{
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: #f2f2f2;
}
.delivery-table .input{
    width: 60px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
    text-align: center;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
}
.delivery-table .el-button{
    margin-right: 15px;
    padding: 0;
}
.save .el-button{
    margin-left: 85px;
}
.addShippingTemplate >>> .el-dialog__header{
    padding:0;
}
addShippingTemplate >>> .el-dialog__body{
    padding: 0;
}
.el-dialog .button{
    height: 60px;
    line-height: 60px;
    padding-left: 30px;
}
.el-dialog .button .el-button{
    margin-left: 20px;
}
.delivery-table .spanBox{
    width: 355px;
    display: inline-block;
}
</style>

<style>
.addShippingTemplate .el-table__body .el-table__row td:first-child{
    border-right: 1px solid #ccc;
}
.addShippingTemplate .el-dialog{
    width:240px;
}
.addShippingTemplate .el-dialog .el-dialog__body{
    padding: 0;
}
.addShippingTemplate .boxc .el-table{
    max-height:none!important;
}
.addShippingTemplate .boxc .el-table .is-scrolling-none{
    
    max-height:500px!important;
}
</style>
