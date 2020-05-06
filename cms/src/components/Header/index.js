import React from 'react';
import { Row, Col } from 'antd';
import Util from '../../utils/utils';
import "./index.less";
export default class Header extends React.Component {
    state = {}
    componentWillMount() {
        this.setState({
            userName: "Tina"
        })
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        }, 1000)

    }

    render() {
        const menuType = this.props.menuType;
        return (
            <div className="header">

                <Row className="header-top">
                    {
                        menuType ? 
                        <Col span={6} className="logo">
                            <img src='/assets/logo1.png' alt=""/>
                            <span>趣袋后台管理系统</span>
                        </Col> : ''
                    }
                    <Col span={menuType ? 18:24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' :
                        <Row className="breadcrumb">
                            <Col span={4} className="breadcrumb-title">
                            
                            </Col>
                            <Col span={20} className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-detail">多云</span>
                            </Col>
                        </Row>
                }

            </div>
        );
    }
}