import React from 'react'
import { Card, Button, Icon, Radio } from 'antd'
import '../ui.less'
const ButtonGroup = Button.Group;
export default class Buttons extends React.Component{
  state = {
    loading:true,
    size: 'default'
  }
  handleCloseLoading() {
    const { loading } = this.state;
    this.setState({
      loading:!loading
    })
  }
  handleSizeChange =(e)=> {
    this.setState({
      size: e.target.value
    })
  }
  render(){
    const size = this.state.size;
    return(
        <div>
         <Card title="基础按钮">
           <Button type="primary">蚂蚁</Button>
           <Button>公牛</Button>
           <Button type="dashed">热火</Button>
           <Button type="danger">湖人</Button>
           <Button disabled>勇士</Button>
         </Card>
          <Card title="图形按钮">
            <Button icon="plus">创建</Button>
            <Button icon="edit">编辑</Button>
            <Button icon="delete">删除</Button>
            <Button shape="circle" icon="search"></Button>
            <Button type="primary" icon="search">搜索</Button>
            <Button type="primary" icon="download">下载</Button>
          </Card>
          <Card title="loading按钮">
            <Button type="primary"  loading={this.state.loading}>确定</Button>
            <Button type="dashed" shape="circle" loading={this.state.loading}>热火</Button>
            <Button loading={this.state.loading}>点击加载</Button>
            <Button type="primary" onClick={this.handleCloseLoading.bind(this)}>关闭</Button>
          </Card>
           <Card title="按钮组">
             <ButtonGroup>
               <Button type="primary" style={{ marginRight:0 }}>
                 <Icon type="left" />Go back
               </Button>
               <Button type="primary">
                 Go forward<Icon type="right" />
               </Button>
             </ButtonGroup>
             <ButtonGroup>
               <Button type="primary" icon="cloud" style={{ marginRight:0 }} />
               <Button type="primary" icon="cloud-download" />
             </ButtonGroup>
           </Card>
            <Card title="按钮尺寸">
              <Radio.Group value={size} onChange={this.handleSizeChange}>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
              <br /><br />
              <Button type="primary" size={size}>Primary</Button>
              <Button size={size}>Normal</Button>
              <Button type="dashed" size={size}>Dashed</Button>
              <Button type="danger" size={size}>Danger</Button>
              <br />
              <Button type="primary" shape="circle" icon="download" size={size} />
              <Button type="primary" icon="download" size={size}>Download</Button>
            </Card>
        </div>
    )
  }
}
