(this["webpackJsonpapp-shell-client"]=this["webpackJsonpapp-shell-client"]||[]).push([[77],{1381:function(e,t){},1383:function(e,t){},1393:function(e,t){},1395:function(e,t){},1422:function(e,t){},1424:function(e,t){},1425:function(e,t){},1430:function(e,t){},1432:function(e,t){},1438:function(e,t){},1440:function(e,t){},1459:function(e,t){},1471:function(e,t){},1474:function(e,t){},2056:function(e,t,o){"use strict";o.r(t);var a=o(40),n=o(32),r=o(53),i=o(17),s=o(12),l=o(26),c=o(36),m=o(0),p=o.n(m),d=o(2065),g=o(660),u=o(1051),h=o(658),f=o(659),x=o(593),b=o(110),S=o.n(b),j=o(2083),v=o(2063),I=o(657),O=o(178),w=o.n(O),y=o(1479),N=o.n(y),C=o(1480),T=o.n(C),k=o(664),M=o(95),P=o(4),A=(w()({palette:{type:"dark"},typography:{useNextVariants:!0}}),function(e){Object(l.a)(m,e);var t=Object(c.a)(m);function m(e){var s;return Object(i.a)(this,m),(s=t.call(this,e)).validateTenant=Object(r.a)(Object(n.a)().mark((function e(){var t,o;return Object(n.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=s.props.match.params.tenant,e.next=3,fetch("".concat(window.location.pathname,"api/validateTenant?tenant=").concat(t),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}});case 3:return o=e.sent,e.next=6,o.json();case 6:o=e.sent;case 7:case"end":return e.stop()}}),e)}))),s.togglePasswordMask=function(){s.setState((function(e){return{passwordIsMasked:!e.passwordIsMasked}}))},s.handleChange=function(e){var t=e.target,o=t.name,n=t.value;s.setState((function(e){return Object.assign(e.form,Object(a.a)({},o,n))}))},s.handlFormSubmit=function(e){e.preventDefault();var t=s.state,a=t.email,n=t.password;localStorage.setItem("username",a);var r=o(1376)(s.state.code),i=r.encrypt(n),l=r.encrypt(a);s.setState({loading:!0,message:""}),fetch("".concat(window.location.pathname,"loginTenant"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","Cache-Control":" no-cache"},body:JSON.stringify({email:l,password:i})}).then((function(e){return e.json()})).then((function(e){"success"===e.message?s.props.history.push("/auth"):409===e.responseStatus&&"1001"===e.errors[0].code?(localStorage.setItem("us",l),localStorage.setItem("loginauth",!0),s.props.history.push("/changepassword")):401===e.responseStatus?s.setState({message:s.props.t("InvalidUsernameOrPassword"),loading:!1}):500===e.responseStatus&&s.setState({message:s.props.t("LoginError"),loading:!1})})).catch((function(){return s.setState({message:s.props.t("LoginError"),loading:!1})}))},s.state={form:{email:"",password:""},message:"",loading:!1,passwordIsMasked:!0,productName:"",rememberme:!1,disable:!1,grantTypeAuthCode:!0,authUrl:"",code:"",tenancy:!1},s}return Object(s.a)(m,[{key:"componentWillMount",value:function(){var e,t=this;if(this.props.match.params.tenant&&this.validateTenant(),this.props.location.navurl){var o=this.props.location.navurl.replace(/[.*+#?^$|[\]\\]/g,"").substring(1);e=o.substring(0,o.indexOf("/"));var a=o.substring(o.indexOf("/"));"/"!=a&&""!=a&&(window.getContext=function(){return[{payLoad:{timeStamp:Date.now(),route:a,eventName:"deeplinkEvent",body:{route:a}}}]},window.contextPayload=window.getContext())}document.getElementsByTagName("body")[0].className="",localStorage.removeItem("isAuthorized"),localStorage.removeItem("activeToken"),localStorage.removeItem("permissions"),localStorage.removeItem("microapps"),localStorage.removeItem("navigation"),localStorage.removeItem("commonappImpacted"),localStorage.removeItem("defaultAppLink"),localStorage.removeItem("productName"),localStorage.removeItem("app_link"),localStorage.removeItem("authUrl"),localStorage.removeItem("grantType"),localStorage.removeItem("userInfoDialogMap"),localStorage.removeItem("username"),localStorage.removeItem("designTemplate"),localStorage.removeItem("appfailed"),localStorage.removeItem("logoutSuccess"),localStorage.removeItem("sessionLogout"),localStorage.removeItem("sessionTimeOut"),localStorage.removeItem("headerMenuConfig"),localStorage.removeItem("UserInfo"),localStorage.removeItem("tenantid"),localStorage.removeItem("tenantDropDown"),localStorage.removeItem("searchConfig"),localStorage.removeItem("menuItems"),localStorage.removeItem("licencesUrl"),localStorage.removeItem("thankYouMsg"),localStorage.removeItem("unlicensedMessage"),localStorage.removeItem("UserInfo"),localStorage.removeItem("showHeaderMenuIcon"),localStorage.removeItem("polling"),localStorage.removeItem("wsport"),localStorage.removeItem("displayMenuItemOnHeader"),localStorage.removeItem("displayMicroappOnHeader"),localStorage.removeItem("applicationName"),localStorage.removeItem("advanceNotificationMeta"),localStorage.removeItem("selectedTenant"),localStorage.setItem("app_link",e),localStorage.removeItem("appVersion"),fetch("".concat(window.location.pathname,"api/usermanager/product"),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){t.setState({productName:e.productName,grantType:e.grantType,authUrl:e.formUrl,grantTypeAuthCode:e.grantTypeAuthCode,code:e.code,tenancy:e.tenancy}),localStorage.setItem("grantType",e.grantTypeAuthCode);var o=""!==window.i18Resources?"productName"===t.props.t("productName")?"ProductName"!==t.props.t("ProductName")?t.props.t("ProductName"):e.productName:t.props.t("productName"):e.productName;localStorage.setItem("productName",o),localStorage.setItem("displayMenuItemOnHeader",e.displayMenuItemOnHeader),localStorage.setItem("displayMicroappOnHeader",e.displayMicroappOnHeader);var a=""!==window.i18Resources&&"ApplicationName"!==t.props.t("ApplicationName")?t.props.t("ApplicationName"):e.applicationName;localStorage.setItem("applicationName",a),localStorage.setItem("designTemplate",e.design_template),localStorage.setItem("thankYouMsg",e.thankYouMsg),e.licencesUrl&&""!==e.licencesUrl&&!0===e.licencesUrl&&localStorage.setItem("licencesUrl",e.licencesUrl),localStorage.setItem("tenancy",e.tenancy),document.title="undefined"===localStorage.getItem("productName")||null===localStorage.getItem("productName")?document.location.hostname:localStorage.getItem("productName"),t.state.tenancy?t.state.tenancy&&t.props.history.push("/prelogin"):t.state.grantTypeAuthCode&&"oauth2"===t.state.grantType&&(localStorage.setItem("windowContext",JSON.stringify(window.contextPayload)),window.location.href="".concat(window.location.pathname,"loginTenant")),window.getUserPreference=function(){return{lang:M.a.language,theme:localStorage.getItem("theme")}}})).catch((function(e){console.log("error :: ",e)}))}},{key:"render",value:function(){var e=this.props,t=e.classes,o=e.t,a=this.state,n=a.passwordIsMasked,r=a.message,i=a.productName;return this.state.grantTypeAuthCode?Object(P.jsxs)(p.a.Fragment,{children:[Object(P.jsx)("div",{})," "]}):Object(P.jsxs)(p.a.Fragment,{children:[Object(P.jsxs)(x.a,{container:!0,className:t.root,children:[Object(P.jsx)(x.a,{xs:12,item:!0,children:Object(P.jsx)("div",{id:"productImgBlock",className:t.logocontainer,children:Object(P.jsx)("img",{src:"https://appshellcdndemo-ehdcfxhfgcb9bde0.z01.azurefd.net/buildappshell/images/login_logo.svg",alt:"logo",className:t.bhlogo})})}),Object(P.jsx)(x.a,{xs:12,item:!0,children:Object(P.jsx)(x.a,{item:!0,container:!0,justify:"center",children:Object(P.jsxs)("div",{className:t.titlelogin,children:[Object(P.jsx)("div",{className:t.titletext,children:o("Welcome")}),Object(P.jsxs)("div",{className:t.subtitle,children:[o("WelcomeMessage")," ",""!==window.i18Resources?"productName"===o("productName")?"ProductName"!==o("ProductName")?o("ProductName"):i:o("productName"):i," ",o("App")]})]})})}),Object(P.jsx)(x.a,{xs:12,item:!0,children:Object(P.jsx)(x.a,{item:!0,container:!0,justify:"center",className:t.containers,children:Object(P.jsx)("div",{className:t.paper,id:"loginContainer","data-testid":"login-container",children:Object(P.jsx)("div",{className:t.formContainer,id:"formContainer",children:Object(P.jsxs)("form",{className:t.form,onSubmit:this.handlFormSubmit,id:"loginForm",children:[Object(P.jsx)(h.a,{margin:"normal",required:!0,fullWidth:!0,className:t.formControl,children:Object(P.jsx)(j.a,{required:!0,id:"email",label:o("Username"),className:t.textField,name:"email",margin:"normal",onChange:this.handleChange,InputLabelProps:{required:!1,classes:{root:t.inputlabel}},InputProps:{classes:{root:t.cssOutlinedInput,focused:t.cssFocused,notchedOutline:t.notchedOutline,input:t.inputbox}},inputProps:{"data-testid":"nameInput"}})}),Object(P.jsx)(h.a,{margin:"normal",required:!0,fullWidth:!0,className:t.formControl,children:Object(P.jsx)(j.a,{required:!0,id:"password",label:o("Password"),className:t.textField,type:n?"password":"text",name:"password",margin:"normal",onChange:this.handleChange,InputLabelProps:{required:!1,classes:{root:t.inputlabel}},InputProps:{endAdornment:Object(P.jsx)(v.a,{position:"end",children:n?Object(P.jsx)(N.a,{className:t.eye,onClick:this.togglePasswordMask}):Object(P.jsx)(T.a,{className:t.eye,onClick:this.togglePasswordMask})}),classes:{root:t.cssOutlinedInput,focused:t.cssFocused,notchedOutline:t.notchedOutline,input:t.inputbox}},inputProps:{"data-testid":"passwordInput",autocomplete:"off"}})}),Object(P.jsxs)("div",{className:t.formLoadingSubmit,children:[Object(P.jsx)("div",{className:t.loadingSubmitLeftHolder}),Object(P.jsxs)("div",{className:t.loadingSubmitRightHolder,children:[Object(P.jsx)(d.a,{type:"submit","data-testid":"submit",fullWidth:!0,id:"formSubmitBtn",variant:"contained",color:"primary",className:t.loginsubmit,disabled:this.state.loading,children:o("SignIn")}),this.state.loading&&Object(P.jsx)(f.a,{title:"loading",className:t.loading,color:"secondary"})]})]}),Object(P.jsx)("div",{id:"loginError",className:t.ploginError,children:r}),Object(P.jsx)(g.a,{}),Object(P.jsx)(x.a,{item:!0,container:!0,className:t.containers,children:this.state.rememberme&&Object(P.jsxs)(x.a,{xs:6,item:!0,children:[" ",Object(P.jsx)("div",{className:t.rememberme,children:o("rememberMe")})]})})]})})})})})]}),Object(P.jsx)(u.a,{position:"fixed",className:t.footer,children:Object(P.jsx)("div",{children:"\xa92020 Baker Hughes Company"})})]})}}]),m}(m.Component));t.default=Object(k.a)()(S()((function(e){return{containers:{},loginTxt:{textAlign:"center",color:"#747474"},cssOutlinedInput:{margin:"0px !important","&$cssFocused $notchedOutline":{borderColor:"#02BC93 !important"}},cssFocused:{},notchedOutline:{borderWidth:"1px",borderColor:"#949494 !important"},eye:{cursor:"pointer",color:"#757575",width:"22px",height:"15px",fontSize:"22px"},root:{display:"flex",overflowY:"auto",minHeight:"99vh",paddingBottom:"80px",backgroundColor:"rgba(255,255,255,0)",color:"white",'& label[data-shrink^="true"]':{color:"#506C65",fontFamily:"'Noto Sans', sans-serif",fontStyle:"normal",fontWeight:"normal",fontSize:"12px",lineHeight:"16px",letterSpacing:"0.25px"}},paper:{display:"flex",alignItems:"center",height:"100%",backgroundColor:"#fff",borderRadius:"8px",border:" 1px solid #EBEFEE",padding:"".concat(e.spacing(3)+6,"px")},avatar:{margin:e.spacing(1),alignItems:"center",width:"100%",textAlign:"center","& img":{height:"42px"},"& span":{fontSize:"19px",color:"#27272C"}},formContainer:{paddingLeft:"0px",width:"100%"},formControl:{width:"400px",height:"66px",marginTop:0,marginBottom:"30px",color:"#fff","& div":{margin:"0px"}},form:{width:"400px",marginTop:0,color:"#fff"},formLoadingSubmit:{width:"100%",float:"right"},loadingSubmitLeftHolder:{float:"left",width:"60%"},loadingSubmitRightHolder:{width:"100%",marginBottom:"0px"},loginsubmit:{marginTop:e.spacing(2),borderRadius:"4px",height:"44px",backgroundColor:"#02A783",color:"#fff","&:hover":{backgroundColor:"#147D64"}},inputbox:{padding:"12px 10px 8px"},inputlabel:{top:"-12px"},bhlogo:{width:"170px",marginLeft:"7px",marginTop:"0px"},ploginError:{textAlign:"center",color:"red",fontFamily:"Poppins",fontSize:"1rem"},titletext:{fontFamily:"Poppins",fontStyle:"normal",fontWeight:"normal",fontSize:"32px",lineHeight:"44px",color:"#05322B",paddingBottom:"0px",letterSpacing:"0.1px"},subtitle:{fontFamily:"'Noto Sans', sans-serif",fontStyle:"normal",fontWeight:"normal",fontSize:"16px",letterSpacing:"0.1px",color:"#506C65",paddingBottom:"38px"},rememberme:{fontFamily:"'Noto Sans', sans-serif",fontSize:"14px",letterSpacing:"0.05px",padding:"10px",color:"#757575"},inputform:{margn:"0px"},titlelogin:{paddingTop:"30px",width:"462px",textAlign:"center"},logocontainer:{padding:"24px"},footer:{position:"fixed",left:"0",height:"39px",width:"100%",background:"#1A2321",fontSize:"12px",color:"#EBEFEE",paddingTop:"10px",paddingLeft:"32px",top:"auto",bottom:"0"}}}))(Object(I.a)(A)))}}]);
//# sourceMappingURL=77.cd0e1dfc.chunk.js.map