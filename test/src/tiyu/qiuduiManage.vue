<template>
  <div>
    <el-dialog title="球队信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="球队" :label-width="formLabelWidth">
          <el-input v-model="form.team" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="球员" :label-width="formLabelWidth">
          <el-input v-model="form.player" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键特点" :label-width="formLabelWidth">
          <el-input v-model="form.keyWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="信息" :label-width="formLabelWidth">
          <el-input v-model="form.info" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
    <div style="display: flex">
      <el-input
        style="width: 200px"
        suffix-icon="el-icon-search"
        placeholder="请输入球队搜索"
        v-model="team"
        clearable
      ></el-input>
      <el-input
        style="width: 200px"
        suffix-icon="el-icon-message"
        placeholder="请输入球员搜索"
        v-model="player"
        clearable
      ></el-input>
      <el-input
        style="width: 200px"
        suffix-icon="el-icon-position"
        placeholder="请输入关键字"
        v-model="keyWord"
        clearable
      ></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button class="ml-5" type="warning" @click="reset">清空</el-button>
    </div>
    <div style="margin: 10px 0; display: flex">
      <el-button type="primary" @click="add"
        >新增<i class="el-icon-circle-plus-outline"></i
      ></el-button>
      <!-- <el-button type="danger" @click="batchDelete" style="margin-left: 5px"
        >批量删除<i class="el-icon-remove-outline"></i
      ></el-button>
      <el-upload
        class="avatar-uploader"
        :action="ExcelPath"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        style="display: inline-block"
      >
        <el-button type="primary" accept="xlsx" style="margin-left: 5px"
          >导入<i class="el-icon-download"></i
        ></el-button>
      </el-upload>

    -->
    <el-button type="primary" @click="exp" style="margin-left: 5px"
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
      <!-- <el-table-column prop="id" label="ID" width="80"> </el-table-column> -->
      <el-table-column prop="team" label="球队" width="140">
      </el-table-column>
      <el-table-column prop="player" label="球员" width="140">
      </el-table-column>
      <el-table-column prop="keyWord" label="关键特点" width="140">
      </el-table-column>
      <el-table-column prop="info" label="个人信息" width="500">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)"
            >编辑<i class="el-icon-edit" style="margin-left: 5px"></i
          ></el-button>
          <!-- <el-button type="warning" @click="handleRemove(scope.row.id)"
            >删除<i class="el-icon-remove" style="margin-left: 5px"></i
          ></el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { queryTiyuInfo,queryPyTest } from "@/utils/api";
import request from "../utils/request";
export default {
  name: "qiuduiManage",
  components: {},
  props: {},
  data() {
    return {
      player: "",
      team: "",
      keyWord: "",
      info: "",
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      dialogFormVisible: false,
      ExcelPath: "",
      hearderBg:'',//样式
      form:{},
      formLabelWidth:'80px'
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      let form = {
        team: this.team,
        player: this.player,
        keyWord: this.keyWord,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      debugger;
      queryTiyuInfo(form)
        .then((res) => {
          console.log("查询===", res);
          this.isLoading = false;
          debugger;
          this.tableData = res.records;
          this.total = res.total;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    reset() {
      debugger
      this.form.team = "";
      this.form.player = "";
      this.form.keyWord = "";
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
       request.post("/info/saveOrUpdate", this.form).then((res) => {
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
          request.post("/user/" + id);
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
          request.post("/user/batch/delete", ids);
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
        this.player = "";
        this.team = "";
        this.keyWord = "";
    },
    exp(){
      var form = {};
      debugger;
      queryPyTest(form)
        .then((res) => {
           
          console.log("查询===", res);
          this.isLoading = false;
          this.tableData = res.records;
          this.total = res.total;
          this.$message({
            type: "success",
            message: "python导出成功!",
          });
        })
        .catch(() => {
          this.isLoading = false;
        });
      // window.open("http://localhost:5000/api/query")
    },
    beforeAvatarUpload(file){  //上传前回调
      console.log(file);
      const index = file.name.lastIndexOf('.');
      const XlsType = file.name.substring(index + 1);
      console.log("附件类型"+XlsType);  //截取小数点后的类型，然后数组的第一个就是类型
      const isExcel = XlsType === 'xlsx';  
      console.log("api地址"+this.apiUrl);  // 
       if(isExcel){
        return new Promise((resolve) => {
             this.$nextTick(() => {
             this.ExcelPath = this.apiUrl + "/user/import";  //我这里采用字符串拼接，动态重写文件上传路径，这里的路径是专门上传视频的。
               resolve();
             });
            })
      }else{
        this.$message({
          message: '上传格式不准确!请上传EXCEL文件',
          type: 'warning',
                  duration: 6000
        })
        return false;
      }
 
  },
  handleAvatarSuccess(response, file, fileList){   //上传成功后的回调函数
             console.log(response, file, fileList);
             this.$message({
          message: '上传成功',
          type: 'success',
                  duration: 6000
        })
        this.load();
       }
}
  
};
</script>
<style>
.hearderBg {
  background-color: rgba(182, 205, 208, 0.901) !important;
}
</style>
