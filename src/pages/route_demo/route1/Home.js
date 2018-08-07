import React from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import Main from './Main'
import About from './About'
import Topic from './Topic'
export default class Home extends React.Component{
  render(){
    return(
        <HashRouter>
            <div>
              <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/about">关于</Link></li>
                <li><Link to="/topic">主题列表</Link></li>
              </ul>
              <hr/>
              <Switch>
                <Route exact path="/" component={Main}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/topic" component={Topic}></Route>
              </Switch>
            </div>
        </HashRouter>
    )
  }
}
