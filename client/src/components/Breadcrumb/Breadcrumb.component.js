/*************************************************
 * BH Highly Confidential
 * Unpublished Copyright 2021. Baker Hughes.
 *
 * NOTICE:  All information contained herein is, and remains the property of Baker Hughes, and/or
 * its affiliates.  The intellectual and technical concepts contained herein are proprietary to Baker Hughes
 * and/or its affiliates and may be covered by patents, copyrights, and/or trade secrets.  Dissemination of this information or
 * reproduction of this material is strictly forbidden unless prior written permission is obtained from Baker Hughes.
 **************************************************/

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import PublicIcon from "@material-ui/icons/Public";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withTranslation } from 'react-i18next';
import {getData} from '../../RbacData';
import * as Constants from '../../Constant'

import './Breadcrumb.component.css'

const styles = () => ({
  root: {
    "& > * + *": {
      marginTop: "0px",
      fontSize: '14px',
    }
  },
  breadcrumb: {
    height: '20px',
    marginTop: "12px",
    fontSize: '14px',
    fontFamily: "'Noto Sans'",
    fontWeight: 'normal',
    lineHeight: '20px',
    letterSpacing: '0.05px',
    // display: 'block',
    // flex: 'none',
    // flexGrow: '0',
    // flexWrap: 'nowrap'
    // order: '1'
  },
  firstLink: {
    color: '#1A2321',
    fontFamily: "'Poppins'",
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: '0.1px',
    fontWeight: '600',
    textTransform: 'uppercase',
    margin: '0px 4px'
  },
  link: {
    color: '#757575',
    fontFamily: "'Noto Sans'",
  },
  typography: {
    height: '20px',
    fontSize: '14px',
    fontFamily: "'Noto Sans'",
    fontWeight: 'normal',
    lineHeight: '20px',
    letterSpacing: '0.05px',
    color: '#1A2321'
  },
  icon: {
    marginBottom: '-4px',
    marginTop: "0px",
    marginRight: "4px",
    marginLeft: '36px',
    width: 18,
    height: 18,
    color: '#1A2321'
  },
  dropDownMenu: {
    float: "right",
    marginTop: "-40px",
  }
});

function BreadcrumbItem(props) {
  const isFirst = props.index === 0;
  const isLast = props.index === props.length - 1;
  const isSingle = props.length === 1;
  return (
    <>
      {
        (!isLast || isSingle) ?
          <Link className={isFirst ? props.classes.firstLink : props.classes.link} href="#" onClick={props.onClick}>
            {
              isFirst &&
              <PublicIcon className={props.classes.icon} />
            }
            {props.label}
          </Link>
          :
          <Typography className={props.classes.typography}>
            {props.label}
          </Typography>
      }
    </>
  );
}

class BreadcrumbComponent extends React.Component {

  constructor(props) {
    super(props);

    let items = [];
    this.subSytemList = [];
    const selectedAppinfo = window.getSelectedAppInfo();
    this.options = selectedAppinfo ? window.getMenuItemsList(selectedAppinfo.menuItemId) : '';
    let defaultSystemIndex = selectedAppinfo ? this.options.findIndex(option=> option.id === selectedAppinfo.id):0;
    this.state = {
      bcItems: items,
      selection: defaultSystemIndex
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('shareContext', this.updateBcItems, false);
    document.addEventListener('onAppChange',this.updateDropdown,false);
  }

  componentWillUnmount() {
    document.removeEventListener('shareContext', this.updateBcItems);
    document.removeEventListener('onAppChange',this.updateDropdown);
  }
  handleOptionClick = (option) => {
    // const context = {
    //   context: {
    //     eventName: 'breadcrumb.dropDownSelection',
    //     body: option,
    //     timeStamp: Date.now(),
    //     origin: window.location.origin // since being sent by AppShell or '#'
    //   }
    // };
    // var payloadData = {
    //   state: { mode: 'spa', detail: { payLoad: context.context } },
    //   appname: option.id
    // }
    // window.parent.postMessage(JSON.stringify({ eventType: "navigation", payload: payloadData }));
    window.location.href = "#"+option.link;
  }
  handleChange(event,index, value) {
    //set selection to the value selected
    this.setState({ selection: value });
    this.handleOptionClick(this.options[value]);
  }
  updateDropdown= (event)=>{
    this.options = window.getMenuItemsList(event.detail.menuItemId);
    let defaultSystemIndex = this.options.findIndex(option=> option.id === event.detail.id);
    this.setState({ selection: defaultSystemIndex });
  }
  getPermitionMenuItemsAppId = (appid)=>{
    const permissionapplist= getData();
    const microappPersmissonObject=permissionapplist.find(({rsname})=>rsname===appid)
    return microappPersmissonObject;
  }
  render() {
    const { classes,t } = this.props;
    return (

      <div className={classes.breadcrumb}>
        <Breadcrumbs
          maxItems={5}
          separator={<NavigateNextIcon fontSize="small" color="inherit" />}
          aria-label="breadcrumb"
          className={classes.breadcrumb}
        >
          {
            this.state.bcItems.map((bcItem, index) => (
              this.renderBreadcrumbItem(bcItem, index, classes, this.state.bcItems.length)
            ))
          }
        </Breadcrumbs>
        <MuiThemeProvider>
          <div id="dropDownMenuBreadcrumb" className={classes.dropDownMenu}>
            {this.options && this.options.length > 1 && <DropDownMenu
              value={this.state.selection}
              onChange={this.handleChange}
            >
              {this.options.map((option, index) => {
                return <MenuItem disabled={this.getPermitionMenuItemsAppId(option.id).access === "disabled" ? true : false} value={index} primaryText={(window.i18Resources!==""? option.displayTextId ? t(option.displayTextId):t(option.id):option.name)} />
                })}
            </DropDownMenu>}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  renderBreadcrumbItem(bcItem, index, classes, length) {
    return (
      <BreadcrumbItem key={index} index={index} length={length} label={bcItem.name} classes={classes}
        onClick={(event) => {
          event.preventDefault();
          this.itemClickHandler(bcItem, index)
        }
        } />
    );
  }

  /**
   * Remove items present after selected index.
   * Share selected item as context to all frames/app's.
   * @param {*} bcItem - selected item 
   * @param {*} index - index of selected item
   */
  itemClickHandler(bcItem, index) {
    // write context
    const context = {
      context: {
        eventName: 'breadcrumb.onItemClick',
        body: bcItem,
        timeStamp: Date.now(),
        origin: window.location.origin // since being sent by AppShell or '#'
      }
    };
    var payloadData = {
      state: { mode: 'spa', detail: { payLoad: context.context } },
      appname: ''
    }
    window.parent.postMessage(JSON.stringify({ eventType: "navigation", payload: payloadData }));

    // remove items
    const bcItems = this.state.bcItems.slice();
    bcItems.splice(index + 1);// not interested in return value - the deleted items.
    this.setState({
      bcItems: bcItems
    });
  }

  /**
   * Update BC items as per incoming event data.
   * if items.length==0 {just add incoming},
   * if items.length==1 {just add incoming},
   * if items.length>1 {remove all items from index=1 (i.e. retain 1st item) & add incoming}
   * @param {*} event 
   */
  updateBcItems = (event) => {
    // Note: we can add contains check of onNodeClickPath thereby drive towards making generic. 
    /* istanbul ignore if*/
    if (!(Constants.BREADCRUMBEVENTSNAME.includes(event.detail.eventName))) {
      return;
    }

      const bcItems = this.state.bcItems.slice();
      /* istanbul ignore if*/
      if (bcItems.length > 1) {
        bcItems.splice(1);// not interested in return value - the deleted items.
      }
      /* istanbul ignore else*/
      if(event.detail.body !== undefined) {
      if (Array.isArray(event.detail.body)) {
        bcItems.push(...event.detail.body);
      }
      else {
        bcItems.push(event.detail.body);
      }
   }

    this.setState({
      bcItems: bcItems
    });
  }
}

BreadcrumbComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTranslation()(withStyles(styles)(BreadcrumbComponent));

