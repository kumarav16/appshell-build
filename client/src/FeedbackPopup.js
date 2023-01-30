import React, { useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Popover, { PopoverAnimationVertical } from "material-ui/Popover";
import { withTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { blue } from '@material-ui/core/colors';
import GeneralFeedback from "./components/Feedback/GeneralFeedback";
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import generalIcon from './assets/General_icon.svg';
import drawIcon from './assets/Draw_icon.svg';
import CardMedia from '@material-ui/core/CardMedia';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
    feedbackPopup: {
      position: "relative !important",
      float: "right",
      margin: "0 3em",
      width: '385px',
      height: '355px',
      top: "74px !important",
      boxShadow: "var(--effect-drop-shadow-elevation-extra-high) !important",
      borderRadius: "4px !important",
      overflowX: "hidden !important",
      padding: '10px 20px',
      backgroundColor: 'var(--color-fill-common-secondary) !important'
    },
    closeButton: {
        textAlign: "right",
        marginRight: "-10px",
        "& .MuiIconButton-root":{
          color: 'var(--color-text-common-primary)'
        }
    },
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    CompleteSnapshotPopup: {
        width: "40% !important",
        maxHeight: 435
    },
    feednacktitle:{
      textAlign:"center",
      paddingTop: "0px",
      paddingBottom: "43px",
      color: 'var(--color-text-common-primary)'
    },
    feedbackicon:{
      width: "32px",
      height: "32px",
      marginBottom: "-11px",
      marginRight: "5px"
    },
    feedbacktext:{
      display: "inlineBlock",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "20px",
      lineHeight: "24px",
      letterSpacing: "-0.5px",
      color: "var(--color-text-common-primary)"
    }

};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "372px",
    height: "103px",
    left: "2px",
    top: "101px",
    boxSizing: "border-box"
  },
  paper: {
    width: "40% !important",
    maxHeight: 435
  },
  FeedbackDropIcon: {
    width: "32px",
    height: "32px",
  },
  FeedbackDropsubtitle: {
    marginBottom: 12,
    fontSize: 13,
    fontFamily:"Noto Sans",
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: "20px",
    color: "var(--color-text-common-primary)"
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  CompleteSnapshotPopupContainer:{

  },
  FeedbackDropmaintitle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "22px",
    letterSpacing: "-0.25px",
    color: "var(--color-text-common-primary)"
  },
  FeedbackDropContent:{
    padding: 10,
    textAlign:"left"
  },
  GenFeedbackDropContent:{
    padding: 10,
    paddingRight: 0,
    textAlign:"left"
  },
  FeedbackDropListItem:{
    paddingTop:0,
    backgroundColor: 'var(--color-fill-common-secondary) !important'
  },
  FeedbackDropDivIcon:{
    paddingBottom: 20,
  }
}));

const FeedbackPopup = (props) => {
    const {
      classes,
      isOpen,
      setFeedbackPopupOpen,
      closeFeedback,
      currentAppObject,
      browserInfo,
      t
    } = props;

  const myclasses = useStyles();
  
  const [GeneralFeedbackopen, setGeneralFeedbackopen] = React.useState(false);

  const bhScreenCapture = () => {
    document.getElementById('completesnapshotDombtn').click();
    document.getElementById('captureButton').click();
    setFeedbackPopupOpen(false);
  };

  const closeGeneralFeedback = () => {
    setGeneralFeedbackopen(false);
  };
  const handleClickGeneralFeedback = () => {
    setFeedbackPopupOpen(false);
    setGeneralFeedbackopen(true);
  };

 

    return (
     <MuiThemeProvider>
     {
      isOpen &&
     <Popover
        open={isOpen}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className={classes.feedbackPopup}
        onRequestClose={() => {
            setFeedbackPopupOpen(false);
        }}
        animation={PopoverAnimationVertical}
      >
      <div id="feedbackPopupWrapper">
      <div className={classes.closeButton}>
        <IconButton aria-label="close"
          onClick={() => {
              closeFeedback();
          }}>
            <CloseIcon />
        </IconButton>
      </div>


    <CardContent id="feedbackHeaderTitle" className={classes.feednacktitle}>
      
      <span><RateReviewOutlinedIcon className={classes.feedbackicon}/></span > 
      <span className={classes.feedbacktext}>{t("Feedback")}</span> 

    </CardContent>

    <div className={myclasses.root}>
      <List>
        <ListItem
          id="specificFeedback"
          button
          aria-haspopup="true"
          onClick={bhScreenCapture}
          className={myclasses.FeedbackDropListItem}
          style={{backgroundColor:"#ffffff"}}
        >
             <ListItemAvatar className={myclasses.FeedbackDropDivIcon}>
                <CardMedia
                    className={myclasses.FeedbackDropIcon}
                    image={drawIcon}
                />
            </ListItemAvatar>
            <ListItemText>
              < CardContent className={myclasses.FeedbackDropContent}>
                <Typography id="specificFeedbackTitle" className={myclasses.FeedbackDropmaintitle} gutterBottom>
                {t("SpecificFeedback")}
                </Typography>
                <Typography id="specificFeedbackDescription" className={myclasses.FeedbackDropsubtitle} color="textSecondary">
                {t("SpecificFeedbackSubTitle")}
                </Typography>
              </CardContent>
            </ListItemText>
        </ListItem>
      </List>
    </div>
    
    <div className={myclasses.root}>
      <List>
        <ListItem
          id="generalFeedback"
          button
          aria-haspopup="true"
          onClick={handleClickGeneralFeedback}
          className={myclasses.FeedbackDropListItem}
          style={{backgroundColor:"#ffffff"}}
        >
            <ListItemAvatar className={myclasses.FeedbackDropDivIcon}>
                
            <CardMedia
                    className={myclasses.FeedbackDropIcon}
                    image={generalIcon}
              />
               
            </ListItemAvatar>
            <ListItemText>
              < CardContent className={myclasses.GenFeedbackDropContent}>
                <Typography  id="generalFeedbackTitle" className={myclasses.FeedbackDropmaintitle} gutterBottom>
                {t("GeneralFeedback")}
                </Typography>
                <Typography  id="generalFeedbackDescription" className={myclasses.FeedbackDropsubtitle} color="textSecondary">
                {t("GeneralFeedbackSubTitle")}
                </Typography>
              </CardContent>
            </ListItemText>
        </ListItem>
      </List>
    </div>
    </div>
    </Popover>
    }
    <GeneralFeedback
          classes={{
            paper: myclasses.paper
          }}
          open={GeneralFeedbackopen}
          getBrowserInfo= {browserInfo}
          onClose={closeGeneralFeedback}
      />
    </MuiThemeProvider>
    );
  };

  export default withTranslation()(withStyles(styles)(FeedbackPopup));
