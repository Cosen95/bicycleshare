import React from 'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component{
  render(){
    return(
            <div>
              <ul>
                <li><Link to="/main">首页2.0</Link></li>
                <li><Link to="/about">关于2.0</Link></li>
                <li><Link to="/topic">主题列表2.0</Link></li>
              </ul>
              <hr/>
              {this.props.children}
            </div>
    )
  }
}
