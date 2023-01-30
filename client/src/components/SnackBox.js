import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import './snackbox.css';

class SnackBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open:true
        }
    }
  render(){
  return (
        <React.Fragment>
          <Snackbar 
          open={this.props.open} 
          setOpen={this.props.show}
          autoHideDuration={this.props.autoHideDuration} 
          onClose={this.props.onClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }} 
          >
           {this.props.children}
          </Snackbar>
        </React.Fragment>
    );
  }
}
export default (SnackBox);