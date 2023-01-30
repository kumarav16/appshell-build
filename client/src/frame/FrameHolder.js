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
import Fetch from '../network/Fetch';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import Loading from '../Loading';
import isUndefined from 'lodash/isUndefined';
import { withTranslation } from 'react-i18next';
import i18N from 'i18next';
import InnerHTML from 'dangerously-set-html-content';
import _ from "lodash";
import { InstrumentForIframes } from '../i18n/UserExperience';
import {getData} from '../RbacData';
class FrameHolder extends React.Component {

  constructor(props) {
    super(props);// deprecated in latest
    this.state = {
      htmlContent: '', loading: false, navcontext: null,
      thirdPartyApp:props.thirdPartyApp
    };
    this.holder = React.createRef(); 
    
  }
  onTrigger = (event) => {
    this.props.parentCallback(event);
  }
  /* istanbul ignore next */
  componentWillMount() {
    if ( !isUndefined(window.localStorage.getItem('navigation') ) ) {
      let navigationString = localStorage.getItem('navigation') !== null ? JSON.parse(localStorage.getItem('navigation')) : [];
      this.setState({importurl: ''});
    }
 }
/* istanbul ignore next */
  handleErrors(response) {
    if ( !response.ok ) {
      throw Error(response.statusText);
    }

    return response;
  }
/* istanbul ignore next */
  async fetchAsync (options) {
    let response = await Fetch.get(options);
    if(!response.ok &&  response.status === 403){
      return Promise.reject('Session Expired');
    }else{
    let data = await response.json();
    return data;
    }
  }
     /* istanbul ignore next */
  getFramePage(options,t) {
    this.setState({ loading: true });
    this.fetchAsync(options)
    .then(data => {
         this.setState({ htmlContent: data.response, loading: false });
         if(data.timeoutmsg === 'success timeout'){
          window.postMessage(JSON.stringify({
            eventType: 'session-timeout'
          }));
        
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
          localStorage.removeItem("selectedTenant");
          localStorage.removeItem("appVersion");
          //window.location.reload();

        }
        if(data.timeoutmsg === 'session missing'){
          window.postMessage(JSON.stringify({
            eventType: 'session missing'
          }));
          localStorage.clear();
          
        }
        else{
          if(data.validURL){
            if(data.error){
              localStorage.setItem("appfailed",options.url);
              this.onTrigger(true);
            }}else{
              localStorage.setItem("appfailed",options.url);
              this.onTrigger(true);
            }
         }
     })
    .catch(err => {
      let message;
      this.setState({ loading: false });
        /* istanbul ignore if */
      if(err === 'Session Expired' || (localStorage.getItem('sessionTimeOut') === "true") ||(localStorage.getItem('sessionLogout') === "true")){
         message = JSON.stringify({
          eventType: 'session-timeout',
          payload: {
            show: true,
            message: t('SessionTimeout'),
            variant: 'error'
          }
        });
        window.postMessage(message);
        // localStorage.clear();
        if(localStorage.getItem('sessionTimeOut') !== "true"){
          window.location.reload();  
        }
      }else{
        console.log(options);
        localStorage.setItem("appfailed",options.url);
        this.onTrigger(true);
      }
  })
  }
 /* istanbul ignore next */
  handleFrameMessage = (message) => {
    this.props.onFrameMessage(message);
  }

  componentDidMount() {
    const { url, payload,t } = this.props;
    const options = {
      url,
      data: payload || {}
    };

    let templateUrl = `microapp.html`;
    this.setState({importurl: `../${templateUrl}`});

    if ( !isUndefined( window.contextPayload ) ) {
      this.setState({ navcontext: window.contextPayload });
      delete window.contextPayload;
    } else {
      this.setState({ navcontext: [this.props.payload] });
    }

    this.getFramePage(options,t);
    window.getUserPreference = () => {
      return {
        lang: i18N.language,
        theme:localStorage.getItem('theme')
      }
    }
    window.addEventListener('message', this.handleFrameMessage, false);
     /* istanbul ignore next */
   window.getPermissionListByAppId=(appid)=>{
      const permissionapplist = getData();
      const microappPersmissonObject=permissionapplist.find(({rsname})=>rsname===appid)
      return microappPersmissonObject;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      const options = {
        url: this.props.url,
        data: this.props.data || {}
      }
      this.getFramePage(options,this.props.t);
    }
    else {
      //context sharing send context to all iframs
          /* istanbul ignore if */
      if(window.getContext){
        // send updated payload to child
        this.iframes = window.frames;
        for (let j=0,len = this.iframes.length ; j < len;j++){
            //this code will enable after multilayout story
            // if(window.frames[j].frameElement.id !== window.getContext().context.payLoad.origin){
            //   window.frames[j].window.getContext =()=>{ return { context: window.getContext()}};
            //   window.frames[j].postMessage(JSON.stringify(window.getContext()));
            // }
            window.frames[j].window.getContext = ()=>{ return {context: window.getContext()}};
            if(this.props.eventObj){
              window.frames[j].postMessage(JSON.stringify(this.props.eventObj));
            } 
          }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleFrameMessage);
  }

  /**
   * Attach below methods to pass data from parent to iframe
   * */
    /* istanbul ignore next */
  frameMounted = () => {
     //const framePos = window.frames.length - 1;
     const framePos = window.frames;
    
    window.clearContext = () => {
      window.getContext = null;
      this.setState({ navcontext: null });
    }

    InstrumentForIframes();
    
    for(let i = 0 ; i < framePos.length ; i++){
      window.frames[i].getContext = () => {
        const windowContext = window.getContext ?  window.getContext(): this.state.navcontext;
        return { context:  windowContext};
      }
      window.frames[i].postMessage(JSON.stringify(this.props.payload));
      window.frames[i].clearContext = () => {
        window.getContext = null;
        this.setState({ navcontext: null });
      }
  
      window.frames[i].isIframe = () => {
        return true;
      }
    }
  }
  
  render() {
    const { htmlContent, loading, thirdPartyApp } = this.state;
    let url = this.props && this.props.url;
    if (loading) {
      return <Loading />
    }

    return (
      <Frame data-testid="app-frame-container"  className="wrapper"  title="wrapper" frameBorder="0" id="iframeWrapper" head={
          <React.Fragment>

            <base href={url} target="_blank" />
            {/* <link id="main-element-import" rel="import" href={this.state.importurl} /> */}         
          </React.Fragment>
        }
        contentDidMount={this.frameMounted}>
          <FrameContextConsumer>
            {
                   /* istanbul ignore next */
              ({ document, window }) => {
                document.addEventListener('navigation', function (e) {
                  e.stopImmediatePropagation();
                  window.parent.postMessage(JSON.stringify({ eventType: 'navigation', payload: e.detail }));
                }, false);

                document.addEventListener('notification', function (e) {
                  e.stopImmediatePropagation();
                  e.detail.title=e.detail.title?e.detail.title:_.capitalize(e.detail.variant);
                  window.parent.postMessage(JSON.stringify({ eventType: 'notification', payload: e.detail }));
                }, false);

                document.addEventListener('close-overlay', function (e) {
                  e.stopImmediatePropagation();
                  window.parent.postMessage(JSON.stringify({ eventType: 'close-overlay' }));
                }, false);

                document.addEventListener('session-timeout', function (e) {
                  e.stopImmediatePropagation();
                  window.parent.postMessage(JSON.stringify({ eventType: 'session-timeout',payload: e.detail }));
                }, false);

                document.addEventListener(
                  "updateContext",
                  function (e) {
                    e.stopImmediatePropagation();
                    if(e.detail.context){
                      e.detail.context["timeStamp"] = Date.now();
                      e.detail.context["origin"] = e.target.baseURI.split('/')[3];
                    }
                    var payloadData = {
                      state : {
                        mode: e.detail.navigationObject && e.detail.navigationObject.mode && e.detail.navigationObject.mode!= null ? e.detail.navigationObject.mode: 'spa',
                        detail: {
                          payLoad: e.detail.context,
                         }
                      },
                      appname:e.detail.navigationObject && e.detail.navigationObject.appName != null? e.detail.navigationObject.appName: ''
                    }
                      window.parent.postMessage(
                        JSON.stringify({
                          eventType: "navigation",
                          payload: payloadData,
                        })
                      );
                  },false);
                  
                  document.addEventListener('clearDeepLinkData', function (e) {
                    e.stopImmediatePropagation();
                    window.clearContext();              
                   }, false);
              }
            }
          </FrameContextConsumer>

        {/* <div data-testid="app-frame" dangerouslySetInnerHTML={{ __html: htmlContent }}></div> */}
         <InnerHTML style={thirdPartyApp === true? {height:"100vh"}:null} data-testid="app-frame" html={htmlContent} />
      </Frame>
     
    )
  }
}

export default withTranslation()(FrameHolder);
