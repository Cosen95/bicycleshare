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
    list: [],
    orderInfo: {},
    orderConfirmVisible: false
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
      let list = res.data.item_list.map((item,index)=>{
        item.key = index;
        return item;
      })
      this.setState({
        list: list,
        selectedRowKeys: [],
        selectedRows: null,
        pagination:Utils.pagination(res,(current)=>{
          _this.params.page = current;
          _this.requestList();
        })
      })
    })
  }
  //订单结束确认
  handleConfirm = ()=>{
    let item = this.state.selectedItem;
    if(!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束'
      })
      return;
    }
    axios.ajax({
      url:'/order/ebike_info',
      data:{
        params:{
          orderId:item.id
        }
      }
    }).then((res)=>{
      if(res.code == 0){
        this.setState({
          orderInfo: res.data,
          orderConfirmVisible: true
        })
      }
    })
  }
  //结束订单
  handleFinishOrder = ()=>{
    let item = this.state.selectedItem;
    axios.ajax({
      url: '/order/finish_order',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then((res) => {
      if(res.code == 0){
        message.success('订单结束成功')
        this.setState({
          orderConfirmVisible: false
        })
        this.requestList();
      }
    })
  }
  //订单详情
  openOrderDetail = ()=>{
    let item = this.state.selectedItem;
    if(!item) {
      Modal.info({
        title: '信息',
        content: '请先选择一条订单'
      })
      return;
    }
    window.open(`/#/common/order/detail/${item.id}`,'_blank')
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
        key: 'order_sn',
        title: '订单编号',
        dataIndex: 'order_sn'
      },{
        key: 'id',
        title: '订单id',
        dataIndex: 'id'
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
        dataIndex: 'distance',
        render:(distance)=>{
          return distance/1000 + 'km'
        }
      },{
        key: 'total_time',
        title: '行驶时长',
        dataIndex: 'total_time',
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
        key: 'total_fee',
        title: '订单金额',
        dataIndex: 'total_fee'
      },{
        key: 'user_pay',
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ]
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type:'radio',
      selectedRowKeys
    }
    return(
        <div>
          <Card>
            <FilterForm/>
            <Button type="primary" style={{marginRight:10,marginTop:20}} onClick={this.openOrderDetail}>订单详情</Button>
            <Button type="primary" style={{marginTop:20}}  onClick={this.handleConfirm}>结束订单</Button>
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
                pagination={this.state.pagination}
            />
          </div>
          <Modal
            title="结束订单"
            visible={this.state.orderConfirmVisible}
            onCancel={()=>{
              this.setState({
                orderConfirmVisible: false
              })
            }}
            onOk={this.handleFinishOrder}
            width={600}
          >
            <Form layout="horizontal">
                <FormItem label="车辆编号" {...formItemLayout}>
                  {this.state.orderInfo.bike_sn}
                </FormItem>
                <FormItem label="行程开始时间" {...formItemLayout}>
                  {this.state.orderInfo.start_time}
                </FormItem>
            </Form>
          </Modal>
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
          <FormItem label="订单时间">
            {
              getFieldDecorator('start_time')(
                  <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="开始时间"
                  />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('end_time')(
                  <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="结束时间"
                  />
              )
            }
          </FormItem>
          <FormItem label="订单状态">
            {
              getFieldDecorator('status')(
                  <Select
                      style={{ width: 80 }}
                      placeholder="全部"
                  >
                    <Option value="">全部</Option>
                    <Option value="1">进行中</Option>
                    <Option value="2">结束行程</Option>
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
