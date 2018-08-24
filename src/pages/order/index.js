import React from 'react'
import { Card, Table, Button, Form, Select, Modal, message, DatePicker } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/index'
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

const { RangePicker } = DatePicker;

export default class Order extends React.Component{
  state = {
    list: []
  }
  params = {
    page: 1
  }
  componentDidMount(){
    this.requestList();
  }
  requestList = ()=>{
    let _this = this;
    axios.ajax({
      url: '/order/list',
      data:{
        params:{
          page:this.params.page
        }
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
  render(){
    const columns = [
      {
        key: 'order_sn',
        title: '订单编号',
        dataIndex: 'order_sn'
      },{
        key: 'bike_sn',
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },{
        key: 'user_name',
        title: '用户名',
        dataIndex: 'user_name'
      },{
        key: 'mobile',
        title: '手机号',
        dataIndex: 'mobile'
      },{
        key: 'distance',
        title: '里程',
        dataIndex: 'distance'
      },{
        key: 'total_time',
        title: '形势时长',
        dataIndex: 'total_time'
      },{
        key: 'status',
        title: '状态',
        dataIndex: 'status'
      },{
        key: 'start_time',
        title: '开始时间',
        dataIndex: 'start_time'
      },{
        key: 'end_time',
        title: '结束时间',
        dataIndex: 'end_time'
      },{
        key: 'end_time',
        title: '结束时间',
        dataIndex: 'end_time'
      },{
        key: 'total_fee',
        title: '订单金额',
        dataIndex: 'total_fee'
      },{
        key: 'user_pay',
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ]
    return(
        <div>
          <Card>
            <FilterForm/>
            <Button type="primary" style={{marginTop:10}} onClick={this.handleOpenCity}>开通城市</Button>
          </Card>
          <div className="content-wrap">
            <Table
                columns={columns}
                dataSource={this.state.list}
                pagination={this.state.pagination}
            />
          </div>
        </div>
    )
  }
}

class FilterForm extends React.Component{
  render(){
    const { getFieldDecorator } = this.props.form;
    const dateFormat = 'YYYY/MM/DD';

    return(
        <Form layout="inline">
          <FormItem label="城市">
            {
              getFieldDecorator('city_id')(
                  <Select style={{width:100}} placeholder="全部">
                    <Option value="">全部</Option>
                    <Option value="1">北京市</Option>
                    <Option value="2">天津市</Option>
                    <Option value="3">深圳市</Option>
                  </Select>
              )
            }
          </FormItem>
          <FormItem label="用车模式">
            {
              getFieldDecorator('mode')(
                  <RangePicker
                      defaultValue={[moment('2018/08/01', dateFormat), moment('2018/10/08', dateFormat)]}
                      format={dateFormat}
                  />
              )
            }
          </FormItem>
          <FormItem label="营运模式">
            {
              getFieldDecorator('op_mode')(
                  <Select
                      style={{ width: 80 }}
                      placeholder="全部"
                  >
                    <Option value="">全部</Option>
                    <Option value="1">自营</Option>
                    <Option value="2">加盟</Option>
                  </Select>
              )
            }
          </FormItem>
          <FormItem label="加盟商授权状态">
            {
              getFieldDecorator('auth_status')(
                  <Select
                      style={{ width: 100 }}
                      placeholder="全部"
                  >
                    <Option value="">全部</Option>
                    <Option value="1">已授权</Option>
                    <Option value="2">未授权</Option>
                  </Select>
              )
            }
          </FormItem>
          <FormItem>
            <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
            <Button>重置</Button>
          </FormItem>
        </Form>
    )
  }
}
FilterForm = Form.create({})(FilterForm);
