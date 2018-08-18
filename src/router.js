import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loading from './pages/ui/loading'
import Notification from './pages/ui/notification'
import Message from './pages/ui/messages'
import Tab from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousels from './pages/ui/carousel'
import LoginForm from './pages/form/login'
import RegForm from './pages/form/reg'
import BasicTable from './pages/table/basic'
import Error from './pages/error'
import Admin from './admin';

export default class IRouter extends React.Component{
  render(){
    return(
        <HashRouter>
          <App>
            <Route path="/login" component={Login}></Route>
            <Route path="/admin" render={()=>
              <Admin>
                <Switch>
                  <Route path="/admin/ui/buttons" component={Buttons}></Route>
                  <Route path="/admin/ui/modals" component={Modals}></Route>
                  <Route path="/admin/ui/loading" component={Loading}></Route>
                  <Route path="/admin/ui/notification" component={Notification}></Route>
                  <Route path="/admin/ui/messages" component={Message}></Route>
                  <Route path="/admin/ui/tabs" component={Tab}></Route>
                  <Route path="/admin/ui/gallery" component={Gallery}></Route>
                  <Route path="/admin/ui/carousel" component={Carousels}></Route>
                  <Route path="/admin/form/login" component={LoginForm}></Route>
                  <Route path="/admin/form/reg" component={RegForm}></Route>
                  <Route path="/admin/table/basic" component={BasicTable}></Route>
                  <Route component={Error}></Route>
                </Switch>
              </Admin>
            }></Route>
            <Route path="/order/detail" component={Login}></Route>
          </App>
        </HashRouter>
    )
  }
}