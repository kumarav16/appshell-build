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
import FullScreenNavigationDialog from './FullScreenNavigationDialog';
import FrameHolder from './FrameHolder';
import  Fetch  from '../network/Fetch';
import SnackBox from '../components/SnackBox';
import MessageContent from './MessageContent';
import isObject from 'lodash/isObject';
import DialogBox from '../components/DialogBox';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';
import ErrorOccurred from '../components/ErrorOccurred';

let ContextArray = [];
let eventPayloadObj = {};
let deletemyHistory;
export class AppFrame extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            mode:  this.props.mode,
            pageentry: this.props.pageentry,
            payload: this.props.payload,
            dialogShow:false,
            notitfication: {
                show:false,
                title:"Info",
                message: undefined,
                variant: 'info'
            },
            error: false
        }
        const nav = JSON.parse(window.localStorage.getItem('navigation')).find(o => o.id === this.props.appId);
        if(nav && nav != undefined){
            const event = new CustomEvent("onAppChange", {
                detail: nav,
                bubbles: true,
                cancelable: true
              });
              window.parent.document.dispatchEvent(event);
        }
    }
    handleCallback = () =>{
        this.setState({error: true})
    }
    handleErrorCallback = () =>{
        this.setState({error: false})
    }
    getUniqeContexts = (contArray, contextObj) =>{
        if(contArray.length > 0){
            contArray = contArray.filter(context => context.payLoad.eventName !== contextObj.payLoad.eventName);
        }
        contArray.push(contextObj);
        return contArray;
    }
    handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ 
            notitfication: {
                show:false,
                title:"Info",
                message: undefined,
                variant: 'info'
            } 
        });
        /* istanbul ignore if */
        if(this.state.notitfication.message === 'Session Timeout. ' ){
            this.pushToHistoryForLogout();
        }
      };
    proxyCall = (navObj) => {
            const options = {
                    url: navObj.pathname,
                    method: navObj.method,
                    data: navObj.state.detail, 
            }
            Fetch.post(options)
            .then(response=>response.json())
            .then(data=> {
                console.log(data); 
            }).catch(err => { 
                console.log(err);  
            });    
    }
    openNewTab = (navObj) => {  
        if(!navObj.pathname){
            navObj['pathname'] = (navObj.appname && navObj.appname != '') ? JSON.parse(window.localStorage.getItem('navigation')).find(o => o.id === navObj.appname).link:'';
        }
      var locationPath = window.location.hash ? `#${navObj.pathname}` : navObj.pathname,
        newTabWindow =  window.open(`${locationPath}`, '_blank');

        this.setContext(navObj);
        /* istanbul ignore else */
        if(navObj.state.detail !== undefined){
            //newTabWindow.contextPayload = navObj.state.detail;
            newTabWindow.contextPayload = window.getContext && window.getContext !== null? window.getContext(): navObj.state.detail;
            newTabWindow.getContext = () =>{ return window.getContext && window.getContext !== null? window.getContext(): navObj.state.detail;}
        }
    }
    pushToHistory = (navObj) => {
        //Context sharing add pathName if pathname not avaialble
        if(!navObj.pathname){
            navObj['pathname'] = (navObj.appname && navObj.appname != '') ? JSON.parse(window.localStorage.getItem('navigation')).find(o => o.id === navObj.appname).link:'';
        }
        if(navObj.hasOwnProperty("isUserDetailsUpdated")){
            navObj.pathname = localStorage.getItem("defaultAppLink");
        }
    this.setContext(navObj);
    /* istanbul ignore else */
       if(window.getContext){
            window.contextPayload = window.getContext();
       }      
        eventPayloadObj = navObj.state.detail;
        deletemyHistory = navObj.state.deletemyHistory?navObj.state.deletemyHistory:null;
        if(deletemyHistory && deletemyHistory!=undefined){
            this.props.history.replace(navObj);       
        }else{
            this.props.history.push(navObj);
        }
    }

    pushToHistoryForLogout = () => {
        if (window.localStorage || global.localStorage) {
            localStorage.removeItem("isAuthorized");
            localStorage.removeItem("activeToken");
            localStorage.removeItem("permissions");
            localStorage.removeItem("microapps");
            localStorage.removeItem("navigation");
            localStorage.removeItem("commonappImpacted");
            localStorage.removeItem("defaultAppLink");
            localStorage.removeItem("productName");
            localStorage.removeItem("app_link");
            localStorage.removeItem("authUrl");
            localStorage.removeItem("grantType");
            localStorage.removeItem("userInfoDialogMap");
            localStorage.removeItem("username");
            localStorage.removeItem("designTemplate");
            localStorage.removeItem("appfailed");
            localStorage.removeItem("headerMenuConfig");
            localStorage.removeItem("UserInfo");
            localStorage.removeItem("tenantid");
            localStorage.removeItem("tenantDropDown");
            localStorage.removeItem("searchConfig");
            localStorage.removeItem("menuItems");
            localStorage.removeItem("licencesUrl");
            localStorage.removeItem("thankYouMsg");
            localStorage.removeItem("unlicensedMessage");
            localStorage.removeItem("showHeaderMenuIcon");
            localStorage.removeItem("polling");
            localStorage.removeItem("wsport");
            localStorage.removeItem("selectedApp");
            localStorage.removeItem("displayMenuItemOnHeader");
            localStorage.removeItem("displayMicroappOnHeader");
            localStorage.removeItem("applicationName");
            localStorage.removeItem("advanceNotificationMeta");
            localStorage.removeItem("appVersion");
            window.location.reload();
          }
    }
    setContext = (navObj) => {
        window.getContext = null;
        if(navObj.hasOwnProperty("appname")){
             //context sharing add context in window context object
            const { detail } = navObj.state;
            //console.log('detail.payLoad.eventName',detail.payLoad.eventName)
            if(detail.payLoad && detail.payLoad.eventName){
                ContextArray = this.getUniqeContexts(ContextArray,detail);
            }
            window.getContext = () => {
                return ContextArray ;  
            };
            //  window.getContext = () => {
            //      return { context: { ...detail } };  
            //  };
        }else {
            const nav_url=navObj.pathname.replace(/[.*+#?^${}()|[\]\\]/g, "").substring(1);
            const app_name=nav_url.substring(0,nav_url.indexOf('/'));
            const add_url=nav_url.substring(nav_url.indexOf('/'));
            if(add_url != '/' && add_url != '')
            {
                navObj.pathname=`/${app_name}/`;
                navObj={...navObj, state:{...navObj['state'], detail:{...navObj['state']['detail']}}};
                window.getContext = () =>{ return [{ payLoad:{'route': add_url, ...navObj['state']['detail']}, detail:{...navObj['state']['detail']}}]};
            }
        }
     }
    openModal = (navObj) => {
        if(!navObj.pathname){
            navObj['pathname'] = (navObj.appname && navObj.appname != '') ? JSON.parse(window.localStorage.getItem('navigation')).find(o => o.id === navObj.appname).link:'';
        }
        this.setContext(navObj);
       if(window.getContext){
            window.contextPayload = window.getContext();
        }
        this.setState({
            url: navObj.pathname,
            mode:  navObj.state.mode,
            payload: navObj.state.detail,
        });
        
    }

    closeModal = () => {
        this.setState({
            url: this.props.url,
            mode: this.props.mode,
            payload: this.props.payload,
            pageentry:this.props.pageentry
        });
    }

    handleNavigation = (event) => {
        event.preventDefault();
        const navObj = isObject(event.data) ? JSON.parse( JSON.stringify(event.data) ) : JSON.parse( event.data );
        const { eventType, payload } = navObj;
        /* istanbul ignore else */
        if(eventType === 'navigation') {
            switch(payload.state.mode) {
                case "spa":
                    this.pushToHistory(payload);
                    break;      
                case "tab":
                    this.openNewTab(payload);
                     break;
                case "modal":
                     this.openModal(payload);
                     break;
                case "overlay":
                     this.openModal(payload);
                    break;
                default:
                     this.setState({
                         notitfication: {
                             show: true,
                             title:"Error",
                             variant: "error",
                             message: 'Invalid Navigation mode'
                         }
                     });     
            }
        } 
        else if(eventType === 'notification') {
                eventPayloadObj = "";
                this.setState({
                    notitfication: payload
                });
        }
        else if (eventType === 'proxy') {
            this.proxyCall(payload);
        }
        else if (eventType === 'close-overlay') {
            this.closeModal(payload);
        }
        else if (eventType === 'session missing') {
            localStorage.clear();
            this.props.history.push('/');
        }
        else if(eventType === 'session-timeout') {
            this.setState({
                eventType:eventType,
                dialogShow:true
            });
                localStorage.removeItem("isAuthorized");
                localStorage.removeItem("activeToken");
                localStorage.removeItem("permissions");
                localStorage.removeItem("microapps");
                localStorage.removeItem("navigation");
                localStorage.removeItem("commonappImpacted");
                localStorage.removeItem("defaultAppLink");
                localStorage.removeItem("productName");
                localStorage.removeItem("app_link");
                localStorage.removeItem("authUrl");
                localStorage.removeItem("grantType");
                localStorage.removeItem("userInfoDialogMap");
                localStorage.removeItem("username");
                localStorage.removeItem("designTemplate");
                localStorage.removeItem("appfailed");
                localStorage.removeItem("headerMenuConfig");
                localStorage.removeItem("tenantid");
                localStorage.removeItem("tenantDropDown");
                localStorage.removeItem("searchConfig");
                localStorage.removeItem("menuItems");
                localStorage.removeItem("licencesUrl");
                localStorage.removeItem("thankYouMsg");
                localStorage.removeItem("unlicensedMessage");
                localStorage.removeItem("advanceNotificationMeta");
                localStorage.removeItem("appVersion");

    }
      
    }  
    getlogouturl=()=>{
        fetch(`${window.location.pathname}logout`,{
           method: 'GET',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Cache-Control':' no-cache' 
           }
       })
       .then(response =>response.json())
       .then(data => {
        let logout = data && data.logout;
        let pathname = window.location.pathname;
        let windowOrg = window.hasOwnProperty( "location" ) && window.location.origin;
         localStorage.setItem("sessionLogout",true);
         localStorage.setItem('logoutSuccess',true)
         window.location.href = logout + windowOrg + (pathname === '/'?"":"/"+pathname.substring(1,pathname.length));
        
       }).catch(()=> this.setState({message: this.props.t('LoginError') ,loading:false}));
     }
    callTimeout=()=> {
        this.setState({dialogShow:false});
            localStorage.removeItem("isAuthorized");
            localStorage.removeItem("activeToken");
            localStorage.removeItem("permissions");
            localStorage.removeItem("microapps");
            localStorage.removeItem("navigation");
            localStorage.removeItem("commonappImpacted");
            localStorage.removeItem("defaultAppLink");
            localStorage.removeItem("productName");
            localStorage.removeItem("app_link");
            localStorage.removeItem("authUrl");
            localStorage.removeItem("grantType");
            localStorage.removeItem("userInfoDialogMap");
            localStorage.removeItem("username");
            localStorage.removeItem("designTemplate");
            localStorage.removeItem("appfailed");
            localStorage.removeItem("headerMenuConfig");
            localStorage.removeItem("sessionTimeOut");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("tenantid");
            localStorage.removeItem("menuItems");
            localStorage.removeItem("licencesUrl");
            localStorage.removeItem("thankYouMsg");
            localStorage.removeItem("unlicensedMessage");
            localStorage.removeItem("advanceNotificationMeta");
            localStorage.removeItem("selectedTenant");
            localStorage.removeItem("appVersion");
            this.getlogouturl();
    }
     render() {
        const { mode , url, payload,dialogShow ,eventType, error} = this.state;  
        const {t}=this.props;
        const thirdPartyApp = this.props && this.props.thirdPartyApp;
        if(eventType=="session-timeout"){
            return(
                <DialogBox showDialog={dialogShow} id={"dialogPopup"}>
                    <DialogTitle id="alert-dialog-title">{t('SessionTimeout')}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    {t('SessionTimeoutInfo')}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button  onClick={this.callTimeout} autoFocus>
                    {t('Close')}
                    </Button>
                    </DialogActions>
                </DialogBox>
            )
        }
        return (
            <React.Fragment>
            <SnackBox
                open={this.state.notitfication.show}
                autoHideDuration={6000}
                onClose={this.handleNotificationClose}
              >
                <MessageContent
                  onClose={this.handleNotificationClose}
                  title={this.state.notitfication.title}
                  variant= {this.state.notitfication.variant}
                  message= {this.state.notitfication.message}
                />
            </SnackBox>
               { mode === 'modal' ?
                        <FullScreenNavigationDialog {...this.props}   classes={{"closeButton":"abc"}} modalClose= {this.closeModal} >
                            <FrameHolder  url= {url} payload={payload} onFrameMessage = {this.handleNavigation} thirdPartyApp={thirdPartyApp} /> 
                     </FullScreenNavigationDialog>     : null   
               }
               {
                   mode=== 'overlay' ? <FrameHolder  url= {url} payload={payload} onFrameMessage = {this.handleNavigation} thirdPartyApp={thirdPartyApp} /> :null 

               }
               {error ? 
            <ErrorOccurred type={'load-failed'} app={"main"} thirdPartyApp={thirdPartyApp} parentCallback = {this.handleErrorCallback}/>
                    :<FrameHolder  parentCallback = {this.handleCallback} history={this.props.history} url= {this.props.url} payload={this.props.payload} eventObj={eventPayloadObj} onFrameMessage = {this.handleNavigation} pageentry={this.props.pageentry} thirdPartyApp={thirdPartyApp}/>}
            </React.Fragment> 
            )
    } 
}

export default withTranslation()(AppFrame);
