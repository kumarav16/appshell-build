(this["webpackJsonpapp-shell-client"]=this["webpackJsonpapp-shell-client"]||[]).push([[93],{607:function(a,e,t){"use strict";t.r(e),t.d(e,"bh_avatar_group",(function(){return l}));var r=t(17),o=t(12),i=t(175),n=t(672),l=function(){function a(e){Object(r.a)(this,a),Object(i.h)(this,e),this.type="primary"}return Object(o.a)(a,[{key:"componentWillLoad",value:function(){this.children=Array.from(this.host.children),this.host.innerHTML=""}},{key:"render",value:function(){var a=this,e=this.host.tagName.toLowerCase().replace(n.a.avatarGroup.tagNameBase,""),t=Object(n.c)(e);this.host.innerHTML="";var r=["bh-avatar-group"];"secondary"===this.type?r.push("bh-avatar-group--secondary"):"tertiary"===this.type?r.push("bh-avatar-group--tertiary"):"brand"===this.type?r.push("bh-avatar-group--brand"):r.push("bh-avatar-group--primary");var o=this.children.length,l=[];return this.children.map((function(e,r){var n=[];if(null!=e.getAttribute("firstname")&&n.push(e.getAttribute("firstname")),null!=e.getAttribute("lastname")&&n.push(e.getAttribute("lastname")),o>5){if(r<4)l.push(Object(i.f)(t.tooltip,{class:"bh-tooltip--bh-avatar-tooltip",message:n.join(" ")},Object(i.f)(t.avatar,{type:"secondary",image:e.getAttribute("image"),firstname:e.getAttribute("firstname"),lastname:e.getAttribute("lastname")})));else if(4===r){for(var s=[],m=r;m<a.children.length;m++){var h=[];null!=a.children[m].getAttribute("firstname")&&h.push(a.children[m].getAttribute("firstname")),null!=a.children[m].getAttribute("lastname")&&h.push(a.children[m].getAttribute("lastname")),s.push(h.join(" "))}l.push(Object(i.f)(t.tooltip,{class:"bh-tooltip--bh-avatar-tooltip",message:s.join("\n")},Object(i.f)("div",{class:"bh-avatar-group__additional typography--button-link-small"},Object(i.f)("span",null,o-4,"+"))))}}else l.push(Object(i.f)(t.tooltip,{class:"bh-tooltip--bh-avatar-tooltip",message:n.join(" ")},Object(i.f)(t.avatar,{type:"secondary",image:e.getAttribute("image"),firstname:e.getAttribute("firstname"),lastname:e.getAttribute("lastname")})))})),Object(i.f)(i.a,{class:r.join(" ")},l)}},{key:"host",get:function(){return Object(i.e)(this)}}]),a}();l.style=".bh-avatar-group{display:flex;flex-direction:row;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;-moz-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;cursor:default;user-select:none}@media (hover: hover){.bh-avatar-group__tooltip-target{cursor:pointer}.bh-avatar-group__tooltip-target:hover .bh-avatar-group__tooltip{opacity:1}}.bh-avatar-group__tooltip-target:active .bh-avatar-group__tooltip{opacity:1}.bh-avatar:active .bh-avatar__ring{transform:rotate(45deg)}.bh-avatar-group{position:relative;display:flex}.bh-avatar-group .bh-tooltip--bh-avatar-tooltip:first-child .bh-avatar{margin-left:var(--spacing-margin-none)}.bh-avatar-group .bh-avatar,.bh-avatar-group__additional{position:relative;width:var(--avatar-group-avatar-width);height:var(--avatar-group-avatar-height);display:inline-block;cursor:default;margin-left:calc(-1 * var(--spacing-margin-xsmall));border-width:var(--effect-border-width-thick);border-style:solid;border-radius:100%;font-family:var(--font-family-avatar-small);font-size:var(--font-size-avatar-small);font-weight:var(--font-weight-avatar-small);line-height:var(--font-line-height-avatar-small);letter-spacing:var(--font-letter-spacing-avatar-small);border-color:var(--color-fill-common-primary)}.bh-avatar-group .bh-avatar{background-color:var(--color-fill-avatar-secondary)}.bh-avatar-group .bh-avatar--ring .bh-avatar__initials,.bh-avatar-group .bh-avatar--ring .bh-avatar__image{width:var(--avatar-group-avatar-width);height:var(--avatar-group-avatar-height)}.bh-avatar-group--primary .bh-avatar{border-color:var(--color-fill-common-primary);background-color:var(--color-fill-common-primary)}.bh-avatar-group--primary .bh-avatar-group__additional{border-color:var(--color-fill-common-primary)}.bh-avatar-group--secondary .bh-avatar{border-color:var(--color-fill-common-secondary);background-color:var(--color-fill-common-secondary)}.bh-avatar-group--secondary .bh-avatar-group__additional{border-color:var(--color-fill-common-secondary)}.bh-avatar-group--tertiary .bh-avatar{border-color:var(--color-fill-common-tertiary);background-color:var(--color-fill-common-tertiary)}.bh-avatar-group--tertiary .bh-avatar-group__additional{border-color:var(--color-fill-common-tertiary)}.bh-avatar-group--brand .bh-avatar{border-color:var(--color-fill-common-brand);background-color:var(--color-fill-common-brand)}.bh-avatar-group--brand .bh-avatar-group__additional{border-color:var(--color-fill-common-brand)}.bh-avatar-group__additional{border-radius:100%;background-color:var(--color-fill-avatar-tertiary);color:var(--color-text-common-primary);user-select:none}.bh-avatar-group .bh-avatar__initials{background-color:var(--color-fill-avatar-secondary)}.bh-avatar-group .bh-avatar__ring{display:none}.bh-avatar-group__additional span{position:absolute;width:100%;height:100%;display:flex;align-items:center;justify-content:center}"},672:function(a,e,t){"use strict";t.d(e,"a",(function(){return o})),t.d(e,"b",(function(){return r})),t.d(e,"c",(function(){return i}));var r="bh-",o={a:{originalName:"bh-a",tagNameBase:"a",className:"BhA"},accordion:{originalName:"bh-accordion",tagNameBase:"accordion",className:"BhAccordion"},actionBar:{originalName:"bh-action-bar",tagNameBase:"action-bar",className:"BhActionBar"},actionMenu:{originalName:"bh-action-menu",tagNameBase:"action-menu",className:"BhActionMenu"},alert:{originalName:"bh-alert",tagNameBase:"alert",className:"BhAlert"},alertItem:{originalName:"bh-alert-item",tagNameBase:"alert-item",className:"BhAlertItem"},appShell:{originalName:"bh-app-shell",tagNameBase:"app-shell",className:"BhAppShell"},appShellMenu:{originalName:"bh-app-shell-menu",tagNameBase:"app-shell-menu",className:"BhAppShellMenu"},avatar:{originalName:"bh-avatar",tagNameBase:"avatar",className:"BhAvatar"},avatarGroup:{originalName:"bh-avatar-group",tagNameBase:"avatar-group",className:"BhAvatarGroup"},badge:{originalName:"bh-badge",tagNameBase:"badge",className:"BhBadge"},barChart:{originalName:"bh-bar-chart",tagNameBase:"bar-chart",className:"BhBarChart"},breadcrumbs:{originalName:"bh-breadcrumbs",tagNameBase:"breadcrumbs",className:"BhBreadcrumbs"},button:{originalName:"bh-button",tagNameBase:"button",className:"BhButton"},buttonDropdown:{originalName:"bh-button-dropdown",tagNameBase:"button-dropdown",className:"BhButtonDropdown"},buttonGroup:{originalName:"bh-button-group",tagNameBase:"button-group",className:"BhButtonGroup"},buttonTabs:{originalName:"bh-button-tabs",tagNameBase:"button-tabs",className:"BhButtonTabs"},card:{originalName:"bh-card",tagNameBase:"card",className:"BhCard"},checkbox:{originalName:"bh-checkbox",tagNameBase:"checkbox",className:"BhCheckbox"},chip:{originalName:"bh-chip",tagNameBase:"chip",className:"BhChip"},chipGroup:{originalName:"bh-chip-group",tagNameBase:"chip-group",className:"BhChipGroup"},content:{originalName:"bh-content",tagNameBase:"content",className:"BhContent"},dataTable:{originalName:"bh-data-table",tagNameBase:"data-table",className:"BhDataTable"},datePicker:{originalName:"bh-date-picker",tagNameBase:"date-picker",className:"BhDatePicker"},dateRangePicker:{originalName:"bh-date-range-picker",tagNameBase:"date-range-picker",className:"BhDateRangePicker"},dateTimePicker:{originalName:"bh-date-time-picker",tagNameBase:"date-time-picker",className:"BhDateTimePicker"},dialog:{originalName:"bh-dialog",tagNameBase:"dialog",className:"BhDialog"},divider:{originalName:"bh-divider",tagNameBase:"divider",className:"BhDivider"},donutChart:{originalName:"bh-donut-chart",tagNameBase:"donut-chart",className:"BhDonutChart"},dropdown:{originalName:"bh-dropdown",tagNameBase:"dropdown",className:"BhDropdown"},error:{originalName:"bh-error",tagNameBase:"error",className:"BhError"},footer:{originalName:"bh-footer",tagNameBase:"footer",className:"BhFooter"},formMessage:{originalName:"bh-form-message",tagNameBase:"form-message",className:"BhFormMessage"},header:{originalName:"bh-header",tagNameBase:"header",className:"BhHeader"},icon:{originalName:"bh-icon",tagNameBase:"icon",className:"BhIcon"},illustration:{originalName:"bh-illustration",tagNameBase:"illustration",className:"BhIllustration"},incrementer:{originalName:"bh-incrementer",tagNameBase:"incrementer",className:"BhIncrementer"},inlineDropdown:{originalName:"bh-inline-dropdown",tagNameBase:"inline-dropdown",className:"BhInlineDropdown"},kpi:{originalName:"bh-kpi",tagNameBase:"kpi",className:"BhKpi"},lineChart:{originalName:"bh-line-chart",tagNameBase:"line-chart",className:"BhLineChart"},list:{originalName:"bh-list",tagNameBase:"list",className:"BhList"},menu:{originalName:"bh-menu",tagNameBase:"menu",className:"BhMenu"},menuItem:{originalName:"bh-menu-item",tagNameBase:"menu-item",className:"BhMenuItem"},mobileMenu:{originalName:"bh-mobile-menu",tagNameBase:"mobile-menu",className:"BhMobileMenu"},modal:{originalName:"bh-modal",tagNameBase:"modal",className:"BhModal"},navMenu:{originalName:"bh-nav-menu",tagNameBase:"nav-menu",className:"BhNavMenu"},pagination:{originalName:"bh-pagination",tagNameBase:"pagination",className:"BhPagination"},panel:{originalName:"bh-panel",tagNameBase:"panel",className:"BhPanel"},progressBar:{originalName:"bh-progress-bar",tagNameBase:"progress-bar",className:"BhProgressBar"},radioButton:{originalName:"bh-radio-button",tagNameBase:"radio-button",className:"BhRadioButton"},scatterChart:{originalName:"bh-scatter-chart",tagNameBase:"scatter-chart",className:"BhScatterChart"},search:{originalName:"bh-search",tagNameBase:"search",className:"BhSearch"},selectionGroup:{originalName:"bh-selection-group",tagNameBase:"selection-group",className:"BhSelectionGroup"},settingsMenu:{originalName:"bh-settings-menu",tagNameBase:"settings-menu",className:"BhSettingsMenu"},slider:{originalName:"bh-slider",tagNameBase:"slider",className:"BhSlider"},spinner:{originalName:"bh-spinner",tagNameBase:"spinner",className:"BhSpinner"},statusIndicator:{originalName:"bh-status-indicator",tagNameBase:"status-indicator",className:"BhStatusIndicator"},stepper:{originalName:"bh-stepper",tagNameBase:"stepper",className:"BhStepper"},systemAlertItem:{originalName:"bh-system-alert-item",tagNameBase:"system-alert-item",className:"BhSystemAlertItem"},tabs:{originalName:"bh-tabs",tagNameBase:"tabs",className:"BhTabs"},tabularList:{originalName:"bh-tabular-list",tagNameBase:"tabular-list",className:"BhTabularList"},textArea:{originalName:"bh-text-area",tagNameBase:"text-area",className:"BhTextArea"},textInput:{originalName:"bh-text-input",tagNameBase:"text-input",className:"BhTextInput"},timePicker:{originalName:"bh-time-picker",tagNameBase:"time-picker",className:"BhTimePicker"},timeZonePicker:{originalName:"bh-time-zone-picker",tagNameBase:"time-zone-picker",className:"BhTimeZonePicker"},titleWrapper:{originalName:"bh-title-wrapper",tagNameBase:"title-wrapper",className:"BhTitleWrapper"},toggle:{originalName:"bh-toggle",tagNameBase:"toggle",className:"BhToggle"},tokenDemo:{originalName:"bh-token-demo",tagNameBase:"token-demo",className:"BhTokenDemo"},tooltip:{originalName:"bh-tooltip",tagNameBase:"tooltip",className:"BhTooltip"},tree:{originalName:"bh-tree",tagNameBase:"tree",className:"BhTree"},typeAhead:{originalName:"bh-type-ahead",tagNameBase:"type-ahead",className:"BhTypeAhead"},uploader:{originalName:"bh-uploader",tagNameBase:"uploader",className:"BhUploader"},verticalMenu:{originalName:"bh-vertical-menu",tagNameBase:"vertical-menu",className:"BhVerticalMenu"}},i=function(a){var e={a:"",accordion:"",actionBar:"",actionMenu:"",alert:"",alertItem:"",appShell:"",appShellMenu:"",avatar:"",avatarGroup:"",badge:"",barChart:"",breadcrumbs:"",button:"",buttonDropdown:"",buttonGroup:"",buttonTabs:"",card:"",checkbox:"",chip:"",chipGroup:"",content:"",dataTable:"",datePicker:"",dateRangePicker:"",dateTimePicker:"",dialog:"",divider:"",donutChart:"",dropdown:"",error:"",footer:"",formMessage:"",header:"",icon:"",illustration:"",incrementer:"",inlineDropdown:"",kpi:"",lineChart:"",list:"",menu:"",menuItem:"",mobileMenu:"",modal:"",navMenu:"",pagination:"",panel:"",progressBar:"",radioButton:"",scatterChart:"",search:"",selectionGroup:"",settingsMenu:"",slider:"",spinner:"",statusIndicator:"",stepper:"",systemAlertItem:"",tabs:"",tabularList:"",textArea:"",textInput:"",timePicker:"",timeZonePicker:"",titleWrapper:"",toggle:"",tokenDemo:"",tooltip:"",tree:"",typeAhead:"",uploader:"",verticalMenu:""};return Object.keys(e).forEach((function(t){e[t]=a+o[t].tagNameBase})),e}}}]);
//# sourceMappingURL=93.34cac26e.chunk.js.map