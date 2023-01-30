import React from 'react';
import ScreenCaptures from './ScreenCaptures'
import { shallow, mount } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';
import { Grid } from "@material-ui/core";
import "./SpecificSnapshot.css";
import { withTranslation } from 'react-i18next';


describe('ScreenCaptures', () => {

    it('verify for ScreenCaptures props children', () => {
        const CommonComponentProps = {
            "classes": {
                "ThankuFeedbackTitle": "jss218",
                "closeButton": "jss219",
                "ThankuFeedbackLogTitle": "jss220",
                "ThankuFeedbackDialogcontent": "jss221",
                "Thankucontent": "jss222",
                "Thankucontenttext": "jss223",
                "media": "jss224",
                "thankutopicon": "jss225",
                "thankutopiconbtn": "jss226",
                "paper": "undefined jss280 jss260"
            },
            "openThanku": true
        };
        const component = shallow(<ScreenCaptures {...CommonComponentProps} />);
        expect(component).toMatchSnapshot();
    });

    // it("test onMouseMove  ", () => {
    //     const setCropPositionTop = jest.fn();
    //     React.useState = jest.fn(() => ["", setCropPositionTop]);
    //     const wrapper = mount(<ScreenCaptures onEndCapture={jest.fn()} children={jest.fn()}></ScreenCaptures>);
    //     const component = wrapper.find("ScreenCaptures").at(0);
    //     const FirstGrids = component.find(Grid).at(0);
    //     expect(FirstGrids.length).toBe(1);
    //     console.log("========", component.debug());
    //     const component = wrapper.find("Grid").props().onMouseMove();
    //     expect(setCropPositionTop).toHaveBeenCalled();
    // });
});




