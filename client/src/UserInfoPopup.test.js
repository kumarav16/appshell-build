import React from "react";
import { mount } from 'enzyme';
import UserInfoPopUp from './UserInfoPopUp';

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component) => {
    Component.defaultProps = { ...Component.defaultProps, t: (key) => key };
    return Component;
  },
}));

describe('UserInfoPopUp', () => {
  const CommonComponentProps = {
    "t": jest.fn(),
    "tReady": true,
    "userInfo": {
      "name": "funcuser01",
      "email": "funcuser@bh.com",
      "title": [
        "F",
        "U"
      ],
      "firstName": "Func",
      "lastName": "User"
    },
    "userInfoDialogMap": [
      {
        "type": "file",
        "location": "/i18.html",
        "name": "richHTML",
        "mode": "spa",
        "icon": "tune"
      },
      {
        "type": "file",
        "location": "/openResourceAttributes.html",
        "name": "html",
        "mode": "spa",
        "icon": "tune"
      },
      {
        "type": "group",
        "mode": "spa",
        "name": "About",
        "icon": "tune",
        "subMenu": [
          {
            "location": "/openResourceAttributes.txt",
            "name": "Licenses Attributions",
            "icon": "tune",
            "default": true
          },
          {
            "location": "/i18.txt",
            "name": "Version",
            "icon": "tune",
            "default": false
          }
        ]
      },
      {
        "type": "group",
        "mode": "spa",
        "name": "Theme",
        "id":"theme",
        "icon": "tune",
        "subMenu": [
          {
            "name": "darkTheme",
            "theme": "dark",
            "default": true
          },
          {
            "name": "lightTheme",
            "theme": "light",
            "default": false
          }
        ]
      }
    ],
    "setIsOpen": jest.fn(),
    "setIsLogoutOpen": jest.fn(),
    "classes": {
      "bhSettingsMenu": "jss105"
    },
    "isOpen": true,
  };
  // it('verify for UserInfoPopUp data when loads', () => {
  //   const component = mount(<UserInfoPopUp {...CommonComponentProps} />);
  //   console.log("**comp", component);
  //   expect(component).toMatchSnapshot();
  // });

  it('verify for UserInfoPopUp data when loads with empty strings', () => {
    const props = {...CommonComponentProps, 
      "userInfo": {
        "name": "funcuser01",
        "email": "",
        "title": [
          "F",
          "U"
        ],
        "firstName": "",
        "lastName": ""
      }, "isOpen": false}
    const component = mount(<UserInfoPopUp {...props} />);
    expect(component).toMatchSnapshot();
  });

});