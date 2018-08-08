import React from 'react'
import { Link } from 'react-router-dom'
export default class Main extends React.Component{
  render(){
    return(
          <div>
            this is main area
            <Link to='/main/detail1'>嵌套路由1</Link>
            <Link to='/main/detail2'>嵌套路由2</Link>
            <hr/>
            {this.props.children}
          </div>
    )
  }
}
