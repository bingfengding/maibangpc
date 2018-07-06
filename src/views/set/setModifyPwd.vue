<template>
  <el-container id="setModifyPwd">
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
          设置密码
        </el-breadcrumb-item>        
      </el-breadcrumb>
    </el-header>
    <el-main>                   
        <div class="main-content">                  
          <div class="cent">
              <div class="phone">
                  <div>
                        <label>设置密码：</label>
                        <input  v-model="setPwd" :type="this.type.pwd">
                  </div>                    
                  <div class="ionc" @click="changeType()">
                    <img :src="this.type.src" width="100%">
                </div>                
              </div>
              <div class="yan">
                  <div class="yancode">
                    <label>再次确认：</label>
                    <input type="password" v-model="confirmPwd" >                    
                  </div>                                   
              </div>
              <div class="next">
                <el-button type="prinary" :plain="true" size="mini" @click="next">确认修改</el-button>
              </div>
          </div>            
        </div>
    
    </el-main>
  </el-container>
</template>
<script>
import {editPassWord} from '@/api/set/setmanage'
export default {
    data(){
        return{
            setPwd: '',
            confirmPwd: '',
            type: {
                pwd: 'password',
                src:require("../../images/setImg/biyan.png"),
            }
        }
    },
    methods:{
        changeType(){
            this.type.pwd = this.type.pwd==='password'?'text':'password';
            this.type.src=this.type.src==require("../../images/setImg/biyan.png")?require("../../images/setImg/kaiyan.png"):require("../../images/setImg/biyan.png");
        },
        next(){
            var set = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
            if(this.setPwd.length <8 ){     
                this.$message.error('密码不能小于8位');          
                return false;
            }
            else if(!set.test(this.setPwd)){
               this.$message.error('密码必须包含数字和字母'); 
                return false;
            }
            else{
                let data = {
                    newpwd: this.setPwd,
                    surepwd: this.confirmPwd              
                }                
                editPassWord(data).then(res=>{
                    console.log(res);                    
                    if(res.data.code==200){
                        if(res.data.data=="两次输入的密码不一样"){
                            this.$message.error('两次输入的密码不一样'); 
                        }
                        else if(res.data.data=='新密码不能和旧密码一样'){
                            this.$message.error('新密码不能和旧密码一样'); 
                        }
                        else if(res.data.data=="修改密码成功"){
                            this.$message({
                                message: res.data.data,
                                type: 'success'
                            });
                            this.$router.push({path:'/login'})
                        }
                    }                    
                },err=>{
                    this.$message.error(err);
                })
            }
        }
    }
}
</script>
<style scoped lang="stylus">
.el-header
    margin-left 1px
.el-breadcrumb
    line-height 60px
.el-main
    background-color: #FFF;
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    justify-content center
    align-items: center;
    height: 100vh
    .main-content    
          width: 350px;
          height: 300px;
          background-color: #fff
          border 1px solid #CCC;              
          color: #333;   
          margin-bottom: 200px
        .top
          background-color #f8f8f8;
          height: 40px;
          line-height: 40px;          
        .cent          
          margin-top: 20px;
          height: 68px;
          line-height: 68px;           
          .phone                     
            margin-left: 20px;        
            border-bottom: 1px solid #CCC;
            justify-content space-between;
            display: flex;
            .ionc                
                width: 20px;
                margin-right: 20px;
          input 
            border: none;
            height: 30px;
            font-size: 16px;              
          .yan 
            height: 68px;
            line-heihgt: 68px;
            border-bottom: 1px solid #ccc;                        
            margin-left: 20px; 
            justify-content space-between
            display: flex;                        
            .getcode 
              input 
                margin-right: 10px; 
                border: 1px solid #1491f2;
                color: #1491f2;
                border-radius: 4px;
          .next
            width: 100%;
            text-align: center;
            margin-top: 50px;
            button 
              width: 310px;
              height: 40px;
              border-radius: 4px;
              background-color: #1491f2;
              color: #FFF;    
              font-size: 14px;
</style>