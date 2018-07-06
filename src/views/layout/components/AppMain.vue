<template>
  <section class="app-main" id="app-main" style="min-height: 100%" :class="{'noHome': $route.name != 'home'}">
    <transition name="fade" mode="out-in">
      <keep-alive v-if="this.$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style lang="stylus">
.noHome
  margin-left 133px
.fade-enter-active, .fade-leave-active
  transition all 0.2s ease-in
.fade-enter, .fade-leave-to
  opacity 0
</style>
