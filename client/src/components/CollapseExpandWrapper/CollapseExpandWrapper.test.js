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
import CollapseExpandWrapper from './CollapseExpandWrapper'
import {shallow,mount,render} from 'enzyme';
import '../../setupTests';
import ReactDOM from 'react-dom';
import { fireEvent } from '@testing-library/react';
import $ from "jquery";
describe('AppLoaderFrame non routable App',()=>{

  const wrapper = shallow(<CollapseExpandWrapper />)
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
        "id":"appbuilder",
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
  it('check setIsOpen function', () => {
      const CollapseExpandWrapperProps = {
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
        },
        "events":[{
          "type":"collapse",
          "useCustomScript":true,
          "mainSectionCss":{
            "grid-column-start": "1",
            "grid-column-end": "5",
            "grid-row-start": "1",
            "grid-row-end": "5",
            "customScript":"return function($){const marg='-'+$('.'+this.props.mainAppId).next().width()+'px';  $('.'+this.props.mainAppId).css({'margin-left':marg,transition : 'all 0.5s ease-in-out'});};"
          },
          "collpaseSectionCss":{
  
          }
        },
        {
          "type":"expand",
          "mainSectionCss":{
            "grid-column-start": "2",
            "grid-column-end": "5",
            "grid-row-start": "1",
            "grid-row-end": "5",
            "customScript":"return function(){const marg='-'+$('.'+this.props.mainAppId).next().width()+'px';  $('.'+this.props.mainAppId).css({'margin-left':'0px',transition : 'all 0.5s ease-in-out'});}"
          },
          "collpaseSectionCss":{
  
          }
        }
      ]
      };
      window.localStorage.setItem('navigation',JSON.stringify(navigation));
      const component = mount(<CollapseExpandWrapper id="appbuilder" {...CollapseExpandWrapperProps}/>);

      const test = component.find("CollapseExpandWrapper").at(0);
      test.instance().setIsOpen();
      test.instance().setIsOpen();

    
    });
  
  describe( 'css of main app on expand collpase', () => {
  const jQuery = jest.fn(() => ({
    css: jest.fn(),
    removeClass: jest.fn(),
    hasClass: jest.fn(),
    next:jest.fn()
  }));


  it( 'css updated', () => {
    const CollapseExpandWrapperProps = {
      name: "CollapseExpandWrapper",
      id: "CollapseExpandWrapper",
      mainAppId:"material-icons",
      type: "component",
      commonappImpacted: 
        {
          "originaterApp": "demoapp",
          "commonStylingUpdated": 
            {
                display : "block",
                "margin-top": "30px" 
            }
          ,
          "StylingAttributes": {
            "grid-column-start": "1",
            "grid-column-end": "5",
            "grid-row-start": "1",
            "grid-row-end": "5"
          }
        }
      ,
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
      },
      "events":[{
        "type":"collapse",
        "useCustomScript":true,
        "mainSectionCss":{
          "grid-column-start": "1",
          "grid-column-end": "5",
          "grid-row-start": "1",
          "grid-row-end": "5",
          "customScript":"return function($){const marg='-'+$('.'+this.props.mainAppId).next().width()+'px';  $('.'+this.props.mainAppId).css({'margin-left':marg,transition : 'all 0.5s ease-in-out'});};"
        },
        "collpaseSectionCss":{

        }
      },
      {
        "type":"expand",
        "mainSectionCss":{
          "grid-column-start": "2",
          "grid-column-end": "5",
          "grid-row-start": "1",
          "grid-row-end": "5",
          "customScript":"return function(){const marg='-'+$('.'+this.props.mainAppId).next().width()+'px';  $('.'+this.props.mainAppId).css({'margin-left':'0px',transition : 'all 0.5s ease-in-out'});}"
        },
        "collpaseSectionCss":{

        }
      }
    ]
    };
    window.localStorage.setItem('navigation',JSON.stringify(navigation));
    const component = mount(<CollapseExpandWrapper {...CollapseExpandWrapperProps}/>);
    const test = component.find("CollapseExpandWrapper").at(0);
    test.instance().setMainApp($,"collapse","test",320);
    
  
  });
});
    
 

});
