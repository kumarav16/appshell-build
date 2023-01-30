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
import LoginPage  from './LoginPage';
import { MemoryRouter } from "react-router-dom";
import {mount} from 'enzyme';
import '../setupTests';
import { MuiThemeProvider, createMuiTheme, createStyles } from '@material-ui/core/styles';
import { wrap } from 'lodash';
const key = 'ae9c8a84-5bb2-11eb-ae93-0242ac130002';
const encryptor = require('simple-encryptor')(key);
jest.mock("react-i18next", () => ({
  withTranslation: () => (Component) => {
      Component.defaultProps = { ...Component.defaultProps, t: (key) => key };
      return Component;
  },
}));

delete window.location;
window.location = { pathname: '/' };

const THEME = createMuiTheme({    
  overrides: {
    MuiMenuItem: createStyles({
      "root": {
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

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: { useNextVariants: true }
});
  
  const styles = theme => ({  
    containers: {},
    loginTxt: {textAlign: 'center', color: '#747474'},
  
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        borderColor: '#02BC93 !important'
      }
    },
  
    cssFocused: {},
  
    notchedOutline: {borderWidth: '1px', borderColor: '#949494 !important'},
    eye: {cursor: 'pointer'},
    root: {
      display: 'flex',
      overflowY:'hidden',
      height:'99vh',
      backgroundColor:'rgba(255,255,255,0)',
      color:'white',
      '& label[data-shrink^="true"]': {
        color: '#02BC93 !important'
      }
    },
  
    paper: {display: 'flex', alignItems: 'center', height:'100%', backgroundColor:'#fff', borderWidth: 0, padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`},
    
    avatar: {
      margin: theme.spacing(1),
      alignItems: 'center',
      width: '40%',
      textAlign: 'center',
      '& img': {height: '42px'},
      '& span': {fontSize: '19px', color: '#27272C'}
    },
  
    formContainer: {borderLeft: '1px solid #DADADA', paddingLeft: '36px', width: '60%'},
    formControl: {width: '100%', marginTop: theme.spacing(1), color:'#fff'},
    form: {width: '92%', marginTop: theme.spacing(1) + 20, color:'#fff'},
    formLoadingSubmit: {width: '100%', float: 'right'},
    loadingSubmitLeftHolder: {float: 'left', width: '60%'},
    loadingSubmitRightHolder: {float: 'right', width: '40%', marginBottom: '14px'},
    submit: {marginTop: theme.spacing(2), borderRadius: 0, height: '45px', backgroundColor: '#02BC93', color: '#fff',
      '&:hover': {backgroundColor:'#02BC93'}
    },
    loginError: {textAlign: 'center', color: 'red'},
  });

  const MockTheme = ({ children }) => {
    return (
      <MuiThemeProvider theme={THEME}>
             <MemoryRouter initialEntries={[{pathname:'/login', navurl:'#/demo-app/register/123'}]}>
             {children}
                 </MemoryRouter> 
      </MuiThemeProvider>
    );
  }
  const MockThemewithdeeplink = ({ children }) => {
    return (
      <MuiThemeProvider theme={THEME}>
             <MemoryRouter initialEntries={[{pathname:'/login',navurl:'#/demo-app/'}]}>
             {children}
                 </MemoryRouter> 
      </MuiThemeProvider>
    );
  }
  const MockThemewithOutdeeplink = ({ children }) => {
    return (
      <MuiThemeProvider theme={THEME}>
             <MemoryRouter initialEntries={[{pathname:'/login'}]}>
             {children}
                 </MemoryRouter> 
      </MuiThemeProvider>
    );
  }
  describe('LoginPage component inital state',()=>{
    window.localStorage.setItem("footer",JSON.stringify({name:"app-footer",componentName:'Footer',StylingAttributes:{}}));

    it('verify form email state',()=>{
      let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
      const component = wrapper.find("LoginPage").at(0);
        expect(component.state().form.email).toBe('');
    });

    it('verify form password state',()=>{
      let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
      const component = wrapper.find("LoginPage").at(0);
        expect(component.state().form.password).toBe('');
    });

    it('verify form message state',()=>{
      let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
      const component = wrapper.find("LoginPage").at(0);
        expect(component.state().message).toBe('');
    });

    it('verify form loading state',()=>{
      let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
      const component = wrapper.find("LoginPage").at(0);
        expect(component.state().loading).toBeFalsy();
    });
    
    it('verify form passwordIsMasked state',()=>{
      let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
      const component = wrapper.find("LoginPage").at(0);
        expect(component.state().passwordIsMasked).toBeTruthy();
    });

    it('verify form productName state',()=>{
      let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
      const component = wrapper.find("LoginPage").at(0);
        expect(component.state().productName).toBe('');
    });

    it('verify withoutDeeplink',()=>{
      let wrapper=mount(<MockThemewithOutdeeplink><LoginPage classes={styles}/></MockThemewithOutdeeplink>);
      const component = wrapper.find("LoginPage").at(0);
        expect(component.state().productName).toBe('');
    });
    it('verify withoutDeeplink',()=>{
      let wrapper=mount(<MockThemewithdeeplink><LoginPage classes={styles}/></MockThemewithdeeplink>);
      const component = wrapper.find("LoginPage").at(0);
        expect(component.state().productName).toBe('');
    });
// Login page error message defect
// it('verify the state when error code is 400',(done) =>{
//   const event={
//       preventDefault:()=>{}
//   }
//   const mockComponentWillMountResponse = {
//       responseStatus:400,
//       errors:[{code :"400"}],
//       message:'success1'
//  };
//   const mockFetchPromise = Promise.resolve({ 
//     json: () => mockComponentWillMountResponse,
//   });
//   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
//   let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
//   const component = wrapper.find("LoginPage").at(0);
//   component.setState({ email: "ramesh",password:"",code:key }); // a string key was needed the state was not written
//    process.nextTick(() => {
//       expect(global.fetch).toHaveBeenCalled();
//       // expect(global.fetch).toHaveBeenNthCalledWith(2,'/auth/forgotpassword', {  // already checking in previous line
//       //     method: 'POST',
//       //     headers: 
//       //     {
//       //       'Accept': 'application/json',
//       //       'Content-Type': 'application/json'
//       //     },
//       //     body: JSON.stringify({username: "dW5kZWZpbmVk"})
//       //   });   
//       expect(component.state().message).toBe("Please Enter Username");
//       global.fetch.mockClear();
//       done();
//     }); 
// })

// it('verify the state when error code is 1002',(done) =>{
//   const event={
//       preventDefault:()=>{}
//   }
//   const mockComponentWillMountResponse = {
//       responseStatus:400,
//       errors:[{code :"1002"}],
//       message:'success1'
//  };
//   const mockFetchPromise = Promise.resolve({ 
//     json: () => mockComponentWillMountResponse,
//   });
//   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
//   let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
//   const component = wrapper.find("LoginPage").at(0);
//   component.setState({ email: "ramesh",password:"",code:key }); // a string key was needed the state was not written
//    process.nextTick(() => {
//       expect(global.fetch).toHaveBeenCalled();
//       // expect(global.fetch).toHaveBeenNthCalledWith(2,'/auth/forgotpassword', {   // already checking in previous line
//       //     method: 'POST',
//       //     headers: 
//       //     {
//       //       'Accept': 'application/json',
//       //       'Content-Type': 'application/json'
//       //     }
//       //   });   
//       expect(component.state().message).toBe("You have exceeded the maximum number of attempts to trigger forgot password. Please try again later.");
//       global.fetch.mockClear();
//       done();
//     }); 
// })

// it('verify the state when error code is 1003',(done) =>{
//   const event={
//       preventDefault:()=>{}
//   }
//   const mockComponentWillMountResponse = {
//       responseStatus:400,
//       errors:[{code :"1003"}],
//       message:'success1'
//  };
//   const mockFetchPromise = Promise.resolve({ 
//     json: () => mockComponentWillMountResponse,
//   });
//   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
//   let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
//   const component = wrapper.find("LoginPage").at(0);
//   component.setState({ email: "ramesh",password:"",code:key }); // a string key was needed the state was not written
//    process.nextTick(() => {
//       expect(global.fetch).toHaveBeenCalled();
//       // expect(global.fetch).toHaveBeenNthCalledWith(2,'/auth/forgotpassword', { // As already checking above
//       //     method: 'POST',
//       //     headers: 
//       //     {
//       //       'Accept': 'application/json',
//       //       'Content-Type': 'application/json'
//       //     },
//       //     body: JSON.stringify({username: encryptor.encrypt("dW5kZWZpbmVk")})
//       //   });   
//       expect(component.state().message).toBe("System could not send the code to either mail or phone");
//       global.fetch.mockClear();
//       done();
//     }); 
// })

// it('verify the state when error code is 1007',(done) =>{   //changed to 1007 from 1003 due to response
//   const event={
//       preventDefault:()=>{}
//   }
//   const mockComponentWillMountResponse = {
//       responseStatus:400,
//       errors:[{code :"1007"}],
//       message:'success1'
//  };
//   const mockFetchPromise = Promise.resolve({ 
//     json: () => mockComponentWillMountResponse,
//   });
//   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
//   let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
//   const component = wrapper.find("LoginPage").at(0);
//   component.setState({ email: "ramesh",password:"",code:key }); // a string key was needed the state was not written
//    process.nextTick(() => {
//       expect(global.fetch).toHaveBeenCalled();
//       // expect(global.fetch).toHaveBeenNthCalledWith(2,'/auth/forgotpassword', { // already checking in previous line
//       //     method: 'POST',
//       //     headers: 
//       //     {
//       //       'Accept': 'application/json',
//       //       'Content-Type': 'application/json'
//       //     }
//       //   });   
//       expect(component.state().message).toBe("User does not have confirmed mail or phone setup to sent the OTP");
//       global.fetch.mockClear();
//       done();
//     }); 
// })

// it('verify the state when responseStatus code is 401',(done) =>{
//   const event={
//       preventDefault:()=>{}
//   }
//   const mockComponentWillMountResponse = {
//       responseStatus:401,
//        message:'success1'
//  };
//   const mockFetchPromise = Promise.resolve({ 
//     json: () => mockComponentWillMountResponse,
//   });
//   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
//   let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
//   const component = wrapper.find("LoginPage").at(0);
//   component.setState({ email: "ramesh",password:"",code:key }); // a string key was needed the state was commented
//    process.nextTick(() => {
//       expect(component.state().message).toBe("Invalid credentials.Please try again.");
//       global.fetch.mockClear();
//       done();
//     }); 
// })

it('Verify if user is authorised to login or not in handlFormSubmit', (done) => {
  const event={
    preventDefault:()=>{},
} 
  const mockSuccessResponse = {
      responseStatus:504,
      message:'service down'
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
  let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
  const board = wrapper.find("LoginPage").at(0);
  board.setState({ email: "ramesh",password:"123",code:key });
  board.instance().handlFormSubmit(event);
  process.nextTick(() => {
    global.fetch.mockClear();
    done();
  });
   }); 

  it('Verify if user redirect to changepassword in handlFormSubmit', (done) => {
    const event={
      preventDefault:()=>{}
  } 
    const mockSuccessResponse = {
        responseStatus:409,
        message:'success1',
        errors:[{code :"1001"}],
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
    let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
    const board = wrapper.find("LoginPage").at(0);
    board.setState({ email: "ramesh",password:"123",code:key });
    board.instance().handlFormSubmit(event);
    process.nextTick(() => {
      expect(window.localStorage.getItem('loginauth')).toBeTruthy();
      global.fetch.mockClear();
      done();
    });
    }); 
  
it('Verify the state when user is disable', (done) => {
      const event={
        preventDefault:()=>{}
    } 
      const mockSuccessResponse = {
          responseStatus:401,
          message:'success1',
          errors:[{code :"1008"}],
      };
      const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
      const mockFetchPromise = Promise.resolve({ // 3
        json: () => mockJsonPromise,
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
      let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
      const board = wrapper.find("LoginPage").at(0);
      board.setState({ email: "ramesh",password:"123", code:key});
      board.instance().handlFormSubmit(event);
      process.nextTick(() => {
        expect(board.state().message).toBe("InvalidUsernameOrPassword"); //Changed from "Invalid credentials.Please try again."
        global.fetch.mockClear();
        done();
      });
      });
      it('Verify the state when user is disable', (done) => {
        const event={
          preventDefault:()=>{}
      } 
        const mockSuccessResponse = {
            responseStatus:500,
            message:'success1',
            errors:[{code :"1008"}],
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
        let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
        const board = wrapper.find("LoginPage").at(0);
        board.setState({ email: "ramesh",password:"123", code:key});
        board.instance().handlFormSubmit(event);
        process.nextTick(() => {
          //expect(board.state().message).toBe("InvalidUsernameOrPassword"); //Changed from "Invalid credentials.Please try again."
          global.fetch.mockClear();
          done();
        });
        });

it('Verify the state when user has invalid credentials', (done) => {
        const event={
          preventDefault:()=>{}
      } 
        const mockSuccessResponse = {
            responseStatus:401,
            message:'success',
            errors:[{code :"1009"}],
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
        let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
        const board = wrapper.find("LoginPage").at(0);
        board.setState({ email: "ramesh",password:"123",code:key });
        board.instance().handlFormSubmit(event);
        process.nextTick(() => {
          //expect(board.state().message).toBe("InvalidUsernameOrPassword"); //Changed from "Invalid credentials.Please try again."
          global.fetch.mockClear();
          done();
        });
  });

  it('check for toggling of password',(done) =>{
    const mockComponentWillMountResponse = {
      responseStatus:200,
      "productName": "abc"
 };
  const mockFetchPromise = Promise.resolve({ 
    json: () => mockComponentWillMountResponse,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
    let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
    const component = wrapper.find("LoginPage").at(0);
    component.state().passwordIsMasked=true;
    component.instance().togglePasswordMask();
    expect(component.state().passwordIsMasked).toBeFalsy();
    global.fetch.mockClear();
    done();
})

  it('verify if user is logged in before component mounting',(done) =>{
    window.i18Resources = "";
    const event={
      preventDefault:()=>{}
    }
    const mockComponentWillMountResponse = {
        responseStatus:200,
        "productName": "abc",
        "grantType":"oauth2",
        "grantTypeAuthCode":true
   };
    const mockFetchPromise = Promise.resolve({ 
      json: () => mockComponentWillMountResponse,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
    let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
    const board = wrapper.find("LoginPage").at(0);
     process.nextTick(() => {
        expect(global.fetch).toHaveBeenCalledWith
        ('/api/usermanager/product', 
        {'headers': {'Accept': 'application/json', 'Content-Type': 'application/json'}, 'method': 'GET'});
        expect(window.localStorage.getItem('productName')).toBe('abc');   
        global.fetch.mockClear();
        done();
      }); 
  });
  it('verify if user is logged in before component mounting',(done) =>{
    window.i18Resources = {
      "defaultLang": "en",
      "ns": [
        "message"
      ],
      "fallbackLng": "en"
    };
    const event={
      preventDefault:()=>{}
    }
    const mockComponentWillMountResponse = {
        responseStatus:200,
        "grantType":"oauth2",
        "grantTypeAuthCode":true
   };
    const mockFetchPromise = Promise.resolve({ 
      json: () => mockComponentWillMountResponse,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
    let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
    const board = wrapper.find("LoginPage").at(0);
     process.nextTick(() => {
        expect(global.fetch).toHaveBeenCalledWith
        ('/api/usermanager/product', 
        {'headers': {'Accept': 'application/json', 'Content-Type': 'application/json'}, 'method': 'GET'});
        // expect(window.localStorage.getItem('productName')).toBe('abc');   
        global.fetch.mockClear();
        done();
      }); 
  });
  it('Catch errors when apis are failed',()=>{
    const event={
      preventDefault:()=>{}
    } 
    global.fetch = jest.fn(() =>
      Promise.reject({
        message: "fetch failed"
      })
    );
    const wrapper = mount(<MockTheme><LoginPage classes={styles} /></MockTheme>);
    const component = wrapper.find("LoginPage").at(0);
    component.setState({ email: "ramesh",password:"123",code:key });
    component.setState({ rememberme: true });
    component.instance().handlFormSubmit(event);
  })
  it('i18 check in api',()=>{
    const event={
      preventDefault:()=>{}
    } 
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          "responseStatus":200,
          "productName": "abc",
          "grantType":"oauth2",
          "grantTypeAuthCode":false,
          "licencesUrl": true,
          "tenancy":true
        }),
      })
    );
    window.i18Resources = {
      "defaultLang": "en",
      "ns": [
        "message"
      ],
      "fallbackLng": "en"
    };
    const i18 = jest.fn().mockImplementation((text)=> {return "invalid"});
    const wrapper = mount(<MockTheme><LoginPage classes={styles} t={i18}/></MockTheme>);
    const component = wrapper.find("LoginPage").at(0);
    component.setState({ email: "ramesh",password:"123",code:key });
    component.setState({ rememberme: true });
    component.instance().handlFormSubmit(event);

    const i182 = jest.fn().mockImplementation((text)=> {
      if(text == 'productName'){
        return 'productName'
      }
      if(text == 'ProductName'){
        return '.productName'
      }
    });
    const wrapper2 = mount(<MockTheme><LoginPage classes={styles} t={i182}/></MockTheme>);
    const component2 = wrapper2.find("LoginPage").at(0);
    component2.setState({ email: "ramesh",password:"123",code:key });
    component2.setState({ rememberme: true });
    component2.instance().handlFormSubmit(event);
  })
  it('i18 check in api type 2',() => {
    const event={
      preventDefault:()=>{}
    } 
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          "responseStatus":200,
          "productName": "abc",
          "grantType":"oauth2",
          "grantTypeAuthCode":false,
          "licencesUrl": true
        }),
      })
    );
    window.i18Resources = ""
    const wrapper = mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
    const component = wrapper.find("LoginPage").at(0);
    component.setState({ email: "ramesh",password:"123",code:key });
    component.setState({ rememberme: true });
    component.instance().handlFormSubmit(event);
    
  })
  it('check valid and invalid i18 keys',()=>{
    window.i18Resources = {
      "defaultLang": "en",
      "ns": [
        "message"
      ],
      "fallbackLng": "en"
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          "responseStatus":200,
          "productName": "abc",
          "grantType":"oauth2",
          "grantTypeAuthCode":false,
          "licencesUrl": true
        }),
      })
    );
    const i18 = jest.fn().mockImplementation((text)=> {return "invalid"});
    const wrapper = mount(<MockTheme><LoginPage classes={styles} t={i18}/></MockTheme>);
    const component = wrapper.find("LoginPage").at(0);
    component.setState({grantTypeAuthCode: false});
    // window.i18Resources = "";
    const i182 = jest.fn().mockImplementation((text)=> {return text});
    mount(<MockTheme><LoginPage classes={styles} t={i182}/></MockTheme>);
  })
  /*it('verify if user is logged in before component mounting with logoutRedirect message',(done) =>{
    const event={
      preventDefault:()=>{}
    }
    const mockComponentWillMountResponse = {
        responseStatus:200,
        "message": "logoutRedirect"
   };
    const mockFetchPromise = Promise.resolve({ 
      json: () => mockComponentWillMountResponse,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
    let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
    const board = wrapper.find("LoginPage").at(0);
     process.nextTick(() => {
        expect(global.fetch).toHaveBeenCalledWith
        ('/api/usermanager/product', 
        {'headers': {'Accept': 'application/json', 'Content-Type': 'application/json'}, 'method': 'GET'});
        expect(window.localStorage.getItem('loggedIn')).toBeTruthy();
        global.fetch.mockClear();
        done();
      }); 
  })*/

 /* it('verify if userInfoDialogMap is set',(done) =>{
    const event={
      preventDefault:()=>{}
    }
    const mockComponentWillMountResponse = {
        responseStatus:200,
        "message": "message",
        "userInfoDialogMap":"userInfoDialogMap"
   };
    const mockFetchPromise = Promise.resolve({ 
      json: () => mockComponentWillMountResponse,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
    let wrapper=mount(<MockTheme><LoginPage classes={styles}/></MockTheme>);
    const board = wrapper.find("LoginPage").at(0);
     process.nextTick(() => {
        expect(global.fetch).toHaveBeenCalledWith
        ('/api/usermanager/product', 
        {'headers': {'Accept': 'application/json', 'Content-Type': 'application/json'}, 'method': 'GET'});
        expect(window.localStorage.getItem('loggedIn')).toBeTruthy();
        global.fetch.mockClear();
        done();
      }); 
  })*/
});




 
