import React from 'react';

import CollapseExpandWrapper from '../components/CollapseExpandWrapper';

export default {
  title: 'CollapseExpandWrapper',
  component: CollapseExpandWrapper,
};

const Template = (args) => <CollapseExpandWrapper {...args} ></CollapseExpandWrapper>;


export const appLoad = Template.bind({});
appLoad.args = {
  id:"dremio", 
  style:{
  
  }  
};

