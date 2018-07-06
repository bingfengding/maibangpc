<template>
    <div>
        <div :class="{'smallwebChat': true,'showSmallWebChat':!$store.state.chat.isShowChat}"  @click.stop="openChat">
            <div class="logo">
               <img :src="$store.state.usersModule.userAvatar ? this.$store.state.usersModule.userAvatar : userAvatar">
            </div>
            <p>通知中心</p>
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        userAvatar(){
           return  localStorage.getItem("userAvatar")
        }
    },
    methods:{
        openChat(){ 
            this.$store.dispatch('openWebChat')
        }
    }
}
</script>

<style scoped>
 .smallwebChat{
    position: fixed;
    right: 0;
    bottom: 0;
    width: 150px;
    height: 60px;
    display: flex;
    align-items: center;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    background: white;
    padding: 0 10px;
    cursor: pointer;
    transition: 0.4s;
    margin-right: -160px;
}
.showSmallWebChat{
    margin-right: 0;
}
.smallwebChat .logo img{
    width:40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
}
</style>
