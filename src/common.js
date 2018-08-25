import React from 'react'
import { Col,Row} from 'antd'
import './style/common.less'
import Header from './components/Header'

export default class Common extends React.Component {
  render() {
    return (
        <div>
          <Row className="simple-page">
            <Header menuType="orderDetail"/>
          </Row>
          <Row className="content">
            {this.props.children}
          </Row>
        </div>
    )
  }
}