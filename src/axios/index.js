import Jsonp from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

export default class Axios{
  static jsonp(options) {
    return new Promise((resolve,reject) => {
      Jsonp(options.url,{  //eslint-disable-line
        params:'callback'
      },function(err,response) {
          if(response.status === 'success'){
            resolve(response);
          } else {
            reject(response.message);
          }
      })
    })
  }

  static ajax(options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }
    let baseUrl = 'https://www.easy-mock.com/mock/5b77a194f30ef76bb8687e11/manageMock';
    return new Promise((resolve,reject) => {
      axios({
        url:options.url,
        method:'get',
        baseURL:baseUrl,
        timeout:5000,
        params: (options.data && options.data.params) || ''
      }).then((response) => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }
        if (response.status == '200') {
          let res = response.data;
          if(res.code == '0') {
            resolve(res);
          } else {
            Modal.info({
              title:"提示",
              content: res.msg
            })
          }
        } else {
          reject(response.data);
        }
      })
    })
  }
}