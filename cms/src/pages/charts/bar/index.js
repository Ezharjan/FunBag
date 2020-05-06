import React from 'react';
import {Card} from 'antd';
import echartTheme from './../echartTheme';
//按需加载，导入核心类
import echarts from 'echarts/lib/echarts';
//导入柱形图
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends React.Component{

    componentWillMount(){
        //注入主题
        echarts.registerTheme('Imooc',echartTheme)
    }


    getOption = ()=>{
        let option = {
            title:{
                text:'地区订单量'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['门头沟区','顺义区','平谷区','房山区','朝阳区','海淀区','大兴区','丰台区','东城区','西城区','石景山区','通州区','怀柔区','昌平区','延庆区','密云区']
            },
            yAxis:{
                    type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'bar',
                    data:[200,300,300,700,400,1000,2000,1500,800,1300,1200,800,600,350,420,500]
                }
            ]
        }
        return option;
    }
    getOption2 = ()=>{
        let option = {
            title:{
                text:'商户订单量'
            },
            legend:{
                data:['商户1','商户2','商户3','商户4']
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                    type:'value'
            },
            series:[
                {
                    name:'商户1',
                    type:'bar',
                    data:[2000,3000,5500,7000,8000,12000,20000]
                },
                {
                    name:'商户2',
                    type:'bar',
                    data:[1500,3000,4500,6000,8000,10000,15000]
                },
                {
                    name:'商户3',
                    type:'bar',
                    data:[1000,2000,2500,4000,6000,7000,8000]
                },
                {
                    name:'商户4',
                    type:'bar',
                    data:[2000,3500,4500,4000,5000,2300,4000]
                }
            ]
        }
        return option;
    }

    render(){
        return (
            <div>
                <Card title='12月份各区域订单情况'>
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{height:500}}/>
                </Card>
                <Card title='主商户近一周数据' style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height:500}}/>
                </Card>
            </div>
        );
    }
}