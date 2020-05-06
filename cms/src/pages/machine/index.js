import React from 'react';
import {Card, Button, Form, Select, DatePicker, Modal, Radio, Input} from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
export default class Machine extends React.Component{

    params = {
        page:1
    }

    state = {
        isVisible:false
    }
    formList = [
        {
            type:'INPUT',
            label:'机器编号',
            field:'user_name',
            placeholder:'请输入机器编号',
            width:100
        },
        {
            type:'SELECT',
            label:'机器类型',
            field:'user_mobile',
            placeholder:'请选择机器类型',
            width:100
        },
        {
            type:'SELECT',
            label:'机器状态',
            field:'user_mobile',
            placeholder:'请选择机器状态',
            width:100
        },
        {
            type:'SELECT',
            label:'所属区域',
            field:'user_mobile',
            placeholder:'请选择区域',
            width:100
        }
    ]

    componentDidMount(){
        this.requestList();
    }

    handleFilter = (params)=>{
        this.params = params;
        this.requestList();
    }
    requestList = ()=>{
        axios.requestList(this,'/machine/list',this.params);
    }
    handleOperate = (type)=>{
        let item = this.state.selectedItem;
        if(type == 'create'){
            this.setState({
                type,
                isVisible:true,
                title:'添加机器'
            })
        }else if(type == 'edit'){
            if(!item == 'edit'){
                Modal.info({
                    title:"提示",
                    content:"请选择一台机器"
                })
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:'编辑机器',
                userInfo:item
            })
        }else if(type == 'detail'){
            this.setState({
                type,
                isVisible:true,
                title:'机器详情',
                userInfo:item
            })
        }else {
            if(!item == 'edit'){
                Modal.info({
                    title:"提示",
                    content:"请选择一台机器"
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title:'确认删除',
                content:'是否要删除当前选中的机器',
                onOk(){
                    axios.ajax({
                        url:'/machine/delete',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then((res)=>{
                        if(res.code == 0){
                            _this.setState({
                                isVisible:false
                            })
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }
    
    //创建机器提交
    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url:type=='create'?'/machine/add':'/machine/edit',
            data:{
                params:{
                    params:data
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                this.userForm.props.form.resetFields();
                this.setState({
                    isVisible:false
                })
                this.requestList();
            }
        })
    }
    
    render(){
        const columns = [
            {
                title:'机器编号',
                dataIndex:'id',
            },
            {
                title:'机器类型',
                dataIndex:'machine_type',
            },    
            {
                title:'具体位置',
                dataIndex:'address',
            },   
            {
                title:'所属商户',
                dataIndex:'owner',               
            },
            {
                title:'投放时间',
                dataIndex:'service_time',
            },
            {
                title:'工作时长',
                dataIndex:'usetime',
            },  
            {
                title:'剩余袋量',
                dataIndex:'remain_num'
           
            },
            {
                title:'机器状态',
                dataIndex:'status',
           
            },
        ]
        let footer = {};
        if(this.state.type == 'detail'){
            footer = {
                footer: null
            }
        }
        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}} className="operate-wrap">
                    <Button type='primary' icon='plus' onClick={()=>this.handleOperate('create')}>添加机器</Button>
                    <Button type='primary' icon='edit' onClick={()=>this.handleOperate('edit')}>编辑机器</Button>
                    <Button type='primary' onClick={()=>this.handleOperate('detail')}>机器详情</Button>
                    <Button type='primary' icon='delete' onClick={()=>this.handleOperate('delete')}>移除机器</Button>
                </Card>
                <div className='content-wrap'>
                    <ETable
                        updateSelectedItem = {Utils.updateSelectedItem.bind(this)} 
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem = {this.state.selectedItem}
                        rowSelection = 'false'
                    />
                </div>
                <Modal 
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible:false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>{this.userForm = inst}} />
                </Modal>
            </div>
        )
    }
}

class UserForm extends React.Component{

    getState = (state)=>{
        return  {
            '1':'咸鱼一条',
            '2':'工大才子',
            '3':'百度FE',
            '4':'创业者',
            '5':'待业'
        }[state]
    }

    render(){
        let type = this.props.type;
        let userInfo = this.props.userInfo;
        const {getFieldDecorator} = this.props.form;
        const FormItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <Form layout="horizontal">
                <FormItem label="用户名" {...FormItemLayout}>
                    {
                        type == 'detail'?userInfo.username:
                        getFieldDecorator('user_name',{
                            initialValue:userInfo.username
                        })(
                            <Input type="text" placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...FormItemLayout}>
                    {
                        type == 'detail'?userInfo.sex==1?'男':'女':
                        getFieldDecorator('sex',{
                            initialValue:userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...FormItemLayout}>
                    {
                        type == 'detail'?this.getState(userInfo.state):
                        getFieldDecorator('status',{
                            initialValue:userInfo.sex
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子</Option>
                                <Option value={4}>创业</Option>
                                <Option value={5}>待业</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...FormItemLayout}>
                    {
                        type == 'detail'?userInfo.birthday:
                        getFieldDecorator('birthday',{
                            initialValue:moment(userInfo.birthday)
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...FormItemLayout}>
                    {
                        type == 'detail'?userInfo.address:
                        getFieldDecorator('address',{
                            initialValue:userInfo.address
                        })(
                            <TextArea rows={3} placeholder="请输入联系方式"/>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm  = Form.create({})(UserForm);