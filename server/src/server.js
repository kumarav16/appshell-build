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
/* istanbul ignore if */
function setTLS(){

  if (process.env.TENANT_INFO === undefined || process.env.node_env === 'docker'){
	 
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = config.NODE_TLS_REJECT_UNAUTHORIZED;
  }
}


const rawRequest = require('request');
const express = require('express');
const session = require('express-session');
const path = require('path');
// const cors = require('cors');
var auth = require('./auth');
var consumerLicensing = require('./licensing/consumer-licensing');
const cookieParser = require('cookie-parser'); // used for session cookie
const tenancy = require('./tenant');
const proton = require('./proton');
const bodyParser = require('body-parser');
const config = require('./app-config'); // get config settings from local file or VCAPS env var in the cloud
setTLS();
const _ = require("lodash");
const request = require('request');
const proxy = require("express-request-proxy");
var authAdapter = require('@bh-ent-tech/ss_client_node_adapter');
var authAdapterSession = require('@bh-ent-tech/ss_client_node_adapter').session;
const loggerConfig=require('../loggerConfig').default;
const fs = require('fs');
const querystring = require('querystring');
const Blob = require('node-blob');
const healthProbe = require('@cloudnative/health');
var devConfig = require('../localConfig.json')["development"];
const rp = require('request-promise');
const jwt_decode = require('jwt-decode');
let TMS_URL  = process.env.TMS_URL || config.TMS_URL;
let SS_PUBLIC_URL  = process.env.uaaURL + process.env.tokenURL || config.uaaURL + config.tokenURL;
/* istanbul ignore next */
let SS_PRIVATE_URL = process.env.uaaprivateURL || config.uaaprivateURL ? config.uaaprivateURL : config.uaaURL + config.tokenURL;
const logFile = require('./appshell-logger');

const {validateTenant,fetchTenant,getLandingPage,setTenant,domainTenantMappingList,tenantList}=require('./MultiTenancyAPIs');

const logger=logFile.logger();
const auditlogger=logFile.auditlogger();
logFile.init(loggerConfig);

var clientConfig = {
  "strategy": process.env.grantType || config.grantType,
  "tenant": process.env.tenant || config.tenant,
  "client_id":config.multiTenancy && config.DEFAULT_TENANT_CONFIGURATION.properties?config.DEFAULT_TENANT_CONFIGURATION.properties.clientId:config.clientId,
  ...config.clientss,
  "redirect_url": process.env.redirect_url || config.redirectUrl,
  "ispkceEnabled": process.env.ispkceEnabled || config.ispkceEnabled,
  "client_secret": process.env.uaaClientSecret || config.uaaClientSecret,
  "validateReqBeforeExpiry": process.env.validateReqBeforeExpiry || false,
  "scope": process.env.scope || "openid profile",
  "realm": process.env.tenant || config.tenant,
  "tenantInfo": process.env.tenant_info != undefined ? JSON.parse(process.env.tenant_info) : config.tenantInfo ? config.tenantInfo : undefined
};
var vstacktrace=function(){
  var codelocation=new Error().stack;
  return codelocation;
}

let hostIp;
const redis = require("redis");
 /* istanbul ignore next */
const { trackUserActivity=false,userActivityServer} = require('./app-config');

const redisStore = require('connect-redis')(session);
var microapps = require('../microapp-services.json');

const staticFiles = express.static(path.join(__dirname, '../../../client/build'),{maxAge: '365 day'});
var key,decryptor,node_env,routeConfig,menuItems,design_template,productName,
commonappImpacted,userInfoDialogMap,headerMenuConfig,tenantDropDown,searchConfig, wsport, advanceNotificationMeta,displayMenuItemOnHeader,displayMicroappOnHeader,applicationName;
let defaultKey = 'ae9c8a84-5bb2-11eb-ae93-0242ac130002';
function getKey(node_env){
	    /* istanbul ignore else */
	if(node_env === 'tenantinfo'){
	  key= process.env.passwordCredEncryptor || defaultKey;
	}
		else{
	   key = config.passwordCredEncryptor || defaultKey;
	}
	return key;
}
function init(){
   node_env = process.env.TENANT_INFO ? 'tenantinfo' : (process.env.node_env || 'development');

key=getKey(node_env);

 decryptor = require('simple-encryptor')(key);

 /*this part needs to be set as a service*/
 routeConfig = process.env.TENANT_INFO ? JSON.parse( process.env.TENANT_INFO )[0]['microappServices'] : microapps[0]['microappServices'];
 menuItems = process.env.TENANT_INFO ? JSON.parse(process.env.TENANT_INFO)[0]['menuItems'] : microapps[0]['menuItems'];
 /* istanbul ignore next */
 design_template = config.designTemplate && config.designTemplate !== undefined && config.designTemplate !== null ? config.designTemplate : 'default';
 productName = process.env.TENANT_INFO ? JSON.parse(process.env.TENANT_INFO)[0].productName : devConfig.productName;
 commonappImpacted=process.env.TENANT_INFO ? JSON.parse( process.env.TENANT_INFO )[0]['templateOverloading'] : microapps[0]['templateOverloading'];
 userInfoDialogMap =process.env.TENANT_INFO ? JSON.parse(process.env.TENANT_INFO)[0].userInfoDialogMap : devConfig.userInfoDialogMap;
 headerMenuConfig = process.env.TENANT_INFO ?  JSON.parse(process.env.TENANT_INFO)[0].headerMenuConfig: devConfig.headerMenuConfig;
 tenantDropDown = process.env.TENANT_INFO ?  JSON.parse(process.env.TENANT_INFO)[0].tenantDropDown: devConfig.tenantDropDown;
 searchConfig = process.env.TENANT_INFO ? JSON.parse(process.env.TENANT_INFO)[0].searchConfig : devConfig.searchConfig;
 advanceNotificationMeta = process.env.TENANT_INFO ? JSON.parse(process.env.TENANT_INFO)[0].advanceNotificationMeta : devConfig.advanceNotificationMeta;
 displayMenuItemOnHeader = config.displayMenuItemOnHeader;
 displayMicroappOnHeader = config.displayMicroappOnHeader;
 applicationName = config.applicationName;
 return function get(){
   return{
    node_env:node_env,
    key:key,
    routeConfig:routeConfig,
    menuItems:menuItems,
    productName:productName,
    design_template:design_template,
    commonappImpacted:commonappImpacted,
    userInfoDialogMap:userInfoDialogMap,
    headerMenuConfig:headerMenuConfig,
    tenantDropDown:tenantDropDown,
    mockObject:config.mockSecurityServiceObj,
    searchConfig: searchConfig,
    advanceNotificationMeta: advanceNotificationMeta,
    displayMenuItemOnHeader : displayMenuItemOnHeader,
    displayMicroappOnHeader : displayMicroappOnHeader,
    applicationName : applicationName
   }
 }
}


init();


const app = express();
const health = express();
const healthport = process.env.HEALTH_PORT || 5678;
const _require = require('http-proxy-middleware'),
    createProxyMiddleware = _require.createProxyMiddleware;

const webSockeApps = _.filter(routeConfig, { isWebsocketRequired: true });
const proxyArray = [];
for (let i = 0; i < webSockeApps.length; i++) {
  /* istanbul ignore else */
  if (webSockeApps[i].websocketPathMap && webSockeApps[i].websocketPathMap !== "") {
    for (let k = 0; k < webSockeApps[i].websocketPathMap.length; k++){
      const serviceName =  webSockeApps[i].websocketPathMap[k].webSocketServiceName;
      /* istanbul ignore next */
      const targetHost =  (serviceName && serviceName !== "" && config[serviceName]) ? config[serviceName] : webSockeApps[i].host;
        const proxy = createProxyMiddleware(webSockeApps[i].websocketPathMap[k].websocketServicePath, {
        target: targetHost,
        changeOrigin: true, // for vhosted sites, changes host header to match to target's host
        logLevel: 'debug',
        wss: true,
        secure: false
      });
      proxyArray.push(proxy);
    }
  }
}
let jsonParser = bodyParser.json({ extended: false, limit: '500mb' });
app.use(function(req,res,next){
  /* istanbul ignore if */
  if(req.headers['datatype'] === 'binary') {
    return next();
  } else if (req.headers["sec-fetch-dest"] === 'iframe') {
    return res.send('<script>window.parent.location.reload()</script>');
    } else {
    return jsonParser(req,res,next);
  }
});
app.use(bodyParser.urlencoded({extended: false,limit: '500mb'}));
// app.use(cors());

app.get(`${config.baseHref}api/usermanager/product`, function (req, res) {
 
  const tenancy=config.multiTenancy?true:false;

  /* istanbul ignore if */
  if ((process.env.grantType || config.grantType) === "oauth2") {
      res.setHeader("X-Frame-Options", "SAMEORIGIN");
      res.set('Cache-Control', 'no-store');
      res.send({ productName: productName, grantType: 'oauth2', grantTypeAuthCode: true,
                 design_template: design_template,"code":key,thankYouMsg:config.thankYouMsg,
                 licencesUrl:config.licencesUrl ? true : "",tenancy:tenancy,
                 displayMenuItemOnHeader: displayMenuItemOnHeader,
                 displayMicroappOnHeader: displayMicroappOnHeader,
                 applicationName: applicationName});
  } else {
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.set('Cache-Control', 'no-store');
    res.send({ productName: productName,
               grantType: config.grantType, grantTypeAuthCode: false, 
               design_template: design_template, "code":key,
               thankYouMsg:config.thankYouMsg,
               licencesUrl:config.licencesUrl ? true : "",
               tenancy:tenancy,
              displayMenuItemOnHeader: displayMenuItemOnHeader,
              displayMicroappOnHeader: displayMicroappOnHeader,
              applicationName: applicationName
              });
  }
});

app.get(`${config.baseHref}api/usermanager/nav`, (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.send({ 
   navigations: routeConfig.map(({host,navService,path,template,...rest}) => ({...rest})),
   menuItems: menuItems ? menuItems : "",
   commonappImpacted:commonappImpacted,
   userInfoDialogMap : userInfoDialogMap,
   headerMenuConfig : headerMenuConfig,
   tenantDropDown: tenantDropDown,
   searchConfig: searchConfig,
   wsport:config.wsport,
   advanceNotificationMeta: advanceNotificationMeta,
   appVersion:config.appVersion
  });
});


    /* istanbul ignore next */
 app.get(`${config.baseHref}api/template`, (req, res) => {
  var design_template =  config.designTemplate && config.designTemplate !== undefined && config.designTemplate !== null? config.designTemplate : 'default';
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.set('Cache-Control', 'no-store');
  res.send({ 
    design_template:design_template
  });
});
function tenantConfig(req, res) {
  let i18Resources;
  if (config.i18Resources) {
    i18Resources = { ...config.i18Resources };
    delete i18Resources.hostUrl;
  }
  let userExperience;
  if (config.userExperience) {
    userExperience = config.userExperience;
  }
  res.set('Cache-Control', 'no-store');
  res.send({
    trackUserActivity: trackUserActivity,
    userActivityServer: userActivityServer,
    userExperience: userExperience,
    i18Resources: i18Resources
  });
}
app.get(`${config.baseHref}api/tenantConfig`,tenantConfig);
/*******************************Feedback API Call*********************************************/

app.get(`${config.baseHref}api/feedback`, (req, res) => {
  var options = {
    method: 'POST',
    url: devConfig.feedbackServiceUrl + '/feedback',
    form: req.body,
    headers: req.headers
  };
  request(options, function (err, response, body) {
    /* istanbul ignore else */
    if (!err) {
	     res.set('Cache-Control', 'no-store');
      res.send('Feedback added successfully');
    } else {
	     res.set('Cache-Control', 'no-store');
      res.send(body);
    }

  });
});


/*************************************************** */


// Initializing default session store
// *** Use this in-memory session store for development only. Use redis for prod. **
/*app.use(session({
  secret: 'top_secrect_react_app_hub',
  name: 'local.cookie',
  proxy: true,
  resave: true,
  saveUninitialized: true}
));*/

 function setupsession(node_env,config){
   /* istanbul ignore else */
  if(!config.multiInstance){

    app.use(session({
      ...config.decrypt,
      name: 'local.cookie',
      proxy: true,
      resave: true,
      cookie: { 
        secure: config.secure, 
        httpOnly: config.httpOnly,
        sameSite:config.sameSite, 
      },
      saveUninitialized: true}
    ));
  
  }
  else
  {
    if(config.redisConfig)
    {
  //    config.redisConfig.password = (config.redisConfig.password === "K8SECRET" ? process.env.REDIS_PASSWORD : config.redisConfig.password);
     // const redisClient = redis.createClient({...config.redisConfig,username:"default",password:'gQPh5TIM8kELtggF'});
      var redisClient;

      redisClient = redis.createClient({...config.redisConfig});
      if(config.redisConfig.acl){
          redisClient['auth'] = null;
        redisClient.send_command('AUTH', [config.redisConfig.acl.username, config.redisConfig.acl.password], redis.print);


      }
     
   /* if(config.redisConfig.default_only || config.redisConfig.default_only===undefined){
	    
        redisClient = redis.createClient({...config.redisConfig});
      }
     
   if(config.redisConfig.default_only!==undefined && !config.redisConfig.default_only){
      
        redisClient = redis.createClient({...config.redisConfig,...config.defaultconfig});
        redisClient['auth'] = null;
        redisClient.send_command('AUTH', [config.redisConfig.username, config.redisConfig.password], redis.print);
       
      }*/
     /* redisClient.send_command('AUTH', [config.redisConfig.username, config.redisConfig.password], (err, res) => {
        if(err) {
         logger.error( err,"",vstacktrace());
        }
        if(res)
        {
          logger.info(res,vstacktrace());
        
        }
         });*/
	      app.use(session({
          ...config.decrypt,
            name: 'local.cookie',
            proxy: true,
            resave: false,
            saveUninitialized: true,
            cookie: { 
              secure: config.secure, 
              httpOnly: config.httpOnly,
              sameSite:config.sameSite, 
            },
           store: new redisStore({ host: config.redisConfig.host, port: config.redisConfig.port, client: redisClient }),
          }
          ));
	    
   
    }
  }
}
/** 
* @method: 
* @description: This method filter tenant object from a tenant list based on param and updates clientConfig with new tenant details
* @param tenant 
* @return none
*/
function filterAndSetTenant(tenant){
  let cloneClientConfig = JSON.parse(JSON.stringify(clientConfig));
	let tenantList=config.TENANT_CONFIGURATION;
  cloneClientConfig.tenant = tenant;
  cloneClientConfig.realm=tenant;
  const tenantSelected= tenantList[tenant];
  cloneClientConfig.client_secret = tenantSelected.secrets.clientSecret;
   return cloneClientConfig;
}

setupsession(node_env,config);
/* istanbul ignore next */
  authAdapter.init({
    SS_PUBLIC_URL: SS_PUBLIC_URL,
    SS_PRIVATE_URL: SS_PRIVATE_URL,
    TMS_URL: TMS_URL,
    clientDetails: clientConfig,
    refreshWindow:config.refreshWindow 
  }, (errorString) => {
    // you can handle error events for unsuccessful subscription topics 
    console.log('in pubsub subscribe error ' + errorString);
  });
  /* istanbul ignore next */
  function errorHandler(errorString) {
    if (errorString.includes("Realm not found.")) {
      clientConfig.tenant = process.env.tenant;
    }
    
  };
  authAdapter.middleware(clientConfig, errorHandler)(null, null, function(){});
  

app.use(authAdapter.initialize());
app.use(authAdapterSession());
  app.get("".concat(config.baseHref, "api/fetchTenant"),(req,res)=>{
    const result=fetchTenant(req,res);
    /* istanbul ignore next */
    result.msg?res.status(404).send({...result}):res.status(200).send({...result});
});
app.get("".concat(config.baseHref, "api/setTenant"), (req,res)=>{
  res.set('Cache-Control', 'no-store');
  const result=setTenant(req,res);
  result.msg?res.status(404).send({...result}):res.status(200).send({...result});
} );
app.get("".concat(config.baseHref, "api/validateTenant"),(req,res)=>{
  const result=validateTenant(req,res);
  result.msg?res.status(404).send({...result}):res.status(200).send({...result});
});





/* istanbul ignore if */
if (clientConfig.strategy === "oauth2") {
  app.use(`${config.baseHref}loginTenant`, (req,res,next)=> {
    let clientConfigToPass = clientConfig;
    if(config.multiTenancy && req.query.tenant) {
        clientConfigToPass = filterAndSetTenant(req.query.tenant);
    }
    authAdapter.middleware(clientConfigToPass, errorHandler)(req, res, function(){});
    authAdapter.authenticate(clientConfig.strategy,{session: true})(req,res,next);
    
  })
  //logger.info("clientconfig tenant : "+clientConfigToPass.tenant,vstacktrace());
  // user is redirected back with the *code*
  app.use(`${config.baseHref}authorization-code/callback`,authAdapter.authenticate(clientConfig.strategy,{ failureRedirect:"".concat(config.baseHref, "#/auth") }), function (req, res) {
    logger.info("Authorization callback called",vstacktrace());
    // redirect user to /profile so they can see their information
    req.session.clientToken = req.user.ticket.access_token;
    req.session.starttime = new Date().getTime() + 0;
    req.session.isAuthorized = true;
    req.session.id_token = req.user.ticket.id_token;
    req.session.refresh_token = req.user.ticket.refresh_token;
    var decoded = jwt_decode(req.session.refresh_token);
    req.session.expiresOn = decoded.exp;
    req.session.username=req.user.preferred_username;
    req.session.email = req.user.email;
    if(config.multiTenancy) {
      setClientConfiginSession(req);
    }
    
    req.session.tenantid=req.user.tenantID;
    req.session.userid=req.user.sub;
    req.session.save();
    auditlogger.info("Authentication successful for the user",req,{"eventCategory":"login","eventSubtype": "Success","eventType":"Authentication","response":"Audit_Success"});
    res.redirect(`${config.baseHref}#/auth`);
  }); 
}
else {
  /* istanbul ignore if */
   if (clientConfig.strategy === "password-grant") {
     /* istanbul ignore else */
  if(config.mockSecurityServiceObj)
  {
	    /* istanbul ignore next */  
    mockLoginFun(config.mockSecurityServiceObj);
  }
  else {
    app.post(`${config.baseHref}loginTenant`, function (req, res, next) {
      var password = decryptor.decrypt(req.body.password);
      var username = decryptor.decrypt(req.body.email);
      authAdapter.authenticate(clientConfig.strategy, { username: username,
        password: password
      })(req, res, next);
    },function(req,res){
        req.session.clientToken = req.user.ticket.access_token;
        req.session.starttime = new Date().getTime() + 0;
        req.session.isAuthorized = true;
        req.session.id_token = req.user.ticket.id_token;
        req.session.refresh_token = req.user.ticket.refresh_token;
        var decoded = jwt_decode(req.session.refresh_token);
        req.session.expiresOn = decoded.exp;
        req.session.username=req.user.preferred_username;
        req.session.email = req.user.email;
        req.session.tenantid=req.user.tenantID;
        req.session.save();
        res.setHeader("X-Frame-Options", "SAMEORIGIN");
        res.set('Cache-Control', 'no-store');
        auditlogger.info("Authentication successful for the user",req,{"eventCategory":"login","eventType":"Authentication","eventSubtype": "Success","response":"Audit_Success"});
        res.send({ message: 'success'});
    });
  }
}}
/* istanbul ignore next */
function setClientConfiginSession(req){
   let decodedAccess = jwt_decode(req.session.clientToken);
    let clonedClientConfig = filterAndSetTenant(decodedAccess.tenant);
    req.session.clientConfig = clonedClientConfig;
}

app.get(`${config.baseHref}logout`,function (req, res) {
  const sessionIdToken = req && req.session && req.session.id_token;
  const sessionClientConfig = req && req.session && req.session.clientConfig;
  req && req.session && (req.session.isAuthorized = false);
  // redirect user to /profile so they can see their information
  let logoutUrlkey = config.logoutUrlKey ? config.logoutUrlKey : "redirect_uri";
  let tenant = sessionClientConfig?sessionClientConfig.tenant:clientConfig.tenant;  
  const logoutUrl = SS_PUBLIC_URL+"/auth/realms/"+tenant+"/protocol/openid-connect/logout?id_token_hint=" + sessionIdToken + "&"+logoutUrlkey+"="; //replace this redirect uri with uaaURL and for localhost with localhost
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  auditlogger.info("Logout request sent to keycloak",req,{"eventCategory":"Logout","eventSubtype": "Success","eventType":"Logout","response":"Audit_Success"});
  delete req.session.clientToken;
  res.send({ logout: logoutUrl });
 
});
function extractValues(sess){
  return{
    username : sess.username ? querystring.escape(sess.username): '',
    email :sess.email ? querystring.escape(sess.email) : '',
    idtoken : querystring.escape(sess.id_token),
    full_name : sess.passport && sess.passport.user ? {...sess.passport.user} : {}
  }
  
}
function getName(full_name){
  return{
    firstNameInitial : full_name && full_name.given_name ? full_name.given_name.charAt(0).toUpperCase() : '',
    lastNameInitial : full_name && full_name.family_name ? full_name.family_name.charAt(0).toUpperCase() : ''
  }

}
/* istanbul ignore next */
function authenticateMain(err, user, info, req, res, next){
  if (err) { return next(err); }
  if (!user) {
    req.session.isAuthorized = false;
    auth.logout(req, res, next);
  }else{
    req.session.id_token = req.user.ticket.id_token? req.user.ticket.id_token : req.session.id_token;
    req.session.clientToken = req.user.ticket.access_token;
    req.headers['authorization'] ='Bearer ' + req.session.clientToken;
                    // console.log('access token from appshell :', req.session.clientToken);
        req.session.refresh_token = req.user.ticket.refresh_token;
        // console.log('refresh token from appshell :', req.session.refresh_token);
        var decoded = jwt_decode(req.session.refresh_token);
        req.session.expiresOn = decoded.exp;
    req.session.starttime = new Date().getTime() + 0;
    const {traceId}=req.headers;
  }
}
function tokenValidity(req, res){
  var [username='', email='', sessionID='', full_name=''] = [];
  extractValues(req.session);
	/* istanbul ignore else */
  if(req.session){
    ({username,email,sessionID,full_name}=extractValues(req.session));
    
  }
  var firstNameInitial,lastNameInitial;
  ({firstNameInitial,lastNameInitial}=getName(full_name));
 let title = [firstNameInitial,lastNameInitial].filter(Boolean);

  res.set('Cache-Control', 'no-store');
  res.send({ 
   tokenvalid: req.session.isAuthorized||false,
   sessionID: sessionID ||  "sessionString",
   tenantid:req.session.tenantid,
   polling:config.polling,
   userInfo: { 'name': username, 'email': email,  'title': title,'firstName':full_name.given_name,'lastName':full_name.family_name},
   showHeaderMenuIcon:config.showHeaderMenuIcon
  });
}

app.get(config.baseHref + 'tokenvalidity',tokenValidity);

/* istanbul ignore next */
app.get(`${config.baseHref}rbac`, function (req, res) {
  function errorHandler(errorString) {
    const err3=new Error('Rbac error : ' + errorString);
 
    logger.error(err3,"",vstacktrace(), req, {});

    var errorArray = errorString.split(':');
    var statuscode = errorArray[3].split('-');
 res.set('Cache-Control', 'no-store');
    res.status(statuscode[0]).send({ message: "Failed to fetch permission list" });
}
function errorHandlerLic(statusCode) {
  const err3=new Error('Licensing error :' + statusCode);
  logger.error(err3,"",vstacktrace(), req, {});
  res.set('Cache-Control', 'no-store');
  res.status(statusCode).send({ message: "Failed to fetch permission list from licensing" });
}
function successHandler(response) {
		 res.set('Cache-Control', 'no-store');
     logger.info("RBAC response : "+JSON.stringify(response),vstacktrace());

  //================================licensing:Start===============================================
  if (config.licencesUrl && config.licencesUrl !== "") {  
    req.headers = {
      "x-apicache-bypass": true,
      "content-type": req.headers["content-type"],
      "content-length": req.headers["content-length"],
      "Authorization": 'Bearer ' + req.session.clientToken,
    };
    var options = {
      method: 'GET',
      uri: config.licencesUrl,
      headers: req.headers
    };
    request(options, function (err, responseLic) {
      /* istanbul ignore else */
      if(responseLic && responseLic.statusCode === 200){
      if(JSON.parse(responseLic.body).httpStatusCode && JSON.parse(responseLic.body).httpStatusCode === 200){
        var responseData = consumerLicensing.getPermissionData(JSON.parse(response), JSON.parse(responseLic.body));
        var responseDataUnlicensedMessage = JSON.parse(responseLic.body).data.unlicensedMessage;
        req.session.rbacResponse = responseData; //JSON.stringify(response);

        logger.info("consumer licensing response : " + JSON.stringify(responseLic.body.data), vstacktrace());
        req.session.save();
        res.send({
          roles: responseData,
          unlicensedMessage : responseDataUnlicensedMessage, 
          sessionID: querystring.escape(req.sessionID)
        });
      }else if(err || (JSON.parse(responseLic.body).httpStatusCode && JSON.parse(responseLic.body).httpStatusCode !== 200)){
        errorHandlerLic(JSON.parse(responseLic.body).httpStatusCode);
      }
    }else {
      let statusCode = responseLic? responseLic.statusCode: 404;
      errorHandlerLic(statusCode);
      
      }
    });
  //==================================licensing:End=============================================

  } else {

      req.session.rbacResponse = JSON.parse(response);
      req.session.save();
      res.send({
        roles: JSON.parse(response), sessionID: querystring.escape(req.sessionID)
      });

  }
}
  if (config.mockSecurityServiceObj) {
    if (req.session && req.session.clientToken) {
      var rolesapi = config.permittedapps? config.permittedapps : [];
      res.send({
        roles: rolesapi, sessionID: querystring.escape(req.sessionID)
      });
    } else {
      proton.io.to(req.sessionID).emit("timeout", req.sessionID);
    }
  } else {
    if(config.multiTenancy) {
      authAdapter.getrbac({
        SS_PRIVATE_URL: SS_PRIVATE_URL,
        access_token: req.session.clientToken,
        refresh_token: req.session.refresh_token,
        clientDetails: req.session.clientConfig
      }, successHandler, errorHandler);
    } else {
      authAdapter.getrbac({
        SS_PRIVATE_URL: SS_PRIVATE_URL,
        access_token: req.session.clientToken,
        refresh_token: req.session.refresh_token,
        clientDetails: clientConfig
      }, successHandler, errorHandler);
    }
    
  }
});

app.get(`${config.baseHref}rbackData`, function(req,res){
  let rbacResponse = req && req.session && req.session.rbacResponse;
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.set('Cache-Control', 'no-store');
  res.send({"rbacData":rbacResponse});
});
/* istanbul ignore next */
app.get(`${config.baseHref}allChannels`,(req, res) => {
  function errorHandler(errorString) {
    logger.error(`AllChannels : ${errorString}`,vstacktrace(), req, {});
    let errorArray = errorString.split(':');
    let statuscode = errorArray[3].split('-');
    res.set('Cache-Control', 'no-store');
    res.status(statuscode[0]).send({ message: "Failed to get all tenants" });
  }

  function successHandler(response) {
    const responseData = response && response !== "" && response;
    const result=JSON.parse(responseData);
    let req_tenant_id = req && req.user && req.user.tenantID;
    res.send({
      tenant_id: req_tenant_id,
      roles: result
    });
  }

  const params= {
	  SS_PRIVATE_URL:SS_PRIVATE_URL,
    access_token : req.session.clientToken,
    clientDetails: {
    realm: config.tenant
    }
    };
  authAdapter.getAllTenants(params,successHandler,errorHandler);

});
app.post(`${config.baseHref}updateChannel`,(req, res, next) => {


  function errorHandler(errorString) {
    logger.error(`Failed to change tenant : ${errorString}`,vstacktrace(), req, {});
    let errorArray = errorString.split(':');
    let statuscode = errorArray[3].split('-');
    res.set('Cache-Control', 'no-store');
    res.status(statuscode[0]).send({ message: "Failed to change tenant" });
  }
  const channel=
  {
    name : req.body.name,
    id   : req.body.id 
  };
 const params= {
    SS_PRIVATE_URL:SS_PRIVATE_URL,
    access_token : req.session.clientToken,
    clientDetails: {
     realm: config.tenant
    },
    updateTenant: {
    ...channel
    }
    }
  function successHandler(response){
    res.send({
      message: "success"
    });
  }  

  authAdapter.authenticate('main', function(err, user, info) {
    authenticateMain(err, user, info, req, res, next);
    /* istanbul ignore if */
    if(user){
      params.access_token = req.session.clientToken;
      authAdapter.changeTenantContext(params,successHandler,errorHandler);
    }
  })(req, res, next);
 
});
function processReadFile(res,err,data){
  if (err) {
    res.status(404);
    res.send({ data: 'error', message:err });
  } 
  else
   {
     let esc_data=querystring.escape(data);
    res.send({ data: esc_data.toString() });
   }
}
function readFile(req, res, next) {
  /* istanbul ignore else */
  if (req.session && req.session.clientToken) {
    var file = path.basename(req.params.filename);
    const htmlFile = path.join(__dirname, '../../../client/src/assets/', file);
  fs.readFile(htmlFile, function read(err, data) {
	      /* istanbul ignore next */
    processReadFile(res,err,data);
    });
  }else{
	      /* istanbul ignore next */
    auth.logout(req, res, next);
  }
}
app.get(`${config.baseHref}static/:filename`, readFile);
/* istanbul ignore next */
app.get(`${config.baseHref}i18Resources/:appName/:lng/:ns`, function(req, res, next) {
  const { appName, lng, ns } = req.params;
  var app = appName && appName !== "" && appName;
  var lang = lng && lng !== "" && lng;
  var nos = ns && ns !== "" && ns;
  if(config.i18Resources){
    proxy({
      url: config.i18Resources.hostUrl+""+app+"/"+lang+"/"+nos,
      timeout: parseInt(req.headers.timeout) || 180000,
      originalQuery: req.originalUrl.indexOf("?") >= 0
    })(req, res, next);
  }
  else {
    res.sendFile(`/${app}/${lang}/${nos}`, {root:path.join(__dirname,'../dist')});
  }
});

app.get(`${config.baseHref}polling`, function(req, res, next) {
  let currtime = Math.floor(new Date().getTime()/1000);
  /* istanbul ignore else */
  if (req.session.expiresOn === undefined || currtime >= req.session.expiresOn) {
    /* istanbul ignore else */
    if(req.session.expiresOn === undefined){ 
      auth.endsession(req, res, next);
    }else {
      res.set('Cache-Control', 'no-store');
      res.send({
        message: "failure"
      });
    }
  } else {
    res.set('Cache-Control', 'no-store');
    res.send({
      message: "success"
    });
  }
});


app.all('*',(req, res, next) => {
  let originalUrl = `/${req.originalUrl.replace(config.baseHref,"").replace("/?", "").toLowerCase()}`;
  let url_split = originalUrl.split('/');
  let appName = "/" + url_split[1].toLowerCase();
  const appIdx = _.findIndex(routeConfig, { path: appName });
/* istanbul ignore else */
  if (appIdx === -1) {
    next();
  }
  else {
    if (req.session && req.session.clientToken) {

    
      authAdapter.authenticate('main', function(err, user, info) {
        logger.info("New token genarated",vstacktrace());
        authenticateMain(err, user, info, req, res, next);
        if(user){
          next();
        }
      })(req, res, next);
    }
    else {
      logger.info('Logout called due to no clientToken from passport main strategy',vstacktrace());
      auth.endsession(req, res, next);
   //   auth.logout(req, res, next);
    }
    }
});
app.use(proton.create(routeConfig,authAdapter));

app.use(cookieParser('top_secrect_react_app_hub'));
app.use(tenancy.create() );

app.use(staticFiles);

app.use('/errorpage?',(req,res)=> {
  res.sendStatus(404).send({message: 'error to laod page'});
});
/*function parseCookies (request) {
  const list = {};
  const cookieHeader = request.headers?.cookie;
  if (!cookieHeader) return list;
  cookieHeader.split(`;`).forEach(function(cookie) {
      let [ name, ...rest] = cookie.split(`=`);
      name = name?.trim();
      if (!name) return;
      const value = rest.join(`=`).trim();
      if (!value) return;
      list[name] = decodeURIComponent(value);
  });
  return list;
}*/
app.use("".concat(config.baseHref, ":tenant"), function (req, res) {
 
  // const cookies = parseCookies(req);
  // if(cookies.setdone===undefined)
  //{
   var result;
   /* istanbul ignore else */
   if (config.baseHref !== req.params.tenant) {
  // if (config.baseHref !== req.query.param.tenant) {
     result = validateTenant(req, res);
   }
    /* istanbul ignore if */
   if (result.setTenantinfo && !req.session.isAuthorized && config.multiTenancy) {
    filterAndSetTenant(req.params.tenant);
    //filterAndSetTenant(tenant);
     res.redirect("".concat(config.baseHref, `#/pathparam/${req.params.tenant}`));
     res.redirect(`${config.baseHref}#/pathparam/${req.params.tenant}`);
    }
   else{
     res.redirect("".concat(config.baseHref));
   }
 //}
 //else{
 //  res.redirect("".concat(config.baseHref));
 //}
 });
app.use(`${config.baseHref}*`, staticFiles);
app.disable('x-powered-by');
app.disable('server');

/**
 * Process authentication routes / handle Oauth flow.
 *  Keep below static serve
 */
app.all('*', (req, res, next) => {
  /* istanbul ignore if */
  if (req.session && req.session.clientToken ) {
   next();
  }
  else {
    res.sendStatus(403).send({ response:  '<h3>Forbidden</h3>' });
  }
});
// error handler
/* istanbul ignore next */
app.use(function (err, req, res, next) {
  // render the error page
  if(req.path === '/loginTenant' && clientConfig.strategy === 'password-grant'){
    if (err.oauthError && err.oauthError.statusCode === 401 || err.status === 500) {
      res.setHeader("X-Frame-Options", "SAMEORIGIN");
      res.send({ responseStatus: 401 });
      auditlogger.info("Authentication failure for the user",req,{"eventCategory":"login","eventSubtype": "Failure","eventType":"Authentication","response":"Audit_Failure"});
    } else {
      res.setHeader("X-Frame-Options", "SAMEORIGIN");
      res.send({ responseStatus: 500 });
      auditlogger.info("Authentication failure for the user",req,{"eventCategory":"login","eventSubtype": "Failure","eventType":"Authentication","response":"Audit_Failure"});
    }
    next();
  }
  next();
});
/* istanbul ignore next */
//use this
function mockLoginFun(mockObject){
  app.post(`${config.baseHref}loginTenant`, function (req, res) {
      req.session.clientToken = mockObject.access_token || " ";
      req.session.expiresOn = mockObject.expires;
      req.session.starttime = new Date().getTime() + 0;
      req.session.isAuthorized = true;
      req.session.id_token = mockObject.id_token;
      req.session.refresh_token = mockObject.refresh_token;
      res.setHeader("X-Frame-Options", "SAMEORIGIN");
      res.send({ message: 'success' });
  });
}

function checkforLogger(configlog){
if(configlog){
  logger.info("logger configuration present"+JSON.stringify(config.logger),vstacktrace());
}
else{
  logger.warn("logger configuration absent",new Error().stack);	
}
  
}

const port = process.env.PORT || 8000;

var server = app.listen(port, function() {
 /* istanbul ignore next */	
	 logger.info(`Server started on PORT ${port}`,vstacktrace());
	
   checkforLogger(config.logger);



  
 
});

//------------------------------health probes----------------------------------------------//
let healthcheck = new healthProbe.HealthChecker();

// startup probe
const startPromise = () => new Promise(function (resolve, _reject) {
	setTimeout(function () {
		resolve();
	}, 10);
});
let startCheck = new healthProbe.StartupCheck("startCheck", startPromise);
function startResultprocess(res,result,serviceCheck){
  if (result.status === 'UP' && serviceCheck.state === 'UP') {
    res.status(200);
    res.send(result);
  } else {
    res.status(503);
    res.send(result);
  }
}
healthcheck.registerStartupCheck(startCheck);
async function healthStartup(req, res, next){
    if(process.env.SERVICE_HEALTH_URL) {
    let serviceHealthRes = await dependencyHealth(process.env.SERVICE_HEALTH_URL);
    let serviceCheck = {
      "name": "serviceCheck",
      "state": serviceHealthRes.status,
      "data": {
        "reason": ""
      }
    }
    
    healthcheck.getStartupStatus().then((result) => {
      result.checks = result.checks.splice(0, 1);
      result.checks.push(serviceCheck);
      startResultprocess(res,result,serviceCheck);
    
    }).catch((error) => {
      res.status(503).send(error)
    })
  }else 
  {
    res.status(200);
  }
  }

health.use('/health/startup',healthStartup);

//liveliness probe
const livePromise = () => new Promise(function (resolve, _reject) {
	setTimeout(function () {
		resolve();
	}, 10);
});
let liveCheck = new healthProbe.LivenessCheck("liveCheck", livePromise);
function checkprocess(res,result){
  if (result.status === 'UP') {
    res.status(200);
    res.send(result);
  } else {
    res.status(503);
    res.send(result);
  }
}
healthcheck.registerLivenessCheck(liveCheck);
function getLiveliness(req, res, next){
    healthcheck.getLivenessStatus().then((result) => {
    result.checks = result.checks.splice(0, 1);
    checkprocess(res,result);
  }).catch((error) => {
    res.status(503).send(error)
  })
}

health.use('/health/liveliness', getLiveliness);

// dependency health check
async function dependencyHealth(HealthUrl) {
	const options = {
		method: 'GET',
		uri: HealthUrl,
		resolveWithFullResponse: true
	};
	return await rp(options)
		.then(response => {
			return { "status": "UP" };
		})
		.catch(err => {
			return { "status": "DOWN" }
		});
}

// readiness probe
const readyPromise = () => new Promise(function (resolve, _reject) {
	setTimeout(function () {
		resolve();
	}, 10);
});
let readyCheck = new healthProbe.ReadinessCheck("readyCheck", readyPromise);
function finalProcess(req,res,result,keycloakHealthRes){
  if (result.status === 'UP' && keycloakHealthRes.status === 'UP') {
    res.status(200);
    res.send(result);
  } else {
    result.status = "DOWN"
    res.status(503);
    res.send(result);
  }
}
healthcheck.registerReadinessCheck(readyCheck);
async function healthReadniess(req, res, next){
	healthcheck.getReadinessStatus().then(async (result) => {
		result.checks = result.checks.splice(0, 1);

		let keycloakHealthRes = {
			'status': 'UP'
		};
		if (process.env.DEPENDENCY_CHECK === 'true') {
			keycloakHealthRes = await dependencyHealth(process.env.KEYCLOAK_HEALTH_URL);
			result.checks.push({
				"name": "keycloakCheck",
				"state": keycloakHealthRes.status,
				"data": {
					"reason": ""
				}
			})
		}
    finalProcess(req,res,result,keycloakHealthRes);
	}).catch((error) => {
		res.status(503).send(error)
	})
}
health.use('/health/readiness', healthReadniess);

health.listen(healthport, () => console.log(`ACCS health endpoint is up at ${healthport}!`));

for (var j = 0; j < proxyArray.length; j++) {
  server.on('upgrade', proxyArray[j].upgrade);
  }

module.exports = {
  setupsession: setupsession,
  mainapp:app,
  authAdapter:authAdapter,
  health:health,
  setTLS:setTLS,
  init:init,
getKey:getKey,
extractValues:extractValues,
  getName:getName,
	tokenValidity:tokenValidity,
  config:config,
	tenantConfig:tenantConfig,
	readFile:readFile,
  healthapp:health,
  healthReadniess:healthReadniess,
  dependencyHealth:dependencyHealth,
  finalProcess:finalProcess,
  getLiveliness:getLiveliness,
  checkprocess:checkprocess,
  healthStartup:healthStartup,
  startResultprocess:startResultprocess,
  processReadFile:processReadFile,
  checkforLogger:checkforLogger,
  filterAndSetTenant:filterAndSetTenant
};
