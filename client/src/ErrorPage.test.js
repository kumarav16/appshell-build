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
import ErrorPage  from './ErrorPage';
import {shallow,mount} from 'enzyme';
import './setupTests';

describe('Error component  rendering',()=>{ 
    it('verify Error message show state',()=>{
        const component = shallow(<ErrorPage />);
        var wrapper = component.find('ErrorPage').at(0);
        expect(component.find('h3').text()).toEqual('Something went wrong');
    });
});


