import React from 'react'
import { Card } from 'antd'
import echartTheme from '../echartTheme'
//import echarts from 'echarts'
//按需加载
import echarts from 'echarts/lib/echarts'
//引入柱状图
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Line extends React.Component{
    componentWillMount(){
        echarts.registerTheme('bicycle',echartTheme);
    }
    getFirstOption = ()=> {
        let option = {
            xAxis: [{
                type: 'category',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '订单量',
                type: 'line',
                data: [400,660,540,520,360,200,280]
            }]
        }

        return option;
    }
    getSecondOption = ()=> {
        let option = {
            title: {
                text: '访问来源图'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        }

        return option;
    }
    render(){
        return(<div>
            <Card title="折线图表一">
                <ReactEcharts option={this.getFirstOption()} theme="bicycle" />
            </Card>
            <Card title="折线图表二">
                <ReactEcharts option={this.getSecondOption()} theme="bicycle" />
            </Card>
        </div>)
    }
    }