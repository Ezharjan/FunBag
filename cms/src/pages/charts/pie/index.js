import React from 'react';
import {Card} from 'antd';
import echartTheme from './../themeLight';
//按需加载，导入核心类
import echarts from 'echarts/lib/echarts';
//导入饼图
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends React.Component{

    componentWillMount(){
        //注入主题
        echarts.registerTheme('Imooc',echartTheme)
    }


    getOption = ()=>{
        let option = {
            /*title:{
                text:'各区域订单情况',
                x:'center'
            },*/
            legend:{
                orient:'vertical',
                right:10,
                top:20,               
                bottom:20,
                data:['门头沟区','顺义区','平谷区','房山区','朝阳区','海淀区','大兴区','丰台区','东城区','西城区','石景山区','通州区','怀柔区','昌平区','延庆区','密云区']
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}{c}({d}%)'
            },
            series:[
                {  
                    name:'订单量',
                    type:'pie',
                    radius:['50%', '70%'],
                    center:['50%','60%'],
                    data:[
                        {
                            value:800,
                            name:'门头沟区'
                        },
                        {
                            value:1500,
                            name:'顺义区'
                        },
                        {
                            value:800,
                            name:'平谷区'
                        },
                        {
                            value:1400,
                            name:'房山区'
                        },
                        {
                            value:3200,
                            name:'朝阳区'
                        },
                        {
                            value:2200,
                            name:'海淀区'
                        },
                        {
                            value:1200,
                            name:'大兴区'
                        },
                        {
                            value:800,
                            name:'丰台区'
                        },
                        {
                            value:1200,
                            name:'东城区'
                        },
                        {
                            value:1600,
                            name:'西城区'
                        },
                        {
                            value:300,
                            name:'石景山区'
                        },
                        {
                            value:900,
                            name:'通州区'
                        },
                        {
                            value:400,
                            name:'怀柔区'
                        },
                        {
                            value:400,
                            name:'昌平区'
                        },
                        {
                            value:500,
                            name:'延庆区'
                        },
                        {
                            value:400,
                            name:'密云区'
                        }

                    ]
                }
            ]
        }
        return option;
    }
    getOption2 = ()=>{
        let option = {
            /*title:{
                text:'各商户订单情况',
                x:'center'
            },*/
            legend:{
                orient:'vertical',
                right:10,
                top:40,
                bottom:40,
                data:['商户1','商户2','商户3','商户4']
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}{c}({d}%)'
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    data:[
                        {
                            value:1000,
                            name:'商户1'
                        },
                        {
                            value:1000,
                            name:'商户2'
                        },
                        {
                            value:2000,
                            name:'商户3'
                        },
                        {
                            value:1500,
                            name:'商户4'
                        }

                    ]
                }
            ]
        }
        return option;
    }
    getOption3 = ()=>{
        let option = {
            /*title:{
                text:'用户骑行订单',
                x:'center'
            },*/
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                bottom:20,
                data:['商户1','商户2','商户3','商户4']
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}{c}({d}%)'
            },
            series:[
                {
                    name:'趣袋机投放量',
                    type:'pie',
                    data:[
                        {
                            value:30,
                            name:'商户1'
                        },
                        {
                            value:23,
                            name:'商户2'
                        },
                        {
                            value:25,
                            name:'商户3'
                        },
                        {
                            value:40,
                            name:'商户4'
                        }

                    ].sort((a,b)=>{return a.value-b.value}),
                    roseType: 'radius',
                }
            ]
        }
        return option;
    }
    render(){
        return (
            <div>
                <Card title='各区域订单情况'>
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{height:500}}/>
                </Card>
                <Card title='各商户订单情况' style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height:500}}/>
                </Card>
                <Card title='趣袋机分布情况' style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption3()} theme="Imooc" style={{height:500}}/>
                </Card>
            </div>
        );
    }
}