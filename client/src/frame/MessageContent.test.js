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
import MessageContent  from './MessageContent';
import { MemoryRouter } from "react-router-dom";
import Frame, { FrameContextConsumer } from 'react-frame-component';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {shallow,mount,render} from 'enzyme';
import '../setupTests';


describe('Message Content',()=>{

    it('verify notification show state',()=>{
        const component = mount(<MessageContent    
            onClose={()=>{}}
            variant= "info"
            message= "message content render" />);
      //  const instance = component.instance();
        expect(component.find(SnackbarContent).length).toBe(1);
    });
});