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
export default class Consumer extends React.Component{

    params = {
        page:1
    }

    state = {
        isVisible:false
    }
    formList = [
        {
            type:'INPUT',
            label:'用户名',
            field:'user_name',
            placeholder:'请输入用户名称',
            width:60
        },
        /*{
            type:'DATEPICKER',
            label:'请选择创建日期',
            field:'user_date',
            placeholder:'请输入日期'
        },*/
        {
            type:'INPUT',
            label:'用户手机号',
            field:'user_mobile',
            placeholder:'请输入用户手机号',
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
        axios.requestList(this,'/user/list',this.params);
    }
    handleOperate = (type)=>{
        let item = this.state.selectedItem;
        
        if(type == 'create'){
            this.setState({
                type,
                isVisible:true,
                title:'创建用户'
            })
        }else if(type == 'edit'){
            if(!item == 'edit'){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:'编辑用户',
                userInfo:item
            })
        }else if(type == 'detail'){
            this.setState({
                type,
                isVisible:true,
                title:'用户详情',
                userInfo:item
            })
        }else {
            if(!item == 'edit'){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title:'确认删除',
                content:'是否要删除当前选中的用户',
                onOk(){
                    axios.ajax({
                        url:'/user/delete',
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
    
    //创建员工提交
    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url:type=='create'?'/user/add':'/user/edit',
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
                title:'用户编号',
                dataIndex:'id',
            },
            {
                title:'用户名',
                dataIndex:'username',
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex == 1 ?'男':'女'
                }
            },
            {
                title:'手机号',
                dataIndex:'phone',
            },
           /*{
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'工大才子',
                        '3':'百度FE',
                        '4':'创业者',
                        '5':'待业'
                    }
                    return config[state];
                }
            },*/
            {
                title:'爱好',
                dataIndex:'interest',
                render(state){
                    return {
                        '1':'足球',
                        '2':'篮球',
                        '3':'乒乓球',
                        '4':'羽毛球',
                        '5':'网球',
                        '6':'排球',
                        '7':'橄榄球',
                        '8':'毽球'
                    }[state]
                }
                
            },
            {
                title:'生日',
                dataIndex:'birthday',
            },
            {
                title:'年龄',
                dataIndex:'age',
            },  
            {
                title:'联系地址',
                dataIndex:'address',
            },
            {
                title:'创建时间',
                dataIndex:'buildtime',
            },
            {
                title:'使用时长',
                dataIndex:'usetime',
            },
            {
                title:'用袋总量',
                dataIndex:'totaluse',
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
                    <Button type='primary' icon='plus' onClick={()=>this.handleOperate('create')}>添加用户</Button>
                    <Button type='primary' icon='edit' onClick={()=>this.handleOperate('edit')}>编辑用户</Button>
                    <Button type='primary' onClick={()=>this.handleOperate('detail')}>用户详情</Button>
                    <Button type='primary' icon='delete' onClick={()=>this.handleOperate('delete')}>移除用户</Button>
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