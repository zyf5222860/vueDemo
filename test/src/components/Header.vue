<template>
  <div style="font-size: 12px; line-height: 60px; display: flex">
    <div style="flex: 1;display: -webkit-box;" >
      <span
        :class="collapseBtnClass"
        style="cursor: pointer; font-size: 18px"
        @click="collapse"
      ></span>
      <el-breadcrumb
        separator="/"
        style="display: inline-block; margin-left: 15px"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-show="showBread">{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown style="width: 70px; cursor: pointer">
      <div style="display: inline-block;" class="user_info">
        <img :src="user.avatarUrl" alt="">
        <span>{{user.nickname}}</span>
        <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>
      
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link to="/person">
            个人信息
          </router-link>
        </el-dropdown-item>
        <el-dropdown-item>
         <span style="text-decoration: none;" @click="layout">退出</span> 
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    isCollapse: Boolean,
    collapseBtnClass: String,
    collapse: Function,
    user: Object
  },
  computed: {
    getUser(){
      debugger;
      return this.$store.getters.user.data;//
    }
  },
  watch: {
    '$route' (to, from) {
      debugger;
      if (to.path !== '/' && to.path !== '/home') {
        this.showBread = true
        console.log(this.showseparator)
      } else {
        this.showBread = false
        this.showseparator = 'HEY'
        console.log(this.showseparator)
      }
    }
  },

  data() {
    return {
      // user: localStorage.getItem("store") ? JSON.parse(localStorage.getItem("store")) : {},
      showBread: false
    
    };
  },
  methods: {
    layout(){
      debugger;
      localStorage.removeItem("token");
      this.$message.success('登出成功');
      this.$router.push('/');
    }
  },
};
</script>
<style lang="scss" scoped>
.user_info{
  img {
      width: 30px;
      height: 30px;
      margin-left: -30px;
      margin-bottom: -8px;
  }
  span {
    margin-left: 5px;
  }
}

</style>
