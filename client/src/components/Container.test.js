import React from 'react';
import Container from './Container';
import {shallow,mount,render} from 'enzyme';
import ReactDOM from 'react-dom';

describe('Container testing begins',()=>{
    it('verify for container mounted',()=>{
        const component = shallow(<Container/>);
        expect(component).toMatchSnapshot();
    });
});