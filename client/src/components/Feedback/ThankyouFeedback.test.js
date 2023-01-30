import React from 'react';
import ThankyouFeedback from './ThankyouFeedback'
import {shallow,mount} from 'enzyme';
import { render,fireEvent} from '@testing-library/react';
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import withStyles  from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CardMedia from '@material-ui/core/CardMedia';
import Thankuimage from '../../assets/Thankyouicon.svg';
import ErrorICon from '../../assets/Couldnotcomplete.svg';
jest.mock("react-i18next", () => ({
  withTranslation: () => (Component) => {
      Component.defaultProps = { ...Component.defaultProps, t: (key) => key };
      return Component;
  },
}));

const styles = ()=>({
    ThankuFeedbackTitle: {
      textAlign: "center !important",
    },
    closeButton: {
      textAlign: "right",
    },
    ThankuFeedbackLogTitle:{
        textAlign:"center !important",
        fontFamily: "Poppins !important",
        fontStyle: "normal !important",
        fontWeight: "600 !important",
        fontSize: "16px !important",
        lineHeight: "22px !important",
        alignItems: "center !important",
        color: "#1A2321 !important"
    },
    ThankuFeedbackDialogcontent:{
      textAlign:"center",
      margin: "50px",
      marginTop: "0px",
      width: "250px"
    },
    Thankucontent:{
       fontSize:15,
       textAlign:"center",
    },
    Thankucontenttext:{
      fontFamily: "Noto Sans !important",
      fontStyle: "normal !important",
      fontWeight: "400 !important",
      fontSize: "16px !important",
      lineHeight: "24px !important",
      alignItems: "center !important",
      textAlign: "center !important",
      letterSpacing: "0.1px !important",
      color: "#000000 !important",
      margin: "0px !important"
    },
    media: {
      height: 0,
      paddingTop: '72.25%',
      width: '97.5%',
    },
    thankutopicon:{
        textAlign:"center",
    },
    thankutopiconbtn:{
      backgroundColor: "#02BC93",
      color:"white",
      boxShadow: "none",
    },
    mediaerror:{
      height:'126.73px',     
      width: '160.68px',
      marginLeft: '97px',
      marginBottom:'15px',
      marginTop: '50px'
    }
   
});
   
describe('ThankyouFeedback', () => {
  it("test handleCancel   ", () => {
    const sethandleCancel = jest.fn();
    const wrapper = mount(<ThankyouFeedback  onCloseThanku={jest.fn()} openThanku={true} errorFlag={true}></ThankyouFeedback>);
    const component = wrapper.find("ThankyouFeedback").at(0);
    component.find(IconButton).simulate('click');
    expect(sethandleCancel.mock.calls.length).toEqual(0);
  });

  it("Thankyou mounting  when openThanku and errorFlag are false", () => {
    const wrapper = mount(<ThankyouFeedback onCloseThanku={jest.fn()} openThanku={false} errorFlag={false}></ThankyouFeedback>);
    expect(wrapper).toMatchSnapshot();
  });

  it("Thankyou mounting  when openThanku and errorFlag are different, window.i18Resource has value", () => {
    window.i18Resources = {
      "defaultLang": "en",
      "ns": [
        "message"
      ],
      "fallbackLng": "en"
    };
    const wrapper = mount(<ThankyouFeedback  onCloseThanku={jest.fn()} openThanku={true} errorFlag={false}></ThankyouFeedback>);
    expect(wrapper).toMatchSnapshot();
  });

  it("Thankyou mounting  when openThanku and errorFlag are different, window.i18Resource has no value", () => {
    window.i18Resources = "";
    const wrapper = mount(<ThankyouFeedback  onCloseThanku={jest.fn()} openThanku={true} errorFlag={false}></ThankyouFeedback>);
    expect(wrapper).toMatchSnapshot();
  });
  it("Thankyou mounting  when openThanku and errorFlag are different", () => {
    const wrapper = mount(<ThankyouFeedback  onCloseThanku={jest.fn()} openThanku={false} errorFlag={true}></ThankyouFeedback>);
    expect(wrapper).toMatchSnapshot();
  });
});