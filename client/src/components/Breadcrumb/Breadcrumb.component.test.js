/*************************************************
 * BH Highly Confidential
 * Unpublished Copyright 2021. Baker Hughes.
 *
 * NOTICE:  All information contained herein is, and remains the property of Baker Hughes, and/or
 * its affiliates.  The intellectual and technical concepts contained herein are proprietary to Baker Hughes
 * and/or its affiliates and may be covered by patents, copyrights, and/or trade secrets.  Dissemination of this information or
 * reproduction of this material is strictly forbidden unless prior written permission is obtained from Baker Hughes.
 **************************************************/

/* tslint:disable:no-unused-variable */
import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../setupTests';
import BreadcrumbComponent from './Breadcrumb.component';

describe('verify breadcrumb ', () => {

  it("should render initial layout", () => {
    window.getSelectedAppInfo = jest.fn().mockImplementation(()=>{ return {'menuItemId': "status"}});
    window.getMenuItemsList = jest.fn().mockImplementation((systemId)=>{ return {'context' : {'message':'share context'}}});
    const component = shallow(<BreadcrumbComponent />);
    expect(component.getElements()).toMatchSnapshot();
  });

  test('check bcItems initial state', () => {
    
    window.getSelectedAppInfo = jest.fn().mockImplementation(()=>{ return {'menuItemId': "status"}});
    window.getMenuItemsList = jest.fn().mockImplementation((systemId)=>{ return [{'context' : {'message':'share context'},'id':systemId}]});
    const wrapper = mount(<BreadcrumbComponent />);
    const component = wrapper.find("BreadcrumbComponent").at(0);
    expect(component.instance().state.bcItems).toEqual([]);
  });

  test('check bcItems state for single item', () => {
    
    let menuItemList = [{
      'default': true, 
      'host': "http://localhost:8084",
      'icon': "speedrounded",
      'id': "microapp1",
      'link': "/Kpi-app/",
      'name': "Kpi",
      'navService': "/nav",
      'order': 0,
      'path': "/kpi-app",
      'menuItemId': "status",
      'template': "/index.html",
      'visibility': true
    }];
    let selectedNavAppinfo = {
      'default': true, 
      'host': "http://localhost:8084",
      'icon': "speedrounded",
      'id': "microapp1",
      'link': "/Kpi-app/",
      'name': "Kpi",
      'navService': "/nav",
      'order': 0,
      'path': "/kpi-app",
      'menuItemId': "status",
      'template': "/index.html",
      'visibility': true
    }
    window.getSelectedAppInfo = jest.fn().mockImplementation(()=>{ return selectedNavAppinfo});
    window.getMenuItemsList = jest.fn().mockImplementation((menuItemId) => { return menuItemList });
    const wrapper = mount(<BreadcrumbComponent />);
    const component = wrapper.find("BreadcrumbComponent").at(0);
    const context = {id: '123', name: 'root'};
    const object = {body: context, eventName: 'hierarchy.onNodeClickPath'};
    const event = new CustomEvent("shareContext", {
      detail: object,
      bubbles: true,
      cancelable: true
    });
    const option = {
      default: true,
      host: 'http://localhost:8084',
      icon: 'speedrounded',
      id: 'microapp1',
      link: '/Kpi-app/',
      name: 'Kpi',
      navService: '/nav',
      order: 0,
      path: '/kpi-app',
      menuItemId: 'status',
      template: '/index.html',
      visibility: true
    }
    component.instance().updateBcItems(event);
    component.instance().componentWillUnmount();
    component.instance().handleOptionClick(option);
    component.instance().handleChange(event,1,0);
    component.instance().updateDropdown(event);
    expect(component.instance().state.bcItems).toEqual([context]);
  });
  
  test('check bcItems state for multiple/path item', () => {
    
    window.getSelectedAppInfo = jest.fn().mockImplementation(()=>{ return {'menuItemId':'status'}});
    window.getMenuItemsList = jest.fn().mockImplementation((systemId)=>{ return [{'context' : {'message':'share context'},'id':systemId}]});
    const wrapper = mount(<BreadcrumbComponent />);
    const component = wrapper.find("BreadcrumbComponent").at(0);
    const context = [{id: '123', name: 'root'}, {id: '124', name: 'asset'}];
    const object = {body: context, eventName: 'hierarchy.onNodeClickPath'};
    const event = new CustomEvent("shareContext", {
      detail: object,
      bubbles: true,
      cancelable: true
    });
    component.instance().updateBcItems(event);
    expect(component.instance().state.bcItems.length).toEqual(2);
    expect(component.instance().state.bcItems).toEqual(context);
  });

  test('check bcItems state for click item handler', () => {
    window.getSelectedAppInfo = jest.fn().mockImplementation(()=>{ return {'menuItemId': "status"}});
    window.getMenuItemsList = jest.fn().mockImplementation((systemId)=>{ return [{'context' : {'message':'share context'},'id':systemId}]});
    const wrapper = mount(<BreadcrumbComponent />);
    const component = wrapper.find("BreadcrumbComponent").at(0);
    const context = [{id: '123', name: 'root'}, {id: '124', name: 'asset'},{id: '125', name: 'map'}];
    const object = {body: context, eventName: 'hierarchy.onNodeClickPath'};
    const event = new CustomEvent("shareContext", {
      detail: object,
      bubbles: true,
      cancelable: true
    });
    component.instance().updateBcItems(event);
    expect(component.instance().state.bcItems.length).toEqual(3);
    expect(component.instance().state.bcItems).toEqual(context);

    window.parent.postMessage = jest.fn();
    const bcItem = {id: '123', name: 'root'};
    component.instance().itemClickHandler(bcItem, 0);
    expect(window.parent.postMessage).toBeCalled();
    expect(component.instance().state.bcItems.length).toEqual(1);
    expect(component.instance().state.bcItems).toEqual([bcItem]);
  });
   test('check multiple option render', () => {
    
    let menuItemList = [{
      'default': true, 
      'host': "http://localhost:8084",
      'icon': "speedrounded",
      'id': "microapp1",
      'link': "/Kpi-app/",
      'name': "Kpi",
      'navService': "/nav",
      'order': 0,
      'path': "/kpi-app",
      'menuItemId': "status",
      'template': "/index.html",
      'visibility': true,
      'displayTextId': 'Microapp 1'
    },
    {
      'default': false, 
      'host': "http://localhost:8085",
      'icon': "speedrounded",
      'id': "microapp2",
      'link': "/Map-app/",
      'name': "Map",
      'navService': "/nav",
      'order': 0,
      'path': "/map-app",
      'menuItemId': "status",
      'template': "/index.html",
      'visibility': true
    }];
    let selectedNavAppinfo = {
      'default': true, 
      'host': "http://localhost:8084",
      'icon': "speedrounded",
      'id': "microapp1",
      'link': "/Kpi-app/",
      'name': "Kpi",
      'navService': "/nav",
      'order': 0,
      'path': "/kpi-app",
      'menuItemId': "status",
      'template': "/index.html",
      'visibility': true
    }
    window.localStorage.setItem('permissions','[{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1","access":"enabled"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632dv","rsname":"microapp2","access":"disabled"}]');
    window.getSelectedAppInfo = jest.fn().mockImplementation(()=>{ return selectedNavAppinfo});
    window.getMenuItemsList = jest.fn().mockImplementation((menuItemId) => { return menuItemList });
    mount(<BreadcrumbComponent />);
    window.i18Resources = '';
    mount(<BreadcrumbComponent />);
  });
});
