import React from 'react';
import SpecificSnapshot from './SpecificSnapshot'
import {mount,shallow} from "enzyme";
import { MuiThemeProvider, createMuiTheme, createStyles } from '@material-ui/core/styles';
import ScreenCaptures from "./ScreenCaptures";
import "./SpecificSnapshot.css";
import "./FeedbackSubPopup.css";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import withStyles  from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ThankyouFeedback from "./ThankyouFeedback";
import MenuItem from '@material-ui/core/MenuItem';
import { withTranslation } from 'react-i18next';

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component) => {
      Component.defaultProps = {...Component.defaultProps, t: (key) => key};
      return Component;
    },
}));

const THEME = createMuiTheme({    
    overrides: {
      MuiMenuItem: createStyles({
        root: {
          '&&:hover': {backgroundColor: 'pink', color: 'white'}
        },
        "&$elected": {
          '&&': {backgroundColor: 'blue', color: 'white'},
          '&&:hover': {backgroundColor: 'darkblue', color: 'white'}
        }
      }),
  
      
      MuiTypography: {
        subheading: {color: 'white'}
      },
      typography: {useNextVariants: true, fontFamily: "Poppins", fontSize: 14, fontWeightLight: 300, fontWeightRegular: 400, fontWeightMedium: 500}
    }    
  });

  const styles = ()=>({
    snapshotdialogtitle: {
      textAlign: "center !important",
      paddingTop:"0px"
    },
    snapshotFeedbackLogTitleText:{
      fontFamily:"Noto Sans",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "24px",
      alignItems: "center",
      letterSpacing: "0.1px",
      color: "#000000",
      paddingTop:"0px"
    },
    snapshotdialog: {
      margin: "15px"
    },
    snapshotdialogcontent: {
      width: "400px !important",
    },
    root: {
      minWidth: "275px !important",
    },
    formControl: {
      minWidth: "120 px",
      width: "100% !important",
      marginLeft: "0 px",
      marginBottom : "15px"
    },
    selectEmpty: {
      marginTop: "15px"
    },
    FeedbackButton: {
      backgroundColor: '#02A783', 
      color: '#fff',
      fontFamily:"Poppins",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",   
      letterSpacing:"0.1px",
      height:"36px",
      borderRadius: "4px",
      position: 'absolute',
      left: "5% !important",
      textTransform: "uppercase",
      '&:hover': {backgroundColor:'#02BC93'}
    },
    media: {
      height: 140,
    },
    closeButton: {
      textAlign: "right",
     },
     FeedbackButtonAction:{
       paddingBottom:"30px",
       paddingTop: "25px",
      
     },
     snapshotcontImage:{
       width:"100%",
       height:"100%",
     } ,
     formControlSelect:{
      fontFamily: "Noto Sans",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      letterSpacing: "0.1px",
      color: "#757575"
    },
    formError:{
      color:"#E12D39",
      margin: "5px",
      fontFamily:"Poppins",
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
      textAlign: "left",
      marginTop: "3px",
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0
    },
    feedbackCharCount:{
      float:"right",
      margin: "5px",
      fontFamily:"Poppins",
      fontWeight: 400,
      fontSize: "0.80rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
      marginTop: "3px",
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      color: "#757575"
    },
    CommentformError:{
      float:"left",
      color:"#E12D39",
      margin: "5px",
      fontFamily:"Poppins",
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
      textAlign: "left",
      marginTop: "3px",
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0 
    }   
});

describe('SpecificSnapshot',()=>{
  it('verify for SpecificSnapshot props children',()=>{
    const CommonComponentProps ={
      "removeDomSnapshot" :jest.fn(),
      "browserInfo":{
        "Browsername": "Chrome",
        "version": "100.0.4896.60",
        "majorVersion": 100
    },
    "classes":{
        "snapshotdialogtitle": "jss44",
        "snapshotFeedbackLogTitleText": "jss45",
        "snapshotdialog": "jss46",
        "snapshotdialogcontent": "jss47",
        "root": "jss48",
        "formControl": "jss49",
        "selectEmpty": "jss50",
        "FeedbackButton": "jss51",
        "media": "jss52",
        "closeButton": "jss53",
        "FeedbackButtonAction": "jss54",
        "snapshotcontImage": "jss55",
        "formControlSelect": "jss56",
        "formError": "jss57",
        "feedbackCharCount": "jss58",
        "CommentformError": "jss59"
    },
    "i18": jest.mock('react-i18next', () => ({
          useTranslation: () => ({t: key => key})
    }))
    };
      const component = shallow(<SpecificSnapshot {...CommonComponentProps} />);
      expect(component).toMatchSnapshot();
     
  });
    it("check usestate",()=>{
        const useStateSpy = jest.spyOn(React, 'useState');
        window.localStorage.setItem('UserInfo',JSON.stringify({title:'abc',userName :"abc",email:"abc@xyz.com",lastName: "",firstName:""}));
        const wrapper=mount( <MuiThemeProvider theme={THEME}><SpecificSnapshot classes={styles()} onClose={'test'} open={true}></SpecificSnapshot> </MuiThemeProvider>);
        expect(useStateSpy).toHaveBeenNthCalledWith(3,{"email": "abc@xyz.com", "title": "abc", "userName": "abc","firstName": "",
        "lastName": "",});
    });
    it("test closeModal  click",()=>{
        const close=jest.fn().mockImplementation(()=>("closed"));
        const setThankuFeedbackopen = jest.fn();
        const handleClick = jest.spyOn(React, "useState");
        handleClick.mockImplementation(ThankuFeedbackopen => [ThankuFeedbackopen, setThankuFeedbackopen]);
        const wrapper=mount(<SpecificSnapshot classes={styles()} setOpen={close} open={true} removeDomSnapshot={jest.fn()} ></SpecificSnapshot>);
        const component = wrapper.find("SpecificSnapshot").at(0);
        component.find(IconButton).simulate('click');
        expect(close.mock.calls.length).toEqual(0);
    });
    it("test getCommentSpHandle",()=>{
        const setCharCount = jest.fn();
        const handleClick = jest.spyOn(React, "useState");
        handleClick.mockImplementation(isCharCount => [isCharCount, setCharCount]);
        const wrapper=mount(<SpecificSnapshot classes={styles()} setOpen={close} open={true} removeDomSnapshot={jest.fn()} ></SpecificSnapshot>);
        const component = wrapper.find("SpecificSnapshot").at(0);
        component.find(IconButton).simulate('click');
        expect(setCharCount).toHaveLength(0);
    });

    it("test setEmail",()=>{
        const setThankuFeedbackopen = jest.fn();
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation(ThankuFeedbackopen => [ThankuFeedbackopen, setThankuFeedbackopen]);
        window.localStorage.setItem("UserInfo",[]);
         const wrapper=mount(<SpecificSnapshot classes={styles()} onClose={jest.fn()} open={true}></SpecificSnapshot>);
         const component = wrapper.find("SpecificSnapshot").at(0);
         component.find(".FeedbackButton");
         expect(setThankuFeedbackopen.mock.calls.length).toEqual(1);
        
     });
     it("test setComment",()=>{
        const setComment = jest.fn();
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation(comment => [comment, setComment]);
        window.localStorage.setItem("UserInfo",[]);
         const wrapper=mount(<SpecificSnapshot classes={styles()} onClose={jest.fn()} open={true}></SpecificSnapshot>);
         const component = wrapper.find("SpecificSnapshot").at(0);
         component.find(".FeedbackButton");
         expect(setComment.mock.calls.length).toEqual(1);
        
      });
      it("test set form data",()=>{
        const setComment = jest.fn();
        const useStateSpy = jest.spyOn(React, 'useState');
        const setformSpValues = jest.fn().mockImplementation(()=> {return { getUserName: 'cde pqr', getComment: 'feedback comment' }})
        useStateSpy.mockImplementation(comment => [comment, setComment]);
        window.localStorage.setItem('UserInfo',JSON.stringify({title:'abc',userName :"abc",email:"abc@xyz.com",lastName: "pqr",firstName:"cde"}));
        const wrapper=mount(<SpecificSnapshot classes={styles()} onClose={jest.fn()} open={true} spyOn={jest.fn()}></SpecificSnapshot>);
        const component = wrapper.find("SpecificSnapshot").at(0);
        const txtFieldFt = component.find('input').first();
        txtFieldFt.simulate('change', { target: { 'name':'getComment', 'value':'feedback comment'}});
        component.find(Button);
        expect(setComment).toHaveBeenCalled();
     });
     it("test closeThankuFeedback ",()=>{
        const setThankuFeedbackopen=jest.fn();
        const handleClick = jest.spyOn(React, "useState");
        handleClick.mockImplementation(ThankuFeedbackopen => [ThankuFeedbackopen, setThankuFeedbackopen]);
        const wrapper=mount(<SpecificSnapshot classes={styles()} onClose={close} removeDomSnapshot={jest.fn()} open={true} ></SpecificSnapshot>);
        const component = wrapper.find("SpecificSnapshot");
        expect(setThankuFeedbackopen.mock.calls.length).toEqual(1);
      });

      it("test getCommentSpHandle  ",()=>{
        const setCharCount=jest.fn();
        React.useState=jest.fn(()=>["",setCharCount]);
        const wrapper=mount(<SpecificSnapshot classes={styles()} onClose={jest.fn()} open={true}></SpecificSnapshot>);
        const component = wrapper.find("SpecificSnapshot");
        const txtFieldFt = component.find('textarea#leaveCommentSpecificFeedback');
        const txtvalue={target:{value:''}};
        txtFieldFt.simulate('change',txtvalue);
        expect(setCharCount).toHaveLength(0);

      });
      it("test onCloseThanku  ",()=>{
        const setThankuFeedbackopen=jest.fn();
        React.useState=jest.fn(()=>[false,setThankuFeedbackopen]);
        const wrapper=mount(<SpecificSnapshot classes={styles()} onClose={jest.fn()} open={true}></SpecificSnapshot>);
        const component = wrapper.find('ThankyouFeedback').props().onCloseThanku();
        expect(setThankuFeedbackopen).toHaveBeenCalled();
      });
      it("test handleScreenCapture ",()=>{
        const sethandleScreenCapture =jest.fn();
        React.useState=jest.fn(()=>["",sethandleScreenCapture ]);
        const wrapper=mount(<SpecificSnapshot classes={styles()} onClose={jest.fn()} open={true}></SpecificSnapshot>);
        const component = wrapper.find('ScreenCaptures').props().onEndCapture();
        expect(sethandleScreenCapture).toHaveBeenCalled();
      });
      it("test sendSpecificFeedback   ",()=>{
        const sendSpecificFeedback =jest.fn();
        const setScreenCapture=jest.fn();
        React.useState=jest.fn(()=>["base64,",setScreenCapture]);
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve([{"id":1}]),
            status:200,
            ok: true
          })
        );
        React.useState=jest.fn(()=>["",sendSpecificFeedback ]);
        const wrapper=mount(<SpecificSnapshot classes={styles()} onClose={jest.fn()} open={true} removeDomSnapshot={jest.fn()} dataURLtoFile={jest.fn()}></SpecificSnapshot>);
        const component = wrapper.find('SpecificSnapshot');
        component.find(Button).at(1).simulate('click');
        expect(sendSpecificFeedback).toHaveLength(0);
      });
      it("test failed sendSpecificFeedback   ",()=>{
        const sendSpecificFeedback =jest.fn();
        const setScreenCapture=jest.fn();
        React.useState=jest.fn(()=>["base64,",setScreenCapture]);
        global.fetch = jest.fn(() =>
          Promise.reject({
            message: "failed"
          })
        );
        React.useState=jest.fn(()=>["",sendSpecificFeedback ]);
        const wrapper=mount(<SpecificSnapshot classes={styles()} onClose={jest.fn()} open={true} removeDomSnapshot={jest.fn()} dataURLtoFile={jest.fn()}></SpecificSnapshot>);
        const component = wrapper.find('SpecificSnapshot');
        component.find(Button).at(1).simulate('click');
        expect(sendSpecificFeedback).toHaveLength(0);
      });
      it("test useEffect  ",()=>{
        const props = {
          setUserFullname: jest.fn(),
        };
        window.localStorage.setItem('UserInfo',JSON.stringify({title:'abc',userName:"abc",email:"abc@xyz.com",lastName:"",firstName:""}));
        const setUserFullname=jest.fn();
        React.useState=jest.fn(()=>[false,setUserFullname]);
        const wrapper=mount(<SpecificSnapshot classes={styles()} onClose={jest.fn()} open={true} {...props} removeDomSnapshot={jest.fn()}></SpecificSnapshot>);
        const component = wrapper.find("SpecificSnapshot").at(0);
        expect(props.setUserFullname).toHaveBeenCalledTimes(0);
        component.find(Button).at(0).simulate('click');
        expect(props.setUserFullname).toHaveBeenCalledTimes(0);
      });
      it("test sendSpecificFeedback to data   ",()=>{
        const props = {
          fetchSomeData: jest.fn(),
          arr:["https://appshell-dev.cde.fullstream.ai/#/event-app/","https://appshell-dev.cde.fullstream.ai/#/event-app/"]
        };
        const mockSuccessResponse={responseStatus:200,data:null,'error':'unable to find data'};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);// 2  
        const mockFetchPromise = Promise.resolve({// 3
        json: () => mockJsonPromise, });
        jest.spyOn(global,'fetch').mockImplementation(() => mockFetchPromise);
        window.localStorage.setItem('UserInfo',JSON.stringify({title:'abc',userName:"abc",email:"abc@xyz.com",lastName:"",firstName:""}));


        const sendSpecificFeedback =jest.fn();
        React.useState=jest.fn(()=>["",sendSpecificFeedback ]);
        const wrapper=mount(<SpecificSnapshot classes={styles()} onClose={jest.fn()} open={true} removeDomSnapshot={jest.fn()} dataURLtoFile={jest.fn()}></SpecificSnapshot>);
        const component = wrapper.find("ScreenCaptures").at(0);
        expect(props.fetchSomeData).toHaveBeenCalledTimes(0);
        component.find(Button).at(1).simulate('click');
        expect(props.fetchSomeData).toHaveBeenCalledTimes(0);
      });
      it("test data data  ",()=>{
        const props = {
          fetchSomeData: jest.fn(),
          arr:["https://appshell-dev.cde.fullstream.ai/#/event-app/","https://appshell-dev.cde.fullstream.ai/#/event-app/"]
        };
        const mockSuccessResponse={responseStatus:200,data:'success'};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);// 2  
        const mockFetchPromise = Promise.resolve({// 3
        json: () => mockJsonPromise, });
        jest.spyOn(global,'fetch').mockImplementation(() => mockFetchPromise);
        window.localStorage.setItem('UserInfo',JSON.stringify({title:'abc',userName:"abc",email:"abc@xyz.com",lastName:"",firstName:""}));
    
        const setUserFullname=jest.fn();
        React.useState=jest.fn(()=>[false,setUserFullname]);
        const wrapper=mount(<SpecificSnapshot classes={styles()} onClose={jest.fn()} open={true} {...props} removeDomSnapshot={jest.fn()}></SpecificSnapshot>);
        const component = wrapper.find("SpecificSnapshot").at(0);
        expect(props.fetchSomeData).toHaveBeenCalledTimes(0);
        component.find(Button).at(1).simulate('click');
        expect(props.fetchSomeData).toHaveBeenCalledTimes(0);
      });
});




