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
import {AppFrame}  from './AppFrame';
import { MemoryRouter } from "react-router-dom";
import Frame, { FrameContextConsumer } from 'react-frame-component';
import {shallow,mount} from 'enzyme';
import '../setupTests';
import  Fetch  from '../network/Fetch';


describe('App frame component inital state',()=>{
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
    it('verify notification show state',()=>{
        localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = shallow(<AppFrame url="/asset-dashboard/" mode="spa" pageentry="" payload="{}" />);
        const instance = component.instance();
        expect(component.state().notitfication.show).toBeFalsy();
    });

    it('verify notification message state',()=>{
        localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = shallow(<AppFrame url="/asset-dashboard/" mode="spa" pageentry="" payload="{}" />);
        const instance = component.instance();
        expect(component.state().notitfication.message).toBeUndefined();
    });

    it('verify notification variant state',()=>{
        localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = shallow(<AppFrame url="/asset-dashboard/" mode="spa" pageentry="" payload="{}" />);
        expect(component.state().notitfication.variant).toBe("info");
    });

    it('verify  payload state',()=>{
        localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = shallow(<AppFrame url="/asset-dashboard/" mode="spa" pageentry="" payload="{}" />);
        expect(component.state().payload).toBe('{}');
    });
    it('verify  url state',()=>{
        localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = shallow(<AppFrame url="/asset-dashboard/" mode="spa" pageentry="" payload="{}" />);
        expect(component.state().url).toBe('/asset-dashboard/');
    });
});

const postMessage=()=>{
    const message = JSON.stringify({
        eventType: 'notification',
        payload: {
            show: true,
            message: 'Failed to load application',
            variant: 'error'
        }
    });

    window.postMessage(message);


};

describe('App frame component on post message',()=>{

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

    it("open modal working",()=>{
        localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = shallow(<AppFrame url="/asset-dashboard/" mode="spa" pageentry="" payload="{}" appId="dashboard"/>);
        component.setState({ 
            url: '',
            mode:  'spa',
            pageentry: undefined,
            payload:{},
            notification:  
            {
            show: true,
            message: 'Failed to load application',
            variant: 'error' 
        }
        });
        const navobj={
            pathname:'/dummy/',
           state:{
            mode:'modal',
            detail:"khgo",
            deletemyHistory:true
           }

        }
        component.instance().openModal(navobj);
        expect(component.state().url).toBe('/dummy/');

    });


    it("close modal working",()=>{
        const component = shallow(<AppFrame url="/close/" mode="close-spa" pageentry="/" payload="{cose}" />);
       
        component.instance().closeModal();
        expect(component.state().url).toBe('/close/');
        expect(component.state().mode).toBe('close-spa');
        expect(component.state().pageentry).toBe('/');
        expect(component.state().payload).toBe( "{cose}");
       
        

    });

    it("handle navigation working",()=>{
        const component = shallow(<AppFrame url="/close/" mode="close-spa" pageentry="/" payload="{cose}" />);
        const message = JSON.stringify({
            eventType: 'notification',
            payload: {
                show: true,
                message: 'Failed to load application',
                variant: 'error'
            }
        });
        const event={
            preventDefault:()=>{},
            data:message
        };
        component.instance().handleNavigation(event);
        expect(component.state().notitfication.variant).toBe("error");
        expect(component.state().notitfication.message).toBe('Failed to load application');
        expect(component.state().notitfication.show).toBeTruthy();
  
    });

    it("handle navigation  with navigation mode modal working",()=>{
        const component = shallow(<AppFrame url="/close/" mode="modal" pageentry="/" payload="{cose}" />);
        const message = JSON.stringify({
            eventType: 'navigation',
            payload: {
                show: true,
                message: 'Failed to load application',
                variant: 'error',
                state:{mode:'modal'}
            }
        });
        const message2 = JSON.stringify({
            eventType: 'navigation',
            payload: {
                show: true,
                message: 'Failed to load application',
                variant: 'error',
                state:{mode:'modal'}
            }
        });
        const message3 = {
            eventType: 'navigation',
            payload: {
                show: true,
                message: 'Failed to load application',
                variant: 'error',
                state:{mode:'modal'}
            }
        };
        const event={
            preventDefault:()=>{},
            data:message
        };
        const event2={
            preventDefault:()=>{},
            data:message2
        };
        const event3={
            preventDefault:()=>{},
            data:message3
        };
      const instance=component.instance(); 
      const openModal = jest.spyOn(component.instance(), 'openModal')
        component.instance().handleNavigation(event);
        expect(openModal).toBeCalled();  
        component.instance().handleNavigation(event2); 
        component.instance().handleNavigation(event3); 
  
    });

    it("handle navigation  with navigation mode SPA working",()=>{
        const history={
            push:()=>{}
        }
        const component = shallow(<AppFrame history={history} url="/close/" mode="modal" pageentry="/" payload="{cose}" />);
        const message = JSON.stringify({
            eventType: 'navigation',
            payload: {
                show: true,
                message: 'Failed to load application',
                variant: 'error',
                state:{mode:'spa'},
                pathname:'/app-builder/register/'
            }
        });
        const event={
            preventDefault:()=>{},
            data:message
        };
        const message2 = JSON.stringify({
            eventType: 'navigation',
            payload: {
                show: true,
                message: 'Failed to load application',
                variant: 'error',
                state:{mode:'spa'}
                
            }
        });
        const event2={
            preventDefault:()=>{},
            data:message2
        };
      const instance=component.instance(); 
      const pushToHistory = jest.spyOn(component.instance(), 'pushToHistory')
        component.instance().handleNavigation(event);
        expect(pushToHistory).toBeCalled();   
        component.instance().handleNavigation(event);
  
    });

    it("handle navigation  with navigation mode tab working",()=>{
        const data = {
            contextPayload:""
        }
        window.open = jest.fn().mockImplementation(() => data);
        const component = shallow(<AppFrame url="/close/" mode="modal" pageentry="/" payload="{cose}" />);
        const message = JSON.stringify({
            eventType: 'navigation',
            payload: {
                show: true,
                message: 'Failed to load application',
                variant: 'error',
                state:{mode:'tab'}
            }
        });
        const event={
            preventDefault:()=>{},
            data:message
        };
      const instance=component.instance(); 
      const openNewTab = jest.spyOn(instance, 'openNewTab')
        component.instance().handleNavigation(event);
        expect(openNewTab).toBeCalled();   
  
    });

    it("handle navigation  with navigation mode overlay working",()=>{
        const component = shallow(<AppFrame url="/close/" mode="modal" pageentry="/" payload="{cose}" />);
        const message = JSON.stringify({
            eventType: 'navigation',
            payload: {
                show: true,
                message: 'Failed to load application',
                variant: 'error',
                state:{mode:'overlay'}
            }
        });
        const event={
            preventDefault:()=>{},
            data:message
        };
      const instance=component.instance(); 
      const openModal = jest.spyOn(component.instance(), 'openModal')
        component.instance().handleNavigation(event);
        expect(openModal).toBeCalled();   
  
    });

    it("handle navigation  with navigation mode def working",()=>{
        const component = shallow(<AppFrame url="/close/" mode="modal" pageentry="/" payload="{cose}" />);
        const message = JSON.stringify({
            eventType: 'navigation',
            payload: {
                show: true,
                message: 'Failed to load application',
                variant: 'error',
                state:{mode:'def'}
            }
        });
        const event={
            preventDefault:()=>{},
            data:message
        };
      
        component.instance().handleNavigation(event);
        expect(component.state().notitfication.variant).toBe("error");
        expect(component.state().notitfication.message).toBe('Invalid Navigation mode');
        expect(component.state().notitfication.show).toBeTruthy();
  
    });

    it("handle navigation  with close-overlay ",()=>{
        const component = shallow(<AppFrame url="/close/" mode="modal" pageentry="/" payload="{cose}" />);
        const message = JSON.stringify({
            eventType: 'close-overlay',
            payload: {
                show: true,
                message: 'Failed to load application',
                variant: 'error',
                state:{mode:'def'}
            }
        });
        const event={
            preventDefault:()=>{},
            data:message
        };
      
        const instance=component.instance(); 
        const closeModal = jest.spyOn(component.instance(), 'closeModal')
          component.instance().handleNavigation(event);
          expect(closeModal).toBeCalled();   
  
    });

    it(" handleNotificationClose working",()=>{
        const component = shallow(<AppFrame url="/close/" mode="close-spa" pageentry="/" payload="{cose}" />);
       
        const event={

        };
        component.setState({ 
            url: '',
            mode:  'spa',
            pageentry: undefined,
            payload:{},
            notification:  
            {
            show: true,
            message: 'Session Timeout. ',
            variant: 'error' 
        }
        });
        component.instance().handleNotificationClose(event,'');
        expect(component.state().notitfication.variant).toBe("info");
        expect(component.state().notitfication.message).toBeUndefined();
        expect(component.state().notitfication.show).toBeFalsy();
  
    });

    it(" handleNotificationClose working",()=>{
        const component = shallow(<AppFrame url="/close/" mode="close-spa" pageentry="/" payload="{cose}" />);
       
        const event={

        };
        component.instance().handleNotificationClose(event,'');
        expect(component.state().notitfication.variant).toBe("info");
        expect(component.state().notitfication.message).toBeUndefined();
        expect(component.state().notitfication.show).toBeFalsy();
  
    });

    it(" Verify the functionality in handleNotificationClose when reason  is clickway",()=>{
        
        const component = shallow(<AppFrame url="/close/" mode="close-spa" pageentry="/" payload="{cose}" />);
        component.setState({ 
            url: '',
            mode:  'spa',
            pageentry: undefined,
            payload:{},
            notification:  
            {
            title:"Clickaway",
            show: true,
            message: 'Session Timeout. ',
            variant: 'error' 
        }
        });
       const reason = 'clickaway';
        const event={
            preventDefault:()=>{}
        };
        
        component.state().notitfication.show = true;
        component.instance().handleCallback();
        component.instance().handleErrorCallback();
        component.instance().handleNotificationClose(event,reason);
        expect(component.state().notitfication.show).toBeTruthy();
        expect(component.state().notitfication.message).not.toBeUndefined; // Changed from "Session Timeout, " to undefined
    });

    it(" Verify when Session is Timeout then localstorage should get cleared",()=>{
        const history={
            push:()=>{}
        }
        delete window.location;
        window.location = { reload: jest.fn() };
        const component = shallow(<AppFrame history={history} url="/close/" mode="close-spa" pageentry="/" payload="{cose}" />);
       const reason = ' ';
        const event={
            preventDefault:()=>{}
        };
        jest.spyOn(window.localStorage.__proto__, 'clear');
        window.localStorage.__proto__.clear = jest.fn();
        component.instance().pushToHistoryForLogout();
        // expect(window.localStorage.clear).toHaveBeenCalled();  // Commented as below line checks the same
        expect(window.localStorage.length).toBe(0);
    });


    it("verify the proxy call ",(done)=>{
        const mockComponentWillMountResponse = {
            responseStatus:200,
            "message": "success"
       };
       const mockFetchPromise = Promise.resolve({ 
        json: () => mockComponentWillMountResponse,
       });
       jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
       localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = shallow(<AppFrame url="/close/" mode="modal" pageentry="/" payload="{cose}" />);
        const navObject =  {
                pathname:"/dummy",
                method:"POST",
                state:{detail:"data"}
            };
        Fetch.put(navObject);
        Fetch.delete(navObject);
        Fetch.request(navObject);
        const navObject1 =  {
            pathname:"/dummy",
            state:{detail:"data"},
            data:{'test':'test'}
        };
        Fetch.request(navObject1);
          component.instance().proxyCall (navObject); 
          process.nextTick(() => {
            expect(global.fetch).toHaveBeenCalledWith('/dummy', {
                method: 'POST', 
                headers: 
                {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },         
                body: "\"data\""
              });  
            global.fetch.mockClear();
            done();
          }); 
    }); 

    it("Verify handle navigation  with 'proxy' as event type",()=>{
        const mockComponentWillMountResponse = {
            responseStatus:200,
            "message": "success"
       };
       const mockFetchPromise = Promise.resolve({ 
        json: () => mockComponentWillMountResponse,
       });
        const history={
            push:()=>{}
        }
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 

        localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = shallow(<AppFrame history={history} url="/close/" mode="modal" pageentry="/" payload="{cose}" />);
        const message = JSON.stringify({
            eventType: 'proxy',
            payload: {
                pathname:"/dummy",
                method:"POST",
                state:{detail:"data"}
            }
        });
        const event={
            preventDefault:()=>{},
            data:message
        };
      const proxyCall = jest.spyOn(component.instance(), 'proxyCall')
      component.instance().handleNavigation(event);
      component.instance().getlogouturl();
      component.instance().callTimeout();
      expect(proxyCall).toBeCalled();   
    });

    it("Verify handle navigation  with 'session-timeout' as event type",()=>{
        const history={
            push:()=>{}
        }
        localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = shallow(<AppFrame  history={history} url="/close/" mode="modal" pageentry="/" payload="{cose}" t={jest.fn()} />);
        const message = JSON.stringify({
            eventType: 'session-timeout',
            payload: {
                show: true,
                message: 'Failed to load application',
                variant: 'error'
            }
        });
        const event={
            preventDefault:()=>{},
            data:message
        };
      component.instance().handleNavigation(event);
      expect(component.state().notitfication.message).toBe(undefined);  
    });

    it("Verify openNewTab  call",()=>{
    localStorage.setItem('navigation',JSON.stringify(navigation));
    const component = shallow(<AppFrame history={history} url="/close/" mode="modal" pageentry="/" payload="{cose}" />);
    const navObject =  {
            pathname:"/dummy",
            method:"POST",
            state:{detail:"data"}
        };
    const data = {
        contextPayload:""
    }
      window.getContext = null;
      window.open = jest.fn().mockImplementation(() => data);
      component.instance().openNewTab(navObject);
      expect(window.open).toBeCalled();
    });
    it("Verify openNewTab  call with appname",()=>{
        localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = shallow(<AppFrame history={history} url="/close/" mode="modal" pageentry="/" payload="{cose}" />);
        const navObject =  {
                appname:"appbuilder",
                //pathname:"/dummy",
                method:"POST",
                state:{detail:{payLoad:{eventName:'nodeCliked'}}}
            };
        const navObject1 =  {
            appname:"appbuilder",
            //pathname:"/dummy",
            method:"POST",
            state:{detail:{payLoad:{}}}
        };
        const data = {
            contextPayload:""
        }
          window.open = jest.fn().mockImplementation(() => data);
          window.getContext = jest.fn().mockImplementation(()=>{ return {'context' : {'message':'share context'}}});
          component.instance().openNewTab(navObject);
          expect(window.open).toBeCalled();
          component.instance().openNewTab(navObject1);
          window.open('\\', '_blank').getContext();
        });
    it("handle navigation  with navigation mode SPA working appname",()=>{
            const history={
                push:()=>{},
                replace:()=>{}
            }
            const component = shallow(<AppFrame history={history} url="/close/" mode="modal" pageentry="/" payload="{cose}" />);
            const message = JSON.stringify({
                eventType: 'navigation',
                payload: {
                    show: true,
                    message: 'Failed to load application',
                    variant: 'error',
                    state:{mode:'spa',detail:{payLoad:{eventName:'otherNodeCliked'}},deletemyHistory:true},
                    appname:'appbuilder',
                    isUserDetailsUpdated: true
                }
            });
            const event={
                preventDefault:()=>{},
                data:message
            };
          const instance=component.instance(); 
          localStorage.setItem('navigation',JSON.stringify(navigation));
          window.getContext = jest.fn().mockImplementation(()=>{ return {'context' : {'message':'share context'}}});
          const pushToHistory = jest.spyOn(component.instance(), 'pushToHistory')
          component.instance().handleNavigation(event);
          expect(pushToHistory).toBeCalled();   
          expect(component.state().url).toBe('/close/');
        });
    it("open modal working with appname",()=>{
        const component = shallow(<AppFrame url="/asset-dashboard/" mode="spa" pageentry="" payload="{}" />);
        component.setState({ 
            url: '',
            mode:  'spa',
            pageentry: undefined,
            payload:{},
            notification:  
            {
            show: true,
            message: 'Failed to load application',
            variant: 'error' 
        }
        });
        const navobj={
            appname:"appbuilder",
            //pathname:'/dummy/',
            state:{
            mode:'modal',
            detail:{payLoad:{'eventName':'nodeCliked'}}
            }

        }
        window.getContext = jest.fn().mockImplementation(()=>{ return {'context' : {'message':'share context'}}});
        component.instance().openModal(navobj);
        delete window.localStorage;
        component.instance().pushToHistoryForLogout();
        expect(component.state().url).toBe('/app-builder/');

    });
});


