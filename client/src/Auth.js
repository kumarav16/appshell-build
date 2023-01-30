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
import {setData,getData} from './RbacData';

class Auth extends React.Component {
  state = {
    navigations: [],
    loading: false
  };
 
  componentWillMount() {
    window.getPermissionListByAppId=(appid)=>{
      const permissionapplist=getData();
      const microappPersmissonObject=permissionapplist.find(({rsname})=>rsname===appid)
      return microappPersmissonObject;
    }
  //  setTimeout(()=> {console.log('timeouted')}, 0);
    this.setState({loading:true});
    fetch(`${window.location.pathname}tokenvalidity`)
    .then(response =>response.json())
    .then(data => {
      localStorage.setItem("isAuthorized", data.tokenvalid);
      localStorage.setItem("activeToken", data.sessionID);
      localStorage.setItem("tenantid",data.tenantid);
      localStorage.setItem('polling',data.polling);
      localStorage.setItem('showHeaderMenuIcon',data.showHeaderMenuIcon);
      /* istanbul ignore if */
      if(data.tokenvalid)
      {
        data.userInfo={name:unescape(data.userInfo.name),email:unescape(data.userInfo.email), title:data.userInfo.title,firstName:unescape(data.userInfo.firstName),lastName:unescape(data.userInfo.lastName)};
       localStorage.setItem('UserInfo',JSON.stringify(data.userInfo));
       // this.props.history.push('/redirecting');
       this.callPermissionsApi()
       .then(res => {
      //  setTimeout(()=> {
          //make to call to server
        //  res.roles.permissions
        localStorage.setItem("activeToken",unescape(res.sessionID));
         //  this.setState({ loading:false ,permissions: res.roles.permissions });
         this.setState({ loading:false});
           localStorage.setItem('permissions',JSON.stringify(res.roles));
           setData(res.roles);
           localStorage.setItem('unlicensedMessage',res.unlicensedMessage);
           if(localStorage.getItem('windowContext') !== null && localStorage.getItem('windowContext') !== "undefined"){
            let windowContext = JSON.parse(localStorage.getItem('windowContext'))
            window.getContext = () =>{return windowContext};
            window.contextPayload = windowContext;
            localStorage.removeItem("windowContext");
           }else 
           {
            localStorage.removeItem("windowContext");
           }
           this.props.history.push('/redirecting');
         
      //  },1000); // tos how loader
        
     })
     .catch(err => {
       this.setState({ loading:false });
       localStorage.setItem('permissions',"[]");
       this.props.history.push('/redirecting');
       console.log(err);
     });
    
    }
    else{
      if(localStorage.getItem('selectedTenant')) {
        const tenant = localStorage.getItem('selectedTenant');
        window.location.href = `${window.location.pathname}loginTenant?tenant=${tenant}`; 

      } else {
        window.location.href = `${window.location.pathname}loginTenant`; 
      } 

      
    }
  })
  .catch(err => {
    this.setState({loading:false});
    console.log(err);
  });
   
  }
  callPermissionsApi = async () => {
    const response = await fetch(`${window.location.pathname}rbac`);
    const body = await response.json();
    /*istanbul ignore if*/
    if (response && response.status !== 200) throw Error(body.message);
    return body;
  };
 


  render() {
    return (
        <Loading />
    );
  }
}

export default withRouter(Auth) ;
