(this["webpackJsonpapp-shell-client"]=this["webpackJsonpapp-shell-client"]||[]).push([[47,111],{792:function(e,t,n){},825:function(e,t,n){"use strict";n.r(t);var i=n(46),a=n(17),o=n(12),s=n(37),r=n(26),c=n(36),l=n(0),d=n.n(l),p=n(64),m=n(1366),u=n(2064),h=n(1340),b=n(889),f=n.n(b),g=n(888),x=n.n(g),v=n(885),j=n.n(v),y=n(887),I=n.n(y),k=n(693),w=n.n(k),O=n(664),C=n(81),S=["hierarchy.onNodeClickPath","map.onMarkerClick"],N=(n(792),n(4));function L(e){var t=0===e.index,n=e.index===e.length-1,i=1===e.length;return Object(N.jsx)(N.Fragment,{children:!n||i?Object(N.jsxs)(h.a,{className:t?e.classes.firstLink:e.classes.link,href:"#",onClick:e.onClick,children:[t&&Object(N.jsx)(x.a,{className:e.classes.icon}),e.label]}):Object(N.jsx)(u.a,{className:e.classes.typography,children:e.label})})}var A=function(e){Object(r.a)(n,e);var t=Object(c.a)(n);function n(e){var o;Object(a.a)(this,n),(o=t.call(this,e)).handleOptionClick=function(e){window.location.href="#"+e.link},o.updateDropdown=function(e){o.options=window.getMenuItemsList(e.detail.menuItemId);var t=o.options.findIndex((function(t){return t.id===e.detail.id}));o.setState({selection:t})},o.getPermitionMenuItemsAppId=function(e){return Object(C.a)().find((function(t){return t.rsname===e}))},o.updateBcItems=function(e){if(S.includes(e.detail.eventName)){var t=o.state.bcItems.slice();t.length>1&&t.splice(1),void 0!==e.detail.body&&(Array.isArray(e.detail.body)?t.push.apply(t,Object(i.a)(e.detail.body)):t.push(e.detail.body)),o.setState({bcItems:t})}};o.subSytemList=[];var r=window.getSelectedAppInfo();o.options=r?window.getMenuItemsList(r.menuItemId):"";var c=r?o.options.findIndex((function(e){return e.id===r.id})):0;return o.state={bcItems:[],selection:c},o.handleChange=o.handleChange.bind(Object(s.a)(o)),o}return Object(o.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("shareContext",this.updateBcItems,!1),document.addEventListener("onAppChange",this.updateDropdown,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("shareContext",this.updateBcItems),document.removeEventListener("onAppChange",this.updateDropdown)}},{key:"handleChange",value:function(e,t,n){this.setState({selection:n}),this.handleOptionClick(this.options[n])}},{key:"render",value:function(){var e=this,t=this.props,n=t.classes,i=t.t;return Object(N.jsxs)("div",{className:n.breadcrumb,children:[Object(N.jsx)(m.a,{maxItems:5,separator:Object(N.jsx)(f.a,{fontSize:"small",color:"inherit"}),"aria-label":"breadcrumb",className:n.breadcrumb,children:this.state.bcItems.map((function(t,i){return e.renderBreadcrumbItem(t,i,n,e.state.bcItems.length)}))}),Object(N.jsx)(w.a,{children:Object(N.jsx)("div",{id:"dropDownMenuBreadcrumb",className:n.dropDownMenu,children:this.options&&this.options.length>1&&Object(N.jsx)(j.a,{value:this.state.selection,onChange:this.handleChange,children:this.options.map((function(t,n){return Object(N.jsx)(I.a,{disabled:"disabled"===e.getPermitionMenuItemsAppId(t.id).access,value:n,primaryText:""!==window.i18Resources?t.displayTextId?i(t.displayTextId):i(t.id):t.name})}))})})})]})}},{key:"renderBreadcrumbItem",value:function(e,t,n,i){var a=this;return Object(N.jsx)(L,{index:t,length:i,label:e.name,classes:n,onClick:function(n){n.preventDefault(),a.itemClickHandler(e,t)}},t)}},{key:"itemClickHandler",value:function(e,t){var n={state:{mode:"spa",detail:{payLoad:{context:{eventName:"breadcrumb.onItemClick",body:e,timeStamp:Date.now(),origin:window.location.origin}}.context}},appname:""};window.parent.postMessage(JSON.stringify({eventType:"navigation",payload:n}));var i=this.state.bcItems.slice();i.splice(t+1),this.setState({bcItems:i})}}]),n}(d.a.Component);t.default=Object(O.a)()(Object(p.a)((function(){return{root:{"& > * + *":{marginTop:"0px",fontSize:"14px"}},breadcrumb:{height:"20px",marginTop:"12px",fontSize:"14px",fontFamily:"'Noto Sans'",fontWeight:"normal",lineHeight:"20px",letterSpacing:"0.05px"},firstLink:{color:"#1A2321",fontFamily:"'Poppins'",fontSize:"14px",lineHeight:"18px",letterSpacing:"0.1px",fontWeight:"600",textTransform:"uppercase",margin:"0px 4px"},link:{color:"#757575",fontFamily:"'Noto Sans'"},typography:{height:"20px",fontSize:"14px",fontFamily:"'Noto Sans'",fontWeight:"normal",lineHeight:"20px",letterSpacing:"0.05px",color:"#1A2321"},icon:{marginBottom:"-4px",marginTop:"0px",marginRight:"4px",marginLeft:"36px",width:18,height:18,color:"#1A2321"},dropDownMenu:{float:"right",marginTop:"-40px"}}}))(A))}}]);
//# sourceMappingURL=47.f372f05d.chunk.js.map