<template>
  <div class="login-warpper">
    <v-header></v-header>
    <div class="sidebar-collapse navbar-default menu-body left-menu">
      <div class="leftmenu-icon"><img :src="icon" alt=""></div>
      <div class="leftmenu-name">
        <!--<p>用户：</p><p class="left-text-name">张某某</p>-->
      </div>
      <ul class="nav metismenu" id="side-menu" @click="acticive">
        <li v-for="(item,index) in datas">
          <!--<router-link :to="item.url" >{{item.name}}<span class="fa fa-angle-down"></span></router-link>
          <ul v-if="item.children.length>0" class="nav nav-second-level collapse" aria-expanded="true">
            <li  v-for="itemTwo in item.children">
              <router-link :to='itemTwo.url' actived>{{itemTwo.name}}</router-link>
            </li>
          </ul>-->

          <router-link :to="item.url" v-if="item.children.length==0" aria-expanded="true">{{item.name}}<span class="fa fa-angle-down"></span></router-link>
          <a href="javascript:;" v-else aria-expanded="true">
            <span class="nav-label">{{item.name}}<span class="fa fa-angle-down"></span></span>
          </a>
          <ul v-if="item.children.length>0" class="nav nav-second-level collapse" aria-expanded="true">
            <li  v-for="itemTwo in item.children">
              <router-link :to='itemTwo.url' actived>{{itemTwo.name}}</router-link>
            </li>
          </ul>


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
  import store from '.././store/userinfo/user'
  import $ from  'jquery'
  import js from  '../../static/js/jquery.metisMenu.js'
export default {
  data () {
    return {
      datas:[],
      icon:store.state.icon
    }
  },
  components: {
    'v-header': header
  },
  beforeCreate:function () {
    this.acticive;
  },
  created(){
    this.getmenu();
  },
  methods:{
    getmenu(){
      let self=this;
      getmenu().then(res => {
      self.datas=JSON.parse(res.data).data
    });
    },
    acticive:function () {
      $('#side-menu').metisMenu();
    }
  }
}
</script>

