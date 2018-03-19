import Vue from 'vue'
import Router from 'vue-router'
import homepage from '../components/HomePage.vue'
import login from '../components/login.vue'
import promachin from '../template/promachin.vue'
import mailmanagement from '../template/mailmanagement.vue'
import usermanagement from '../template/usermanagement.vue'
import advancedetail from '../template/advancedetail.vue'
import venmanage from '../template/venmanage.vue'
import sendadvance from '../template/sendadvance.vue'
import customer from '../template/customer.vue'
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
          component:promachin
        },
        {
          path: '/mailmanagement',
          component:mailmanagement
        },
        {
          path: '/manufacturer',
          component:venmanage
        },
        {
          path: '/advancedetail',
          component:advancedetail
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
          path: '/preras',
          component:sendadvance
        },
        {
          path: '/customer',
          component:customer
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
