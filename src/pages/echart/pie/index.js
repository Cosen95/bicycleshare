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
            
        }

        return option;
    }
    getSecondOption = ()=> {
        let option = {
            
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