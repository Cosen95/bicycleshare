import React from 'react'
import { Form, Icon, Input, InputNumber, Button, Checkbox, Card, message, Radio, Switch, Select, DatePicker, TimePicker } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class RegForm extends React.Component{
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol:{
        xs:24,
        sm:4
      },
      wrapperCol:{
        xs:24,
        sm:12
      }
    }
    return(
        <div>
            <Card title="注册表单">
              <Form>
                <FormItem label="用户名" {...formItemLayout}>
                  {getFieldDecorator('userName', {
                    initialValue:'',
                    rules: [
                      { required: true,
                        message: '请输入用户名'
                      },
                      {
                        min:2,max:10,
                        message: '用户名长度不在范围内'
                      }
                    ],
                  })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="你的名字" />
                  )}
                </FormItem>
                <FormItem label="密码" {...formItemLayout}>
                  {getFieldDecorator('password', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: '请输入密码'
                      }
                    ],
                  })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="你的密码" />
                  )}
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                  {getFieldDecorator('sex', {
                    initialValue: '1'
                  })(
                      <RadioGroup>
                        <Radio value="1">男</Radio>
                        <Radio value="2">女</Radio>
                      </RadioGroup>
                  )}
                </FormItem>
                <FormItem label="年龄" {...formItemLayout}>
                  {getFieldDecorator('age', {
                    initialValue: '20'
                  })(
                      <InputNumber min={1} max={30} defaultValue={18}/>
                  )}
                </FormItem>
                <FormItem label="职位" {...formItemLayout}>
                  {getFieldDecorator('singleSelect', {
                    initialValue: 'UED'
                  })(
                      <Select>
                        <Option value="UI">UI</Option>
                        <Option value="UED">UED</Option>
                        <Option value="FE">FE</Option>
                      </Select>
                  )}
                </FormItem>
                <FormItem label="个人发展领域" {...formItemLayout}>
                  {getFieldDecorator('tag', {
                    initialValue: ['ReactNative','NodeJs']
                  })(
                      <Select mode="multiple">
                        <Option value="UI">UI</Option>
                        <Option value="UED">UED</Option>
                        <Option value="FE">FE</Option>
                        <Option value="NodeJs">NodeJs</Option>
                        <Option value="mySql">mySql</Option>
                        <Option value="Nginx">Nginx</Option>
                        <Option value="ReactNative">ReactNative</Option>

                      </Select>
                  )}
                </FormItem>
              </Form>
            </Card>
        </div>
    )
  }
}

export default Form.create()(RegForm);

