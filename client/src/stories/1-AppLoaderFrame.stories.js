import React from 'react';

import AppLoaderFrame from '../components/AppLoaderFrame';

export default {
  title: 'AppLoaderFrame',
  component: AppLoaderFrame,
};

const Template = (args) => <AppLoaderFrame {...args} >"hello"</AppLoaderFrame>;


export const appLoad = Template.bind({});
appLoad.args = {
  id:"dremio", 
  style:{
    "border": "1px solid green"
  }  
};

