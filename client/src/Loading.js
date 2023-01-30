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
import Grid from '@material-ui/core/Grid';
import withStyles  from '@material-ui/core/styles/withStyles';
import { BhSpinner } from './transformTagNameReactComponent';

const styles = theme => ({
  root: {display: 'flex', overflowY:'hidden', height:'99vh'},
  content: {flex: 1, height: '100vh', minHeight: 'calc(100vh - 8rem)'},
  progress: {margin: theme.spacing(1)}
});
  
const Loading = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root} data-testid="loader">
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <BhSpinner className={classes.progress} size={"xlarge"} position={"inline"} title="loader"/>
    </Grid> 
  </div>
  );
}

export default  withStyles(styles)(Loading);