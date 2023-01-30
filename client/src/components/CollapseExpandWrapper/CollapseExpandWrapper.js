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
import { Collapse } from 'react-collapse';
import ApppLoaderFrame from "../AppLoaderFrame";
import { withStyles } from '@material-ui/core';
import $ from "jquery";

import './collapse.css'
const styles = () =>
({
  box: {
    "position": "relative",
    "text-align": "justify",
    "width": "100%",
    "height": " calc(100vh - 118px) !important",
    "transition": "margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
  },
  closedbox: {
    "position": "relative",
    "text-align": "justify",
    "margin-left": "-100%",
    "width": "100%",
    "height": " calc(100vh - 118px) !important",
    "transition": "margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
  },
  icon: {
    "position": "absolute",
    "left": "0%",
    "top": "0%",
    "cursor": "pointer",
    'margin-top': 'calc(50vh - 87px)',
    'margin-bottom': 'calc(50vh - 67px)',
    'border-radius': '0px 4px 4px 0px',
    'background': '#EBEFEE',
    '&:hover': { backgroundColor: '#147D64', color: 'white' }
  },
  collapse: {
    background: 'transparent',
    position: 'absolute',
    top: '0',
    left: '100%',
    height: 'calc(100vh - 118px)',
    width: '5px',
  },
  iconLeft: {
    "position": "absolute",
    "left": "0",
    "top": "0px",
    "cursor": "pointer",
    'margin-top': 'calc(50vh - 87px)',
    'margin-bottom': 'calc(50vh - 67px)',
    'background': '#EBEFEE',
    'border-radius': '0px 4px 4px 0px',
    '&:hover': {
      backgroundColor: '#147D64', color: 'white'
    }
  },
  line: {
    'position': 'absolute',
    'width': '4px',
    'height': 'calc(100vh - 118px)',
    'left': '0%',
    'top': '1%',
    'bottom': ' 0%',
    'background': '#EBEFEE',
    'border-radius': '0px 4px 4px 0px',
  },
  arrow: {
    'height': '60px'
  },
  fill: {
    position: 'absolute',
    top: '0',
    height: 'calc(100vh - 118px)',
    width: '21px',
    right: '-21px',
    cursor: 'pointer'
  }
});
let margingLeft
class CollapseExpandWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isOpened: localStorage.getItem('isOpened')?JSON.parse(localStorage.getItem('isOpened')):true, style: props.StylingAttributes, events: props.events };
    this.setIsOpen = this.setIsOpen.bind(this);
  }

  componentDidMount(){
    if(localStorage.getItem('isOpened')){
      this.setIsOpen();
    }
  }
/* istanbul ignore next */
  setMainApp($, eventtype, mainappid, nextlelewidth) {
    // default values set to eventtype === "expand"
    margingLeft = "0px";
    let transition = "margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms";
    if (eventtype === "collapse") {
      var xyz = nextlelewidth === undefined ? `33%` : `${nextlelewidth}px`
      margingLeft = "-" + xyz;
      transition = "margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms";
    }
    $("." + mainappid).css({
      "margin-left": margingLeft,
      "transition": transition
    });
  }
/* istanbul ignore next */
  setIsOpen() {
    this.setState({ isOpened: !this.state.isOpened });
    if (this.state.isOpened) {
      let ClonedStyleWithoutReference = Object.assign({}, this.props.StylingAttributes);
      ClonedStyleWithoutReference.background = "";
      ClonedStyleWithoutReference.border = 0;
      this.setState({ style: ClonedStyleWithoutReference });
    } else {
      this.setState({ style: this.props.StylingAttributes });
    }

    if (this.props.commonappImpacted === undefined || this.props.commonappImpacted.containerEvent === true) {
      let mainAppId = this.props && this.props.mainAppId;
      if (this.state.isOpened) {
        localStorage.setItem('isOpened', this.state.isOpened);
        const nextlelewidth = $("." + mainAppId).prev().width();
        this.setMainApp($, "collapse", mainAppId, nextlelewidth);
      }
      else if (!this.state.isOpened) {
        localStorage.setItem('isOpened', this.state.isOpened);
        const nextlelewidth = $("." + mainAppId).prev().width();
        this.setMainApp($, "expand", mainAppId, nextlelewidth);
      }
    }
  }

  render() {
    const { isOpened } = this.state;
    const height = "calc(100vh - 118px)";
    /* istanbul ignore if */
    if (this.props.commonappImpacted && this.props.commonappImpacted !== undefined) {
      const mainAppIdProp = this.props && this.props.mainAppId;

      if (this.props.commonappImpacted.mainStylingUpdated) {
        $("." + mainAppIdProp).css(this.props.commonappImpacted.mainStylingUpdated);
      }
      if (!this.state.isOpened && this.props.commonappImpacted.commonStylingUpdated.display === "none") {
        $("." + mainAppIdProp).css({ "margin-left": margingLeft });
      } else if (!this.state.isOpened && this.props.commonappImpacted.containerEvent === true) {
        $("." + mainAppIdProp).css({ "margin-left": "-22%" });
      } else {
        $("." + mainAppIdProp).css({ "margin-left": "0px" });
      }
    }
    return (
      <div className={isOpened ? this.props.classes.box : this.props.classes.closedbox} style={this.props.commonappImpacted ? this.props.commonappImpacted.commonStylingUpdated : this.state.style}>
        <Collapse >
        <div style={{ height }}>
          {this.props.commonappImpacted !== undefined && this.props.commonappImpacted.commonStylingUpdated.display !== 'none' && <ApppLoaderFrame id={this.props.nestedElement.id} style={this.props.nestedElement.StylingAttributes} />}
            {this.props.commonappImpacted === undefined && <ApppLoaderFrame id={this.props.nestedElement.id} style={this.props.nestedElement.StylingAttributes} />}
          </div>
          <div id="fill" className={this.props.classes.fill} onClick={this.setIsOpen}></div>
          <div id="collapse" className={this.props.classes.collapse}>
            <div id="arrow" className={this.state.isOpened ? this.props.classes.icon : this.props.classes.iconLeft}>
              <div className={this.props.classes.arrow}> <a onClick={this.setIsOpen}>
                {
                  this.state.isOpened ?
                    <div class="material-icons-collapse MuiIcon-root" style={{ width: '20px', padding: '30px 0' }} aria-hidden="true">
                      <div style={{ width: '18px', height: '18px', left: 'calc(50% - 18px/2)', top: 'calc(50% - 18px/2)', position: 'absolute' }}>keyboard_arrow_left</div>
                    </div> :
                    <div class="material-icons-collapse MuiIcon-root" style={{ width: '20px', padding: '30px 0' }} aria-hidden="true">
                      <div style={{ width: '18px', height: '18px', left: 'calc(50% - 18px/2)', top: 'calc(50% - 18px/2)', position: 'absolute' }}>keyboard_arrow_right</div>
                    </div>
                }
              </a>
              </div>
            </div>
            <div id="line" className={this.props.classes.line}></div>
          </div>
        </Collapse>
      </div>
    );
  }
}
export default withStyles(styles)(CollapseExpandWrapper);
