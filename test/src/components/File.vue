<template>
  <div>
    <div style="display: flex;">
      <el-input 
      style="width: 200px"
      suffix-icon="el-icon-search"
      placeholder="请输入用户名搜索"
      v-model="name"
      clearable
    ></el-input>
    <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
        <el-button class="ml-3"  type="warning" @click="reset">清空</el-button>
    </div>
      <div style="margin: 10px 0;display: flex;">
        <el-upload class="avatar-uploader"
        :action="FilePath"  
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess" 
         style="display: inline-block;" >
          <el-button type="primary"   
           accept="xlsx"  style="margin-left: 5px;"
          >上传<i class="el-icon-upload el-icon--right"></i
        ></el-button>
        </el-upload>
          <el-popconfirm class="ml-5" confirm-button-text="确定"  cancel-button-text="我再想想" icon="el-icon-info"
          icon-color="red" title="您确定批量删除这些数据吗?" @confirm="delBatch">
          <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>   
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
        <el-table-column prop="name" label="文件名称" width="300" align="center">
        </el-table-column>
        <el-table-column prop="type" label="文件类型" width="200" align="center">
        </el-table-column>
        <el-table-column prop="size" label="文件大小(kb)" width="155" align="center">
        </el-table-column>
        <el-table-column label="下载" align="center" width="120">
          <template slot-scope="scope"> 
            <el-button type="primary" @click="downLoad(scope.row.url)">下载</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center"> 
          <template slot-scope="scope"> 
          <el-button type="warning" @click="handleRemove(scope.row.id)"
          >删除<i class="el-icon-remove" style="margin-left: 5px"></i
        ></el-button> 
      </template>  
    </el-table-column>
          <el-table-column label="启用" width="120" align="center"> 
            <template slot-scope="scope"> 
              <el-switch v-model="scope.row.enable" active-color="#13ce66" inactive-color="#ccc" @change="changeEnable(scope.row)"></el-switch>
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
import Store from "@/components/Store.vue"; // 引用模块
import { url } from '../utils/url.js'
export default {
  name: "File",
  components:{
    Store
  },
  props: {
   },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      name: "",
      dialogFormVisible: false,
      form: {},
      hearderBg: "hearderBg",
      multipleSelection: [],
      apiUrl: Store.data().apiUrl,
      formLabelWidth: '80px',
      url:url,
      FilePath: ""
       
    
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request.get("/file/page", { 
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,  
            name: this.name 
          },
        })
        .then((res) => {
          debugger
          console.log(res);
          this.tableData = res.data.records;
          this.total = res.total;
        });
    },
    del(id){
      request.delete("/file/" +id) 
        .then((res) => {
          if (res) {
          this.$message.success("删除成功");
          this.load();
        } else {
          this.$message.success("删除失败");
          this.load();
        }
        });
    },
    handleFileUploadSuccess(){
    
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

    //删除
    handleRemove(id) {  //此处为假删除。只更新状态
      debugger;
      let ids = [id];
      this.$confirm("此操作会批量删除这些信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
          request.post("/file/del/batch", ids).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.message);
        }  else{
          this.$message.error(res.message);
        }
        this.load();
      });
    })
    },
    //全选
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    //更新启用状态
    changeEnable(row){
      let form = {
        id: row.id,
        name: row.name,
        type: row.type,
        size: row.size,
        url: row.url,
        isDel: row.isDel,
        enable: row.enable,
        md5: row.md5
      }
      request.post("/file/updateFileStatus", form).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.message);
        }  
      });
      
    },

    //批量删除
    delBatch() {
      let ids = this.multipleSelection.map((v) => v.id);
      console.log(ids);
      this.$confirm("此操作会批量删除这些信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request.post("/file/del/batch", ids);
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
    downLoad(url){
      window.open(url)
    },
    reset(){
        this.name = "";
    
    },
    beforeAvatarUpload(file){  //上传前回调
      debugger
      console.log(file);
      const index = file.name.lastIndexOf('.');
      const fileType = file.name.substring(index + 1);
      console.log("附件类型"+fileType);  //截取小数点后的类型，然后数组的第一个就是类型
      
      console.log("api地址"+this.apiUrl);  // 
        return new Promise((resolve) => {
             this.$nextTick(() => {
             this.FilePath = this.apiUrl + "/file/upload";  //我这里采用字符串拼接，动态重写文件上传路径，这里的路径是专门上传视频的。
               resolve();
             });
            })
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
  