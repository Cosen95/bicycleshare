import React from 'react'
import { Card, Button, Form, Input, Select, Modal, Table, message } from 'antd'
import axios from '../../axios'
import Utils from '../../utils'

const FormItem = Form.Item;
const Option = Select.Option;

export default class Permission extends React.Component{
    state = {
        isRoleVisible : false
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
    //角色创建
    handleRole = ()=> {
        this.setState({
            isRoleVisible : true
        })
    }
    //角色提交
    handleRoleSubmit = ()=> {
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url:'role/create',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res){
                const { msg } = res;
                this.setState({
                    isRoleVisible:false
                })
                message.success(msg);
                this.getRoleList();
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
                <Button type="primary" onClick={this.handleRole}>创建角色</Button>
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
          <Modal
            title="创建角色"
            visible={this.state.isRoleVisible}
            onOk={this.handleRoleSubmit}
            onCancel={()=>{
                this.roleForm.props.form.resetFields();
                this.setState({
                    isRoleVisible: false
                })
            }}
          >
                <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst} />
          </Modal>
        </div>)
    }
}

class RoleForm extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5},
            wrapperCol: { span: 16}
        }
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name',{
                            initialValue:''
                        })(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state',{
                            initialValue:1
                        })(
                        <Select>
                            <Option value={1}>开启</Option>
                            <Option value={0}>关闭</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
        )
    }
}

RoleForm = Form.create({})(RoleForm);