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
import CommonComponent from './CommonComponent'
import {shallow,mount,render} from 'enzyme';
import '../../setupTests';
import ReactDOM from 'react-dom';
import { fireEvent } from '@testing-library/react';
describe('AppLoaderFrame non routable App',()=>{
    const wrapper = shallow(<CommonComponent />)
    const instance = wrapper.instance();
    
    const navigation=[
      {
          "id":"assetTree",
          "name": "Asset Dashboard",
          "link": "/asset-dashboard/",
          "icon": "speedrounded",
          "host": "https://ofe-dev-nginx-lb01-1933176829.us-west-2.elb.amazonaws.com",
          "path":"/asset-dashboard",
          "template":"/index.html",
          "navService":"/nav",
          "default": true,
          "feedbackFlag":true,
          "visibility":true,
          "displayTextId":"dashboard",
          "menuItemId":'cases'
        },
        
        {
          "id":"CollapseExpandWrapper",
          "name": "App Builder",
          "link": "/app-builder/",
          "icon": "warningrounded",
          "host": "https://cde-sc-nginx-dev01-elb01-238862697.us-west-2.elb.amazonaws.com/appbuilder",
          "path":"/app-builder",
          "template":"/index.html",
          "navService":"/nav",
          "displayTextId":"dashboard",
          "default": false,
          "visibility":false
        }
    
    ];
    it('verify for Apps properties are getting set correctly',()=>{
      const CommonComponentProps = {
        name: "CollapseExpandWrapper",
        id: "CollapseExpandWrapper",
        type: "App",
        StylingAttributes: {
            "col-start": "1",
            "col-end": "2",
            "row-sart": "1",
            "row-end": "3"
        },
        nested: "true",
        nestedElement: {
          name: "Asset tree app",
          id : "assetTree",
          type : "App",
          StylingAttributes : {
              "grid-column-start": "1",
              "grid-column-end": "2",
              "grid-row-start": "1",
              "grid-row-end": "5",
              "background": "white",
              "border": "1px solid black",
              "margin-top": "30px"
          }
        }
      };
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = mount(<CommonComponent {...CommonComponentProps} />);
        //console.log("State",component.state());
        expect(component.prop('type')).toBe("App");
       
    }); 
    
    it('verify for component properties are getting set correctly',()=>{
      const CommonComponentProps = {
        name: "CollapseExpandWrapper",
        id: "CollapseExpandWrapper",
        type: "component",
        StylingAttributes: {
            "col-start": "1",
            "col-end": "2",
            "row-sart": "1",
            "row-end": "3"
        },
        nested: "true",
        nestedElement: {
          name: "Asset tree app",
          id : "assetTree",
          type : "App",
          StylingAttributes : {
              "grid-column-start": "1",
              "grid-column-end": "2",
              "grid-row-start": "1",
              "grid-row-end": "5",
              "background": "white",
              "border": "1px solid black",
              "margin-top": "30px"
          }
        }
      };
      window.localStorage.setItem('navigation',JSON.stringify(navigation));
      const component = mount(<CommonComponent {...CommonComponentProps} />);
      //console.log("State",component.state());
      expect(component.prop('id')).toBe("CollapseExpandWrapper");
     
  });
  
  it('verify when CustomCommonComponent is set component is not lazy loaded',()=>{
    const CommonComponentProps = {
      name: "CollapseExpandWrapper",
      id: "CollapseExpandWrapper",
      type: "component",
      StylingAttributes: {
          "col-start": "1",
          "col-end": "2",
          "row-sart": "1",
          "row-end": "3"
      },
      nested: "true",
      nestedElement: {
        name: "Asset tree app",
        id : "assetTree",
        type : "App",
        StylingAttributes : {
            "grid-column-start": "1",
            "grid-column-end": "2",
            "grid-row-start": "1",
            "grid-row-end": "5",
            "background": "white",
            "border": "1px solid black",
            "margin-top": "30px"
        }
      }
    };
    window.localStorage.setItem('navigation',JSON.stringify(navigation));
    const component = mount(<CommonComponent {...CommonComponentProps} />);
    const component1 = mount(<CommonComponent {...CommonComponentProps} />);
    expect(component1.prop('id')).toBe("CollapseExpandWrapper");
   
});

});