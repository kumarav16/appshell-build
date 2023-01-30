/* 
 *  *************************************************
 *   BH [Highly] Confidential
 *   [Unpublished] Copyright 2020.  Baker Hughes
 *  
 *   NOTICE:  All information contained herein is, and remains the property of Baker Hughes, and/or
 *   its affiliates.  The intellectual and technical concepts contained herein are proprietary to Baker Hughes
 *   and/or its affiliates and may be covered by patents, copyrights, and/or trade secrets.  Dissemination of this information or
 *   reproduction of this material is strictly forbidden unless prior written permission is obtained from Baker Hughes.
 *  **************************************************
 *  
 */

import React, { Component ,lazy,Suspense} from 'react';
import { Switch ,Route   } from "react-router";
import { HashRouter,Redirect  } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
/*istanbul ignore next*/
 import RedirectTo from './RedirectTo';
/*istanbul ignore next*/
const LoginPage = lazy(() => import('./login/LoginPage'));
import Loading from './Loading';
import PreLoginPage from './login/PreLoginPage';
/*istanbul ignore next*/
import Auth from './Auth';
import i18N from './i18n'
import { I18nextProvider } from 'react-i18next';
let componentPromise,CustomHome;
import {setData} from './RbacData';
import PathParam from './login/PathParam';
export default class App extends Component {
  componentWillMount(){
    if(localStorage.getItem('designTemplate')){
      const filename=localStorage.getItem('designTemplate');
      componentPromise = import(`./templates/${filename}`);
      fetch(`${window.location.pathname}rbackData`, {
        method:"GET",
        headers: { 'Accept': 'application/json',
        'Content-Type': 'application/json' 
        }
      }).then(response => response.json())
      .then(data => { 
        setData(data.rbacData);
      });
    }
    else{
    //  fetch('/api/template', { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','Cache-Control':' no-cache' } })
	     fetch(`${window.location.pathname}api/template`,  { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
      .then(response => response.json())
        .then(data => {
          localStorage.setItem('designTemplate', data.design_template);
          const filename=localStorage.getItem('designTemplate');
           componentPromise = import(`./templates/${filename}`);
           
        });
    }

  }
  render() {
    /*istanbul ignore next*/
    CustomHome = React.lazy(() => componentPromise);
    
    return (
       <Suspense fallback={<Loading/>}>
          <I18nextProvider i18n={i18N}>
      <HashRouter>
        <Switch>
          <Route exact path='/pathparam/:tenant' component={PathParam}/>
          <Route exact  path='/prelogin' render={(props) => {
            /*istanbul ignore next*/
        return (
          localStorage.getItem('isAuthorized')
          ? <Redirect to={{pathname: "/",  }}/> :<PreLoginPage {...props}/>
        )
       }} />
          <Route exact  path='/login' component={LoginPage} />
          <Route exact  path='/login/:tenant' component={LoginPage} />
          <Route exact path='/auth' component={Auth} />
          <PrivateRoute exact path='/redirecting' component={RedirectTo}/>
          
          <PrivateRoute path='/' component={CustomHome}/>
        </Switch> 
      </HashRouter>
      </I18nextProvider>
      </Suspense>
    );
  }
}