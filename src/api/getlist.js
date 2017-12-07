/**
 * Created by admin on 2017/5/19.
 */
import fetch from '../utils/http'
export function  login(data) {
  return fetch({
    url:'/login',
    method:'post',
    credentials: "include",
    data:data
  })
}
export function  machineadd(data) {
  return fetch({
    url:'/machine',
    method:'post',
    data:data
  })
}
export function  userpost(data) {
  return fetch({
    url:'/user',
    method:'post',
    data:data
  })
}
export function  reportpost(data) {
  return fetch({
    url:'/report',
    method:'post',
    data:data
  })
}
export function  organizationadd(data) {
  return fetch({
    url:'/organization',
    method:'post',
    data:data
  })
}
export function  getreportpageinfo(data) {
  return fetch({
    url:'/getreportpageinfo',
    method:'get',
    params:data
  })
}
export  function  deleteonereport(data) {
  return fetch({
    url:'/deleteonereport/'+data,
    method:"delete"
  })
}
export  function  userdelete(data) {
  return fetch({
    url:'/user/'+data,
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
export  function  deleteone(data) {
  return fetch({
    url:'/deleteone/'+data,
    method:"delete",
  })
}

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
    url:'/getorgpageinfo',
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
    data:data
  })
}
export function  organizationput(data) {
  return fetch({
    url:'/organization',
    method:'put',
    data:data
  })
}
