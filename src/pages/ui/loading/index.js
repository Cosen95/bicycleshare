import React from 'react'
import { Card, Spin, Icon, Alert } from 'antd'

export default class Loading extends React.Component{
  render(){
    const icon = <Icon type="smile-o" style={{fontSize:24}} />
      return(
        <div>
          <Card title="Spin用法">
            <Spin size="small"/>
            <Spin style={{margin:'0 10px'}}/>
            <Spin size="large"/>
            <Spin indicator={icon} style={{marginLeft:10}}/>
          </Card>
          <Card title="内容遮罩">
            <Spin tip="Loading...">
              <Alert
                message="贝加尔湖畔"
                description="美妙的音乐"
                type="info"
              />
            </Spin>
          </Card>
          <Card title="带图标的alert提示框">
            <Alert
                message="Success Tips"
                description="Detailed description and advices about successful copywriting."
                type="success"
                showIcon
                closable
                banner
            />
            <Alert
                message="Informational Notes"
                description="Additional description and informations about copywriting."
                type="info"
                showIcon
                closable
                closeText="close now"
            />
            <Alert
                message="Warning"
                description="This is a warning notice about copywriting."
                type="warning"
                showIcon
            />
            <Alert
                message="Error"
                description="This is an error message about copywriting."
                type="error"
                showIcon
            />
          </Card>
        </div>
    )
  }
}
