import React, { Component } from 'react';
import { MemoryRouter } from 'react-router-dom';
import "./login.css"
import _ from 'lodash';
import PathParam from './PathParam';
import {mount} from 'enzyme';

jest.mock("react-i18next", () => ({
    withTranslation: () => (Component) => {
        Component.defaultProps = { ...Component.defaultProps, t: (key) => key };
        return Component;
    },
}));

describe('PathParam', () => {
    it('verify for PathParam data got success when loads', () => {
        const CommonComponentProps = {
            "match": {
                "params": {
                    "tenant": "ONGC"
                }
            }
        };
        const component = mount(<MemoryRouter><PathParam {...CommonComponentProps} /></MemoryRouter>);
        expect(component).toMatchSnapshot();
    });
});