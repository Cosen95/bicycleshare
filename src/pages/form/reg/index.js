import React from 'react'
import moment from 'moment'
import { Form, Icon, Button, Input, InputNumber, Card, Radio, Select, DatePicker, Upload, message, Checkbox } from 'antd';
import Buttons from "../../ui/buttons";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class RegForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

 beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  handleSubmit = () => {
    const userInfo = this.props.form.getFieldsValue();
    console.log(JSON.stringify(userInfo));
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const dateFormat = 'YYYY/MM/DD';
    const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
    );
    const imageUrl = this.state.imageUrl;
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
    const offsetItemLayout = {
      wrapperCol:{
        xs:24,
        sm:{
          span:12,
          offset:4
        }
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
                <FormItem label="生日" {...formItemLayout}>
                  {
                    getFieldDecorator('birthday',{
                        initialValue:moment('2018-08-16')
                    })(
                        <DatePicker
                            format={dateFormat}
                        />
                    )
                  }
                </FormItem>
                <FormItem label="头像" {...formItemLayout}>
                  {
                    getFieldDecorator('picture')(
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="//jsonplaceholder.typicode.com/posts/"
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleChange}
                        >
                          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                        </Upload>
                    )
                  }
                </FormItem>
                <FormItem {...offsetItemLayout}>
                  {
                    getFieldDecorator('agreement')(
                        <Checkbox>我已同意<a href='#'>react进阶</a></Checkbox>
                    )
                  }
                </FormItem>
                <FormItem {...offsetItemLayout}>
                  {
                    getFieldDecorator('submit')(
                        <Button type="primary" onClick={ this.handleSubmit }>注册</Button>
                    )
                  }
                </FormItem>
              </Form>
            </Card>
        </div>
    )
  }
}

export default Form.create()(RegForm);

