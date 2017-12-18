<template>
  <div class="login-warpper">
    <v-header></v-header>
    <div class="sidebar-collapse navbar-default menu-body left-menu">
      <div class="leftmenu-icon"></div>
      <div class="leftmenu-name">
        <p>用户：</p><p class="left-text-name">张某某</p>
      </div>
      <ul class="nav metismenu" id="side-menu">
        <li v-for="(item,index) in datas">
          <router-link :to="item.url" >{{item.name}}<span class="fa fa-angle-down"></span></router-link>
        </li>
       <!-- <li><router-link to="/equipment">设备管理<span class="fa fa-angle-down"></span></router-link></li>
        <li><router-link to="/mechanism">机构管理<span class="fa fa-angle-down"></span></router-link></li>
        <li><router-link to="/userlist">用户管理<span class="fa fa-angle-down"></span></router-link></li>
        <li><router-link to="/mailmanagement">邮件管理<span class="fa fa-angle-down"></span></router-link></li>
        <li><router-link to="/sys">系统管理<span class="fa fa-angle-down"></span></router-link></li>-->
      </ul>
    </div>
    <div class="right_sircle">
      <transition><router-view></router-view></transition>
    </div>
  </div>
</template>

<script>
  import  header from './Header.vue'
  import {getmenu} from "../api/getlist"
export default {
  data () {
    return {
      datas:[]
    }
  },
  components: {
    'v-header': header
  },
  created(){
    this.getmenu();
  },
  methods:{
    getmenu(){
      let self=this;
      getmenu().then(res => {
        console.log(JSON.parse(res.data).data)
      self.datas=JSON.parse(res.data).data
    });
    }
  }
}
</script>

