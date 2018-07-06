<template>
    <div v-show="$store.state.chat.isSmall">
        <div :class="{'smallMessage': true,'showSmallMessage':$store.state.chat.isSmall }"  @click="showWinMessage">
            <img :src="$store.state.chat.activeUser.receiverHead">
            <span>{{$store.state.chat.activeUser.receiverName}}</span>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    showWinMessage() {
      this.$store.dispatch("show");
    }
  },
  mounted() {
    //    console.log(this.$store)
  }
};
</script>

<style scoped>
.smallMessage {
  position: fixed;
  bottom: 0;
  width: 200px;
  height: 60px;
  display: flex;
  left: 50%;
  margin-left: -100px;
  margin-bottom: -70px;
  align-items: center;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  padding: 0 15px;
  transition: 0.3s;
}
.showSmallMessage{
  margin-bottom: 0px;
}
img {
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 15px 0 0;
  flex: 0 0 40px;
}
span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
