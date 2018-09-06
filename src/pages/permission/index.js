import React from 'react'
import { Card, Button, Form, Input, Select, Modal, Table } from 'antd'
import axios from '../../axios'
import Utils from '../../utils'

const FormItem = Form.Item;
const Option = Select.Option;

export default class Permission extends React.Component{
    state = {

    }
    componentWillMount(){
        this.getRoleList();
    }
    getRoleList = ()=> {
        axios.ajax({
            url: '/role/list',
            data: {
                params:{}
            }
        }).then((res) => {
            if(res.code == 0) {
                const { data:{ item_list }} = res;
                let list = item_list.map((item,i)=>{
                    item.key = i;
                    return item
                });
                this.setState({
                    list
                })
            }
        })
    }
    onRowClick = (record,index) => {
        console.log('当前选中的一项',record);
        let selectKey = [index];
        this.setState({
          selectedRowKeys:selectKey,
          selectedItem:record
        })
      }
    render(){
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formateDate
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render:(status) => {
                    if(status === 1) {
                        return '启用'
                    } else {
                        return '停用'
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formateDate
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name'
            }
        ]
        const { selectedRowKeys } = this.state;
        const rowSelection = {
        type:'radio',
        selectedRowKeys
        }
        return(<div>
            <Card>
                <Button type="primary">创建角色</Button>
                <Button type="primary">设置权限</Button>
                <Button type="primary">用户授权</Button>
            </Card>
            <div className="content-wrap">
                <Table
                    columns={columns}
                    rowSelection={rowSelection}
                    onRow={(record,index) => {
                    return {
                        onClick:()=>{
                        this.onRowClick(record,index);
                        }
                    }
                    }}
                    dataSource={this.state.list}
                />
          </div>
        </div>)
    }
}