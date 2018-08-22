import React from 'react'
import { Card, Table } from 'antd'
import axios from '../../../axios/index'

export default class HighTable extends React.Component{
  state = {
    dataSource: []
  }
  componentDidMount() {
    this.request();
  }

  request = ()=> {
    axios.ajax({
      url:'/table/high/list',
      data:{
      }
    }).then((res)=>{
      if(res.code == 0) {
        this.setState({
          dataSource:res.data.list,
        })
      }
    })
  }
  handleChange = (pagination, filters, sorter)=> {
      this.setState({
        sortOrder: sorter.order
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
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter:(a,b) => {
        return a.age-b.age
      },
      sortOrder: this.state.sortOrder
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
          <Card title="表格排序">
            <Table
                bordered
                dataSource={this.state.dataSource}
                columns={columns}
                pagination={false}
                onChange={this.handleChange}
            />
          </Card>
        </div>
    )
  }
}