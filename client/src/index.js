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

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
//import { MuiThemeProvider, createMuiTheme, createStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import {prefix} from './namespaced-components';
import {applyPolyfills, defineCustomElements} from '@baker-hughes-central-design/ui-toolkit/loader';

const THEME = createMuiTheme({    
  overrides: {
    MuiMenuItem: createStyles({
      root: {
        '&&:hover': {backgroundColor: 'pink', color: 'white'}
      },
      selected: {
        '&&': {backgroundColor: 'blue', color: 'white'},
        '&&:hover': {backgroundColor: 'darkblue', color: 'white'}
      }
    }),
	MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `1px solid #EEEEEE`
        },
        "&:after": {
          borderBottom: `2px solid #02A783 `
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `1px solid #EEEEEE `
        }
      }
    },

    // How do I enforce this ONLY inside of MuiMenuItem and only for
    // the selected variant of that?
    MuiTypography: {
      subheading: {color: 'white'}
    },
    typography: {useNextVariants: true, fontFamily: "Poppins", fontSize: 14, fontWeightLight: 300, fontWeightRegular: 400, fontWeightMedium: 500}
  }    
});
applyPolyfills().then(() => {
  defineCustomElements(window, { transformTagName: tagName => `${prefix}${tagName.replace('bh-', '')}` });
});
unregister();
ReactDOM.render(<MuiThemeProvider theme={THEME}><App /></MuiThemeProvider>, document.getElementById('root'));