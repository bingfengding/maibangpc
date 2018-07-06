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
                    width="300">
                    <template slot-scope="scope">
                        <div class="commodity">
                            <div class="img fl">
                                <img src="" alt="">
                            </div>
                            <p class="blue">汽油泵总成</p>
                            <p class="red">￥150</p>
                            <p>商品编号：9876541230</p>
                        </div>
                        <!-- <div class="wholesale">            
                            <div class="img fl">
                                <img src="" alt="" width="100%">
                            </div>
                            <p class="blue">汽油泵总成</p>
                            <p class="red">
                                <span>￥10</span>
                                <span>￥20</span>
                                <span>￥30</span>
                            </p>
                            <p  class="red">
                                <span>100</span>
                                <span>200</span>
                                <span>303</span>
                            </p>
                            <p>商品编号：9876541230</p>
                        </div> -->
                    </template>
                </el-table-column>

                <el-table-column label="访问量" width="130">
                    <template slot-scope="scope">
                        <div class="views">
                            <p>访客数：0</p>
                            <p>浏览量：0</p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="库存" width="130">
                    <template slot-scope="scope">
                        <div class="in-stock">
                            <span>9999</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="总销量" width="130">
                    <template slot-scope="scope">
                        <div class="total-sales">
                            <span>9999</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="创建时间">
                    <template slot-scope="scope">
                        <div class="creation-time">
                            <span>2018-05-07  18:12:00</span>
                        </div>
                    </template>
                </el-table-column>
                
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text">复制</el-button>
                        <el-button type="text">编辑</el-button>
                        <el-button type="text">推广商品</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="table-foor">
                <div class="button fl">
                    <el-button size="small">改分组</el-button>
                    <el-button size="small" @click="dropOff">下架</el-button>
                </div>

                <div class="block fl">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="500">
                    </el-pagination>
                </div>

                <div class="txt fr">
                    共2条，每页20条
                </div>
            </div>
        </div>
    </el-container>
</template>

<script>
export default {
    data () {
         return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
            }],
            multipleSelection:[],   //多选
         };
    },

    components: {},

    create(){},

    methods:{
        dropOff(){  //下架
            
        },
        handleSelectionChange(val) {    //选择的项
            this.multipleSelection = val;
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
.table-foor .block{
}
.table-foor .txt{
    width: 120px;
    color: #000;
    font-size: 12px;
}
.table-foor .button{
    width: 170px;
}
.table-overall{
    width: 100%;
}
.table-overall .commodity .img{
    width: 60px;
    height: 60px;
    background-color: red;
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
    background-color: red;
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
    display: inline-block;
    width: 80px;
    margin-right: 10px;
}
.table-overall >>> .el-table th{
    background-color:  #f2f2f2;
}
</style>

<style>

</style>
