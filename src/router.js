import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import Admin from './admin';
import Home from './pages/home'
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
import BikeMap from './pages/map'
import Bars from './pages/echart/bar'
import Pie from './pages/echart/pie'
import Line from './pages/echart/line'
import RichText from './pages/rich'
import Permission from './pages/permission'
import Error from './pages/error'

export default class IRouter extends React.Component{
  render(){
    return(
        <HashRouter>
          <App>
            <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/common" render={()=>
              <Common>
                <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
              </Common>
            } />
            <Route path="/" render={()=>
              <Admin>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/ui/buttons" component={Buttons}></Route>
                  <Route path="/ui/modals" component={Modals}></Route>
                  <Route path="/ui/loading" component={Loading}></Route>
                  <Route path="/ui/notification" component={Notification}></Route>
                  <Route path="/ui/messages" component={Message} />>
                  <Route path="/ui/tabs" component={Tab} />
                  <Route path="/ui/gallery" component={Gallery} />
                  <Route path="/ui/carousel" component={Carousels} />
                  <Route path="/form/login" component={LoginForm} />
                  <Route path="/form/reg" component={RegForm} />
                  <Route path="/table/basic" component={BasicTable} />
                  <Route path="/table/high" component={HighTable} />
                  <Route path="/city" component={City} />
                  <Route path="/order" component={Order} />
                  <Route path="/bikeMap" component={BikeMap} />
                  <Route path="/charts/bar" component={Bars} />
                  <Route path="/charts/pie" component={Pie} />
                  <Route path="/charts/line" component={Line} />
                  <Route path="/rich" component={RichText} />
                  <Route path="/permission" component={Permission} /> 
                  <Route component={Error}></Route>
                  <Redirect to="/home" />        
                </Switch>
              </Admin>
            } />
            </Switch>
          </App>
        </HashRouter>
    )
  }
}