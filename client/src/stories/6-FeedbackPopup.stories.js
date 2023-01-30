import React from 'react';

import Feedback from '../FeedbackPopup';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default {
  title: 'Feedback popup',
  component: Feedback,
};

const Template = (args) => <MuiThemeProvider><Feedback {...args} /></MuiThemeProvider>;


export const feedback = Template.bind({});
feedback.args = {
    isOpen: true,
    t: (key) => {return key}
};

