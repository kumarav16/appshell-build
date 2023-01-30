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
import PopupFrameHolder  from './PopupFrameHolder';
import { MemoryRouter } from "react-router-dom";
import Frame, { FrameContextConsumer } from 'react-frame-component';
import {shallow,mount} from 'enzyme';
import '../setupTests';


describe('PopupFrameHolder component inital state',()=>{

    it('verify notification show state',()=>{
        const component = shallow(<PopupFrameHolder />);
        const instance = component.instance();
        expect(component.state().htmlContent).toBe('<h3>Loading</h3>');
    });

    it('verify htmlContent state after api call',(done)=>{
        const mockSuccessResponse = {
            responseStatus:200,
            response:'loading' 
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
        const component = shallow(<PopupFrameHolder />);
        component.instance().getFramePage(obj);
        process.nextTick(() => {
            expect(global.fetch).toHaveBeenCalled();
            expect(component.state().htmlContent).toBe('loading');
             global.fetch.mockClear();
            done();
          });
    });

  
});



