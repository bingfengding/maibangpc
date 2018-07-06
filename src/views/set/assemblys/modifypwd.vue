<template>
    <div id="set">
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
                    <input type="text" v-model="confirmPwd" maxlength="6" oninput="this.value=this.value.replace(/[^0-9.]+/,'');">                    
                  </div>                                   
              </div>
              <div class="next">
                <el-button type="prinary" :plain="true" size="mini" @click="next">确认修改</el-button>
              </div>
          </div>            
        </div>
    </div>    
</template>
<script>
export default {
    data(){
        return{
            setPwd: '',
            confirmPwd: '',
            type: {
                pwd: 'password',
                src:require("../../../images/setImg/biyan.png"),
            }
        }
    },
    methods:{
        changeType(){
            this.type.pwd = this.type.pwd==='password'?'text':'password';
            this.type.src=this.type.src==require("../../../images/setImg/biyan.png")?require("../../../images/setImg/kaiyan.png"):require("../../../images/setImg/biyan.png");
        },
        next(){

        }
    }
}
</script>
<style scoped lang="stylus">
.main-content    
          width: 350px;
          height: 300px;
          background-color: #fff
          border 1px solid #CCC;  
          margin-bottom: 200px     
          color: #333;   
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