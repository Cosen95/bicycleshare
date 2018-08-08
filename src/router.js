import React from 'react'
import { HashRouter,Route } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Buttons from './pages/ui/buttons'
// import Error from './pages/error'
import Admin from './admin';

export default class IRouter extends React.Component{
  render(){
    return(
        <HashRouter>
          <App>
            <Route path="/login" component={Login}></Route>
            <Route path="/admin" render={()=>
              <Admin>
                <Route path="/admin/ui/buttons" component={Buttons}></Route>
                {/*<Route component={Error}></Route>*/}
              </Admin>
            }></Route>
            <Route path="/order/detail" component={Login}></Route>
          </App>
        </HashRouter>
    )
  }
}