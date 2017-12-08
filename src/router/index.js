import Vue from 'vue'
import Router from 'vue-router'
import homepage from '../components/HomePage.vue'
import login from '../components/login.vue'
import mailmanagement from '../template/mailmanagement.vue'
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
          path: '/mailmanagement',
          component:mailmanagement
        },
        {
          path: '/',
          component:report
        },
        {
          path: '/equipment',
          component:equipment
        },
        {
          path: '/mechanism',
          component:mechanism
        },
        {
          path: '/userlist',
          component:userlist
        },
        {
          path: '/sys',
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
