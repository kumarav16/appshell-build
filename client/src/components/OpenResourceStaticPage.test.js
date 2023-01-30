import React, { Suspense } from 'react';
import OpenResourceStaticPage from './OpenResourceStaticPage';
import { BrowserRouter as Router } from 'react-router-dom';
import {shallow,mount,render} from 'enzyme';
import ReactDOM from 'react-dom';
import { fireEvent } from '@testing-library/react';
import $ from "jquery";
const navigation=[
  {
      "id":"dashboard",
      "name": "Asset Dashboard",
      "link": "/asset-dashboard/",
      "iconSvg": "<svg>test</svg?",
      "host": "https://ofe-dev-nginx-lb01-1933176829.us-west-2.elb.amazonaws.com",
      "path":"/asset-dashboard",
      "template":"/index.html",
      "navService":"/nav",
      "default": false,
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
      "default": true,
      "visibility":true
    },
    {
      "id":"demo-app",
      "name": "App Demo",
      "link": "/app-demo/",
      "icon": "warningrounded",
      "host": "https://cde-sc-nginx-dev01-elb01-238862697.us-west-2.elb.amazonaws.com/appbuilder",
      "path":"/app-demo",
      "template":"/index.html",
      "navService":"/nav",
      "default": false,
      "displayTextId":"demo-app",
      "visibility":true
    }
];
describe('Static testing begins',()=>{
  it('verify for Static group mounted', () => {
    window.location.hash = '/openResourceAttributes.txt';
    const userInfoDialogMap = [
      {
        "type": "group",
        "mode": "spa",
        "name": "About",
        "icon": "tune",
        "subMenu": [
          {
            "location": "/openResourceAttributes.txt",
            "name": "Licenses Attributions",
            "icon": "tune",
            "default": true
          },
          {
            "location": "/i18.txt",
            "name": "Version",
            "icon": "tune",
            "default": false
          },
          {
            "type": "file",
            "location": "/i18.html",
            "name": "richHTML",
            "mode": "spa",
            "icon": "tune"
          },
        ]
      }
    ];
    window.localStorage.setItem('navigation',JSON.stringify(navigation));
    window.localStorage.setItem('userInfoDialogMap', JSON.stringify(userInfoDialogMap))
    const mockSuccessResponse = {
      responseStatus: 200,
      data: 'error'
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const wrapper = mount(<Router><Suspense><OpenResourceStaticPage /></Suspense></Router>);
    const component = wrapper.find("OpenResourceStaticPage").at(0);
    console.log(component.debug());
    component.find('div.activePage').simulate('click');
    expect(component.find('span#staticPageTitle').at(0).text()).toEqual('Licenses Attributions');
    //expect(component.find('div#staticPageTitle').text()).toEqual('PermissionRequired');
  });
  it('verify for Static group mounted without error', () => {
    window.location.hash = '/openResourceAttributes.txt';
    const userInfoDialogMap = [
      {
        "type": "group",
        "mode": "spa",
        "name": "About",
        "icon": "tune",
        "subMenu": [
          {
            "location": "/openResourceAttributes.txt",
            "name": "Licenses Attributions",
            "icon": "tune",
            "default": true
          }
        ]
      }
    ];
    window.localStorage.setItem('navigation',JSON.stringify([]));
    window.localStorage.setItem('userInfoDialogMap', JSON.stringify(userInfoDialogMap))
    const mockSuccessResponse = {
      responseStatus: 200,
      data: 'success'
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const wrapper = mount(<Router><Suspense><OpenResourceStaticPage /></Suspense></Router>);
    const component = wrapper.find("OpenResourceStaticPage").at(0);
    component.find('div.activePage').simulate('click');
    expect(component.find('span#staticPageTitle').at(0).text()).toEqual('Licenses Attributions');
  });
  it('verify for Static mounted', () => {
    window.location.hash = '/i18.html'
    const userInfoDialogMap = [
      {
        "type": "file",
        "location": "/i18.html",
        "name": "richHTML",
        "mode": "spa",
        "icon": "tune"
      }
    ]
    window.localStorage.setItem('userInfoDialogMap', JSON.stringify(userInfoDialogMap));
    const mockSuccessResponse = {
      responseStatus: 200,
      message: 'success'
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const wrapper = mount(<Router><Suspense><OpenResourceStaticPage /></Suspense></Router>);
    const component = wrapper.find("OpenResourceStaticPage").at(0);
    expect(component.find('span#staticPageTitle').text()).toEqual('richHTML');
  });
  it('verify for Static mounted', () => {
    window.location.hash = '/i18.html'
    const userInfoDialogMap = [
      {
        "type": "file",
        "location": "/i18.html",
        "name": "richHTML",
        "mode": "spa",
        "icon": "tune"
      }
    ]
    window.localStorage.setItem('userInfoDialogMap', JSON.stringify(userInfoDialogMap));
    const mockSuccessResponse = {
      responseStatus: 200,
      timeoutmsg: 'success timeout',
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const wrapper = mount(<Router><Suspense><OpenResourceStaticPage /></Suspense></Router>);
    const component = wrapper.find("OpenResourceStaticPage").at(0);
    expect(component.find('span#leftStaticPagetitle').text()).toEqual('richHTML');
    expect(component.find('span#staticPageContent').text()).toEqual('');
  });
  it('verify for Static mounted location path and static file different', () => {
    window.location.hash = '/parag.html'
    const userInfoDialogMap = [
      {
        "type": "file",
        "location": "/i18.html",
        "name": "richHTML",
        "mode": "spa",
        "icon": "tune"
      }
    ]
    window.localStorage.setItem('userInfoDialogMap', JSON.stringify(userInfoDialogMap));
    const mockSuccessResponse = {
      responseStatus: 200,
      timeoutmsg: 'success timeout',
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const wrapper = mount(<Router><Suspense><OpenResourceStaticPage /></Suspense></Router>);
    const component = wrapper.find("OpenResourceStaticPage").at(0);
    expect(component.find('span#leftStaticPagetitle').text()).toEqual('');
    expect(component.find('span#staticPageContent').text()).toEqual('');
  });
  it('verify for failed apis', () => {
    window.location.hash = '/i18.html'
    const userInfoDialogMap = [
      {
        "type": "file",
        "location": "/i18.html",
        "name": "richHTML",
        "mode": "spa",
        "icon": "tune"
      }
    ]
    window.localStorage.setItem("designTemplate","system1-multiapp");
    window.localStorage.setItem('userInfoDialogMap', JSON.stringify(userInfoDialogMap));
    global.fetch = jest.fn(() =>
      Promise.reject({
        message: "fetch failed"
      })
    );
    mount(<Router><Suspense><OpenResourceStaticPage /></Suspense></Router>);
    // const component = wrapper.find("OpenResourceStaticPage").at(0);
    
  });
});
