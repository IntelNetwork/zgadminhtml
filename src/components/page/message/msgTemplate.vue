<template>
  <div class="wrapper" v-loading="listLoading"  
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
      <div class="box">
          <div class="box-title">
              <el-form ref="form" label-width="110px" class="demo-form-inline" :inline="true">
                  <el-form-item label="消息类型：" >
                        <el-select  v-model="typeId" collapse-tags filterable clearable placeholder="请选择消息类型"  @change="search">
                            <el-option
                                v-for="item in codeList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" icon="el-icon-circle-plus-outline" class="addbutton"  @click="dialogFormVisible = true">添加</el-button>
                    </el-form-item>
              </el-form>
          </div>
          <div class="box">
                <el-table
                  :data="tableData"
                  border
                  style="width: 96%; margin:0 auto;">
                  <el-table-column
                    prop="id"
                    label="ID"
                    align="center"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="createBy"
                    label="账号"
                    align="center"
                    width="">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="验证码"
                    align="center"
                    width="">
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center"
                    width="">
                  </el-table-column>
                  <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    align="center"
                    width="">
                  </el-table-column>
                  <el-table-column
                    prop="busCode"
                    label="busCode"
                    align="center"
                    width="">
                  </el-table-column>
                  <!-- <el-table-column
                    prop="type"
                    align="center"
                    label="模板类型">
                     <template slot-scope="scope">
                        <el-tag type="warning" v-if="scope.row.type =='0'">订单模板</el-tag>
                        <el-tag type="danger" v-if="scope.row.type =='1'">消息模板</el-tag>
                     </template>
                  </el-table-column> -->
                  <el-table-column align="center" label="操作" width="200">
                      <template slot-scope="scope">
                          <el-button type="primary" plain size="mini" @click="typeEadit(scope.row)">修改</el-button>
                          <el-button type="danger" plain size="mini" @click="typeDelete(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
                 </el-table>
          </div>
          <div class="box-content">
             <el-dialog title="	添加对象" :visible.sync="dialogFormVisible">
                <el-form ref="form" label-width="160px" style="width:100%;">
                      <el-form-item label="模板内容：">
                        <el-input type="textarea" v-model="content" placeholder="在这填写你要的模板内容"></el-input>
                      </el-form-item>
                      <el-form-item label="消息类型:" >
                        <el-select  v-model="type" collapse-tags filterable clearable placeholder="模板类型" style="width:100%;">
                            <el-option
                                v-for="item in codeList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="业务编码:" >
                        <el-select  v-model="type1" collapse-tags filterable clearable placeholder="业务编码" style="width:100%;">
                            <el-option
                                v-for="item in typeList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                      <el-form-item>
                          <el-button type="primary" @click="confirm">确定</el-button>
                      </el-form-item>
                </el-form>
             </el-dialog>
          </div>
          <div class="box-content">
             <el-dialog title="修改" :visible.sync="dialogForm">
                <el-form ref="form" label-width="160px" style="width:460px;">
                    <el-form-item label="消息类型:" >
                        <el-select  v-model="type" collapse-tags filterable clearable style="width:100%;">
                            <el-option
                                v-for="item in codeList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="业务编码:" >
                        <el-select  v-model="type1" collapse-tags filterable clearable style="width:100%;">
                            <el-option
                                v-for="item in typeList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                      <el-form-item label="模板内容">
                        <el-input type="textarea" v-model="form.content" placeholder="在这填写你要的通知内容"></el-input>
                      </el-form-item>
                      <el-form-item>
                          <el-button type="primary" @click.native="eaditSure()">确定</el-button>
                      </el-form-item>
                </el-form>
             </el-dialog>
          </div>
      </div>
      <div>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
      </div>
      
    </div>  
  </div>

</template>
<script>
import {msgTemplate} from '../../../assets/js/message'
// import {user} from '../../../assets/js/Interface'
export default {
  data() {
    return {
      dialogFormVisible:false,
      dialogForm:false,
    //   userId: [],
      alert: "",
      content: "",
      content1:'',
      end_time: "",
      tableData:[],
      listLoading: false,
      pageSize:10,
      total:0,
      currentPage:1,
      type:"",
      type1:"",
      typeId:"",
      resource: '',
      form:{
          content:"",
          type:"",
          type1:"",
          id:""
      },
      gName:"",
      ruleForm:{
          name:"",
          grade:"",
          perms:"",
      },
      // 类型
      codeList:[],
      roleCode: "",
      typeList:[],
    };
  },
  created() {
    this.message();
    this.roleCodes();
    this.coding();
  },
  methods: {
    // 删除
    typeDelete(item){
        let url = `${msgTemplate.tempDelete}?id=${item.id}`
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.axios.delete(url).then(res => {
                  if (res.data.code == 200) {
                      this.$message.success(res.data.message);
                      this.message();
                  }
              }).catch(err => {
                  this.$message.error("服务器繁忙")
              })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });

    },
    // 分页查询
    message(){
      let url = `${msgTemplate.tempPage}`;
      this.axios.get(url).then(res=>{
          console.log(res.data,'分页查询')
          if(res.data.code==200){
            this.tableData = res.data.result.records;
            this.total = res.data.result.total;
          }
      })
    },
    // 消息类型
    roleCodes(){
        let url = `${msgTemplate.qq}`
        this.axios.get(url).then(res => {
                this.codeList = res.data;
        }).catch(err => {
            this.$message.error("服务器繁忙")
        })
    },
    //业务编码
    coding(){
        let url = `${msgTemplate.business}`
        this.axios.get(url).then(res => {
            this.typeList = res.data;
        }).catch(err => {
            this.$message.error("服务器繁忙")
        })
    },
    // 编辑
    editor(item){
      console.log(item)
        this.dialogFormVisible = true;
        this.ruleForm = item;
        let url =`${msgTemplate.qq}`;
    },
    // 添加
    confirm() {
        let url = `${msgTemplate.tempAdd}`;
        let data = {
            content: this.content,
            // type: this.content1,
            busCode: this.type1,
            msgType: this.type, //消息类型的字段
        }
        this.axios.post(url,data).then(res=>{
        // console.log(data)
            if(res.data.code==200){
                this.dialogFormVisible = false;
                this.$message.success(res.data.message);
                this.message();
            }
            
        })  
    },
    //条件查询
    search(){
        let url = `${msgTemplate.tempPage}?pageNo=${this.currentPage}&pageSize=${this.pageSize}`;
        let data = {
            msgType:this.typeId
        }
        this.axios.get(url,{params:data}).then(res=>{
            if(res.data.code==200){
                this.tableData = res.data.result.records; 
                this.total = res.data.result.total;
            }
        })
    },
    // 先查询
    typeEadit(item){
      console.log(item)
        this.form = item;
        this.dialogForm = true;
        this.form.id = item.id;
        this.form.content = item.content;
        this.form.type = item.busCode;
        this.form.type1 = item.msgType;
    },
    //编辑
    eaditSure(){
        let url = `${msgTemplate.tempEdit}`;
        this.axios.put(url,this.form).then(res=>{
           if(res.data.code==200){
               console.log(res.data,555)
                this.dialogForm = false;
                this.$message.success(res.data.message);
                this.message();
           }
        })
    },
    // 分页
      handleSizeChange(size){
          this.pageSize = size;
          this.adverManagement()
      },
      handleCurrentChange(val){
          this.currentPage = val;
          this.adverManagement()
      },
  }
};
</script>
<style type="text/css" scoped>
</style>
