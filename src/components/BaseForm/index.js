import React from 'react'
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd'
import Utils from '../../utils/index'
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component{
    handleFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    handleReset = ()=>{
        this.props.form.resetFields();
    }
    initFormList = ()=> {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length>0) {
            formList.forEach((item,index) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type == '时间查询') {
                    const begin_time = <FormItem label="订单时间" key={field}>
                        {
                           getFieldDecorator('begin_time')(
                            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                            ) 
                        }
                    </FormItem>
                    formItemList.push(begin_time);
                    const end_time = <FormItem label="~" colon={false} key={field}>
                        {
                           getFieldDecorator('end_time')(
                            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                            ) 
                        }
                    </FormItem>
                    formItemList.push(end_time);

                } else if(item.type == 'INPUT') {
                    const INPUT = <FormItem label={label} key={field}>
                    {
                        getFieldDecorator([field],{
                            initialValue: initialValue
                        })(
                            <Input type="text" placeholder={placeholder} />
                        )
                    }
                    </FormItem>;
                    formItemList.push(INPUT);
                } else if(item.type == 'SELECT') {
                    const SELECT = <FormItem label={label} key={field}>
                    {
                        getFieldDecorator([field], {
                            initialValue: initialValue
                        })(
                            <Select
                                style={{ width: width }}
                                placeholder={placeholder}
                            >
                                {Utils.getOptionList(item.list)}
                            </Select>
                        )
                    }
                    </FormItem>;
                    formItemList.push(SELECT);
                } else if(item.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field}>
                    {
                        getFieldDecorator([field], {
                            valuePropName: 'checked',
                            initialValue: initialValue //true | false
                        })(
                            <Checkbox>
                                {label}
                            </Checkbox>
                        )
                    }
                    </FormItem>;
                    formItemList.push(CHECKBOX);
                }
            });
        }
        return formItemList;
    }
    render(){
        return(<Form layout="inline">
            { this.initFormList() }
            <FormItem>
                <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                <Button onClick={this.handleReset}>重置</Button>
            </FormItem>
        </Form>)
    }

}

export default Form.create({})(FilterForm)