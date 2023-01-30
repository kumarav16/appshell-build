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
import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router";
import './OpenResourceStaticPage.css';
import Loading from '../Loading';
import { withTranslation } from 'react-i18next';
import DialogBox from '../components/DialogBox';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import _ from "lodash";


const OpenResourceStaticPage = (props) => {
  let userInfoDialogMap = JSON.parse(window.localStorage.getItem('userInfoDialogMap'));
  let group = userInfoDialogMap.filter(n => n.subMenu);
  let defaultSubMenu = group.length > 0 && group[0].subMenu.filter(n => n.default);
  let title = '';
  let icon = '';
  let type = '';
  let menuName = '';
  let navigationString = localStorage.getItem('navigation') !== null ? JSON.parse(localStorage.getItem('navigation')) : [];
  navigationString = navigationString.filter(nav => !nav.hasOwnProperty("visibility") || nav.visibility);
  for (let i = 0; i < userInfoDialogMap.length; i++) {
    if (userInfoDialogMap[i].type !== 'group' && (userInfoDialogMap[i].location === '/' + window.location.hash.split("/")[1])) {
      title = userInfoDialogMap[i].name;
      icon = userInfoDialogMap[i].icon;
      type = userInfoDialogMap[i].type;
      break;
    } else if (userInfoDialogMap[i].type === 'group') {
      for (let j = 0; j < userInfoDialogMap[i].subMenu.length; j++) {
        if (userInfoDialogMap[i].subMenu[j].location === '/' + window.location.hash.split("/")[1]) {
          title = userInfoDialogMap[i].name;
          icon = userInfoDialogMap[i].icon;
          type = userInfoDialogMap[i].type;
          menuName = userInfoDialogMap[i].subMenu[j].name
          break;
        }
      }
    }
  }
  let [dataHtml, setdataHtml] = useState("");
  let [dialogShow, setdialogShow] = useState(false);
  let [eventType, seteventType] = useState("");
  let [subName, setSubName] = useState(type !== 'group'?"":defaultSubMenu[0].name);
  let [hideSpinner, setHideSpinner] = useState(false);
  let [appTheme, setAppTheme] = useState(_.startsWith(localStorage.getItem("designTemplate"), "system"))

  /* istanbul ignore next */
  function callTimeout() {
    setdialogShow(false);
    props.history.push('/login');
}
  function loadData(){
  fetch(`${window.location.pathname}static/${window.location.hash.split("/")[1]}`)
    .then(response => response.json())
    .then(data => {
      if(data.timeoutmsg === 'success timeout'){
        setdialogShow(true);
        seteventType("session-timeout");
      }else if(data.data === 'error'){
        setdataHtml(props.t("ErrorOpenSourceAttribution"));
        setHideSpinner(true);
      }else{
        setdataHtml(unescape(data.data));
        setSubName(menuName);
        setHideSpinner(true);
      }
  }).catch((error) => {
    setdataHtml(props.t("ErrorOpenSourceAttribution"));
    setHideSpinner(true);
  });    
}

function loadSubMenu(location, name){
  fetch(`${window.location.pathname}static${location}`)
    .then(response => response.json())
    .then(data => {
      if(data.data === 'error'){
        setdataHtml(props.t("ErrorOpenSourceAttribution"));
        setHideSpinner(true);
      }else{
        setHideSpinner(true);
        setdataHtml(unescape(data.data));
        props.history.push(location);
      }
  });    
}

useEffect(()=>{
    loadData();
  },[])
  if(eventType=="session-timeout"){
    return(
        <DialogBox showDialog={dialogShow} id={"dialogPopup"}>
            <DialogTitle id="alert-dialog-title">{props.t('SessionTimeout')}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {props.t('SessionTimeoutInfo')}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button  onClick={callTimeout} autoFocus>
            {props.t('Close')}
            </Button>
            </DialogActions>
        </DialogBox>
    )
}
 return (
  <div className={appTheme ? "horizontal hide-drawer" : navigationString.length === 0 ? "vertical hide-drawer" : "vertical"}>
      <div className="e7700_96651">
            {
              type !== 'group' ?
              <div className="e7000_1208">
              <div className="activePage">
                <span className="e7700_96654">{icon}</span>
                <span className="e7700_96653" id="leftStaticPagetitle" >{props.t(title)}</span>
              </div>
                    <span className="e7000_1219" id="staticPageContent">
                    {!hideSpinner ? <div style={{height:"70vh"}}><Loading /></div> : <div dangerouslySetInnerHTML={{ __html: props.t(dataHtml) }} />}
                    </span>
                    <div className="e7700_96601"><span className="e7000_1217" id="staticPageTitle">{props.t(title)}</span></div></div>:

              group[0].subMenu.map(n =>
                <div className="e7000_1208">              
              <div className={(n.name === subName)?"activePage":"e7700_96652"} onClick={() => loadSubMenu(n.location, n.name)}>
                <span className="e7700_96654">{n.icon}</span> 
                <span className="e7700_96653" id="leftStaticPagetitle" >{props.t(n.name)}</span>
              </div>
                    <span className="e7000_1219" id="staticPageContent">
                    {!hideSpinner ? <div style={{height:"70vh"}}><Loading /></div> : <div dangerouslySetInnerHTML={{ __html: props.t(dataHtml) }} />}
                    </span>
                    <div className="e7700_96601"><span className="e7000_1217" id="staticPageTitle">{props.t(subName)}</span></div></div>)
            }
     
      </div>
</div>
  )
}
export default withTranslation()(withRouter(OpenResourceStaticPage));
