import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Admin from './admin';
import Common from './common';
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
import HighTable from './pages/table/high'
import City from './pages/city'
import Order from './pages/order'
import OrderDetail from './pages/order/detail'
import Error from './pages/error'

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
                  <Route path="/admin/table/high" component={HighTable}></Route>
                  <Route path="/admin/city" component={City}></Route>
                  <Route path="/admin/order" component={Order}></Route>
                  <Route component={Error}></Route>
                </Switch>
              </Admin>
            }></Route>
            <Route path="/common" render={()=>
              <Common>
                <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
              </Common>
            }></Route>
          </App>
        </HashRouter>
    )
  }
}