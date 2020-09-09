import React from 'react'
import { Card, Button, Form, Input, Select, Radio, Modal, DatePicker } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
import ETable from '../../components/ETable/index'
import Moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
export default class User extends React.Component {

    state = {
        list: []
    }

    params = {
        page: 1
    }

    requestList = () => {
        axios.ajax({
            url: '/table/list1',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            let _this = this;
            this.setState({
                list: res.result.list.map((item, index) => {
                    item.key = index
                    return item;
                }),
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    componentDidMount() {
        this.requestList();
    }

    // 操作用户
    handleOperator = (type) => {
        let item = this.state.selectedItem;
        if (type == 'create') {
            this.setState({
                title: '创建用户',
                isVisible: true,
                type
            })
        } else if (type == "edit" || type == 'detail') {
            if (!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                title: type == 'edit' ? '编辑用户' : '查看详情',
                isVisible: true,
                userInfo: item,
                type
            })
        } else if (type == "delete") {
            if (!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            Modal.confirm({
                title: '确认',
                content: '确定要删除此用户吗？',
                onOk: () => {
                    axios.ajax({
                        url: '/user/delete',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then((res) => {
                        if (res.code == 0) {
                            this.setState({
                                isVisible: false
                            })
                            this.requestList();
                        }
                    })
                }
            })
        }
    }

    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url: type == 'create' ? '/user/add' : '/user/edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    isVisible: false
                })
                this.requestList();
            }
        })
    }

    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id'
        }, {
            title: '用户名',
            key: 'userName',
            dataIndex: 'userName',
        }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex) {
                return sex == 1 ? '男' : '女'
            }
        }, {
            title: '状态',
            dataIndex: 'state',
            render(state) {
                let config = {
                    '1': 'Potential',
                    '2': 'Enterprise',
                    '3': 'SVIP',
                    '4': 'VIP',
                    '5': 'Common'
                }
                return config[state];
            }
        }, {
            title: '爱好',
            dataIndex: 'interest',
            render(interest) {
                let config = {
                    '1': '游泳',
                    '2': '打篮球',
                    '3': '踢足球',
                    '4': '跑步',
                    '5': '爬山',
                    '6': '看书',
                    '7': '桌球',
                    '8': '麦霸'
                }
                return config[interest];
            }
        }, {
            title: '任务',
            dataIndex: 'isMarried',
            render(isMarried) {
                return isMarried ? '已完成' : '未完成'
            }
        }, {
            title: '生日',
            dataIndex: 'birthday'
        }, {
            title: '联系地址',
            dataIndex: 'address'
        }, {
            title: '早起时间',
            dataIndex: 'time'
        }
        ];
        return (
            <div>
                <Card>
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input type="password" placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登 录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" icon="plus" onClick={() => this.handleOperator('create')}>创建用户</Button>
                    <Button icon="edit" onClick={() => this.handleOperator('edit')}>编辑用户</Button>
                    <Button onClick={() => this.handleOperator('detail')}>用户详情</Button>
                    <Button type="danger" icon="delete" onClick={() => this.handleOperator('delete')}>删除用户</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    width={800}
                    onCancel={() => {
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false,
                            userInfo: ''
                        })
                    }}
                >
                    <UserForm userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(inst) => this.userForm = inst} />
                </Modal>
            </div>
        );
    }
}
class UserForm extends React.Component {

    getState = (state) => {
        return {
            '1': 'Potential',
            '2': 'Enterprise',
            '3': 'SVIP',
            '4': 'VIP',
            '5': 'Common'
        }[state]
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        };
        const userInfo = this.props.userInfo || {};
        const type = this.props.type;
        return (
            <Form layout="horizontal">
                <FormItem label="姓名" {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? userInfo.username :
                            getFieldDecorator('user_name', {
                                initialValue: userInfo.username
                            })(
                                <Input type="text" placeholder="请输入姓名" />
                            )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? userInfo.sex == 1 ? '男' : '女' :
                            getFieldDecorator('sex', {
                                initialValue: userInfo.sex
                            })(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            )}
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? this.getState(userInfo.state) :
                            getFieldDecorator('state', {
                                initialValue: userInfo.state
                            })(
                                <Select>
                                    <Option value={1}>Potential</Option>
                                    <Option value={2}>Enterprise</Option>
                                    <Option value={3}>SVIP</Option>
                                    <Option value={4}>VIP</Option>
                                    <Option value={5}>Common</Option>
                                </Select>
                            )}
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? userInfo.birthday :
                            getFieldDecorator('birthday', {
                                initialValue: Moment(userInfo.birthday)
                            })(
                                <DatePicker />
                            )}
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? userInfo.address :
                            getFieldDecorator('address', {
                                initialValue: userInfo.address
                            })(
                                <Input.TextArea rows={3} placeholder="请输入联系地址" />
                            )}
                </FormItem>
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm);