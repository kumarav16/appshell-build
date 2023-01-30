import React, { Component, Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from '@material-ui/core/Avatar';
import UserInfoPopUp from '../../UserInfoPopUp';
import avatar_logo from '../../assets/Profile-Ring.svg';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import LogoutConfirmationDialog from '../../LogoutConfirmationDialog';
import PropTypes from 'prop-types';
import HeaderSet from './HeaderHoc';
import isUndefined from 'lodash/isUndefined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withTranslation } from 'react-i18next';
import './HorizontalHead.css'
import BreadcrumbComponent from '../Breadcrumb/Breadcrumb.component';
import Tooltip from '@material-ui/core/Tooltip';
import i18N from 'i18next';
import FeedbackPopup from '../../FeedbackPopup';
import SpecificSnapshot from '../Feedback/SpecificSnapshot';
import Button from '@material-ui/core/Button';
import NotificationsMenu from '../NotificationsMenu/NotificationsMenu';
import BhNotification from '../BhNotification/BhNotification';
import _ from "lodash";
import html2canvas from "html2canvas";
import FormControl from '@material-ui/core/FormControl';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Loading from '../../Loading';
import MessageContent from '../../frame/MessageContent';
import SnackBox from '../SnackBox';
import Fade from "@material-ui/core/Fade";
import Badge from '@material-ui/core/Badge';
import {getData} from '../../RbacData';
import SvgIcon from '@material-ui/core/SvgIcon';
const formControl = { 
  minWidth:"200px",
}

const black = {
  backgroundColor: '#05322B',
  borderBottom: "1px solid #EBEFEE",
  boxShadow: "0px 0px 0px 0px"
}
const proBorder = {
  border: "2px solid #ffffff",
  borderBottom: "0px"
}
const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0
};
const headIcon = {
  display: "inline-block",
  width: "36px",
  height: "36px",
  cursor:"pointer",
  textAlign: "center",
  marginLeft: "4px",
  paddingTop: "6px"
}
const column = {
  flexDirection: 'column'
}
const minWidth = {
  minWidth: '0px'
}

const CustomSearchComponent = React.lazy(() => {
  let search_import;
  const componentName = JSON.parse(localStorage.getItem('searchConfig')).component;
  search_import = import(`../${componentName}`);
  return search_import;
});

class HorizontalHead extends Component {
  constructor(props) {
    super(props);
    this.navigationString = [];
    this.menuItemList = [];
    this.displayRef = React.createRef();
  }
  /* istanbul ignore next */
  state = {
    pop_open: false, 
    box_open: false, 
    notitfication: {}, 
    anchorEl: {}, 
    activeTab: false, 
    value: 0, 
    selectedIndex : '', 
    selectedAppId : '',
    Fkopen:false,
    screenCapture: '',
    readNotificationsIds:[],
    notificationsData: [],
    notificationsCount : 0,
    notificationsError: false,
    noNotifications:false,
    viewNotificationError: false,
    viewNotificationErrorMsg: "",
    showNotificationsMenu:false,
    showAdvanceNotification:false,
    removedId:[],
    errorCode:"0",
    errorMessage:"",
    age:'',
    channelList:[],
    loading:"false",
    searchProps: {}
  };
  componentDidMount() {
    document.addEventListener('onAppChange',this.changeSelectedApp,false);
  }
  componentWillMount() {
    document.title = localStorage.getItem('productName') === null ? document.location.hostname : localStorage.getItem('productName');
    this.navObjects = localStorage.getItem('navigation') !== null ?
    JSON.parse(localStorage.getItem('navigation')) : [];
    let defaultMicroApp = window.location.hash.split('#')[1] !== '' ? this.navObjects.filter(nav=> nav.link === window.location.hash.split('#')[1]) : this.navObjects.filter(nav=> nav.default === true);
    let menuItemId = defaultMicroApp[0] ? defaultMicroApp[0].menuItemId || defaultMicroApp[0].id:'';
    this.setState({selectedIndex: menuItemId});
    window.getMenuItemsList = (subSysId) => { 
      let menuItemList = this.navObjects.filter(nav=>nav.hasOwnProperty("menuItemId") && nav.menuItemId === subSysId && nav.visibility === true || '');
      return menuItemList;
    }
    this.setState({selectedAppId: defaultMicroApp[0]? defaultMicroApp[0].id:''});

    if (localStorage.getItem('tenantDropDown') !== "undefined" && localStorage.getItem('tenantDropDown') === 'true'){
      fetch(`${window.location.pathname}allChannels`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control':' no-cache' 
        }
      }).then(response =>{
        if(response.ok){
          return response.json();
        }
        throw new Error("Something went wrong while getting all channels");
      }).then(data => {
        const currentTenant = localStorage.getItem("tenantid");
        this.setState({channelList: data.roles.tenants,age: currentTenant});
      })
      .catch((error)=>{
        this.setState({age: "No values"});
        this.setState({
          notitfication: {
            show: true, title:"Error", variant: "error",message: this.props.t('GetAllChannelsError')
           }
         });
       });
     }
    if (!_.isEmpty(window.localStorage.getItem('headerMenuConfig'))){
      let headerMenuConfig = localStorage.getItem('headerMenuConfig') !== "undefined" && localStorage.getItem('headerMenuConfig') !== null && JSON.parse(localStorage.getItem('headerMenuConfig'));
      let notification = headerMenuConfig && _.find(headerMenuConfig, function(o) { return o.id === "notifications";});
      if(!_.isEmpty(notification)){
        if(window.localStorage.getItem('advanceNotificationMeta') === "undefined" || window.localStorage.getItem('advanceNotificationMeta') === null){
          this.getAllNotifications();
        }
      }
    }
    if(window.localStorage.getItem('searchConfig') !== "undefined" && window.localStorage.getItem('searchConfig') != null){
      const searchConfig = JSON.parse(localStorage.getItem('searchConfig'));
      this.setState({searchProps: searchConfig.props});
    }
  }
  componentWillUnmount() {
    document.removeEventListener('onAppChange',this.changeSelectedApp);
  }
  handleTenantChange = (event) => {
    this.setState({loading:"true"});
    const selected_channel= this.state.channelList.find(item=>event.target.value===item.id);
    fetch(`${window.location.pathname}updateChannel`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control':' no-cache' 
      },
      body: JSON.stringify({name: selected_channel.name, id: selected_channel.id})
    }).then(response =>{
      if(response.ok){
        this.setState({age:event.target.value});
        return response.json();
      }
      return Promise.reject(response);
    }).then(data => {
      localStorage.setItem("tenantid",selected_channel.id);
      window.location.href = `${window.location.pathname}loginTenant`;
    })
    .catch(response=>{
      this.setState({loading:"false"});
      this.setState({
        notitfication: {
            show: true,
            title:"Error",
            variant: "error",
            message: this.props.t('UpdateChannelError')
        }
      });
    });
 };
  handleNotificationClose = () => {
    this.setState({ 
      notitfication: {
          show:false,
          title:"Info",
          message: undefined,
          variant: 'info'
      } 
  });
  };
   /* istanbul ignore next */
  handleChange = (event, value) => {
    this.setState({ value: value });
  }
  changeSelectedApp = (event) =>{
    let selectedIndex = event.detail && event.detail.menuItemId && event.detail.menuItemId !== undefined ? event.detail.menuItemId : '';
    this.setState({selectedIndex: selectedIndex});
  }
  handleListItemClick = (e, index,nav) => {
    let selectedIndex = index ? index : '';
    this.setState({selectedIndex: selectedIndex});
    this.setState({selectedAppId: nav.id});
  };
  getPermitionHorizontalAppId = (appid)=>{
    const permissionapplist= getData();
    const microappPersmissonObject=permissionapplist.find(({rsname})=>rsname===appid)
    return microappPersmissonObject;
  }
  //NotificationMenu starts
  getAllNotifications = () => {
    const { t } = this.props;
    var emailId = localStorage.getItem("UserInfo") !== null ? JSON.parse(localStorage.getItem('UserInfo')).email : "", count = "5";
    fetch(`${window.location.pathname}Service-hub/notification-proxy/notificationmanagement/api/v1/announcements/getTopAnnouncement?emailId=${emailId}&count=${count}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'X-Content-Type-Options': 'nosniff'
      }}).then((response) => { return response.json() })
      .then(data => {
        if (data && data.result && data.result.length > 0) {
          this.setState({
            notificationsData: data['result'],
            notificationsCount: data['count'],
            notificationsError: data && data['count'] > 0 ? false : true
          })
        } else if(data && data.errorCode && data.errorCode === "200"){
          this.setState({
            noNotifications: true, errorCode: data.errorCode, errorMessage: data.userMessage
          })
        } else{
          this.setState({
            notificationsError: true, errorCode: data.errorCode, errorMessage: data.userMessage
          })
        }
      })
      .catch(error => {
        this.setState({ notificationsError: true, errorMessage: t('NotificationErrorMsg')})
      })
  }

  viewNotification = (e, item) => {
    const { t } = this.props;
    /* istanbul ignore next */  
    fetch(`${window.location.pathname}Service-hub/notification-proxy/notificationmanagement/api/v1/announcements/markasread?Auto`, {
      method: 'POST',
      body: JSON.stringify({
        "id": item.id,
        "annoucementData": {
          "id": item.annoucementData.id
        },
        "userId": JSON.parse(localStorage.getItem('UserInfo')).email,
        "markAs": "true"
      }),
    }).then(response => response.text())
      .then(data => {
        if (_.includes(data, "Successfully updated Notification")) {
          let notificationsData, 
              notificationsCount = this.state.notificationsCount, 
              viewNotificationError, 
              readNotificationsIds = this.state.readNotificationsIds.slice();
          if (_.indexOf(readNotificationsIds, item.annoucementData.id) === -1) {
              readNotificationsIds.push(item.annoucementData.id);
          }
          notificationsData = _.forEach(this.state.notificationsData, x => {
          if (x.annoucementData.id === item.annoucementData.id){
              x.annoucementData.isRead = true;
            }
          });
          if (!_.includes(this.state.readNotificationsIds, item.annoucementData.id)) {
            notificationsCount = this.state.notificationsCount - 1;
          }
          viewNotificationError = false;
          this.setState({ notificationsData, notificationsCount, readNotificationsIds, viewNotificationError });
          fetch(`${window.location.pathname}Service-hub/notification-proxy/notificationmanagement/api/v1/announcements/download?fileName=${item.annoucementData.id}`, {
            method: 'GET'
          }).then(response => response.json())
            .then(data => {
                function base64ToArrayBuffer(base64) {
                var binary_String = window.atob(base64), binaryLen = binary_String.length, bytes = new Uint8Array(binaryLen);
                for (var i = 0; i < binaryLen; i++) {
                  var ascii = binary_String.charCodeAt(i);
                  bytes[i] = ascii;
                }
                return bytes;
              }
              var sampleRes = base64ToArrayBuffer(data.Success);
              const file_URL = URL.createObjectURL(new Blob([sampleRes], { type: 'application/pdf' }));
              window.open(file_URL, '_blank');
            })
        } else {
          this.setState({ viewNotificationError: true })
        }
      }).catch(error => {
        this.setState({ viewNotificationError: true, viewNotificationErrorMsg: t('SomeErrorOccurred') })
      });
  }

  announcementsClose = () => { this.setState({ viewNotificationError: false })}

  toggleNotificationsMenu = () => { this.setState({ showNotificationsMenu: !this.state.showNotificationsMenu })}
  //NotificationMenu end
  //Feedback Script Start From ===============================================
  closeFeedback=()=> { this.setFeedbackPopupOpen(false); } 
  setFeedbackPopupOpen(openstate) {
    this.setState({ Fkopen: openstate,});
  } 
  /* istanbul ignore next */ 
  getApphandleClick = (actionIcon) =>  () => {
    if(actionIcon.config.type===`feedback`){
      this.setState({
        Fkopen: !this.state.Fkopen
      });
    } else if(actionIcon.config.type===`notifications`) {
      if(actionIcon.config.serviceId === "advanceNotification"){
        this.setState({showAdvanceNotification:!this.state.showAdvanceNotification})
      }else{
        this.setState({showNotificationsMenu:!this.state.showNotificationsMenu})
      }
    }
  };
  getComDomScreenshotHandler = () => {
    var body = document.getElementsByTagName('iframe')[0].contentDocument.body;
    var header = document.getElementById('myheader');
    /* istanbul ignore next */  
      html2canvas(body).then((canvas) => { this.displayRef.current.appendChild(canvas);});
  };

  SnapremoveDomImage = () => {
    const list = document.getElementById("completesnapshot");
    /* istanbul ignore next */
      while (list.hasChildNodes()) {
        /* istanbul ignore next */  
      list.removeChild(list.firstChild);
    }
  }
// Feedback Script End From =======================================
handleCustomEvent = (event) => {
  if(event.type === "bhEventClose"){
    this.setState({ showAdvanceNotification: false });
  }else if(event.type === "onCloseClick"){
    this.setState({removedId: event.removedId})
  }
}

  checkAccess = (nav) => {
    if (this.getPermitionHorizontalAppId(nav.id) && this.getPermitionHorizontalAppId(nav.id).access !== "" && this.getPermitionHorizontalAppId(nav.id).access === "disabled"){
      return false;
    }
    else{
      return true;
    }
  }

  getTooltipTitle = (t,nav) => {
    return window.i18Resources !== "" ? nav.menuItemId ? t(this.getMenuItemId(nav.menuItemId)) : (nav.displayTextId ? t(nav.displayTextId) : t(nav.id)) : nav.menuItemId ? this.getMenuItemName(nav.menuItemId) : nav.name;
  }

  getToolTip = (t,nav) => {
    return (
      <div className='license-tooltip-container'>
        <div className='license-tooltip-appname'>{this.getTooltipTitle(t,nav)}</div> 
        <div className='license-tooltip-message'>{localStorage.getItem("unlicensedMessage") && localStorage.getItem("unlicensedMessage") !=="" ? t(localStorage.getItem("unlicensedMessage")) : "UnlicensedMessage"}</div>
      </div>
    )
  }

  render() {
    window.getUserPreference = () => {
      return {
        lang: i18N.language,
        theme:localStorage.getItem('theme')
      }
    }
    const { classes, userInfo, open, t, notificationConfig } = this.props;
    const { age, channelList } = this.state;

    let modifiedNotificationConfig = {
      ...notificationConfig, isOpen: this.state.showAdvanceNotification, requestAdvNotification: this.props.requestAdvNotification,
      notificationErrorScreen: this.props.notificationErrorScreen, updateErrorId: this.props.updateErrorId, removedId: this.state.removedId
    };
    
    /* istanbul ignore else*/
    const {...searchProps} = this.state.searchProps;
    /* istanbul ignore else*/
    if (!isUndefined(window.localStorage.getItem('navigation'))) {
        this.navigationString = localStorage.getItem('navigation') !== null ?
        JSON.parse(localStorage.getItem('navigation')) : [];
        this.selectedAppInfo = this.navigationString.find(nav=>nav.id === this.state.selectedAppId || '');
        window.getSelectedAppInfo = () => { return this.selectedAppInfo };
        this.navigationString = this.navigationString.filter(nav => !nav.hasOwnProperty("visibility") || nav.visibility);
    }
    /* istanbul ignore else*/
    if(!isUndefined(window.localStorage.getItem('menuItems'))) {
      this.system = localStorage.getItem('menuItems') !== null ? JSON.parse(localStorage.getItem('menuItems')) : [];
      this.getMenuItemName = (menuItemId) => {
        let menuItemName = this.system.find(sys => sys.id === menuItemId);
        return menuItemName? menuItemName.name : '';
      }
      this.getMenuItemId = (menuItemId) => {
        let menuItemID = this.system.find(sys => sys.id === menuItemId);
        return menuItemID ? menuItemID.displayTextId ? menuItemID.displayTextId: menuItemID.id:'';
      }
    }

    this.isMenuItemDefault = (nav) => {
      if(nav.menuItemId){
       if(this.system.find(sys => sys.id === nav.menuItemId).default === nav.id){
          return true;
        } 
        else {
          return false;
        }
      }
      else {
        return true;
      }
    }
    
    /* istanbul ignore else*/
   if(localStorage.getItem('headerMenuConfig')!=="undefined"){
      let headerMenuConfig = localStorage.getItem('headerMenuConfig')!==null ? JSON.parse(localStorage.getItem('headerMenuConfig')):[];
      this.headerMenuIcon = headerMenuConfig;
    }
    const getDefaultAppLink = localStorage.getItem("defaultAppLink");
    const defAppLinkHref = getDefaultAppLink !== "" && getDefaultAppLink !== null && `#${getDefaultAppLink}`;
    let productName = localStorage.getItem('productName');
    return (
      <React.Fragment>
        {this.state.loading === "true" ? <Loading/> : null}
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          style={black}
          data-testid="app-bar"
        >
          <SpecificSnapshot removeDomSnapshot={this.SnapremoveDomImage.bind(this)} getBrowserInfo={this.props.browserInfo}></SpecificSnapshot> 
          <Toolbar disableGutters={!open} className={classes.appToolbar} id="appToolbar">

            {/* {this.showAppsDrawer()} */}
            <div id="horizontalHeadAppChildToolbar" className={classes.appChildToolbar}>
              <Typography className={classes.hide}>{t(this.props.updateCurrentAppName())}</Typography>
              <div className='header-section'>
                <a className={classes.appBuilderTitleS1} href={defAppLinkHref}>
                  <img src={"/images/S1"+localStorage.getItem('appVersion')+".svg"} alt="inner logo" className={classes.innerLogo} />
                  <span className='product-title'>{productName}</span>
                </a>
                <div className='logo-menu-divider'></div>
                <div className={classes.tabSection} id="horizontalAppsListItem">
                  <List
                    style={flexContainer}
                    variant="scrollable"
                    scrollbuttons="auto"
                    aria-label="scrollable auto tabs"
                    onChange={this.handleChange}
                    value={this.state.value}
                    // classes={{selected: classes.tabSelected}}
                    >
                    {this.navigationString.map((nav) => {
                      return nav.visibility && this.isMenuItemDefault(nav) ? (
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 200 }} title={!this.checkAccess(nav) ?  this.getToolTip(t,nav) : this.getTooltipTitle(t,nav)}>
                         <li>
                         <ListItem style={{ display: 'flex', justifyContent: 'center',  width: '72px' }} className={classNames(classes.tabs, this.state.selectedIndex === nav.menuItemId ? "active" : '')} button={this.checkAccess(nav)} key={nav.id} component={NavLink} to={this.checkAccess(nav) && nav.link} selected={this.state.selectedIndex === nav.menuItemId}
                            onClick={(event) => this.checkAccess(nav) && this.handleListItemClick(event, nav.menuItemId, nav)} exact={true} disabled={!this.checkAccess(nav)}>
                             <ListItemIcon id={nav.id} style={minWidth}>
                                {nav.iconSvg?
                                <SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d={nav.iconSvg}/>
                                </SvgIcon>
                                :<Icon className={nav.cssClass}>{nav.icon}</Icon>
                                }
                              </ListItemIcon>
                          </ListItem>
                         </li>
                        </Tooltip>
                      ) : null
                    })}
                  </List>
                </div>
              </div>
              <div className='header-section'>
  {/* ==Horizontal Header Tooltips Start== */}
              {this.headerMenuIcon?<div className="action-item" id="header-icon">
              <div class="feature_container">
                {
                localStorage.getItem('searchConfig') !== "undefined" && window.localStorage.getItem('searchConfig') != null &&
                  <Suspense fallback={<div></div>}>
                    <CustomSearchComponent 
                      {...searchProps}
                      t={t}
                    />
                  </Suspense>
                }
                {localStorage.getItem('tenantDropDown') !== "undefined" && localStorage.getItem('tenantDropDown') === 'true'
                ? <FormControl style={{...formControl}}>
                  <InputLabel id="demo-simple-select-label" style={{color:"#c0c0c0"}}>{t('TenantDropDownLabel')}</InputLabel>
                  <Select
                    style={{color:"white"}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={this.handleTenantChange.bind(this)}
                  >{
                    channelList.length !==0 ? 
                      channelList.map((item)=>{
                        return(  <MenuItem value={item.id}>{item.name}</MenuItem>)
                      })
                    : <MenuItem disabled value="No values">No values</MenuItem>
                  }  
                  </Select>
                </FormControl>  
                : null
                }
              </div> 
              {this.headerMenuIcon.sort((first, second) => {return first.order > second.order ? 1 : -1; })
                .map((actionIcon) => {
                let getPopupOpen = actionIcon.type === "popup"? actionIcon.config.type:null;
                if (_.get(actionIcon, "config.location", "") || _.get(actionIcon, "config.mode", "")) {
                  let configObj = actionIcon && actionIcon.config && actionIcon.config.location;
                  let hrefUrl = `${configObj.replace('{language}',window.getUserPreference().lang)}`
                  var aprops={
                    href: hrefUrl,
                    target:actionIcon.config.mode==="TAB"? "_blank":null
                  }
                } 
                return (
                  <Tooltip title={window.i18Resources !== "" ? actionIcon.tooltipTextId ? t(actionIcon.tooltipTextId) : t(actionIcon.tooltipText) : actionIcon.tooltipText}>
                    <div className='menu-icon' id={actionIcon.id} order={actionIcon.order} type={actionIcon.type} style={headIcon}>
                      {actionIcon.type === "link" ? <a {...aprops}><Icon>{actionIcon.icon}</Icon></a> : null}
                      {actionIcon.type !== "link" ? <a onClick={this.getApphandleClick(actionIcon)}>{getPopupOpen === "notifications" ?
                        <Badge
                          badgeContent={localStorage.getItem('advanceNotificationMeta') !== "undefined" || window.localStorage.getItem('advanceNotificationMeta') != null ? this.props.advNotificationCount : this.state.notificationsCount}
                          color="secondary"
                          className="badgeContentIcon">
                          <Icon>{actionIcon.icon}</Icon></Badge> : <Icon>{actionIcon.icon}</Icon>}</a> : null}
                    </div>
                  </Tooltip>
                    )})}
                </div>:null  }
  {/*==Horizontal Header Tooltips End==*/}
        {this.state.notitfication.show &&
          <SnackBox
            open={this.state.notitfication.show}
            autoHideDuration={6000}
            onClose={this.handleNotificationClose}>
            <MessageContent
              onClose={this.handleNotificationClose}
              title={this.state.notitfication.title}
              variant= {this.state.notitfication.variant}
              message= {this.state.notitfication.message}/>
          </SnackBox> }
                <MuiThemeProvider>
                  <div id="userIconAppBar" alt="appbar icon" className={classes.userIconAppBarHorizontal} onClick={this.props.handleUserIconClick.bind(this)}>
                    <img src={avatar_logo} alt="avatar logo" />
                    <Avatar className={classes.userIconWithInitialsAppBar}>
                      {this.props.userInfo.title}
                    </Avatar>
                  </div>
                  <UserInfoPopUp isOpen={this.state.pop_open}  setIsOpen={this.props.setIsOpen.bind(this)}  setIsLogoutOpen={this.props.setIsLogoutOpen.bind(this)} userInfoDialogMap={localStorage.getItem("userInfoDialogMap") ? JSON.parse(localStorage.getItem("userInfoDialogMap")) : false} userInfo={userInfo} anchorEl={this.state.anchorEl}>
                  </UserInfoPopUp>
                </MuiThemeProvider>
{/*==============Feedback UI Start From ================*/}
       <MuiThemeProvider>
         <FeedbackPopup
           isOpen={this.state.Fkopen}       
           setFeedbackPopupOpen={this.setFeedbackPopupOpen.bind(this)}
           closeFeedback={this.closeFeedback.bind(this)} 
           browserInfo={this.props.browserInfo} 
          >
          </FeedbackPopup>
          <Button
            onClick={this.getComDomScreenshotHandler}
            style={{display: "none"}}
            id="completesnapshotDombtn">
                Get Screenshot!
          </Button>
        </MuiThemeProvider>
{/* ==============Feedback UI End From ==============================*/}
                <MuiThemeProvider>
                  {
                    this.state.showNotificationsMenu && 
                    <NotificationsMenu
                      // initialsColor='purple'
                      showNotificationsMenu={this.state.showNotificationsMenu}
                      toggleNotificationsMenu={this.toggleNotificationsMenu}
                      data={this.state.notificationsData}
                      count={this.state.notificationsCount}
                      errorCode={this.state.errorCode}
                      errorMessage={this.state.errorMessage}
                      errorStatus={this.state.notificationsError}
                      noNotificationsStatus={this.state.noNotifications}
                      viewNotification={this.viewNotification}
                      viewNotificationError={this.state.viewNotificationError}
                      viewNotificationErrorMsg={this.state.viewNotificationErrorMsg}
                      announcementsClose={this.announcementsClose}/>
                  }
                </MuiThemeProvider>
                <BhNotification
                  config={modifiedNotificationConfig}
                  data={this.props.notificationData}
                  markNotificationRead={this.props.markNotificationRead}
                  handleCustomEvent={event => this.handleCustomEvent(event)}
                  t={t}
                />
              </div>
            </div>
          </Toolbar>
          <div style={{ height: "44px", marginTop: "0px", backgroundColor: "white" }}>
            <BreadcrumbComponent></BreadcrumbComponent>
          </div>
        </AppBar>
        <LogoutConfirmationDialog
          title="Logout"
          open={this.props.isLogoutOpen}
          setOpen={this.props.setIsLogoutOpen.bind(this)}
          onConfirm={() => { this.props.handleLogout() }}
        >
          <h6 className={classes.logoutconfirm}>{t('LogoutConfirm')}</h6>
        </LogoutConfirmationDialog>
        {/* Feedback:CompleteSnaphot image Location below         */}
       <div ref={this.displayRef} id="completesnapshot"  style={{display: "none"}}/> 
      </React.Fragment>
    );
  }
}

HorizontalHead.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withTranslation()(HeaderSet(HorizontalHead));
