<template>
    <div class="login-wrap">
        <div class="login-container">
          <el-form
            autocomplete="on"
            label-position="left"
            label-width="0px"
            class="card-box login-form"
            :model="ruleForm"
            ref="ruleForm"
          >
            <h3 class="title">后台管理系统</h3>
            <el-form-item prop="username">
              <span class="svg-container svg-container_login">
                <!-- <svg-icon icon-class="user" /> -->
                <i class="el-icon-lx-people"></i>
              </span>
              <el-input
                name="username"
                type="text"
                v-model="ruleForm.username"
                autocomplete="on"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item prop="password">
              <span class="svg-container">
                <!-- <svg-icon icon-class="password"></svg-icon> -->
                <i class="el-icon-lx-lock"></i>
              </span>
              <el-input
                name="password"
                :type="pwdType"
                @keyup.enter.native="submitForm('ruleForm')"
                v-model="ruleForm.password"
                autocomplete="on"
                placeholder="请输入密码"
              ></el-input>
              <!-- <span class="show-pwd" @click="showPwd">
                <svg-icon icon-class="eye" />
              </span> -->
            </el-form-item>
            <el-checkbox style="margin-bottom:20px;margin-left:15px;" v-model="checkeds">记住密码</el-checkbox>
            <el-form-item>
              <el-button
                type="primary"
                style="width:100%;"
                :loading="loading"
                @click="submitForm('ruleForm')"
              >立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
    <!-- <canvas id="canvas" height="100%;"></canvas> -->
    <el-carousel class="login_banner">
      <el-carousel-item v-for="item in images" :key="item.src">
        <img :src="item.src" alt class="imgm" />
      </el-carousel-item>
    </el-carousel>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import drag from "../common/drag";
import { errors } from "../../router/index";
import { homeRouter } from "../../assets/js/Interface"
    export default {
        data: function(){
            return {
                cheak:false,
                cheakPass:true,
                ruleForm: {
                    username: '',
                    password: ''
                },
                images: [
                  {
                    src: require("../../assets/img/a.jpg")
                  },
                  {
                    src: require("../../assets/img/b.jpg")
                  },
                  {
                    src: require("../../assets/img/c.jpg")
                  }
                ],
                loading: false,
                pwdType: "password",
                checkeds: true,
                drawType:"",
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        components: {
            // drag,
        },
        computed: {
            ...mapState(["loginoff","token"]),
        },
        methods: {
            ...mapMutations(["seinfo", "savemenu", "savetoken","savauseinfo","saverouters","setrouteoff","setmenu"]),
            // checking(val)
            // {
            //   this.cheak=val;
            //   this.cheakPass=true;
            // },
          /**主装路由信息***/
          assembleRouters(routers){
            homeRouter.children = [];
            if(typeof(routers) != 'undefined' 
              && routers.length >0){
                routers.map((oldRouter,index,arr)=>{
                    /**直接路由
                    */
                    if("1" == oldRouter.route){
                        let routerObj = {
                                  path: oldRouter.redirect,
                                  component: () => import('@/'+oldRouter.component),
                                  componentName:oldRouter.component,
                                  meta:oldRouter.meta,
                                  children: []
                            };
                        homeRouter.children.push(routerObj);
                    }
                    if("0" == oldRouter.route){
                       let routerObj = {
                                  path:oldRouter.redirect,
                                  meta:oldRouter.meta,
                                  component: () => import('@/'+oldRouter.component),
                                  componentName:oldRouter.component,
                                  children: []
                            };
                        if(typeof(oldRouter.children)!='undefined' 
                            && oldRouter.children.length >0){
                            oldRouter.children.map((childrenRoute,index,arr)=>{
                              let childrenRouterObj = {
                                  path: childrenRoute.redirect,
                                  component: () => import('@/'+childrenRoute.component),
                                  componentName:childrenRoute.component,
                                  meta:childrenRoute.meta,
                                  children: []
                              };
                              routerObj.children.push(childrenRouterObj);
                           })
                           homeRouter.children.push(routerObj);
                        }
                    }
                });
            }
          },
          /**登录
          **/
          submitForm(formName) {
                    let _this=this;
                    this.$refs[formName].validate((valid) => {
                        if (valid) {                                            
                            let json={
                                username:_this.ruleForm.username,
                                password:_this.ruleForm.password
                            }                                      
                            const loginVerification=()=>
                            {                                
                                    return new Promise((resolve,reject)=>{
                                    this.axios.post('/usercenter/sys/login',json).then((res)=>
                                    { 
                                        if(res.data.code==200)
                                        {  
                                            this.savetoken(res.data.result.token)
                                            this.savauseinfo(res.data.result.userInfo)
                                            resolve(res.data.result); 
                                        }
                                        else{
                                            this.$message.error('账号密码有错');
                                            this.cheakPass=false;
                                            
                                        }                                   
                                        }).catch(error=>
                                            {
                                                console.log(error);
                                            })
                                    })
                            
                            }  
                        const permission=()=>{
                            return new Promise((resolve,reject)=>{
                                 this.axios.get('/usercenter/permission/query-by-user').then((res)=>{
                                 res.data.code==200?resolve(res.data.result):reject(res.message);
                             })
                            })
                        }   
                        const saveroute=(routers)=>{                            
                            if(routers.length>0)
                            {
                              this.setrouteoff();
                              this.setmenu(routers);  
                              this.assembleRouters(routers);  
                              let trouters = [];     
                              trouters.push(homeRouter);     
                              this.saverouters(trouters);  
                              this.$router.addRoutes(trouters.concat(errors));
                              this.$router.push({path:'/home/system/user'});  
                            }
                            else
                            {
                                this.$router.push({path:'/403'});
                            }  
                        }
                        
                        const ASYNC= async ()=>{
                                let logininfo=await loginVerification();
                                let menu=await permission();                             
                                await saveroute(menu);
                            }
                            ASYNC();
                        }
                        else {
                          console.log('error submit!!');
                          return false;
                      }
                   });          
            },
        }
        
    }
</script>

<style scoped>
    .mb10{margin-bottom: 10px}
    /* .login-wrap{
        position: relative;
        width:100%;
        height:100%;
         background-image: url(../../assets/img/login-bg.jpg); 
        background-size: 100%;
    } */
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }

  .imgm{
    width: 100%;
    height: 100%;
  }
    input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #fff;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #fff;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    /* background: #fff */
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #fff;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #fff;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .login_banner>>>.el-carousel__container {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -5;
}
.imgm {
  width: 100%;
  height: 100%;
}
#canvas{
  height:930px;
}
/* .el-carousel__container{
  height: 100%;
} */
</style>