import React from 'react'
import { Card, Button, Table, Form, Select, Modal, message } from 'antd'
import axios from './../../axios/index';
import Utils from './../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {
    state = {
        list: [],
        isShowOpenCity: false
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.requestList();
    }
    //默认请求接口数据
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/opencity',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            this.setState({
                list: res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                }),
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })

        })
    }
    // 开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        })
    }
    //城市开通提交
    handleSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        axios.ajax({
            url:'/city/open',
            data:{
                params:cityInfo
            }
        }).then((res)=>{
            if(res.code=='0'){
                message.success('开通成功');
                this.setState({
                    isShowOpenCity:false
                });
                this.requestList();
            }
            
        })
    }
    render() {
        const columns = [
            {
                title: '商户编号',
                dataIndex: 'id'
            },
            {
                title: '商户名称',
                dataIndex: 'name'
            },
            {
                title: '商户位置',
            
            },
            {
                title: '机器数量',
            
            },

            /*{
                title: '机器模式',
                dataIndex: 'mode',
                render(mode){
                    return mode==1?'停车点':'禁停区';
                }
            },*/
            /*{
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode){
                    return op_mode==1?'自营':'加盟';
                }
            },*/
            /*{
                title: '授权加盟商',
                dataIndex: 'franceisee_name'
            },*/
            {
                title: '商户负责人',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            },
            {
                title: '投放时间',
                dataIndex: 'open_time'
            },
            /*{
                title: '操作时间',
                dataIndex: 'update_time',
                render: Utils.formateDate
            },*/
            /*{
                title: '操作人',
                dataIndex: 'sys_user_name'
            }, */
            {
                title: '总订单量',
                //dataIndex: 'sys_user_name'
            },
        
           
            
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type='primary' onClick={this.handleOpenCity}>添加商户</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst}} />
                </Modal>
            </div>
        );
    }
}

class FilterForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label='区域'>
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{ width: 100 }}
                                placeholder='全部'> 
                                <Option value=''>全部</Option>
                                <Option value='1'>海淀区</Option>
                                <Option value='2'>朝阳区</Option>
                                <Option value='3'>大兴区</Option>
                                <Option value='4'>西城区</Option>
                                <Option value='5'>东城区</Option>
                                <Option value='6'>丰台区</Option>
                                <Option value='7'>通州区</Option>
                                <Option value='8'>延庆区</Option>
                                <Option value='9'>怀柔区</Option>
                                <Option value='10'>昌平区</Option>
                                <Option value='11'>密云区</Option>
                                <Option value='12'>门头沟区</Option>
                                <Option value='13'>石景山区</Option>
                                <Option value='14'>房山区</Option>
                                <Option value='15'>顺义区</Option>
                                <Option value='16'>平谷区</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="商户名称">
                    {
                        getFieldDecorator('mode')(
                            <Select
                                style={{ width: 140 }}
                                placeholder='全部'>
                                <Option value=''>全部</Option>
                                <Option value='1'>京客隆</Option>
                                <Option value='2'>家乐福</Option>
                                <Option value='3'>世纪华联</Option>
                                <Option value='4'>万家福</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="机器数量">
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                                style={{ width: 80 }}
                                placeholder='全部'>
                                <Option value=''>全部</Option>
                                <Option value='1'>1</Option>
                                <Option value='2'>2</Option>
                                <Option value='3'>3</Option>
                                <Option value='4'>4</Option>
                                <Option value='5'>5</Option>
                                <Option value='6'>6</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );

    }
}
FilterForm = Form.create({})(FilterForm);

class OpenCityForm extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal" >
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                            </Select>
                        )
                    }

                </FormItem>
                <FormItem label="运营模式" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('use_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="1">指定订车点</Option>
                                <Option value="2">禁停区</Option>
                            </Select>
                        )
                    }
                    
                </FormItem>
            </Form>
        )
    }
}
OpenCityForm = Form.create({})(OpenCityForm);