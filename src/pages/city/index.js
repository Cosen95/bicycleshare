import React from 'react'
import { Card, Table, Button, Form, Select, Modal, message } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/index'
import BaseForm from '../../components/BaseForm'
const FormItem = Form.Item;
const Option = Select.Option;


export default class City extends React.Component{
  state = {
    list:[],
    isShowOpenCity: false
  }
  params = {
    page: 1
  }
  formItemList = [
    {
      type:'SELECT',
      label:'城市',
      field:'city_id',
      placeholder:'全部',
      initialValue:'1',
      width:120,
      list: [{ id:'0',name:'全部'},{ id:'1',name:'北京'},{ id:'2',name:'上海'},{ id:'3',name:'深圳'}]
    },{
      type:'SELECT',
      label:'用车模式',
      field:'mode',
      placeholder:'全部',
      initialValue:'1',
      width:120,
      list:  [{ id:'0',name:'全部'},{ id:'1',name:'指定停车点模式'},{ id:'2',name:'禁停区模式'}]
    },{
      type:'SELECT',
      label:'营运模式',
      field:'op_mode',
      placeholder:'全部',
      initialValue:'1',
      width:120,
      list:  [{ id:'0',name:'全部'},{ id:'1',name:'自营'},{ id:'2',name:'加盟'}]
    },{
      type:'SELECT',
      label:'加盟商授权状态',
      field:'auth_status',
      placeholder:'全部',
      initialValue:'1',
      width:120,
      list:  [{ id:'0',name:'全部'},{ id:'1',name:'已授权'},{ id:'2',name:'未授权'}]
    }
  ]
  componentDidMount(){
    this.requestList();
  }
  handleFilter = (params)=> {
    this.params = params;
    this.requestList();
  }

  requestList = ()=>{
    let _this = this;
    axios.ajax({
      url: '/open_city',
      data:{
        params:this.params
      }
    }).then((res)=>{
      this.setState({
        list: res.data.item_list,
        pagination:Utils.pagination(res,(current)=>{
          _this.params.page = current;
          _this.requestList();
        })
      })
    })
  }
  //开通城市
  handleOpenCity = ()=>{
    this.setState({
      isShowOpenCity:true
    })
  }
  handleSubmit = ()=>{
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    axios.ajax({
      url:'/city/open',
      data:{
        params:cityInfo
      }
    }).then((res)=>{
      if(res.code == '0'){
        message.success('开通成功');
        this.setState({
          isShowOpenCity:false
        })
        this.requestList();
      }
    })
  }
  render(){
    const columns = [
      {
        title:'城市ID',
        dataIndex:'id'
      },{
        title:'城市名称',
        dataIndex:'name'
      },{
        title:'用车模式',
        dataIndex:'mode',
        render:(mode)=>{
          return mode == 1 ? '停车点':'禁停区'
        }
      },{
        title:'营运模式',
        dataIndex:'op_mode',
        render:(op_mode)=>{
          return op_mode == 1 ? '自营':'加盟'
        }
      },{
        title:'授权加盟商',
        dataIndex:'franchisee_name'
      },{
        title:'城市管理员',
        dataIndex:'city_admins',
        render:(arr)=>{
          return arr.map((item)=>{
            return item.user_name;
          }).join(',')
        }
      },{
        title:'城市开通时间',
        dataIndex:'open_time'
      },{
        title:'操作时间',
        dataIndex:'update_time',
        render:(time)=>{
          return Utils.formateDate(time)
        }
      },{
        title:'操作人',
        dataIndex:'sys_user_name'
      }
    ]
    return(
        <div>
          <Card>
            <BaseForm formList={this.formItemList} filterSubmit={this.handleFilter} /> 
          </Card>
          <Card>
            <Button type="primary" style={{marginTop:10}} onClick={this.handleOpenCity}>开通城市</Button>
          </Card>
          <div className="content-wrap">
            <Table
                columns={columns}
                dataSource={this.state.list}
                pagination={this.state.pagination}
            />
          </div>
          <Modal
            title="开通城市"
            visible={this.state.isShowOpenCity}
            onCancel={()=>{
              this.setState({
                isShowOpenCity: false
              })
            }}
            onOk={this.handleSubmit}
          >
            <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst}}/>
          </Modal>
        </div>
    )
  }
}

class OpenCityForm extends React.Component{
  render(){
    const formItemLayout = {
      labelCol:{
        span:5
      },
      wrapperCol:{
        span:19
      }
    }
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout="horizontal">
        <FormItem label="选择城市" {...formItemLayout}>
          {
            getFieldDecorator('city_id',{
              initialValue:'1'
            })(
                <Select>
                  <Option value="">全部</Option>
                  <Option value="1">北京市</Option>
                  <Option value="2">天津市</Option>
                </Select>
            )
          }

        </FormItem>
        <FormItem label="营运模式" {...formItemLayout}>
          {
            getFieldDecorator('open_mode',{
              initialValue:'1'
            })(
                <Select>
                  <Option value="1">自营</Option>
                  <Option value="2">加盟</Option>
                </Select>
            )
          }

        </FormItem>
        <FormItem label="用车模式" {...formItemLayout}>
          {
            getFieldDecorator('mode',{
              initialValue:'1'
            })(
                <Select>
                  <Option value="1">指定停车点</Option>
                  <Option value="2">禁停区</Option>
                </Select>
            )
          }

        </FormItem>
      </Form>
    )
  }
}
OpenCityForm = Form.create({})(OpenCityForm)