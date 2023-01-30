import React, { createRef } from "react";
import ScreenCaptures from "./ScreenCaptures";
import "./SpecificSnapshot.css";
import "./FeedbackSubPopup.css";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import withStyles  from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ThankyouFeedback from "./ThankyouFeedback";
import MenuItem from '@material-ui/core/MenuItem';
import { withTranslation } from 'react-i18next';
import SessionTimeout from "./SessionTimeout";



const styles = {
    snapshotdialogtitle: {
      textAlign: "center !important",
      paddingTop:"0px"
    },
    snapshotFeedbackLogTitleText:{
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
    snapshotdialog: {
      margin: "15px"
    },
    snapshotdialogcontent: {
      width: "400px !important",
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
      color: 'var(--color-text-common-inverse-primary)',
      fontFamily:"Poppins",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",   
      letterSpacing:"0.1px",
      height:"36px",
      borderRadius: "4px",
      position: 'absolute',
      left: "62% !important",
      textTransform: "uppercase",
      '&:hover': {backgroundColor: "var(--color-fill-cta-primary-hover)",
      borderColor: "var(--color-border-cta-primary-hover)"}
    },
    media: {
      height: 140,
      backgroundColor:"var(--color-fill-common-secondary)"
    },
    closeButton: {
      textAlign: "right",
      "& .MuiIconButton-root":{
        color: 'var(--color-text-common-primary)'
      }
     },
     FeedbackButtonAction:{
       paddingBottom:"30px",
       paddingTop: "25px",
      
     },
     snapshotcontImage:{
       width:"100%",
       height:"100%",
     } ,
     formControlSelect:{
      fontFamily: "Noto Sans",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      letterSpacing: "0.1px",
      color: "#757575",
      borderRadius: "var(--effect-border-radius-medium)",
      borderStyle: "solid",
      borderWidth: "var(--effect-border-width-regular)",
      borderColor: "var(--color-border-form-default)",
      "& .MuiFilledInput-input":{
        padding:"15px !important"
      },
      "& .MuiSelect-iconFilled":{
        color:"var(--color-text-common-secondary) !important"
      }
      
    },
    formError:{
      color:"#E12D39",
      margin: "5px",
      fontFamily:"Poppins",
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
      textAlign: "left",
      marginTop: "3px",
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0
    },
    feedbackCharCount:{
      float:"right",
      margin: "5px",
      fontFamily:"Poppins",
      fontWeight: 400,
      fontSize: "0.80rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
      marginTop: "3px",
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      color: "var(--color-text-common-secondary)"
    },
    CommentformError:{
      float:"left",
      color:"#E12D39",
      margin: "5px",
      fontFamily:"Poppins",
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
      textAlign: "left",
      marginTop: "3px",
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0 
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

const SpecificSnapshot = (props) => {
  
const { 
        classes,
        t,
        getBrowserInfo,
        ...other
      } = props;
  
  const [screenCapture, setScreenCapture] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(getUserInfo());
  const [userId, setUserId] = React.useState(`${userInfo.name}`);
  const [ErrorFlag, setErrorFlag] = React.useState(false);
  const [userFullname, setUserFullname] = React.useState();
  const initialSpValues = { getSpUserFullNamel: userFullname, getSpCategory:"" ,getSpComment: "" };
  const [formSpValues, setformSpValues] = React.useState(initialSpValues);
  const [formSpErrors, setformSpErrors] = React.useState({});
  const [isSpSubmit, setisSpSubmit] = React.useState(false);
  const [isCharCount, setCharCount] = React.useState(0);
  const [dialogSpShow, setdialogSpShow] = React.useState(false);
  const [eventSpType, seteventSpType] = React.useState("");

  const ref = createRef(null);

  const [ThankuFeedbackopen, setThankuFeedbackopen] = React.useState(false);
  const closeThankuFeedback = () => {
    setThankuFeedbackopen(false);
    setErrorFlag(false);
  };

  React.useEffect(() => {
    if (userInfo.firstName === "" && userInfo.lastName === "" ) {
          setUserFullname(userId);
        } else{
          setUserFullname(`${userInfo.firstName} ${userInfo.lastName}`);
        }
  }, []);

  const handleScreenCapture = (screenCapture, event) => {
    setScreenCapture(screenCapture);
    openModal();
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    props.removeDomSnapshot();
    setOpen(false);
    setScreenCapture("");
    setformSpValues(initialSpValues);
    setisSpSubmit(false);
    setCharCount(0);
    setformSpErrors({});
  };
  const dataURLtoFile= (dataurl, filename) => {
  /* istanbul ignore next */
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
     /* istanbul ignore next */    
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
     /* istanbul ignore next */
    return new File([u8arr], filename, {type:mime});
}
  var formdata = new FormData();
  const sendSpecificFeedback = (e)=>{
    e.preventDefault();
    props.removeDomSnapshot();
    let screenshotId = 0;
    /* istanbul ignore else */
    if(formSpValues.getSpUserFullNamel !== "" && formSpValues.getSpCategory !== "" && formSpValues.getSpComment !== "" ){
       /* istanbul ignore if */
    if(screenCapture){
      var file = dataURLtoFile(screenCapture,'capture.png');
      formdata.append("files", file, "screenShot_"+Date.now()+".PNG");
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
    }
      
    
      fetch(`${window.location.pathname}Service-hub/feedback-proxy/api/upload`, requestOptions)
        .then(response => response.json())
        .then(result => {
          screenshotId = result[0] && result[0].id ? result[0].id : 0;
          /* istanbul ignore next */
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
            }, browser_info : getBrowserInfo, user_comment: formSpValues.getSpComment, microapp_info:window.currentAppObject , screenshot : screenCapture, feedback_category:formSpValues.getSpCategory,feedback_type:'Specific Feedback',feedback_screenshot:screenshotId
          }})
        })
        .then(response =>response.json())
        .then(data => {
          /* istanbul ignore if */
          if(data.timeoutmsg === "success timeout"){
            setdialogSpShow(true);
            seteventSpType("session-timeout");
          }
          else if(data.data!==null) {
            setisSpSubmit(true);
            setThankuFeedbackopen(true);
            setOpen(false);
            setformSpValues(initialSpValues);
            setScreenCapture("");
            setCharCount(0);
            setformSpErrors({});
       }
          else if(data.error){
            setErrorFlag(true);
            setisSpSubmit(true);
            setThankuFeedbackopen(true);
            setOpen(false);
            setformSpValues(initialSpValues);
            setScreenCapture("");
            setCharCount(0);
            setformSpErrors({});
          }
        }).catch((error)=> {
          setErrorFlag(true);
          setisSpSubmit(true);
          setThankuFeedbackopen(true);
          setOpen(false);
          setformSpValues(initialSpValues);
          setScreenCapture("");
          setCharCount(0);
          setformSpErrors({});
         });  
        }).catch((error) => {
          setErrorFlag(true);
          setisSpSubmit(true);
          setThankuFeedbackopen(true);
          setOpen(false);
          setformSpValues(initialSpValues);
          setScreenCapture("");
          setCharCount(0);
          setformSpErrors({});
      });
    }else{
      /* istanbul ignore next */
      setformSpErrors(validate(formSpValues));
    }
  };

  const formSpHandleChange = (e) => {
    const { name, value } = e.target;
    setformSpValues({ ...formSpValues, [name]: value });
  };

  React.useEffect(() => {
    /* istanbul ignore if */
    if (Object.keys(formSpErrors).length === 0 && isSpSubmit) {
    }
  }, [formSpErrors]);
/* istanbul ignore next */
  const validate = (values) => {
    const errors = {};
    if (!values.getSpComment) {
      errors.getSpComment = t("ErrorMasgFeedbackComment");
    }
    if (!values.getSpCategory) {
      errors.getSpCategory = t("ErrorMasgFeedbackCategor");
    }
    return errors;
  };

  let getCommentSpHandle = (e)=>{
    setCharCount(e.target.value.length);
    formSpHandleChange(e);
  }
/* istanbul ignore next */
  const setdialogShowPopup = () => {
    setdialogSpShow(false);
  };

  let SpCategoryformError= formSpValues.getSpCategory === "" ? <p id="specificCategoryFormError" className={classes.formError}>{formSpErrors.getSpCategory}</p> : null;
  let SpCommentformError = isCharCount === 0 ? <p id="specificCommentFormError" className={classes.CommentformError}>{formSpErrors.getSpComment}</p> : null; 
  /* istanbul ignore if */
  if(eventSpType=="session-timeout"){
    return(
      <SessionTimeout
        dialogShow={dialogSpShow}
        setdialogShow={setdialogShowPopup}
      />
    )
} 
  return (
    <>
    <ScreenCaptures onEndCapture={handleScreenCapture}>
      {({ asd }) => (
        <>
          <Button
            style={{ display: "none"}}
            onClick={asd}
            id="captureButton"
          >
            Capture
          </Button>

  <form>
    <Dialog open={open} {...other} className={classes.snapshotdialog}>
     <div className={classes.closeButton}>
        <IconButton aria-label="close"
         onClick={closeModal}>
            <CloseIcon />
        </IconButton>
      </div>
      <DialogTitle className={classes.snapshotdialogtitle}>
      <h2 id="specificFeedbackTitle"  className={classes.snapshotFeedbackLogTitleText}>{t("ShareYourFeedback")}</h2>
      </DialogTitle>
      <DialogContent className={classes.snapshotdialogcontent}>
      <FormControl className={classes.formControl} id="SpecificFeedbackUsername">
         <TextField
          disabled
          defaultValue={userFullname} 
          InputProps={{ disableUnderline: true }}
          size="small"
          id="emailAddressSpecificFeedback"
          name="getSpUserFullNamel"
          value={formSpValues.getSpUserFullNamel}
          onChange={formSpHandleChange}
         />
      </FormControl>
      <FormControl variant="filled" className={classes.formControl}>
        <Select
          name="getSpCategory"
          value={formSpValues.getSpCategory}
          onChange={formSpHandleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className={classes.formControlSelect}
        >
          <MenuItem value="" disabled className="SpecificSnapshotSelect">
          {t("SelectOption")}
          </MenuItem>
          <MenuItem className="SpecificSnapshotSelectLi" value={'FeatureRequest'}>{t("FeatureRequest")}</MenuItem>
          <MenuItem className="SpecificSnapshotSelectLi"value={'Bug'}>{t("Bug")}</MenuItem>
          <MenuItem className="SpecificSnapshotSelectLi"value={'Others'}>{t("Others")}</MenuItem>
        </Select>
        {SpCategoryformError}
      </FormControl>

      <FormControl className={classes.formControl}>
      <TextField
            placeholder={t("LeaveUsYourComment")}
            multiline
            rows={4}
            variant="filled"
            id="leaveCommentSpecificFeedback"
            name="getSpComment"
            value={formSpValues.getSpComment}
            onChange={getCommentSpHandle}
            inputProps={{
              maxLength: 1024
            }}
      />
       <div>
           <p className={classes.feedbackCharCount}>{isCharCount}/1024</p> 
           {SpCommentformError}
       </div>
    </FormControl>

    <Card className={classes.root} ref={ref}>
     
        <CardMedia
          className={classes.media}
        >
        {screenCapture && (
           <img src={screenCapture} alt="screen capture" className={classes.snapshotcontImage}/>
        )}
        </CardMedia>
      
    </Card>

      </DialogContent>
      <DialogActions className={classes.FeedbackButtonAction}>
          <Button
            variant="contained"
            className={classes.FeedbackButton}
            onClick={sendSpecificFeedback}
            color="primary"
            type="submit"
           >
                {t("SendFeedback")}
          </Button>
      </DialogActions>
    </Dialog>
  </form>
  </>
      )}
    </ScreenCaptures>
    <ThankyouFeedback
      classes={{
        paper: classes.paper
      }}
      openThanku={ThankuFeedbackopen}
      errorFlag={ErrorFlag}
      onCloseThanku={closeThankuFeedback}
   />
    </>
  );
};

export default withTranslation()(withStyles(styles)(SpecificSnapshot));
