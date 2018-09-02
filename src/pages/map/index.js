import React from 'react'
import { Card, Table, Button, Form, Select, Modal, message, DatePicker } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/index'
import BaseForm from '../../components/BaseForm'
import moment from 'moment';

export default class BikeMap extends React.Component{
    state = {}
    formList = [
        {
            type: '城市',
            label: '城市',
            field: 'city',
            placeholder: '请输入城市',
            initialValue: '0',
            list: [{ id:'0',name:'全部'},{ id:'1',name:'北京'},{ id:'2',name:'大连'},{ id:'3',name:'深圳'}]
        },{
            type: '时间查询'
        },{
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '0',
            list: [{ id:'0',name:'全部'},{ id:'1',name:'进行中'},{ id:'2',name:'结束行程'}]

        }
    ]
    componentDidMount(){
        this.requestList();
    }
    requestList = ()=> {
        axios.ajax({
            url: '/map/bike_list',
            data: {
                params: this.params
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    total_count:res.data.total_count
                })
                this.renderMap(res);
            }
        })
    }
    //渲染地图数据
    renderMap = (res)=> {
        let list = res.data.route_list;
        this.map = new window.BMap.Map('container');
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0],gps1[1]);
        let gps2 = list[list.length-1].split(',');
        let endPoint = new window.BMap.Point(gps2[0],gps2[1]);
        this.map.centerAndZoom(endPoint,11);

        let startPointIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        let bikeMarkerStart = new window.BMap.Marker(startPoint,{ icon:startPointIcon });
        this.map.addOverlay(bikeMarkerStart);

        let endPointIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        let bikeMarkerEnd = new window.BMap.Marker(endPoint,{ icon:endPointIcon });
        this.map.addOverlay(bikeMarkerEnd);

        //绘制车辆行驶路线
        let routeList = [];
        list.forEach((item) => {
            let pos = item.split(',');
            routeList.push(new window.BMap.Point(pos[0],pos[1]));
        });
        let polyline = new window.BMap.Polyline(routeList,{
            strokeColor:'#ef4136',
            strokeWeight:2,
            strokeOpacity:1
        })
        this.map.addOverlay(polyline);

        //绘制服务区路线
        let serviceList = res.data.service_list;
        let serviceLineList = [];
        serviceList.forEach((item) => {
            serviceLineList.push(new window.BMap.Point(item.lon,item.lat))
        })
        let polyServiceLine = new window.BMap.Polygon(serviceLineList,{
            strokeColor:'#ef4136',
            strokeWeight:3,
            strokeOpacity:1,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        })
        this.map.addOverlay(polyServiceLine);

        //添加地图中的自行车图标
        let bikeList = res.data.bike_list;
        let bikePointIcon = new window.BMap.Icon('/assets/bike.jpg',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        bikeList.forEach((item) => {
            let bikePos = item.split(',');
            let bikePoint = new window.BMap.Point(bikePos[0],bikePos[1]);
            let bikeMarker = new window.BMap.Marker(bikePoint,{ icon:bikePointIcon });
            this.map.addOverlay(bikeMarker);
        })
    }
    handleFilter = (params)=> {
        this.params = params;
        this.requestList;
    }
    render() {
        return(<div>
            <Card>
                <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
            </Card>
            <Card style={{marginTop:10}}>
                <div>共{this.state.total_count}辆车</div>
                <div id="container" style={{height:500}}></div>
            </Card>
        </div>)
    }
}