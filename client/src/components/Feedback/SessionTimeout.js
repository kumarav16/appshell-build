import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import withStyles  from '@material-ui/core/styles/withStyles';
import { withTranslation } from 'react-i18next';
import DialogBox from '../DialogBox';
import DialogContentText from '@material-ui/core/DialogContentText';

const styles = {
    DialogBoxBackGround: {
      textAlign: "center !important",
    }
  };

function SessionTimeout(props) {

    const {
        classes,
        dialogShow,
        setdialogShow,
        t,
        ...other
    } = props;

/* istanbul ignore next */
const callTimeout = () => {
      setdialogShow();
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
      getlogouturl();
}
const getlogouturl=()=>{
/* istanbul ignore next */
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
     localStorage.setItem("sessionLogout",true);
     localStorage.setItem('logoutSuccess',true)
     window.location.href = data.logout + window.location.origin + (window.location.pathname === '/'?"":"/"+window.location.pathname.substring(1,window.location.pathname.length-1));
    });
  }

    return (
        <>
            <DialogBox showDialog={dialogShow} id={"dialogPopup"} className={"genFrameDialogPopup"}>
                <DialogTitle id="alert-dialog-title">{props.t('SessionTimeout')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.t('SessionTimeoutInfo')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={callTimeout} autoFocus>
                        {props.t('Close')}
                    </Button>
                </DialogActions>
            </DialogBox>
        </>
    );
}

export default withTranslation()(withStyles(styles)(SessionTimeout));
