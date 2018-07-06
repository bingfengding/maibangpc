<!--出售中-->
<template>
    <el-container>
        <div class="table-overall">
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55"
                >
                </el-table-column>

                <el-table-column
                    label="商品 价格"
                    width="450">
                    <template slot-scope="scope">
                        <div class="commodity" v-if="scope.row.sku[0].wholesale_rules==null">
                            <div class="img fl">
                                <img :src="scope.row.picture" alt="" width="100%" height="100%">
                            </div>
                            <p class="blue">{{scope.row.product_name}}</p>
                            <p class="red">￥{{scope.row.sku[0].product_price}}</p>
                            <p>商品编号：{{scope.row.product_sku_num}}</p>
                        </div>
                        <div class="wholesale" v-else>            
                            <div class="img fl">
                                <img :src="scope.row.picture" alt="" width="100%" height="100%">
                            </div>
                            <p class="blue">{{scope.row.product_name}}</p>
                            <p class="red">
                                <span v-for="value in scope.row.sku[0].wholesale_rules"><span v-if="value.sell_money">￥{{value.sell_money}}</span></span>
                            </p>
                            <p  class="red">
                                <span v-for="value in scope.row.sku[0].wholesale_rules">
                                    <span v-if="value.sell_money">
                                        {{value.start_sum}}--{{value.end_sum}}件
                                    </span>
                                </span>
                            </p>
                            <p>商品编号：{{scope.row.product_sku_num}}</p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="库存">
                    <template slot-scope="scope">
                        <div class="in-stock">
                            <span>{{scope.row.stock}}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="总销量">
                    <template slot-scope="scope">
                        <div class="total-sales">
                            <span> {{scope.row.sold}}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="创建时间">
                    <template slot-scope="scope">
                        <div class="creation-time">
                            <span>{{scope.row.create_at}}</span>
                        </div>
                    </template>
                </el-table-column>
                
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="copy(scope.row.id)">复制</el-button>
                        <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
                        <el-button v-if="getNum==1" type="text" @click="deleteOff(scope.row.id)">删除</el-button>
                        <el-button v-else type="text" @click="promotionalGoods(scope.row.id,scope.row)">推广商品</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="table-foor">
                <div class="button fl">
                    <el-button size="small" @click="Regroup">改分类</el-button>
                    <el-button size="small" @click="dropOff(1)"  v-if="status==2 || status==5">下架</el-button>
                    <el-button size="small" @click="dropOff(2)"  v-if="status==1">上架</el-button>
                    <el-button size="small" @click="dropOff(3)"  v-if="status==1">删除</el-button>
                </div>

                <div class="block fl">
                    <el-pagination
                        layout="prev, pager, next"
                        :total='data.totalCount'
                        :page-size='10'
                        :pager-count='5'
                        @prev-click='prevChange1'
                        @next-click='prevChange2'
                        @current-change='prevChange3'>
                    </el-pagination>
                </div>

                <div class="txt fr">
                    共{{this.data.totalCount}}条，每页10条
                </div>
            </div>
            
            <el-dialog title="分类" :visible.sync="dialogTableVisible">
                <div class="ificationheight">
                    <div v-for="(value,index) in classificationList" @click="changeification(index,value.id)" :class="{classification:true,changeclassification:changeclassification==index}">
                        <span>{{value.classify_name}}</span>
                        <i class="yuan fr"><img v-if="changeclassification==index" src="@/assets/goods/whiteyes.png" alt=""></i>
                    </div>
                </div>
                <div class="btn">
                    <el-button type="success" @click="dialogTableVisible=false">取消</el-button>
                    <el-button type="primary" @click="categoriesdetermine">确定</el-button>
                </div>
            </el-dialog>

            <el-dialog
            :visible.sync="dialogVisible5"
            :before-close="handleClose"
            class="tuguan">
            
            </el-dialog>
        </div>
    </el-container>
</template>

<script>
import {productList,productCategoryList,dropOff,deletegoods,changeClassify} from '@/api/goods/goods'
export default {
    data () {
         return {
            data:'',
            tableData: [],
            classificationList:[],//分类列表
            multipleSelection:[],   //多选
            dialogTableVisible:false,  //改分组模态
            changeclassification:-1,    //改分组索引
            classifyId:'',//分类id
            page:1,//页数
            getNum:'',
            dialogVisible5:false,//推广模态
         };
    },
    props:[
        'status'
    ],
    components: {

    },
    created(){
        this.getData(2)
    },
    methods:{
        getData(n,search){
            if(n!=''){
                this.getNum=n
            }else{
                this.search=search
            }
            let data =  {
                status:this.getNum,
                page:this.page,
                classifyId:this.classifyId,
                search:search,
            }
            productList(data).then(res=>{
                this.data = res.data.data
                this.tableData = res.data.data.products
                this.staffId = res.data.data.staffId
            })
        },
        changePage(){
            this.page=1
        },
        Regroup(){  //改分组
            if(this.multipleSelection.length==0){
                this.$message.error("请选择要修改分类的商品")
            }else{
                this.dialogTableVisible=true
                productCategoryList().then(res=>{
                    this.classificationList=res.data.data.classify
                })
            }
        },
        dropOff(n,id){  
            if(n==1){   //下架
                if(this.multipleSelection.length==0){
                    this.$message.error('请选择要下架的商品');
                }else{
                    this.$confirm('确定要下架选中的商品？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    let data = {
                        productIds:this.multipleSelection,
                        status:0
                    }
                    dropOff(data).then(res=>{
                        if(res.data.code==200){
                            this.getData(this.getNum)
                            this.$message({
                                type: 'success',
                                message: '下架成功!'
                            });
                        }else{
                            this.$message.error(res.data.error);
                        }
                    })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消下架'
                    });          
                    });
                }
            }else if(n==2){ //上架
                if(this.multipleSelection.length==0){
                    this.$message.error('请选择要上架的商品');
                }else{
                    this.$confirm('确定要上架选中的商品？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    let data = {
                        productIds:this.multipleSelection,
                        status:2
                    }
                    dropOff(data).then(res=>{
                        if(res.data.code==200){
                            this.getData(this.getNum)
                            this.$message({
                                type: 'success',
                                message: '上架成功!'
                            });
                        }else{
                            this.$message.error(res.data.error);
                        }
                    })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消上架'
                    });          
                    });
                }
            }else if(n==3){ //删除
                if(this.multipleSelection.length==0){
                    this.$message.error('请选择要删除的商品');
                }else{
                    this.$confirm('确定要删除选中的商品？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    let data = {
                        productIds:this.multipleSelection,
                    }
                    deletegoods(data).then(res=>{
                        if(res.data.code==200){
                            this.getData(this.getNum)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message.error(res.data.error);
                        }
                    })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
                }
            }
        },
        deleteOff(id){    //单个删除
            this.$confirm('确定要删除此商品？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            let data = {
                productIds:id,
            }
            deletegoods(data).then(res=>{
                if(res.data.code==200){
                    this.getData(this.getNum)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }else{
                    this.$message.error(res.data.error);
                }
            })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        handleSelectionChange(val) {    //选择的项
            this.multipleSelection = []
            val.filter(res=>{
                this.multipleSelection.push(res.id)
            })
        },
        changeification(index,id){  //分组状态该变
            this.changeclassification=index
            this.classifyId=id
        },
        copy(id){     //复制
            this.$router.push({path:'publishProduct',query:{type:1,id:id}})
        },
        edit(id){     //编辑
            this.$router.push({path:'publishProduct',query:{type:2,id:id}})
        },
        promotionalGoods(id,row){ //推广产品
            this.dialogVisible5=true
            let data = {
                img:row.picture,
                title:row.product_name,
                url:this.data.shareUrl+'productDetails?productId='+id+'&staff_id='+this.staffId+'&merchant_id='+localStorage.storeId
                // +'&mallad=ad'
            }
            this.$store.dispatch("changeUrl",data)
            this.$store.dispatch("showShare")
        },
        prevChange1(res){   //上一页
            this.page=res
            this.getData(this.getNum,this.search)
        },
        prevChange2(res){   //下一页
            this.page=res
            this.getData(this.getNum,this.search)
        },
        prevChange3(res){   //跳转页
            this.page=res
            this.getData(this.getNum,this.search)
        },
        categoriesdetermine(){   //分类确定
            let data = {
                productIds:this.multipleSelection,
                classifyId:this.classifyId
            }
            changeClassify(data).then(res=>{
                if(res.data.code==200){
                    this.$message.success('修改成功')
                    this.classifyId=this.aaa
                    this.getData(this.getNum)
                    this.dialogTableVisible=false
                    this.changeclassification=-1
                }else{
                    this.$message.error(res.data.error)
                }
            })
        },
        changeClass(id){
            this.aaa = id
            this.classifyId=id
            this.getData(this.getNum)
        },
        handleClose(){
            this.$store.dispatch("hideShare")
            this.dialogVisible5=false
        }
    },
}

</script>
<style scoped>
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
.table-foor .txt{
    width: 130px;
    color: #000;
    font-size: 12px;
}
.table-foor .button{
    width: 235px;
}
.table-overall{
    width: 100%;
    padding: 10px;
    background-color: #fff;
}
.table-overall .commodity .img{
    width: 60px;
    height: 60px;
    margin-right: 10px;
}
.table-overall .commodity p{
    line-height: 20px;
}
.table-overall .commodity .blue{
    color: #1491f2;
}
.table-overall .commodity .red{
    color: red;
}
.table-overall .wholesale .img{
    width: 60px;
    height: 70px;
    margin-right: 10px;
}
.table-overall .wholesale  p{
    margin-top: -5px;
}
.table-overall .wholesale .blue{
    color: #1491f2;
}
.table-overall .wholesale .red{
    color: red;
}
.table-overall .wholesale .red span{
    width: 100px!important
}
.table-overall .wholesale .red span{
    display: inline-block;
    width: 80px;
    margin-right: 10px;
}
.table-overall >>> .el-table th{
    background-color:  #f2f2f2;
}
.el-dialog .classification{
    border-bottom: 1px solid #ccc;
    padding: 8px 5px;
}
.el-dialog .classification .yuan{
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #cccccc;
    border-radius: 50%;
    text-align: center;
}
.changeclassification .yuan{
    background-color: #6cd421!important;
}
.ificationheight{
    height: 250px;
    overflow: auto;
}
.el-dialog .btn{
    padding-left: 25px;
    margin-top: 10px;
}
.el-dialog .btn .el-button{
    margin-right: 20px;
}
.floor .block{
    margin: 0 auto;
    text-align: center;
}
</style>

<style>
.table-overall  .el-dialog{
    width:300px;
    height:400px;
}
.table-overall  .el-dialog .el-dialog__header{
    text-align:center;
}
.table-overall  .el-pagination{
    display:inline-block;
}
.tuguan .el-dialog{
    width: 0;
    height: 0;
}

.tuguan .el-dialog i{
    opacity: 0;
}
.table-overall .el-button--text{
    margin-left:0
}
</style>
