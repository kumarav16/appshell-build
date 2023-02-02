(this["webpackJsonpapp-shell-client"]=this["webpackJsonpapp-shell-client"]||[]).push([[86],{645:function(e,a,t){"use strict";t.r(a),t.d(a,"bh_tabs",(function(){return c}));var i=t(17),n=t(12),r=t(175),o=(t(688),t(722)),l=t(672),s="truncation-menu",c=function(){function e(a){Object(i.a)(this,e),Object(r.h)(this,a),this.activeTabUpdate=Object(r.d)(this,"activeTabUpdate",7),this.bhEventOpen=Object(r.d)(this,"bhEventOpen",3),this.bhEventClose=Object(r.d)(this,"bhEventClose",3),this.bhEventSelected=Object(r.d)(this,"bhEventSelected",3),this.isBorder=!0,this.isSmall=!1,this.menuWidth="fluid",this.isTruncationMenuOpen=!1,this.truncateIndex=-1,this.truncateIndexPrev=-1,this.isInUpdate=!1}return Object(n.a)(e,[{key:"changeItems",value:function(){if("string"===typeof this.items)try{this._items=JSON.parse(this.items)}catch(e){}else this._items=this.items;this._items=this._items.map((function(e){return{label:e.label.length>26?"".concat(e.label.substring(0,26),"..."):e.label,key:e.key,icon:e.icon}})),this.handleTruncation()}},{key:"watchActiveKey",value:function(){this.setActiveKey(this.activeKey,!0)}},{key:"handleResize",value:function(){var e=this;this.viewport=Object(o.a)(),this.handleTruncation(),setTimeout((function(){e.setActiveKey(e.activeKey,!0)}))}},{key:"setActiveTab",value:function(e){if(e.detail&&e.detail.key){var a=e.detail.key;this.setActiveKey(a)}}},{key:"watchIsTruncationMenuOpen",value:function(){this.isTruncationMenuOpen?this.bhEventOpen.emit():(this.bhEventClose.emit(),this.element__container.focus())}},{key:"toggleTrucateMenu",value:function(){this.isTruncationMenuOpen=!this.isTruncationMenuOpen}},{key:"handleTruncation",value:function(){var e,a=this;if(this._items&&!(this._items.length<1))if("small"!==this.viewport){this.truncateIndexPrev=this.truncateIndex;var t=null===(e=this.element__container)||void 0===e?void 0:e.querySelectorAll(".bh-tabs--item"),i=this._items.findIndex((function(e,i){return!!t&&Array.from(t).slice(0,i+1).reduce((function(e,a){return e+a.clientWidth+20}),0)>a.element__container.clientWidth-24}));this.truncateIndex=i>0?i:-1,-1===this.truncateIndex&&(this.isTruncationMenuOpen=!1),this.truncateIndex!==this.truncateIndexPrev&&this.isTruncationMenuOpen&&(this.isInUpdate=!0,this.isTruncationMenuOpen=!1,this.setActiveKey(this.activeKey));var n=this.selectedKey===s?s:this._items.findIndex((function(e){return e.key===a.selectedKey}));n!==s&&n>0&&this.truncateIndex>-1&&n>this.truncateIndex&&(this.selectedKey=s)}else this.truncateIndex=-1}},{key:"handleTruncationSelection",value:function(e){e.detail&&e.detail.value&&this.setActiveKey(e.detail.value),this.isTruncationMenuOpen=!1}},{key:"setActiveKey",value:function(e){var a=this,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];try{if(this.activeKey=e,this.selectedKey=e,this.element__active_highlight&&this.element__container){var i=this.element__container.querySelector('[data-key="'.concat(e,'"]'));if(i)if(i.classList.contains("truncated")){var n=this.element__container.querySelector(".bh-tabs--truncation-menu");this.element__active_highlight.style.width="".concat(n.offsetWidth,"px"),this.element__active_highlight.style.left="".concat(n.offsetLeft,"px")}else this.element__active_highlight.style.width="".concat(i.getBoundingClientRect().width,"px"),this.element__active_highlight.style.left="".concat(i.offsetLeft,"px")}t||(this.activeTabUpdate.emit(this._items.find((function(e){return e.key===a.activeKey}))),this.bhEventSelected.emit(this._items.find((function(e){return e.key===a.activeKey}))))}catch(r){console.log(r)}}},{key:"preventDefaultForScrollKeys",value:function(e){if("ArrowUp"===e.code||"ArrowDown"===e.code||"ArrowRight"===e.code||"ArrowLeft"===e.code||"Space"===e.code)return e.preventDefault(),!1}},{key:"tabsGlobalClickEvent",value:function(e){this.element__truncation.contains(e.target)||this.element__menu__truncation.contains(e.target)||(this.isTruncationMenuOpen=!1)}},{key:"componentWillLoad",value:function(){this.changeItems(),this.viewport=Object(o.a)()}},{key:"componentDidLoad",value:function(){var e=this;window.addEventListener("click",(function(a){return e.tabsGlobalClickEvent(a)})),setTimeout((function(){var a,t,i;if(e._items&&!e.activeKey){e.setActiveKey(null===(a=e._items[0])||void 0===a?void 0:a.key,!0),e.handleTruncation();var n=null===(i=e.element__container.querySelector('[data-key="'.concat(null===(t=e._items[0])||void 0===t?void 0:t.key,'"]')))||void 0===i?void 0:i.querySelector(".bh-tabs--item__icon");if(n){var r,o=setInterval((function(){var a;n.clientWidth<=24&&(e.setActiveKey(null===(a=e._items[0])||void 0===a?void 0:a.key,!0),e.handleTruncation(),clearTimeout(r),clearInterval(o))}),25);r=setTimeout((function(){clearInterval(o)}),5e3)}}})),this.activeKey&&this.setActiveKey(this.activeKey,!0);var a=this;window.addEventListener("keydown",(function(e){if(a.element__container.contains(e.target)){var t=a.selectedKey===s?s:a._items.findIndex((function(e){return e.key===a.selectedKey}));switch(e.code){case"ArrowRight":a.isTruncationMenuOpen&&(a.isTruncationMenuOpen=!1),t===s||t===a.truncateIndex-1&&a.truncateIndex>-1?a.selectedKey=s:t<a._items.length-1&&(a.selectedKey=a._items[t+1].key),"small"===a.viewport&&(e.preventDefault(),a.calibrateScrollXPosition());break;case"ArrowLeft":a.isTruncationMenuOpen&&(a.isTruncationMenuOpen=!1),t===s?a.selectedKey=a._items[a.truncateIndex-1].key:t>a.truncateIndex&&a.truncateIndex>-1?t>0&&(a.selectedKey=a._items[a.truncateIndex-1].key):t>0&&(a.selectedKey=a._items[t-1].key),"small"===a.viewport&&(e.preventDefault(),a.calibrateScrollXPosition());break;case"Space":case"Enter":a.selectedKey===s?a.toggleTrucateMenu():a.selectedKey!==a.activeKey&&a.setActiveKey(a.selectedKey,!1)}}}),!1)}},{key:"calibrateScrollXPosition",value:function(){var e=this.element__wrapper.querySelector('.bh-tabs--item[data-key="'.concat(this.selectedKey,'"]')),a={left:this.element__wrapper.scrollLeft,right:this.element__wrapper.scrollLeft+this.element__wrapper.clientWidth},t={left:e.offsetLeft,right:e.offsetLeft+e.clientWidth};console.log(a,t,"displayWindow, selectedElementWindow"),t.right+24>a.right?this.element__wrapper.scrollTo(this.element__wrapper.scrollLeft+2*e.clientWidth,0):t.left-24<a.left&&this.element__wrapper.scrollTo(this.element__wrapper.scrollLeft-2*e.clientWidth,0)}},{key:"componentDidRender",value:function(){var e,a,t=this.element__container.querySelectorAll(".bh-tabs--item");this.firstItemWidth===(null===(e=Array.from(t)[0])||void 0===e?void 0:e.clientWidth)&&this.firstItemWidth||(this.firstItemWidth=null===(a=Array.from(t)[0])||void 0===a?void 0:a.clientWidth)}},{key:"componentDidUpdate",value:function(){var e,a;this.handleTruncation();var t=this.element__container.querySelectorAll(".bh-tabs--item");this.firstItemWidth===(null===(e=Array.from(t)[0])||void 0===e?void 0:e.clientWidth)&&this.firstItemWidth||(this.firstItemWidth=null===(a=Array.from(t)[0])||void 0===a?void 0:a.clientWidth)}},{key:"disconnectedCallback",value:function(){var e=this;window.removeEventListener("click",(function(a){return e.tabsGlobalClickEvent(a)}))}},{key:"render",value:function(){var e=this,a=this.host.tagName.toLowerCase().replace(l.a.tabs.tagNameBase,""),t=Object(l.c)(a);return this.isInUpdate&&setTimeout((function(){e.isInUpdate=!1,e.isTruncationMenuOpen=!0})),Object(r.f)(r.a,{class:"bh-tabs"},Object(r.f)("div",{class:"bh-tabs--wrapper",ref:function(a){e.element__wrapper=a}},Object(r.f)("div",{class:"bh-tabs--container ".concat(this.isBorder?"border":""," ").concat(this.isSmall?"small":""),ref:function(a){e.element__container=a},tabIndex:0,onKeyDown:this.preventDefaultForScrollKeys},Object(r.f)("div",{ref:function(a){e.element__active_highlight=a},class:"motion--fast bh-tabs--active-highlight"}),this._items&&this._items.map((function(a,t){return Object(r.f)("div",{class:"bh-tabs--item ".concat(e.selectedKey===a.key?"selected":""," motion--fast ").concat(a.key===e.activeKey?"active":""," ").concat(t>=e.truncateIndex&&e.truncateIndex>-1?"truncated":""),onClick:function(){e.setActiveKey(a.key)},"data-key":a.key},a.icon&&Object(r.f)("i",{class:"material-icons material-icons-outlined ".concat(e.isSmall?"typography--icon-small":"typography--icon-medium"," bh-tabs--item__icon ").concat(e.selectedKey===a.key?"selected":"")},a.icon),Object(r.f)("span",{class:"bh-tabs--item-label ".concat(e.isSmall?"typography--label-small":"typography--label-medium")},a.label))})),Object(r.f)("div",{class:"bh-tabs--truncation-menu ".concat(this.selectedKey===s?"selected":""," ").concat(this.truncateIndex>-1?"":"hidden")},Object(r.f)("i",{class:"material-icons material-icons-outlined ".concat(this.isSmall?"typography--icon-small":"typography--icon-medium"),ref:function(a){e.element__truncation=a},onClick:function(){e.toggleTrucateMenu()}},"more_horiz"),Object(r.f)("div",{class:"bh-tabs--truncation-menu--container ".concat(this.isTruncationMenuOpen?"":"hidden"),ref:function(a){e.element__menu__truncation=a}},Object(r.f)(t.menu,{menuItems:{itemGroups:[{items:this._items.slice(this.truncateIndex).map((function(e){return{label:e.label,value:e.key}}))}]},isFocused:this.isTruncationMenuOpen,menuWidth:this.menuWidth?this.menuWidth:"fluid",menuHeight:"small",selected:this.activeKey,onBhEventSelected:function(a){e.handleTruncationSelection(a),a.preventDefault(),a.stopPropagation()}}))))))}},{key:"host",get:function(){return Object(r.e)(this)}}],[{key:"watchers",get:function(){return{items:["changeItems"],activeKey:["watchActiveKey"],isTruncationMenuOpen:["watchIsTruncationMenuOpen"]}}}]),e}();c.style=".bh-tabs--wrapper{width:100%;-moz-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent}.bh-tabs--container{height:44px;display:flex;align-items:center;position:relative;outline:none}.bh-tabs--container.small{height:36px}.bh-tabs--container.border{border-bottom:var(--effect-border-width-regular) solid var(--color-border-common-primary)}.bh-tabs--item{white-space:nowrap;display:flex;align-items:center;margin-right:var(--spacing-margin-medium);color:var(--color-text-common-secondary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;height:100%}.bh-tabs--item-label{max-width:250px;overflow-x:hidden;text-overflow:ellipsis}.bh-tabs--item:hover,.bh-tabs--item.selected{color:var(--color-text-common-primary)}.bh-tabs--item.truncated{visibility:hidden;position:fixed;pointer-events:none}.bh-tabs--truncation-menu{display:flex;align-items:center}.bh-tabs--truncation-menu.hidden{display:none}.bh-tabs--truncation-menu:hover,.bh-tabs--truncation-menu.selected{color:var(--color-text-common-primary)}.bh-tabs--truncation-menu{color:var(--color-text-common-secondary);cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;height:44px}.bh-tabs--container.small .bh-tabs--truncation-menu{height:36px}.bh-tabs--truncation-menu--container{position:absolute;top:52px;right:0;z-index:10}.bh-tabs--truncation-menu--container.hidden{visibility:hidden;position:fixed}.bh-tabs--container.border .bh-tabs--truncation-menu--container{top:53px}.bh-tabs--container.small .bh-tabs--truncation-menu--container{top:44px}.bh-tabs--container.small.border .bh-tabs--truncation-menu--container{top:45px}.bh-tabs--item.active{color:var(--color-text-common-primary)}.bh-tabs--item:last-child{margin-right:0}.bh-tabs--item__icon{margin-right:var(--spacing-margin-xsmall)}.bh-tabs--active-highlight{position:absolute;height:2px;bottom:0;pointer-events:none;background-color:var(--color-fill-cta-primary-default)}.bh-tabs--label-block{display:flex;align-items:center;position:relative}.bh-tabs--truncation-wrapper{display:flex}.bh-tabs--trucation-icon{color:var(--color-text-common-secondary);cursor:pointer}.bh-tabs--trucation-icon:hover,.bh-tabs--trucation-icon:active,.bh-tabs--trucation-icon.selected{color:var(--color-text-common-primary)}.bh-tabs--label-block.truncated{position:fixed;opacity:0;visibility:hidden;pointer-events:none}.bh-tabs--label{color:var(--color-text-common-secondary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;max-width:220px;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis}.bh-tabs--label:hover,.bh-tabs--label:active,.bh-tabs--label.selected{color:var(--color-text-common-primary);text-decoration:underline}.bh-tabs--label.selected{color:var(--color-text-common-primary)}.bh-tabs--icon{color:var(--color-text-common-secondary);cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.bh-tabs--icon:hover,.bh-tabs--icon:active,.bh-tabs--icon.selected{color:var(--color-text-common-primary)}.bh-tabs--chevron-down{cursor:pointer;padding-left:var(--spacing-padding-xxsmall)}.bh-tabs--menu-container{position:absolute;top:26px;z-index:100}.bh-tabs--menu-container.flipped{right:0}@media (max-width: 599px){.bh-tabs--wrapper{margin:0 calc(-1 * var(--spacing-margin-small));padding-left:var(--spacing-padding-small);padding-right:var(--spacing-padding-small);overflow-x:auto}.bh-tabs--container{display:inline-flex}.bh-tabs--label{max-width:120px}}"},672:function(e,a,t){"use strict";t.d(a,"a",(function(){return n})),t.d(a,"b",(function(){return i})),t.d(a,"c",(function(){return r}));var i="bh-",n={a:{originalName:"bh-a",tagNameBase:"a",className:"BhA"},accordion:{originalName:"bh-accordion",tagNameBase:"accordion",className:"BhAccordion"},actionBar:{originalName:"bh-action-bar",tagNameBase:"action-bar",className:"BhActionBar"},actionMenu:{originalName:"bh-action-menu",tagNameBase:"action-menu",className:"BhActionMenu"},alert:{originalName:"bh-alert",tagNameBase:"alert",className:"BhAlert"},alertItem:{originalName:"bh-alert-item",tagNameBase:"alert-item",className:"BhAlertItem"},appShell:{originalName:"bh-app-shell",tagNameBase:"app-shell",className:"BhAppShell"},appShellMenu:{originalName:"bh-app-shell-menu",tagNameBase:"app-shell-menu",className:"BhAppShellMenu"},avatar:{originalName:"bh-avatar",tagNameBase:"avatar",className:"BhAvatar"},avatarGroup:{originalName:"bh-avatar-group",tagNameBase:"avatar-group",className:"BhAvatarGroup"},badge:{originalName:"bh-badge",tagNameBase:"badge",className:"BhBadge"},barChart:{originalName:"bh-bar-chart",tagNameBase:"bar-chart",className:"BhBarChart"},breadcrumbs:{originalName:"bh-breadcrumbs",tagNameBase:"breadcrumbs",className:"BhBreadcrumbs"},button:{originalName:"bh-button",tagNameBase:"button",className:"BhButton"},buttonDropdown:{originalName:"bh-button-dropdown",tagNameBase:"button-dropdown",className:"BhButtonDropdown"},buttonGroup:{originalName:"bh-button-group",tagNameBase:"button-group",className:"BhButtonGroup"},buttonTabs:{originalName:"bh-button-tabs",tagNameBase:"button-tabs",className:"BhButtonTabs"},card:{originalName:"bh-card",tagNameBase:"card",className:"BhCard"},checkbox:{originalName:"bh-checkbox",tagNameBase:"checkbox",className:"BhCheckbox"},chip:{originalName:"bh-chip",tagNameBase:"chip",className:"BhChip"},chipGroup:{originalName:"bh-chip-group",tagNameBase:"chip-group",className:"BhChipGroup"},content:{originalName:"bh-content",tagNameBase:"content",className:"BhContent"},dataTable:{originalName:"bh-data-table",tagNameBase:"data-table",className:"BhDataTable"},datePicker:{originalName:"bh-date-picker",tagNameBase:"date-picker",className:"BhDatePicker"},dateRangePicker:{originalName:"bh-date-range-picker",tagNameBase:"date-range-picker",className:"BhDateRangePicker"},dateTimePicker:{originalName:"bh-date-time-picker",tagNameBase:"date-time-picker",className:"BhDateTimePicker"},dialog:{originalName:"bh-dialog",tagNameBase:"dialog",className:"BhDialog"},divider:{originalName:"bh-divider",tagNameBase:"divider",className:"BhDivider"},donutChart:{originalName:"bh-donut-chart",tagNameBase:"donut-chart",className:"BhDonutChart"},dropdown:{originalName:"bh-dropdown",tagNameBase:"dropdown",className:"BhDropdown"},error:{originalName:"bh-error",tagNameBase:"error",className:"BhError"},footer:{originalName:"bh-footer",tagNameBase:"footer",className:"BhFooter"},formMessage:{originalName:"bh-form-message",tagNameBase:"form-message",className:"BhFormMessage"},header:{originalName:"bh-header",tagNameBase:"header",className:"BhHeader"},icon:{originalName:"bh-icon",tagNameBase:"icon",className:"BhIcon"},illustration:{originalName:"bh-illustration",tagNameBase:"illustration",className:"BhIllustration"},incrementer:{originalName:"bh-incrementer",tagNameBase:"incrementer",className:"BhIncrementer"},inlineDropdown:{originalName:"bh-inline-dropdown",tagNameBase:"inline-dropdown",className:"BhInlineDropdown"},kpi:{originalName:"bh-kpi",tagNameBase:"kpi",className:"BhKpi"},lineChart:{originalName:"bh-line-chart",tagNameBase:"line-chart",className:"BhLineChart"},list:{originalName:"bh-list",tagNameBase:"list",className:"BhList"},menu:{originalName:"bh-menu",tagNameBase:"menu",className:"BhMenu"},menuItem:{originalName:"bh-menu-item",tagNameBase:"menu-item",className:"BhMenuItem"},mobileMenu:{originalName:"bh-mobile-menu",tagNameBase:"mobile-menu",className:"BhMobileMenu"},modal:{originalName:"bh-modal",tagNameBase:"modal",className:"BhModal"},navMenu:{originalName:"bh-nav-menu",tagNameBase:"nav-menu",className:"BhNavMenu"},pagination:{originalName:"bh-pagination",tagNameBase:"pagination",className:"BhPagination"},panel:{originalName:"bh-panel",tagNameBase:"panel",className:"BhPanel"},progressBar:{originalName:"bh-progress-bar",tagNameBase:"progress-bar",className:"BhProgressBar"},radioButton:{originalName:"bh-radio-button",tagNameBase:"radio-button",className:"BhRadioButton"},scatterChart:{originalName:"bh-scatter-chart",tagNameBase:"scatter-chart",className:"BhScatterChart"},search:{originalName:"bh-search",tagNameBase:"search",className:"BhSearch"},selectionGroup:{originalName:"bh-selection-group",tagNameBase:"selection-group",className:"BhSelectionGroup"},settingsMenu:{originalName:"bh-settings-menu",tagNameBase:"settings-menu",className:"BhSettingsMenu"},slider:{originalName:"bh-slider",tagNameBase:"slider",className:"BhSlider"},spinner:{originalName:"bh-spinner",tagNameBase:"spinner",className:"BhSpinner"},statusIndicator:{originalName:"bh-status-indicator",tagNameBase:"status-indicator",className:"BhStatusIndicator"},stepper:{originalName:"bh-stepper",tagNameBase:"stepper",className:"BhStepper"},systemAlertItem:{originalName:"bh-system-alert-item",tagNameBase:"system-alert-item",className:"BhSystemAlertItem"},tabs:{originalName:"bh-tabs",tagNameBase:"tabs",className:"BhTabs"},tabularList:{originalName:"bh-tabular-list",tagNameBase:"tabular-list",className:"BhTabularList"},textArea:{originalName:"bh-text-area",tagNameBase:"text-area",className:"BhTextArea"},textInput:{originalName:"bh-text-input",tagNameBase:"text-input",className:"BhTextInput"},timePicker:{originalName:"bh-time-picker",tagNameBase:"time-picker",className:"BhTimePicker"},timeZonePicker:{originalName:"bh-time-zone-picker",tagNameBase:"time-zone-picker",className:"BhTimeZonePicker"},titleWrapper:{originalName:"bh-title-wrapper",tagNameBase:"title-wrapper",className:"BhTitleWrapper"},toggle:{originalName:"bh-toggle",tagNameBase:"toggle",className:"BhToggle"},tokenDemo:{originalName:"bh-token-demo",tagNameBase:"token-demo",className:"BhTokenDemo"},tooltip:{originalName:"bh-tooltip",tagNameBase:"tooltip",className:"BhTooltip"},tree:{originalName:"bh-tree",tagNameBase:"tree",className:"BhTree"},typeAhead:{originalName:"bh-type-ahead",tagNameBase:"type-ahead",className:"BhTypeAhead"},uploader:{originalName:"bh-uploader",tagNameBase:"uploader",className:"BhUploader"},verticalMenu:{originalName:"bh-vertical-menu",tagNameBase:"vertical-menu",className:"BhVerticalMenu"}},r=function(e){var a={a:"",accordion:"",actionBar:"",actionMenu:"",alert:"",alertItem:"",appShell:"",appShellMenu:"",avatar:"",avatarGroup:"",badge:"",barChart:"",breadcrumbs:"",button:"",buttonDropdown:"",buttonGroup:"",buttonTabs:"",card:"",checkbox:"",chip:"",chipGroup:"",content:"",dataTable:"",datePicker:"",dateRangePicker:"",dateTimePicker:"",dialog:"",divider:"",donutChart:"",dropdown:"",error:"",footer:"",formMessage:"",header:"",icon:"",illustration:"",incrementer:"",inlineDropdown:"",kpi:"",lineChart:"",list:"",menu:"",menuItem:"",mobileMenu:"",modal:"",navMenu:"",pagination:"",panel:"",progressBar:"",radioButton:"",scatterChart:"",search:"",selectionGroup:"",settingsMenu:"",slider:"",spinner:"",statusIndicator:"",stepper:"",systemAlertItem:"",tabs:"",tabularList:"",textArea:"",textInput:"",timePicker:"",timeZonePicker:"",titleWrapper:"",toggle:"",tokenDemo:"",tooltip:"",tree:"",typeAhead:"",uploader:"",verticalMenu:""};return Object.keys(a).forEach((function(t){a[t]=e+n[t].tagNameBase})),a}},688:function(e,a,t){"use strict";t.d(a,"a",(function(){return i}));var i={breakpoints:{LayoutMediaQueryMedium:600,LayoutMediaQueryLarge:1024,SizeBaseMq6001023:600,SizeBaseMq1024:1024},colorBorder:{commonPrimary:"#ced7d4",commonSecondary:"#b8b8b8",ctaSecondaryDefault:"#adbdb9",ctaSecondaryHover:"#8ca39d",ctaSecondaryPressed:"#748e88",ctaSecondaryFocused:"#adbdb9",controlUnselected:"#a0a0a0",controlSelected:"#02a783",controlDisabled:"#adbdb9",controlError:"#e16e75",formDefault:"#ced7d4",formHover:"#adbdb9",formFocused:"#02a783",formDisabled:"#adbdb9",formError:"#e16e75",formErrorHover:"#f0373a",dataVizComparisonSecondary:"#b8b8b8",dataVizComparisonPrimary:"#666eb4",dataVizDefault_1:"#666eb4",dataVizDefault_2:"#4ca2a8",dataVizDefault_3:"#af74b9",dataVizDefault_4:"#b49566",dataVizDefault_5:"#dd887c",dataVizDefault_6:"#e6b056",dataVizDefault_7:"#dd7cc2",dataVizDefault_8:"#b0cd5d",commonFocused:"#2cb0bc",commonError:"#ec979b",semanticSuccess:"#05322b",semanticError:"#e12d39",semanticNeutral:"#adbdb9",semanticWarning:"#e87516",semanticInfo:"#1f6362"},colorFill:{dataVizComparisonSecondary:"#d0d0d0",dataVizComparisonPrimary:"#666eb4",dataVizDefault_1:"#666eb4",semanticErrorHover:"#fdcbd3",semanticNeutralPressed:"#8ca39d",semanticErrorSelected:"#e12d39",dataVizDefault_2:"#4ca2a8",dataVizDefault_3:"#af74b9",dataVizDefault_4:"#b49566",dataVizDefault_5:"#dd887c",dataVizDefault_6:"#e6b056",dataVizDefault_7:"#dd7cc2",dataVizDefault_8:"#b0cd5d",controlErrorHover:"#fdcbd3",commonPrimary:"#f8faf9",commonSecondary:"#ffffff",commonBrand:"#05322b",commonTertiary:"#ebefee",ctaPrimaryDefault:"#147d64",ctaPrimaryHover:"#0c6b58",ctaPrimaryPressed:"#014d40",ctaPrimaryFocused:"#147d64",ctaSecondaryDefault:"rgba(255, 255, 255, 0)",ctaSecondaryHover:"#ebefee",ctaSecondaryPressed:"#adbdb9",ctaSecondaryFocused:"rgba(255, 255, 255, 0)",ctaCriticalDefault:"#e12d39",ctaCriticalHover:"#cf2333",ctaCriticalPressed:"#c21a2c",controlErrorSupplemental:"#e16e75",ctaCriticalFocused:"#e12d39",ctaDisabled:"#ebefee",controlUnselected:"rgba(255, 255, 255, 0)",controlUnselectedSupplemental:"#a0a0a0",controlUnselectedHover:"#f3f3f3",controlSelected:"#02a783",controlDisabled:"#ebefee",controlDisabledSupplemental:"#ced7d4",controlError:"#feeaee",menuUnselected:"#ffffff",menuHighlighted:"#ebefee",menuSelected:"#c6f7e2",menuSelectedSupplemental:"#effcf6",formDisabled:"#ebefee",formError:"#feeaee",avatarPrimary:"#147d64",avatarSecondary:"#653cad",avatarTertiary:"#ced7d4",avatarCircumference:"#02a783",commonOverlay:"rgba(18, 18, 18, 0.8)",controlAccent:"#a0a0a0",controlSelectedHover:"#147d64",controlSliderDisabled:"#ced7d4",controlSliderBackground:"#e7e7e7",semanticSuccessDefault:"#147d64",semanticSuccessSupplemental:"#199473",semanticErrorSupplemental:"#cf2333",semanticErrorDefault:"#cf2333",semanticInfoDefault:"#299ba3",semanticInfoSupplemental:"#299ba3",semanticInfoHighlight:"#e1f8f9",semanticWarningDefault:"#e87516",semanticWarningSupplemental:"#e87516",ctaSecondaryHoverSupplemental:"#ced7d4",semanticErrorHighlight:"#feeaee",semanticWarningHover:"#fcf5c1",semanticWarningHighlight:"#fefbe6",semanticErrorStatusBackground:"#feeaee",semanticWarningStatusBackground:"#fefbe6",semanticNeutralHover:"#adbdb9",semanticNeutralSelected:"#5c7b74",semanticNeutralDefault:"#ced7d4",semanticAccentDefault:"#5d37a7",semanticAccentSupplemental:"#452996",semanticAccentHighlight:"#ece7f5",ctaPrimaryHoverSupplemental:"#014d40",semanticSuccessPressed:"#65d6ad",semanticErrorPressed:"#e16e75",semanticSuccessHover:"#8eedc7",semanticSuccessHighlight:"#effcf6",semanticSuccessStatusBackground:"#effcf6",semanticNeutralDisabled:"#ebefee",semanticNeutralHighlight:"#ebefee",semanticNeutralStatusBackground:"#ebefee"},colorText:{ctaPrimary:"#ffffff",commonPrimary:"#121212",commonSecondary:"#595959",commonDisabled:"#adbdb9",commonBrand:"#05322b",commonInversePrimary:"#ffffff",commonInverseSecondary:"rgba(255, 255, 255, 0.6)",linkPrimaryDefault:"#02a783",linkSecondaryDefault:"#1a2321",linkTertiaryDefault:"#595959",linkHover:"#147d64",linkPressed:"#014d40",linkDisabled:"#d0d0d0",linkInverseDefault:"#ffffff",linkInverseHover:"#02a783",linkInverseDisabled:"#2a2a2a",labelDefault:"#595959",labelPlaceholder:"#717171",labelDisabledDefault:"#adbdb9",labelDisabledHighlighted:"#adbdb9",labelError:"#e16e75",labelCritical:"#c21a2c",labelBrand:"#05322b",labelSuccess:"#02a783",labelWarning:"#e87516",ctaDisabled:"#adbdb9",ctaSecondary:"#121212"},fontFamily:{headlineXlarge:'"Poppins", sans-serif',headlineLarge:'"Poppins", sans-serif',headlineMedium:'"Poppins", sans-serif',headlineSmall:'"Poppins", sans-serif',titleMedium:'"Poppins", sans-serif',titleSmall:'"Poppins", sans-serif',subtitleLarge:'"Poppins", sans-serif',subtitleMedium:'"Poppins", sans-serif',subtitleSmall:'"Poppins", sans-serif',bodyLarge:'"Noto Sans", sans-serif',bodyMedium:'"Noto Sans", sans-serif',bodyMediumSemiBold:'"Noto Sans", sans-serif',bodySmall:'"Noto Sans", sans-serif',bodySmallSemiBold:'"Noto Sans", sans-serif',decorativeLarge:'"Poppins", sans-serif',decorativeMedium:'"Poppins", sans-serif',decorativeSmall:'"Poppins", sans-serif',labelMedium:'"Poppins", sans-serif',labelSmall:'"Poppins", sans-serif',menuLinkMedium:'"Poppins", sans-serif',buttonLinkMedium:'"Poppins", sans-serif',buttonLinkSmall:'"Poppins", sans-serif',avatarLarge:'"Poppins", sans-serif',avatarMedium:'"Poppins", sans-serif',avatarSmall:'"Poppins", sans-serif',iconMedium:'"Material Icons Outlined"',iconSmall:'"Material Icons Outlined"',titleMediumMobile:'"Poppins", sans-serif',titleSmallMobile:'"Poppins", sans-serif'},fontWeight:{headlineXlarge:"600",headlineLarge:"600",headlineMedium:"600",headlineSmall:"600",titleMedium:"600",titleSmall:"600",subtitleLarge:"600",subtitleMedium:"600",subtitleSmall:"600",bodyLarge:"400",bodyMedium:"400",bodyMediumSemiBold:"600",bodySmall:"400",bodySmallSemiBold:"600",decorativeLarge:"400",decorativeMedium:"400",decorativeSmall:"400",labelMedium:"500",labelSmall:"500",menuLinkMedium:"500",buttonLinkMedium:"600",buttonLinkSmall:"600",avatarLarge:"600",avatarMedium:"600",avatarSmall:"600",titleMediumMobile:"600",titleSmallMobile:"600"},fontSize:{headlineXlarge:"56px",headlineLarge:"48px",headlineMedium:"40px",headlineSmall:"32px",titleMedium:"24px",titleSmall:"20px",subtitleLarge:"18px",subtitleMedium:"16px",subtitleSmall:"14px",bodyLarge:"16px",bodyMedium:"14px",bodyMediumSemiBold:"14px",bodySmall:"12px",bodySmallSemiBold:"12px",decorativeLarge:"16px",decorativeMedium:"14px",decorativeSmall:"12px",labelMedium:"14px",labelSmall:"12px",menuLinkMedium:"14px",buttonLinkMedium:"14px",buttonLinkSmall:"12px",avatarLarge:"20px",avatarMedium:"14px",avatarSmall:"12px",iconMedium:"24px",iconSmall:"18px",titleMediumMobile:"20px",titleSmallMobile:"18px"},fontLineHeight:{headlineXlarge:"62px",headlineLarge:"58px",headlineMedium:"52px",headlineSmall:"40px",titleMedium:"28px",titleSmall:"24px",subtitleLarge:"24px",subtitleMedium:"22px",subtitleSmall:"20px",bodyLarge:"22px",bodyMedium:"20px",bodyMediumSemiBold:"20px",bodySmall:"18px",bodySmallSemiBold:"18px",decorativeLarge:"22px",decorativeMedium:"20px",decorativeSmall:"18px",labelMedium:"20px",labelSmall:"18px",menuLinkMedium:"20px",buttonLinkMedium:"20px",buttonLinkSmall:"18px",avatarLarge:"28px",avatarMedium:"20px",avatarSmall:"18px",titleSmallMobile:"24px"},fontLetterSpacing:{headlineXlarge:"-1.5px",headlineLarge:"-1px",headlineMedium:"-1px",headlineSmall:"-0.5px",titleMedium:"-0.5px",titleSmall:"-0.5px",subtitleLarge:"-0.25px",subtitleMedium:"-0.25px",subtitleSmall:"-0.25px",bodyLarge:"0px",bodyMedium:"0px",bodyMediumSemiBold:"0px",bodySmall:"0px",bodySmallSemiBold:"0px",decorativeLarge:"0px",decorativeMedium:"0px",decorativeSmall:"0px",labelMedium:"-0.25px",labelSmall:"-0.25px",menuLinkMedium:"-0.25px",buttonLinkMedium:"0px",buttonLinkSmall:"0px",avatarLarge:"0px",avatarMedium:"0px",avatarSmall:"0px",titleMediumMobile:"-0.5px",titleSmallMobile:"-0.25px"},effectBorderRadius:{light:"2px",medium:"4px"},effectBorderWidth:{regular:"1px",thick:"2px"},effectDropShadow:{focusPrimary:"0px 0px 0px 2px #8eedc7ff",focusError:"0px 0px 0px 2px #fdcbd3ff",elevationLow:"0px 2px 6px 0px #00000014",elevationMedium:"0px 2px 6px 0px #0000001f",elevationHigh:"0px 2px 8px 0px #00000029",elevationExtraHigh:"0px 6px 16px 0px #00000033"},layoutMediaQuery:{},layoutGrid:{columnsSmall:4,columnsMedium:8,columnsLarge:12},motionEasing:{fast:"cubic-bezier(0.42,0,0.58,1)",normal:"cubic-bezier(0.42,0,0.58,1)",slow:"cubic-bezier(0.42,0,0.58,1)"},motionDuration:{slow:"300ms",normal:"200ms",fast:"100ms"},spacing:{paddingXxsmall:"4px",paddingXsmall:"8px",paddingSmall:"12px",paddingMedium:"20px",paddingLarge:"32px",paddingXlarge:"52px",paddingXxlarge:"84px",marginLarge:"32px",marginXlarge:"52px",marginXxlarge:"84px",marginXxsmall:"4px",marginXsmall:"8px",marginSmall:"12px",marginMedium:"20px"},colors:{base:{teal_950:"#05322b",teal_900:"#014d40",teal_800:"#0c6b58",teal_700:"#147d64",teal_600:"#199473",teal_500:"#02a783",teal_400:"#3ebd93",teal_300:"#65d6ad",teal_200:"#8eedc7",teal_100:"#c6f7e2",teal_050:"#effcf6",gray_900:"#121212",translucentGray:"rgba(18, 18, 18, 0.8)",gray_800:"#2a2a2a",gray_700:"#414141",gray_600:"#595959",gray_500:"#717171",gray_400:"#888888",gray_300:"#a0a0a0",gray_200:"#b8b8b8",gray_100:"#d0d0d0",gray_075:"#e7e7e7",gray_050:"#f3f3f3",gray_025:"#f9f9f9",rose_900:"#b30920",rose_800:"#c21a2c",rose_700:"#cf2333",rose_600:"#e12d39",rose_500:"#f0373a",rose_400:"#eb4b53",rose_300:"#e16e75",rose_200:"#ec979b",rose_100:"#fdcbd3",rose_050:"#feeaee",gold_900:"#e87516",gold_800:"#ed9d22",gold_700:"#f0b529",gold_600:"#f3cc30",gold_500:"#f4dd33",gold_400:"#f6e252",gold_300:"#f8e771",gold_200:"#faee99",gold_100:"#fcf5c1",gold_050:"#fefbe6",cyan_900:"#1f6362",cyan_800:"#26868b",cyan_700:"#299ba3",cyan_600:"#2cb0bc",cyan_500:"#2fc0cf",cyan_400:"#3ecad4",cyan_300:"#5ad3db",cyan_200:"#86e1e5",cyan_100:"#b5edef",cyan_050:"#e1f8f9",purple_900:"#341e86",purple_800:"#452996",purple_700:"#512f9e",purple_600:"#5d37a7",purple_500:"#653cad",purple_400:"#7c58b9",purple_300:"#9376c6",purple_200:"#b19dd6",purple_100:"#d0c4e6",purple_050:"#ece7f5",white_100:"#ffffff",white_060:"rgba(255, 255, 255, 0.6)",dataViz_100:"#666eb4",dataViz_200:"#4ca2a8",dataViz_300:"#af74b9",dataViz_400:"#b49566",dataViz_500:"#dd887c",dataViz_600:"#e6b056",dataViz_700:"#dd7cc2",dataViz_800:"#b0cd5d",transparent:"rgba(255, 255, 255, 0)",earth_950:"#1a2321",earth_900:"#22302d",earth_800:"#334541",earth_700:"#415853",earth_600:"#506c65",earth_500:"#5c7b74",earth_400:"#748e88",earth_300:"#8ca39d",earth_200:"#adbdb9",earth_100:"#ced7d4",earth_050:"#ebefee",earth_025:"#f8faf9"}},base:{fontFamilyDecorative:'"Poppins", sans-serif',fontFamilyBody:'"Noto Sans", sans-serif',fontFamilyIcon:'"Material Icons Outlined"',fontWeightRegular:"400",fontWeightMedium:"500",fontWeightSemibold:"600",textTransformUppercase:"uppercase",textTransformCapitalize:"capitalize",textTransformLowercase:"lowercase",textDecorationLineThrough:"line-through",textDecorationUnderline:"underline",fontSize_56:"56px",fontSize_48:"48px",fontSize_40:"40px",fontSize_32:"32px",fontSize_24:"24px",fontSize_20:"20px",fontSize_18:"18px",fontSize_16:"16px",fontSize_14:"14px",fontSize_12:"12px",fontSize_10:"10px",lineHeight_16:"16px",lineHeight_62:"62px",lineHeight_58:"58px",lineHeight_52:"52px",lineHeight_40:"40px",lineHeight_28:"28px",lineHeight_24:"24px",lineHeight_22:"22px",lineHeight_20:"20px",lineHeight_18:"18px",letterSpacing_1_5:"-1.5px",letterSpacing_1:"-1px",letterSpacing_0_5:"-0.5px",letterSpacing_0_25:"-0.25px",letterSpacing_0:"0px"},effect:{base:{borderRadius_8:"8px",borderRadius_12:"8px",opacity_95:.95,opacity_90:.9,opacity_85:.85,opacity_80:.8,opacity_70:.7,opacity_60:.6,opacity_50:.4,opacity_40:.4,opacity_30:.3,opacity_20:.2,opacity_10:.1,dropShadowRose:"0px 0px 0px 2px #fdcbd3ff",dropShadowTeal:"0px 0px 0px 2px #8eedc7ff",dropShadowSmall:"0px 2px 6px 0px #00000014",dropShadowMedium:"0px 2px 6px 0px #0000001f",dropShadowLarge:"0px 2px 8px 0px #00000029",dropShadowXlarge:"0px 6px 16px 0px #00000033",borderWidth_1:"1px",borderWidth_2:"2px",borderRadius_2:"2px",borderRadius_4:"4px",transitionDuration_100ms:"100ms",transitionDuration_200ms:"200ms",transitionDuration_300ms:"300ms",transitionTimingEaseInEaseOut:"cubic-bezier(0.42,0,0.58,1)"}},sizes:{base:{space_0:"0px",space_4:"4px",space_8:"8px",space_12:"12px",space_20:"20px",space_32:"32px",space_52:"52px",space_84:"84px",columns_12:12,columns_8:8,columns_4:4}},space:{},shadows:void 0,radii:void 0,opacity:void 0,version:{base:{figma:"1393779951",cli:"0.0.1"}}}},722:function(e,a,t){"use strict";t.d(a,"a",(function(){return n})),t.d(a,"b",(function(){return r}));var i=t(688);function n(e){var a=e||window.innerWidth;return i.a.breakpoints.LayoutMediaQueryLarge<=a?"large":i.a.breakpoints.LayoutMediaQueryMedium<=a&&i.a.breakpoints.LayoutMediaQueryLarge>a?"medium":"small"}function r(e,a){var t="<b>",i="</b>",n=e;if((null===n||void 0===n?void 0:n.indexOf(t))>-1){for(var r=[];(null===n||void 0===n?void 0:n.indexOf(t))>-1;)r.push("<span>".concat(n.slice(0,n.indexOf(t)),"</span>")),r.push('<span class="'.concat(a,' typography--body-small-semi-bold">').concat(n.slice(n.indexOf(t)+t.length,n.indexOf(i)),"</span>")),n=n.substring(n.indexOf(i)+i.length);return n&&r.push("<span>".concat(n,"</span>")),'<span class="typography--body-small">'.concat(r.map((function(e){return e})).join(""),"</span>")}return'<span class="typography--body-small">'.concat(e,"</span>")}}}]);
//# sourceMappingURL=86.8fadecfe.chunk.js.map