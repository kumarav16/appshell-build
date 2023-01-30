import React from "react";
import _ from "lodash";
import { mount, shallow } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';
import BhNotification from './BhNotification';
import moment from "moment";
import "./BhNotification.css";
import { BhButtonTabs, BhActionMenu, BhPanel, BhIcon, BhButton, BhDivider, BhStatusIndicator, BhAvatar, BhSpinner } from
    '@baker-hughes-central-design/ui-toolkit-react/dist/components';

jest.mock("react-i18next", () => ({
    withTranslation: () => (Component) => {
        Component.defaultProps = { ...Component.defaultProps, t: (key) => key };
        return Component;
    },
}));

describe('BhNotification', () => {
    //Recent timestamp included
    const recentTimestamp = moment(new Date()).subtract(2, 'hours').format();
    const CommonComponentProps = {
        "handleCustomEvent": jest.fn(),
        "markNotificationRead": jest.fn(),
        "t": jest.fn(),
        "config": {
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
                    },
                ]
            },
            "tabMenu": true,
            "softDelete": true,
            "pollNotificationTimeInterval": 300000,
            "viewAll": {
                "navigationObject": {
                    "mode": "spa",
                    "appName": "eventApp"
                }
            },
            "isOpen": false,
            "requestAdvNotification": true,
            "notificationErrorScreen": false,
            "updateErrorId": "chart-comp--notification-1",
            "removedId": []
        },
        "data": {
            "isPartialResponse": true,
            "isNoResponse": false,
            "items": [
                {
                    "id": "chart-comp--notification-0",
                    "title": "consectetur0",
                    "message": "consectetur0 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                    "createdDateTime": recentTimestamp,
                    "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                    "type": "System Warning",
                    "filterCriteria": "low",
                    "status": false,
                    "profilePictureUrl": "<url-for-photo>",
                    "redirectAPI": "MicroappId/third party URL",
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
                    "redirectAPI": "MicroappId/third party URL",
                    "navigationPaylaod": "Object/Array Containing payload"
                },
                {
                    "id": "chart-comp--notification-2",
                    "title": "consectetur2",
                    "message": "consectetur2 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                    "createdDateTime": "2022-12-08T12:38:06+05:30",
                    "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                    "type": "System Info",
                    "filterCriteria": "high",
                    "status": false,
                    "profilePictureUrl": "<url-for-photo>",
                    "redirectAPI": "MicroappId/third party URL",
                    "navigationPaylaod": "Object/Array Containing payload"
                },
                {
                    "id": "chart-comp--notification-3",
                    "title": "consectetur3",
                    "message": "consectetur3 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                    "createdDateTime": "2022-11-30T11:38:06+05:30",
                    "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                    "type": "User generated",
                    "filterCriteria": "low",
                    "status": false,
                    "profilePictureUrl": "<url-for-photo>",
                    "redirectAPI": "MicroappId/third party URL",
                    "navigationPaylaod": "Object/Array Containing payload"
                },
                {
                    "id": "chart-comp--notificationIconColorElseCase",
                    "title": "consecteturIconColorElseCase",
                    "message": "consecteturIconColorElseCase ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                    "createdDateTime": "2022-12-26T12:38:06+05:30",
                    "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                    "type": "System Alert",
                    "filterCriteria": "high",
                    "status": false,
                    "profilePictureUrl": "<url-for-photo>",
                    "redirectAPI": "MicroappId/third party URL",
                    "navigationPaylaod": "Object/Array Containing payload"
                },
                {
                    "id": "chart-comp--noTitlenoMessagenoType",
                    "title": "",
                    "message": "",
                    "createdDateTime": "2022-12-21T12:38:06+05:30",
                    "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                    "type": "",
                    "filterCriteria": "high",
                    "status": false,
                    "profilePictureUrl": "<url-for-photo>",
                    "redirectAPI": "MicroappId/third party URL",
                    "navigationPaylaod": "Object/Array Containing payload"
                },
                {
                    "id": "chart-comp--userGeneratedTypenoCreatedByDetails",
                    "title": "User generated title",
                    "message": "User generated message",
                    "createdDateTime": "2022-12-21T12:38:06+05:30",
                    "createdBy": "",
                    "type": "User generated",
                    "filterCriteria": "high",
                    "status": false,
                    "profilePictureUrl": "<url-for-photo>",
                    "redirectAPI": "MicroappId/third party URL",
                    "navigationPaylaod": "Object/Array Containing payload"
                }
            ]
        }
    };

    const datedRow = {
        "isPartialResponse": true,
        "isNoResponse": false,
        "items": [{
            "id": "chart-comp--notification-4",
            "title": "consectetur4",
            "message": "consectetur4 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
            "createdDateTime": "2022-09-30T11:38:06+05:30",
            "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
            "type": "System Info",
            "filterCriteria": "low",
            "status": false,
            "profilePictureUrl": "<url-for-photo>",
            "redirectAPI": "statusApp",
            "navigationPaylaod": "Object/Array Containing payload"
        }]
    };

    const onRemove = jest.fn()

    const notificationRenderComp = <div className="notif--group">
        <p className="typography--label-small text-color-secondary notif--date">Today</p>
        <>
            <div id="chart-comp--notification-4" className="notif--container motion--normal">
                <div className="notif--status">
                    <BhIcon icon="notification_important" color="var(--color-fill-semantic-info-default)" size="small"></BhIcon>
                </div>
                <div className="notificationContent" id="contentId" onClick={CommonComponentProps.markNotificationRead}>
                    <p className="typography--body-small-semi-bold text-color-primary notif-title">Sed cursus duis consectetur4</p>
                    <p className="typography--body-small text-color-secondary notif--description">consectetur4 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.</p>
                    <p className="typography--body-small text-color-secondary">2022-10-20T15:38:06+05:30</p>
                </div>
                <BhIcon className="closeIcon" icon="close" size="small" onClick={onRemove}></BhIcon>
            </div>
            <BhDivider marginLeft="medium" marginRight="medium" marginTop="none" marginBottom="none"></BhDivider>
        </>
    </div>

    it('verify for BhNotification data got success when loads', () => {
        const component = mount(<BhNotification {...CommonComponentProps} />);
        expect(component).toMatchSnapshot();
    });

    it('verify for BhNotification diff data for icon variations config ', () => {
        const advanceNotificationDataTemp = {
            "isPartialResponse": true,
            "isNoResponse": false,
            "items": [{
                "id": "chart-comp--notification-Alerts",
                "title": "consecteturAlerts",
                "message": "consecteturAlerts ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                "createdDateTime": "2022-09-30T11:38:06+05:30",
                "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                "type": "Alerts",
                "filterCriteria": "low",
                "status": false,
                "profilePictureUrl": "<url-for-photo>",
                "redirectAPI": "statusApp",
                "navigationPaylaod": "Object/Array Containing payload"
            },
            {
                "id": "chart-comp--notification-Cases",
                "title": "consecteturCases",
                "message": "consecteturCases ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                "createdDateTime": "2022-09-30T11:38:06+05:30",
                "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                "type": "Cases",
                "filterCriteria": "low",
                "status": false,
                "profilePictureUrl": "<url-for-photo>",
                "redirectAPI": "statusApp",
                "navigationPaylaod": "Object/Array Containing payload"
            }
            ]
        };

        const formattedData = [{
            notificationGroup: "",
            notificationList: [{
                "id": "chart-comp--notification-Alerts",
                "title": "consecteturAlerts",
                "message": "consecteturAlerts ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                "createdDateTime": "2022-09-30T11:38:06+05:30",
                "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                "type": "Alerts",
                "filterCriteria": "low",
                "status": false,
                "profilePictureUrl": "<url-for-photo>",
                "redirectAPI": "statusApp",
                "navigationPaylaod": "Object/Array Containing payload"
            },
            {
                "id": "chart-comp--notification-Cases",
                "title": "consecteturCases",
                "message": "consecteturCases ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                "createdDateTime": "2022-09-30T11:38:06+05:30",
                "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                "type": "Cases",
                "filterCriteria": "low",
                "status": false,
                "profilePictureUrl": "<url-for-photo>",
                "redirectAPI": "statusApp",
                "navigationPaylaod": "Object/Array Containing payload"
            }]

        }];
        const alterProps = {
            ...CommonComponentProps, config: {
                ...CommonComponentProps.config, "requestAdvNotification": false, "icons": {
                    "iconOptions": [
                        {
                            "iconName": "notification_important",
                            "value": "Alerts",
                            "color": "pink"
                        },
                        {
                            "value": "Alerts1"
                        },
                        {
                            "iconName": "info",
                            "value": "default"
                        }
                    ]
                }
            }
        };
        const component = mount(<BhNotification {...alterProps} />);
        component.find('BhButtonTabs').props().onBhEventSelected({ "detail": { "key": "recent", "label": "Recent" } });
        component.instance().onTabSelect({ "detail": { "key": "recent", "label": "Recent" } });
        component.setProps({ "data": advanceNotificationDataTemp });
        component.instance().tabLoadData(formattedData, "recent");
        component.instance().getNotificationRow(formattedData);
        component.instance().getIconBasedOnType(formattedData[0].notificationList[0]);
    });

    it('verify for BhNotification diff data for default icon configuration ', () => {
        const advanceNotificationDataTemp = {
            "isPartialResponse": true,
            "isNoResponse": false,
            "items": [
                {
                    "id": "chart-comp--notification-Cases",
                    "title": "consecteturCases",
                    "message": "consecteturCases ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                    "createdDateTime": "2022-09-30T11:38:06+05:30",
                    "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                    "type": "Cases",
                    "filterCriteria": "low",
                    "status": false,
                    "profilePictureUrl": "<url-for-photo>",
                    "redirectAPI": "statusApp",
                    "navigationPaylaod": "Object/Array Containing payload"
                }
            ]
        };

        const formattedData = [{
            notificationGroup: "",
            notificationList: [
                {
                    "id": "chart-comp--notification-Cases",
                    "title": "consecteturCases",
                    "message": "consecteturCases ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                    "createdDateTime": "2022-09-30T11:38:06+05:30",
                    "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                    "type": "Cases",
                    "filterCriteria": "low",
                    "status": false,
                    "profilePictureUrl": "<url-for-photo>",
                    "redirectAPI": "statusApp",
                    "navigationPaylaod": "Object/Array Containing payload"
                }]

        }];
        const alterProps = {
            ...CommonComponentProps, config: {
                ...CommonComponentProps.config, "requestAdvNotification": false, "icons": {
                    "iconOptions": [
                        {
                            "iconName": "info",
                            "value": "default"
                        }
                    ]
                }
            }
        };
        const component = mount(<BhNotification {...alterProps} />);
        component.find('BhButtonTabs').props().onBhEventSelected({ "detail": { "key": "recent", "label": "Recent" } });
        component.instance().onTabSelect({ "detail": { "key": "recent", "label": "Recent" } });
        component.setProps({ "data": advanceNotificationDataTemp });
        component.instance().tabLoadData(formattedData, "recent");
        component.instance().getNotificationRow(formattedData);
        component.instance().getIconBasedOnType(formattedData[0].notificationList[0]);
    });

    it('verify for BhNotification has no data response, no notification yet screen will be displayed', () => {
        const alterProps = {
            ...CommonComponentProps, config: { ...CommonComponentProps.config, "requestAdvNotification": false }, data: {
                "isPartialResponse": false,
                "isNoResponse": true,
                "items": []
            }
        };
        const component = mount(<BhNotification {...alterProps} />);
        expect(component).toMatchSnapshot();
    });

    it('verify for BhNotification has read notification as response, no recent notification message will be displayed', () => {
        const alterProps = {
            ...CommonComponentProps, config: { ...CommonComponentProps.config, "requestAdvNotification": false }, data: {
                "isPartialResponse": false,
                "isNoResponse": false,
                "items": []
            }
        };
        const component = mount(<BhNotification {...alterProps} />);
        expect(component).toMatchSnapshot();
    });

    it('verify for BhNotification has no data response, no notification error screen will be displayed', () => {
        const alterProps = { ...CommonComponentProps, config: { ...CommonComponentProps.config, "requestAdvNotification": false, "notificationErrorScreen": true }, data: {} };
        const component = mount(<BhNotification {...alterProps} />);
        expect(component).toMatchSnapshot();
    });

    it('verify for BhNotification has no tabMenu and no softDelete config data', () => {
        const alterProps = { ...CommonComponentProps, config: { ...CommonComponentProps.config, "tabMenu": false, "softDelete": false } };
        const component = mount(<BhNotification {...alterProps} />);
        component.setState({ activeTab: {} });
        expect(component).toMatchSnapshot();
    });

    it('verify for BhNotification has no filter', () => {
        const alterProps = _.omit(CommonComponentProps, "config.filter");
        const component = mount(<BhNotification {...alterProps} />);
        expect(component).toMatchSnapshot();
    });

    it('verify for BhNotification when config has tab customized', () => {
        const alterProps = {
            ...CommonComponentProps, config: {
                ...CommonComponentProps.config, "requestAdvNotification": false, "tabs": {
                    "tabOptions": [
                        {
                            "label": "My Notifications",
                            "key": "personal"
                        },
                        {
                            "label": "Team Notifications",
                            "key": "team"
                        }
                    ]
                }
            }, "data": datedRow
        };
        const component = mount(<BhNotification {...alterProps} />);
        component.setState({ renderNotificationComp: notificationRenderComp })
    });

    it('verify for BhNotification has timeSettings customized', () => {
        const alterProps = {
            ...CommonComponentProps, config: {
                ...CommonComponentProps.config, "timeSettings": {
                    "recent": 172800000
                }
            }
        };
        const component = mount(<BhNotification {...alterProps} />);
        component.setState({ activeTab: {} });
        expect(component).toMatchSnapshot();
    });

    it('verify for BhNotification componentDidUpdate has data', () => {
        const advanceNotificationDataTemp = {
            "isPartialResponse": true,
            "isNoResponse": false,
            "items": [{
                "id": "chart-comp--notification-1",
                "title": "consectetur1",
                "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                "createdDateTime": "2022-10-20T14:38:06+05:30",
                "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                "type": "System error",
                "filterCriteria": "low",
                "status": false,
                "profilePictureUrl": "<url-for-photo>",
                "redirectAPI": "MicroappId/third party URL",
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
                "redirectAPI": "MicroappId/third party URL",
                "navigationPaylaod": "Object/Array Containing payload"
            }
            ]
        };
        const data = [{
            "id": "chart-comp--notification-1",
            "title": "consectetur1",
            "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
            "createdDateTime": "2022-10-20T14:38:06+05:30",
            "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
            "type": "System error",
            "filterCriteria": "low",
            "status": false,
            "profilePictureUrl": "<url-for-photo>",
            "redirectAPI": "MicroappId/third party URL",
            "navigationPaylaod": "Object/Array Containing payload",
            "category": "20 days ago"
        }];
        const alterProps = { ...CommonComponentProps, config: { ...CommonComponentProps.config, "requestAdvNotification": false, "removedId": ["chart-comp--notification-2"] } };
        const component = mount(<BhNotification {...alterProps} />);
        component.setProps({ "data": advanceNotificationDataTemp });
        component.instance().getNotificationDataCall(data)
    });

    it('verify for BhNotification componentDidUpdate has data with no items and removalId is empty', () => {
        const advanceNotificationDataTemp = {
            "isPartialResponse": true,
            "isNoResponse": false
        };
        const data = [];
        const alterProps = { ...CommonComponentProps, config: { ...CommonComponentProps.config, "requestAdvNotification": false } };
        const component = mount(<BhNotification {...alterProps} />);
        component.setProps({ "data": advanceNotificationDataTemp });
        component.instance().getNotificationDataCall(data)
    });

    it('verify for BhNotification componentDidUpdate has data of removalId not empty', () => {
        const advanceNotificationDataTemp = {
            "isPartialResponse": true,
            "isNoResponse": false,
            "items": [{
                "id": "chart-comp--notification-1",
                "title": "consectetur1",
                "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                "createdDateTime": "2022-10-20T14:38:06+05:30",
                "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                "type": "System error",
                "filterCriteria": "low",
                "status": false,
                "profilePictureUrl": "<url-for-photo>",
                "redirectAPI": "MicroappId/third party URL",
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
                "redirectAPI": "MicroappId/third party URL",
                "navigationPaylaod": "Object/Array Containing payload"
            }
            ]
        };
        const alterProps = { ...CommonComponentProps, config: { ...CommonComponentProps.config, "requestAdvNotification": false, "removedId": ["chart-comp--notification-2"] } };
        const component = mount(<BhNotification {...alterProps} />);
        component.setState({ arrAfterRemovedObj: advanceNotificationDataTemp.items });
        component.setProps({ "data": advanceNotificationDataTemp });
    });

    it('verify for BhNotification for onFilterMenu when low menu is selected', () => {
        const component = mount(<BhNotification {...CommonComponentProps} />);
        component.find('BhActionMenu').props().onBhEventSelected({ "detail": { "value": "low", "label": "Low" } });
        component.instance().onFilterMenu({ "detail": { "value": "low", "label": "Low" } });
    });

    it('verify for BhNotification for onFilterMenu All option', () => {
        const component = mount(<BhNotification {...CommonComponentProps} />);
        component.find('BhActionMenu').props().onBhEventSelected({ "detail": { "value": "all", "label": "All" } });
        component.instance().onFilterMenu({ "detail": { "value": "all", "label": "All" } });
    });

    it('verify for BhNotification for onFilterMenu when state arrAfterRemovedObj has value, for other than all filter option ', () => {
        const arrAfterRemovedObjTemp = [{
            "id": "chart-comp--notification-newIdForFilterException",
            "title": "consecteturnewIdForFilterException",
            "message": "consecteturnewIdForFilterException ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
            "createdDateTime": "2022-10-20T14:38:06+05:30",
            "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
            "type": "System error",
            "filterCriteria": "low",
            "status": false,
            "profilePictureUrl": "<url-for-photo>",
            "redirectAPI": "MicroappId/third party URL",
            "navigationPaylaod": "Object/Array Containing payload"
        }];
        const alterProps = { ...CommonComponentProps, config: { ...CommonComponentProps.config, "removedId": ["chart-comp--notification-newIdForFilterException"] } };
        const component = mount(<BhNotification {...alterProps} />);
        component.find('BhButtonTabs').props().onBhEventSelected({ "detail": { "key": "recent", "label": "Recent" } });
        component.setState({ "arrAfterRemovedObj": arrAfterRemovedObjTemp, "removalFlag": true });
        component.instance().onFilterMenu({ "detail": { "value": "low", "label": "Low" } });
    });

    it('verify for BhNotification for onFilterMenu when state arrAfterRemovedObj has value, for all option in filter', () => {
        const arrAfterRemovedObjTemp = [{
            "id": "chart-comp--notification-1",
            "title": "consectetur1",
            "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
            "createdDateTime": "2022-10-20T14:38:06+05:30",
            "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
            "type": "System error",
            "filterCriteria": "low",
            "status": false,
            "profilePictureUrl": "<url-for-photo>",
            "redirectAPI": "MicroappId/third party URL",
            "navigationPaylaod": "Object/Array Containing payload"
        }];
        const alterProps = { ...CommonComponentProps, config: { ...CommonComponentProps.config, "removedId": ["chart-comp--notification-2"] } };
        const component = mount(<BhNotification {...alterProps} />);
        component.find('BhButtonTabs').props().onBhEventSelected({ "detail": { "key": "recent", "label": "Recent" } });
        component.setState({ "arrAfterRemovedObj": arrAfterRemovedObjTemp, "removalFlag": true });
        component.instance().onFilterMenu({ "detail": { "value": "all", "label": "All" } });
    });

    it('verify for BhNotification for onRemove when state arrAfterRemovedObj has value ', () => {
        const arrAfterRemovedObjTemp = [{
            "id": "chart-comp--notification-1",
            "title": "consectetur1",
            "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
            "createdDateTime": "2022-10-20T14:38:06+05:30",
            "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
            "type": "System error",
            "filterCriteria": "low",
            "status": false,
            "profilePictureUrl": "<url-for-photo>",
            "redirectAPI": "MicroappId/third party URL",
            "navigationPaylaod": "Object/Array Containing payload"
        }];
        const component = mount(<BhNotification {...CommonComponentProps} />);
        component.find('BhButtonTabs').props().onBhEventSelected({ "detail": { "key": "recent", "label": "Recent" } });
        component.setState({ "arrAfterRemovedObj": arrAfterRemovedObjTemp, "removalFlag": true });
        component.instance().onRemove(arrAfterRemovedObjTemp[0]);
    });

    it('verify for BhNotification for onRemove (Onclick of close Icon)', () => {
        const alterProps = { ...CommonComponentProps, config: { ...CommonComponentProps.config, "requestAdvNotification": false, "removedId": ["chart-comp--notification-1"] }, "data": datedRow };
        const component = mount(<BhNotification {...alterProps} />);
        component.setState({ renderNotificationComp: notificationRenderComp })
        const wrapper = component.find("#panel--content");
        wrapper.find('.closeIcon').first().prop('onClick')();
        component.instance().onRemove(datedRow.items[0]);
    });

    it('verify for BhNotification for getNotificationRow else scenario of item empty items ', () => {
        const arrAfterRemovedObjTemp = [{
            "id": "chart-comp--notification-1",
            "title": "consectetur1",
            "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
            "createdDateTime": "2022-10-20T14:38:06+05:30",
            "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
            "type": "System error",
            "filterCriteria": "low",
            "status": false,
            "profilePictureUrl": "<url-for-photo>",
            "redirectAPI": "MicroappId/third party URL",
            "navigationPaylaod": "Object/Array Containing payload"
        }];
        const formattedData = [{
            notificationGroup: "",
            notificationList: [{
                "id": "chart-comp--notification-1",
                "title": "consectetur1",
                "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                "createdDateTime": "2022-10-20T14:38:06+05:30",
                "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                "type": "System error",
                "filterCriteria": "low",
                "status": false,
                "profilePictureUrl": "<url-for-photo>",
                "redirectAPI": "MicroappId/third party URL",
                "navigationPaylaod": "Object/Array Containing payload"
            }]

        }];
        const component = mount(<BhNotification {...CommonComponentProps} />);
        component.find('BhButtonTabs').props().onBhEventSelected({ "detail": { "key": "recent", "label": "Recent" } });
        component.setState({ "arrAfterRemovedObj": arrAfterRemovedObjTemp, "removalFlag": true });
        component.instance().onTabSelect({ "detail": { "key": "recent", "label": "Recent" } });
        component.instance().tabLoadData(formattedData, "recent");
        component.instance().getNotificationRow(formattedData);
    });

    it('verify for BhNotification for viewAll', () => {
        window.parent.postMessage = jest.fn();
        const component = mount(<BhNotification {...CommonComponentProps} />);
        component.find('BhA').simulate('click');
        expect(window.parent.postMessage).toBeCalled();
    });

    it('verify for BhNotification for viewAll if scenario', () => {
        const unreadNotification = {
            "isPartialResponse": true,
            "isNoResponse": true,
            "items": []
        };
        const alterProps = { ...CommonComponentProps, config: { ...CommonComponentProps.config, "requestAdvNotification": false }, "data": unreadNotification };
        window.parent.postMessage = jest.fn();
        const component = mount(<BhNotification {...alterProps} />);
        component.find('BhA').simulate('click');
    });

    it('verify for BhNotification for onBhEventClose', () => {
        const component = mount(<BhNotification {...CommonComponentProps} />);
        component.find('BhPanel').props().onBhEventClose();
        expect(CommonComponentProps.handleCustomEvent).toBeCalled();
    });

    it('verify for BhNotification for getNotificationRow else scenario of item empty items ', () => {
        const arrAfterRemovedObjTemp = [{
            "id": "chart-comp--notification-1",
            "title": "consectetur1",
            "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
            "createdDateTime": "2022-10-20T14:38:06+05:30",
            "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
            "type": "System error",
            "filterCriteria": "low",
            "status": false,
            "profilePictureUrl": "<url-for-photo>",
            "redirectAPI": "MicroappId/third party URL",
            "navigationPaylaod": "Object/Array Containing payload",
            "category": "recent"

        }];
        const formattedData = [{
            notificationGroup: "",
            notificationList: [{
                "id": "chart-comp--notification-1",
                "title": "consectetur1",
                "message": "consectetur1 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                "createdDateTime": "2022-10-20T14:38:06+05:30",
                "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                "type": "System error",
                "filterCriteria": "low",
                "status": false,
                "profilePictureUrl": "<url-for-photo>",
                "redirectAPI": "MicroappId/third party URL",
                "navigationPaylaod": "Object/Array Containing payload",
                "category": "recent"
            },
            {
                "id": "chart-comp--notification-100",
                "title": "consectetur100",
                "message": "consectetur100 ornare placerat nisl. Vivamus etiam tempus aliquam porttitor.'",
                "createdDateTime": "2022-10-25T14:38:06+05:30",
                "createdBy": "Vijayakumar.Nandhini@bakerhughes.com",
                "type": "System error",
                "filterCriteria": "low",
                "status": false,
                "profilePictureUrl": "<url-for-photo>",
                "redirectAPI": "MicroappId/third party URL",
                "navigationPaylaod": "Object/Array Containing payload",
                "category": "recent"
            }]

        }];
        const alterProps = {
            ...CommonComponentProps, config: { ...CommonComponentProps.config, "requestAdvNotification": false, "removedId": ["chart-comp--notification-1"] }
        };
        const component = mount(<BhNotification {...alterProps} />);
        component.find('BhButtonTabs').props().onBhEventSelected({ "detail": { "key": "recent", "label": "Recent" } });
        component.setState({ "arrAfterRemovedObj": arrAfterRemovedObjTemp, "removalFlag": true });
        component.instance().onFilterMenu({ "detail": { "value": "low", "label": "Low" } });
        component.instance().onTabSelect({ "detail": { "key": "recent", "label": "Recent" } });
        component.instance().tabLoadData(formattedData, "recent");
        component.instance().getNotificationRow(formattedData);
    });

});