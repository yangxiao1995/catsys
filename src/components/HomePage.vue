<template>
  <div class="login-warpper">
    <v-header></v-header>
    <div class="sidebar-collapse navbar-default menu-body left-menu">
      <div class="leftmenu-icon"></div>
      <div class="leftmenu-name">
        <p>用户：</p><p class="left-text-name">张某某</p>
      </div>
      <ul class="nav metismenu" id="side-menu">
        <li><router-link to="/homepage" >报表管理<span class="fa fa-angle-down"></span></router-link></li>
        <li><router-link to="/equipment">设备管理<span class="fa fa-angle-down"></span></router-link></li>
        <li><router-link to="/mechanism">机构管理<span class="fa fa-angle-down"></span></router-link></li>
        <li><router-link to="/">用户管理<span class="fa fa-angle-down"></span></router-link></li>
        <li><router-link to="/mailmanagement">邮件管理<span class="fa fa-angle-down"></span></router-link></li>
        <li><router-link to="/">系统管理<span class="fa fa-angle-down"></span></router-link></li>
      </ul>

      <!--<ul class="nav metismenu" id="side-menu" @click="acticive">
        <li  v-for="(item,index) in datas">
          <router-link :to="item.url" v-if="index==0" aria-expanded="true">
            <i class="">
              <img :src="item.iconClass">
            </i> <span class="nav-label">{{item.name}}</span>
            <span v-show="index>0" class="fa arrow"></span>
          </router-link>
          <a href="javascript:;" v-else aria-expanded="true">
            <i class="">
              <img :src="item.iconClass">
            </i> <span class="nav-label">{{item.name}}</span>
            <span v-show="index>0" class="fa arrow"></span>
          </a>
          <ul v-if="item.hasMenu==1" class="nav nav-second-level collapse" aria-expanded="true">
            <li  v-for="itemTwo in item.menuList">
              <router-link :to='itemTwo.url' actived>{{itemTwo.name}}</router-link>
            </li>
            &lt;!&ndash;<li><router-link to="/enterBasicInfoReCheck" >入户基础信息复核</router-link></li>
            <li><router-link to="/preSchemeDataList">预分方案数据管理</router-link></li>
            <li><router-link to="/preSchemeDataReList">预分方案数据复核</router-link></li>
            <li><router-link to="/preSchemeDataReSetList">预分方案数据调整</router-link></li>&ndash;&gt;
          </ul>
        </li>
      </ul>-->
    </div>
    <div class="right_sircle">
      <transition><router-view></router-view></transition>
    </div>
  </div>
</template>

<script>
  import  header from './Header.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    'v-header': header
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

