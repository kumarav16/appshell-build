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
import {PrivateRoute}  from './PrivateRoute';
import { MemoryRouter } from "react-router-dom";
import {mount} from 'enzyme';
import './setupTests';
import RedirectTo  from './RedirectTo';


describe('PrivateRoute component inital state',()=>{

    it('Verify if Route redirects to "Redirect" component',()=>{
        var rest = {
            isOpen: true
            };
        window.localStorage.setItem("isAuthorized", "true");
        const wrapper = mount( <MemoryRouter initialEntries={['/redirecting']}>
            <PrivateRoute component={RedirectTo}  {...rest}/>
            </MemoryRouter>);
          window.localStorage.removeItem('isAuthorized');
        const wrapper_a = mount( <MemoryRouter initialEntries={['/redirecting']}>
            <PrivateRoute component={RedirectTo}  {...rest}/>
            </MemoryRouter>);
            // expect(wrapper.find(Route)).toHaveLength(1);
           
        expect(wrapper.find(RedirectTo)).toHaveLength(1);
        expect(wrapper_a.find(RedirectTo)).toHaveLength(0);
    });
  
});







