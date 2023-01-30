import React from 'react';
import Snackbox from './SnackBox';
import {shallow,mount,render} from 'enzyme';
import ReactDOM from 'react-dom';
import { fireEvent } from '@testing-library/react';
import $ from "jquery";
jest.mock("react-i18next", () => ({
    withTranslation: () => (Component) => {
        Component.defaultProps = {...Component.defaultProps, t: (key) => key};
        return Component;
      },
  }));
describe('Snackbox testing begins',()=>{
    it('verify for Snackbox mounted',()=>{
        const open=true;
        const component = shallow(<Snackbox open={open}  setOpen={open} autoHideDuration={6000} onClose={jest.fn((props) => {return null})} children="Childern"/>);     
        expect(component.text()).toBe('Childern'); 
    });
});
