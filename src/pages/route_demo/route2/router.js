import React from 'react'
import { HashRouter as Router,Route } from 'react-router-dom'
import Topic from "../route1/Topic";
import About from "../route1/About";
import Main from "./Main";
import Home from './Home'

export default class IRouter extends React.Component{
  render(){
    return (
        <Router>
          <Home>
            <Route path="/main" render={() =>
              <Main>
                <Route path="/main/detail1" component={About}></Route>
                <Route path="/main/detail2" component={Topic}></Route>
              </Main>
            }></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/topic" component={Topic}></Route>
          </Home>
        </Router>
    )
  }
}