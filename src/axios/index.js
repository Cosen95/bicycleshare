import Jsonp from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
import Utils from '../utils/index'

export default class Axios{
  static reqList(_this,url,params,isMock) {
    let data = {
      params:params,
      isMock
    }
    this.ajax({
      url,
      data
    }).then((data)=>{
      if(data && data.data){
        let list = data.data.item_list.map((item,index)=>{
          item.key = index;
          return item;
        })
        _this.setState({
          list: list,
          selectedRowKeys: [],
          selectedRows: null,
          pagination:Utils.pagination(data,(current)=>{
            _this.params.page = current;
            _this.requestList();
          })
        })
      }
    })
  }
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
    // let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
    console.log('---------------',options);
    let baseUrl = '';
    const { data:{isMock} } = options;
    if(isMock){ //判断是mock环境还是真实数据环境
      baseUrl = 'https://www.easy-mock.com/mock/5b77a194f30ef76bb8687e11/manageMock'; //mock api
    } else {
      // baseUrl = '真实线上环境api'
    }
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