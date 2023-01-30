import React from "react";
import MainComponent from './MainComponent';
import { MuiThemeProvider, createMuiTheme, createStyles } from '@material-ui/core/styles';
import { iteratee } from "lodash";
import {mount} from "enzyme";
import ErrorOccurred from "./ErrorOccurred";
import {MemoryRouter} from 'react-router-dom';
jest.mock("react-i18next", () => ({
  withTranslation: () => (Component) => {
      Component.defaultProps = {...Component.defaultProps, t: (key) => key};
      return Component;
    },
}));
const styles = theme => ({
    content: {
     flexGrow: 1,
     paddingTop: theme.spacing(0),
     transition: theme.transitions.create('margin', {
       easing: theme.transitions.easing.sharp,
       duration: theme.transitions.duration.leavingScreen,
     }),
     marginLeft: 0,
   },
 
   contentShift: {
     transition: theme.transitions.create('margin', {
       easing: theme.transitions.easing.easeOut,
       duration: theme.transitions.duration.enteringScreen,
     }),
     marginLeft: drawerWidth
   },
  
 
   
 });

 const THEME = createMuiTheme({    
    overrides: {
      MuiMenuItem: createStyles({
        root: {
          '&&:hover': {backgroundColor: 'pink', color: 'white'}
        },
        "&$selected": {
          "&&": {
            "backgroundColor": "blue",
            "color": "white"
          },
          "&&:hover": {
            "backgroundColor": "darkblue",
            "color": "white"
          }
        }
      }),
  
      // How do I enforce this ONLY inside of MuiMenuItem and only for
      // the selected variant of that?
      MuiTypography: {
        subheading: {color: 'white'}
      },
      typography: {useNextVariants: true, fontFamily: "Poppins", fontSize: 14, fontWeightLight: 300, fontWeightRegular: 400, fontWeightMedium: 500}
    }    
  });
  
  const theme = createMuiTheme({
    palette: {
      type: 'dark', // Switching the dark mode on is a single property value change.
    },
    typography: { useNextVariants: true }
  });

  const MockTheme=({children})=>{
      return(
        <MuiThemeProvider  theme={THEME}>
        <MemoryRouter>
        {children}
        </MemoryRouter>
       
         </MuiThemeProvider>
      )
      
  };
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
        "default": true,
        "feedbackFlag":true,
        "visibility":true,
        "displayTextId":"dashboard",
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
      },
      {
        "id": "demoapp",
        "name": "Demo App",
        "link": "/demo-app/",
        "icon": "archiverounded",
        "host": "https://aerion-dev.cde.fullstream.ai/appshell-sample-app",
        "path": "/demo-app",
        "template": "/micro-app.html",
        "navService": "/nav",
        "default": false,
        "feedbackFlag": true
      }
  
  ];
  describe("main componenet test",()=>{

  it("check checkAppName method with valid app name commonappImpacted",()=>{

    global.callPermissionsApi = jest.fn((props) => {return null}
  );
  const prop={location:{pathname:"/app-builder/"}};
  window.localStorage.setItem('navigation',JSON.stringify(navigation));
  const microapp=[{
    "id": "appbuilder",
    "name": "App builder",
    "link": "/app-builder/",
    "icon": "archiverounded",
    "host": "https://aerion-dev.cde.fullstream.ai/appshell-sample-app",
    "path": "/app-builder",
    "template": "/micro-app.html",
    "navService": "/nav",
    "default": false,
    "feedbackFlag": true
  }];
  window.localStorage.setItem('commonappImpacted',JSON.stringify([{"originaterApp":"appbuilder"}]));
  window.localStorage.setItem('microapps',JSON.stringify(microapp));
  window.localStorage.setItem('permissions','[{"rsid":"5cc4a8cf-5555-4991-9b5b-add314bc2dcb","rsname":"usermanagement-appbuilder"},{"rsid":"9e0650a0-5859-49ba-b475-c3dd5711da37","rsname":"userManagementAdminConsole"},{"rsid":"efa77ac0-7122-4ef7-affb-d37ebd540656","rsname":"keycloakAdminConsole"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1"},{"rsid":"09110955-4ea0-4f89-ba5e-c5fabd886a95","rsname":"demoapp"},{"rsid":"12b750e4-f119-4b43-890d-76cdf1dab9b0","rsname":"rdc"},{"rsid":"acea652a-0ec5-4aee-9b35-361391ec3080","rsname":"postman2"},{"rsid":"7fefd599-8489-4f5c-8960-0653b4edbf3e","rsname":"appbuilder"},{"scopes":["view","edit"],"rsid":"08135af7-dbd6-4fb4-8402-db269cf52b3d","rsname":"eventApp"},{"rsid":"9b19fee2-b2bc-4cfe-98f0-7cf6c141eea2","rsname":"spsDashboard"},{"scopes":["view","edit","delete"],"rsid":"d7091a30-a71a-4562-aba9-a5b284eb00b1","rsname":"userprofileapp"},{"rsid":"5fc8e2bf-0682-435a-a0e5-04247bab5cbc","rsname":"test2"},{"rsid":"c0522bab-cee7-4c62-bf2b-5b1a29c288ca","rsname":"appbuilder22"},{"rsid":"776d08ef-8956-487a-bcc9-e78dba0df955","rsname":"postman1"},{"scopes":["view"],"rsid":"fc0961be-dc5e-4b1a-b0e8-a7e7cef6c855","rsname":"statusApp"},{"rsid":"83329121-3a3b-4f15-ac50-3a78b29a4da1","rsname":"s1ei-ui-hierarchy-modes"},{"rsid":"46fcc576-e98d-47ae-8b9d-ed44a4747fe7","rsname":"Default Resource"},{"rsid":"5eacbd66-2202-44aa-a52e-f0bc507e60e0","rsname":"usermanagement"},{"scopes":["view","edit"],"rsid":"94df187c-520f-4fee-965e-84e6ddda76b2","rsname":"assetTree"},{"rsid":"fbc3c49d-c55c-45cb-99c3-e34ea5688ef9","rsname":"dremio"},{"rsid":"439577cb-772e-4daa-8d19-a93eeb807139","rsname":"reportbuilder"}]');
    const wrapper= mount(<MockTheme><MainComponent {...prop}/></MockTheme>);
    const component = wrapper.find("MainComponent").at(0);
    const result=component.instance().checkAppName();
    expect(result.name).toBe('App builder');
    global.callPermissionsApi.mockClear();
    window.localStorage.removeItem("navigation");
    window.localStorage.removeItem("commonappImpacted");
  });

  it("check checkAppName method with end / missing",()=>{

    global.callPermissionsApi = jest.fn((props) => {return null}
  );
  const prop={location:{pathname:"/app-builder"}};
  const microapp=[{
    "id": "appbuilder",
    "name": "App builder",
    "link": "/app-builder/",
    "icon": "archiverounded",
    "host": "https://aerion-dev.cde.fullstream.ai/appshell-sample-app",
    "path": "/app-builder",
    "template": "/micro-app.html",
    "navService": "/nav",
    "default": false,
    "feedbackFlag": true
  }];
  window.localStorage.setItem('microapps',JSON.stringify(microapp));
    const wrapper= mount(<MockTheme><MainComponent {...prop}/></MockTheme>);
    window.localStorage.setItem('permissions','[{"rsid":"5cc4a8cf-5555-4991-9b5b-add314bc2dcb","rsname":"usermanagement-appbuilder"},{"rsid":"9e0650a0-5859-49ba-b475-c3dd5711da37","rsname":"userManagementAdminConsole"},{"rsid":"efa77ac0-7122-4ef7-affb-d37ebd540656","rsname":"keycloakAdminConsole"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1"},{"rsid":"09110955-4ea0-4f89-ba5e-c5fabd886a95","rsname":"demoapp"},{"rsid":"12b750e4-f119-4b43-890d-76cdf1dab9b0","rsname":"rdc"},{"rsid":"acea652a-0ec5-4aee-9b35-361391ec3080","rsname":"postman2"},{"rsid":"7fefd599-8489-4f5c-8960-0653b4edbf3e","rsname":"appbuilder"},{"scopes":["view","edit"],"rsid":"08135af7-dbd6-4fb4-8402-db269cf52b3d","rsname":"eventApp"},{"rsid":"9b19fee2-b2bc-4cfe-98f0-7cf6c141eea2","rsname":"spsDashboard"},{"scopes":["view","edit","delete"],"rsid":"d7091a30-a71a-4562-aba9-a5b284eb00b1","rsname":"userprofileapp"},{"rsid":"5fc8e2bf-0682-435a-a0e5-04247bab5cbc","rsname":"test2"},{"rsid":"c0522bab-cee7-4c62-bf2b-5b1a29c288ca","rsname":"appbuilder22"},{"rsid":"776d08ef-8956-487a-bcc9-e78dba0df955","rsname":"postman1"},{"scopes":["view"],"rsid":"fc0961be-dc5e-4b1a-b0e8-a7e7cef6c855","rsname":"statusApp"},{"rsid":"83329121-3a3b-4f15-ac50-3a78b29a4da1","rsname":"s1ei-ui-hierarchy-modes"},{"rsid":"46fcc576-e98d-47ae-8b9d-ed44a4747fe7","rsname":"Default Resource"},{"rsid":"5eacbd66-2202-44aa-a52e-f0bc507e60e0","rsname":"usermanagement"},{"scopes":["view","edit"],"rsid":"94df187c-520f-4fee-965e-84e6ddda76b2","rsname":"assetTree"},{"rsid":"fbc3c49d-c55c-45cb-99c3-e34ea5688ef9","rsname":"dremio"},{"rsid":"439577cb-772e-4daa-8d19-a93eeb807139","rsname":"reportbuilder"}]');
    const component = wrapper.find("MainComponent").at(0);
    const result=component.instance().checkAppName();
    //expect(result).toBeUndefined();
    global.callPermissionsApi.mockClear();
  });
  it("check checkAppName method with valid app name",()=>{

    global.callPermissionsApi = jest.fn((props) => {return null}
  );
  const prop={location:{pathname:"/demo-app/"}};
  window.localStorage.setItem('navigation',JSON.stringify([]));
  const microapp=[{
    "id": "demoapp",
    "name": "Demo App",
    "link": "/demo-app/",
    "icon": "archiverounded",
    "host": "https://aerion-dev.cde.fullstream.ai/appshell-sample-app",
    "path": "/demo-app",
    "template": "/micro-app.html",
    "navService": "/nav",
    "default": false,
    "feedbackFlag": true
  }];
  window.localStorage.setItem('microapps',JSON.stringify(microapp));
    const wrapper= mount(<MockTheme><MainComponent {...prop}/></MockTheme>);
    const component = wrapper.find("MainComponent").at(0);
    const result=component.instance().checkAppName();
    expect(result.name).toBe("Demo App");
    global.callPermissionsApi.mockClear();
  });
  it("check with not existing app condition",()=>{

    global.callPermissionsApi = jest.fn((props) => {return null}
  );
  const prop={location:{pathname:"/abc/"}};
  window.localStorage.setItem('navigation',JSON.stringify([]));
  const microapp=[{
    "id": "demoapp",
    "name": "Demo App",
    "link": "/demo-app/",
    "icon": "archiverounded",
    "host": "https://aerion-dev.cde.fullstream.ai/appshell-sample-app",
    "path": "/demo-app",
    "template": "/micro-app.html",
    "navService": "/nav",
    "default": false,
    "feedbackFlag": true
  }];
  window.localStorage.setItem('microapps',JSON.stringify(microapp));
    const wrapper= mount(<MockTheme><MainComponent {...prop}/></MockTheme>);
    const component = wrapper.find("MainComponent").at(0);
    const result=component.instance().checkAppName();
    expect(result).toBeUndefined();
    global.callPermissionsApi.mockClear();
  });
  it("check with not existing app condition",()=>{

  global.callPermissionsApi = jest.fn((props) => {return null});
  const prop={location:{pathname:"/demo-app/"}};
  window.localStorage.setItem('navigation',JSON.stringify(navigation));
  const microapp=[{
    "id": "demoapp",
    "name": "Demo App",
    "link": "/demo-app/",
    "icon": "archiverounded",
    "host": "https://aerion-dev.cde.fullstream.ai/appshell-sample-app",
    "path": "/demo-app",
    "template": "/micro-app.html",
    "navService": "/nav",
    "default": false,
    "feedbackFlag": true
  }];
  const userInfoDialogMap = [
    {
      "type": "app",
      "location": "/setting-app/",
      "name": "Settings",
      "mode": "spa",
      "icon": "tune"
    },
    {
      "type": "app",
      "location": "/user-management/",
      "name": "User Management",
      "mode": "spa",
      "icon": "person"
    }
  ]
  window.localStorage.setItem('userInfoDialogMap',JSON.stringify(userInfoDialogMap));
  window.localStorage.setItem('microapps',JSON.stringify(microapp));
  window.localStorage.setItem('permissions','[{"rsid":"5cc4a8cf-5555-4991-9b5b-add314bc2dcb","rsname":"usermanagement-appbuilder"},{"rsid":"9e0650a0-5859-49ba-b475-c3dd5711da37","rsname":"userManagementAdminConsole"},{"rsid":"efa77ac0-7122-4ef7-affb-d37ebd540656","rsname":"keycloakAdminConsole"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1"},{"rsid":"09110955-4ea0-4f89-ba5e-c5fabd886a95","rsname":"demoapp"},{"rsid":"12b750e4-f119-4b43-890d-76cdf1dab9b0","rsname":"rdc"},{"rsid":"acea652a-0ec5-4aee-9b35-361391ec3080","rsname":"postman2"},{"rsid":"7fefd599-8489-4f5c-8960-0653b4edbf3e","rsname":"appbuilder"},{"scopes":["view","edit"],"rsid":"08135af7-dbd6-4fb4-8402-db269cf52b3d","rsname":"eventApp"},{"rsid":"9b19fee2-b2bc-4cfe-98f0-7cf6c141eea2","rsname":"spsDashboard"},{"scopes":["view","edit","delete"],"rsid":"d7091a30-a71a-4562-aba9-a5b284eb00b1","rsname":"userprofileapp"},{"rsid":"5fc8e2bf-0682-435a-a0e5-04247bab5cbc","rsname":"test2"},{"rsid":"c0522bab-cee7-4c62-bf2b-5b1a29c288ca","rsname":"appbuilder22"},{"rsid":"776d08ef-8956-487a-bcc9-e78dba0df955","rsname":"postman1"},{"scopes":["view"],"rsid":"fc0961be-dc5e-4b1a-b0e8-a7e7cef6c855","rsname":"statusApp"},{"rsid":"83329121-3a3b-4f15-ac50-3a78b29a4da1","rsname":"s1ei-ui-hierarchy-modes"},{"rsid":"46fcc576-e98d-47ae-8b9d-ed44a4747fe7","rsname":"Default Resource"},{"rsid":"5eacbd66-2202-44aa-a52e-f0bc507e60e0","rsname":"usermanagement"},{"scopes":["view","edit"],"rsid":"94df187c-520f-4fee-965e-84e6ddda76b2","rsname":"assetTree"},{"rsid":"fbc3c49d-c55c-45cb-99c3-e34ea5688ef9","rsname":"dremio"},{"rsid":"439577cb-772e-4daa-8d19-a93eeb807139","rsname":"reportbuilder"}]');
  mount(<MockTheme><MainComponent {...prop}/></MockTheme>);
  });
  it("check with horizontal layout",()=>{

    global.callPermissionsApi = jest.fn((props) => {return null}
  );
  const prop={location:{pathname:"/demo-app/"}};
  const userInfoDialogMap = [
    {
      "type": "app",
      "location": "/setting-app/",
      "name": "Settings",
      "mode": "spa",
      "icon": "tune"
    },
    {
      "type": "app",
      "location": "/user-management/",
      "name": "User Management",
      "mode": "spa",
      "icon": "person"
    }
  ]
  window.localStorage.setItem('designTemplate', 'system1-multiapp');
  window.localStorage.setItem('commonappImpacted',JSON.stringify([{"originaterApp":"demoapp"}]));
  window.localStorage.setItem('userInfoDialogMap',JSON.stringify(userInfoDialogMap));
  window.localStorage.setItem('navigation',JSON.stringify(navigation));
  const microapp=[{
    "id": "demoapp",
    "name": "Demo App",
    "link": "/demo-app/",
    "icon": "archiverounded",
    "host": "https://aerion-dev.cde.fullstream.ai/appshell-sample-app",
    "path": "/demo-app",
    "template": "/micro-app.html",
    "navService": "/nav",
    "default": false,
    "feedbackFlag": true
  }];
  window.localStorage.setItem('microapps',JSON.stringify(microapp));
  window.localStorage.setItem('permissions','[{"rsid":"5cc4a8cf-5555-4991-9b5b-add314bc2dcb","rsname":"usermanagement-appbuilder"},{"rsid":"9e0650a0-5859-49ba-b475-c3dd5711da37","rsname":"userManagementAdminConsole"},{"rsid":"efa77ac0-7122-4ef7-affb-d37ebd540656","rsname":"keycloakAdminConsole"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1"},{"rsid":"09110955-4ea0-4f89-ba5e-c5fabd886a95","rsname":"demoapp"},{"rsid":"12b750e4-f119-4b43-890d-76cdf1dab9b0","rsname":"rdc"},{"rsid":"acea652a-0ec5-4aee-9b35-361391ec3080","rsname":"postman2"},{"rsid":"7fefd599-8489-4f5c-8960-0653b4edbf3e","rsname":"appbuilder"},{"scopes":["view","edit"],"rsid":"08135af7-dbd6-4fb4-8402-db269cf52b3d","rsname":"eventApp"},{"rsid":"9b19fee2-b2bc-4cfe-98f0-7cf6c141eea2","rsname":"spsDashboard"},{"scopes":["view","edit","delete"],"rsid":"d7091a30-a71a-4562-aba9-a5b284eb00b1","rsname":"userprofileapp"},{"rsid":"5fc8e2bf-0682-435a-a0e5-04247bab5cbc","rsname":"test2"},{"rsid":"c0522bab-cee7-4c62-bf2b-5b1a29c288ca","rsname":"appbuilder22"},{"rsid":"776d08ef-8956-487a-bcc9-e78dba0df955","rsname":"postman1"},{"scopes":["view"],"rsid":"fc0961be-dc5e-4b1a-b0e8-a7e7cef6c855","rsname":"statusApp"},{"rsid":"83329121-3a3b-4f15-ac50-3a78b29a4da1","rsname":"s1ei-ui-hierarchy-modes"},{"rsid":"46fcc576-e98d-47ae-8b9d-ed44a4747fe7","rsname":"Default Resource"},{"rsid":"5eacbd66-2202-44aa-a52e-f0bc507e60e0","rsname":"usermanagement"},{"scopes":["view","edit"],"rsid":"94df187c-520f-4fee-965e-84e6ddda76b2","rsname":"assetTree"},{"rsid":"fbc3c49d-c55c-45cb-99c3-e34ea5688ef9","rsname":"dremio"},{"rsid":"439577cb-772e-4daa-8d19-a93eeb807139","rsname":"reportbuilder"}]');
    const wrapper= mount(<MockTheme><MainComponent {...prop}/></MockTheme>);
    const component = wrapper.find("MainComponent").at(0);
    const result=component.instance().checkAppName();
    expect(result.name).toBe('Demo App');
    global.callPermissionsApi.mockClear();
  });
  it("check with zero navigation",()=>{

    global.callPermissionsApi = jest.fn((props) => {return null}
  );
  const prop={location:{pathname:"/demo-app/"}};
  const userInfoDialogMap = [
    {
      "type": "app",
      "location": "/setting-app/",
      "name": "Settings",
      "mode": "spa",
      "icon": "tune"
    },
    {
      "type": "app",
      "location": "/user-management/",
      "name": "User Management",
      "mode": "spa",
      "icon": "person"
    }
  ]
  window.localStorage.setItem('designTemplate', 'system1-multiapp');
  window.localStorage.setItem('commonappImpacted',JSON.stringify([{"originaterApp":"demoapp"}]));
  window.localStorage.setItem('userInfoDialogMap',JSON.stringify(userInfoDialogMap));
  window.localStorage.setItem('navigation',JSON.stringify([]));
  const microapp=[{
    "id": "demoapp",
    "name": "Demo App",
    "link": "/demo-app/",
    "icon": "archiverounded",
    "host": "https://aerion-dev.cde.fullstream.ai/appshell-sample-app",
    "path": "/demo-app",
    "template": "/micro-app.html",
    "navService": "/nav",
    "default": true,
    "feedbackFlag": true
  }];
  window.localStorage.setItem('microapps',JSON.stringify(microapp));
  window.localStorage.setItem('permissions','[{"rsid":"5cc4a8cf-5555-4991-9b5b-add314bc2dcb","rsname":"usermanagement-appbuilder"},{"rsid":"9e0650a0-5859-49ba-b475-c3dd5711da37","rsname":"userManagementAdminConsole"},{"rsid":"efa77ac0-7122-4ef7-affb-d37ebd540656","rsname":"keycloakAdminConsole"},{"scopes":["viewdashboard"],"rsid":"e8d0ffbb-c650-47ba-91dc-d49c86b632db","rsname":"microapp1"},{"rsid":"09110955-4ea0-4f89-ba5e-c5fabd886a95","rsname":"demoapp"},{"rsid":"12b750e4-f119-4b43-890d-76cdf1dab9b0","rsname":"rdc"},{"rsid":"acea652a-0ec5-4aee-9b35-361391ec3080","rsname":"postman2"},{"rsid":"7fefd599-8489-4f5c-8960-0653b4edbf3e","rsname":"appbuilder"},{"scopes":["view","edit"],"rsid":"08135af7-dbd6-4fb4-8402-db269cf52b3d","rsname":"eventApp"},{"rsid":"9b19fee2-b2bc-4cfe-98f0-7cf6c141eea2","rsname":"spsDashboard"},{"scopes":["view","edit","delete"],"rsid":"d7091a30-a71a-4562-aba9-a5b284eb00b1","rsname":"userprofileapp"},{"rsid":"5fc8e2bf-0682-435a-a0e5-04247bab5cbc","rsname":"test2"},{"rsid":"c0522bab-cee7-4c62-bf2b-5b1a29c288ca","rsname":"appbuilder22"},{"rsid":"776d08ef-8956-487a-bcc9-e78dba0df955","rsname":"postman1"},{"scopes":["view"],"rsid":"fc0961be-dc5e-4b1a-b0e8-a7e7cef6c855","rsname":"statusApp"},{"rsid":"83329121-3a3b-4f15-ac50-3a78b29a4da1","rsname":"s1ei-ui-hierarchy-modes"},{"rsid":"46fcc576-e98d-47ae-8b9d-ed44a4747fe7","rsname":"Default Resource"},{"rsid":"5eacbd66-2202-44aa-a52e-f0bc507e60e0","rsname":"usermanagement"},{"scopes":["view","edit"],"rsid":"94df187c-520f-4fee-965e-84e6ddda76b2","rsname":"assetTree"},{"rsid":"fbc3c49d-c55c-45cb-99c3-e34ea5688ef9","rsname":"dremio"},{"rsid":"439577cb-772e-4daa-8d19-a93eeb807139","rsname":"reportbuilder"}]');
  mount(<MockTheme><MainComponent {...prop}/></MockTheme>);
  window.localStorage.setItem('navigation',JSON.stringify(navigation));
  mount(<MockTheme><MainComponent {...prop}/></MockTheme>);
  });
  });