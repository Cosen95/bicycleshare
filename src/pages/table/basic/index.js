import React from 'react'
import { Card, Table } from 'antd'
import axios from '../../../axios/index'

export default class BasicTable extends React.Component{
  state = {
    dataSource: []
  }
  componentDidMount() {
    this.request();
  }

  request = ()=> {
    axios.ajax({
      url:'/table/list',
      data:{
        params:{
          page:1
        }
      }
    }).then((res)=>{
      if(res.code == 0) {
        this.setState({
          dataSource:res.data
        })
      }
    })
  }
  render() {
    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    }, {
      title: '兴趣',
      dataIndex: 'interest',
      key: 'interest',
    }, {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '登录时间',
      dataIndex: 'time',
      key: 'time',
    }, ];
    return (
      <div>
        <Card title="基础表格">
          <Table
            dataSource={this.state.dataSource}
            columns={columns}
          />
        </Card>
      </div>
    )
  }
}