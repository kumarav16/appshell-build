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

import './setupTests';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory,createHashHistory } from 'history';
import { Switch ,Route   } from "react-router";
import { MemoryRouter } from "react-router-dom";
import { render,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {shallow,mount} from 'enzyme';
import App from './App';
import LoginPage from './login/LoginPage';
//import Home from './Home';
import RedirectTo from './RedirectTo';
import Loading from './Loading';
import AppFrame  from './frame/AppFrame';
import { wrap } from 'lodash';
const navigation=[
    {
        "id":"dashboard",
        "name": "Asset Dashboard",
        "link": "/asset-dashboard/",
        "icon": "speedrounded",
        "host": "https://ofe-dev-nginx-lb01-1933176829.us-west-2.elb.amazonaws.com",
        "path":"/asset-dashboard",
        "template":"/index.html",
        "navService":"/nav",
        "default": true
      },
      
      {
        "id":"appbuilder",
        "name": "App Builder",
        "link": "/app-builder/",
        "icon": "warningrounded",
        "host": "https://cde-sc-nginx-dev01-elb01-238862697.us-west-2.elb.amazonaws.com/appbuilder",
        "path":"/app-builder",
        "template":"/index.html",
        "navService":"/nav",
        "default": false
      }

];
jest.mock("react-i18next", () => ({
  withTranslation: () => (Component) => {
      Component.defaultProps = {...Component.defaultProps, t: (key) => key};
      return Component;
    },
}));
describe('<App/>',()=>{
    it('renders properly',()=>{
        window.localStorage.setItem('designTemplate','default');
        const wrapper=shallow(<App />);
        expect(wrapper).toMatchSnapshot();

    });
    it('without design Template render',()=>{
      window.localStorage.removeItem('designTemplate');
      const mockComponentWillMountResponse = {
                responseStatus:200,
                message:'success',
                design_template:"default"
           };
            const mockFetchPromise = Promise.resolve({ 
              json: () => mockComponentWillMountResponse,
            });
            jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
      const wrapper=shallow(<App />);
      expect(wrapper).toMatchSnapshot();
    });
	//  it('verify template API called',(done) =>{
  //     const event={
  //         preventDefault:()=>{}
  //     }
  //     const mockComponentWillMountResponse = {
  //         responseStatus:200,
  //         message:'success',
  //         design_template:"default"
  //    };
  //     const mockFetchPromise = Promise.resolve({ 
  //       json: () => mockComponentWillMountResponse,
  //     });
  //     jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
  //     let wrapper=shallow(<App/>);
  //      process.nextTick(() => {
  //         expect(global.fetch).toHaveBeenCalled();
  //         expect(global.fetch).toHaveBeenCalledWith('/api/template', {
  //             method: 'GET',
  //             headers: 
  //             {
  //               'Accept': 'application/json',
  //               'Content-Type': 'application/json'
  //             }
  //           });   
  //           expect(window.localStorage.getItem('designTemplate')).toBe("default");
  //         global.fetch.mockClear();
  //         done();
  //       }); 
  //   })

    it('routes /login to LoginPage', () => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve({"data": "data"}),
            status:200,
            ok: true
          })
        );
        const wrapper = shallow(<App />);
        expect(wrapper.find('Route').first().props().path).toBe('/pathparam/:tenant');
      });

    it('routes /redirecting to RedirectTo', () => {
      let wrapper = shallow(
        <MemoryRouter initialEntries={['/redirecting']}>
          <Switch>
            
            <Route path='/redirecting' component={RedirectTo} />
          
          </Switch>
        </MemoryRouter>
      );
      expect(wrapper.find("Route").props().path).toBe('/redirecting');
      expect(wrapper.find("Route").props().component).toBe(RedirectTo);
      
    });


      // it('login page load', () => {
      //   const mockSuccessResponse = {
      //     responseStatus:200,
      //     message:'success',
      //   };
      //   const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
      //   const mockFetchPromise = Promise.resolve({ // 3
      //     json: () => mockJsonPromise,
      //   });
      //   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
      //   let wrapper = mount(
      //     <MemoryRouter initialEntries={['/login']}>
      //       <Switch>
             
      //         <Route path='/login' component={LoginPage} />
           
      //       </Switch>
      //     </MemoryRouter>
      //   )
      //   expect(wrapper.find(LoginPage)).toHaveLength(1);
      // });

     

      // it('Redirect to laoding invoked on submit or not', () => {
      //   let wrapper = mount(
      //     <MemoryRouter initialEntries={['/redirecting']}>
      //       <Switch>
             
      //         <Route path='/redirecting' component={RedirectTo} />
           
      //       </Switch>
      //     </MemoryRouter>
      //   );
      //  expect( wrapper.find(Loading)).toHaveLength(1);
      //  const handlFormSubmit=jest.fn();
      // });

});

const loginsetup = () => {
  const history = createMemoryHistory()
  const route = '/login'
  history.push(route)
  const { getByTestId } = render(
      <Router history={history}>
        <LoginPage />
      </Router>
    )
  const emailInput = getByTestId('nameInput');
  const passwordInput = getByTestId('passwordInput');
  const submit = getByTestId('submit');
  
  return {
      emailInput,
      passwordInput,
      submit
  }
}

describe('<Login/>',()=>{

  // test('rendering a component that uses withRouter', () => {
  //   const mockSuccessResponse = {
  //     responseStatus:200,
  //     message:'success',
  //   };
  //   const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  //   const mockFetchPromise = Promise.resolve({ // 3
  //     json: () => mockJsonPromise,
  //   });
  //   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
  //     const history = createMemoryHistory()
  //     const route = '/login'
  //     history.push(route)
  //     const { getByTestId } = render(
  //       <Router history={history}>
  //         <LoginPage />
  //       </Router>
  //     )
  //     expect(getByTestId('login-container')).toBeInTheDocument();   
  
  //   });

    // test('rendering a component that uses withRouter', () => {
    //   const mockSuccessResponse = {
    //     responseStatus:200,
    //     message:'success',
    //   };
    //   const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    //   const mockFetchPromise = Promise.resolve({ // 3
    //     json: () => mockJsonPromise,
    //   });
    //   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
    //   const { emailInput,passwordInput } = loginsetup();
    //   expect(emailInput).toHaveValue('');
    //   expect(passwordInput).toHaveValue('');
    // });

    // test('username check',()=>
    // {
    //   const mockSuccessResponse = {
    //     responseStatus:200,
    //     message:'success',
    //   };
    //   const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    //   const mockFetchPromise = Promise.resolve({ // 3
    //     json: () => mockJsonPromise,
    //   });
    //   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
    //     const { emailInput } = loginsetup();
    //     fireEvent.change(emailInput, { target: { value: 'rukmani' } });
    //     expect(emailInput.value).toBe('rukmani');
    
    // });

    // it('password check',()=>{
    //   const mockSuccessResponse = {
    //     responseStatus:200,
    //     message:'success',
    //   };
    //   const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    //   const mockFetchPromise = Promise.resolve({ // 3
    //     json: () => mockJsonPromise,
    //   });
    //   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
    //   const { passwordInput } = loginsetup();
    //   fireEvent.change(passwordInput, { target: { value: 'rukmani123' } });
    //   expect(passwordInput.value).toEqual('rukmani123');
    //   });
  
});

describe('<RedirectTo/>',()=>{

  // test('App bar rendered',async  () => {
  
  //     const history = createMemoryHistory()
  //     const path = `/redirecting`;
  //     localStorage.setItem('isAuthorized',true);
  //     localStorage.setItem('navigation',JSON.stringify(navigation));
    
  //     history.push(path)
  //     console.log(history);
  //     const { getByTestId } = render(
  //       <Router history={history}>
  //         <RedirectTo />
  //       </Router>
  //     )
   
  //     expect(getByTestId('loader')).toBeInTheDocument();   
  
  //   });
  
});

 /** test Home */
const homesetup=()=>{
  const history = createHashHistory()
  const route = '"#/app-builder/'
  history.push(route);
  history.location.pathname='/app-builder/';
  history.location.state=''; 
  const { getByTestId } = render(    
<Router history={history} location={history.location}>
{/* <Home/> */}
</Router>
    
)
  return getByTestId;
};

describe('<Home/>',()=>{

      // test('Apps Bar Rendered',()=>
      // {
      //   window.localStorage.setItem('navigation',JSON.stringify(navigation));
      //   const getByTestId=homesetup();
      //   expect(getByTestId('app-bar')).toBeInTheDocument();   
      // });

      // test('Apps List Rendered',()=>
      // {
      //   window.localStorage.setItem('navigation',JSON.stringify(navigation));
      //   const getByTestId=homesetup();
      //   expect(getByTestId('app-list')).toBeInTheDocument();  
    
      // });
 
      // test('Apps List child Rendered',()=>
      // {
      //   window.localStorage.setItem('navigation',JSON.stringify(navigation));
      //   const getByTestId=homesetup();
      //   const appList = getByTestId('app-list');
      //   expect(getByTestId('app-list')).toBeInTheDocument();  
      //   expect(appList.children.length).toBe(2); 
      // });


  });


  describe('App frame component inital state',()=>{
    const menuItems =[{
      'id':'cases',
      'name':'case',
      "displayTextId":"cases",
      'default':'dashboard'
    }]
    // it('verify notification message state',()=>{
    //   window.localStorage.setItem('navigation',JSON.stringify(navigation));
    //     window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
    //     const component = shallow(<AppFrame url="/asset-dashboard/" mode="spa" pageentry="" payload="{}" />);
    //     const instance = component.instance();
    //     expect(component.state().notitfication.message).toBeUndefined();
    // });
  
});






