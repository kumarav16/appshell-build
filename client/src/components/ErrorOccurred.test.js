import React from 'react';
import ErrorOccurred  from '../components/ErrorOccurred';
import { MuiThemeProvider, createMuiTheme, createStyles } from '@material-ui/core/styles';
import {shallow,mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import '../setupTests';
const theme = createMuiTheme({
    palette: {
      type: 'dark', // Switching the dark mode on is a single property value change.
    },
    typography: { useNextVariants: true }
  });
  
  const styles = theme => ({
    containers: {},
    loginTxt: { textAlign: 'center', color: '#747474' },
  
    cssOutlinedInput: {
      margin: '0px !important',
      '&$cssFocused $notchedOutline': {
        borderColor: '#02BC93 !important'
      }
    },
  
    cssFocused: {},
  
    notchedOutline: { borderWidth: '1px', borderColor: '#949494 !important' },
    eye: { cursor: 'pointer', color: '#757575', width: '22px', height: '15px', fontSize: '22px' },
    root: {
      display: 'flex',
      overflowY: 'auto',
      minHeight: '99vh',
      paddingBottom: '80px',
      backgroundColor: 'rgba(255,255,255,0)',
      color: 'white',
      '& label[data-shrink^="true"]': {
        color: "#506C65",
        fontFamily: "'Noto Sans', sans-serif",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "16px",
        letterSpacing: "0.25px"
      }
    },
  
    paper: {
      display: 'flex',
       height: '100%',
        
      marginTop:'120px'
    },
  
    formContainer: { paddingLeft: '0px', width: '100%' },
    formControl: { width: '400px', marginTop: 0,    alignItems: 'center', color: '#fff', '& div': { margin: '0px' } },
    form: { width: '400px', marginTop: 0, color: '#fff' },
    bhlogo: {
      width: '170px',
      marginLeft: '7px',
      marginTop: '0px'
    },
    titletext: {
      color: "#1A2321",
    /* width: 164px; */
    height: "22px",
    margin: "8px 0px",
    fontSize: "16px",
    fontStyle: "normal",
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: "22px",
    letterSpacing: "0.08px",
    paddingBottom: "0px",
    marginTop: "20px !important",
    marginBottom: "8px !important"
    },
    subtitle:
    {
      color: "#757575",
    width: "325px",
    height: "40px",
    margin: "0px",
    fontSize: "14px",
    fontStyle: "normal",
    textAlign: "center",
    fontFamily: "'Noto Sans', sans-serif",
    fontWeight: "400",
    lineHeight: "20px",
    letterSpacing: "0.1px",
    paddingBottom: "0px"
    },
    hyperlink:
    {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '18px',
      color: '#02A783',
      paddingBottom: '0px',
      letterSpacing: '0.1px',
      textTransform: 'uppercase'
    },
    logocontainer: { padding: '0px' },
    ufoico:{
      width: '118px',
      height: '94px',
      margin: '0 auto'
    },
    footer: {
      position: 'fixed',
      left: '0',
      bottom: '0',
      height: '39px',
      width: '100%',
      background: '#1A2321',
      fontSize: '12px',
      color: '#EBEFEE',
      paddingTop: '10px',
      paddingLeft: '32px',
      top: 'auto',
      bottom: '0'
    }
  });
  const THEME = createMuiTheme({    
    overrides: {
      MuiMenuItem: createStyles({
        root: {
          '&&:hover': {backgroundColor: 'pink', color: 'white'}
        },
        "&$selected": {
          "&&": {
            "backgroundColor": "blue",
            "color": "white"
          },
          "&&:hover": {
            "backgroundColor": "darkblue",
            "color": "white"
          }
        }

      }),
  
      // How do I enforce this ONLY inside of MuiMenuItem and only for
      // the selected variant of that?
      MuiTypography: {
        subheading: {color: 'white'}
      },
      typography: {useNextVariants: true, fontFamily: "Poppins", fontSize: 14, fontWeightLight: 300, fontWeightRegular: 400, fontWeightMedium: 500}
    }    
  });

  const MockTheme=({children})=>{
    return(
      <MuiThemeProvider  theme={THEME}>
      <MemoryRouter>
      {children}
      </MemoryRouter>
     
       </MuiThemeProvider>
    )
    
};

describe('No Roles Page component  rendering',()=>{ 
    it('verify Error message show state',()=>{ 
        const wrapper= mount(<MockTheme><ErrorOccurred type={"load-failed"}/></MockTheme>);
        const component = wrapper.find("ErrorOccurred").at(0);
       
        expect(component.find('div#noRoletitle').text()).toEqual('Error');
        expect(component.find('div#noRolesubtitle').text()).toEqual('FailedApplication\u00a0');
    });
    it('verify Error message show state',()=>{ 
      const wrapper= mount(<MockTheme><ErrorOccurred type={"permission"}/></MockTheme>);
      const component = wrapper.find("ErrorOccurred").at(0);
     
      expect(component.find('div#noRoletitle').text()).toEqual('PermissionRequired');
      expect(component.find('div#noRolesubtitle').text()).toEqual('RequestGetAccess\u00a0');
  });
});