import React from 'react'
import { message, Button, Card } from 'antd'

export default class Message extends React.Component{
  showMessage=(type)=>{
    message[type]('你有一条新信息')
  }
  render(){
    return(
        <div>
          <Card title="全局提示">
            <Button type="primary" onClick={()=>this.showMessage('success')}>success</Button>
            <Button type="primary" onClick={()=>this.showMessage('info')}>info</Button>
            <Button type="primary" onClick={()=>this.showMessage('warning')}>warning</Button>
            <Button type="primary" onClick={()=>this.showMessage('error')}>error</Button>
            <Button type="primary" onClick={()=>this.showMessage('loading')}>loading</Button>
          </Card>
        </div>
    )
  }
}