/**
 * Created by admin on 2017/5/19.
 */
import fetch from '../utils/http'
export function  login(data) {
  return fetch({
    url:'/login',
    method:'post',
    credentials: "include",
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  machineadd(data) {
  return fetch({
    url:'/machine',
    method:'post',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  userupload(data) {
  return fetch({
    url:'/user/upload',
    method:'post',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  userpost(data) {
  return fetch({
    url:'/user',
    method:'post',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  roleadd(data) {
  return fetch({
    url:'/role',
    method:'post',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  reportpost(data) {
  return fetch({
    url:'/report',
    method:'post',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  rolepost(data) {
  return fetch({
    url:'/role',
    method:'put',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  organizationadd(data) {
  return fetch({
    url:'/organization',
    method:'post',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  getreportpageinfo(data) {
  return fetch({
    url:'/report/getreportpageinfo',
    method:'get',
    params:data
  })
}
export function  authority(data) {
  return fetch({
    url:'/authority',
    method:'get',
    params:data
  })
}
export function  getmenu() {
  return fetch({
    url:'/menu',
    method:'get',
  })
}
export function  getusers() {
  return fetch({
    url:'/user/usersinfo',
    method:'get',
  })
}
export function  getorgusers() {
  return fetch({
    url:'/user/orgusers',
    method:'get',
  })
}
export function  manufacturer() {
  return fetch({
    url:'/manufacturer',
    method:'get',
  })
}
export function  manufacturerjson() {
  return fetch({
    url:'/manufacturer/json',
    method:'get',
  })
}
export function  downloadkey(data) {
  return fetch({
    url:'/user/downloadkey',
    method:'get',
    params:data
  })
}
export function  organizationsinfo() {
  return fetch({
    url:'/organization/organizationsinfo',
    method:'get',
  })
}
export function  authorityid(data) {
  return fetch({
    url:'/authority/'+data,
    method:'get',
  })
}
export function  getuserlist(data) {
  return fetch({
    url:'/getuserlist',
    method:'get',
    params:data
  })
}
export function  rolelist(data) {
  return fetch({
    url:'/role/list',
    method:'get',
    params:data
  })
}
export function  role(data) {
  return fetch({
    url:'/role',
    method:'get',
    params:data
  })
}
export function  getaddrlist(data) {
  return fetch({
    url:'/organization/getaddrlist',
    method:'get',
    params:data
  })
}
export function  machinegetid(data) {
  return fetch({
    url:'/machine/'+data,
    method:'get',
  })
}
export  function  deleteonereport(data) {
  return fetch({
    url:'/report/'+data,
    method:"delete"
  })
}
export  function  userdelete(data) {
  return fetch({
    url:'/user/'+data,
    method:"delete"
  })
}
export  function  roledelete(data) {
  return fetch({
    url:'/role/'+data,
    method:"delete"
  })
}
export  function  postsdelete(data) {
  return fetch({
    url:'/posts/'+data,
    method:"delete"
  })
}
export  function  organizationalldelete(data) {
  return fetch({
    url:'/organization/'+data,
    method:"delete"
  })
}
export  function  machinedelete(data) {
  return fetch({
    url:'/machine/'+data,
    method:"delete"
  })
}
export  function  reportalldelete(data) {
  return fetch({
    url:'/report/'+data,
    method:"delete",
  })
}
/*export  function  deleteone(data) {
  return fetch({
    url:'/organization/'+data,
    method:"delete",
  })
}*/

export function  machine(data) {
  return fetch({
    url:'/machine',
    method:'get',
    params:data
  })
}
export function  reportgetone(data) {
  return fetch({
    url:'/report/getone',
    method:'get',
    params:data
  })
}
export function  getorgpageinfo(data) {
  return fetch({
    url:'/organization/getorgpageinfo',
    method:'get',
    params:data
  })
}
export function  orgpageiprov(data) {
  return fetch({
    url:'/organization/getorgpageinfobyorgprov',
    method:'get',
    params:data
  })
}
export function  user(data) {
  return fetch({
    url:'/user',
    method:'get',
    params:data
  })
}
export function  posts(data) {
  return fetch({
    url:'/posts',
    method:'get',
    params:data
  })
}
export function  postsuser(data) {
  return fetch({
    url:'/posts/user/'+data.id,
    method:'get',
    params:data
  })
}
export function  postsmachine(data) {
  return fetch({
    url:'/posts/machine/'+data.id,
    method:'get',
    params:data
  })
}
export function  organization(data) {
  return fetch({
    url:'/organization',
    method:'get',
    params:data
  })
}
export function  machineput(data) {
  return fetch({
    url:'/machine',
    method:'put',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  resetpassword(data) {
  return fetch({
    url:'/user/resetpassword',
    method:'put',
    data:data
  })
}
export function  reportput(data) {
  return fetch({
    url:'/report',
    method:'put',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  organizationput(data) {
  return fetch({
    url:'/organization',
    method:'put',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  userput(data) {
  return fetch({
    url:'/user',
    method:'put',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  postssendback(data) {
  return fetch({
    url:'/posts/sendback/'+data,
    method:'put',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
  })
}
export function  authorityput(data) {
  return fetch({
    url:'/authority',
    method:'put',
    data:data
  })
}
/*预收寄登记*/
export function  preras(data) {
  return fetch({
    url:'/preras',
    method:'get',
    params:data
  })
}
export function  prerasone(data) {
  return fetch({
    url:'/preras/one/'+data,
    method:'get',
  })
}
export function  prerasput(data) {
  return fetch({
    url:'/preras',
    method:'put',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export  function  prerasdelete(data) {
  return fetch({
    url:'/preras/'+data,
    method:"delete",
  })
}
export function  prerasadd(data) {
  return fetch({
    url:'/preras',
    method:'post',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
/*客户管理*/
export function  customer(data) {
  return fetch({
    url:'/customer',
    method:'get',
    params:data
  })
}
export function  customerone(data) {
  return fetch({
    url:'/customer/'+data,
    method:'get',
  })
}
export  function  customerdelete(data) {
  return fetch({
    url:'/customer/'+data,
    method:"delete",
  })
}
export function  customerput(data) {
  return fetch({
    url:'/customer',
    method:'put',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  customeradd(data) {
  return fetch({
    url:'/customer',
    method:'post',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
  })
}
/*设备生产管理*/
export function  promachine(data) {
  return fetch({
    url:'/production/machine',
    method:'get',
  })
}
export function  prouser(data) {
  return fetch({
    url:'/production/user',
    method:'get',
  })
}
/*厂商管理*/
export function  getmanufacturer(data) {
  return fetch({
    url:'/manufacturer',
    method:'get',
    params:data
  })
}
export function  getmanufaone(data) {
  return fetch({
    url:'/manufacturer/'+data,
    method:'get',
    params:data
  })
}
export function  manufactureradd(data) {
  return fetch({
    url:'/manufacturer',
    method:'post',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
    ,headers: {'Content-Type': 'application/json;charset=UTF-8'}
  })
}
export function  manufacturerput(data) {
  return fetch({
    url:'/manufacturer',
    method:'put',
    data:data,
    transformRequest: [function (data) {
      data=JSON.stringify(data)
      return data;
    }]
  })
}
export  function  manufacturerdelete(data) {
  return fetch({
    url:'/manufacturer/'+data,
    method:"delete",
  })
}
