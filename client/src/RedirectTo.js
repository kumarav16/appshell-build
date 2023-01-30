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

import React from 'react';
import { withRouter } from "react-router";
import Loading from './Loading';
import {getData} from './RbacData';



class RedirectTo extends React.Component {
  state = {
    navigations: [],
    menuItemIdDefault: [],
    loading: false
  };
 
  componentDidMount() {
    setTimeout(()=> {}, 0);
    this.setState({loading:true});
    this.callApi()
    .then(res => {
        /* istanbul ignore next */
     setTimeout(()=> {
       //make to call to server
      /*  const defaultApp = res.navigations.find(menu => menu.link === `/${localStorage.getItem('app_link')}/`) || res.navigations.find(menu => menu.default === true) || res.navigations[0];
        this.setState({ loading:false ,navigations: res.navigations });
        localStorage.setItem('navigation',JSON.stringify(res.navigations));
        localStorage.setItem('commonappImpacted',JSON.stringify(res.commonappImpacted));
        localStorage.setItem('defaultAppLink',defaultApp.link);
        this.props.history.push(`${defaultApp.link}`);*/
      
        localStorage.setItem('microapps',JSON.stringify(res.navigations));	
        localStorage.setItem('menuItems',JSON.stringify(res.menuItems));
        this.changeDefaultSubsytemApp(res.menuItems,res.navigations);
        const navigations=this.checkForPermittedApps(res.navigations,this.state.menuItemIdDefault !="" ? this.state.menuItemIdDefault : res.menuItems);	
        this.setState({ loading:false ,navigations: navigations });	
        localStorage.setItem('navigation',JSON.stringify(navigations));	
        localStorage.setItem('commonappImpacted',JSON.stringify(res.commonappImpacted));
        if(res.userInfoDialogMap){
        localStorage.setItem('userInfoDialogMap',JSON.stringify(res.userInfoDialogMap));}
        localStorage.setItem('headerMenuConfig',JSON.stringify(res.headerMenuConfig));
        localStorage.setItem('tenantDropDown',JSON.stringify(res.tenantDropDown));
        localStorage.setItem('searchConfig',JSON.stringify(res.searchConfig));
        localStorage.setItem('wsport',JSON.stringify(res.wsport));
        localStorage.setItem('advanceNotificationMeta',JSON.stringify(res.advanceNotificationMeta));
        localStorage.setItem('appVersion',res.appVersion);
          /******find default app */
          let min=99999999999;
   
          const minindex =navigations.findIndex((item,index)=>
            item.visibility
          );
  
     
          if(navigations.length){	
            let defaultApp = navigations.find(menu => menu.link === `/${localStorage.getItem('app_link')}/`) || navigations.find(menu => menu.default === true) || (minindex !== -1 ? navigations[minindex] : navigations[0]);
            
            if(defaultApp !== undefined) {
                if(defaultApp.menuItemId && JSON.parse(localStorage.getItem('menuItems'))){
                  const defaultMenuItem = JSON.parse(localStorage.getItem('menuItems')).find(subSytem => subSytem.id === defaultApp.menuItemId);
                  defaultApp = navigations.find(menu => menu.id === defaultMenuItem.default);
                }
                localStorage.setItem('defaultAppLink',defaultApp.link);	
                this.props.history.push(`${defaultApp.link}`);	
            } else {
                this.props.history.push('/permissionsdenied');	
            }
          }	
          else{	
            this.props.history.push('/permissionsnotfound');	
          }
     },1000); // tos how loader
     
  })
  .catch(err => {
    this.setState({ loading:false });
    console.log(err);
  });
   
  }
/* istanbul ignore next */
  getPermitionByappId = (appid)=>{
      const permissionapplist=getData();
      const microappPersmissonObject=permissionapplist.find(({rsname})=>rsname===appid)
      return microappPersmissonObject;
  }
/* istanbul ignore next */
  changeDefaultSubsytemApp = (menuItems,microappServices)=>{ //name change
    for (var i = 0; i< menuItems.length;i++){
      var defautlmenuItemMicroapps = microappServices.find((data)=>data.id === menuItems[i].default);
      if(defautlmenuItemMicroapps && this.getPermitionByappId(defautlmenuItemMicroapps.id) && this.getPermitionByappId(defautlmenuItemMicroapps.id).access === "disabled"){
          var menuItemList = microappServices.find((data)=>data.menuItemId === menuItems[i].id && this.getPermitionByappId(data.id) && this.getPermitionByappId(data.id).access === "enabled");
          if(menuItemList !== "" && menuItemList !== undefined){
             menuItems[i].default = menuItemList.id;
          } else{
            menuItems[i].default = defautlmenuItemMicroapps.id;
          }
        }      
      }
    this.setState({ menuItemIdDefault: menuItems});
    localStorage.setItem('menuItems',JSON.stringify(menuItems));
  }
/* istanbul ignore next */
  checkForPermittedApps=(microappslist,menuItems)=>{	
    const permittedappslist=JSON.parse(localStorage.getItem('permissions'));	
    const permittedappslistIds= permittedappslist.map(item=>{return item.rsname});	
   const navigations= microappslist.filter((item)=>{ 
    if(menuItems && menuItems !==''){
      const systemId = menuItems.filter((sys)=> sys.id === item.menuItemId);
      if(item.hasOwnProperty("menuItemId")){
        if(systemId[0].default === item.id){
            if(systemId[0].iconSvg){
              item.iconSvg = systemId[0].iconSvg;  
            }else {
              item.icon = systemId[0].icon;
            }
            item.visibility = true;
          }
        }
        
    }
   // item.order=permittedappslistIds.indexOf(item.id);
      return permittedappslistIds.indexOf(item.id)>-1;	
    });	
    return navigations;	
  };

  callApi = async () => {
    const response = await fetch(`${window.location.pathname}api/usermanager/nav`, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };


  render() {
    return (
        <Loading />
    );
  }
}

export default withRouter(RedirectTo) ;
