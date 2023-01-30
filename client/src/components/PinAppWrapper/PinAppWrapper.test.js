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
import PinAppWrapper from './PinAppWrapper'
import {mount} from 'enzyme';
import '../../setupTests';


describe('Pin App wrapper test starts',()=>{
  const navigation=[
    {
        "id":"appbuilder",
         "name": "App Builder",
         "link": "/app-builder/",
         "icon": "warningrounded",
         "host": "https://sparq-qa.np-0000183.npause1.bakerhughes.com/appbuilder",
         "path":"/app-builder",
         "template":"/micro-app.html",
         "navService":"/nav",
         "default": true,
         "feedbackFlag": false,
         "visibility":true
       },
       {
        "id": "assetTree",
        "name": "Asset tree app",
        "link": "/asset-tree/",
        "icon": "archiverounded",
        "host": "https://appshell-dev.np-0000177.npause1.bakerhughes.com/asset-tree-app",
        "path": "/asset-tree",
        "template": "/index.html",
        "navService": "/nav",
        "default": false,
        "feedbackFlag": false,
        "visibility": true
      }
  
  ];
  const PinAppWrapperProps = { 
    "name": "PinAppWrapper",
    "id": "PinAppWrapper",
    "containerName":"pinapp-wrapper",
    "type": "component",
    "StylingAttributes": {
      "grid-column-start": "1",
      "grid-column-end": "2",
      "grid-row-start": "1",
      "grid-row-end": "5",
      "background":"white",
      "z-index": "2",
      "width": "58px"
    },
    "nested":true,
    "nestedElement":{
      "name": "Asset",
      "id": "assetTree",
      "type": "App",
      "StylingAttributes": {
        "z-index": "1"
      }
    }
  }
    it('hover and non hover events', () => {
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = mount(<PinAppWrapper id="assetTree" {...PinAppWrapperProps}/>);
        const test = component.find("PinAppWrapper").at(0);
        test.instance().onMouseEnter({detail: {width: "350px"}});
        test.instance().onMouseLeave({detail: {width: "58px"}});
        component.unmount();
    });
    it('Pin and unpin app', () => {
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        const component = mount(<PinAppWrapper id="assetTree" {...PinAppWrapperProps}/>);
        const test = component.find("PinAppWrapper").at(0);
        test.instance().setMainApp({type: 'pinapp-event'})
        test.instance().setMainApp({type: 'unpinapp-event'})
        component.unmount();
    });
    it('Template overlading test', () => {
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        const commonappImpacted = {"commonStylingUpdated": {"width": "58px"}}
        const component = mount(<PinAppWrapper id="assetTree" commonappImpacted={commonappImpacted} {...PinAppWrapperProps}/>);
        const test = component.find("PinAppWrapper").at(0);
        test.instance().setMainApp({type: 'pinapp-event'})
        test.instance().setMainApp({type: 'unpinapp-event'})
        component.unmount();
    });
    it('Testing with overlay layout', () => {
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        window.localStorage.setItem('designTemplate', 'overlay-layout');
        const component = mount(<PinAppWrapper id="assetTree" {...PinAppWrapperProps}/>);
        const test = component.find("PinAppWrapper").at(0);
        test.instance().onMouseEnter({detail: {width: "350px"}});
        component.find(".backdrop").simulate('click');
        component.unmount();
    });
});
