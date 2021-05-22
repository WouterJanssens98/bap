import React from 'react';
import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import * as Routes from './routes';
import { HomePage,DashboardHomePage,DashboardRennersPage,DashboardRittenPage,DashboardPeriodesPage,DashboardRennersAddPage,DashboardRittenAddPage, DashboardPeriodesAddPage,SignInPage,SignUpPage,DashboardPeriodesShow,DashboardPeriodesEdit} from './pages';
import {DashboardLayout,PageLayout, AuthLayout} from './layouts';
import { AuthRouteWithLayout, RouteWithLayout } from './utilities';
import { ApiProvider, AuthProvider } from './services';
import 'semantic-ui-css/semantic.min.css'

import './app.scss';

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <ApiProvider>
          <Router basename='/'>
            <Switch>
            
              <RouteWithLayout exact path={Routes.HOME} component={HomePage} layout={PageLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_HOME} component={DashboardHomePage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_RENNERS} component={DashboardRennersPage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_RITTEN} component={DashboardRittenPage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_PERIODES} component={DashboardPeriodesPage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_RENNERS_ADD} component={DashboardRennersAddPage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_RITTEN_ADD} component={DashboardRittenAddPage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_PERIODES_ADD} component={DashboardPeriodesAddPage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_PERIODES_SHOW} component={DashboardPeriodesShow} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_PERIODES_EDIT} component={DashboardPeriodesEdit} layout={DashboardLayout}/>
              <RouteWithLayout exact path={Routes.LOGIN} component={SignInPage} layout={PageLayout}/>
              <RouteWithLayout exact path={Routes.REGISTER} component={SignUpPage} layout={PageLayout}/>
              {/* <Redirect from="/dashboard" to="/dashboard/overview" /> */}
              {/* <RouteWithLayout exact path={Routes.REGISTER} component={LoginPage}/> */}
           
            </Switch>
          </Router>
        </ApiProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
