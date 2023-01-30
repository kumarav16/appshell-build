import React from 'react';
import {mount, shallow} from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import HeaderSet  from './HeaderHoc';
import HorizontalHead from './HorizontalHead';
import VerticalHead from './VerticalHead'
import FeedbackPopup from '../../FeedbackPopup';
import BhNotification from '../BhNotification/BhNotification';
import _ from "lodash";

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
const menuItems =[{
  'id':'cases',
  'name':'case',
  "displayTextId":"cases",
  'default':'dashboard'
}]
const props = {
  location: {
    pathname:"/asset-dashboard/"
   },
   userInfo:{},
   isOpen:true

};
const props2 = {
  location: {
    pathname:"/asset-dashboard/"
   },
   userInfo: {
      "name": "funcuser01",
      "email": "funcuser@bh.com",
      "title": [
        "F",
        "U"
      ],
      "firstName": "Func",
      "lastName": "User"
    },
   isOpen:true

};

const notificationHeadermenuConfig = [
  {
    "id": "notifications",
    "type": "popup",
    "tooltipText": "Notifications",
    "toolTipTextId": "Notifications",
    "icon": "notifications_none",
    "order": "2",
    "config": {
      "serviceId": "advanceNotification",
      "config": "advanceNotificationMeta",
      "type": "notifications"
    }
}];

const advanceNotificationMeta = {
  "filter": {
    "filterOptions": [
      {
        "value": "low",
        "label": "Low"
      },
      {
        "value": "high",
        "label": "High"
      },
      {
        "value": "all",
        "label": "All"
      }
    ]
  },
  "tabMenu": true,
  "softDelete": true,
  "viewAll": {
    "navigationObject": {
      "mode": "spa",
      "appName": "appbuilder"
    }
  },
  "timeSettings": {
    "recent": 1566266635
  },
  "pollNotificationTimeInterval": 300000
};

describe('HOC Component testing begins',()=>{
       window.localStorage.setItem('permissions','[{"rsid":"5cc4a8cf-5555-4991-9b5b-add314bc2dcb","rsname":"usermanagement-appbuilder"},{"rsid":"9e0650a0-5859-49ba-b475-c3dd5711da37","rsname":"userManagementAdminConsole"},{"rsid":"efa77ac0-7122-4ef7-affb-d37ebd540656","rsname":"keycloakAdminConsole"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1"},{"rsid":"09110955-4ea0-4f89-ba5e-c5fabd886a95","rsname":"demoapp"},{"rsid":"12b750e4-f119-4b43-890d-76cdf1dab9b0","rsname":"rdc"},{"rsid":"acea652a-0ec5-4aee-9b35-361391ec3080","rsname":"postman2"},{"rsid":"7fefd599-8489-4f5c-8960-0653b4edbf3e","rsname":"appbuilder"},{"scopes":["view","edit"],"rsid":"08135af7-dbd6-4fb4-8402-db269cf52b3d","rsname":"eventApp"},{"rsid":"9b19fee2-b2bc-4cfe-98f0-7cf6c141eea2","rsname":"spsDashboard"},{"scopes":["view","edit","delete"],"rsid":"d7091a30-a71a-4562-aba9-a5b284eb00b1","rsname":"userprofileapp"},{"rsid":"5fc8e2bf-0682-435a-a0e5-04247bab5cbc","rsname":"test2"},{"rsid":"c0522bab-cee7-4c62-bf2b-5b1a29c288ca","rsname":"appbuilder22"},{"rsid":"776d08ef-8956-487a-bcc9-e78dba0df955","rsname":"postman1"},{"scopes":["view"],"rsid":"fc0961be-dc5e-4b1a-b0e8-a7e7cef6c855","rsname":"statusApp"},{"rsid":"83329121-3a3b-4f15-ac50-3a78b29a4da1","rsname":"s1ei-ui-hierarchy-modes"},{"rsid":"46fcc576-e98d-47ae-8b9d-ed44a4747fe7","rsname":"Default Resource"},{"rsid":"5eacbd66-2202-44aa-a52e-f0bc507e60e0","rsname":"usermanagement"},{"scopes":["view","edit"],"rsid":"94df187c-520f-4fee-965e-84e6ddda76b2","rsname":"assetTree"},{"rsid":"fbc3c49d-c55c-45cb-99c3-e34ea5688ef9","rsname":"dremio"},{"rsid":"439577cb-772e-4daa-8d19-a93eeb807139","rsname":"reportbuilder"}]');
       it("handle logout working with response 200",()=>{
        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
          result:[{"title":"test1"},{"title":"test2"}],
          count:5
        };
        window.location.hash= "##app-builder/"
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        document.body.innerHTML = `<html><head id='myheader'></head><body><div><iframe data-testid="app-frame-container" class="wrapper" title="wrapper" frameborder="0" id="iframeWrapper"><html><body><div class="frame-root"><div class="frame-content"><div data-testid="app-frame">
        <meta charset="utf-8">
        <title>AppshellSampleApp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        </div></div></div></body></html></iframe></div></body></html>`
        const item={"id":1 , "annoucementData":{"id":2}};
        const e = "event";
        window.localStorage.setItem('UserInfo',JSON.stringify({'email':'abc@xyz.com'}));
        window.localStorage.setItem('productName',"appshell");
        window.localStorage.setItem('microapps',JSON.stringify(navigation));
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('userInfoDialogMap',JSON.stringify([{"profileMenuName": "Demo App","profileMenuPath": "/demo-app/"},{"profileMenuName": "App Builder","profileMenuPath": "/app-builder/"}]));
     
        window.getSelectedAppInfo = jest.fn().mockImplementation(()=>{ return {'menuItemId': "status"}});
        window.getMenuItemsList = jest.fn().mockImplementation((systemId)=>{ return {'context' : {'message':'share context'}}});
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
        const component = mount(<Router><HorizontalHead {...props}/></Router>);
       const board = component.find("HorizontalHead").at(0);
       window.getMenuItemsList('status');
       board.instance().viewNotification(e,item);
       board.instance().getAllNotifications();
       board.instance().props.handleLogout();
       board.instance().componentWillUnmount();
       
      //  expect(global.fetch).toHaveBeenCalled();
      /*  expect(global.fetch).toHaveBeenCalledWith('/auth/logout', {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          });*/
          var resiult=localStorage.getItem('logoutSuccess');
          expect(resiult).toBeNull();
           global.fetch.mockClear();
           window.location.hash="#"
           window.localStorage.removeItem('productName');
      });    

      it("Verify if current appname updated",()=>{
        const navigation1=[
          {
              "id":"dashboard",
              "name": "Asset Dashboard",
              "link": "/asset-dashboard/",
              "icon": "speedrounded",
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
              "id":"map",
              "name": "MAP",
              "link": "/map/",
              "icon": "speedrounded",
              "host": "https://ofe-dev-nginx-lb01-1933176829.us-west-2.elb.amazonaws.com",
              "path":"/map",
              "template":"/index.html",
              "navService":"/nav",
              "default": false,
              "feedbackFlag":true,
              "visibility":true,
              "menuItemId":'maps'
            },
            {
              "id":"dashboard_1",
              "name": "Asset Dashboard_1",
              "link": "/asset-dashboard1/",
              "icon": "speedrounded",
              "host": "https://ofe-dev-nginx-lb01-1933176829.us-west-2.elb.amazonaws.com",
              "path":"/asset-dashboard1",
              "template":"/index.html",
              "navService":"/nav",
              "default": false,
              "feedbackFlag":true,
              "visibility":true,
              "menuItemId":'cases'
            },
            
        
        ];
        const menuItems1 =[{
          'id':'cases',
          'name':'case',
          "displayTextId":"cases",
          'default':'dashboard'
        },{
          'id':'maps',
          'name':'maps',
          'default':'map'
        }]
       const event={
        preventDefault:()=>{},
        currentTarget:''
        }
        const ev = {
          detail:{'id':'kpiId','menuItemId':'status'}
        }
        const evn = {
          detail:{'id':'kpiId'}
        }
        document.body.innerHTML = `<html><head id='myheader'></head><body><div><iframe data-testid="app-frame-container" class="wrapper" title="wrapper" frameborder="0" id="iframeWrapper"><html><body><div class="frame-root"><div class="frame-content"><div data-testid="app-frame">
            <meta charset="utf-8">
            <title>AppshellSampleApp</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <div id='completesnapshot'><h1>test</h1><body>screen capture</body></div>
            </div></div></div></body></html></iframe></div></body></html>`
        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
          result:[]
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
         window.localStorage.setItem('navigation',JSON.stringify(navigation1));
         window.localStorage.setItem('menuItems',JSON.stringify(menuItems1));
         window.localStorage.setItem('permissions','[{"rsid":"5cc4a8cf-5555-4991-9b5b-add314bc2dcb","rsname":"usermanagement-appbuilder"},{"rsid":"9e0650a0-5859-49ba-b475-c3dd5711da37","rsname":"userManagementAdminConsole"},{"rsid":"efa77ac0-7122-4ef7-affb-d37ebd540656","rsname":"keycloakAdminConsole"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1"},{"rsid":"09110955-4ea0-4f89-ba5e-c5fabd886a95","rsname":"demoapp"},{"rsid":"12b750e4-f119-4b43-890d-76cdf1dab9b0","rsname":"rdc"},{"rsid":"acea652a-0ec5-4aee-9b35-361391ec3080","rsname":"postman2"},{"rsid":"7fefd599-8489-4f5c-8960-0653b4edbf3e","rsname":"appbuilder"},{"scopes":["view","edit"],"rsid":"08135af7-dbd6-4fb4-8402-db269cf52b3d","rsname":"eventApp"},{"rsid":"9b19fee2-b2bc-4cfe-98f0-7cf6c141eea2","rsname":"spsDashboard"},{"scopes":["view","edit","delete"],"rsid":"d7091a30-a71a-4562-aba9-a5b284eb00b1","rsname":"userprofileapp"},{"rsid":"5fc8e2bf-0682-435a-a0e5-04247bab5cbc","rsname":"test2"},{"rsid":"c0522bab-cee7-4c62-bf2b-5b1a29c288ca","rsname":"appbuilder22"},{"rsid":"776d08ef-8956-487a-bcc9-e78dba0df955","rsname":"postman1"},{"scopes":["view"],"rsid":"fc0961be-dc5e-4b1a-b0e8-a7e7cef6c855","rsname":"statusApp"},{"rsid":"83329121-3a3b-4f15-ac50-3a78b29a4da1","rsname":"s1ei-ui-hierarchy-modes"},{"rsid":"46fcc576-e98d-47ae-8b9d-ed44a4747fe7","rsname":"Default Resource"},{"rsid":"5eacbd66-2202-44aa-a52e-f0bc507e60e0","rsname":"usermanagement"},{"scopes":["view","edit"],"rsid":"94df187c-520f-4fee-965e-84e6ddda76b2","rsname":"assetTree"},{"rsid":"fbc3c49d-c55c-45cb-99c3-e34ea5688ef9","rsname":"dremio"},{"rsid":"439577cb-772e-4daa-8d19-a93eeb807139","rsname":"reportbuilder"}]');
         window.getSelectedAppInfo = jest.fn().mockImplementation(()=>{ return {'menuItemId': "status"}});
         const component = mount(<Router><HorizontalHead {...props}/></Router>);
         const board = component.find("HorizontalHead").at(0);
         board.instance().changeSelectedApp(ev);
         board.instance().changeSelectedApp(evn);
         board.instance().handleListItemClick(event,'status',ev);
         board.instance().handleListItemClick(event,'',ev);
         component.find("button#captureButton").simulate('click');
         component.find("button#completesnapshotDombtn").simulate('click');
         board.instance().closeFeedback();
         board.instance().getAllNotifications();
         board.instance().setFeedbackPopupOpen(true);
         expect(board.state().Fkopen).toBeTruthy();
         board.instance().getApphandleClick('feedback');
         //board.instance().SnapremoveDomImage();
         //board.instance().handleNotificationClose();
      })
      it("Verify getAllNotification failed API",()=>{
        const event={
          preventDefault:()=>{},
          currentTarget:''
          }
          const ev = {
            detail:{'id':'kpiId','systemId':'status'}
          }
          document.body.innerHTML = `<html><head id='myheader'></head><body><div><iframe data-testid="app-frame-container" class="wrapper" title="wrapper" frameborder="0" id="iframeWrapper"><html><body><div class="frame-root"><div class="frame-content"><div data-testid="app-frame">
              <meta charset="utf-8">
              <title>AppshellSampleApp</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <div id='completesnapshot'><h1>test</h1><body>screen capture</body></div>
              </div></div></div></body></html></iframe></div></body></html>`
          const mockSuccessResponse = {
            responseStatus:401,
            message:'success'
          };
          const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
          const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
          });
          jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
           window.localStorage.setItem('navigation',JSON.stringify(navigation));
           window.localStorage.setItem('permissions','[{"rsid":"5cc4a8cf-5555-4991-9b5b-add314bc2dcb","rsname":"usermanagement-appbuilder"},{"rsid":"9e0650a0-5859-49ba-b475-c3dd5711da37","rsname":"userManagementAdminConsole"},{"rsid":"efa77ac0-7122-4ef7-affb-d37ebd540656","rsname":"keycloakAdminConsole"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1"},{"rsid":"09110955-4ea0-4f89-ba5e-c5fabd886a95","rsname":"demoapp"},{"rsid":"12b750e4-f119-4b43-890d-76cdf1dab9b0","rsname":"rdc"},{"rsid":"acea652a-0ec5-4aee-9b35-361391ec3080","rsname":"postman2"},{"rsid":"7fefd599-8489-4f5c-8960-0653b4edbf3e","rsname":"appbuilder"},{"scopes":["view","edit"],"rsid":"08135af7-dbd6-4fb4-8402-db269cf52b3d","rsname":"eventApp"},{"rsid":"9b19fee2-b2bc-4cfe-98f0-7cf6c141eea2","rsname":"spsDashboard"},{"scopes":["view","edit","delete"],"rsid":"d7091a30-a71a-4562-aba9-a5b284eb00b1","rsname":"userprofileapp"},{"rsid":"5fc8e2bf-0682-435a-a0e5-04247bab5cbc","rsname":"test2"},{"rsid":"c0522bab-cee7-4c62-bf2b-5b1a29c288ca","rsname":"appbuilder22"},{"rsid":"776d08ef-8956-487a-bcc9-e78dba0df955","rsname":"postman1"},{"scopes":["view"],"rsid":"fc0961be-dc5e-4b1a-b0e8-a7e7cef6c855","rsname":"statusApp"},{"rsid":"83329121-3a3b-4f15-ac50-3a78b29a4da1","rsname":"s1ei-ui-hierarchy-modes"},{"rsid":"46fcc576-e98d-47ae-8b9d-ed44a4747fe7","rsname":"Default Resource"},{"rsid":"5eacbd66-2202-44aa-a52e-f0bc507e60e0","rsname":"usermanagement"},{"scopes":["view","edit"],"rsid":"94df187c-520f-4fee-965e-84e6ddda76b2","rsname":"assetTree"},{"rsid":"fbc3c49d-c55c-45cb-99c3-e34ea5688ef9","rsname":"dremio"},{"rsid":"439577cb-772e-4daa-8d19-a93eeb807139","rsname":"reportbuilder"}]');
           window.getSelectedAppInfo = jest.fn().mockImplementation(()=>{ return {'menuItemId': "status"}});
           const component = mount(<Router><HorizontalHead {...props}/></Router>);
           const board = component.find("HorizontalHead").at(0);
           board.state().notificationsError = true;
           board.instance().getAllNotifications();
           board.instance().announcementsClose();
           board.instance().toggleNotificationsMenu();
           board.instance().getApphandleClick('notifications');
           expect(board.state().notificationsError).toBeTruthy();
        })
      it("open modal feedback",()=>{
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
          result:[{"title":"test1"},{"title":"test2"}],
          count:5
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        window.localStorage.setItem('productName',"appshell");
        window.localStorage.setItem('UserInfo',JSON.stringify({'email':'abc@xyz.com'}));
        const component = mount(<Router><VerticalHead {...props}/></Router>);
        const board = component.find("VerticalHead").at(0);
        let event = {
          preventDefault: function() {
            return true
          }
        }
        board.instance().openCommentBox(event);
        board.instance().getAllNotifications();
        board.instance().handleNotificationClose();
        window.localStorage.removeItem('productName');
        window.localStorage.removeItem('UserInfo');
      });
      it("test for condition",()=>{

        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
          result:[{"title":"test1"},{"title":"test2"}],
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        window.localStorage.setItem('UserInfo',JSON.stringify({'email':'abc@xyz.com'}));
        window.localStorage.setItem('permissions','[{"rsid":"5cc4a8cf-5555-4991-9b5b-add314bc2dcb","rsname":"usermanagement-appbuilder"},{"rsid":"9e0650a0-5859-49ba-b475-c3dd5711da37","rsname":"userManagementAdminConsole"},{"rsid":"efa77ac0-7122-4ef7-affb-d37ebd540656","rsname":"keycloakAdminConsole"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1"},{"rsid":"09110955-4ea0-4f89-ba5e-c5fabd886a95","rsname":"demoapp"},{"rsid":"12b750e4-f119-4b43-890d-76cdf1dab9b0","rsname":"rdc"},{"rsid":"acea652a-0ec5-4aee-9b35-361391ec3080","rsname":"postman2"},{"rsid":"7fefd599-8489-4f5c-8960-0653b4edbf3e","rsname":"appbuilder"},{"scopes":["view","edit"],"rsid":"08135af7-dbd6-4fb4-8402-db269cf52b3d","rsname":"eventApp"},{"rsid":"9b19fee2-b2bc-4cfe-98f0-7cf6c141eea2","rsname":"spsDashboard"},{"scopes":["view","edit","delete"],"rsid":"d7091a30-a71a-4562-aba9-a5b284eb00b1","rsname":"userprofileapp"},{"rsid":"5fc8e2bf-0682-435a-a0e5-04247bab5cbc","rsname":"test2"},{"rsid":"c0522bab-cee7-4c62-bf2b-5b1a29c288ca","rsname":"appbuilder22"},{"rsid":"776d08ef-8956-487a-bcc9-e78dba0df955","rsname":"postman1"},{"scopes":["view"],"rsid":"fc0961be-dc5e-4b1a-b0e8-a7e7cef6c855","rsname":"statusApp"},{"rsid":"83329121-3a3b-4f15-ac50-3a78b29a4da1","rsname":"s1ei-ui-hierarchy-modes"},{"rsid":"46fcc576-e98d-47ae-8b9d-ed44a4747fe7","rsname":"Default Resource"},{"rsid":"5eacbd66-2202-44aa-a52e-f0bc507e60e0","rsname":"usermanagement"},{"scopes":["view","edit"],"rsid":"94df187c-520f-4fee-965e-84e6ddda76b2","rsname":"assetTree"},{"rsid":"fbc3c49d-c55c-45cb-99c3-e34ea5688ef9","rsname":"dremio"},{"rsid":"439577cb-772e-4daa-8d19-a93eeb807139","rsname":"reportbuilder"}]');
        window.i18Resources = "";
        const component = mount(<Router><HorizontalHead {...props}/></Router>);
        const board = component.find("HorizontalHead").at(0);
        const logoutComponet = board.find("LogoutConfirmationDialog");
        logoutComponet.props().onConfirm();
        window.localStorage.removeItem('UserInfo');
        board.instance().getAllNotifications();
        //board.instance().setCommentBoxOpen(true);
        window.localStorage.removeItem('UserInfo');
      });
      it("set modal feedback open",()=>{
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
          result:[]
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        window.localStorage.setItem('UserInfo',JSON.stringify({'email':'abc@xyz.com'}));
        window.i18Resources = {"lang":"en"};
        const component = mount(<Router><VerticalHead {...props}/></Router>);
        const board = component.find("VerticalHead").at(0);
        board.instance().getAllNotifications();
        board.instance().setCommentBoxOpen(true);
        window.localStorage.removeItem('UserInfo');
      });
      it("feedback added with response 200",()=>{
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        const mockSuccessResponse = {
          responseStatus:200,
          message:'Feedback added successfully'
    
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
        window.i18Resources = "";
       const component = mount(<Router><VerticalHead {...props}/></Router>);
       const board = component.find("VerticalHead").at(0);
       board.instance().callFeedbackService();
       board.instance().getAllNotifications();
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('/api/feedback', {
            method: 'POST',
            headers: 
            {
              'Content-Type': 'application/json'
            },
          });
      });
      it("open modal working",()=>{
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        document.body.innerHTML = `<html><head id='myheader'></head><body><div class="grid-container"><iframe data-testid="app-frame-container" class="wrapper" title="wrapper" frameborder="0" id="iframeWrapper"><html><body><div class="frame-root"><div class="frame-content"><div data-testid="app-frame">
              <meta charset="utf-8">
              <title>AppshellSampleApp</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <div id='completesnapshot'><h1>test</h1><body>screen capture</body></div>
              </div></div></div></body></html></iframe></div></body></html>`
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        window.localStorage.setItem('UserInfo',JSON.stringify({'email':'abc@xyz.com'}));
        window.i18Resources = {"lang":"en"};
            const component = mount(<Router><VerticalHead {...props}/></Router>);
            const board = component.find("VerticalHead").at(0);
            board.instance().handleDrawerOpen();
            expect(board.state().open).toBeTruthy();
            window.localStorage.removeItem('UserInfo');
        });
      it("close modal working",()=>{
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
        };
        document.body.innerHTML = `<html><head id='myheader'></head><body><div class="grid-container"><iframe data-testid="app-frame-container" class="wrapper" title="wrapper" frameborder="0" id="iframeWrapper"><html><body><div class="frame-root"><div class="frame-content"><div data-testid="app-frame">
              <meta charset="utf-8">
              <title>AppshellSampleApp</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <div id='completesnapshot'><h1>test</h1><body>screen capture</body></div>
              </div></div></div></body></html></iframe></div></body></html>`
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        window.localStorage.setItem('UserInfo',JSON.stringify({'email':'abc@xyz.com'}));
            const component = mount(<Router><VerticalHead {...props}/></Router>);
            const board = component.find("VerticalHead").at(0);
            board.instance().handleDrawerClose();
            expect(board.state().open).toBeFalsy();
            window.localStorage.removeItem('UserInfo');
        
        });
      it("get screenshot",()=>{
        let date = new Date();
        let body = {
          user_name: '',
          timestamp: date.getTime(),
          feedback: "Add this as a feedback",
          screenshot: ''
      }
      window.localStorage.setItem('navigation',JSON.stringify(navigation));
      window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        document.body.innerHTML = `<html><body><div><iframe data-testid="app-frame-container" class="wrapper" title="wrapper" frameborder="0" id="iframeWrapper"><html><body><div class="frame-root"><div class="frame-content"><div data-testid="app-frame">
        <meta charset="utf-8">
        <title>AppshellSampleApp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <div id='completesnapshot'><h1>test</h1><body>screen capture</body></div>
        </div></div></div></body></html></iframe></div></body></html>`
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        const list = { hasChildNodes : () =>{return true}};
        window.localStorage.setItem('UserInfo',JSON.stringify({'email':'abc@xyz.com'}));
          const component = mount(<Router><VerticalHead {...props}/></Router>);
          const board = component.find("VerticalHead").at(0);
          board.instance().getApphandleClick('notifications');
          //board.instance().SnapremoveDomImage(list);
          board.instance().submitComment(body);
          window.localStorage.removeItem('UserInfo');
      }); 
      it("get checkfeedbackflag",()=>{
        const props={location:{pathname:"/asset-dashboard/"},userInfo:{title:"abc"}};
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
          result:[{"title":"test1"},{"title":"test2"}]
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('UserInfo',JSON.stringify({'email':'abc@xyz.com'}));
        const item={"id":1 , "annoucementData":{"id":2}};
        const e = "event";
          const component = mount(<Router><VerticalHead {...props}/></Router>);
          const board = component.find("VerticalHead").at(0);
          const result=board.instance().checkFeedbackFlag();
          board.instance().viewNotification(e,item);
          board.instance().announcementsClose();
          board.instance().closeFeedback();
          board.instance().setFeedbackPopupOpen(true);
          board.instance().toggleNotificationsMenu();
          board.instance().getAllNotifications();
          expect(board.state().Fkopen).toBeTruthy();
          expect(result).toBeTruthy();
          board.instance().getComDomScreenshotHandler();
          board.instance().getApphandleClick('feedback');
          window.localStorage.removeItem('UserInfo');
          
      });   
      it('Get Opera bowser',()=>{
        navigator.__defineGetter__('userAgent', function(){
          return "Opera Version/8;" // customized user agent
        });
        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        window.localStorage.setItem('UserInfo',JSON.stringify({'email':'abc@xyz.com'}));
          const component = mount(<Router><VerticalHead {...props}/></Router>);
          const board = component.find("VerticalHead").at(0);
          const result=board.instance().checkFeedbackFlag();
          expect(result).toBeTruthy();
          window.localStorage.removeItem('UserInfo');
      });
      it('Get MSIE bowser',()=>{
        navigator.__defineGetter__('userAgent', function(){
        return "MSIE" // customized user agent
        });
        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        window.localStorage.setItem('UserInfo',JSON.stringify({'email':'abc@xyz.com'}));
          const component = mount(<Router><VerticalHead {...props}/></Router>);
          const board = component.find("VerticalHead").at(0);
          const result=board.instance().checkFeedbackFlag();
          expect(result).toBeTruthy();
          window.localStorage.removeItem('UserInfo');
      });
      it('Get Chrome bowser',()=>{
        navigator.__defineGetter__('userAgent', function(){
        return "Chrome" // customized user agent
        });
        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        window.localStorage.setItem('UserInfo',JSON.stringify({'email':'abc@xyz.com'}));
          const component = mount(<Router><VerticalHead {...props}/></Router>);
          const board = component.find("VerticalHead").at(0);
          const result=board.instance().checkFeedbackFlag();
          expect(result).toBeTruthy();
          window.localStorage.removeItem('UserInfo');
      });
      it('Get Safari bowser',()=>{
        navigator.__defineGetter__('userAgent', function(){
        return "Safari Version/8 " // customized user agent
        });
        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        window.localStorage.setItem('UserInfo',JSON.stringify({'email':'abc@xyz.com'}));
          const component = mount(<Router><VerticalHead {...props}/></Router>);
          const board = component.find("VerticalHead").at(0);
          const result=board.instance().checkFeedbackFlag();
          expect(result).toBeTruthy();
          window.localStorage.removeItem('UserInfo');

      });
      it('Get Firefox bowser',()=>{
        navigator.__defineGetter__('userAgent', function(){
          return "Firefox" // customized user agent
        });
        const mockSuccessResponse = {
          responseStatus:200,
          message:'success',
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('navigation',JSON.stringify(navigation));
        window.localStorage.setItem('permissions','[{"rsid":"5cc4a8cf-5555-4991-9b5b-add314bc2dcb","rsname":"usermanagement-appbuilder"},{"rsid":"9e0650a0-5859-49ba-b475-c3dd5711da37","rsname":"userManagementAdminConsole"},{"rsid":"efa77ac0-7122-4ef7-affb-d37ebd540656","rsname":"keycloakAdminConsole"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1"},{"rsid":"09110955-4ea0-4f89-ba5e-c5fabd886a95","rsname":"demoapp"},{"rsid":"12b750e4-f119-4b43-890d-76cdf1dab9b0","rsname":"rdc"},{"rsid":"acea652a-0ec5-4aee-9b35-361391ec3080","rsname":"postman2"},{"rsid":"7fefd599-8489-4f5c-8960-0653b4edbf3e","rsname":"appbuilder"},{"scopes":["view","edit"],"rsid":"08135af7-dbd6-4fb4-8402-db269cf52b3d","rsname":"eventApp"},{"rsid":"9b19fee2-b2bc-4cfe-98f0-7cf6c141eea2","rsname":"spsDashboard"},{"scopes":["view","edit","delete"],"rsid":"d7091a30-a71a-4562-aba9-a5b284eb00b1","rsname":"userprofileapp"},{"rsid":"5fc8e2bf-0682-435a-a0e5-04247bab5cbc","rsname":"test2"},{"rsid":"c0522bab-cee7-4c62-bf2b-5b1a29c288ca","rsname":"appbuilder22"},{"rsid":"776d08ef-8956-487a-bcc9-e78dba0df955","rsname":"postman1"},{"scopes":["view"],"rsid":"fc0961be-dc5e-4b1a-b0e8-a7e7cef6c855","rsname":"statusApp"},{"rsid":"83329121-3a3b-4f15-ac50-3a78b29a4da1","rsname":"s1ei-ui-hierarchy-modes"},{"rsid":"46fcc576-e98d-47ae-8b9d-ed44a4747fe7","rsname":"Default Resource"},{"rsid":"5eacbd66-2202-44aa-a52e-f0bc507e60e0","rsname":"usermanagement"},{"scopes":["view","edit"],"rsid":"94df187c-520f-4fee-965e-84e6ddda76b2","rsname":"assetTree"},{"rsid":"fbc3c49d-c55c-45cb-99c3-e34ea5688ef9","rsname":"dremio"},{"rsid":"439577cb-772e-4daa-8d19-a93eeb807139","rsname":"reportbuilder"}]');
        window.localStorage.setItem('UserInfo',JSON.stringify({'email':'abc@xyz.com'}));
        window.localStorage.setItem('userInfoDialogMap',JSON.stringify([{"profileMenuName": "Demo App","profileMenuPath": "/demo-app/"},{"profileMenuName": "App Builder","profileMenuPath": "/app-builder/"},{
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
            }
          ]
        }]));
          const component = mount(<Router><VerticalHead {...props}></VerticalHead></Router>);
          const board = component.find("VerticalHead").at(0);
          board.instance().setFeedbackPopupOpen(true);
          const feedbackPopup = board.find("FeedbackPopup");
          feedbackPopup.find("GeneralFeedback").simulate('close');
          const result=board.instance().checkFeedbackFlag();
          expect(result).toBeTruthy();
      });
      it("Get all channels",()=>{
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('headerMenuConfig',JSON.stringify([
          {
            "id": "notifications",
            "type":"popup",
            "tooltipText":"Notifications",
            "tooltipTextId":"Notifications",
            "icon": "notifications_none",
            "order":"2",
            "config":{
                "serviceId":"notifications",
                "type":"notifications",
                "navigationObject": { 
                  "mode": "spa", 
                   "appName": "eventApp"
                 }
              }
            },
            {
              "id": "help",
              "type":"link",
              "tooltipText":"Help",
              "tooltipTextId":"Help",
              "icon": "help_outlined",
              "order":"1",
              "config":{
                "serviceId":"help",
                "mode": "TAB",
                "location": "https://aerion-dev.cde.fullstream.ai/http-serve/help?selectedLaunguage={language}"
              }
            },
            {
              "id": "feedback",
              "type":"popup",
              "tooltipText":"Feedback",
              "toolTipTextId":"Feedback",
              "icon": "rate_review",
              "order":"3",
              "config":{
                "serviceId":"feedback",
                "type":"feedback"
               }
            }]));
            window.localStorage.setItem('permissions','[{"rsid":"5cc4a8cf-5555-4991-9b5b-add314bc2dcb","rsname":"usermanagement-appbuilder"},{"rsid":"9e0650a0-5859-49ba-b475-c3dd5711da37","rsname":"userManagementAdminConsole"},{"rsid":"efa77ac0-7122-4ef7-affb-d37ebd540656","rsname":"keycloakAdminConsole"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1"},{"rsid":"09110955-4ea0-4f89-ba5e-c5fabd886a95","rsname":"demoapp"},{"rsid":"12b750e4-f119-4b43-890d-76cdf1dab9b0","rsname":"rdc"},{"rsid":"acea652a-0ec5-4aee-9b35-361391ec3080","rsname":"postman2"},{"rsid":"7fefd599-8489-4f5c-8960-0653b4edbf3e","rsname":"appbuilder"},{"scopes":["view","edit"],"rsid":"08135af7-dbd6-4fb4-8402-db269cf52b3d","rsname":"eventApp"},{"rsid":"9b19fee2-b2bc-4cfe-98f0-7cf6c141eea2","rsname":"spsDashboard"},{"scopes":["view","edit","delete"],"rsid":"d7091a30-a71a-4562-aba9-a5b284eb00b1","rsname":"userprofileapp"},{"rsid":"5fc8e2bf-0682-435a-a0e5-04247bab5cbc","rsname":"test2"},{"rsid":"c0522bab-cee7-4c62-bf2b-5b1a29c288ca","rsname":"appbuilder22"},{"rsid":"776d08ef-8956-487a-bcc9-e78dba0df955","rsname":"postman1"},{"scopes":["view"],"rsid":"fc0961be-dc5e-4b1a-b0e8-a7e7cef6c855","rsname":"statusApp"},{"rsid":"83329121-3a3b-4f15-ac50-3a78b29a4da1","rsname":"s1ei-ui-hierarchy-modes"},{"rsid":"46fcc576-e98d-47ae-8b9d-ed44a4747fe7","rsname":"Default Resource"},{"rsid":"5eacbd66-2202-44aa-a52e-f0bc507e60e0","rsname":"usermanagement"},{"scopes":["view","edit"],"rsid":"94df187c-520f-4fee-965e-84e6ddda76b2","rsname":"assetTree"},{"rsid":"fbc3c49d-c55c-45cb-99c3-e34ea5688ef9","rsname":"dremio"},{"rsid":"439577cb-772e-4daa-8d19-a93eeb807139","rsname":"reportbuilder"}]');
        const tenants_data = {
          roles: {
            tenants: [
              {"default":"false","name":"Adolphus","id":"0160a853-8feb-4942-9cc3-606cca035733"}
            ]
          }
        }
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve(tenants_data),
            status:200,
            ok: true
          })
        );
        window.localStorage.setItem("tenantid","0160a853-8feb-4942-9cc3-606cca035733");
        mount(<Router><VerticalHead {...props}/></Router>);
        mount(<Router><HorizontalHead {...props}/></Router>);
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve(tenants_data),
            status:500,
            ok: false
          })
        );
        mount(<Router><VerticalHead {...props}/></Router>);
        mount(<Router><HorizontalHead {...props}/></Router>);
      });
      it("update channels vertical head with status 200",()=>{
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('headerMenuConfig',JSON.stringify([{
          "type": "link",
          "location": "https://aerion-dev.cde.fullstream.ai/http-serve/help?language={language}",
          "tooltipText":"hello",
          "mode": "TAB",
          "icon": "notifications_none"
          }]));
        const tenants_data = {
          roles: {
            tenants: [
              {"default":"false","name":"Adolphus","id":"0160a853-8feb-4942-9cc3-606cca035733"},
              {"default":"false","name":"EasternControl","id":"ae680590-dac6-44c0-81cc-ec355ece3b3d"},
              {"default":"true","name":"Setpoint","id":"87b75b69-0e8d-444c-8ae8-7f4245c07556"}
            ]
          }
        }
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve([]),
            status:200,
            ok: true
          })
        );
        window.localStorage.setItem("tenantid","0160a853-8feb-4942-9cc3-606cca035733");
        window.localStorage.setItem("tenantDropDown","true");
        const component = mount(<Router><VerticalHead {...props}/></Router>);
        const board = component.find("VerticalHead").at(0);
        board.instance().setState({channelList: tenants_data.roles.tenants});
        board.instance().setState({age:"0160a853-8feb-4942-9cc3-606cca035733"});
        let event = {
          target: {
            value: "87b75b69-0e8d-444c-8ae8-7f4245c07556"
          }
        }
        board.instance().handleTenantChange(event);
        window.localStorage.removeItem('headerMenuConfig');
      });
      it("update channels vertical head status 200 notification condition",()=>{
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('headerMenuConfig',JSON.stringify([{
          "type": "link",
          "location": "https://aerion-dev.cde.fullstream.ai/http-serve/help?language={language}",
          "tooltipText":"hello",
          "mode": "TAB",
          "icon": "notifications_none"
          },
          {
            "id": "notifications",
            "type":"popup",
            "tooltipText":"Notifications",
            "toolTipTextId":"Notifications",
            "icon": "notifications_none",
            "order":"2",
            "config":{
                "serviceId":"notifications",
                "type":"notifications",
                "navigationObject": { 
                  "mode": "spa", 
                   "appName": "eventApp"
                 }
              }
            }
        ]));
        const tenants_data = {
          roles: {
            tenants: [
              {"default":"false","name":"Adolphus","id":"0160a853-8feb-4942-9cc3-606cca035733"},
              {"default":"false","name":"EasternControl","id":"ae680590-dac6-44c0-81cc-ec355ece3b3d"},
              {"default":"true","name":"Setpoint","id":"87b75b69-0e8d-444c-8ae8-7f4245c07556"}
            ]
          }
        }
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve([]),
            status:200,
            ok: true
          })
        );
        window.localStorage.setItem("tenantid","0160a853-8feb-4942-9cc3-606cca035733");
        window.localStorage.setItem("tenantDropDown","true");
        const component = mount(<Router><VerticalHead {...props}/></Router>);
        const board = component.find("VerticalHead").at(0);
        board.instance().setState({channelList: tenants_data.roles.tenants});
        // board.instance().setState({age: "0160a853-8feb-4942-9cc3-606cca035733"});
        let event = {
          target: {
            value: "87b75b69-0e8d-444c-8ae8-7f4245c07556"
          }
        }
        board.instance().handleTenantChange(event);
        window.localStorage.removeItem('headerMenuConfig');
      });
      it("update channels Horizontal head handle notification condition",()=>{
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('headerMenuConfig',JSON.stringify([{
          "id": "notifications",
          "type":"popup",
          "tooltipText":"Notifications",
          "tooltipTextId":"Notifications",
          "icon": "notifications_none",
          "order":"2",
          "config":{
              "serviceId":"notifications",
              "type":"notifications",
              "navigationObject": { 
                "mode": "spa", 
                 "appName": "eventApp"
               }
            }
          },
          {
            "id": "help",
            "type":"link",
            "tooltipText":"Help",
            "tooltipTextId":"Help",
            "icon": "help_outlined",
            "order":"1",
            "config":{
              "serviceId":"help",
              "mode": "TAB",
              "location": "https://aerion-dev.cde.fullstream.ai/http-serve/help?selectedLaunguage={language}"
            }
          },
          {
            "id": "feedback",
            "type":"popup",
            "tooltipText":"Feedback",
            "toolTipTextId":"Feedback",
            "icon": "rate_review",
            "order":"3",
            "config":{
              "serviceId":"feedback",
              "type":"feedback"
             }
          }
        ]));
        const tenants_data = {
          roles: {
            tenants: [
              {"default":"false","name":"Adolphus","id":"0160a853-8feb-4942-9cc3-606cca035733"},
              {"default":"false","name":"EasternControl","id":"ae680590-dac6-44c0-81cc-ec355ece3b3d"},
              {"default":"true","name":"Setpoint","id":"87b75b69-0e8d-444c-8ae8-7f4245c07556"}
            ]
          }
        }
        window.localStorage.setItem('permissions','[{"rsid":"5cc4a8cf-5555-4991-9b5b-add314bc2dcb","rsname":"usermanagement-appbuilder"},{"rsid":"9e0650a0-5859-49ba-b475-c3dd5711da37","rsname":"userManagementAdminConsole"},{"rsid":"efa77ac0-7122-4ef7-affb-d37ebd540656","rsname":"keycloakAdminConsole"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1"},{"rsid":"09110955-4ea0-4f89-ba5e-c5fabd886a95","rsname":"demoapp"},{"rsid":"12b750e4-f119-4b43-890d-76cdf1dab9b0","rsname":"rdc"},{"rsid":"acea652a-0ec5-4aee-9b35-361391ec3080","rsname":"postman2"},{"rsid":"7fefd599-8489-4f5c-8960-0653b4edbf3e","rsname":"appbuilder"},{"scopes":["view","edit"],"rsid":"08135af7-dbd6-4fb4-8402-db269cf52b3d","rsname":"eventApp"},{"rsid":"9b19fee2-b2bc-4cfe-98f0-7cf6c141eea2","rsname":"spsDashboard"},{"scopes":["view","edit","delete"],"rsid":"d7091a30-a71a-4562-aba9-a5b284eb00b1","rsname":"userprofileapp"},{"rsid":"5fc8e2bf-0682-435a-a0e5-04247bab5cbc","rsname":"test2"},{"rsid":"c0522bab-cee7-4c62-bf2b-5b1a29c288ca","rsname":"appbuilder22"},{"rsid":"776d08ef-8956-487a-bcc9-e78dba0df955","rsname":"postman1"},{"scopes":["view"],"rsid":"fc0961be-dc5e-4b1a-b0e8-a7e7cef6c855","rsname":"statusApp"},{"rsid":"83329121-3a3b-4f15-ac50-3a78b29a4da1","rsname":"s1ei-ui-hierarchy-modes"},{"rsid":"46fcc576-e98d-47ae-8b9d-ed44a4747fe7","rsname":"Default Resource"},{"rsid":"5eacbd66-2202-44aa-a52e-f0bc507e60e0","rsname":"usermanagement"},{"scopes":["view","edit"],"rsid":"94df187c-520f-4fee-965e-84e6ddda76b2","rsname":"assetTree"},{"rsid":"fbc3c49d-c55c-45cb-99c3-e34ea5688ef9","rsname":"dremio"},{"rsid":"439577cb-772e-4daa-8d19-a93eeb807139","rsname":"reportbuilder"}]');
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve([]),
            status:200,
            ok: true
          })
        );
        window.localStorage.setItem("tenantid","0160a853-8feb-4942-9cc3-606cca035733");
        window.localStorage.setItem("tenantDropDown","true");
        const component = mount(<Router><HorizontalHead {...props}/></Router>);
        const board = component.find("HorizontalHead").at(0);
        board.instance().setState({channelList: tenants_data.roles.tenants});
        board.instance().setState({age:"0160a853-8feb-4942-9cc3-606cca035733"});
        let event = {
          target: {
            value: "87b75b69-0e8d-444c-8ae8-7f4245c07556"
          }
        }
        board.instance().handleTenantChange(event);
        window.localStorage.removeItem('headerMenuConfig');
      });
      it("update channels Horizontal head 500",()=>{
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('headerMenuConfig',JSON.stringify([{
          "type": "link",
          "location": "https://aerion-dev.cde.fullstream.ai/http-serve/help?language={language}",
          "tooltipText":"hello",
          "mode": "TAB",
          "icon": "notifications_none"
          }
        ]));
        window.localStorage.setItem('permissions','[{"rsid":"5cc4a8cf-5555-4991-9b5b-add314bc2dcb","rsname":"usermanagement-appbuilder"},{"rsid":"9e0650a0-5859-49ba-b475-c3dd5711da37","rsname":"userManagementAdminConsole"},{"rsid":"efa77ac0-7122-4ef7-affb-d37ebd540656","rsname":"keycloakAdminConsole"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1"},{"rsid":"09110955-4ea0-4f89-ba5e-c5fabd886a95","rsname":"demoapp"},{"rsid":"12b750e4-f119-4b43-890d-76cdf1dab9b0","rsname":"rdc"},{"rsid":"acea652a-0ec5-4aee-9b35-361391ec3080","rsname":"postman2"},{"rsid":"7fefd599-8489-4f5c-8960-0653b4edbf3e","rsname":"appbuilder"},{"scopes":["view","edit"],"rsid":"08135af7-dbd6-4fb4-8402-db269cf52b3d","rsname":"eventApp"},{"rsid":"9b19fee2-b2bc-4cfe-98f0-7cf6c141eea2","rsname":"spsDashboard"},{"scopes":["view","edit","delete"],"rsid":"d7091a30-a71a-4562-aba9-a5b284eb00b1","rsname":"userprofileapp"},{"rsid":"5fc8e2bf-0682-435a-a0e5-04247bab5cbc","rsname":"test2"},{"rsid":"c0522bab-cee7-4c62-bf2b-5b1a29c288ca","rsname":"appbuilder22"},{"rsid":"776d08ef-8956-487a-bcc9-e78dba0df955","rsname":"postman1"},{"scopes":["view"],"rsid":"fc0961be-dc5e-4b1a-b0e8-a7e7cef6c855","rsname":"statusApp"},{"rsid":"83329121-3a3b-4f15-ac50-3a78b29a4da1","rsname":"s1ei-ui-hierarchy-modes"},{"rsid":"46fcc576-e98d-47ae-8b9d-ed44a4747fe7","rsname":"Default Resource"},{"rsid":"5eacbd66-2202-44aa-a52e-f0bc507e60e0","rsname":"usermanagement"},{"scopes":["view","edit"],"rsid":"94df187c-520f-4fee-965e-84e6ddda76b2","rsname":"assetTree"},{"rsid":"fbc3c49d-c55c-45cb-99c3-e34ea5688ef9","rsname":"dremio"},{"rsid":"439577cb-772e-4daa-8d19-a93eeb807139","rsname":"reportbuilder"}]');
        const tenants_data = {
          roles: {
            tenants: [
              {"default":"false","name":"Adolphus","id":"0160a853-8feb-4942-9cc3-606cca035733"},
              {"default":"false","name":"EasternControl","id":"ae680590-dac6-44c0-81cc-ec355ece3b3d"},
              {"default":"true","name":"Setpoint","id":"87b75b69-0e8d-444c-8ae8-7f4245c07556"}
            ]
          }
        }
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve([]),
            status:500,
            ok: false
          })
        );
        window.localStorage.setItem("tenantid","0160a853-8feb-4942-9cc3-606cca035733");
        window.localStorage.setItem("tenantDropDown","true");
        const hcomponent = mount(<Router><HorizontalHead {...props}/></Router>);
        const hboard = hcomponent.find("HorizontalHead").at(0);
        hboard.instance().setState({channelList: tenants_data.roles.tenants});
        let event = {
          target: {
            value: "87b75b69-0e8d-444c-8ae8-7f4245c07556"
          }
        }
        hboard.instance().handleTenantChange(event);

        const vcomponent = mount(<Router><VerticalHead {...props}/></Router>);
        const vboard = vcomponent.find("VerticalHead").at(0);
        vboard.instance().setState({channelList: tenants_data.roles.tenants});
        vboard.instance().handleTenantChange(event);
        window.localStorage.removeItem('headerMenuConfig');
        window.localStorage.removeItem("selectedTenant");
        
      });
      it("Global search lazy loading test",()=>{
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('headerMenuConfig',JSON.stringify([]));
        window.localStorage.setItem('searchConfig',JSON.stringify({
          "id": "search",
          "component": "GlobalSearch",
          "props": {
            "isDropdown": false,
          }, 
          "navigationObject": {
            "mode": "spa",
            "appName": "Default Resource"
          }
        }));
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve([]),
            status:200,
            ok: true
          })
        );
        const vcomponent = mount(<Router><VerticalHead {...props}/></Router>);
        const vboard = vcomponent.find("VerticalHead").at(0);
        const hcomponent = mount(<Router><HorizontalHead {...props}/></Router>);
        const hboard = hcomponent.find("HorizontalHead").at(0);       
      });
      it("Feedback popup test",()=>{
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        window.localStorage.setItem('headerMenuConfig',JSON.stringify([{
        "id": "notifications",
        "type":"popup",
        "tooltipText":"Notifications",
        "toolTipTextId":"Notifications",
        "icon": "notifications_none",
        "order":"2",
        "config":{
            "serviceId":"notifications",
            "location": "https://localhost:8084",
            "mode": "SPA"
          }
        },]));
        window.i18Resources = ""
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve([]),
            status:200,
            ok: true
          })
        );
        const component = mount(<Router><VerticalHead {...props}/></Router>);
        const board = component.find("VerticalHead").at(0);
        board.find('GeneralFeedback').props().onClose();
      });
      it("Vertical default applink",()=>{
        window.localStorage.setItem('headerMenuConfig',JSON.stringify([]));
        window.localStorage.setItem('defaultAppLink', "http://localhost:8084/");
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve([]),
            status:200,
            ok: true
          })
        );
        const component = mount(<Router><VerticalHead {...props}/></Router>);
        const board = component.find("VerticalHead").at(0);
        board.setState({showAppsIcon: false});
      })
      it("Notification errorcode 200",()=>{
        window.localStorage.setItem('headerMenuConfig',JSON.stringify([]));
        window.localStorage.setItem('showHeaderMenuIcon',"false");
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve({errorCode: "200"}),
            status:200,
            ok: true
          })
        );
        const component = mount(<Router><VerticalHead {...props}/></Router>);
        const board = component.find("VerticalHead").at(0);
        board.instance().getAllNotifications();
        global.fetch = jest.fn(() =>
          Promise.reject({
            message: "failed"
          })
        );
        board.instance().getAllNotifications();
      })
      it("Userinfo pop up without submenu testing", ()=>{
        const userInfoDialogMap = [
          {
            "type": "app",
            "location": "/app-builder/",
            "name": "Settings",
            "mode": "tab",
            "icon": "tune"
          },
          {
            "type": "file",
            "location": "/i18.html",
            "name": "richHTML",
            "mode": "spa",
            "icon": "tune"
          },
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
              }
            ]
          }
        ];
        const userInfo = {
          "name": "funcuser01",
          "email": "funcuser@bh.com",
          "title": [
            "F",
            "U"
          ],
          "firstName": "Func",
          "lastName": "User"
        };
        window.localStorage.setItem("navigation",JSON.stringify(navigation));
        window.localStorage.setItem("userInfoDialogMap", JSON.stringify(userInfoDialogMap));
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        window.localStorage.setItem("licencesUrl", "https://dev.np-0000197.npause1.bakerhughes.com/license-svc/v1/licensing/features");
        window.localStorage.setItem('microapps',JSON.stringify(navigation));
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve([]),
            status:200,
            ok: true
          })
        );
        const vcomponent = mount(<Router><VerticalHead {...props2}/></Router>);
        const vboard = vcomponent.find("VerticalHead").at(0);
        vboard.find("#userIconAppBar").simulate('click');
        // vboard.instance().props.handleUserIconClick(this);
        // vboard.instance().setState({pop_open :true})
        
      })
      it("Userinfo pop up with submenu testing", ()=>{
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
              }
            ]
          }
        ];
        const userInfo = {
          "name": "funcuser01",
          "email": "funcuser@bh.com",
          "title": [
            "F",
            "U"
          ],
          "firstName": "Func",
          "lastName": "User"
        };
        window.localStorage.setItem("theme", '');
        window.localStorage.setItem("userInfoDialogMap", JSON.stringify(userInfoDialogMap));
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        window.localStorage.setItem('microapps',JSON.stringify(navigation));
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve([]),
            status:200,
            ok: true
          })
        );
        const component = mount(<Router><VerticalHead {...props2}/></Router>);
        // const board = component.find("VerticalHead").at(0);
        component.find("#userIconAppBar").simulate('click');
        // component.find(".bh-app-shell-menu__settings-menu MyCustomMenuItem#Version").first().simulate("click");
        
      })
      it("Userinfo pop up with theme testing", ()=>{
        const userInfoDialogMap = [
          {
            "type": "group",
            "mode": "spa",
            "name": "Theme",
            "id":"theme",
            "icon": "tune",
            "subMenu": [
              {
                "name": "darkTheme",
                "theme": "dark",
                "default": true
              },
              {
                "name": "lightTheme",
                "theme": "light",
                "default": false
              }
            ]
          }
        ];
        const userInfo = {
          "name": "funcuser01",
          "email": "funcuser@bh.com",
          "title": [
            "F",
            "U"
          ],
          "firstName": "Func",
          "lastName": "User"
        };
        window.localStorage.setItem("userInfoDialogMap", JSON.stringify(userInfoDialogMap));
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        window.localStorage.setItem('microapps',JSON.stringify(navigation));
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve([]),
            status:200,
            ok: true
          })
        );
        const component = mount(<Router><VerticalHead {...props2}/></Router>);
        component.find("#userIconAppBar").simulate('click');
        // component.find(".bh-app-shell-menu__settings-menu MyCustomMenuItem#lightTheme").simulate("click");
        // component.find("MyCustomMenuItem#settingsLogout").simulate('click');
        
      });
      it("Feedback popup testing", ()=>{
         window.localStorage.setItem('headerMenuConfig',JSON.stringify([
            {
              "id": "feedback",
              "type":"popup",
              "tooltipText":"Feedback",
              "toolTipTextId":"Feedback",
              "icon": "rate_review",
              "order":"3",
              "config":{
                "serviceId":"feedback",
                "type":"feedback"
               }
            }]));
        window.localStorage.setItem('microapps',JSON.stringify(navigation));
        window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve([]),
            status:200,
            ok: true
          })
        );
        const component = mount(<Router><VerticalHead {...props2}/></Router>);
        const board = component.find("VerticalHead").at(0);
        board.instance().setFeedbackPopupOpen(true);
        board.setState({Fkopen: true})
        component.find("Popover").last().props().onRequestClose();        
      });
  
  it("BhNotification menu if localstorage undefined in componentWillMount and componentDidMount", () => {
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', "undefined");
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(),
        status: 200,
        ok: true
      })
    );
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
  });

  it("BhNotification menu if localstorage undefined in componentDidMount if no pollNotificationTimeInterval is not present", () => {
    const newConfig = _.omit(advanceNotificationMeta, "pollNotificationTimeInterval");
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(newConfig));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(),
        status: 200,
        ok: true
      })
    );
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
  });

  it("BhNotification menu for status 200", () => {
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(advanceNotificationMeta));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
      statusCode: 200,
      body: [{
        "id": "chart-comp--notification-1",
        "title": "consectetur1",
        "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
        "createdDateTime": "2022-10-20T14:38:06+05:30",
        "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
        "type": "System error",
        "filterCriteria": "low",
        "status": false,
        "profilePictureUrl": "<url-for-photo>",
        "redirectAPI": "appbuilder",
        "navigationPaylaod": "Object/Array Containing payload"
      }],
      ok: true
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
  });

  it("BhNotification menu for status 206", () => {
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(advanceNotificationMeta));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
      statusCode: 206,
      body: [{
        "id": "chart-comp--notification-1",
        "title": "consectetur1",
        "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
        "createdDateTime": "2022-10-20T14:38:06+05:30",
        "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
        "type": "System error",
        "filterCriteria": "low",
        "status": false,
        "profilePictureUrl": "<url-for-photo>",
        "redirectAPI": "appbuilder",
        "navigationPaylaod": "Object/Array Containing payload"
      }],
      ok: true
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
  });

  it("BhNotification menu for status 204", () => {
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(advanceNotificationMeta));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
      statusCode: 204,
      body: [],
      ok: true
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
  });

  it("BhNotification menu for no statuscode", () => {
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(advanceNotificationMeta));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
  });

  it("BhNotification menu for error of getNotificationData  call", () => {
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(advanceNotificationMeta));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
      statusCode: 400,
      body: "error",
      ok: true
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.reject({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
  });

  it("BhNotification menu for markNotificationRead if rowRedirect present and commonRedirectMicroapp in not in config case", () => {
    const row = {
      "id": "chart-comp--notification-1",
      "title": "consectetur1",
      "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-09-30T11:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "System Info",
      "filterCriteria": "low",
      "status": false,
      "profilePictureUrl": "<url-for-photo>",
      "redirectAPI": "statusApp",
      "navigationPaylaod": "Object/Array Containing payload"
    };
    const datedRow = {
      "isPartialResponse": true,
      "isNoResponse": false,
      "items": [{
        "id": "chart-comp--notification-1",
        "title": "consectetur1",
        "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
        "createdDateTime": "2022-09-30T11:38:06+05:30",
        "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
        "type": "System Info",
        "filterCriteria": "low",
        "status": false,
        "profilePictureUrl": "<url-for-photo>",
        "redirectAPI": "statusApp",
        "navigationPaylaod": "Object/Array Containing payload"
      }]
    };
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(advanceNotificationMeta));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
      statusCode: 200,
      body: "Updated successfully",
      ok: true
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    vboard.setState({ notificationData: datedRow });
    vboard.instance().props.markNotificationRead(row, "onContentClick");

    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
    hboard.setState({ notificationData: datedRow });
    hboard.instance().props.markNotificationRead(row, "onContentClick");

  });

  it("BhNotification menu for markNotificationRead if rowRedirect present and commonRedirectMicroapp in not in config case with navigation appname not matching", () => {
    const row = {
      "id": "chart-comp--notification-1",
      "title": "consectetur1",
      "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-09-30T11:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "System Info",
      "filterCriteria": "low",
      "status": true,
      "profilePictureUrl": "<url-for-photo>",
      "redirectAPI": "statusApp",
      "navigationPaylaod": "Object/Array Containing payload"
    };
    const datedRow = {
      "isPartialResponse": true,
      "isNoResponse": false,
      "items": [{
        "id": "chart-comp--notification-1",
        "title": "consectetur1",
        "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
        "createdDateTime": "2022-09-30T11:38:06+05:30",
        "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
        "type": "System Info",
        "filterCriteria": "low",
        "status": true,
        "profilePictureUrl": "<url-for-photo>",
        "redirectAPI": "statusApp",
        "navigationPaylaod": "Object/Array Containing payload"
      }]
    };
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(advanceNotificationMeta));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('navigation', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
      statusCode: 200,
      body: "Updated successfully",
      ok: true
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    vboard.setState({ notificationData: datedRow });
    vboard.instance().props.markNotificationRead(row, "onContentClick");

    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
    hboard.setState({ notificationData: datedRow });
    hboard.instance().props.markNotificationRead(row, "onContentClick");

  });

  it("BhNotification menu for markNotificationRead if rowRedirect not present and commonRedirectMicroapp present in config case with appname present in navigation", () => {
    const row = {
      "id": "chart-comp--notification-1",
      "title": "consectetur1",
      "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-09-30T11:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "System Info",
      "filterCriteria": "low",
      "status": true,
      "profilePictureUrl": "<url-for-photo>",
      "navigationPaylaod": "Object/Array Containing payload"
    };
    const datedRow = {
      "isPartialResponse": true,
      "isNoResponse": false,
      "items": [{
        "id": "chart-comp--notification-1",
        "title": "consectetur1",
        "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
        "createdDateTime": "2022-09-30T11:38:06+05:30",
        "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
        "type": "System Info",
        "filterCriteria": "low",
        "status": true,
        "profilePictureUrl": "<url-for-photo>",
        "navigationPaylaod": "Object/Array Containing payload"
      }]
    };
    const newConfig = {
      ...advanceNotificationMeta, "commonRedirectMicroapp": {
        "navigationObject": {
          "mode": "spa",
          "appName": "appbuilder"
        }
      }
    }
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(newConfig));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem("navigation", JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
      statusCode: 200,
      body: "Updated successfully",
      ok: true
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    vboard.setState({ notificationData: datedRow });
    vboard.instance().props.markNotificationRead(row, "onContentClick");

    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
    hboard.setState({ notificationData: datedRow });
    hboard.instance().props.markNotificationRead(row, "onContentClick");

  });

  it("BhNotification menu for markNotificationRead if rowRedirect not present and commonRedirectMicroapp present in config case with appname not present in navigation", () => {
    const row = {
      "id": "chart-comp--notification-1",
      "title": "consectetur1",
      "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-09-30T11:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "System Info",
      "filterCriteria": "low",
      "status": true,
      "profilePictureUrl": "<url-for-photo>",
      "navigationPaylaod": "Object/Array Containing payload"
    };
    const datedRow = {
      "isPartialResponse": true,
      "isNoResponse": false,
      "items": [{
        "id": "chart-comp--notification-1",
        "title": "consectetur1",
        "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
        "createdDateTime": "2022-09-30T11:38:06+05:30",
        "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
        "type": "System Info",
        "filterCriteria": "low",
        "status": true,
        "profilePictureUrl": "<url-for-photo>",
        "navigationPaylaod": "Object/Array Containing payload"
      }]
    };
    const newConfig = {
      ...advanceNotificationMeta, "commonRedirectMicroapp": {
        "navigationObject": {
          "mode": "spa",
          "appName": "eventApp"
        }
      }
    }
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(newConfig));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem("navigation", JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
      statusCode: 200,
      body: "Updated successfully",
      ok: true
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    vboard.setState({ notificationData: datedRow });
    vboard.instance().props.markNotificationRead(row, "onContentClick");

    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
    hboard.setState({ notificationData: datedRow });
    hboard.instance().props.markNotificationRead(row, "onContentClick");

  });

  it("BhNotification menu for markNotificationRead if rowRedirect not present and commonRedirectMicroapp not present in config case with onContentClick", () => {
    const row = {
      "id": "chart-comp--notification-1",
      "title": "consectetur1",
      "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-09-30T11:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "System Info",
      "filterCriteria": "low",
      "status": true,
      "profilePictureUrl": "<url-for-photo>",
      "navigationPaylaod": "Object/Array Containing payload"
    };
    const datedRow = {
      "isPartialResponse": true,
      "isNoResponse": false,
      "items": [{
        "id": "chart-comp--notification-1",
        "title": "consectetur1",
        "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
        "createdDateTime": "2022-09-30T11:38:06+05:30",
        "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
        "type": "System Info",
        "filterCriteria": "low",
        "status": true,
        "profilePictureUrl": "<url-for-photo>",
        "navigationPaylaod": "Object/Array Containing payload"
      }]
    };
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(advanceNotificationMeta));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
      statusCode: 200,
      body: "Updated successfully",
      ok: true
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    vboard.setState({ notificationData: datedRow });
    vboard.instance().props.markNotificationRead(row, "onContentClick");

    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
    hboard.setState({ notificationData: datedRow });
    hboard.instance().props.markNotificationRead(row, "onContentClick");
  });

  it("BhNotification menu for markNotificationRead if rowRedirect is present as appname without / and commonRedirectMicroapp not present in config case with onContentClick", () => {
    const row = {
      "id": "chart-comp--notification-1",
      "title": "consectetur1",
      "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-09-30T11:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "System Info",
      "filterCriteria": "low",
      "status": true,
      "profilePictureUrl": "<url-for-photo>",
      "redirectAPI": "appbuilder",
      "navigationPaylaod": "Object/Array Containing payload"
    };
    const row1 = {
      "id": "chart-comp--notification-1",
      "title": "consectetur1",
      "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-09-30T11:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "System Info",
      "filterCriteria": "low",
      "status": true,
      "profilePictureUrl": "<url-for-photo>",
      "redirectAPI": "appbuilder",
    };
    const datedRow = {
      "isPartialResponse": true,
      "isNoResponse": false,
      "items": [{
        "id": "chart-comp--notification-1",
        "title": "consectetur1",
        "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
        "createdDateTime": "2022-09-30T11:38:06+05:30",
        "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
        "type": "System Info",
        "filterCriteria": "low",
        "status": true,
        "profilePictureUrl": "<url-for-photo>",
        "redirectAPI": "appbuilder",
        "navigationPaylaod": "Object/Array Containing payload"
      }]
    };
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(advanceNotificationMeta));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
      statusCode: 200,
      body: "Updated successfully",
      ok: true
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    vboard.setState({ notificationData: datedRow });
    vboard.instance().props.markNotificationRead(row, "onContentClick");
    vboard.instance().props.markNotificationRead(row1, "onContentClick");

    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
    hboard.setState({ notificationData: datedRow });
    hboard.instance().props.markNotificationRead(row, "onContentClick");
    hboard.instance().props.markNotificationRead(row1, "onContentClick");
  });

  it("BhNotification menu for markNotificationRead if rowRedirect is present as appname with / and commonRedirectMicroapp not present in config case with onContentClick", () => {
    const row = {
      "id": "chart-comp--notification-1",
      "title": "consectetur1",
      "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-09-30T11:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "System Info",
      "filterCriteria": "low",
      "status": true,
      "profilePictureUrl": "<url-for-photo>",
      "redirectAPI": "/appbuilder",
      "navigationPaylaod": "Object/Array Containing payload"
    };
    const datedRow = {
      "isPartialResponse": true,
      "isNoResponse": false,
      "items": [{
        "id": "chart-comp--notification-1",
        "title": "consectetur1",
        "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
        "createdDateTime": "2022-09-30T11:38:06+05:30",
        "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
        "type": "System Info",
        "filterCriteria": "low",
        "status": true,
        "profilePictureUrl": "<url-for-photo>",
        "redirectAPI": "/appbuilder",
        "navigationPaylaod": "Object/Array Containing payload"
      }]
    };
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(advanceNotificationMeta));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
      statusCode: 200,
      body: "Updated successfully",
      ok: true
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    vboard.setState({ notificationData: datedRow });
    vboard.instance().props.markNotificationRead(row, "onContentClick");


    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
    hboard.setState({ notificationData: datedRow });
    hboard.instance().props.markNotificationRead(row, "onContentClick");

  });

  it("BhNotification menu for markNotificationRead if rowRedirect present and commonRedirectMicroapp in not in config case with onCloseClick", () => {
    const row = {
      "id": "chart-comp--notification-1",
      "title": "consectetur1",
      "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-09-30T11:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "System Info",
      "filterCriteria": "low",
      "status": true,
      "profilePictureUrl": "<url-for-photo>",
      "redirectAPI": "statusApp",
      "navigationPaylaod": "Object/Array Containing payload"
    };
    const datedRow = {
      "isPartialResponse": true,
      "isNoResponse": false,
      "items": [{
        "id": "chart-comp--notification-1",
        "title": "consectetur1",
        "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
        "createdDateTime": "2022-09-30T11:38:06+05:30",
        "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
        "type": "System Info",
        "filterCriteria": "low",
        "status": true,
        "profilePictureUrl": "<url-for-photo>",
        "redirectAPI": "statusApp",
        "navigationPaylaod": "Object/Array Containing payload"
      }]
    };
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(advanceNotificationMeta));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
      statusCode: 200,
      body: "Updated successfully",
      ok: true
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    vboard.setState({ notificationData: datedRow });
    vboard.instance().props.markNotificationRead(row, "onCloseClick");

    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
    hboard.setState({ notificationData: datedRow });
    hboard.instance().props.markNotificationRead(row, "onCloseClick");
  });

  it("BhNotification menu when markNotificationRead gets failed", () => {
    const row = {
      "id": "chart-comp--notification-1",
      "title": "consectetur1",
      "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-09-30T11:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "System Info",
      "filterCriteria": "low",
      "status": false,
      "profilePictureUrl": "<url-for-photo>",
      "redirectAPI": "statusApp",
      "navigationPaylaod": "Object/Array Containing payload"
    };
    const datedRow = {
      "isPartialResponse": true,
      "isNoResponse": false,
      "items": [{
        "id": "chart-comp--notification-1",
        "title": "consectetur1",
        "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
        "createdDateTime": "2022-09-30T11:38:06+05:30",
        "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
        "type": "System Info",
        "filterCriteria": "low",
        "status": false,
        "profilePictureUrl": "<url-for-photo>",
        "redirectAPI": "statusApp",
        "navigationPaylaod": "Object/Array Containing payload"
      }]
    };
    window.localStorage.setItem('headerMenuConfig', JSON.stringify(notificationHeadermenuConfig));
    window.localStorage.setItem('advanceNotificationMeta', JSON.stringify(advanceNotificationMeta));
    window.localStorage.setItem('microapps', JSON.stringify(navigation));
    window.localStorage.setItem('menuItems', JSON.stringify(menuItems));
    const mockSuccessResponse = {
      statusCode: 404,
      body: "error",
      ok: true
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const vcomponent = mount(<Router><VerticalHead {...props} /></Router>);
    const vboard = vcomponent.find("VerticalHead").at(0);
    vboard.setState({ showAdvanceNotification: true });
    vboard.setState({ notificationData: datedRow });
    vboard.instance().props.markNotificationRead(row, "onContentClick");

    const hcomponent = mount(<Router><HorizontalHead {...props} /></Router>);
    const hboard = hcomponent.find("HorizontalHead").at(0);
    hboard.setState({ showAdvanceNotification: true });
    hboard.setState({ notificationData: datedRow });
    hboard.instance().props.markNotificationRead(row, "onContentClick");

  });

  it('Microapp licensing test',()=>{
    const mockSuccessResponse = {
      responseStatus:200,
      message:'success',
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    window.localStorage.setItem('permissions','[{"rsname": "dashboard", "access": "enabled", "scopes": []},{"rsname": "appbuilder", "access": "disabled", "scopes": []},{"rsname": "demo-app", "access": "disabled", "scopes": []}]');
    window.localStorage.setItem('microapps',JSON.stringify(navigation));
    window.localStorage.setItem('menuItems',JSON.stringify(menuItems));
    window.localStorage.setItem('navigation',JSON.stringify(navigation));
    window.localStorage.setItem('unlicensedMessage',"unlicensed message");
    const component = mount(<Router><HorizontalHead {...props}/></Router>);
    const board = component.find("HorizontalHead").at(0);
    board.instance().getPermitionHorizontalAppId = jest.fn().mockImplementation(()=>{ return {'access': "disabled"}});
  });
});