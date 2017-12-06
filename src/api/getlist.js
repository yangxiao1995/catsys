/**
 * Created by admin on 2017/5/19.
 */
import fetch from '../utils/http'
export function  login(data) {
  return fetch({
    url:'/login',
    method:'post',
    credentials: "include",
    params:data
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
    url:'/deleteonereport',
    method:"delete",
    params:data
  })
}
