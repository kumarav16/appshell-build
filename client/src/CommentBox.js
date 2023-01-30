import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Popover, { PopoverAnimationVertical } from "material-ui/Popover";// TODO: need to move to new way, "@material-ui/core/Popover";
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';

const styles = {
    commentPopup: {
      position: "absolute !important",
      width: "40%",
      marginLeft: "54% !important",
      top: "74px !important",
      background: "#FFFFFF",
      boxShadow:
        "0px 19px 38px rgba(0, 0, 0, 0.1), 0px 15px 12px rgba(0, 0, 0, 0.1) !important",
      borderRadius: "4px !important",
      overflowX: "hidden !important",
      padding: '10px 20px'
    },
    submitButton: {
      backgroundColor: '#02BC93', color: '#fff',
      fontFamily:"Poppins",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "12px",
      lineHeight: "18px",   
      letterSpacing:"0.1px",
      height:"36px",
      borderRadius: "4px",
      '&:hover': {backgroundColor:'#02BC93'}
    },
    commentArea: {
      width: "100%"
    }
};
/* istanbul ignore next */
const CommentBox = (props) => {
    const {
      classes,
      isOpen,
      setCommentBoxOpen,
      submitComment,
      t
    } = props;

    let comment = React.createRef();

    return (
     
      <Popover
        id="commentPopup"
        open={isOpen}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className={classes.commentPopup}
        onRequestClose={() => {
          setCommentBoxOpen(false);
        }}
        animation={PopoverAnimationVertical}
      >
          <div>
          <label>{t("YourFeedback")}</label>
          <p>
            <textarea className={classes.commentArea} rows="10" cols="60" ref={comment}></textarea>
          </p>
          <div>
            <Button
              variant="contained"
              className={classes.submitButton}
              onClick={() => {
                submitComment(comment.current.value,t);
              }}
              color="default"
              >
                  {t("Submit")}
            </Button>
          </div>
          </div>
        
      </Popover>
    );
  };
  
  export default withTranslation()(withStyles(styles)(CommentBox));