(this["webpackJsonpapp-shell-client"]=this["webpackJsonpapp-shell-client"]||[]).push([[68],{350:function(e,t,o){"use strict";o.r(t);var a,n,i=o(92),r=o(17),l=o(12),s=o(26),c=o(36),m=o(0),p=o.n(m),g=o(110),d=o.n(g),u=o(660),h=(o(693),o(799),o(745)),S=o(741),v=o(753),f=o(801),I=o.n(f),w=o(694),y=o(2075),b=o(2073),j=o(2074),O=o(2072),C=o(2065),A=o(664),N=o(4),k=function(e){Object(s.a)(p,e);var t=Object(c.a)(p);function p(e){var o;return Object(r.a)(this,p),(o=t.call(this,e)).getlogouturl=function(){fetch("".concat(window.location.pathname,"logout"),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json","Cache-Control":" no-cache"}}).then((function(e){return e.json()})).then((function(e){var t=e&&e.logout,o=window.location.pathname,a=window.hasOwnProperty("location")&&window.location.origin;localStorage.setItem("sessionLogout",!0),localStorage.setItem("logoutSuccess",!0),window.location.href=t+a+("/"===o?"":"/"+o.substring(1,o.length))})).catch((function(){return o.setState({message:o.props.t("LoginError"),loading:!1})}))},o.callTimeout=function(){o.setState({dialogShow:!1}),localStorage.removeItem("isAuthorized"),localStorage.removeItem("activeToken"),localStorage.removeItem("permissions"),localStorage.removeItem("microapps"),localStorage.removeItem("navigation"),localStorage.removeItem("commonappImpacted"),localStorage.removeItem("defaultAppLink"),localStorage.removeItem("productName"),localStorage.removeItem("app_link"),localStorage.removeItem("authUrl"),localStorage.removeItem("grantType"),localStorage.removeItem("userInfoDialogMap"),localStorage.removeItem("username"),localStorage.removeItem("designTemplate"),localStorage.removeItem("appfailed"),localStorage.removeItem("headerMenuConfig"),localStorage.removeItem("sessionTimeOut"),localStorage.removeItem("UserInfo"),localStorage.removeItem("tenantid"),localStorage.removeItem("refreshWindow"),localStorage.removeItem("showHeaderMenuIcon"),localStorage.removeItem("menuItems"),localStorage.removeItem("licencesUrl"),localStorage.removeItem("thankYouMsg"),localStorage.removeItem("unlicensedMessage"),localStorage.removeItem("showHeaderMenuIcon"),localStorage.removeItem("polling"),localStorage.removeItem("wsport"),localStorage.removeItem("tenancy"),localStorage.removeItem("selectedApp"),localStorage.removeItem("displayMenuItemOnHeader"),localStorage.removeItem("displayMicroappOnHeader"),localStorage.removeItem("applicationName"),localStorage.removeItem("advanceNotificationMeta"),localStorage.removeItem("selectedTenant"),localStorage.removeItem("appVersion"),o.getlogouturl()},o.handleDrawerOpen=function(){o.setState({open:!0})},o.handleDrawerClose=function(){o.setState({open:!1})},o.checkForPermittedApps=function(){var e=(null!==window.localStorage.getItem("navigation")?JSON.parse(window.localStorage.getItem("navigation")):[]).find((function(e){return e.link===o.props.location.pathname})),t=JSON.parse(window.localStorage.getItem("microapps")).find((function(e){return e.link===o.props.location.pathname}));return t&&!e||!t&&!e},o.checkForPermittedCommonApp=function(e){return JSON.parse(localStorage.getItem("permissions")).map((function(e){return e.rsname})).indexOf(e.nestedElement.id)>-1},o.getVisibility=function(e){var t=localStorage.getItem("navigation"),o=localStorage.getItem("commonappImpacted")&&"undefined"!=localStorage.getItem("commonappImpacted")?JSON.parse(localStorage.getItem("commonappImpacted")):null,a=t&&JSON.parse(localStorage.getItem("navigation")).filter((function(e){return e.link===window.location.hash.split("#")[1]}))[0];if(a&&void 0!=a){var i=a.id,r=o?o.filter((function(e){return e.originaterApp==i}))[0]:void 0;if(r&&void 0!=r){var l=r.impactedContainer.filter((function(t){return t.containerName[0]==e}));if(l.length>0)return{commonStylingUpdated:l[0].StylingAttributes,mainStylingUpdated:r&&r.StylingAttributes?r.StylingAttributes:n.Container.mainSection.StylingAttributes,containerEvent:l&&l[0].StylingAttributes?void 0==l[0].StylingAttributes.listenEvent||l[0].StylingAttributes.listenEvent:null}}}},o.state={open:!1,userInfo:{},dialogShow:!1},o}return Object(l.a)(p,[{key:"poll",value:function(){var e=this;fetch("".concat(window.location.pathname,"polling"),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json","Cache-Control":" no-cache"}}).then((function(e){return e.json()})).then((function(t){"failure"===t.message?(clearInterval(e.timer),e.timer=null,localStorage.setItem("sessionTimeOut",!0),e.setState({dialogShow:!0})):"session missing"===t.timeoutmsg&&(localStorage.clear(),e.props.history.push("/"))}))}},{key:"componentWillMount",value:function(){var e=this;this.poll();var t=localStorage.getItem("polling");isNaN(t)||(this.timer=setInterval((function(){return e.poll()}),t)),n={header:{name:"app-header",componentName:"VerticalHead"},Container:{classname:"grid-container",StylingAttributes:{display:"grid","grid-template-rows":"25% 25% 25% 25%","grid-template-columns":"25% 25% 25% 25%","grid-auto-rows":"150px",height:"calc(100vh - 72px)",width:"100%","margin-top":"72px","padding-left":"58px"},CommonSection:[{name:"PinAppWrapper",id:"PinAppWrapper",containerName:"pinapp-wrapper",type:"component",StylingAttributes:{"grid-column-start":"1","grid-column-end":"2","grid-row-start":"1","grid-row-end":"5","z-index":"1205",display:"none",width:"0px",overflow:"hidden","border-right":"1px solid var(--color-border-common-primary)","box-shadow":"var(--effect-base-drop-shadow-dark-small)"},nested:!0,nestedElement:{id:"assethierarchy",name:"Asset hierarcy",type:"App",StylingAttributes:{"z-index":"1"}}}],mainSection:{name:"main-app",type:"App",StylingAttributes:{"grid-column-start":"1","grid-column-end":"5","grid-row-start":"1","grid-row-end":"5"}}},footer:{}},a=Object(m.lazy)((function(){return o(803)("./".concat(n.header.componentName))}))}},{key:"componentDidMount",value:function(){var e=this,t=localStorage.getItem("polling");if(isNaN(t)){if(this.sessionID=localStorage.getItem("activeToken"),this.wshost=window.location.host.replace(/['"]+/g,""),this.wshostname=window.location.hostname.replace(/['"]+/g,""),this.protocol=window.location.protocol.replace(/['"]+/g,""),"https:"===this.protocol)this.ioClient=I.a.connect("wss://".concat(this.wshost),{transports:["websocket"]});else{var o=JSON.parse(window.localStorage.getItem("wsport"));this.ioClient=I.a.connect("ws://".concat(this.wshostname,":").concat(o),{transports:["websocket"]})}this.ioClient.on("connect",(function(){e.ioClient.emit("token",e.sessionID)})),this.ioClient.on("timeout",(function(t){console.log("session expired msg from server",t),e.ioClient.emit("leave",e.sessionID),localStorage.setItem("sessionTimeOut",!0),window.postMessage(JSON.stringify({eventType:"session-timeout",payload:{show:!0,message:"Session Timeout. ",variant:"error"}}))}))}var a=JSON.parse(localStorage.getItem("UserInfo"));this.setState({userInfo:{name:a&&a.name?a.name:"",email:a&&a.email?a.email:"",title:a&&a.title?a.title:"",firstName:a&&a.firstName?a.firstName:"",lastName:a&&a.lastName?a.lastName:""}})}},{key:"render",value:function(){var e=this,t=this.state,o=t.dialogShow,r=(t.eventType,this.props.t);if("true"==localStorage.getItem("sessionTimeOut"))return Object(N.jsxs)(w.default,{showDialog:o,id:"dialogPopup",children:[Object(N.jsx)(O.a,{id:"alert-dialog-title",children:r("SessionTimeout")}),Object(N.jsx)(b.a,{children:Object(N.jsx)(j.a,{id:"alert-dialog-description",children:r("SessionTimeoutInfo")})}),Object(N.jsx)(y.a,{children:Object(N.jsx)(C.a,{onClick:this.callTimeout,autoFocus:!0,children:r("Close")})})]});var l=this.props,s=l.classes,c=(l.theme,n.Container.mainSection),p=c.name,g=c.type,d=c.StylingAttributes;return Object(N.jsxs)("div",{className:s.root,children:[Object(N.jsx)(u.a,{}),Object(N.jsx)(m.Suspense,{fallback:Object(N.jsx)("div",{style:{opacity:"0",backgroundColor:"#05322B"},children:"Loading..."}),children:Object(N.jsx)(a,{handleDrawerOpen:this.handleDrawerOpen,history:this.props.history,handleDrawerClose:this.handleDrawerClose,open:this.state.open,location:this.props.location,fetchUserMangtData:this.fetchUserMangtData,userInfo:this.state.userInfo,designJSON:n})}),Object(N.jsx)("div",{children:Object(N.jsxs)(v.default,{style:n.Container.StylingAttributes,classname:n.Container.classname,children:[0!==JSON.parse(window.localStorage.getItem("navigation")).length?this.checkForPermittedApps()?null:n.Container.CommonSection.length?n.Container.CommonSection.map((function(t){return e.checkForPermittedCommonApp(t)?Object(N.jsx)(S.default,Object(i.a)(Object(i.a)({mainAppId:p},t),{},{commonappImpacted:e.getVisibility(t.containerName)})):null})):null:null,"App"===g?Object(N.jsx)(h.default,{open:this.state.open,location:this.props.location,history:this.props.history,classname:p,style:d}):null]})})]})}}]),p}(p.a.Component);t.default=Object(A.a)()(d()((function(e){return{root:{webkitUserSelect:"none",userSelect:"none"}}}),{withTheme:!0})(k))}}]);
//# sourceMappingURL=68.942d853f.chunk.js.map