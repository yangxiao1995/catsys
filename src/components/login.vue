<template>
  <div class="loginBox">
    <div class="login-wrapper">
        <img src="../../static/img/loginbk.png" alt="">

      <div class="loginTitle">
        <p>收寄一体机作业平台</p>
        <div class="loginForm">
          <p>登录</p>
          <div class="loginForm-contain">
            <p class="login-role">用户名</p>
            <input type="text" v-model="list.username" placeholder="  请输入账号（邮箱或手机号）">
            <p class="login-another">密码</p>
            <input type="password" v-model="list.password" placeholder="  密码">
            <!--<div class="login-func login-another">
              <input class="login-check" type="checkbox"><p>&nbsp;&nbsp;下次自动登录</p>
              <div class="login-returnpass">
                <a href="javascript:;"><p>忘记密码</p></a>&nbsp;&nbsp;<a href="javascript:;"><p>申请新用户</p></a>
              </div>
            </div>-->
            <el-button type="primary" class="btn btn-primary" :loading="loading" @click.native.prevent="toLogin">
              登&nbsp;&nbsp;&nbsp;&nbsp;录
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="../../static/css/login.css" scoped></style>
<script>
  import store from '.././store/userinfo/user.js'
  import {login} from "../api/getlist"
  export default{
    data(){
      return{
        loading: false,
        token: '',
        isLoging: false,
        list: {
          username: '',
          password: ''
        }
      }
    },
    created(){

    },
    methods:{
      login(){
        this.$router.push({path: 'homepage'})
      },
        toLogin(){
          let self = this;
          console.log(this.list.password)
          console.log(typeof this.list.password)
          if (this.list.username != "" && this.list.password != "") {
            console.log("123")
           /* this.loading = true;*/
            login(self.list).then(res => {
              console.log(JSON.parse(res.data))
            /*let code = JSON.parse(res.data).code;*/
            /*if (code === 1) {*/
             /* this.loading = false;*/
              window.sessionStorage.setItem("user-info",JSON.parse(res.data).userName);
              store.actions.LoginByEmail(JSON.parse(res.data).userName);
              store.actions.LoginToken(JSON.parse(res.data).token);
              self.$router.push('/homepage');
          /*  } else {
              this.$message.error(JSON.parse(res.data).msg);
              this.loading = false;
            }*/
            /*     this.$router.push('/index');*/
            console.log(res);
          })
          } else {
            this.$message.error("用户名或者密码不能为空");
          }
        },
    }
  }
</script>
