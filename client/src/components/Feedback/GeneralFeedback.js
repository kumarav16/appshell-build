import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import withStyles  from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ThankyouFeedback from "./ThankyouFeedback";
import SessionTimeout from "./SessionTimeout";
import "./FeedbackSubPopup.css";
import { withTranslation } from 'react-i18next';

const styles = {
  GeneralFeedbackLogTitle: {
    textAlign: "center !important",
    paddingTop:"0px"
  },
  GeneralFeedbackLogTitleText:{
    fontFamily:"var(--font-family-subtitle-medium)",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "24px",
    alignItems: "center",
    letterSpacing: "0.1px",
    color: "var(--color-text-common-primary)",
    paddingTop:"0px"
  },
  GeneralFeedbackDialog: {
    margin: "15px"
  },
  GeneralFeedbackDialogcontent: {
    width: "400px !important",
    padding:"0px 24px !important"
  },
  root: {
    minWidth: "275px !important",
  },
  formControl: {
    minWidth: "120 px",
    width: "100% !important",
    marginLeft: "0 px",
    marginBottom : "15px",
    "& .MuiFilledInput-multiline":{
      border: "1px solid var(--color-border-form-default)",
      "&:hover":{
        border: "1px solid var(--color-border-form-hover) !important"
      }
    }
  },
  selectEmpty: {
    marginTop: "15px"
  },
  FeedbackButton: {
    backgroundColor: 'var(--color-fill-cta-primary-default)', 
    borderRadius: "4px",
    color: 'var(--color-text-common-inverse-primary)',
    fontFamily:"Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "18px",   
    letterSpacing:"0.1px",
    height:"36px",
    position: 'absolute',
    left: "62% !important",
    textTransform: "uppercase",
    '&:hover': {backgroundColor: "var(--color-fill-cta-primary-hover)",
      borderColor: "var(--color-border-cta-primary-hover)"}
  },
  media: {
    height: 140,
  },
  closeButton: {
    textAlign: "right",
    "& .MuiIconButton-root":{
      color: 'var(--color-text-common-primary)'
    }
   },
   FeedbackButtonAction:{
     paddingBottom:"30px",
   },
   paper: {
    width: "40% !important",
    maxHeight: 435,
  },
  formError:{
    color:"#E12D39", margin: "5px", fontFamily:"Poppins", fontWeight: 400,fontSize: "0.75rem",lineHeight: 1.66,letterSpacing: "0.03333em", textAlign: "left", marginTop: "3px",marginRight: 0, marginBottom: 0, marginLeft: 0
  },
  feedbackCharCount:{
    float:"right", margin: "5px",fontFamily:"Poppins", fontWeight: 400, fontSize: "0.80rem", lineHeight: 1.66, letterSpacing: "0.03333em",marginTop: "3px", marginRight: 0, marginBottom: 0,marginLeft: 0, color: "var(--color-text-common-secondary)"
    },
  CommentformError:{
    float:"left", color:"#E12D39", margin: "5px", fontFamily:"Poppins", fontWeight: 400,fontSize: "0.75rem",lineHeight: 1.66,letterSpacing: "0.03333em",textAlign: "left", marginTop: "3px", marginRight: 0, marginBottom: 0, marginLeft: 0 
  }
};

const getUserInfo = ()=>{
 const getUserData = localStorage.getItem("UserInfo");
 if(getUserData){
   return JSON.parse(getUserData);
 }else{
   return[];
 }
}


function GeneralFeedback(props) {
  
  const { 
    classes,
    onClose,
    open,
    t,
    getBrowserInfo,
    ...other
     } = props;

  const [userInfo, setUserInfo] = React.useState(getUserInfo());
  const [userId, setUserId] = React.useState(`${userInfo.name}`);
  const [ErrorFlag, setErrorFlag] = React.useState(false);
  const [userFullname, setUserFullname] = React.useState();
  const [thankuFeedbackopen, setThankuFeedbackopen] = React.useState(false);
  const initialValues = { getUserName: userFullname, getComment: "" };
  const [formValues, setFormValues] = React.useState(initialValues);
  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [isCharCount, setCharCount] = React.useState(0);
  const [dialogShow, setdialogShow] = React.useState(false);
  const [eventType, seteventType] = React.useState("");
  
  React.useEffect(() => {
    if (userInfo.firstName === "" && userInfo.lastName === "" ) {
          setUserFullname(userId);
        } else{
          setUserFullname(`${userInfo.firstName} ${userInfo.lastName}`);
        }
  }, []);
  const formHandleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const formHandleSubmit = (e) => {
    e.preventDefault();
    if(formValues.getUserName !== "" && formValues.getComment !== ""){
     fetch(`${window.location.pathname}Service-hub/feedback-proxy/api/feedbacks`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control':' no-cache',
          'strapi':'true'
        },
        body: JSON.stringify({data:{user_info: {
          userName : (userInfo.firstName !== "" && userInfo.lastName !== "")  ? `${userInfo.firstName} ${userInfo.lastName}` : `${userInfo.name}`,
          email:userInfo.email
        }, browser_info : getBrowserInfo, user_comment: formValues.getComment, microapp_info: window.currentAppObject,feedback_type:'General Feedback'
      }})
    })
    .then(response =>response.json())
    .then(data => {
      /* istanbul ignore if */
      if(data.timeoutmsg === "success timeout"){
        setdialogShow(true);
        seteventType("session-timeout");
      }
      else if(data.data!==null) {
        setIsSubmit(true);
        setThankuFeedbackopen(true);
        onClose();
        setFormValues(initialValues);
        setCharCount(0);
        setFormErrors({});
      } 
      else{
        /* istanbul ignore if */
        if(data.error){
          setErrorFlag(true);
          setIsSubmit(true);
          onClose();
          setThankuFeedbackopen(true);
          setFormValues(initialValues);
          setCharCount(0);
          setFormErrors({});
        }
      }
       
    }).catch((error)=> {
        setErrorFlag(true);
        setIsSubmit(true);
        onClose();
        setThankuFeedbackopen(true);
        setFormValues(initialValues);
        setCharCount(0);
        setFormErrors({});
    });     
    }else{
      setFormErrors(validate(formValues));
    }
  };

  React.useEffect(() => {
    /*istanbul ignore if*/
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      
    }
  }, [formErrors]);
  
 const validate = (values) => {
    const errors = {};
    /* istanbul ignore else */
if (!values.getComment) {
      errors.getComment = t("ErrorMasgFeedbackComment");
    } 
   return errors;
  };

  const closeThankuFeedback = () => {
    setThankuFeedbackopen(false);
    setErrorFlag(false);
  };

  const handleCancel = () => {
    onClose();
    setFormValues(initialValues);
    setIsSubmit(false);
    setFormErrors({});
    setCharCount(0);
  };

  let getCommentGenHandle = (e)=>{
    setCharCount(e.target.value.length);
    formHandleChange(e);
  }
  /* istanbul ignore next */
  const setdialogShowPopup = () => {
    setdialogShow(false);
  };

  let GeneralCommentformError =   isCharCount === 0 ? <p id="generalCommentFormError" className={classes.CommentformError}>{formErrors.getComment}</p> : null;
  /* istanbul ignore if */
  if(eventType=="session-timeout"){
    return(
        <SessionTimeout
         dialogShow={dialogShow}
         setdialogShow={setdialogShowPopup}
        />
    )
 }
  return (
  <>
   <form>
    <Dialog open={open} {...other} className={classes.GeneralFeedbackDialog}>
      <div className={classes.closeButton}>
        <IconButton aria-label="close"
         onClick={handleCancel}>
            <CloseIcon />
        </IconButton>
      </div>
      <DialogTitle className={classes.GeneralFeedbackLogTitle}>
        <h2 id="generalFeedbackTitle" className={classes.GeneralFeedbackLogTitleText}> {t("ShareYourFeedback")}</h2>
      </DialogTitle>
 
      <DialogContent className={classes.GeneralFeedbackDialogcontent}>
      <FormControl className={classes.formControl} id="GeneralFeedbackUsername">
      <TextField
          disabled
          defaultValue={userFullname} 
          size="small"
          id="emailAddressGeneralFeedback"
          name="getUserName"
          value={formValues.getUserName}
          onChange={formHandleChange}
          InputProps={{ disableUnderline: true }}
      />
     </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
            placeholder={t("LeaveUsYourComment")}
            multiline 
            variant="filled"  
            rows={4}
            id="leaveCommentGeneralFeedback"
            name="getComment"
            value={formValues.getComment}
            onChange={getCommentGenHandle}
            inputProps={{
              maxLength: 1024
            }}
        />
        <div>
           <p className={classes.feedbackCharCount}>{isCharCount}/1024</p> 
           {GeneralCommentformError}
        </div>
      </FormControl>
      </DialogContent>
      <DialogActions className={classes.FeedbackButtonAction}>
          <Button
            variant="contained"
            className={classes.FeedbackButton}
            onClick={formHandleSubmit}
            color="primary"
            type="submit"
          >
                {t("SendFeedback")}
          </Button>
      </DialogActions>
  </Dialog>
 </form>
  <ThankyouFeedback
      classes={{
        paper: classes.paper
      }}
      openThanku={thankuFeedbackopen}
      errorFlag={ErrorFlag}
      onCloseThanku={closeThankuFeedback}
  />
</>
  );
}

export default withTranslation()(withStyles(styles)(GeneralFeedback));
