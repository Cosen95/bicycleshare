import React from 'react'
import Utils from '../../utils/index'
import {Table} from 'antd'


export default class ETable extends React.Component{
    state = {}
    //处理行点击事件
    onRowClick = (record,index) => {
        
    }
    getOptions = ()=> {
        const { selectedRowKeys } = this.props;

        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
        }
        let row_selection = this.props.rowSelection;
        // 当属性未false或者null时，说明没有单选或者复选列
        if(row_selection===false || row_selection === null){
            row_selection = false;
        }else if(row_selection == 'checkbox'){
            //设置类型未复选框
            rowSelection.type = 'checkbox';
        }else{
            //默认未单选
            row_selection = 'radio';
        } 
        return <Table
            bordered
            {...this.props}
            rowSelection={ rowSelection?rowSelection:null }
            onRow = { (record,index) => {
                onClick: ()=> {
                    if(!row_selection){
                        return;
                    }
                    this.onRowClick(record,index)
                }
            }}
        />
    }

    render(){
     return(
         <div>
             {this.getOptions()}
         </div>
     )     
    }
}