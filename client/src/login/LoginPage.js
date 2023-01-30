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

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withRouter } from "react-router";
import  createMuiTheme  from '@material-ui/core/styles/createMuiTheme';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { withTranslation } from 'react-i18next';
import i18N from 'i18next';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: { useNextVariants: true }
});

const styles = theme => ({  
  containers: {},
  loginTxt: {textAlign: 'center', color: '#747474'},

  cssOutlinedInput: {
    margin:'0px !important',
    '&$cssFocused $notchedOutline': {
      borderColor: '#02BC93 !important'
    }
  },

  cssFocused: {},

  notchedOutline: {borderWidth: '1px', borderColor: '#949494 !important'},
   eye: {cursor: 'pointer',color:'#757575',width:'22px',height:'15px',fontSize:'22px'},
  root: {
    display: 'flex',
    overflowY:'auto',
     minHeight:'99vh',	
    paddingBottom:'80px',
    backgroundColor:'rgba(255,255,255,0)',
    color:'white',
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

  paper: {display: 'flex', alignItems: 'center', height:'100%', backgroundColor:'#fff',
  borderRadius:'8px',
   border:' 1px solid #EBEFEE',
    padding: `${theme.spacing(3)+6}px`},
  
  avatar: {
    margin: theme.spacing(1),
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    '& img': {height: '42px'},
    '& span': {fontSize: '19px', color: '#27272C'}
  },

  formContainer: { paddingLeft: '0px', width: '100%'},
  formControl: {width: '400px', height: '66px', marginTop:0,marginBottom:'30px', color:'#fff' , '& div':{margin:'0px'}},
  form: {width: '400px', marginTop: 0, color:'#fff'},
  formLoadingSubmit: {width: '100%', float: 'right'},
  loadingSubmitLeftHolder: {float: 'left', width: '60%'},
  loadingSubmitRightHolder: { width: '100%', marginBottom: '0px'},
  loginsubmit: {marginTop: theme.spacing(2), borderRadius: '4px', height: '44px', backgroundColor: '#02A783', color: '#fff',
    '&:hover': {backgroundColor:'#147D64'}
  },
  inputbox:{
    padding:'12px 10px 8px'
  },
  inputlabel:{
    top:'-12px'
  },
  bhlogo:{
    width:'170px',
    marginLeft:'7px',
    marginTop:'0px'
  },
  ploginError: {textAlign: 'center', color: 'red', fontFamily: "Poppins", fontSize: '1rem'},
  titletext:{    
      fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '32px',
    lineHeight: '44px',
    color: '#05322B',
    paddingBottom:'0px',
    letterSpacing: '0.1px'
},
subtitle:
{
    fontFamily: "'Noto Sans', sans-serif",
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    letterSpacing: '0.1px',
    color: '#506C65',
    paddingBottom: '38px'
},
rememberme:{
  fontFamily: "'Noto Sans', sans-serif",
    fontSize: '14px',
    letterSpacing: '0.05px',
    padding: '10px',
    color: '#757575'
},
inputform:{margn:'0px'},
titlelogin:{paddingTop:'30px',width:'462px',textAlign:'center'},
logocontainer:{padding:'24px'},
footer:{	
  position: 'fixed',	
    left: '0',
    height: '39px',	
    width: '100%',	
    background:'#1A2321',	
    fontSize:'12px',	
    color:  '#EBEFEE',	
    paddingTop: '10px',	
    paddingLeft: '32px',	
    top: 'auto',	
    bottom: '0'	
}
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form : {email: "", password: ""},
      message: '', 
      loading: false, 
      passwordIsMasked: true, 
      productName: '',
      rememberme:false,
      disable:false,
      grantTypeAuthCode: true,authUrl:'',
      code:'',
      tenancy:false
    }
  }

/* istanbul ignore next */
   validateTenant=async ()=> {
    const tenant=this.props.match.params.tenant;
    
    let response = await fetch(`${window.location.pathname}api/validateTenant?tenant=${tenant}`,  { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } });
    response = await response.json();
  }
  componentWillMount() {
    /*** check for additional params in url without login ***/
    let app_link;
if(this.props.match.params.tenant){
  this.validateTenant();
}
  if(this.props.location.navurl){
		  const nav_url=this.props.location.navurl.replace(/[.*+#?^$|[\]\\]/g, "").substring(1);
		  app_link=nav_url.substring(0,nav_url.indexOf('/'));
      const add_url=nav_url.substring(nav_url.indexOf('/'));
      if(add_url != '/' && add_url != ''){
        window.getContext = () =>{ return  [{ payLoad:{ timeStamp : Date.now(),'route': add_url, eventName:'deeplinkEvent',body:{'route': add_url}}}]};
        window.contextPayload = window.getContext();
      }
      
		}
		/****************************************************/
	  document.getElementsByTagName('body')[0].className = '';
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
      localStorage.removeItem("logoutSuccess");
      localStorage.removeItem("sessionLogout");
      localStorage.removeItem("sessionTimeOut");
      localStorage.removeItem("headerMenuConfig");
      localStorage.removeItem("UserInfo");
      localStorage.removeItem("tenantid");
      localStorage.removeItem("tenantDropDown");
      localStorage.removeItem("searchConfig");
      localStorage.removeItem("menuItems");
      localStorage.removeItem("licencesUrl");
      localStorage.removeItem("thankYouMsg");
      localStorage.removeItem("unlicensedMessage");
      localStorage.removeItem("UserInfo");
      localStorage.removeItem("showHeaderMenuIcon");
      localStorage.removeItem("polling");
      localStorage.removeItem("wsport");
      localStorage.removeItem("displayMenuItemOnHeader");
      localStorage.removeItem("displayMicroappOnHeader");
      localStorage.removeItem("applicationName");
      localStorage.removeItem("advanceNotificationMeta");
      localStorage.removeItem("selectedTenant");
    localStorage.setItem("app_link", app_link);
    localStorage.removeItem("appVersion");
   /******************************************* */
 //  fetch('/api/usermanager/product', { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','Cache-Control':' no-cache'  } })
	  fetch(`${window.location.pathname}api/usermanager/product`, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'  } })
    .then(response => response.json())
    .then(data => {
      this.setState({ productName: data.productName, grantType: data.grantType, authUrl: data.formUrl ,grantTypeAuthCode:data.grantTypeAuthCode,
        code:data.code,tenancy:data.tenancy});
      localStorage.setItem('grantType', data.grantTypeAuthCode);
      let productName = window.i18Resources!==""? this.props.t('productName') === 'productName' ? this.props.t('ProductName') !== 'ProductName' ? this.props.t('ProductName') : data.productName : this.props.t('productName') : data.productName
      localStorage.setItem('productName', productName);
      localStorage.setItem('displayMenuItemOnHeader',data.displayMenuItemOnHeader);
      localStorage.setItem('displayMicroappOnHeader',data.displayMicroappOnHeader);
      let applicationName = window.i18Resources!==""? this.props.t('ApplicationName') !== 'ApplicationName' ?  this.props.t('ApplicationName') : data.applicationName : data.applicationName
      localStorage.setItem('applicationName',applicationName);
	    localStorage.setItem('designTemplate', data.design_template);
      localStorage.setItem('thankYouMsg',data.thankYouMsg);
      if(data.licencesUrl && data.licencesUrl !== "" && data.licencesUrl === true){
      localStorage.setItem('licencesUrl',data.licencesUrl);
      }
      localStorage.setItem('tenancy',data.tenancy);
      document.title = localStorage.getItem('productName') === 'undefined' || localStorage.getItem('productName') === null ? document.location.hostname : localStorage.getItem('productName');
     if( !this.state.tenancy){
      if (this.state.grantTypeAuthCode && this.state.grantType === "oauth2" ) {
        localStorage.setItem('windowContext', JSON.stringify(window.contextPayload));
        window.location.href = `${window.location.pathname}loginTenant`;
      }
     }
     
      else if(this.state.tenancy)
      {
          this.props.history.push('/prelogin');                 
      }
      /* istanbul ignore next */
      window.getUserPreference = () => {
        return {
          lang: i18N.language,
          theme:localStorage.getItem('theme')
        }
      }
    }).catch(error => {
      /* istanbul ignore next */
      console.log('error :: ', error)
    });
  }
   /******************************************* */
   

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };
  /* istanbul ignore next */

  handleChange = (event)  => {
    const { target: { name, value } } = event; 
    this.setState((prevState)=> {
      return  Object.assign(prevState.form,{[name]: value});
    });
  }

  handlFormSubmit = (event) => {
    event.preventDefault();
    const { email, password} = this.state;
    localStorage.setItem('username',email);
    const encryptor = require('simple-encryptor')(this.state.code);
    const encoded_password= encryptor.encrypt(password);
    const encoded_email=encryptor.encrypt(email);
    this.setState({loading:true,message:''});
    fetch(`${window.location.pathname}loginTenant`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control':' no-cache' 
        },
        body: JSON.stringify({email: encoded_email, password: encoded_password})
    })
    .then(response =>response.json())
    .then(data => {
      if(data.message === 'success') {
        this.props.history.push('/auth');
      } 
      else if(data.responseStatus === 409 && data.errors[0].code==="1001" ) 
      {
        localStorage.setItem('us',encoded_email);
        localStorage.setItem('loginauth',true);
        this.props.history.push('/changepassword');
      }
       else if(data.responseStatus === 401    ){
        // if(data.errors[0].code==="1008" )
        // {
        //   this.setState({message: 'User is disabled. Please contact the system administrator.' ,loading:false});
        // }
        // else{
        //   this.setState({message: 'Invalid credentials. Please try again.' ,loading:false});
        // }
        this.setState({message: this.props.t('InvalidUsernameOrPassword') ,loading:false});
       } else if(data.responseStatus === 500){
        this.setState({message: this.props.t('LoginError') ,loading:false});
       }

    }).catch(()=> this.setState({message: this.props.t('LoginError') ,loading:false}));
  }

  render() {
    const { classes, t } = this.props;
    let { passwordIsMasked, message, productName } = this.state;

    if(this.state.grantTypeAuthCode){
      return(  <React.Fragment><div></div> </React.Fragment>);
     }else{
        return (
          <React.Fragment>
      <Grid container className={classes.root} >
        <Grid xs={12} item> 
        <div id="productImgBlock" className={classes.logocontainer}>
                <img src={"/images/login_logo.svg"} alt="logo" className={classes.bhlogo} />
              </div> 
        </Grid>
        <Grid xs={12} item> 
        <Grid item container justify='center' >
        <div className={classes.titlelogin}>
              <div className={classes.titletext}>{t('Welcome')}</div>
              <div className={classes.subtitle}>{t('WelcomeMessage')} {window.i18Resources!==""? t('productName') === 'productName' ? t('ProductName') !== 'ProductName' ? t('ProductName') : productName : t('productName') : productName} {t('App')}</div>
            </div>
            
        </Grid>
        </Grid>
        <Grid xs={12} item> 
        <Grid item container justify='center' className={classes.containers}>
          <div className={classes.paper} id="loginContainer" data-testid="login-container">

            

            <div className={classes.formContainer} id="formContainer">
              <form className={classes.form} onSubmit={this.handlFormSubmit} id="loginForm">
                <FormControl margin="normal" required fullWidth className={classes.formControl}>                  

                  <TextField
                    required
                      id="email"
                      label={t("Username")}
                      className={classes.textField}
                      name="email"
                      margin="normal"
                      onChange={this.handleChange}
                      InputLabelProps={{required: false,classes:{root:classes.inputlabel}}}
                      InputProps={{
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                          input:classes.inputbox
                          
                        }
                      }}
                      inputProps={{'data-testid': 'nameInput'}}
                    />
                </FormControl>

                <FormControl margin="normal" required fullWidth className={classes.formControl}>
                  <TextField
                    required
                    id="password"
                    label={t("Password")}
                    className={classes.textField}
                    type={passwordIsMasked ? 'password' : 'text'}                    
                    name="password"
                    margin="normal"
            
                    onChange={this.handleChange}
                    InputLabelProps={{required: false,classes:{root:classes.inputlabel}}}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                            {  passwordIsMasked? <VisibilityOutlinedIcon
                            className={classes.eye}
                            onClick={this.togglePasswordMask}
                          />:<VisibilityOffOutlinedIcon
                          className={classes.eye}
                          onClick={this.togglePasswordMask}
                        />}
                        </InputAdornment>
                      ),
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                        input:classes.inputbox
                      }
                    }}
                    inputProps={{'data-testid':'passwordInput','autocomplete':'off'}}
                  />
                </FormControl>

                <div className={classes.formLoadingSubmit}>
                  <div className={classes.loadingSubmitLeftHolder}></div>

                  <div className={classes.loadingSubmitRightHolder}>
                    <Button type="submit" data-testid="submit" fullWidth id="formSubmitBtn" variant="contained" color="primary" className={classes.loginsubmit} disabled= {this.state.loading}>{t('SignIn')}</Button>
                    {this.state.loading && <LinearProgress title="loading" className={classes.loading} color="secondary" />}
                  </div>
                </div>
                <div id="loginError" className={classes.ploginError}>{message}</div>
                <CssBaseline />
                <Grid item container  className={classes.containers}>
              {this.state.rememberme && <Grid xs={6} item> <div className={classes.rememberme}>{t('rememberMe')}</div></Grid>}  
                </Grid>
              </form>
            </div>
          </div>
        </Grid>
        </Grid>
      </Grid>
      <AppBar position="fixed"  className={classes.footer}>
       <div  >©2020 Baker Hughes Company</div>
     </AppBar>
	     </React.Fragment>
    );
  }
}

}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTranslation()(withStyles(styles)(withRouter(LoginPage)));
