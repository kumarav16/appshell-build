import React from 'react';
import {mount} from 'enzyme';
import GlobalSearch from './GlobalSearch';

describe('Global search testing starts',()=>{
	it("Global search testing starts type 1",()=>{
		window.localStorage.setItem('searchConfig',JSON.stringify({
			"id": "search",
      "component": "GlobalSearch",
      "props": {
        "placeholder": "Search",
        "isDropdown": true,
        "dropdownData": ["All","Orders","Plotsyjgytftyftftf"],
        "defaultDropdownValue": "All",
        "inputActiveWidth": "367px",
        "inputInActiveWidth": "367px",
        "dropdownWidth": "105px"
      }, 
      "navigationObject": {
        "mode": "spa",
        "appName": "eventApp"
      }
		}));
		const props = {
			"placeholder": "Search",
			"isDropdown": true,
			"dropdownData": ["All","Orders","Plotsyjgytftyftftf"],
			"defaultDropdownValue": "All",
			"inputActiveWidth": "367px",
			"inputInActiveWidth": "367px",
			"dropdownWidth": "105px"
		}
		const t = (key) => {return key};
		const searchcomponent = mount(<GlobalSearch t={t} {...props}/>);
		const searchboard = searchcomponent.find("GlobalSearch").at(0);
		searchboard.instance().saveEnteredValue({detail:""});
		searchboard.instance().saveDropdownValue({detail:"All"});
		jest.useFakeTimers();
		searchboard.instance().shareSearchContext();
		jest.advanceTimersByTime(701);
	});
	it("Global search testing starts type 2",()=>{
		window.localStorage.setItem('searchConfig',JSON.stringify({
			"id": "search",
      "component": "GlobalSearch",
      "props": {
        "placeholder": "Search",
        "isSmall": true,
        "inputInActiveWidth": "280px",
        "inputActiveWidth": "336px",
        "inputActiveTextColor": "rgba(18, 18, 18, 1)",
        "inputInActiveTextColor": "rgba(255, 255, 255, 0.6)",
        "inputActiveIconColor": "rgba(18, 18, 18, 1)",
        "inputInActiveIconColor": "rgba(255, 255, 255, 0.6)",
        "inputActiveBgColor": "white",
        "inputInActiveBgColor": "#014D40",
        "searchIcon":"ghost"
      }, 
      "navigationObject": {
        "mode": "spa",
        "appName": "eventApp"
      }
		}));
		const props = {
			"placeholder": "Search",
			"isSmall": true,
			"inputInActiveWidth": "280px",
			"inputActiveWidth": "336px",
			"inputActiveTextColor": "rgba(18, 18, 18, 1)",
			"inputInActiveTextColor": "rgba(255, 255, 255, 0.6)",
			"inputActiveIconColor": "rgba(18, 18, 18, 1)",
			"inputInActiveIconColor": "rgba(255, 255, 255, 0.6)",
			"inputActiveBgColor": "white",
			"inputInActiveBgColor": "#014D40",
			"searchIcon":"ghost"
		}
		window.localStorage.setItem("designTemplate", "system1-multiapp");
		const t = (key) => {return key};
		const searchcomponent = mount(<GlobalSearch t={t} {...props}/>);
		
		const searchboard = searchcomponent.find("GlobalSearch").at(0);
		searchboard.instance().saveEnteredValue({detail:""});
		searchboard.instance().saveDropdownValue({detail:"All"});
		searchboard.instance().shareSearchContext();
	})
})