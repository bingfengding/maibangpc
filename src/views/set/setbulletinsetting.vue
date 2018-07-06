<template>
    <el-container id="setbulletinsetting">
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
          公告设置
        </el-breadcrumb-item>        
      </el-breadcrumb>
    </el-header>
    <el-main>
        <!--公告内容-->
        <div class="notice-content">
            <div class="pic">
                 <div class="top-pic1">
                    <img src="../../images/setImg/1.png" width="100%">
                </div>
                <div class="top-pic2">
                    <img src="../../images/setImg/3.png" width="100%">
                </div>
                <div class="top-pic3">
                    <img src="../../images/setImg/2.png" width="100%">
                </div>
            </div>           
            <div class="set-notice">
                <div class="set-text">
                    <p>公告设置区域</p>
                </div>
                <div class="set-content">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea"
                        class="textarea"
                        resize="none">
                    </el-input>
                </div>
            </div>
            <div class="but">
                <el-button type="prianry"  @click="release" >发布</el-button>
            </div>
        </div>
    </el-main>
    </el-container>
</template>
<script>
import {storeannouncement,saveStoreannouncement} from "@/api/set/setmanage"
export default {
    data(){
        return{
            textarea: '',
        }
    },
    methods:{
        getData(){
            storeannouncement().then(res =>{
                if(res.data.code==200){
                    this.textarea = res.data.data;
                }     
                else if(res.data.code==400){
                    this.$message.error("请求失败");
                }           
            },err =>{
                console.log(err)
            })
        },
        //发布公告
        release(){
            let data = {
                content: this.textarea
            }
            saveStoreannouncement(data).then(res =>{
                if(res.data.code==200){
                    this.$message({
                        message: '发布成功，您真棒！',
                        type: 'success'
                    });
                    this.$router.push({path: 'setbulletinsetting'})
                    // this.$router.push("orddetail")
                }
                else if(res.data.code==400){
                    this.$message.error("请求失败");
                }
            },err =>{
                console.log(err)
            })
        }
    },
    components:{

    },
    created(){
        this.getData();
    },
}
</script>
<style scoped>
#setbulletinsetting >>> .el-textarea__inner{
    max-height: 60px;    
}
#setbulletinsetting >>> .el-button{
    background-color: #1491f2;
    color: #FFF;
    width: 120px;
    border-radius: 4px;
}
.notice-content{
    background-color: #f2f2f2;
    width: 400px;
    height: 540px;
    margin-bottom: 150px;
}
.top-pic1{
    width: 100%;
    height: 99px;
}
.top-pic2{
    width: 100%;
    height: 89px;
}
.top-pic3{
    width: 100%;
    height: 170px;
}
.set-text{
    text-align: center;
    margin-bottom: 20px;
}
.but{
    padding-top: 20px;
    height: 60px;   
    text-align: center;
    margin-bottom: 30px;
    font-size: 16px;
}

</style>
<style lang="stylus" scoped>
#setbulletinsetting
    .el-header
        margin-left: 1px;
    .el-breadcrumb
        line-height: 60px;
    .el-main
        height: 100vh;
        margin-top: 10px;
        margin-left: 10px;
        background-color: #FFF;
        display: flex;
        justify-content center
        align-items: center;
</style>