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
import Dialog from '@material-ui/core/Dialog';
import './dialog.css'
class DialogBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleClose = () => {
    this.setState({ open:false });
  };
  render(){
    return (
      <React.Fragment>
        <Dialog
          open={this.props.showDialog
          }
          id={this.props.id}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >         
        {this.props.children}
        </Dialog>
      </React.Fragment>
    );
  
  }
}

export default DialogBox;