import React, { useEffect, useState } from 'react';
import './AppLoaderFrame.css';
import Frame, { FrameContextConsumer } from "react-frame-component";
import { withStyles } from '@material-ui/core';
import ErrorOccurred from '../../components/ErrorOccurred';
import Fetch from '../../network/Fetch';
import InnerHTML from 'dangerously-set-html-content';
const styles = () =>
({
  commonAppWrapper: {
    width: "100%",
    height: "100% !important"
  },
  commonTop:{
    marginTop:"35%"
  }
});
/* istanbul ignore next */
async function fetchAsync (options) {
  let response = await Fetch.get(options);
  if(!response.ok &&  response.status === 403){
    return Promise.reject('Session Expired');
  }else{
  let data = await response.json();
  return data;
  }
}
const AppLoaderFrame = (props) => {
  const [data, setData] = useState(null);
  const [validURL, setvalidURL] = useState(true);
  const [htmlContent, sethtmlContent] = useState("");
  const [selectedApp, setSelectedApp] = useState(() => {
    let appMap = window.localStorage.getItem('navigation') !== null && JSON.parse(window.localStorage.getItem('navigation'));
    return appMap && appMap.find(n => n.id === props.id);
  });
  const [options, setoptions] = useState({
    url: selectedApp && (window.location.pathname === '/'?"":"/"+window.location.pathname.substring(1,window.location.pathname.length-1)) + selectedApp.link,
    data: {}
  });
/* istanbul ignore next */
  const childToParent = (childdata) => {
    fetchAsync(options)
    .then((response) => {
      sethtmlContent(response.response);
      setvalidURL(response.validURL);
      localStorage.setItem("commonLoadFail", false);
      setData(false);
    })
    .catch(()=>{
      localStorage.setItem("commonLoadFail", true);
      setvalidURL(false);
      setData(true); 
    })
    }
    /* istanbul ignore next */
    useEffect(() => {
      childToParent()
    },[]);
  /* istanbul ignore next */
if(validURL){
if (typeof (selectedApp) == "object" && !JSON.parse(localStorage.getItem("commonLoadFail")) && !data) {
  const href_val=(window.location.pathname === '/'?"":"/"+window.location.pathname.substring(1,window.location.pathname.length-1))+selectedApp.link;

     var mybase = {
      href:`${href_val}`,
      target:"_blank" 
    };
    return (
      <div className={props.classes.commonAppWrapper} style={props.commonappImpacted ? props.commonappImpacted.commonStylingUpdated : props.StylingAttributes} >

        <Frame
          className={props.classes.commonAppWrapper}
          data-testid="app-frame-container"
          title="app-frame"
          frameBorder="0"
          scrolling="no"
          id={selectedApp.id}
          head={
            <React.Fragment>
  <base {...mybase}/>
              {/* <link
                id="main-element-import"
                rel="import"
                href="../microapp.html"
              /> */}
            </React.Fragment>
          }
        >
          <FrameContextConsumer>

            {
              /* istanbul ignore next */
              ({ document, window }) => {

                document.addEventListener(
                  "updateContext",
                  function (e) {
                    e.stopImmediatePropagation();
                    if (e.detail.context) {
                      e.detail.context["origin"] = e.target.baseURI.split('/')[3];
                      e.detail.context["timeStamp"] = Date.now();
                    }
                    var payloadData = {
                      state: {
                        mode: e.detail.navigationObject && e.detail.navigationObject.mode && e.detail.navigationObject.mode != null ? e.detail.navigationObject.mode : 'spa',
                        detail: {
                          payLoad: e.detail.context,
                        }
                      },
                      appname: e.detail.navigationObject && e.detail.navigationObject.appName != null ? e.detail.navigationObject.appName : ''
                    }

                    window.parent.postMessage(
                      JSON.stringify({
                        eventType: "navigation",
                        payload: payloadData,
                      })
                    );

                    dispathEventOnParent(e, window);
                  },
                  false
                );
              }}
          </FrameContextConsumer>
          <InnerHTML data-testid="app-loader-frame" html={htmlContent} />
        </Frame>
      </div>
    );

  } else {
    return (
      <div className={props.classes.commonTop}>
      <ErrorOccurred type={'load-failed'} id={selectedApp && (window.i18Resources !== "" ?selectedApp.id:selectedApp.name)} app={"common"} childToParent={childToParent} />
      </div>
      );
  }
}else {
  return (
    /* istanbul ignore next */
    <div className={props.classes.commonTop}>
    <ErrorOccurred type={'load-failed'} id={selectedApp && (window.i18Resources !== "" ?selectedApp.id:selectedApp.name)} app={"common"} childToParent={childToParent} />
    </div>
    );
}
}

export default withStyles(styles)(AppLoaderFrame);
/* istanbul ignore next */
function dispathEventOnParent(e, window) {
  const event = new CustomEvent("shareContext", {
    detail: e.detail.context,
    bubbles: true,
    cancelable: true
  });
  window.parent.document.dispatchEvent(event);
}