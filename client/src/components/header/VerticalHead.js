import React, {Component,Suspense} from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserInfoPopUp from '../../UserInfoPopUp';
import CommentBox from '../../CommentBox';
import Button from '@material-ui/core/Button';
import MessageContent from '../../frame/MessageContent';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import isUndefined from 'lodash/isUndefined';
import LogoutConfirmationDialog from '../../LogoutConfirmationDialog';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import HeaderSet from './HeaderHoc';
import SnackBox from '../SnackBox';
import { withTranslation } from 'react-i18next';
import './VerticalHead.css';
import Tooltip from '@material-ui/core/Tooltip';
import FeedbackPopup from '../../FeedbackPopup';
import SpecificSnapshot from '../Feedback/SpecificSnapshot';
import i18N from 'i18next';
import _ from "lodash";
import Badge from '@material-ui/core/Badge';
import NotificationsMenu from '../NotificationsMenu/NotificationsMenu';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Loading from '../../Loading';
import OpenLeftMeuIcon from '../../assets/Hamburger_Open.svg';
import CloseLeftMeuIcon from '../../assets/Hamburger_Close.svg';
import clsx from "clsx";
import {BhAvatar,BhList,BhMenuItem} from '../../transformTagNameReactComponent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Menu from "@material-ui/core/Menu";
import SvgIcon from '@material-ui/core/SvgIcon';
import BhNotification from '../BhNotification/BhNotification';



const headIcon = {
  display: "inline-block",
  width: "36px",
  height: "36px",
  cursor:"pointer",
  textAlign: "center",
  marginLeft: "4px",
  paddingTop: "6px"
}
const formControl = { 
  minWidth:"200px"
}


const CustomSearchComponent = React.lazy(() => {
  let search_import;
  const componentName = JSON.parse(localStorage.getItem('searchConfig')).component;
  search_import = import(`../${componentName}`);
  return search_import;
});

class VerticalHead extends Component {
  constructor(props) {
    super(props);
    this.displayRef = React.createRef();
  }
  /* istanbul ignore next */
  state = {
    navigations: [], showAppsIcon: false,navSubOptions:[],navSubOptionsTooltip:[],
    menuList: [],userInfo:{ },pop_open: false, box_open: false,Fkopen:false,sub_menu_open:false,
    screenCapture: '',
    notitfication: {},
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
    errorMessage:"",
    errorCode:"0",
    age:'',
    channelList:[],
    loading:"false",
    searchProps: {},
    menuItemNewId :'',
    selectedIndex : '',
    anchorEl: null,
    toolTipOpen: false,
    tooltipOpenClose:false,
    menuItemParentId:'',
    selectedSubIndex:'',
    selectedMicroAppLink:""
  };
  componentDidMount() {
    document.addEventListener('onAppChange',this.changeSideMenuSelectedApp,false);
    const urlParams = new URLSearchParams(window.location.search);  
    const showMenu = urlParams.get('menu');
    /* istanbul ignore next */
    if (showMenu) {
        this.setState({ showDrawer: showMenu === 'true' });
      }
      /* istanbul ignore next */
      if ( !isUndefined( window.localStorage.getItem('navigation') ) ) {
        let navigationString = localStorage.getItem('navigation') !== null ? JSON.parse(localStorage.getItem('navigation')) : [];
        navigationString = navigationString.filter(nav => !nav.hasOwnProperty("visibility") 
        || nav.visibility);
        this.setState({ navigations: navigationString });
        if(navigationString.length === 0){
          this.setState({showAppsIcon: false});
        }   
      }
      let menuItemsString = localStorage.getItem('menuItems') !== null ? JSON.parse(localStorage.getItem('menuItems')) : [];
      this.setState({ menuItems: menuItemsString });

      let winLocation = window.location.hash;
      this.setState({selectedMicroAppLink: winLocation.split('#')[1]})
  }
  componentWillMount() {
    document.getElementsByTagName('body')[0].className = 'loggedin';
     /* istanbul ignore next */
    if ( !isUndefined( window.localStorage.getItem('navigation') ) ) {
      this.setState({showAppsIcon: localStorage.getItem('navigation') && JSON.parse(localStorage.getItem('navigation')).length > 1 ? true : false});
    }
        document.title = localStorage.getItem('productName') === null ? document.location.hostname : localStorage.getItem('productName');

        if (localStorage.getItem('tenantDropDown') !== "undefined" && localStorage.getItem('tenantDropDown') === 'true'){
          fetch(`${window.location.pathname}allChannels`,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Cache-Control':' no-cache' 
            }
          })
          .then(response =>{
            /* istanbul ignore else */
            if(response.ok){
              return response.json();
            }
            throw new Error("Something went wrong while getting all channels");
          })
          .then(data => {
            const currentTenant = localStorage.getItem("tenantid");
            this.setState({channelList: data.roles.tenants, age: currentTenant});
          }).catch((error)=>{
            this.setState({age: "No values"});
            this.setState({
              notitfication: {
                show: true,
                title:"Error",
                variant: "error",
                message: this.props.t('GetAllChannelsError')
              }
            });
          });
        }
    if ( !_.isEmpty( window.localStorage.getItem('headerMenuConfig') ) ) {
      let headerMenuConfig = localStorage.getItem('headerMenuConfig') !== "undefined" && localStorage.getItem('headerMenuConfig') !== null && JSON.parse(localStorage.getItem('headerMenuConfig'));
      let notification = headerMenuConfig && _.find(headerMenuConfig, function(o) { return o.id === "notifications"; });
      if(!_.isEmpty(notification)){
        if(window.localStorage.getItem('advanceNotificationMeta') === "undefined" || window.localStorage.getItem('advanceNotificationMeta') === "null"){
          this.getAllNotifications();
        }
      }
    }
    if(window.localStorage.getItem('searchConfig') != "undefined" && window.localStorage.getItem('searchConfig') != null){
      const searchConfig = JSON.parse(localStorage.getItem('searchConfig'));
      this.setState({searchProps: searchConfig.props});
    }
    this.navObjects = localStorage.getItem('navigation') !== null ? JSON.parse(localStorage.getItem('navigation')) : [];
    /* istanbul ignore next */
    let defaultMicroApp = window.location.hash.split('#')[1] !== '' ? this.navObjects.filter(nav=> nav.link === window.location.hash.split('#')[1]) : this.navObjects.filter(nav=> nav.default === true);
    /* istanbul ignore next */
    let menuItemId = defaultMicroApp[0] ? defaultMicroApp[0].menuItemId || defaultMicroApp[0].id:'';
    this.setState({selectedIndex: menuItemId});
   }
  componentWillUnmount() {
    document.removeEventListener('onAppChange',this.changeSideMenuSelectedApp);
  }
  /* istanbul ignore next */
  changeSideMenuSelectedApp = (event) =>{
    let selectedMenuItemIndex = event.detail && event.detail.menuItemId && event.detail.menuItemId !== undefined ? event.detail.menuItemId : '';
    this.setState({selectedIndex: selectedMenuItemIndex});
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
    })
    .then(response =>{
      /* istanbul ignore else */
      if(response.ok){
        this.setState({age:event.target.value});
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(data => {
      localStorage.setItem("tenantid",selected_channel.id);
      window.location.href = `${window.location.pathname}loginTenant`;
    }).catch((response)=>{
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
   /* istanbul ignore next */
  showAppsDrawer() {
    const { classes } = this.props;
    const { showAppsIcon } = this.state;

    if( showAppsIcon ) {
      return(
      <>
        <IconButton
          id="showAppsIcon"
          color="inherit"
          aria-label="Open drawer"
          disableTouchRipple="false"
          onClick={this.handleDrawerOpen}
          className={classNames(classes.menuButton, this.state.open && classes.hide)}
        >
           <img src={OpenLeftMeuIcon} alt="open left menu icon" />
        </IconButton>
        <IconButton
          id="closeOpenDrawer"
          disableTouchRipple="false"
          color="inherit"
          aria-label="Close drawer"
          onClick={this.handleDrawerClose}
          className={classNames(classes.menuButton, !this.state.open && classes.hide)}
          >
         <img src={CloseLeftMeuIcon} alt="close left menu icon" />
        </IconButton>
        </>
      );
    } else {
      return;
    }
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
    document.querySelector(".grid-container").classList.add("bh-open-container");
  };
  handleDrawerClose = () => {
      this.setState({ open: false });
      document.querySelector(".grid-container").classList.remove("bh-open-container");
  };
  checkFeedbackFlag() {
    let flag = false;
    let appJson = localStorage.getItem('navigation') !== null ? JSON.parse(localStorage.getItem('navigation')) : [];
    let currentAppObj = appJson.find(n => n.link === this.props.location.pathname);
    /* istanbul ignore else */
    if(currentAppObj && currentAppObj.feedbackFlag) {
        flag = true;
    }
    return flag;
    }
    openCommentBox(e) {
      e.preventDefault();
      this.setState({
          box_open: !this.state.box_open
      });
      var _paq = window._paq = window._paq || [];
      _paq.push(['trackEvent', 'Click', 'Add Feedback', new Date()]);
      } 
     callFeedbackService(input,t) {
        fetch(`${window.location.pathname}api/feedback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input)
        })
          .then((response) => {
            this.setState({
              notitfication: {
                  show: true,
                  title:"Success",
                  variant: "success",
                  message: t('FeedbackAddedSuccessfully')
              }
            });
          })
          .catch((error) => {
            this.setState({
              notitfication: {
                  show: true,
                  title:"Error",
                  variant: "error",
                  message: t('SomeErrorOccurred')
              }
            });
          });
  } 
  /* istanbul ignore next */
   getScreenshot(input,t) {
    var body = document.getElementsByTagName('iframe')[0].contentDocument.body;
    html2canvas(body).then(function(canvas) {
    input.screenshot = canvas.toDataURL();
    this.callFeedbackService(input,t);
    }.bind(this));
  }
  setCommentBoxOpen(openstate) {
    this.setState({
        box_open: openstate,
    });
  } 
  submitComment=(comment,t)=> {
      let date = new Date();
      let body = {
          user_name: this.props.userInfo.name,
          timestamp: date.getTime(),
          feedback: comment,
          screenshot: ''
      }
      this.setCommentBoxOpen(false);
      this.getScreenshot(body,t);
  }  
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

// Feedback Script Start From =================================================
  closeFeedback=()=> {
    this.setFeedbackPopupOpen(false);
  } 

  setFeedbackPopupOpen(openstate) {
    this.setState({
      Fkopen: openstate,
    });
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
    
    html2canvas(body).then((canvas) => {
      /* istanbul ignore next */
      this.displayRef.current.appendChild(canvas);
    });
  };

  SnapremoveDomImage = () =>{
     /* istanbul ignore next */
    const list = document.getElementById("completesnapshot");
    /* istanbul ignore next */
      while (list.hasChildNodes()) {
        /* istanbul ignore next */
      list.removeChild(list.firstChild);
    }
  }
// Feedback Script End From ==================

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
      }
    })
      .then((response) => { return response.json() })
      .then(data => {
        if (data && data.result && data.result.length > 0) {
          this.setState({
            notificationsData: data['result'],
            notificationsCount: data['count'],
            notificationsError: data && data['count'] > 0 ? false : true
          })
        } else if(data && data.errorCode && data.errorCode === "200"){
          this.setState({
            noNotifications: true,
            errorCode: data.errorCode,
            errorMessage: data.userMessage
          })
        } else{
          this.setState({
            notificationsError: true,
            errorCode: data.errorCode,
            errorMessage: data.userMessage
          })
        }
      })
      .catch(error => {
        this.setState({
          notificationsError: true,
          errorMessage: t('NotificationErrorMsg')
        })
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
    })
      .then(response => response.text())
      .then(data => {
        if (_.includes(data, "Successfully updated Notification")) {
          let notificationsData, notificationsCount = this.state.notificationsCount, viewNotificationError, readNotificationsIds = this.state.readNotificationsIds.slice();
          //Code for backup the readed notification in an array
          if(_.indexOf(readNotificationsIds, item.annoucementData.id) === -1){
            readNotificationsIds.push(item.annoucementData.id)
          }
          //Code for update color as read notifications
          notificationsData = _.forEach(this.state.notificationsData, x => {
            if (x.annoucementData.id === item.annoucementData.id) {
              x.annoucementData.isRead = true;
            }
          });
          //count update
          if (!_.includes(this.state.readNotificationsIds, item.annoucementData.id)) {
            notificationsCount = this.state.notificationsCount - 1;
          }
          //Error flag
          viewNotificationError = false;
          this.setState({ notificationsData, notificationsCount, readNotificationsIds, viewNotificationError });
          //For opening notification in new tab
          fetch(`${window.location.pathname}Service-hub/notification-proxy/notificationmanagement/api/v1/announcements/download?fileName=${item.annoucementData.id}`, {
            method: 'GET'
          })
            .then(response => response.json())
            .then(data => {

              function base64ToArrayBuffer(base64) {
                var binaryString = window.atob(base64);
                var binaryLen = binaryString.length;
                var bytes = new Uint8Array(binaryLen);
                for (var i = 0; i < binaryLen; i++) {
                  var ascii = binaryString.charCodeAt(i);
                  bytes[i] = ascii;
                }
                return bytes;
              }

              var sampleRes = base64ToArrayBuffer(data.Success);
              const fileURL = URL.createObjectURL(new Blob([sampleRes], { type: 'application/pdf' }));
              window.open(fileURL, '_blank')
            })
        } else {
          this.setState({
            viewNotificationError: true
          })
        }
      })
      .catch(error => {
        this.setState({
          viewNotificationError: true,
          viewNotificationErrorMsg: t('SomeErrorOccurred')
        })
      });
  }

  announcementsClose = () => {
    this.setState({
      viewNotificationError: false
    })
  }

  toggleNotificationsMenu = () => {
    this.setState({ showNotificationsMenu: !this.state.showNotificationsMenu })
  }
  //NotificationMenu end

  /* istanbul ignore next */

  removeBhAvatarringRotate = () => {
    let avaterClass = "";
    /* istanbul ignore if */
    if(this.state.pop_open && document.querySelector("svg.bh-avatar__ring.motion--fast") !== null){
        document.querySelector("svg.bh-avatar__ring.motion--fast").classList.add("BhAvatarRingRotate");
    }else{
    /* istanbul ignore if */
      if( document.querySelector(".BhAvatarRingRotate") && document.querySelector("svg.bh-avatar__ring.motion--fast") !== null){ ///need to check class is existing)){
            document.querySelector("svg.bh-avatar__ring.motion--fast").classList.remove("BhAvatarRingRotate");
            avaterClass = "";
      }
    }
    return avaterClass;
  }
 /* istanbul ignore next */
  navigationOnClick = (e, index,nav) => {
    // let selectedIndex = index ? index : '';
    // this.setState({selectedIndex: selectedIndex});
    let submicroapps= this.state.navigations;
    let submicroapps2 = localStorage.getItem('navigation') !== null ? JSON.parse(localStorage.getItem('navigation')) : [];
    submicroapps = submicroapps.filter(item => item.menuItemId !== index && item.sub_menu_open);

    for(var i= 0 ;i < submicroapps.length;i++){
      submicroapps[i].sub_menu_open = false;
    }
    nav['sub_menu_open']=!nav['sub_menu_open']
    if(index !== "undefined"){
      this.setState({menuItemNewId:nav.menuItemId,navSubOptions:submicroapps2.filter(item => item.menuItemId === index && item.visibility === true)});
    } else {
      return null;
    }
    this.setState({ toolTipOpen: false });
  }
  /* istanbul ignore next */
  handleMenuTooltipClick = (event,index,nav) => {
    let submicroapps= localStorage.getItem('navigation') !== null ? JSON.parse(localStorage.getItem('navigation')) : [];
    this.setState({ toolTipOpen: true, anchorEl: event.currentTarget});
    if(this.state.open !== true) {
      this.setState({menuItemParentId:nav.menuItemId,navSubOptionsTooltip:submicroapps.filter(item => item.menuItemId === index && item.visibility === true)});
    }
    this.setState({selectedSubIndex: window.location.hash.split('#')[1]});
    if(document.getElementById("bhTooltipMenu") !== null){
       document.getElementById("bhTooltipMenu").style.marginTop = "5px";
    }
    if(navigator.userAgent.indexOf("Firefox") != -1 && document.getElementById("bhTooltipMenu") !== null) 
    {
      document.getElementById("bhTooltipMenu").style.marginTop = "35px";
    }
  };
  /* istanbul ignore next */
  handleRequestClose = (e) => {
    if (e.currentTarget.localName !== "ul" && this.state.navSubOptionsTooltip !== null) {
      const menu = document.getElementById("bhTooltipMenu").children[2];
      const menuBoundary = {
        left: menu.offsetLeft,
        top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
        right: menu.offsetLeft + menu.offsetHeight,
        bottom: menu.offsetTop + menu.offsetHeight
      };
      if (
        e.clientX >= menuBoundary.left &&
        e.clientX <= menuBoundary.right &&
        e.clientY <= menuBoundary.bottom &&
        e.clientY >= menuBoundary.top
      ) {
        return;
      }
    }
    this.setState({ toolTipOpen: false });
  };
/* istanbul ignore next */
  handleRequestOpen =() => {
    this.setState({ toolTipOpen: true});
  }
 /* istanbul ignore next */
  onMenuSelectApp = (userInfo) => {
    this.setState({selectedMicroAppLink: userInfo.link});
    let navigation= localStorage.getItem('navigation') !== null ? JSON.parse(localStorage.getItem('navigation')) : [];
    const nav = navigation.find(nav => nav.link === userInfo.link);
    const event = new CustomEvent("onAppChange", {
      detail: nav !== undefined ? nav : { 'menuItemId': '' },
      bubbles: true,
      cancelable: true
    });
    window.parent.document.dispatchEvent(event);
    window.location.hash = `#${userInfo.link}`
    this.setState({ toolTipOpen: false });
    this.setState({selectedSubIndex: window.location.hash.split('#')[1]});
    let defaultMicroApp = window.location.hash.split('#')[1] !== '' ? navigation.filter(nav=> nav.link === window.location.hash.split('#')[1]) : this.navObjects.filter(nav=> nav.default === true);
    let menuItemId = defaultMicroApp[0] ? defaultMicroApp[0].menuItemId || defaultMicroApp[0].id:'';
    this.setState({selectedIndex: menuItemId});
  };
  /* istanbul ignore next */
  onMenuListSelectApp =(e)=>{
    this.setState({selectedMicroAppLink: e.link});
    this.setState({selectedIndex: e.menuItemId}); 
  }

  showAssetApp(){
    const event = new CustomEvent('hoverapp-event', {
      detail: {
        width: '410px'
      },
      bubbles: true,
      cancelable: true
    });
    window.parent.document.dispatchEvent(event);
  }

  handleCustomEvent = (event) => {
    if(event.type === "bhEventClose"){
      this.setState({ showAdvanceNotification: false });
    }else if(event.type === "onCloseClick"){
      this.setState({removedId: event.removedId})
    }
  }

    render() {
      const { screenCapture } = this.state;
      const { age, channelList } = this.state;
      const { classes,userInfo,t, designJSON, notificationConfig} = this.props;

      let modifiedNotificationConfig = {
        ...notificationConfig, isOpen: this.state.showAdvanceNotification, requestAdvNotification: this.props.requestAdvNotification,
        notificationErrorScreen: this.props.notificationErrorScreen, updateErrorId: this.props.updateErrorId, removedId: this.state.removedId
      };

      let  showHeaderMenuIcon = localStorage.getItem('showHeaderMenuIcon');
      const renderHeaderMenuIcon = showHeaderMenuIcon !== 'undefined' && showHeaderMenuIcon !== null ? JSON.parse(showHeaderMenuIcon) : true;

      const {...searchProps} = this.state.searchProps;
      let overlay_layout = _.isEqual(localStorage.getItem("designTemplate"), "overlay-layout");
      let allMicroapps = (localStorage.getItem('navigation') !== null && !isUndefined(localStorage.getItem('navigation'))) && JSON.parse(localStorage.getItem('navigation')); 
      {/* ======Vertical Header Tooltips:Start=======   */}
      window.getUserPreference = () => {
        return {
          lang: i18N.language,
          theme:localStorage.getItem('theme')
        }
      }
      /* istanbul ignore else */
      if(localStorage.getItem('headerMenuConfig')!=="undefined"){
        let headerMenuConfig = localStorage.getItem('headerMenuConfig') !== null ? JSON.parse(localStorage.getItem('headerMenuConfig')) : [];
        this.headerMenuIcon = headerMenuConfig;
      }
       {/* ======Vertical Header Tooltips:Start=======   */}
      const getDefaultAppLink = localStorage.getItem("defaultAppLink");
      const defAppLinkHref = getDefaultAppLink !== "" && getDefaultAppLink != null && `#${getDefaultAppLink}`;

       /* istanbul ignore else*/
    if(!isUndefined(window.localStorage.getItem('menuItems'))) {
      this.system = localStorage.getItem('menuItems') !== null ? JSON.parse(localStorage.getItem('menuItems')) : [];
      this.getBhMenuItemName = (menuItemId) => {
        let menuItemName = this.system.find(sys => sys.id === menuItemId);
        return menuItemName? menuItemName.name : '';
      }
      this.getBhMenuItemId = (menuItemId) => {
        let menuItemID = this.system.find(sys => sys.id === menuItemId);
        return menuItemID ? menuItemID.displayTextId ? menuItemID.displayTextId: menuItemID.id:'';
      }
    }
    /* istanbul ignore else */
    this.isVerticalMenuDefault = (nav) => {
      if(nav.menuItemId){
        if(this.system.find(sys => sys.id === nav.menuItemId) && this.system.find(sys => sys.id === nav.menuItemId).default === nav.id){
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
    /* istanbul ignore else */
    this.isTooltipChildList = (nav) => {
      let listSubmicroapps= localStorage.getItem('navigation') !== null ? JSON.parse(localStorage.getItem('navigation')) : [];
      var listChildApp = listSubmicroapps.filter(item => item.menuItemId === nav.menuItemId && item.visibility === true);
      if(nav.menuItemId){
        if(listChildApp.length === 1){
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

   
    
      return (
     <React.Fragment>
        {this.state.loading === "true" ? <Loading/> : null} 
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
          data-testid="app-bar"
          id="myheader"
        >
          <SpecificSnapshot removeDomSnapshot={this.SnapremoveDomImage.bind(this)} getBrowserInfo={this.props.browserInfo}></SpecificSnapshot> 

          <Toolbar disableGutters={!this.state.open} className={classes.appToolbar} id="appToolbar">

            {renderHeaderMenuIcon && this.showAppsDrawer()}
            <div id="verticalHeadAppChildToolbar" className={classes.appChildToolbar}>

              <div className={classNames(classes.appHeader,classes.verticalHeader)}  
                   style={{marginLeft: !this.state.showAppsIcon ? '0px' : renderHeaderMenuIcon ? '20px' : '5px'}}>
              <a className={classes.appBuilderTitle} href={defAppLinkHref}><img src={"/images/logo"+localStorage.getItem('appVersion')+".svg"} alt="inner logo" className={classes.innerLogo}  id="innerLogo"/> </a>
                <Typography className={classes.appTitle} id="appName" variant="h6" color="inherit" noWrap>{t(this.props.updateCurrentAppName())}</Typography>
              </div>  
        <div>
       
{/* ======Vertical Header Tooltips:Start=======   */}
      {this.headerMenuIcon && <div className="action-item" id="header-icon">
      <div class="feature_container">
        {localStorage.getItem('searchConfig') !== "undefined" && window.localStorage.getItem('searchConfig') != null &&
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
      {this.headerMenuIcon.sort((first, second) => {return first.order > second.order ? 1 : -1;})
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
                          badgeContent={localStorage.getItem('advanceNotificationMeta') !== "undefined" || window.localStorage.getItem('advanceNotificationMeta') !== "null" ? this.props.advNotificationCount : this.state.notificationsCount}
                          color="secondary"
                          className="badgeContentIcon">
                          <Icon>{actionIcon.icon}</Icon></Badge> : <Icon>{actionIcon.icon}</Icon>}</a> : null}
                    </div>
                  </Tooltip>
                    
                )})}
        </div>}
 {/*====== Vertical Header Tooltips:End========   */}
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
          </SnackBox> 
        }
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
              announcementsClose={this.announcementsClose}
            />
          }
        </MuiThemeProvider>
        <BhNotification 
          config={modifiedNotificationConfig}
          data={this.props.notificationData}
          markNotificationRead={this.props.markNotificationRead}
          handleCustomEvent={event => this.handleCustomEvent(event)}
          t={t}
        />
        <MuiThemeProvider>
          <div id="userIconAppBar" alt="appbar icon" className={classes.userIconAppBar}  
              onClick={this.props.handleUserIconClick.bind(this)}> 
              <span class="bh-header__hamburger-icon motion--fast"></span> 
            <BhAvatar className={this.removeBhAvatarringRotate()} firstname={this.props.userInfo && this.props.userInfo.title && this.props.userInfo.title[0]} lastname={this.props.userInfo && this.props.userInfo.title && this.props.userInfo.title[1]} size="medium" slot='bh-header__avatar' ring="true"></BhAvatar>
          </div>
          <UserInfoPopUp
            isOpen={this.state.pop_open}
            setIsOpen={this.props.setIsOpen.bind(this)}
            setIsLogoutOpen={this.props.setIsLogoutOpen.bind(this)}
            userInfoDialogMap = {localStorage.getItem("userInfoDialogMap")?JSON.parse(localStorage.getItem("userInfoDialogMap")):false}
            userInfo={userInfo}
            anchorEl={this.state.anchorEl}
            >        
            </UserInfoPopUp>
        </MuiThemeProvider>
          {this.checkFeedbackFlag() && <MuiThemeProvider>
          {/*<div className={classes.commentButton}
          onClick={this.openCommentBox.bind(this)}
          title="Add a comment">
            +
          </div>*/}
          
          <Button
            variant="contained"
            className={classes.commentButton}
            onClick={this.openCommentBox.bind(this)}
            color="default"
            >
                {t("AddFeedback")}
          </Button>
          <CommentBox
            isOpen={this.state.box_open}       
            setCommentBoxOpen={this.setCommentBoxOpen.bind(this)}
            submitComment={this.submitComment.bind(this)}   
          ></CommentBox>
          <SnackBox
                open={this.state.notitfication.show}
                setOpen={this.state.notitfication.show}
                autoHideDuration={6000}
                onClose={this.handleNotificationClose}
              >
                <MessageContent
                  title={this.state.notitfication.title}
                  variant= {this.state.notitfication.variant}
                  message= {this.state.notitfication.message}
                />
            </SnackBox>
        </MuiThemeProvider>}

{/*Feedback UI Start From ==============================*/}
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
            id="completesnapshotDombtn"
            >
                Get Screenshot!
          </Button>
        </MuiThemeProvider>
{/* Feedback UI End From ==============================*/}
    </div>
        
        </div>
        </Toolbar>
        </AppBar>
        {this.state.navigations.length > 0 &&
        <Drawer
              id="appsDrawer"
              variant="permanent"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: this.state.open,
                  [classes.drawerClose]: !this.state.open
                })
              }}
              >

              <div className={classes.drawerHeader} id="drawerHolder">
                <IconButton onClick={this.handleDrawerClose} id="drawerHolderBtn">
                  <AppsIcon className={classes.appChessIcon}></AppsIcon>
                </IconButton>
                <span id="stringName" className={classes.appString}>{t("apps")}</span>
              </div>
              
            {overlay_layout &&
              <div className='asset-menu' onMouseEnter={this.showAssetApp}>
                <Icon style={{fontSize: '18px'}}>
                  {allMicroapps && allMicroapps.map((app)=>{
                    if(app.id === (designJSON.Container.CommonSection.length > 0 && designJSON.Container.CommonSection[0].nestedElement.id)){
                      return app.icon
                    }
                  })}
                </Icon>
              </div>
            }

            <BhList className={classes.appLists} id="appsList" data-testid="app-list">
              <>
              {this.state.navigations.map(nav => {return nav.visibility && this.isVerticalMenuDefault(nav) ? 
                (
                <>
                  <ListItem
                      onClick={this.state.open !== true ? (event)=>this.handleMenuTooltipClick(event, nav.menuItemId, nav) : (event) => this.navigationOnClick(event, nav.menuItemId, nav)}
                      id="appsListItem"
                      disableTouchRipple="false" 
                      button="true" 
                      key={nav.id}
                      component={!nav.menuItemId ? NavLink : (this.state.open !== true && this.isTooltipChildList(nav)) ? NavLink:""} 
                      to={!nav.menuItemId ? nav.link : (this.state.open !== true && this.isTooltipChildList(nav)) ? nav.link:""}
                      className={classNames(this.state.selectedIndex === nav.menuItemId ? "active" : '')}
                      style={{ zIndex: 2000}}
                     // disabled={window.getPermissionListByAppId(nav.id).access === "disabled" ? true:false}
                    >

                    <Tooltip id="toolTipCloseDrawer" title={this.state.open !== true && !nav.menuItemId ? 
                      (window.i18Resources !== "" ? nav.menuItemId ? t(this.getBhMenuItemId(nav.menuItemId)) : (nav.displayTextId ? t(nav.displayTextId) : t(nav.id)) : nav.menuItemId ? this.getBhMenuItemName(nav.menuItemId) : nav.name) 
                      :!_.isEmpty(this.state.navSubOptionsTooltip) && this.state.navSubOptionsTooltip.length === 1 && this.state.open !== true ?
                      (window.i18Resources !== "" ? nav.menuItemId ? t(this.getBhMenuItemId(nav.menuItemId)) : (nav.displayTextId ? t(nav.displayTextId) : t(nav.id)) : nav.menuItemId ? this.getBhMenuItemName(nav.menuItemId) : nav.name)  
                          : ""} 
                    placement="right">
                      <ListItemIcon  
                      id={nav.id}
                      onMouseEnter={(event)=>this.handleMenuTooltipClick(event, nav.menuItemId, nav)} 
                     >
                       {nav.iconSvg?
                        <SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d={nav.iconSvg}/>
                        </SvgIcon>
                         :<Icon className={classNames(classes.appsIcons, nav.cssClass)}>{nav.icon}</Icon>
                       }
                      </ListItemIcon>
                    </Tooltip>
                    
                    <Tooltip title={(window.i18Resources !== "" ? nav.menuItemId ? t(this.getBhMenuItemId(nav.menuItemId)) : (nav.displayTextId ? t(nav.displayTextId) : t(nav.id)) : nav.menuItemId ? this.getBhMenuItemName(nav.menuItemId) : nav.name).length > 20 ? (window.i18Resources !== "" ? nav.menuItemId ? t(this.getBhMenuItemId(nav.menuItemId)) : (nav.displayTextId ? t(nav.displayTextId) : t(nav.id)) : nav.menuItemId ? this.getBhMenuItemName(nav.menuItemId) : nav.name) : ""} placement="right">
                      <ListItemText id="microappName" primary={(window.i18Resources !== "" ? nav.menuItemId ? t(this.getBhMenuItemId(nav.menuItemId)) : (nav.displayTextId ? t(nav.displayTextId) : t(nav.id)) : nav.menuItemId ? this.getBhMenuItemName(nav.menuItemId) : nav.name)} className={classes.listItemTxt}></ListItemText>
                    </Tooltip>
                       {nav.menuItemId && nav.menuItemId !== "" ? nav.sub_menu_open && nav.menuItemId === this.state.menuItemNewId ? <ExpandLessIcon /> : <ExpandMoreIcon /> : null}
                  </ListItem>

                    <Collapse id="appsCollapseListItem" in={nav.sub_menu_open && this.state.open} timeout="auto" unmountOnExit>
                      {nav.menuItemId && nav.menuItemId !== "" ?
                        nav.sub_menu_open && nav.menuItemId === this.state.menuItemNewId && !_.isEmpty(this.state.navSubOptions) && this.state.navSubOptions.map(item => {
                          return (

                            <ListItem id="childAppsListItem" onClick={()=>this.onMenuListSelectApp(item)} button="true" disableTouchRipple="false" key={item.id} component={NavLink} to={item.link ? item.link : ""} activeClassName="active" exact={true}>
                              <Tooltip title={(window.i18Resources !== "" ? (item.displayTextId ? t(item.displayTextId) : t(item.id)) : item.name).length > 20 ? (window.i18Resources !== "" ? (item.displayTextId ? t(item.displayTextId) : t(item.id)) : item.name) : ""} placement="right">
                                <ListItemText id="childMicroappName" primary={(window.i18Resources !== "" ? (item.displayTextId ? t(item.displayTextId) : t(item.id)) : item.name)} className={classes.listItemTxt}></ListItemText>
                              </Tooltip>
                            </ListItem>

                          )
                        }) : null
                      }
                    </Collapse>
                    {nav.menuItemId && nav.menuItemId !== "" && !_.isEmpty(this.state.navSubOptionsTooltip) && this.state.navSubOptionsTooltip.length > 1 && this.state.open !== true && this.state.toolTipOpen && nav.menuItemId === this.state.menuItemParentId ?

                      <Menu
                        id="bhTooltipMenu"
                        anchorEl={this.state.anchorEl}
                        open={this.state.toolTipOpen}
                        onClose={this.handleRequestClose}
                        onMouseLeave={this.handleRequestClose}
                        style={{ zIndex: 1000}}
                        MenuListProps={{
                          style: {
                            padding: 0,
                          },
                        }}
                     >
                        {!_.isEmpty(this.state.navSubOptionsTooltip) && this.state.navSubOptionsTooltip.length > 1 && this.state.navSubOptionsTooltip.map(item => {
                          return (
                           <BhMenuItem 
                              label={(window.i18Resources !== "" ? (item.displayTextId ? t(item.displayTextId) : t(item.id)) : item.name)} 
                              id={item.id}
                              onClick={()=>this.onMenuSelectApp(item)} 
                              isSelected={this.state.selectedSubIndex === item.link ? true : false} 
                            />
                          )
                        })} </Menu> : null
                    }
                </>
                ):null})
              }
            </>
            </BhList>
            </Drawer>}	 
                      
            <LogoutConfirmationDialog
      title="Logout"
      open={this.props.isLogoutOpen}
      setOpen={this.props.setIsLogoutOpen.bind(this)}
      onConfirm={this.props.handleLogout.bind(this)}
      >
        <h6 className={classes.logoutconfirm}>{t('LogoutConfirm')}</h6>
      </LogoutConfirmationDialog>
    {/* Feedback:CompleteSnaphot image Location below         */}
    <div ref={this.displayRef} id="completesnapshot" style={{display: "none"}}/>  

  </React.Fragment>   

     );
     
    }
  }
  VerticalHead.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  export default withTranslation()(HeaderSet(VerticalHead));
