import React from 'react';
import ErrorComponent from './ErrorComponent'
import { shallow, mount, render } from 'enzyme';

jest.mock("react-i18next", () => ({
    withTranslation: () => (Component) => {
        Component.defaultProps = {...Component.defaultProps, t: (key) => key};
        return Component;
      },
}));

describe('ErrorComponent', () => {

    it('verify for ErrorComponent when no notification present', () => {
        const CommonComponentProps = {
            "errorImage": "/static/media/Nonewnotification.73756f33.svg",
            "msg": "Nothing new today",
            "ErrMsgClass": "Nothingnew"
        };
        const component = mount(<ErrorComponent {...CommonComponentProps} />);
        expect(component).toMatchSnapshot();
    });

    it('verify for ErrorComponent when error throws', () => {
        const CommonComponentProps = {
            "errorImage": "/static/media/Nonewnotification.73756f33.svg",
            "msg": "Error!",
            "ErrMsgClass": "apiError"
        };
        const component = mount(<ErrorComponent {...CommonComponentProps} />);
        expect(component).toMatchSnapshot();
    });
});