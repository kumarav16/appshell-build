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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from "react-router";
import { withTranslation } from 'react-i18next';
import i18N from 'i18next';
import { BhDropdown, BhButton, BhLinks, BhTextInput } from "../transformTagNameReactComponent"
import "./login.css"
import _ from 'lodash';

const styles = () => ({

  imageSection: {
    height: '100vh',
    position: 'absolute',
    left: '0px',
    aspectRatio: "3/2",
    // width: "100%",
    width: "67%",
    top: '0%',
    background: '#1A2321',
    backgroundImage: "url(/images/pre-login.svg)",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  titleIcon: { width: "45px" },
  root: {
    display: 'flex',
    overflowY: 'auto',
    height: '100vh',
    // paddingBottom:'80px',
    backgroundColor: 'rgba(255,255,255,0)',
    color: 'white',
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

  paper: { width: "75%", marginTop: "-13%" },
  policy: {
    display: "flex",
    top: "90%",
    left: "66%",
    width: "34%",
    padding: "1%",
    zIndex: "9",
    position: "absolute",
    fontSize: "12px",
    textAlign: "center",
    fontFamily: "Poppins",
    justifyContent: "center",
    color: "#121212"
  },
  messagePage: {
    height: "111px",
    width: "99%",
    fontSize: "16px",
    fontFamily: 'Noto Sans',
    textAlign: "center",
    color: "#121212",
    marginTop: "6%"
  },

  formContainer: { paddingLeft: '0px', width: '100%' },
  formControl: { width: '100%', marginBottom: '30px', color: '#fff', '& div': { margin: '0px' } },
  form: { width: '100%', marginTop: 0, color: '#fff' },
  loadingSubmitRightHolder: { width: '100%', marginBottom: '0px', marginTop: "6%" },
  bhlogo: {
    width: '170px',
    marginLeft: '2%',
    marginTop: '2%'
  },
  titletext: {
    padding: "20% 2%",
    // height: "28px",
    fontFamily: 'Poppins',
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "-0.5px",
    color: "#05322B"
  },
  subtitle:
  {
    marginTop: "-15%",
    fontFamily: 'Poppins',
    fontWeight: "600",
    fontSize: "18px",
    width: "100%",
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "-0.25px",
    color: "#121212"
  },
  titlelogin: { marginTop: "25%", gap: '47px' },
  logocontainer: { padding: '24px' },
  footer: {
    zIndex: "9",
    position: "absolute",
    left: "66%",
    top: "94%",
    fontFamily: 'Poppins',
    fontSize: "12px",
    color: "#595959",
    padding: "1%",
    textAlign: "center",
    width: "34%"
  },
  support: {
    fontFamily: 'Noto Sans',
    fontSize: "12px",
    marginTop: "4%",
    lineHeight: "18px",
    textAlign: "center",
    color: "#616161"
  }
});

class PreLoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '', loading: false, productName: '', disable: false, inputSelection: "dropdown", isMultiple: false, error: false, emailid: "", dropdown: false, errorMessage: "", clickHere: "", contactSupport: "", contactUs: "", termsOfUse: "", privacyPolicy: "", domain: "", tenantList: [], tenant: ""
    }
  }
  componentWillMount() {
    /*** check for additional params in url without login ***/
    let app_link;
    localStorage.getItem('clickHere') && this.setState({ clickHere: localStorage.getItem('clickHere') });
    localStorage.getItem('contactSupport') && this.setState({ contactSupport: localStorage.getItem('contactSupport') });
    localStorage.getItem('privacyPolicy') && this.setState({ privacyPolicy: localStorage.getItem('privacyPolicy') });
    localStorage.getItem('contactUs') && this.setState({ contactUs: localStorage.getItem('contactUs') });
    localStorage.getItem('termsOfUse') && this.setState({ termsOfUse: localStorage.getItem('termsOfUse') });


    fetch(`${window.location.pathname}api/usermanager/product`, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
      .then(response => response.json())
      .then(data => {
        this.setState({
          productName: data.productName
        });
        let productName = window.i18Resources !== "" ? this.props.t('productName') === 'productName' ? this.props.t('ProductName') !== 'ProductName' ? this.props.t('ProductName') : data.productName : this.props.t('productName') : data.productName
        localStorage.setItem('productName', productName);

        /* istanbul ignore next */
        window.getUserPreference = () => {
          return {
            lang: i18N.language,
            theme: localStorage.getItem('theme')
          }
        }
      }).catch(error => {
        /* istanbul ignore next */
        console.log('error :: ', error)
      });
  }
  back = () => {
    this.setState({ disable: false })
    this.setState({ isMultiple: false })
  }

  tenantSelectHandler = async () => {
    let response = await fetch(`${window.location.pathname}api/setTenant?tenant=${this.state.tenant}&emailid=${this.state.emailid}`, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } });
    response = await response.json();

    // response['setTenantinfo']?props.tenantHandler(response.setTenantinfo):null;

    // if (response['setTenantinfo']) {
    //   localStorage.setItem("tenantset", true);
    // }
    localStorage.setItem("selectedTenant",this.state.tenant);
    localStorage.setItem('windowContext', JSON.stringify(window.contextPayload));
    window.location.href = `${window.location.pathname}loginTenant?tenant=${this.state.tenant}`;

  }

  handlFormSubmit = async (event) => {
    event.preventDefault();
    let domain = !_.isEmpty(this.state.emailid) && _.includes(this.state.emailid, "@") && this.state.emailid.split("@")[1];
    this.setState({ domain: domain })
    this.setState({ error: false })
    this.setState({ errorMessage: "" })
    this.setState({ disable: true })
    let response = await fetch(`${window.location.pathname}api/fetchTenant?emailid=${this.state.emailid}`, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } });
    if (response.status !== 200) {
      if (this.state.emailid === "") {
        this.setState({ disable: false })
        this.setState({ error: true })
        this.setState({ errorMessage: "Please enter username." })
      }
      else if (this.state.emailid.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g) === null) {
        this.setState({ disable: false })
        this.setState({ error: true })
        this.setState({ errorMessage: "Please use a valid format. e.g : abc@domain.com" })
      } else
        this.setState({ disable: false, error: true, errorMessage: "Please enter an valid username." })
    } else {
      response = await response.json();
    }
    response['tenants'] ? this.setState({ tenantList: response.tenants }) : null;
    response['isMultiple'] ? this.setState({ isMultiple: response.isMultiple, }) : this.setState({ disable: false });
    if (response['setTenantinfo']) {
      // localStorage.setItem("tenantset", true);
      localStorage.setItem('windowContext', JSON.stringify(window.contextPayload));
      localStorage.setItem("selectedTenant",this.state.tenantList[0]);
      window.location.href = `${window.location.pathname}loginTenant?tenant=${this.state.tenantList[0]}`;
    }
   
  }

  handleChange = (event) => {
    this.setState({ emailid: event.detail })
  }
  selectTenant = (event) => {
    this.setState({ tenant: event.detail })
  }
  render() {
    const { classes, t } = this.props;
    let { productName, disable, inputSelection, tenant, error, errorMessage, isMultiple, emailid, clickHere, contactSupport, contactUs, privacyPolicy, termsOfUse, domain, tenantList } = this.state;

    if (this.state.grantTypeAuthCode) {
      return (<React.Fragment><div></div> </React.Fragment>);
    } else {
      return (
        <React.Fragment>
          <Grid container className={classes.root} >
            <Grid xs={8} item>
              <div id="productImgBlock" className={classes.logocontainer}>
                <div className={classes.imageSection} >
                  <div>
                    <img src={"/images/main-logo.svg"} className={classes.bhlogo} />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid xs={4} item style={{ zIndex: "9", background: "white", height: "100vh" }}>
              <Grid item container justify='center' className={classes.titlelogin}>
                {/* <div className={classes.titletext}>{t('Welcome')}</div> */}
                <div style={{ display: "flex", width: "60%", justifyContent: "center" }}><img className={classes.titleIcon} src={'/images/consumer-logo.svg'} /><div className={classes.titletext}>{window.i18Resources !== "" ? t('productName') === 'productName' ? t('ProductName') !== 'ProductName' ? t('ProductName') : productName : t('productName') : productName}</div>
                </div>
                <div className={classes.subtitle}>{t('SignIn')}</div>
                <div className={classes.paper} id="loginContainer" data-testid="login-container">



                  <div className={classes.formContainer} id="formContainer">
                    <form className={classes.form} id="loginForm" onSubmit={this.handlFormSubmit}>
                      <FormControl margin="normal" required fullWidth>
                        <BhTextInput label={t("Username")} disabled={disable} placeholder="Enter Username" error={error} message={errorMessage} required onBhEventChange={this.handleChange} value={emailid}></BhTextInput>
                      </FormControl>
                      {!error && isMultiple && inputSelection === "dropdown" &&
                        // dropdown && 
                        <FormControl margin="normal" required fullWidth className={classes.formControl} style={{ height: "45px" }}>
                          <BhDropdown
                            menuItems={tenantList}
                            width="100%" searchable="false" unselectable="false" multiselect="false" selectall="false" label={t("DropdownLabel")} required="false" placeholder="Select the tenant name" fluid="false" error="false" onBhEventChange={this.selectTenant} value={tenant} />
                        </FormControl>}
                      {isMultiple && inputSelection === "message" && domain !== "bh" &&
                        // dropdown && 
                        <div className={classes.messagePage}>{t("TenantMessage")}
                        </div>
                      }
                      {isMultiple && inputSelection === "message" && domain === "bh" &&
                        // dropdown && 
                        <div className={classes.messagePage}>{t("TenantMessage")}
                          <br /><br />
                          {t("UrlMessage")}&nbsp;
                          <BhLinks type="primary" text={t("ClickHere")} href={clickHere}></BhLinks>
                        </div>
                      }

                      {(!isMultiple || error) && <FormControl margin="normal" type="submit" required fullWidth><div className={classes.loadingSubmitRightHolder}><BhButton id="next" type={"primary"} label={t('Next')} fluid></BhButton></div></FormControl>}

                      {!error && isMultiple && inputSelection === "dropdown" && <div style={{ display: "flex", width: "103%", marginTop: "14%" }}>
                        <BhButton type="secondary" label={t('Back')} onClick={this.back}></BhButton>
                        <BhButton type="primary" label={t('Continue')} onClick={this.tenantSelectHandler}></BhButton>
                      </div>}
                      {this.state.loading && <LinearProgress title="loading" className={classes.loading} color="secondary" />
                      }
                      <CssBaseline />
                    </form>
                  </div>
                </div>
              </Grid>
              {contactSupport !== "" && <div className={classes.support}>{t('AccountAccess')}&nbsp;<BhLinks type="primary" text={t('ContactSupport')} href={contactSupport} noUnderline></BhLinks></div>}
            </Grid>
            <div className={classes.policy}>
              <BhLinks type="secondary" text={t('PrivacyPolicy')} href={privacyPolicy} noUnderline></BhLinks>
              <div>&nbsp;&nbsp;•&nbsp;&nbsp;</div>
              <BhLinks type="secondary" text={t('TermsOfUse')} href={termsOfUse} noUnderline></BhLinks>
              <div>&nbsp;&nbsp;•&nbsp;&nbsp;</div>
              <BhLinks type="secondary" text={t('ContactUs')} href={contactUs} noUnderline></BhLinks>
            </div>
            <div className={classes.footer}>{t('Copyright')}</div>
          </Grid>
        </React.Fragment>
      );
    }
  }

}

PreLoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTranslation()(withStyles(styles)(withRouter(PreLoginPage)));
