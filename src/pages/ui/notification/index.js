import React from 'react'
import { Button, notification, Card } from 'antd'

export default class Notification extends React.Component{
  openNotification =(type,direction) => {
    if(direction){
      notification.config({
        placement: direction
      })
    }
    notification[type]({
      message: '待办事项',
      description: '你有一项社保业务尚未办理',
      // icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />
    })
  }
  render(){
    return(
        <div>
          <Card title="notification（通知提醒框）">
            <Button type="primary" onClick={()=>this.openNotification('success')}>Success</Button>
            <Button type="primary" onClick={()=>this.openNotification('info')}>Info</Button>
            <Button type="primary" onClick={()=>this.openNotification('error')}>Error</Button>
            <Button type="primary" onClick={()=>this.openNotification('warning')}>Warning</Button>
          </Card>
          <Card title="notification（不同方向的通知提醒框）">
            <Button type="primary" onClick={()=>this.openNotification('success','topLeft')}>Success</Button>
            <Button type="primary" onClick={()=>this.openNotification('info','topRight')}>Info</Button>
            <Button type="primary" onClick={()=>this.openNotification('error','bottomLeft')}>Error</Button>
            <Button type="primary" onClick={()=>this.openNotification('warning','bottomRight')}>Warning</Button>
          </Card>
        </div>
    )
  }
}