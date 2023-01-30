import React from "react";
import LogoutConfirmationDialog  from './LogoutConfirmationDialog';
import {mount} from 'enzyme';
import './setupTests';

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component) => {
      Component.defaultProps = {...Component.defaultProps, t: (key) => key};
      return Component;
    },
}));
const styles = {
    "root": {
      "backgroundColor": "#22302D",
      "opacity":"0.9 !important"
    },
    paper: {
        backgroundColor: "#fff",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1), 0px 5px 44px rgba(0, 0, 0, 0.06), 0px 12px 40px rgba(0, 0, 0, 0.07)",
        overflow: "hidden",
        width:"368px"
      },
      submit: {borderRadius: 0, height: '45px', backgroundColor: '#02BC93', color: '#fff',
      fontFamily:"Poppins",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "12px",
      lineHeight: "18px",    /* identical to box height, or 150% */
      letterSpacing:"0.1px",
	  height:"36px",
      borderRadius: "4px",
      '&:hover': {backgroundColor:'#02BC93'}
    },
    cancel: { borderRadius: 0, height: '36px', boxShadow:"none",backgroundColor: 'transparent', color: '#1A2321',
    fontFamily:"Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "18px",    /* identical to box height, or 150% */
    letterSpacing:"0.1px",
    '&:hover': {backgroundColor:'transparent'}
  }
  };

  describe('</LogoutConfirmationDialog> rendering', () => {

    it('if LogoutConfirmationDialog component is rendered', () => {
 
      const component = mount( <LogoutConfirmationDialog classeName={JSON.stringify(styles)} open={false}></LogoutConfirmationDialog>);
      const dialog = component.find('LogoutConfirmationDialog').at(0);
      expect(dialog.length).toBe(1); 
    });

    it('Test for setOpen is called with false value on closing dialog', () => {
        var defaultProps = {
            setOpen:jest.fn(),
            open:true,
            children:'logout'
          };
        const component = mount( <LogoutConfirmationDialog classeName={JSON.stringify(styles)}
        {...defaultProps}></LogoutConfirmationDialog>);
        const dialog = component.find('LogoutConfirmationDialog').at(0);
        var logoutDialog  = dialog.getElement('Dialog');
        logoutDialog.props.setOpen(false);
        expect(defaultProps.setOpen).toHaveBeenCalledWith(false );
      });

      it('Test for setOpen called For click on cancelButton', () => {
        var defaultProps = {
            setOpen:jest.fn(),
            open:true,
            children:'logout',
            onConfirm:jest.fn()
          };
        const component = mount( <LogoutConfirmationDialog classeName={JSON.stringify(styles)}
        {...defaultProps}></LogoutConfirmationDialog>);
        const dialog = component.find('LogoutConfirmationDialog').at(0);
        var logoutDialog  = dialog.getElement('Dialog');
        var cancleButton = dialog.find('div.MuiDialogActions-root').at(0);
        dialog.find('div#logoutDialog').simulate('close');
        cancleButton.find('button#cancelButton').simulate('click');
        cancleButton.find('button#submitButton').simulate('click');
        logoutDialog.props.onConfirm(false);
        expect(defaultProps.onConfirm).toHaveBeenCalledWith(false);
        logoutDialog.props.onConfirm(true);
        expect(defaultProps.onConfirm).toHaveBeenCalledWith(true);
      });

      it('Test for setOpen called For click on logoutButton', () => {
        var defaultProps = {
            setOpen:jest.fn(),
            open:true,
            children:'logout'
            
          };
        const component = mount( <LogoutConfirmationDialog classeName={JSON.stringify(styles)}
        {...defaultProps}></LogoutConfirmationDialog>);
        const dialog = component.find('LogoutConfirmationDialog').at(0);
        var logoutDialog  = dialog.getElement('Dialog');

        expect(logoutDialog.props.open).toBe(true);
      });

      it('Test for setOpen is not called', () => {
        var defaultProps = {
            setOpen:jest.fn(),
            open:true,
            children:'logout'
          };
        const component = mount( <LogoutConfirmationDialog classeName={JSON.stringify(styles)}
        {...defaultProps}></LogoutConfirmationDialog>);
        const dialog = component.find('LogoutConfirmationDialog').at(0);
        var logoutDialog  = dialog.getElement('Dialog')
        expect(logoutDialog.props.children).toBe('logout');
      });
  });
 