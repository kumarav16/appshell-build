import React from "react";
import _ from "lodash";
import { mount, shallow } from 'enzyme';
import { withStyles } from "@material-ui/core/styles";
import Popover, { PopoverAnimationVertical } from "material-ui/Popover";
import { withTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { blue } from '@material-ui/core/colors';
import GeneralFeedback from "./components/Feedback/GeneralFeedback";
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import generalIcon from './assets/General_icon.svg';
import drawIcon from './assets/Draw_icon.svg';
import CardMedia from '@material-ui/core/CardMedia';
import FeedbackPopup from './FeedbackPopup'

jest.mock("react-i18next", () => ({
    withTranslation: () => (Component) => {
        Component.defaultProps = { ...Component.defaultProps, t: (key) => key };
        return Component;
    },
}));

describe('Feedback Popup Start', () => {
    const CommonComponentProps = {
        isOpen: true,
        setFeedbackPopupOpen: jest.fn(),
        closeFeedback: jest.fn(),
        t: jest.fn(),
        browserInfo: {
            "Browsername": "Chrome",
            "version": "108.0.0.0",
            "majorVersion": 108
        },
        classes: {
            "feedbackPopup": "jss83",
            "closeButton": "jss84",
            "root": "jss85",
            "bullet": "jss86",
            "title": "jss87",
            "pos": "jss88",
            "avatar": "jss89",
            "CompleteSnapshotPopup": "jss90",
            "feednacktitle": "jss91",
            "feedbackicon": "jss92",
            "feedbacktext": "jss93"
        },
        tReady: true
    };

    it('verify for FeedbackPopup when loads', () => {
        const component = mount(<FeedbackPopup {...CommonComponentProps} />);
        expect(component).toMatchSnapshot();
    });

    
});