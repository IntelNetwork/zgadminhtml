<template>
  <div class="wrapper"
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
      <div class="box">
          <div class="box-title">
              <h3>订单管理</h3>
          </div>
          <div class="sel-search">
            <el-form ref="form" label-width="120px" class="demo-form-inline" :inline="true">
                <el-form-item label="订单名称：">
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item> 
                <el-form-item>
                    <el-button type="primary" @click="getPermissionByRole()">查询</el-button> 
                </el-form-item>
                <el-form-item>
                    <!-- <el-button  @click="dialogTableVisible = true" type="success" >添加任务</el-button> -->
                    <el-button  @click="removed()" type="info" >批量删除</el-button>
                </el-form-item>
            </el-form>
          </div>
          <div class="table">
              <el-table
                :data="tableData"
                border
                @selection-change="handleSelectionChange"
                style="width: 100%">
                 <el-table-column
                    type="selection"
                    align="center"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="ID"
                    align="center"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="createBy"
                    label="创建人"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="sn"
                    label="订单编号"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="taskMemberId"
                    label="更新人"
                    align="center">
                </el-table-column>
                
                <el-table-column
                    prop="memberName"
                    label="发布时间"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="payStatus"
                    label="支付状态"
                    align="center">

                    <template  slot-scope="scope">
                        <span v-if="scope.row.payStatus==0">未支付</span>
                        <span v-if="scope.row.payStatus==1" :style="{color:'green'}">已支付</span>
                        <span v-if="scope.row.payStatus==2" :style="{color:'red'}">支付异常</span>
                    </template>

                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="180px"
                    >
                    <template  slot-scope="scope">
                        <el-button @click="editor(scope.row)" type="text" size="small" class="deleat-a">编辑</el-button>
                        <el-button @click="deleted(scope.row)" type="text" size="small" class="deleat">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加 -->
            <el-dialog title="添加任务" :visible.sync="dialogTableVisible">
                <el-form :model="ruleForm1" status-icon  ref="ruleForm" label-width="140px" class="demo-ruleForm">
                    <el-form-item label="任务描述" prop="des">
                        <el-input type="text" v-model="ruleForm1.des" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="任务止价" prop="endPrice">
                        <el-input type="text" v-model="ruleForm1.endPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="行业名称" prop="industry">
                        <el-input type="text" v-model="ruleForm1.industry"></el-input>
                    </el-form-item>
                    <el-form-item label="行业ID" prop="industryId">
                        <el-input type="text" v-model="ruleForm1.industryId"></el-input>
                    </el-form-item>
                    <el-form-item label="可否议价" prop="name">
                        <el-select  collapse-tags filterable clearable placeholder="请选择状态">
                            <el-option
                                v-for="item in codeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="会员ID" prop="memberId">
                        <el-input type="text" v-model="ruleForm1.memberId"></el-input>
                    </el-form-item>	
                    <el-form-item label="会员名称" prop="memberName">
                        <el-input type="text" v-model="ruleForm1.memberName"></el-input>
                    </el-form-item>
                    <el-form-item label="任务名称" prop="name">
                        <el-input type="text" v-model="ruleForm1.name"></el-input>
                    </el-form-item>
                    <el-form-item label="任务期限,单位(月)" prop="period">
                        <el-input type="text" v-model="ruleForm1.period"></el-input>
                    </el-form-item>
                    <el-form-item label="技能要求" prop="skillsRequired">
                        <el-input type="text" v-model="ruleForm1.skillsRequired"></el-input>
                    </el-form-item>
                    <el-form-item label="任务起价格" prop="startPrice">
                        <el-input type="text" v-model="ruleForm1.startPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="任务类型编码" prop="typeCode">
                        <el-input type="text" v-model="ruleForm1.typeCode"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="" @click="addResources('ruleForm')">添加</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog title="修改任务" :visible.sync="modification">
                <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="140px" class="demo-ruleForm">
                    <el-form-item label="任务描述" prop="des">
                        <el-input type="text" v-model="ruleForm.des" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="任务止价" prop="endPrice">
                        <el-input type="text" v-model="ruleForm.endPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="行业名称" prop="industry">
                        <el-input type="text" v-model="ruleForm.industry"></el-input>
                    </el-form-item>
                    <el-form-item label="行业ID" prop="industryId">
                        <el-input type="text" v-model="ruleForm.industryId"></el-input>
                    </el-form-item>
                    <el-form-item label="可否议价" prop="name">
                        <el-select v-model="form.isbar"  collapse-tags filterable clearable placeholder="请选择状态">
                            <el-option
                                v-for="item in codeList"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="会员ID" prop="memberId">
                        <el-input type="text" v-model="ruleForm.memberId"></el-input>
                    </el-form-item>	
                    <el-form-item label="会员名称" prop="memberName">
                        <el-input type="text" v-model="ruleForm.memberName"></el-input>
                    </el-form-item>
                    <el-form-item label="任务名称" prop="name">
                        <el-input type="text" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="任务期限,单位(月)" prop="period">
                        <el-input type="text" v-model="ruleForm.period"></el-input>
                    </el-form-item>
                    <el-form-item label="技能要求" prop="skillsRequired">
                        <el-input type="text" v-model="ruleForm.skillsRequired"></el-input>
                    </el-form-item>
                    <el-form-item label="任务起价格" prop="startPrice">
                        <el-input type="text" v-model="ruleForm.startPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="任务类型编码" prop="typeCode">
                        <el-input type="text" v-model="ruleForm.typeCode"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="" @click="submitForm('ruleForm')">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
          </div>
          <!-- 分页 -->
          <div>
               <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="current"
                    :page-sizes="[10,20,100, 200, 300, 400]"
                    :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
          </div>
      </div>
    </div>  
  </div>

</template>
<script>
import { order } from '../../../assets/js/industry'
export default {
  data() {
    return {
      tableData:[],
      form:{
        isbar:''
           
      },
      input:"",
      dialogTableVisible:false,
      dialogFormVisible:false,
      modification:false,
        ruleForm1:{
            isBargain:"",
            des:"",
            endPrice:"",
            name:"",
            industry:"",
            industryId:"",
            memberId:"",
            memberName:"",
            period:"",
            skillsRequired:"",
            startPrice:"",
            typeCode:"",
            typeName:"",
            updateBy:"",
        },
        status:"",
        ruleForm:{},
        multipleSelection:[],
        current:1,
        pages:1,
        size:10,
        total:0,
        codeList:[
            {
                id: '0',
                label: '可议价'
            },
            {
                id: '1',
                label: '不可议价'
            }
        ],
        value:""
    };
  },
  created() {
      this.getPermissionByRole()
  },
  methods: {
    //   分页查询
    getPermissionByRole(){
        let url =`${order.page}?pageNo=${this.current}&pageSize=${this.size}`;
        let data = {
            name: this.input
        }
        this.axios.get(url,{params: data}).then(res=>{
            console.log(res.data)
            if(res.data.code==200){
                this.tableData = res.data.result.records;
                this.total = res.data.result.total;
            }else{
                this.$message.error(res.data.message);
                
            }
        }).catch(err=>{
            this.$message.error("服务器繁忙");
        })
    },
    getStatus(){

    },
    // 删除权限
    deleted(item){
        let urls = `${order.delect}?id=${item.id}`
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete(urls).then(res=>{
              if(res.data.code==200){
                  this.$message.success(res.data.message);
                  if(this.tableData ==[]){
                   this.current=this.current-1 
                }
                  this.getPermissionByRole();
              }
          }).catch(err=>{
              this.$message.error("服务器繁忙");
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 编辑
    editor(item){
        this.modification = true;
        this.ruleForm = item;
        console.log(item)
    },
    // 提交编辑
    submitForm(){
        let urls = `${order.editor}`;
        this.axios.put(urls,this.ruleForm).then(res=>{
            if(res.data.code==200){
                this.modification = false;
                this.getPermissionByRole();
                 this.$message.success(res.data.message)

            }else{
                this.$message.error(res.data.message)
            }
        }).catch(err=>{
            this.$message.error("服务器繁忙")
        })
    },
    // 确定添加
    addResources(){
        this.axios.post(`${order.add}`,this.ruleForm1).then(res=>{
            // console.log(res.data)
            if(res.data.code==200){
                this.dialogTableVisible=false;
                this.ruleForm1.name = "";
                this.getPermissionByRole();
            }
        }).catch(err=>{
            this.$message.error("服务器繁忙")
        })
    },
    // 每页多少条
    handleSizeChange(size) {
        this.size = size;
        this.getPermissionByRole()
        // console.log(`每页 ${val} 条`);
    },
    // 当前页
    handleCurrentChange(val) {
        this.current = val;
        this.getPermissionByRole()
        // console.log(`当前页: ${val}`);
    },
    // 多选框
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 批量删除
    removed(){
        if (this.multipleSelection.length > 0) {
        let arrtemp = [], parm, url;
        this.multipleSelection.map((val) => {
          arrtemp.push(val.id);
        });
        parm = arrtemp.join(",");
        url = `${order.batchdelect}?ids=${parm}`;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  this.axios.delete(url).then((res) => {
                    if (res.data.code == 200) {
                        this.getPermissionByRole();
                        this.$message.success(res.data.message);
                    }
                }).catch(err=>{
                    this.$message.error("服务器繁忙");
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });

      }
      else {
        this.$message({
          message: '至少选择一条数据!',
          type: 'warning'
        });
      }
    }
  }
};
</script>
<style type="text/css" scoped>
    .table {
        width: 95%;
        min-width: 1100px;
        margin: 0 auto;
    }
    .deleat-a>>>span {
        color: red;
    }
    .deleat>>>span{
        color: #666
    }
    .demo-ruleForm {
        width: 350px;
        margin-left: 14%;
    }
    .box-add {
        width: 100%;
        height: 60px;
    }
    .add-button {
        float: right;
        margin-right: 100px;
    }
    .el-input{
        width: 200px;
    }
</style>
