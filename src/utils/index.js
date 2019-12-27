// import Vue from '../btnPermission'
import axios from 'axios'

let BASEURL = 'http://47.98.145.222:8080/'
export let $get = (url, params) => {
  return axios.get(BASEURL + url, {
    params: params
  })
}
