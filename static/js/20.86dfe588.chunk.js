(this["webpackJsonpapp-shell-client"]=this["webpackJsonpapp-shell-client"]||[]).push([[20,53,119],{1018:function(e,t,n){"use strict";n.r(t);var i=n(850);n.d(t,"default",(function(){return i.default}))},849:function(e,t,n){},850:function(e,t,n){"use strict";n.r(t);var i=n(92),s=n(17),a=n(12),p=n(37),o=n(26),c=n(36),r=n(0),d=n.n(r),u=n(752),l=n(751),v=n.n(l),h=n(93),m=n.n(h),y=(n(849),n(4)),b=function(e){Object(o.a)(n,e);var t=Object(c.a)(n);function n(e){var i;return Object(s.a)(this,n),(i=t.call(this,e)).handleClickOutside=function(e){var t=e.path||e.composedPath&&e.composedPath();t[0].outerHTML.slice(0,30).includes("asset-menu")||t[1].outerHTML.slice(0,30).includes("asset-menu")||!i.wrapperRef||i.wrapperRef.contains(e.target)||(i.isOverlayLayout&&v()(".pinapp-container").css("display","none"),v()(".pinapp-container").css("width","0px"),v()(".backdrop").css("display","none"))},i.onMouseEnter=function(e){i.state.appPinned||(i.isOverlayLayout&&v()(".pinapp-container").css("display","block"),v()(".pinapp-container").css("width",e.detail.width),v()(".backdrop").css("display","block"))},i.onMouseLeave=function(e){i.state.appPinned||(i.isOverlayLayout&&v()(".pinapp-container").css("display","none"),v()(".pinapp-container").css("width",e.detail.width),v()(".backdrop").css("display","none"))},i.setMainApp=function(e){i.setState({appPinned:!i.state.appPinned}),"pinapp-event"===e.type?(v()(".grid-container").css("grid-template-columns","21.4% 19.65% 19.65% 19.65% 19.65%"),v()(".pinapp-container").css("width","100%"),v()(".backdrop").css("display","none")):(v()(".grid-container").css("grid-template-columns","3.03% 24.2425% 24.2425% 24.2425% 24.2425%"),v()(".pinapp-container").css("width","410px"),v()(".backdrop").css("display","block"))},i.state={appPinned:!1},i.isOverlayLayout=m.a.isEqual(localStorage.getItem("designTemplate"),"overlay-layout"),i.setWrapperRef=i.setWrapperRef.bind(Object(p.a)(i)),i.handleClickOutside=i.handleClickOutside.bind(Object(p.a)(i)),i}return Object(a.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("pinapp-event",this.setMainApp,!1),document.addEventListener("unpinapp-event",this.setMainApp,!1),document.addEventListener("hoverapp-event",this.onMouseEnter,!1),document.addEventListener("nonhoverapp-event",this.onMouseLeave,!1),this.isOverlayLayout&&document.addEventListener("mousedown",this.handleClickOutside)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("pinapp-event",this.setMainApp),document.removeEventListener("unpinapp-event",this.setMainApp),document.removeEventListener("hoverapp-event",this.onMouseEnter),document.removeEventListener("nonhoverapp-event",this.onMouseLeave),this.isOverlayLayout&&document.removeEventListener("mousedown",this.handleClickOutside)}},{key:"setWrapperRef",value:function(e){this.wrapperRef=e}},{key:"render",value:function(){var e=this;return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("div",{className:"backdrop",onClick:function(){return e.onMouseLeave({detail:{width:"0px"}})}}),Object(y.jsx)("div",{ref:this.setWrapperRef,className:"pinapp-container",style:this.props.commonappImpacted?Object(i.a)(Object(i.a)({},this.props.commonappImpacted.commonStylingUpdated),this.props.StylingAttributes):Object(i.a)({},this.props.StylingAttributes),children:Object(y.jsx)(u.default,Object(i.a)({id:this.props.nestedElement.id},this.props.nestedElement))})]})}}]),n}(d.a.Component);t.default=b}}]);
//# sourceMappingURL=20.86dfe588.chunk.js.map