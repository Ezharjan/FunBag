import React from 'react';
import {Card, Button, Form, Select, Table, DatePicker, Modal, message} from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils';
import BaseForm from './../../components/BaseForm';
import ETable from './../../components/ETable';
const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends React.Component{
    state = {
        orderInfo:{},
        orderConfirmVisible:false
    }
    params = {
        page: 1
    }

    formList = [
        {
            type:'SELECT',
            label:'区域',
            field:'city',
            placeholder:'全部',
            initialValue:'0',
            width:100,
            list:[{id:'0',name:'北京全市'},{id:'1',name:'西城区'},{id:'2',name:'东城区'},{id:'3',name:'延庆区'},{id:'4',name:'密云区'},{id:'5',name:'朝阳区'},{id:'6',name:'丰台区'},{id:'7',name:'石景山区'},
                  {id:'8',name:'海淀区'},{id:'9',name:'门头沟区'},{id:'10',name:'房山区'},{id:'11',name:'通州区'},{id:'12',name:'顺义区'},{id:'13',name:'昌平区'},{id:'14',name:'大兴区'},{id:'15',name:'怀柔区'},{id:'16',name:'平谷区'}]
        },
        {
            type:'时间查询',
            label:'订单时间'
        }/*,
        {
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            initialValue:'0',
            width:100,
            list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'结束行程'}]
        }*/
    ]

    componentDidMount(){
        this.requestList();
    }

    handleFilter = (params)=>{
        this.params = params;
        this.requestList();
    }

    requestList = ()=>{
        axios.requestList(this,'/order/list',this.params,true)  
    }
    handleConfirm = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请选择一条订单进行结束'
            })
            return ;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code == '0'){
                this.setState({ 
                    orderInfo:res.result,
                    orderConfirmVisible:true
                })
            }
        })
    }
    //结束订单
    handleFinishOrder = ()=>{
        let item = this.state.selectedItem.id;
        axios.ajax({
            url:'/order/finish_order',
            data:{
                params:{orderId: item.id}
            }
        }).then((res)=>{
            if(res.code == '0'){
                message.success('订单结束成功');
                this.setState({ 
                    orderConfirmVisible:false
                })
                this.requestList();
            }
        })
    }

    openOrderDetail = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请先选择一条订单'
            })
            return ;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank');
    }
    render(){
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_id'
            },
            {
                title:'机器编号',
                dataIndex:'machine_id'
            },
            {
                title:'用户编号',
                dataIndex:'user_id'
            },
            {
                title:'用户名',
                dataIndex:'user_name' 
            },
            {
                title:'商户编号',
                dataIndex:'shop_id' 
            },
            {
                title:'商户名称',
                dataIndex:'shop_name' 
            },

            /*{
                title:'手机号',
                dataIndex:'mobile'
            },*/
            /*{
                title:'里程',
                dataIndex:'distance',
                render(distance){
                    return distance/1000 + 'Km'
                }
            },*/
            
            /*{
                title:'行驶时长',
                dataIndex:'total_time'
            },*/
      
            {
                title:'下单时间',
                dataIndex:'order_time'
            },
            /*{
                title:'结束时间',
                dataIndex:'end_time'
            },*/      
            {
                title:'机器状态',
                dataIndex:'machine_status'
            },
            {
                title:'机器类型',
                dataIndex:'machine_type'
            },
            {
                title:'订单金额',
                dataIndex:'order_fee'
            },
            /*{
                title:'实付金额',
                dataIndex:'user_pay'
            }*/
        ]
        const formLayout = {
            labelCol:{span:5},
            rrapperCol:{span:19}
        }
        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}} className="operate-wrap">
                    <Button type='primary' onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type='primary' style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className='content-wrap'>
                    <ETable
                        updateSelectedItem = {Utils.updateSelectedItem.bind(this)} 
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedIds = {this.state.selectedIds}
                        selectedItem = {this.state.selectedItem}
                        rowSelection = 'checkbox'
                    />
                </div>
                <Modal
                    title='结束订单'
                    visible={this.state.orderConfirmVisible}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisible:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label='车辆编号' {...formLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label='剩余电量' {...formLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label='行程开始时间' {...formLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label='当前位置' {...formLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
class FilterForm extends React.Component{
    render(){
        return(
            <Form layout='inline'>
                <FormItem label='城市'>
                    <Select
                        style={{width:100}}
                        placeholder='全部'
                    >
                        <Option value=''>全部</Option>
                        <Option value='1'>北京市</Option>
                        <Option value='2'>天津市</Option>
                        <Option value='3'>深圳市</Option>
                    </Select>
                </FormItem>
                <FormItem label='订单时间'>
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </FormItem>
                <FormItem >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </FormItem>
                <FormItem label='订单状态'>
                    <Select
                        style={{width:140}}
                        placeholder='全部'
                    >
                        <Option value=''>全部</Option>
                        <Option value='1'>进行中</Option>
                        <Option value='2'>进行中(临时锁车)</Option>
                        <Option value='3'>行程结束</Option>
                    </Select>
                </FormItem>
                <FormItem >
                    <Button type='primary' style={{margin:'0px 20px'}}>查询</Button>
                    <Button type='primary' style={{marginLeft:10}}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}