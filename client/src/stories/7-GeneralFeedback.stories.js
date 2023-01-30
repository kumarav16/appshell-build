import React from 'react';

import GeneralFeedback from '../components/Feedback/GeneralFeedback';

export default {
  title: 'General feedback',
  component: GeneralFeedback,
};

const Template = (args) => <GeneralFeedback {...args}></GeneralFeedback>;


export const general = Template.bind({});
general.args = {
  open: true,
  t: (key) => {return key}
};

