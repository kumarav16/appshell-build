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
import RedirectTo  from './RedirectTo';
import { MemoryRouter } from "react-router-dom";
import {shallow,mount} from 'enzyme';
import fetchMock from 'fetch-mock'
import './setupTests';

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

jest.useFakeTimers();

describe('RedirectTo component inital state',()=>{

    it('verify navigations  state',()=>{
        const wrapper = mount(<MemoryRouter initialEntries={['/']}><RedirectTo /></MemoryRouter>);
        const component = wrapper.find("RedirectTo").at(0);
        expect(component.state().navigations).toHaveLength(0);
    });

    it('verify loading state ',()=>{
        const wrapper = mount(<MemoryRouter initialEntries={['/']}><RedirectTo /></MemoryRouter>);
        const component = wrapper.find("RedirectTo").at(0);
        expect(component.state().loading).toBeTruthy();
    });

    it('callapi invoked or not',()=>{
        const mockSuccessResponse = {
            responseStatus:401
    
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
        const wrapper = mount(<MemoryRouter initialEntries={['/']}><RedirectTo /></MemoryRouter>);
        const component = wrapper.find("RedirectTo").at(0);
        component.instance().callApi();
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith("/api/usermanager/nav", {"headers": {"Accept": "application/json", "Content-Type": "application/json"}, "method": "GET"});

    });

    it('callapi returns suucess', ()=>{
        const mockSuccessResponse = {
            status: 200,
            statusText: 'OK',
            body: JSON.stringify(navigation),
            sendAsJson: false
        };
        fetchMock.once('/api/usermanager/nav', {
            status: 200,
            statusText: 'OK',
            body: JSON.stringify(navigation),
          headers: {'Content-Type': 'application/json'},
          sendAsJson: false
           });
        const wrapper = mount(<MemoryRouter initialEntries={['/']}><RedirectTo /></MemoryRouter>);
        const component = wrapper.find("RedirectTo").at(0);
        jest.runAllTimers();
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
    });
});







