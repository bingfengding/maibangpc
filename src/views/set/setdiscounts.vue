<template>
        <div id="goods">
            <div v-for="(item,index) in list" :key="index" class="act_item">  
                <h1></h1>                  
                <div class="act_info">                      
                    <div class="time">倒计时：{{ item.djs }}</div>  
                    <div class="clear"></div>  
                </div>  
            </div>
        </div>
</template>
<script>  
function InitTime(endtime){  
    var dd,hh,mm,ss = null;  
    var time = parseInt(endtime) - new Date().getTime();  
    if(time<=0){  
        return '结束'  
    }else{  
        dd = Math.floor(time / 60 / 60 / 24);  
        hh = Math.floor((time / 60 / 60) % 24);  
        mm = Math.floor((time / 60) % 60);  
        ss = Math.floor(time  % 60);  
        var str = dd+"天"+hh+"小时"+mm+"分"+ss+"秒";  
        return str;  
    }  
}  
export default {  
    data () {  
    return {  
            active: 'tab-container1',  
            pinkFont:true,  
            // 上拉刷新、下拉加载  
            allLoaded: false, //如果为true,禁止上拉刷新  
            autoFill: false, //取消自动填充，  
            list: [
                {time:"32569934"},
                {time:"32569934"},
                {time:"32569934"},  
                {djs:''},                    
            ],  
        }  
      },       
    mounted() {  
        setInterval( ()=> {  
            for (var key in this.list) {  
                var aaa = parseInt( this.list[key].time );                                 
                    var dd = Math.floor(aaa / 1000 / 60 / 60 / 24);  
                    var hh = Math.floor((aaa / 1000 / 60 / 60) % 24);  
                    var mm = Math.floor((aaa / 1000 / 60) % 60);  
                    var ss = Math.floor((aaa / 1000) % 60);                  
                this.list[key].djs = dd + "天" + hh + "小时" + mm + "分" + ss + "秒";  
            }  
        }, 1000);  
    },  
    methods: {  
  
    }  
}  
</script>  
