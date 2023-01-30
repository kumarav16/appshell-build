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

import React from "react";
import  withStyles  from '@material-ui/core/styles/withStyles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import  withRouter  from "react-router/withRouter";
import ErrorICon from '../assets/Couldnotcomplete.svg';
import PermissionRequired from '../assets/Permissionrequired.svg';
import { withTranslation } from 'react-i18next';
const theme = createMuiTheme({
    palette: {
      type: 'dark', // Switching the dark mode on is a single property value change.
    },
    typography: { useNextVariants: true }
  });
  const styles = theme => ({
    errorcontainers: {},
    noroleloginTxt: { textAlign: 'center', color: '#747474' },
  
    cssOutlinedInput: {
      margin: '0px !important',
      '&$cssFocused $notchedOutline': {
        borderColor: '#02BC93 !important'
      }
    },
  
    cssFocused: {},
  
    notchedOutline: { borderWidth: '1px', borderColor: '#949494 !important' },
    eye: { cursor: 'pointer', color: '#757575', width: '22px', height: '15px', fontSize: '22px' },
    errorroot: {
      display: 'flex',
      minHeight: '100vh',
      paddingBottom: '80px',
      backgroundColor: 'var(--color-fill-common-secondary)',
      color: 'var(--color-text-common-primary)',
      '& label[data-shrink^="true"]': {
        color: "#506C65",
        fontFamily: "'Noto Sans', sans-serif",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "16px",
        letterSpacing: "0.25px"
      }
    },
  
    errorpaper: {
      display: 'flex',
      height: '100%',
      marginTop:'20%',
    },
  
    errorformContainer: { paddingLeft: '0px', width: '100%' },
    noroleformControl: { width: '400px', marginTop: 0,    alignItems: 'center', color: '#fff', '& div': { margin: '0px' } },
    errorform: { width: '400px', marginTop: 0, color: '#fff' },
    noroletitletext: 
    {
      color: "var(--color-text-common-primary)",
    /* width: 164px; */
    height: "22px",
    margin: "8px 0px",
    fontSize: "16px",
    fontStyle: "normal",
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: "22px",
    letterSpacing: "0.08px",
    paddingBottom: "0px",
    marginTop: "20px !important",
    marginBottom: "8px !important"
    },
    norolesubtitle:
    {
      color: "var(--color-text-common-primary)",
    width: "325px",
    height: "40px",
    margin: "0px",
    fontSize: "14px",
    fontStyle: "normal",
    textAlign: "center",
    fontFamily: "'Noto Sans', sans-serif",
    fontWeight: "400",
    lineHeight: "20px",
    letterSpacing: "0.1px",
    paddingBottom: "0px"
    },
    option:{
      color: "var(--color-text-common-primary)",
      marginTop:"-15px !important"
    },
    norolehyperlink:
    {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '18px',
      color: '#02A783',
      paddingBottom: '0px',
      letterSpacing: '0.1px',
      textTransform: 'uppercase'
    },
    norolelogocontainer: { padding: '0px' },
    noroleufoico:{
      width: '118px',
      height: '94px',
      margin: '0 auto'
    },
    link:{
      color:"red",
      cursor: "pointer"
    },
    norolefooter: {
      position: 'fixed',
      left: '0',
      bottom: '0',
      height: '39px',
      width: '100%',
      background: '#1A2321',
      fontSize: '12px',
      color: '#EBEFEE',
      paddingTop: '10px',
      paddingLeft: '32px',
      top: 'auto'
    },
    /*Permission denied CSS begins */
    pDeniedloginTxt: { textAlign: 'center', color: '#747474' },
    pDeniedformControl: { width: '400px', marginTop: 0,  alignItems: 'center', color: '#fff', '& div': { margin: '0px' } },
    pDeniedtitletext: {
      color: "var(--color-text-common-primary)",
    /* width: 164px; */
    height: "22px",
    margin: "8px 0px",
    fontSize: "16px",
    fontStyle: "normal",
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: "22px",
    letterSpacing: "0.08px",
    paddingBottom: "0px",
    marginTop: "20px !important",
    marginBottom: "8px !important"
    },
    pDeniedsubtitle:
    {
      color: "var(--color-text-common-primary)",
    width: "325px",
    height: "40px",
    margin: "0px",
    fontSize: "14px",
    fontStyle: "normal",
    textAlign: "center",
    fontFamily: "'Noto Sans', sans-serif",
    fontWeight: "400",
    lineHeight: "20px",
    letterSpacing: "0.1px",
    paddingBottom: "0px"
    },
    pDeniedhyperlink:
    {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '18px',
      color: '#02A783',
      paddingBottom: '0px',
      letterSpacing: '0.1px',
      textTransform: 'uppercase'
    },
    pDeniedlogocontainer: { padding: '24px' },
    pDeniedclosedico:{
      width: '150px',
      height: '119.44px',
      margin: '0 auto'
    },
    pDeniedpermissiondeniedico:{
      width: '118px',
      height: '94px',
      margin: '0 auto'
    },
    pDeniedfooter: {
      position: 'fixed',
      left: '0',
      bottom: '0',
      height: '39px',
      width: '100%',
      background: '#1A2321',
      fontSize: '12px',
      color: '#EBEFEE',
      paddingTop: '10px',
      paddingLeft: '32px',
      top: 'auto'
    }
  });
  const ErrorOccurred = (props) => {
    const { classes ,t, childToParent, parentCallback} = props;
    /* istanbul ignore next */
    const reloadApplication = () => {
      parentCallback();
      };
    //const nav = props.appId ? JSON.parse(window.localStorage.getItem('microapps')).find(o => o.id === props.appId) :'';
    let navObjects = localStorage.getItem('navigation') !== null ? JSON.parse(localStorage.getItem('navigation')) : [];
    const nav = window.location.hash.split('#')[1] !== '' ? navObjects.filter(nav=> nav.link === window.location.hash.split('#')[1]) [0]: "";
    const event = new CustomEvent("onAppChange", {
      detail: nav !== undefined ? nav : { 'menuItemId': '' },
      bubbles: true,
      cancelable: true
    });
    window.parent.document.dispatchEvent(event);

    return (
      <Grid container className={classes.errorroot} id="errorContainerWrapper">
      <Grid xs={12} item>
      <Grid item container  justify='center' className={classes.errorcontainers}>
        <div className={classes.errorpaper} id="errorContainer" data-testid="error-container">
          <div className={classes.errorformContainer} id="errorFormContainer">
            <form className={classes.errorform}  id="errorForm">
            {(props.type==="load-failed") ?
              <FormControl margin="normal" required fullWidth className={classes.noroleformControl}>
                <img src={ErrorICon} className={classes.noroleufoico} alt="error icon" />
                <div id="noRoletitle" className={classes.noroletitletext}>{t('Error')}</div>
                <div id="noRolesubtitle" className={classes.norolesubtitle}>{t('FailedApplication')}&nbsp;{t(props.id)}</div>
                <div className={classes.option}>{t('Click')}&nbsp;
                  <a onClick={ /* istanbul ignore next */ () => {props.app === "common"?childToParent(true):reloadApplication()}} className={classes.link}>{t('Here')}</a>&nbsp;{t('ReportError')}
                </div>
              </FormControl>
              :((props.type==="permi-denied")?
                <FormControl margin="normal" required fullWidth className={classes.pDeniedformControl}>
                <img src={PermissionRequired} className={classes.pDeniedpermissiondeniedico} alt="closed icon" />
                  <div id="permissionDeniedtitle" className={classes.pDeniedtitletext}>{t('PermissionRequired')}</div>
                  <div id="permissionDeniedsubtitle" className={classes.pDeniedsubtitle}>
                    {t('RequestGetAccess')}
                  </div>
                </FormControl>
                :<FormControl margin="normal" required fullWidth className={classes.pDeniedformControl}>
                  <img src={PermissionRequired} className={classes.pDeniedpermissiondeniedico} alt="closed icon" />
                  <div id="noRoletitle" className={classes.pDeniedtitletext}>{t('PermissionRequired')}</div>
                  <div id="noRolesubtitle" className={classes.pDeniedsubtitle}>{t('RequestGetAccess')}&nbsp;{t(props.id)}</div>
                </FormControl>
                )}
                <CssBaseline />
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
    )

  }

export  default withTranslation()(withStyles(styles)(withRouter(ErrorOccurred)));
