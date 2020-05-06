import React from 'react';
import {Card,Form} from 'antd';
import BaseForm from '../../components/BaseForm';
import axios from '../../axios';

export default class Machinemap extends React.Component{
    state = {}
    map= '';

    formList = [
        {
            type:'SELECT',
            label:'地区',
            field:'city',
            placeholder:'全部',
            initialValue:'0',
            width:100,
            list:[{id:'0',name:'北京全市'},{id:'1',name:'西城区'},{id:'2',name:'东城区'},{id:'3',name:'延庆区'},{id:'4',name:'密云区'},{id:'5',name:'朝阳区'},{id:'6',name:'丰台区'},{id:'7',name:'石景山区'},
                  {id:'8',name:'海淀区'},{id:'9',name:'门头沟区'},{id:'10',name:'房山区'},{id:'11',name:'通州区'},{id:'12',name:'顺义区'},{id:'13',name:'昌平区'},{id:'14',name:'大兴区'},{id:'15',name:'怀柔区'},{id:'16',name:'平谷区'}]
        },
        {
            type:'时间查询'
        },
        {
            type:'SELECT',
            label:'机器状态',
            field:'order_status',
            placeholder:'全部',
            initialValue:'0',
            list:[{id:'0',name:'全部'},{id:'1',name:'正常'},{id:'2',name:'损坏'},{id:'3',name:'缺袋'}]
        },
    ]
    requestList = ()=>{
        axios.ajax({
            url:'/map/machine_list',
            data:{
                params:this.params
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    total_count:res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }

    componentDidMount(){
        this.requestList();
    }

    handleFilterSubmit = (filterParams)=>{
        this.params = filterParams;
        this.requestList();
    }
    renderMap = (res)=>{

        //地图初始化、显示
        let list = res.result.route_list
        this.map = new window.BMap.Map('container');
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0],gps1[1])
        let gps2 = list[list.length-1].split(',');
        let endPoint = new window.BMap.Point(gps2[0],gps2[1])
        this.map.centerAndZoom(endPoint,11);

          //绘制机器Icon  
          let bikeList = res.result.bike_list;
          let bikeIcon = new window.BMap.Icon('/assets/weizhi2.png',new window.BMap.Size(36,42),{
              imageSize:new window.BMap.Size(36,42),
              anchor: new window.BMap.Size(18,42)
          });
          bikeList.forEach((item)=>{
              let p = item.split(',');
              let point = new window.BMap.Point(p[0],p[1]);
              //let bikeMarker = new window.BMap.Marker(point,{icon:bikeIcon});
              let bikeMarker = new window.BMap.Marker(point);
              this.map.addOverlay(bikeMarker);
          })
  

        //绘制起点、终点Icon
        /*
        let startPointIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        });
        let bikeMarkerStart = new window.BMap.Marker(startPoint,{icon:startPointIcon});
        this.map.addOverlay(bikeMarkerStart);
        let endPointIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        });
        let bikeMarkerEnd = new window.BMap.Marker(endPoint,{icon:endPointIcon});
        this.map.addOverlay(bikeMarkerEnd);
        */

        //绘制车辆路线
        /*
        let routeList = [];
        list.forEach((item)=>{
            let p = item.split(',');
            routeList.push(new window.BMap.Point(p[0],p[1]));

            let polyServiceline = new window.BMap.Polyline(routeList,{
                strokeColor:"#ef4136",
                strokeWeight:2,
                strokeOpacity:1
            })
            this.map.addOverlay(polyServiceline);
        })
        */

        /*//绘制服务区
        let servicePointList = [];
        let serviceList =  res.result.service_list;
        serviceList.forEach((item)=>{
            servicePointList.push(new window.BMap.Point(item.lon,item.lat));
        })
        let polyLine = new window.BMap.Polyline(servicePointList,{
            strokeColor:'#ef4136',
            strokeWeight:2,
            strokeOpacity:1
        })
        this.map.addOverlay(polyLine);
        */

      
    }
    render(){
        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共{this.state.total_count}台趣袋机</div>
                    <div id="container" style={{height:500}}></div>
                </Card>
            </div>
        );
    }
}