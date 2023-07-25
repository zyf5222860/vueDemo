<template>
  <el-menu
    :default-openeds="['1', '3']"
    style="min-height: 100%; overflow-x: hidden"
    background-color="rgba(58, 131, 226, 0.911)"
    text-color="#fff"
    active-text-color="rgba(226, 159, 58, 0.911)"
    :collapse-transition="false"
    :collapse="isCollapse"
    router

  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img
        src="../assets/qiaodan.png"
        style="width: 30px; position: relative; top: 5px; right: 5px"
      />
      <b style="color: #d5e2e9" v-show="logoTextShow">后台管理系统</b>
    </div>
    <el-menu-item index="/">
      <template slot="title">
      <i class="el-icon-house"></i>
      <span slot="title">主页</span>
    </template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item index="/user">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>

      </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "Aside",
  props: {
    logoTextShow: Boolean,
    isCollapse: Boolean,
    msg: String
  },
};
</script>
<style></style>
