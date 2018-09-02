import React from 'react'
import { Card } from 'antd'
import echartTheme from '../echartTheme'
//import echarts from 'echarts'
//按需加载
import echarts from 'echarts/lib/echarts'
//引入柱状图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends React.Component{
    componentWillMount(){
        echarts.registerTheme('bicycle',echartTheme);
    }
    getFirstOption = ()=> {
        let option = {
            title: {
                text: 'ofo骑行统计'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                data: ['周一','周二','周三','周四','周五','周六','周日']
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '订单量',
                type: 'bar',
                data: [400,660,540,520,360,200,280]
            }]
        }

        return option;
    }
    getSecondOption = ()=> {
        let option = {
            title: {
                text: '多种单车骑行统计'
            },
            legend: {
                data: ['ofo','摩拜','小蓝']
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                data: ['周一','周二','周三','周四','周五','周六','周日']
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: 'ofo',
                type: 'bar',
                data: [400,660,540,520,360,200,280]
            },{
                name: '摩拜',
                type: 'bar',
                data: [600,760,840,920,660,500,380]
            },{
                name: '小蓝',
                type: 'bar',
                data: [300,360,540,620,560,700,280]
            }]
        }

        return option;
    }
    render(){
        return(<div>
            <Card title="柱形图表一">
                <ReactEcharts option={this.getFirstOption()} theme="bicycle" />
            </Card>
            <Card title="柱形图表二">
                <ReactEcharts option={this.getSecondOption()} theme="bicycle" />
            </Card>
        </div>)
    }
    }