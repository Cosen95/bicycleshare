import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;
export default {
  formateDate(time){
      if(!time) return '';
      let date = new Date(time);
      let month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
      let day = date.getDate() < 10 ? '0'+date.getDate() :date.getDate();
      let hours = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
      let seconds = date.getSeconds() <10 ? '0'+date.getSeconds():date.getSeconds();
      let minutes = date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes();
    return date.getFullYear()+"-"+month+"-"+day+' '+hours+":"+minutes+":"+seconds;
  },
  pagination(data,callback) {
    let page = {
      onChange:(current)=>{
        callback(current)
      },
      current:data.data.page,
      pageSize:data.data.page_size,
      total:data.data.total,
      showTotal:()=>{
        return `共${data.data.total}条`
      },
      showQuickJumper:true
    }
    return page;
  },
  getOptionList(data) {
    if(!data){
      return [];
    }
    let options = [];
    data.map((item)=>{
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return options;
  },
  /**
   * ETable 行点击通用函数
   * @param {选中行的索引} selectedRowKeys 
   * @param {*选中行对象} selectedItem 
   */
  updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
    if(selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedIds,
        selectedItem: selectedRows
      })
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem: selectedRows
      })
    }
  }
}