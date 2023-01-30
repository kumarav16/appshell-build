import React from "react";
import { mount } from 'enzyme';
import NotificationsMenu from './NotificationsMenu';

jest.mock("react-i18next", () => ({
    withTranslation: () => (Component) => {
        Component.defaultProps = { ...Component.defaultProps, t: (key) => key };
        return Component;
    },
}));

describe('NotificationsMenu', () => {

    it('verify for NotificationsMenu data got success when loads', () => {
        const CommonComponentProps = {
            "announcementsClose": jest.fn(),
            "viewNotification": jest.fn(),
            "toggleNotificationsMenu": jest.fn(),
            "t": jest.fn(),
            "data": [
                {
                    "id": 924,
                    "annoucementData": {
                        "id": 389,
                        "name": "ANCH_TDK105",
                        "description": "ANCH_TDK105",
                        "fileUploaded": "ANCH_TD105",
                        "startDate": "2022-04-02T00:00:00.000+00:00",
                        "endDate": null,
                        "isPinned": true,
                        "type": "ANNOUNCEMENT",
                        "isActive": true,
                        "createdBy": "",
                        "createDate": "2022-04-01T05:12:05.024+00:00",
                        "lastUpdatedBy": "",
                        "updateDate": "2022-04-01T05:12:05.024+00:00"
                    },
                    "userId": "amaanullah.shaikh@bakerhughes.com",
                    "markAs": false,
                    "isActive": true,
                    "createDate": "2022-04-01T05:12:07.273+00:00",
                    "createBy": null,
                    "updateDate": "2022-04-01T05:12:07.273+00:00",
                    "updateBy": null
                }
            ],
            "errorCode":"0",
            "errorMessage": "",
            "count": 8,
            "classes": {
                "notificationmenu": "jss135"
            },
            "errorStatus": false,
            "noNotificationsStatus": false,
            "showNotificationsMenu": true,
            "viewNotificationError": false,
            "viewNotificationErrorMsg": "Pdf download error",
            "tReady": true,
        };
        const component = mount(<NotificationsMenu {...CommonComponentProps} />);
        expect(component).toMatchSnapshot();
    });

    it('verify for NotificationsMenu gets showNotificationsMenu as false', () => {
        const CommonComponentProps = {
            "announcementsClose": jest.fn(),
            "viewNotification": jest.fn(),
            "toggleNotificationsMenu": jest.fn(),
            "t": jest.fn(),
            "data": [],
            "errorCode":"200",
            "errorMessage": "",
            "count": 8,
            "classes": {
                "notificationmenu": "jss135"
            },
            "errorStatus": false,
            "noNotificationsStatus": false,
            "showNotificationsMenu": false,
            "viewNotificationError": false,
            "viewNotificationErrorMsg": "Pdf download error",
            "tReady": true,
        };
        const component = mount(<NotificationsMenu {...CommonComponentProps} />);
        expect(component).toMatchSnapshot();
    });

});