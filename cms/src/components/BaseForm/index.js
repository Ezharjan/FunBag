import React from 'react';
import {Input,Select,Form,Button, Checkbox,DatePicker} from 'antd';
import Utils  from './../../utils/utils';
const FormItem = Form.Item;

class FilterForm extends React.Component{
    handleFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
    reset = ()=>{
        this.props.form.resetFields();
    }
    initFormList = ()=>{
        const {getFieldDecorator} = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if(formList && formList.length > 0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if(item.type == '城市'){
                    const city = <FormItem label="城市" key={field}>
                    {
                        getFieldDecorator('city',{
                            initialValue: '0'
                        })(
                            <Select
                                style={{width:80}}
                                placeholder={placeholder}
                            >
                                {Utils.getOptionList([{id:'0',name:'全部'},{id:'1',name:'北京'},{id:'2',name:'上海'},{id:'2',name:'天津'},{id:'2',name:'杭州'}])}
                            </Select>
                        )
                    }

                    </FormItem>
                    formItemList.push(city);
                }else if(item.type == '时间查询'){
                    const begin_time = <FormItem label={label} key={field}>
                    {
                        getFieldDecorator('begin_time',{
                            initialValue: initialValue
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }

                    </FormItem>
                    formItemList.push(begin_time);
                    const end_time = <FormItem label="~" colon={false} key={field}>
                    {
                        getFieldDecorator('end_time',{
                            initialValue: initialValue
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }

                    </FormItem>
                    formItemList.push(end_time);
                }else if(item.type == 'INPUT'){
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue: initialValue
                            })(
                                <Input
                                    type="text"
                                    placeholder={placeholder}
                                />
                            )
                        }

                    </FormItem>
                    formItemList.push(INPUT);
                }else if(item.type == 'SELECT') {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue: initialValue
                            })(
                                <Select
                                    style={{width:width}}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList(item.list)}
                                </Select>

                            )
                        }

                    </FormItem>
                    formItemList.push(SELECT);
                }else if(item.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                valuePropName:'checked',
                                initialValue: initialValue
                            })(
                                <Checkbox>{label}</Checkbox>
                            )
                        }

                    </FormItem>
                    formItemList.push(CHECKBOX);
                }else if(item.type == 'DATEPICKER') {
                    const DATEPICKER = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field])(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }

                    </FormItem>
                    formItemList.push(DATEPICKER);
                }
                
            })
        }
        return formItemList;
    }
    render(){
        return (
            <Form layout='inline'>
                {this.initFormList()}
                <FormItem>
                    <Button type='primary' style={{margin:'0px 10px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button type='primary' onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
export default Form.create({})(FilterForm);