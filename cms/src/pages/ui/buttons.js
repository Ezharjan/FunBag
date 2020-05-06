import React from 'react'
import {Card, Button, Icon, Radio } from 'antd'
import './ui.less'
export default class Buttons extends React.Component{
    
    state = {
        loading: true,
        value: 'small'
    }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
    };
    handleCloseLoading = ()=> {
        this.setState({
            loading:false
        })
    }
    render(){
        const { size } = this.state;
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Button disabled>disabled</Button>
                    <Button type="link">Link</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap"> 
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading}>删除</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组" className="card-wrap">
                    <Button.Group size={size}>
                        <Button type="primary">
                            <Icon type="left" />
                            返归
                        </Button>
                        <Button type="primary">
                            前进
                            <Icon type="right" />
                        </Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                    <Radio value="small">小</Radio>
                    <Radio value="middle">中</Radio>
                    <Radio value="large">大</Radio>
                </Radio.Group>
                    <Button type="primary" size={this.state.value}>Primary</Button>
                    <Button size={this.state.value}>Default</Button>
                    <Button type="dashed" size={this.state.value}>Dashed</Button>
                    <Button type="danger" size={this.state.value}>Danger</Button>
                    <Button disabled size={this.state.value}>disabled</Button>
                    <Button type="link">Link</Button>
                </Card>
            </div>
        );
    }
}