import React , { lazy ,Suspense} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import withTheme  from '@material-ui/core/styles/withTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import  size  from 'lodash/size';
import color from '@material-ui/core/colors/amber';
import MainComponent from '../components/MainComponent';
import CommonComponent from '../components/CommonComponent';
import Container from '../components/Container';
let HeaderSubComponent,designJSON;
import io from "socket.io-client";
import DialogBox from '../components/DialogBox';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';

const styles = theme => ({
  root: {
  webkitUserSelect: 'none',
  userSelect: 'none'}
});


class CustomHome extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    open: false,
    userInfo:{ },
    dialogShow:false,
  };
}
  poll() {
    fetch(`${window.location.pathname}polling`,{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control':' no-cache' 
    }
  })
  .then(response =>response.json())
  .then(data => {
  if(data.message === 'failure') {
          clearInterval(this.timer)
          this.timer = null; 
            localStorage.setItem('sessionTimeOut',true);
            this.setState({
              dialogShow:true
          });
  }else {
    if(data.timeoutmsg === 'session missing'){
      localStorage.clear();
      this.props.history.push('/');
  }} 
  })
  }
  getlogouturl = () => {
    fetch(`${window.location.pathname}logout`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': ' no-cache'
      }
    })
      .then(response => response.json())
      .then(data => {
        let logout = data && data.logout;
        let pathname = window.location.pathname;
        let windowOrg = window.hasOwnProperty( "location" ) && window.location.origin;
        localStorage.setItem("sessionLogout", true);
        localStorage.setItem('logoutSuccess', true)
        window.location.href = logout + windowOrg + (pathname === '/' ? "" : "/" + pathname.substring(1, pathname.length));
      }).catch(() => this.setState({ message: this.props.t('LoginError'), loading: false }));
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
    localStorage.removeItem("UserInfo");
    localStorage.removeItem("tenantid");
    localStorage.removeItem("refreshWindow");
    localStorage.removeItem("showHeaderMenuIcon");
    localStorage.removeItem("menuItems");
    localStorage.removeItem("licencesUrl");
    localStorage.removeItem("thankYouMsg");
    localStorage.removeItem("unlicensedMessage");
    localStorage.removeItem("showHeaderMenuIcon");
    localStorage.removeItem("polling");
    localStorage.removeItem("wsport");
    localStorage.removeItem("tenancy");
    localStorage.removeItem("selectedApp");
    localStorage.removeItem("displayMenuItemOnHeader");
    localStorage.removeItem("displayMicroappOnHeader");
    localStorage.removeItem("applicationName");
    localStorage.removeItem("advanceNotificationMeta");
    localStorage.removeItem("selectedTenant");
    localStorage.removeItem("appVersion");
    this.getlogouturl();
  }    
  componentWillMount() {
    this.poll();
    let polling = localStorage.getItem('polling');
    if(!isNaN(polling)){
      this.timer = setInterval(()=> this.poll(), polling);
    }
    
     designJSON={"header":{"name":"app-header","componentName":"VerticalHead"},"Container":{"classname":"grid-container","StylingAttributes":{"display":"grid","grid-template-rows":"25% 25% 25% 25%","grid-template-columns":"25% 25% 25% 25%","grid-gap":"5px","grid-auto-rows":"150px","height":"calc(100vh - 72px)","width":"100%","margin-top":"72px","padding-left":"58px"},"CommonSection":[],"mainSection":{"name":"main-app","type":"App","StylingAttributes":{"grid-column-start":"1","grid-column-end":"5","grid-row-start":"1","grid-row-end":"5"}}},"footer":{}};

    HeaderSubComponent=lazy(() => import(`../components/header/${designJSON.header.componentName}`));
  }
  componentDidMount() {
    let polling = localStorage.getItem('polling');
    if(isNaN(polling)){
        this.sessionID = localStorage.getItem("activeToken");
        this.wshost = window.location.host.replace(/['"]+/g, '');
        this.wshostname = window.location.hostname.replace(/['"]+/g, '');
        this.protocol = window.location.protocol.replace(/['"]+/g, '');
        if (this.protocol === "https:") {
          this.ioClient = io.connect(`wss://${this.wshost}`, {transports: ['websocket']});
        }
        else {
          let wsport= JSON.parse(window.localStorage.getItem('wsport'));
          this.ioClient = io.connect(`ws://${this.wshostname}:${wsport}`, {transports: ['websocket']});
        }

          this.ioClient.on("connect", () => {  
          this.ioClient.emit('token', this.sessionID);
        });
          this.ioClient.on('timeout', (data) => {
            console.log('session expired msg from server',data);
            this.ioClient.emit('leave', this.sessionID);
            localStorage.setItem('sessionTimeOut',true);
            window.postMessage(JSON.stringify({
              eventType: 'session-timeout',
              payload: {
                show: true,
                message: 'Session Timeout. ',
                variant: 'error'
              }
            }));
    
          });
        }
     const userData = JSON.parse(localStorage.getItem('UserInfo'));
      this.setState({
      userInfo:{
     "name" : userData && userData.name ? userData.name: "",
     "email": userData && userData.email ? userData.email : "",
     "title": userData && userData.title ? userData.title : "",
     "firstName":userData && userData.firstName ? userData.firstName: "",
     "lastName":userData && userData.lastName ? userData.lastName: ""
    }
    })
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  checkForPermittedApps=()=>{
    let currentAppName, navigationString = window.localStorage.getItem('navigation') !== null ? JSON.parse(window.localStorage.getItem('navigation')) : [],
  currentAppObj = navigationString.find(n => n.link === this.props.location.pathname);
  let microapplist= JSON.parse(window.localStorage.getItem('microapps'));
  let existingApp =microapplist.find(n => n.link === this.props.location.pathname);
  return ((existingApp && !currentAppObj)||(!existingApp && !currentAppObj));
  }
  checkForPermittedCommonApp=(commonapp)=>{
    const permittedappslist=JSON.parse(localStorage.getItem('permissions'));	
    const permittedappslistIds= permittedappslist.map(item=>{return item.rsname});	
      return permittedappslistIds.indexOf(commonapp.nestedElement.id)>-1;	
  }
  getVisibility=(cname)=>{
    const hasNav = localStorage.getItem("navigation");
    const commonImpacted=(localStorage.getItem("commonappImpacted") && localStorage.getItem("commonappImpacted")!="undefined")?JSON.parse(localStorage.getItem("commonappImpacted")):null;
    let loadedAppObject = hasNav && JSON.parse(localStorage.getItem('navigation')).filter(nav=>nav.link===window.location.hash.split("#")[1])[0];
    if(loadedAppObject && loadedAppObject!=undefined){
      let mainID = loadedAppObject.id;
      let commonImpactedApp = commonImpacted?commonImpacted.filter(obj => obj.originaterApp == mainID )[0]:undefined;
      if(commonImpactedApp && commonImpactedApp!=undefined){
        let commonImpactedObject = commonImpactedApp.impactedContainer.filter(commonappVal=> commonappVal.containerName[0]==cname);
        if(commonImpactedObject.length>0){
          return {
            "commonStylingUpdated":commonImpactedObject[0].StylingAttributes,
            "mainStylingUpdated":commonImpactedApp && commonImpactedApp.StylingAttributes ? commonImpactedApp.StylingAttributes:designJSON.Container.mainSection.StylingAttributes,
            "containerEvent":commonImpactedObject && commonImpactedObject[0].StylingAttributes?commonImpactedObject[0].StylingAttributes.listenEvent!=undefined?commonImpactedObject[0].StylingAttributes.listenEvent:true:null
              };
            }
        }
  }
  }
  render() {
    const {dialogShow ,eventType} = this.state;  
    const {t}=this.props;
    if( localStorage.getItem('sessionTimeOut') == "true"){
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
    
        const { classes, theme } = this.props;
        let {name,type,StylingAttributes}=designJSON.Container.mainSection;
     
        
        return (
          <div className={classes.root}>
            <CssBaseline />
            
            <Suspense 
            fallback={<div style={{opacity:"0",backgroundColor:"#05322B"}}>
            Loading...</div>}>
            <HeaderSubComponent
            handleDrawerOpen={this.handleDrawerOpen} 
            history={this.props.history}
            handleDrawerClose={this.handleDrawerClose}
            open={this.state.open}
            location={this.props.location}
            fetchUserMangtData={this.fetchUserMangtData}
            userInfo={this.state.userInfo}
            designJSON={designJSON}
            />
             </Suspense>
        
           
           
     
            <div>
            <Container style={designJSON.Container.StylingAttributes} classname={designJSON.Container.classname} >
          {
            JSON.parse(window.localStorage.getItem('navigation')).length!==0 ? 
            (
              this.checkForPermittedApps() ?
               null:
               (
                 designJSON.Container.CommonSection.length?
                 (
                   designJSON.Container.CommonSection.map(
                   commonapp=>{
                     return this.checkForPermittedCommonApp(commonapp)?<CommonComponent mainAppId={name} {...commonapp} commonappImpacted={this.getVisibility(commonapp.containerName)} />:null
                   }
                     )
                     ):null
               )
               
             ):null
          }
          {
            type==="App"?
            <MainComponent 
            open={this.state.open}   
            location={this.props.location} 
            history={this.props.history}
            classname={name}
            style={StylingAttributes}
            />:null
          }
            
            </Container>
            </div>

           
          </div>
        );
  }
}

CustomHome.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTranslation()(withStyles(styles, { withTheme: true })(CustomHome));
