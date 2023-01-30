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
import FrameHolder  from '../frame/FrameHolder';
import { MemoryRouter } from "react-router-dom";
import Frame, { FrameContextConsumer } from 'react-frame-component';
import {shallow,mount,render} from 'enzyme';
import '../setupTests';
import ReactDOM from 'react-dom';
import { fireEvent } from '@testing-library/react';
jest.mock("react-i18next", () => ({
  withTranslation: () => (Component) => {
      Component.defaultProps = {...Component.defaultProps, t: (key) => key};
      return Component;
    },
}));
describe('Frame Holder',()=>{

    const wrapper = shallow(<FrameHolder />)
    const instance = wrapper.instance();

    it('snapshot',()=>{
        const component = shallow(<FrameHolder  url="/asset-holder/" payload="{}" onFrameMessage ="on frame message!" pageentry="/" />);
       
        expect(component).toMatchSnapshot();
       
    });

    it('verify notification show state',()=>{
        const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" onFrameMessage ="on frame message!" pageentry="/" />);
       
     //   expect(component.props().url).toBe("/asset-holder/");
        expect(component.prop('payload')).toBe("{}");
        expect(component.prop('pageentry')).toBe("/");
        expect(component.prop('onFrameMessage')).toBe("on frame message!");
    });


    
    it('verify inital state',()=>{
      
        const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" onFrameMessage ="on frame message!" pageentry="/" />);
        expect(component.state().htmlContent).toBe('');
        expect(component.state().loading).toBeTruthy();
        expect(component.state().navcontext).toEqual(["{}"]);
    });

    // it('verify when error thrown in call-api call',(done)=>{
    //       const mockSuccessResponse = {
    //         status: 403,
    //     };
    //       const obj =  {
    //         pathname:"/dummy",
    //         method:"POST",
    //         state:{detail:"data"}
    //     };
    //       const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
    //       const mockFetchPromise = Promise.resolve({ 
    //         json: () => mockJsonPromise,
    //         status:403
    //       });
    //       jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
    //     const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" 
    //                       onFrameMessage ="on frame message!" pageentry="/" />);
      
    //     window.postMessage = jest.fn();  
    //     let t = (string) =>{ return string} 
    //     component.instance().getFramePage(obj,t);  
    //     process.nextTick(() => {
    //         expect(global.fetch).toHaveBeenCalled();
    //         expect(window.postMessage).toBeCalled();
    //          global.fetch.mockClear();
    //         done();
    //       });
    // });

//     it('verify htmlContent state after api call',(done)=>{
//         const mockSuccessResponse = {
//           status: 200,
//           statusText: 'OK',
//           response: 'loading',
//           sendAsJson: false
//       };
//         const obj =  {
//           pathname:"/dummy",
//           method:"POST",
//           state:{detail:"data"}
//       };
//         const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
//         const mockFetchPromise = Promise.resolve({ 
//           json: () => mockJsonPromise,
//         });
//         jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
//       const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" 
//                         onFrameMessage ="on frame message!" pageentry="/" parentCallback={()=> {}}/>);
//         let t = (string) =>{ return string} 
//  component.instance().getFramePage(obj,t);
      
//       process.nextTick(() => {
//           expect(global.fetch).toHaveBeenCalled();
//           expect(component.state().htmlContent).toBe('loading');
//            global.fetch.mockClear();
//           done();
//         });
//   });

//   it('verify when api call throws an error',(done)=>{
//     const mockSuccessResponse = undefined;
//     const obj =  {
//       pathname:"/dummy",
//       method:"POST",
//       state:{detail:"data"}
//   };
//     const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
//     const mockFetchPromise = Promise.resolve({ 
//       json: () => mockJsonPromise,
//       status: 200
//     });
//     jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
//   const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" 
//                     onFrameMessage ="on frame message!" pageentry="/" parentCallback={()=> {}}/>);

//     window.postMessage = jest.fn();  
//     let t = (string) =>{ return string} 
//     component.instance().getFramePage(obj,t);  
//     process.nextTick(() => {
//     expect(global.fetch).toHaveBeenCalled();
//     expect(window.postMessage).toBeCalled();
//     global.fetch.mockClear();
//     done();
//     });
// });

// it('verify handle response state',()=>{
//     const response = {
//         ok:true
//     }
//     const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" onFrameMessage ="on frame message!" pageentry="/" parentCallback={()=> {}} />);
//     var errorResponse = component.instance().handleErrors(response);
//     expect(errorResponse).toBe(response);
// });

// it('verify handle response state throws error',()=>{
//     const response = {
//         ok:false
//     }
//     const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" onFrameMessage ="on frame message!" pageentry="/" parentCallback={()=> {}} />);
//     expect(() => {
//         component.instance().handleErrors(response);
//       }).toThrow();
// });

// it('verify navcontext state getting changed or not',()=>{
//   window.contextPayload = "contextPayload";
//   const obj =  {
//     pathname:"/dummy",
//     method:"POST",
//     state:{detail:"data"}
// };
// const mockSuccessResponse = {
//   status: 200,
//   statusText: 'OK',
//   response: 'loading',
//   sendAsJson: false
// };
// const response = {
//         ok:true
//     }
//   const ev= {'eventName':'click'};
//   const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
//       const mockFetchPromise = Promise.resolve({ 
//         json: () => mockJsonPromise,
//       });
//       jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 

//   const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" onFrameMessage={()=>{}} pageentry="/" parentCallback={(ev)=> {}}/>);
//   let t = (string) =>{ return string} 
//   component.instance().getFramePage(obj,t);
//   var errorResponse = component.instance().handleErrors(response);
//   expect(errorResponse).toBe(response);
//   expect(component.state().navcontext).toBe("contextPayload");
// });

// it('verify getFramePage has been called',()=>{
//       const frameMounted = jest.fn();
//       const mockSuccessResponse = {
//         status: 200,
//         statusText: 'OK',
//         response: 'loading',
//         sendAsJson: false
//     };
//       var el = document.createElement('div');
//       el.id = "divid";
//       document.body.appendChild(el);
//       var props ={
//         onFrameMessage : jest.fn()
//       }
//       const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
//         const mockFetchPromise = Promise.resolve({ 
//           json: () => mockJsonPromise,
//         });
//     localStorage.setItem('sessionTimeOut',"true");
//     jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
//       const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" pageentry="/" 
//       parentCallback={()=> {}} onFrameMessage={()=>{}}/>,
//       { attachTo: el });
//       component.state().importurl = "/asset-holder/";
//       const getFramePage = jest.spyOn(component.instance(), 'getFramePage')
//       component.instance().componentDidUpdate({url:"/asset-holder/"});
//       //expect(getFramePage).toHaveBeenCalled();
//   });
  // it('verify context set to frames window and send message to microapps',() => {
  //   const frameMounted = jest.fn();
  //   const mockSuccessResponse = {
  //     status: 200,
  //     statusText: 'OK',
  //     response: 'loading',
  //     sendAsJson: false
  // };
  //   var el = document.createElement('div');
  //     el.id = "divid";
  //     document.body.appendChild(el);
  //     const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
  //       const mockFetchPromise = Promise.resolve({ 
  //         json: () => mockJsonPromise,
  //       });
  //   localStorage.setItem('sessionTimeOut',"true");
  //   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
  //   const component = mount(<FrameHolder  url="/asset-holder/" payload="{}" pageentry="/" 
  //   parentCallback={()=> {}} onFrameMessage={()=>{}}/>,
  //   { attachTo: el });
  //   window.getContext = ()=>{return {'context' : {'message':'share context'}}};
  //   component.instance().handleFrameMessage('Message');
  //   component.state().importurl = "/asset-holder/";
  //   component.instance().componentDidUpdate("/asset-holder/");
  // });

});