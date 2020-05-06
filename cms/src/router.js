import React from 'react'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Home from './pages/home'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notifications from './pages/ui/notifications'
import Messages from './pages/ui/messages'
import Tabss from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousels from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import Shop from './pages/shop/index'
import Order from './pages/order/index'
import NoMatch from './pages/nomatch'
import Common from './common'
import OrderDetail from './pages/order/detail'
import Staff from './pages/staff/index'
import Machinemap from './pages/machinemap/index'
import Bar from './pages/charts/bar'
import Pie from './pages/charts/pie'
import Line from './pages/charts/line'
import RichText from './pages/rich'
import Permission from './pages/permission'
import Consumer from './pages/consumer'
import Machine from './pages/machine'
export default class IRouter extends React.Component {
    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/common" render={()=>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                        </Common>
                    } />  
                    <Route path="/" render={()=>
                        <Admin>
                            <Switch>
                                
                                <Route path="/ui/buttons" component={Buttons} />
                                <Route path="/ui/modals" component={Modals} />
                                <Route path="/ui/loadings" component={Loadings} />
                                <Route path="/ui/notifications" component={Notifications} />
                                <Route path="/ui/messages" component={Messages} />
                                <Route path="/ui/tabs" component={Tabss} />
                                <Route path="/ui/gallery" component={Gallery} />
                                <Route path="/ui/carousel" component={Carousels} />
                                <Route path="/form/login" component={FormLogin} />
                                <Route path="/form/reg" component={FormRegister} />
                                <Route path="/table/basic" component={BasicTable} />
                                <Route path="/table/high" component={HighTable} />
                                <Route path="/shop" component={Shop} />
                                <Route path="/order" component={Order} />
                                <Route path="/staff" component={Staff} />
                                <Route path="/machine" component={Machine} />
                                <Route path="/machinemap" component={Machinemap} />
                                <Route path="/charts/bar" component={Bar} />
                                <Route path="/charts/pie" component={Pie} />
                                <Route path="/charts/line" component={Line} />
                                <Route path="/rich" component={RichText} />
                                <Route path="/consumer" component={Consumer} />
                                <Route path="/permission" component={Permission} />
                                <Route path="/home" component={Home} />
                                <Redirect to="/home" component={Home} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                    
                    </Switch>                 
                </App>
            </HashRouter>
        );
    }
}