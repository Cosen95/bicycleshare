import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Card, message } from 'antd';
import './index.less'

const FormItem = Form.Item;
class LoginForm extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`您好，${userInfo.userName},你的密码是${userInfo.password}`)
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
        <div>
          <Card title="登录表单">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
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
              <FormItem>
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
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                    <Checkbox>Remember me</Checkbox>
                )}
                <a className="login-form-forgot" href="">Forgot password</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </FormItem>
            </Form>
          </Card>
        </div>
    )
  }
}

export default Form.create()(LoginForm);
