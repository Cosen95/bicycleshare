import React from 'react'
import Child from './Child'
import { Button } from 'antd'
// import 'antd/dist/antd.css'
export default class Life extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      count:0
    }
  }

  add() {
    this.setState({
        count:this.state.count+1
    })
  }
  reduce=() => {
    this.setState({
      count:this.state.count-1
    })
  }
  render(){
    let style = {
      padding:50
    }
    return <div style={style}>
      <p>React生命周期</p>
      <Button onClick={this.add.bind(this)}>antd按钮</Button>
      <button onClick={this.add.bind(this)}>点击加一</button>
      <button onClick={this.reduce}>点击减一</button>
      <p>{this.state.count}</p>
      <Child childCount={this.state.count}></Child>
    </div>
  }
}