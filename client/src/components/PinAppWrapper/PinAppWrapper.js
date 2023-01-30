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
import ApppLoaderFrame from "../AppLoaderFrame";
import $ from "jquery";
import _ from "lodash";

import './PinAppWrapper.css'


class PinAppWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appPinned: false
    }
    this.isOverlayLayout = _.isEqual(localStorage.getItem("designTemplate"), "overlay-layout");
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount(){
    document.addEventListener('pinapp-event', this.setMainApp, false);
    document.addEventListener('unpinapp-event', this.setMainApp, false);
    document.addEventListener('hoverapp-event', this.onMouseEnter, false);
    document.addEventListener('nonhoverapp-event', this.onMouseLeave, false);
    if(this.isOverlayLayout){
      document.addEventListener("mousedown", this.handleClickOutside);
    }
  }

  componentWillUnmount(){
    document.removeEventListener('pinapp-event', this.setMainApp);
    document.removeEventListener('unpinapp-event', this.setMainApp);
    document.removeEventListener('hoverapp-event', this.onMouseEnter);
    document.removeEventListener('nonhoverapp-event', this.onMouseLeave);
    if(this.isOverlayLayout){
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /* istanbul ignore next */
  handleClickOutside = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    const isAssetClicked = path[0].outerHTML.slice(0,30).includes("asset-menu") || path[1].outerHTML.slice(0,30).includes("asset-menu");
    if (!isAssetClicked && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if(this.isOverlayLayout){
        $(`.pinapp-container`).css("display","none");
      }
      $(`.pinapp-container`).css('width', '0px');
      $('.backdrop').css('display', 'none');
    }
  }
  
  onMouseEnter = (event) => {
    /* istanbul ignore else*/
    if(!this.state.appPinned){
      if(this.isOverlayLayout){
        $(`.pinapp-container`).css("display","block");
      }
      $(`.pinapp-container`).css('width', event.detail.width);
      $('.backdrop').css('display', 'block');

    }
  }
  onMouseLeave = (event) => {
    /* istanbul ignore else*/
    if(!this.state.appPinned){
      if(this.isOverlayLayout){
        $(`.pinapp-container`).css("display","none");
      }
      $(`.pinapp-container`).css('width', event.detail.width);
      $('.backdrop').css('display', 'none');
    }
  }

  setMainApp = (event) => {
    this.setState({appPinned: !this.state.appPinned});
    if(event.type === 'pinapp-event'){
      $('.grid-container').css('grid-template-columns', '21.4% 19.65% 19.65% 19.65% 19.65%');
      $(`.pinapp-container`).css('width', '100%');
      $('.backdrop').css('display', 'none');
    }
    else{
      $('.grid-container').css('grid-template-columns', '3.03% 24.2425% 24.2425% 24.2425% 24.2425%');
      $(`.pinapp-container`).css('width', '410px');
      $('.backdrop').css('display', 'block');
    }
  }


  render() {
    return (
      <>
        <div className='backdrop' onClick={()=>this.onMouseLeave({detail: {width: "0px"}})}></div>
        <div ref={this.setWrapperRef} className='pinapp-container' style={this.props.commonappImpacted ? {...this.props.commonappImpacted.commonStylingUpdated, ...this.props.StylingAttributes} : {...this.props.StylingAttributes}}>
            <ApppLoaderFrame id={this.props.nestedElement.id} {...this.props.nestedElement} />
        </div>
      </>
    );
  }
}
export default PinAppWrapper;
