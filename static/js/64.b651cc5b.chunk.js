(this["webpackJsonpapp-shell-client"]=this["webpackJsonpapp-shell-client"]||[]).push([[64],{346:function(e,t,o){"use strict";o.r(t);var n,a,i=o(92),r=o(17),l=o(12),s=o(26),c=o(36),m=o(0),p=o.n(m),g=o(110),d=o.n(g),u=o(660),h=(o(693),o(799),o(745)),S=o(741),v=o(753),I=o(801),f=o.n(I),w=o(694),b=o(2075),y=o(2073),j=o(2074),O=o(2072),C=o(2065),N=o(664),A=o(4),k=function(e){Object(s.a)(p,e);var t=Object(c.a)(p);function p(e){var o;return Object(r.a)(this,p),(o=t.call(this,e)).getlogouturl=function(){fetch("".concat(window.location.pathname,"logout"),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json","Cache-Control":" no-cache"}}).then((function(e){return e.json()})).then((function(e){var t=e&&e.logout,o=window.location.pathname,n=window.hasOwnProperty("location")&&window.location.origin;localStorage.setItem("sessionLogout",!0),localStorage.setItem("logoutSuccess",!0),window.location.href=t+n+("/"===o?"":"/"+o.substring(1,o.length))})).catch((function(){return o.setState({message:o.props.t("LoginError"),loading:!1})}))},o.callTimeout=function(){o.setState({dialogShow:!1}),localStorage.removeItem("isAuthorized"),localStorage.removeItem("activeToken"),localStorage.removeItem("permissions"),localStorage.removeItem("microapps"),localStorage.removeItem("navigation"),localStorage.removeItem("commonappImpacted"),localStorage.removeItem("defaultAppLink"),localStorage.removeItem("productName"),localStorage.removeItem("app_link"),localStorage.removeItem("authUrl"),localStorage.removeItem("grantType"),localStorage.removeItem("userInfoDialogMap"),localStorage.removeItem("username"),localStorage.removeItem("designTemplate"),localStorage.removeItem("appfailed"),localStorage.removeItem("headerMenuConfig"),localStorage.removeItem("sessionTimeOut"),localStorage.removeItem("UserInfo"),localStorage.removeItem("tenantid"),localStorage.removeItem("refreshWindow"),localStorage.removeItem("showHeaderMenuIcon"),localStorage.removeItem("menuItems"),localStorage.removeItem("licencesUrl"),localStorage.removeItem("thankYouMsg"),localStorage.removeItem("unlicensedMessage"),localStorage.removeItem("showHeaderMenuIcon"),localStorage.removeItem("polling"),localStorage.removeItem("wsport"),localStorage.removeItem("tenancy"),localStorage.removeItem("selectedApp"),localStorage.removeItem("displayMenuItemOnHeader"),localStorage.removeItem("displayMicroappOnHeader"),localStorage.removeItem("applicationName"),localStorage.removeItem("advanceNotificationMeta"),localStorage.removeItem("selectedTenant"),localStorage.removeItem("appVersion"),o.getlogouturl()},o.handleDrawerOpen=function(){o.setState({open:!0})},o.handleDrawerClose=function(){o.setState({open:!1})},o.checkForPermittedApps=function(){var e=(null!==window.localStorage.getItem("navigation")?JSON.parse(window.localStorage.getItem("navigation")):[]).find((function(e){return e.link===o.props.location.pathname})),t=JSON.parse(window.localStorage.getItem("microapps")).find((function(e){return e.link===o.props.location.pathname}));return t&&!e||!t&&!e},o.checkForPermittedCommonApp=function(e){return JSON.parse(localStorage.getItem("permissions")).map((function(e){return e.rsname})).indexOf(e.nestedElement.id)>-1},o.getVisibility=function(e){var t=localStorage.getItem("navigation"),o=localStorage.getItem("commonappImpacted")&&"undefined"!=localStorage.getItem("commonappImpacted")?JSON.parse(localStorage.getItem("commonappImpacted")):null,n=t&&JSON.parse(localStorage.getItem("navigation")).filter((function(e){return e.link===window.location.hash.split("#")[1]}))[0];if(n&&void 0!=n){var i=n.id,r=o?o.filter((function(e){return e.originaterApp==i}))[0]:void 0;if(r&&void 0!=r){var l=r.impactedContainer.filter((function(t){return t.containerName[0]==e}));if(l.length>0)return{commonStylingUpdated:l[0].StylingAttributes,mainStylingUpdated:r&&r.StylingAttributes?r.StylingAttributes:a.Container.mainSection.StylingAttributes,containerEvent:l&&l[0].StylingAttributes?void 0==l[0].StylingAttributes.listenEvent||l[0].StylingAttributes.listenEvent:null}}}},o.state={open:!1,userInfo:{},dialogShow:!1},o}return Object(l.a)(p,[{key:"poll",value:function(){var e=this;fetch("".concat(window.location.pathname,"polling"),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json","Cache-Control":" no-cache"}}).then((function(e){return e.json()})).then((function(t){"failure"===t.message?(clearInterval(e.timer),e.timer=null,localStorage.setItem("sessionTimeOut",!0),e.setState({dialogShow:!0})):"session missing"===t.timeoutmsg&&(localStorage.clear(),e.props.history.push("/"))}))}},{key:"componentWillMount",value:function(){var e=this;this.poll();var t=localStorage.getItem("polling");isNaN(t)||(this.timer=setInterval((function(){return e.poll()}),t)),a={header:{name:"app-header",componentName:"HorizontalHead"},Container:{classname:"grid-container",StylingAttributes:{display:"grid","grid-template-row":"25% 25% 25% 25%","grid-template-columns":"25% 25% 25% 25%","grid-gap":"5px",height:"calc(100vh - 65px)",width:"100%"},CommonSection:[{name:"CollapseExpandWrapper",id:"CollapseExpandWrapper",type:"component",StylingAttributes:{"grid-column-start":"1","grid-column-end":"2","grid-row-start":"1","grid-row-end":"3",background:"white","margin-top":"36px","z-index":"1"},nested:!0,nestedElement:{name:"S1 Enterprise - Hierarchy Modes",id:"s1ei-ui-hierarchyModes-app",type:"App",StylingAttributes:{border:"1px solid blue","margin-top":"30px","z-index":"1"}}}],mainSection:{name:"main-app",type:"App",StylingAttributes:{"grid-column-start":"1","grid-column-end":"5","grid-row-start":"1","grid-row-end":"5"}}},footer:{name:"app-footer",componentName:"Footer"}},n=Object(m.lazy)((function(){return o(803)("./".concat(a.header.componentName))}))}},{key:"componentDidMount",value:function(){var e=this,t=localStorage.getItem("polling");if(isNaN(t)){if(this.sessionID=localStorage.getItem("activeToken"),this.wshost=window.location.host.replace(/['"]+/g,""),this.wshostname=window.location.hostname.replace(/['"]+/g,""),this.protocol=window.location.protocol.replace(/['"]+/g,""),"https:"===this.protocol)this.ioClient=f.a.connect("wss://".concat(this.wshost),{transports:["websocket"]});else{var o=JSON.parse(window.localStorage.getItem("wsport"));this.ioClient=f.a.connect("ws://".concat(this.wshostname,":").concat(o),{transports:["websocket"]})}this.ioClient.on("connect",(function(){e.ioClient.emit("token",e.sessionID)})),this.ioClient.on("timeout",(function(t){console.log("session expired msg from server",t),e.ioClient.emit("leave",e.sessionID),localStorage.setItem("sessionTimeOut",!0),window.postMessage(JSON.stringify({eventType:"session-timeout",payload:{show:!0,message:"Session Timeout. ",variant:"error"}}))}))}var n=JSON.parse(localStorage.getItem("UserInfo"));this.setState({userInfo:{name:n&&n.name?n.name:"",email:n&&n.email?n.email:"",title:n&&n.title?n.title:"",firstName:n&&n.firstName?n.firstName:"",lastName:n&&n.lastName?n.lastName:""}})}},{key:"render",value:function(){var e=this,t=this.state,o=t.dialogShow,r=(t.eventType,this.props.t);if("true"==localStorage.getItem("sessionTimeOut"))return Object(A.jsxs)(w.default,{showDialog:o,id:"dialogPopup",children:[Object(A.jsx)(O.a,{id:"alert-dialog-title",children:r("SessionTimeout")}),Object(A.jsx)(y.a,{children:Object(A.jsx)(j.a,{id:"alert-dialog-description",children:r("SessionTimeoutInfo")})}),Object(A.jsx)(b.a,{children:Object(A.jsx)(C.a,{onClick:this.callTimeout,autoFocus:!0,children:r("Close")})})]});var l=this.props,s=l.classes,c=(l.theme,a.Container.mainSection),p=c.name,g=c.type,d=c.StylingAttributes;return Object(A.jsxs)("div",{className:s.root,children:[Object(A.jsx)(u.a,{}),Object(A.jsx)(m.Suspense,{fallback:Object(A.jsx)("div",{style:{opacity:"0",backgroundColor:"#05322B"},children:"Loading..."}),children:Object(A.jsx)(n,{handleDrawerOpen:this.handleDrawerOpen,history:this.props.history,handleDrawerClose:this.handleDrawerClose,open:this.state.open,location:this.props.location,fetchUserMangtData:this.fetchUserMangtData,userInfo:this.state.userInfo,designJSON:a})}),Object(A.jsx)("div",{children:Object(A.jsxs)(v.default,{style:a.Container.StylingAttributes,classname:a.Container.classname,children:[0!==JSON.parse(window.localStorage.getItem("navigation")).length?this.checkForPermittedApps()?null:a.Container.CommonSection.length?a.Container.CommonSection.map((function(t){return e.checkForPermittedCommonApp(t)?Object(A.jsx)(S.default,Object(i.a)(Object(i.a)({mainAppId:p},t),{},{commonappImpacted:e.getVisibility(t.containerName)})):null})):null:null,"App"===g?Object(A.jsx)(h.default,{open:this.state.open,location:this.props.location,history:this.props.history,classname:p,style:d}):null]})})]})}}]),p}(p.a.Component);t.default=Object(N.a)()(d()((function(e){return{root:{webkitUserSelect:"none",userSelect:"none"}}}),{withTheme:!0})(k))}}]);
//# sourceMappingURL=64.b651cc5b.chunk.js.map