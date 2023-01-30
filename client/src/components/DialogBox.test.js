import React from 'react';
import DialogBox from './DialogBox';
import {shallow,mount,render} from 'enzyme';
import ReactDOM from 'react-dom';
import { fireEvent } from '@testing-library/react';
import $ from "jquery";
describe('DialogBox testing begins',()=>{
    it('verify for Dialogbox mounted',()=>{
        const dialogShow=true;
        const component = shallow(<DialogBox showDialog={dialogShow}/>);
        component.instance().handleClose();
        expect(component).toMatchSnapshot();
    });
});