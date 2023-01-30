/* 
 *  *************************************************
 *   BH [Highly] Confidential
 *   [Unpublished] Copyright 2020.  Baker Hughes
 *  
 *   NOTICE:  All information contained herein is, and remains the property of Baker Hughes, and/or
 *   its affiliates.  The intellectual and technical concepts contained herein are proprietary to Baker Hughes
 *   and/or its affiliates and may be covered by patents, copyrights, and/or trade secrets.  Dissemination of this information or
 *   reproduction of this material is strictly forbidden unless prior written permission is obtained from Baker Hughes.
 *  **************************************************
 *  
 */

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from 'react-i18next';
import { BhSettingsMenu, BhMenuItem, BhDivider} from './transformTagNameReactComponent';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';// need to move to new way "@material-ui/core/Popover";

import _ from "lodash";
import classNames from 'classnames';
import './UserInfoPopUp.css';
import {getData} from './RbacData';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from "@material-ui/core/Fade";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const styles = {
  userInfoDisplayPopUp: {
    position: "absolute !important",
    width: "320px",
    top: "62px !important",
    backgroundColor: "var(--color-fill-common-secondary) !important",
    boxShadow: "var(--effect-drop-shadow-elevation-extra-high) !important",
    borderRadius: "4px !important",
    overflowX: "hidden !important",
    right: "36px"
  },
  bhSettingsMenu: {
    "& .bh-menu-item__container":{
      "& .typography--menu-link-medium":{
        fontWeight:"normal !important"
      }
    }
  },
  disabledApp:{
    display : "none"
  },
  LicenseUserLockOutlinedIcon:{
    float: "left",
    height: "57px",
    paddingBottom: "8%",
    paddingRight:  "6px",
    paddingLeft: "-2px",
    fontSize: "25px"
  }
};

const UserInfoPopUp = (props) => {
  const {
    classes,
    isOpen,
    setIsOpen,
    anchorEl,
    setIsLogoutOpen,
    userInfoDialogMap,
    userInfo,
    t
  } = props;

  const [userInfoState, setUserInfoState] = React.useState(userInfoDialogMap)
  const navigation = JSON.parse(localStorage.getItem('navigation'));
  const firstName = userInfo.firstName && userInfo.firstName !== "" && userInfo.firstName !== "undefined" ? userInfo.firstName : "";
  const lastName = userInfo.lastName && userInfo.lastName !== "" && userInfo.lastName !== "undefined" ? userInfo.lastName : "";
  const email = userInfo.email && userInfo.email !== "" && userInfo.email !== "undefined" ? userInfo.email : "";

  React.useEffect(()=>{
    let themeObj = !_.isEmpty(userInfoState) && _.find(userInfoState, function(o) { return o.id === "theme"; });  
    let defThemeObj = !_.isEmpty(themeObj) && themeObj.subMenu.find(menu=>{/* istanbul ignore else */if(menu.default===true){return menu;}});
    let localStorageTheme = localStorage.getItem('theme');
    let docBody = document.body;

    if(!_.isEmpty(defThemeObj) && (localStorageTheme === '' || localStorageTheme === null || localStorageTheme === undefined)){
      docBody.classList.add(`theme--${defThemeObj.theme}`);
      docBody.setAttribute('data-theme', `${defThemeObj.theme}`);
      localStorage.setItem('theme', `${defThemeObj.theme}`);

    } else if(!_.isEmpty(defThemeObj) && (localStorageTheme !== '' || localStorageTheme !== null || localStorageTheme !== undefined)){
      let themeMenu = !_.isEmpty(themeObj) && themeObj.subMenu.find(menu=>{/* istanbul ignore else */if(menu.theme===localStorageTheme){return menu;}});
      setDefaultThemeOption(userInfoState, themeMenu)
      docBody.classList.add(`theme--${localStorageTheme}`);
      docBody.setAttribute('data-theme', `${localStorageTheme}`);
 
    } else if(_.isEmpty(defThemeObj) && (localStorage.getItem('theme') !== '' || localStorage.getItem('theme') !== null || localStorage.getItem('theme') !== undefined)){
      localStorage.removeItem("theme");
      docBody.classList.add(`theme--light`);
      docBody.setAttribute('data-theme', `light`);
    }
  },[])

  const findDefault = (obj, userInfo) => {
    if (obj.name === userInfo.name) {
      return { ...obj, default: true }
    } else {
      return { ...obj, default: false };
    }
  }

  const setDefaultThemeOption = (userInfoState, selMenuObject) =>{
    let infoState = _.cloneDeep(userInfoState).map(info => {
      if (info.hasOwnProperty("subMenu") && !_.isEmpty(_.find(info.subMenu, {name: `${selMenuObject.name}`}))) {
        let subMenuTemp = _.cloneDeep(info.subMenu).map(item => {
          return findDefault(item, selMenuObject);
        });
        return { ...info, "subMenu": subMenuTemp };
      } else {
        return findDefault(info, selMenuObject);
      }
    })
    setUserInfoState(infoState);
  }

  //handle selection from usermenu popup
  const handleSelection = (userInfo) => {

    //For maintaining the selection values
    setDefaultThemeOption(userInfoState, userInfo);

    if (userInfo.location) {
      const nav = navigation.find(nav => nav.link === userInfo.location);
      const event = new CustomEvent("onAppChange", {
        detail: nav !== undefined ? nav : { 'menuItemId': '' },
        bubbles: true,
        cancelable: true
      });
      window.parent.document.dispatchEvent(event);
      window.location.hash = `#${userInfo.location}`;
    } else if(userInfo.theme){
      let clsList = document.body.classList;
      let index = _.toArray(clsList).findIndex(i => _.startsWith(i, `theme`))

      localStorage.setItem('theme', `${userInfo.theme}`);
      document.body.setAttribute('data-theme', `${userInfo.theme}`);
      if (index === -1) {
        document.body.classList.add(`theme--${userInfo.theme}`);
      } else {
        document.body.classList.forEach(item => {
          if (item.startsWith('theme')) {
            document.body.classList.replace(item, `theme--${userInfo.theme}`);
          }
        })
      }

      document.dispatchEvent(new CustomEvent('userPreferenceChange', {
        detail: {
              theme: userInfo.theme
          },
        bubbles: true,
        cancelable: true
      }));
      
    }
  }

  const getPermitionToApp = (menulocation)=>{
    const microappsapplist=JSON.parse(localStorage.getItem('microapps'));
      const microappsappObject=microappsapplist.find(({link})=>link===menulocation);
    const permissionapplist= getData();
      /* istanbul ignore else */
      if(microappsappObject !== undefined){
        const microappPersmissonObject=permissionapplist.find(({rsname})=>rsname === microappsappObject.id);
        return microappPersmissonObject;
      }
  }

  const getMenuItemComp = (menu, index) => {
    let comp;
    if (menu && _.has(menu, "subMenu")) {
      comp = <BhMenuItem
        label={t(menu.name)}
        icon={menu.icon}
        id={menu.name}
        isSelected={menu.default ? menu.default : false}
      >
        {
          menu.subMenu.map((sub, index) => {
            return getMenuItemComp(sub, index);
          })
        }
      </BhMenuItem>
    } else {
      comp = <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 200 }} title={menu.type === "app" && localStorage.getItem("licencesUrl") !== null && getPermitionToApp(menu.location) && getPermitionToApp(menu.location).access !== "" && getPermitionToApp(menu.location).access === "disabled" ?  <div><LockOutlinedIcon className={classes.LicenseUserLockOutlinedIcon}/> {localStorage.getItem("unlicensedMessage") && localStorage.getItem("unlicensedMessage") !=="" ? t(localStorage.getItem("unlicensedMessage")) : "UnlicensedMessage"}</div> : ""} placement="left">
      <BhMenuItem
        label={t(menu.name)}
        icon={menu.icon}
        id={menu.name}
        key={index}
        className={classNames(menu.type === "app" && localStorage.getItem("licencesUrl") !== null ? 
          getPermitionToApp(menu.location) !== undefined ? 
            getPermitionToApp(menu.location) && getPermitionToApp(menu.location).access !== "" && getPermitionToApp(menu.location).access === "disabled" ? "bhMenuDisabledClass" : '' 
            : classes.disabledApp 
          : "")}
        isSelected={menu.default ? menu.default : false}
        onClick={() => onMenuSelect(menu)}
        title=""
      />
    </Tooltip>;
    }
    return comp;
  }

  const onMenuSelect = (menu) => {
    setIsOpen(false);
    handleSelection(menu);
  }

  const onLogout = () => {
    setIsOpen(false);
    setIsLogoutOpen(true);
  }

  return (
    <Popover
      id="userInfoDisplayPopUp"
      open={isOpen}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      className={classes.userInfoDisplayPopUp}
      onRequestClose={() => { setIsOpen(false); }}
      animation={PopoverAnimationVertical}
    >
      <BhSettingsMenu
        id="bhSettingsMenu"
        className={classes.bhSettingsMenu}
        userfirstname={firstName}
        userlastname={lastName}
        useremail={email}
      >
        {
          userInfoState && !_.isEmpty(userInfoState) && userInfoState.map((item, index) => {
            return getMenuItemComp(item, index)
          })
        }
        {
          userInfoState && !_.isEmpty(userInfoState) &&
          <BhDivider></BhDivider>
        }
       <BhMenuItem className={classes.bhMenuClass} id="settingsLogout" label={t('Logout')} icon='power_settings_new' onClick={() => onLogout()} />
      </BhSettingsMenu>
    </Popover>
  );
};

export default withTranslation()(withStyles(styles)(UserInfoPopUp));
