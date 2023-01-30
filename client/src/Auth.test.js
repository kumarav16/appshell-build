import React from 'react';
import { withRouter } from "react-router";
import Loading from './Loading';
import Auth from './Auth';
import {MemoryRouter} from 'react-router-dom';
import {mount} from "enzyme";
import { jssPreset } from '@material-ui/core';

describe("test Auth component functions",()=>{

    
    it("check getPermissionListByAppId method in window with valid app name",()=>{

        const wrapper= mount(<MemoryRouter initialEntries={['/auth']}><Auth/></MemoryRouter>);
        const permissions= [
            {
              "scopes": [
                "view",
                "delete"
              ],
              "rsid": "d45dd0cc-13d5-405f-9f77-198a5d3c2ae0",
              "rsname": "assetapp"
            },
            {
              "rsid": "fd1a8e91-1963-4986-a6e1-015fe91b52f6",
              "rsname": "Default Resource"
            }
          ];
          window.localStorage.setItem("permissions",JSON.stringify(permissions));
          const permssionobj=window.getPermissionListByAppId("assetapp");
          expect(permssionobj.rsname).toBe("assetapp");
          expect(permssionobj.scopes).toHaveLength(2);


    });


    it("check getPermissionListByAppId method in window with invalid app name",()=>{

        const wrapper= mount(<MemoryRouter initialEntries={['/auth']}><Auth/></MemoryRouter>);
        const permissions= [
            {
              "scopes": [
                "view",
                "delete"
              ],
              "rsid": "d45dd0cc-13d5-405f-9f77-198a5d3c2ae0",
              "rsname": "assetapp"
            },
            {
              "rsid": "fd1a8e91-1963-4986-a6e1-015fe91b52f6",
              "rsname": "Default Resource"
            }
          ];
          window.localStorage.setItem("permissions",JSON.stringify(permissions));
          const permssionobj=window.getPermissionListByAppId("eventapp");
          expect(permssionobj).toBeUndefined();
        


    });


 /*   it("check token validity call invokation",()=>{
         global.fetch = jest.fn(() =>
         Promise.resolve({
           json: () => Promise.resolve({    responseStatus:200,tokenvalid:false,sessionID:"abc" }),
         })
       );
       
         const wrapper=mount(<MemoryRouter initialEntries={['/auth']}><Auth/></MemoryRouter>);
         process.nextTick(() => { 

            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith('/tokenvalidity', 
            {'headers': {'Accept': 'application/json', 'Content-Type': 'application/json'}, 'method': 'GET'});

            expect(window.localStorage.getItem('tokenvalid')).toBeFalsy();
            expect(window.localStorage.getItem('sessionID')).toBe('abc');
            global.fetch.mockClear();

         });
    });*/

    it("check call permission api",async ()=>{

        const permissions= [
            {
              "scopes": [
                "view",
                "delete"
              ],
              "rsid": "d45dd0cc-13d5-405f-9f77-198a5d3c2ae0",
              "rsname": "assetapp"
            },
            {
              "rsid": "fd1a8e91-1963-4986-a6e1-015fe91b52f6",
              "rsname": "Default Resource"
            }
          ];

        global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ roles: { permissions: permissions } }),
          status:200,
        })
      );
      
     

      const wrapper=mount(<MemoryRouter initialEntries={['/auth']}><Auth/></MemoryRouter>);
      const component = wrapper.find("Auth").at(0);

      const rate = await component.instance().callPermissionsApi();
      expect(rate.roles.permissions).toHaveLength(2);
      expect(global.fetch).toHaveBeenCalledTimes(2);
      global.fetch.mockClear();
    });
});