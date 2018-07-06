<template>
  <el-container id="shopAuthentication">
    <el-container>
      <transition name="el-fade-in" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>   
      </transition>
    </el-container>
  </el-container>
</template>