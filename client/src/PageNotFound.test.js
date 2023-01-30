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
import PageNotFound  from './PageNotFound';
import {mount} from 'enzyme';
import './setupTests';


describe('PageNotFound render',()=>{

    it('verify notification show state',()=>{
        const component = mount(<PageNotFound />);
        expect(component.find('h3').text()).toBe('Requested Page Not found');
    });
});



