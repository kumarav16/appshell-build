import React from "react";
import ListItems from './ListItems';
import '../ListItems/ListItems.css';
import { mount } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';

jest.mock("react-i18next", () => ({
    withTranslation: () => (Component) => {
        Component.defaultProps = { ...Component.defaultProps, t: (key) => key };
        return Component;
    },
}));

describe('ListItems', () => {

    it('verify for ListItems data got success when loads', () => {
        const CommonComponentProps = {
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
            "isError": false,
            "noNotificationsStatus": false,
            "errorCode":"200",
            "errorMessage": "",
            "count": 8,
            "t": jest.fn(),
            "timeFromNow": jest.fn()
        };
        const component = mount(<ListItems {...CommonComponentProps} />);
        expect(component).toMatchSnapshot();
    });

    it('verify for ListItems when error throws', () => {
        const CommonComponentProps = {
            "data": [],
            "isError": true,
            "noNotificationsStatus": true,
            "errorCode":"400",
            "errorMessage": "Error!",
            "count": 0,
            "t": jest.fn(),
            "timeFromNow": jest.fn()
        };
        const component = mount(<ListItems {...CommonComponentProps} />);
        expect(component).toMatchSnapshot();
    });

    it('verify for ListItems notification data got read', () => {
        const CommonComponentProps = {
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
                        "updateDate": "2022-04-01T05:12:05.024+00:00",
                        "isRead": true
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
            "isError": false,
            "noNotificationsStatus": false,
            "errorCode":"200",
            "errorMessage": "",
            "count": 8,
            "t": jest.fn(),
            "timeFromNow": jest.fn()
        };
        const component = mount(<ListItems {...CommonComponentProps} />);
        expect(component).toMatchSnapshot();
    });

    it('verify for notification data got its annoucementData type as empty', () => {
        const CommonComponentProps = {
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
                        "type": "",
                        "isActive": true,
                        "createdBy": "",
                        "createDate": "2022-04-01T05:12:05.024+00:00",
                        "lastUpdatedBy": "",
                        "updateDate": "2022-04-01T05:12:05.024+00:00",
                        "isRead": true,
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
            "isError": false,
            "noNotificationsStatus": false,
            "errorCode":"200",
            "errorMessage": "",
            "count": 8,
            "t": jest.fn(),
            "timeFromNow": jest.fn()
        };
        const component = mount(<ListItems {...CommonComponentProps} />);
        expect(component).toMatchSnapshot();
    });

    it('Trigger ViewAll function', () => {
        const CommonComponentProps = {
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
            "isError": false,
            "noNotificationsStatus": false,
            "errorCode":"200",
            "errorMessage": "",
            "count": 8,
            "t": jest.fn(),
            "timeFromNow": jest.fn(),
            "postMessage": jest.fn()
        };
        const headerMenuConfig = [
            {
                "id": "notifications",
                "type": "popup",
                "tooltipText": "Notifications",
                "toolTipTextId": "Notifications",
                "icon": "notifications_none",
                "order": "2",
                "config": {
                    "serviceId": "notifications",
                    "type": "notifications",
                    "navigationObject": {
                        "mode": "spa",
                        "appName": "eventApp"
                    }
                }
            },
            {
                "id": "help",
                "type": "link",
                "tooltipText": "Help",
                "toolTipTextId": "Help",
                "icon": "help_outlined",
                "order": "1",
                "config": {
                    "serviceId": "help",
                    "mode": "TAB",
                    "location": "https://aerion-dev.cde.fullstream.ai/http-serve/help?selectedLaunguage={language}"
                }
            },
            {
                "id": "hello",
                "type": "link",
                "tooltipText": "Hello",
                "toolTipTextId": "Hello",
                "icon": "speedrounded",
                "order": "3",
                "config": {
                    "serviceId": "hello",
                    "mode": "TAB",
                    "location": "https://aerion-dev.cde.fullstream.ai/http-serve/help?language={language}"
                }
            },
            {
                "id": "feedback",
                "type": "popup",
                "tooltipText": "Feedback",
                "toolTipTextId": "Feedback",
                "icon": "rate_review",
                "order": "4",
                "config": {
                    "serviceId": "feedback",
                    "type": "feedback"
                }
            }
        ];
        window.localStorage.setItem('headerMenuConfig',JSON.stringify(headerMenuConfig));
        window.parent.postMessage = jest.fn();
        const { container } = render(<ListItems {...CommonComponentProps} />);
        const button = container.querySelector('button')
        fireEvent.click(button);
        expect(window.parent.postMessage).toBeCalled();
    });

    it('Trigger viewNotification function', () => {
        const CommonComponentProps = {
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
            "isError": false,
            "noNotificationsStatus": false,
            "errorCode":"200",
            "errorMessage": "",
            "count": 8,
            "t": jest.fn(),
            "timeFromNow": jest.fn(),
            "postMessage": jest.fn(),
        };
        const viewNotification = jest.fn();

        const { container } = render(<ListItems {...CommonComponentProps} viewNotification={viewNotification} />);
        const ListItem = container.querySelector('li')
        fireEvent.click(ListItem);
        expect(viewNotification).toBeCalled();
    });
});