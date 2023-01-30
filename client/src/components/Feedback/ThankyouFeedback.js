import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import withStyles  from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CardMedia from '@material-ui/core/CardMedia';
import Thankuimage from '../../assets/Thankyouicon.svg';
import ErrorICon from '../../assets/Couldnotcomplete.svg';
import { withTranslation } from 'react-i18next';

const styles = {
  ThankuFeedbackTitle: {
    textAlign: "center !important",
  },
  closeButton: {
    textAlign: "right",
    "& .MuiIconButton-root":{
      color: 'var(--color-text-common-primary) !important'
    }
  },
  ThankuFeedbackLogTitle:{
      textAlign:"center !important",
      fontFamily: "var(--font-family-menu-link-medium) !important",
      fontStyle: "normal !important",
      fontWeight: "600 !important",
      fontSize: "16px !important",
      lineHeight: "22px !important",
      alignItems: "center !important",
      color: "var(--color-text-common-primary) !important"
  },
  ThankuFeedbackDialogcontent:{
    textAlign:"center",
    margin: "50px",
    marginTop: "0px",
    width: "250px"
  },
  Thankucontent:{
     fontSize:15,
     textAlign:"center",
  },
  Thankucontenttext:{
    fontFamily: "var(--font-family-body-small) !important",
    fontStyle: "normal !important",
    fontWeight: "400 !important",
    fontSize: "16px !important",
    lineHeight: "24px !important",
    alignItems: "center !important",
    textAlign: "center !important",
    letterSpacing: "0.1px !important",
    color: "var(--color-text-common-primary) !important",
    margin: "0px !important"
  },
  media: {
    height: 0,
    paddingTop: '78.25%',
    width: '97.5%',
  },
  thankutopicon:{
      textAlign:"center",
  },
  thankutopiconbtn:{
    backgroundColor: "#02BC93",
    color:"white",
    boxShadow: "none",
  },
  mediaerror:{
    height:'126.73px',     
    width: '145.5px',
    marginLeft: '49px',
    marginBottom:'15px',
    marginTop: '50px'
  },
  statusImageDiv:{
    width: "235px",
    marginLeft: "16.4%"
  },
  paper: {
    width: "40%",
    maxHeight: 435,
  }
};




function ThankyouFeedback(props) {
  
  const { 
    classes,
    onCloseThanku,
    openThanku,
    errorFlag,
    t,
     ...other
     } = props;

  const handleCancel = () => {
    onCloseThanku();
  };

 

  return (
  <>
  <form>
    <Dialog open={openThanku} {...other} className={classes.ThankuFeedbackDialog}>
      <div className={classes.closeButton}>
        <IconButton aria-label="close"
         onClick={handleCancel}>
            <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.statusImageDiv}>
      {openThanku ? errorFlag ?  <CardMedia className={classes.mediaerror} image={ErrorICon} /> : <CardMedia className={classes.media} image={Thankuimage}/>:null}
      </div>
      <div id="ThankuFeedbackTitle" className={classes.ThankuFeedbackLogTitle}>{openThanku ? errorFlag ? t("FeedbackErrorTitle"): t("ThankYou"):""}</div>
      <DialogContent className={classes.ThankuFeedbackDialogcontent}>
          <div className={classes.Thankucontent}>
                {openThanku ? errorFlag? <h4 id="FeedbackErrorMsg" className={classes.Thankucontenttext}>{t("FeedbackErrorMsg")}</h4>: <h4 id="FeedbackContentMsg" className={classes.Thankucontenttext}>{window.i18Resources!==""? t("ThankYouMsg") : localStorage.getItem("thankYouMsg")}</h4> : null}
          </div>
      </DialogContent>
    </Dialog>
  </form>
  </>
  );
}

export default withTranslation()(withStyles(styles)(ThankyouFeedback));
