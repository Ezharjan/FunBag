import React from 'react'
import { Card, Button, Modal } from 'antd'
export default class Modals extends React.Component {
    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    };
    showModal = (type) => {
        this.setState({
            [type]: true,
        });
    };
    handleConfirm = (type) => {
        Modal[type] ({
            title: "确认？",
            content: "是否要删除",
            onOk(){
                console.log("ok")
            },
            onCancel(){
                console.log("cancel")
            }
        })
    };
    handleOk = e => {
        console.log(e);
        this.setState({
            showModal1: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            showModal1: false,
        });
    };
    render() {
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={() => this.showModal('showModal1')}>
                        Open Modal
                    </Button>
                    <Button type="primary" onClick={() => this.showModal('showModal2')}>
                        自定义页脚
                    </Button>
                    <Button type="primary" onClick={() => this.showModal('showModal3')}>
                        顶部20px弹框
                    </Button>
                    <Button type="primary" onClick={() => this.showModal('showModal4')}>
                        水平垂直居中
                    </Button>

                </Card>
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>
                        Confirm
                    </Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>
                        Info
                    </Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>
                        Success
                    </Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>
                        warning
                    </Button>

                </Card>
                <Modal title="Basic Modal"
                    visible={this.state.showModal1}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <Modal title="自定义页脚"
                    visible={this.state.showModal2}
                    okText="下一步"
                    cancelText="算了"
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}