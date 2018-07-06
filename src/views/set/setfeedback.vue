<template>
  <el-container id="setfeedback">
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
          问题反馈
        </el-breadcrumb-item>        
      </el-breadcrumb>
    </el-header>
    <el-main>
      <template>
    <div class="problemsPage">            
        <div class="top">
            <div class="top-cont">
                <div>
                    <div class="textarea">
                        <textarea  rows="8" placeholder="请输入您所需要反馈的问题" v-model='problem'></textarea>
                    </div>
                </div>
            </div>
            <div class="top-pic">
                <div class="pic" v-for="(val,index) in thumImg" :key="index">
                    <img :src="val" class="up-pic">                   
                    <div class="pic-x" @click="del(index)"><img width="20" height="20" src="../../images/setImg/delete.png"></div>
                </div>      
                <div class="pic" v-show="thumImg.length<3">
                    <input type="file" class="form-control" @change="onFileChange" accept="image/gif,image/jpg,image/jpeg,image/bmp,image/png">
                    <img src="../../images/setImg/addproduct.png" width="80">
                </div>                
            </div>            
            <div class="input" >
                <!-- <div class="name">
                   <el-label>你的名字</el-label>
                   <el-input type="text" placeholder="请输入您的名字"  v-model='name' maxlength="14" size="mini"></el-input>
                </div>                
                <div class="way">
                    <label>联系方式</label>
                    <el-input type="tel" placeholder="请输入您的电话号码" maxlength="11"  v-model='phone' oninput="this.value=this.value.replace(/[^0-9.]+/,'');" size="mini"></el-input>
                </div> -->
                <el-form ref="form" :model="form">
                  <el-form-item label="你的名字：">
                    <el-input v-model="form.name" placeholder="请输入您的名字" maxlength="14" size="mini"></el-input>                  
                  </el-form-item>
                  <el-form-item label="联系方式：">
                    <el-input v-model="form.phone" placeholder="请输入您的电话号码" maxlength="11" oninput="this.value=this.value.replace(/[^0-9.]+/,'');" size="mini"></el-input>                  
                  </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="btn">
            <el-button class="submit" @click="sub" :plain="true">提交</el-button>
        </div>
        <span class="record" >反馈记录</span>
        <div class="problems">
            <div v-if="data =='暂时没有反馈的问题'" class="cont">
                <span class="problem" v-text="data"></span>
            </div>
            <div class="cont" v-for='(arr,index) in litems' :key='index' v-else><!--使用v-for循环-->           
                <a href="javascript:;" @click="getFeedBack(arr.id)" class="child"><!--当我点击details事件时获取到事件的id-->
                    <!--<span class="problem" v-text="arr.problem"></span>-->
                    <p class="problem" v-text="arr.problem"></p>
                    <!--<span class="unanswered" v-if="arr.solve_content==null">未回答</span>-->
                    <p class="unanswered" v-if="arr.solve_content==null">未回答</p>
                    <!--<span class="answer" v-else>回答</span>-->
                    <p class="answer" v-else>已回答</p>
                </a>
                <!-- <span class="answer"><a href="javascript:;" class="active">{{arr.solve_content}}</a></span> -->
                <div class="underline"></div>
            </div>
        </div>
    </div>
    <!-- 获取问题反馈 -->
    <div class="invoice-model" v-if="getFeedback" @click="colsegetFeedback(1)">
        <div class="invoice-content" @click.stop="colsegetFeedback(2)">
            <div class="text-1"><p>反馈详情</p><img src="../../images/orderImg/close-icon.png" width="12" @click="colsegetFeedback(3)"></div> 
            <p>问：{{getproblem}}</p>
            <p>答：{{solve_content}}</p>
        </div>
    </div>       
</template>
    </el-main>
  </el-container>
</template>

<script>
// import {callApp,imgUrl} from '../../config/app.js';
import {showFeedBackManage,feedbackdetail,feedbackmanage,ImgUploads} from '@/api/set/setmanage'
export default {
    data(){
        return{      
            img: '',     
            data: '',
            litems: '',//v-for循环
            //提交问题反馈                       
            problem:'',
            form: {
              name:'',
              phone:'',
            },                                
            image: '',
            thumImg: [],
            originImg: [],
            getFeedback: false,
            //获取问题
            getproblem: '',
            //获取回答
            solve_content: '',
        }
    },
    components:{
        
    },
    methods:{     
        //获取问题反馈信息
        getFeedBack(id){                        
            this.getFeedback = true;  
            let data = {
                id: id
            }         
            feedbackdetail(data).then(res =>{
                if(res.data.code==200){
                    this.getproblem = res.data.data.problem,
                    this.solve_content = res.data.data.solve_content                                        
                }                
            },err =>{
                this.$message.error('上传失败！')
            })
        },
        //关闭窗口
       colsegetFeedback(num){
        if(num==1||num==3){
            this.getFeedback = false;
        }
        else{
            return;
        }
        },
        sub(){                        
            if(this.problem==''){//设置提交问题不能为空                
                this.$message.error('请输入您想要反馈的问题！');
                return false;
            }            
            // else if(this.form.name==''){                
            //     this.$message.error('请输入名字！');
            //     return false;
            // }
            // else if(this.form.phone==''){                
            //     this.$message.error('手机号不能为空！');
            //     return false;
            // }
            // else if(this.form.phone.length<11){               
            //     this.$message.error('请输入正确的手机号！');
            //     return false;
            // }
            else{   
                    this.$confirm('您是否要提交信息?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let data ={                                           
                            name: this.form.name,
                            problem: this.problem,
                            phone: this.form.phone,
                            feedbimg1: this.originImg[0],
                            feedbimg2: this.originImg[1],
                            feedbimg3: this.originImg[2],                                                                    
                        }
                        // console.log(post);return;
                        feedbackmanage(data).then(res=>{   
                            this.problem = '';
                            this.form.name = ''; 
                            this.form.phone = '';                         
                            this.thumImg = [];
                            console.log(res)                         
                            if(res.data.code==200){                                
                                console.log(res)       
                                this.$message({
                                    type: 'success',
                                    message: '提交成功!'
                                });     
                                this.getData();                                                                                                                       
                            }
                            else if(res.data.code==400){
                                console.log(res)
                                this.$message({
                                    type: 'info',
                                    message: '提交失败！'
                                });  
                            }
                        },err=>{    
                            console.log(err)
                            this.$message({
                                type: 'info',
                                message: '提交失败！'
                            });  
                        }
                    )          
                })                                                                  
            }                                          
        },
        details(id){            
            this.$router.push({path:'/getFeedBack',query:{id:id}})//query传参从一个页面到另一个页面，由this.$route.query.id接收传来的参数
        },        
        del(index){            
            this.thumImg.splice(index,1); 
            // console.log(this.originImg)
            this.originImg.splice(index,1);   
            // console.log(this.originImg)                
        },
        //创建时
        getData(){                               
            showFeedBackManage().then(res =>{                
                if(res.data.code==200){
                    console.log(res)
                    this.litems = res.data.data;   
                    this.data = res.data.data;                                     
                }
                else if(res.data.code==400){
                    this.$message.error('报错了');
                }
                },err =>{
                    this.$message.error(err)
            })
        },
        onFileChange(e) {            
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)                
                return;
                this.createImage(files[0]);
        },
        createImage(file) {            
            let image = new Image();
            let reader = new FileReader();  
            let vm = this;            
            reader.onload = (e) => {                   
                vm.image = e.target.result;                                                                       
                // console.log(vm.image);  
                this.thumImg.push(vm.image)  
                let data = {
                    imageType: 1,
                    imgBase64: vm.image,                                   
                }      
                ImgUploads(data).then(res =>{
                    console.log(res)
                    if(res.data.result == 1){
                        // console.log(1)
                        this.img = res.data.data.originImg
                    }                       
                    // console.log(res.data.data.originImg,'img1');     
                    // console.log(this.img,'img');  
                    this.originImg.push(this.img)   
                    // console.log(this.originImg)                        
                })                                                                                                   
            };
            reader.readAsDataURL(file); 
                         
        },       
        
    },
    created(){
        this.getData();
    }
    
}
</script>

<style></style>
<style scoped>
#setfeedback >>> .el-input{
  width: 180px
}
.textarea textarea{
    border: 1px solid #E8E9EB;
    border-radius: 4px;
    width: 540px;   
    padding-left: 10px;
    padding-top: 10px;
}
.textarea{    
    width: 100%;
}
.title input::-webkit-input-placeholder{
   font-size: 14px;
}
.pic{
    float: left;
    background-color: #FFF;
    position: relative;
    width: 80px;
    height: 80px;    
    margin-right: 20px;
}
.pic-x{
    width: 20px;
    height: 20px;
    position: absolute;
    right: -10px;
    top: -10px;

}
.pic-x img{
    border: 1px solid #FFF;
    border-radius:  10px;
}
.input{          
    background-color: #FFF;    
}
.name label{        
    font-size: 14px;
    color: #454545;
    border: none;     
}
.way label{        
    font-size: 14px;
    color: #454545;
    border: none;    
}
.btn{
    width: 100%;
    box-sizing: border-box;    
    text-align: center;
}
.submit{
    width: 120px;
    height: 40px;
    font-size: 14px;
    background-color: #1491F2;    
    border-radius: 4px;
    color: #FFF;
}
.record{
    display: inline-block;
    margin-top: 64px;    
    font-size: 16px;
    color: #999;
}
.problems{
    background-color: #FFF;
    margin-top: 10px;
    overflow: hidden;
    padding-bottom: 25px;
}
.cont{
    padding-top: 20px;    
}
.problem{
    font-size: 14px;
    color: #333;
    overflow: hidden;
    display: block;
    float:left;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 20em;
    width: 80%;
    margin-right: 2%;
}
.unanswered{
    float: right;
    display: block;
    margin-right: 30px
    /* color: #1491f2; */
}
.answer{
    float: right;
    display: block;
    color: #1491f2;
    margin-right: 30px
}
a:link{
    color: #999;
}
.active{
    color: #1491f2 !important;
}

.border1{
    width: 100%;
    margin: auto;
    height: 1px;
    background-color: #E8E9EB;
}
.add{
    padding-top: 10px;
}
.title{
    height: 94px;
    background-color: #FFF;
    margin-top: 22px;
    padding-left: 24px;
}
.title lable{
    padding-left: 32px;
    padding-right: 40px;
    line-height: 94px;
    flex: 1;
    font-size: 32px;
    color: #454545;
    border: none;
    height: 100%;
}
.title input{
    border: none;
    height: 100%;
    flex: auto;
    width: 280px;
    -webkit-flex: auto;
    font-size: 28px;
    margin-left: 26px;
}
.describe{
    margin-bottom: 16px;
    padding-left: 24px;
    padding-top: 20px
}
.top-cont{
    background-color: #FFF;    
}
.top-pic{
    background-color: #FFF;
    overflow: hidden;    
    padding: 24px;
}
.underline{
    background-color: #E8E9EB;
    margin-top: 30px;
    width: 100%;
    height: 1px;
}
.form-control{
    opacity: 0;
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%; 
    margin-top: -30px;   
}
.up-pic{
    width: 100%;
    height: 100%;
}
/* 发票模态框 */
.invoice-model{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(127,127,127,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 专用发票 */
.invoice-content{
    width: 480px;
    height: 400px;
    background-color: #FFF;
    padding-left: 20px;
    overflow: auto;    
}
.invoice-content p{
    margin-bottom: 10px;
}
/* 普通发票 */
/* .ordinary-invoice-content{
    width: 350px;
    height: 150px;
    background-color: #FFF;
    padding-left: 20px;
    border-radius: 4px;    
    margin-bottom: 300px;
} */
.ordinary-invoice-content .text-2{
    border: none;
}
.text-1{
    color: #333;
    font-size: 16px;
    margin-top: 20px;
    position: relative;
}
.text-1 img{
    position: absolute;
    top: 5px;
    right: 20px;
    cursor: pointer;
}
.text-2{
    border-bottom: 1px solid #ccc;
    padding: 15px 0;
}
.text-2 p span{
    color: #999999;
}
.text-2 p .address{
    color: #333;
    float: left;
}
</style>

<style lang="stylus" scoped>
#setfeedback
  .el-header
    margin-left 1px
    .el-breadcrumb
      line-height 60px
  .el-main    
    justify-content flex-start
    display: flex;
    background-color: #FFF;
    margin-top: 10px;
    margin-left: 10px;
    height: 100vh;          
</style>
