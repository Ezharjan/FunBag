import React from 'react';
import {Card} from 'antd';
import echartTheme from './../echartTheme';
//按需加载，导入核心类
import echarts from 'echarts/lib/echarts';
//导入折线图
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import themeLight from './../themeLight';

export default class Line extends React.Component{

    componentWillMount(){
        //注入主题
        echarts.registerTheme('Imooc',echartTheme)
    }

    getOption = ()=>{
        let option = {
            title:{
                text:'总订单量'
            },
            tooltip:{
                trigger:'item'
            },
            xAxis:{
                data:['7月','8月','9月','10月','11月','12月']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[
                        10000,
                        20000,
                        15000,
                        30000,
                        20000,
                        12000,
                        25000
                    ]
                }
            ]
        }
        return option;
    }
    getOption2 = ()=>{
        let option = {
            title:{
                text:'主商户订单量'
            },
            tooltip:{
                trigger:'item'
            },
            legend:{
                data:['商户1订单量','商户2订单量','商户3订单量','商户4订单量']
            },
            xAxis:{
                data:['7月','8月','9月','10月','11月','12月']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'商户1订单量',
                    type:'line',
                    data:[
                        1200,
                        3000,
                        4500,
                        6000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name:'商户2订单量',
                    type:'line',
                    data:[
                        3500,
                        2000,
                        5000,
                        6000,
                        7000,
                        13200,
                        8600
                    ]
                },
                {
                    name:'商户3订单量',
                    type:'line',
                    data:[
                        800,
                        2000,
                        4680,
                        6000,
                        8000,
                        9000,
                        9200
                    ]
                },
                {
                    name:'商户4订单量',
                    type:'line',
                    data:[
                        1600,
                        2000,
                        4500,
                        6000,
                        7000,
                        10000,
                        8000
                    ]
                },
            ]
        }
        return option;
    }
    getOption3 = ()=>{
        let option = {
            title:{
                text:'用户使用次数'
            },
            tooltip:{
                trigger:'item'
            },
            xAxis:{
                boundaryGap: false,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[
                        1,
                        4,
                        3,
                        0,
                        2,
                        6,
                        4
                    ],
                    areaStyle: {}
                }
            ]
        }
        return option;
    }

    render(){
        return (
            <div>
                <Card>
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{height:500}}/>
                </Card>
                <Card>
                    <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height:500}}/>
                </Card>
                <Card>
                    <ReactEcharts option={this.getOption3()} theme="Imooc" style={{height:500}}/>
                </Card>
            </div>
        );
    }
}