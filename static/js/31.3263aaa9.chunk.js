(this["webpackJsonpapp-shell-client"]=this["webpackJsonpapp-shell-client"]||[]).push([[31,37,112],{1342:function(e,t,n){"use strict";n.r(t);var i=n(92),o=(n(0),n(845)),r=n(685),s=(n(734),n(224),n(755),n(751)),a=n.n(s),p=n(4);describe("AppLoaderFrame non routable App",(function(){Object(r.shallow)(Object(p.jsx)(o.default,{})).instance();var e=[{id:"assetTree",name:"Asset Dashboard",link:"/asset-dashboard/",icon:"speedrounded",host:"https://ofe-dev-nginx-lb01-1933176829.us-west-2.elb.amazonaws.com",path:"/asset-dashboard",template:"/index.html",navService:"/nav",default:!0,feedbackFlag:!0,visibility:!0,displayTextId:"dashboard",menuItemId:"cases"},{id:"appbuilder",name:"App Builder",link:"/app-builder/",icon:"warningrounded",host:"https://cde-sc-nginx-dev01-elb01-238862697.us-west-2.elb.amazonaws.com/appbuilder",path:"/app-builder",template:"/index.html",navService:"/nav",displayTextId:"dashboard",default:!1,visibility:!1}];it("check setIsOpen function",(function(){window.localStorage.setItem("navigation",JSON.stringify(e));var t=Object(r.mount)(Object(p.jsx)(o.default,Object(i.a)({id:"appbuilder"},{name:"CollapseExpandWrapper",id:"CollapseExpandWrapper",type:"component",StylingAttributes:{"col-start":"1","col-end":"2","row-sart":"1","row-end":"3"},nested:"true",nestedElement:{name:"Asset tree app",id:"assetTree",type:"App",StylingAttributes:{"grid-column-start":"1","grid-column-end":"2","grid-row-start":"1","grid-row-end":"5",background:"white",border:"1px solid black","margin-top":"30px"}},events:[{type:"collapse",useCustomScript:!0,mainSectionCss:{"grid-column-start":"1","grid-column-end":"5","grid-row-start":"1","grid-row-end":"5",customScript:"return function($){const marg='-'+$('.'+this.props.mainAppId).next().width()+'px';  $('.'+this.props.mainAppId).css({'margin-left':marg,transition : 'all 0.5s ease-in-out'});};"},collpaseSectionCss:{}},{type:"expand",mainSectionCss:{"grid-column-start":"2","grid-column-end":"5","grid-row-start":"1","grid-row-end":"5",customScript:"return function(){const marg='-'+$('.'+this.props.mainAppId).next().width()+'px';  $('.'+this.props.mainAppId).css({'margin-left':'0px',transition : 'all 0.5s ease-in-out'});}"},collpaseSectionCss:{}}]}))).find("CollapseExpandWrapper").at(0);t.instance().setIsOpen(),t.instance().setIsOpen()})),describe("css of main app on expand collpase",(function(){jest.fn((function(){return{css:jest.fn(),removeClass:jest.fn(),hasClass:jest.fn(),next:jest.fn()}}));it("css updated",(function(){window.localStorage.setItem("navigation",JSON.stringify(e)),Object(r.mount)(Object(p.jsx)(o.default,Object(i.a)({},{name:"CollapseExpandWrapper",id:"CollapseExpandWrapper",mainAppId:"material-icons",type:"component",commonappImpacted:{originaterApp:"demoapp",commonStylingUpdated:{display:"block","margin-top":"30px"},StylingAttributes:{"grid-column-start":"1","grid-column-end":"5","grid-row-start":"1","grid-row-end":"5"}},StylingAttributes:{"col-start":"1","col-end":"2","row-sart":"1","row-end":"3"},nested:"true",nestedElement:{name:"Asset tree app",id:"assetTree",type:"App",StylingAttributes:{"grid-column-start":"1","grid-column-end":"2","grid-row-start":"1","grid-row-end":"5",background:"white",border:"1px solid black","margin-top":"30px"}},events:[{type:"collapse",useCustomScript:!0,mainSectionCss:{"grid-column-start":"1","grid-column-end":"5","grid-row-start":"1","grid-row-end":"5",customScript:"return function($){const marg='-'+$('.'+this.props.mainAppId).next().width()+'px';  $('.'+this.props.mainAppId).css({'margin-left':marg,transition : 'all 0.5s ease-in-out'});};"},collpaseSectionCss:{}},{type:"expand",mainSectionCss:{"grid-column-start":"2","grid-column-end":"5","grid-row-start":"1","grid-row-end":"5",customScript:"return function(){const marg='-'+$('.'+this.props.mainAppId).next().width()+'px';  $('.'+this.props.mainAppId).css({'margin-left':'0px',transition : 'all 0.5s ease-in-out'});}"},collpaseSectionCss:{}}]}))).find("CollapseExpandWrapper").at(0).instance().setMainApp(a.a,"collapse","test",320)}))}))}))},696:function(e,t){},734:function(e,t,n){"use strict";(function(e){var t=n(685),i=n(840),o=n.n(i);Object(t.configure)({adapter:new o.a});var r={getItem:jest.fn(),setItem:jest.fn(),clear:jest.fn()};e.localStorage=r,jest.setTimeout(3e4)}).call(this,n(133))},823:function(e,t,n){"use strict";function i(e){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.Collapse=void 0;var o,r=(o=n(0))&&o.__esModule?o:{default:o};function s(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function a(e,t){return a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},a(e,t)}function p(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=u(e);if(t){var o=u(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return c(this,n)}}function c(e,t){if(t&&("object"===i(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return l(e)}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e){return u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},u(e)}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(c,e);var t,n,i,o=p(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),d(l(t=o.call(this,e)),"timeout",void 0),d(l(t),"container",void 0),d(l(t),"content",void 0),d(l(t),"onResize",(function(){if(clearTimeout(t.timeout),t.container&&t.content){var e=t.props,n=e.isOpened,i=e.checkTimeout,o=Math.floor(t.container.clientHeight),r=Math.floor(t.content.clientHeight),s=n&&Math.abs(r-o)<=1,a=!n&&Math.abs(o)<=1;s||a?t.onRest({isFullyOpened:s,isFullyClosed:a,isOpened:n,containerHeight:o,contentHeight:r}):(t.onWork({isFullyOpened:s,isFullyClosed:a,isOpened:n,containerHeight:o,contentHeight:r}),t.timeout=setTimeout((function(){return t.onResize()}),i))}})),d(l(t),"onRest",(function(e){var n=e.isFullyOpened,i=e.isFullyClosed,o=e.isOpened,r=e.containerHeight,s=e.contentHeight;if(t.container&&t.content){var a=o&&t.container.style.height==="".concat(s,"px"),p=!o&&"0px"===t.container.style.height;if(a||p){t.container.style.overflow=o?"initial":"hidden",t.container.style.height=o?"auto":"0px";var c=t.props.onRest;c&&c({isFullyOpened:n,isFullyClosed:i,isOpened:o,containerHeight:r,contentHeight:s})}}})),d(l(t),"onWork",(function(e){var n=e.isFullyOpened,i=e.isFullyClosed,o=e.isOpened,r=e.containerHeight,s=e.contentHeight;if(t.container&&t.content){var a=o&&t.container.style.height==="".concat(s,"px"),p=!o&&"0px"===t.container.style.height;if(!a&&!p){t.container.style.overflow="hidden",t.container.style.height=o?"".concat(s,"px"):"0px";var c=t.props.onWork;c&&c({isFullyOpened:n,isFullyClosed:i,isOpened:o,containerHeight:r,contentHeight:s})}}})),d(l(t),"onRefContainer",(function(e){t.container=e})),d(l(t),"onRefContent",(function(e){t.content=e})),e.initialStyle?t.initialStyle=e.initialStyle:t.initialStyle=e.isOpened?{height:"auto",overflow:"initial"}:{height:"0px",overflow:"hidden"},t}return t=c,(n=[{key:"componentDidMount",value:function(){this.onResize()}},{key:"shouldComponentUpdate",value:function(e){var t=this.props,n=t.theme,i=t.isOpened;return t.children!==e.children||i!==e.isOpened||Object.keys(n).some((function(t){return n[t]!==e.theme[t]}))}},{key:"getSnapshotBeforeUpdate",value:function(){if(!this.container||!this.content)return null;if("auto"===this.container.style.height){var e=this.content.clientHeight;this.container.style.height="".concat(e,"px")}return null}},{key:"componentDidUpdate",value:function(){this.onResize()}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeout)}},{key:"render",value:function(){var e=this.props,t=e.theme,n=e.children,i=e.isOpened;return r.default.createElement("div",{ref:this.onRefContainer,className:t.collapse,style:this.initialStyle,"aria-hidden":!i},r.default.createElement("div",{ref:this.onRefContent,className:t.content},n))}}])&&s(t.prototype,n),i&&s(t,i),c}(r.default.Component);t.Collapse=f,d(f,"defaultProps",{theme:{collapse:"ReactCollapse--collapse",content:"ReactCollapse--content"},initialStyle:void 0,onRest:void 0,onWork:void 0,checkTimeout:50})},845:function(e,t,n){"use strict";n.r(t);var i,o=n(17),r=n(12),s=n(37),a=n(26),p=n(36),c=n(0),l=n.n(c),u=n(964),d=n(752),f=n(64),h=n(751),m=n.n(h),b=(n(846),n(4)),y=function(e){Object(a.a)(n,e);var t=Object(p.a)(n);function n(e){var i;return Object(o.a)(this,n),(i=t.call(this,e)).state={isOpened:!localStorage.getItem("isOpened")||JSON.parse(localStorage.getItem("isOpened")),style:e.StylingAttributes,events:e.events},i.setIsOpen=i.setIsOpen.bind(Object(s.a)(i)),i}return Object(r.a)(n,[{key:"componentDidMount",value:function(){localStorage.getItem("isOpened")&&this.setIsOpen()}},{key:"setMainApp",value:function(e,t,n,o){i="0px";var r="margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms";if("collapse"===t){var s=void 0===o?"33%":"".concat(o,"px");i="-"+s,r="margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"}e("."+n).css({"margin-left":i,transition:r})}},{key:"setIsOpen",value:function(){if(this.setState({isOpened:!this.state.isOpened}),this.state.isOpened){var e=Object.assign({},this.props.StylingAttributes);e.background="",e.border=0,this.setState({style:e})}else this.setState({style:this.props.StylingAttributes});if(void 0===this.props.commonappImpacted||!0===this.props.commonappImpacted.containerEvent){var t=this.props&&this.props.mainAppId;if(this.state.isOpened){localStorage.setItem("isOpened",this.state.isOpened);var n=m()("."+t).prev().width();this.setMainApp(m.a,"collapse",t,n)}else if(!this.state.isOpened){localStorage.setItem("isOpened",this.state.isOpened);var i=m()("."+t).prev().width();this.setMainApp(m.a,"expand",t,i)}}}},{key:"render",value:function(){var e=this.state.isOpened;if(this.props.commonappImpacted&&void 0!==this.props.commonappImpacted){var t=this.props&&this.props.mainAppId;this.props.commonappImpacted.mainStylingUpdated&&m()("."+t).css(this.props.commonappImpacted.mainStylingUpdated),this.state.isOpened||"none"!==this.props.commonappImpacted.commonStylingUpdated.display?this.state.isOpened||!0!==this.props.commonappImpacted.containerEvent?m()("."+t).css({"margin-left":"0px"}):m()("."+t).css({"margin-left":"-22%"}):m()("."+t).css({"margin-left":i})}return Object(b.jsx)("div",{className:e?this.props.classes.box:this.props.classes.closedbox,style:this.props.commonappImpacted?this.props.commonappImpacted.commonStylingUpdated:this.state.style,children:Object(b.jsxs)(u.Collapse,{children:[Object(b.jsxs)("div",{style:{height:"calc(100vh - 118px)"},children:[void 0!==this.props.commonappImpacted&&"none"!==this.props.commonappImpacted.commonStylingUpdated.display&&Object(b.jsx)(d.default,{id:this.props.nestedElement.id,style:this.props.nestedElement.StylingAttributes}),void 0===this.props.commonappImpacted&&Object(b.jsx)(d.default,{id:this.props.nestedElement.id,style:this.props.nestedElement.StylingAttributes})]}),Object(b.jsx)("div",{id:"fill",className:this.props.classes.fill,onClick:this.setIsOpen}),Object(b.jsxs)("div",{id:"collapse",className:this.props.classes.collapse,children:[Object(b.jsx)("div",{id:"arrow",className:this.state.isOpened?this.props.classes.icon:this.props.classes.iconLeft,children:Object(b.jsxs)("div",{className:this.props.classes.arrow,children:[" ",Object(b.jsx)("a",{onClick:this.setIsOpen,children:this.state.isOpened?Object(b.jsx)("div",{class:"material-icons-collapse MuiIcon-root",style:{width:"20px",padding:"30px 0"},"aria-hidden":"true",children:Object(b.jsx)("div",{style:{width:"18px",height:"18px",left:"calc(50% - 18px/2)",top:"calc(50% - 18px/2)",position:"absolute"},children:"keyboard_arrow_left"})}):Object(b.jsx)("div",{class:"material-icons-collapse MuiIcon-root",style:{width:"20px",padding:"30px 0"},"aria-hidden":"true",children:Object(b.jsx)("div",{style:{width:"18px",height:"18px",left:"calc(50% - 18px/2)",top:"calc(50% - 18px/2)",position:"absolute"},children:"keyboard_arrow_right"})})})]})}),Object(b.jsx)("div",{id:"line",className:this.props.classes.line})]})]})})}}]),n}(l.a.Component);t.default=Object(f.a)((function(){return{box:{position:"relative","text-align":"justify",width:"100%",height:" calc(100vh - 118px) !important",transition:"margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"},closedbox:{position:"relative","text-align":"justify","margin-left":"-100%",width:"100%",height:" calc(100vh - 118px) !important",transition:"margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"},icon:{position:"absolute",left:"0%",top:"0%",cursor:"pointer","margin-top":"calc(50vh - 87px)","margin-bottom":"calc(50vh - 67px)","border-radius":"0px 4px 4px 0px",background:"#EBEFEE","&:hover":{backgroundColor:"#147D64",color:"white"}},collapse:{background:"transparent",position:"absolute",top:"0",left:"100%",height:"calc(100vh - 118px)",width:"5px"},iconLeft:{position:"absolute",left:"0",top:"0px",cursor:"pointer","margin-top":"calc(50vh - 87px)","margin-bottom":"calc(50vh - 67px)",background:"#EBEFEE","border-radius":"0px 4px 4px 0px","&:hover":{backgroundColor:"#147D64",color:"white"}},line:{position:"absolute",width:"4px",height:"calc(100vh - 118px)",left:"0%",top:"1%",bottom:" 0%",background:"#EBEFEE","border-radius":"0px 4px 4px 0px"},arrow:{height:"60px"},fill:{position:"absolute",top:"0",height:"calc(100vh - 118px)",width:"21px",right:"-21px",cursor:"pointer"}}}))(y)},846:function(e,t,n){},964:function(e,t,n){"use strict";var i=n(823).Collapse,o=n(965).UnmountClosed;e.exports=o,o.Collapse=i,o.UnmountClosed=o},965:function(e,t,n){"use strict";function i(e){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.UnmountClosed=void 0;var o,r=(o=n(0))&&o.__esModule?o:{default:o},s=n(823),a=["isOpened"],p=["isOpened"];function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},c.apply(this,arguments)}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){v(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function f(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function h(e,t){return h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},h(e,t)}function m(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=g(e);if(t){var o=g(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return b(this,n)}}function b(e,t){if(t&&("object"===i(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return y(e)}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e){return g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},g(e)}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var O=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(l,e);var t,n,i,o=m(l);function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),v(y(t=o.call(this,e)),"onWork",(function(e){var n=e.isOpened,i=d(e,a);t.setState({isResting:!1,isOpened:n});var o=t.props.onWork;o&&o(u({isOpened:n},i))})),v(y(t),"onRest",(function(e){var n=e.isOpened,i=d(e,p);t.setState({isResting:!0,isOpened:n,isInitialRender:!1});var o=t.props.onRest;o&&o(u({isOpened:n},i))})),v(y(t),"getInitialStyle",(function(){var e=t.state,n=e.isOpened;return e.isInitialRender&&n?{height:"auto",overflow:"initial"}:{height:"0px",overflow:"hidden"}})),t.state={isResting:!0,isOpened:e.isOpened,isInitialRender:!0},t}return t=l,(n=[{key:"componentDidUpdate",value:function(e){var t=this.props.isOpened;e.isOpened!==t&&this.setState({isResting:!1,isOpened:t,isInitialRender:!1})}},{key:"render",value:function(){var e=this.state,t=e.isResting,n=e.isOpened;return t&&!n?null:r.default.createElement(s.Collapse,c({},this.props,{initialStyle:this.getInitialStyle(),onWork:this.onWork,onRest:this.onRest}))}}])&&f(t.prototype,n),i&&f(t,i),l}(r.default.PureComponent);t.UnmountClosed=O,v(O,"defaultProps",{onWork:void 0,onRest:void 0})}}]);
//# sourceMappingURL=31.3263aaa9.chunk.js.map