import React from 'react';
import SessionTimeout from './SessionTimeout'
import {shallow,mount} from 'enzyme';
import Button from "@material-ui/core/Button";

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component) => {
      Component.defaultProps = { ...Component.defaultProps, t: (key) => key };
      return Component;
  },
}));

describe('SessionTimeout', () => {
    it("test handleCancel   ", () => {
      const sethandleCancel = jest.fn();
      const wrapper = mount(<SessionTimeout  setdialogShow={jest.fn()} dialogShow={true}></SessionTimeout>);
      const component = wrapper.find("SessionTimeout").at(0);
      component.find(Button).simulate('click');
      expect(sethandleCancel.mock.calls.length).toEqual(0);
    });
});