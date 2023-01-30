
import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import isUndefined from 'lodash/isUndefined';
import classNames from 'classnames';
import ErrorOccurred from '../components/ErrorOccurred';
import AppFrame from '../frame/AppFrame';
import ErrorPage from '../ErrorPage';
import PageNotFound from '../PageNotFound';
import Loading from '../Loading';
import _ from "lodash";
import {getData} from '../RbacData';
import $ from "jquery";
const drawerWidth = 320;
/* istanbul ignore next */
const callPermissionsApi = async (props) => {
  fetch(`${window.location.pathname}tokenvalidity`)
    .then(response => response.json())
    .then(data => {
      if (data.sessionID === undefined) {
        props.history.push('/login');
      }
    });
};
const getPermitionAppId = (appid)=>{
  const permissionapplist=getData();
  const microappPersmissonObject=permissionapplist.find(({rsname})=>rsname===appid)
  return microappPersmissonObject;
}
/* istanbul ignore next */
const RouteHolder = (props) => {
  const { classes, history } = props;
  let payload = {}, mode = 'spa';
  if (!isUndefined(props.location)) {
    payload = !isUndefined(props.location.state) ? props.location.state.detail : {};
    mode = !isUndefined(props.location.state) ? props.location.state.mode : 'spa';
  }
  let defaultAppLink = localStorage.getItem('defaultAppLink');
  const pathname = props.location.pathname.substring(1).indexOf('/') === -1 ? props.location.pathname + "/" : props.location.pathname;
  let currentAppName, navigationString = window.localStorage.getItem('navigation') !== null ? JSON.parse(window.localStorage.getItem('navigation')) : [],
    currentAppObj = navigationString.find(n => n.link === pathname);
  let microapplist = JSON.parse(window.localStorage.getItem('microapps'));
  let existingApp = microapplist.find(n => n.link === pathname);
  if ((existingApp && !currentAppObj) || props.location.pathname === "/permissionsnotfound/") {
    callPermissionsApi(props);
  }
  let userInfoDialogMap = JSON.parse(window.localStorage.getItem('userInfoDialogMap'));
  let group = userInfoDialogMap ? userInfoDialogMap.filter(n => n.subMenu) : [];
  //  let defaultSubMenu = userInfoDialogMap ? group[0].subMenu.filter(n => n.default):[];
  let isValidFilePath = userInfoDialogMap ?
    userInfoDialogMap.filter(n => (n.type !== 'group' ?
      n.location === '/' + window.location.hash.split("/")[1] :
      group[0].subMenu.map(m => m.location === '/' + window.location.hash.split("/")[1]))) :
    [];

  return (
    <Switch>
      <Route exact path='/ErrorOccurred' component={() => <Suspense fallback={<Loading />}> <ErrorOccurred type={'load-failed'} /> </Suspense>} />
      <Route exact path='/pagenotfound' component={PageNotFound} />
      <Route exact path='/permissionsdenied' component={() => <Suspense fallback={<Loading />}> <ErrorOccurred type={'permi-denied'} /> </Suspense>} />
      <Route exact path='/:appname'
        render={(props) => {
          if (!existingApp && isValidFilePath && isValidFilePath.length > 0) {
            const OpenResourceStaticPage = lazy(() => import('./OpenResourceStaticPage'))
            return <Suspense fallback={<Loading />}><OpenResourceStaticPage /> </Suspense>
          }
          return (currentAppObj && getPermitionAppId(currentAppObj.id).access === "disabled" && currentAppObj.id !=="" && getPermitionAppId(currentAppObj.id).access !== null)
          ? <Suspense fallback={<Loading/>}><ErrorOccurred type={"permi-denied"} appId={existingApp.id}/></Suspense>
          : existingApp && !currentAppObj 
          ? <Suspense fallback={<Loading/>}><ErrorOccurred type={"permi-denied"} appId={existingApp.id}/></Suspense>
          : !existingApp && !currentAppObj && localStorage.getItem('isAuthorized')
          ? <Redirect to="/pagenotfound" />
          : <AppFrame key={props.match.url} url={(window.location.pathname === '/'?"":"/"+window.location.pathname.substring(1,window.location.pathname.length-1)) +props.match.url} id={(window.i18Resources != "" ?currentAppObj.id:currentAppObj.name)} payload={payload} mode={mode} history={history} appId={currentAppObj.id} thirdPartyApp = {currentAppObj.thirdPartyApp}/>
        }} />
      <Route
        exact
        path="/"
        render={() => {
          return (
            localStorage.getItem('isAuthorized') ?
              <Redirect to={defaultAppLink} /> :
              <Redirect to="/login" />
          )
        }}
      />
      <Route exact path='/*' component={PageNotFound} />
    </Switch>
  );
};

const styles = theme => ({
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    height: '100%'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth
  },
  staticPageGrid: {
    gridArea: "1 / 1 / 5 / 6 !important",
    marginLeft: "0px !important",
    paddingLeft: "32px",
    paddingRight: "32px",
  },
  hideCommonApp: {
    gridArea: "1 / 1 / 5 / 6 !important",
    marginLeft: "0px !important",
    paddingLeft: "0px",
    paddingRight: "0px",
  }

});

class MainComponent extends React.Component {
  checkAppName = () => {
    callPermissionsApi(this.props);
    const pathname = this.props.location.pathname.substring(1).indexOf('/') === -1 ? this.props.location.pathname + "/" : this.props.location.pathname;
    let currentAppName, navigationString = window.localStorage.getItem('navigation') !== null ? JSON.parse(window.localStorage.getItem('navigation')) : [],
      currentAppObj = navigationString.find(n => n.link === pathname);
    let microapplist = JSON.parse(window.localStorage.getItem('microapps'));
    let existingApp = microapplist.find(n => n.link === pathname);
    return (existingApp);
  }
  componentDidMount(){
    let navigationString = localStorage.getItem('navigation') !== null ? JSON.parse(localStorage.getItem('navigation')) : [];
    navigationString = navigationString.filter(nav => !nav.hasOwnProperty("visibility") || nav.visibility);
    if(navigationString.length === 0){
      $('.grid-container').css('padding-left','0px');
    }
  }
  render() {
    const { classes, theme, open } = this.props;
    const pathname = this.props.location.pathname.substring(1).indexOf('/') === -1 ? this.props.location.pathname + "/" : this.props.location.pathname;
    let microapplist = JSON.parse(window.localStorage.getItem('microapps'));
    let navigationString = window.localStorage.getItem('navigation') !== null ? JSON.parse(window.localStorage.getItem('navigation')) : [];
    let currentAppObj = navigationString.find(n => n.link === pathname);
    let commonImpacted = (localStorage.getItem("commonappImpacted") && localStorage.getItem("commonappImpacted") != "undefined") ? JSON.parse(localStorage.getItem("commonappImpacted")) : null;
    commonImpacted = commonImpacted && currentAppObj ? commonImpacted.find(n => n.originaterApp === currentAppObj.id) : null
    let existingApp = microapplist.find(n => n.link === pathname);
    let userInfoDialogMap = JSON.parse(window.localStorage.getItem('userInfoDialogMap'));
    let appList = userInfoDialogMap ? userInfoDialogMap.filter(n => n.type === "app") : [];
    let isHorizontal = _.startsWith(localStorage.getItem("designTemplate"), "system");
    return (
      <div className={
        existingApp && currentAppObj ?
          (currentAppObj && commonImpacted ? !isHorizontal ? classes.staticPageGrid : classes.hideCommonApp : this.props.classname) :
          !_.isEmpty(appList.filter(n => n.location === (existingApp && existingApp.link))) ? this.props.classname : !isHorizontal ? classes.staticPageGrid : classes.hideCommonApp
      }
        style={existingApp ? commonImpacted ? {} : this.props.style : {}}>
        <main className={classNames(classes.content, { [classes.contentShift]: open })}>
          {window.localStorage.getItem('navigation') && JSON.parse(window.localStorage.getItem('navigation')).length !== 0 ?
            <RouteHolder {...this.props} /> :
            this.checkAppName() ? <ErrorOccurred type={"permi-denied"} appId={existingApp.id} /> : <ErrorOccurred type={"norole"} />
          }
        </main>
      </div>
    )
  }
}

MainComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainComponent);
