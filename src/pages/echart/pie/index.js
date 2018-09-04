import React from 'react'
import { Card } from 'antd'
import echartTheme from '../echartTheme'
//import echarts from 'echarts'
//按需加载
import echarts from 'echarts/lib/echarts'
//引入饼状图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Pie extends React.Component{
    componentWillMount(){
        echarts.registerTheme('bicycle',echartTheme);
    }
    getFirstOption = ()=> {
        let option = {
            title : {
                text: '日均骑行量',
                subtext: '来源：ofo大数据平台',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '骑行统计',
                    type: 'pie',
                    radius : '75%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'周一'},
                        {value:310, name:'周二'},
                        {value:234, name:'周三'},
                        {value:135, name:'周四'},
                        {value:1548, name:'周五'},
                        {value:1548, name:'周六'},
                        {value:1548, name:'周日'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }

        return option;
    }
    getSecondOption = ()=> {
        let option = {
            title : {
                text: '日均骑行量',
                subtext: '来源：ofo大数据平台',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '骑行统计',
                    type: 'pie',
                    radius : ['50%','70%'],
                    center: ['50%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'周一'},
                        {value:310, name:'周二'},
                        {value:234, name:'周三'},
                        {value:135, name:'周四'},
                        {value:1548, name:'周五'},
                        {value:1548, name:'周六'},
                        {value:1548, name:'周日'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }

        return option;
    }
    getThirdOption = ()=> {
        let option = {
            title : {
                text: '日均骑行量',
                subtext: '来源：ofo大数据平台',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '骑行统计',
                    type: 'pie',
                    radius : '75%',
                    center: ['50%', '60%'],
                    roseType: 'radius',
                    data:[
                        {value:335, name:'周一'},
                        {value:310, name:'周二'},
                        {value:234, name:'周三'},
                        {value:135, name:'周四'},
                        {value:1548, name:'周五'},
                        {value:1548, name:'周六'},
                        {value:1548, name:'周日'}
                    ].sort((a,b)=>{
                        return a.value - b.value;
                    }),
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }

        return option;
    }
    render(){
        return(<div>
            <Card title="饼形图表一">
                <ReactEcharts option={this.getFirstOption()} theme="bicycle" />
            </Card>
            <Card title="饼形图表二">
                <ReactEcharts option={this.getSecondOption()} theme="bicycle" />
            </Card>
            <Card title="饼形图表三">
                <ReactEcharts option={this.getThirdOption()} theme="bicycle" />
            </Card>
        </div>)
    }
    }