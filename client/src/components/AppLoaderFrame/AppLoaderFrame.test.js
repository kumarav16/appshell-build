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
import {create} from 'react-test-renderer';
import AppLoaderFrame  from './AppLoaderFrame';
import { MemoryRouter } from "react-router-dom";
import Frame, { FrameContextConsumer } from 'react-frame-component';
import {shallow,mount,render} from 'enzyme';
import '../../setupTests';
import ReactDOM from 'react-dom';
import { fireEvent } from '@testing-library/react';
describe('AppLoaderFrame non routable App',()=>{
    const wrapper = shallow(<AppLoaderFrame />)
    const instance = wrapper.instance();

    const mockSetState = jest.fn();

    jest.mock('react', () => ({
      useState: initial => [initial, mockSetState]
    }));

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
          "default": true,
          "feedbackFlag":true,
          "visibility":true,
          "displayTextId":"dashboard",
          "menuItemId":'cases'
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
          "displayTextId":"dashboard",
          "default": false,
          "visibility":false
        }
    
    ];
    it('verify props are getting assigned',()=>{
      window.localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = mount(<AppLoaderFrame id="appbuilder" classname="appbuilder" />);
        expect(component.prop('id')).toBe("appbuilder");
        window.localStorage.removeItem('navigation');
    });

    test('Can increment from 1 to 2', () => {
      delete window.location;
      window.location = { pathname: '/test' };
      window.localStorage.setItem('navigation',JSON.stringify(navigation));
      const component = mount(<AppLoaderFrame id="appbuilder" classname="appbuilder" />);
      expect(component.find('iframe').prop('title')).toBe("app-frame");
      window.localStorage.removeItem('navigation');
    });

    // test('navigation null', () => {
    //   window.location =  '/appshell/';
    //   window.location = { pathname: '/appshell' }
    //   window.localStorage.setItem('navigation', JSON.stringify("null"));
    //   const component = mount(<AppLoaderFrame id="appbuilder" classname="appbuilder" />);
    //   expect(component.find('iframe').prop('title')).toBe("app-frame");
    // });

    /*
    it('verify inital state',()=>{
      
        const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" onFrameMessage ="on frame message!" pageentry="/" />);
        expect(component.state().htmlContent).toBe('');
        expect(component.state().loading).toBeTruthy();
        expect(component.state().navcontext).toBe("{}");
    });

    it('verify when error thrown in call-api call',(done)=>{
          const mockSuccessResponse = {
            status: 403,
        };
          const obj =  {
            pathname:"/dummy",
            method:"POST",
            state:{detail:"data"}
        };
          const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
          const mockFetchPromise = Promise.resolve({ 
            json: () => mockJsonPromise,
            status:403
          });
          jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
        const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" 
                          onFrameMessage ="on frame message!" pageentry="/" />);
      
        window.postMessage = jest.fn();    
        component.instance().getFramePage(obj);
        process.nextTick(() => {
            expect(global.fetch).toHaveBeenCalled();
            expect(window.postMessage).toBeCalled();
             global.fetch.mockClear();
            done();
          });
    });

    it('verify htmlContent state after api call',(done)=>{
        const mockSuccessResponse = {
          status: 200,
          statusText: 'OK',
          response: 'loading',
          sendAsJson: false
      };
        const obj =  {
          pathname:"/dummy",
          method:"POST",
          state:{detail:"data"}
      };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
        const mockFetchPromise = Promise.resolve({ 
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
      const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" 
                        onFrameMessage ="on frame message!" pageentry="/" />);
    
      component.instance().getFramePage(obj);
      
      process.nextTick(() => {
          expect(global.fetch).toHaveBeenCalled();
          expect(component.state().htmlContent).toBe('loading');
           global.fetch.mockClear();
          done();
        });
  });

  it('verify when api call throws an error',(done)=>{
    const mockSuccessResponse = undefined;
    const obj =  {
      pathname:"/dummy",
      method:"POST",
      state:{detail:"data"}
  };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
    const mockFetchPromise = Promise.resolve({ 
      json: () => mockJsonPromise,
      status: 200
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
  const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" 
                    onFrameMessage ="on frame message!" pageentry="/" />);

    window.postMessage = jest.fn();    
    component.instance().getFramePage(obj);
    process.nextTick(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(window.postMessage).toBeCalled();
    global.fetch.mockClear();
    done();
    });
});

it('verify handle response state',()=>{
    const response = {
        ok:true
    }
    const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" onFrameMessage ="on frame message!" pageentry="/" />);
    var errorResponse = component.instance().handleErrors(response);
    expect(errorResponse).toBe(response);
});

it('verify handle response state throws error',()=>{
    const response = {
        ok:false
    }
    const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" onFrameMessage ="on frame message!" pageentry="/" />);
    expect(() => {
        component.instance().handleErrors(response);
      }).toThrow();
});

it('verify navcontext state getting changed or not',()=>{
    window.contextPayload = "contextPayload";
    const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" onFrameMessage ="on frame message!" pageentry="/" />);
   
    expect(component.state().navcontext).toBe("contextPayload");
});

it('verify getFramePage has been called',()=>{
      const frameMounted = jest.fn();
      var el = document.createElement('div');
      el.id = "divid";
      document.body.appendChild(el);
      var props ={
        onFrameMessage : jest.fn()
      }
      const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" onFrameMessage ="jest.fn()" pageentry="/" 
      contentDidMount={frameMounted}/>,
      { attachTo: el });
      component.state().importurl = "/asset-holder/";
      const getFramePage = jest.spyOn(component.instance(), 'getFramePage')
      component.instance().componentDidUpdate({url:"/asset-holder1/"});
      expect(getFramePage).toHaveBeenCalled();
  });
  it('verify context set to frames window and send message to microapps',() => {
    const frameMounted = jest.fn();
    var el = document.createElement('div');
      el.id = "divid";
      document.body.appendChild(el);
      window.getContext = ()=>{return {'context' : {'message':'share context'}}};
    const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" onFrameMessage ="on frame message!" pageentry="/" 
    contentDidMount={frameMounted}/>,
    { attachTo: el });
    window.getContext = ()=>{return {'context' : {'message':'share context'}}};
    component.instance().handleFrameMessage('Message');
    component.state().importurl = "/asset-holder/";
    component.instance().componentDidUpdate("/asset-holder1/");
  });*/

});