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

/*
This module reads config settings from localConfig.json when running locally,
  or from the VCAPS environment variables when running in Cloud Foundry.
*/

var settings = {};
// checking NODE_ENV to load cloud properties from VCAPS

var node_env = process.env.node_env === 'docker' ? process.env.node_env :process.env.TENANT_INFO ? 'tenantinfo' : (process.env.node_env || 'development');
settings.decrypt={secret: 'top_secrect_react_app_hub'};
/* istanbul ignore if */
if (node_env === 'docker') {
	let env_docker = JSON.parse(process.env.TENANT_INFO)[0];
	settings.grantType = env_docker.grantType === 'password' ? 'password-grant' : env_docker.grantType;
	  settings.baseHref = env_docker.baseHref !== undefined ? env_docker.baseHref : "/";
	  settings.wsport = env_docker.wsport === undefined ? 9000 : env_docker.wsport;
	  settings.secure = env_docker.secure === undefined ? true : env_docker.secure;
	  settings.httpOnly = env_docker.httpOnly === undefined ? true : env_docker.httpOnly;
	  settings.NODE_TLS_REJECT_UNAUTHORIZED = env_docker.NODE_TLS_REJECT_UNAUTHORIZED === undefined ? "0" : env_docker.NODE_TLS_REJECT_UNAUTHORIZED;
	  settings.clientId = env_docker.clientId;
	  settings.uaaURL = env_docker.uaaURL;
	  settings.uaaprivateURL = env_docker.uaaprivateURL;
	  settings.polling = env_docker.polling ? env_docker.polling.interval : undefined;
	  settings.clientss = {
		"client_secret": env_docker.uaaClientSecret
	  };
	  settings.uaaClientSecret = env_docker.uaaClientSecret;
	  settings.tenant = env_docker.tenant;
	  settings.tokenURL = env_docker.tokenURL;
	  settings.redirectUrl = env_docker.redirectUrl;
	  settings.isPaddingRequired = env_docker.isPaddingRequired;
	  settings.mockSecurityServiceObj = env_docker.mockSecurityServiceObj;
	  settings.trackUserActivity = env_docker.trackUserActivity;
	  settings.userActivityServer = env_docker.userActivityServer;
	  settings.userExperience = env_docker.userExperience;
	  settings.redisConfig = env_docker.redisConfig;
	  settings.multiInstance = env_docker.multiInstance;
	  settings.designTemplate = env_docker.designTemplate;
	  settings.i18Resources = env_docker.i18Resources;
	  settings.logger = env_docker.loggerMap;
	  settings.passwordCredEncryptor = env_docker.passwordCredEncryptor;
	  settings.apiCacheTime = env_docker.apiCacheTime;
	  settings.ispkceEnabled = env_docker.ispkceEnabled;
	  settings.thankYouMsg = env_docker.thankYouMsg;
	  settings.notificationServiceUrl = env_docker.notificationServiceUrl;
	  settings.serviceHub = env_docker.serviceHub;
	  settings.showHeaderMenuIcon = env_docker.showHeaderMenuIcon;
	  settings.licencesUrl = env_docker.licencesUrl;
	  settings.logoutUrlKey = env_docker.logoutUrlKey;
	  settings.advanceNotificationMeta = env_docker.advanceNotificationMeta;
	  settings.microappStaticFileCacheInSec = env_docker.microappStaticFileCacheInSec;
	  settings.sameSite = env_docker.sameSite || 'strict';
	  settings.displayMenuItemOnHeader = env_docker.displayMenuItemOnHeader || false;
	  settings.displayMicroappOnHeader = env_docker.displayMicroappOnHeader !== undefined ? env_docker.displayMicroappOnHeader : true;
	  settings.applicationName = env_docker.applicationName;
	  settings.appVersion = env_docker.appVersion !== undefined ? env_docker.appVersion:'';
	} else{
	/* istanbul ignore if */
	if(node_env === 'tenantinfo') {
	var env = JSON.parse( process.env.TENANT_INFO )[0];
	settings.grantType = env.grantType === 'password'? 'password-grant':env.grantType;
	settings.baseHref = env.baseHref !== undefined? env.baseHref:"/";
	settings.wsport = env.wsport !== undefined? env.wsport:9000;
	settings.secure = env.secure === undefined ? true:env.secure;
	settings.httpOnly = env.httpOnly === undefined ? true:env.httpOnly;
	settings.NODE_TLS_REJECT_UNAUTHORIZED = env.NODE_TLS_REJECT_UNAUTHORIZED === undefined ? "0":env.NODE_TLS_REJECT_UNAUTHORIZED;
	settings.clientId = env.clientId;
	settings.uaaURL = env.uaaURL;
	settings.uaaprivateURL = env.uaaprivateURL;
	settings.polling = env.polling ? env.polling.interval : undefined;
	settings.clientss={"client_secret": env.uaaClientSecret};
	settings.uaaClientSecret = env.uaaClientSecret;
	settings.tenant = env.tenant;
	settings.tokenURL = env.tokenURL;
	settings.redirectUrl = env.redirectUrl;
	settings.isPaddingRequired = env.isPaddingRequired;
	settings.mockSecurityServiceObj = env.mockSecurityServiceObj;
	settings.trackUserActivity= env.trackUserActivity;
	settings.userActivityServer=env.userActivityServer;
  settings.userExperience = env.userExperience;
	settings.redisConfig=env.redisConfig;
	settings.multiInstance=env.multiInstance;
	settings.designTemplate=env.designTemplate;
	settings.i18Resources = env.i18Resources;
	settings.logger=env.loggerMap;
	settings.passwordCredEncryptor=process.env.passwordCredEncryptor;
	settings.apiCacheTime = env.apiCacheTime;
	settings.ispkceEnabled = env.ispkceEnabled;
	settings.thankYouMsg = env.thankYouMsg;
	settings.notificationServiceUrl = env.notificationServiceUrl;
	settings.serviceHub = env.serviceHub;
	settings.refreshWindow = env.refreshWindow;
	settings.showHeaderMenuIcon = env.showHeaderMenuIcon;
	settings.licencesUrl = env.licencesUrl;
	settings.logoutUrlKey = env.logoutUrlKey;
	settings.multiTenancy=env.multiTenancy;
	settings.multiTenancy && (settings.TENANT_CONFIGURATION=JSON.parse(process.env.TENANT_CONFIGURATION));
	settings.multiTenancy && (settings.DEFAULT_TENANT_CONFIGURATION=JSON.parse(process.env.DEFAULT_TENANT_CONFIGURATION));
	settings.advanceNotificationMeta = env.advanceNotificationMeta;
	settings.microappStaticFileCacheInSec= env.microappStaticFileCacheInSec;
	settings.sameSite= env.sameSite || 'strict';
	settings.displayMenuItemOnHeader = env.displayMenuItemOnHeader || false;
	settings.displayMicroappOnHeader = env.displayMicroappOnHeader !== undefined? env.displayMicroappOnHeader : true;
	settings.applicationName = env.applicationName;
	settings.appVersion = env.appVersion !== undefined ?  env.appVersion :'';
} else {
	/* istanbul ignore else */
	if(node_env === 'development') {
  // use localConfig file
	var devConfig = require('../localConfig.json')[node_env];
  	settings.id = devConfig.id;
	settings.clientId = devConfig.clientId;
	settings.uaaURL = devConfig.uaaURL;
	settings.uaaprivateURL = devConfig.uaaprivateURL;
	settings.polling = devConfig.polling ? devConfig.polling.interval : null;
    settings.tenant = devConfig.tenant;
	settings.grantType = devConfig.grantType === 'password'? 'password-grant': devConfig.grantType;
	settings.baseHref = devConfig.baseHref !== undefined? devConfig.baseHref:'/';
	settings.wsport = devConfig.wsport !== undefined? devConfig.wsport:9000;
	settings.secure = devConfig.secure === undefined ? true:devConfig.secure;
	settings.httpOnly = devConfig.httpOnly === undefined ? true:devConfig.httpOnly;
	settings.NODE_TLS_REJECT_UNAUTHORIZED = devConfig.NODE_TLS_REJECT_UNAUTHORIZED === undefined ? "0":devConfig.NODE_TLS_REJECT_UNAUTHORIZED;
	settings.clientss={"client_secret": devConfig.uaaClientSecret};
	settings.uaaClientSecret = devConfig.uaaClientSecret;
	settings.redirectUrl = devConfig.redirectUrl;
	settings.isPaddingRequired = devConfig.isPaddingRequired;
	settings.trackUserActivity= devConfig.trackUserActivity;
	settings.userActivityServer=devConfig.userActivityServer;
  settings.userExperience = devConfig.userExperience;
	settings.redisConfig=devConfig.redisConfig;
	settings.multiInstance=devConfig.multiInstance;
	settings.tokenURL = devConfig.tokenURL;
	settings.designTemplate=devConfig.designTemplate;
	settings.mockSecurityServiceObj = devConfig.mockSecurityServiceObj;
	settings.permittedapps= devConfig.permittedapps;
	settings.i18Resources = devConfig.i18Resources;
	settings.logger=devConfig.loggerMap;
	settings.passwordCredEncryptor=devConfig.passwordCredEncryptor;
	settings.apiCacheTime = devConfig.apiCacheTime;
	settings.ispkceEnabled = devConfig.ispkceEnabled;
	settings.thankYouMsg = devConfig.thankYouMsg;
	settings.notificationServiceUrl = devConfig.notificationServiceUrl;
	settings.serviceHub = devConfig.serviceHub;
	settings.refreshWindow = devConfig.refreshWindow;
	settings.showHeaderMenuIcon = devConfig.showHeaderMenuIcon;
	settings.licencesUrl = devConfig.licencesUrl;
	settings.logoutUrlKey = devConfig.logoutUrlKey;
	settings.multiTenancy=devConfig.multiTenancy;
	settings.multiTenancy &&( settings.TENANT_CONFIGURATION=require('./tenatdata').TENANT_CONFIGURATION);
	settings.multiTenancy && (settings.DEFAULT_TENANT_CONFIGURATION=require('./tenatdata').DEFAULT_TENANT_CONFIGURATION);
	settings.advanceNotificationMeta = devConfig.advanceNotificationMeta;
	settings.microappStaticFileCacheInSec = devConfig.microappStaticFileCacheInSec;
	settings.sameSite = devConfig.sameSite || 'strict';
	settings.displayMenuItemOnHeader = devConfig.displayMenuItemOnHeader || false;
	settings.displayMicroappOnHeader = devConfig.displayMicroappOnHeader !== undefined ? devConfig.displayMicroappOnHeader :true;
	settings.applicationName = devConfig.applicationName;
	settings.appVersion = devConfig.appVersion !== undefined ? devConfig.appVersion :'';
} else {
	// read VCAP_SERVICES
	var vcapsServices = JSON.parse(process.env.VCAP_SERVICES);
	var uaaService = vcapsServices[process.env.uaa_service_label];
	
	if(uaaService) {
    settings.uaaURL = uaaService[0].credentials.uri;
	settings.tokenURL = uaaService[0].credentials.uri;
	}

	// read VCAP_APPLICATION
	var vcapsApplication = JSON.parse(process.env.VCAP_APPLICATION);
	settings.appURL = 'https://' + vcapsApplication.uris[0];//what is this?
	settings.clientId = process.env.clientId;
}
}
}
/******** check for redis pass */
/*if(settings.redisConfig.default_only!==undefined && !settings.redisConfig.default_only){
	settings.redisConfig.default_pass = settings.redisConfig.defaultpp === "K8SECRET" ? process.env.DEFAULT_REDIS_PASSWORD : settings.redisConfig.default_pass;
	settings.defaultconfig={username:settings.redisConfig.default_user,password:settings.redisConfig.default_pass};
}*/

/* istanbul ignore else */
if(settings.redisConfig && settings.redisConfig.password){
settings.redisConfig.password = settings.redisConfig.password.includes("K8SECRET") ? process.env[settings.redisConfig.password.split('.')[1]] : settings.redisConfig.password;
/* istanbul ignore else */
if(settings.redisConfig.acl){
	settings.redisConfig.acl.password= settings.redisConfig.acl.password.includes("K8SECRET")? process.env[settings.redisConfig.acl.password.split('.')[1]]: settings.redisConfig.acl.password;
}
}



module.exports = settings;
