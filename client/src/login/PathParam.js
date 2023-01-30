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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from "react-router";
import { withTranslation } from 'react-i18next';
import i18N from 'i18next';
import { BhDropdown, BhButton, BhLinks, BhTextInput } from "../transformTagNameReactComponent"
import "./login.css"
import _ from 'lodash';
import Loading from '../Loading';



class PathParam extends Component {
  constructor(props) {
    super(props);
  }
    
  componentWillMount () {
    let tenant=this.props.match.params && this.props.match.params.tenant;
    localStorage.setItem("selectedTenant",tenant);
    window.location.href = `${window.location.pathname}loginTenant?tenant=${tenant}`;
    
  }
  
  render() {
    return (
        <Loading />
    );
  }
  
  

  
  

}

PathParam.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(PathParam);
