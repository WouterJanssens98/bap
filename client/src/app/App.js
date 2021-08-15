import {React } from 'react';
import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import * as Routes from './routes';
import * as  Pages from './pages';
import {DashboardLayout,PageLayout} from './layouts';
import { AuthRouteWithLayout, RouteWithLayout } from './utilities';
import { ApiProvider, AuthProvider } from './services';
import 'semantic-ui-css/semantic.min.css';
import 'reactjs-popup/dist/index.css';
import 'react-awesome-slider/dist/styles.css';

import './app.scss';

function App() {
  

  return (
    <div className="app">
      <AuthProvider>
        <ApiProvider>
          <Router basename='/'>
            <Switch>
              <Redirect exact from={Routes.DASHBOARD} to={Routes.DASHBOARD_HOME} />
              <RouteWithLayout exact path={Routes.HOME} component={Pages.HomePage} layout={PageLayout}/>
              <RouteWithLayout exact path={Routes.SELECTION} component={Pages.SelectionPage} layout={PageLayout}/>
              <RouteWithLayout exact path={Routes.SELECTIE} component={Pages.Selectie} layout={PageLayout}/>
              <RouteWithLayout exact path={Routes.SELECTIE_PERIODE} component={Pages.SelectiePeriode} layout={PageLayout}/>
              <RouteWithLayout exact path={Routes.SELECTIE_RENNER} component={Pages.SelectieRenner} layout={PageLayout}/>
              <RouteWithLayout exact path={Routes.COMPLETE_INFO} component={Pages.CompleteInfoPage} layout={PageLayout}/>
              <RouteWithLayout exact path={Routes.RONDLEIDING_PERIODE} component={Pages.RondleidingPeriode} layout={PageLayout}/>
              <RouteWithLayout exact path={Routes.RONDLEIDING_RENNERS} component={Pages.RondleidingRenners} layout={PageLayout}/>
              <RouteWithLayout exact path={Routes.RONDLEIDING_QUIZ} component={Pages.QuizPage} layout={PageLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_HOME} component={Pages.DashboardHomePage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_RENNERS} component={Pages.DashboardRennersPage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_RITTEN} component={Pages.DashboardRittenPage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_PERIODES} component={Pages.DashboardPeriodesPage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_RENNERS_ADD} component={Pages.DashboardRennersAddPage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_RITTEN_ADD} component={Pages.DashboardRittenAddPage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_PERIODES_ADD} component={Pages.DashboardPeriodesAddPage} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_PERIODES_SHOW} component={Pages.DashboardPeriodesShow} layout={DashboardLayout}/>
              <AuthRouteWithLayout exact path={Routes.DASHBOARD_PERIODES_EDIT} component={Pages.DashboardPeriodesEdit} layout={DashboardLayout}/>
              <RouteWithLayout exact path={Routes.LOGIN} component={Pages.SignInPage} layout={PageLayout}/>
              <RouteWithLayout exact path={Routes.REGISTER} component={Pages.SignUpPage} layout={PageLayout}/>
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
