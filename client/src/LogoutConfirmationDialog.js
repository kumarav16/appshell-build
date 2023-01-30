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

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles  from '@material-ui/core/styles/withStyles';
import { withTranslation } from 'react-i18next';
const styles = {
  root: {
    backgroundColor: "var(--color-fill-common-overlay)",
    opacity:"0.9 !important"
  },
  paper: {
      backgroundColor: "var(--color-fill-common-secondary)",
      overflow: "hidden",
      width:"360px",
      borderRadius: "var(--effect-border-radius-medium)",
      boxShadow: "var(--effect-drop-shadow-elevation-low)",
      padding: 'var(--spacing-padding-medium) 0',
      position: "fixed",
      top: "calc(50vh - 70px)",
      left: "calc(50vw - 180px)",
      minHeight: "100px",
      "& .MuiDialogContent-root": {
        overflowY: "auto",
        marginBottom: "var(--spacing-margin-large)",
        paddingRight: "var(--spacing-padding-medium)",
        paddingLeft: "var(--spacing-padding-medium)",
        color: "var(--color-text-common-secondary)",
        minHeight: "32px",
        maxHeight: "240px",
        display: "block",
        paddingTop: "0px",
        paddingBottom: "0px"
      },
      "& .MuiDialogActions-root": {
        padding: "0px var(--spacing-padding-medium) 0px var(--spacing-padding-medium)"
      }
    },
    submit: { backgroundColor: 'var(--color-fill-cta-primary-default)', color: 'var(--color-text-common-inverse-primary)',
    padding: "0 var(--spacing-padding-medium)",
    fontFamily:"Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "18px",    /* identical to box height, or 150% */
    letterSpacing:"0.1px",
  height:"36px",
    borderRadius: "4px",
    '&:hover': {backgroundColor:'var(--color-fill-cta-primary-hover)'}
  },
  cancel: { borderRadius: "4px", height: '36px', boxShadow:"none",backgroundColor: 'transparent', color: 'var(--color-text-common-primary)',
  padding: "0 var(--spacing-padding-medium)",
  fontFamily:"Poppins",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  lineHeight: "18px",    /* identical to box height, or 150% */
  letterSpacing:"0.1px",
  '&:hover': {backgroundColor:'var(--color-fill-cta-secondary-hover)', boxShadow:"none"}
}
};
const LogoutConfirmationDialog= (props)=>{

const {classes,children,open,setOpen,onConfirm,t}=props;
//const classes = useStyles();

return (

    <Dialog id="logoutDialog"
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="confirm-dialog"
    BackdropProps={{
        classes:{
            root: classes.root
        }
    } } 
    PaperProps ={{
        classes: {
         root: classes.paper
        }
      }}
    >
       
         <DialogContent>{children}</DialogContent>
         <DialogActions>
             <Button id="cancelButton"
             variant="contained"
             className={classes.cancel}
             onClick={()=> {setOpen(false)}}
             color="secondary"
             >
                 {t('Cancel')}
             </Button>

             <Button id="submitButton"
             variant="contained"
             className={classes.submit}
             onClick={()=> {

                setOpen(false);
                onConfirm();
            }}
             color="default"
             >
                 {t('Logout')}
             </Button>
             
        </DialogActions>
    </Dialog>
);
};

//export default ConfirmDialog;
export default withTranslation()(withStyles(styles)(LogoutConfirmationDialog));