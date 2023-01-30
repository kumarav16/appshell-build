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
//import withStyles  from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';


const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  closeButton: {
    marginRight: 20,
  },
  shell:{
    width: '100%',
    height: '100%'
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenNavigationDialog extends React.Component {
  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.modalClose();
  };

  render() {
    const { classes  } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close" className={classes.closeButton}>
              <CloseIcon />
            </IconButton>
          </Grid>   
             
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}

FullScreenNavigationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(FullScreenNavigationDialog);
export default FullScreenNavigationDialog;