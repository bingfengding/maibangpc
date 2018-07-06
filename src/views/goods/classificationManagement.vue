<template>
    <el-container class="classificationManagement">
        <el-header class="bgFFF">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    配件分类
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <el-main>
            <div class="table-header">
                <el-button class="addClass" type="primary" size="small" @click="addClass">添加分类</el-button>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="">
                        <template slot-scope="scope">
                            <div class="views">
                                <img :src="scope.row.classify_image" alt="" width="100%" height="100%">
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="分类名称">
                        <template slot-scope="scope">
                            <div class="category-name">
                                {{scope.row.classify_name}}
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="商品数量">
                        <template slot-scope="scope">
                            <div class="number-of-products">
                                <span>{{scope.row.classifyHasProductCount}}</span>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope"> 
                            <el-button type="primary" size="small" @click="classification(scope.row.id)">编辑</el-button>
                            <el-button type="danger" size="small"  @click="Clear(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                
                <div class="table-foor">
                    <div class="block">
                        <el-pagination
                            layout="prev, pager, next"
                            :total='data.totalCount'
                            :page-size='10'
                            @prev-click='prevChange1'
                            @next-click='prevChange2'
                            @current-change='prevChange3'
                            >
                        </el-pagination>
                    </div>

                    <div class="txt fr">
                        共{{data.totalCount}}条，每页10条
                    </div>
                </div>
            </div>
            
            <div class="add-class">
                <el-dialog :title="clystitle" :visible.sync="dialogTableVisible">
                    <!-- <div class="img">
                        <el-upload
                        class="avatar-uploader"
                        action="https://easy-mock.com/mock/5af24ea78b04ba36ed89b500/mb/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div> -->
                    <div class="el-icon-box" @click="setHeadImg">
                        +
                        <img width="100%" height="100%" :src='imageUrl' alt="">
                    </div>
                    <p class="class-img">配件分类图片</p>
                    <div class="class-name">
                        分类名称：
                        <input type="text" v-model="clyasstxt">
                    </div>
                    <div class="button">
                        <button class="close" @click="dialogTableVisible=false">取消</button>
                        <button class="determine"  @click="determine">确定</button>
                        <p>添加图片让用户更好的区分分类</p>
                    </div>
                </el-dialog>
            </div>
            <cropper ref="cropper" @cropper-callback="cropperCallback"></cropper>
        </el-main>
    </el-container>
</template>

<script>
import {categoryList,addAndEditCategories,deleteCategory,classificationDetails,imgUploads,productCategoryList} from '@/api/goods/goods'
import cropper from '@/components/cropper/index.vue'
export default {
    data () {
         return {
            api:{
                accessoriesClassification:'/seller/product/classify'   //配件分类
             },
            data:[],
            tableData: [],
            clystitle:'',   //添加分类/编辑分类
            dialogTableVisible:false,  //添加分类modal
            imageUrl:'',    //添加分类图片
            clyasstxt:'',   //分类名称
            page:1, //分页
            id:'',  //分类id
         };
    },
    components: {
        cropper
    },
    methods:{
        getData(){
            let data = {
                page:this.page
            }
            productCategoryList(data).then(res=>{
                this.tableData = res.data.data.classify
                this.data = res.data.data
            })
        },
        setHeadImg(){
            this.$refs.cropper.setshowCropper()
        },
        cropperCallback(data) {
            this.imageUrl=data.data.fullpathOriginImg
        },
        handleAvatarSuccess(res, file) {    //成功回调
            this.imageUrl = URL.createObjectURL(file.raw);

            let reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = () => {
                let imageUrl = reader.result;
                imgUploads(2, imageUrl).then(res => {
                    if(res.data.result==1){
                        this.imageUrl='https://image.ymaibang.com/' + res.data.data.originImg
                    }
                });
            };
        },
        beforeAvatarUpload(file) {          //判断图片类型
            if (!/^image\/(jpeg|png)$/.test(file.type)) {
                this.$confirm('上传图片暂时只支持JPG,PNG格式', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error' ,
                    callback: action => {
                    this.$refs.form.resetFields();
                    this.$emit('closeEditUpload');
                    }
                })
            }
        },
        addClass(){     //添加分类
            this.id=''
            this.imageUrl=''
            this.clyasstxt=''
            this.dialogTableVisible=true
            this.clystitle='添加分类'
        },
        determine(){    //确定添加分类
            if(this.clyasstxt==''){
                this.$message.error("请填写分类名称")
            }else if(this.imageUrl==''){
                this.$message.error("请添加分类图片")
            }else{
                this.dialogTableVisible=false
                
                let data = {
                    classifyId: this.id,    // 分类ID，id不为空时为编辑，为空时为新增
                    classifyName:this.clyasstxt,
                    classifyPicture: this.imageUrl
                }
                addAndEditCategories(data).then(res=>{
                    if(res.data.code==200){
                        this.$message.success(res.data.data);
                        this.getData()
                    }
                })
            }
        },
        classification(id){   //编辑分类
            this.id=id
            let data = {
                classifyId:id
            }
            classificationDetails(data).then(res=>{
                this.imageUrl=res.data.data.classify.classify_image
                this.clyasstxt=res.data.data.classify.classify_name
            })
            this.dialogTableVisible=true
            this.clystitle='编辑分类'
        },
        Clear(id){    //删除
            this.$confirm('删除后将无法恢复，确定删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            let data = {
                classifyId:id
            }
            deleteCategory(data).then(res=>{
                if(res.data.code==200){
                    this.getData()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: res.data.error
                    });     
                }
            })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            })
        },
         prevChange1(res){   //上一页
            this.page=res
            this.getData()
        },
        prevChange2(res){   //下一页
            this.page=res
            this.getData()
        },
        prevChange3(res){   //跳转页
            this.page=res
            this.getData()
        },
    },
    created(){
        this.getData()
    },
}

</script>
<style scoped>
.classificationManagement .el-header .el-breadcrumb{
    height: 60px;
    line-height:60px;
}
.el-main{
    margin: 10px;
    padding: 0;
    background-color: #fff;
}
.table-header{
    width: 100%;
    padding: 10px;
}
.table-header .addClass{
    margin: 20px;
}
.table-header .views{
    width: 60px;
    height: 60px;
}
.add-class .el-dialog .img{
    width: 150px;
    height: 150px;
    margin: 0 auto;
    border: 1px solid #ccc;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}
.avatar {
    width: 150px;
    height: 150px;
    display: block;
}
.add-class .class-img{
    text-align: center;
    color: #ccc;
}
.add-class .class-name{
    margin-top: 30px;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}
.add-class .class-name input{
    width: 70%;
    padding-left: 5px;
    padding-bottom: 4px;
    font-size: 16px;
    border: none;
    outline: none;
}
.add-class .button{
    margin: 30px 70px;
}
.add-class .button .close{
    width: 90px;
    height: 30px;
    background-color: #fff;
    border: 1px solid #1491f2;
    color: #1491f2;
    border-radius: 5px;
}
.add-class .button .determine{
    width: 120px;
    height: 30px;
    background-color: #1491f2;
    border: 1px solid #fff;
    color: #fff;;
    border-radius: 5px;
}
.add-class .button P{
    text-align: center;
    color: #cccccc;
}
.classificationManagement >>> .el-table th{
    background-color:  #f2f2f2;
}
.table-foor{
    width: 100%;
    height: 80px;
    background-color: #fff;
    padding: 20px 20px 20px 20px;
    display: flex;
    justify-content: space-between;
}
.table-foor .el-button span{
    color: #000;
}
.table-foor .block{
    margin: 0 auto;
}
.table-foor .txt{
    width: 130px;
    color: #000;
    font-size: 12px;
}
.table-foor .button{
    width: 170px;
}
.el-icon-box{
    width: 150px;
    height: 150px;
    border: 1px dashed #ccc;
    margin-left: 100px;
    color: #fff;
    text-align: center;
    line-height: 150px;
    cursor: pointer;
    position: relative;
    background-color: #Ccc;
    font-size: 100px
}
.el-icon-box img{
    position: absolute;
    top: 0;
    left: 0;
}

</style>

<style>
.classificationManagement .add-class .el-dialog{
    width:400px;
    height: 400px;
}
.classificationManagement .add-class .el-dialog__body{
    padding-top:10px;
}

</style>
