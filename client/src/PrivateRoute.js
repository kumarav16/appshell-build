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

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* istanbul ignore next */
const setSelectedAppId = (path) => {
  if ( localStorage.getItem('navigation') !== null && localStorage.getItem('navigation') !== "undefined") {
    let navigation = JSON.parse(localStorage.getItem('navigation'));
    let selectedAppObj = navigation.find(app => app.link === path);
    if(selectedAppObj){
      localStorage.setItem('selectedApp',selectedAppObj.id);
    }
    else{
      localStorage.setItem('selectedApp','');
    }
  }
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
  /* istanbul ignore if */
  if(rest.location){
    setSelectedAppId(rest.location.pathname);
  }
  return(
    <Route {...rest} render={props => (
    localStorage.getItem('isAuthorized')
        ? <Component {...props} />
        : <Redirect to={{
          pathname: "/login",
          navurl:`${window.location.hash}`}   
        }/> 
    )} />
  )
}