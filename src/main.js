// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/userinfo/user'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(Vuex)

// 全局导航钩子
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.path!='/' && to.path!=null && to.path!='' &&to.path!='/publicty' &&to.path!='/queusys') {
    /*--*/
    // 通过vuex state获取当前的token是否存在
    if(!isEmptyObject(store.state.token)) {
      next();
    }
    else {
      next({
        path: '/',
        /* query: {redirect: to.fullPath}*/  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}

var app = new Vue({
  data: {},
  el: '#app',
  router,
  render: h => h(App)
})
