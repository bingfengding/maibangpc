<template>
    <div class="main-content">  
          <div class="top">手机号验证</div>      
          <div class="cent">
              <div class="phone">
                  <label>手机号：</label>
                  <input type="text" v-model="phone">                  
              </div>
              <div class="yan">
                  <div class="yancode">
                    <label>验证码：</label>
                    <input type="text" placeholder="请输入验证码" v-model="code" maxlength="6" oninput="this.value=this.value.replace(/[^0-9.]+/,'');">                    
                  </div>   
                  <div class="getcode">
                    <input class="button" :plain="true" type="button" value="获取验证码"  @click="getCode()" >
                  </div>               
              </div>
              <div class="next">
                <el-button type="prinary" :plain="true" size="mini" @click="next">下一步</el-button>
              </div>
          </div>            
        </div> 
</template>
<script>
export default {
    data(){
        return{
            phone: '',
            code: '',
            setTime:{
                countdown:60,
                t1:''
            },
            active: 'phone'
        }
    },
    methods:{
        getCode(){                               
            $(".yan .button").attr("disabled", true);
            this.setTime.t1 = setInterval(()=> {
                $(".yan .button").removeAttr("disabled");
            }, 60000); 
            this.setTime.t1 = setInterval(()=> {
              this.getTime() 
            }, 1000);                                  
            // this.$post(this.api.checkPhone,post)
            // .then(res =>{
            //     console.log(res);
            //     this.setTime.t1 = setInterval(()=> {
                
            //     }, 1000);
            // })
        },                        
        getTime(){
            if (this.setTime.countdown == 0) {
                $(".yan .button").removeAttr("disabled");
                $(".yan .button").val("重新获取");
                clearInterval(this.setTime.t1);
                this.setTime.countdown = 60;
                $(".yan .button").removeClass("act");
                return;
            }
            else {
                $(".yan .button").attr("disabled", true);
                $(".yan .button").val(this.setTime.countdown + "s");
                this.setTime.countdown--;
                $(".yan .button").addClass("act")
            }
        },   
        next(){
          if(this.code.length<6){
            this.$message.error('清输入正确的验证码！');
          }
          else{
            this.active="code"
          }          
        }    
    }
}
</script>

<style scoped lang="stylus">
.main-content
          width: 388px;
          height: 388px;
          background-color: #fff
          border 1px solid #CCC;  
          margin-bottom: 200px     
          color: #333;   
        .top
          background-color #f8f8f8;
          height: 40px;
          line-height: 40px;
          padding-left: 20px;
        .cent          
          margin-top: 50px;
          height: 40px;
          line-height: 40px;           
          .phone         
            background-color: #f8f8f8;
            padding-left: 20px;        
          input 
            border: none;
            height: 30px;
            font-size: 16px;
            background-color: #f8f8f8;  
          .yan 
            margin-top: 10px;
            background-color: #f8f8f8;
            padding-left: 20px; 
            justify-content space-between
            display: flex;            
            input 
              width: 100px;  
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
              width: 90px;
              background-color: #1491f2;
              color: #FFF;    
              font-size: 14px;
</style>