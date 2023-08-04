<template>
  <el-card style="width: 400px">
    <el-form :model="form" label-width="70px" size="small">
      <el-form-item label="用户名">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import request from "../utils/request";
import { queryPersonInfo, saveOrUpdate } from "@/utils/api";
export default {
  name: "Person",
  data() {
    return {
      user: localStorage.getItem("store")
        ? JSON.parse(localStorage.getItem("store")).userInfo.data
        : {},
      form: {},
    };
  },
  created() {
    queryPersonInfo(this.user.username)
      .then((res) => {
        console.log("个人信息查询===", res);
        debugger;
        if (res.code == 0) {
          this.form = res.data;
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(() => {
        this.isLoading = false;
      });
  },
  methods: {
    save() {
      saveOrUpdate(this.form)
        .then((res) => {
          console.log("保存或更新===", res);
          debugger;
          if (res.code == 0) {
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
<style></style>
