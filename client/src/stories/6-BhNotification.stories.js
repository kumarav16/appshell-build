import React from 'react';

import BhNotification from '../components/BhNotification';

export default {
  title: 'BhNotification',
  component: BhNotification,
};

const Template = (args) => <BhNotification {...args} isOpen={true} />;

export const Primary = Template.bind({});
Primary.args = {
  "config": {
    "isOpen": true,
    "softDelete": true,
    "tabMenu": true,
    "filter": {
      "filterOptions": [
        {
          "value": "all",
          "label": "All"
        },
        {
          "value": "low",
          "label": "Low"
        },
        {
          "value": "high",
          "label": "High"
        }
      ]
    },
    "icons": {
      "iconOptions": [
        {
          "iconName": "wanrning",
          "type": "Alert",
          "color": "yellow"
        },
        {
          "iconName": "warning",
          "type": "Announments",
          "color": "black"
        },
        {
          "iconName": "info",
          "type": "default"
        }
      ]
    },
    "tabs": {
      "tabOptions": [
        {
          "label": "My Notifications",
          "category": "mynotification"
        },
        {
          "label": "Team Notifications",
          "category": "team"
        }
      ]
    },
    "commonRedirectMicroapp": {
      "navigationObject": {
        "mode": "spa",
        "appName": "eventApp"
      }
    },
    "viewAll": {
      "navigationObject": {
        "mode": "spa",
        "appName": "eventApp"
      }
    },
    "timeSettings": {
      "recent": 86400000
    }
  },
  "data": [
    {
      "id": "chart-comp--notification-0",
      "title": "consectetur0",
      "message": "consectetur0 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-12-01T10:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "System Warning",
      "filterCriteria": "low",
      "status": false,
      "profilePictureUrl": "<url-for-photo>",
      "redirectAPI": "eventApp",
      "navigationPaylaod": "Object/Array Containing payload"
    },
    {
      "id": "chart-comp--notification-1",
      "title": "consectetur1",
      "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-10-20T14:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "System error",
      "filterCriteria": "low",
      "status": false,
      "profilePictureUrl": "<url-for-photo>",
      "redirectAPI": "statusApp",
      "navigationPaylaod": "Object/Array Containing payload"
    },
    {
      "id": "chart-comp--notification-2",
      "title": "consectetur2",
      "message": "consectetur2 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-10-25T12:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "System Info",
      "filterCriteria": "high",
      "status": false,
      "profilePictureUrl": "<url-for-photo>",
      "redirectAPI": "eventApp",
      "navigationPaylaod": "Object/Array Containing payload"
    },
    {
      "id": "chart-comp--notification-3",
      "title": "consectetur3",
      "message": "consectetur3 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-09-30T11:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "User generated",
      "filterCriteria": "low",
      "status": false,
      "profilePictureUrl": "<url-for-photo>",
      "redirectAPI": "statusApp",
      "navigationPaylaod": "Object/Array Containing payload"
    },
    {
      "id": "chart-comp--notification-4",
      "title": "consectetur4",
      "message": "consectetur4 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-09-30T11:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "Alert",
      "filterCriteria": "low",
      "status": false,
      "profilePictureUrl": "<url-for-photo>",
      "redirectAPI": "statusApp",
      "navigationPaylaod": "Object/Array Containing payload"
    },
    {
      "id": "chart-comp--notification-5",
      "title": "consectetur5",
      "message": "consectetur4 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
      "createdDateTime": "2022-09-30T11:38:06+05:30",
      "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
      "type": "Announments",
      "filterCriteria": "low",
      "status": false,
      "profilePictureUrl": "<url-for-photo>",
      "redirectAPI": "statusApp",
      "navigationPaylaod": "Object/Array Containing payload"
    }
  ],
  t: (key) => { return key }
};
