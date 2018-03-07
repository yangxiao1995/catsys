import Vue from 'vue'
import Router from 'vue-router'
import homepage from '../components/HomePage.vue'
import login from '../components/login.vue'
import mailmanagement from '../template/mailmanagement.vue'
import usermanagement from '../template/usermanagement.vue'
import report from '../template/report.vue'
import equipment from '../template/equipment.vue'
import mechanism from '../template/mechanism.vue'
import userlist from '../template/userlist.vue'
import sys from '../template/sys.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/homepage',
      component: homepage,
      children:[
        {
          path: '/production/machine',
          component:mailmanagement
        },
        {
          path: '/production/user',
          component:usermanagement
        },
        {
          path: '/report',
          component:report
        },
        {
          path: '/machine',
          component:equipment
        },
        {
          path: '/organization',
          component:mechanism
        },
        {
          path: '/user',
          component:userlist
        },
        {
          path: '/role',
          component:sys
        },
      ]
    },
    {
      path:'*',
      component:login,
      redirect: '/'
    }
  ]
})
