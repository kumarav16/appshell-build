import React from 'react';
import {NotificationsMenu} from '../components/NotificationsMenu/NotificationsMenu';

const notificationType = {
  Announcement: 'announcement',
  Alert: 'alert',
  Note: 'note'
}

export default {
  title: 'NotificationsMenu',
  component: NotificationsMenu,
  argTypes: {
    notificationType: { 
      control: { 
        type: "select", 
        options: notificationType
      }
    },
    errorStatus: {
      control: {
        type: 'boolean'
      }
    },
  }
};

const Template = (args) => <NotificationsMenu {...args} ></NotificationsMenu>;

export const Primary = Template.bind({});
Primary.args = {
  errorMessage: 'Oops! Something went wrong.',
  bellIcon: 'black',
  errorStatus : false,
  initialsColor: 'purple',
  viewAllUrl: 'www.google.com'
};

