import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import moment from "moment";
import "./BhNotification.css";
import { BhButtonTabs, BhActionMenu, BhPanel, BhIcon, BhDivider, BhStatusIndicator, BhAvatar, BhSpinner, BhA, BhIllustration, BhAlertItem } from
  '@baker-hughes-central-design/ui-toolkit-react/dist/components';


class BhNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList: [],
      activeTab: props.config.tabMenu && props.config.tabs && props.config.tabs.tabOptions ? props.config.tabs.tabOptions.slice(0, 3)[0] :
        props.config.tabMenu ? { "label": "Recent", "key": "recent" } : {},
      filterOptions: [],
      selectedFilterValue: {},
      notificationData: [],
      renderNotificationComp: "",
      cloneOriginalNotificationData: [],
      arrAfterRemovedObj: [],
      removalFlag: false
    }
  }

  static getDerivedStateFromProps(props) {
    return {
      cloneOriginalNotificationData: props.data.items,
      filterOptions: props.config.filter && props.config.filter.filterOptions ? props.config.filter.filterOptions : [],
      tabList: props.config.tabMenu && props.config.tabs && props.config.tabs.tabOptions ? props.config.tabs.tabOptions.slice(0, 3) :
        props.config.tabMenu ? [{ "label": "Recent", "key": "recent" }, { "label": "Earlier", "key": "earlier" }] : []
    }
  }

  componentDidMount() {
    this.getNotificationDataCall(this.state.cloneOriginalNotificationData);
    this.setState({
      selectedFilterValue: this.props.config.filter && this.props.config.filter.filterOptions ? this.props.config.filter.filterOptions[0] : ""
    });
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.data.items, this.props.data.items) || !_.isEqual(prevProps.config.updateErrorId, this.props.config.updateErrorId)) {
      const { arrAfterRemovedObj } = this.state;
      let removedId = !_.isEmpty(this.props.config.removedId) ? [...this.props.config.removedId] : [];

      let notificationArr = this.props.data && this.props.data.items ? this.props.data.items : []

      let filterData = _.filter(notificationArr, i => !_.isEmpty(removedId) && !_.includes(removedId, i.id));
      let inputArr = !_.isEmpty(filterData) ? filterData : notificationArr;
      let commonObjects = _.intersectionBy(notificationArr, arrAfterRemovedObj, "id");

      this.setState({ arrAfterRemovedObj: commonObjects });
      this.getNotificationDataCall(inputArr);
    }
  }

  getNotificationDataCall = (notificationData = []) => {
    let formattedData = this.restructureNotificationData(notificationData);
    this.tabLoadData(formattedData, this.state.activeTab.key);
  }

  restructureNotificationData = (array) => {
    let orderedArray = _.orderBy(array, ["createdDateTime"], ["desc"]);
    let today = moment();
    let alteredResponse = orderedArray && _.cloneDeep(orderedArray).map((item) => {
      item.category = !_.isEmpty(item.category) ? item.category : this.getCategoryTab(item.createdDateTime);

      let category = today.diff(item.createdDateTime, 'days');
      if (category !== 0) {
        item.createdDateTime = `${category} days ago`;
        item.categoryGroup = `${category} days ago`;
      } else {
        let hours = today.diff(item.createdDateTime, 'hour');
        item.createdDateTime = `${hours}h ago`;
        item.categoryGroup = "Today";
      }
      return item
    });
    return alteredResponse;
  }

  getCategoryTab = (createdDateTime) => {
    let recentTimeLimit = this.props.config && this.props.config.timeSettings && this.props.config.timeSettings.recent ? this.props.config.timeSettings.recent : 86400000;

    let catValue;
    let today = new Date();
    let rowDateTime = new Date(createdDateTime);
    let rangeMilliseconds = today - rowDateTime;

    if (rangeMilliseconds <= recentTimeLimit) {
      catValue = "recent"
    } else {
      catValue = "earlier"
    }
    return catValue;
  }

  tabLoadData = (arr, keyValue = "") => {
    const { selectedFilterValue } = this.state;
    let removedId = !_.isEmpty(this.props.config.removedId) ? [...this.props.config.removedId] : [];

    let selFilterState = !_.isEmpty(selectedFilterValue) ? selectedFilterValue :
      this.props.config.filter && this.props.config.filter.filterOptions ? this.props.config.filter.filterOptions[0] : "";
    let tabNotificationData = [];
    let comp, resultArr;

    if (keyValue !== "") {
      tabNotificationData = _.filter(arr, i => i.category === keyValue);
    } else {
      tabNotificationData = arr;
    }

    if (selFilterState.value !== "all") {
      resultArr = !_.isEmpty(removedId) ? _.filter(tabNotificationData, item => item.filterCriteria === selFilterState.value && !_.includes(removedId, item.id)) :
        _.filter(tabNotificationData, item => item.filterCriteria === selFilterState.value);
    } else {
      resultArr = !_.isEmpty(removedId) ? _.filter(tabNotificationData, item => !_.includes(removedId, item.id)) : tabNotificationData;
    }

    let groupByRes = _.groupBy(resultArr, "categoryGroup");
    let result = Object.keys(groupByRes).map(function (key) {
      return { notificationGroup: key, notificationList: groupByRes[key] };
    });

    comp = _.isEmpty(result) ? <div></div> : result.map(item => {
      return this.getNotificationRow(item)
    });
    this.setState({ notificationData: result, renderNotificationComp: comp });
  }

  onTabSelect = (tab) => {
    let inputArray = !_.isEmpty(this.state.arrAfterRemovedObj) || this.state.removalFlag ? this.state.arrAfterRemovedObj : this.state.cloneOriginalNotificationData;
    let formattedData = this.restructureNotificationData(inputArray);
    this.tabLoadData(formattedData, tab.detail.key);
    this.setState({ activeTab: tab.detail });
  }

  onFilterMenu = (filterMenu) => {
    const { filterOptions } = this.state;
    let removedId = !_.isEmpty(this.props.config.removedId) ? [...this.props.config.removedId] : [];

    let selFilter = filterMenu.detail;
    let filterOptionsTmp = filterOptions.map(opt => {
      if (opt.value === selFilter.value) {
        opt.selected = true;
        return opt;
      } else {
        opt.selected = false;
        return opt;
      }
    });

    let inputArray = !_.isEmpty(this.state.arrAfterRemovedObj) || this.state.removalFlag ? this.state.arrAfterRemovedObj : this.state.cloneOriginalNotificationData;
    let formattedData = this.restructureNotificationData(inputArray);
    let result;

    if (filterMenu.detail.value !== "all") {
      result = !_.isEmpty(removedId) ? _.filter(formattedData, item => item.filterCriteria === filterMenu.detail.value && !_.includes(removedId, item.id)) :
        _.filter(formattedData, item => item.filterCriteria === filterMenu.detail.value);
    } else {
      result = !_.isEmpty(removedId) ? _.filter(formattedData, item => !_.includes(removedId, item.id)) : formattedData;
    }

    this.setState({ filterOptions: filterOptionsTmp, selectedFilterValue: selFilter });
    this.tabLoadData(result, this.state.activeTab.key);
  }

  onRemove = (row) => {
    const { cloneOriginalNotificationData, arrAfterRemovedObj, activeTab, removalFlag } = this.state;

    let removalIdArray = !_.isEmpty(this.props.config.removedId) ? [...this.props.config.removedId] : [];
    removalIdArray.push(row.id);

    let inputArray = !_.isEmpty(arrAfterRemovedObj) || removalFlag ? arrAfterRemovedObj : cloneOriginalNotificationData;
    let result = _.filter(inputArray, i => !_.isEmpty(removalIdArray) && !_.includes(removalIdArray, i.id));
    let formattedData = this.restructureNotificationData(result);
    this.tabLoadData(formattedData, activeTab.key);
    this.setState({ arrAfterRemovedObj: result, removalFlag: true });
    //To maintain removed data
    this.props.handleCustomEvent({ type: "onCloseClick", removedId: removalIdArray });
    //To update it as read notification
    this.props.markNotificationRead(row, "onCloseClick");
  }

  getNotificationRow = (item) => {
    const { softDelete, updateErrorId } = this.props.config;
    const { t } = this.props;
    if (item !== "" && item.notificationGroup !== "" && !_.isEmpty(item.notificationList)) {
      return (
        <div className="notif--group">
          <p className="typography--label-small text-color-secondary notif--date">{item.notificationGroup}</p>
          {
            item.notificationList.map(notification => {
              let header = !_.isEmpty(notification.title) ? notification.title : "";
              let description = !_.isEmpty(notification.message) ? notification.message : "";
              let createdTime = !_.isEmpty(notification.createdDateTime) && notification.createdDateTime;

              return (
                <>
                  <div id={notification.id} className="notif--container motion--normal">
                    <div className="notif--status">
                      <div className="statusIndicator">
                        {
                          notification.status === false &&
                          <BhStatusIndicator className="notif--status-indicator" position="standalone" theme="accent" size="xsmall" />
                        }
                      </div>
                      <div className="notiTypeIcon">
                        {
                          this.getIconBasedOnType(notification)
                        }
                      </div>
                    </div>
                    <div className="notificationContent" onClick={() => this.props.markNotificationRead(notification, "onContentClick")}>
                      <p className="typography--body-small-semi-bold text-color-primary notif-title">{header}</p>
                      <p className="typography--body-small text-color-secondary notif--description">{description}</p>
                      <p className="typography--body-small text-color-secondary">{createdTime}</p>
                    </div>
                    {
                      softDelete &&
                      <BhIcon className="closeIcon" icon="close" size="small" onClick={() => this.onRemove(notification)} />
                    }
                  </div>
                  {
                    !_.isEmpty(updateErrorId) && updateErrorId === notification.id &&
                    <div className="errorAlertItem"><BhAlertItem type='context' status='critical'
                      message={`<strong>${t("InternalServerError")}.</strong> ${t("ErrorForRead")}`} dismissible="false" /></div>
                  }
                  <BhDivider marginLeft="medium" marginRight="medium" marginTop="none" marginBottom="none" />
                </>
              )
            })
          }
        </div>
      )
    } else {
      return <div />
    }
  }

  getIconBasedOnType = (notification) => {
    let comp;
    let type = !_.isEmpty(notification.type) ? notification.type : "";
    if (type === "User generated") {
      let mailId = !_.isEmpty(notification.createdBy) ? notification.createdBy.split("@")[0].split(".") : "";
      let first = !_.isEmpty(mailId) ? mailId[1] : "";
      let last = !_.isEmpty(mailId) ? mailId[0] : "";
      comp = <BhAvatar type="primary" size="xsmall" image="" false firstname={first} lastname={last} />

    } else if (_.includes(type, "System")) {
      comp = <BhIcon icon="notification_important" color={this.getIconColor(type)} size="xsmall" />

    } else {
      const iconOptionsArr = this.props.config && this.props.config.icons && this.props.config.icons.iconOptions;
      let customTypeObj = _.find(iconOptionsArr, i => i.value === type);
      let defaultIconObj = _.find(iconOptionsArr, i => i.value === "default");
      let iconObj = !_.isEmpty(customTypeObj) ? customTypeObj :
        !_.isEmpty(defaultIconObj) ? defaultIconObj : {};
      let iconName = !_.isEmpty(iconObj) && !_.isEmpty(iconObj.iconName) ? iconObj.iconName : "";
      let iconColor = !_.isEmpty(iconObj) && !_.isEmpty(iconObj.color) ? iconObj.color : "primary";
      comp = <BhIcon icon={iconName} color={iconColor} size="xsmall" />

    }
    return comp;
  }

  getIconColor = (type) => {
    let color;
    if (type === "System Warning") {
      color = `var(--color-fill-semantic-warning-default)`
    } else if (type === "System error") {
      color = `var(--color-fill-semantic-error-default)`
    } else if (type === "System Info") {
      color = `var(--color-fill-semantic-info-default)`
    } else {
      color = "";
    }
    return color;
  }

  onViewAllSelect = (viewAllObj) => {
    const { data } = this.props;
    if (data.isNoResponse) {
      return
    } else {
      const context = {
        navigationObject: _.get(viewAllObj, "navigationObject", {})
      }
      let payloadData = {
        state: { mode: _.get(context, "navigationObject.mode", ""), detail: { payLoad: context.navigationObject } },
        appname: _.get(context, "navigationObject.appName", "")
      }
      window.parent.postMessage(JSON.stringify({ eventType: "navigation", payload: payloadData }));
    }
  };

  getOtherScenariosScreens = () => {
    const { notificationErrorScreen } = this.props.config;
    const { data, t } = this.props;
    let comp;
    if (notificationErrorScreen) {
      comp = <div align="center" className="errorScreen">
        <BhIllustration className="serverError" source='CouldNotComplete' title={`${t("Error")} !`} description={t("InternalServerError")} />
        <div className="errorContent">
          <p>{t("AdvanceNotifiErr1")}</p>
          <p>{t("AdvanceNotifiErr2")}</p>
        </div>
      </div>
    } else if (data.isNoResponse) {
      comp = <div align="center">
        <BhIllustration className="noYet" source='EmptyBox' title={t("NoNotifiYet")} />
      </div>
    } else {
      comp = comp = <div align="center">
        <BhIllustration className="noRecent" source='EmptyBox' title={t("NoRecentNotification")} />
      </div>
    }
    return comp;
  }

  render() {
    const { tabList, filterOptions, renderNotificationComp } = this.state;
    const configTemp = this.props.config;
    const { filter, tabMenu, viewAll, isOpen, requestAdvNotification } = configTemp;
    const { data, t } = this.props;
    let i18TabList = tabList.map(item => { return { ...item, "label": t(`${item.label}`) } });
    return (
      <div id='advanceNotification'>
        <BhPanel
          slot="bh-panel"
          width="medium"
          header={t("Notifications")}
          id="chart-comp--panel"
          isOpen={isOpen}
          onBhEventClose={(event) => this.props.handleCustomEvent(event)}
        >
          {
            !_.isEmpty(viewAll) &&
            <BhA
              className="notiViewAll typography--body-medium"
              type="primary"
              text={t("ViewAll")}
              noUnderline
              href="#"
              onClick={() => this.onViewAllSelect(viewAll)}
              target="_parent"
              left-icon="visibility"
              disabled={data.isNoResponse ? true : false}>
            </BhA>
          }
          <div className="notif--header">
            <div className={tabMenu ? "" : "hideTab"}>
              {
                tabMenu &&
                <BhButtonTabs
                  className="notificationTabs"
                  small
                  id="notificationButtonTabs"
                  onBhEventSelected={(event) => this.onTabSelect(event)}
                  items={JSON.stringify(i18TabList)}
                  activeKey={!_.isEmpty(this.state.activeTab) ? this.state.activeTab.key : ""}>
                </BhButtonTabs>
              }
            </div>
            <div className="notif--header-buttons">
              {
                !_.isEmpty(filter) &&
                <BhActionMenu
                  className="notiActionMenu"
                  menu-items={filterOptions}
                  onBhEventSelected={(event) => this.onFilterMenu(event)}
                  selectedValue={!_.isEmpty(this.state.selectedFilterValue) ? this.state.selectedFilterValue.value : ""}
                  width="small"
                  icon-override="more_vert"
                  ellipsis="true">
                </BhActionMenu>
              }
            </div>
          </div>
          <div id="panel--content">
            {requestAdvNotification ? <BhSpinner size="large" className="panelSpinner"></BhSpinner> :
              _.isEmpty(data.items) ? this.getOtherScenariosScreens() : renderNotificationComp}
          </div>
        </BhPanel>
      </div>
    )
  }
}

export default BhNotification;

BhNotification.propTypes = {
  config: PropTypes.object,
  data: PropTypes.object,
  markNotificationRead: PropTypes.func,
  handleCustomEvent: PropTypes.func,
}
