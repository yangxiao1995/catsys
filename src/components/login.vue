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
            <input type="text" placeholder="  请输入账号（邮箱或手机号）">
            <p class="login-another">密码</p>
            <input type="password" placeholder="  密码">
            <div class="login-func login-another">
              <input class="login-check" type="checkbox"><p>&nbsp;&nbsp;下次自动登录</p>
              <div class="login-returnpass">
                <a href="javascript:;"><p>忘记密码</p></a>&nbsp;&nbsp;<a href="javascript:;"><p>申请新用户</p></a>
              </div>
            </div>
            <div class="btn btn-primary" @click="login">
              登&nbsp;&nbsp;&nbsp;&nbsp;录
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="../../static/css/login.css" scoped></style>
<script>
  export default{
    data(){
      return{

      }
    },
    created(){

    },
    methods:{
      login(){
        this.$router.push({path: 'homepage'})
      }
    }
  }
</script>
