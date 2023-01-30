import GeneralFeedback from "./GeneralFeedback";
import {mount,shallow} from "enzyme";
import { MuiThemeProvider, createMuiTheme, createStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import React from "react";
import { useEffect } from 'react';

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

    // How do I enforce this ONLY inside of MuiMenuItem and only for
    // the selected variant of that?
    MuiTypography: {
      subheading: {color: 'white'}
    },
    typography: {useNextVariants: true, fontFamily: "Poppins", fontSize: 14, fontWeightLight: 300, fontWeightRegular: 400, fontWeightMedium: 500}
  }    
});
const styles = ()=>JSON.stringify({
    GeneralFeedbackLogTitle: {
      textAlign: "center !important",
      paddingTop:"0px"
    },
    GeneralFeedbackLogTitleText:{
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
    GeneralFeedbackDialog: {
      margin: "15px"
    },
    GeneralFeedbackDialogcontent: {
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
      borderRadius: "4px",
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
     },
     paper: {
      width: "40% !important",
      maxHeight: 435,
    }
   });
describe("test general feedback",()=>{

 it("check usestate",()=>{
    const useStateSpy = jest.spyOn(React, 'useState');
    window.localStorage.setItem('UserInfo',JSON.stringify({title:'abc',userName :"abc",email:"abc@xyz.com",lastName: "pqr",firstName:"cde"}));
    const wrapper = mount( <MuiThemeProvider theme={THEME}><GeneralFeedback className={styles()} onClose={'test'} open={true}></GeneralFeedback> </MuiThemeProvider>);

    expect(useStateSpy).toHaveBeenNthCalledWith(1,{"email": "abc@xyz.com", "title": "abc", "userName": "abc","firstName": "cde",
    "lastName": "pqr",});
    expect(useStateSpy).toHaveBeenNthCalledWith(2,"undefined");
    expect(useStateSpy).toHaveBeenNthCalledWith(3,false);
    //expect(useStateSpy).toHaveBeenNthCalledWith(4,);
  });
it("test close click",()=>{
    const close=jest.fn().mockImplementation(()=>("closed"));
    const setThankuFeedbackopen = jest.fn();
    const handleClick = jest.spyOn(React, "useState");
    window.localStorage.setItem('UserInfo',JSON.stringify({title:'abc',userName :"abc",email:"abc@xyz.com",lastName: "",firstName:""}));
    handleClick.mockImplementation(ThankuFeedbackopen => [ThankuFeedbackopen, setThankuFeedbackopen]);
    const wrapper=mount(<GeneralFeedback className={styles()} onClose={close} open={true}></GeneralFeedback>);
    const component = wrapper.find("GeneralFeedback").at(0);
    component.find(IconButton).simulate('click');
    expect(close).toHaveBeenCalled();
});
it("test setEmail",()=>{

   const sendGeneralFeedback=jest.fn();
   const setThankuFeedbackopen = jest.fn();
   const useStateSpy = jest.spyOn(React, 'useState');
   useStateSpy.mockImplementation(ThankuFeedbackopen => [ThankuFeedbackopen, setThankuFeedbackopen]);
   window.localStorage.setItem("UserInfo",[]);
    const wrapper=mount(<GeneralFeedback className={styles()} onClose={jest.fn()} open={true}></GeneralFeedback>);
    const component = wrapper.find("GeneralFeedback").at(0);
    component.find('#leaveCommentGeneralFeedback').at(6).simulate('change');
    component.find(Button).simulate('click');
    component.find('button.MuiButtonBase-root').at(0).simulate('click');
    component.find('button.MuiButtonBase-root').at(1).simulate('click');
    expect(setThankuFeedbackopen).toHaveBeenCalled();
   
});
it("test setComment",()=>{
  const setComment = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(comment => [comment, setComment]);
  window.localStorage.setItem("UserInfo",[]);
   const wrapper=mount(<GeneralFeedback className={styles()} onClose={jest.fn()} open={true}></GeneralFeedback>);
   const component = wrapper.find("GeneralFeedback").at(0);
   component.find(Button).simulate('click');
   expect(setComment).toHaveBeenCalled();
  
});
it("test set form data",()=>{
  const setComment = jest.fn();
  const formValues = {'getUserName':'user test','getComment':'comment'};
  const useStateSpy = jest.spyOn(React, 'useState');
  const setFormValues = jest.fn(formValues).mockImplementation(()=> {return { getUserName: formValues.getUserName, getComment: formValues.getComment }})
  useStateSpy.mockImplementation(comment => [comment, setComment]);
  window.localStorage.setItem('UserInfo',JSON.stringify({title:'abc',userName :"abc",email:"abc@xyz.com",lastName: "pqr",firstName:"cde"}));
  const wrapper=mount(<GeneralFeedback classes={styles()} onClose={jest.fn()} open={true}></GeneralFeedback>);
  const component = wrapper.find("GeneralFeedback").at(0);
  const txtFieldFt = component.find('input').first();
  txtFieldFt.simulate('change', { target: { 'name':'getComment', 'value':'feedback comment'}});
  // setFormValues.spyOn(React,'setFormValues');
  component.find(Button).simulate('click');
  expect(setComment).toHaveBeenCalled();
  
});

  it("test  to open ThankuFeedback ",()=>{
    const setThankuFeedbackopen=jest.fn();
    const handleClick = jest.spyOn(React, "useState");
    handleClick.mockImplementation(ThankuFeedbackopen => [ThankuFeedbackopen, setThankuFeedbackopen]);
    const wrapper=mount(<GeneralFeedback classes={styles()} onClose={close} open={true}></GeneralFeedback>);
    const component = wrapper.find("GeneralFeedback");
    component.find(Button);
    expect(setThankuFeedbackopen.mock.calls.length).toEqual(1);
  });

  it('verify for Generalfeedback props children',()=>{
    const CommonComponentProps ={
      "onClose":jest.fn(),
      "open":false,
      "t": jest.fn(),
      "tReady": true,
      "classes":{
          "GeneralFeedbackLogTitle": "jss113",
          "GeneralFeedbackLogTitleText": "jss114",
          "GeneralFeedbackDialog": "jss115",
          "GeneralFeedbackDialogcontent": "jss116",
          "root": "jss117",
          "formControl": "jss118",
          "selectEmpty": "jss119",
          "FeedbackButton": "jss120",
          "media": "jss121",
          "closeButton": "jss122",
          "FeedbackButtonAction": "jss123",
          "paper": "jss124 jss103",
          "formError": "jss125",
          "feedbackCharCount": "jss126",
          "CommentformError": "jss127"
      },
      "currentAppObject":{
          "id": "appbuilder",
          "name": "Status",
          "link": "/status/",
          "icon": "track_changes",
          "default": true,
          "feedbackFlag": false,
          "visibility": true
      },
      "i18": jest.mock('react-i18next', () => ({
          useTranslation: () => ({t: key => key})
      }))
  };
      const component = shallow(<GeneralFeedback {...CommonComponentProps} />);
      expect(component).toMatchSnapshot();
     
  });
  
  it("test char count ",()=>{
    const setCharCount=jest.fn();
    React.useState=jest.fn(()=>["",setCharCount]);
    const wrapper=mount(<GeneralFeedback classes={styles()} onClose={jest.fn()} open={true}></GeneralFeedback>);
    const component = wrapper.find("GeneralFeedback");
    const txtFieldFt = component.find('textarea#leaveCommentGeneralFeedback');
    const txtvalue={target:{value:''}};
    txtFieldFt.simulate('change',txtvalue);
    expect(setCharCount).toHaveLength(0);
    
  });
  it("test close onCloseThanku  ",()=>{
    const setThankuFeedbackopen=jest.fn();
    React.useState=jest.fn(()=>[false,setThankuFeedbackopen]);
    const wrapper=mount(<GeneralFeedback classes={styles()} onClose={jest.fn()} open={true}></GeneralFeedback>);
    const component = wrapper.find('ThankyouFeedback').props().onCloseThanku();
    expect(setThankuFeedbackopen).toHaveBeenCalled();
   });
   it("test window location  ",()=>{
    const props = {
      fetchSomeData: jest.fn(),
    };
    const mockSuccessResponse={responseStatus:200,data:'success'};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);// 2  
    const mockFetchPromise = Promise.resolve({// 3
    json: () => mockJsonPromise, });
    jest.spyOn(global,'fetch').mockImplementation(() => mockFetchPromise);
    window.localStorage.setItem('UserInfo',JSON.stringify({title:'abc',userName:"abc",email:"abc@xyz.com",lastName:"",firstName:""}));

    const setUserFullname=jest.fn();
    React.useState=jest.fn(()=>[false,setUserFullname]);
    const wrapper=mount(<GeneralFeedback classes={styles()} onClose={jest.fn()} open={true} {...props}></GeneralFeedback>);
    const component = wrapper.find("GeneralFeedback").at(0);
    expect(props.fetchSomeData).toHaveBeenCalledTimes(0);
    component.find(Button).simulate('click');
    expect(props.fetchSomeData).toHaveBeenCalledTimes(0);
    });
    it("test window location failed",()=>{
    const props = {
      fetchSomeData: jest.fn(),
    };
    global.fetch = jest.fn(() =>
      Promise.reject({
        message: "fetch failed"
      })
    );
    window.localStorage.setItem('UserInfo',JSON.stringify({title:'abc',userName:"abc",email:"abc@xyz.com",lastName:"",firstName:""}));

    const setUserFullname=jest.fn();
    React.useState=jest.fn(()=>[false,setUserFullname]);
    const wrapper=mount(<GeneralFeedback classes={styles()} onClose={jest.fn()} open={true} {...props}></GeneralFeedback>);
    const component = wrapper.find("GeneralFeedback").at(0);
    expect(props.fetchSomeData).toHaveBeenCalledTimes(0);
    component.find(Button).simulate('click');
    expect(props.fetchSomeData).toHaveBeenCalledTimes(0);
    });

    it("test error  ",()=>{
      const props = {
        fetchSomeData: jest.fn(),
      };
      const mockSuccessResponse={responseStatus:200,data:null,'error':'unable to find data'};
      const mockJsonPromise = Promise.resolve(mockSuccessResponse);// 2  
      const mockFetchPromise = Promise.resolve({// 3
      json: () => mockJsonPromise, });
      jest.spyOn(global,'fetch').mockImplementation(() => mockFetchPromise);
      window.localStorage.setItem('UserInfo',JSON.stringify({title:'abc',userName:"abc",email:"abc@xyz.com",lastName:"",firstName:""}));
      
      const setUserFullname=jest.fn();
      React.useState=jest.fn(()=>[false,setUserFullname]);
      const wrapper=mount(<GeneralFeedback classes={styles()} onClose={jest.fn()} open={true} {...props}></GeneralFeedback>);
      const component = wrapper.find("GeneralFeedback").at(0);
      expect(props.fetchSomeData).toHaveBeenCalledTimes(0);
      component.find(Button).simulate('click');
      expect(props.fetchSomeData).toHaveBeenCalledTimes(0);
      });

      it("test error catch  ",()=>{
        const props = {
          fetchSomeData: jest.fn(),
        };
        const mockSuccessResponse={responseStatus:401,catch:'success','error':'unable to find data'};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);// 2  
        const mockFetchPromise = Promise.resolve({// 3
        json: () => mockJsonPromise, });
        jest.spyOn(global,'fetch').mockImplementation(() => mockFetchPromise);
        window.localStorage.setItem('UserInfo',JSON.stringify({title:'abc',userName:"abc",email:"abc@xyz.com",lastName:"xyz",firstName:"xyz"}));
        
        const setUserFullname=jest.fn();
        React.useState=jest.fn(()=>[false,setUserFullname]);
        const wrapper=mount(<GeneralFeedback classes={styles()} onClose={jest.fn()} open={true} {...props}></GeneralFeedback>);
        const component = wrapper.find("GeneralFeedback").at(0);
        expect(props.fetchSomeData).toHaveBeenCalledTimes(0);
        component.find(Button).simulate('click');
        expect(props.fetchSomeData).toHaveBeenCalledTimes(0);
        });
        it("close callTimeout  ",()=>{
          const setdialogShow=jest.fn();
          React.useState=jest.fn(()=>[false,setdialogShow]);
          const wrapper=mount(<GeneralFeedback classes={styles()} onClose={jest.fn()} open={true}></GeneralFeedback>);
          const component = wrapper.find('DialogBox');
          expect(setdialogShow).toHaveBeenCalled();
         });
});