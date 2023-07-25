<template>
  <div>
    <el-dialog title="个人信息" :visible.sync="dialogFormVisible" width="30%">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>

 
      <div>
        <el-input
          style="width: 200px"
          suffix-icon="el-icon-search"
          placeholder="请输入名称搜索"
          v-model="username"
          clearable
        ></el-input>
        <el-input
          style="width: 200px"
          suffix-icon="el-icon-message"
          placeholder="请输入邮箱搜索"
          v-model="email"
          clearable
        ></el-input>
        <el-input
          style="width: 200px"
          suffix-icon="el-icon-position"
          placeholder="请输入地址搜索"
          v-model="address"
          clearable
        ></el-input>
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
        <el-button class="ml-5" type="warning" @click="reset">清空</el-button>
      </div>
      <div style="margin: 10px 0">
        <el-button type="primary" @click="add"
          >新增<i class="el-icon-circle-plus-outline"></i
        ></el-button>
        <el-button type="danger" @click="batchDelete"
          >批量删除<i class="el-icon-remove-outline"></i
        ></el-button>
        <el-button type="primary"
          >导入<i class="el-icon-download"></i
        ></el-button>
        <el-button type="primary"
          >导出<i class="el-icon-upload2"></i
        ></el-button>
      </div>

      <el-table
        :data="tableData"
        border
        stripe
        class="mt-10"
        :header-cell-class-name="hearderBg"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="80"> </el-table-column>
        <el-table-column prop="username" label="用户名" width="140">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="140">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" @click="handleEdit(scope.row)"
              >编辑<i class="el-icon-edit" style="margin-left: 5px"></i
            ></el-button>
            <el-button type="warning" @click="handleRemove(scope.row.id)"
              >删除<i class="el-icon-remove" style="margin-left: 5px"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

    <div class="block" style="padding: 10px 0">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";
export default {
  name: "User",
  props: {
   },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      username: "",
      email: "",
      address: "",
      dialogFormVisible: false,
      form: {},
      hearderBg: "hearderBg",
      multipleSelection: []
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request.get("/user/page", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            username: this.username,
            email: this.email,
            address: this.address,
          },
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.records;
          this.total = res.total;
        });
    },
    handleSizeChange(pageSize) {
      console.log(`每页 ${pageSize} 条`);
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      console.log(`当前页: ${pageNum}`);
      this.pageNum = pageNum;
      this.load();
    },
    add() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    //新增用户接口
    save() {
       request.post("/user/saveOrUpdate", this.form).then((res) => {
        if (res) {
          this.$message.success("保存成功");
          this.load();
        } else {
          this.$message.success("保存失败");
          this.load();
        }
        this.form = {};
        this.dialogFormVisible = false;
      });
    },
    //编辑
    handleEdit(row) {
      console.log(row);
      this.form = row;
      this.dialogFormVisible = true;
    },
    //删除
    handleRemove(id) {
      this.$confirm("此操作会删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request.POST("/user/" + id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.load();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //全选
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },

    //批量删除
    batchDelete() {
      let ids = this.multipleSelection.map((v) => v.id);
      console.log(ids);
      this.$confirm("此操作会批量删除这些信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.request.post("/user/batch/delete", ids);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.load();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消批量删除",
          });
        });
    },
    reset(){
        this.username = "";
        this.address = "";
        this.email = "";
    }
  }
};
</script>
<style>
.hearderBg {
  background-color: rgba(182, 205, 208, 0.901) !important;
}
</style>
  