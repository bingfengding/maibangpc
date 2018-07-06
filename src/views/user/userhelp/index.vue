<template>
    <el-container id="app-problem-content">
        <el-header class="bgFFF">
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <span class="font20 fontWeight">
                        <i class="bgImg"></i>
                        汽配帮手
                    </span>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <div class="app-problem-content">
                        <div class="top-header">
                            <h3>使用帮助</h3>
                            <div>
                                <el-input placeholder="输入您要搜索的功能" v-model="searchText" class="input-with-select" @keyup.enter.native="search">
                                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                                </el-input>
                            </div>
                        </div>
                        <el-container>
                            <el-aside width="280px">
                                <el-collapse @change="handleChange" v-for="(item,index) in problem" :key="index">
                                    <el-collapse-item :title="item.name" :name="item.id">
                                        <div v-for="(list,index) in item.childrenProblem" :key="index" class="child-item" :class="list.active?'active':''" @click="getProblemDetail(list.id)">{{list.name}}</div>
                                    </el-collapse-item>
                                </el-collapse>
                            </el-aside>
                            <el-main class="content">
                                <div class="problem-detail-content" v-if="problemDetail.detail && !searchType">
                                    <!-- <div class="detail-content" v-if="problemDetail.detail && problemDetail.detail" v-for="(item,index) in problemDetail.detail" :key="index">
                                        <div v-if="item.type == 'text'">{{item.content}}</div>
                                        <div v-else-if="item.type == 'picture'" class="picture-item">
                                            <img :src="item.picture_path" alt="">
                                        </div>
                                    </div> -->
                                    <div class="detail-content">
                                        <div v-html="problemDetail.detail">{{problemDetail.detail}}</div>
                                    </div>
                                    <div class="btn">
                                        <el-button :type="status == 1?'primary':''" @click="setsSolveProblem(1)">未解决</el-button>
                                        <el-button :type="status == 2?'primary':''" @click="setsSolveProblem(2)">已解决</el-button>
                                    </div>
                                </div>
                                <div class="search-result-content"  v-if="searchType">
                                    <div class="result-num">
                                        <el-button type="text" @click="back">返回</el-button>
                                        <p>{{searchResult.length || 0}}条结果“{{searchResultText}}”</p>
                                    </div>
                                    <div class="result-content">
                                        <div class="result-item" v-for="(item, index) in searchResult" :key="index" @click="openNewWindowDetail(item.id)">
                                            <h3 v-html="item.name">{{item.name}}</h3>
                                            <div class="result-detail" v-html="item.detail">
                                                <!-- <span v-for="(list,index) in item.detail" :key="index" v-if="list.type == 'text'" v-html="list.content">{{list.content}}</span> -->
                                                {{item.detail}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-main>
                        </el-container>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
    import {getAllProblem,getProblemlist,getSolutionDetail,searchQuestion,getSolveSum} from "@/api/help/help.js"
    export default{
        data() {
            return {
                problem:[],
                searchText:"",
                problemDetail:{},
                searchType:false,
                searchResult:[],
                searchResultText:"",
                id:"",
                status:""
            }
        },
        methods:{
            getProblem() {
                let that = this;
                getAllProblem().then(res => {
                    console.log(res.data);
                    if (res.data.code == 200) {
                        that.problem = res.data.data;
                        that.problem.filter(function(a) {
                            a.childrenProblem = []; 
                        })
                    } else {
                        that.$message.error(res.data.error)
                    }
                })
            },
            handleChange(val) {
                let that = this;
                if (!val[0]) {
                    return
                }
                let havedata = false;
                for (let i = 0; i <  that.problem.length; i++) {
                    if (that.problem[i].id == val[0]) {
                        if(that.problem[i].childrenProblem.length > 0) {
                           havedata = true
                        }
                    }
                }
                if (havedata) {
                    return
                }
                getProblemlist(val[0]).then(res => {
                    // console.log(res.data);
                    that.problem.filter(function(a) {
                        if (a.id == val[0]) {
                           a.childrenProblem = res.data.data; 
                        }
                    })
                    console.log(that.problem);
                    
                })
                that.problem = JSON.parse(JSON.stringify(that.problem))
            },
            getProblemDetail(id){
                let that = this;
                that.searchType = false;
                that.id = id;
                that.status = "";
                that.problem.map(function(a) {
                    a.childrenProblem.filter(function(o) {
                        o.active = false;
                        if (o.id == id) {
                            o.active = true
                        }
                    })
                })
                that.problem = JSON.parse(JSON.stringify(that.problem))
                getSolutionDetail(id).then(res => {
                    console.log(res.data);
                    if (res.data.code == 200) {
                        that.problemDetail = res.data.data;
                    } else {
                        that.$message.error(res.data.error);
                    }
                })
            },
            search() {
                let that = this;
                that.searchType = true;
                that.searchResultText = that.searchText;
                searchQuestion(that.searchText).then(res => {
                    // console.log(res.data);
                    if (res.data.code == 200) {
                        let result = res.data.data;
                        let replaceReg = new RegExp(this.searchText, 'g');
                        // 高亮替换v-html值
                        let replaceString = '<span style="color:#1491f2">' + this.searchText + '</span>';
                        // 开始替换
                        // this.searchResult.replace(replaceReg, replaceString);
                        result.filter(function(a) {
                            a.name = a.name.replace(replaceReg, replaceString);
                            a.detail= a.detail.replace(replaceReg, replaceString);
                            // for (let index = 0; index < a.detail.length; index++) {
                            //     if (a.detail[index].type == "text") {
                            //         a.detail[index].content = a.detail[index].content.replace(replaceReg, replaceString);
                            //     }
                            // }
                            return a
                        })
                        that.searchResult = result;
                    } else {
                        that.$message.error(res.data.error)
                    }
                })
            },
            back() {
                this.searchType = false;
            },
            openNewWindowDetail(id) {
                const {href} = this.$router.resolve({
                    path: '/userhelpHome',
                    query: {
                        id:id
                    }
                })
                window.open(href, '_blank')
            },
            setsSolveProblem(status) {
                let that = this;
                that.status = status;
                let data = {
                    id:that.id,
                    type:status
                }
                getSolveSum(data).then(res => {
                    console.log(res.data);
                    if (res.data.code == 200) {
                        
                    } else {
                        that.$message.error(res.data.error)
                    }
                })
            }
        },
        mounted() {
            this.getProblem();
            this.id = this.$route.query.id;
            console.log(this.id);
            if (this.id) {
                this.getProblemDetail(this.id)
            }
        }
    }
</script>
<style scoped>
    .el-row {
        line-height: 60px;
    }
    .app-problem-content {
        min-height: 800px;
        border: 1px solid #cccccc;
        min-width: 700px;
    }
    .content{
        min-width: 400px;
    }
    i{
        display: inline-block;
        width:30px;
        height: 30px;
        vertical-align: middle;
        background-image: url('../../../assets/icon.png');
    }
    .top-header {
        display: flex;
        justify-content: space-between;
        height: 48px;
        background: #fff;
        align-items: center;
        padding: 0 30px;
        border-bottom: 1px solid #cccccc;
    }
    .top-header h3{
        color: #333;
        font-size: 18px;
        font-weight: normal;
    }
    .child-item{
        min-height: 40px;
        padding-left: 30px;
        display: flex;
        align-items: center;
        cursor: pointer;
        flex-wrap: wrap;
    }
    .child-item:hover{
        background-color: #f2f2f2;
    }
    .active {
        background-color: #1491f2 !important;
        color: #fff !important;
    }
    .app-problem-content .el-main{
        background-color: #f8f8f8;
        /* line-height: 3; */
    }
    .problem-detail-content .detail-content{
        font-size: 14px;
        color: #333;
        line-height: 1.5;
    }
    .problem-detail-content  .btn {
        margin-top: 100px;
        margin-left: 40px;
    }
    .problem-detail-content .detail-content img{
        width: 100%;
        height: auto;
    }
    .search-result-content .result-num{
        font-size: 14px;
    }
    .search-result-content .result-content .result-item{
        margin-top: 45px;
        cursor: pointer;
    }
    .search-result-content .result-content .result-item h3{
        font-size: 20px;
        font-weight: normal;
        color: #333333;
        margin-bottom: 20px;
    }
    .search-result-content .result-content .result-item .result-detail{
        font-size: 14px;
        height: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
</style>
<style>
.app-problem-content .el-collapse-item__header{
    padding-left: 30px;
    border-bottom:1px solid #cccccc;
}
.app-problem-content .el-aside{
    min-height: 800px;
    border-right:1px solid #cccccc;
    overflow: hidden;
}
.app-problem-content .el-collapse-item__content {
    padding-bottom:0;
}
#app-problem-content .el-main .el-row{
    line-height:1;
}
#app-problem-content img {
    height: auto;
    width:100%;
}
</style>
