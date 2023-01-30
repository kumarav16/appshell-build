import React from 'react';
import isUndefined from 'lodash/isUndefined';
import withStyles from '@material-ui/core/styles/withStyles';
import _ from 'lodash';
const drawerWidth = 250;
const styles = theme => ({  
  root: {
    display: 'flex',
    webkitUserSelect: 'none',
    userSelect: 'none'},
    menuButton: {},
    hide: {display: 'none'},
    appsIcons: {fontSize: '18px !important'},
    appChessIcon: {color: '#757575 !important'},
    appString: {fontWeight: '900', fontSize: '22px', padding: '20px 20px'},
  
    appToolbar: {height: '72px', padding: "0px 32px 0px 16px !important"},
    appChildToolbar: {width: '100%', height: '72px !important'},
    appHeader: {float: 'left'},
    appTitle: {
      float: 'right',
      color: 'rgb(255,255,255)',
      marginTop:'14px',
      fontWeight:'400',
     },
    appBuilderTitle: {
      textDecoration: 'none'
      },
    appBuilderTitleS1: {
      textDecoration: 'none',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
      },
  
     content: {
      flexGrow: 1,
      paddingTop: theme.spacing(9),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0
    },
    logoutconfirm:{
      fontFamily:"var(--font-family-body-small)",
      fontStyle: "normal",
      fontWeight: "var(--font-weight-body-small)",
      fontSize: "var(--font-size-body-small)",
      lineHeight: "var(--font-line-height-body-small)",    /* identical to box height, or 150% */
      letterSpacing:"var(--font-letter-spacing-body-small)",
      color:"var(--color-text-common-primary)",
      margin:"0"
    },
  
  appLists: {color: '#000 !important'}, listItemTxt: { '& span': {color: '#000 !important', fontSize:'16px !important'} },
  
  userIconAppBar:{
    position: 'absolute !important',
    width: '44px !important',
    height: '44px !important',
    right: '32px !important',
    top: 'calc(50% - 44px/2) !important',
    cursor: 'pointer !important',
    marginLeft:"12px"
    },
  userIconAppBarHorizontal:{
    position: 'relative !important',
    width: '44px !important',
    height: '44px !important',
    cursor: 'pointer !important',
    marginLeft:"12px"
  },
    
    userIconWithInitialsAppBar:{
      position: 'absolute !important',
      left: '9.09% !important',
      right: '9.09% !important',
      top: '9.19% !important',
      bottom: '9.09% !important',
      borderRadius: '36px !important',
      width: '36px !important',
      height: '36px !important',   
      fontFamily: "Poppins !important" ,
      fontStyle: "normal !important",
      fontWeight: "500 !important",
      background: "#147D64 !important",
      fontSize: "14px !important",
      lineHeight: "20px !important",
      letterSpacing:"0px !important",
      color: "#ffffff !important"
      },
    
  upperIconHalfRing :{
    width: '44px',
    height: '22px',
    borderTopLeftRadius: '22px',
    borderTopRightRadius: '22px',
    border: '2px solid #02A783',
    borderBottom:' 0',
    boxSizing: 'borderBox',
    transform: 'matrix(-1, -0.01, 0.01, 1, 0, 0)'
  },
  
  lowerIconHalfRing :{
    width: '44px',
    height: '22px',
    borderTopLeftRadius: '22px',
    borderTopRightRadius: '22px',
    border: '2px solid #02A783',
    borderBottom:' 0',
    boxSizing: 'borderBox',
    transform: 'matrix(-1, -0.01, 0.01, -1, 0, 0)'
  },
   verticalHeader:{marginTop: '12px'},
  commentButton: {
    /*fontSize: '30px',
    fontWeight: 'bold',
    color: '#fff',
    cursor: 'pointer',*/
    // borderRadius: 0, height: '45px',
    backgroundColor: '#02BC93', color: '#fff',
    fontFamily:"Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "18px",   
    letterSpacing:"0.1px",
    height:"36px",
    borderRadius: "4px",
    top: '26%',
    position: 'absolute',
    right: '8%',
    '&:hover': {backgroundColor:'#02BC93'}
  },
  FeedbackIconButton: {
    right: "96px",
    top: "18px",
    color: '#fff',
    borderRadius: "100%",
    position: 'absolute',
    display: "inline-block",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    textAlign: "center",
    marginLeft: "4px",
    paddingTop: "6px",
    '&:hover': {backgroundColor:'#014d40',borderRadius:"30px"},
    '&:active':{background:"#147d64",borderRadius: "30px"}
  },   
    tabSection:{
        color:"white"
      },
    tabs:{
        color:"white",
        minWidth: '72px',
        height:"72px !important",
        fontSize:"12px !important",
        lineHeight:"18px !important",
        textTransform:"none !important",
        fontFamily:"Noto Sans !important",
        fontStyle:"normal",
        fontWeight:"400",
        letterSpacing:"0.4px !important",
        textAlign:"center",
    },
    tabSelected:{
      background: "#4f4f4f !important",
      height:"100% !important",
      color:"white",
      fontWeight:"bold !important",
      zIndex:"-1",
    },
    logoDiscription:{
      width:'210px',
      position:"absolute",
      top:"15px",
      display:'inline-block',
      paddingLeft:"10px",
      fontFamily:"Poppins",
      color:"#FFFFFF"
    },
    bently:{
      fontStyle:"normal",
      fontWeight:"600",
      fontSize:"11px",
      lineHeight:"16px",
      display: "flex",
      alignItems: "center",
    },
    bentlyBg:{
      marginLeft: '47px',
      width:'250px',
      height:'72px',
      backgroundAttachment:"fixed",
      backgroundRepeat:"no-repeat",
      backgroundPosition:"46px -1px"
    },
    benAppname:{
      fontWeight: "700",
      fontSize: "20px",
      lineHeight: "30px",
      display:"flex",
      alignItems:"center",
      margin:"0px"
    },
    benSubname:{
      fontWeight: 300,
      paddingLeft: "5px"
    },
      white:{
        color:"white"
      },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        backgroundColor:`var(--color-fill-common-brand)`,
        color: '#878282 !important'
      },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 2,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7) + 2
      },
      "@media (max-width: 767px)": {
        width:"0px"
      }
    }
});

let HeaderSet = (WrappedComponent) => {
  class HeaderHoc extends React.Component {
      state={
        notitfication: {},
        isLogoutOpen:false, 
        notificationConfig:{},
        notificationData:{},
        advNotificationCount:0,
        requestAdvNotification:true,
        notificationErrorScreen: false,
        updateErrorId:""
      }
  componentWillMount(){
    if(window.localStorage.getItem('advanceNotificationMeta') !== "undefined" && window.localStorage.getItem('advanceNotificationMeta') !== "null"){
      const advanceNotificationMeta = JSON.parse(localStorage.getItem('advanceNotificationMeta'));
      this.setState({notificationConfig: advanceNotificationMeta});
      this.getNotificationData();
    }
  }

  componentDidMount(){
    if(window.localStorage.getItem('advanceNotificationMeta') !== "undefined" && window.localStorage.getItem('advanceNotificationMeta') !== "null"){
      if(this.state.notificationConfig && this.state.notificationConfig.pollNotificationTimeInterval && this.state.notificationConfig.pollNotificationTimeInterval !== ""){
        setInterval(this.getNotificationData, this.state.notificationConfig.pollNotificationTimeInterval);
      }
    }
  }

  getNotificationData = () => {
    this.setState({ requestAdvNotification: true });
    fetch(`${window.location.pathname}Notification-hub/advanceNotification-proxy/notifications`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache'
      }
    })
      .then(res => { return res.json() })
      .then(data => {
        let response, count = 0;
        let statusValue = !_.isEmpty(data) ? data.statusCode : "";
        if (statusValue === 200 || statusValue === 206) {
          count = _.filter(data.body, i => i.status === false).length;
          response = {
            "isPartialResponse": (statusValue === 200) ? false : true,
            "isNoResponse": false,
            "items": data.body
          }
        } else {
          response = {
            "isPartialResponse": false,
            "isNoResponse": true,
            "items": []
          }
        }
        this.setState({
          notificationErrorScreen: false,
          requestAdvNotification: false,
          notificationData: response,
          advNotificationCount: count > 0 ? count : 0,
        });
      })
      .catch(error => {
        this.setState({
          notificationErrorScreen: true,
          requestAdvNotification: false
        });
      })
  }

  markNotificationRead = (row, clickContext) => {
    const { notificationConfig } = this.state;
    let rowRedirect = !_.isEmpty(row.redirectAPI) ? row.redirectAPI : "";
    let commonAppRedirect = notificationConfig && notificationConfig.commonRedirectMicroapp ? notificationConfig.commonRedirectMicroapp : "";

    if (!_.isEmpty(rowRedirect) || !_.isEmpty(commonAppRedirect)) {
      this.setState({ requestAdvNotification: true });
      if (row.status === false) {
        fetch(`${window.location.pathname}Notification-hub/advanceNotification-proxy/notifications`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([{
            "id": row.id,
            "status": true
          }]),
        })
          .then((response) => { return response.json() })
          .then(data => {
            if (_.includes(data.body, "Updated")) {
              const { notificationData } = this.state;
              let alteredArray = notificationData.items && _.cloneDeep(notificationData.items).map(item => {
                if (item.id === row.id) {
                  item.status = true;
                  return item;
                } else {
                  return item
                }
              });
              let count = _.filter(alteredArray, i => i.status === false).length;
              let response = {
                "isPartialResponse": true,
                "isNoResponse": false,
                "items": alteredArray
              }
              this.setState({
                notificationErrorScreen: false,
                requestAdvNotification: false,
                notificationData: response,
                advNotificationCount: count > 0 ? count : 0,
              });
              if (clickContext === "onContentClick") {
                this.redirectionFromNotification(row);
              } else {
                return;
              }
            }
          })
          .catch(error => {
            const { notificationData } = this.state;
            let count = _.filter(notificationData, i => i.status === false).length;
            let response = {
              "isPartialResponse": true,
              "isNoResponse": false,
              "items": notificationData.items
            }
            this.setState({
              notificationErrorScreen: false,
              requestAdvNotification: false,
              notificationData: response,
              advNotificationCount: count > 0 ? count : 0,
              updateErrorId: row.id,
            });
          })
      } else {
        this.setState({ requestAdvNotification: false });
        if (clickContext === "onContentClick") {
          this.redirectionFromNotification(row);
        } else {
          return;
        }
      }
    }
  }

  redirectionFromNotification = (row) => {
    const { notificationConfig } = this.state;
    let rowRedirect = !_.isEmpty(row.redirectAPI) ? row.redirectAPI : "";
    let commonAppRedirect = notificationConfig && notificationConfig.commonRedirectMicroapp ? notificationConfig.commonRedirectMicroapp : "";
    let trueMicroApp, body, mode;
    if (!_.isEmpty(rowRedirect)) {
      if (_.includes(rowRedirect, "/")) {
        window.open(rowRedirect)
      } else {
        trueMicroApp = !_.isEmpty(_.find(JSON.parse(localStorage.getItem("navigation")), item => item.id === rowRedirect)) ? rowRedirect : "";
        mode = "spa";
        body = !_.isEmpty(row.navigationPaylaod) ? row.navigationPaylaod : "";

        this.getWindowPostMessageMethod(trueMicroApp, mode, body);
      }
    } else if (!_.isEmpty(commonAppRedirect)) {
      let appName = _.get(commonAppRedirect, "navigationObject.appName", "");
      trueMicroApp = !_.isEmpty(_.find(JSON.parse(localStorage.getItem("navigation")), item => item.id === appName)) ? appName : "";
      body = _.get(commonAppRedirect, "navigationObject", {});
      mode = _.get(commonAppRedirect, "navigationObject.mode", "");

      this.getWindowPostMessageMethod(trueMicroApp, mode, body);
    }
  }

  getWindowPostMessageMethod = (trueMicroApp, mode, body) => {
    let data = {
      context: {
        eventName: 'BhNotification-RedirectEvent',
        body: body,
        timeStamp: Date.now(),
        origin: window.location.origin
      }
    };
    let payloadData = {
      state: {
        mode: mode,
        detail: { payLoad: data.context }
      },
      appname: trueMicroApp
    };
    let message = JSON.stringify({ eventType: "navigation", payload: payloadData });
    window.parent.postMessage(message, window.origin);
  }
  
  getlogouturl=()=>{
     fetch(`${window.location.pathname}logout`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control':' no-cache' 
        }
    }).then(response =>response.json())
    .then(data => {
      localStorage.setItem("sessionLogout",true);
      localStorage.setItem('logoutSuccess',true);
      window.location.href = data.logout + window.location.origin + (window.location.pathname === '/'?"":"/"+window.location.pathname.substring(1,window.location.pathname.length));
    }).catch(()=> this.setState({message: this.props.t('LoginError') ,loading:false}));
  }
      /* istanbul ignore next */
    handleLogout = async () => {
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
      localStorage.removeItem('tenancy');
      localStorage.removeItem("selectedApp");
      localStorage.removeItem("advanceNotificationMeta");
      localStorage.removeItem("displayMenuItemOnHeader");
      localStorage.removeItem("displayMicroappOnHeader");
      localStorage.removeItem("applicationName");
      localStorage.removeItem("selectedTenant");
      localStorage.removeItem("appVersion");
      await this.getlogouturl();
      // window.location.href = "/logout"; 

     

      console.log("executed");
    
    }  
    /* istanbul ignore next */ 
    setIsOpen(openstate) {
        this.setState({
            pop_open: openstate,
        });
    };
     /* istanbul ignore next */
    setIsLogoutOpen=(openstate)=>{
        this.setState({
            isLogoutOpen:openstate
        });
    }; 
     /* istanbul ignore next */
    handleUserIconClick(e) {
        e.preventDefault();      
        this.setState({
            pop_open: !this.state.pop_open,
            anchorEl: e.currentTarget,
        });
    } 
    getBrowserInfo = () => {
    
      let nAgt = navigator.userAgent;
      let browserName  = navigator.appName;
      let fullVersion  = ''+parseFloat(navigator.appVersion); 
      let majorVersion = parseInt(navigator.appVersion,10);
      let nameOffset,verOffset,ix;
  
      // In Opera, the true version is after "Opera" or after "Version"
      if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset+6);
      /* istanbul ignore else */
      if ((verOffset=nAgt.indexOf("Version"))!=-1) 
        fullVersion = nAgt.substring(verOffset+8);
      }
      // In MSIE, the true version is after "MSIE" in userAgent
      else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
      browserName = "Microsoft Internet Explorer";
      fullVersion = nAgt.substring(verOffset+5);
      }
      // In Chrome, the true version is after "Chrome" 
      else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset+7);
      }
      // In Safari, the true version is after "Safari" or after "Version" 
      else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset+7);
      /* istanbul ignore else */
      if ((verOffset=nAgt.indexOf("Version"))!=-1) 
        fullVersion = nAgt.substring(verOffset+8);
      }
      // In Firefox, the true version is after "Firefox" 
      else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset+8);
      }
      // In most other browsers, "name/version" is at the end of userAgent 
      else {
         /* istanbul ignore else */
        if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
                (verOffset=nAgt.lastIndexOf('/')) ) 
      {
      browserName = nAgt.substring(nameOffset,verOffset);
      fullVersion = nAgt.substring(verOffset+1);
      }}
      // trim the fullVersion string at semicolon/space if present
      if ((ix=fullVersion.indexOf(";"))!=-1)
        fullVersion=fullVersion.substring(0,ix);
      if ((ix=fullVersion.indexOf(" "))!=-1)
        fullVersion=fullVersion.substring(0,ix);
  
      majorVersion = parseInt(''+fullVersion,10);
      if (isNaN(majorVersion)) {
      fullVersion  = ''+parseFloat(navigator.appVersion); 
      majorVersion = parseInt(navigator.appVersion,10);
      }
      let BrowserInfo = {
        'Browsername':browserName,
        'version':fullVersion,
        'majorVersion':majorVersion
      }
      return BrowserInfo;
  }
     /* istanbul ignore next */          
    updateCurrentAppName() {
    
        this.location.pathname=this.location.pathname.substring(1).indexOf('/')===-1?this.location.pathname+"/":this.location.pathname;
    /* istanbul ignore if */
        if(this.location.pathname && this.location.pathname!=="permissionsnotfound/" && this.location.pathname!=="/ErrorOccurred/"){
      const nav_url=this.location.pathname.replace(/[.*+#?^$|[\]\\]/g, "").substring(1);
      const app_name=nav_url.substring(0,nav_url.indexOf('/'));
      const add_url=nav_url.substring(nav_url.indexOf('/'));
      if(add_url != '/' && add_url != ''){
        this.location.pathname = `/${app_name}/`;
        const message = JSON.stringify({
          eventType: 'navigation',
          payload: {
            pathname:'/'+nav_url,
            state: {
              mode: 'spa',
              detail: {timeStamp : Date.now(),origin : app_name,'route': add_url, eventName:'deeplinkEvent',body:{'route': add_url}}
            }
          }});
          if(!window.getContext){
            window.getContext = () =>{ return [{payLoad:{ timeStamp : Date.now(),origin : app_name,'route': add_url, eventName:'deeplinkEvent',body:{'route': add_url}}}]};
          }
          window.contextPayload = window.getContext();
          window.parent.postMessage(message);
          this.history.push(this.location.pathname);
      }
    }
    if ((window.localStorage || global.localStorage) && !isUndefined( this.location) ) {
      const pathname=this.location.pathname.substring(1).indexOf('/')===-1?this.location.pathname+"/":this.location.pathname;
        let currentAppName, navigationString = window.localStorage.getItem('navigation') !== null ? JSON.parse(window.localStorage.getItem('navigation')) : [],
        currentAppObj = navigationString.find(n => n.link === pathname);
        let isValidFilePath = window.localStorage.getItem('userInfoDialogMap') ? JSON.parse(window.localStorage.getItem('userInfoDialogMap')).filter(n => n.location === `/${window.location.hash.split("/")[1]}` ) : [];
        if( isUndefined(currentAppObj)&& this.location.pathname!=="/permissionsnotfound/" && this.location.pathname!=="/ErrorOccurred/") {
      
          let microapplist= window.localStorage.getItem('microapps') !== null ? JSON.parse(window.localStorage.getItem('microapps')):[];
          let existingApp =microapplist.find(n => n.link === pathname);
          if(existingApp){return existingApp.id;}

        }
        currentAppName = currentAppObj?(window.i18Resources!=""?(currentAppObj.displayTextId ?currentAppObj.displayTextId: currentAppObj.id):currentAppObj.name):"";
        window.currentAppObject = currentAppObj;
        if(localStorage.getItem('displayMenuItemOnHeader') === 'false' && localStorage.getItem('displayMicroappOnHeader') === 'false' && localStorage.getItem('applicationName') !== 'undefind'){
          currentAppName = localStorage.getItem('applicationName');
        }else if(localStorage.getItem('displayMenuItemOnHeader') === 'true'){
            let menuItems = JSON.parse(localStorage.getItem('menuItems'));
            if(currentAppObject && currentAppObject.menuItemId){
              let menuItemObject = menuItems && menuItems.find((n)=>n.id === currentAppObject.menuItemId);
              currentAppName = menuItemObject?(window.i18Resources!=""?(menuItemObject.displayTextId ?menuItemObject.displayTextId: menuItemObject.id):menuItemObject.name):"";
            }
          }
        return currentAppName;
      }
    } 

    render() {
      return <WrappedComponent 
     setIsOpen={this.setIsOpen} 
     setIsLogoutOpen={this.setIsLogoutOpen} 
     handleLogout={this.handleLogout}  
     updateCurrentAppName={this.updateCurrentAppName} 
     {...this.props} handleUserIconClick={this.handleUserIconClick} 
     notitfication={this.state.notitfication}  
     userInfo={this.props.userInfo} isLogoutOpen={this.state.isLogoutOpen} 
     open={this.props.open}
     browserInfo = {this.getBrowserInfo()}
     notificationConfig={this.state.notificationConfig}
     notificationData={this.state.notificationData}
     advNotificationCount={this.state.advNotificationCount}
     markNotificationRead={this.markNotificationRead}
     requestAdvNotification={this.state.requestAdvNotification}
     notificationErrorScreen={this.state.notificationErrorScreen}
     updateErrorId={this.state.updateErrorId}
      />
    }
  }
  return withStyles(styles)(HeaderHoc);
};

export default HeaderSet;
