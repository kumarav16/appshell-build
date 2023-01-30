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
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
//import { withStyles } from '@material-ui/core/styles';
import withStyles  from '@material-ui/core/styles/withStyles'
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import WifiSharpIcon from '@material-ui/icons/WifiSharp';
import BuildIcon from '@material-ui/icons/Build';
import WarningCircle from '../assets/warning-ring.svg';
import ErrorCircle from '../assets/error-ring.svg';
import InfoCircle from '../assets/info-ring.svg';
import SuccessCircle from '../assets/success-ring.svg';

const variantIcon = {
  success: CheckSharpIcon,
  warning: WarningIcon,
  error: BuildIcon,
  info: WifiSharpIcon,
};
const variants={
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
};
const variantColor={
  success: "icongreen",
  warning: "iconyellow",
  error: "iconred",
  info: "iconviolet",
};
const Boundary={
  success: SuccessCircle,
  warning: WarningCircle,
  error: ErrorCircle,
  info: InfoCircle,
};
const styles = theme => ({
  success: {
    // color : "#147D64",
    color: 'var(--color-text-common-primary)',
    backgroundColor: 'var(--color-fill-common-secondary) !important'
  },
  title:{
    position: "absolute",
    left: "68px",
    top: "13px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "20px",
  },
  desc:{
    position: "relative",
    width: "384px",
    // height: "21px",
    left: "16px",
    top: "-4px",
    fontFamily: "Noto Sans",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "21px",
    letterSpacing: "0.1px",
    color: 'var(--color-text-common-primary)'
  },
  error: {
    // color:"#AB091E",
    color: 'var(--color-text-common-primary)',
    backgroundColor: 'var(--color-fill-common-secondary) !important'
  },
  info: {
    // color:"#044E54",
    color: 'var(--color-text-common-primary)',
    backgroundColor: 'var(--color-fill-common-secondary) !important'
  },
  warning: {
    // color:"#CB6E17",
    color: 'var(--color-text-common-primary)',
    backgroundColor: 'var(--color-fill-common-secondary) !important'
  },
  icon: {
    fontSize: 20,
    borderRadius:"50%",
    padding: "8px",
    color:"#fff",
    height: "36px",
    width: "36px"
  },
  cross:{
    position: "absolute",
    width: "24px",
    height: "24px",
    right: "8px",
    top: "8px",
    fontFamily: "Material Icons",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "24px",
    lineHeight: "24px",
    textTransform: "lowercase",
    color: "var(--color-text-common-primary) !important"
  },
  iconVariant: {
    opacity: 0.9,
    marginTop: "4px"
  },
  message: {
    display: 'flex',
    alignItems: 'baseline',
  },
  circular:{
    position: "absolute",
    left: "12px"
  }
});

const MessageContent = (props) => {
  const { classes, className, message,title, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];
  const titleColor = variants[variant];
  const iconColor = variantColor[variant];
  const outerColor = Boundary[variant];                
  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <img alt="outer-circle" src={outerColor} className={classes.circular}/>
          <Icon className={classNames(classes.icon, classes.iconVariant,iconColor)} />
          <span className={classNames(classes.title,titleColor)}>{title}</span>
          <span className={classes.desc}>{message}</span>
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.cross}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MessageContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  title:PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};



export default withStyles(styles)(MessageContent);