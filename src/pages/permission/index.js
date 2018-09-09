import React from 'react'
import { Card, Button, Form, Input, Select, Modal, Table, message, Tree, Transfer } from 'antd'
import menuConfig from '../../config/menuConfig'
import axios from '../../axios'
import Utils from '../../utils'

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

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
    // 权限设置
    handlePermission = ()=> {
        if(!this.state.selectedItem){
            Modal.info({
                title: '信息',
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: this.state.selectedItem
        })
        let menuList = this.state.selectedItem.menus;
        console.log('--------',menuList)
        this.setState({
            menuInfo:menuList
        })
    }
    //权限设置提交
    handlePermEditSubmit = ()=> {
        let data = this.permForm.props.form.getFieldsValue();
        data.perm_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url:'/permission/edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    isPermVisible:false
                })
                this.getRoleList();
            }
        })
    }
    handleUserAuth = ()=> {
        if(!this.state.selectedItem){
            Modal.info({
                title: '信息',
                content: '请选择一个角色'
            })
            return;
        }
        this.getRoleUserList(this.state.selectedItem.id);
        this.setState({
            isUserAuthVisible: true,
            detailInfo: this.state.selectedItem
        })

    }
    getRoleUserList = (id)=> {
        axios.ajax({
            url:'/role/user_list',
            data:{
                params:{
                    id
                }
            }
        }).then((res)=>{
            if(res){
                const { data } = res;
                this.getAuthUserList(data);
            }
        })
    }
    //筛选目标用户
    getAuthUserList = (dataSource) => {
        const mockData = [];
        const targetKeys = [];
        if(dataSource && dataSource.length > 0) {
            // for(let i=0;i<dataSource.length;i++) {
            //     const data = {
            //         key: dataSource[i].user_id,
            //         title: dataSource[i].user_name,
            //         status: dataSource[i].status
            //     };
            //     if(data.status === 1) {

            //     }
            // }
            dataSource.forEach((item,i) => {
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                if(data.status === 1) {
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            });
        }
        this.setState({ mockData, targetKeys })
    }
    // 用户授权提交
    handleUserSubmit = ()=> {
        let data = {};
        data.user_ids = this.state.targetKeys || [];
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url: '/role/user_role_edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res)=>{
            if(res) {
                this.setState({
                    isUserAuthVisible: false
                })
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
                <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
                <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
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
          <Modal
            title="权限设置"
            visible={this.state.isPermVisible}
            width={600}
            onOk={this.handlePermEditSubmit}
            onCancel={()=>{
                this.setState({
                    isPermVisible:false
                })
            }}
          >
            <PermEditForm 
                wrappedComponentRef={(inst) => this.permForm = inst }
                detailInfo={this.state.detailInfo} 
                menuInfo={this.state.menuInfo||[]}
                patchMenuInfo={(checkedKeys)=>{
                    this.setState({
                        menuInfo: checkedKeys
                    })
                }}
            />
          </Modal>
          <Modal
            title="用户授权"
            visible={this.state.isUserAuthVisible}
            width={800}
            onOk={this.handleUserSubmit}
            onCancel={()=>{
                this.setState({
                    isUserAuthVisible:false
                })
            }}
          >
            <RoleAuthForm
                wrappedComponentRef={(inst) => this.userAuthForm = inst}
                detailInfo={this.state.detailInfo}
                targetKeys={this.state.targetKeys}
                mockData={this.state.mockData}
                patchUserInfo={(targetKeys)=>{
                    this.setState({
                        targetKeys
                    })
                }}
            />

          </Modal>
        </div>)
    }
}

// 角色创建
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

// 设置权限
class PermEditForm extends React.Component{
    state = {}
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if(item.children) {
                return (
                    <TreeNode title={item.title} key={item.key}>
                        { this.renderTreeNodes(item.children) }
                    </TreeNode>
                )
            }
            return <TreeNode  {...item}/>
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5},
            wrapperCol: { span: 18}
        }
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status',{
                            initialValue:'1'
                        })(
                            <Select>
                                <Option value="1">启用</Option>
                                <Option value="0">禁用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>this.onCheck(checkedKeys)}
                    checkedKeys={menuInfo || []}
                >
                    <TreeNode title="平台权限" key="platform_all">
                       { this.renderTreeNodes(menuConfig) } 
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
    
}

PermEditForm = Form.create({})(PermEditForm);

// 用户授权
class RoleAuthForm extends React.Component{
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1
    }
    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys);
    }
    render(){
        const formItemLayout = {
            labelCol: { span: 5},
            wrapperCol: { span: 18}
        }
        const detail_info = this.props.detailInfo;
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称：" {...formItemLayout}>
                    <Input disabled maxLength={8} placeholder={detail_info.role_name}/>                    
                </FormItem>
                <FormItem label="选择用户：" {...formItemLayout}>
                    <Transfer
                        listStyle={{width:200,height:400}}
                        dataSource={this.props.mockData}
                        targetKeys={this.props.targetKeys}
                        showSearch
                        title={['待选用户','已选用户']}
                        searchPlaceholder='请输入用户名'
                        filterOption={this.filterOption}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </FormItem>

            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);



