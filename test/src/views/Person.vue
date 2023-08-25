<template>
  <el-card style="width: 400px">
    <el-upload
      style="text-align: center"
      class="avatar-uploader"
      :action="FilePath"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-upload-icon"></i>
    </el-upload>
    <el-form :model="form" label-width="70px" size="small">
      <el-form-item label="用户名">
        <el-input
          v-model="form.username"
          disabled
          autocomplete="off"
        ></el-input>
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
import Store from "@/components/Store.vue"; // 引用模块
export default {
  name: "Person",
  components: {
    Store,
  },
  data() {
    return {
      user: localStorage.getItem("store")
        ? JSON.parse(localStorage.getItem("store"))
        : {},
      form: {},
      FilePath: "",
      apiUrl: Store.data().apiUrl,
    };
  },
  created() {
    this.getUser().then((res) => {
      this.form = res;
    });
  },
  methods: {
    async getUser() {
      let res = await queryPersonInfo(this.user.username).then((res) => {
        console.log("个人信息查询===", res);
        if (res.code == 0) {
          return res.data;
        } else {
          this.$message.error(res.message);
        }
      });
      return res;
    },

    save() {
      saveOrUpdate(this.form)
        .then((res) => {
          console.log("保存或更新===", res);
          debugger;
          if (res.code == 0) {
            this.$message.success(res.message);
            //触发父级方法
            this.$emit("refreshUser");
            //             //更新浏览器存储的用户信息
            //             debugger;
            //             this.getUser().then(res => {
            //               debugger;
            //     res.token = JSON.parse(localStorage.userToken).token
            //     localStorage.setItem("store",JSON.stringify(res))
            //  })
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    //上传前回调
    beforeAvatarUpload(file) {
      debugger;
      console.log(file);
      const index = file.name.lastIndexOf(".");
      const fileType = file.name.substring(index + 1);
      console.log("附件类型" + fileType); //截取小数点后的类型，然后数组的第一个就是类型

      console.log("api地址" + this.apiUrl); //
      return new Promise((resolve) => {
        this.$nextTick(() => {
          this.FilePath = this.apiUrl + "/file/upload"; //我这里采用字符串拼接，动态重写文件上传路径，这里的路径是专门上传视频的。
          resolve();
        });
      });
    },
    handleAvatarSuccess(res) {
      this.form.avatarUrl = res;
    },
  },
};
</script>
<style>
.avatar-uploader {
  text-align: center;
  padding-bottom: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-upload-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 158px;
  height: 158px;
  display: block;
}
</style>
