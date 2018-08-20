import React from 'react'
import { Card, Table, Modal, message, Button } from 'antd'
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
          dataSource:res.data,
          selectedRowKeys: [],
          selectedRows: null
        })
      }
    })
  }
  onRowClick = (record,index) => {
    let selectKey = [index];
    Modal.info({
      title:'用户信息',
      content:`用户名:${record.username},兴趣:${record.interest}`
    })
    this.setState({
      selectedRowKeys:selectKey,
      selectedItem:record
    })
  }
  handleDelete = (()=> {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map((item)=> {
      ids.push(item.id)
    })
    Modal.confirm({
      title: '删除提示',
      content: `你确定删除id为：${ids.join(',')}的数据吗?`,
      onOk:()=>{
        message.success('删除成功');
      }
    })
  })
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
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type:'radio',
      selectedRowKeys
    }
    const rowCheckSelection = {
      type:'checkbox',
      selectedRowKeys,
      onChange:(selectedRowKeys,selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }
    return (
      <div>
        <Card title="基础表格">
          <Table
            dataSource={this.state.dataSource}
            columns={columns}
          />
        </Card>
        <Card title="单选表格">
          <Table
              bordered
              rowSelection={rowSelection}
              onRow={(record,index) => {
                return {
                  onClick:()=>{
                    this.onRowClick(record,index);
                  }
                }
              }}
              dataSource={this.state.dataSource}
              columns={columns}
              pagination={false}
          />
        </Card>
        <Card title="多选表格">
          <div>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
              bordered
              rowSelection={rowCheckSelection}
              dataSource={this.state.dataSource}
              columns={columns}
              pagination={false}
          />
        </Card>
      </div>
    )
  }
}