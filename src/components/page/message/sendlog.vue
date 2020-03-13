<template>
  <div class="wrapper" v-loading="listLoading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="wrapper-content">
      <div class="box">
        <div class="box-title">
          <el-form ref="form" label-width="110px" class="demo-form-inline" :inline="true">
            <!-- <el-form-item label="导航名称：" >
                          <el-input v-model="gName" autocomplete="off" placeholder="导航名称"></el-input>
            </el-form-item>-->
            <el-form-item>
              <el-button type="info" icon="el-icon-delete" @click="batchdelete()">批量删除</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="box">
          <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" align="center" width="180"></el-table-column>
            <el-table-column prop="content" align="center" label="消息内容"></el-table-column>
            <el-table-column prop="failureResult" align="center" label="发送状态"></el-table-column>
            <el-table-column prop="createTime" align="center" label="操作时间"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <!-- <el-button type="primary" plain size="mini" @click="typeEadit(scope.row)">修改</el-button> -->
                <el-button type="danger" plain size="mini" @click="typeDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { msglog } from "../../../assets/js/message";

export default {
  data() {
    return {
      dialogFormVisible: false,
      userList: [],
      userId: [],
      alert: "",
      content: "",
      end_time: "",
      tableData: [],
      listLoading: false,
      pageSize: 10,
      total: 0,
      currentPage: 1,
      typeList: [
        { id: "0", title: "下单" },
        { id: "1", title: "付款" },
        { id: "2", title: "消息" }
      ],
      type: "",
      template: "",
      tempList: []
    };
  },
  created() {
    this.message();
  },
  methods: {
    // 删除
    typeDelete(item) {
      let url = `${msglog.logDelete}?id=${item.id}`;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .delete(url)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.message);
                this.message();
              }
            })
            .catch(err => {
              this.$message.error("服务器繁忙");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    message() {
      let url = `${msglog.logPage}?pageNo=${this.currentPage}&pageSize=${this.pageSize}`;
      this.axios.get(url).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.result.records;
          this.total = res.data.result.total;
        }
      });
    },
    // 批量删除
    batchdelete(item) {
      if (this.multipleSelection.length > 0) {
        let arrtemp = [],
          parm,
          url;
        this.multipleSelection.map(val => {
          arrtemp.push(val.id);
        });
        parm = arrtemp.join(",");
        url = `${msglog.logBach}?ids=${parm}`;
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            this.axios.delete(url).then(res => {
                if (res.data.code == 200) {
                  this.message();
                  this.$message.success(res.data.message);
                }
              }).catch(err => {
                this.$message.error("服务器繁忙");
              });
          }).catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message({
          message: "至少选择一条数据!",
          type: "warning"
        });
      }
    },
    // 分页
    handleSizeChange(size) {
      this.pageSize = size;
      this.message();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.message();
    },
    // 复选框
    handleSelectionChange(val){
        this.multipleSelection = val
    }
}
};
</script>
<style type="text/css" scoped>
</style>
