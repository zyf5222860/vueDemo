<template>
  <el-container style="min-height: 100vh">
    <el-aside
      :width="sideWidth + 'px'"
      style="
        background-color: rgb(238, 241, 246);
        box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
      "
    >
      <Aside :logoTextShow="logoTextShow" :isCollapse="isCollapse"> </Aside>
    </el-aside>

    <el-container style="height: 100%">
      <el-header style="border-bottom: 1px solid #ccc">
        <Header
          :collapseBtnClass="collapseBtnClass"
          :collapse="collapse"
          :user="user"
        />
      </el-header>

      <el-main>
        <router-view @refreshUser="getUser"> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import request from "../utils/request";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import User from "@/components/User";
import { queryPersonInfo } from "@/utils/api";

export default {
  name: "HomeView",
  components: {
    //封装页面组件
    HelloWorld,
    Aside,
    Header,
    User,
  },

  data() {
    return {
      collapseBtnClass: "el-icon-s-fold",
      isCollapse: false,
      sideWidth: 201,
      logoTextShow: true,
      dialogFormVisible: false,
      user: {},
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        //收缩边框
        this.sideWidth = 64;
        this.collapseBtnClass = "el-icon-s-unfold";
        this.logoTextShow = false;
      } else {
        //展开
        this.sideWidth = 200;
        this.collapseBtnClass = "el-icon-s-fold";
        this.logoTextShow = true;
      }
    },
    getUser() {
      debugger;
      let username = localStorage.getItem("store")
        ? JSON.parse(localStorage.getItem("store")).username
        : "";
      console.log("用户名" + username);
      queryPersonInfo(username).then((res) => {
        console.log("个人信息查询===", res);
        if (res.code == 0) {
          this.user = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>
<style></style>
