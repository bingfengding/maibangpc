<template>
  <el-container id="setlogistics">
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
          物流设置
        </el-breadcrumb-item>        
      </el-breadcrumb>
    </el-header>
    <el-main>          
        <div class="addlogistics">
            <el-button type="prinary" size="mini" @click="addLogistics">添加物流</el-button>                
        </div>    
        <div class="logistics-info">
            <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="logisticsName"
        label="物流名称"
        min-width="200">
            <template slot-scope="scope">
                {{ scope.row.logistics_name }}
            </template>
      </el-table-column>
      <el-table-column       
        label="联系电话"
        min-width="180">
        <template slot-scope="scope">
                {{ scope.row.tel }}
            </template>
      </el-table-column>
      <el-table-column        
        label="操作">
        <template slot-scope="scope">            
            <a href="javascript:;" @click="edit(scope.row.id,scope.row.logistics_name,scope.row.tel)" class="spacing">编辑</a>
            <a href="javascript:;" @click="deleteLogistics(scope.row.id)">删除</a>
        </template>    
      </el-table-column>      
    </el-table>
        <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="20"
            layout="total, prev, pager, next"
            :total="tableData.length">
        </el-pagination> -->
        </div>
        <!-- 编辑物流模态框 -->
        <div class="edit-model" @click="colse(1)" v-if="editModel">
            <div class="edit-content" @click.stop="colse(2)">
                <div class="edit-text">
                    <p>编辑物流</p>
                </div>
                <div class="edit-info">
                    <el-form ref="form" :model="form">
                        <el-form-item label="物流名称" size="mini" label-width="90px">
                            <el-input v-model="form.logName"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" size="mini" label-width="90px">
                            <el-input v-model="form.logPhone"  onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && 
      (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="edit-btn">
                    <el-button type="prinary" size="mini" @click="colse(3)">取消</el-button>
                    <el-button type="prinary" size="mini" @click="editDetermine">确定</el-button>
                </div>
            </div>
        </div>
         <!-- 添加物流模态框 -->
        <div class="edit-model" @click="colseAdd(1)" v-if="addModel">
            <div class="edit-content" @click.stop="colseAdd(2)">
                <div class="edit-text">
                    <p>添加物流</p>
                </div>
                <div class="edit-info">
                    <el-form ref="form" :model="formAdd">
                        <el-form-item label="物流名称" size="mini" label-width="90px">
                            <el-input v-model="formAdd.addName"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" size="mini" label-width="90px">
                            <el-input v-model="formAdd.addPhone"  onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && 
      (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="edit-btn">
                    <el-button type="prinary" size="mini" @click="colseAdd(3)">取消</el-button>
                    <el-button type="prinary" size="mini" @click="addLogistic">确定</el-button>
                </div>
            </div>
        </div>
    </el-main>
  </el-container>  
</template>
<script>
import {logisticsList,addLogistics,editLogistics,deleteLogistics} from "@/api/set/setmanage"
export default {
    data(){
        return{
            tableData: [
                {
                    logistics_name: '',
                    tel: '',
                    id: '',
                }
            ],
            form:{
              logName: '',
              logPhone: '',
            },
            formAdd:{
                addName: '',
                addPhone: '',
            },
            //编辑模态框
            editModel: false,
            //添加模态框
            addModel: false,
            //开始的页数
            currentPage1: 1,
            //编辑物流是显示之前信息
            tel: '',
            name: '',
            id: '',
        }
    },
    methods:{
        //刪除物流
        deleteLogistics(id){
             this.$confirm('刪除后将无法恢复, 确定刪除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let data = {
                        logisticsId: id
                    }
                    deleteLogistics(data).then(res =>{
                        if(res.data.code==200){
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                            this.getData();
                        }
                    },err =>{
                        console.log(res)
                    })  
               
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //修改物流
        editDetermine(){                      
            let data = {
                name: this.form.logName,
                tel: this.form.logPhone,      
                logisticsId: this.id,          
            }
            editLogistics(data).then(res =>{
                // console.log(res)
                if(res.data.code==200){
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.editModel = false;
                    this.getData();
                }
                else if(res.data.code==400){
                    this.$message.error(res.data.error+",没有修改任何信息");
                    this.editModel = false;
                    this.getData();                    
                }
            },err =>{
                console.log(err);
            })
        },
        //添加物流
        addLogistic(){           
            if(this.formAdd.addName.length<1){
                this.$message.error('物流名称不能为空哦！');
                return false;
            }
            else if(this.formAdd.addPhone.length<1){
                this.$message.error('联系点电话不能为空哦！');
                return false;
            }
            // else if(this.formAdd.addPhone.length<11){
            //     this.$message.error('请正确输入联系电话！');
            //     return false;
            // }
            else{
                let data = {
                    name: this.formAdd.addName,
                    tel: this.formAdd.addPhone,
                }
                addLogistics(data).then(res =>{
                    // console.log(res)
                    if(res.data.code==200){
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.addModel = false;
                        this.formAdd.addName = '';
                        this.formAdd.addPhone = '';
                        this.getData();
                    }
                },err =>{
                    console.log(res)
                })
            }            
        },
        //获取物流列表
        getData(){
            logisticsList().then(res =>{                
                if(res.data.code==200){
                    this.tableData = res.data.data;                   
                }
            })
        },
        //编辑物流
        edit(id,name,tel){       
            this.id = id;
            this.name = name;
            this.tel = tel;            
            this.editModel = true;   
            this.form.logName = name;
            this.form.logPhone = tel; 
        },
        //添加物流
        addLogistics(){
            this.addModel = true;            
        },
        //关闭编辑物流
        colse(num){
            if(num==1||num==3){
                this.editModel = false;
                $('html,body').css('overflow','hidden');
            }            
            else{
                return;
            }           
        },
        //关闭添加物流
        colseAdd(num){
            if(num==1||num==3){
                this.addModel = false;
                $('html,body').css('overflow','hidden');
            }            
            else{
                return;
            }           
        },
        // handleSizeChange(val) {
        //     console.log(`每页 ${val} 条`);
        // },
        // handleCurrentChange(val) {
        //     console.log(`当前页: ${val}`);
        // }
    },
    components:{

    },
    created(){
        this.getData();
    }
}
</script>
<style scoped>
#setlogistics >>> .el-table th{
    background-color: #f2f2f2;        
}
#setlogistics >>> .el-table th:nth-child(3){
    text-align: right;
    padding-right: 12px;     
}
#setlogistics >>> .el-pagination{
    text-align: center;
    margin-top: 10px;
}
#setlogistics >>> .el-input__inner{
    width: 256px;
    height: 32px;
}
#setlogistics >>> a{
    color: #1491f2;
}
#setlogistics >>> .el-button{
    background-color: #1491f2;
    color: #fff;
    border-radius: 4px;
    width: 90px;
}
.edit-model{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(127, 127, 127, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}
.edit-content{
    width: 368px;
    height: 200px;
    background-color: #FFF;
}
.edit-text{
    text-align: center;
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    color: #333;
}
.edit-btn{
    text-align: center;
}
.edit-btn button:first-child{
    background-color: #FFF!important;
    color: #1491f2!important;
    border:1px solid #1491f2!important;
}
.spacing{
    margin-right: 20px;
}
</style>
<style lang="stylus" scoped>
#setlogistics
    .el-header
        margin-left 1px
    .el-breadcrumb
        line-height 60px
    .el-main               
        margin-left: 10px;
        margin-top: 10px;
        background-color: #FFF;                
</style>