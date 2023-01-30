import React from 'react';

import CommonComponent from '../components/CommonComponent';

export default {
  title: 'CommonComponent',
  component: CommonComponent,
};

const Template = (args) => <CommonComponent {...args} ></CommonComponent>;


export const CommonComponentLoad = Template.bind({});
  CommonComponentLoad.args = {
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
  }
  

