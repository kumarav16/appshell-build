import React from 'react';

import GlobalSearch from '../components/GlobalSearch';

export default {
  title: 'Global search',
  component: GlobalSearch,
};

const Template = (args) => <GlobalSearch {...args} />;

export const System1 = Template.bind({});
System1.args = {
    placeholder: "Search",
    isSmall: true,
    inputInActiveWidth: "280px",
    inputActiveWidth: "336px",
    inputActiveTextColor: "rgba(18, 18, 18, 1)",
    inputInActiveTextColor: "rgba(255, 255, 255, 0.6)",
    inputActiveIconColor: "rgba(18, 18, 18, 1)",
    inputInActiveIconColor: "rgba(255, 255, 255, 0.6)",
    inputActiveBgColor: "white",
    inputInActiveBgColor: "#014D40",
    searchIcon:"ghost",
    t: (key) => {return key}
};

export const ValvCentral = Template.bind({});
ValvCentral.args = {
    placeholder: "Search",
    isDropdown: true,
    dropdownData: ['All','Orders'],
    defaultDropdownValue: "All",
    inputActiveWidth: "367px",
    inputInActiveWidth: "367px",
    dropdownWidth: "205px",
    t: (key) => {return key}
};
